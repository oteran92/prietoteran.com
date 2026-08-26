const BOOLEAN_HEADERS = new Set([
    'Published',
    'Gift Card',
    'Variant Requires Shipping',
    'Variant Taxable',
    'Taxable',
]);

const DECIMAL_HEADERS = new Set([
    'Variant Price',
    'Variant Compare At Price',
    'Variant Grams',
    'Cost per item',
    'Price / International',
    'Compare At Price / International',
]);

const INTEGER_HEADERS = new Set([
    'Variant Inventory Qty',
    'Variant Inventory Tracker',
]);

const URL_HEADERS = new Set(['Image Src', 'Variant Image']);
const OPTION_VALUE_HEADERS = ['Option1 Value', 'Option2 Value', 'Option3 Value'];

/**
 * Parse RFC 4180-style CSV text without sending catalog data to a server.
 */
export function parseCsv(text) {
    if (typeof text !== 'string' || text.trim() === '') {
        throw new Error('The CSV file is empty.');
    }

    const source = text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text;
    const rows = [];
    let row = [];
    let field = '';
    let quoted = false;

    for (let index = 0; index < source.length; index += 1) {
        const character = source[index];

        if (quoted) {
            if (character === '"' && source[index + 1] === '"') {
                field += '"';
                index += 1;
            } else if (character === '"') {
                quoted = false;
            } else {
                field += character;
            }
            continue;
        }

        if (character === '"') {
            quoted = true;
        } else if (character === ',') {
            row.push(field);
            field = '';
        } else if (character === '\n') {
            row.push(field.replace(/\r$/, ''));
            rows.push(row);
            row = [];
            field = '';
        } else {
            field += character;
        }
    }

    if (quoted) {
        throw new Error('The CSV contains an unclosed quoted field.');
    }

    row.push(field.replace(/\r$/, ''));
    rows.push(row);

    while (rows.length > 1 && rows.at(-1).every((value) => value === '')) {
        rows.pop();
    }

    const headers = rows[0].map((header) => header.trim());
    if (headers.every((header) => header === '')) {
        throw new Error('The CSV header row is empty.');
    }

    return {
        headers,
        rows: rows.slice(1),
        originalWidths: rows.slice(1).map((dataRow) => dataRow.length),
    };
}

/**
 * Serialize rows using safe quoting for commas, quotes and line breaks.
 */
export function serializeCsv(headers, rows) {
    const encode = (value) => {
        const text = String(value ?? '');
        return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
    };

    return [headers, ...rows]
        .map((row) => row.map(encode).join(','))
        .join('\r\n');
}

function addIssue(issues, severity, code, message, row = null, column = null, fixable = false) {
    issues.push({ severity, code, message, row, column, fixable });
}

function indexHeaders(headers) {
    return new Map(headers.map((header, index) => [header, index]));
}

function normalizeHandle(value) {
    return value
        .trim()
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/-{2,}/g, '-');
}

function isValidUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

function valueAt(row, headerMap, header) {
    const index = headerMap.get(header);
    return index === undefined ? '' : String(row[index] ?? '');
}

function variantKey(row, headerMap) {
    const handle = valueAt(row, headerMap, 'Handle').trim().toLowerCase();
    const sku = valueAt(row, headerMap, 'Variant SKU').trim().toLowerCase();
    const options = OPTION_VALUE_HEADERS
        .map((header) => valueAt(row, headerMap, header).trim().toLowerCase())
        .join('|');
    return `${handle}::${sku || options}`;
}

/**
 * Validate common Shopify product CSV risks and identify conservative fixes.
 */
export function analyzeShopifyCsv(document) {
    const { headers, rows, originalWidths = rows.map((row) => row.length) } = document;
    const headerMap = indexHeaders(headers);
    const issues = [];
    const duplicateHeaders = headers.filter((header, index) => header && headers.indexOf(header) !== index);

    if (!headerMap.has('Handle')) {
        addIssue(issues, 'error', 'missing-handle', 'Missing the Handle column required for safe product matching.', 1, 'Handle');
    }
    if (!headerMap.has('Title')) {
        addIssue(issues, 'error', 'missing-title', 'Missing the Title column used by Shopify product imports.', 1, 'Title');
    }
    duplicateHeaders.forEach((header) => {
        addIssue(issues, 'error', 'duplicate-header', `The header "${header}" appears more than once.`, 1, header);
    });

    const seenVariants = new Map();
    const seenSkus = new Map();

    rows.forEach((row, rowIndex) => {
        const displayRow = rowIndex + 2;
        if (originalWidths[rowIndex] !== headers.length) {
            addIssue(
                issues,
                'error',
                'column-count',
                `Row ${displayRow} has ${originalWidths[rowIndex]} columns; the header has ${headers.length}.`,
                displayRow,
            );
        }

        if (row.every((value) => String(value ?? '').trim() === '')) {
            addIssue(issues, 'warning', 'empty-row', `Row ${displayRow} is empty and can be removed.`, displayRow, null, true);
            return;
        }

        const handle = valueAt(row, headerMap, 'Handle');
        if (handle) {
            const normalized = normalizeHandle(handle);
            if (normalized && normalized !== handle) {
                addIssue(
                    issues,
                    'warning',
                    'invalid-handle',
                    `Handle "${handle}" can be normalized to "${normalized}".`,
                    displayRow,
                    'Handle',
                    true,
                );
            }
        }

        BOOLEAN_HEADERS.forEach((header) => {
            const value = valueAt(row, headerMap, header);
            if (!value) return;
            const normalized = value.trim().toUpperCase();
            if (!['TRUE', 'FALSE'].includes(normalized)) {
                addIssue(
                    issues,
                    'error',
                    'invalid-boolean',
                    `${header} must be TRUE or FALSE, not "${value}".`,
                    displayRow,
                    header,
                );
            } else if (value !== normalized) {
                addIssue(
                    issues,
                    'info',
                    'boolean-format',
                    `${header} can be normalized to ${normalized}.`,
                    displayRow,
                    header,
                    true,
                );
            }
        });

        DECIMAL_HEADERS.forEach((header) => {
            const value = valueAt(row, headerMap, header).trim();
            if (!value) return;
            const number = Number(value);
            if (!Number.isFinite(number) || number < 0) {
                addIssue(
                    issues,
                    'error',
                    'invalid-number',
                    `${header} must be a non-negative number using a decimal point.`,
                    displayRow,
                    header,
                );
            }
        });

        INTEGER_HEADERS.forEach((header) => {
            const value = valueAt(row, headerMap, header).trim();
            if (!value || header === 'Variant Inventory Tracker') return;
            if (!Number.isInteger(Number(value))) {
                addIssue(
                    issues,
                    'error',
                    'invalid-integer',
                    `${header} must be a whole number.`,
                    displayRow,
                    header,
                );
            }
        });

        URL_HEADERS.forEach((header) => {
            const value = valueAt(row, headerMap, header).trim();
            if (value && !isValidUrl(value)) {
                addIssue(
                    issues,
                    'error',
                    'invalid-url',
                    `${header} must use a valid http:// or https:// URL.`,
                    displayRow,
                    header,
                );
            }
        });

        if (handle) {
            const key = variantKey(row, headerMap);
            if (seenVariants.has(key)) {
                addIssue(
                    issues,
                    'error',
                    'duplicate-variant',
                    `This product variant duplicates row ${seenVariants.get(key)}.`,
                    displayRow,
                );
            } else {
                seenVariants.set(key, displayRow);
            }
        }

        const sku = valueAt(row, headerMap, 'Variant SKU').trim().toLowerCase();
        if (sku) {
            if (seenSkus.has(sku)) {
                addIssue(
                    issues,
                    'warning',
                    'duplicate-sku',
                    `Variant SKU "${valueAt(row, headerMap, 'Variant SKU')}" also appears on row ${seenSkus.get(sku)}.`,
                    displayRow,
                    'Variant SKU',
                );
            } else {
                seenSkus.set(sku, displayRow);
            }
        }
    });

    const counts = issues.reduce(
        (result, issue) => ({ ...result, [issue.severity]: result[issue.severity] + 1 }),
        { error: 0, warning: 0, info: 0 },
    );

    return {
        issues,
        counts,
        rowCount: rows.length,
        productCount: new Set(
            rows.map((row) => valueAt(row, headerMap, 'Handle').trim().toLowerCase()).filter(Boolean),
        ).size,
        fixableCount: issues.filter((issue) => issue.fixable).length,
    };
}

/**
 * Apply only fixes that cannot change product meaning.
 */
export function repairShopifyCsv(document) {
    const headers = document.headers.map((header) => header.trim());
    const headerMap = indexHeaders(headers);
    const changes = [];
    const rows = document.rows
        .filter((row) => !row.every((value) => String(value ?? '').trim() === ''))
        .map((sourceRow, sourceIndex) => {
            const row = Array.from({ length: headers.length }, (_, index) => String(sourceRow[index] ?? ''));
            const displayRow = sourceIndex + 2;
            const handleIndex = headerMap.get('Handle');

            if (handleIndex !== undefined && row[handleIndex]) {
                const normalized = normalizeHandle(row[handleIndex]);
                if (normalized && normalized !== row[handleIndex]) {
                    changes.push({
                        row: displayRow,
                        column: 'Handle',
                        before: row[handleIndex],
                        after: normalized,
                    });
                    row[handleIndex] = normalized;
                }
            }

            BOOLEAN_HEADERS.forEach((header) => {
                const index = headerMap.get(header);
                if (index === undefined || !row[index]) return;
                const normalized = row[index].trim().toUpperCase();
                if (['TRUE', 'FALSE'].includes(normalized) && row[index] !== normalized) {
                    changes.push({ row: displayRow, column: header, before: row[index], after: normalized });
                    row[index] = normalized;
                }
            });

            return row;
        });

    return {
        headers,
        rows,
        csv: serializeCsv(headers, rows),
        changes,
    };
}

/**
 * Compare a current Shopify export with a proposed import without store access.
 */
export function compareCatalogs(currentDocument, proposedDocument) {
    const currentMap = indexHeaders(currentDocument.headers);
    const proposedMap = indexHeaders(proposedDocument.headers);

    if (!currentMap.has('Handle') || !proposedMap.has('Handle')) {
        throw new Error('Both files need a Handle column for comparison.');
    }

    const collect = (document, headerMap) => {
        const products = new Map();
        document.rows.forEach((row) => {
            const handle = valueAt(row, headerMap, 'Handle').trim().toLowerCase();
            if (!handle) return;
            if (!products.has(handle)) products.set(handle, new Set());
            products.get(handle).add(variantKey(row, headerMap));
        });
        return products;
    };

    const currentProducts = collect(currentDocument, currentMap);
    const proposedProducts = collect(proposedDocument, proposedMap);
    const sharedHandles = [...proposedProducts.keys()].filter((handle) => currentProducts.has(handle));
    const missingVariants = [];

    sharedHandles.forEach((handle) => {
        currentProducts.get(handle).forEach((key) => {
            if (!proposedProducts.get(handle).has(key)) {
                missingVariants.push({ handle, key });
            }
        });
    });

    return {
        existingProductsTouched: sharedHandles.length,
        newProducts: [...proposedProducts.keys()].filter((handle) => !currentProducts.has(handle)).length,
        missingVariants,
        currentProductsNotIncluded: [...currentProducts.keys()].filter((handle) => !proposedProducts.has(handle)).length,
    };
}
