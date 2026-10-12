import React, { useEffect, useRef, useState } from 'react';
import { LineReveal, useDrawLine, useImageReveal, useMagnetic } from '../../lib/scroll';
import './LuxPrimitives.css';

/* ==========================================================================
   LEOZ light-warm design primitives
   Shared building blocks for the redesigned pages. Scroll motion comes from
   the GSAP scroll system (src/lib/scroll) — these components only describe
   *what* reveals; timing and easing live in src/lib/scroll/config.ts.
   Styling lives in Home.css (.lz-*) plus the page CSS.
   ========================================================================== */

/* Ease-out curve for the framer-motion effects that remain on the pages
   (hero intros, hover states) — same curve as SCROLL_CONFIG.ease. */
export const EASE_OUT = [0.22, 1, 0.36, 1];

/* Marks an element for the global AutoReveal (fade-up, batched with its
   neighbours so groups stagger automatically). Kept as a function so the
   existing `{...revealProps(reduce, delay)}` spreads keep working; the
   arguments are no longer needed — order within a group sets the stagger. */
export const revealProps = (_reduce?: boolean | null, _delay?: number) => ({ 'data-reveal': '' }) as const;

/* Block that fades up on scroll */
export const Reveal: React.FC<{ delay?: number; className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <div className={className} data-reveal="">
    {children}
  </div>
);

/* 48px gold line that draws itself as it enters the viewport */
export const GoldRule: React.FC<{ delay?: number }> = ({ delay = 0.35 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useDrawLine(ref, { delay });
  return <span ref={ref} className="lz-rule" aria-hidden="true" />;
};

/* Heading whose lines slide up one by one from behind a mask */
export const MaskHeading: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({
  id,
  className = 'lz-h2',
  children,
}) => (
  <LineReveal as="h2" id={id} className={className} delay={0.1}>
    {children}
  </LineReveal>
);

/* Eyebrow → heading lines → gold rule, in sequence */
export const SectionHead: React.FC<{ eyebrow?: string; title: React.ReactNode; id?: string; center?: boolean }> = ({
  eyebrow,
  title,
  id,
  center = false,
}) => (
  <div className={`lz-section-head ${center ? 'lz-section-head--center' : ''}`}>
    {eyebrow && (
      <span className="lz-eyebrow" data-reveal="">
        {eyebrow}
      </span>
    )}
    <MaskHeading id={id}>{title}</MaskHeading>
    <GoldRule />
  </div>
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

/* Lazy image in an overflow-hidden frame: warm blur placeholder until it
   loads, then a clip/zoom reveal on scroll and gentle parallax on desktop. */
export const WarmImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  parallax?: boolean;
  /** 'enter-scale' for full-bleed section backgrounds (see useImageReveal) */
  mode?: 'reveal' | 'enter-scale';
  children?: React.ReactNode;
}> = ({ src, alt, className, parallax = true, mode, children }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  useImageReveal(frameRef, { parallax, mode });

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div ref={frameRef} className={`lz-media ${className ?? ''}`}>
      <img
        ref={imgRef}
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

/* Link button that drifts up to 8px toward the cursor (useMagnetic) */
export const MagneticLink: React.FC<{
  href: string;
  className: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}> = ({ href, className, onClick, children }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref);
  return (
    <a ref={ref} href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
};
