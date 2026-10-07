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
      title: '01 / ARCHITECTURAL DESIGN',
      desc: 'Meticulous 3D spatial planning establishing a seamless open-plan golden triangle between the show kitchen, concealed wet pantry, and dining salon.',
      metric: '3D CAD Millimeter Accuracy',
    },
    {
      title: '02 / CURATED MATERIALS',
      desc: 'Rare Taj Mahal sintered quartzite slabs bookmatched with natural smoked European oak veneer and brushed champagne bronze metallic channels.',
      metric: 'Zero-Porosity Heat Shield',
    },
    {
      title: '03 / FACTORY CNC PRECISION',
      desc: 'Manufactured 100% in-house at our 20,000 sq. ft. Gandhinagar plant utilizing 5-axis CNC routing and PUR hot-melt waterproof edge banding.',
      metric: '0.1mm Joinery Tolerance',
    },
    {
      title: '04 / WHITE-GLOVE INSTALLATION',
      desc: 'Direct turnkey installation by LEOZ certified technicians with laser-levelled sub-bases, concealed Blum Servo-Drive, and dust-free handover.',
      metric: '10-Year Written Guarantee',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FAF9F6', color: '#161514', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO: FULL-SCREEN ARCHITECTURAL COVER
            ========================================================================= */}
        <section
          aria-label="Case Study Hero"
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            minHeight: '640px',
            display: 'flex',
            alignItems: 'flex-end',
            backgroundColor: '#161514',
            overflow: 'hidden',
          }}
        >
          {/* Dedicated Full-Screen Case Study Hero Image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90)',
              backgroundPosition: 'center 42%',
              backgroundSize: 'cover',
            }}
          />

          {/* Soft Scrim (Preserving warm architectural depth with clean contrast) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(22, 21, 20, 0.2) 0%, rgba(22, 21, 20, 0.35) 45%, rgba(22, 21, 20, 0.9) 95%)',
            }}
          />

          {/* Hero Typography & Metadata Ribbon */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '1360px',
              width: '100%',
              margin: '0 auto',
              paddingLeft: 'clamp(20px, 5.5vw, 80px)',
              paddingRight: 'clamp(20px, 5.5vw, 80px)',
              paddingBottom: 'clamp(44px, 7vw, 76px)',
            }}
          >
            <div style={{ maxWidth: '920px' }}>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: luxuryEase }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#B69A6B',
                  marginBottom: '14px',
                }}
              >
                {projectMeta.code}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(36px, 6vw, 76px)',
                  fontWeight: 300,
                  lineHeight: 1.04,
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  margin: '0 0 28px 0',
                }}
              >
                {projectMeta.name}
              </motion.h1>

              {/* Architectural Spec Bar */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: luxuryEase }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                  gap: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <div>
                  <span style={{ fontSize: '10.5px', color: '#B69A6B', letterSpacing: '0.15em', display: 'block', textTransform: 'uppercase' }}>
                    LOCATION
                  </span>
                  <strong style={{ fontSize: '13.5px', color: '#FFFFFF', fontWeight: 500 }}>
                    {projectMeta.location}
                  </strong>
                </div>
                <div>
                  <span style={{ fontSize: '10.5px', color: '#B69A6B', letterSpacing: '0.15em', display: 'block', textTransform: 'uppercase' }}>
                    PROJECT TYPE
                  </span>
                  <strong style={{ fontSize: '13.5px', color: '#FFFFFF', fontWeight: 500 }}>
                    {projectMeta.type}
                  </strong>
                </div>
                <div>
                  <span style={{ fontSize: '10.5px', color: '#B69A6B', letterSpacing: '0.15em', display: 'block', textTransform: 'uppercase' }}>
                    SCOPE
                  </span>
                  <strong style={{ fontSize: '13.5px', color: '#FFFFFF', fontWeight: 500 }}>
                    {projectMeta.scope}
                  </strong>
                </div>
                <div>
                  <span style={{ fontSize: '10.5px', color: '#B69A6B', letterSpacing: '0.15em', display: 'block', textTransform: 'uppercase' }}>
                    YEAR
                  </span>
                  <strong style={{ fontSize: '13.5px', color: '#FFFFFF', fontWeight: 500 }}>
                    {projectMeta.year}
                  </strong>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 01: INTRODUCTORY BRAND STATEMENT
            ========================================================================= */}
        <section
          style={{
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(60px, 8vw, 100px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
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
                fontWeight: 600,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#B69A6B',
                display: 'block',
                marginBottom: '16px',
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
                color: '#161514',
                margin: '0 0 28px 0',
                letterSpacing: '-0.01em',
              }}
            >
              “Designed for the way they live.”
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: luxuryEase }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15.5px, 1.4vw, 19px)',
                color: 'rgba(22, 21, 20, 0.78)',
                lineHeight: 1.8,
                maxWidth: '860px',
                margin: 0,
              }}
            >
              The clients envisioned a home where culinary creativity and relaxed hospitality could flourish without architectural clutter. LEOZ was commissioned to engineer the open show kitchen, the concealed prep scullery, and the master dressing sanctuary with uncompromised German precision and bespoke tactile materials.
            </motion.p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: IMAGE STORYTELLING (EDITORIAL GALLERY WITH BREATHING SPACE)
            ========================================================================= */}
        <section
          aria-label="Project Image Storytelling"
          style={{
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 6vw, 80px)' }}>
            
            {/* 1. Full-Width Architectural Panorama */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '21 / 10',
                borderRadius: '3px',
                overflow: 'hidden',
                backgroundColor: '#EBE8E1',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
                alt="The Ahmedabad Residence Monolith Kitchen"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  padding: '8px 16px',
                  backgroundColor: 'rgba(22, 21, 20, 0.8)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                }}
              >
                01 — 4.2M SINTERED QUARTZITE MONOLITH ISLAND
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
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3.4',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  backgroundColor: '#EBE8E1',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85"
                  alt="45 Degree Mitered Edge Detail"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    padding: '6px 12px',
                    backgroundColor: 'rgba(22, 21, 20, 0.8)',
                    backdropFilter: 'blur(8px)',
                    color: '#B69A6B',
                    fontFamily: 'var(--font-body)',
                    fontSize: '10.5px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                  }}
                >
                  45° Mitered Edge Monolith
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: luxuryEase }}
                style={{ padding: 'clamp(10px, 2vw, 30px)' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#B69A6B',
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
                    color: '#161514',
                    margin: '0 0 16px 0',
                  }}
                >
                  Zero visible joint lines. Continuous stone waterfalls.
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    color: 'rgba(22, 21, 20, 0.72)',
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '21 / 10',
                borderRadius: '3px',
                overflow: 'hidden',
                backgroundColor: '#EBE8E1',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2200&q=85"
                alt="Master Walk-In Dressing Suite"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  padding: '8px 16px',
                  backgroundColor: 'rgba(22, 21, 20, 0.8)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                }}
              >
                02 — MASTER DRESSING SUITE WITH CENTRAL LEATHER ISLAND
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
                    border: '1px solid rgba(22, 21, 20, 0.08)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#161514', margin: '0 0 6px 0' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: 'rgba(22, 21, 20, 0.7)', margin: 0, lineHeight: 1.55 }}>
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: PROJECT DETAILS & EXECUTION (4 PILLARS)
            ========================================================================= */}
        <section
          aria-label="Project Execution Details"
          style={{
            backgroundColor: '#161514',
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
                PRECISION ARCHITECTURE IN PRACTICE
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.8vw, 46px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: '0 0 16px 0',
                }}
              >
                Project Execution Standards
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.75)',
                  maxWidth: '680px',
                  margin: '0 auto',
                  lineHeight: 1.7,
                }}
              >
                How LEOZ orchestrated design, manufacturing, and white-glove assembly into a cohesive private residence.
              </p>
            </div>

            {/* 4 Execution Cards Grid */}
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
                    backgroundColor: '#1E1D1B',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '3px',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      color: '#B69A6B',
                      display: 'block',
                      marginBottom: '12px',
                    }}
                  >
                    {p.title}
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: 1.65,
                      margin: '0 0 20px 0',
                      flexGrow: 1,
                    }}
                  >
                    {p.desc}
                  </p>
                  <div
                    style={{
                      paddingTop: '12px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      fontSize: '11px',
                      fontFamily: 'var(--font-body)',
                      color: '#B69A6B',
                      fontWeight: 500,
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
            FINAL SECTION: "YOUR HOME COULD BE NEXT."
            ========================================================================= */}
        <section
          aria-label="Commission Your Residence"
          style={{
            position: 'relative',
            backgroundColor: '#0F0E0D',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
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
              opacity: 0.2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(15, 14, 13, 0.7) 0%, #0F0E0D 95%)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '780px', margin: '0 auto' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#B69A6B',
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
                color: '#FFFFFF',
                lineHeight: 1.08,
                margin: '0 0 20px 0',
                letterSpacing: '0.01em',
              }}
            >
              Your Home Could Be Next.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14.5px, 1.3vw, 17.5px)',
                color: 'rgba(255, 255, 255, 0.8)',
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
                backgroundColor: '#B69A6B',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#9F8255')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#B69A6B')}
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
