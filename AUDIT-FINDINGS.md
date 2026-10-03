# LEOZ CUCINE — Website Audit Findings

Audit date: August 2026
Scope: All pages, all sections, scroll-through review of Home, Modular Kitchens, Modular Wardrobes, Projects, About, Manufacturing, Contact, Book Consultation, Blog/Journal.

---

## 🔴 Blocking issues (fix first)

1. **Logo 404s on every page**
   - `src/components/common/Logo.tsx:24` loads `/LEOZ logo.png`, but the file is **not** in `public/` (only `.htaccess` is).
   - The browser requests it, gets a `404`, then the `onError` fallback swaps in a base64 copy from `src/assets/logoData.ts`.
   - The logo *visually* appears, but every page emits an HTTP 404.
   - This also **fails the existing test** — `tests/route-check.spec.ts` captures HTTP >= 400 responses and asserts `errors` is empty.

2. **Logo is a dead link**
   - `src/components/common/Logo.tsx:13` uses `href="#"` — clicking the logo goes nowhere (or to top of page) instead of `/`.

3. **Playwright audit will time out with the current config**
   - `playwright.config.ts` sets `slowMo: 1500`, which adds ~1.5s to **every** Playwright API call.
   - `tests/route-check.spec.ts` scrolls via a `page.evaluate` loop (up to 20 iterations, each with 3 `page.evaluate` calls + waits).
   - Each route burns ~30–43s against the default 30s per-test timeout → the suite fails on timeouts for nearly every route.
   - The test needs a raised timeout (e.g. `test.setTimeout(120_000)`) to complete in a visible browser.

---

## 🟠 Content & assets

4. **Stock photos masquerading as the brand**
   - Every inner page reuses Unsplash interiors.
   - `images.innerPageHero` and `images.modularKitchenHero` are the **same URL** (`src/assets/images.ts:18-19`).
   - No real LEOZ project, factory, or founder photography exists.

5. **About page has literal placeholders**
   - Founder name is the string `Founder Name` (`src/pages/About.tsx:444`).
   - Founder photo is a generic Unsplash headshot.
   - Certifications / "20 years" / "state-of-the-art manufacturing" are copy claims with no supporting data.

6. **Blog is fake / empty**
   - `/blog`, `/blog/some-post`, and `/journal` all render the same listing (`src/App.tsx:60-62` ignores the slug).
   - "Read Story" opens a modal with only title + short description — no article body.
   - Dates are fabricated (e.g. "August 2026"); authors are fabricated.

7. **Placeholder / inconsistent contact data**
   - Footer uses `contact@leozcucine.com`, `+1 (800) 555-LEOZ`, and social links to bare `instagram.com` / `facebook.com`.
   - Contact & Book Consultation pages use India-based details (`+91 98765 43210`, Ahmedabad studio). Inconsistent.
   - Privacy / terms links on BookConsultation point to nonexistent `#privacy` / `#terms` anchors.

---

## 🟡 UX / accessibility

8. **"Clickable-looking" dead elements**
   - Kitchen layout cards, wardrobe type cards, and "Selected Modular Residences" cards use `cursor: pointer` but have **no `onClick`, no keyboard handler** (`src/pages/ModularKitchens.tsx`, `ModularWardrobes.tsx`).
   - Users click and nothing happens.

9. **Lightbox modals are not keyboard accessible**
   - Projects lightbox and Blog "Read Story" modal lack `role="dialog"`, `aria-modal`, and focus trap (`src/pages/Projects.tsx`, `Blog.tsx`).

10. **SPA navigation breaks native link behavior**
    - Internal links use `preventDefault()` + `history.pushState` everywhere (Header, CTA, cards).
    - Middle-click / CMD-click (open in new tab) is broken.
    - No full-page reload and no SEO-friendly server rendering.

---

## 🟢 Code health

11. **Large amount of dead code**
    - `Card.tsx`, `GalleryCard.tsx`, `Timeline.tsx`, `RevealText.tsx`, `PageHeader.tsx` / `Hero.tsx`, and `3d-interactive-card-gallery.tsx` are unused.
    - `3d-interactive-card-gallery.tsx` duplicates Blog's SocialShare logic.
    - `copy-hero.js` references a hardcoded `C:\Users\...` path and is dead.

12. **Heavy copy/paste duplication**
    - Responsive overrides are duplicated inline `<style>` blocks in every page.
    - The split-hero layout is copy-pasted across ModularKitchens / ModularWardrobes / Projects.

13. **Leftover template references**
    - "MARTYN L. BULLARD" style copy leaked in `src/pages/Projects.tsx` — leftover from another template.

---

## Suggested improvements

- Move the real logo into `public/` (or import it as an asset) to eliminate the 404; point the logo link to `/`.
- Raise the Playwright per-test timeout (e.g. `test.setTimeout(120_000)`) so the headed scroll-through audit can pass.
- Replace stock imagery with real LEOZ project / studio / founder photography.
- Fill in About placeholders (founder name, real certifications, verifiable stats).
- Build actual blog detail content (route `BlogPost` by slug) or remove the Blog until real articles exist.
- Reconcile contact details between Footer and Contact page; implement real privacy/terms pages or remove the links.
- Give dead cards real click behavior (link to a detail page / enquiry form) or remove the pointer affordance.
- Make modals accessible: `role="dialog"`, `aria-modal`, focus trap, Escape-to-close.
- Remove dead code and deduplicate the repeated inline `<style>` blocks into shared CSS.
- Strip leftover template references (MARTYN L. BULLARD).

---

## Live browser verification (headed Chromium, 1920×1080, slowMo 1500ms, ignoreHTTPSErrors)

Ran a full Playwright audit across all 11 routes: `/`, `/modular-kitchens`, `/modular-wardrobes`, `/projects`, `/about`, `/manufacturing`, `/contact`, `/book-consultation`, `/blog`, `/journal`, `/blog/some-post`. Each page was scrolled to the bottom (5 scroll positions + full-page screenshot captured per route in `test-results/audit/<page>/`).

### Verified OK
- Every route renders meaningful content, reaches full scroll height, and produces **no JavaScript exceptions**, **no failed network requests**, and **no images missing `alt`**.
- All routes load fully under the slowMo-headed config once timeouts were raised.

### Confirmed live issues
- **Logo 404 on every page** (HTTP 404 console error on `/LEOZ logo.png`) — the logo file was not in `public/`.
- **Missing favicon** — browsers requested `/favicon.ico` → 404 console error on every page.
- **Dead `#` anchors** on every page (header logo + footer logo links).
- **Dead `#privacy` / `#terms` links** on `/book-consultation`.
- **`/blog`, `/journal`, `/blog/some-post` are byte-identical** (same body length, same H1) — slug routing does not exist (`src/App.tsx:60-62`).

---

## Fix status

- ✅ **Logo 404 fixed** — `src/components/common/Logo.tsx` now imports `../../../LEOZ logo.png` via Vite (no more `/LEOZ logo.png` request, no `onError` fallback needed).
- ✅ **Logo dead link fixed** — `href="#"` changed to `href="/"` with client-side navigation (pushState + popstate) and smooth scroll-to-top when already home.
- ✅ **Missing favicon fixed** — added `public/favicon.png` and `<link rel="icon">` in `index.html` (eliminates the favicon 404).
- ✅ **Playwright timeout fixed** — `tests/route-check.spec.ts` now sets `test.setTimeout(120_000)` per test; the suite passes all 11 routes under slowMo.
- ✅ **Excessive section spacing fixed** — measured 240px/240px section padding on 6 pages → **480px whitespace between sections** on desktop (280px mobile). Reduced via one token: `--space-section-padding-desktop` changed from `clamp(140px, 14vw, 240px)` to `clamp(72px, 8vw, 120px)` in `src/styles/tokens.css`. All pages using the token (Home, Kitchens, Wardrobes, About, Manufacturing, Contact) now use 120/120 → 240px inter-section whitespace (72/72 → 144px on mobile). The two CTA bands on Kitchens/Wardrobes were also switched to the token (were raw 173px). Projects & Blog keep their own values (untouched).
- ⏳ **Open** — `/book-consultation` `#privacy` / `#terms` dead links (need real policy pages or removal).
- ⏳ **Open** — Blog slug routing (all blog/journal URLs render the same listing).
- ⏳ **Open** — Dead cards (layout/wardrobe/residence cards with `cursor:pointer` but no action).
- ⏳ **Open** — Modal accessibility (Projects lightbox, Blog modal: no `role="dialog"`/focus trap).
- ⏳ **Open** — Real photography, About placeholders, contact-data reconciliation, dead-code removal, duplicated inline `<style>` cleanup.

