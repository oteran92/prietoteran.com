/**
 * Validation and rendering rules shared by every /api/contact submission.
 *
 * The site contact form always sends a name, so it stays required there.
 * Tool leads (ROI calculator, Shopify CSV repair) only ask for an email
 * before releasing their result, so the name is optional for those sources.
 */

// Sources allowed to submit without a name.
const TOOL_SOURCES = ['roi-calculator', 'shopify-csv-repair'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Normalize public form fields before validation and email rendering.
 */
function normalizeText(value, maxLength) {
    return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

/**
 * Escape user-provided values before placing them in an HTML email.
 */
function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

/**
 * Keep header values on a single line so they cannot inject extra headers.
 */
function singleLine(value) {
    return value.replace(/[\r\n]+/g, ' ');
}

/**
 * Validate a raw request body and build the values the Graph email needs.
 * Returns either { ok: false, error } or { ok: true, submission }.
 */
function buildContactSubmission(body = {}) {
    const name = normalizeText(body.name, 120);
    const email = normalizeText(body.email, 254).toLowerCase();
    const company = normalizeText(body.company, 160);
    const message = normalizeText(body.message, 8000);
    const source = normalizeText(body.source, 60).toLowerCase().replace(/[^a-z0-9-]/g, '');
    const isToolLead = TOOL_SOURCES.includes(source);

    if (!email || !message || (!isToolLead && !name)) {
        return {
            ok: false,
            error: isToolLead
                ? 'Email and message are required.'
                : 'Name, email, and message are required.',
        };
    }

    if (!EMAIL_PATTERN.test(email)) {
        return { ok: false, error: 'Please provide a valid email address.' };
    }

    // Tool leads may arrive without a name; Graph still needs one to send.
    const displayName = name || email.split('@')[0] || 'Tool';
    const subjectFrom = company ? ` from ${singleLine(company)}` : '';
    const subject = isToolLead
        ? `Tool lead (${source}): ${singleLine(displayName)}${subjectFrom}`
        : `New Contact: ${singleLine(displayName)}${subjectFrom}`;

    return {
        ok: true,
        submission: { name: displayName, email, company, message, source, subject },
    };
}

module.exports = { TOOL_SOURCES, buildContactSubmission, escapeHtml, normalizeText };
