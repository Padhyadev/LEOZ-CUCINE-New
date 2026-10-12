import { useEffect } from 'react';
import { gsap, prefersReducedMotion, isMobileViewport } from './gsap';
import { applyImageReveal } from './useImageReveal';
import { batchReveal, markAnimated, revealTrigger } from './useReveal';
import { SCROLL_CONFIG } from './config';

/* ==========================================================================
   AutoReveal — the global layer of the reveal system.
   Every page gets scroll reveals without per-section code: headings,
   paragraphs, buttons, cards and anything marked [data-reveal] fade up in
   staggered batches; images clip-reveal (with parallax in overflow-hidden
   frames on desktop). It stays out of the way of:
     - elements owned by a scroll hook ([data-anim] scopes),
     - elements already animated by framer-motion (inline opacity/transform),
     - the hero (first section), header, footer, nav, forms, dialogs and
       collapsed FAQ answers.
   The hidden start state is only applied by this script, so content is
   visible if JS fails; reduced-motion visitors get no animation at all.
   ========================================================================== */

const CANDIDATES = [
  '[data-reveal]',
  'h1',
  'h2',
  'h3',
  'h4',
  'p',
  'li',
  'blockquote',
  '[class*="btn"]',
  'img',
  'video',
].join(', ');

const SKIP_INSIDE = [
  'header',
  'footer',
  'nav',
  'form',
  '[role="dialog"]',
  '[class*="faq__panel"]',
  '[data-anim]',
  '[data-fx-skip]',
].join(', ');

const MIN_MEDIA_WIDTH = 120;

/* The first section of a multi-section page is the hero */
const getHero = (main: Element): Element | null => {
  const sections = main.querySelectorAll('section');
  return sections.length > 1 ? sections[0] : null;
};

const isEligible = (el: HTMLElement, main: Element, hero: Element | null): boolean => {
  if (el.dataset.autoReveal !== undefined) return false;
  /* Already moving with an ancestor revealed by this layer */
  if (el.parentElement?.closest('[data-auto-reveal]')) return false;
  if (el.closest(SKIP_INSIDE)) return false;
  if (hero?.contains(el)) return false;

  /* Content inside a sticky block stays on screen while the page scrolls past
     its layout position, so position-based reveals would hide it while it is
     still visible — leave it alone */
  for (let n: HTMLElement | null = el; n && n !== main; n = n.parentElement) {
    if (window.getComputedStyle(n).position === 'sticky') return false;
  }

  /* framer-motion animates via inline styles — leave those elements alone */
  const animatedAncestor = el.closest('[style*="opacity"], [style*="transform"]');
  if (animatedAncestor && main.contains(animatedAncestor)) return false;

  const isMedia = el.matches('img, video');
  if (!isMedia && !el.matches('[data-reveal]') && !el.textContent?.trim()) return false;

  const style = window.getComputedStyle(el);
  if (style.display === 'inline' || style.display === 'none' || style.position === 'fixed') return false;
  if (isMedia && el.getBoundingClientRect().width < MIN_MEDIA_WIDTH) return false;
  return true;
};

const clipsOverflow = (el: HTMLElement | null) => {
  if (!el) return false;
  const { overflow, overflowX, overflowY } = window.getComputedStyle(el);
  return [overflow, overflowX, overflowY].some((v) => v === 'hidden' || v === 'clip');
};

export const AutoReveal: React.FC<{ routeKey: string }> = ({ routeKey }) => {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => undefined);

    const scan = () => {
      const main = document.querySelector('main');
      if (!main) return;
      const hero = getHero(main);
      const blocks: HTMLElement[] = [];
      const media: HTMLElement[] = [];

      /* Mask slides: text marked [data-mask-slide] rises out of its clipping
         parent. The trigger is the visible parent — the hidden text itself
         never "enters" the screen while clipped, which is what left headings
         stuck invisible. The attribute value is an optional delay in seconds. */
      main.querySelectorAll<HTMLElement>('[data-mask-slide]:not([data-anim])').forEach((el) => {
        markAnimated(el);
        const mask = el.parentElement ?? el;
        ctx.add(() =>
          gsap.from(el, {
            yPercent: 110,
            duration: SCROLL_CONFIG.lines.duration,
            delay: parseFloat(el.dataset.maskSlide || '0') || 0,
            scrollTrigger: revealTrigger(mask),
          })
        );
      });

      main.querySelectorAll<HTMLElement>(CANDIDATES).forEach((el) => {
        if (!isEligible(el, main, hero)) return;
        el.dataset.autoReveal = '';
        const isMedia = el.matches('img, video');
        /* Images in a clipping frame get the clip/zoom reveal; loose images just fade up */
        if (isMedia && clipsOverflow(el.parentElement)) media.push(el);
        else blocks.push(el);
      });

      if (!blocks.length && !media.length) return;

      ctx.add(() => {
        batchReveal(blocks);
        const desktop = !isMobileViewport();
        media.forEach((el) => applyImageReveal(el, el.parentElement as HTMLElement, { parallax: true, desktop }));
      });
    };

    /* Pages are lazy-loaded and some content mounts later (tabs, success
       states), so rescan whenever nodes are added. MutationObserver
       callbacks run before the next paint, so new content never flashes
       visible before its hidden start state is applied. */
    const observer = new MutationObserver((records) => {
      if (records.some((r) => r.addedNodes.length > 0)) scan();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    scan();

    return () => {
      observer.disconnect();
      ctx.revert();
      document.querySelectorAll('[data-auto-reveal]').forEach((el) => el.removeAttribute('data-auto-reveal'));
    };
  }, [routeKey]);

  return null;
};

export default AutoReveal;
