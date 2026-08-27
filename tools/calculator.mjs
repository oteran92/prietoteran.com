/**
 * Browser controller for the ERP–CRM ROI calculator.
 * The four questions are free. The numbers appear once a valid email is given,
 * and the same submission is sent to osmel@prietoteran.com as a lead.
 */

import { calculateDiagnostic } from './calculator-core.mjs';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEAD_SOURCE = 'roi-calculator';

// Shown in place of every value while the result is still locked.
const placeholder = {
    currency: 'CHF ••••',
    hours: '•••• h',
    score: '••/100',
};

const pageLanguage = document.documentElement.lang === 'de' ? 'de' : 'en';
const locale = pageLanguage === 'de' ? 'de-CH' : 'en-CH';
const copy = {
    en: {
        risk: {
            low: 'Low',
            medium: 'Moderate',
            high: 'High',
            critical: 'Critical',
        },
        calculationError: 'Please review the highlighted values and try again.',
        invalidEmail: 'Please enter a valid email address.',
        sending: 'Sending your result…',
        sent: 'Sent. Your result is above and I have a copy.',
        sendError: 'Your result is above. The email did not go through: please write to osmel@prietoteran.com.',
        summaryTitle: 'ERP–CRM ROI calculator result',
    },
    de: {
        risk: {
            low: 'Niedrig',
            medium: 'Mittel',
            high: 'Hoch',
            critical: 'Kritisch',
        },
        calculationError: 'Bitte prüfen Sie die markierten Werte und versuchen Sie es erneut.',
        invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
        sending: 'Ergebnis wird gesendet…',
        sent: 'Gesendet. Ihr Ergebnis steht oben, ich habe eine Kopie.',
        sendError: 'Ihr Ergebnis steht oben. Die E-Mail ging nicht durch: bitte schreiben Sie an osmel@prietoteran.com.',
        summaryTitle: 'Ergebnis ERP–CRM-ROI-Rechner',
    },
}[pageLanguage];

const diagnosticForm = document.getElementById('diagnosticForm');
const results = document.getElementById('diagnosticResults');
const resultError = document.getElementById('diagnosticError');
const resultLockNote = document.getElementById('resultLockNote');
const resultOffer = document.getElementById('resultOffer');
const leadSection = document.getElementById('diagnosticLead');
const leadForm = document.getElementById('diagnosticLeadForm');
const leadStatus = document.getElementById('leadStatus');
const riskBadge = document.getElementById('riskLevel');
let calculatorStarted = false;
let resultRevealed = false;
let latestDiagnostic = null;
let latestInput = null;

/**
 * Send privacy-safe product events when Google Analytics is available.
 */
function trackEvent(name, parameters = {}) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', name, parameters);
    }
}

/**
 * Format money consistently for the Swiss market.
 */
function formatCurrency(value) {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'CHF',
        maximumFractionDigits: 0,
    }).format(value);
}

/**
 * Format operational quantities without exposing unnecessary decimals.
 */
function formatNumber(value, maximumFractionDigits = 0) {
    return new Intl.NumberFormat(locale, { maximumFractionDigits }).format(value);
}

/**
 * Read the validated aggregate values from the diagnostic form.
 */
function readDiagnosticInput() {
    const data = new FormData(diagnosticForm);

    return {
        monthlyTransactions: Number(data.get('monthlyTransactions')),
        minutesPerTransaction: Number(data.get('minutesPerTransaction')),
        hourlyRate: Number(data.get('hourlyRate')),
        errorRatePercent: Number(data.get('errorRatePercent')),
        costPerError: Number(data.get('costPerError')),
        systemsCount: Number(data.get('systemsCount')),
        manualHandoffs: Number(data.get('manualHandoffs')),
        syncFrequency: data.get('syncFrequency'),
        monitoring: data.get('monitoring'),
    };
}

/**
 * Write a value into a result field using textContent to avoid HTML injection.
 */
function setValue(id, value) {
    document.getElementById(id).textContent = value;
}

/**
 * Keep the result visible but without its numbers until an email is given.
 */
function renderLockedResult() {
    setValue('annualWaste', placeholder.currency);
    setValue('manualHours', placeholder.hours);
    setValue('laborCost', placeholder.currency);
    setValue('errorCost', placeholder.currency);
    setValue('recoverableRange', placeholder.currency);
    setValue('riskScore', placeholder.score);
    riskBadge.hidden = true;
    results.classList.add('is-locked');
    resultLockNote.hidden = false;
    resultOffer.hidden = true;
    results.hidden = false;
}

/**
 * Render the calculated values in place, once the email has been submitted.
 */
function renderDiagnostic(diagnostic) {
    setValue('annualWaste', formatCurrency(diagnostic.annualWaste));
    setValue('manualHours', `${formatNumber(diagnostic.annualManualHours)} h`);
    setValue('laborCost', formatCurrency(diagnostic.annualLaborCost));
    setValue('errorCost', formatCurrency(diagnostic.annualErrorCost));
    setValue(
        'recoverableRange',
        `${formatCurrency(diagnostic.recoverableLow)}–${formatCurrency(diagnostic.recoverableHigh)}`,
    );
    setValue('riskScore', `${diagnostic.riskScore}/100`);

    riskBadge.textContent = copy.risk[diagnostic.riskLevel];
    riskBadge.dataset.risk = diagnostic.riskLevel;
    riskBadge.hidden = false;

    results.classList.remove('is-locked');
    resultLockNote.hidden = true;
    resultOffer.hidden = false;
    results.hidden = false;
}

/**
 * Move the reader to the section that now needs their attention.
 */
function focusSection(section) {
    section.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Build the plain-text summary delivered through the existing contact API.
 */
function buildLeadMessage() {
    return [
        copy.summaryTitle,
        '',
        `Annual operational waste: ${formatCurrency(latestDiagnostic.annualWaste)}`,
        `Recoverable range: ${formatCurrency(latestDiagnostic.recoverableLow)}–${formatCurrency(latestDiagnostic.recoverableHigh)}`,
        `Risk: ${copy.risk[latestDiagnostic.riskLevel]} (${latestDiagnostic.riskScore}/100)`,
        `Manual hours/year: ${formatNumber(latestDiagnostic.annualManualHours)}`,
        `Annual labor cost: ${formatCurrency(latestDiagnostic.annualLaborCost)}`,
        `Annual error cost: ${formatCurrency(latestDiagnostic.annualErrorCost)}`,
        '',
        `Monthly transactions: ${latestInput.monthlyTransactions}`,
        `Minutes per transaction: ${latestInput.minutesPerTransaction}`,
        `Hourly rate: ${latestInput.hourlyRate}`,
        `Error rate: ${latestInput.errorRatePercent}%`,
        `Cost per error: ${latestInput.costPerError}`,
        `Connected systems: ${latestInput.systemsCount}`,
        `Manual handoffs: ${latestInput.manualHandoffs}`,
        `Sync frequency: ${latestInput.syncFrequency}`,
        `Monitoring: ${latestInput.monitoring}`,
        `Page language: ${pageLanguage}`,
    ].join('\n');
}

diagnosticForm.addEventListener('input', () => {
    if (!calculatorStarted) {
        calculatorStarted = true;
        trackEvent('calculator_start', { calculator_name: 'erp_crm_roi' });
    }
});

diagnosticForm.addEventListener('submit', (event) => {
    event.preventDefault();
    resultError.hidden = true;

    if (!diagnosticForm.reportValidity()) return;

    try {
        latestInput = readDiagnosticInput();
        latestDiagnostic = calculateDiagnostic(latestInput);

        if (resultRevealed) {
            renderDiagnostic(latestDiagnostic);
            focusSection(results);
        } else {
            renderLockedResult();
            focusSection(leadSection);
        }

        trackEvent('calculator_complete', {
            calculator_name: 'erp_crm_roi',
            risk_level: latestDiagnostic.riskLevel,
        });
    } catch (error) {
        console.error('Calculator validation failed:', error);
        resultError.textContent = copy.calculationError;
        resultError.hidden = false;
        resultError.focus();
    }
});

document.getElementById('auditCta').addEventListener('click', () => {
    trackEvent('calculator_audit_cta', {
        calculator_name: 'erp_crm_roi',
        risk_level: latestDiagnostic?.riskLevel || 'not_calculated',
    });
});

leadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!latestDiagnostic) {
        focusSection(diagnosticForm);
        return;
    }

    if (!leadForm.reportValidity()) return;

    const data = new FormData(leadForm);
    const email = String(data.get('email') || '').trim();
    leadStatus.hidden = false;

    if (!EMAIL_PATTERN.test(email)) {
        leadStatus.className = 'form-status error';
        leadStatus.textContent = copy.invalidEmail;
        return;
    }

    // The email is valid, so the result is owed either way: show it before sending.
    resultRevealed = true;
    renderDiagnostic(latestDiagnostic);

    const submitButton = leadForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    leadStatus.className = 'form-status';
    leadStatus.textContent = copy.sending;

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: data.get('name'),
                email,
                company: data.get('company'),
                message: buildLeadMessage(),
                source: LEAD_SOURCE,
            }),
        });
        const responseBody = await response.json();

        if (!response.ok || !responseBody.success) {
            throw new Error(responseBody.message || 'Contact request failed.');
        }

        leadStatus.className = 'form-status success';
        leadStatus.textContent = copy.sent;
        trackEvent('calculator_lead_submit', {
            calculator_name: 'erp_crm_roi',
            risk_level: latestDiagnostic.riskLevel,
        });
        focusSection(results);
    } catch (error) {
        console.error('Calculator lead submission failed:', error);
        leadStatus.className = 'form-status error';
        leadStatus.textContent = copy.sendError;
    } finally {
        submitButton.disabled = false;
    }
});
