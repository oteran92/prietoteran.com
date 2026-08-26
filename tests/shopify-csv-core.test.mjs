import test from 'node:test';
import assert from 'node:assert/strict';

import {
    analyzeShopifyCsv,
    compareCatalogs,
    parseCsv,
    repairShopifyCsv,
    serializeCsv,
} from '../tools/shopify-csv-repair/shopify-csv-core.mjs';

test('parses quoted commas, escaped quotes and line breaks', () => {
    const document = parseCsv(
        'Handle,Title,Body (HTML)\r\nred-shirt,"Red, Shirt","Line one\nLine ""two"""\r\n',
    );

    assert.deepEqual(document.headers, ['Handle', 'Title', 'Body (HTML)']);
    assert.equal(document.rows.length, 1);
    assert.equal(document.rows[0][1], 'Red, Shirt');
    assert.equal(document.rows[0][2], 'Line one\nLine "two"');
});

test('serializes values without losing CSV-sensitive characters', () => {
    const csv = serializeCsv(
        ['Handle', 'Title'],
        [['mug', 'Mug, "Large"']],
    );

    assert.equal(csv, 'Handle,Title\r\nmug,"Mug, ""Large"""');
    assert.equal(parseCsv(csv).rows[0][1], 'Mug, "Large"');
});

test('detects malformed Shopify values and duplicate variants', () => {
    const document = parseCsv([
        'Handle,Title,Published,Variant SKU,Option1 Value,Variant Price,Image Src',
        'Blue Shirt,Blue Shirt,yes,SKU-1,Small,19.90,not-a-url',
        'Blue Shirt,Blue Shirt,TRUE,SKU-1,Small,-4,https://example.com/image.jpg',
    ].join('\n'));

    const result = analyzeShopifyCsv(document);
    const codes = result.issues.map((issue) => issue.code);

    assert.ok(codes.includes('invalid-handle'));
    assert.ok(codes.includes('invalid-boolean'));
    assert.ok(codes.includes('invalid-url'));
    assert.ok(codes.includes('invalid-number'));
    assert.ok(codes.includes('duplicate-variant'));
    assert.ok(codes.includes('duplicate-sku'));
});

test('applies only conservative handle and boolean fixes', () => {
    const document = parseCsv([
        'Handle,Title,Published,Variant Price',
        ' Café Mug ,Cafe Mug, true ,12.50',
    ].join('\n'));

    const repaired = repairShopifyCsv(document);
    const parsed = parseCsv(repaired.csv);

    assert.deepEqual(parsed.rows[0], ['cafe-mug', 'Cafe Mug', 'TRUE', '12.50']);
    assert.equal(repaired.changes.length, 2);
    assert.equal(analyzeShopifyCsv(parsed).counts.error, 0);
});

test('reports column width mismatches', () => {
    const document = parseCsv('Handle,Title,Published\nmug,Mug\n');
    const result = analyzeShopifyCsv(document);

    assert.equal(result.issues.find((issue) => issue.code === 'column-count')?.row, 2);
});

test('compares current and proposed variants without store credentials', () => {
    const current = parseCsv([
        'Handle,Title,Variant SKU,Option1 Value',
        'shirt,Shirt,SHIRT-S,Small',
        'shirt,Shirt,SHIRT-M,Medium',
        'mug,Mug,MUG-1,Default Title',
    ].join('\n'));
    const proposed = parseCsv([
        'Handle,Title,Variant SKU,Option1 Value',
        'shirt,Shirt,SHIRT-S,Small',
        'hat,Hat,HAT-1,Default Title',
    ].join('\n'));

    const comparison = compareCatalogs(current, proposed);

    assert.equal(comparison.existingProductsTouched, 1);
    assert.equal(comparison.newProducts, 1);
    assert.equal(comparison.missingVariants.length, 1);
    assert.equal(comparison.currentProductsNotIncluded, 1);
});

test('rejects unclosed quoted fields', () => {
    assert.throws(() => parseCsv('Handle,Title\nmug,"Broken'), /unclosed quoted field/);
});
