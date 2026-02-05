# Blog — prietoteran.com

This directory contains blog posts for the website. All posts are created using the `.cursor/skills/blog-post-writer/` skill.

## Directory Structure

```
blog/
├── index.html                                    # Blog landing page (list of all posts)
├── why-salesforce-erp-integrations-break.html   # Individual blog posts
└── README.md                                     # This file
```

## Creating a New Blog Post

### Using the Blog Post Writer Skill

1. **Activate the skill** in Cursor by asking:
   ```
   Use the blog-post-writer skill to create a post about [topic]
   ```

2. **Choose a template** (from `.cursor/skills/blog-post-writer/content-templates.md`):
   - Problem-Solution
   - Case Study
   - Technical Guide
   - Myth-Busting

3. **Select a topic** (see `.cursor/skills/blog-post-writer/topic-ideas.md` for validated ideas)

### After Creating a Post

1. **Update `index.html`**:
   - Add a new blog card with title, excerpt, date, and link
   - Move the new post to the top of the grid
   - Update "coming soon" placeholders if needed

2. **Update `sitemap.xml`** in root directory:
   ```xml
   <url>
       <loc>https://www.prietoteran.com/blog/your-post-slug.html</loc>
       <lastmod>YYYY-MM-DD</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
   </url>
   ```

3. **Update translations in `i18n.js`** (if post appears on homepage):
   - Add entries for `blog.postN.title` and `blog.postN.excerpt`
   - Update for all languages: English (en), German (de), Spanish (es)

4. **Test locally**:
   ```bash
   node server.js
   # Visit http://localhost:8080/blog/
   ```

5. **Request indexing** (after deployment):
   - Submit URL to Google Search Console
   - Share on LinkedIn (Osmel's profile)

## Blog Post Structure

Each blog post follows this HTML structure:

- **Meta tags**: SEO-optimized title, description, Open Graph, Twitter Card
- **Schema.org**: BlogPosting structured data
- **Navigation**: Simple nav with back link
- **Content**:
  - Article metadata (date, read time)
  - H1 title
  - Sections with H2/H3 headings
  - Highlight boxes for key points
  - CTA section (non-aggressive)
  - Related topics with internal links

## SEO Checklist

Before publishing each post:

- [ ] Title tag (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Focus keyword in title, first paragraph, and URL
- [ ] Internal links to service pages
- [ ] Alt text for images (if any)
- [ ] Schema.org BlogPosting markup
- [ ] Mobile-responsive design tested
- [ ] Read time calculated
- [ ] Canonical URL set

## Content Guidelines

**Tone**: Direct, practical, no hype
**Length**: 1,000-1,500 words (5-7 min read)
**Format**: 
- Start with specific scenario (hook)
- Include concrete numbers and examples
- Provide actionable takeaways
- End with soft CTA

**Target audience**:
- CTOs and technical leaders at Swiss B2B companies (50-500 employees)
- Operations managers dealing with system integration challenges

## Topics to Cover

See `.cursor/skills/blog-post-writer/topic-ideas.md` for a prioritized list of 50+ blog post ideas.

## Deployment

Blog posts are deployed as part of the main site. After creating a post:

1. Commit changes to git
2. Push to GitHub
3. Deploy (deployment method TBD)
4. Submit new URLs to Google Search Console

## Analytics

Track blog performance in Google Analytics:
- Page views
- Time on page
- Bounce rate
- Conversions (contact form submissions from blog)

---

**Last updated**: February 4, 2026
