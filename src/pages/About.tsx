import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ChevronLeft, ChevronRight, ArrowRight, Factory, Clock, ShieldCheck, Wrench, Handshake } from 'lucide-react';

/* Easing curve for Italian luxury smoothness */
const luxuryEase = [0.16, 1, 0.3, 1];

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Brand & Heritage | LEOZ Cucine — Italian Luxury & German Engineering',
    'Discover the legacy of LEOZ Cucine. 20+ years of in-house manufacturing, German precision engineering, 20,000 sq. ft. factory in Gujarat.'
  );

  // RiFRA-style Brand Heritage Slider Data
  const brandSlides = [
    {
      id: 'heritage',
      name: 'TWO DECADES OF HERITAGE',
      tagline: 'Where German Engineering Meets Gujarati Craftsmanship',
      desc: 'Founded on the principles of direct in-house manufacturing, LEOZ Cucine transforms residential spaces with uncompromising architectural luxury.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=90',
    },
    {
      id: 'factory',
      name: '20,000 SQ. FT. PRODUCTION LAB',
      tagline: 'Precision CNC Machining & European Quality Systems',
      desc: 'Our dedicated manufacturing facility in Gujarat produces state-of-the-art modular kitchens and bespoke wardrobes without outsourcing a single panel.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2000&q=90',
    },
    {
      id: 'vision',
      name: 'DIRECT CLIENT COLLABORATION',
      tagline: 'From Concept to Installation with Zero Intermediaries',
      desc: 'We are the only design and production brand collaborating directly with homeowners, architects, and developers to ensure flawless turnkey execution.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : brandSlides.length - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev < brandSlides.length - 1 ? prev + 1 : 0));
  };

  // Factory Pillars (Bento Grid)
  const factoryHighlights = [
    {
      title: 'Advanced European Machinery',
      desc: 'High-precision automated CNC routing, diamond edge-banding, and robotic lacquer application guaranteeing micron-level tolerances.',
      icon: Factory,
    },
    {
      title: 'Dedicated Quality Control & R&D',
      desc: 'Every carcass, drawer runner, and surface is rigorously tested for thermal resistance, anti-scratch durability, and moisture resistance.',
      icon: ShieldCheck,
    },
    {
      title: 'Short & Direct Supply Chain',
      desc: 'By manufacturing 100% in-house, we eliminate third-party delays, middleman markups, and quality inconsistencies.',
      icon: Clock,
    },
  ];

  // Milestones Timeline
  const milestones = [
    { year: '2005', title: 'Factory Inception', desc: 'Established our precision carpentry and specialized joinery manufacturing unit in Gujarat.' },
    { year: '2010', title: 'Modular Wardrobe Expansion', desc: 'Introduced customized walk-in dressing suites, glass doors, and sliding wardrobe systems.' },
    { year: '2015', title: 'German Engineering Integration', desc: 'Full alignment with European hardware standards (Blum & Hettich) and luxury 45° mitered joinery.' },
    { year: '2024+', title: '5,000+ Landmark Residences', desc: 'A celebrated portfolio of luxury villas, penthouses, and developer collaborations across India.' },
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
          aria-label="About LEOZ Cucine Hero"
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
              key={brandSlides[activeSlide].id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: luxuryEase }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url("${encodeURI(brandSlides[activeSlide].image)}")`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            >
              {/* Dark Gradient Overlay */}
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
            <div style={{ maxWidth: '820px' }}>
              <motion.span
                key={`cat-${activeSlide}`}
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
                THE LEOZ BRAND &amp; HERITAGE
              </motion.span>

              <motion.h1
                key={`name-${activeSlide}`}
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
                {brandSlides[activeSlide].name}
              </motion.h1>

              <motion.p
                key={`desc-${activeSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(14px, 1.2vw, 17px)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.6,
                  maxWidth: '660px',
                  marginBottom: '28px',
                }}
              >
                {brandSlides[activeSlide].desc}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                key={`act-${activeSlide}`}
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
                  <span>Connect With Our Team</span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href="#philosophy-story"
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
                  Read Our Story
                </a>
              </motion.div>
            </div>

            {/* Slider Navigation Controls */}
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
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>0{activeSlide + 1}</span> / 0{brandSlides.length}
              </div>
              <button
                type="button"
                onClick={prevSlide}
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
                onClick={nextSlide}
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
            SECTION 2: OUR STORY & CRAFTSMANSHIP (RiFRA 2-COLUMN ARCHITECTURAL DIALOGUE)
            ========================================================================= */}
        <section
          id="philosophy-story"
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
              {/* Left Column: Image with Subtle Corner Detail */}
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
                  src="/Metal Accents.webp"
                  alt="LEOZ Cucine Brand Story & In-House Factory"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
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
                  Direct Manufacturing Since 2005
                </div>
              </motion.div>

              {/* Right Column: Architectural Narrative */}
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
                  WHERE IT ALL BEGAN
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
                  German Precision. Local Craftsmanship.
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
                  For more than two decades, LEOZ Cucine has shaped the standards of modular kitchens and dressing suites in Gujarat. What originated as a relentless passion for precision engineering has evolved into one of the most trusted names for architects, discerning homeowners, and luxury developers.
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
                  We believe true luxury requires complete accountability. That is why every hinge, carcass panel, and lacquer coat is crafted in our own Ahmedabad factory, installed by our certified technicians with zero reliance on third-party contractors.
                </p>

                {/* Key Metrics */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '24px',
                  }}
                >
                  <div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', color: '#B69A6B', display: 'block', marginBottom: '4px' }}>
                      20+ Yrs
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Manufacturing History
                    </span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', color: '#B69A6B', display: 'block', marginBottom: '4px' }}>
                      5,000+
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Projects Handed Over
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: MEET THE LEADERSHIP / DIRECTOR PORTRAIT (RiFRA STYLE)
            ========================================================================= */}
        <section
          style={{
            backgroundColor: '#000000',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div
              className="rifra-dual-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1fr',
                gap: 'clamp(40px, 7vw, 100px)',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Director Message */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
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
                  LEADERSHIP &amp; VISION
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
                  Meet the Director.
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.75)',
                    lineHeight: 1.8,
                    marginBottom: '20px',
                    fontStyle: 'italic',
                  }}
                >
                  "True luxury is not defined by excess, but by the quiet confidence of perfect engineering and honest materials that endure for generations."
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.75,
                    marginBottom: '32px',
                  }}
                >
                  Mayur Vadhiya brings over 20 years of mastery to LEOZ Cucine's production and automated quality systems. Leading with German-grade manufacturing rigor and a personal touch, he ensures every kitchen and dressing suite represents world-class execution.
                </p>

                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '22px',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      margin: '0 0 4px 0',
                    }}
                  >
                    Mayur Vadhiya
                  </h4>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11.5px',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#B69A6B',
                    }}
                  >
                    Director, LEOZ Cucine India Pvt. Ltd.
                  </span>
                </div>
              </motion.div>

              {/* Right Column: Director Portrait Frame */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1.25',
                  overflow: 'hidden',
                  borderRadius: '2px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <img
                  src="/director.webp"
                  alt="Mayur Vadhiya - Director LEOZ Cucine"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: 20,000 SQ. FT. FACILITY (RiFRA 3-COLUMN BENTO MATRIX)
            ========================================================================= */}
        <section
          id="factory"
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
                THE MANUFACTURING LAB
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
                A 20,000 Sq. Ft. Facility Built for Precision.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  maxWidth: '680px',
                  margin: '0 auto',
                }}
              >
                Spanning 20,000 sq. ft., our manufacturing plant houses automated European machinery, ensuring consistent craftsmanship, on-time delivery, and competitive direct pricing.
              </p>
            </div>

            <div
              className="rifra-tri-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '32px',
              }}
            >
              {factoryHighlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: idx * 0.12, ease: luxuryEase }}
                    style={{
                      backgroundColor: '#000000',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: 'clamp(28px, 3.5vw, 40px)',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '2px',
                      transition: 'all 0.35s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(182, 154, 107, 0.4)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(182, 154, 107, 0.12)',
                        color: '#B69A6B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '20px',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        margin: '0 0 12px 0',
                      }}
                    >
                      {item.title}
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
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: MILESTONES & HISTORY (RiFRA TIMELINE)
            ========================================================================= */}
        <section
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
                OUR TIMELINE
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
                A Track Record of Unwavering Growth.
              </h2>
            </div>

            <div
              className="rifra-4col-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
              }}
            >
              {milestones.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: luxuryEase }}
                  style={{
                    backgroundColor: '#0D0D0D',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: 'clamp(24px, 3vw, 36px)',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '2px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '32px',
                      fontWeight: 300,
                      color: '#B69A6B',
                      display: 'block',
                      marginBottom: '12px',
                      lineHeight: 1,
                    }}
                  >
                    {item.year}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '18px',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      margin: '0 0 10px 0',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: WHY TRUST LEOZ CUCINE (5 PILLARS)
            ========================================================================= */}
        <section
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
                THE LEOZ DISTINCTION
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
                Why Homeowners &amp; Architects Trust Us.
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
                { icon: Clock, title: '20+ Yrs Business', desc: 'A proven track record built project by project.' },
                { icon: Factory, title: 'In-House Plant', desc: 'Direct control over materials, cuts, and finishes.' },
                { icon: ShieldCheck, title: '10-Yr Guarantee', desc: 'Unwavering confidence backed by written warranty.' },
                { icon: Wrench, title: 'In-House Fitters', desc: 'Consistent fit and zero outsourced installation.' },
                { icon: Handshake, title: 'Architect Choice', desc: 'Trusted by leading luxury developers & builders.' },
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
            SECTION 7: RiFRA CINEMATIC CTA
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
              START THE CONVERSATION
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
              Experience the LEOZ Cucine Standard.
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
              Schedule an exclusive design walkthrough at our Ahmedabad flagship showroom or speak directly with our engineering team.
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
              <span>Talk to Our Team</span>
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
          .rifra-tri-grid, .rifra-4col-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .rifra-5col-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .rifra-tri-grid, .rifra-4col-grid, .rifra-5col-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
