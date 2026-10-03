import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Preloader, checkShouldRunPreloader, markPreloaderSeen } from '../components/common/Preloader';
import { images } from '../assets/images';
import { ShieldCheck, Award, Factory, Globe, Compass, Clock, Wrench } from 'lucide-react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  staggerContainer,
  staggerItem
} from '../styles/animations';

const luxuryEase = [0.16, 1, 0.3, 1];

/* ==========================================================================
   1. HERO — static image, dark overlay, short copy (Redesigne.md §10)
   ========================================================================== */
const HeroSection: React.FC = () => {
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: luxuryEase,
      },
    },
  };

  return (
    <section
      id="hero"
      aria-label="LEOZ Cucine Hero"
      className="home-hero-section"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '680px',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingBottom: 'clamp(50px, 8vh, 90px)',
        paddingLeft: '5.5vw',
        paddingRight: '5.5vw',
      }}
    >
      {/* BACKGROUND LUXURY RUNNING AMBIENT VIDEO WITH POSTER FALLBACK */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={images.hero}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-kitchen-interior-design-41006-large.mp4"
          type="video/mp4"
        />
        <img
          src={images.hero}
          alt="LEOZ Cucine Luxury Interior"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </video>

      {/* RIFRA-STYLE CINEMATIC SCRIM & GRADIENT OVERLAY */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.25) 40%, rgba(0, 0, 0, 0.75) 100%)',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.4) 45%, rgba(0, 0, 0, 0.1) 100%)',
          zIndex: 2,
        }}
      />

      {/* RIFRA STYLE LEFT-ALIGNED HERO CONTENT */}
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'left',
          maxWidth: '680px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <motion.p
          variants={heroItemVariants}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11.5px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#B69A6B',
            marginBottom: '14px',
          }}
        >
          KITCHENS &amp; WARDROBES
        </motion.p>

        <motion.h1
          variants={heroItemVariants}
          className="rifra-hero-title"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 4.5vw, 60px)',
            fontWeight: 300,
            lineHeight: 1.12,
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
            marginBottom: '18px',
            textShadow: '0 4px 24px rgba(0, 0, 0, 0.6)',
          }}
        >
          German-Engineered Kitchens &amp; Wardrobes, Made in Gujarat
        </motion.h1>

        <motion.p
          variants={heroItemVariants}
          className="rifra-hero-desc"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14.5px',
            fontWeight: 400,
            lineHeight: 1.75,
            color: 'rgba(255, 255, 255, 0.82)',
            maxWidth: '560px',
            marginBottom: '28px',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.6)',
          }}
        >
          20+ years of in-house manufacturing. Designed, built and installed by LEOZ Cucine in Ahmedabad.
        </motion.p>

        <motion.div variants={heroItemVariants} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <a
            href="/talk-to-us"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/talk-to-us');
              window.dispatchEvent(new Event('popstate'));
            }}
            className="rifra-btn-primary"
          >
            <span>Book Consultation</span>
          </a>
          <a
            href="/modular-kitchens"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/modular-kitchens');
              window.dispatchEvent(new Event('popstate'));
            }}
            className="rifra-btn-secondary"
          >
            <span>Explore Collections</span>
          </a>
        </motion.div>
      </motion.div>

      <style>{`
        .rifra-hero-pill-btn:hover {
          background-color: #E6E6E6 !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5) !important;
        }
        .rifra-hero-pill-btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.15) !important;
          border-color: #FFFFFF !important;
          transform: translateY(-2px);
        }
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.5) !important;
        }

        @media (max-width: 767px) {
          .home-hero-section {
            padding-bottom: 40px !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
            justify-content: flex-end !important;
          }
          .rifra-hero-title {
            font-size: 32px !important;
            line-height: 1.12 !important;
            margin-bottom: 16px !important;
          }
          .rifra-hero-desc {
            font-size: 14.5px !important;
            margin-bottom: 24px !important;
          }
          .rifra-hero-pill-btn {
            padding: 13px 28px !important;
            font-size: 13.5px !important;
          }
        }
      `}</style>
    </section>
  );
};

/* ==========================================================================
   2. BRAND INTRO SECTION — RIFRA EDITORIAL STATEMENT
   ========================================================================== */
const BrandIntroSection: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="Brand Introduction"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#111111',
        paddingTop: 'clamp(44px, 5.5vw, 72px)',
        paddingBottom: 'clamp(44px, 5.5vw, 72px)',
        overflow: 'hidden',
      }}
    >
      {/* RIFRA EDITORIAL STATEMENT WITH LEOZ CONTENT */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          paddingLeft: '5vw',
          paddingRight: '5vw',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: luxuryEase }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(22px, 3.2vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.18,
            color: '#111111',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          WHERE GERMAN PRECISION MEETS GUJARATI CRAFTSMANSHIP
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: luxuryEase }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px, 1.15vw, 16.5px)',
            fontWeight: 400,
            color: '#444444',
            lineHeight: 1.6,
            marginBottom: '6px',
          }}
        >
          From Concept to Factory Production, Seamless and Direct.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px, 1.15vw, 16.5px)',
            fontWeight: 400,
            color: '#666666',
            lineHeight: 1.6,
          }}
        >
          20+ years of in-house manufacturing. Conceived, built and installed by LEOZ Cucine in Ahmedabad.
        </motion.p>
      </div>
    </section>
  );
};

/* Helper component for live animated numbers counter */
const AnimatedCounter: React.FC<{ value: string }> = ({ value }) => {
  // Only genuinely numeric values (e.g. "5,000+") should start at 0 and count up.
  // Non-numeric labels (e.g. "Trusted", "In-House") must render their real text
  // immediately — otherwise visitors with slow/blocked JS (or crawlers) see "0".
  const [displayValue, setDisplayValue] = React.useState(() => (
    value.match(/[\d,]+/) ? '0' : value
  ));
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  React.useEffect(() => {
    if (!isInView) return;

    const numericMatch = value.match(/[\d,]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const numStr = numericMatch[0].replace(/,/g, '');
    const targetNum = parseInt(numStr, 10);
    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    const prefix = value.substring(0, numericMatch.index);
    const suffix = value.substring((numericMatch.index || 0) + numericMatch[0].length);

    let animationFrameId: number;
    const duration = 2000; // 2 seconds count up
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Soft luxury ease-out curve
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentNum = Math.floor(easeProgress * targetNum);

      const formattedNum = currentNum.toLocaleString('en-US');
      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
};

/* ==========================================================================
   2.5 HIGHLIGHTS STRIP SECTION (RIFRA MINIMALIST LUXURY STATS RIBBON)
   ========================================================================== */
const HighlightsBarSection: React.FC = () => {
  const highlights = [
    { icon: Award, value: "Trusted", label: "By Homeowners" },
    { icon: Factory, value: "In-House", label: "Manufacturing" },
    { icon: ShieldCheck, value: "German-Grade", label: "Hardware Standards" },
    { icon: Globe, value: "Pan-India", label: "Presence" }
  ];

  return (
    <section
      aria-label="Highlights Bar"
      style={{
        backgroundColor: '#0c0c0c',
        color: '#FFFFFF',
        padding: 'clamp(40px, 4.5vw, 60px) 6vw',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            alignItems: 'center',
          }}
          className="rifra-stats-grid"
        >
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              variants={staggerItem}
              className="rifra-stat-item"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '12px 24px',
                borderRight: idx < 3 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                position: 'relative',
              }}
            >
              <div
                style={{
                  color: '#B69A6B',
                  marginBottom: '10px',
                  opacity: 0.9,
                }}
              >
                <item.icon size={22} strokeWidth={1.3} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(20px, 1.9vw, 26px)',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  letterSpacing: '0.02em',
                  lineHeight: '1.2',
                  marginBottom: '6px',
                }}
              >
                <AnimatedCounter value={item.value} />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.5)',
                  lineHeight: '1.3',
                }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .rifra-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px 0 !important;
          }
          .rifra-stat-item {
            border-right: none !important;
          }
          .rifra-stat-item:nth-child(1),
          .rifra-stat-item:nth-child(3) {
            border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
          }
        }
        @media (max-width: 500px) {
          .rifra-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .rifra-stat-item {
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
            padding-bottom: 24px !important;
          }
          .rifra-stat-item:last-child {
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

/* ==========================================================================
   3. OUR COLLECTIONS — RIFRA FULL-SCREEN SHOWCASE (KITCHEN & WARDROBE)
   ========================================================================== */
const CollectionsSection: React.FC = () => {
  const collectionSlides = [
    {
      title: 'THE KITCHEN',
      desc: 'The heart of the home, according to LEOZ.',
      image: '/Gloss Finish.webp',
      buttonText: 'Discover LEOZ Kitchens',
      link: '/modular-kitchens',
    },
    {
      title: 'THE WARDROBE',
      desc: 'Bespoke dressing rooms & intelligent storage suites.',
      image: '/Modular Wardrobe.webp',
      buttonText: 'Discover LEOZ Wardrobes',
      link: '/modular-wardrobes',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const prevSlide = () => {
    setDirection(-1);
    setActiveSlide((prev) => (prev === 0 ? collectionSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev === collectionSlides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveSlide((prev) => (prev === collectionSlides.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [collectionSlides.length]);

  const navigate = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    window.history.pushState({}, '', link);
    window.dispatchEvent(new Event('popstate'));
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { duration: 0.85, ease: luxuryEase },
        opacity: { duration: 0.6 },
        scale: { duration: 1.2, ease: luxuryEase },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { duration: 0.85, ease: luxuryEase },
        opacity: { duration: 0.5 },
      },
    }),
  };

  return (
    <section
      id="collections"
      aria-label="Our Collections"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '650px',
        overflow: 'hidden',
        backgroundColor: '#0A0A0A',
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={activeSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        >
          {/* Fullscreen Photo */}
          <img
            src={collectionSlides[activeSlide].image}
            alt={collectionSlides[activeSlide].title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />

          {/* Luxury RiFRA Scrim Gradients */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.85) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
            }}
          />

          {/* Left-Aligned RiFRA Overlay Content */}
          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(50px, 8vh, 90px)',
              left: 'clamp(30px, 6vw, 90px)',
              zIndex: 10,
              maxWidth: '650px',
              textAlign: 'left',
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4.5vw, 62px)',
                fontWeight: 400,
                lineHeight: 1.1,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '14px',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              }}
            >
              {collectionSlides[activeSlide].title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: luxuryEase }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.2vw, 17px)',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.6,
                marginBottom: '26px',
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              }}
            >
              {collectionSlides[activeSlide].desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: luxuryEase }}
            >
              <a
                href={collectionSlides[activeSlide].link}
                onClick={(e) => navigate(e, collectionSlides[activeSlide].link)}
                className="rifra-collection-pill-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  padding: '12px 28px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {collectionSlides[activeSlide].buttonText}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow Button */}
      <button
        onClick={prevSlide}
        aria-label="Previous Collection"
        className="rifra-nav-arrow-btn"
        style={{
          position: 'absolute',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          background: 'transparent',
          border: 'none',
          color: '#FFFFFF',
          fontSize: '36px',
          cursor: 'pointer',
          padding: '16px',
          opacity: 0.75,
          transition: 'all 0.3s ease',
        }}
      >
        ‹
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={nextSlide}
        aria-label="Next Collection"
        className="rifra-nav-arrow-btn"
        style={{
          position: 'absolute',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          background: 'transparent',
          border: 'none',
          color: '#FFFFFF',
          fontSize: '36px',
          cursor: 'pointer',
          padding: '16px',
          opacity: 0.75,
          transition: 'all 0.3s ease',
        }}
      >
        ›
      </button>

      {/* Bottom Center Indicator Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}
      >
        {collectionSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > activeSlide ? 1 : -1);
              setActiveSlide(idx);
            }}
            aria-label={`Slide ${idx + 1}`}
            style={{
              width: idx === activeSlide ? '22px' : '7px',
              height: '7px',
              borderRadius: '9999px',
              backgroundColor: idx === activeSlide ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      <style>{`
        .rifra-collection-pill-btn:hover {
          background-color: #FFFFFF !important;
          color: #000000 !important;
          border-color: #FFFFFF !important;
          transform: translateY(-2px);
        }
        .rifra-nav-arrow-btn:hover {
          opacity: 1 !important;
          transform: translateY(-50%) scale(1.15) !important;
        }
      `}</style>
    </section>
  );
};

/* ==========================================================================
   3.2 RIFRA STYLE FULL-SCREEN DESIGN METHOD / ARCHITECTURE SECTION
   ========================================================================== */
const UniqueMethodSection: React.FC = () => {
  return (
    <section
      aria-label="Our Unique Design Method"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Luxury Architectural Villa / Sunset Interior Photo */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"
        alt="LEOZ Architectural Design Method"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Cinematic Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.2)',
        }}
      />

      {/* Centered Editorial Copy & Pill CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.9, ease: luxuryEase }}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '820px',
          textAlign: 'center',
          padding: '0 5vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 4.2vw, 56px)',
            fontWeight: 400,
            lineHeight: 1.15,
            color: '#FFFFFF',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: '20px',
            textShadow: '0 4px 24px rgba(0,0,0,0.7)',
          }}
        >
          OUR UNIQUE METHOD<br />IN THE WORLD OF DESIGN
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px, 1.25vw, 17.5px)',
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.92)',
            lineHeight: 1.6,
            maxWidth: '660px',
            marginBottom: '32px',
            textShadow: '0 2px 14px rgba(0,0,0,0.7)',
          }}
        >
          The only design and production brand collaborating directly with clients, from homeowners to architects and interior designers.
        </p>

        <div>
          <a
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/about');
              window.dispatchEvent(new Event('popstate'));
            }}
            className="rifra-method-pill-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.45)',
              fontFamily: 'var(--font-body)',
              fontSize: '13.5px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              padding: '13px 32px',
              borderRadius: '9999px',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Discover the LEOZ Method
          </a>
        </div>
      </motion.div>

      <style>{`
        .rifra-method-pill-btn:hover {
          background-color: #FFFFFF !important;
          color: #000000 !important;
          border-color: #FFFFFF !important;
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.6) !important;
        }
      `}</style>
    </section>
  );
};

/* ==========================================================================
   3.5 PRODUCT HIGHLIGHTS SECTION — RIFRA 2-COLUMN ARCHITECTURAL SHOWCASE
   ========================================================================== */
const ProductHighlightsSection: React.FC = () => {
  const highlights = [
    {
      eyebrow: 'BESPOKE CUCINE',
      title: 'German Style Modular Kitchens',
      description: 'Experience the perfect blend of sleek design, functionality, and customisation. Our modular kitchens are crafted with German engineering standards, offering innovative storage solutions and contemporary aesthetics.',
      image: '/Gloss Finish.webp',
      link: '/modular-kitchens',
      cta: 'Explore Kitchen Systems',
    },
    {
      eyebrow: 'WARDROBE SUITES',
      title: 'Customised Wardrobes & Dressing',
      description: 'Every wardrobe is planned around how you actually get dressed — smart interior fittings, soft-close hardware, integrated illumination, and bespoke finishes chosen to suit your room seamlessly.',
      image: '/Modular Wardrobe.webp',
      link: '/modular-wardrobes',
      cta: 'Explore Wardrobes',
    },
  ];

  return (
    <section
      aria-label="Product Highlights"
      style={{
        paddingTop: 'clamp(70px, 8vw, 110px)',
        paddingBottom: 'clamp(70px, 8vw, 110px)',
        paddingLeft: '5.5vw',
        paddingRight: '5.5vw',
        backgroundColor: '#0E0E0E',
        color: '#FFFFFF',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(44px, 6vw, 70px)' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '11.5px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.55)',
              marginBottom: '12px',
            }}
          >
            PRODUCT HIGHLIGHTS
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(24px, 3.2vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
            }}
          >
            Premium Solutions for Kitchens &amp; Wardrobes
          </motion.h2>
        </div>

        <div
          className="home-highlights-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(28px, 3.5vw, 48px)',
          }}
        >
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: luxuryEase }}
              whileHover={{ y: -6 }}
              style={{
                backgroundColor: '#161616',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Card Image Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'clamp(240px, 28vw, 340px)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="rifra-card-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(22,22,22,0.85) 100%)',
                  }}
                />
              </div>

              {/* Card Content */}
              <div
                style={{
                  padding: 'clamp(24px, 3vw, 36px)',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.45)',
                      marginBottom: '10px',
                    }}
                  >
                    {item.eyebrow}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(20px, 2.2vw, 28px)',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      letterSpacing: '0.01em',
                      marginBottom: '14px',
                      lineHeight: 1.25,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.7)',
                      marginBottom: '26px',
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <div>
                  <a
                    href={item.link}
                    onClick={(e) => {
                      e.preventDefault();
                      window.history.pushState({}, '', item.link);
                      window.dispatchEvent(new Event('popstate'));
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 500,
                      letterSpacing: '0.04em',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.35)',
                      paddingBottom: '4px',
                      transition: 'all 0.3s ease',
                    }}
                    className="rifra-card-cta"
                  >
                    {item.cta} →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .rifra-card-img:hover {
          transform: scale(1.05);
        }
        .rifra-card-cta:hover {
          color: #B69A6B !important;
          border-color: #B69A6B !important;
          transform: translateX(4px);
        }
        @media (max-width: 767px) {
          .home-highlights-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

/* ==========================================================================
   4.5 OUR PROCESS SECTION — RIFRA FULL-BLEED METHOD CAROUSEL (INFINITE LOOP)
   ========================================================================== */
const ProcessSection: React.FC = () => {
  const baseSteps = [
    {
      num: '1.',
      title: 'Design',
      desc: 'Each house begins with a custom project. Our designers and architects craft every space like a masterpiece.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=90',
    },
    {
      num: '2.',
      title: 'Short Supply Chain',
      desc: 'Our engineering & material suppliers are selected with the highest German standards. We control every step, from material to finish.',
      image: '/Metal Accents.webp',
    },
    {
      num: '3.',
      title: 'Production',
      desc: 'Technology and craftsmanship merge in our 20,000 sq. ft. factory. Each piece is built to last and to be instantly recognizable.',
      image: '/PHILOSOPHY.webp',
    },
    {
      num: '4.',
      title: 'Delivery & Installation',
      desc: 'The LEOZ team follows the project down to the smallest detail. We install every space with precision and care.',
      image: '/Gloss Finish.webp',
    },
  ];

  // Repeat items for seamless circular infinite scroll
  const displaySteps = [...baseSteps, ...baseSteps, ...baseSteps, ...baseSteps];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : baseSteps.length * 2));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < baseSteps.length * 3 ? prev + 1 : 0));
  };

  return (
    <section
      id="process"
      aria-label="Our Process"
      style={{
        paddingTop: 'clamp(80px, 9vw, 130px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        backgroundColor: '#FFFFFF',
        color: '#111111',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Title Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto clamp(50px, 6vw, 80px)', paddingLeft: '5.5vw', paddingRight: '5.5vw', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, ease: luxuryEase }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 3.8vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.18,
            color: '#111111',
            letterSpacing: '0.01em',
            textTransform: 'none',
            margin: 0,
          }}
        >
          The LEOZ Method: From Design to Delivery, a Direct and Integrated Process
        </motion.h2>
      </div>

      {/* Full-bleed Carousel Container */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <motion.div
          className="rifra-fullbleed-track"
          animate={{
            x: `calc(-${currentIndex * 36.5}vw)`,
          }}
          transition={{ duration: 0.65, ease: luxuryEase }}
          style={{
            display: 'flex',
            gap: '24px',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
            width: 'max-content',
          }}
        >
          {displaySteps.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="rifra-fullbleed-card"
              style={{
                width: '34vw',
                minWidth: '340px',
                maxWidth: '480px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Photo Frame */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1.02',
                  overflow: 'hidden',
                  backgroundColor: '#EBEBEB',
                  marginBottom: '26px',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="rifra-process-img"
                />
              </div>

              {/* Step Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(24px, 2.2vw, 32px)',
                  fontWeight: 400,
                  color: '#111111',
                  marginBottom: '14px',
                  lineHeight: 1.2,
                  letterSpacing: '0.01em',
                }}
              >
                {item.num} {item.title}
              </h3>

              {/* Step Description */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: '#555555',
                  margin: 0,
                  fontWeight: 300,
                  maxWidth: '95%',
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous step"
          className="rifra-process-nav-btn"
          style={{
            position: 'absolute',
            left: '3.5vw',
            top: '36%',
            transform: 'translateY(-50%)',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 15, 15, 0.85)',
            backdropFilter: 'blur(6px)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            zIndex: 10,
            fontSize: '24px',
            transition: 'all 0.35s ease',
          }}
        >
          ‹
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next step"
          className="rifra-process-nav-btn"
          style={{
            position: 'absolute',
            right: '3.5vw',
            top: '36%',
            transform: 'translateY(-50%)',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 15, 15, 0.85)',
            backdropFilter: 'blur(6px)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            zIndex: 10,
            fontSize: '24px',
            transition: 'all 0.35s ease',
          }}
        >
          ›
        </button>
      </div>

      <style>{`
        .rifra-process-img:hover {
          transform: scale(1.05);
        }
        .rifra-process-nav-btn:hover {
          background-color: #000000 !important;
          transform: translateY(-50%) scale(1.1) !important;
        }
        @media (max-width: 900px) {
          .rifra-fullbleed-card {
            width: 70vw !important;
            min-width: 280px !important;
          }
        }
      `}</style>
    </section>
  );
};

/* ==========================================================================
   5. WHY LEOZ SECTION — RIFRA LUXURY DARK ARCHITECTURAL SHOWCASE
   ========================================================================== */
const WhyLeozSection: React.FC = () => {
  const pillars = [
    { num: '01', icon: Compass, title: 'German Design Influence', description: 'Precision engineering, and clean form language adapted for Indian homes and the Indian climate.' },
    { num: '02', icon: Factory, title: 'Own Manufacturing Factory', description: 'We design and manufacture in-house, giving us complete control over quality, materials, and finish.' },
    { num: '03', icon: Clock, title: '20+ Years of Experience', description: 'Two decades of refining our craft, materials, and specialized manufacturing processes.' },
    { num: '04', icon: ShieldCheck, title: 'Comprehensive Warranty', description: 'Backed by a warranty that reflects our absolute confidence in what we build.' },
    { num: '05', icon: Wrench, title: 'End-to-End Installation', description: 'From design consultation to final installation, handled entirely by our dedicated team.' },
  ];

  return (
    <section
      aria-label="Why LEOZ Cucine"
      style={{
        paddingTop: 'clamp(80px, 9vw, 130px)',
        paddingBottom: 'clamp(80px, 9vw, 130px)',
        paddingLeft: '5.5vw',
        paddingRight: '5.5vw',
        backgroundColor: '#0a0a0a',
        color: '#FFFFFF',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto clamp(60px, 7vw, 90px)' }}>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: luxuryEase }}
            style={{
              display: 'block',
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#B69A6B',
              marginBottom: '16px',
            }}
          >
            WHY CHOOSE LEOZ CUCINE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.85, delay: 0.08, ease: luxuryEase }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 4vw, 54px)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '0.01em',
              margin: 0,
            }}
          >
            Built to Be Chosen, Not Just Sold.
          </motion.h2>
        </div>

        {/* 5-Item Luxury Architectural Matrix */}
        <div
          className="rifra-why-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className="rifra-why-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: luxuryEase }}
                style={{
                  padding: 'clamp(36px, 4vw, 50px) clamp(20px, 2.2vw, 32px)',
                  borderRight: idx < 4 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '360px',
                  backgroundColor: 'transparent',
                  transition: 'background-color 0.4s ease, border-color 0.4s ease',
                  position: 'relative',
                }}
              >
                {/* Top Number + Icon */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '32px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '18px',
                        color: '#B69A6B',
                        opacity: 0.8,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {pillar.num}
                    </span>
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.4)',
                        transition: 'color 0.3s ease, transform 0.3s ease',
                      }}
                      className="rifra-why-icon"
                    >
                      <Icon size={22} strokeWidth={1.3} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(18px, 1.4vw, 22px)',
                      fontWeight: 400,
                      lineHeight: 1.3,
                      color: '#FFFFFF',
                      marginBottom: '16px',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {pillar.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    lineHeight: 1.65,
                    color: 'rgba(255, 255, 255, 0.58)',
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .rifra-why-card:hover {
          background-color: rgba(255, 255, 255, 0.03) !important;
        }
        .rifra-why-card:hover .rifra-why-icon {
          color: #B69A6B !important;
          transform: translateY(-2px);
        }
        @media (max-width: 1100px) {
          .rifra-why-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .rifra-why-card {
            border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
            min-height: 300px !important;
          }
        }
        @media (max-width: 768px) {
          .rifra-why-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .rifra-why-card {
            border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
          }
        }
        @media (max-width: 520px) {
          .rifra-why-grid {
            grid-template-columns: 1fr !important;
          }
          .rifra-why-card {
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
            min-height: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

/* ==========================================================================
   6.5 LIVE THE LEOZ EXPERIENCE / SHOWROOMS & TRADE SECTION — RIFRA SHOWROOM CAROUSEL
   ========================================================================== */
const TradeProfessionalsSection: React.FC = () => {
  const showrooms = [
    {
      title: 'Ahmedabad Flagship',
      image: '/Metal Accents.webp',
      link: '/contact',
    },
    {
      title: 'Surat Experience Centre',
      image: '/PHILOSOPHY.webp',
      link: '/contact',
    },
    {
      title: 'Virtual / Online Design Studio',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=90',
      link: '/contact',
    },
    {
      title: 'Architect & Designer Lounge',
      image: '/Gloss Finish.webp',
      link: '/contact',
    },
  ];

  // Repeat items for seamless circular infinite scroll
  const displayShowrooms = [...showrooms, ...showrooms, ...showrooms, ...showrooms];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : showrooms.length * 2));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < showrooms.length * 3 ? prev + 1 : 0));
  };

  return (
    <section
      aria-label="Live the LEOZ Experience"
      style={{
        paddingTop: 'clamp(80px, 9vw, 130px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        backgroundColor: '#FFFFFF',
        color: '#111111',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Title Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto clamp(50px, 6vw, 80px)', paddingLeft: '5.5vw', paddingRight: '5.5vw', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.85, ease: luxuryEase }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 3.8vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.18,
            color: '#111111',
            letterSpacing: '0.01em',
            margin: 0,
          }}
        >
          Live the LEOZ Experience at Our Showrooms &amp; Design Studios
        </motion.h2>
      </div>

      {/* Full-bleed Carousel Container */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <motion.div
          animate={{
            x: `calc(-${currentIndex * 30.5}vw)`,
          }}
          transition={{ duration: 0.65, ease: luxuryEase }}
          style={{
            display: 'flex',
            gap: '20px',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
            width: 'max-content',
          }}
        >
          {displayShowrooms.map((item, idx) => (
            <a
              key={`${item.title}-${idx}`}
              href={item.link}
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', item.link);
                window.dispatchEvent(new Event('popstate'));
              }}
              className="rifra-showroom-card"
              style={{
                width: '28.5vw',
                minWidth: '290px',
                maxWidth: '420px',
                aspectRatio: '1 / 1.32',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                display: 'block',
                textDecoration: 'none',
                backgroundColor: '#181818',
                flexShrink: 0,
                boxShadow: '0 12px 36px -10px rgba(0,0,0,0.18)',
              }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="rifra-showroom-img"
              />

              {/* Dark Gradient Overlay for bottom text */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.85) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Bottom Label (RiFRA Style) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(20px, 1.8vw, 26px)',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    letterSpacing: '0.01em',
                    lineHeight: 1.2,
                    display: 'block',
                  }}
                >
                  {item.title}
                </span>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous showroom"
          className="rifra-process-nav-btn"
          style={{
            position: 'absolute',
            left: '3.5vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 15, 15, 0.85)',
            backdropFilter: 'blur(6px)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            zIndex: 10,
            fontSize: '24px',
            transition: 'all 0.35s ease',
          }}
        >
          ‹
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next showroom"
          className="rifra-process-nav-btn"
          style={{
            position: 'absolute',
            right: '3.5vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 15, 15, 0.85)',
            backdropFilter: 'blur(6px)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            zIndex: 10,
            fontSize: '24px',
            transition: 'all 0.35s ease',
          }}
        >
          ›
        </button>
      </div>

      <style>{`
        .rifra-showroom-card:hover .rifra-showroom-img {
          transform: scale(1.06);
        }
        @media (max-width: 900px) {
          .rifra-showroom-card {
            width: 65vw !important;
            min-width: 260px !important;
          }
        }
      `}</style>
    </section>
  );
};

/* ==========================================================================
   7. RIFRA EDITORIAL PANORAMIC SLIDER & SOCIAL SECTION
   ========================================================================== */
const ConsultationSection: React.FC = () => {
  const editorialSlides = [
    {
      title: 'Modern Kitchens',
      col1: 'LEOZ Cucine, with its new monobrand showrooms in Ahmedabad and Surat, and online design services across India, proposes a new way of presenting modern kitchens, within a design project that involves the whole house.',
      col1Extra: 'The project was born from an integrated vision: with the experience of its designers and its own production of state-of-the-art furniture, covers all areas of the home, creating complete settings for a coherent and complete project.',
      col2: 'The proposals that coherently integrate with each other thus creating unique environments, with a single design language and exclusive finishes and materials, following one common thread: the class and elegance of the LEOZ brand, and of the people who inhabit their homes.',
      col2Extra: 'Every kitchen is precision-engineered to harmoniously blend architectural beauty with effortless day-to-day functionality.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90',
    },
    {
      title: 'Design Kitchens',
      col1: 'LEOZ Cucine, in addition to following and helping all the most demanding customers in the choice and design of their kitchens inside its showrooms, makes its Style Team available inside the LEOZ Lab office.',
      col1Extra: 'Dedicated to designing luxury furniture solutions suitable for international and discerning customers, for new residential complexes and luxury villas.',
      col2: 'LEOZ thus becomes a spokesman in the world of high quality German-engineered design and representative of a history rich in successes. Made in Gujarat with global standards.',
      col2Extra: 'It becomes a key tool to give elegance to that luxury placed in exclusive environments.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90',
    },
    {
      title: 'Online Design Service for Your Kitchen',
      col1: 'For all customers, we provide a free online design service of your designer kitchen. By connecting with our team, you will have access to a dedicated design consultation with one of our designers.',
      col1Extra: 'Aimed at the creation of a 3D kitchen project and its tailored quotation both free of charge and without any commitment on your part.',
      col2: 'The consultation will be held in two stages through two separate video calls: the first will be cognitive and listening to your needs, while in the second video call you will be presented with the 3D project and its quotation.',
      col2Extra: 'At the end of the consultation and implementation of the 3D project you will decide independently whether to go ahead with LEOZ, without any further commitment.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=90',
    },
    {
      title: 'LEOZ Store (Ahmedabad, Surat, Online)',
      titleUnderlineIndices: ['Ahmedabad', 'Surat', 'Online'],
      col1: 'If, on the other hand, you would like to see our luxury and design kitchens, we will be waiting for you in our showrooms in Ahmedabad and Surat, or through our interactive virtual design lounge to show you first-hand the design products that we make with great care and quality.',
      col1Extra: 'You will be accompanied with extreme care and detail inside the exhibition spaces, using all the time you need to view the different models of modern kitchens.',
      col2: 'Our interior designers, experts in kitchen design, will help you with great elegance and style in choosing the details and finishes of your kitchen, trying to achieve the ideal design of the kitchen of your dreams.',
      col2Extra: 'LEOZ kitchens represent the symbol of German engineering in the world with its distinctive features endowed with great charm and able to last over time thanks to their solidity and elegance.',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=90',
    },
    {
      title: 'Bespoke Wardrobes & Dressing Suites',
      col1: 'LEOZ expands the architectural dialogue into the dressing suites with bespoke walk-in closets, sliding glass wardrobes, and integrated warm illumination.',
      col1Extra: 'Manufactured with structural extruded aluminum profiles and German Blum soft-close mechanics for effortless silent motion.',
      col2: 'Custom velvet-lined compartments, illuminated display shelves, and integrated secure compartments tailored to your wardrobe curation.',
      col2Extra: 'A seamless blend of architectural order and luxurious craftsmanship.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90',
    },
    {
      title: 'Trade & Architectural Partnerships',
      col1: 'We partner with architects, builders, and interior designers across Gujarat, offering dedicated project assistance, technical CAD files, and guaranteed timelines.',
      col1Extra: 'Direct factory integration ensures customized textures, exotic finishes, and strict adherence to architectural specifications.',
      col2: 'From concept design to final turnkey installation, our team provides reliable support for client projects of any scale.',
      col2Extra: 'Engineered for developers and architects creating distinctive luxury residences.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=90',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : editorialSlides.length - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev < editorialSlides.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="consultation"
      aria-label="LEOZ Philosophy and Design"
      style={{
        backgroundColor: '#FFFFFF',
        color: '#111111',
        paddingTop: 'clamp(50px, 6vw, 80px)',
        paddingBottom: 'clamp(70px, 8vw, 110px)',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
      }}
    >
      {/* Framed Panoramic Slider Container (Exact RiFRA Milano Proportions) */}
      <div style={{ maxWidth: '1360px', margin: '0 auto clamp(50px, 6vw, 80px)', paddingLeft: '5vw', paddingRight: '5vw', position: 'relative' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '290px',
              overflow: 'hidden',
              backgroundColor: '#111111',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: luxuryEase }}
                style={{
                  position: 'relative',
                  width: '100%',
                  minHeight: '290px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* Background Image across entire box */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${editorialSlides[activeSlide].image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                />
                
                {/* RiFRA exact asymmetric soft gradient overlay so picture is clearly visible everywhere */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.76) 45%, rgba(8,8,8,0.40) 80%, rgba(8,8,8,0.18) 100%)',
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: 'clamp(28px, 3.2vw, 42px) clamp(28px, 3.8vw, 52px)',
                    color: '#FFFFFF',
                    width: '100%',
                  }}
                >
                  {/* Headline */}
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(22px, 2.4vw, 34px)',
                      fontWeight: 400,
                      marginBottom: 'clamp(14px, 1.8vw, 20px)',
                      lineHeight: 1.15,
                      letterSpacing: '0.01em',
                      color: '#FFFFFF',
                    }}
                  >
                    {editorialSlides[activeSlide].title === 'LEOZ Store (Ahmedabad, Surat, Online)' ? (
                      <>
                        LEOZ Store (
                        <span style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>Ahmedabad</span>,{' '}
                        <span style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>Surat</span>,{' '}
                        <span style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>Online</span>)
                      </>
                    ) : (
                      editorialSlides[activeSlide].title
                    )}
                  </h2>

                  {/* 2-Column Paragraphs */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 'clamp(20px, 3.5vw, 48px)',
                    }}
                    className="rifra-panoramic-text-grid"
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          lineHeight: 1.58,
                          color: 'rgba(255, 255, 255, 0.88)',
                          margin: 0,
                          fontWeight: 300,
                        }}
                      >
                        {editorialSlides[activeSlide].col1}
                      </p>
                      {editorialSlides[activeSlide].col1Extra && (
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            lineHeight: 1.58,
                            color: 'rgba(255, 255, 255, 0.88)',
                            margin: 0,
                            fontWeight: 300,
                          }}
                        >
                          {editorialSlides[activeSlide].col1Extra}
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          lineHeight: 1.58,
                          color: 'rgba(255, 255, 255, 0.88)',
                          margin: 0,
                          fontWeight: 300,
                        }}
                      >
                        {editorialSlides[activeSlide].col2}
                      </p>
                      {editorialSlides[activeSlide].col2Extra && (
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            lineHeight: 1.58,
                            color: 'rgba(255, 255, 255, 0.88)',
                            margin: 0,
                            fontWeight: 300,
                          }}
                        >
                          {editorialSlides[activeSlide].col2Extra}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Arrow Button (RiFRA black arrow on white background) */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            style={{
              position: 'absolute',
              left: '-44px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: '#111111',
              fontSize: '44px',
              fontWeight: 200,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
              padding: '6px',
              zIndex: 10,
              transition: 'transform 0.25s ease, color 0.25s ease',
            }}
            className="rifra-slider-nav-arrow"
          >
            ‹
          </button>

          {/* Right Arrow Button (RiFRA black arrow on white background) */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            style={{
              position: 'absolute',
              right: '-44px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: '#111111',
              fontSize: '44px',
              fontWeight: 200,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
              padding: '6px',
              zIndex: 10,
              transition: 'transform 0.25s ease, color 0.25s ease',
            }}
            className="rifra-slider-nav-arrow"
          >
            ›
          </button>
        </div>

        {/* Pagination Indicator Dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '22px',
          }}
        >
          {editorialSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: activeSlide === i ? '9px' : '7px',
                height: activeSlide === i ? '9px' : '7px',
                borderRadius: '50%',
                backgroundColor: activeSlide === i ? '#111111' : '#D0D0D0',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', paddingLeft: '5.5vw', paddingRight: '5.5vw' }}>

        {/* Follow LEOZ on Social Networks (RiFRA Exact Style) */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(60px, 7vw, 90px)' }}>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 400,
              color: '#111111',
              letterSpacing: '0.01em',
              marginBottom: '28px',
            }}
          >
            Follow LEOZ on social networks:
          </h3>

          {/* Social Icons Strip */}
          <div
            style={{
              display: 'flex',              justifyContent: 'center',
              gap: '24px',
            }}
          >
            {/* Facebook */}
            <a
              href="https://www.facebook.com/leozfurniture"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rifra-social-link"
              style={{ color: '#111111', transition: 'color 0.3s ease, transform 0.3s ease' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.593 0 9 1.582 9 4.615V8z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/leoz.furniture"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rifra-social-link"
              style={{ color: '#111111', transition: 'color 0.3s ease, transform 0.3s ease' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@leozfurniture"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="rifra-social-link"
              style={{ color: '#111111', transition: 'color 0.3s ease, transform 0.3s ease' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/leozfurniture"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rifra-social-link"
              style={{ color: '#111111', transition: 'color 0.3s ease, transform 0.3s ease' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .rifra-social-link:hover {
          color: #B69A6B !important;
          transform: translateY(-3px);
        }
        .rifra-slider-nav-arrow:hover {
          color: #B69A6B !important;
          transform: translateY(-50%) scale(1.15) !important;
        }
        @media (max-width: 1024px) {
          .rifra-slider-nav-arrow {
            font-size: 36px !important;
          }
        }
        @media (max-width: 900px) {
          .rifra-panoramic-text-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .rifra-slider-nav-arrow {
            position: absolute !important;
            color: #FFFFFF !important;
            text-shadow: 0 2px 8px rgba(0,0,0,0.7) !important;
            background: rgba(0,0,0,0.4) !important;
            width: 38px !important;
            height: 38px !important;
            border-radius: 50% !important;
            font-size: 26px !important;
          }
          .rifra-slider-nav-arrow:first-of-type {
            left: 10px !important;
          }
          .rifra-slider-nav-arrow:last-of-type {
            right: 10px !important;
          }
        }
        @media (max-width: 600px) {
          #consultation .rifra-panoramic-text-grid p {
            font-size: 13px !important;
            lineHeight: 1.6 !important;
          }
          #consultation h2 {
            font-size: 22px !important;
          }
          #consultation h3 {
            font-size: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};

/* ==========================================================================
   MAIN HOME PAGE COMPONENT
   ========================================================================== */
export const Home: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPreloaderActive, setIsPreloaderActive] = useState<boolean>(checkShouldRunPreloader);
  const [isCurtainExiting, setIsCurtainExiting] = useState(false);
  const [showHeader, setShowHeader] = useState<boolean>(() => !checkShouldRunPreloader());

  useDocumentMeta(
    'LEOZ Cucine | German-Engineered Kitchens & Wardrobes, Made in Gujarat',
    '20+ years of in-house manufacturing. Designed, built and installed by LEOZ Cucine in Ahmedabad.'
  );

  // Preloader timeline: hold the curtain briefly, slide it up, then reveal the page.
  useEffect(() => {
    if (!isPreloaderActive) return;

    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const exitTimer = setTimeout(() => {
      setIsCurtainExiting(true);
      setShowHeader(true);
    }, 400);

    const completeTimer = setTimeout(() => {
      setIsPreloaderActive(false);
      document.body.style.overflow = '';
      markPreloaderSeen();
    }, 400 + 1100);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
    };
  }, [isPreloaderActive]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="page-home">
      <Preloader isActive={isPreloaderActive} isExiting={isCurtainExiting} />

      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      <Header isPreloaderActive={isPreloaderActive} showHeader={showHeader} />
      <main id="main-content">
        <HeroSection />
        <BrandIntroSection />
        <CollectionsSection />
        <UniqueMethodSection />
        <ProductHighlightsSection />
        <WhyLeozSection />
        <HighlightsBarSection />
        <ProcessSection />
        <TradeProfessionalsSection />
        <ConsultationSection />
      </main>
      <Footer />
      <style>{`
        /* Premium pill CTA treatment — scoped to Home's own content buttons only */
        .home-cta-btn {
          border-radius: var(--radius-full);
          padding: 14px 32px;
          transition: transform 0.4s var(--motion-ease-luxury), box-shadow 0.4s var(--motion-ease-luxury), background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        .home-cta-btn:hover,
        .home-cta-btn:focus-visible {
          transform: translateY(-2px);
        }
        .home-cta-btn.btn-light:hover,
        .home-cta-btn.btn-light:focus-visible {
          box-shadow: 0 14px 32px -10px rgba(0, 0, 0, 0.35);
        }
        .home-cta-btn-outline:hover,
        .home-cta-btn-outline:focus-visible {
          box-shadow: 0 14px 32px -10px rgba(0, 0, 0, 0.25);
        }

        /* Soft zoom-on-hover for editorial images */
        .home-media-frame {
          transition: box-shadow 0.4s var(--motion-ease-luxury);
        }
        .home-media-frame img {
          transition: transform 0.7s var(--motion-ease-luxury);
        }
        .home-media-frame:hover img {
          transform: scale(1.045);
        }

        /* Top accent bar on Product Highlight cards */
        .home-highlight-card-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--color-accent-gold);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.5s var(--motion-ease-luxury);
        }
        .home-highlight-card:hover .home-highlight-card-bar {
          transform: scaleX(1);
        }
        .home-highlight-card:hover > div {
          border-color: var(--color-border-gold-medium) !important;
        }

        /* Top accent bar shared by the "Why Choose Leoz" pillar cards and the stat cards in the Highlights Bar */
        .home-pillar-card-bar,
        .home-stat-card-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--color-accent-gold);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.5s var(--motion-ease-luxury);
        }
        .home-pillar-card:hover .home-pillar-card-bar,
        .home-stat-card:hover .home-stat-card-bar {
          transform: scaleX(1);
        }
        .home-pillar-icon {
          transition: transform 0.4s var(--motion-ease-luxury), background-color 0.4s ease;
        }
        .home-pillar-card:hover .home-pillar-icon,
        .home-stat-card:hover .home-pillar-icon {
          transform: scale(1.12);
          background-color: rgba(182, 154, 107, 0.24) !important;
        }

        @media (max-width: 767px) {
          .home-pillars-grid, .home-highlights-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .home-pillars-grid, .home-highlights-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) and (max-width: 1279px) {
          .home-pillars-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;

