/**
 * Validation and email copy for free resource requests (/api/resource).
 * The subscriber receives the download link; Osmel receives a notification.
 */
const { escapeHtml, normalizeAttribution, normalizeText } = require('./contact-submission');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOCALES = ['en', 'de', 'es'];

// Resources that can be requested: one public file and title per language.
const RESOURCES = {
    reglas: {
        path: { es: '/recursos/reglas-agentes-ia.pdf', en: '/recursos/ai-agent-rules.pdf', de: '/recursos/ki-agenten-regeln.pdf' },
        title: { es: 'Las reglas de mis agentes de IA', en: 'The rules I give my AI agents', de: 'Die Regeln für meine KI-Agenten' },
    },
};

const COPY = {
    es: {
        greeting: 'Hola,',
        intro: 'Aquí tienes el PDF que pediste:',
        close: 'Si te sirve, respóndeme a este email y cuéntame qué tarea repite tu equipo. Lo leo yo.',
    },
    en: {
        greeting: 'Hi,',
        intro: 'Here is the guide you asked for:',
        close: 'If it helps, reply to this email and tell me which task your team repeats. I read every reply myself.',
    },
    de: {
        greeting: 'Guten Tag',
        intro: 'Hier ist der Leitfaden, den Sie angefordert haben:',
        close: 'Wenn er Ihnen hilft, antworten Sie auf diese E-Mail und schreiben Sie mir, welche Aufgabe sich in Ihrem Team wiederholt. Ich lese jede Antwort selbst.',
    },
};

/**
 * Validate a raw request body. Returns { ok: false, error } or { ok: true, request }.
 */
function buildResourceRequest(body = {}) {
    if (!body || typeof body !== 'object' || Array.isArray(body)) body = {};
    const email = normalizeText(body.email, 254).toLowerCase();
    const resourceId = normalizeText(body.resource, 40);
    const locale = LOCALES.includes(body.locale) ? body.locale : 'en';

    if (!Object.hasOwn(RESOURCES, resourceId)) return { ok: false, error: 'Unknown resource.' };
    if (!EMAIL_PATTERN.test(email)) return { ok: false, error: 'Please provide a valid email address.' };

    const resource = RESOURCES[resourceId];
    return {
        ok: true,
        request: {
            email,
            resourceId,
            locale,
            title: resource.title[locale],
            downloadPath: resource.path[locale],
            attribution: normalizeAttribution(body.attribution),
        },
    };
}

/**
 * Build the Graph sendMail payload for the subscriber.
 */
function renderSubscriberEmail({ email, locale, title, downloadPath }, baseUrl) {
    const text = COPY[locale];
    const url = escapeHtml(baseUrl + downloadPath);
    const paragraphs = [text.greeting, text.intro, `<a href="${url}">${escapeHtml(title)}</a>`, text.close, 'Osmel<br>Teran Studio · @teranstudio.ai']
        .map(line => `<p>${line}</p>`)
        .join('');
    return {
        message: {
            subject: `${title} (PDF)`,
            body: { contentType: 'HTML', content: `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111C32">${paragraphs}</div>` },
            toRecipients: [{ emailAddress: { address: email } }],
        },
        saveToSentItems: true,
    };
}

module.exports = { RESOURCES, buildResourceRequest, renderSubscriberEmail };
