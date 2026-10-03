import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Signature Luxury Easing
const luxuryBezier: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const CinematicPageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [transitionKey, setTransitionKey] = useState<number | null>(null);
  const isNavigatingRef = useRef(false);

  // Prevent transition from running on initial page load or browser refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const startTopToBottomTransition = useCallback(
    (targetPath: string) => {
      if (isNavigatingRef.current || isInitialLoad) return;

      const currentPath = window.location.pathname;
      if (targetPath === currentPath) return;

      // Motion-sensitive visitors get an instant route swap, no curtain —
      // navigating shouldn't force a blocking animation on every click.
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        window.history.pushState({}, '', targetPath);
        window.dispatchEvent(new Event('popstate'));
        window.scrollTo(0, 0);
        return;
      }

      isNavigatingRef.current = true;
      const key = Date.now();
      setTransitionKey(key);

      // Midpoint at 350ms: Update route silently behind solid navy overlay
      setTimeout(() => {
        window.history.pushState({}, '', targetPath);
        window.dispatchEvent(new Event('popstate'));
        window.scrollTo(0, 0);
      }, 350);

      // End of continuous motion at 700ms: Cleanup (matches transition duration below)
      setTimeout(() => {
        setTransitionKey(null);
        isNavigatingRef.current = false;
      }, 700);
    },
    [isInitialLoad]
  );

  // Intercept internal link clicks
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (isInitialLoad || isNavigatingRef.current) return;

      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore external, mailto, tel, anchor hashes, or target="_blank"
      if (
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        target.getAttribute('target') === '_blank'
      ) {
        return;
      }

      const currentPath = window.location.pathname;
      if (href === currentPath) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      startTopToBottomTransition(href);
    };

    const handleCustomNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ path: string }>;
      if (customEvent.detail && customEvent.detail.path) {
        startTopToBottomTransition(customEvent.detail.path);
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    window.addEventListener('leoz:navigate', handleCustomNavigate);

    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
      window.removeEventListener('leoz:navigate', handleCustomNavigate);
    };
  }, [isInitialLoad, startTopToBottomTransition]);

  return (
    <>
      {children}

      {/* ULTRA-SMOOTH TOP-TO-BOTTOM GPU CURTAIN OVERLAY */}
      <AnimatePresence>
        {transitionKey !== null && !isInitialLoad && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            <motion.div
              key={transitionKey}
              initial={{ translateY: '-100%' }}
              animate={{ translateY: ['-100%', '0%', '100%'] }}
              transition={{
                duration: 0.7,
                times: [0, 0.5, 1],
                ease: luxuryBezier,
              }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#181818',
                width: '100%',
                height: '100%',
                willChange: 'transform',
              }}
            />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CinematicPageTransition;
