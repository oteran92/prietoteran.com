# prietoteran.com

Sitio estático con un servidor Express para formularios y herramientas. Las páginas HTML existentes se conservan; no hay un framework nuevo.

## Diseño compartido

- `design-system.css`: fuente Inter, colores claros/oscuros, espaciado, radios y patrones compartidos de navegación, botones, formularios, tarjetas, artículos y pie.
- `styles.css`: estructuras de artículos, calculadora y componentes existentes.
- `home.css`: estructura específica de la portada.
- `tools/shopify-csv-repair/tool.css`: estructura de la herramienta CSV.
- `tools-menu.css`: comportamiento visual del desplegable de herramientas.

Cargar primero las hojas de estructura, después `tools-menu.css` con el atributo `data-tools-menu-style`, y al final `design-system.css`. Los tokens de marca tienen una sola fuente: `design-system.css`. Evitar estilos de navegación o paletas independientes dentro de las páginas.

Tipografía: Inter 400 para lectura, 500 para títulos y acciones, 600 para énfasis. JetBrains Mono queda para código y metadatos breves. El título principal usa un máximo de 56 px en la portada; los artículos y herramientas, 50 px. Contenedores generales: 1160 px; lectura: 720 px. Radios: 5 px en controles y 10 px en tarjetas.

## Cabecera, idiomas y pie

`lib/site-shell.mjs` exporta `renderNavigation(locale, languageOptions)` y `renderFooter(locale)`. El generador de artículos usa estas funciones. Los HTML entregados al navegador ya contienen el resultado: no dependen de una petición adicional para mostrar la navegación.

`components/nav.html` y `components/footer.html` son referencias estáticas para páginas manuales. Mantener los IDs utilizados por los scripts (`nav`, `navLinks`, `navHamburger`, `langSelector`, `langToggle`, `themeToggle`). Los enlaces `data-home-section` apuntan a secciones reales de la portada y se actualizan con el idioma.

Los enlaces de idioma en artículos y herramientas usan las traducciones disponibles, mediante URLs explícitas. No anunciar una traducción inexistente. La portada cambia sus textos mediante `i18n.js` y prioriza el parámetro `?lang=`.

## JavaScript

- `app.js`: navegación, tema e idiomas en artículos y herramientas.
- `home.js`: comportamiento de la portada y sus metadatos/enlaces localizados.
- `tools-menu.js`: desplegable compartido y estados accesibles.
- `i18n.js`: textos EN/DE/ES y localización de enlaces.
- `lib/contact-attribution.js`, `lib/contact-form.js`: atribución de sesión, envío y estados del formulario.
- `lib/contact-submission.js`: validación del servidor y escape de los datos del correo.

## Contenido

`tools/generate-blog-post.mjs` genera artículos localizados desde `content/blog/posts/`. Los artículos anteriores que no tienen un módulo de origen se mantienen como HTML manual.

Victory y Silent Gliss se presentan como experiencia laboral, con proyectos confirmados por Osmel. No son referencias de clientes independientes. No añadir ahorros, porcentajes ni resultados comerciales sin respaldo.

## Comprobaciones

```sh
npm test
npm run generate:blog -- integration-vendor-lock-in-control
npm run validate:content -- integration-vendor-lock-in-control
npm run validate:funnel -- integration-vendor-lock-in-control
```

Tras un cambio compartido, revisar portada, índice del blog, artículo, calculadora y herramienta CSV en escritorio y móvil, incluyendo un idioma traducido y el tema oscuro. Las pruebas de correo deben distinguir una respuesta local simulada de la entrega real en producción.
