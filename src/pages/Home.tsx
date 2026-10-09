import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Preloader, checkShouldRunPreloader, markPreloaderSeen } from '../components/common/Preloader';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Layers,
  Building2,
  Users,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

/* Easing curve for luxury architectural editorial motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const Home: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState(() => checkShouldRunPreloader());
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const heroPhotos = [
    {
      image: '/modular kitchen.webp',
      alt: 'LEOZ Luxury Modular Kitchen Architecture',
    },
    {
      image: '/Master Walk-In Dressing Suite.webp',
      alt: 'LEOZ Bespoke Master Walk-In Dressing Suite',
    },
    {
      image: '/Island Layout.webp',
      alt: 'LEOZ Monolithic Island Kitchen Architecture',
    },
  ];

  const productHighlights = [
    {
      num: '01',
      title: 'Bespoke Dimensions & Configurations',
      desc: 'Bespoke dimensions and configurations planned around individual requirements, room proportions and personal lifestyles.',
      icon: <Layers size={22} color="#A58B62" />,
    },
    {
      num: '02',
      title: 'Intelligent Storage & Hardware Integration',
      desc: 'Smart drawers, concealed larders, pull-outs, sensor lighting, and German-engineered soft-close motion mechanisms.',
      icon: <Cpu size={22} color="#A58B62" />,
    },
    {
      num: '03',
      title: 'Curated Materials, Finishes & Textures',
      desc: 'Synchronized European laminates, anti-fingerprint acrylics, warm natural veneers, and architectural glass vitrines.',
      icon: <Sparkles size={22} color="#A58B62" />,
    },
    {
      num: '04',
      title: 'Durable Specifications for Daily Use',
      desc: 'Moisture-resistant core substrates, PUR edge sealing, heavy-duty fittings, and easy-maintenance surfaces for longevity.',
      icon: <ShieldCheck size={22} color="#A58B62" />,
    },
  ];

  const [activeWhySlide, setActiveWhySlide] = useState(0);

  const whyLeozSlides = [
    {
      num: '01',
      title: 'Dedicated Focus on Kitchens & Wardrobes',
      tag: '01 / SPECIALISED FOCUS',
      desc: 'We do not dilute our expertise. Our entire design philosophy, machinery, and craftsmanship are solely dedicated to bespoke kitchens and wardrobes.',
      image: '/Island Layout.webp',
      alt: 'LEOZ Kitchen and Wardrobe Specialisation',
    },
    {
      num: '02',
      title: 'Leadership with 20+ Years Experience',
      tag: '02 / EXPERIENCED LEADERSHIP',
      desc: 'Guided by two decades of hands-on modular expertise, understanding the nuances of ergonomics, materials, and Indian cooking environments.',
      image: '/Wood Veneer.webp',
      alt: 'LEOZ 20+ Years Leadership',
    },
    {
      num: '03',
      title: '20,000 Sq. Ft. In-House Gujarat Plant',
      tag: '03 / IN-HOUSE PRODUCTION',
      desc: 'End-to-end manufacturing control with German automated CNC machinery, European beam saws, and strict 5-stage quality assurance.',
      image: '/factory_precision_plant.webp',
      alt: 'LEOZ 20,000 sq ft In-House Manufacturing Facility',
    },
    {
      num: '04',
      title: 'German-Inspired Planning & Warranty Support',
      tag: '04 / RELIABLE SUPPORT',
      desc: 'Precision planning, complete design flexibility, documented product specifications, certified installation, and dependable warranty support.',
      image: '/Master Walk-In Dressing Suite.webp',
      alt: 'LEOZ Precision Planning and Installation Warranty Support',
    },
  ];

  const craftsmanshipSlides = [
    {
      image: '/Italian Marble.webp',
      tag: '01 / PRECISION STONES',
      title: 'Italian Marble & Monoliths',
      subtitle: 'Seamless 45° mitred waterfalls and continuous vein-matched surfaces.',
    },
    {
      image: '/Wood Veneer.webp',
      tag: '02 / NATURAL TEXTURES',
      title: 'Architectural Wood Veneers',
      subtitle: 'Warm fluted timber and German polyurethane moisture-sealed edgebanding.',
    },
    {
      image: '/Glass Vitrines.webp',
      tag: '03 / ILLUMINATED LIVING',
      title: 'Smoked Glass & Vitrines',
      subtitle: 'Micro-profile anodized aluminium frames with integrated sensor LED warmth.',
    },
    {
      image: '/Master Walk-In Dressing Suite.webp',
      tag: '04 / BESPOKE STORAGE',
      title: 'Walk-In Dressing Suites',
      subtitle: 'Micro-velvet jewelry drawers, sensor lighting, and custom shoe galleries.',
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroPhotos.length);
    }, 5000);
    return () => clearInterval(heroTimer);
  }, [heroPhotos.length]);

  useEffect(() => {
    const whyTimer = setInterval(() => {
      setActiveWhySlide((prev) => (prev + 1) % whyLeozSlides.length);
    }, 4500);
    return () => clearInterval(whyTimer);
  }, [whyLeozSlides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % craftsmanshipSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [craftsmanshipSlides.length]);

  useDocumentMeta(
    'LEOZ Cucine | Luxury Modular Kitchens & Bespoke Wardrobes — Gujarat, India',
    'Discover luxury modular kitchens and bespoke wardrobes by LEOZ Cucine. German-inspired planning, precision manufacturing in Gujarat, and architectural design excellence.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#F7F7F5', color: '#20211F', minHeight: '100vh', overflowX: 'hidden' }}>
      {showPreloader && (
        <Preloader
          onComplete={() => {
            markPreloaderSeen();
            setShowPreloader(false);
          }}
        />
      )}

      <Header isPreloaderActive={showPreloader} />

      <main id="main-content">
        {/* =========================================================================
            SECTION 01: FULL-BLEED ARCHITECTURAL KITCHEN HERO (NO BOXED CARD)
            ========================================================================= */}
        <section
          id="hero"
          aria-label="LEOZ Cucine Hero"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingTop: 'clamp(120px, 16vh, 200px)',
            paddingBottom: 'clamp(48px, 8vh, 100px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            overflow: 'hidden',
          }}
        >
          {/* Full-Bleed 100% Width 3-Photo Animated Slide Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              overflow: 'hidden',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={heroSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: luxuryEase }}
                style={{
                  position: 'absolute',
                  inset: 0,
                }}
              >
                <img
                  src={heroPhotos[heroSlide].image}
                  alt={heroPhotos[heroSlide].alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 40%',
                    filter: 'brightness(0.92) contrast(1.02)',
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Enhanced readability scrim/vignette gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(14, 15, 13, 0.45) 0%, rgba(14, 15, 13, 0.2) 25%, rgba(14, 15, 13, 0.72) 65%, rgba(14, 15, 13, 0.94) 100%)',
              }}
            />
            {/* Radial subtle vignette to protect text legibility on left */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 20% 70%, rgba(10, 11, 10, 0.75) 0%, rgba(10, 11, 10, 0.3) 50%, transparent 75%)',
                pointerEvents: 'none',
              }}
            />

            {/* Sleek Hero Slide Indicators */}
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(20px, 4vh, 40px)',
                right: 'clamp(20px, 6vw, 100px)',
                zIndex: 15,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {heroPhotos.map((photo, idx) => (
                <button
                  key={photo.image}
                  type="button"
                  aria-label={`Switch to hero photo ${idx + 1}`}
                  onClick={() => setHeroSlide(idx)}
                  style={{
                    height: '3px',
                    width: heroSlide === idx ? '36px' : '18px',
                    backgroundColor: heroSlide === idx ? '#D4AF37' : 'rgba(255, 255, 255, 0.4)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    borderRadius: '2px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
                    transition: 'all 0.4s ease',
                  }}
                />
              ))}
            </div>
          </div>

        {/* Integrated Editorial Typography directly on composition */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '780px',
            width: '100%',
            color: '#FFFFFF',
          }}
        >
          {/* Uppercase micro-label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(9.5px, 0.95vw, 11px)',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              backgroundColor: 'rgba(10, 11, 10, 0.55)',
              padding: '6px 14px',
              borderRadius: '2px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              backdropFilter: 'blur(10px)',
              marginBottom: '16px',
              textShadow: '0 2px 8px rgba(0,0,0,0.85)',
            }}
          >
            <span>LEOZ / BESPOKE KITCHENS &amp; WARDROBES</span>
          </motion.div>

          {/* Balanced Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: luxuryEase }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 300,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              margin: '0 0 16px 0',
              textShadow: '0 3px 20px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.95)',
            }}
          >
            Luxury, Crafted Around You.
          </motion.h1>

          {/* Supporting Copy - Exact from Draft */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: luxuryEase }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px, 1.2vw, 16.5px)',
              fontWeight: 300,
              lineHeight: 1.65,
              color: '#ECEBE7',
              maxWidth: '640px',
              margin: '0 0 28px 0',
              textShadow: '0 2px 12px rgba(0,0,0,0.9)',
            }}
          >
            Discover luxury modular kitchens and bespoke wardrobes where refined design, intelligent functionality and meticulous craftsmanship come together. Designed to reflect your taste. Precision-made for the way you live.
          </motion.p>

          {/* Editorial Action Links (3 CTAs as specified in Draft) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: luxuryEase }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(12px, 2vw, 18px)',
              flexWrap: 'wrap',
            }}
          >
            {/* Primary Action 1: Explore Kitchens */}
            <a
              href="/modular-kitchens"
              onClick={(e) => navigate(e, '/modular-kitchens')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                backgroundColor: '#A58B62',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                border: '1px solid #A58B62',
                boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
                transition: 'all 0.3s ease',
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
              <span>Explore Kitchens</span>
              <ArrowRight size={13} />
            </a>

            {/* Action 2: Discover Wardrobes */}
            <a
              href="/modular-wardrobes"
              onClick={(e) => navigate(e, '/modular-wardrobes')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 20px',
                backgroundColor: 'rgba(20, 21, 19, 0.65)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D4AF37';
                e.currentTarget.style.color = '#D4AF37';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              <span>Discover Wardrobes</span>
              <ArrowRight size={13} />
            </a>

            {/* Action 3: Book a Private Consultation */}
            <a
              href="/talk-to-us"
              onClick={(e) => navigate(e, '/talk-to-us')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 20px',
                backgroundColor: 'transparent',
                color: '#D4AF37',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                border: '1px solid #D4AF37',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D4AF37';
                e.currentTarget.style.color = '#141513';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#D4AF37';
              }}
            >
              <span>Book Consultation</span>
              <ArrowRight size={13} />
            </a>
          </motion.div>
        </div>
      </section>

        {/* =========================================================================
            SECTION 02: EDITORIAL WHITESPACE — DESIGN THAT FEELS PERSONAL
            ========================================================================= */}
        <section
          id="welcome"
          aria-label="Welcome to LEOZ"
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.3fr',
                gap: 'clamp(40px, 7vw, 100px)',
                alignItems: 'baseline',
              }}
              className="editorial-grid"
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(10.5px, 1vw, 11.5px)',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#A58B62',
                    display: 'block',
                    marginBottom: '12px',
                  }}
                >
                  WELCOME TO LEOZ
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 4.2vw, 56px)',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    letterSpacing: '-0.015em',
                    color: '#20211F',
                    margin: 0,
                  }}
                >
                  Design That
                  <br className="desktop-heading-break" />
                  {' '}Feels Personal.
                </h2>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(15px, 1.2vw, 19px)',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: '#20211F',
                    marginBottom: '20px',
                  }}
                >
                  LEOZ Cucine specialises exclusively in luxury kitchens and customised wardrobes. We combine German-inspired precision, individualised planning and considered material choices to create elegant, functional spaces.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                    lineHeight: 1.7,
                    color: '#686963',
                    marginBottom: '28px',
                  }}
                >
                  With a 20,000 sq. ft. in-house manufacturing facility in Gujarat and two decades of specialist insight guiding the brand, every creation is approached with care from concept to installation.
                </p>

                <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 50px)', borderTop: '1px solid #D9D9D4', paddingTop: '22px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 300, color: '#A58B62', display: 'block', lineHeight: 1 }}>
                      20+
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#686963' }}>
                      Years Experience
                    </span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 300, color: '#A58B62', display: 'block', lineHeight: 1 }}>
                      20k
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#686963' }}>
                      Sq. Ft. Plant
                    </span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3.5vw, 36px)', fontWeight: 300, color: '#A58B62', display: 'block', lineHeight: 1 }}>
                      100%
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#686963' }}>
                      In-House Built
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: FULL-WIDTH ASYMMETRIC VISUAL RYHTHM (KITCHEN & WARDROBE REALMS)
            ========================================================================= */}
        <section
          id="collections"
          aria-label="Our Collections"
          style={{
            backgroundColor: '#ECEBE7',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)' }}>
            <div style={{ marginBottom: 'clamp(36px, 5vw, 70px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(10.5px, 1vw, 11.5px)',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#A58B62',
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                OUR DISCIPLINES
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(26px, 3.8vw, 54px)',
                  fontWeight: 300,
                  lineHeight: 1.15,
                  color: '#20211F',
                  letterSpacing: '-0.015em',
                  margin: 0,
                  maxWidth: '720px',
                }}
              >
                Two Realms of Architectural Refinement
              </h2>
            </div>

            {/* 2 Large Architectural Panels - Open Space, No Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(28px, 4vw, 56px)',
              }}
            >
              {/* Kitchen Realm */}
              <div>
                <div style={{ width: '100%', aspectRatio: '16/11', overflow: 'hidden', marginBottom: '24px', backgroundColor: '#D9D9D4' }}>
                  <img
                    src="/Skyline Monolithic Island.webp"
                    alt="LEOZ Luxury Modular Kitchen Island"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 45%',
                      transition: 'transform 0.8s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', color: '#A58B62', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  01 / MODULAR KITCHENS
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 300, color: '#20211F', margin: '0 0 12px 0' }}>
                  Culinary Monoliths &amp; Spatial Precision
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#686963', lineHeight: 1.7, marginBottom: '20px', maxWidth: '520px' }}>
                  Custom planned around Indian cooking requirements, integrated appliances, and German motion hardware.
                </p>
                <a
                  href="/modular-kitchens"
                  onClick={(e) => navigate(e, '/modular-kitchens')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#20211F',
                    textDecoration: 'none',
                    borderBottom: '1px solid #20211F',
                    paddingBottom: '4px',
                  }}
                >
                  <span>Explore Kitchen Architecture</span>
                  <ArrowRight size={13} />
                </a>
              </div>

              {/* Wardrobe Realm */}
              <div>
                <div style={{ width: '100%', aspectRatio: '16/11', overflow: 'hidden', marginBottom: '24px', backgroundColor: '#D9D9D4' }}>
                  <img
                    src="/Master Walk-In Dressing Suite.webp"
                    alt="LEOZ Bespoke Walk-In Wardrobe Suite"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 40%',
                      transition: 'transform 0.8s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', color: '#A58B62', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  02 / BESPOKE WARDROBES
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 300, color: '#20211F', margin: '0 0 12px 0' }}>
                  Sanctuary Dressing Suites &amp; Glass Vitrines
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#686963', lineHeight: 1.7, marginBottom: '20px', maxWidth: '520px' }}>
                  Organized around your personal belongings, sensor LED illumination, velvet drawers, and fluted joinery.
                </p>
                <a
                  href="/modular-wardrobes"
                  onClick={(e) => navigate(e, '/modular-wardrobes')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#20211F',
                    textDecoration: 'none',
                    borderBottom: '1px solid #20211F',
                    paddingBottom: '4px',
                  }}
                >
                  <span>Discover Wardrobe Suites</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: ARCHITECTURAL CRAFTSMANSHIP & MATERIAL MASTERY
            ========================================================================= */}
        <section
          id="craftsmanship"
          aria-label="The LEOZ Standard of Craftsmanship"
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            borderBottom: '1px solid #D9D9D4',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1.2fr',
                gap: 'clamp(40px, 6vw, 80px)',
                alignItems: 'center',
              }}
              className="editorial-grid"
            >
              {/* Left Column: Architectural Statement & Philosophy */}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#A58B62',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  THE LEOZ STANDARD
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(34px, 4.5vw, 56px)',
                    fontWeight: 300,
                    lineHeight: 1.12,
                    letterSpacing: '-0.015em',
                    color: '#20211F',
                    margin: '0 0 24px 0',
                  }}
                >
                  "Precision is not just what we make. It is how we work."
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: '#686963',
                    lineHeight: 1.75,
                    marginBottom: '20px',
                  }}
                >
                  Every millimeter in our cabinetry is guided by discipline and pride. From microscopic 0.1mm tolerances in our 20,000 sq. ft. Gujarat facility to white-glove installation in your home, the LEOZ seal stands for unyielding quality.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    color: '#686963',
                    lineHeight: 1.75,
                    marginBottom: '32px',
                  }}
                >
                  We blend Austrian Blum and German motion hardware, PUR zero-glue-line moisture barriers, and hand-selected natural veneers to ensure timeless architectural endurance.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  <a
                    href="/about#our-method"
                    onClick={(e) => navigate(e, '/about#our-method')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#20211F',
                      textDecoration: 'none',
                      borderBottom: '1px solid #20211F',
                      paddingBottom: '4px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#A58B62';
                      e.currentTarget.style.borderColor = '#A58B62';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#20211F';
                      e.currentTarget.style.borderColor = '#20211F';
                    }}
                  >
                    <span>Our Craftsmanship Method</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>

              {/* Right Column: Architectural Photography Slider */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  backgroundColor: '#E5E4E0',
                  boxShadow: '0 16px 48px rgba(32, 33, 31, 0.12)',
                }}
              >
                {/* Main Slide Image with Smooth Fade/Slide Transition */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/11', overflow: 'hidden' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: luxuryEase }}
                      style={{ position: 'absolute', inset: 0 }}
                    >
                      <img
                        src={craftsmanshipSlides[activeSlide].image}
                        alt={craftsmanshipSlides[activeSlide].title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center 45%',
                        }}
                      />
                      {/* Gradient overlay for text legibility at bottom */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(180deg, transparent 40%, rgba(20, 21, 19, 0.75) 85%, rgba(20, 21, 19, 0.95) 100%)',
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* On-Image Minimal 1-Line Caption */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '18px',
                      right: '90px',
                      zIndex: 10,
                      color: '#FFFFFF',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(15, 16, 14, 0.75)',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        padding: '3px 8px',
                        borderRadius: '2px',
                        backdropFilter: 'blur(8px)',
                        marginBottom: '6px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '9.5px',
                          fontWeight: 600,
                          letterSpacing: '0.18em',
                          color: '#D4AF37',
                          textTransform: 'uppercase',
                          display: 'block',
                          lineHeight: 1.2,
                        }}
                      >
                        {craftsmanshipSlides[activeSlide].tag}
                      </span>
                    </div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(16px, 1.8vw, 22px)',
                        fontWeight: 300,
                        color: '#FFFFFF',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                      }}
                    >
                      {craftsmanshipSlides[activeSlide].title}
                    </h4>
                  </div>

                  {/* Navigation Arrows */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      zIndex: 15,
                      display: 'flex',
                      gap: '6px',
                    }}
                  >
                    <button
                      type="button"
                      aria-label="Previous Slide"
                      onClick={() =>
                        setActiveSlide(
                          (prev) => (prev - 1 + craftsmanshipSlides.length) % craftsmanshipSlides.length
                        )
                      }
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '2px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        backgroundColor: 'rgba(20, 21, 19, 0.6)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#A58B62';
                        e.currentTarget.style.borderColor = '#A58B62';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(20, 21, 19, 0.6)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next Slide"
                      onClick={() =>
                        setActiveSlide((prev) => (prev + 1) % craftsmanshipSlides.length)
                      }
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '2px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        backgroundColor: 'rgba(20, 21, 19, 0.6)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#A58B62';
                        e.currentTarget.style.borderColor = '#A58B62';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(20, 21, 19, 0.6)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Bottom Slide Indicators Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    backgroundColor: '#ECEBE7',
                    borderTop: '1px solid #D9D9D4',
                  }}
                >
                  {craftsmanshipSlides.map((slide, idx) => (
                    <button
                      key={slide.tag}
                      type="button"
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => setActiveSlide(idx)}
                      style={{
                        height: '3px',
                        width: activeSlide === idx ? '32px' : '16px',
                        backgroundColor: activeSlide === idx ? '#A58B62' : 'rgba(32, 33, 31, 0.25)',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        borderRadius: '2px',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: PRODUCT HIGHLIGHTS
            ========================================================================= */}
        <section
          id="product-highlights"
          aria-label="Product Highlights"
          style={{
            backgroundColor: '#ECEBE7',
            paddingTop: 'clamp(90px, 12vw, 140px)',
            paddingBottom: 'clamp(90px, 12vw, 140px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            borderBottom: '1px solid #D9D9D4',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ maxWidth: '780px', marginBottom: 'clamp(36px, 5vw, 64px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#A58B62',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                FEATURES &amp; ENGINEERING
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(34px, 4.5vw, 56px)',
                  fontWeight: 300,
                  color: '#20211F',
                  letterSpacing: '-0.015em',
                  margin: '0 0 16px 0',
                }}
              >
                Product Highlights
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#686963', lineHeight: 1.7, margin: 0 }}>
                Every kitchen and wardrobe is engineered with modular intelligence, durable specifications, and tailored spatial ergonomics.
              </p>
            </div>

            {/* 4 Feature Highlights Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '28px',
              }}
            >
              {productHighlights.map((item) => (
                <div
                  key={item.num}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: 'clamp(32px, 4vw, 40px)',
                    border: '1px solid #D9D9D4',
                    borderRadius: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    boxShadow: '0 8px 24px rgba(32, 33, 31, 0.03)',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '2px',
                      backgroundColor: '#ECEBE7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      color: '#A58B62',
                      marginBottom: '10px',
                    }}
                  >
                    {item.num}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '22px',
                      fontWeight: 400,
                      color: '#20211F',
                      margin: '0 0 12px 0',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#686963', lineHeight: 1.65, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 06: WHY LEOZ CUCINE (INTERACTIVE SLIDE-BY-SLIDE SHOWCASE)
            ========================================================================= */}
        <section
          id="why-leoz"
          aria-label="Why LEOZ Cucine"
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                gap: 'clamp(24px, 5vw, 64px)',
                alignItems: 'flex-end',
                marginBottom: 'clamp(36px, 5vw, 56px)',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                  BRAND LEADERSHIP &amp; PROMISE
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(34px, 4.5vw, 56px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0 }}>
                  Why LEOZ Cucine?
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  A dedicated focus on kitchens and wardrobes; leadership with 20+ years of hands-on modular experience; 20,000 sq. ft. in-house production; German-inspired planning; design flexibility; documented product specifications; professional fitting and applicable warranty support.
                </p>
              </div>
            </div>

            {/* Slide-by-Slide Full Architectural Image Showcase with Integrated Text */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                minHeight: 'clamp(480px, 60vh, 680px)',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: '#0F100E',
                boxShadow: '0 25px 65px rgba(32, 33, 31, 0.18)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              {/* Full Background Slide Image with Smooth Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWhySlide}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: luxuryEase }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <img
                    src={whyLeozSlides[activeWhySlide].image}
                    alt={whyLeozSlides[activeWhySlide].alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 40%',
                    }}
                  />
                  {/* Rich multi-layer dark scrim overlay to make text crystal clear */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, rgba(15, 16, 14, 0.2) 0%, rgba(15, 16, 14, 0.45) 40%, rgba(15, 16, 14, 0.88) 80%, rgba(15, 16, 14, 0.96) 100%)',
                    }}
                  />
                  {/* Subtle radial vignette protecting bottom-left text */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'radial-gradient(circle at 25% 85%, rgba(15, 16, 14, 0.85) 0%, rgba(15, 16, 14, 0.4) 50%, transparent 75%)',
                      pointerEvents: 'none',
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Integrated Content Directly Inside Image */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 10,
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: 'clamp(28px, 4.5vw, 56px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Text Content Block */}
                <div style={{ maxWidth: '850px' }}>
                  {/* Micro Tag with Gold accent */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: 'rgba(10, 11, 10, 0.65)',
                      padding: '6px 14px',
                      borderRadius: '2px',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      backdropFilter: 'blur(8px)',
                      marginBottom: '14px',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.22em', color: '#D4AF37', textTransform: 'uppercase' }}>
                      {whyLeozSlides[activeWhySlide].tag}
                    </span>
                  </div>

                  {/* Main Heading */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(24px, 3.5vw, 44px)',
                      fontWeight: 300,
                      lineHeight: 1.15,
                      color: '#FFFFFF',
                      margin: '0 0 14px 0',
                      textShadow: '0 3px 20px rgba(0,0,0,0.95)',
                    }}
                  >
                    {whyLeozSlides[activeWhySlide].title}
                  </h3>

                  {/* Main Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(14px, 1.2vw, 16.5px)',
                      lineHeight: 1.7,
                      color: '#EAEAE6',
                      margin: '0 0 24px 0',
                      maxWidth: '760px',
                      textShadow: '0 2px 12px rgba(0,0,0,0.95)',
                    }}
                  >
                    {whyLeozSlides[activeWhySlide].desc}
                  </p>
                </div>

                {/* Clean Full-Width Luxury Controls Bar (Stretches 100% across the bottom) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    boxSizing: 'border-box',
                    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                    paddingTop: '20px',
                    marginTop: '8px',
                  }}
                >
                  {/* Left: Minimalist Slide Indicator Counter & Dash Lines */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#D4AF37', fontWeight: 400 }}>
                      {whyLeozSlides[activeWhySlide].num}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {whyLeozSlides.map((slide, idx) => (
                        <button
                          key={slide.num}
                          type="button"
                          aria-label={`Go to slide ${idx + 1}`}
                          onClick={() => setActiveWhySlide(idx)}
                          style={{
                            height: '3px',
                            width: activeWhySlide === idx ? '32px' : '14px',
                            backgroundColor: activeWhySlide === idx ? '#D4AF37' : 'rgba(255, 255, 255, 0.3)',
                            border: 'none',
                            padding: 0,
                            borderRadius: '2px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                          }}
                        />
                      ))}
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.1em' }}>
                      / 04
                    </span>
                  </div>

                  {/* Right: Sleek Minimalist Arrows at Far Right Edge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <button
                      type="button"
                      aria-label="Previous slide"
                      onClick={() =>
                        setActiveWhySlide(
                          (prev) => (prev - 1 + whyLeozSlides.length) % whyLeozSlides.length
                        )
                      }
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '2px',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        backgroundColor: 'rgba(20, 21, 19, 0.65)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#A58B62';
                        e.currentTarget.style.borderColor = '#A58B62';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(20, 21, 19, 0.65)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Next slide"
                      onClick={() =>
                        setActiveWhySlide((prev) => (prev + 1) % whyLeozSlides.length)
                      }
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '2px',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        backgroundColor: 'rgba(20, 21, 19, 0.65)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#A58B62';
                        e.currentTarget.style.borderColor = '#A58B62';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(20, 21, 19, 0.65)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 06: CINEMATIC FULL-WIDTH FACTORY HERO
            ========================================================================= */}
        <section
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '65vh',
            display: 'flex',
            alignItems: 'center',
            padding: 'clamp(80px, 10vh, 120px) clamp(20px, 6vw, 100px)',
            backgroundColor: '#181917',
            color: '#FFFFFF',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <img
              src="/factory_precision_plant.webp"
              alt="LEOZ 20,000 Sq. Ft. Precision Plant in Gujarat"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.35,
                filter: 'contrast(1.1) brightness(0.8)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(20, 21, 19, 0.75) 0%, rgba(20, 21, 19, 0.85) 50%, rgba(20, 21, 19, 0.95) 100%)',
              }}
            />
          </div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '780px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                display: 'block',
                marginBottom: '16px',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              AT A GLANCE
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(34px, 4.5vw, 56px)',
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                color: '#FFFFFF',
                margin: '0 0 20px 0',
                textShadow: '0 3px 18px rgba(0,0,0,0.85)',
              }}
            >
              20+ Years Leadership. 20,000 Sq. Ft. Facility.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.25vw, 17px)',
                color: '#F0F0EC',
                lineHeight: 1.7,
                marginBottom: '32px',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              20+ years of specialist leadership experience | 20,000 sq. ft. manufacturing facility | Fully customised kitchens and wardrobes | Based in Gujarat.
            </p>
            <a
              href="/factory"
              onClick={(e) => navigate(e, '/factory')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                backgroundColor: '#A58B62',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                border: '1px solid #A58B62',
                boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                transition: 'all 0.3s ease',
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
              <span>Explore Factory &amp; Machinery</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </section>

        {/* =========================================================================
            SECTION 07: THE LEOZ JOURNEY (EXACT 8-STEP PROCESS RIBBON)
            ========================================================================= */}
        <section
          id="the-journey"
          style={{
            backgroundColor: '#ECEBE7',
            paddingTop: 'clamp(80px, 10vw, 120px)',
            paddingBottom: 'clamp(80px, 10vw, 120px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            borderBottom: '1px solid #D9D9D4',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)', maxWidth: '750px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                SEAMLESS EXECUTION
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0 }}>
                The LEOZ Journey
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
              }}
            >
              {[
                { step: '01', title: 'Consultation', desc: 'Understanding your lifestyle, space, and aesthetic preferences.' },
                { step: '02', title: 'Site Measurement', desc: 'Laser assessment of site constraints, walls, and service points.' },
                { step: '03', title: 'Design & Layout', desc: 'Ergonomic 3D visualizations and spatial workflow planning.' },
                { step: '04', title: 'Materials & Hardware', desc: 'Selection of curated finishes, carcass specs, and German fittings.' },
                { step: '05', title: 'Factory Manufacturing', desc: 'Computerized CNC cutting, PUR edge sealing, and pre-assembly.' },
                { step: '06', title: 'Installation', desc: 'Meticulous on-site fitting by certified LEOZ master carpenters.' },
                { step: '07', title: 'Final Inspection', desc: 'Multi-point handover audit verifying plumb alignment and spotless finish.' },
                { step: '08', title: 'After-Sales Coordination', desc: 'Documented warranty support and dedicated relationship care.' },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    backgroundColor: '#F7F7F5',
                    padding: '24px 20px',
                    borderTop: '2px solid #A58B62',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 300, color: '#A58B62', display: 'block', marginBottom: '6px' }}>
                    {item.step}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 400, color: '#20211F', margin: '0 0 8px 0' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#686963', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 08: FOR DESIGN PROFESSIONALS (ARCHITECTS & DESIGNERS)
            ========================================================================= */}
        <section
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            borderTop: '1px solid #D9D9D4',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                gap: 'clamp(24px, 5vw, 64px)',
                alignItems: 'flex-end',
                marginBottom: 'clamp(48px, 6vw, 80px)',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                  FOR DESIGN PROFESSIONALS
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Architectural Partnerships &amp; Development
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  We work with architects, interior designers and premium residential developers to realise customised kitchen and wardrobe specifications. Our team supports technical coordination, material selection, controlled manufacturing and site installation for individual and multi-home requirements.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: '24px',
              }}
            >
              {[
                {
                  icon: <Compass size={24} color="#A58B62" />,
                  title: 'Architects',
                  desc: 'Bespoke technical joinery drawings, CAD integration, and factory-level execution for residential projects.',
                  tag: 'TECHNICAL JOINERY',
                },
                {
                  icon: <Layers size={24} color="#A58B62" />,
                  title: 'Interior Designers',
                  desc: 'Tactile surface archives, bespoke veneer matching, and custom glass vitrines without creative restrictions.',
                  tag: 'MATERIAL ARCHIVES',
                },
                {
                  icon: <Building2 size={24} color="#A58B62" />,
                  title: 'Developers',
                  desc: 'Scalable manufacturing capacity and turnkey precision installation for luxury penthouses and estates.',
                  tag: 'SCALE & TURNKEY',
                },
                {
                  icon: <Users size={24} color="#A58B62" />,
                  title: 'Homeowners',
                  desc: 'Personal 1-on-1 consultation, transparent quotations, and white-glove after-sales support.',
                  tag: 'BESPOKE LIVING',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E4E0',
                    borderTop: '3px solid #A58B62',
                    padding: '32px 24px',
                    borderRadius: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 20px rgba(32, 33, 31, 0.04)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(165, 139, 98, 0.12)';
                    e.currentTarget.style.borderColor = '#A58B62';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(32, 33, 31, 0.04)';
                    e.currentTarget.style.borderColor = '#E5E4E0';
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '2px',
                        backgroundColor: '#F7F7F5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        border: '1px solid #ECEBE7',
                      }}
                    >
                      {card.icon}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#A58B62',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      {card.tag}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '22px',
                        fontWeight: 400,
                        color: '#20211F',
                        margin: '0 0 12px 0',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: '#686963',
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 09: FINAL CALL TO ACTION (BEGIN YOUR LEOZ EXPERIENCE)
            ========================================================================= */}
        <section
          id="final-cta"
          style={{
            backgroundColor: '#1C1D1A',
            color: '#FFFFFF',
            paddingTop: 'clamp(80px, 10vw, 120px)',
            paddingBottom: 'clamp(80px, 10vw, 120px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#D4AF37', display: 'block', marginBottom: '16px' }}>
              BEGIN YOUR LEOZ EXPERIENCE
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(34px, 4.5vw, 56px)', fontWeight: 300, lineHeight: 1.15, color: '#FFFFFF', letterSpacing: '-0.015em', margin: '0 0 20px 0' }}>
              Your next kitchen or wardrobe begins with a conversation.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.25vw, 17px)', color: '#D9D9D4', lineHeight: 1.7, margin: '0 0 36px 0' }}>
              Share your vision and let our team develop a solution around your home, habits and aesthetic preferences.
            </p>
            <a
              href="/talk-to-us"
              onClick={(e) => navigate(e, '/talk-to-us')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 36px',
                backgroundColor: '#A58B62',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8C744F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#A58B62';
              }}
            >
              <span>Book a Private Consultation</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
