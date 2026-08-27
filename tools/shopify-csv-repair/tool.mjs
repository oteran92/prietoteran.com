/**
 * Browser controller for the Shopify CSV repair tool.
 * Analysis and the finding list are free. The repaired file and the change
 * report are released once a valid email is given, which is also sent to
 * osmel@prietoteran.com as a lead.
 */

import {
    analyzeShopifyCsv,
    compareCatalogs,
    parseCsv,
    repairShopifyCsv,
} from './shopify-csv-core.mjs';

const MAX_FILE_BYTES = 15 * 1024 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEAD_SOURCE = 'shopify-csv-repair';

const elements = {
    proposedCsv: document.getElementById('proposedCsv'),
    currentCsv: document.getElementById('currentCsv'),
    proposedFileName: document.getElementById('proposedFileName'),
    currentFileName: document.getElementById('currentFileName'),
    analyzeButton: document.getElementById('analyzeButton'),
    repairForm: document.getElementById('repairForm'),
    repairEmail: document.getElementById('repairEmail'),
    repairSubmit: document.getElementById('repairSubmit'),
    repairNote: document.getElementById('repairNote'),
    downloadButton: document.getElementById('downloadButton'),
    reportButton: document.getElementById('reportButton'),
    pageMessage: document.getElementById('pageMessage'),
    results: document.getElementById('results'),
    issueList: document.getElementById('issueList'),
    comparisonPanel: document.getElementById('comparisonPanel'),
    comparisonWarning: document.getElementById('comparisonWarning'),
};

let activeRepair = null;
let filesReleased = false;

function track(eventName, parameters = {}) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, parameters);
    }
}

function showMessage(message, isError = true) {
    elements.pageMessage.textContent = message;
    elements.pageMessage.hidden = false;
    elements.pageMessage.dataset.type = isError ? 'error' : 'success';
}

function clearMessage() {
    elements.pageMessage.hidden = true;
    elements.pageMessage.textContent = '';
}

function validateFile(file) {
    if (!file) throw new Error('Choose a Shopify product CSV first.');
    if (file.size > MAX_FILE_BYTES) throw new Error(`${file.name} is larger than the 15 MB limit.`);
    if (!file.name.toLowerCase().endsWith('.csv')) throw new Error(`${file.name} must be a CSV file.`);
}

async function readDocument(file) {
    validateFile(file);
    return parseCsv(await file.text());
}

function updateFileLabel(input, label, fallback) {
    const file = input.files[0];
    label.textContent = file ? `${file.name} · ${(file.size / 1024).toFixed(1)} KB` : fallback;
    input.closest('.csv-upload-card').classList.toggle('has-file', Boolean(file));
}

function renderIssues(analysis) {
    elements.issueList.replaceChildren();
    const issues = analysis.issues.length
        ? analysis.issues
        : [{ severity: 'info', message: 'No common Shopify CSV problems were detected.', code: 'clean' }];

    issues.slice(0, 100).forEach((issue) => {
        const item = document.createElement('li');
        item.className = 'csv-issue';
        item.dataset.severity = issue.severity;

        const badge = document.createElement('span');
        badge.className = 'csv-issue-badge';
        badge.textContent = issue.severity;

        const content = document.createElement('div');
        const message = document.createElement('p');
        message.textContent = issue.message;
        content.append(message);

        if (issue.row || issue.column || issue.fixable) {
            const detail = document.createElement('small');
            detail.textContent = [
                issue.row ? `Row ${issue.row}` : '',
                issue.column || '',
                issue.fixable ? 'Safe automatic fix available' : '',
            ].filter(Boolean).join(' · ');
            content.append(detail);
        }

        item.append(badge, content);
        elements.issueList.append(item);
    });

    if (analysis.issues.length > 100) {
        const item = document.createElement('li');
        item.className = 'csv-issue';
        item.textContent = `${analysis.issues.length - 100} additional findings are not shown in this preview.`;
        elements.issueList.append(item);
    }
}

function renderComparison(comparison) {
    elements.comparisonPanel.hidden = !comparison;
    if (!comparison) return;

    document.getElementById('existingTouched').textContent = comparison.existingProductsTouched;
    document.getElementById('newProducts').textContent = comparison.newProducts;
    document.getElementById('missingVariants').textContent = comparison.missingVariants.length;

    if (comparison.missingVariants.length > 0) {
        const handles = [...new Set(comparison.missingVariants.map((item) => item.handle))].slice(0, 8);
        elements.comparisonWarning.textContent =
            `${comparison.missingVariants.length} existing variant(s) are absent from the proposed rows for: ${handles.join(', ')}. ` +
            'Review Shopify overwrite settings before importing.';
        elements.comparisonWarning.hidden = false;
    } else {
        elements.comparisonWarning.hidden = true;
    }
}

function buildReport(repair) {
    const lines = [
        'SHOPIFY CSV REPAIR — CHANGE REPORT',
        `Generated: ${new Date().toISOString()}`,
        `Source file: ${repair.fileName}`,
        `Rows analyzed: ${repair.analysis.rowCount}`,
        `Products detected: ${repair.analysis.productCount}`,
        `Safe changes applied: ${repair.repaired.changes.length}`,
        '',
        'CHANGES',
    ];

    if (repair.repaired.changes.length === 0) {
        lines.push('No automatic changes were required.');
    } else {
        repair.repaired.changes.forEach((change) => {
            lines.push(`Row ${change.row} · ${change.column}: "${change.before}" -> "${change.after}"`);
        });
    }

    if (repair.comparison) {
        lines.push(
            '',
            'CATALOG COMPARISON',
            `Existing products touched: ${repair.comparison.existingProductsTouched}`,
            `New products: ${repair.comparison.newProducts}`,
            `Existing variants missing from proposed file: ${repair.comparison.missingVariants.length}`,
            'Missing variants are warnings only. This tool does not know the overwrite options selected in Shopify.',
        );
    }

    lines.push(
        '',
        'LIMITS',
        'This deterministic check does not access Shopify and cannot detect store configuration, app, metafield or API conflicts.',
    );
    return lines.join('\n');
}

function downloadText(content, fileName, type) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function downloadRepair() {
    if (!activeRepair?.repaired?.csv) return;
    const baseName = activeRepair.fileName.replace(/\.csv$/i, '');
    downloadText(activeRepair.repaired.csv, `${baseName}-repaired.csv`, 'text/csv;charset=utf-8');
    track('shopify_csv_repair_download', { file_type: 'csv' });
}

function downloadReport() {
    if (!activeRepair) return;
    const baseName = activeRepair.fileName.replace(/\.csv$/i, '');
    downloadText(buildReport(activeRepair), `${baseName}-change-report.txt`, 'text/plain;charset=utf-8');
    track('shopify_csv_repair_download', { file_type: 'report' });
}

/**
 * Decide what the repair panel offers after an analysis.
 * The email is asked for once per visit; afterwards the files stay available.
 */
function updateRepairAvailability(repairIsSafe, changeCount, hasUnresolvedErrors) {
    elements.repairForm.hidden = filesReleased;
    elements.repairSubmit.disabled = !repairIsSafe;
    elements.downloadButton.hidden = !(filesReleased && repairIsSafe);
    elements.reportButton.hidden = !(filesReleased && repairIsSafe);

    if (repairIsSafe && filesReleased) {
        elements.repairNote.textContent = `${changeCount} safe change(s) ready to download.`;
    } else if (repairIsSafe) {
        elements.repairNote.textContent =
            `${changeCount} safe change(s) ready. Add your email to get the file.`;
    } else if (hasUnresolvedErrors) {
        elements.repairNote.textContent =
            'Automatic repair is disabled because unresolved errors need human review.';
    } else {
        elements.repairNote.textContent =
            'No safe automatic changes are needed. Keep your original file and review any warnings above.';
    }
}

/**
 * Summarize the analysis for the lead email, without sending catalog content.
 */
function buildLeadMessage() {
    const lines = [
        'Shopify CSV repair result',
        '',
        `File: ${activeRepair.fileName}`,
        `Rows: ${activeRepair.analysis.rowCount}`,
        `Products: ${activeRepair.analysis.productCount}`,
        `Blocking errors: ${activeRepair.analysis.counts.error}`,
        `Warnings: ${activeRepair.analysis.counts.warning}`,
        `Safe fixes applied: ${activeRepair.repaired.changes.length}`,
    ];

    if (activeRepair.comparison) {
        lines.push(
            '',
            `Existing products touched: ${activeRepair.comparison.existingProductsTouched}`,
            `New products: ${activeRepair.comparison.newProducts}`,
            `Existing variants missing from the proposed file: ${activeRepair.comparison.missingVariants.length}`,
        );
    }

    return lines.join('\n');
}

/**
 * Release the repaired file and send the lead. A failed email must not keep
 * the file from the person who asked for it.
 */
async function releaseRepair(event) {
    event.preventDefault();
    if (!activeRepair || elements.repairSubmit.disabled) return;

    const email = elements.repairEmail.value.trim();
    if (!EMAIL_PATTERN.test(email)) {
        elements.repairEmail.reportValidity();
        return;
    }

    filesReleased = true;
    elements.repairForm.hidden = true;
    elements.downloadButton.hidden = false;
    elements.reportButton.hidden = false;
    elements.repairNote.textContent = 'Your download has started.';
    downloadRepair();
    track('shopify_csv_lead_submit', { safe_fixes: activeRepair.repaired.changes.length });

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                message: buildLeadMessage(),
                source: LEAD_SOURCE,
            }),
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Contact request failed.');
    } catch (error) {
        console.error('Shopify CSV lead submission failed:', error);
        elements.repairNote.textContent =
            'The file is yours. The email did not go through: please write to osmel@prietoteran.com.';
    }
}

async function analyzeFiles() {
    clearMessage();
    elements.analyzeButton.disabled = true;
    elements.analyzeButton.textContent = 'Analyzing locally…';

    try {
        const proposedFile = elements.proposedCsv.files[0];
        const proposedDocument = await readDocument(proposedFile);
        const analysis = analyzeShopifyCsv(proposedDocument);
        const repaired = repairShopifyCsv(proposedDocument);
        const repairedAnalysis = analyzeShopifyCsv(parseCsv(repaired.csv));
        let comparison = null;

        if (elements.currentCsv.files[0]) {
            comparison = compareCatalogs(await readDocument(elements.currentCsv.files[0]), proposedDocument);
        }

        activeRepair = {
            fileName: proposedFile.name,
            analysis,
            repaired,
            repairedAnalysis,
            comparison,
            createdAt: Date.now(),
        };

        document.getElementById('productCount').textContent = analysis.productCount;
        document.getElementById('rowCount').textContent = analysis.rowCount;
        document.getElementById('errorCount').textContent = analysis.counts.error;
        document.getElementById('fixableCount').textContent = analysis.fixableCount;
        document.getElementById('riskLabel').textContent =
            analysis.counts.error > 0 ? 'Blocking errors found' :
                analysis.counts.warning > 0 ? 'Warnings found' : 'Low detected risk';

        renderIssues(analysis);
        renderComparison(comparison);

        updateRepairAvailability(
            repaired.changes.length > 0 && repairedAnalysis.counts.error === 0,
            repaired.changes.length,
            repairedAnalysis.counts.error > 0,
        );

        elements.results.hidden = false;
        elements.results.focus({ preventScroll: true });
        elements.results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        track('shopify_csv_analysis_complete', {
            blocking_errors: analysis.counts.error,
            safe_fixes: repaired.changes.length,
            compared_export: Boolean(comparison),
        });
    } catch (error) {
        showMessage(error.message || 'The CSV could not be analyzed.');
        track('shopify_csv_analysis_error');
    } finally {
        elements.analyzeButton.disabled = !elements.proposedCsv.files[0];
        elements.analyzeButton.textContent = 'Analyze the file';
    }
}

elements.proposedCsv.addEventListener('change', () => {
    updateFileLabel(elements.proposedCsv, elements.proposedFileName, 'Choose a Shopify product CSV');
    elements.analyzeButton.disabled = !elements.proposedCsv.files[0];
});

elements.currentCsv.addEventListener('change', () => {
    updateFileLabel(elements.currentCsv, elements.currentFileName, 'Compare existing products and variants');
});

elements.analyzeButton.addEventListener('click', analyzeFiles);
elements.repairForm.addEventListener('submit', releaseRepair);
elements.downloadButton.addEventListener('click', downloadRepair);
elements.reportButton.addEventListener('click', downloadReport);
