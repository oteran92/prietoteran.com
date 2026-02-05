/**
 * Express server for prietoteran.com
 * Handles static file serving and contact form submissions
 */

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize Resend lazily (only when API key is available)
let resend = null;
const getResend = () => {
    if (!resend && process.env.RESEND_API_KEY) {
        resend = new Resend(process.env.RESEND_API_KEY);
    }
    return resend;
};

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

        // Check if Resend is configured
        const resendClient = getResend();
        if (!resendClient) {
            console.error('RESEND_API_KEY is not configured');
            return res.status(500).json({
                success: false,
                message: 'Email service not configured. Please contact directly.',
            });
        }

        // Send email via Resend
        const { data, error } = await resendClient.emails.send({
            from: process.env.EMAIL_FROM || 'Contact Form <onboarding@resend.dev>',
            to: [process.env.EMAIL_TO || 'osmel@prietoteran.com'],
            replyTo: email,
            subject: `New Contact: ${name}${company ? ` from ${company}` : ''}`,
            html: `
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
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to send message. Please try again.',
            });
        }

        console.log('Email sent successfully:', data.id);
        
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
    console.log(`Resend API: ${process.env.RESEND_API_KEY ? 'configured' : 'NOT configured'}`);
});
