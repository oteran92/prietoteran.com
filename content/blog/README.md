# Blog content pipeline

This directory holds structured source files for generated blog posts.

## Current scope

The first generated post is:

```bash
npm run generate:blog -- integration-vendor-lock-in-control
npm run validate:content -- integration-vendor-lock-in-control
npm run validate:funnel -- integration-vendor-lock-in-control
```

The generator currently creates the localized article pages for English, German,
and Spanish from one source module in `content/blog/posts/`.
The funnel validator checks that the post maps to a commercial stage, content
pillar, buyer roles, business objective, and next step.

## Weekly workflow

1. Add a new source module under `content/blog/posts/`.
2. Include localized slugs, metadata, body HTML, image briefing, related links,
   and five LinkedIn drafts.
3. Run the generator.
4. Update the blog indexes, homepage card, `i18n.js`, and `sitemap.xml`.
5. Run the content validator, funnel validator, and repository tests.

This keeps the copy and SEO metadata in one place while the site remains static.

## Funnel strategy

The commercial content strategy lives in:

```txt
content/marketing/funnel-strategy.json
```

It defines:

- short-term goals for consistent content and search visibility,
- medium-term goals for diagnostic content paths,
- long-term goals for a quiet sales funnel,
- funnel stages from awareness to conversion,
- content pillars for integration control, automation, data reliability, and
  technical leadership.
