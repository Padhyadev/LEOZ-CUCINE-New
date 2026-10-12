import { RefObject, useLayoutEffect } from 'react';
import { gsap, MEDIA, ScrollTrigger } from './gsap';
import { SCROLL_CONFIG } from './config';

/* ==========================================================================
   useReveal — fade-up (or side entrance) on scroll for an element or a set
   of its children. Runs in a layout effect so the hidden start state is
   applied before the first paint (no flash), and only when JS runs:
   without JS, or for reduced-motion visitors, content simply renders
   visible. Side entrances (`x`) are desktop-only; on mobile the same
   element uses the standard fade-up so nothing slides in from off-screen.

   Replay mode (SCROLL_CONFIG.reveal.replay): reveals play every time the
   content comes into view — rising from below when scrolling down, dropping
   in from above when scrolling up — and quietly reset once it has left the
   screen. With replay off, each reveal plays once on the way down.
   ========================================================================== */

export interface RevealOptions {
  /** Selector for children to reveal (scoped to the ref); omit to reveal the element itself */
  targets?: string;
  y?: number;
  /** Horizontal entrance in px (negative = from the left); desktop only */
  x?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  /** false: play on mount instead of when scrolled into view */
  onScroll?: boolean;
}

/** Hidden-state bookkeeping shared by every reveal: promote to a compositor
    layer only while moving, then hand styling back to CSS. */
export const motionLifecycle = {
  onStart(this: gsap.core.Tween) {
    gsap.set(this.targets(), { willChange: 'transform, opacity' });
  },
  clearProps: 'willChange,transform,opacity',
};

/** Marks an element as owned by a scroll hook so the global AutoReveal skips it */
export const markAnimated = (el: HTMLElement) => {
  el.dataset.anim = '';
};

/** ScrollTrigger settings for simple play-on-enter tweens (line reveals,
    image clips, drawn rules, counters). In replay mode the tween plays on
    entering from either direction and resets once fully scrolled out. */
export const revealTrigger = (trigger: Element, start?: string): ScrollTrigger.Vars => {
  const { replay, replayStart, replayEnd } = SCROLL_CONFIG.reveal;
  return replay
    ? { trigger, start: replayStart, end: replayEnd, toggleActions: 'play reset play reset' }
    : { trigger, start: start ?? SCROLL_CONFIG.reveal.start, once: true };
};

/** Direction-aware entrance shared by useReveal and batchReveal.
    `dir` 1 = entering from below (scrolling down), -1 = from above (scrolling up). */
const showEls = (
  els: Element[],
  dir: 1 | -1,
  { x = 0, y, duration, stagger, delay = 0 }: { x?: number; y: number; duration: number; stagger: number; delay?: number }
) =>
  gsap.fromTo(
    els,
    { opacity: 0, x, y: y * dir },
    { opacity: 1, x: 0, y: 0, duration, stagger, delay, overwrite: true, ...motionLifecycle }
  );

const hideEls = (els: Element[]) => {
  gsap.killTweensOf(els);
  gsap.set(els, { opacity: 0 });
};

/** Staggered fade-up for a list of elements, in batches as they enter.
    `onShow` / `onHide` run alongside each batch for extra effects (e.g.
    drawing divider lines). Call inside a gsap context / matchMedia so it is
    reverted on cleanup. */
export function batchReveal(
  els: HTMLElement[],
  onShow?: (batch: Element[]) => void,
  onHide?: (batch: Element[]) => void
) {
  if (!els.length) return;
  const { distance, duration, stagger, maxStaggerTotal, start, replay, replayStart, replayEnd } = SCROLL_CONFIG.reveal;
  gsap.set(els, { opacity: 0, y: distance });

  const show = (batch: Element[], dir: 1 | -1) => {
    /* After a jump (anchor link, restored scroll position) a batch can hold
       dozens of elements: anything already off screen appears at once, and
       only what is on screen staggers — with the total stagger capped so
       the last item never waits long. */
    const offScreen = batch.filter((el) => {
      const r = el.getBoundingClientRect();
      return r.bottom < 0 || r.top > window.innerHeight;
    });
    const onScreen = batch.filter((el) => !offScreen.includes(el));
    if (offScreen.length) gsap.set(offScreen, { opacity: 1, y: 0, clearProps: 'transform,opacity' });
    if (onScreen.length) {
      showEls(onScreen, dir, { y: distance, duration, stagger: Math.min(stagger, maxStaggerTotal / onScreen.length) });
    }
    onShow?.(batch);
  };

  const hide = (batch: Element[]) => {
    hideEls(batch);
    onHide?.(batch);
  };

  if (replay) {
    ScrollTrigger.batch(els, {
      start: replayStart,
      end: replayEnd,
      onEnter: (batch) => show(batch, 1),
      onEnterBack: (batch) => show(batch, -1),
      onLeave: hide,
      onLeaveBack: hide,
    });
  } else {
    ScrollTrigger.batch(els, { start, once: true, onEnter: (batch) => show(batch, 1) });
  }
}

export function useReveal<T extends HTMLElement>(ref: RefObject<T>, options: RevealOptions = {}) {
  const { targets, y, x, duration, stagger, delay, start, onScroll = true } = options;

  useLayoutEffect(() => {
    const scope = ref.current;
    if (!scope) return;
    markAnimated(scope);

    const mm = gsap.matchMedia(scope);
    mm.add({ motion: MEDIA.motion, desktop: MEDIA.desktopMotion }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;
      const els = targets ? gsap.utils.toArray<HTMLElement>(targets, scope) : [scope];
      if (!els.length) return;
      const sideways = x !== undefined && desktop;
      const motionVars = {
        x: sideways ? x : 0,
        y: sideways ? 0 : y ?? SCROLL_CONFIG.reveal.distance,
        duration: duration ?? SCROLL_CONFIG.reveal.duration,
        stagger: stagger ?? SCROLL_CONFIG.reveal.stagger,
        delay: delay ?? 0,
      };

      /* On-mount entrances and play-once mode: a single from() tween */
      if (!onScroll || !SCROLL_CONFIG.reveal.replay) {
        gsap.from(els, {
          opacity: 0,
          ...motionVars,
          scrollTrigger: onScroll ? revealTrigger(scope, start) : undefined,
          ...motionLifecycle,
        });
        return;
      }

      /* Replay mode: enter from below or above, reset once off screen */
      const { replayStart, replayEnd } = SCROLL_CONFIG.reveal;
      gsap.set(els, { opacity: 0, x: motionVars.x, y: motionVars.y });
      ScrollTrigger.create({
        trigger: scope,
        start: replayStart,
        end: replayEnd,
        onEnter: () => showEls(els, 1, motionVars),
        onEnterBack: () => showEls(els, -1, motionVars),
        onLeave: () => hideEls(els),
        onLeaveBack: () => hideEls(els),
      });
    });
    return () => mm.revert();
  }, [ref, targets, y, x, duration, stagger, delay, start, onScroll]);
}

export default useReveal;
