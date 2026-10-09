import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* Subtle Antigravity luxury motion easing */
const luxuryEase = [0.16, 1, 0.3, 1];

export interface UniversalHeroProps {
  image: string;
  mobileImage?: string;
  videoUrl?: string;
  imageAlt: string;
  imagePosition?: string;
  eyebrow: string;
  headline: string | React.ReactNode;
  supportingText: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  secondaryLink?: {
    text: string;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  };
  minHeight?: string;
  brightness?: number;
}

export const UniversalHero: React.FC<UniversalHeroProps> = ({
  image,
  mobileImage,
  videoUrl,
  imageAlt,
  imagePosition = 'center 40%',
  eyebrow,
  headline,
  supportingText,
  ctaText,
  ctaHref,
  onCtaClick,
  secondaryLink,
  minHeight = '90vh',
  brightness = 0.92,
}) => {
  return (
    <section
      aria-label={`${typeof headline === 'string' ? headline : 'LEOZ'} Hero`}
      style={{
        position: 'relative',
        width: '100%',
        minHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingTop: 'clamp(110px, 14vh, 180px)',
        paddingBottom: 'clamp(44px, 7vh, 88px)',
        paddingLeft: 'clamp(20px, 6vw, 100px)',
        paddingRight: 'clamp(20px, 6vw, 100px)',
        overflow: 'hidden',
        backgroundColor: '#1E201D',
      }}
    >
      {/* 100% Full-Bleed Large Architectural Video / Image Background */}
      <motion.div
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.3, ease: luxuryEase }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        {videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={image}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: imagePosition,
              filter: `brightness(${brightness}) contrast(1.02)`,
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            <img
              src={image}
              alt={imageAlt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: imagePosition,
              }}
            />
          </video>
        ) : (
          <picture>
            {mobileImage && <source media="(max-width: 640px)" srcSet={mobileImage} />}
            <img
              src={image}
              alt={imageAlt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: imagePosition,
                filter: `brightness(${brightness}) contrast(1.02)`,
              }}
            />
          </picture>
        )}

        {/* Enhanced readability scrim/vignette gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(20, 21, 19, 0.45) 0%, rgba(20, 21, 19, 0.25) 30%, rgba(20, 21, 19, 0.72) 70%, rgba(20, 21, 19, 0.94) 100%)',
          }}
        />
      </motion.div>

      {/* Integrated Architectural Typography Overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '780px',
          width: '100%',
          color: '#FFFFFF',
        }}
      >
        {/* Eyebrow Label: LEOZ / [CATEGORY] */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: luxuryEase }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(10px, 1vw, 11.5px)',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#D4AF37',
            backgroundColor: 'rgba(10, 11, 10, 0.5)',
            padding: '5px 12px',
            borderRadius: '2px',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            backdropFilter: 'blur(8px)',
            marginBottom: '14px',
            textShadow: '0 2px 8px rgba(0,0,0,0.85)',
          }}
        >
          <span>{eyebrow}</span>
        </motion.div>

        {/* Balanced Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: luxuryEase }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            color: '#FFFFFF',
            margin: '0 0 14px 0',
            textShadow: '0 3px 18px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.9)',
          }}
        >
          {headline}
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.42, ease: luxuryEase }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13.5px, 1.1vw, 15.5px)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: '#F0F0EC',
            maxWidth: '560px',
            margin: '0 0 24px 0',
            textShadow: '0 2px 10px rgba(0,0,0,0.9)',
          }}
        >
          {supportingText}
        </motion.p>

        {/* Minimal Single Primary CTA + Optional Secondary Text Link */}
        {(ctaText || secondaryLink) && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: luxuryEase }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(12px, 2vw, 24px)',
              flexWrap: 'wrap',
            }}
          >
            {ctaText && ctaHref && (
              <a
                href={ctaHref}
                onClick={(e) => {
                  if (onCtaClick) {
                    onCtaClick(e);
                  } else if (ctaHref.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(ctaHref);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  backgroundColor: '#A58B62',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  border: '1px solid #A58B62',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#8C744F';
                  e.currentTarget.style.borderColor = '#8C744F';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#A58B62';
                  e.currentTarget.style.borderColor = '#A58B62';
                }}
              >
                <span>{ctaText}</span>
                <ArrowRight size={13} />
              </a>
            )}

            {secondaryLink && (
              <a
                href={secondaryLink.href}
                onClick={secondaryLink.onClick}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.5)',
                  paddingBottom: '2px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#D4AF37';
                  e.currentTarget.style.borderColor = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                }}
              >
                <span>{secondaryLink.text}</span>
                <ArrowRight size={12} />
              </a>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default UniversalHero;
