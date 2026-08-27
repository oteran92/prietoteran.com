/**
 * Express server for prietoteran.com
 * Handles static file serving and contact form submissions
 * Uses Microsoft Graph API for sending emails
 */

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { ConfidentialClientApplication } = require('@azure/msal-node');
const { Client } = require('@microsoft/microsoft-graph-client');
const Stripe = require('stripe');
const { buildContactSubmission, escapeHtml, normalizeText } = require('./lib/contact-submission');
require('isomorphic-fetch');

const app = express();
const PORT = process.env.PORT || 8080;
app.set('trust proxy', 1);

// Microsoft Graph API configuration
const msalConfig = {
    auth: {
        clientId: process.env.M365_CLIENT_ID,
        clientSecret: process.env.M365_CLIENT_SECRET,
        authority: `https://login.microsoftonline.com/${process.env.M365_TENANT_ID}`,
    },
};

let msalClient = null;
const getMsalClient = () => {
    if (!msalClient && process.env.M365_CLIENT_ID && process.env.M365_CLIENT_SECRET) {
        msalClient = new ConfidentialClientApplication(msalConfig);
    }
    return msalClient;
};

/**
 * Get Microsoft Graph client with app-only authentication
 */
async function getGraphClient() {
    const client = getMsalClient();
    if (!client) return null;

    const tokenResponse = await client.acquireTokenByClientCredential({
        scopes: ['https://graph.microsoft.com/.default'],
    });

    return Client.init({
        authProvider: (done) => {
            done(null, tokenResponse.accessToken);
        },
    });
}

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
            connectSrc: ["'self'", "https://www.google-analytics.com", "https://analytics.google.com", "https://region1.google-analytics.com"],
        },
    },
}));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting for contact form (prevent spam)
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Max 5 requests per window per IP
    message: { 
        success: false, 
        message: 'Too many requests. Please try again later.' 
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Checkout creation and verification use a stricter independent limit.
const checkoutLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        success: false,
        message: 'Too many checkout requests. Please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

let stripeClient = null;
const getStripeClient = () => {
    if (!stripeClient && process.env.STRIPE_SECRET_KEY) {
        stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
    return stripeClient;
};

/**
 * Build a stable public origin for Stripe return URLs.
 */
function getPublicBaseUrl(req) {
    return (process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/+$/, '');
}

// SEO redirects — legacy URLs and retired service pages
const redirect301 = (from, to) => {
    app.get(from, (req, res) => res.redirect(301, to));
};

redirect301('/services/integration.html', '/#how');
redirect301('/services/automation.html', '/');
redirect301('/de/services/integration.html', '/?lang=de#how');
redirect301('/de/services/automation.html', '/?lang=de');
redirect301('/es/services/integration.html', '/');
redirect301('/es/services/automation.html', '/');
redirect301('/services/architecture.html', '/');
redirect301('/services/consulting.html', '/');
redirect301('/de/', '/?lang=de');
redirect301('/es/', '/');

// Serve static files from root directory
app.use(express.static(path.join(__dirname), {
    extensions: ['html'],
}));

/**
 * Expose payment availability without revealing Stripe credentials.
 */
app.get('/api/shopify-csv-config', (req, res) => {
    res.json({ paymentsEnabled: Boolean(process.env.STRIPE_SECRET_KEY) });
});

/**
 * Create a fixed-price Stripe Checkout session without receiving CSV content.
 */
app.post('/api/shopify-csv-checkout', checkoutLimiter, async (req, res) => {
    try {
        const stripe = getStripeClient();
        if (!stripe) {
            return res.status(503).json({
                success: false,
                message: 'Stripe Checkout is not configured yet.',
            });
        }

        const sourceFileName = normalizeText(req.body.fileName, 180).replace(/[\r\n]/g, ' ');
        const baseUrl = getPublicBaseUrl(req);
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: 700,
                        product_data: {
                            name: 'Shopify CSV Repair',
                            description: 'One repaired CSV and deterministic change report',
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                product: 'shopify_csv_repair',
                source_file: sourceFileName || 'shopify-products.csv',
            },
            success_url: `${baseUrl}/tools/shopify-csv-repair/?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/tools/shopify-csv-repair/?checkout=cancelled`,
        });

        return res.json({ success: true, url: session.url });
    } catch (error) {
        console.error('Shopify CSV checkout error:', error);
        return res.status(500).json({
            success: false,
            message: 'Checkout could not be created. Please try again.',
        });
    }
});

/**
 * Verify that a returned Checkout session paid for this exact tool.
 */
app.get('/api/shopify-csv-checkout/:sessionId', checkoutLimiter, async (req, res) => {
    try {
        const stripe = getStripeClient();
        if (!stripe) {
            return res.status(503).json({
                success: false,
                message: 'Stripe Checkout is not configured yet.',
            });
        }

        const sessionId = normalizeText(req.params.sessionId, 255);
        if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
            return res.status(400).json({ success: false, message: 'Invalid checkout session.' });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const paid =
            session.payment_status === 'paid' &&
            session.metadata?.product === 'shopify_csv_repair' &&
            session.amount_total === 700 &&
            session.currency === 'usd';

        return res.json({ success: true, paid });
    } catch (error) {
        console.error('Shopify CSV payment verification error:', error);
        return res.status(400).json({
            success: false,
            message: 'Payment could not be verified.',
        });
    }
});

/**
 * Contact form endpoint
 * POST /api/contact
 * Serves the site contact form and the tool leads, which send an email only.
 * Uses Microsoft Graph API to send emails via osmel@prietoteran.com
 */
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const result = buildContactSubmission(req.body);
        if (!result.ok) {
            return res.status(400).json({ success: false, message: result.error });
        }

        const { name, email, company, message, source, subject } = result.submission;

        // Escape public values used in the HTML email body
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeCompany = escapeHtml(company);
        const safeSource = escapeHtml(source);
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

        // Get Microsoft Graph client
        const graphClient = await getGraphClient();
        if (!graphClient) {
            console.error('Microsoft Graph API is not configured');
            return res.status(500).json({
                success: false,
                message: 'Email service not configured. Please contact directly.',
            });
        }

        // Prepare email message for Microsoft Graph API
        const sendMailBody = {
            message: {
                subject,
                body: {
                    contentType: 'HTML',
                    content: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${safeName}</p>
                        <p><strong>Email:</strong> ${safeEmail}</p>
                        ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ''}
                        ${safeSource ? `<p><strong>Source:</strong> ${safeSource}</p>` : ''}
                        <hr>
                        <p><strong>Message:</strong></p>
                        <p>${safeMessage}</p>
                        <hr>
                        <p style="color: #888; font-size: 12px;">
                            Sent from prietoteran.com contact form
                        </p>
                    `,
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: process.env.EMAIL_TO || 'osmel@prietoteran.com',
                        },
                    },
                ],
                replyTo: [
                    {
                        emailAddress: {
                            address: email,
                            name: name,
                        },
                    },
                ],
            },
            saveToSentItems: true,
        };

        // Send email via Microsoft Graph API (as osmel@prietoteran.com)
        const senderEmail = process.env.M365_SENDER_EMAIL || 'osmel@prietoteran.com';
        await graphClient
            .api(`/users/${senderEmail}/sendMail`)
            .post(sendMailBody);

        console.log('Email sent successfully via Microsoft Graph API');
        
        res.json({
            success: true,
            message: 'Message sent successfully. I will get back to you soon.',
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred. Please try again later.',
        });
    }
});

// Health check endpoint (useful for DO App Platform)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// 404 handler for non-existent files (must be last)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Microsoft Graph API: ${process.env.M365_CLIENT_ID && process.env.M365_CLIENT_SECRET ? 'configured' : 'NOT configured'}`);
    console.log(`Email sender: ${process.env.M365_SENDER_EMAIL || 'osmel@prietoteran.com'}`);
});
