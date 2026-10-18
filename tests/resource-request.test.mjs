/**
 * Free resource requests, the contact interest field and private static paths.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import resourceRequest from '../lib/resource-request.js';
import contactSubmission from '../lib/contact-submission.js';
import privatePaths from '../lib/private-paths.js';

const { buildResourceRequest, renderSubscriberEmail } = resourceRequest;
const { buildContactSubmission } = contactSubmission;
const { isPrivatePath } = privatePaths;

test('accepts a known resource and normalizes the email', () => {
    const result = buildResourceRequest({ email: ' Ana@Example.COM ', resource: 'reglas', locale: 'es' });
    assert.equal(result.ok, true);
    assert.equal(result.request.email, 'ana@example.com');
    assert.equal(result.request.locale, 'es');
    assert.equal(result.request.downloadPath, '/recursos/reglas-agentes-ia.pdf');
});

test('rejects unknown resources, bad emails and non-object bodies', () => {
    assert.equal(buildResourceRequest({ email: 'a@b.ch', resource: '../server.js' }).ok, false);
    assert.equal(buildResourceRequest({ email: 'a@b', resource: 'reglas' }).ok, false);
    assert.equal(buildResourceRequest(['a@b.ch']).ok, false);
});

test('serves the file in the requested language and falls back to English', () => {
    const file = locale => buildResourceRequest({ email: 'a@b.ch', resource: 'reglas', locale }).request.downloadPath;
    assert.equal(file('de'), '/recursos/ki-agenten-regeln.pdf');
    assert.equal(file('en'), '/recursos/ai-agent-rules.pdf');
    assert.equal(file('fr'), '/recursos/ai-agent-rules.pdf');
});

test('subscriber email links the localized file with its title', () => {
    const { request } = buildResourceRequest({ email: 'a@b.ch', resource: 'reglas', locale: 'de' });
    const payload = renderSubscriberEmail(request, 'https://www.prietoteran.com');
    assert.equal(payload.message.toRecipients[0].emailAddress.address, 'a@b.ch');
    assert.equal(payload.message.subject, 'Die Regeln für meine KI-Agenten (PDF)');
    assert.match(payload.message.body.content, /https:\/\/www\.prietoteran\.com\/recursos\/ki-agenten-regeln\.pdf/);
});

test('contact interest is kept when known and dropped otherwise', () => {
    const base = { name: 'Anna', email: 'anna@meier.ch', message: 'Orders are retyped.' };
    const known = buildContactSubmission({ ...base, interest: 'workshop' });
    assert.equal(known.submission.interest, 'workshop');
    assert.equal(known.submission.subject, 'New Contact (workshop): Anna');
    assert.equal(buildContactSubmission({ ...base, interest: '<b>x</b>' }).submission.interest, '');
});

test('internal files are private, public assets are not', () => {
    for (const path of ['/.cursor/skills/shared/leads.json', '/%2Ecursor/x.json', '/chat.txt', '/server.js', '/package.json', '/PRODUCT.md', '/index.html.backup', '/content/blog/posts/x.mjs', '/x.csv', '/%E0%A4%A']) {
        assert.equal(isPrivatePath(path), true, path);
    }
    for (const path of ['/', '/index.html', '/home.js', '/app.js', '/lib/contact-form.js', '/tools/calculator.mjs', '/recursos/reglas-agentes-ia.pdf', '/robots.txt', '/sitemap.xml']) {
        assert.equal(isPrivatePath(path), false, path);
    }
});
