(() => {
    const menu = document.getElementById('navLinks');
    const hamburger = document.getElementById('navHamburger');
    const languages = document.getElementById('langSelector');
    hamburger.addEventListener('click', () => {
        const open = menu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        menu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }));
    document.getElementById('langToggle').addEventListener('click', () => languages.classList.toggle('open'));
    document.addEventListener('click', e => { if (!languages.contains(e.target)) languages.classList.remove('open'); });
    document.getElementById('themeToggle').addEventListener('click', () => {
        const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = theme;
        try { localStorage.setItem('theme', theme); } catch { /* Optional preference. */ }
    });
    const slugs = {
        en: ['why-salesforce-erp-integrations-break', 'the-real-cost-of-manual-data-entry', 'integration-vendor-lock-in-control'],
        de: ['warum-salesforce-erp-integrationen-scheitern', 'die-wahren-kosten-manueller-dateneingabe', 'integration-vendor-lock-in-kontrolle'],
        es: ['por-que-fallan-las-integraciones-salesforce-erp', 'el-costo-real-de-la-entrada-manual-de-datos', 'vendor-lock-in-integraciones-control']
    };
    const meta = {
        en: ['Salesforce & ERP Integration | Osmel Prieto Teran', 'Reduce manual work between Salesforce and your ERP. Independent engineer in Bern. Start with a 90-minute audit and written recommendation for 450 EUR.'],
        de: ['Salesforce & ERP Integration | Osmel Prieto Teran', 'Weniger Handarbeit zwischen Salesforce und ERP. Unabhängiger Engineer in Bern. 90-minütiges Audit mit schriftlicher Empfehlung für 450 EUR.'],
        es: ['Integración Salesforce y ERP | Osmel Prieto Teran', 'Reduce el trabajo manual entre Salesforce y tu ERP. Ingeniero independiente en Berna. Auditoría de 90 minutos con recomendación escrita por 450 EUR.']
    };
    function updateLanguage() {
        const lang = i18n.getLanguage();
        document.getElementById('currentLangCode').textContent = lang.toUpperCase();
        i18n.updateLanguageSelector();
        const prefix = lang === 'en' ? '' : '/' + lang;
        document.querySelector('[data-blog-index]').href = prefix + '/blog/';
        document.querySelector('.site-nav a[data-i18n="nav.blog"]').href = prefix + '/blog/';
        document.querySelectorAll('[data-blog-post]').forEach((a, i) => a.href = prefix + '/blog/' + slugs[lang][i] + '.html');
        document.title = meta[lang][0];
        document.querySelector('meta[name="description"]').content = meta[lang][1];
        document.querySelector('meta[property="og:title"]').content = meta[lang][0];
        document.querySelector('meta[property="og:description"]').content = meta[lang][1];
        document.querySelector('meta[property="og:locale"]').content = {en:'en_US', de:'de_CH', es:'es_ES'}[lang];
        const canonical = 'https://www.prietoteran.com/' + (lang === 'en' ? '' : '?lang=' + lang);
        document.querySelector('link[rel="canonical"]').href = canonical;
        document.querySelector('meta[property="og:url"]').content = canonical;
    }
    document.querySelectorAll('.lang-option').forEach(button => button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        i18n.setLanguage(lang);
        const url = new URL(location.href);
        url.searchParams.set('lang', lang);
        history.replaceState(null, '', url);
        languages.classList.remove('open');
        updateLanguage();
    }));
    updateLanguage();
})();
