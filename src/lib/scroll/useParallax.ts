import { RefObject, useLayoutEffect } from 'react';
import { gsap, MEDIA } from './gsap';
import { SCROLL_CONFIG } from './config';
import { markAnimated } from './useReveal';

/* ==========================================================================
   useParallax — moves an element at a different speed from the page while
   it crosses the viewport (scrubbed to scroll). Desktop only: disabled
   under the mobile breakpoint and for reduced-motion visitors, where the
   element simply sits in its normal position.
   Either give a symmetric `yPercent` drift, or an explicit px range
   (`fromY` → `toY`) — e.g. a card held 80px lower that drifts ±30px.
   ========================================================================== */

export interface ParallaxOptions {
  /** Total drift as % of the element's own height (centred on its resting place) */
  yPercent?: number;
  /** Explicit start offset in px (overrides yPercent) */
  fromY?: number;
  /** Explicit end offset in px (overrides yPercent) */
  toY?: number;
  /** Element whose passage through the viewport drives the motion (default: the element) */
  trigger?: RefObject<HTMLElement>;
}

export function useParallax<T extends HTMLElement>(ref: RefObject<T>, options: ParallaxOptions = {}) {
  const { yPercent = SCROLL_CONFIG.parallax.imageYPercent, fromY, toY, trigger } = options;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    markAnimated(el);

    const usePx = fromY !== undefined && toY !== undefined;
    const mm = gsap.matchMedia(el);
    mm.add(MEDIA.desktopMotion, () => {
      gsap.fromTo(
        el,
        usePx ? { y: fromY } : { yPercent: -yPercent / 2 },
        {
          ...(usePx ? { y: toY } : { yPercent: yPercent / 2 }),
          ease: 'none',
          scrollTrigger: {
            trigger: trigger?.current ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });
    return () => mm.revert();
  }, [ref, yPercent, fromY, toY, trigger]);
}

export default useParallax;
