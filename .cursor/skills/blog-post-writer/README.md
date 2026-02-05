# Blog Post Writer Skill

Professional blog content creation for prietoteran.com B2B integration and automation business.

## What This Skill Does

Generates high-value blog posts that:
- Address real pain points of Swiss B2B companies
- Provide actionable insights readers can use immediately
- Build trust through expertise without overselling
- Drive qualified leads to contact you naturally
- Optimize for SEO in Swiss market (German + English)

## When to Use

The agent will automatically use this skill when you:
- Ask to write a blog post
- Request content about integration, automation, or B2B systems
- Need article ideas for your business
- Want to create thought leadership content

You can also explicitly trigger it by saying:
- "Let's write a blog post about..."
- "Create content for the blog about..."
- "I need a post that explains..."

## Quick Start

### To Create a New Post

**Simple approach:**
```
"Write a blog post about why Salesforce-ERP integrations break"
```

**Detailed approach:**
```
"Write a blog post about:
- Topic: Manual data entry between Salesforce and ERP
- Angle: The hidden costs
- Target: Operations managers
- Tone: Direct but helpful
- Include: A real example from a Swiss manufacturer"
```

### To Get Topic Ideas

```
"Give me 10 blog post ideas for Q2"
"What should I write about for technical decision-makers?"
"Topics that would appeal to CTOs in manufacturing"
```

### To Use a Template

```
"Use the Problem-Solution template for a post about integration failures"
"Create a case study post about [topic]"
"Write a myth-busting post about AI in B2B"
```

## File Structure

```
blog-post-writer/
├── SKILL.md              # Main instructions and guidelines
├── content-templates.md  # 4 proven post templates
├── topic-ideas.md        # 50+ validated post ideas
├── seo-guidelines.md     # Swiss market SEO optimization
├── image-prompts.md      # AI prompts for cover images
└── README.md            # This file
```

## Content Strategy

### Core Content Types

1. **Problem-Solution Posts** (Most common)
   - Start with specific pain point
   - Explain root cause
   - Provide framework/solution
   - Make reader feel understood

2. **Case Studies** (High conversion)
   - Anonymized real examples
   - Specific numbers and outcomes
   - What worked and what didn't
   - Lessons readers can apply

3. **Technical Guides** (Thought leadership)
   - Evaluation frameworks
   - Decision checklists
   - Architecture patterns
   - Risk assessment

4. **Myth-Busting** (Differentiation)
   - Challenge common assumptions
   - Provide evidence and alternatives
   - Position your approach
   - Build credibility

### Target Audience

**Primary:**
- CTOs and Technical Directors
- Operations Managers
- Process Owners
- IT Managers

**At companies:**
- Swiss B2B (10-500 employees)
- Manufacturing, wholesale, professional services
- Using or planning Salesforce + ERP

**Their problems:**
- Systems don't talk to each other
- Manual work eating team time
- Integrations break unexpectedly
- Fear of vendor lock-in
- Can't scale operations

## Writing Quality Standards

### Every post must have:
- [x] Specific, relatable opening scenario
- [x] Clear problem identification
- [x] Actionable insights (not just theory)
- [x] Concrete examples with numbers
- [x] Direct, confident voice
- [x] Natural CTA linking to contact form
- [x] Swiss market relevance
- [x] Cover image (1200x630px, < 200KB)
- [x] AI image prompt documented

### SEO Requirements:
- [x] Primary keyword in title and first paragraph
- [x] Meta description 150-160 characters
- [x] Proper header structure (H1, H2, H3)
- [x] Internal links to service pages
- [x] Schema.org BlogPosting markup

### Length Guidelines:
- **Optimal**: 800-1200 words
- **Minimum**: 600 words (for quick posts)
- **Maximum**: 1500 words (break longer into series)

## Examples of Good Posts

### Example 1: Problem-Solution
**Title**: "Why Your Salesforce-ERP Integration Breaks (And How to Fix It)"
- Opens with Monday morning scenario
- Explains architecture problems
- Provides 3-step solution framework
- Includes diagnostic questions
- Natural CTA about fixing integrations

### Example 2: Case Study
**Title**: "How a Swiss Manufacturer Cut Quote-to-Order Time by 85%"
- Anonymous company profile
- Specific challenge (3 days → 4 hours)
- What they tried first (and why it failed)
- The solution approach
- Measurable results
- Lessons for reader

### Example 3: Technical Guide
**Title**: "5 Questions to Ask Before Your Next Integration Project"
- Context on why decision matters
- Common mistakes to avoid
- 5 evaluation questions with examples
- Red flags to watch for
- Decision checklist
- Offer to help evaluate

## Customization Options

When requesting a post, you can specify:

**Tone:**
- More technical / Less technical
- More casual / More formal
- Longer / Shorter

**Focus:**
- Technical audience (CTOs)
- Business audience (Operations)
- Mixed audience (default)

**Language:**
- English (default)
- German (for Swiss market)

**Template:**
- Problem-Solution (default)
- Case Study
- Technical Guide
- Myth-Busting

## Integration with Website

### After Creating a Post

1. **Generate cover image prompt** from `image-prompts.md`
2. **Create image** using Midjourney/DALL-E (1200x630px)
3. **Optimize image** (< 200KB) and save to `/blog/images/`
4. **Create HTML file** in `/blog/` directory with cover image
5. **Update sitemap.xml** with new post
6. **Add to blog index page**
7. **Link from relevant service page**
8. **Share on LinkedIn** with excerpt and cover image

### File Naming
```
/blog/why-salesforce-erp-breaks.html
/blog/automate-quote-to-order.html
/blog/integration-vendor-questions.html
```

### Internal Linking Strategy
- Integration posts → link to `/services/integration.html`
- Automation posts → link to `/services/automation.html`
- Cross-link related blog posts

## Measured Success

### Good Post Indicators:
- Readers stay >2 minutes
- Multiple pages per session
- Contact form submissions increase
- Shares on LinkedIn
- Ranking for target keywords within 30 days

### Post Performance Review:
- Check GSC after 1 week (impressions)
- Check Analytics after 2 weeks (engagement)
- Update/improve based on data

## Tips for Best Results

1. **Be specific in your request**
   - Include target audience
   - Mention specific pain points
   - Share any relevant examples

2. **Review and personalize**
   - Generated posts are frameworks
   - Add your specific examples
   - Adjust tone to your voice
   - Verify technical accuracy

3. **Iterate if needed**
   - "Make this more technical"
   - "Simplify the opening"
   - "Add more concrete examples"
   - "Shorten to 800 words"

4. **Use the supporting files**
   - Browse topic-ideas.md for inspiration
   - Check templates for structure
   - Follow SEO guidelines for optimization

## Content Calendar Suggestions

### Monthly Rhythm:
- Week 1: Problem-solution post
- Week 2: Technical guide or case study
- Week 3: Swiss market-specific topic
- Week 4: Myth-busting or thought leadership

### Quarterly Focus:
- Q1: Planning and architecture
- Q2: Implementation and automation
- Q3: Optimization and scaling
- Q4: Review and future planning

## Need Help?

If the generated content isn't quite right:
- Be specific about what to change
- Provide examples of tone/style you prefer
- Share additional context about audience
- Request specific sections to expand/reduce

The skill learns from your feedback to better match your voice over time.

## Version History

- **v1.0** (Feb 2026): Initial skill creation
  - 4 content templates
  - 50+ topic ideas
  - Swiss market SEO guidelines
  - Full writing framework
