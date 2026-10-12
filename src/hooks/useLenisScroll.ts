import { useSmoothScroll } from '../lib/scroll/SmoothScroll';

/* ==========================================================================
   LEOZ CUCINE — useLenisScroll Hook
   Back-compat alias for the smooth-scroll context (lib/scroll/SmoothScroll).
   `lenis` is null for reduced-motion visitors, who get native scrolling.

   Usage:
     const { lenis, scrollTo } = useLenisScroll();
   ========================================================================== */

export const useLenisScroll = useSmoothScroll;

export default useLenisScroll;
