import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Maximize2,
  CheckCircle2,
  Cpu,
  Award,
  Factory,
  Wrench,
  Compass,
} from 'lucide-react';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const ProjectCaseStudy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'The Ahmedabad Residence Case Study | LEOZ Cucine — Architectural Interior',
    'Explore the architectural case study of The Ahmedabad Residence. A 6,200 sq. ft. private villa featuring monolithic quartzite kitchens, walk-in dressing suites, and custom joinery.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  /* Project Metadata */
  const projectMeta = {
    code: 'LEOZ PROJECT / 01',
    name: 'The Ahmedabad Residence',
    location: 'Bodakdev, Ahmedabad',
    type: 'Luxury Villa Private Residence',
    scope: 'Monolith Chef Kitchen, Master Dressing Suite & Custom Millwork',
    year: '2026',
    area: '6,200 Sq. Ft. Total Interior',
  };

  /* Project Execution Pillars */
  const executionPillars = [
    {
      step: '01',
      title: 'ARCHITECTURAL DESIGN',
      desc: 'Meticulous 3D spatial planning establishing a seamless open-plan golden triangle between the show kitchen, concealed wet pantry, and dining salon.',
      metric: '3D CAD Millimeter Accuracy',
    },
    {
      step: '02',
      title: 'CURATED MATERIALS',
      desc: 'Rare Taj Mahal sintered quartzite slabs bookmatched with natural smoked European oak veneer and brushed champagne bronze metallic channels.',
      metric: 'Zero-Porosity Heat Shield',
    },
    {
      step: '03',
      title: 'FACTORY CNC PRECISION',
      desc: 'Manufactured 100% in-house at our Gandhinagar plant utilizing 5-axis CNC routing and PUR hot-melt waterproof edge banding.',
      metric: '0.1mm Joinery Tolerance',
    },
    {
      step: '04',
      title: 'WHITE-GLOVE INSTALLATION',
      desc: 'Direct turnkey installation by LEOZ certified technicians with laser-levelled sub-bases, concealed Blum Servo-Drive, and dust-free handover.',
      metric: '10-Year Written Guarantee',
    },
  ];

  return (
    <div style={{ backgroundColor: '#F7F4EE', color: '#262522', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO: WARM ARCHITECTURAL EDITORIAL COVER (MOBILE-FIRST SEPARATED PANEL)
            ========================================================================= */}
        <section
          aria-label="Case Study Hero"
          style={{
            position: 'relative',
            width: '100%',
            backgroundColor: '#F7F4EE',
            paddingTop: 'clamp(100px, 12vw, 140px)',
            paddingBottom: 'clamp(40px, 6vw, 60px)',
            borderBottom: '1px solid #E5DED2',
          }}
        >
          <div
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              paddingLeft: 'clamp(20px, 5vw, 60px)',
              paddingRight: 'clamp(20px, 5vw, 60px)',
            }}
          >
            {/* Top Eyebrow & Title */}
            <div style={{ maxWidth: '960px', marginBottom: 'clamp(24px, 4vw, 40px)' }}>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: luxuryEase }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#8A725B',
                  marginBottom: '12px',
                }}
              >
                {projectMeta.code}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(36px, 6.5vw, 76px)',
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: '#262522',
                  margin: 0,
                }}
              >
                {projectMeta.name}
              </motion.h1>
            </div>

            {/* Natural Bright Architectural Photography Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
              style={{
                width: '100%',
                aspectRatio: '21 / 10',
                minHeight: '280px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#EEE9E0',
                border: '1px solid #D5CDBE',
                boxShadow: '0 12px 40px rgba(38,37,34,0.06)',
                marginBottom: 'clamp(24px, 4vw, 36px)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
                alt="The Ahmedabad Residence Monolithic Kitchen"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </motion.div>

            {/* Architectural Spec Card (Crisp White on Soft Cream) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: luxuryEase }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                padding: 'clamp(20px, 3vw, 28px)',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D5CDBE',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(38,37,34,0.04)',
              }}
            >
              <div>
                <span style={{ fontSize: '10.5px', color: '#8A725B', letterSpacing: '0.15em', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
                  LOCATION
                </span>
                <strong style={{ fontSize: '14.5px', color: '#262522', fontWeight: 600, display: 'block', marginTop: '4px' }}>
                  {projectMeta.location}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#8A725B', letterSpacing: '0.15em', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
                  PROJECT TYPE
                </span>
                <strong style={{ fontSize: '14.5px', color: '#262522', fontWeight: 600, display: 'block', marginTop: '4px' }}>
                  {projectMeta.type}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#8A725B', letterSpacing: '0.15em', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
                  SCOPE
                </span>
                <strong style={{ fontSize: '14.5px', color: '#262522', fontWeight: 600, display: 'block', marginTop: '4px' }}>
                  {projectMeta.scope}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '10.5px', color: '#8A725B', letterSpacing: '0.15em', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
                  COMPLETION YEAR
                </span>
                <strong style={{ fontSize: '14.5px', color: '#262522', fontWeight: 600, display: 'block', marginTop: '4px' }}>
                  {projectMeta.year} ({projectMeta.area})
                </strong>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 01: INTRODUCTORY ARCHITECTURAL NARRATIVE (#EEE9E0)
            ========================================================================= */}
        <section
          style={{
            paddingTop: 'clamp(70px, 9vw, 110px)',
            paddingBottom: 'clamp(60px, 8vw, 100px)',
            paddingLeft: 'clamp(20px, 5vw, 60px)',
            paddingRight: 'clamp(20px, 5vw, 60px)',
            backgroundColor: '#EEE9E0',
            borderBottom: '1px solid #E5DED2',
          }}
        >
          <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#8A725B',
                display: 'block',
                marginBottom: '14px',
              }}
            >
              ARCHITECTURAL NARRATIVE
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: luxuryEase }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(30px, 4.5vw, 54px)',
                fontWeight: 300,
                lineHeight: 1.15,
                color: '#262522',
                margin: '0 0 24px 0',
                letterSpacing: '-0.01em',
              }}
            >
              “Designed around the rituals of culinary entertaining and quiet luxury.”
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: luxuryEase }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15.5px, 1.3vw, 18.5px)',
                color: '#66635D',
                lineHeight: 1.8,
                maxWidth: '880px',
                margin: 0,
              }}
            >
              The clients envisioned a home where culinary creativity and relaxed hospitality could flourish without architectural clutter. LEOZ was commissioned to engineer the open show kitchen, the concealed prep scullery, and the master dressing sanctuary with uncompromised German precision and bespoke tactile materials.
            </motion.p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: EDITORIAL GALLERY ON WARM IVORY (#F7F4EE)
            ========================================================================= */}
        <section
          aria-label="Project Image Storytelling"
          style={{
            paddingTop: 'clamp(70px, 9vw, 110px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5vw, 60px)',
            paddingRight: 'clamp(20px, 5vw, 60px)',
            backgroundColor: '#F7F4EE',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 72px)' }}>
            
            {/* 1. Full-Width Architectural Panorama */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: luxuryEase }}
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D5CDBE',
                boxShadow: '0 8px 30px rgba(38,37,34,0.05)',
              }}
            >
              <div style={{ width: '100%', aspectRatio: '21 / 10', minHeight: '260px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
                  alt="The Ahmedabad Residence Monolith Kitchen"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '16px 24px', backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#262522' }}>
                  01 — 4.2M SINTERED QUARTZITE MONOLITH ISLAND
                </span>
                <span style={{ fontSize: '12px', color: '#8A725B', fontWeight: 600 }}>
                  Taj Mahal Quartzite & European Smoked Oak
                </span>
              </div>
            </motion.div>

            {/* 2. Two-Column Split (Detail Shot vs Context Shot) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(24px, 4vw, 48px)',
                alignItems: 'center',
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: luxuryEase }}
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D5CDBE',
                  boxShadow: '0 8px 30px rgba(38,37,34,0.05)',
                }}
              >
                <div style={{ width: '100%', aspectRatio: '4 / 3.4', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
                    alt="45 Degree Mitered Edge Detail"
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '14px 20px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E5DED2' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A725B' }}>
                    45° Mitered Edge Monolith Precision
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: luxuryEase }}
                style={{ padding: 'clamp(10px, 2vw, 24px)' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#8A725B',
                    display: 'block',
                    marginBottom: '12px',
                  }}
                >
                  SEAMLESS MONOLITHIC GEOMETRY
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(24px, 3vw, 36px)',
                    fontWeight: 300,
                    color: '#262522',
                    margin: '0 0 16px 0',
                    lineHeight: 1.2,
                  }}
                >
                  Zero visible joint lines. Continuous stone waterfalls.
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: '#66635D',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  By precision-cutting 45-degree mitered edges on 5-axis CNC machines, the Taj Mahal quartzite top wraps seamlessly into vertical stone side gables with zero joint deviations.
                </p>
              </motion.div>
            </div>

            {/* 3. Full-Width Wardrobe Dressing Suite Panorama */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: luxuryEase }}
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D5CDBE',
                boxShadow: '0 8px 30px rgba(38,37,34,0.05)',
              }}
            >
              <div style={{ width: '100%', aspectRatio: '21 / 10', minHeight: '260px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2200&q=85"
                  alt="Master Walk-In Dressing Suite"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '16px 24px', backgroundColor: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#262522' }}>
                  02 — MASTER DRESSING SUITE WITH CENTRAL LEATHER ISLAND
                </span>
                <span style={{ fontSize: '12px', color: '#8A725B', fontWeight: 600 }}>
                  Aero Smoked Glass & Fluted Velvet Interiors
                </span>
              </div>
            </motion.div>

            {/* 4. Three Detail Shots Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {[
                {
                  title: 'Aero Glass Closets',
                  caption: '3.0m floor-to-ceiling smoked glass doors with micro-anodized champagne frames.',
                  image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=900&q=85',
                },
                {
                  title: 'Integrated 3000K Lighting',
                  caption: 'Concealed vertical micro-LED channels bathing garments in true-color 95+ CRI light.',
                  image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85',
                },
                {
                  title: 'Smoked Oak Pocket Doors',
                  caption: 'Concealed motorized pocket doors revealing a hidden prep kitchen and coffee station.',
                  image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85',
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, ease: luxuryEase }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D5CDBE',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(38,37,34,0.04)',
                  }}
                >
                  <div style={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', color: '#262522', margin: '0 0 8px 0', fontWeight: 500 }}>
                      {item.title}
                    </h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#66635D', margin: 0, lineHeight: 1.6 }}>
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: PROJECT EXECUTION (4 PILLARS ON SOFT CREAM #EEE9E0)
            ========================================================================= */}
        <section
          aria-label="Project Execution Details"
          style={{
            backgroundColor: '#EEE9E0',
            color: '#262522',
            paddingTop: 'clamp(70px, 9vw, 110px)',
            paddingBottom: 'clamp(70px, 9vw, 110px)',
            paddingLeft: 'clamp(20px, 5vw, 60px)',
            paddingRight: 'clamp(20px, 5vw, 60px)',
            borderTop: '1px solid #E5DED2',
            borderBottom: '1px solid #E5DED2',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 60px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#8A725B',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                PRECISION ARCHITECTURE IN PRACTICE
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.8vw, 46px)',
                  fontWeight: 300,
                  color: '#262522',
                  margin: '0 0 16px 0',
                }}
              >
                Project Execution Standards
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: '#66635D',
                  maxWidth: '680px',
                  margin: '0 auto',
                  lineHeight: 1.7,
                }}
              >
                How LEOZ orchestrated design, manufacturing, and white-glove assembly into a cohesive private residence.
              </p>
            </div>

            {/* 4 Execution Cards Grid (Crisp White with #D5CDBE border) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {executionPillars.map((p) => (
                <div
                  key={p.title}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #D5CDBE',
                    borderRadius: '8px',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(38,37,34,0.04)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      color: '#8A725B',
                      display: 'block',
                      marginBottom: '10px',
                    }}
                  >
                    {p.step} / {p.title}
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: '#66635D',
                      lineHeight: 1.65,
                      margin: '0 0 20px 0',
                      flexGrow: 1,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{
                      paddingTop: '14px',
                      borderTop: '1px solid #E5DED2',
                      fontSize: '11.5px',
                      fontFamily: 'var(--font-body)',
                      color: '#262522',
                      fontWeight: 600,
                    }}
                  >
                    ✓ {p.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            FINAL SECTION: DELIBERATE DARK CLOSING CONTRAST (#302D28)
            ========================================================================= */}
        <section
          aria-label="Commission Your Residence"
          style={{
            position: 'relative',
            backgroundColor: '#302D28',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5vw, 60px)',
            paddingRight: 'clamp(20px, 5vw, 60px)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {/* Ambient Background Image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85)',
              backgroundPosition: 'center 45%',
              backgroundSize: 'cover',
              opacity: 0.15,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(48, 45, 40, 0.7) 0%, #302D28 95%)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '780px', margin: '0 auto' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#D5CDBE',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              BESPOKE ARCHITECTURAL COMMISSION
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(34px, 5.5vw, 64px)',
                fontWeight: 300,
                color: '#F7F4EE',
                lineHeight: 1.08,
                margin: '0 0 20px 0',
                letterSpacing: '-0.01em',
              }}
            >
              Your Residence Could Be Next.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.3vw, 18px)',
                color: '#E5DED2',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '620px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Whether you are designing an architectural villa or renovating a private penthouse, our principal designers are ready to bring your vision to life.
            </p>

            <a
              href="/talk-to-us"
              onClick={(e) => navigate(e, '/talk-to-us')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 36px',
                backgroundColor: '#F7F4EE',
                color: '#262522',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '4px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8A725B';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#F7F4EE';
                e.currentTarget.style.color = '#262522';
              }}
            >
              <span>Book a Consultation</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectCaseStudy;

