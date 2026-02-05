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
    
    // Initialize with current language from i18n (if available)
    if (typeof i18n !== 'undefined') {
        updateLangDisplay(i18n.getLanguage());
    } else {
        updateLangDisplay('en');
    }
    
    // Toggle dropdown on button click
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langSelector.classList.toggle('open');
    });
    
    // Handle language selection
    langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const lang = opt.getAttribute('data-lang');
            
            // Use i18n manager if available
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
