#!/usr/bin/env node

/**
 * Validate generated blog content without adding external dependencies.
 *
 * The checks focus on the failure points that make weekly content expensive:
 * missing locale pages, broken local links, inconsistent hreflang, missing
 * sitemap entries, malformed JSON-LD, oversized metadata, and weak social drafts.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const siteUrl = 'https://www.prietoteran.com';
const supportedLocales = ['en', 'de', 'es'];
const failures = [];

function fail(message) {
  failures.push(message);
}

function assert(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function absoluteUrl(filePath) {
  return `${siteUrl}/${filePath}`;
}

function stripUrlParts(value) {
  return value.split('#')[0].split('?')[0];
}

function getHtmlRefs(html) {
  return [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
}

function validateLocalRefs(html, filePath) {
  const absoluteFile = path.join(rootDir, filePath);
  for (const ref of getHtmlRefs(html)) {
    if (/^(https?:|mailto:|tel:|\/)/.test(ref)) {
      continue;
    }
    const cleanRef = stripUrlParts(ref);
    if (!cleanRef) {
      continue;
    }
    let localPath = path.normalize(path.join(path.dirname(absoluteFile), cleanRef));
    if (cleanRef.endsWith('/') || (fs.existsSync(localPath) && fs.statSync(localPath).isDirectory())) {
      localPath = path.join(localPath, 'index.html');
    }
    assert(localPath.startsWith(rootDir), `${filePath} has escaping local ref: ${ref}`);
    assert(fs.existsSync(localPath), `${filePath} missing local ref: ${ref}`);
  }
}

function extractJsonLd(html, filePath) {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert(Boolean(match), `${filePath} missing JSON-LD`);
  if (!match) {
    return null;
  }
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    fail(`${filePath} has invalid JSON-LD: ${error.message}`);
    return null;
  }
}

function readJpegDimensions(imagePath) {
  const buffer = fs.readFileSync(imagePath);
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }
    offset += 2 + length;
  }
  throw new Error(`Could not read JPEG dimensions for ${imagePath}`);
}

function validateImage(post) {
  const imagePath = path.join(rootDir, post.image.path);
  assert(fs.existsSync(imagePath), `${post.id} missing image: ${post.image.path}`);
  if (!fs.existsSync(imagePath)) {
    return;
  }
  const size = fs.statSync(imagePath).size;
  assert(size < 200_000, `${post.id} image should be under 200KB, got ${size} bytes`);
  if (post.image.path.endsWith('.jpg') || post.image.path.endsWith('.jpeg')) {
    const dimensions = readJpegDimensions(imagePath);
    assert(dimensions.width === 1200 && dimensions.height === 630, `${post.id} image should be 1200x630, got ${dimensions.width}x${dimensions.height}`);
  }
}

function validateLinkedInDrafts(post) {
  assert(Array.isArray(post.linkedinDrafts), `${post.id} missing LinkedIn drafts`);
  assert(post.linkedinDrafts.length === 5, `${post.id} should have 5 LinkedIn drafts`);
  const canonicalUrl = absoluteUrl(post.slugs.en);

  for (const draft of post.linkedinDrafts) {
    assert(draft.status === 'Draft', `${post.id} ${draft.day} LinkedIn draft must have Draft status`);
    assert(!draft.text.includes('—'), `${post.id} ${draft.day} LinkedIn draft contains an em dash`);
    const lines = draft.text.trim().split('\n');
    assert(lines.length >= 3 && lines.length <= 6, `${post.id} ${draft.day} LinkedIn draft must be 3-6 lines`);
    const lastLine = lines.at(-1);
    assert(lastLine.startsWith(canonicalUrl), `${post.id} ${draft.day} LinkedIn draft must end with canonical English URL`);
    const hashtagCount = (lastLine.match(/#[A-Za-z0-9]+/g) || []).length;
    assert(hashtagCount >= 3 && hashtagCount <= 5, `${post.id} ${draft.day} LinkedIn draft needs 3-5 hashtags`);
  }
}

function validateGeneratedPage(post, locale) {
  const filePath = post.slugs[locale];
  const absolutePath = path.join(rootDir, filePath);
  assert(fs.existsSync(absolutePath), `${post.id} missing ${locale} page: ${filePath}`);
  if (!fs.existsSync(absolutePath)) {
    return;
  }

  const html = fs.readFileSync(absolutePath, 'utf8');
  const localized = post.locales[locale];
  const canonical = absoluteUrl(filePath);

  assert(html.includes(`<html lang="${locale}">`), `${filePath} has wrong html lang`);
  assert(html.includes(`<link rel="canonical" href="${canonical}">`), `${filePath} has wrong canonical`);
  assert(html.includes(`<title>${localized.pageTitle}</title>`), `${filePath} has wrong title`);
  assert(localized.title.length <= 60, `${filePath} title should be under 60 characters`);
  assert(localized.description.length <= 160, `${filePath} meta description should be under 160 characters`);
  assert(!html.includes('—'), `${filePath} contains an em dash`);

  for (const targetLocale of supportedLocales) {
    assert(html.includes(`hreflang="${targetLocale}" href="${absoluteUrl(post.slugs[targetLocale])}"`), `${filePath} missing hreflang ${targetLocale}`);
  }
  assert(html.includes(`hreflang="x-default" href="${absoluteUrl(post.slugs.en)}"`), `${filePath} missing x-default hreflang`);

  const jsonLd = extractJsonLd(html, filePath);
  if (jsonLd) {
    assert(jsonLd.headline === localized.title, `${filePath} JSON-LD headline mismatch`);
    assert(jsonLd.description === localized.description, `${filePath} JSON-LD description mismatch`);
    assert(jsonLd.inLanguage === locale, `${filePath} JSON-LD language mismatch`);
    assert(jsonLd.mainEntityOfPage?.['@id'] === canonical, `${filePath} JSON-LD canonical mismatch`);
  }

  validateLocalRefs(html, filePath);
}

function validateSitemap(post) {
  const sitemapPath = path.join(rootDir, 'sitemap.xml');
  assert(fs.existsSync(sitemapPath), 'sitemap.xml missing');
  if (!fs.existsSync(sitemapPath)) {
    return;
  }
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  for (const locale of supportedLocales) {
    const url = absoluteUrl(post.slugs[locale]);
    assert(sitemap.includes(`<loc>${url}</loc>`), `sitemap missing loc ${url}`);
    assert(sitemap.includes(`hreflang="${locale}" href="${url}"`), `sitemap missing alternate ${url}`);
  }
  assert(sitemap.includes(`hreflang="x-default" href="${absoluteUrl(post.slugs.en)}"`), `sitemap missing x-default for ${post.id}`);
}

function validateIndexes(post) {
  const indexFiles = ['index.html', 'blog/index.html', 'de/blog/index.html', 'es/blog/index.html'];
  for (const filePath of indexFiles) {
    const html = fs.readFileSync(path.join(rootDir, filePath), 'utf8');
    const hasSlug = supportedLocales.some((locale) => html.includes(path.basename(post.slugs[locale])));
    assert(hasSlug, `${filePath} missing ${post.id}`);
  }
}

async function loadPost(postId) {
  const sourcePath = path.join(rootDir, 'content', 'blog', 'posts', `${postId}.mjs`);
  const module = await import(pathToFileURL(sourcePath));
  return module.default;
}

function validatePostSource(post) {
  assert(Boolean(post.id), 'post source missing id');
  assert(Boolean(post.datePublished), `${post.id} missing datePublished`);
  assert(Boolean(post.dateModified), `${post.id} missing dateModified`);
  for (const locale of supportedLocales) {
    assert(Boolean(post.slugs?.[locale]), `${post.id} missing ${locale} slug`);
    assert(Boolean(post.locales?.[locale]), `${post.id} missing ${locale} locale data`);
    assert(Boolean(post.image?.alt?.[locale]), `${post.id} missing ${locale} image alt text`);
    assert(Boolean(post.related?.[locale]?.length), `${post.id} missing ${locale} related links`);
  }
}

async function main() {
  const postIds = process.argv.slice(2);
  if (postIds.length === 0) {
    console.error('Usage: node tools/validate-content.mjs <post-id> [post-id...]');
    process.exit(1);
  }

  for (const postId of postIds) {
    const post = await loadPost(postId);
    validatePostSource(post);
    validateImage(post);
    validateLinkedInDrafts(post);
    validateSitemap(post);
    validateIndexes(post);
    for (const locale of supportedLocales) {
      validateGeneratedPage(post, locale);
    }
  }

  if (failures.length > 0) {
    console.error(failures.join('\n'));
    process.exit(1);
  }

  console.log(`Content validation passed for ${postIds.join(', ')}`);
}

await main();
