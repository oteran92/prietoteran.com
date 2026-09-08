(() => {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const status = document.getElementById('formStatus');
    const button = form.querySelector('.btn-submit');
    const text = button.querySelector('.btn-text');
    const loading = button.querySelector('.btn-loading');
    const track = (name, fields) => window.contactAttribution?.track(name, fields);
    const translate = key => window.i18n?.t(key) || 'Please contact osmel@prietoteran.com.';
    let busy = false;
    form.addEventListener('input', () => track('contact_form_start'), { once: true });
    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (busy || !form.reportValidity()) return;
        busy = true;
        button.disabled = true;
        form.setAttribute('aria-busy', 'true');
        text.hidden = true;
        loading.hidden = false;
        status.textContent = '';
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        const payload = Object.fromEntries(['name', 'email', 'company', 'message'].map(name => [name, form.elements[name].value.trim()]));
        payload.attribution = window.contactAttribution?.get() || {};
        track('contact_form_attempt');
        let category = 'network';
        try {
            const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: controller.signal });
            category = 'server';
            const result = await response.json();
            if (!response.ok || result.success !== true) throw new Error('Submission not confirmed');
            status.textContent = translate('form.success');
            status.dataset.state = 'success';
            form.reset();
            track('contact_form_submit');
        } catch (error) {
            const timedOut = error.name === 'AbortError';
            status.textContent = translate(timedOut ? 'form.timeout' : 'form.error');
            status.dataset.state = 'error';
            track('contact_form_error', { error_category: timedOut ? 'timeout' : category });
        } finally {
            clearTimeout(timer);
            busy = false;
            button.disabled = false;
            form.removeAttribute('aria-busy');
            text.hidden = false;
            loading.hidden = true;
            status.focus();
        }
    });
})();
