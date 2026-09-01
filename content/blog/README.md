# Blog content pipeline

This directory holds structured source files for generated blog posts.

## Current scope

The first generated post is:

```bash
npm run generate:blog -- integration-vendor-lock-in-control
npm run validate:content -- integration-vendor-lock-in-control
```

The generator currently creates the localized article pages for English, German,
and Spanish from one source module in `content/blog/posts/`.

## Weekly workflow

1. Add a new source module under `content/blog/posts/`.
2. Include localized slugs, metadata, body HTML, image briefing, related links,
   and five LinkedIn drafts.
3. Run the generator.
4. Update the blog indexes, homepage card, `i18n.js`, and `sitemap.xml`.
5. Run the content validator and the repository tests.

This keeps the copy and SEO metadata in one place while the site remains static.
