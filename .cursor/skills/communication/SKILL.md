---
name: communication
description: Use this BEFORE writing or editing any visitor-facing copy on prietoteran.com (landing, i18n, meta, title tags, CTAs, forms, blog CTAs). Voice, target, connection. When this skill conflicts with marketing-specialist, sales-agent, email-writer, or SEO notes, this skill wins.
---

# Communication

Source of truth for every word a visitor reads on prietoteran.com: the landing page, `i18n.js` (EN, DE, ES), `<title>` and meta tags, Open Graph, structured data descriptions, buttons, form labels and helper text, and blog CTAs.

Read this before you touch copy. If another skill tells you to do something that contradicts this one, this one wins.

## 1. Target

**Who:** Swiss and DACH B2B companies, roughly 50 to 500 people. Manufacturing, wholesale, distribution, industrial services.

**Role:** CEO, COO, CTO. Sometimes a Head of Operations or IT. One person, deciding, with no time.

**Stack:** Salesforce and/or an ERP (Abacus, SAP, Business Central, Odoo), plus Excel filling the gaps between them.

**What they already feel, before we say anything:**

- Two systems hold the same order and neither is trusted.
- Approvals sit in an inbox and nobody knows whose turn it is.
- Month-end numbers only balance after someone rebuilds them in a spreadsheet.
- They have been sold a platform, a pilot and a roadmap before, and they paid for all three.
- They are tired of vendors. A page that looks like a checkout confirms every suspicion they have.

Write as if they have already been disappointed once. They have.

## 2. Objective of any page or email

Three steps, in this order:

1. **Recognition.** They read their own week in our words.
2. **Trust.** They believe Osmel has actually done this work, on real systems.
3. **Conversation.** They write, or they reply.

That is the whole objective. The audit is what the conversation can become, not the reason for the page. A visitor who understands the problem and trusts the person will ask about price on their own.

We are not building a checkout. Nothing on the page should make a reader feel they are mid-transaction.

## 3. How we connect

Name their friction in their words before naming anything we sell.

- Concrete over abstract: "the same order typed into Salesforce and the ERP" beats "data silos" and "inefficiencies".
- Their nouns: order, quote, approval, month-end, Excel, ERP, inbox. Not "synergies", "digital transformation", "pain points".
- Their sequence: situation first, then what we find, then what it can become. Never the reverse.
- One friction well described beats five listed.

If the first thing a reader learns is what we charge, we have skipped both recognition and trust.

## 4. Voice

**Simplicity. Less is more. The understated Swiss specialist.**

- Short sentences. One idea each.
- Specific nouns and numbers that are true. No adjectives doing the work of facts.
- Calm and factual. We state, we do not sell.
- First person singular. Osmel is one person, not "we, a team of experts".
- No superlatives. Nothing is best, leading, proven, world-class, cutting-edge or game-changing.
- Confidence comes from precision, not volume. If a sentence would sound strange said quietly across a meeting table, cut it.
- Prefer the sentence that survives being read once, quickly, on a phone.

## 5. Price rule

**One commercial block per page. Each price appears once, in that block, stated as a fact.**

Never put a price in:

- the `<title>` tag or meta description
- Open Graph or Twitter card titles and descriptions
- structured data descriptions or `priceRange` used as a headline number
- the H1
- the hero badge or hero subtitle
- more than one button
- form labels, form helper text or the submit button
- blog post CTAs
- the final CTA strip

The offer block is where money is discussed. Everywhere else, the subject is the work.

Do not mention invoicing, billing or payment terms outside that block. A reader who has not yet decided to talk does not need to know how they will be invoiced.

## 6. CTA rule

CTAs use conversation verbs. The reader is starting a conversation, not completing a purchase.

**Good shape:** "Tell me what's stuck." "Start a conversation." "Sagen Sie mir, wo es klemmt." "Cuéntame dónde se atasca." "See how it works." "Get in touch."

**Forbidden:**

- "Request the paid audit" (and every translation of it)
- "Book now", "Jetzt buchen", "Reservar ahora"
- "Paid" used as a badge or label
- "no free discovery call", "kein kostenloses Erstgespräch" and similar defensive lines
- leading a form, or its helper text, with "invoice"
- "Claim", "Secure your spot", "Limited slots"

Helper text under a form says what happens next: I read it, I reply. Nothing else.

## 7. Languages

EN, DE and ES carry the same meaning and the same restraint. A translation is not a place to get louder.

- **German** must read like a Swiss specialist writing to a peer: `Sie`, plain nouns, no exclamation marks, no `Jetzt`, no `gratis`, no `nur`. It must not sound like a discount landing page. If a German string would fit on a retail banner, rewrite it.
- **Spanish** stays in one register across the file. Currently informal (`tú`). Do not mix `tú` and `usted`.
- Translate the intent, not the words. If a good English line has no calm equivalent, write a different calm line with the same meaning.
- Keys must exist in all three languages. A missing key falls back to English and breaks the page's voice.

## 8. Forbidden

- Em dashes in copy. Use a period, a comma or a colon.
- Power words and CTR bait: unlock, supercharge, transform, revolutionize, effortless, seamless, ultimate, secret, proven.
- Urgency and scarcity: "now", "today only", "limited", "before it's too late".
- Exclamation marks.
- Claims that could sit unchanged on any consultant's site: "problem-solver", "full ownership", "bridge builder", "trusted partner", "end-to-end". If a competitor could paste the line onto their homepage without editing it, delete it.
- Invented proof: testimonials, client logos, named customers, percentages, hours saved or project counts that Osmel does not have.
- A free consultation. The first conversation is a paid audit. We simply do not shout about it.
- Fake modesty about the price, and defensiveness about it. State it once and move on.

## 9. Shipping check

Before you commit copy, read the page top to bottom as a busy COO at 18:40.

- Did I meet my own week before I met a price?
- Do I know what this person actually does?
- Would I finish reading?
- Does anything here feel like a checkout?

**If a busy COO feels sold to before they feel understood, rewrite.**

Then check mechanically:

- Each price appears exactly once, inside the offer block.
- No forbidden CTA phrasing anywhere, in any language.
- EN, DE and ES say the same thing with the same restraint.
- No em dashes, no superlatives, no invented proof.

See [examples.md](examples.md) for before and after pairs taken from the live site.
