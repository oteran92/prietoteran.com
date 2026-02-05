# Email Sequences

## Overview

Email sequences are structured follow-up campaigns designed to maximize response rates while respecting the recipient's time. Each sequence follows a specific cadence and messaging strategy.

---

## Sequence 1: Standard Outreach

**Purpose:** First outreach to qualified leads
**Duration:** ~25 days
**Emails:** 4

### Sequence Timeline

| Stage | Day | Email Type | Subject Line Pattern | Goal |
|-------|-----|------------|---------------------|------|
| 1 | 0 | Pain Point Intro | "[Pain point] at [Company]?" | Start conversation |
| 2 | 5 | Follow-Up | "Re: [Original subject]" | Add new angle |
| 3 | 12 | Value-Add | "[Topic] - thought of [Company]" | Provide value |
| 4 | 22 | Break-Up | "Should I close the loop?" | Final touch |

### Stage Details

**Stage 1: Pain Point Introduction**
```
Template: #1 Pain Point Intro
Key elements:
- Personalized observation
- Specific pain point
- Relevant social proof
- Soft CTA
- P.S. with value-add link
```

**Stage 2: Follow-Up**
```
Template: #5 Follow-Up
Key elements:
- Reply to original subject
- New angle or additional value
- Acknowledge they're busy
- Maintain soft approach
```

**Stage 3: Value-Add**
```
Template: #3 Value-Add
Key elements:
- Share relevant content
- Key insight highlighted
- Connect to their situation
- Soft CTA
```

**Stage 4: Break-Up**
```
Template: #7 Break-Up
Key elements:
- Acknowledge multiple touches
- Offer to stop
- Leave door open
- Optional nurture offer
```

---

## Sequence 2: Technology Trigger

**Purpose:** When tech stack is confirmed (Salesforce + ERP)
**Duration:** ~20 days
**Emails:** 4

### Sequence Timeline

| Stage | Day | Email Type | Subject Line Pattern |
|-------|-----|------------|---------------------|
| 1 | 0 | Technology Trigger | "Salesforce + [ERP] at [Company]" |
| 2 | 6 | Case Study | "How [similar company] [result]" |
| 3 | 13 | Pain Point | "[Specific challenge]?" |
| 4 | 20 | Break-Up | "Should I close the loop?" |

---

## Sequence 3: Content Nurture

**Purpose:** Leads in nurture stage, not ready for active sales
**Duration:** ~60 days
**Emails:** 3

### Sequence Timeline

| Stage | Day | Email Type | Subject Line Pattern |
|-------|-----|------------|---------------------|
| 1 | 0 | Value-Add | "[Topic] - for [role]s" |
| 2 | 21 | Value-Add | "[New topic] - thought of you" |
| 3 | 45 | Check-In | "Any [topic] projects on the horizon?" |

### Key Differences
- Longer gaps between emails
- All value-add focused
- Gentle check-in at end
- No hard sales push

---

## Sequence 4: Event-Triggered

**Purpose:** Respond to specific trigger events
**Duration:** ~18 days
**Emails:** 3

### Trigger Types & Responses

**Trigger: New Job Posting (Integration/Ops role)**
```
Stage 1: "I noticed [Company] is hiring a [role]..."
Stage 2: Follow-up with relevant content
Stage 3: Break-up
```

**Trigger: Funding Announcement**
```
Stage 1: "Congratulations on the funding round..."
Stage 2: Growth challenges content
Stage 3: Break-up
```

**Trigger: Technology Implementation**
```
Stage 1: "I saw [Company] just implemented [system]..."
Stage 2: Integration best practices content
Stage 3: Break-up
```

---

## Sequence Management

### Status Tracking in leads.json

For each lead in a sequence, track:

```json
{
  "outreach": {
    "sequence_name": "standard_outreach",
    "sequence_stage": 2,
    "sequence_started": "2026-02-01",
    "emails_sent": 2,
    "last_contact": "2026-02-06",
    "next_action": "send_stage_3",
    "next_action_date": "2026-02-13"
  }
}
```

### Sequence Actions

**Start sequence:**
```
1. Set sequence_name and sequence_stage = 0
2. Calculate all future email dates
3. Send first email
4. Update to sequence_stage = 1
```

**Progress sequence:**
```
1. Check if next_action_date is today or past
2. Verify no response received
3. Send appropriate email for current stage
4. Update sequence_stage += 1
5. Calculate next_action_date
```

**End sequence:**
```
On reply: Mark sequence complete, handle response
On break-up sent: Mark sequence complete
On disqualify: Mark sequence cancelled
```

---

## Best Practices

### Timing

- **Minimum gap:** 5 days between emails
- **Optimal send time:** Tuesday-Thursday, 8-10 AM recipient time
- **Avoid:** Monday mornings, Friday afternoons, weekends

### Volume Management

- **Maximum active sequences:** 50 leads at a time
- **Daily send limit:** 30 emails per day
- **Spread sends:** Throughout the day, not all at once

### Response Handling

**Positive response:**
- Stop sequence immediately
- Move to conversation mode
- Update status to "replied"

**Negative response (not interested):**
- Stop sequence immediately
- Mark as disqualified
- Send graceful close

**"Not now" response:**
- Stop active sequence
- Move to nurture sequence
- Set follow-up date (30-90 days)

**Out of office:**
- Pause sequence
- Resume after return date
- Don't count as a "touch"

### Quality Over Quantity

```
Better: 10 highly personalized emails
Than: 50 generic emails

Each email should feel like it was written 
specifically for that person.
```

---

## Sequence Decision Tree

```
Start
  │
  ├─ Is tech stack known (SF + ERP)?
  │   ├─ Yes → Technology Trigger Sequence
  │   └─ No ─┐
  │          │
  ├─ Is there a trigger event?
  │   ├─ Yes → Event-Triggered Sequence
  │   └─ No ─┐
  │          │
  ├─ Is lead high priority (score > 70)?
  │   ├─ Yes → Standard Outreach Sequence
  │   └─ No ─┐
  │          │
  └─ Default → Content Nurture Sequence
```

---

## Sequence Reporting

### Weekly Check
```
- Leads in active sequences: X
- Emails sent this week: X
- Replies received: X
- Reply rate: X%
- Sequences completed: X
- Sequences cancelled: X
```

### Monthly Review
```
- Total sequences started: X
- Positive responses: X
- Negative responses: X
- No response: X
- Response rate: X%
- Best performing template: [template]
- Best day/time: [day/time]
```

### Optimization Signals

**Low reply rate at Stage 1:**
- Opening line not compelling
- Pain point not resonating
- Wrong lead qualification

**Replies only at Stage 3-4:**
- Initial emails too sales-focused
- Value-add working better
- Consider leading with content

**High unsubscribe/negative:**
- Too aggressive cadence
- Not relevant to audience
- Pain point misidentified
