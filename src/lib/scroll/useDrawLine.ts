import { RefObject, useLayoutEffect } from 'react';
import { gsap, MEDIA } from './gsap';
import { SCROLL_CONFIG } from './config';
import { markAnimated, revealTrigger } from './useReveal';

/* ==========================================================================
   useDrawLine — a thin rule draws itself (scaleX 0 → 1) when it enters the
   viewport. The draw direction follows the element's CSS transform-origin,
   so centred rules grow from the middle and left rules from the edge.
   ========================================================================== */

export interface DrawLineOptions {
  delay?: number;
  duration?: number;
  /** Element whose entry starts the draw (default: the line itself) */
  trigger?: RefObject<HTMLElement>;
}

export function useDrawLine<T extends HTMLElement>(ref: RefObject<T>, options: DrawLineOptions = {}) {
  const { delay = 0, duration = SCROLL_CONFIG.reveal.duration, trigger } = options;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    markAnimated(el);

    const mm = gsap.matchMedia(el);
    mm.add(MEDIA.motion, () => {
      gsap.from(el, {
        scaleX: 0,
        duration,
        delay,
        scrollTrigger: revealTrigger(trigger?.current ?? el),
        /* Replay mode resets to scaleX 0 off screen, so the transform must stay */
        clearProps: SCROLL_CONFIG.reveal.replay ? '' : 'transform',
      });
    });
    return () => mm.revert();
  }, [ref, delay, duration, trigger]);
}

export default useDrawLine;
