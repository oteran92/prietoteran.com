(() => {
    const menu = document.getElementById('navLinks');
    const hamburger = document.getElementById('navHamburger');
    const languages = document.getElementById('langSelector');
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // The resources page has no collapsible menu.
    hamburger?.addEventListener('click', () => {
        const open = menu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(open));
    });
    const closeMenu = () => {
        menu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    };
    menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    // Tapping the dimmed page or pressing Escape closes the open menu.
    document.addEventListener('click', e => { if (menu?.classList.contains('active') && !document.getElementById('nav').contains(e.target)) closeMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu?.classList.contains('active')) { closeMenu(); hamburger.focus(); } });
    const langToggle = document.getElementById('langToggle');
    langToggle.addEventListener('click', () => langToggle.setAttribute('aria-expanded', String(languages.classList.toggle('open'))));
    document.addEventListener('click', e => {
        if (languages.contains(e.target)) return;
        languages.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
    });
    document.getElementById('themeToggle').addEventListener('click', () => {
        const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = theme;
        try { localStorage.setItem('theme', theme); } catch { /* Optional preference. */ }
    });

    // Blog cards per language: [article slug, thumbnail]. Spanish has its own article set.
    const posts = {
        en: [['ai-in-b2b-operations-what-actually-works', 'ai-in-b2b-operations-what-actually-works'], ['why-leaders-cant-trust-their-data', 'why-leaders-cant-trust-their-data'], ['integration-vendor-lock-in-control', 'integration-vendor-lock-in-control']],
        de: [['ki-im-b2b-betrieb-was-wirklich-funktioniert', 'ai-in-b2b-operations-what-actually-works'], ['warum-fuehrungskraefte-ihren-daten-nicht-vertrauen', 'why-leaders-cant-trust-their-data'], ['integration-vendor-lock-in-kontrolle', 'integration-vendor-lock-in-control']],
        es: [['por-que-los-lideres-no-confian-en-sus-datos', 'why-leaders-cant-trust-their-data'], ['por-que-fallan-las-integraciones-salesforce-erp', 'why-salesforce-erp-integrations-break'], ['vendor-lock-in-integraciones-control', 'integration-vendor-lock-in-control']]
    };

    // Hero headline as word spans for the entrance; the key word carries the progress underline.
    const heroTitle = document.querySelector('[data-hero-title]');
    function renderHeadline() {
        if (!heroTitle) return;
        const key = i18n.t('ts.hero.key').toLowerCase();
        heroTitle.replaceChildren(...i18n.t('ts.hero.title').split(' ').flatMap((word, i) => {
            const outer = document.createElement('span');
            const inner = document.createElement('span');
            outer.className = 'ts-word';
            inner.className = 'ts-word-in';
            inner.style.setProperty('--i', i);
            inner.textContent = word;
            outer.append(inner);
            if (word.toLowerCase().replace(/[.,]/g, '') === key) {
                outer.classList.add('ts-key');
                outer.insertAdjacentHTML('beforeend', '<span class="ts-key-bar" aria-hidden="true"></span>');
            }
            return i ? [' ', outer] : [outer];
        }));
    }

    function updateLanguage() {
        renderHeadline();
        const lang = i18n.getLanguage();
        const prefix = lang === 'en' ? '' : '/' + lang;
        document.getElementById('currentLangCode').textContent = lang.toUpperCase();
        document.querySelectorAll('.lang-option').forEach(o => o.setAttribute('aria-current', String(o.dataset.lang === lang)));
        document.querySelectorAll('[data-blog-index]').forEach(a => a.href = prefix + '/blog/');
        document.querySelectorAll('[data-resources-link]').forEach(a => a.href = '/recursos/?lang=' + lang);
        document.querySelectorAll('[data-resource-cover]').forEach(img => img.src = '/assets/studio/reglas-cover-' + lang + '.webp');
        document.querySelectorAll('[data-home-link]').forEach(a => a.href = '/' + (lang === 'en' ? '' : '?lang=' + lang) + (a.dataset.homeLink || ''));
        document.querySelectorAll('[data-blog-post]').forEach(a => {
            const [slug, image] = posts[lang][a.dataset.blogPost];
            a.href = prefix + '/blog/' + slug + '.html';
            a.querySelector('img').src = '/assets/studio/blog/' + image + '.webp';
        });
        // Each page names its meta keys (body data-meta) and its default language.
        const metaKey = document.body.dataset.meta || 'ts.meta';
        const defaultLang = document.body.dataset.defaultLang || 'en';
        const title = i18n.t(metaKey + '.title');
        const description = i18n.t(metaKey + '.description');
        const canonical = 'https://www.prietoteran.com' + location.pathname + (lang === defaultLang ? '' : '?lang=' + lang);
        document.title = title;
        document.querySelector('meta[name="description"]').content = description;
        document.querySelector('meta[property="og:title"]').content = title;
        document.querySelector('meta[property="og:description"]').content = description;
        document.querySelector('meta[property="og:locale"]').content = { en: 'en_US', de: 'de_CH', es: 'es_ES' }[lang];
        document.querySelector('meta[property="og:url"]').content = canonical;
        document.querySelector('link[rel="canonical"]').href = canonical;
    }
    document.querySelectorAll('.lang-option').forEach(button => button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        i18n.setLanguage(lang);
        const url = new URL(location.href);
        url.searchParams.set('lang', lang);
        history.replaceState(null, '', url);
        languages.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
        updateLanguage();
    }));
    updateLanguage();

    // Service cards preselect the matching interest in the contact form.
    document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
        const radio = document.querySelector(`#contactForm input[name="interest"][value="${link.dataset.interest}"]`);
        if (radio) radio.checked = true;
    }));

    // Run an effect once when its element scrolls into view.
    function onVisible(element, callback) {
        if (!('IntersectionObserver' in window)) return callback();
        const observer = new IntersectionObserver(entries => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            observer.disconnect();
            callback();
        }, { threshold: 0.35 });
        observer.observe(element);
    }
    document.querySelectorAll('[data-steps]').forEach(list => onVisible(list, () => list.classList.add('is-visible')));
    // The street lamp switches on the first time the About section is in view.
    document.querySelectorAll('[data-lamp]').forEach(lamp => onVisible(lamp, () => lamp.classList.add('is-lit')));

    // Hero map: data pulses travel from each system to the agent, then to the person who approves.
    const map = document.querySelector('[data-map]');
    if (!map) return;
    const links = [...map.querySelectorAll('.ts-map-lines path')];
    const systems = [...map.querySelectorAll('[data-map-node]')];
    const agent = map.querySelector('[data-map-agent]');
    const you = map.querySelector('[data-map-you]');
    const pulse = map.querySelector('[data-map-pulse]');
    const status = map.querySelector('[data-map-status]');
    // Swap the key (not just the text) so a language change keeps the right label.
    const setStatus = key => { status.dataset.i18n = key; status.textContent = i18n.t(key); };
    // Each step: link index, travel directions (1 = towards the agent), status key.
    const steps = [[0, [1], 'ts.map.s1'], [1, [-1, 1], 'ts.map.s2'], [2, [-1, 1], 'ts.map.s3'], [3, [-1, 1], 'ts.map.s4'], [4, [1], 'ts.map.s5']];
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    let visible = false;
    // The headline underline fills as each system is handled and completes on approval.
    const setProgress = value => heroTitle?.style.setProperty('--progress', value);

    // Move the pulse along one path; resolves when it arrives.
    const travel = (path, dir) => new Promise(resolve => {
        const length = path.getTotalLength();
        const t0 = performance.now();
        (function frame(now) {
            const k = Math.min((now - t0) / 750, 1);
            const eased = k < .5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
            const point = path.getPointAtLength(length * (dir > 0 ? eased : 1 - eased));
            pulse.setAttribute('cx', point.x);
            pulse.setAttribute('cy', point.y);
            k < 1 ? requestAnimationFrame(frame) : resolve();
        })(t0);
    });

    async function loop() {
        while (true) {
            if (!visible) { await wait(400); continue; }
            you.classList.remove('is-approved');
            heroTitle?.classList.remove('is-complete');
            setProgress(0);
            for (const [step, [index, dirs, key]] of steps.entries()) {
                setStatus(key);
                links[index].classList.add('is-active');
                systems[index]?.classList.add('is-active');
                agent.classList.add('is-busy');
                for (const dir of dirs) await travel(links[index], dir);
                links[index].classList.remove('is-active');
                systems[index]?.classList.remove('is-active');
                setProgress((step + 1) / steps.length);
                await wait(250);
            }
            agent.classList.remove('is-busy');
            you.classList.add('is-approved');
            heroTitle?.classList.add('is-complete');
            await wait(3200);
        }
    }

    if (reduceMotion) {
        // Static end state: every connection drawn, the person's approval shown.
        links.forEach(link => link.classList.add('is-active'));
        you.classList.add('is-approved');
        setStatus('ts.map.s5');
        setProgress(1);
        heroTitle?.classList.add('is-complete');
        document.querySelector('.ts-hero').classList.add('is-ready');
        return;
    }
    // Entrance first (headline words, copy, map), then the loop starts.
    requestAnimationFrame(() => document.querySelector('.ts-hero').classList.add('is-ready'));
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(map);
    setTimeout(() => { document.querySelector('.ts-hero').classList.add('is-settled'); loop(); }, 1500);
})();
