/**
 * Browser controller for the ERP–CRM ROI diagnostic and lead form.
 */

import { calculateDiagnostic } from './calculator-core.mjs';

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
        sending: 'Sending your request…',
        sent: 'Request sent. I will contact you shortly.',
        sendError: 'The request could not be sent. Please email osmel@prietoteran.com.',
        summaryTitle: 'ERP–CRM diagnostic request',
    },
    de: {
        risk: {
            low: 'Niedrig',
            medium: 'Mittel',
            high: 'Hoch',
            critical: 'Kritisch',
        },
        calculationError: 'Bitte prüfen Sie die markierten Werte und versuchen Sie es erneut.',
        sending: 'Anfrage wird gesendet…',
        sent: 'Anfrage gesendet. Ich melde mich in Kürze.',
        sendError: 'Die Anfrage konnte nicht gesendet werden. Bitte schreiben Sie an osmel@prietoteran.com.',
        summaryTitle: 'ERP–CRM-Diagnoseanfrage',
    },
}[pageLanguage];

const diagnosticForm = document.getElementById('diagnosticForm');
const results = document.getElementById('diagnosticResults');
const resultError = document.getElementById('diagnosticError');
const leadForm = document.getElementById('diagnosticLeadForm');
const leadStatus = document.getElementById('leadStatus');
let calculatorStarted = false;
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
 * Render all result values using textContent to avoid HTML injection.
 */
function renderDiagnostic(diagnostic) {
    document.getElementById('annualWaste').textContent = formatCurrency(diagnostic.annualWaste);
    document.getElementById('manualHours').textContent =
        `${formatNumber(diagnostic.annualManualHours)} h`;
    document.getElementById('laborCost').textContent =
        formatCurrency(diagnostic.annualLaborCost);
    document.getElementById('errorCost').textContent =
        formatCurrency(diagnostic.annualErrorCost);
    document.getElementById('recoverableRange').textContent =
        `${formatCurrency(diagnostic.recoverableLow)}–${formatCurrency(diagnostic.recoverableHigh)}`;
    document.getElementById('riskScore').textContent = `${diagnostic.riskScore}/100`;

    const riskBadge = document.getElementById('riskLevel');
    riskBadge.textContent = copy.risk[diagnostic.riskLevel];
    riskBadge.dataset.risk = diagnostic.riskLevel;

    results.hidden = false;
    results.focus();
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Build the plain-text diagnostic summary delivered through the existing API.
 */
function buildLeadMessage() {
    return [
        copy.summaryTitle,
        '',
        `Annual operational waste: ${formatCurrency(latestDiagnostic.annualWaste)}`,
        `Recoverable range: ${formatCurrency(latestDiagnostic.recoverableLow)}–${formatCurrency(latestDiagnostic.recoverableHigh)}`,
        `Risk: ${copy.risk[latestDiagnostic.riskLevel]} (${latestDiagnostic.riskScore}/100)`,
        `Manual hours/year: ${formatNumber(latestDiagnostic.annualManualHours)}`,
        '',
        `Monthly transactions: ${latestInput.monthlyTransactions}`,
        `Minutes per transaction: ${latestInput.minutesPerTransaction}`,
        `Error rate: ${latestInput.errorRatePercent}%`,
        `Connected systems: ${latestInput.systemsCount}`,
        `Manual handoffs: ${latestInput.manualHandoffs}`,
        `Sync frequency: ${latestInput.syncFrequency}`,
        `Monitoring: ${latestInput.monitoring}`,
        '',
        'The prospect requested the CHF 390 ERP–CRM diagnostic review.',
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
        renderDiagnostic(latestDiagnostic);
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
        diagnosticForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }

    if (!leadForm.reportValidity()) return;

    const submitButton = leadForm.querySelector('button[type="submit"]');
    const data = new FormData(leadForm);
    submitButton.disabled = true;
    leadStatus.className = 'form-status';
    leadStatus.textContent = copy.sending;
    leadStatus.hidden = false;

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: data.get('name'),
                email: data.get('email'),
                company: data.get('company'),
                message: buildLeadMessage(),
            }),
        });
        const responseBody = await response.json();

        if (!response.ok || !responseBody.success) {
            throw new Error(responseBody.message || 'Contact request failed.');
        }

        leadStatus.className = 'form-status success';
        leadStatus.textContent = copy.sent;
        leadForm.reset();
        trackEvent('calculator_lead_submit', {
            calculator_name: 'erp_crm_roi',
            risk_level: latestDiagnostic.riskLevel,
        });
    } catch (error) {
        console.error('Diagnostic lead submission failed:', error);
        leadStatus.className = 'form-status error';
        leadStatus.textContent = copy.sendError;
    } finally {
        submitButton.disabled = false;
    }
});
