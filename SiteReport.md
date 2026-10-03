# Leoz Cucine — Source Code Audit

Reviewed: 2026-09-08
Scope: 8 routes, 15 components (6 active + 9 in `components/ui/`, 8 of which are dead), 3 hooks/providers, 42 files / ~11,370 lines under `src/` — React 18 + TypeScript + Vite, no CSS framework (hand-written CSS custom properties + inline styles), Framer Motion for animation, Lenis for smooth scroll, a hand-rolled client-side router (no react-router).
Method: Read every file under `src/` in full (all 8 pages, all components, hooks, providers, styles). Ran `npm run build` (`tsc && vite build`), `npm run lint`, `npx tsc --noEmit`, `npm audit`. Grepped the whole repo for placeholder text, secrets, `console.*`, `dangerouslySetInnerHTML`, `target="_blank"`, media queries, alt text, labels, and internal links. Computed WCAG 2.1 contrast ratios for every real text/background colour pair found in the stylesheets and inline styles. Measured every image asset's file size and actual pixel dimensions from its file header. Could not check runtime-only behaviour (live focus-trap behaviour, actual crawler rendering, screen-reader output) — see §7.

---

## Overall Score: 6.5 / 10

The visual/content layer is genuinely strong: consistent premium design system, real (not stock) product photography almost everywhere, zero leftover placeholder text on the live pages, clean TypeScript with no build errors, and thoughtful touches (reduced-motion handling on the preloader and page-transition curtain, a working Lenis-aware mobile-menu scroll lock). The score is held down by three things that have nothing to do with visual polish: (1) production images are 5–20× over the project's own documented size budget (`size.md`) and there are no `width`/`height` attributes anywhere, so every page has real Core Web Vitals problems; (2) the repo has no `.gitignore` and has committed `node_modules` (153MB), `dist/` (50MB) and test artifacts to git; (3) a fully-built 1,619-line franchise page (`/franchise-enquiry`) has zero links pointing to it anywhere in the site. Fix the image pipeline, the repo hygiene, and the orphan-page/duplicate-franchise-page confusion, and this is comfortably an 8.5.

---

## Critical Findings

| Severity | Issue | Location | Fix |
|---|---|---|---|
| CRITICAL | Repo has no `.gitignore`; `node_modules` (6,529 files / 153MB), `dist/` (54 files / 50MB), `test-results/`, `playwright-report/`, and `.vs/` are all committed to git | repo root (no `.gitignore` file exists) | Add a `.gitignore` covering `node_modules/`, `dist/`, `test-results/`, `playwright-report/`, `.vs/`, then `git rm -r --cached` those paths |
| CRITICAL | `/franchise-enquiry` — a complete, 1,619-line page with its own working enquiry form — has no link pointing to it anywhere in the codebase (nav, footer, or any page). It only exists if a visitor types the URL directly | `src/pages/FranchiseEnquiry.tsx` (whole file); confirmed via grep, only self-reference at `src/App.tsx:56` | Either link it from somewhere real, or delete it and its route registration (`App.tsx:56`, `Header.tsx:42,71`) |
| HIGH | `npm run lint` cannot run at all — `eslint` is not in `package.json` and is not installed; the script fails immediately on a clean checkout | `package.json:10` (script), no `eslint` in `devDependencies` | Add `eslint` (and a config) as a devDependency, or remove the broken script |
| HIGH | Every image on every page is 5–20× the size the project's own `size.md` spec calls for, and is PNG instead of WebP — see §5 | `src/assets/images.ts`, `public/*.png` | Convert to WebP/AVIF at the documented target sizes |
| MODERATE | `public/favicon.png`, used as the `<link rel="icon">` for every page, is a 1420×1032px, 93KB image — a byte-for-byte copy of the full logo file, not a favicon | `index.html:11`, `public/favicon.png` | Generate a real 32×32/180×180 favicon set |

---

## Top 5 Priority Fixes

1. **Stop shipping multi-megabyte PNGs.** `hero banner.png` (1.99MB), `form.png` (2.16MB), and every material/layout swatch on the Kitchens/Wardrobes pages (1.7–2.9MB each, 19 files) load on first paint or shortly after. Convert to WebP at the sizes already documented in `size.md` (hero ≤350KB, cards ≤120KB). This alone will cut page weight by roughly 30–40MB across the site. (`src/assets/images.ts`, `public/*.png`)
2. **Resolve the FranchiseEnquiry vs FranchiseOpportunities duplication.** Two near-identical "become a franchise partner" pages exist (`/franchise-enquiry`, 1,619 lines, unlinked; `/franchise-opportunities`, 541 lines, linked from nav as "Franchise Enquiry"). Pick one, delete the other and its route, and stop shipping ~1,600 lines of dead JS to every visitor. (`src/pages/FranchiseEnquiry.tsx`, `src/App.tsx:56`)
3. **Add real `.gitignore` and strip `node_modules`/`dist` from git.** A 153MB `node_modules` and 50MB `dist` committed to version control makes every clone slow and risks committing OS-specific binaries or, in the future, `.env` secrets, since nothing is currently excluded. (repo root)
4. **Fix the two "0" and unlabeled-form bugs.** `BookConsultation.tsx`'s entire form has zero `<label>` elements (placeholder-only fields — the most-used conversion form on the site); `Contact.tsx`/`FranchiseOpportunities.tsx` have labels but none use `htmlFor`/`id`. Wire them up — it's a 15-minute fix per form. (`src/pages/BookConsultation.tsx`, `src/pages/Contact.tsx`, `src/pages/FranchiseOpportunities.tsx`)
5. **Give the mobile hamburger button a visible focus state and `aria-expanded`.** It currently sets `outline: none !important` with no replacement, so keyboard users tabbing through the site on any viewport ≤1023px cannot see where focus is when they reach the only control that opens navigation. (`src/components/common/Header.tsx:283`)

---

## 1. Content & Copy

### 1.1 Placeholder / unfinished text

| File:line | Visible to users? | Exact text |
|---|---|---|
| `src/pages/Contact.tsx:620` | **No** — inside a `{false && (...)}` dead branch, never rendered | `Chat with our team directly on WhatsApp: [Phone Number]` |
| `src/pages/Contact.tsx:624` | No — JSX comment only | `{/* TODO: wire to the real business WhatsApp number once available */}` |
| `src/pages/FranchiseEnquiry.tsx:1336` | Yes, but it's a legitimate input `placeholder` attribute (format hint), not unfinished content | `placeholder="alexander@example.com"` |

No `TODO`/`FIXME`/`TBD`/`Lorem ipsum`/`[Client Confirmation Required…]`/bracketed-placeholder text is live on any rendered page. This was the subject of a prior fix pass and it held — a full case-insensitive grep of `src/`, `public/`, `index.html`, and every root `.md` file for the full pattern list in the brief returned nothing visible. **Clean, with one caveat**: the disabled WhatsApp section above still contains a literal `[Phone Number]` placeholder and a `href="#"` dead link — it's dead code today, but if anyone flips `{false &&}` back on without finishing it, it ships instantly.

### 1.2 Consistency issues

| Item | Variant 1 | Variant 2 | Verdict |
|---|---|---|---|
| Franchise pages | `/franchise-opportunities` (541 lines, linked from Header/Footer nav as "Franchise Enquiry") | `/franchise-enquiry` (1,619 lines, unlinked anywhere) | Two different pages selling the same thing, no clear reason both exist |
| Email field label | "Email Address" (`Contact.tsx:452`) | "Email ID" *(already fixed to "Email Address" in a prior pass — verified current)* | Resolved |
| Phone number grouping | `93131 51559` (Contact.tsx:311, Footer.tsx:157) | `87585 51552` (Contact.tsx:326, Footer.tsx:158) | Resolved in a prior pass — now consistent 5+5 grouping both places |
| "Enquiry" vs "Inquiry" | "Enquiry" used everywhere else | *(prior "Sales & Inquiry" instance already fixed to "Enquiry")* | Resolved — verified current source uses "Enquiry" consistently |
| Franchise Enquiry form label | `Name *`, `Phone *`, `Email *` (`FranchiseEnquiry.tsx:1241,1279,1327`) | `Name`, `Mobile No.`, `Email Address` — no asterisks (`Contact.tsx`) | Required-field marking style differs between the two enquiry-style forms; not wrong, just inconsistent |
| Currency format | `₹50 Lakhs - ₹1 Crore` (`FranchiseEnquiry.tsx:1471-1473`, dropdown options) | No currency figures anywhere else on the site | Clean — only one place uses currency, internally consistent |
| Button copy for "submit a lead" | "Submit Enquiry" (Contact, FranchiseOpportunities, FranchiseEnquiry) | "SUBMIT" (BookConsultation.tsx:248) | BookConsultation is the odd one out — different casing and wording for the same action |

### 1.3 Spelling & grammar

No spelling errors found in visitor-facing copy across any page. One phrasing note: `About.tsx:902` "Reached over 5,000 completed projects across Gujarat" is a fragment without a stated subject — reads fine as a standalone stat callout (it now has its own bordered card, see §1.4/prior fix) but "We've reached over 5,000 completed projects..." would be a full sentence if a copy pass is ever done.

### 1.4 Content that depends on JS to appear

- **`src/pages/Home.tsx` `AnimatedCounter`** (around line 297): already patched in a prior session so non-numeric labels ("Trusted", "In-House", "German-Grade", "Pan-India") render immediately instead of a literal `"0"`. Verified current.
- **Every page's hero and section copy** is wrapped in Framer Motion `initial={{opacity:0,...}}` / `whileInView` — meaning the actual text nodes ARE present in the HTML (readable by a crawler or a no-JS browser as inert but present DOM), but they render at `opacity: 0` until Framer Motion's JS runs and the IntersectionObserver fires. If JS fails to load entirely, the affected text stays invisible forever (there's no `<noscript>` fallback or CSS-only default-visible state). This is sitewide — every page, dozens of elements each — not a single-file bug.
- **Document `<title>`/meta description** are set client-side only, via `useDocumentMeta` (`src/hooks/useDocumentMeta.ts`) mutating `document.title` after mount. There is no SSR/prerendering, so a crawler or link-preview bot that doesn't execute JS sees the same static `index.html` title/description for every one of the 8 routes.

---

## 2. Responsive & Layout

### 2.1 Breakpoints found

Full inventory (every `@media` in `src/`):

| Breakpoint | Files using it | Notes |
|---|---|---|
| `max-width: 767px` | globals.css, Home.tsx (×3), About.tsx, Contact.tsx, ModularKitchens.tsx (×1 of 2), ModularWardrobes.tsx, Footer.tsx, FranchiseOpportunities.tsx | **Dominant mobile breakpoint** |
| `max-width: 1023px` / `min-width: 768px …1023px` | Header.tsx, About.tsx (×2), Contact.tsx (×2), ModularKitchens.tsx (×2), ModularWardrobes.tsx (×1), Home.tsx (×1 for min-width pairing), FranchiseEnquiry.tsx (×2) | **Dominant tablet breakpoint** |
| `min-width: 1024px … max-width: 1279px` | Home.tsx, ModularKitchens.tsx | **Dominant "small desktop" breakpoint** |
| `max-width: 1279px` | globals.css (site-wide overflow guard) | Consistent with the family above |
| `prefers-reduced-motion: reduce` | globals.css:326 | Global CSS transition-kill switch (see §3.6 for its actual coverage gap) |
| `max-width: 900px` | **Home.tsx:463** (stat grid 4→2 cols), **BookConsultation.tsx:307** (entire page layout collapses to 1 column) | **Inconsistent** — see below |
| `max-width: 420px` | Home.tsx:906, ModularKitchens.tsx:237 | Fine-tuning tier, consistent with each other |
| `max-width: 400px` | Home.tsx:477 | One-off, 20px away from the 420px tier used two other places — no clear reason it's different |
| `max-width: 639px` | FranchiseEnquiry.tsx:1608 | **Inconsistent** — see below |
| `max-width: 479px` | ModularWardrobes.tsx:1341 | One-off, no equivalent elsewhere |
| `max-width: 992px` / `max-width: 640px` | Timeline.tsx (dead component) | Not live — flagged in case this component is ever reintroduced |

**Real inconsistency #1 — `BookConsultation.tsx:307`.** Every other page collapses to single-column mobile layout at `767px` (with `1023px` as the tablet midpoint). `/talk-to-us` — the page every "Book a Free Consultation" CTA on the entire site points to — instead collapses at `900px`. Between 768–899px it is briefly single-column while every other page is still 2-column tablet layout, and it never has the tablet-specific treatment (`768–1023px`) the rest of the site has.

**Real inconsistency #2 — `FranchiseEnquiry.tsx:1608`.** Its own hero collapses at `1023px` (matching the site standard, `FranchiseEnquiry.tsx:378`), but its 2-column form-field rows (`.form-row-2col`) only stack to 1 column at `639px`. Between 640–767px — solidly "mobile" everywhere else on the site — this page's form fields (Name/Phone, Email/City, etc.) stay squeezed into two columns. Since this page is currently unlinked (§Critical), nobody is hitting this today, but it's a real bug in the code as it stands.

### 2.2 Overflow and small-screen risks

- `body { overflow-x: hidden }` and a blanket `@media (max-width: 1279px) { html, body { max-width: 100vw; overflow-x: hidden } }` (`globals.css:27,343-350`) are a global safety net against horizontal scroll — a reasonable belt-and-braces approach, though it can mask (rather than fix) an overflow if one exists, since it just clips instead of preventing.
- No fixed pixel `width` was found on any content container (`Container.tsx`, `Section.tsx`, and every page's grid layouts all use `%`, `vw`, `clamp()`, or `minmax()` — genuinely fluid).
- No `white-space: nowrap` found on any long/variable-length text content — the one `white-space: nowrap` in the codebase is on `.btn-primary` (`globals.css:278`), correct usage on a short CTA label.
- `100vw` is used on every hero `<section>` (`width: '100vw'` — About.tsx:94, Contact.tsx:115, ModularKitchens.tsx:292, ModularWardrobes.tsx, FranchiseEnquiry.tsx:260, FranchiseOpportunities.tsx). On any platform with a vertical scrollbar that isn't overlay-style (some older Windows/Firefox configurations), `100vw` is wider than the visible viewport and can itself cause a horizontal scrollbar — usually masked here by the `overflow-x: hidden` safety net above, but it's the root cause the safety net is compensating for. `100%` would be the more correct value.
- Position-fixed elements: the header (`Header.tsx:88`, z-index 1000), the mobile drawer (z-index 995), the scroll-progress bar (`globals.css:251`, z-index 1000), and the custom cursor (z-index 999998-999999). No two fixed elements were found overlapping in a way that blocks click targets.

### 2.3 Mobile navigation

Checked against the full checklist in the brief, from `src/components/common/Header.tsx`:

| Check | Status | Evidence |
|---|---|---|
| Backdrop/scrim behind the drawer | **Present** (by design) — the drawer itself is a full-viewport opaque panel (`rgba(18,18,18,0.96)` + blur), so there's no separate "outside" area | `Header.tsx:204-224` |
| Body scroll lock when open | **Present** — sets `body.style.overflow = 'hidden'` **and** calls `lenis.stop()` (a prior fix; the site's Lenis smooth-scroll engine ignores plain CSS overflow, so both are needed) | `Header.tsx:26-37` |
| Closes on outside click | N/A by design — the drawer covers 100% of the viewport, there is no "outside" | — |
| Closes on Escape key | **Missing** — no `keydown` listener anywhere in the component | — |
| Focus trapped inside drawer while open | **Missing** — no focus-trap logic; Tab can move focus to elements underneath the visually-hidden page content | — |
| Focus returned to the toggle button on close | **Missing** — no ref/`.focus()` call when `isMobileMenuOpen` becomes `false` | — |
| `aria-expanded` on the toggle button | **Missing** — the button has `aria-label` (which does correctly toggle between "Open Menu"/"Close Menu") but no `aria-expanded` | `Header.tsx:177-192` |
| Drawer has `role="dialog"`/`aria-modal` | **Missing** | `Header.tsx:199-225` |
| Drawer wrapped in its own `<nav>` landmark | **Missing** — desktop nav has `<nav aria-label="Main Navigation">`, the mobile drawer's links are bare `<a>` tags with no landmark | `Header.tsx:111` vs `226-247` |

### 2.4 Tap targets

- `.btn-primary`/`.btn-secondary` explicitly enforce `min-height: 48px` on mobile (`globals.css:366-374`) — comfortably above the 44px minimum.
- Header nav links, footer links, and form inputs (`height: '52px'` on Contact.tsx inputs, `padding: '14px 18px'` on FranchiseEnquiry/FranchiseOpportunities inputs) are all at or above 44px effective height.
- The one exception: the mobile hamburger toggle button itself has `padding: '6px'` around a 24px icon (`Header.tsx:186`) — roughly a 36×36px hit target, under the 44px guideline. Small but it's the single most important control on mobile (the only way to reach navigation).

---

## 3. Accessibility

### 3.1 Colour contrast (measured)

All ratios computed with the standard WCAG 2.1 relative-luminance formula. Full working in Appendix C.

| Foreground | Background | Size/weight | Ratio | Verdict |
|---|---|---|---|---|
| `#B69A6B` (gold) | `#FFFFFF` | 11-12px / 600 | **2.68 : 1** | **FAILS** (needs 4.5:1) |
| `#B69A6B` (gold) | `#F7F5F1` (ivory) | 11-12px / 600 | **2.47 : 1** | **FAILS** |
| `#7A5F35` (darker bronze, prior fix) | `#FFFFFF` | 12px / 600 | 5.97 : 1 | Passes |
| `#7A5F35` (darker bronze, prior fix) | `#F7F5F1` | 12px / 600 | 5.49 : 1 | Passes |
| `#B69A6B` (gold) | `#181818` (dark bg) | any | 6.62 : 1 | Passes |
| `#B0ABA2` (secondary text) | `#181818` | 13-15px | 7.77 : 1 | Passes |
| `#B0ABA2` (secondary text) | `#202020` | 13-15px | 7.13 : 1 | Passes |
| `#595959` (body copy) | `#FFFFFF` | 15-16px | 7.00 : 1 | Passes |
| `#595959` (body copy) | `#F7F5F1` | 15-16px | 6.43 : 1 | Passes |
| `#4A4A4A` (Contact address copy) | `#FFFFFF` | 15px | 8.86 : 1 | Passes |
| `#181818` (headings) | `#FFFFFF` | any | 17.76 : 1 | Passes |
| `#FFFFFF` (primary text) | `#181818` | any | 17.76 : 1 | Passes |

**The gold-on-light failure was already found and fixed for the large "eyebrow" section labels** (`.section-label`, `src/styles/globals.css:73-88`, a `.section-label-on-light` variant now applied to all ~26 light-background instances). **It was not fixed for the smaller inline micro-labels** that use the identical `color: '#B69A6B'` at 11px on white/ivory form panels — e.g. the "EMAIL", "SALES & ENQUIRY", "MOBILE NO.", "PROJECT TYPE", "MESSAGE" field labels in `Contact.tsx:292,307,322,337,352,396,425,451,480,510` and the equivalent labels in `FranchiseOpportunities.tsx`. Same 2.68:1 failure, still live.

### 3.2 Semantics & headings

- Exactly one `<h1>` per page, confirmed across all 8 routes (`About.tsx:181`, `Contact.tsx:156`, `BookConsultation.tsx:76`, `FranchiseOpportunities.tsx:210`, `ModularWardrobes.tsx:196`, `FranchiseEnquiry.tsx:341`, `Home.tsx:120`, `ModularKitchens.tsx:379`) — none in shared components, so no duplication risk. **Clean.**
- No `<h5>`/`<h6>` anywhere; heading depth stays at h1→h2→h3→h4, consistent with the visual hierarchy (section-title / sub-title / small labels).
- Landmarks present: one `<header role="banner">`, one `<footer role="contentinfo">` (`Footer.tsx:7-9`), one `<main id="main-content">` per page, one `<nav aria-label="Main Navigation">` for desktop nav. **Clean** except the mobile drawer isn't in its own `<nav>` (§2.3).
- No "skip to main content" link exists anywhere — `id="main-content"` on `<main>` is used only as a CSS selector hook (`globals.css:164,170`) for body-copy justification, not as a skip-link target. Every page forces keyboard users to tab through the full header (6 nav links + CTA + hamburger) before reaching content.
- No clickable `<div>`s masquerading as buttons on any live page. The two dead components that do this (`GalleryCard.tsx:28` `<div onClick>`, `Card.tsx:41` `<article onClick>`) aren't rendered anywhere.

### 3.3 Images & alt text

Every single `<img>` in the codebase (23 occurrences across all pages + components, full list checked) has a non-empty, descriptive `alt` attribute — no missing alt, no generic "image"/"photo"/filename-as-alt anywhere. This is genuinely clean and consistent, including on dynamically-generated cards (`alt={item.title}`, `alt={mat.title}`, `alt={layout.title}` — all backed by real, non-empty title strings). **No findings here.**

### 3.4 Forms

Four forms exist (Contact, BookConsultation/"talk-to-us", FranchiseEnquiry, FranchiseOpportunities). Label wiring is inconsistent across them:

| Form | `<label>` count | `htmlFor`/`id` pairing | `autocomplete` |
|---|---|---|---|
| `FranchiseEnquiry.tsx` | 7 | **All 7 correctly paired** (`htmlFor="fullName"` ↔ `id="fullName"`, etc.) | None |
| `Contact.tsx` | 5 | **None paired** — labels exist visually but have no `htmlFor`, inputs have no `id` | None |
| `FranchiseOpportunities.tsx` | 4 | **None paired** | None |
| `BookConsultation.tsx` | **0** | N/A — this form has no `<label>` elements at all; every field relies solely on its `placeholder` (`BookConsultation.tsx:124,161,185,208`) | None |

- No form on the site sets `autocomplete` on any field (name/email/tel), site-wide.
- All four forms use only native HTML5 `required` + `type="email"`/`type="tel"` validation with no custom error UI — so there's nothing needing `aria-describedby` (native browser validation messages are automatically accessible). This part is fine as-is.
- Every submit button is a real `<button type="submit">` (no clickable-div submits).

### 3.5 Keyboard & focus

- A global `:focus-visible { outline: 2px solid var(--color-accent-gold); outline-offset: 4px }` rule exists (`globals.css:34-37`) — a real, deliberate, visible focus ring baseline. Good foundation.
- **`Header.tsx:283`** — `.mobile-hamburger-btn { outline: none !important; }` inside the `max-width: 1023px` media query, with **no replacement focus style**. This is the highest-impact single accessibility bug found: on any mobile/tablet viewport, the only control that opens the site's navigation has zero visible focus indicator for keyboard users.
- 21 form inputs across `Contact.tsx` (5), `BookConsultation.tsx` (4), `FranchiseEnquiry.tsx` (7), `FranchiseOpportunities.tsx` (4), and one in `Header.tsx`, set `outline: 'none'` inline — but the form inputs are mitigated by a `.contact-form-input:focus { box-shadow: 0 0 0 2px rgba(182,154,107,0.15) !important }` rule that does render a visible (if subtle) focus ring. Not a full violation, but a fairly low-contrast one worth strengthening.
- No positive `tabIndex` anywhere in the codebase (`grep tabIndex` returns zero matches) — no keyboard-order hacks, no keyboard traps found.

### 3.6 Motion

- `Preloader.tsx:17` and `CinematicPageTransition.tsx:29` both explicitly check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip their respective animations for motion-sensitive users. **Both confirmed present and correct.**
- A global CSS override (`globals.css:326-336`) forces all CSS `animation-duration`/`transition-duration` to `0.01ms` under `prefers-reduced-motion: reduce`. This covers plain CSS transitions (button hovers, etc.) but **does not** cover Framer Motion's own JS-driven `animate`/`whileInView` transitions, which bypass CSS `transition` entirely.
- `useReducedMotion()` (Framer Motion's own hook) is used in exactly **one** place in the entire codebase: `Home.tsx:491`, to reduce the slide distance of the "Our Collections" cards. Every other `initial={{opacity:0,...}}` / `whileInView` animation on every page — hundreds of them, across Home, About, Contact, ModularKitchens, ModularWardrobes, FranchiseEnquiry, and FranchiseOpportunities — does not check reduced-motion at all, so a visitor who has asked their OS to minimise motion still gets the full slide/fade/stagger treatment on every section of every page (only the two big top-level transitions — preload curtain and page-nav curtain — are actually respected).
- Every one of those same elements starts at `opacity: 0` in its `initial` state, meaning content is invisible in the DOM until Framer Motion's IntersectionObserver fires (JS-dependent) — see §1.4 for the robustness angle of the same issue.

---

## 4. Technical & SEO

- **`<title>`/meta description**: 6 of 8 pages call `useDocumentMeta` with a unique title + description (Home, About, Contact, ModularKitchens, ModularWardrobes, FranchiseOpportunities) — all reasonable lengths, no duplicates among them. **`BookConsultation.tsx` and `FranchiseEnquiry.tsx` call it nowhere** — both routes keep whatever title was last set (or the static `index.html` default, "Leoz Cucine | Premium Kitchens & Wardrobes", on a fresh visit).
- **Open Graph / Twitter cards**: `index.html:14-17` sets one static `og:title`/`og:description`/`og:type` — global, not per-page, and never updated by `useDocumentMeta` (which only touches `document.title` and the description meta tag). Since this is a client-only SPA with no SSR/prerendering, **any social share of any inner page will show the homepage's OG title and description** — there is no per-page OG data at all, and no Twitter card meta tags (`twitter:card`, `twitter:image`, etc.) whatsoever.
- **Canonical URL**: none — no `<link rel="canonical">` anywhere.
- **`lang` attribute**: present and correct — `<html lang="en">` (`index.html:2`).
- **Favicon**: present (`index.html:11`), but see Critical Findings — it's a 1420×1032px, 93KB copy of the full logo, not an actual favicon-sized asset.
- **robots.txt / sitemap.xml**: neither exists anywhere in `public/` or the repo root.
- **Structured data (JSON-LD)**: none found anywhere (`application/ld+json`, `schema.org` — zero matches). For a local business/products site this is a missed opportunity for rich search results.
- **Internal links**: every literal `href="/…"` found (11 occurrences) and every nav-array-driven link (Header, Footer, Home's collection cards) resolves to a real, registered route. **No broken outgoing internal links.** The inverse problem exists instead: `/franchise-enquiry` has zero incoming links (see Critical Findings).
- **`target="_blank"`**: exactly one use in the whole codebase (`Contact.tsx:698`, the "View on Google Maps" link), and it correctly includes `rel="noopener noreferrer"` (`Contact.tsx:699`). **Clean.**
- **Build tooling**: `npm run build` (`tsc && vite build`) succeeds cleanly — 1,881 modules, built in 3.5s, no TypeScript errors. `npx tsc --noEmit` also passes clean. **`npm run lint` fails outright** — see Critical Findings.

---

## 5. Performance

- **Images are the dominant problem.** Every hero background and every one of the 19 "materials"/"layout" swatch images used on the Kitchens and Wardrobes pages is a full-resolution PNG, 1.7MB–2.9MB each (see Appendix D for the complete list with exact byte sizes and pixel dimensions). The project's own `size.md` spec — written by the team, presumably for exactly this purpose — calls for hero banners under 350KB and cards under 100–120KB in WebP. Current assets miss that target by 5–20×. This directly affects Largest Contentful Paint on every single page, most severely the homepage (`hero banner.png`, 1.99MB, is the LCP element on the highest-traffic route).
- **No image has explicit `width`/`height` attributes** — confirmed via a repo-wide grep, zero `<img>` tags set intrinsic dimensions (all sizing is done via CSS `width: '100%'`/`objectFit`). This means the browser cannot reserve layout space before an image decodes, so every image on every page is a potential Cumulative Layout Shift contributor.
- **`loading="lazy"` is applied inconsistently.** Present and correct on: `Home.tsx:232` (Philosophy image), `Home.tsx:613` (collection cards), `ModularKitchens.tsx:505` (Metal Accents detail), `ModularWardrobes.tsx:321,997,1147` (three below-fold images). **Missing** on three below-the-fold images that should have it: `About.tsx:263` (brand-story image, "Where It Began" section), `About.tsx:471` (director portrait, "Meet the Director" section), and `FranchiseEnquiry.tsx:1006` (showroom image — also a hotlinked Unsplash URL rather than a local asset).
- **The favicon is a full logo file** — see Critical Findings.
- **`director.png` and `Modular Wardrobe 1x1.png`** are actually JPEG-encoded files with a `.png` extension (confirmed via file-header inspection) — not a functional bug (browsers sniff content), but a sign the asset pipeline isn't tracking formats carefully.
- **Single JS bundle, no route-based code splitting.** `App.tsx` statically imports all 8 page components; the production build produces one 492KB JS bundle (127KB gzipped) that every visitor downloads regardless of which single page they view — including the ~1,600 lines of the unreachable `FranchiseEnquiry.tsx`. `React.lazy()` per-route would let a homepage-only visitor skip the other 7 pages' code.
- **Fonts**: Google Fonts loaded via `<link>` with `&display=swap` already set (`index.html:23`) and `rel="preconnect"` to both required origins (`index.html:20-21`) — this part is done correctly.
- **Dependencies**: `package.json` lists 5 runtime dependencies (framer-motion, lenis, lucide-react, react, react-dom) — all are actually imported and used somewhere in `src/`. No obviously unused runtime dependencies. (`sharp`, used by the root-level `pad_images.cjs` utility script, is not declared anywhere in `package.json` — that script would fail on a clean install; it's a one-off build tool, not part of the app itself.)
- **`npm audit`**: could not complete — the configured registry (`registry.npmmirror.com`, an npm mirror) returned `501 Not Implemented` for the security-advisories endpoint. Not a finding about the dependencies themselves, just a tooling/environment limitation — see §7.

---

## 6. Code Quality & Security

- **Secrets**: none found. Grepped for API keys, tokens, passwords, and common cloud-credential patterns across `src/` — zero hits. No `.env` file exists in the repo (tracked or otherwise).
- **XSS surface**: zero uses of `dangerouslySetInnerHTML` or raw `innerHTML` anywhere in `src/`. **Clean.**
- **`console.log`/`console.error`/`console.warn`/`debugger`**: zero occurrences anywhere in `src/`. **Clean.**
- **Forms / spam protection**: none of the four forms have CSRF protection, a honeypot field, or rate limiting — but this is expected and not really a finding, because **none of the forms actually submit anywhere**. Every `handleSubmit` (`Contact.tsx`, `BookConsultation.tsx`, `FranchiseEnquiry.tsx`, `FranchiseOpportunities.tsx`) just calls `e.preventDefault()` and flips a local `formSubmitted` state to show a "thank you" message — no `fetch`/`axios` call, no `action` attribute, no backend integration exists yet. All four "lead capture" forms on the site are currently non-functional decoration; whoever wires them up to a real backend will need to add the usual protections then.
- **Repo hygiene / committed build artifacts**: see Critical Findings — no `.gitignore`, `node_modules` (153MB) and `dist/` (50MB) committed, plus `test-results/`, `playwright-report/`, and `.vs/` (Visual Studio workspace state) also tracked. A stray root-level `copy-hero.js` references a hardcoded path from a different machine (`C:\Users\Dell\.gemini\antigravity-ide\brain\...`) — dead, one-off script, safe to delete.
- **Dead components**: 8 of the 9 files under `src/components/ui/` are unused by any page — `Card.tsx`, `Container.tsx`, `CTA.tsx`, `GalleryCard.tsx`, `Hero.tsx`, `PageHeader.tsx`, `RevealText.tsx`, `Section.tsx` (confirmed via import grep: only `ParallaxImage.tsx` is ever imported by a live page). They're still re-exported from `src/components/ui/index.ts`. Two of them (`GalleryCard.tsx:28`, `Card.tsx:41`) use clickable `<div>`/`<article>` with `onClick` and no keyboard handling — not live today, but worth fixing before anyone reintroduces them.
- **Large disabled dead-code blocks kept in source**, all behind `{false && (...)}`: `About.tsx:368-430` ("Our Approach" section), `Contact.tsx:565-656` (WhatsApp CTA section, contains the `[Phone Number]` placeholder from §1.1), `ModularWardrobes.tsx:910-1275` (two full sections — "Wardrobe Solutions" 3-card grid and "Finish Gallery" — duplicating content already shown elsewhere on the same page). These inflate file size and dev-build time for no runtime benefit (production minifiers typically strip `if(false)` branches, but they still cost review/maintenance time).
- **`FranchiseEnquiry.tsx` (1,619 lines) is itself effectively dead code** given it's unreachable from the UI — see Critical Findings.
- **Duplication**: the split-hero layout pattern (image column + editorial-text column, with the same `@media (max-width: 1023px)` override block) is copy-pasted near-verbatim across `About.tsx`, `Contact.tsx`, `ModularKitchens.tsx`, `ModularWardrobes.tsx`, and `FranchiseEnquiry.tsx` — five independent copies of essentially the same ~40-line responsive CSS block. A shared `<SplitHero>` component would remove ~150 lines of duplication and guarantee the breakpoint stays consistent (which, per §2.1, it currently doesn't).

---

## 7. Not verifiable from source — needs a live browser check

- Actual rendered focus order and whether keyboard focus visibly escapes to hidden content behind the open mobile drawer (source review strongly suggests yes, given no focus-trap code exists, but this needs a real browser + screen reader to confirm).
- Real Largest Contentful Paint / Cumulative Layout Shift / Lighthouse scores — file sizes and missing `width`/`height` attributes are strong proxies, but actual Core Web Vitals numbers need a live Lighthouse or CrUX run against a deployed build.
- Whether Google/Bing's crawlers, which do execute JavaScript, successfully pick up the client-side `document.title` changes from `useDocumentMeta` in practice (search-console verification needed) — only the OG-tag problem (§4) is certain, since link-preview bots for WhatsApp/Facebook/Twitter/LinkedIn are well documented as not executing JS.
- `npm audit` dependency-vulnerability results — blocked by the configured registry mirror not implementing the advisories endpoint in this environment; needs to be re-run against the default npm registry.
- Real device tap-target testing (measurements here are computed from CSS `min-height`/`padding`, not measured on an actual touchscreen).
- Whether the disabled `{false && (...)}` blocks are actually stripped from the production bundle by the minifier (very likely, given Terser's standard dead-code elimination, but not directly confirmed from source alone).

---

## Summary Table

| Area | Rating | Main issue |
|---|---|---|
| Content & Copy | 8/10 | Live placeholder text is gone; the two-franchise-pages duplication and the disabled-but-still-placeholder WhatsApp block are the main blemishes |
| Responsive & Layout | 7/10 | Solid, consistent 767/1023/1279 system almost everywhere; BookConsultation's 900px breakpoint and FranchiseEnquiry's 639px form breakpoint break that consistency |
| Accessibility | 6/10 | Excellent alt-text and heading discipline; let down by the unlabeled BookConsultation form, the hamburger button's missing focus style, and the incomplete mobile-drawer a11y (no Escape, no focus trap, no aria-expanded) |
| Technical & SEO | 6/10 | Clean routes and internal links, working build; no per-page OG tags, no canonical/sitemap/robots.txt/structured data, and two pages missing meta entirely |
| Performance | 4/10 | Images 5–20× over the team's own documented budget, no width/height anywhere, single unsplit JS bundle including a dead 1,600-line page |
| Code Quality & Security | 6/10 | No secrets, no XSS surface, clean build — but node_modules/dist committed to git, broken lint script, and a genuinely unreachable page shipping in every bundle |
| **Overall** | **6.5/10** | Strong creative foundation, undermined by an asset pipeline and repo hygiene that don't match the polish of the design |

---

## Appendix A — Full placeholder-text grep results

Case-insensitive search across `src/`, `public/`, `index.html`, and all root `.md` files for: `TODO`, `FIXME`, `TBD`, `TBC`, `XXX`, `HACK`, `Lorem`, `ipsum`, `dummy`, `sample text`, `your text here`, `client confirmation`, `to be confirmed`, `coming soon`, `changeme`, `insert here`, `example.com`, `test@`.

```
src/pages/Contact.tsx:624:  {/* TODO: wire to the real business WhatsApp number once available */}
src/pages/FranchiseEnquiry.tsx:1336:  placeholder="alexander@example.com"   (legitimate input placeholder, not unfinished content)
```

Bracket-style placeholder text (`[ ... ]`) search, excluding JSX inline-style object literals (`style={{...}}`, which false-match a naive `{{ }}` regex in this stack):

```
src/pages/Contact.tsx:620:  Chat with our team directly on WhatsApp: [Phone Number]   (dead code — inside {false && (...)})
```

Zero hits for `[Client Confirmation Required…]` or any equivalent bracketed-note pattern anywhere in the live-rendered path of any of the 8 pages.

---

## Appendix B — All media queries, by file

```
src/styles/globals.css:147   @media (max-width: 767px)
src/styles/globals.css:326   @media (prefers-reduced-motion: reduce)
src/styles/globals.css:343   @media (max-width: 1279px)
src/styles/globals.css:363   @media (max-width: 767px)
src/components/common/Header.tsx:268     @media (max-width: 1023px)
src/components/common/Footer.tsx:196     @media (max-width: 767px)
src/components/common/Footer.tsx:207     @media (min-width: 768px) and (max-width: 1023px)
src/components/ui/Timeline.tsx:129       @media (max-width: 992px)          [dead component]
src/components/ui/Timeline.tsx:134       @media (max-width: 640px)         [dead component]
src/pages/Home.tsx:168    @media (max-width: 767px)
src/pages/Home.tsx:463    @media (max-width: 900px)                        [inconsistent — stat grid]
src/pages/Home.tsx:477    @media (max-width: 400px)                        [one-off]
src/pages/Home.tsx:629    @media (max-width: 767px)
src/pages/Home.tsx:886    @media (max-width: 767px)
src/pages/Home.tsx:906    @media (max-width: 420px)
src/pages/Home.tsx:1420   @media (max-width: 767px)
src/pages/Home.tsx:1426   @media (min-width: 768px) and (max-width: 1023px)
src/pages/Home.tsx:1431   @media (min-width: 1024px) and (max-width: 1279px)
src/pages/About.tsx:199    @media (max-width: 1023px)
src/pages/About.tsx:1025   @media (max-width: 1023px)
src/pages/About.tsx:1045   @media (max-width: 767px)
src/pages/About.tsx:1056   @media (min-width: 768px) and (max-width: 1023px)
src/pages/Contact.tsx:220   @media (max-width: 1023px)
src/pages/Contact.tsx:792   @media (max-width: 1023px)
src/pages/Contact.tsx:810   @media (max-width: 767px)
src/pages/ModularKitchens.tsx:217    @media (max-width: 767px)
src/pages/ModularKitchens.tsx:237    @media (max-width: 420px)
src/pages/ModularKitchens.tsx:411    @media (max-width: 1023px)
src/pages/ModularKitchens.tsx:1040   @media (max-width: 1023px)
src/pages/ModularKitchens.tsx:1060   @media (max-width: 767px)
src/pages/ModularKitchens.tsx:1071   @media (min-width: 768px) and (max-width: 1023px)
src/pages/ModularKitchens.tsx:1076   @media (min-width: 1024px) and (max-width: 1279px)
src/pages/ModularWardrobes.tsx:735    @media (max-width: 1279px)
src/pages/ModularWardrobes.tsx:743    @media (max-width: 767px)
src/pages/ModularWardrobes.tsx:1282   @media (max-width: 1023px)
src/pages/ModularWardrobes.tsx:1300   @media (max-width: 767px)
src/pages/ModularWardrobes.tsx:1311   @media (min-width: 768px) and (max-width: 1023px)
src/pages/ModularWardrobes.tsx:1341   @media (max-width: 479px)           [one-off]
src/pages/BookConsultation.tsx:307    @media (max-width: 900px)           [inconsistent — whole page]
src/pages/FranchiseEnquiry.tsx:378    @media (max-width: 1023px)
src/pages/FranchiseEnquiry.tsx:1599   @media (max-width: 1023px)
src/pages/FranchiseEnquiry.tsx:1608   @media (max-width: 639px)           [inconsistent — form rows]
src/pages/FranchiseOpportunities.tsx:511   @media (max-width: 1023px)
src/pages/FranchiseOpportunities.tsx:531   @media (max-width: 767px)
```

---

## Appendix C — All contrast ratios computed

See §3.1 for the annotated table. Raw computation (WCAG 2.1 relative luminance, sRGB):

```
#B69A6B on #FFFFFF  → 2.68:1   FAIL (need 4.5:1)
#B69A6B on #F7F5F1  → 2.47:1   FAIL
#7A5F35 on #FFFFFF  → 5.97:1   PASS
#7A5F35 on #F7F5F1  → 5.49:1   PASS
#B69A6B on #181818  → 6.62:1   PASS
#B0ABA2 on #181818  → 7.77:1   PASS
#B0ABA2 on #202020  → 7.13:1   PASS
#595959 on #FFFFFF  → 7.00:1   PASS
#595959 on #F7F5F1  → 6.43:1   PASS
#4A4A4A on #FFFFFF  → 8.86:1   PASS
#181818 on #FFFFFF  → 17.76:1  PASS
#FFFFFF on #181818  → 17.76:1  PASS
```

---

## Appendix D — Image assets: size, dimensions, format

All figures measured directly from each file's header (not estimated). Sorted by file size, descending.

| File | Size | Dimensions | Format | Used via |
|---|---|---|---|---|
| `public/any4k.com-Animation_Modularite(720p).mp4` | 6.24 MB | — | MP4 | not confirmed referenced in `src/` — appears unused |
| `public/Testimonials Feature.png` | 2.94 MB | 1448×1086 | PNG | not confirmed referenced in `src/` — appears unused |
| `public/PHILOSOPHY.png` | 2.39 MB | 1209×1301 | PNG | `images.ts` → Home, About, ModularWardrobes |
| `public/Quartz Stone.png` | 2.31 MB | 1272×1236 | PNG | `images.ts` materials → ModularKitchens |
| `public/PHILOSOPHY_padded.png` | 2.24 MB | 1000×1000 | PNG | not confirmed referenced — optimized variant appears unused, original used instead |
| `form.png` (root) | 2.16 MB | 1717×916 | PNG | BookConsultation.tsx hero image |
| `public/Wood Veneer.png` | 2.08 MB | 1274×1235 | PNG | `images.ts` materials → ModularKitchens |
| `public/about.png` | 2.06 MB | 1800×874 | PNG | `images.ts` aboutHero → About |
| `public/Metal Accents.png` | 2.04 MB | 1274×1235 | PNG | `images.ts` materials + ModularKitchens.tsx:503 |
| `public/Glass Vitrines.png` | 2.03 MB | 1274×1235 | PNG | `images.ts` materials → ModularKitchens |
| `hero banner.png` (root) | 1.99 MB | 1517×1037 | PNG | `images.ts` → **Home.tsx hero, the LCP element of the highest-traffic page** |
| `public/Grand Villa Estate.png` | 1.98 MB | 1049×1499 | PNG | `images.ts` projects |
| `public/U -Shape Layout.png` | 1.96 MB | 1330×1182 | PNG | `images.ts` layouts → ModularKitchens |
| `public/Matte Finish.png` | 1.88 MB | 1274×1235 | PNG | `images.ts` materials |
| `public/Italian Marble.png` | 1.87 MB | 1274×1235 | PNG | `images.ts` materials |
| `public/Gloss Finish.png` | 1.83 MB | 1274×1235 | PNG | `images.ts` materials + modularKitchenHero |
| `public/Straight Layout.png` | 1.81 MB | 1330×1182 | PNG | `images.ts` layouts |
| `public/Parallel Layout.png` | 1.78 MB | 1330×1182 | PNG | `images.ts` layouts |
| `public/L-Shape Layout.png` | 1.72 MB | 1330×1182 | PNG | `images.ts` layouts |
| `public/Island Layout.png` | 1.71 MB | 1330×1182 | PNG | `images.ts` layouts |
| `src/assets/wardrobe_dressing.jpg` | 873 KB | 896×1200 | JPEG | `images.ts` wardrobeFittings |
| `src/assets/wardrobe_glass.jpg` | 800 KB | 896×1200 | JPEG | `images.ts` wardrobeFittings |
| `src/assets/kitchen_opus.jpg` | 780 KB | 896×1200 | JPEG | `images.ts` contactHero, consultationBg |
| `public/Sliding Wardrobes.jpg` | 776 KB | 2560×2250 | JPEG | `images.ts` wardrobeTypes |
| `src/assets/brand_philosophy.jpg` | 728 KB | 1376×768 | JPEG | not confirmed referenced — appears unused |
| `src/assets/kitchen_skyline.jpg` | 710 KB | 896×1200 | JPEG | not confirmed referenced — appears unused |
| `public/Modular Wardrobe 1x1.png` | 689 KB | 1024×1024 | **JPEG data mislabeled `.png`** | not confirmed referenced |
| `public/director.png` | 673 KB | 1024×1024 | **JPEG data mislabeled `.png`** | About.tsx:472 |
| `public/Master Walk-In Dressing Suite.webp` | 220 KB | 2480×1320 | WebP | `images.ts` projects — correctly optimized |
| `public/Modular Wardrobe.jpeg` | 214 KB | 1080×720 | JPEG | `images.ts` wardrobeCategory |
| `public/Smoked Glass Vitrine Wardrobe.jpg` | 181 KB | 1200×800 | JPEG | `images.ts` projects — correctly optimized |
| `public/Skyline Monolithic Island.jpg` | 171 KB | 1437×1080 | JPEG | `images.ts` projects — correctly optimized |
| `src/assets/kitchen_opus_padded.jpg` | 146 KB | 1920×1080 | JPEG | not confirmed referenced — optimized variant unused |
| `public/Fluted Walnut Executive Wardrobe.jpg` | 134 KB | 944×1104 | JPEG | `images.ts` projects |
| `public/Modular_Wardrobe_padded.jpeg` | 113 KB | 1000×1000 | JPEG | not confirmed referenced |
| `public/favicon.png` | 93 KB | **1420×1032** | PNG | **used as the site favicon — see Critical Findings** |
| `LEOZ logo.png` (root) | 93 KB | 1420×1032 | PNG | Logo.tsx — byte-identical to favicon.png |
| `public/Walk-in Wardrobes.jpg` | 79 KB | 650×650 | JPEG | `images.ts` wardrobeTypes |
| `public/modular kitchen.webp` | 60 KB | 1024×619 | WebP | `images.ts` kitchenCategory — correctly optimized |
| `public/modular_kitchen_padded.webp` | 46 KB | 1000×1000 | WebP | not confirmed referenced |
| 8 remaining `.jfif` finish/style swatches | 19–43 KB each | 415–739px range | JPEG (`.jfif`) | `images.ts` wardrobeFinishes/projects — all appropriately sized |

Everything below ~220KB in this table is reasonably sized for its use. The problem is concentrated entirely in the 19 files above 670KB, 18 of which are PNG.

---

## Appendix E — Raw output of lint / build / audit commands

**`npm run lint`:**
```
> leoz-cucine-luxury-homepage@1.0.0 lint
> eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0

'eslint' is not recognized as an internal or external command,
operable program or batch file.
```
(Confirmed: `eslint` is absent from both `package.json` and `node_modules/.bin` — this is not an environment fluke, a clean `npm install` reproduces the same failure.)

**`npm run build`:**
```
> leoz-cucine-luxury-homepage@1.0.0 build
> tsc && vite build

vite v5.4.21 building for production...
transforming...
✓ 1881 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                             1.38 kB │ gzip:   0.66 kB
dist/assets/LEOZ logo-Bf4f8doR.png          95.72 kB
dist/assets/kitchen_opus-DiELUR8n.jpg      780.24 kB
dist/assets/wardrobe_glass-CsRnRFQC.jpg    800.10 kB
dist/assets/wardrobe_dressing-DyZgNtaF.jpg 873.00 kB
dist/assets/hero banner-QvGTvavL.png      1,994.07 kB
dist/assets/form-Ddsinw34.png             2,158.80 kB
dist/assets/index-DVcxlfZE.css               8.65 kB │ gzip:   2.26 kB
dist/assets/index-DnFM1Lc-.js               492.49 kB │ gzip: 127.04 kB
✓ built in 3.52s
```
(Build succeeds cleanly. Note the asset sizes in the actual production output confirm §5's findings — these are the real bytes a browser downloads.)

**`npx tsc --noEmit`:** exits 0, no output — no type errors.

**`npm audit`:**
```
npm warn audit 404 Not Found - POST https://registry.npmmirror.com/-/npm/v1/security/advisories/bulk - [NOT_IMPLEMENTED] /-/npm/v1/security/* not implemented yet
npm error audit endpoint returned an error
```
(This environment's npm registry is configured to a mirror that doesn't implement the advisories endpoint — not a statement about the actual dependency versions. Needs re-running against `registry.npmjs.org` to get real results.)
