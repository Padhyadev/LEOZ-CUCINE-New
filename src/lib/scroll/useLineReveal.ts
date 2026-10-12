import { RefObject, useLayoutEffect } from 'react';
import { gsap, MEDIA, SplitText } from './gsap';
import { SCROLL_CONFIG } from './config';
import { markAnimated, revealTrigger } from './useReveal';

/* ==========================================================================
   useLineReveal — heading reveals line by line: each line slides up from
   inside its own overflow-clipped mask. Uses GSAP's (free, 3.13+) SplitText
   with autoSplit, so lines are re-measured after web fonts load and on
   resize without restarting a finished reveal. SplitText keeps the heading
   accessible (aria-label on the heading, split pieces aria-hidden).
   ========================================================================== */

export interface LineRevealOptions {
  delay?: number;
  /** true (default): reveal when scrolled into view; false: play on mount (hero) */
  onScroll?: boolean;
  start?: string;
}

export function useLineReveal<T extends HTMLElement>(ref: RefObject<T>, options: LineRevealOptions = {}) {
  const { delay = 0, onScroll = true, start } = options;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    markAnimated(el);

    const mm = gsap.matchMedia(el);
    mm.add(MEDIA.motion, () => {
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'lz-line',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: SCROLL_CONFIG.lines.duration,
            stagger: SCROLL_CONFIG.lines.stagger,
            delay,
            /* Plays on entering from either direction in replay mode */
            scrollTrigger: onScroll ? revealTrigger(el, start) : undefined,
          }),
      });
    });
    /* Reverting the matchMedia context also reverts the split, restoring
       the original heading markup (safe under StrictMode / HMR). */
    return () => mm.revert();
  }, [ref, delay, onScroll, start]);
}

export default useLineReveal;
