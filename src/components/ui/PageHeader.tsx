import React from 'react';
import { motion } from 'framer-motion';
import { Container } from './Container';
import { Section } from './Section';
import { luxuryEase } from '../../styles/animations';

export interface PageHeaderProps {
  label?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  backgroundImage?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  label,
  title,
  titleAccent,
  description,
  backgroundImage,
  className = '',
  style = {},
}) => {
  return (
    <Section
      variant="dark"
      padding="none"
      className={`leoz-page-header ${className}`}
      style={{
        position: 'relative',
        paddingTop: 'clamp(140px, 16vh, 200px)',
        paddingBottom: 'clamp(80px, 10vh, 120px)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Background Image & Ambient Overlay */}
      {backgroundImage && (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              opacity: 0.22,
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(7,17,31,0.4) 0%, rgba(7,17,31,0.98) 100%)',
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      <Container maxWidth="lg" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.9,
                ease: luxuryEase,
                staggerChildren: 0.15,
              },
            },
          }}
          style={{ maxWidth: '920px', margin: '0 auto' }}
        >
          {/* Label */}
          {label && (
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: luxuryEase } },
              }}
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-gold)',
                marginBottom: '20px',
                display: 'block',
              }}
            >
              {label}
            </motion.span>
          )}

          {/* Heading */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: luxuryEase } },
            }}
            style={{
              fontFamily: 'var(--font-family-serif)',
              fontSize: 'clamp(38px, 5.5vw, 76px)',
              fontWeight: 300,
              lineHeight: '1.08',
              color: 'var(--color-text-primary)',
              marginBottom: '24px',
              letterSpacing: '-0.02em',
            }}
          >
            {title} {titleAccent && <span style={{ color: 'var(--color-accent-gold)', fontWeight: 400 }}>{titleAccent}</span>}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: luxuryEase } },
              }}
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: 'clamp(14px, 1.2vw, 18px)',
                fontWeight: 300,
                lineHeight: '1.7',
                color: 'var(--color-text-secondary)',
                maxWidth: '680px',
                margin: '0 auto',
              }}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </Section>
  );
};

export default PageHeader;
