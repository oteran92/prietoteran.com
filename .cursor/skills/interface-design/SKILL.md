---
name: interface-design
description: Designs and reviews polished, accessible interfaces for prietoteran.com. Use automatically when creating or changing layouts, navigation, menus, forms, interactive components, CSS, responsive behavior, visual assets, or visitor-facing UI.
---

# Interface Design

Create interfaces that feel deliberate, calm, and technically reliable. Preserve
the site's Swiss editorial identity while improving usability and visual craft.

## Before editing

1. Inspect the rendered interface and the relevant HTML, CSS, and JavaScript.
2. Identify the user's primary task and every input method: mouse, keyboard,
   touch, and assistive technology.
3. Reuse existing components and tokens before adding new ones.
4. Define one clear visual idea for substantial new UI. It must support the
   content and brand, not exist as decoration.
5. For visitor-facing copy, read `../communication/SKILL.md`.

## Visual direction

- Preserve the current identity: black and white foundations, Swiss red
  `#E3000F`, Inter for display/body text, and JetBrains Mono for utility text.
- Favor editorial grids, strong hierarchy, precise alignment, generous
  whitespace, and restrained asymmetry.
- Use the red accent to communicate priority or action, not as background noise.
- Derive colors, spacing, typography, borders, and motion from existing CSS
  variables.
- Avoid generic AI aesthetics: arbitrary gradients, glass effects, excessive
  cards, decorative pills, oversized headings without purpose, and random
  rounded corners.
- Do not introduce a new visual language for a single component.

## Interaction requirements

- Use native semantic elements. Buttons perform actions; links navigate.
- Every action must work with keyboard and touch, not only hover.
- Hover may reveal a desktop menu, but the pointer path to its content must have
  no dead gap. Keep click/tap as an alternative.
- Menus must support visible focus, logical Tab order, Escape to close, outside
  click to close, and accurate `aria-expanded` state.
- Keep interactive targets at least 44 by 44 CSS pixels where layout permits;
  never go below the WCAG 2.2 minimum.
- Never remove an outline without providing a stronger `:focus-visible` style.
- Hover, active, and focus states must increase contrast and remain legible in
  light and dark themes.
- Prefer short transitions on `transform` and `opacity`. Never use
  `transition: all`, and honor `prefers-reduced-motion`.

## Responsive and content resilience

- Design mobile-first, then verify at 375, 768, 1024, and 1440 CSS pixels.
- Test English, German, and Spanish labels; allow for longer translated text.
- Prevent clipping, accidental horizontal scroll, obscured focus, and overlaps
  with fixed navigation.
- Give images dimensions and meaningful alt text, or empty alt text when purely
  decorative.
- Keep reading width comfortable and maintain heading hierarchy.

## Implementation discipline

- Keep shared behavior in shared CSS and JavaScript files.
- Extend the current architecture instead of duplicating page-specific code.
- Add concise English comments only where they explain intent or a non-obvious
  constraint.
- Preserve performance: avoid layout-thrashing scripts and unnecessary
  dependencies.

## Verification loop

After implementation:

1. Run relevant automated tests and inspect linter diagnostics.
2. Render the affected page at desktop and mobile widths.
3. Test mouse hover, click, keyboard Tab/Shift+Tab, Enter or Space, Escape, and
   touch-sized controls.
4. Verify light and dark themes and all supported languages when relevant.
5. Check the browser console and confirm the primary user path visually.
6. Fix regressions before reporting completion.

## Quality gate

- The interface has a clear hierarchy and one coherent visual language.
- The primary action is obvious without explanation.
- All interactive states are visible and reachable.
- No functionality depends exclusively on hover.
- The result works with long content, small screens, and keyboard navigation.
- The implementation is minimal, reusable, and consistent with the site.

## References

- Anthropic Frontend Design:
  https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design
- Vercel Web Interface Guidelines:
  https://github.com/vercel-labs/web-interface-guidelines
- W3C Web Content Accessibility Guidelines 2.2:
  https://www.w3.org/TR/WCAG22/
