import { RefObject, useLayoutEffect } from 'react';
import { gsap, MEDIA } from './gsap';
import { SCROLL_CONFIG } from './config';
import { markAnimated, revealTrigger } from './useReveal';

/* ==========================================================================
   Image reveal: the image opens from a slight inset clip while settling
   from a gentle zoom; on desktop it then drifts slower than the page
   (parallax) inside its overflow-hidden frame. Exported as a plain function
   too, so the global AutoReveal can apply the same treatment.

   Parallax without layout changes: instead of making the image taller, the
   image settles at a scale just large enough to cover its own drift.
   ========================================================================== */

export interface ImageRevealOptions {
  parallax?: boolean;
  /** 'reveal' (default): clip-open + settle. 'enter-scale': for full-bleed
      backgrounds — no clip, the image just settles from a slight zoom,
      scrubbed to the section's entry. */
  mode?: 'reveal' | 'enter-scale';
}

/** Applies the reveal (and optional parallax) to `media` inside `frame`.
    Call inside a gsap context / matchMedia so it is reverted on cleanup. */
export function applyImageReveal(
  media: HTMLElement,
  frame: HTMLElement,
  { parallax = true, desktop = false, mode = 'reveal' }: ImageRevealOptions & { desktop?: boolean }
) {
  if (mode === 'enter-scale') {
    gsap.fromTo(
      media,
      { scale: SCROLL_CONFIG.finalCta.bgScaleFrom },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'top top', scrub: true },
      }
    );
    return;
  }

  const { clipInset, scaleFrom, duration } = SCROLL_CONFIG.image;
  const drift = SCROLL_CONFIG.parallax.imageYPercent;
  const withParallax = parallax && desktop;
  const settleScale = withParallax ? 1 + drift / 100 : 1;

  gsap.fromTo(
    media,
    { clipPath: `inset(${clipInset}% ${clipInset}% ${clipInset}% ${clipInset}%)`, scale: scaleFrom },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: settleScale,
      duration,
      scrollTrigger: revealTrigger(frame),
      onStart() {
        gsap.set(media, { willChange: 'transform' });
      },
      /* Keep the transform when parallax still needs it; in replay mode the
         clip must stay too, because the reveal resets to it off screen */
      clearProps: SCROLL_CONFIG.reveal.replay
        ? 'willChange'
        : withParallax
          ? 'clipPath,willChange'
          : 'clipPath,willChange,transform',
    }
  );

  if (withParallax) {
    gsap.fromTo(
      media,
      { yPercent: -drift / 2 },
      {
        yPercent: drift / 2,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  }
}

/** Reveal the first <img>/<video> inside the frame ref */
export function useImageReveal<T extends HTMLElement>(frameRef: RefObject<T>, options: ImageRevealOptions = {}) {
  const { parallax = true, mode = 'reveal' } = options;

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const media = frame?.querySelector<HTMLElement>('img, video');
    if (!frame || !media) return;
    markAnimated(frame);

    const mm = gsap.matchMedia(frame);
    mm.add({ motion: MEDIA.motion, desktop: MEDIA.desktopMotion }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (motion) applyImageReveal(media, frame, { parallax, desktop, mode });
    });
    return () => mm.revert();
  }, [frameRef, parallax, mode]);
}

export default useImageReveal;
