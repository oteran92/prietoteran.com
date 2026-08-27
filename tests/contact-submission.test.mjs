/**
 * Rules that decide when /api/contact accepts a submission without a name.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import contactSubmission from '../lib/contact-submission.js';

const { buildContactSubmission } = contactSubmission;

test('keeps the name required for the site contact form', () => {
    const result = buildContactSubmission({
        email: 'coo@example.com',
        message: 'Orders are retyped into the ERP every morning.',
    });

    assert.equal(result.ok, false);
    assert.match(result.error, /Name/);
});

test('accepts a tool lead with an email only', () => {
    const result = buildContactSubmission({
        email: 'COO@Example.com',
        message: 'Annual operational waste: CHF 99 600',
        source: 'roi-calculator',
    });

    assert.equal(result.ok, true);
    assert.equal(result.submission.email, 'coo@example.com');
    assert.equal(result.submission.name, 'coo');
    assert.equal(result.submission.subject, 'Tool lead (roi-calculator): coo');
});

test('keeps the submitted name and company when they are provided', () => {
    const result = buildContactSubmission({
        name: 'Anna Meier',
        company: 'Meier AG',
        email: 'anna@meier.ch',
        message: 'products.csv · 4 blocking errors',
        source: 'shopify-csv-repair',
    });

    assert.equal(result.submission.name, 'Anna Meier');
    assert.equal(
        result.submission.subject,
        'Tool lead (shopify-csv-repair): Anna Meier from Meier AG',
    );
});

test('rejects an unknown source that omits the name', () => {
    const result = buildContactSubmission({
        email: 'coo@example.com',
        message: 'Hello',
        source: 'newsletter',
    });

    assert.equal(result.ok, false);
});

test('rejects a malformed email address', () => {
    const result = buildContactSubmission({
        email: 'coo@example',
        message: 'Annual operational waste: CHF 99 600',
        source: 'roi-calculator',
    });

    assert.equal(result.ok, false);
    assert.match(result.error, /valid email/);
});

test('strips line breaks from subject values', () => {
    const result = buildContactSubmission({
        name: 'Anna\nBcc: spam@example.com',
        email: 'anna@meier.ch',
        message: 'Test',
    });

    assert.equal(result.submission.subject.includes('\n'), false);
});
