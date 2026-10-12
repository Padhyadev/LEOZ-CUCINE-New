import { RefObject, useLayoutEffect } from 'react';
import { gsap, MEDIA } from './gsap';
import { SCROLL_CONFIG } from './config';
import { revealTrigger } from './useReveal';

/* ==========================================================================
   useCountUp — counts a number up from 0 once, when scrolled into view.
   The final value is what the markup renders, so without JS (and for
   reduced-motion visitors, and crawlers) the real number is shown and
   nothing ever flashes "0". Only when the animation is armed does the text
   switch to 0, inside a layout effect, before the first paint.
   ========================================================================== */

export interface CountUpOptions {
  to: number;
  suffix?: string;
  /** Number formatting locale — 'en-IN' groups as 20,000 / 1,00,000 */
  locale?: string;
  /** Element whose entry starts the count (default: the counter itself) */
  trigger?: RefObject<HTMLElement>;
}

export const formatCount = (n: number, suffix = '', locale = 'en-IN') =>
  `${Math.round(n).toLocaleString(locale)}${suffix}`;

export function useCountUp<T extends HTMLElement>(ref: RefObject<T>, options: CountUpOptions) {
  const { to, suffix = '', locale = 'en-IN', trigger } = options;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);
    mm.add(MEDIA.motion, () => {
      const counter = { value: 0 };
      el.textContent = formatCount(0, suffix, locale);
      gsap.to(counter, {
        value: to,
        duration: SCROLL_CONFIG.countUp.duration,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = formatCount(counter.value, suffix, locale);
        },
        /* Counts again each time it comes into view in replay mode */
        scrollTrigger: revealTrigger(trigger?.current ?? el, SCROLL_CONFIG.countUp.start),
      });
      /* Restore the real value if the context is reverted mid-count */
      return () => {
        el.textContent = formatCount(to, suffix, locale);
      };
    });
    return () => mm.revert();
  }, [ref, to, suffix, locale, trigger]);
}

export default useCountUp;
