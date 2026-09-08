// Shared static markup for existing pages and the article generator.
const labels = {
  en: { audit: 'The audit', about: 'About', blog: 'Blog', tools: 'Tools', contact: 'Request audit', language: 'Language', theme: 'Switch color theme', menu: 'Menu', projects: 'Independent projects' },
  de: { audit: 'Das Audit', about: 'Über mich', blog: 'Blog', tools: 'Tools', contact: 'Audit anfragen', language: 'Sprache', theme: 'Farbschema wechseln', menu: 'Menü', projects: 'Eigene Projekte' },
  es: { audit: 'La auditoría', about: 'Sobre mí', blog: 'Blog', tools: 'Herramientas', contact: 'Solicitar auditoría', language: 'Idioma', theme: 'Cambiar tema', menu: 'Menú', projects: 'Proyectos propios' }
};

export function renderNavigation(locale = 'en', languageOptions = '') {
  const text = labels[locale] || labels.en;
  const home = '/' + (locale === 'en' ? '' : '?lang=' + locale);
  return `<nav class="nav site-nav" id="nav" aria-label="${text.menu}">
  <div class="site-container nav-inner">
    <a class="brand nav-logo" href="${home}">osmel<span> / </span>prieto teran</a>
    <div class="nav-right">
      <ul class="nav-links" id="navLinks">
        <li><a href="${home}#how" data-home-section="how" data-i18n="nav.how">${text.audit}</a></li>
        <li><a href="${home}#about" data-home-section="about" data-i18n="nav.about">${text.about}</a></li>
        <li><a href="${locale === 'en' ? '' : '/' + locale}/blog/" data-i18n="nav.blog">${text.blog}</a></li>
        <li><a href="${locale === 'de' ? '/de/tools/erp-crm-roi-rechner.html' : '/tools/erp-crm-roi-calculator.html'}" data-tools-link data-i18n="nav.tools">${text.tools}</a></li>
        <li><a href="${home}#contact" class="nav-cta" data-home-section="contact" data-contact-cta="audit" data-i18n="nav.contact">${text.contact}</a></li>
      </ul>
      <div class="lang-selector" id="langSelector">
        <button class="lang-toggle lang-current" id="langToggle" type="button" aria-expanded="false" aria-label="${text.language}" data-i18n-aria="ui.language"><span id="currentLangCode">${locale.toUpperCase()}</span><span aria-hidden="true">⌄</span></button>
        <div class="lang-dropdown">${languageOptions}</div>
      </div>
      <button class="theme-toggle" id="themeToggle" type="button" aria-label="${text.theme}" data-i18n-aria="ui.theme"><span aria-hidden="true">◐</span></button>
      <button class="nav-hamburger" id="navHamburger" type="button" aria-expanded="false" aria-controls="navLinks" aria-label="${text.menu}" data-i18n-aria="ui.menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</nav>`;
}

export function renderFooter(locale = 'en') {
  const text = labels[locale] || labels.en;
  return `<footer class="site-footer" id="projects"><div class="site-container footer-inner">
    <span>© 2026 Osmel Prieto Teran · Bern</span>
    <div class="footer-links"><a href="https://www.linkedin.com/in/osmel-p-teran-884480111/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="mailto:osmel@prietoteran.com">Email</a><a href="https://eroica.io" target="_blank" rel="noopener noreferrer"><span data-i18n="footer.projects">${text.projects}</span>: eroica.io ↗</a></div>
  </div></footer>`;
}
