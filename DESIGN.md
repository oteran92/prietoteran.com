# Design

Teran Studio visual system for prietoteran.com. Same language as the Instagram and LinkedIn carousels (`teranstudio-ig/tools/carousel.py`): a visitor who followed a post recognises the site in one second.

## Tokens

Defined in `design-system.css` (shared by every page) and `home.css` (homepage and `/recursos/`).

| Role | Light | Dark |
|---|---|---|
| Background | `#F6F6F2` | `#0D1424` |
| Alternate section | `#ECEDE8` | `#17213A` |
| Panel | `#FFFFFF` | `#121B30` |
| Text | `#111C32` (ink) | `#F3F4F7` |
| Secondary / muted text | `#3E4759` / `#5B6478` | `#C3C8D4` / `#A7AEBD` |
| Accent (text, links) | `#2457FF` | `#7D9BFF` |
| Brand fill (white text on top) | `#2457FF` | `#2A55E8` |
| Border | `#E1E3E8` | `#26314A` |

White on `#2457FF` is about 5.4:1. On tinted backgrounds, accent text uses `--accent-dark`.

## Type

Helvetica Neue (system), heavy weights for headings: hero 800, section headings 700, letter-spacing about -0.03em. JetBrains Mono only for small numbers such as card indices.

## Layout

One idea per section, in this order: hero, problems, services, how we work, control, about, free resource, contact, blog. Max width 1160px. Mobile-first; single column under 900px, steps go vertical under 640px.

## Signature components

- **Hero on brand blue** with an example agent card: steps tick in sequence, then a slide-to-approve control. It is labelled "Example workflow" and states "The agent prepares. A person decides."
- **Progress line with check nodes** in "How we work", filled when it scrolls into view.
- **Control split** on ink: what the agent does vs. what a person does.
- **Interest chips** in the contact form, preselected by the service cards.

## Interaction rules

- Every gesture has a keyboard path: the slide thumb is a button and Enter approves.
- `prefers-reduced-motion` removes transitions and animations; the demo shows its final state at once.
- Targets at least 44px. Focus is always visible (white outline on blue and ink).
- No coloured glows, no side-tab borders, no eyebrow chips above the hero headline.

## Content rules

Copy follows `.cursor/skills/communication/SKILL.md`. No prices, no employer names, no invented proof.
