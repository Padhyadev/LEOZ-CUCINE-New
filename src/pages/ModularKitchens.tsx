import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ChevronLeft, ChevronRight, Check, ArrowRight, ShieldCheck, Award, Wrench, Factory, Clock } from 'lucide-react';

/* Easing curve for Italian luxury smoothness */
const luxuryEase = [0.16, 1, 0.3, 1];

export const ModularKitchens: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Kitchens | LEOZ Cucine — Italian Luxury Modular Kitchens',
    'Discover LEOZ Cucine bespoke luxury modular kitchens. German engineering, Italian design, monolith islands, 45-degree handless finishes.'
  );

  // RiFRA-style Collections Hero Slider Data
  const kitchenCollections = [
    {
      id: 'opus-monolith',
      name: 'OPUS MONOLITH',
      tagline: '45° Mitered Edge Monolithic Island & Handleless Architecture',
      desc: 'The pinnacle of architectural pureness. Seamless 45-degree mitered stone countertops and handless cabinet doors creating a continuous sculpture of luxury.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90',
      specs: ['45° Mitered Edges', 'Invisible Push-to-Open', 'Natural Taj Mahal Quartzite', 'Integrated LED Plinth'],
    },
    {
      id: 'german-classic',
      name: 'GERMAN PRECISION CLASSIC',
      tagline: 'Precision Engineered Internal Mechanisms & Textured Wood',
      desc: 'Flawless everyday ergonomics meets rich fluted oak cabinetry. Built with high-end European Blum and Hettich concealed running gear.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=90',
      specs: ['Smoked Fluted Oak', 'Servo-Drive Electronic Open', 'Glass Sided Box Drawers', 'Zero-Moisture Marine Core'],
    },
    {
      id: 'matte-velvet',
      name: 'MATTE VELVET NERO',
      tagline: 'Anti-Fingerprint Nano-Tech Matte Lacquer & Bronze Accents',
      desc: 'Sleek dark aesthetics designed for modern open-plan entertaining. Silky soft-touch matte black surfaces with custom brushed champagne bronze channels.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90',
      specs: ['Nano-Thermal Matte Lacquer', 'Brushed Bronze Gola Profile', 'Concealed Appliance Wall', 'Integrated Wine Lounge'],
    },
  ];

  const [activeCollection, setActiveCollection] = useState(0);

  const prevCollection = () => {
    setActiveCollection((prev) => (prev > 0 ? prev - 1 : kitchenCollections.length - 1));
  };

  const nextCollection = () => {
    setActiveCollection((prev) => (prev < kitchenCollections.length - 1 ? prev + 1 : 0));
  };

  // Materials Showcase Data
  const materials = [
    {
      name: 'Architectural Stone & Quartzite',
      category: 'Countertops & Waterfall Islands',
      desc: 'Calacatta, Nero Marquina, and ultra-durable sintered quartzite surfaces resistant to heat, stains, and daily kitchen rigour.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    },
    {
      name: 'Multilayer Matte & Gloss Lacquers',
      category: 'Front Panels & Tall Units',
      desc: 'Multi-coat robotically applied Italian lacquers in satin matte and deep gloss finishes with anti-scratch UV curing.',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
    },
    {
      name: 'Natural Fluted & Smoked Woods',
      category: 'Warm Cabinetry Accents',
      desc: 'Sustainably sourced European Smoked Oak, Walnut, and fluted acoustic wood veneers treated for India’s climate.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    },
    {
      name: 'Aero Glass & Champagne Metals',
      category: 'Display & Backlit Storage',
      desc: 'Slim aluminum framed smoked glass shutters with integrated 3000K warm LED vertical illumination and soft dampeners.',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',
    },
  ];

  const [selectedMaterial, setSelectedMaterial] = useState(0);

  // RiFRA Method Steps
  const processSteps = [
    { step: '01', title: 'Consultation & Lifestyle Assessment', desc: 'We examine your space, architectural drawings, culinary habits, and aesthetic desires.' },
    { step: '02', title: '3D Photorealistic Architectural Render', desc: 'Every millimetre mapped in 3D CAD with exact lighting, stone veining, and workflow ergonomics.' },
    { step: '03', title: 'Material Selection & Finish Moodboard', desc: 'Touch and feel genuine Italian lacquers, fluted woods, sintered stones, and metal profiles.' },
    { step: '04', title: 'In-House Precision Manufacturing', desc: 'Precision CNC machining at our dedicated factory with European hardware integration.' },
    { step: '05', title: 'Turnkey Installation by LEOZ Master Craftsmen', desc: 'Installed directly by our certified technicians with zero reliance on third-party workers.' },
    { step: '06', title: '10-Year Warranty & White-Glove Support', desc: 'Comprehensive guarantee covering material integrity, hardware smoothness, and aftercare.' },
  ];

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            SECTION 1: RiFRA FULL-BLEED EDITORIAL HERO SLIDER
            ========================================================================= */}
        <section
          aria-label="LEOZ Kitchen Collections Hero"
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            minHeight: '620px',
            backgroundColor: '#000000',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={kitchenCollections[activeCollection].id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: luxuryEase }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url("${encodeURI(kitchenCollections[activeCollection].image)}")`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            >
              {/* Dark Gradient Overlay for RiFRA readability */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 100%)',
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Hero Content Overlay */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '1440px',
              height: '100%',
              margin: '0 auto',
              paddingLeft: '5.5vw',
              paddingRight: '5.5vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              paddingBottom: 'clamp(40px, 6vh, 70px)',
            }}
          >
            <div style={{ maxWidth: '800px' }}>
              <motion.span
                key={`cat-${activeCollection}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: luxuryEase }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11.5px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#B69A6B',
                  marginBottom: '12px',
                  fontWeight: 600,
                }}
              >
                LEOZ CUCINE — KITCHEN COLLECTIONS
              </motion.span>

              <motion.h1
                key={`name-${activeCollection}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(32px, 5vw, 64px)',
                  fontWeight: 300,
                  lineHeight: 1.08,
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  margin: '0 0 16px 0',
                }}
              >
                {kitchenCollections[activeCollection].name}
              </motion.h1>

              <motion.p
                key={`desc-${activeCollection}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(14px, 1.2vw, 17px)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.6,
                  maxWidth: '640px',
                  marginBottom: '28px',
                }}
              >
                {kitchenCollections[activeCollection].desc}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                key={`act-${activeCollection}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: luxuryEase }}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}
              >
                <a
                  href="/talk-to-us"
                  onClick={(e) => navigate(e, '/talk-to-us')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
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
                  <span>Book Consultation</span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href="#collections-breakdown"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 24px',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FFFFFF';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Explore Collection
                </a>
              </motion.div>
            </div>

            {/* Slider Navigation Controls (Bottom Right) */}
            <div
              style={{
                position: 'absolute',
                right: '5.5vw',
                bottom: 'clamp(40px, 6vh, 70px)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 20,
              }}
            >
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginRight: '8px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>0{activeCollection + 1}</span> / 0{kitchenCollections.length}
              </div>
              <button
                type="button"
                onClick={prevCollection}
                aria-label="Previous Slide"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={nextCollection}
                aria-label="Next Slide"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: RiFRA PHILOSOPHY / ARCHITECTURAL MONOLITHS
            ========================================================================= */}
        <section
          id="philosophy"
          style={{
            backgroundColor: '#0A0A0A',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div
              className="rifra-dual-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(40px, 7vw, 100px)',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Image with Subtle 45° Corner Detail */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1.15',
                  overflow: 'hidden',
                  borderRadius: '3px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="LEOZ 45 Degree Monolith Detail"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.8s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    padding: '12px 18px',
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11.5px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  45° Precision Mitered Island
                </div>
              </motion.div>

              {/* Right Column: Architectural Typography */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#B69A6B',
                    display: 'block',
                    marginBottom: '16px',
                    fontWeight: 600,
                  }}
                >
                  THE LEOZ ARCHITECTURAL PHILOSOPHY
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 3.5vw, 44px)',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    color: '#FFFFFF',
                    margin: '0 0 24px 0',
                  }}
                >
                  A Kitchen Should Work as Beautifully as It Looks.
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.8,
                    marginBottom: '20px',
                  }}
                >
                  At LEOZ Cucine, every modular kitchen is conceived not as simple cabinetry, but as an architectural volume designed for the way you cook, store, and gather.
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.8,
                    marginBottom: '36px',
                  }}
                >
                  Our fusion blends authentic German-grade Blum and Hettich hardware with Indian climate-resilient marine cores, finished to an impeccable standard that feels considered in every detail.
                </p>

                {/* Key Attributes Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '18px',
                  }}
                >
                  {[
                    'Ergonomic flow & zone planning',
                    'High moisture-resistant carcass',
                    '45° seamless handleless edges',
                    'Integrated LED channels',
                  ].map((feature) => (
                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(182, 154, 107, 0.15)',
                          color: '#B69A6B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: THREE SIGNATURE KITCHEN SERIES (RiFRA COLLECTION BREAKDOWN)
            ========================================================================= */}
        <section
          id="collections-breakdown"
          style={{
            backgroundColor: '#000000',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#B69A6B',
                  display: 'block',
                  marginBottom: '14px',
                  fontWeight: 600,
                }}
              >
                SIGNATURE STYLES
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(30px, 3.8vw, 48px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                Find Your Kitchen Architecture.
              </h2>
            </div>

            <div
              className="rifra-tri-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '32px',
              }}
            >
              {[
                {
                  title: 'Modern Monolith',
                  subtitle: '45° MITERED ISLANDS',
                  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
                  desc: 'Clean lines, handleless profiles, and continuous stone waterfalls creating a pure monolithic sculpture.',
                },
                {
                  title: 'German Precision',
                  subtitle: 'FUNCTIONAL MASTERY',
                  image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85',
                  desc: 'Heavy-duty drawer runners, motorized pocket door systems, and internal organization built to German tolerances.',
                },
                {
                  title: 'Warm Contemporary',
                  subtitle: 'WOOD & BRONZE ACCENTS',
                  image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
                  desc: 'Rich fluted smoked oak, warm matte lacquers, and brushed champagne bronze channels for luxurious hospitality.',
                },
              ].map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: idx * 0.15, ease: luxuryEase }}
                  style={{
                    backgroundColor: '#0D0D0D',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(182, 154, 107, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 11', overflow: 'hidden' }}>
                    <img
                      src={card.image}
                      alt={card.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)',
                      }}
                    />
                  </div>

                  <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '10.5px',
                        letterSpacing: '0.2em',
                        color: '#B69A6B',
                        marginBottom: '8px',
                        fontWeight: 600,
                      }}
                    >
                      {card.subtitle}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '22px',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        margin: '0 0 12px 0',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13.5px',
                        color: 'rgba(255, 255, 255, 0.65)',
                        lineHeight: 1.65,
                        margin: '0 0 24px 0',
                        flexGrow: 1,
                      }}
                    >
                      {card.desc}
                    </p>

                    <a
                      href="/talk-to-us"
                      onClick={(e) => navigate(e, '/talk-to-us')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        fontWeight: 500,
                        transition: 'color 0.25s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#B69A6B')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    >
                      <span>Inquire Style</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: RiFRA-STYLE MATERIALS & FINISHES GALLERY
            ========================================================================= */}
        <section
          id="materials"
          style={{
            backgroundColor: '#0A0A0A',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: ' clamp(48px, 6vw, 72px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#B69A6B',
                  display: 'block',
                  marginBottom: '14px',
                  fontWeight: 600,
                }}
              >
                TACTILE LUXURY
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(30px, 3.8vw, 48px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: '0 0 16px 0',
                }}
              >
                Materials &amp; Finishes.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                Hand-curated surfaces engineered to withstand moisture, high temperatures, and continuous daily use.
              </p>
            </div>

            {/* Material Tabs */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '40px',
              }}
            >
              {materials.map((mat, idx) => (
                <button
                  key={mat.name}
                  type="button"
                  onClick={() => setSelectedMaterial(idx)}
                  style={{
                    padding: '10px 22px',
                    backgroundColor: selectedMaterial === idx ? '#FFFFFF' : 'transparent',
                    color: selectedMaterial === idx ? '#000000' : 'rgba(255, 255, 255, 0.6)',
                    border: `1px solid ${selectedMaterial === idx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.15)'}`,
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {mat.name.split(' ')[0]} {mat.name.split(' ')[1] || ''}
                </button>
              ))}
            </div>

            {/* Active Material Feature Frame */}
            <div
              className="rifra-dual-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: 'clamp(32px, 5vw, 64px)',
                alignItems: 'center',
                backgroundColor: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 'clamp(24px, 4vw, 48px)',
                borderRadius: '2px',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`mat-img-${selectedMaterial}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: luxuryEase }}
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    borderRadius: '2px',
                  }}
                >
                  <img
                    src={materials[selectedMaterial].image}
                    alt={materials[selectedMaterial].name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>
              </AnimatePresence>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#B69A6B',
                    display: 'block',
                    marginBottom: '10px',
                    fontWeight: 600,
                  }}
                >
                  {materials[selectedMaterial].category}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(24px, 2.8vw, 36px)',
                    fontWeight: 300,
                    color: '#FFFFFF',
                    margin: '0 0 16px 0',
                  }}
                >
                  {materials[selectedMaterial].name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.75,
                    marginBottom: '28px',
                  }}
                >
                  {materials[selectedMaterial].desc}
                </p>

                <a
                  href="/contact"
                  onClick={(e) => navigate(e, '/contact')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11.5px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FFFFFF';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  <span>Request Material Samples</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: THE LEOZ METHOD / PROCESS TIMELINE (RiFRA NUMBERED METHOD)
            ========================================================================= */}
        <section
          id="method"
          style={{
            backgroundColor: '#000000',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#B69A6B',
                  display: 'block',
                  marginBottom: '14px',
                  fontWeight: 600,
                }}
              >
                THE LEOZ METHOD
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(30px, 3.8vw, 48px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                From Consultation to Turnkey Handover.
              </h2>
            </div>

            <div
              className="rifra-process-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '32px',
              }}
            >
              {processSteps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: luxuryEase }}
                  style={{
                    backgroundColor: '#0D0D0D',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: 'clamp(28px, 3.5vw, 40px)',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '2px',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '36px',
                      fontWeight: 300,
                      color: 'rgba(182, 154, 107, 0.6)',
                      display: 'block',
                      marginBottom: '16px',
                      lineHeight: 1,
                    }}
                  >
                    {step.step}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '19px',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      margin: '0 0 12px 0',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: WHY LEOZ PILLARS (5 EXCELLENCE METRICS)
            ========================================================================= */}
        <section
          id="pillars"
          style={{
            backgroundColor: '#0A0A0A',
            paddingTop: 'clamp(80px, 10vw, 120px)',
            paddingBottom: 'clamp(80px, 10vw, 120px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 70px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#B69A6B',
                  display: 'block',
                  marginBottom: '14px',
                  fontWeight: 600,
                }}
              >
                ITALIAN LUXURY &amp; GERMAN QUALITY
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                Why LEOZ Cucine Stands Apart.
              </h2>
            </div>

            <div
              className="rifra-5col-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '20px',
              }}
            >
              {[
                { icon: Factory, title: 'In-House Factory', desc: '100% direct manufacturing — zero outsourced cabinet production.' },
                { icon: Award, title: 'German Hardware', desc: 'Fitted exclusively with Blum and Hettich premium mechanisms.' },
                { icon: Clock, title: '20+ Years Legacy', desc: 'Over two decades of precision bespoke carpentry expertise.' },
                { icon: ShieldCheck, title: '10-Yr Guarantee', desc: 'Comprehensive warranty on hardware, carcasses, and finishes.' },
                { icon: Wrench, title: 'Certified Fitters', desc: 'In-house trained technicians ensuring white-glove assembly.' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: luxuryEase }}
                    style={{
                      backgroundColor: '#000000',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '28px 20px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderRadius: '2px',
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(182, 154, 107, 0.1)',
                        color: '#B69A6B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '17px',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12.5px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: RiFRA CINEMATIC CTA / CONSULTATION INVITATION
            ========================================================================= */}
        <section
          style={{
            position: 'relative',
            backgroundColor: '#000000',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              opacity: 0.18,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, #000000 90%)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '760px', margin: '0 auto' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#B69A6B',
                display: 'block',
                marginBottom: '16px',
                fontWeight: 600,
              }}
            >
              EXPERIENCE LUXURY IN PERSON
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 300,
                color: '#FFFFFF',
                lineHeight: 1.12,
                margin: '0 0 20px 0',
              }}
            >
              Ready to Commission Your Bespoke Kitchen?
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.2vw, 17px)',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.7,
                marginBottom: '36px',
              }}
            >
              Visit our Ahmedabad Flagship Experience Studio or schedule a private consultation with our principal designers.
            </p>

            <a
              href="/talk-to-us"
              onClick={(e) => navigate(e, '/talk-to-us')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 36px',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 600,
                letterSpacing: '0.14em',
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
              <span>Book Private Design Consultation</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Responsive Breakpoints CSS */}
      <style>{`
        @media (max-width: 1024px) {
          .rifra-dual-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .rifra-tri-grid, .rifra-process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .rifra-5col-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .rifra-tri-grid, .rifra-process-grid, .rifra-5col-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ModularKitchens;
