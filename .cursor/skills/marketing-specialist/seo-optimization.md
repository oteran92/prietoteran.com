# SEO Optimization Guide

## Overview

This guide provides data-driven SEO optimization strategies using Google Search Console and Google Analytics data. Focus on actionable improvements that drive qualified traffic to prietoteran.com.

## Quick Wins Framework

### What is a Quick Win?

A quick win is a keyword/page combination where:
- Current position: 4-20 (on page 1-2 of Google)
- Impressions: 100+ (people are searching)
- CTR: Below expected for position
- Effort: Low to medium (title/meta changes vs. content rewrite)

### Expected CTR by Position

| Position | Expected CTR | Below Average |
|----------|--------------|---------------|
| 1 | 25-35% | <20% |
| 2 | 15-20% | <12% |
| 3 | 10-15% | <8% |
| 4-5 | 5-10% | <4% |
| 6-10 | 2-5% | <2% |
| 11-20 | 1-2% | <0.5% |

### Using detect_quick_wins MCP Tool

The `detect_quick_wins` tool from Search Console MCP automatically identifies opportunities:

```
Parameters:
- site_url: "https://www.prietoteran.com"
- days: 28 (or 7 for recent data)
- min_impressions: 50
- max_position: 20
- max_ctr: 0.02 (2%)
```

---

## Optimization Strategies by Opportunity Type

### Type 1: Low CTR, Good Position (4-10)

**Diagnosis:** Page ranks well but doesn't attract clicks.

**Causes:**
- Title tag doesn't match search intent
- Meta description not compelling
- Missing rich snippets
- Competitors have better SERP features

**Solutions:**

1. **Title Tag Optimization**
   ```
   Before: "Salesforce ERP Integration - Osmel Prieto Teran"
   After: "Why Salesforce-ERP Integrations Fail (And How to Fix It) | 2026 Guide"
   
   Improvements:
   - Added "Why" (curiosity)
   - Added "Fail" (pain point)
   - Added "How to Fix" (solution)
   - Added year (freshness)
   ```

2. **Meta Description Optimization**
   ```
   Before: "Learn about Salesforce ERP integration services in Switzerland."
   After: "Most integrations break in 2-4 weeks. Learn the 3 architecture principles 
           that prevent failures—based on 14+ Swiss B2B projects. Free consultation."
   
   Improvements:
   - Specific stat (2-4 weeks)
   - Concrete promise (3 principles)
   - Credibility (14+ projects)
   - CTA (Free consultation)
   ```

3. **Schema Markup (if applicable)**
   - Add FAQ schema for informational content
   - Add HowTo schema for guides
   - Add Article schema for blog posts

### Type 2: High Impressions, Low Clicks, Position 11-20

**Diagnosis:** Good topic, but content isn't ranking high enough.

**Solutions:**

1. **Content Depth Analysis**
   - Compare word count to top 3 ranking pages
   - Identify subtopics covered by competitors but not you
   - Add missing sections

2. **Content Freshness**
   - Update statistics and examples
   - Add recent case studies
   - Update publication date (if substantially changed)

3. **Internal Linking**
   - Link from higher-ranking pages
   - Use descriptive anchor text
   - Create topic clusters

4. **Technical Improvements**
   - Improve Core Web Vitals
   - Optimize images
   - Enhance mobile experience

### Type 3: Rising Keywords (Trending Up)

**Diagnosis:** Keywords gaining impressions—opportunity to capture growth.

**Solutions:**

1. **Content Expansion**
   - Create dedicated content for trending topics
   - Expand existing content to cover new angles
   - Update to include trending terminology

2. **Internal Linking**
   - Point existing authority pages to new content
   - Create hub pages for topic clusters

---

## Page-by-Page Optimization Checklist

### Title Tag (< 60 characters)
- [ ] Primary keyword near the beginning
- [ ] Includes emotional trigger or number
- [ ] Unique across all pages
- [ ] Matches search intent
- [ ] Includes brand (if space allows)

### Meta Description (< 155 characters)
- [ ] Includes primary keyword naturally
- [ ] Has clear value proposition
- [ ] Includes a CTA
- [ ] Unique and compelling
- [ ] Matches page content

### H1 Tag
- [ ] One H1 per page
- [ ] Includes primary keyword
- [ ] Clearly describes page content
- [ ] Different from title tag (but related)

### Content Structure
- [ ] Logical heading hierarchy (H2, H3, H4)
- [ ] Short paragraphs (3-4 sentences max)
- [ ] Bulleted/numbered lists where appropriate
- [ ] Key points in bold
- [ ] Images with descriptive alt text

### Internal Linking
- [ ] Links to relevant service pages
- [ ] Links to related blog posts
- [ ] Descriptive anchor text (not "click here")
- [ ] Links from high-authority pages

### Technical SEO
- [ ] Page loads in < 3 seconds
- [ ] Mobile-friendly design
- [ ] No broken links
- [ ] Proper canonical tags
- [ ] XML sitemap updated

---

## Keyword Strategy

### Primary Target Keywords

**Service-related:**
- salesforce erp integration
- salesforce erp integration switzerland
- b2b process automation
- erp crm integration

**Problem-related:**
- salesforce integration problems
- erp integration failures
- manual data entry costs
- quote to order automation

**Solution-related:**
- fix salesforce integration
- automate salesforce erp
- integration consultant switzerland

### Keyword Expansion Process

1. **Start with Search Console data**
   - Export all queries with impressions
   - Group by topic/intent
   - Identify gaps

2. **Analyze search intent**
   - Informational: "why do integrations fail"
   - Commercial: "salesforce erp integration cost"
   - Transactional: "salesforce integration consultant"

3. **Map keywords to content**
   - 1 primary keyword per page
   - 3-5 secondary/related keywords
   - Answer related questions

---

## Content Gap Analysis

### Process

1. **Export top queries from Search Console**
2. **Group by topic cluster**
3. **Identify questions not answered**
4. **Prioritize by search volume and relevance**

### Content Gaps to Address (Examples)

| Topic | Missing Content | Priority |
|-------|-----------------|----------|
| Integration | Specific ERP guides (SAP, Abacus) | High |
| Automation | ROI calculator | High |
| Process | Industry-specific use cases | Medium |
| Technical | API vs Middleware comparison | Medium |

---

## Monitoring & Reporting

### Weekly Check
- Position changes for target keywords
- New keywords ranking
- CTR changes for top pages
- Quick wins identification

### Monthly Analysis
- Overall organic traffic trend
- Conversion tracking
- Competitor position comparison
- Content performance review

### Quarterly Review
- Keyword strategy refresh
- Content audit
- Technical SEO audit
- Link building assessment

---

## SEO Tools Integration

### Using Search Console MCP

**Get page performance:**
```
Tool: search_analytics
Parameters:
  dimensions: ["page"]
  startDate: "2026-01-01"
  endDate: "2026-02-04"
  rowLimit: 50
```

**Get query performance:**
```
Tool: search_analytics
Parameters:
  dimensions: ["query"]
  startDate: "2026-01-01"
  endDate: "2026-02-04"
  rowLimit: 100
```

**Get combined data:**
```
Tool: enhanced_search_analytics
Parameters:
  dimensions: ["query", "page"]
  startDate: "2026-01-01"
  endDate: "2026-02-04"
  rowLimit: 500
```

### Recommended Actions Format

When recommending SEO improvements, use this format:

```markdown
## SEO Recommendation: [Page Name]

**Current Status:**
- Position: X
- Impressions: X
- CTR: X%
- Target Keyword: [keyword]

**Issues Identified:**
1. [Issue 1]
2. [Issue 2]

**Recommended Actions:**
1. **[Action 1]**
   - Current: [current state]
   - Recommended: [new state]
   - Expected Impact: [High/Medium/Low]

2. **[Action 2]**
   - Current: [current state]
   - Recommended: [new state]
   - Expected Impact: [High/Medium/Low]

**Priority:** [High/Medium/Low]
**Estimated Effort:** [Hours]
```
