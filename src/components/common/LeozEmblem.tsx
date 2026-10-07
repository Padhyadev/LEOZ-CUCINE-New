import React from 'react';
import { motion } from 'framer-motion';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

interface LeozEmblemProps {
  size?: number;
  className?: string;
  animate?: boolean;
  color?: string;
}

/**
 * LEOZ Architectural Lion Brand Character / Symbol
 * A minimal, geometric silhouette formed by architectural cabinet and miter lines.
 * Represents: PRECISION, STRENGTH, CRAFT, INTELLIGENCE, and ARCHITECTURAL DESIGN.
 */
export const LeozEmblem: React.FC<LeozEmblemProps> = ({
  size = 80,
  className = '',
  animate = true,
  color = '#B69A6B',
}) => {
  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.2, delay: i * 0.08, ease: luxuryEase },
        opacity: { duration: 0.4, delay: i * 0.08 },
      },
    }),
  };

  const fillVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.9,
        ease: luxuryEase,
      },
    },
  };

  return (
    <div
      className={`leoz-brand-symbol ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Outer Precision Octagon Frame (Architectural 45-degree corner bevels) */}
        <motion.polygon
          points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 2"
          opacity="0.4"
          initial={animate ? 'hidden' : 'visible'}
          animate="visible"
          custom={0}
          variants={lineVariants}
        />

        {/* Inner Faceted Architectural Lion Head Silhouette */}
        {/* 1. Forehead / Crown Geometry */}
        <motion.path
          d="M32 24 L50 12 L68 24 L60 38 L40 38 Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={animate ? 'hidden' : 'visible'}
          animate="visible"
          custom={1}
          variants={lineVariants}
        />

        {/* 2. Left Mane Architectural Volume (45° Facets) */}
        <motion.path
          d="M32 24 L16 38 L24 58 L40 50 L40 38 Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={animate ? 'hidden' : 'visible'}
          animate="visible"
          custom={2}
          variants={lineVariants}
        />

        {/* 3. Right Mane Architectural Volume (45° Facets) */}
        <motion.path
          d="M68 24 L84 38 L76 58 L60 50 L60 38 Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={animate ? 'hidden' : 'visible'}
          animate="visible"
          custom={3}
          variants={lineVariants}
        />

        {/* 4. Lion Snout / Muzzle Structure (Geometric J-Pull & Gola profile) */}
        <motion.path
          d="M40 38 L50 50 L60 38 L50 64 Z"
          stroke={color}
          strokeWidth="1.75"
          strokeLinejoin="round"
          initial={animate ? 'hidden' : 'visible'}
          animate="visible"
          custom={4}
          variants={lineVariants}
        />

        {/* 5. Chin / Jaw Anchor (Solid Monolith base) */}
        <motion.path
          d="M40 50 L34 72 L50 86 L66 72 L60 50 L50 64 Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          initial={animate ? 'hidden' : 'visible'}
          animate="visible"
          custom={5}
          variants={lineVariants}
        />

        {/* 6. Precision Architectural Eyes (Laser-cut geometric slits) */}
        <motion.line
          x1="38"
          y1="34"
          x2="44"
          y2="34"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={animate ? 'hidden' : 'visible'}
          animate="visible"
          custom={6}
          variants={lineVariants}
        />
        <motion.line
          x1="56"
          y1="34"
          x2="62"
          y2="34"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={animate ? 'hidden' : 'visible'}
          animate="visible"
          custom={6}
          variants={lineVariants}
        />

        {/* 7. Subtle Core Monolith Glow (Appears on completion) */}
        <motion.circle
          cx="50"
          cy="50"
          r="1.5"
          fill={color}
          initial={animate ? 'hidden' : 'visible'}
          animate="visible"
          variants={fillVariants}
        />
      </svg>
    </div>
  );
};

export default LeozEmblem;
