// Free resource forms: email in, download link out. Any form with data-resource-form.
(() => {
    const t = key => window.i18n?.t(key) || key;
    const locale = () => (['de', 'es'].includes(document.documentElement.lang) ? document.documentElement.lang : 'en');
    document.querySelectorAll('[data-resource-form]').forEach(form => {
        const status = form.querySelector('[data-resource-status]');
        const button = form.querySelector('button[type=submit]');
        let busy = false;
        form.addEventListener('submit', async event => {
            event.preventDefault();
            if (busy || !form.reportValidity()) return;
            busy = true;
            button.disabled = true;
            button.dataset.state = 'busy';
            status.textContent = t('res.sending');
            status.dataset.state = '';
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 15000);
            try {
                const response = await fetch('/api/resource', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: form.elements.email.value.trim(),
                        resource: form.dataset.resourceForm,
                        locale: locale(),
                        attribution: window.contactAttribution?.get() || {},
                    }),
                    signal: controller.signal,
                });
                const result = await response.json();
                if (!response.ok || result.success !== true) throw new Error('Request not confirmed');
                status.textContent = t('res.success') + ' ';
                const link = document.createElement('a');
                link.href = result.downloadUrl;
                link.textContent = t('res.download');
                link.target = '_blank';
                link.rel = 'noopener';
                status.append(link);
                status.dataset.state = 'success';
                form.classList.add('is-done');
                window.gtag?.('event', 'generate_lead', { lead_type: 'resource', resource: form.dataset.resourceForm, locale: locale() });
            } catch (error) {
                status.textContent = t(error.name === 'AbortError' ? 'res.timeout' : 'res.error');
                status.dataset.state = 'error';
            } finally {
                clearTimeout(timer);
                busy = false;
                button.disabled = false;
                delete button.dataset.state;
                status.focus();
            }
        });
    });
})();
