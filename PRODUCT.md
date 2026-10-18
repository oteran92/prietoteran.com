# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary buyer: B2B operators.** Distributors, technical suppliers, manufacturing and wholesale SMEs (about 50 to 500 people, Switzerland and DACH). The buyer works in operations or management, uses a CRM (often Salesforce), an ERP, Outlook and Excel, and feels the pain in requests, quotes, orders or product information.
- **Second segment: AI adopters.** Business owners and leaders who come because they want to implement AI in their company and do not know where it helps or how to keep it safe.
- **Traffic sources.** LinkedIn in English (default language) and Instagram @teranstudio.ai in Spanish. Most visitors are cold or lukewarm: they saw one post and do not know Osmel yet.

## Product Purpose

prietoteran.com is the home of Teran Studio, Osmel P. Teran's studio for AI strategy, custom software and automation. It turns attention into a conversation:

1. Primary conversion: the visitor describes one task in the contact form (optional interest: review, workshop, build, not sure).
2. Secondary conversion: the visitor leaves an email and receives a free resource (first: "Las reglas de mis agentes de IA" PDF in Spanish; English version planned).

Offers, never priced on the site: 1:1 review of one workflow or AI tool, team workshop, AI agents and automation with human approval, free resources.

Success: a buyer understands in under a minute what Osmel does and how to start, and writes about one real task.

## Positioning

A practitioner who is bringing AI into a real industrial company today and tells what works, what breaks and what he would decide. Thesis: what happens after the demo. Evidence comes from his own daily work with AI agents (approval steps, change tickets, permissions), not from theory. He studies the CAS "Game Changer AI" at the University of Zurich (HS 2026).

Never claim the title "Chief AI Officer".

## Operating Context

- Content pillars: Field notes, Agent lab, Decisions, Classroom to company (CAS UZH).
- Channels: Instagram in Spanish (reels, motion carousels, stories; CTA "Comenta PALABRA y te lo envío"), LinkedIn in English (text posts and PDF documents).
- Source of stories: `/Users/005ote/Documents/Github-Others/teranstudio-ig/calendario/story-bank.md`.
- Hosting: Express server on DigitalOcean App Platform, deployed from `main`. Email is sent through Microsoft Graph as osmel@prietoteran.com.

## Capabilities and Constraints

- Languages on the homepage and resources: English (default), German and Spanish. The rules guide PDF exists in all three.
- Existing anchors `#how`, `#about`, `#contact` are linked from every blog article and must keep resolving.
- No database. Resource sign-ups are delivered by email to the subscriber and a notification to Osmel.
- Anonymization: never name the employer, its products, ERP vendor, customers or colleagues. Say "la empresa", "el ERP", "el CRM". Relative figures only.
- No prices on the homepage or resource pages.

## Brand Commitments

- Name: Teran Studio. Person: Osmel P. Teran. Handle: @teranstudio.ai.
- Visual system already used on Instagram and LinkedIn carousels (`teranstudio-ig/tools/carousel.py`): blue `#2457FF`, off-white `#F6F6F2`, ink `#111C32`, muted `#5B6478`, Helvetica Neue in heavy weights, white panels with soft borders, and a horizontal progress line with a check node as the signature.
- Portrait: `teranstudio-ig/assets/portrait-blue.png`.
- Voice: short sentences, first person singular, calm and factual, no em dashes, no superlatives, no hype words, conversational CTAs.

## Evidence on Hand

- Free resource: `recursos/reglas-agentes-ia.pdf` (Spanish, live).
- Real anonymized stories in the story bank (A1, A2, A5, F2, F6, F8, D5, D6, D7 are cleared to publish).
- CAS Game Changer AI, University of Zurich, HS 2026.
- Absent and never to be invented: testimonials, client logos, follower counts, savings figures, project counts.

## Product Principles

1. Recognition before request: the visitor should see the brand they followed within one second.
2. One clear action per screen. The conversation first, the resource second.
3. Prove with real working material (an approval step, a ticket, a rule), never with claims.
4. Respect the reader's time: a phone visitor finishes the page in under a minute.
5. Anonymous by default.

## Accessibility & Inclusion

WCAG 2.2 AA. Keyboard and touch parity, visible focus, reduced motion respected, English, German and Spanish text lengths tested.
