import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

/* ==========================================================================
   LEOZ CUCINE — Preloader
   A brief full-screen curtain shown once per browser session on first
   visit, then slides up to reveal the page. Skipped entirely if the user
   has "prefers-reduced-motion" enabled, or if it has already played once
   in this session (sessionStorage gate).
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
    // ignore storage errors (e.g. private browsing)
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
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'var(--color-surface-dark)',
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
          gap: '18px',
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Logo />
        <span
          style={{
            fontFamily: 'var(--font-family-sans)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#B69A6B',
          }}
        >
          Kitchens &amp; Wardrobes
        </span>
      </div>
    </motion.div>
  );
};

export default Preloader;
