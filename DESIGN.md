# DUCHATEAU

## Mission
Create implementation-ready, token-driven UI guidance for DUCHATEAU that is optimized for consistency, accessibility, and fast delivery across e-commerce storefront.

## Brand
- Product/brand: DUCHATEAU
- URL: https://duchateau-git-master-rejouice.vercel.app/
- Audience: online shoppers and consumers
- Product surface: e-commerce storefront

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=beaufort-pro`, `font.family.stack=beaufort-pro, serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=17.6px`
- Typography scale: `font.size.xs=11px`, `font.size.sm=12px`, `font.size.md=14.3px`, `font.size.lg=15.4px`, `font.size.xl=16px`, `font.size.2xl=24px`, `font.size.3xl=25.3px`, `font.size.4xl=39.6px`
- Color palette: `color.surface.base=#000000`, `color.text.secondary=#ffffff`, `color.text.tertiary=#2d2b23`, `color.text.inverse=#050505`, `color.surface.raised=#f4f4f4`, `color.surface.strong=#f0efe9`
- Spacing scale: `space.1=3.3px`, `space.2=5.5px`, `space.3=8px`, `space.4=11px`, `space.5=12.1px`, `space.6=16.5px`, `space.7=19.8px`, `space.8=22px`
- Radius/shadow/motion tokens: `radius.xs=38.5px` | `motion.duration.instant=200ms`, `motion.duration.fast=300ms`, `motion.duration.normal=500ms`, `motion.duration.slow=800ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (93), buttons (22), inputs (4), lists (2).


## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
