/**
 * Global JavaScript for prietoteran.com
 * Author: Osmel Prieto Teran
 * Shared functionality across all pages
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initThemeToggle();
    initLanguageSelector();
});

/**
 * Initialize Navigation functionality
 * Handles mobile menu, scroll effects, and smooth scrolling
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navHamburger = document.getElementById('navHamburger');
    const navLinks = document.getElementById('navLinks');
    const langSelector = document.getElementById('langSelector');
    
    if (!nav || !navHamburger || !navLinks) return;
    
    // Mobile menu toggle
    navHamburger.addEventListener('click', () => {
        navHamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Show/hide language selector on mobile
        if (langSelector) {
            if (navLinks.classList.contains('active')) {
                langSelector.classList.add('mobile-visible');
            } else {
                langSelector.classList.remove('mobile-visible');
            }
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navHamburger.classList.remove('active');
            navLinks.classList.remove('active');
            if (langSelector) {
                langSelector.classList.remove('mobile-visible');
            }
        });
    });
    
    // Navigation scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Initialize Theme Toggle
 * Handles dark/light mode switching with localStorage persistence
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        if (newTheme === 'dark') {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }
        
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * Initialize Language Selector
 * Handles language dropdown and selection with i18n integration
 * Redirects to translated pages when available (blog posts, services)
 */
function initLanguageSelector() {
    const langSelector = document.getElementById('langSelector');
    const langToggle = document.getElementById('langToggle');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (!langSelector || !langToggle) return;
    
    /**
     * Update current language display
     */
    function updateLangDisplay(lang) {
        const currentLangCode = document.getElementById('currentLangCode');
        if (currentLangCode) {
            currentLangCode.textContent = lang.toUpperCase();
        }
        
        langOptions.forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });
    }
    
    /**
     * Get the translated URL for the current page
     * Handles blog posts, services, and index pages with proper redirection
     */
    function getTranslatedUrl(targetLang) {
        const currentPath = window.location.pathname;
        const currentLang = detectCurrentLanguage();
        
        // If already in the target language, no redirect needed
        if (currentLang === targetLang) {
            return null;
        }
        
        // Map of English blog slugs to translated slugs
        const blogTranslations = {
            'why-leaders-cant-trust-their-data': {
                'de': 'warum-fuehrungskraefte-ihren-daten-nicht-vertrauen',
                'es': 'por-que-los-lideres-no-confian-en-sus-datos'
            },
            'why-salesforce-erp-integrations-break': {
                'de': 'warum-salesforce-erp-integrationen-scheitern',
                'es': 'por-que-fallan-las-integraciones-salesforce-erp'
            },
            'the-real-cost-of-manual-data-entry': {
                'de': 'die-wahren-kosten-manueller-dateneingabe',
                'es': 'el-costo-real-de-la-entrada-manual-de-datos'
            },
            'quote-to-order-in-4-hours': {
                'de': 'von-angebot-zu-auftrag-in-4-stunden',
                'es': 'de-cotizacion-a-pedido-en-4-horas'
            }
        };
        
        // Reverse mappings for DE/ES -> EN
        const reverseTranslations = {};
        for (const [enSlug, translations] of Object.entries(blogTranslations)) {
            reverseTranslations[translations.de] = { slug: enSlug, lang: 'de' };
            reverseTranslations[translations.es] = { slug: enSlug, lang: 'es' };
        }
        
        // Detect if current page is a blog post
        const blogMatch = currentPath.match(/(?:\/(de|es))?\/blog\/([^/]+)\.html$/);
        if (blogMatch) {
            const pageLang = blogMatch[1] || 'en';
            const slug = blogMatch[2];
            
            // Find the English slug first
            let englishSlug = slug;
            if (pageLang !== 'en' && reverseTranslations[slug]) {
                englishSlug = reverseTranslations[slug].slug;
            }
            
            // Now get the target URL
            if (targetLang === 'en') {
                return `/blog/${englishSlug}.html`;
            } else if (blogTranslations[englishSlug] && blogTranslations[englishSlug][targetLang]) {
                return `/${targetLang}/blog/${blogTranslations[englishSlug][targetLang]}.html`;
            }
        }
        
        // Detect if current page is blog index
        const blogIndexMatch = currentPath.match(/(?:\/(de|es))?\/blog\/?(?:index\.html)?$/);
        if (blogIndexMatch) {
            if (targetLang === 'en') {
                return '/blog/';
            } else {
                return `/${targetLang}/blog/`;
            }
        }
        
        // Detect if current page is a service page
        const serviceMatch = currentPath.match(/(?:\/(de|es))?\/services\/(automation|integration)\.html$/);
        if (serviceMatch) {
            const serviceName = serviceMatch[2];
            if (targetLang === 'en') {
                return `/services/${serviceName}.html`;
            } else {
                return `/${targetLang}/services/${serviceName}.html`;
            }
        }
        
        // Detect if current page is the index/home
        const indexMatch = currentPath.match(/^(?:\/(de|es))?\/?(?:index\.html)?$/);
        if (indexMatch || currentPath === '/' || currentPath === '') {
            if (targetLang === 'en') {
                return '/';
            } else {
                return `/${targetLang}/`;
            }
        }
        
        // No translated version found, stay on current page
        return null;
    }
    
    /**
     * Detect the current page language based on URL path
     */
    function detectCurrentLanguage() {
        const path = window.location.pathname;
        if (path.startsWith('/de/')) return 'de';
        if (path.startsWith('/es/')) return 'es';
        return 'en';
    }
    
    // Initialize with current language from URL or i18n
    const urlLang = detectCurrentLanguage();
    if (typeof i18n !== 'undefined') {
        // Sync i18n with URL language
        if (i18n.getLanguage() !== urlLang) {
            i18n.setLanguage(urlLang);
        }
        updateLangDisplay(urlLang);
    } else {
        updateLangDisplay(urlLang);
    }
    
    // Toggle dropdown on button click
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langSelector.classList.toggle('open');
    });
    
    // Handle language selection with redirection
    langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.getAttribute('data-lang');
            
            // Check if we need to redirect to a translated page
            const translatedUrl = getTranslatedUrl(lang);
            
            if (translatedUrl) {
                // Save language preference before redirect
                localStorage.setItem('language', lang);
                window.location.href = translatedUrl;
                return;
            }
            
            // No redirect needed, just update translations on current page
            if (typeof i18n !== 'undefined') {
                i18n.setLanguage(lang);
            }
            
            updateLangDisplay(lang);
            langSelector.classList.remove('open');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langSelector.contains(e.target)) {
            langSelector.classList.remove('open');
        }
    });
    
    // Close dropdown on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            langSelector.classList.remove('open');
        }
    });
}

/**
 * Utility: Smooth scroll to element with offset
 * @param {string} targetId - ID of target element
 * @param {number} offset - Offset from top in pixels (default: 100)
 */
function smoothScrollTo(targetId, offset = 100) {
    const element = document.getElementById(targetId);
    if (!element) return;
    
    const offsetTop = element.offsetTop - offset;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

/**
 * Utility: Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export utilities for use in other scripts
window.smoothScrollTo = smoothScrollTo;
window.debounce = debounce;
