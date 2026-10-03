/* ==========================================================================
   LEOZ CUCINE — PREMIUM LUXURY ARCHITECTURAL SCROLL ANIMATIONS
   cubic-bezier(0.16,1,0.3,1) — identical easing across the entire site
   Max translate: 40px — intentional, editorial, never excessive
   ========================================================================== */

export const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const defaultViewport = { once: true, amount: 0.15, margin: '-20px' };

/* HEADING MASK REVEAL — for use inside stagger containers (itemVariants alternative)
   Apply to h1/h2/h3 elements. Reveals clip-path from bottom to top.
   Body paragraphs and spans should keep using staggerItem / fadeInUp. */
export const headingMaskReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.8, ease: luxuryEase },
  },
};

/* 1. FADE UP ANIMATION — subtle 20px rise, editorial entry */
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: luxuryEase,
    },
  },
};

/* 2. MASK REVEAL ANIMATION — curtain clip-path reveal */
export const maskReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, y: 15 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEase,
    },
  },
};

/* 3. IMAGE REVEAL ANIMATION — zoom + clip-path, GPU only */
export const imageRevealVariants = {
  hidden: { opacity: 0, scale: 1.03, clipPath: 'inset(10% 0% 10% 0%)' },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.9,
      ease: luxuryEase,
    },
  },
};

/* 4. TEXT REVEAL ANIMATION — editorial rise, 20px maximum */
export const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: luxuryEase,
    },
  },
};

/* 5. STAGGER ANIMATION PRESETS — elegant cascading entrance */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: luxuryEase,
    },
  },
};

/* 6. HERO REVEAL — restrained 15px, scale from 0.98 */
export const heroReveal = {
  hidden: { opacity: 0, scale: 0.98, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEase,
    },
  },
};

/* 7. CARD HOVER — micro-interaction, GPU only */
export const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: 0.4,
      ease: luxuryEase,
    },
  },
};
