# prietoteran.com

Sitio estático con un servidor Express para formularios y herramientas. Las páginas HTML existentes se conservan; no hay un framework nuevo.

## Diseño compartido

- `design-system.css`: tokens de Teran Studio (Helvetica Neue, azul `#2457FF`, tinta `#111C32`; ver `DESIGN.md`), colores claros/oscuros, espaciado, radios y patrones compartidos de navegación, botones, formularios, tarjetas, artículos y pie.
- `styles.css`: estructuras de artículos, calculadora y componentes existentes.
- `home.css`: portada y `/recursos/` (clases `ts-`). Se carga después de `design-system.css`.
- `tools/shopify-csv-repair/tool.css`: estructura de la herramienta CSV.
- `tools-menu.css`: comportamiento visual del desplegable de herramientas.

En artículos y herramientas, cargar primero las hojas de estructura, después `tools-menu.css` con el atributo `data-tools-menu-style`, y al final `design-system.css`. Los tokens de marca tienen una sola fuente: `design-system.css`. Evitar estilos de navegación o paletas independientes dentro de las páginas.

Tipografía: Helvetica Neue; titulares 700-800 en la portada. JetBrains Mono queda para código y metadatos breves. El título principal usa un máximo de 56 px en la portada; los artículos y herramientas, 50 px. Contenedores generales: 1160 px; lectura: 720 px. Radios: 5 px en controles y 10 px en tarjetas.

## Cabecera, idiomas y pie

`lib/site-shell.mjs` exporta `renderNavigation(locale, languageOptions)` y `renderFooter(locale)`. El generador de artículos usa estas funciones. Los HTML entregados al navegador ya contienen el resultado: no dependen de una petición adicional para mostrar la navegación.

`components/nav.html` y `components/footer.html` son referencias estáticas para páginas manuales. Mantener los IDs utilizados por los scripts (`nav`, `navLinks`, `navHamburger`, `langSelector`, `langToggle`, `themeToggle`). Los enlaces `data-home-section` apuntan a secciones reales de la portada y se actualizan con el idioma.

Los enlaces de idioma en artículos y herramientas usan las traducciones disponibles, mediante URLs explícitas. No anunciar una traducción inexistente. La portada y `/recursos/` existen en EN, DE y ES: `studio-copy.js` define `window.pageLanguages` y `window.pageTranslations`, que `i18n.js` fusiona. Un idioma no disponible (p. ej. FR) cae en EN sin guardarse. La guía PDF tiene un archivo por idioma (`lib/resource-request.js`), generado con `teranstudio-ig/recursos/reglas/build.py`. Prioridad: `?lang=`, preferencia guardada, navegador.

## JavaScript

- `app.js`: navegación, tema e idiomas en artículos y herramientas.
- `home.js`: portada y `/recursos/`: navegación, metadatos y enlaces localizados, demo de aprobación (deslizar o Enter) y línea de progreso.
- `tools-menu.js`: desplegable compartido y estados accesibles.
- `i18n.js`: textos EN/DE/ES y localización de enlaces.
- `lib/contact-attribution.js`, `lib/contact-form.js`: atribución de sesión, envío y estados del formulario.
- `lib/contact-submission.js`: validación del servidor, escape de los datos del correo, CTAs permitidos e interés opcional (`review`, `workshop`, `build`, `unsure`).
- `lib/resource-form.js` y `lib/resource-request.js`: `POST /api/resource` envía el PDF por email al suscriptor (Graph), avisa a `EMAIL_TO` y devuelve el enlace de descarga. Sin base de datos.
- `lib/private-paths.js`: la raíz del repo es la raíz estática; este filtro devuelve 404 para carpetas con punto (`.cursor` contiene datos de leads), notas, código del servidor y exportaciones.

## Contenido

`tools/generate-blog-post.mjs` genera artículos localizados desde `content/blog/posts/`. Los artículos anteriores que no tienen un módulo de origen se mantienen como HTML manual.

La portada no nombra empleadores: la experiencia se describe de forma anónima ("una empresa industrial en Suiza"). No son referencias de clientes. No añadir ahorros, porcentajes ni resultados comerciales sin respaldo.

## Comprobaciones

```sh
npm test
npm run generate:blog -- integration-vendor-lock-in-control
npm run validate:content -- integration-vendor-lock-in-control
npm run validate:funnel -- integration-vendor-lock-in-control
```

Tras un cambio compartido, revisar portada, índice del blog, artículo, calculadora y herramienta CSV en escritorio y móvil, incluyendo un idioma traducido y el tema oscuro. Las pruebas de correo deben distinguir una respuesta local simulada de la entrega real en producción.
