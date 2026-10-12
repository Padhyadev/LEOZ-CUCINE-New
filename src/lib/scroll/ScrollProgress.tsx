import React, { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from './gsap';

/* ==========================================================================
   Thin bronze bar fixed to the top of the viewport; its width tracks how
   far down the page the visitor is. Recreated per route so it always
   measures the current page's height.
   ========================================================================== */

export const ScrollProgress: React.FC<{ routeKey: string }> = ({ routeKey }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 0,
            end: () => ScrollTrigger.maxScroll(window),
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [routeKey]);

  return <div ref={barRef} className="lz-scroll-progress" aria-hidden="true" />;
};

export default ScrollProgress;
