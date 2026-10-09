import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';

/* ==========================================================================
   LEOZ light-warm design primitives
   Shared building blocks for the redesigned pages: scroll reveals, gold
   heading rule, mask-reveal headings, logo bracket motif, lazy warm images
   and magnetic buttons. Styling lives in Home.css (.lz-*) plus the page CSS
   (.lux-mask for the heading clip).
   ========================================================================== */

/* Ease-out curve shared by every reveal */
export const EASE_OUT = [0.22, 1, 0.36, 1];

/* Fade-up on scroll; staggered via `delay`. Disabled for reduced motion. */
export const revealProps = (reduce: boolean | null, delay = 0) =>
  ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  }) as const;

export const Reveal: React.FC<{ delay?: number; className?: string; children: React.ReactNode }> = ({
  delay = 0,
  className,
  children,
}) => (
  <motion.div className={className} {...revealProps(useReducedMotion(), delay)}>
    {children}
  </motion.div>
);

/* 48px gold line that draws itself as it enters the viewport */
export const GoldRule: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="lz-rule"
      aria-hidden="true"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 }}
    />
  );
};

/* Heading text slides up from a clipped line. The visible outer line is
   what gets observed — the hidden inner text never intersects on its own. */
const maskVariants = {
  hidden: { y: '105%' },
  shown: { y: '0%', transition: { duration: 0.6, ease: EASE_OUT } },
};

export const MaskHeading: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({
  id,
  className = 'lz-h2',
  children,
}) => {
  const reduce = useReducedMotion();
  return (
    <h2 className={className} id={id}>
      <motion.span
        className="lux-mask"
        initial={reduce ? 'shown' : 'hidden'}
        whileInView="shown"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.span variants={maskVariants}>{children}</motion.span>
      </motion.span>
    </h2>
  );
};

export const SectionHead: React.FC<{ eyebrow?: string; title: React.ReactNode; id: string; center?: boolean }> = ({
  eyebrow,
  title,
  id,
  center = false,
}) => (
  <Reveal className={`lz-section-head ${center ? 'lz-section-head--center' : ''}`}>
    {eyebrow && <span className="lz-eyebrow">{eyebrow}</span>}
    <MaskHeading id={id}>{title}</MaskHeading>
    <GoldRule />
  </Reveal>
);

/* The logo's broken square frame */
export const BracketFrame: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M0 0H42M52 0H100V44M100 54V100H56M46 100H0V58M0 48V0"
      stroke="currentColor"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

/* Single L-shaped corner from the same motif */
export const BracketCorner: React.FC<{ position: 'tl' | 'br' }> = ({ position }) => (
  <svg className={`lz-bracket lz-bracket--${position}`} viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false">
    <path d="M1 100V1H100" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
  </svg>
);

/* Lazy image with a warm blur placeholder until it has loaded */
export const WarmImage: React.FC<{ src: string; alt: string; className?: string; children?: React.ReactNode }> = ({
  src,
  alt,
  className,
  children,
}) => {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className={`lz-media ${className ?? ''}`}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'is-loaded' : 'is-loading'}
      />
      {children}
    </div>
  );
};

/* Primary buttons drift up to 8px toward the cursor */
export const MagneticLink: React.FC<{
  href: string;
  className: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}> = ({ href, className, onClick, children }) => {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18 });
  const y = useSpring(0, { stiffness: 260, damping: 18 });
  const clamp = (v: number) => Math.max(-8, Math.min(8, v));

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * 0.2));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * 0.35));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      className={className}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      style={{ x, y }}
    >
      {children}
    </motion.a>
  );
};
