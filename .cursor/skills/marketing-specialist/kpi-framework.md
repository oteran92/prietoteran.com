# KPI Framework for B2B Marketing

## Overview

This framework defines the Key Performance Indicators (KPIs) for measuring marketing success for prietoteran.com. All metrics are designed to track progress toward the primary goal: generating qualified leads for Salesforce-ERP integration and automation services.

## KPI Categories

### 1. Visibility KPIs (Awareness)

| KPI | Definition | Target | Data Source | Frequency |
|-----|------------|--------|-------------|-----------|
| Organic Sessions | Visits from search engines | +10% MoM | Google Analytics | Weekly |
| Total Impressions | Times site appeared in search | +15% MoM | Search Console | Weekly |
| Keyword Coverage | Keywords ranking top 20 | 50+ keywords | Search Console | Monthly |
| Brand Searches | Searches for "prietoteran" | +5% MoM | Search Console | Monthly |

### 2. Engagement KPIs (Interest)

| KPI | Definition | Target | Data Source | Frequency |
|-----|------------|--------|-------------|-----------|
| Average CTR | Click-through rate from search | > 3% | Search Console | Weekly |
| Pages per Session | Depth of site exploration | > 2.0 | Google Analytics | Weekly |
| Avg. Session Duration | Time spent on site | > 2:00 min | Google Analytics | Weekly |
| Bounce Rate | Single-page sessions | < 60% | Google Analytics | Weekly |
| Blog Read Rate | Scrolled to end of article | > 40% | Google Analytics | Per post |

### 3. Conversion KPIs (Action)

| KPI | Definition | Target | Data Source | Frequency |
|-----|------------|--------|-------------|-----------|
| Contact Form Submissions | Completed contact forms | 5+/month | Google Analytics | Weekly |
| Email Clicks | Clicks on email link | Track all | Google Analytics | Weekly |
| Phone Clicks | Clicks on phone number | Track all | Google Analytics | Weekly |
| Service Page Views | Views of service pages | +10% MoM | Google Analytics | Weekly |

### 4. SEO Quality KPIs

| KPI | Definition | Target | Data Source | Frequency |
|-----|------------|--------|-------------|-----------|
| Average Position | Mean search ranking | < 15 | Search Console | Weekly |
| Top 10 Keywords | Keywords in positions 1-10 | 20+ | Search Console | Monthly |
| Quick Win Count | Keywords pos 4-20, CTR < 2% | Reduce by 50% | Search Console | Monthly |
| Indexed Pages | Pages in Google index | All published | Search Console | Monthly |

## Measurement Workflows

### Weekly Dashboard

```
Every Monday:
1. Pull GA data for previous 7 days
   - Sessions by source
   - Top pages by views
   - Goal completions

2. Pull GSC data for previous 7 days
   - Top queries by clicks
   - Top pages by impressions
   - Average position trend

3. Compare to previous week
   - Highlight wins (>10% improvement)
   - Flag concerns (>10% decline)

4. Update market-intelligence.json with insights
```

### Monthly Report Structure

```markdown
# Monthly Marketing Report - [Month Year]

## Executive Summary
- Key wins this month
- Areas needing attention
- Recommendations for next month

## Traffic Performance
- Total sessions: X (+Y% vs last month)
- Organic sessions: X (+Y%)
- Direct sessions: X (+Y%)

## Search Performance
- Total impressions: X
- Total clicks: X
- Average CTR: X%
- Average position: X

## Top Performing Content
1. [Page 1] - X sessions, Y conversions
2. [Page 2] - X sessions, Y conversions
3. [Page 3] - X sessions, Y conversions

## Keyword Performance
- New keywords ranking: X
- Keywords improved: X
- Keywords declined: X

## Conversion Performance
- Contact form submissions: X
- Email clicks: X
- Phone clicks: X

## Quick Win Opportunities
| Keyword | Position | Impressions | Current CTR | Action |
|---------|----------|-------------|-------------|--------|

## Recommendations
1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]
```

## Using MCP Tools for KPI Tracking

### Google Analytics Queries

**Weekly Traffic Report:**
```json
{
  "dimensions": ["date"],
  "metrics": ["sessions", "users", "newUsers", "bounceRate"],
  "dateRange": "last7days"
}
```

**Top Pages:**
```json
{
  "dimensions": ["pagePath"],
  "metrics": ["sessions", "avgSessionDuration", "bounceRate"],
  "dateRange": "last30days",
  "orderBy": "sessions",
  "limit": 20
}
```

**Traffic Sources:**
```json
{
  "dimensions": ["sessionSource", "sessionMedium"],
  "metrics": ["sessions", "conversions"],
  "dateRange": "last30days"
}
```

### Search Console Queries

**Top Queries:**
```json
{
  "dimensions": ["query"],
  "startDate": "2026-01-01",
  "endDate": "2026-02-04",
  "rowLimit": 100
}
```

**Page Performance:**
```json
{
  "dimensions": ["page"],
  "startDate": "2026-01-01", 
  "endDate": "2026-02-04",
  "rowLimit": 50
}
```

**Quick Wins Detection:**
Use `detect_quick_wins` tool with default parameters to find:
- Keywords in positions 4-20
- High impressions (>100)
- Low CTR (<2%)

## Target Setting Guidelines

### Realistic Targets for New Site

**Month 1-3 (Foundation):**
- Focus on indexation and crawlability
- Target: 500+ organic sessions/month
- Target: 20+ keywords in top 50

**Month 4-6 (Growth):**
- Focus on content expansion
- Target: 1000+ organic sessions/month
- Target: 10+ keywords in top 20

**Month 7-12 (Scale):**
- Focus on conversion optimization
- Target: 2000+ organic sessions/month
- Target: 5+ contact form submissions/month

### Benchmark Comparisons

| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| Organic CTR | <1% | 1-3% | 3-5% | >5% |
| Bounce Rate | >80% | 60-80% | 40-60% | <40% |
| Session Duration | <0:30 | 0:30-1:30 | 1:30-3:00 | >3:00 |
| Pages/Session | <1.5 | 1.5-2.0 | 2.0-3.0 | >3.0 |

## Alert Thresholds

Set alerts for significant changes:

| Metric | Alert Threshold | Action |
|--------|-----------------|--------|
| Organic traffic drop | >20% WoW | Investigate technical issues |
| Position drop | >5 positions | Review content, check competitors |
| CTR drop | >30% | Check SERP changes, update meta |
| Indexation issues | Any deindexed | Check Search Console for errors |
| Spike in 404s | >10/day | Fix broken links |
