#!/usr/bin/env node

/**
 * Generate localized static blog article pages from structured content sources.
 *
 * The site is still static HTML. This script reduces repetitive editing by
 * keeping article copy, metadata, slugs, image data, and social drafts in one
 * source module under content/blog/posts/.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const siteUrl = 'https://www.prietoteran.com';
const supportedLocales = ['en', 'de', 'es'];

const labels = {
  en: {
    currentLangCode: 'EN',
    navHow: 'Services',
    navBlog: 'Blog',
    navTools: 'Tools',
    navProjects: 'Projects',
    navContact: 'Contact',
    menuLabel: 'Toggle menu',
    themeLabel: 'Toggle theme',
    footerCopyright: '© 2026 Osmel Prieto Teran',
  },
  de: {
    currentLangCode: 'DE',
    navHow: 'Ablauf',
    navBlog: 'Blog',
    navTools: 'Tools',
    navProjects: 'Projekte',
    navContact: 'Kontakt',
    menuLabel: 'Menü öffnen',
    themeLabel: 'Design wechseln',
    footerCopyright: '© 2026 Osmel Prieto Teran',
  },
  es: {
    currentLangCode: 'ES',
    navHow: 'Servicios',
    navBlog: 'Blog',
    navTools: 'Herramientas',
    navProjects: 'Proyectos',
    navContact: 'Contacto',
    menuLabel: 'Alternar menú',
    themeLabel: 'Cambiar tema',
    footerCopyright: '© 2026 Osmel Prieto Teran',
  },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function absoluteUrl(filePath) {
  return `${siteUrl}/${filePath}`;
}

function relativeAssetPrefix(locale) {
  return locale === 'en' ? '../' : '../../';
}

function relativeImagePath(locale, imagePath) {
  return locale === 'en'
    ? path.posix.relative('blog', imagePath)
    : path.posix.relative(`${locale}/blog`, imagePath);
}

function relativeLocaleHref(currentLocale, targetFile) {
  const currentDir = currentLocale === 'en' ? 'blog' : `${currentLocale}/blog`;
  return path.posix.relative(currentDir, targetFile);
}

function renderLanguageOptions(post, currentLocale) {
  return supportedLocales.map((locale) => {
    const localized = post.locales[locale];
    const activeClass = locale === currentLocale ? ' active' : '';
    return `                            <a href="${relativeLocaleHref(currentLocale, post.slugs[locale])}" class="lang-option${activeClass}">
                                <span class="lang-code">${locale.toUpperCase()}</span>
                                <span class="lang-name">${escapeHtml(localized.langName)}</span>
                            </a>`;
  }).join('\n');
}

function renderRelatedLinks(post, locale) {
  const localized = post.locales[locale];
  return post.related[locale].map((link) => `                    <a href="${escapeHtml(link.href)}" class="article-related-link">
                        <span class="article-related-label" data-i18n="blog.article">${escapeHtml(localized.articleLabel)}</span>
                        <span class="article-related-title" data-i18n="${escapeHtml(link.titleKey)}">${escapeHtml(link.fallbackTitle)}</span>
                    </a>`).join('\n');
}

function renderJsonLd(post, locale) {
  const localized = post.locales[locale];
  const canonical = absoluteUrl(post.slugs[locale]);
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: localized.title,
    description: localized.description,
    image: absoluteUrl(post.image.path),
    inLanguage: locale,
    author: {
      '@type': 'Person',
      name: 'Osmel Prieto Teran',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Osmel Prieto Teran',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.svg`,
      },
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  }, null, 2).replace(/^/gm, '      ').trimStart();
}

function renderArticlePage(post, locale) {
  const localized = post.locales[locale];
  const text = labels[locale];
  const canonical = absoluteUrl(post.slugs[locale]);
  const prefix = relativeAssetPrefix(locale);
  const ogLocale = locale === 'de' ? '\n    <meta property="og:locale" content="de_CH">' : locale === 'es' ? '\n    <meta property="og:locale" content="es_ES">' : '';

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-WMG4SZNQ3L"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-WMG4SZNQ3L');
    </script>

    <!-- Primary SEO Meta Tags -->
    <title>${escapeHtml(localized.pageTitle)}</title>
    <meta name="description" content="${escapeHtml(localized.description)}">
    <meta name="author" content="Osmel Prieto Teran">
    <meta name="robots" content="index, follow">
    <meta name="keywords" content="${escapeHtml(localized.keywords)}">

    <!-- Canonical URL -->
    <link rel="canonical" href="${canonical}">

    <!-- Hreflang Tags -->
${supportedLocales.map((targetLocale) => `    <link rel="alternate" hreflang="${targetLocale}" href="${absoluteUrl(post.slugs[targetLocale])}">`).join('\n')}
    <link rel="alternate" hreflang="x-default" href="${absoluteUrl(post.slugs.en)}">

    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${canonical}">
    <meta property="og:title" content="${escapeHtml(localized.title)}">
    <meta property="og:description" content="${escapeHtml(localized.ogDescription)}">
    <meta property="og:image" content="${absoluteUrl(post.image.path)}">${ogLocale}

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(localized.title)}">
    <meta name="twitter:description" content="${escapeHtml(localized.twitterDescription)}">

    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    ${renderJsonLd(post, locale)}
    </script>

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="${prefix}favicon.svg">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Global Styles -->
    <link rel="stylesheet" href="${prefix}styles.css?v=11">
</head>
<body>
    <!-- Navigation -->
    <nav class="nav" id="nav">
        <div class="container">
            <div class="nav-inner">
                <a href="${localized.nav.home}" class="nav-logo">
                    <span>O</span>PT<span>.</span>
                </a>
                <div class="nav-right">
                    <button class="nav-hamburger" id="navHamburger" aria-label="${escapeHtml(text.menuLabel)}">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <ul class="nav-links" id="navLinks">
                        <li><a href="${localized.nav.how}" data-i18n="nav.how">${escapeHtml(text.navHow)}</a></li>
                        <li><a href="${localized.nav.blog}" data-i18n="nav.blog">${escapeHtml(text.navBlog)}</a></li>
                        <li><a href="${localized.nav.tools}" data-tools-link data-i18n="nav.tools">${escapeHtml(text.navTools)}</a></li>
                        <li><a href="${localized.nav.projects}" data-projects-link data-i18n="nav.projects">${escapeHtml(text.navProjects)}</a></li>
                        <li><a href="${localized.nav.contact}" data-i18n="nav.contact">${escapeHtml(text.navContact)}</a></li>
                    </ul>
                    <div class="lang-selector" id="langSelector">
                        <button class="lang-current" id="langToggle">
                            <span class="lang-code" id="currentLangCode">${text.currentLangCode}</span>
                            <span class="lang-arrow">
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                    <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </button>
                        <div class="lang-dropdown">
${renderLanguageOptions(post, locale)}
                        </div>
                    </div>
                    <button class="theme-toggle" id="themeToggle" aria-label="${escapeHtml(text.themeLabel)}">
                        <span class="icon-sun">☀</span>
                        <span class="icon-moon">☾</span>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Article Container -->
    <article class="article">
        <div class="container">
            <!-- Article Header -->
            <header class="article-header">
                <div class="article-meta">
                    <span class="article-category">${escapeHtml(localized.category)}</span>
                    <span class="article-divider">·</span>
                    <time datetime="${post.datePublished}">${escapeHtml(localized.displayDate)}</time>
                    <span class="article-divider">·</span>
                    <span class="article-reading-time">${escapeHtml(localized.readingTime)}</span>
                </div>
                <h1 class="article-title">${escapeHtml(localized.title)}</h1>
                <p class="article-intro">${escapeHtml(localized.intro)}</p>
            </header>
        </div>

        <!-- Cover Image - Full Width -->
        <div class="article-cover">
            <img src="${relativeImagePath(locale, post.image.path)}" alt="${escapeHtml(post.image.alt[locale])}">
        </div>

        <!-- Article Content -->
        <div class="container">
            <div class="article-content">${localized.body}
            </div>

            <!-- Simple CTA -->
            <div class="article-cta-simple">
                <a href="${localized.ctaHref}" class="article-cta-button" data-i18n="blog.cta.button">${escapeHtml(localized.ctaText)}</a>
            </div>

            <!-- Related Content -->
            <div class="article-related">
                <h4 data-i18n="blog.continueReading">${escapeHtml(localized.continueReading)}</h4>
                <div class="article-related-links">
${renderRelatedLinks(post, locale)}
                </div>
            </div>
        </div>
    </article>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-inner">
                <span class="footer-text" data-i18n="footer.copyright">${text.footerCopyright}</span>
                <div class="footer-links">
                    <a href="https://www.linkedin.com/in/osmel-p-teran-884480111/" target="_blank" rel="noopener">LinkedIn</a>
                    <a href="https://github.com/oteran92" target="_blank" rel="noopener">GitHub</a>
                    <a href="mailto:osmel@prietoteran.com">Email</a>
                    <a href="tel:+41791048885">+41 79 104 88 85</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- i18n Internationalization -->
    <script src="${prefix}i18n.js?v=2"></script>

    <!-- Global JavaScript -->
    <script src="${prefix}app.js?v=2"></script>
</body>
</html>
`;
}

async function loadPost(postId) {
  const sourcePath = path.join(rootDir, 'content', 'blog', 'posts', `${postId}.mjs`);
  const module = await import(pathToFileURL(sourcePath));
  return module.default;
}

function validatePostSource(post) {
  for (const locale of supportedLocales) {
    if (!post.locales[locale]) {
      throw new Error(`Missing locale "${locale}" for ${post.id}`);
    }
    if (!post.slugs[locale]) {
      throw new Error(`Missing slug for locale "${locale}" in ${post.id}`);
    }
  }
}

async function generatePost(postId) {
  const post = await loadPost(postId);
  validatePostSource(post);

  for (const locale of supportedLocales) {
    const outputPath = path.join(rootDir, post.slugs[locale]);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, renderArticlePage(post, locale));
    console.log(`Generated ${post.slugs[locale]}`);
  }
}

const postIds = process.argv.slice(2);
if (postIds.length === 0) {
  console.error('Usage: node tools/generate-blog-post.mjs <post-id> [post-id...]');
  process.exit(1);
}

for (const postId of postIds) {
  await generatePost(postId);
}
