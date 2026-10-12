import { RefObject, useLayoutEffect } from 'react';
import { gsap, MEDIA, ScrollTrigger } from './gsap';
import { SCROLL_CONFIG } from './config';
import { batchReveal, markAnimated } from './useReveal';

/* ==========================================================================
   useStepScrub — a numbered sequence that is "walked through" with scroll.

   Desktop: the block pins in the centre of the screen and each scroll
   increment activates the next step (`.is-active` on that step and every
   step before it; `.is-scrubbing` on the scope while this mode is on, so
   the muted/active styling only exists when JS drives it). If the block is
   taller than the viewport it is not pinned — the steps still activate as
   it scrolls past — so pinning can never hide content or leave a gap.

   Mobile and reduced motion: no pinning. Mobile gets the standard stacked
   fade-up; reduced motion shows every step immediately.
   ========================================================================== */

export interface StepScrubOptions {
  /** Selector for the steps, scoped to the ref */
  items: string;
}

const MOBILE_MOTION = `(max-width: ${SCROLL_CONFIG.mobileMaxWidth}px) and (prefers-reduced-motion: no-preference)`;

export function useStepScrub<T extends HTMLElement>(scopeRef: RefObject<T>, { items }: StepScrubOptions) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    markAnimated(scope);
    const steps = gsap.utils.toArray<HTMLElement>(items, scope);
    if (!steps.length) return;

    const mm = gsap.matchMedia(scope);

    mm.add(MEDIA.desktopMotion, () => {
      const fits = scope.offsetHeight <= window.innerHeight * 0.92;
      let active = -2;
      const setActive = (index: number) => {
        if (index === active) return;
        active = index;
        steps.forEach((step, i) => step.classList.toggle('is-active', i <= index));
      };

      scope.classList.add('is-scrubbing');
      ScrollTrigger.create({
        trigger: scope,
        start: fits ? 'center center' : 'top 75%',
        end: fits ? `+=${steps.length * SCROLL_CONFIG.journey.scrollPerStep}` : 'bottom 40%',
        pin: fits,
        anticipatePin: 1,
        /* progress 0 → nothing active; each 1/n of the way lights the next step */
        onUpdate: (self) => setActive(Math.ceil(self.progress * steps.length) - 1),
        onRefresh: (self) => setActive(Math.ceil(self.progress * steps.length) - 1),
      });

      /* Triggers further down the page may already exist; re-measure them
         now that the pin adds scroll distance above them. */
      const frame = requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });

      return () => {
        cancelAnimationFrame(frame);
        scope.classList.remove('is-scrubbing');
        steps.forEach((step) => step.classList.remove('is-active'));
      };
    });

    mm.add(MOBILE_MOTION, () => batchReveal(steps));

    return () => mm.revert();
  }, [scopeRef, items]);
}

export default useStepScrub;
