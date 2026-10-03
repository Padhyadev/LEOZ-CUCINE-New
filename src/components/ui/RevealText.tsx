import React from 'react';
import { motion } from 'framer-motion';

/* ==========================================================================
   LEOZ CUCINE — RevealText
   Premium mask-reveal animation for headings and editorial titles.

   The heading is hidden behind a clip-path mask that wipes open from
   bottom to top as the element scrolls into the viewport. No scaling,
   no bouncing, no typing. Pure architectural motion.

   Usage — single line heading:
     <RevealText delay={0}>
       <h2 style={{ ...existingStyles }}>Featured Works</h2>
     </RevealText>

   Usage — multi-line with stagger (pass stagger per line):
     <RevealText delay={0}>
       <h2 style={...}>Architectural Precision.</h2>
     </RevealText>
     <RevealText delay={0.15}>
       <h2 style={...}>Timeless Elegance.</h2>
     </RevealText>

   Easing: cubic-bezier(0.16, 1, 0.3, 1) — consistent luxury motion
   Duration: 1.0s (0.9–1.2s range)
   Trigger: 15% of element in viewport, plays once only
   GPU: clip-path only — no layout animations
   ========================================================================== */

const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealTextProps {
  children: React.ReactNode;
  /** Additional delay in seconds for stagger control */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Extra CSS classes */
  className?: string;
  /** Inline styles on the motion wrapper (use display:'block'|'inline-block' as needed) */
  style?: React.CSSProperties;
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  delay = 0,
  duration = 1.0,
  className,
  style,
}) => {
  return (
    <motion.div
      initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: false, amount: 0.15, margin: '-20px' }}
      transition={{ duration, delay, ease: LUXURY_EASE }}
      style={{
        willChange: 'clip-path',
        display: 'block',
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ==========================================================================
   RevealLines — multi-line stagger reveal
   Each line reveals independently with a configurable stagger offset.
   Use when the heading has multiple visible lines.

   Usage:
     <RevealLines stagger={0.12}>
       {['Architectural Precision.', 'Timeless Elegance.']}
     </RevealLines>
   ========================================================================== */

interface RevealLinesProps {
  /** Array of text strings, each gets its own mask reveal */
  children: string[];
  /** Stagger between each line in seconds */
  stagger?: number;
  /** Base delay before first line */
  delay?: number;
  /** Duration per line */
  duration?: number;
  /** Style applied to each line's wrapper motion.div */
  lineStyle?: React.CSSProperties;
}

export const RevealLines: React.FC<RevealLinesProps> = ({
  children,
  stagger = 0.12,
  delay = 0,
  duration = 1.0,
  lineStyle,
}) => {
  return (
    <>
      {children.map((line, i) => (
        <motion.span
          key={i}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
          viewport={{ once: false, amount: 0.15, margin: '-20px' }}
          transition={{ duration, delay: delay + i * stagger, ease: LUXURY_EASE }}
          style={{
            willChange: 'clip-path',
            display: 'block',
            ...lineStyle,
          }}
        >
          {line}
        </motion.span>
      ))}
    </>
  );
};

export default RevealText;
