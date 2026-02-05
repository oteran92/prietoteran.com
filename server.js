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
require('isomorphic-fetch');

const app = express();
const PORT = process.env.PORT || 8080;

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
            scriptSrc: ["'self'", "'unsafe-inline'"],
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

// Serve static files from root directory
app.use(express.static(path.join(__dirname), {
    extensions: ['html'],
}));

/**
 * Contact form endpoint
 * POST /api/contact
 * Uses Microsoft Graph API to send emails via osmel@prietoteran.com
 */
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, company, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required.',
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.',
            });
        }

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
                subject: `New Contact: ${name}${company ? ` from ${company}` : ''}`,
                body: {
                    contentType: 'HTML',
                    content: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                        <hr>
                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
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
