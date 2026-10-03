import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import Lenis from 'lenis';

/* ==========================================================================
   LEOZ CUCINE — LENIS LUXURY SCROLL PROVIDER
   Buttery smooth, heavy, cinematic scroll engine.
   Expo ease-out easing: stops cleanly, no rubberbanding, no floatiness.
   ========================================================================== */

export interface LenisScrollState {
  lenis: Lenis | null;
  scrollY: number;
  velocity: number;
  direction: 1 | -1 | 0;
  progress: number;
}

const LenisContext = createContext<LenisScrollState>({
  lenis: null,
  scrollY: 0,
  velocity: 0,
  direction: 0,
  progress: 0,
});

export const useLenisContext = () => useContext(LenisContext);

interface LenisProviderProps {
  children: React.ReactNode;
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const [scrollState, setScrollState] = useState<LenisScrollState>({
    lenis: null,
    scrollY: 0,
    velocity: 0,
    direction: 0,
    progress: 0,
  });

  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  const raf = useCallback((time: number) => {
    lenisRef.current?.raf(time);
    rafRef.current = requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    /* ----------------------------------------------------------------
       LENIS LUXURY SETTINGS
       ----------------------------------------------------------------
       duration: 1.2s — heavy, cinematic, not floaty
       easing: expo ease-out — natural deceleration, stops cleanly
       wheelMultiplier: 1.0 — unexaggerated, proportional input
       touchMultiplier: 2.0 — responsive on mobile
    ---------------------------------------------------------------- */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Publish scroll state to context
    lenis.on('scroll', ({ scroll, velocity, direction, progress }: {
      scroll: number;
      velocity: number;
      direction: 1 | -1 | 0;
      progress: number;
    }) => {
      setScrollState({
        lenis,
        scrollY: scroll,
        velocity,
        direction,
        progress,
      });
    });

    // Update context with lenis instance even before first scroll
    setScrollState(prev => ({ ...prev, lenis }));

    // Start RAF loop
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [raf]);

  return (
    <LenisContext.Provider value={scrollState}>
      {children}
    </LenisContext.Provider>
  );
};

export default LenisProvider;
