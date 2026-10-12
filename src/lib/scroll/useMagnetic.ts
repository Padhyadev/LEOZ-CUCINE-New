import { RefObject, useLayoutEffect } from 'react';
import { gsap } from './gsap';
import { SCROLL_CONFIG } from './config';

/* ==========================================================================
   useMagnetic — the element drifts up to `magnetic.max` px toward the
   cursor and settles back on leave. Desktop with a fine pointer only;
   disabled for reduced motion and while the element is :disabled.

   The drift is applied through the CSS `translate` property (via the
   --lz-mx / --lz-my custom properties, see scroll.css), which composes with
   — instead of overwriting — any `transform` used by scroll reveals.
   ========================================================================== */

const MAGNETIC_MEDIA = `(min-width: ${SCROLL_CONFIG.mobileMaxWidth + 1}px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)`;

export interface MagneticOptions {
  /** Also press in slightly (scale 0.97) while the pointer is down */
  press?: boolean;
}

export function useMagnetic<T extends HTMLElement>(ref: RefObject<T>, { press = false }: MagneticOptions = {}) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia(el);
    mm.add(MAGNETIC_MEDIA, () => {
      const { max, strengthX, strengthY, duration } = SCROLL_CONFIG.magnetic;
      const clamp = gsap.utils.clamp(-max, max);
      el.dataset.magnetic = '';
      gsap.set(el, { '--lz-mx': '0px', '--lz-my': '0px' });

      const moveTo = (x: number, y: number) =>
        gsap.to(el, { '--lz-mx': `${x}px`, '--lz-my': `${y}px`, duration, overwrite: 'auto' });

      const onMove = (e: MouseEvent) => {
        if (el.matches(':disabled')) return;
        const r = el.getBoundingClientRect();
        moveTo(clamp((e.clientX - (r.left + r.width / 2)) * strengthX), clamp((e.clientY - (r.top + r.height / 2)) * strengthY));
      };
      const reset = () => moveTo(0, 0);
      const onDown = () => !el.matches(':disabled') && gsap.to(el, { scale: 0.97, duration: 0.15 });
      const onUp = () => gsap.to(el, { scale: 1, duration: 0.25, clearProps: 'scale' });

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', reset);
      el.addEventListener('blur', reset);
      if (press) {
        el.addEventListener('pointerdown', onDown);
        el.addEventListener('pointerup', onUp);
        el.addEventListener('pointerleave', onUp);
      }

      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', reset);
        el.removeEventListener('blur', reset);
        el.removeEventListener('pointerdown', onDown);
        el.removeEventListener('pointerup', onUp);
        el.removeEventListener('pointerleave', onUp);
        el.style.removeProperty('--lz-mx');
        el.style.removeProperty('--lz-my');
        delete el.dataset.magnetic;
      };
    });
    return () => mm.revert();
  }, [ref, press]);
}

export default useMagnetic;
