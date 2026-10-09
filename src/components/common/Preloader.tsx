import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import logoImg from '../../assets/logo.png';

const SESSION_KEY = 'leoz_preloader_seen';

export const checkShouldRunPreloader = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }
  try {
    return sessionStorage.getItem(SESSION_KEY) !== 'true';
  } catch {
    return false;
  }
};

export const markPreloaderSeen = (): void => {
  try {
    sessionStorage.setItem(SESSION_KEY, 'true');
  } catch {
    // ignore storage errors
  }
};

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Fast appearance under 1 second (approx 750ms before smooth slide exit)
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 700);

    const endTimer = setTimeout(() => {
      markPreloaderSeen();
      if (onComplete) onComplete();
    }, 1100);

    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        aria-hidden="true"
        initial={{ y: '0%' }}
        animate={{ y: isExiting ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: '#161715',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            opacity: isExiting ? 0 : 1,
            transition: 'opacity 250ms ease',
          }}
        >
          {/* Brand Logo Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={logoImg}
              alt="LEOZ CUCINE — Luxury Kitchens & Wardrobes"
              style={{
                height: ' clamp(60px, 10vw, 84px)',
                width: 'auto',
                maxWidth: '240px',
                objectFit: 'contain',
                filter: 'brightness(1.2) contrast(1.05) drop-shadow(0 4px 16px rgba(0, 0, 0, 0.5))',
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
