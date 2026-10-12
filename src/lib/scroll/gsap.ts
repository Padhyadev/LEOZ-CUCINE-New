/* ==========================================================================
   Single GSAP entry point: plugins are registered exactly once here, and
   every scroll module imports gsap / ScrollTrigger / SplitText from this
   file rather than from 'gsap' directly.
   ========================================================================== */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { SCROLL_CONFIG } from './config';

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.defaults({ ease: SCROLL_CONFIG.ease });

export { gsap, ScrollTrigger, SplitText };

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isMobileViewport = (): boolean =>
  typeof window !== 'undefined' && window.innerWidth <= SCROLL_CONFIG.mobileMaxWidth;

/** gsap.matchMedia conditions shared by every module */
export const MEDIA = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktopMotion: `(min-width: ${SCROLL_CONFIG.mobileMaxWidth + 1}px) and (prefers-reduced-motion: no-preference)`,
  reduced: '(prefers-reduced-motion: reduce)',
} as const;
