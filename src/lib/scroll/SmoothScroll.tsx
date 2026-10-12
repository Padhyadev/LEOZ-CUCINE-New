import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';
import { SCROLL_CONFIG } from './config';
import './scroll.css';

/* ==========================================================================
   LEOZ — smooth scroll foundation
   - Lenis drives wheel scrolling; touch stays native (syncTouch off).
   - Lenis is ticked by GSAP's ticker and feeds ScrollTrigger, so every
     scroll-linked animation reads the same, smoothed scroll position.
   - Reduced-motion visitors get plain native scrolling (no Lenis at all).
   - Scrolls to top on route change, offsets in-page anchors by the header
     height, and refreshes ScrollTrigger once fonts and images settle.
   ========================================================================== */

type ScrollTarget = string | number | HTMLElement;

interface SmoothScrollState {
  lenis: Lenis | null;
  /** Scroll to an element / selector / y position, clearing the fixed header */
  scrollTo: (target: ScrollTarget, options?: { immediate?: boolean }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollState>({
  lenis: null,
  scrollTo: () => undefined,
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/** Height of the fixed header, used as the offset for anchor scrolling */
export const getHeaderOffset = (): number => {
  const header = document.querySelector<HTMLElement>('.lz-header');
  return header ? header.offsetHeight : 0;
};

/* Batch many image loads into a single ScrollTrigger.refresh */
let refreshTimer = 0;
const scheduleRefresh = () => {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
};

interface SmoothScrollProps {
  /** Changes on every route change (the current pathname) */
  routeKey: string;
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ routeKey, children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  /* ---------- Lenis ⇄ GSAP ticker ⇄ ScrollTrigger ---------- */
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: SCROLL_CONFIG.lenis.duration,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: SCROLL_CONFIG.lenis.wheelMultiplier,
      autoRaf: false,
    });

    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback<SmoothScrollState['scrollTo']>(
    (target, options = {}) => {
      const offset = typeof target === 'number' ? 0 : -getHeaderOffset();
      if (lenis) {
        lenis.scrollTo(target, { offset, immediate: options.immediate, force: true });
        return;
      }
      const el =
        typeof target === 'string' ? document.querySelector<HTMLElement>(target) : typeof target === 'number' ? null : target;
      const top = typeof target === 'number' ? target : el ? el.getBoundingClientRect().top + window.scrollY + offset : 0;
      window.scrollTo({ top, behavior: options.immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
    },
    [lenis]
  );

  /* ---------- Scroll to top on route change ---------- */
  useEffect(() => {
    if (window.location.hash) return; // a hash link scrolls to its own target
    scrollTo(0, { immediate: true });
    scheduleRefresh();
  }, [routeKey, scrollTo]);

  /* ---------- In-page anchors (#welcome …) clear the fixed header ---------- */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (!url.hash || url.pathname !== window.location.pathname || url.origin !== window.location.origin) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      window.history.pushState({}, '', url.hash);
      scrollTo(target);
      /* Move keyboard focus with the scroll so tabbing continues from there */
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [scrollTo]);

  /* ---------- Recalculate trigger positions once layout settles ---------- */
  useEffect(() => {
    document.fonts?.ready.then(scheduleRefresh);
    window.addEventListener('load', scheduleRefresh);
    /* Image load events don't bubble, so listen in the capture phase */
    const onAssetLoad = (e: Event) => {
      if (e.target instanceof HTMLImageElement || e.target instanceof HTMLVideoElement) scheduleRefresh();
    };
    document.addEventListener('load', onAssetLoad, true);
    return () => {
      window.removeEventListener('load', scheduleRefresh);
      document.removeEventListener('load', onAssetLoad, true);
    };
  }, []);

  const value = useMemo(() => ({ lenis, scrollTo }), [lenis, scrollTo]);

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
};

export default SmoothScroll;
