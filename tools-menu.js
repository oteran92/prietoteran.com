/**
 * Shared Tools navigation dropdown.
 * Enhances the existing Tools link without changing the navbar markup on every page.
 */
(function initializeToolsMenuScript() {
    const toolLabels = {
        en: {
            roi: 'ERP–CRM ROI Calculator',
            csv: 'Shopify CSV Repair',
        },
        de: {
            roi: 'ERP–CRM ROI-Rechner',
            csv: 'Shopify CSV Repair',
        },
        es: {
            roi: 'Calculadora ROI ERP–CRM',
            csv: 'Reparador CSV de Shopify',
        },
    };

    function getLanguage() {
        const language = document.documentElement.lang?.slice(0, 2);
        return toolLabels[language] ? language : 'en';
    }

    function updateDropdown(dropdown) {
        const labels = toolLabels[getLanguage()];
        const roiLink = dropdown.querySelector('[data-tool-option="roi"]');
        const csvLink = dropdown.querySelector('[data-tool-option="csv"]');

        roiLink.textContent = labels.roi;
        roiLink.href = getLanguage() === 'de'
            ? '/de/tools/erp-crm-roi-rechner.html'
            : '/tools/erp-crm-roi-calculator.html';
        csvLink.textContent = labels.csv;
        csvLink.href = '/tools/shopify-csv-repair/';
    }

    function closeMenu(menu, trigger) {
        menu.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        if (!document.querySelector('.tools-menu.open')) {
            document.body.classList.remove('tools-dropdown-open');
        }
    }

    function enhanceToolsLink(originalTrigger) {
        const menu = originalTrigger.closest('li');
        if (!menu || menu.classList.contains('tools-menu')) return;

        // Use a button so opening the dropdown does not trigger page-link close handlers.
        const trigger = document.createElement('button');
        [...originalTrigger.attributes].forEach((attribute) => {
            if (attribute.name !== 'href') {
                trigger.setAttribute(attribute.name, attribute.value);
            }
        });
        trigger.type = 'button';
        trigger.textContent = originalTrigger.textContent;
        originalTrigger.replaceWith(trigger);

        menu.classList.add('tools-menu');
        trigger.classList.add('tools-menu-trigger');
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const willOpen = !menu.classList.contains('open');
            document.querySelectorAll('.tools-menu.open').forEach((openMenu) => {
                const openTrigger = openMenu.querySelector('.tools-menu-trigger');
                if (openTrigger) closeMenu(openMenu, openTrigger);
            });
            menu.classList.toggle('open', willOpen);
            trigger.setAttribute('aria-expanded', String(willOpen));
            document.body.classList.toggle('tools-dropdown-open', willOpen);
        });

        const dropdown = document.createElement('ul');
        dropdown.className = 'tools-dropdown';
        dropdown.setAttribute('aria-label', 'Available tools');
        dropdown.innerHTML = `
            <li><a data-tool-option="roi"></a></li>
            <li><a data-tool-option="csv"></a></li>
        `;
        updateDropdown(dropdown);
        menu.append(dropdown);

        dropdown.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                closeMenu(menu, trigger);
                document.getElementById('navHamburger')?.classList.remove('active');
                document.getElementById('navLinks')?.classList.remove('active');
            });
        });

        const languageObserver = new MutationObserver(() => updateDropdown(dropdown));
        languageObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang'],
        });
    }

    function initialize() {
        if (!document.querySelector('link[data-tools-menu-style]')) {
            const stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.href = '/tools-menu.css';
            stylesheet.dataset.toolsMenuStyle = 'true';
            document.head.append(stylesheet);
        }

        document.querySelectorAll('[data-tools-link]').forEach(enhanceToolsLink);

        document.addEventListener('click', (event) => {
            document.querySelectorAll('.tools-menu.open').forEach((menu) => {
                if (!menu.contains(event.target)) {
                    const trigger = menu.querySelector('.tools-menu-trigger');
                    if (trigger) closeMenu(menu, trigger);
                }
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            document.querySelectorAll('.tools-menu.open').forEach((menu) => {
                const trigger = menu.querySelector('.tools-menu-trigger');
                if (trigger) {
                    closeMenu(menu, trigger);
                    trigger.focus();
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    } else {
        initialize();
    }
}());
