# Estructura del Proyecto - prietoteran.com

## 📁 Arquitectura

El proyecto ha sido refactorizado para usar una arquitectura escalable con:

### 🎨 Estilos Globales
- **`styles.css`** - Todos los estilos compartidos entre páginas
  - Variables CSS (`:root`)
  - Tema claro y oscuro
  - Navegación
  - Footer
  - Componentes del blog
  - Estilos de artículos

### 💻 JavaScript Global
- **`app.js`** - Funcionalidad compartida
  - Navegación (mobile menu, scroll effects)
  - Theme toggle (dark/light mode)
  - Language selector
  - Utilidades (smooth scroll, debounce)

- **`i18n.js`** - Sistema de internacionalización
  - Traducciones EN, DE, ES
  - Gestión de idiomas
  - Persistencia en localStorage

## 📂 Estructura de Archivos

```
prietoteran.com/
├── styles.css              # Estilos globales compartidos
├── app.js                  # JavaScript global compartido
├── i18n.js                 # Sistema de internacionalización
├── index.html              # Página principal
├── components/             # Componentes reutilizables
│   ├── nav.html
│   └── footer.html
├── blog/                   # Sección del blog
│   ├── index.html          # Listado de artículos
│   ├── why-salesforce-erp-integrations-break.html
│   └── images/             # Imágenes de artículos
└── services/               # Páginas de servicios
    ├── automation.html
    └── integration.html
```

## 🔧 Cómo Usar los Archivos Globales

### En páginas HTML:

```html
<!-- En el <head> -->
<link rel="stylesheet" href="../styles.css">

<!-- Antes de cerrar </body> -->
<script src="../i18n.js"></script>
<script src="../app.js"></script>
```

### JavaScript específico de página:

Si necesitas JavaScript adicional para una página específica, agrégalo **después** de `app.js`:

```html
<script src="../app.js"></script>
<script>
    // Tu código específico de página aquí
    document.addEventListener('DOMContentLoaded', function() {
        // Código específico
    });
</script>
```

## 🎯 Ventajas de Esta Arquitectura

### ✅ Mantenibilidad
- **1 archivo CSS** en lugar de estilos duplicados en cada HTML
- Cambios globales se hacen en un solo lugar
- Reducción de ~700 líneas de código duplicado por página

### ✅ Escalabilidad
- Fácil agregar nuevas páginas
- Consistencia automática en toda la aplicación
- Preparado para traducciones profesionales

### ✅ Performance
- Los archivos CSS/JS se cachean en el navegador
- Menor tamaño de descarga para páginas subsecuentes
- Carga más rápida después de la primera visita

### ✅ Consistencia
- Todos los componentes se ven y funcionan igual
- Mismos estilos de navegación y footer en todas las páginas
- Experiencia de usuario coherente

## 🚀 Próximos Pasos para Escalar

### 1. Convertir a Build System (Opcional)
Si el proyecto crece mucho más, considera:
- **Vite/Parcel**: Para bundling y optimización
- **Sass/PostCSS**: Para estilos más avanzados
- **Components**: Usar Web Components o un framework

### 2. Para Traducciones Profesionales
El sistema i18n está listo para:
- Exportar strings a JSON/CSV para traducción
- Importar traducciones profesionales
- Agregar más idiomas fácilmente

### 3. Optimizaciones Futuras
- Minificación de CSS/JS para producción
- Code splitting por página
- Lazy loading de imágenes
- PWA capabilities

## 📝 Notas Importantes

### Estilos Específicos de Página
Si una página necesita estilos únicos, agrégalos en un `<style>` tag **después** del link a `styles.css`:

```html
<link rel="stylesheet" href="../styles.css">
<style>
    /* Estilos específicos solo para esta página */
    .mi-componente-unico {
        /* ... */
    }
</style>
```

### JavaScript Específico de Página
El mismo principio aplica para JavaScript - agrega tu código **después** de `app.js`.

## 🐛 Debugging

Si algo no funciona:

1. **Verifica la ruta** a styles.css y app.js
   - Desde `/blog/`: usa `../styles.css`
   - Desde `/`: usa `./styles.css`

2. **Verifica la consola** del navegador para errores JS

3. **Limpia caché** si hiciste cambios y no se reflejan:
   - Chrome/Firefox: `Cmd+Shift+R` (Mac) o `Ctrl+Shift+R` (Windows)

## 🎨 Personalización del Tema

Todos los colores y espaciados están definidos como variables CSS en `styles.css`:

```css
:root {
    --bg-primary: #FAFAFA;
    --text-primary: #1A1A1A;
    --accent: #B8860B;
    /* ... más variables */
}
```

Para cambiar el esquema de colores, simplemente modifica estas variables.

## 📞 Soporte

Para preguntas o problemas relacionados con la estructura del código:
- Revisa este README
- Consulta los comentarios en `styles.css` y `app.js`
- Los archivos están bien comentados en inglés
