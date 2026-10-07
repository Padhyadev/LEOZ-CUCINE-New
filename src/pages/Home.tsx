import React, { useEffect, useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Preloader, checkShouldRunPreloader, markPreloaderSeen } from '../components/common/Preloader';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ShieldCheck,
  Award,
  Factory,
  Clock,
  Wrench,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  Phone,
  Layers,
  Cpu,
  Compass,
  Scissors,
  Settings,
  Shield,
  Box,
  Binary,
} from 'lucide-react';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

/* ==========================================================================
   1. HERO SECTION — MOBILE-FIRST ARCHITECTURAL HERO
   ========================================================================== */
const HeroSection: React.FC = () => {
  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <section
      id="hero"
      aria-label="LEOZ Cucine Hero"
      className="leoz-hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingTop: 'clamp(100px, 12vh, 140px)',
        paddingBottom: 'clamp(48px, 6vh, 80px)',
        paddingLeft: 'clamp(20px, 5.5vw, 80px)',
        paddingRight: 'clamp(20px, 5.5vw, 80px)',
        backgroundColor: '#121110',
        overflow: 'hidden',
      }}
    >
      {/* Background Architectural Monolith Interior */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: luxuryEase }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      >
        <img
          src="/Gloss Finish.webp"
          alt="LEOZ Cucine Luxury Modular Kitchen Architecture"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            filter: 'brightness(0.55) contrast(1.05)',
          }}
        />
        {/* Soft Ambient Light-Gradient Scrim */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(18, 17, 16, 0.3) 0%, rgba(18, 17, 16, 0.4) 40%, rgba(18, 17, 16, 0.95) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(18, 17, 16, 0.75) 0%, rgba(18, 17, 16, 0.35) 60%, rgba(18, 17, 16, 0.1) 100%)',
          }}
        />
      </motion.div>

      {/* Hero Editorial Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '860px',
          width: '100%',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: luxuryEase }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 14px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(182, 154, 107, 0.35)',
            borderRadius: '2px',
            marginBottom: '18px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#B69A6B',
              boxShadow: '0 0 8px #B69A6B',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#F5F3EF',
            }}
          >
            LEOZ • BESPOKE KITCHENS &amp; WARDROBES
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: luxuryEase }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 5.2vw, 68px)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            color: '#FFFFFF',
            margin: '0 0 20px 0',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          Spaces, Designed Around You.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: luxuryEase }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14.5px, 1.3vw, 17.5px)',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.88)',
            maxWidth: '620px',
            margin: '0 0 32px 0',
          }}
        >
          Precision-crafted modular kitchens, bespoke wardrobes, and complete living spaces where German-inspired engineering meets Indian architectural sensibility.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.55, ease: luxuryEase }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="/modular-kitchens"
            onClick={(e) => navigate(e, '/modular-kitchens')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '15px 32px',
              backgroundColor: '#B69A6B',
              color: '#000000',
              fontFamily: 'var(--font-body)',
              fontSize: '12.5px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              boxShadow: '0 8px 24px rgba(182, 154, 107, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#B69A6B';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Explore Collections</span>
            <ArrowRight size={14} />
          </a>

          <a
            href="/talk-to-us"
            onClick={(e) => navigate(e, '/talk-to-us')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '15px 30px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              fontFamily: 'var(--font-body)',
              fontSize: '12.5px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#FFFFFF';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>Book A Consultation</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

/* ==========================================================================
   2. EDITORIAL BRAND INTRO STATEMENT
   ========================================================================== */
const BrandStatementSection: React.FC = () => {
  return (
    <section
      id="brand-statement"
      aria-label="Brand Philosophy"
      style={{
        backgroundColor: '#FAF9F6',
        color: '#161514',
        paddingTop: 'clamp(70px, 9vw, 120px)',
        paddingBottom: 'clamp(70px, 9vw, 120px)',
        paddingLeft: 'clamp(20px, 5.5vw, 80px)',
        paddingRight: 'clamp(20px, 5.5vw, 80px)',
        borderBottom: '1px solid #ECE7DE',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#8C734B',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            PHILOSOPHY OF LIVING
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(26px, 4vw, 52px)',
              fontWeight: 300,
              lineHeight: 1.18,
              letterSpacing: '-0.01em',
              color: '#161514',
              margin: '0 0 24px 0',
              textTransform: 'uppercase',
            }}
          >
            We don’t just design rooms.<br />We design the way you live.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 300,
              lineHeight: 1.8,
              color: '#55514C',
              maxWidth: '780px',
              margin: '0 auto 48px auto',
            }}
          >
            LEOZ Cucine specializes exclusively in luxury modular kitchens and custom wardrobes. Guided by two decades of manufacturing insight in Gujarat and German-grade precision engineering, every creation is planned around your individual daily rituals, culinary flow, and spatial architecture.
          </p>

          {/* 4 Architectural Fact Columns */}
          <div
            className="leoz-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
              borderTop: '1px solid #E6E0D4',
              paddingTop: '36px',
            }}
          >
            {[
              { num: '20+', label: 'Years Leadership', sub: 'Hands-on modular specialist' },
              { num: '20,000', label: 'Sq. Ft. Plant', sub: 'In-house Gujarat facility' },
              { num: '100%', label: 'Custom Joinery', sub: 'Bespoke sizes & finishes' },
              { num: '10-Yr', label: 'Warranty Support', sub: 'Documented material guarantee' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 3.2vw, 42px)',
                    fontWeight: 300,
                    color: '#8C734B',
                    display: 'block',
                    lineHeight: 1.1,
                    marginBottom: '6px',
                  }}
                >
                  {stat.num}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#161514',
                    display: 'block',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '4px',
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11.5px',
                    color: '#7A756E',
                    display: 'block',
                  }}
                >
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   3. PRODUCT / EXPERIENCE SHOWCASE (SPLIT ALTERNATING ARCHITECTURAL LAYOUT)
   ========================================================================== */
const CollectionsShowcaseSection: React.FC = () => {
  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <section
      id="collections"
      aria-label="LEOZ Collections"
      style={{
        backgroundColor: '#121110',
        color: '#FFFFFF',
        paddingTop: 'clamp(80px, 10vw, 130px)',
        paddingBottom: 'clamp(80px, 10vw, 130px)',
        paddingLeft: 'clamp(20px, 5.5vw, 80px)',
        paddingRight: 'clamp(20px, 5.5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(50px, 7vw, 90px)' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#B69A6B',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            OUR PRODUCT REALMS
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3.8vw, 48px)',
              fontWeight: 300,
              color: '#FFFFFF',
              margin: '0 0 16px 0',
            }}
          >
            Two Expressions of Refined Living
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14.5px',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            Thoughtfully planned for Indian lifestyles, engineered with European hardware standards.
          </p>
        </div>

        {/* Collection 1: Modern Kitchens (55% Image / 45% Content) */}
        <div
          className="leoz-split-row"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
            marginBottom: 'clamp(70px, 9vw, 120px)',
          }}
        >
          {/* Image Container with Proper Aspect Ratio & No Awkward Cropping */}
          <div
            style={{
              position: 'relative',
              borderRadius: '3px',
              overflow: 'hidden',
              backgroundColor: '#1C1B19',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              aspectRatio: '16 / 11',
            }}
          >
            <img
              src="/Gloss Finish.webp"
              alt="LEOZ Modular Kitchen Island and Cabinetry"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                display: 'block',
                transition: 'transform 0.8s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                padding: '8px 14px',
                backgroundColor: 'rgba(18, 17, 16, 0.85)',
                backdropFilter: 'blur(8px)',
                borderRadius: '2px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontSize: '11px',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#B69A6B',
              }}
            >
              Collection 01 • Kitchens
            </div>
          </div>

          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B69A6B',
              }}
            >
              GERMAN PRECISION • INDIAN COOKING NEEDS
            </span>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(26px, 3.2vw, 40px)',
                fontWeight: 300,
                lineHeight: 1.15,
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              Modular Kitchens
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14.5px',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Designed around your culinary habits, spatial geometry, and aesthetic taste. From handleless monolith islands and fluted PU tall units to spice drawers and moisture-resistant carcass construction, every zone makes daily cooking effortless.
            </p>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '8px 0 16px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#B69A6B" />
                <span>German Blum &amp; Hettich soft-close runner systems</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#B69A6B" />
                <span>Straight, L-shaped, U-shaped, Parallel &amp; Island layouts</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#B69A6B" />
                <span>Anti-fingerprint acrylic, PU lacquer, veneer &amp; sintered stone</span>
              </li>
            </ul>

            <div>
              <a
                href="/modular-kitchens"
                onClick={(e) => navigate(e, '/modular-kitchens')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B69A6B';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                <span>Explore Kitchens</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Collection 2: Bespoke Wardrobes (45% Content / 55% Image) */}
        <div
          className="leoz-split-row leoz-split-reverse"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B69A6B',
              }}
            >
              BESPOKE DRESSING &amp; STORAGE
            </span>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(26px, 3.2vw, 40px)',
                fontWeight: 300,
                lineHeight: 1.15,
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              Customised Wardrobes
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14.5px',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Storage as personal as the pieces it holds. We design hinged, sliding, and walk-in dressing suites with tinted glass vitrines, velvet-lined jewellery trays, trouser pull-outs, and integrated warm sensor illumination.
            </p>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '8px 0 16px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.85)',
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#B69A6B" />
                <span>Walk-in dressing suites with center accessories island</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#B69A6B" />
                <span>Sliding glass vitrines with concealed aluminum profiles</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={16} color="#B69A6B" />
                <span>Integrated lighting channels and customized organizers</span>
              </li>
            </ul>

            <div>
              <a
                href="/modular-wardrobes"
                onClick={(e) => navigate(e, '/modular-wardrobes')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B69A6B';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                <span>Discover Wardrobes</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Image Container with Proper Aspect Ratio & No Awkward Cropping */}
          <div
            style={{
              position: 'relative',
              borderRadius: '3px',
              overflow: 'hidden',
              backgroundColor: '#1C1B19',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              aspectRatio: '16 / 11',
            }}
          >
            <img
              src="/Modular Wardrobe.webp"
              alt="LEOZ Bespoke Walk-in Dressing Suite and Glass Wardrobes"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                padding: '8px 14px',
                backgroundColor: 'rgba(18, 17, 16, 0.85)',
                backdropFilter: 'blur(8px)',
                borderRadius: '2px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontSize: '11px',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#B69A6B',
              }}
            >
              Collection 02 • Wardrobes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   4. "OUR UNIQUE METHOD IN THE WORLD OF DESIGN" (5-STAGE EDITORIAL STORY)
   ========================================================================== */
const UniqueMethodSection: React.FC = () => {
  const methodStages = [
    {
      num: '01',
      title: 'DISCOVER',
      tagline: 'Lifestyle & Spatial Listening',
      desc: 'We examine your floor plan, family cooking routines, storage volume, and aesthetic preferences through a dedicated private consultation.',
    },
    {
      num: '02',
      title: 'DESIGN',
      tagline: 'Architectural 3D CAD Planning',
      desc: 'Every millimetre is modelled in 3D with realistic textures, lighting channels, functional appliance zones, and transparent quotations.',
    },
    {
      num: '03',
      title: 'ENGINEER',
      tagline: 'Hardware & Material Detailing',
      desc: 'Select from European hardware standards (Blum/Hettich), anti-scratch finishes, quartz counters, and water-resistant carcass materials.',
    },
    {
      num: '04',
      title: 'CRAFT',
      tagline: 'In-House Factory Manufacturing',
      desc: 'Produced at our 20,000 sq. ft. Gandhinagar plant with computerized CNC sizing, 150-ton cold pressing, and automated edge-banding.',
    },
    {
      num: '05',
      title: 'INSTALL',
      tagline: 'Turnkey Fitment & 10-Yr Warranty',
      desc: 'Installed directly by certified LEOZ master carpenters with micron-level alignment checks and ongoing after-sales support.',
    },
  ];

  return (
    <section
      id="method"
      aria-label="Our Unique Method"
      style={{
        backgroundColor: '#FAF9F6',
        color: '#161514',
        paddingTop: 'clamp(80px, 10vw, 130px)',
        paddingBottom: 'clamp(80px, 10vw, 130px)',
        paddingLeft: 'clamp(20px, 5.5vw, 80px)',
        paddingRight: 'clamp(20px, 5.5vw, 80px)',
        borderBottom: '1px solid #ECE7DE',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#8C734B',
              display: 'block',
              marginBottom: '14px',
            }}
          >
            END-TO-END DIRECT MODEL
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3.8vw, 48px)',
              fontWeight: 300,
              color: '#161514',
              margin: '0 0 16px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
            }}
          >
            Our Unique Method In The World of Design
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: '#55514C',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            The only luxury modular brand in Gujarat managing the entire journey from design concept to factory manufacturing and turnkey installation with zero intermediaries.
          </p>
        </div>

        {/* 5 Sequential Stage Cards */}
        <div
          className="leoz-method-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          {methodStages.map((stage) => (
            <div
              key={stage.num}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E6E0D4',
                borderRadius: '3px',
                padding: '28px 22px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '16px',
                  borderBottom: '1px solid #F0ECE4',
                  paddingBottom: '10px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '32px',
                    fontWeight: 300,
                    color: '#8C734B',
                    lineHeight: 1,
                  }}
                >
                  {stage.num}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#161514',
                  }}
                >
                  {stage.title}
                </span>
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: '#161514',
                  margin: '0 0 8px 0',
                }}
              >
                {stage.tagline}
              </h4>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12.5px',
                  color: '#635F59',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {stage.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="/talk-to-us"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/talk-to-us');
              window.dispatchEvent(new Event('popstate'));
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              backgroundColor: '#161514',
              color: '#FFFFFF',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8C734B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#161514';
            }}
          >
            <span>Begin Your LEOZ Journey</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   5. FACTORY & INFRASTRUCTURE ("PRECISION BEHIND EVERY SPACE")
   ========================================================================== */
const FactoryInfrastructureSection: React.FC = () => {
  const machines = [
    {
      code: 'PRECISION / 01',
      title: 'Panel Saw Machine',
      spec: '2-Blade Scoring System',
      description: 'Pre-cuts bottom surface with scoring blade before full cut. Guarantees clean cuts on Plywood, MDF & HDMR with zero bottom chipping.',
      advantage: 'Clean 90° Cuts • 0 Chipping',
      icon: Scissors,
    },
    {
      code: 'PRECISION / 02',
      title: 'Hydraulic Cold Press',
      spec: '100–150 Ton Uniform Pressure',
      description: 'Laminate pasting under intense hydraulic pressure (~25 boards/cycle). Eliminates manual hand-pressing air pockets.',
      advantage: '0 Bubbles • 0 Peeling Issues',
      icon: Shield,
    },
    {
      code: 'PRECISION / 03',
      title: 'Multi-Boring Machine',
      spec: 'Multi-Spindle CNC Drilling',
      description: 'Simultaneous computerized drilling for German hardware, dowels, and minifix joints. Eliminates hand-tool drilling deviations.',
      advantage: 'Perfect Alignment • 0 Error',
      icon: Settings,
    },
    {
      code: 'PRECISION / 04',
      title: 'Auto Edge Banding',
      spec: 'Hot-Melt Polyurethane Sealing',
      description: 'High-speed automated edge pasting, flush trimming, and corner radius rounding. Creates an airtight moisture barrier.',
      advantage: 'Moisture Barrier • Long Lifespan',
      icon: Sparkles,
    },
    {
      code: 'PRECISION / 05',
      title: '5-Axis CNC Router',
      spec: 'Architectural 3D Profiling',
      description: 'Precision routing for decorative fluting, integrated J-pulls, Gola profiles, and custom moldings with micron-level consistency.',
      advantage: 'Razor-Sharp Consistent Detail',
      icon: Cpu,
    },
  ];

  return (
    <section
      id="factory"
      aria-label="Factory Infrastructure & Machines"
      style={{
        backgroundColor: '#0F0E0D',
        color: '#FFFFFF',
        paddingTop: 'clamp(80px, 10vw, 130px)',
        paddingBottom: 'clamp(80px, 10vw, 130px)',
        paddingLeft: 'clamp(20px, 5.5vw, 80px)',
        paddingRight: 'clamp(20px, 5.5vw, 80px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#B69A6B',
              display: 'block',
              marginBottom: '14px',
            }}
          >
            20,000 SQ. FT. IN-HOUSE FACILITY • RAKANPUR, GANDHINAGAR
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3.8vw, 48px)',
              fontWeight: 300,
              color: '#FFFFFF',
              margin: '0 0 16px 0',
              letterSpacing: '0.02em',
            }}
          >
            Precision Behind Every Space
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.75)',
              maxWidth: '720px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            What makes a kitchen truly “factory-finished”? Not design alone — European machinery and sequence-controlled processes eliminate manual carpentry errors and guarantee lifetime durability.
          </p>
        </div>

        {/* Industrial Machines Bento Grid */}
        <div
          className="leoz-machines-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          {machines.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.code}
                style={{
                  backgroundColor: '#161514',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '3px',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      color: '#B69A6B',
                    }}
                  >
                    {m.code}
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(182, 154, 107, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#B69A6B',
                    }}
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '20px',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    margin: '0 0 4px 0',
                  }}
                >
                  {m.title}
                </h3>

                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11.5px',
                    color: '#B69A6B',
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  {m.spec}
                </span>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12.5px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.6,
                    margin: '0 0 16px 0',
                    flex: 1,
                  }}
                >
                  {m.description}
                </p>

                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '11.5px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                    color: '#48BB78',
                  }}
                >
                  {m.advantage}
                </div>
              </div>
            );
          })}
        </div>

        {/* Factory Plant Specs Callout */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(182, 154, 107, 0.3)',
            borderRadius: '4px',
            padding: 'clamp(24px, 4vw, 36px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#B69A6B',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              VISIT OUR MANUFACTURING PLANT
            </span>
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(20px, 2.5vw, 26px)',
                fontWeight: 400,
                color: '#FFFFFF',
                margin: '0 0 4px 0',
              }}
            >
              LEOZ Furniture Pvt. Ltd. • Gandhinagar
            </h4>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0,
              }}
            >
              Kothari Cross Road, Rakanpur–Satej Road, Gandhinagar – 382721, Gujarat. (Visits by prior appointment)
            </p>
          </div>

          <a
            href="/about#factory"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/about');
              window.dispatchEvent(new Event('popstate'));
              setTimeout(() => {
                const el = document.getElementById('factory');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 200);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 28px',
              backgroundColor: '#B69A6B',
              color: '#000000',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
          >
            <span>Read Factory QC Standards</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   6. PROJECT SHOWCASE (ARCHITECTURAL CASE STUDIES)
   ========================================================================== */
const ProjectsShowcaseSection: React.FC = () => {
  const projects = [
    {
      title: 'Ahmedabad Villa Residence',
      category: 'MODULAR KITCHEN',
      location: 'Sindhu Bhavan Road, Ahmedabad',
      image: '/Gloss Finish.webp',
      desc: 'Monolith island kitchen with sintered marble tops, integrated handleless gola profiles, and matte PU tall cabinetry.',
    },
    {
      title: 'Surat Penthouse Suite',
      category: 'BESPOKE WARDROBE',
      location: 'VIP Road, Surat',
      image: '/Master Walk-In Dressing Suite.webp',
      desc: 'Walk-in dressing room featuring tinted glass vitrines, center vanity island, and integrated warm sensor illumination.',
    },
    {
      title: 'Gandhinagar Estate',
      category: 'COMPLETE LIVING INTERIOR',
      location: 'Rakanpur, Gandhinagar',
      image: '/Metal Accents.webp',
      desc: 'Whole-residence cabinetry coordination including dining bar monoliths, fluted wall panels, and contemporary kitchen suites.',
    },
  ];

  return (
    <section
      id="projects"
      aria-label="Architectural Projects"
      style={{
        backgroundColor: '#FAF9F6',
        color: '#161514',
        paddingTop: 'clamp(80px, 10vw, 130px)',
        paddingBottom: 'clamp(80px, 10vw, 130px)',
        paddingLeft: 'clamp(20px, 5.5vw, 80px)',
        paddingRight: 'clamp(20px, 5.5vw, 80px)',
        borderBottom: '1px solid #ECE7DE',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#8C734B',
              display: 'block',
              marginBottom: '14px',
            }}
          >
            PORTFOLIO OF DISTINCTIVE HOMES
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3.8vw, 48px)',
              fontWeight: 300,
              color: '#161514',
              margin: '0 0 16px 0',
              letterSpacing: '0.02em',
            }}
          >
            Featured Architectural Case Studies
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: '#55514C',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            Each home is approached as an architectural collaboration with owners, architects, and interior designers.
          </p>
        </div>

        {/* 3-Card Architectural Case Studies Grid */}
        <div
          className="leoz-projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
          }}
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E6E0D4',
                borderRadius: '3px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                transition: 'all 0.35s ease',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '16 / 11', overflow: 'hidden' }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: 'rgba(22, 21, 20, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#B69A6B',
                    padding: '6px 12px',
                    fontSize: '10.5px',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                  }}
                >
                  {project.category}
                </div>
              </div>

              <div style={{ padding: '24px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#161514',
                    margin: '0 0 6px 0',
                  }}
                >
                  {project.title}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-body)',
                    color: '#8C734B',
                    marginBottom: '12px',
                  }}
                >
                  <MapPin size={13} />
                  <span>{project.location}</span>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13px',
                    color: '#635F59',
                    lineHeight: 1.65,
                    margin: '0 0 20px 0',
                    flex: 1,
                  }}
                >
                  {project.desc}
                </p>

                <a
                  href="/talk-to-us"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({}, '', '/talk-to-us');
                    window.dispatchEvent(new Event('popstate'));
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#161514',
                    textDecoration: 'none',
                    borderTop: '1px solid #F0ECE4',
                    paddingTop: '14px',
                    marginTop: 'auto',
                  }}
                >
                  <span>Plan Similar Project</span>
                  <ArrowUpRight size={14} color="#8C734B" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   7. MATERIALS & CRAFTSMANSHIP PALETTE
   ========================================================================== */
const MaterialsSection: React.FC = () => {
  const materials = [
    { title: 'Sintered Stone & Quartz', sub: 'Scratch & Heat Resistant Countertops' },
    { title: 'Fluted Natural Wood', sub: 'Architectural Veneers & Solid Profiles' },
    { title: 'Ultra-Matte PU Lacquer', sub: 'Silk Touch & Anti-Fingerprint Coating' },
    { title: 'Tinted Architectural Glass', sub: 'Extruded Aluminum Door Vitrines' },
    { title: 'Blum & Hettich Hardware', sub: 'Engineered German Soft-Close Systems' },
    { title: 'Moisture-Resistant HDMR', sub: 'Heavy-Duty Moisture Sealed Carcass' },
  ];

  return (
    <section
      id="materials"
      aria-label="Materials and Craftsmanship"
      style={{
        backgroundColor: '#121110',
        color: '#FFFFFF',
        paddingTop: 'clamp(70px, 8vw, 110px)',
        paddingBottom: 'clamp(70px, 8vw, 110px)',
        paddingLeft: 'clamp(20px, 5.5vw, 80px)',
        paddingRight: 'clamp(20px, 5.5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#B69A6B',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            TACTILE EXCELLENCE
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3.8vw, 44px)',
              fontWeight: 300,
              color: '#FFFFFF',
              margin: '0 0 14px 0',
            }}
          >
            Curated Materials &amp; Finishes
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14.5px',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            Touch and feel actual finish moodboards during your private consultation.
          </p>
        </div>

        <div
          className="leoz-materials-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {materials.map((mat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#1C1B19',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '3px',
                padding: '24px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                transition: 'border-color 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '2px',
                  backgroundColor: 'rgba(182, 154, 107, 0.15)',
                  color: '#B69A6B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '13px',
                  fontFamily: 'var(--font-body)',
                  flexShrink: 0,
                }}
              >
                0{i + 1}
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '18px',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    margin: '0 0 4px 0',
                  }}
                >
                  {mat.title}
                </h4>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {mat.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   8. SHOWROOMS & EXPERIENCE STUDIOS
   ========================================================================== */
const ShowroomsSection: React.FC = () => {
  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <section
      id="showrooms"
      aria-label="LEOZ Showrooms"
      style={{
        backgroundColor: '#FAF9F6',
        color: '#161514',
        paddingTop: 'clamp(80px, 10vw, 120px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
        paddingLeft: 'clamp(20px, 5.5vw, 80px)',
        paddingRight: 'clamp(20px, 5.5vw, 80px)',
        borderBottom: '1px solid #ECE7DE',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#8C734B',
              display: 'block',
              marginBottom: '14px',
            }}
          >
            EXPERIENCE CENTERS
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3.8vw, 48px)',
              fontWeight: 300,
              color: '#161514',
              margin: '0 0 16px 0',
            }}
          >
            Visit Our Ahmedabad Office &amp; Studios
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: '#55514C',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            Explore live kitchen monoliths and tactile material samples with our senior design team.
          </p>
        </div>

        <div
          className="leoz-showrooms-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {/* Ahmedabad Flagship */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E6E0D4',
              borderRadius: '3px',
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#8C734B',
                marginBottom: '10px',
              }}
            >
              CORPORATE OFFICE &amp; DESIGN LOUNGE
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '26px',
                fontWeight: 400,
                color: '#161514',
                margin: '0 0 12px 0',
              }}
            >
              Ahmedabad Flagship
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13.5px',
                color: '#635F59',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}
            >
              509, Sankalp Square 3B, Beside Taj Skyline, Sindhu Bhavan Road, Thaltej, Ahmedabad – 380059, Gujarat.
            </p>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="https://maps.app.goo.gl/xT39MPBvZR4v923E9"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  color: '#8C734B',
                  textDecoration: 'none',
                }}
              >
                <MapPin size={14} />
                <span>Open in Google Maps</span>
              </a>
              <a
                href="/talk-to-us"
                onClick={(e) => navigate(e, '/talk-to-us')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 24px',
                  backgroundColor: '#161514',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  marginTop: '10px',
                }}
              >
                Book Ahmedabad Appointment
              </a>
            </div>
          </div>

          {/* Surat & Virtual Consultation */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E6E0D4',
              borderRadius: '3px',
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#8C734B',
                marginBottom: '10px',
              }}
            >
              SURAT &amp; PAN-INDIA ONLINE 3D LOUNGE
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '26px',
                fontWeight: 400,
                color: '#161514',
                margin: '0 0 12px 0',
              }}
            >
              Surat &amp; Online Design
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13.5px',
                color: '#635F59',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}
            >
              Surat Experience Studio (visits by appointment) &amp; Virtual Online 3D CAD sessions serving clients across Mumbai, Delhi, Bengaluru, and Pune.
            </p>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-body)',
                  color: '#635F59',
                }}
              >
                <Phone size={14} color="#8C734B" />
                <span>Director Sales: +91 98250 22616</span>
              </div>
              <a
                href="/talk-to-us"
                onClick={(e) => navigate(e, '/talk-to-us')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 24px',
                  backgroundColor: '#8C734B',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  marginTop: '10px',
                }}
              >
                Schedule Virtual 3D Session
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   9. FINAL MINIMAL LUXURY CTA
   ========================================================================== */
const FinalCTASection: React.FC = () => {
  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <section
      aria-label="Begin Consultation"
      style={{
        backgroundColor: '#121110',
        color: '#FFFFFF',
        paddingTop: 'clamp(90px, 12vw, 150px)',
        paddingBottom: 'clamp(90px, 12vw, 150px)',
        paddingLeft: 'clamp(20px, 5.5vw, 80px)',
        paddingRight: 'clamp(20px, 5.5vw, 80px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#B69A6B',
            display: 'block',
            marginBottom: '16px',
          }}
        >
          BEGIN YOUR LEOZ EXPERIENCE
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
            margin: '0 0 24px 0',
            textTransform: 'uppercase',
          }}
        >
          Let’s create a space that feels like you.
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.25vw, 18px)',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '640px',
            margin: '0 auto 40px auto',
          }}
        >
          Share your architectural drawings or room dimensions. Our team will develop a tailored 3D modular plan around your habits, space, and aesthetic preferences.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="/talk-to-us"
            onClick={(e) => navigate(e, '/talk-to-us')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 36px',
              backgroundColor: '#B69A6B',
              color: '#000000',
              fontFamily: 'var(--font-body)',
              fontSize: '12.5px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              boxShadow: '0 10px 30px rgba(182, 154, 107, 0.3)',
              transition: 'all 0.3s ease',
            }}
          >
            <span>Book A Consultation</span>
            <ArrowRight size={14} />
          </a>

          <a
            href="/contact"
            onClick={(e) => navigate(e, '/contact')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              fontFamily: 'var(--font-body)',
              fontSize: '12.5px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              transition: 'all 0.3s ease',
            }}
          >
            <span>Visit Ahmedabad Studio</span>
          </a>
        </div>
      </div>
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
    'Luxury modular kitchens, bespoke wardrobes, and complete interiors. 20+ years of manufacturing insight, 20,000 sq. ft. plant in Gujarat.'
  );

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
    <div className="page-home" style={{ backgroundColor: '#FAF9F6', overflowX: 'hidden' }}>
      <Preloader isActive={isPreloaderActive} isExiting={isCurtainExiting} />

      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: '#B69A6B',
          zIndex: 9999,
          transformOrigin: '0%',
          transform: `scaleX(${scrollProgress / 100})`,
        }}
      />

      <Header isPreloaderActive={isPreloaderActive} showHeader={showHeader} />

      <main id="main-content">
        <HeroSection />
        <BrandStatementSection />
        <CollectionsShowcaseSection />
        <UniqueMethodSection />
        <FactoryInfrastructureSection />
        <ProjectsShowcaseSection />
        <MaterialsSection />
        <ShowroomsSection />
        <FinalCTASection />
      </main>

      <Footer />

      {/* Mobile-First Responsive Stylesheet */}
      <style>{`
        @media (max-width: 900px) {
          .leoz-split-row {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .leoz-split-reverse {
            display: flex !important;
            flex-direction: column-reverse !important;
          }
          .leoz-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px 16px !important;
          }
          .leoz-machines-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .leoz-method-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .leoz-projects-grid {
            grid-template-columns: 1fr !important;
          }
          .leoz-showrooms-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 500px) {
          .leoz-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
