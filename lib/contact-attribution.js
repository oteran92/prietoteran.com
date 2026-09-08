(() => {
    const key = 'contact-attribution-v1';
    const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    const allowedCtas = ['hero', 'audit', 'article-integration', 'calculator'];
    const clean = value => typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 160) : '';
    const current = new URL(location.href);
    let saved = {};
    try { saved = JSON.parse(sessionStorage.getItem(key)) || {}; } catch { /* Optional storage. */ }
    const data = {};
    for (const field of campaignKeys) data[field] = clean(saved[field]);
    data.landing_path = typeof saved.landing_path === 'string' && saved.landing_path.startsWith('/') ? saved.landing_path.slice(0, 300).split(/[?#]/)[0] : location.pathname;
    data.referrer_origin = '';
    try { data.referrer_origin = new URL(saved.referrer_origin || document.referrer).origin; } catch { /* Direct visit. */ }
    if (campaignKeys.some(field => current.searchParams.has(field))) {
        for (const field of campaignKeys) data[field] = clean(current.searchParams.get(field));
        data.landing_path = location.pathname;
    }
    data.cta_id = allowedCtas.includes(saved.cta_id) ? saved.cta_id : '';
    function persist() { try { sessionStorage.setItem(key, JSON.stringify(data)); } catch { /* Attribution must not block contact. */ } }
    function locale() { return ['en', 'de', 'es'].includes(document.documentElement.lang) ? document.documentElement.lang : 'en'; }
    function track(name, fields = {}) {
        if (typeof window.gtag === 'function') window.gtag('event', name, { form_id: 'contactForm', locale: locale(), cta_id: data.cta_id, ...fields });
    }
    persist();
    document.addEventListener('click', event => {
        const cta = event.target.closest('[data-contact-cta]');
        if (!cta || !allowedCtas.includes(cta.dataset.contactCta)) return;
        data.cta_id = cta.dataset.contactCta;
        persist();
        track('audit_cta_click');
    });
    window.contactAttribution = { get: () => ({ ...data, locale: locale() }), track };
})();
