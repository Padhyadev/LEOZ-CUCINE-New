import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, luxuryEase } from '../../styles/animations';

export interface SectionProps {
  children: React.ReactNode;
  id?: string;
  ariaLabel?: string;
  variant?: 'dark' | 'secondary' | 'card' | 'light';
  padding?: 'normal' | 'large' | 'compact' | 'none';
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
}

const backgroundMap = {
  dark: '#07111F',
  secondary: '#0B1728',
  card: '#102033',
  light: '#F8F6F2',
};

const colorMap = {
  dark: '#F8F7F3',
  secondary: '#F8F7F3',
  card: '#F8F7F3',
  light: '#07111F',
};

const paddingMap = {
  normal: 'clamp(80px, 10vw, 160px) 0',
  large: 'clamp(120px, 14vw, 240px) 0',
  compact: 'clamp(50px, 6vw, 90px) 0',
  none: '0',
};

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  ariaLabel,
  variant = 'dark',
  padding = 'normal',
  className = '',
  style = {},
  animate = false,
}) => {
  const content = (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`leoz-section leoz-section-${variant} ${className}`}
      style={{
        backgroundColor: backgroundMap[variant] || '#07111F',
        color: colorMap[variant] || '#F8F7F3',
        padding: paddingMap[padding] || 'clamp(80px, 10vw, 160px) 0',
        position: 'relative',
        width: '100%',
        ...style,
      }}
    >
      {children}
    </section>
  );

  if (animate) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-80px' }}
        variants={fadeInUp}
        transition={{ ease: luxuryEase }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default Section;
