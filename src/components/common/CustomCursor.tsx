import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [hovering, setHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for smooth lag/trailing effect
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const ringSpringX = useSpring(cursorX, springConfig);
  const ringSpringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is mobile/tablet or reduced-motion is requested
    const checkDevice = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 1024;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsMobile(isTouch || isSmallScreen || prefersReduced);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target is interactive
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.btn-primary') ||
        target.closest('.btn-secondary') ||
        target.closest('.leoz-card') ||
        target.closest('.category-card') ||
        target.closest('.project-card') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('.hover-expand') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, isVisible, cursorX, cursorY]);

  if (isMobile || !isVisible) return null;

  return (
    <div className={`custom-cursor-wrapper ${hovering ? 'custom-cursor-hovering' : ''}`}>
      {/* Small center dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Trailing larger ring */}
      <motion.div
        className="custom-cursor-ring"
        style={{
          x: ringSpringX,
          y: ringSpringY,
        }}
      />
    </div>
  );
};

export default CustomCursor;
