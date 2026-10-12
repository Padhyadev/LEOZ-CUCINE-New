import { RefObject, useLayoutEffect } from 'react';
import { gsap, MEDIA } from './gsap';
import { SCROLL_CONFIG } from './config';
import { batchReveal, markAnimated } from './useReveal';

/* ==========================================================================
   useListReveal — list items fade up in a stagger as they enter; with
   `drawLines`, each item's divider draws left → right just after it rises.
   The divider is drawn by CSS from the --lz-line custom property
   (scaleX(var(--lz-line, 1))): it rests at 1, so without JS and for
   reduced motion the line simply shows; this hook only animates 0 → 1.
   ========================================================================== */

export interface ListRevealOptions {
  /** Selector for the items, scoped to the ref */
  items: string;
  drawLines?: boolean;
}

export function useListReveal<T extends HTMLElement>(ref: RefObject<T>, { items, drawLines = false }: ListRevealOptions) {
  useLayoutEffect(() => {
    const scope = ref.current;
    if (!scope) return;
    markAnimated(scope);

    const mm = gsap.matchMedia(scope);
    mm.add(MEDIA.motion, () => {
      const els = gsap.utils.toArray<HTMLElement>(items, scope);
      if (drawLines) gsap.set(els, { '--lz-line': 0 });
      batchReveal(
        els,
        drawLines
          ? (batch) =>
              gsap.to(batch, {
                '--lz-line': 1,
                duration: SCROLL_CONFIG.reveal.duration,
                stagger: SCROLL_CONFIG.reveal.stagger,
                delay: SCROLL_CONFIG.lists.lineDelay,
              })
          : undefined,
        /* Replay mode: un-draw once the item has left the screen */
        drawLines ? (batch) => gsap.set(batch, { '--lz-line': 0 }) : undefined
      );
    });
    return () => mm.revert();
  }, [ref, items, drawLines]);
}

export default useListReveal;
