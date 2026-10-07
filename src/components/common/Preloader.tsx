import React from 'react';
import { motion } from 'framer-motion';
import { LeozEmblem } from './LeozEmblem';

/* ==========================================================================
   LEOZ CUCINE — Preloader with Architectural Brand Character
   ========================================================================== */

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
  isActive: boolean;
  isExiting: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ isActive, isExiting }) => {
  if (!isActive) return null;

  return (
    <motion.div
      aria-hidden="true"
      initial={{ y: '0%' }}
      animate={{ y: isExiting ? '-100%' : '0%' }}
      transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0F0E0D',
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
          gap: '20px',
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? 'translateY(-10px)' : 'translateY(0)',
          transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <LeozEmblem size={90} animate={true} color="#B69A6B" />

        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '28px',
              fontWeight: 300,
              letterSpacing: '0.15em',
              color: '#FFFFFF',
              display: 'block',
              margin: '0 0 4px 0',
            }}
          >
            LEOZ
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10.5px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#B69A6B',
            }}
          >
            Architectural Living
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
