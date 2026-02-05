# Email Personalization Guide

## Why Personalization Matters

Generic emails get ignored. Personalized emails start conversations.

**Generic email response rate:** 1-3%
**Personalized email response rate:** 10-20%

The difference is whether the reader thinks "this is for me" or "this is a mass email."

---

## Levels of Personalization

### Level 1: Basic (Minimum Required)
- First name
- Company name
- Role/title

**Example:**
```
Hi Thomas,
I work with CTOs at companies like Weber Manufacturing...
```

### Level 2: Contextual (Standard)
- Industry-specific pain point
- Company size awareness
- Technology mentions

**Example:**
```
Hi Thomas,
Many manufacturing CTOs I work with mention their 
quote-to-order process taking 3+ days...
```

### Level 3: Deep (High Priority Leads)
- Specific company observation
- Recent trigger event
- Personal detail (career, post, etc.)

**Example:**
```
Hi Thomas,
I noticed Weber Manufacturing is hiring an Operations 
Manager — often a sign that manual processes are 
becoming a bottleneck as you scale...
```

---

## Personalization Sources

### From leads.json

| Field | How to Use |
|-------|------------|
| `company.name` | Always include correctly |
| `company.industry` | Tailor pain points and examples |
| `company.size` | Scale-appropriate language |
| `company.tech_stack` | Reference specific systems |
| `company.pain_points` | Address directly |
| `company.research_notes` | Find unique angles |
| `contact.name` | First name in greeting |
| `contact.title` | Role-appropriate framing |

### From market-intelligence.json

| Field | How to Use |
|-------|------------|
| `top_performing_content` | Share relevant blog posts |
| `trending_keywords` | Use language that resonates |
| `pain_points_by_role` | Match pain point to their role |

### From Research

| Source | What to Find |
|--------|--------------|
| LinkedIn | Recent posts, job changes, mutual connections |
| Company website | Recent news, product launches, careers page |
| Job postings | Technology mentions, pain point hints |
| News | Press releases, funding, expansions |

---

## Opening Line Formulas

The opening line is the most important sentence. It proves you did your research.

### Formula 1: Observation + Implication

```
"I noticed [specific observation] — that often means [implication]."
```

**Examples:**
- "I noticed Müller AG is hiring two Integration Developers — that often means your systems aren't talking to each other as well as they should."
- "I noticed Weber Manufacturing expanded to a second location last quarter — that often puts pressure on processes that worked fine before."

### Formula 2: Trigger Event Reference

```
"I saw [event] — [connection to why you're reaching out]."
```

**Examples:**
- "I saw Weber Manufacturing just implemented Salesforce — congratulations! The next challenge is usually connecting it to your existing ERP."
- "I saw your post about digital transformation priorities — integration is often the piece that makes or breaks those initiatives."

### Formula 3: Mutual Connection

```
"[Connection name] suggested I reach out — [why]."
```

**Example:**
- "Stefan from Acme AG suggested I reach out — he mentioned you're dealing with similar Salesforce-SAP challenges."

### Formula 4: Content Engagement

```
"I noticed you [engagement action] — [follow-up thought]."
```

**Example:**
- "I noticed you liked a post about ERP modernization — curious if you're exploring how to better connect your systems."

### Formula 5: Career Event

```
"Congratulations on [career event] — [relevant connection]."
```

**Example:**
- "Congratulations on the CTO role at Weber Manufacturing — those first 90 days often reveal the integration debt the company has accumulated."

---

## Pain Point Personalization

### By Industry

**Manufacturing:**
- Quote-to-order delays
- Inventory visibility gaps
- Production planning disconnect
- Manual data entry between systems

**Wholesale/Distribution:**
- Stock level inaccuracy
- Credit check delays
- Pricing tier management
- Order modification friction

**B2B Services:**
- Project creation duplication
- Time tracking to invoicing gap
- Resource allocation visibility
- Client data fragmentation

### By Role

**CTO/VP Engineering:**
- Technical debt language
- Architecture concerns
- Maintenance burden
- Team productivity

**COO/VP Operations:**
- Efficiency metrics
- Error rates
- Scaling without headcount
- Process visibility

**Operations Manager:**
- Day-to-day friction
- Team workload
- Fire-fighting time
- Workaround fatigue

---

## Personalization Don'ts

### Don't Be Creepy
```
❌ "I saw photos of your family vacation to Italy..."
✓ "I noticed your post about automation challenges..."
```

### Don't Over-Personalize
```
❌ "I noticed you went to ETH Zürich, worked at three 
    companies, and recently posted about automation..."
✓ "I noticed Müller AG is hiring for integration roles..."
```

### Don't Fake It
```
❌ "I've been following Müller AG for years..." (when you haven't)
✓ "I came across Müller AG while researching manufacturing companies..."
```

### Don't Be Generic While Claiming Personalization
```
❌ "I was specifically thinking about Müller AG because 
    you're a company that might benefit from integration..."
✓ "I noticed Müller AG uses both Salesforce and SAP — 
    keeping those in sync is either seamless or a daily headache."
```

---

## Personalization Checklist

Before sending, verify:

### Opening Line
- [ ] Is specific to them (not generic)
- [ ] Based on real observation
- [ ] Not creepy or over-personal
- [ ] Creates natural connection to message

### Pain Point
- [ ] Relevant to their role
- [ ] Relevant to their industry
- [ ] Specific enough to resonate
- [ ] Based on research (not assumption)

### Social Proof
- [ ] Similar company type
- [ ] Similar industry
- [ ] Believable result
- [ ] Specific numbers

### Content/Value
- [ ] Relevant to their situation
- [ ] Actually useful (not just promotional)
- [ ] Matches their pain point

### CTA
- [ ] Appropriate for relationship stage
- [ ] Easy to say yes to
- [ ] Not pushy

---

## Quick Personalization Hacks

### When Short on Time

1. **LinkedIn scan (2 min)**
   - Recent post or activity
   - Job change
   - Mutual connections

2. **Company website (2 min)**
   - About page for industry context
   - Careers page for pain point hints
   - Recent news

3. **Quick Google (1 min)**
   - "[Company name] news"
   - "[Company name] [technology]"

### When No Obvious Hook

Use industry + role defaults:
```
"Many [industry] [role]s I work with mention 
[common pain point for that combo]..."
```

This is honest — you're not faking specific research, just showing you understand their world.
