import { useLenisContext, LenisScrollState } from '../providers/LenisProvider';

/* ==========================================================================
   LEOZ CUCINE — useLenisScroll Hook
   Provides access to Lenis scroll state for velocity-based cinematic effects.

   Usage:
     const { scrollY, velocity, progress } = useLenisScroll();
   ========================================================================== */

export const useLenisScroll = (): LenisScrollState => {
  return useLenisContext();
};

export default useLenisScroll;
