import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ArrowRight } from 'lucide-react';
import { factoryAssets } from '../assets/images';

const luxuryEase = [0.16, 1, 0.3, 1];

export const FactoryInfrastructure: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'In-House Manufacturing & Craftsmanship | LEOZ Cucine — Gujarat Facility',
    'Explore the 20,000 sq. ft. LEOZ Cucine precision manufacturing facility in Gujarat. Automated CNC beam saws, PUR edge banding, component assembly and 0.1mm quality control.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productionSequence = [
    {
      step: '01',
      title: 'PANEL SAW MACHINE',
      subtitle: '2-Blade Dual Sizing (Main + Scoring Blade)',
      desc: 'Precision beam saw that cuts Plywood, MDF, HDMR, and Particle Board. Equipped with a high-speed scoring blade that pre-cuts the bottom surface followed by the main blade, guaranteeing zero bottom chipping, clean finishes on both sides, and flawless 90° cuts.',
      badge: 'Cuts Plywood • MDF • HDMR • Particle Board',
      specs: [
        'Main blade: full cut through board thickness',
        'Scoring blade: pre-cuts bottom surface for zero chipping',
        'Guaranteed perfect 90° architectural joints',
      ],
      image: factoryAssets.cutting.desktop,
      alt: 'LEOZ Precision 2-Blade Panel Saw Machine',
    },
    {
      step: '02',
      title: 'COLD PRESS MACHINE',
      subtitle: '100–150 Ton High-Pressure Hydraulic Bonding',
      desc: 'Uniform high-pressure laminate & veneer pressing system capable of bonding ~25 boards per cycle under 100–150 tons of hydraulic force. Ensures unbreakable resin bonding with zero air bubbles and zero laminate peeling over decades.',
      badge: '100–150 Ton Force • ~25 Boards / Cycle',
      specs: [
        'Uniform pressure eliminates air bubbles completely',
        'Deep adhesive resin penetration for lifelong bonding',
        'Zero warping or surface peeling under Indian humidity',
      ],
      image: factoryAssets.edgeProcessing.desktop,
      alt: 'LEOZ 150-Ton Hydraulic Cold Press Bonding Machine',
    },
    {
      step: '03',
      title: 'MULTI-BORING MACHINE',
      subtitle: 'Precision Multi-Spindle Automated Hardware Drilling',
      desc: 'Automated multi-spindle drilling system for German hinge plates, minifix cam fittings, and shelf support dowels. Completely eliminates manual human measurement error, ensuring razor-sharp door alignment and smooth drawer functioning.',
      badge: 'Zero Manual Error • Absolute Repeatability',
      specs: [
        'Automated 32mm system boring for European hardware',
        'Perfect alignment for soft-close hinges & runners',
        '100% reproducible calibration across all cabinetry',
      ],
      image: factoryAssets.componentPrep.desktop,
      alt: 'LEOZ Precision Multi-Boring Hardware Drilling Machine',
    },
    {
      step: '04',
      title: 'EDGE BANDING MACHINE',
      subtitle: 'Hot Glue / PUR Sealing with Edge Trimming & Corner Rounding',
      desc: 'High-temperature industrial edge banding machine that pastes, trims, and rounds edge tapes with zero visible glue line. Forms an airtight barrier that prevents moisture entry, guarantees seamless edge aesthetics, and triples cabinet lifespan.',
      badge: 'Edge Pasting + Trimming + Corner Rounding',
      specs: [
        'Complete moisture seal protecting core substrate',
        'Zero visible glue lines with flush corner rounding',
        'Extended durability against steam, heat & daily use',
      ],
      image: factoryAssets.assembly.desktop,
      alt: 'LEOZ Industrial Edge Banding Machine with Corner Rounding',
    },
    {
      step: '05',
      title: 'CNC ROUTING MACHINE',
      subtitle: '3D Grooving, Fluting, Profiling & Moulding',
      desc: 'Heavy-duty CNC router engineered for intricate fluted wardrobe shutters, classical shaker grooving, handle-less J-pull profiles, and designer mouldings. Delivers immaculate design lines and consistent batch finishes.',
      badge: 'Fluting • Grooves • Shaker Mouldings',
      specs: [
        'High-precision 3D carving for fluted & profiled panels',
        'Micro-detailed grooves without surface fraying',
        'Flawless batch-to-batch consistency for bespoke projects',
      ],
      image: factoryAssets.qualityControl.desktop,
      alt: 'LEOZ Precision CNC Routing & Moulding Machine',
    },
  ];

  return (
    <div style={{ backgroundColor: '#F7F7F5', color: '#20211F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            SECTION 01: FULL-BLEED CINEMATIC FACTORY HERO (NO BOXED CARD)
            ========================================================================= */}
        <section
          aria-label="Factory Hero"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '90vh',
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
          <motion.div
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: luxuryEase }}
            style={{ position: 'absolute', inset: 0, zIndex: 1 }}
          >
            <img
              src={factoryAssets.hero.desktop}
              alt="LEOZ 20,000 Sq. Ft. Manufacturing Plant in Gujarat"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.92)' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(14, 15, 13, 0.4) 0%, rgba(14, 15, 13, 0.25) 30%, rgba(14, 15, 13, 0.8) 70%, rgba(14, 15, 13, 0.96) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 20% 75%, rgba(10, 11, 10, 0.8) 0%, rgba(10, 11, 10, 0.35) 50%, transparent 75%)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '920px', color: '#FFFFFF' }}>
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
                marginBottom: '18px',
                textShadow: '0 2px 8px rgba(0,0,0,0.85)',
              }}
            >
              20,000 SQ. FT. IN-HOUSE MANUFACTURING
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: luxuryEase }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(38px, 6vw, 84px)',
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                margin: '0 0 20px 0',
                textShadow: '0 3px 20px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.95)',
              }}
            >
              Precision Behind
              <br />
              Every Detail.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: luxuryEase }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14.5px, 1.25vw, 18px)',
                fontWeight: 300,
                lineHeight: 1.65,
                color: '#ECEBE7',
                maxWidth: '640px',
                margin: 0,
                textShadow: '0 2px 12px rgba(0,0,0,0.9)',
              }}
            >
              Where thoughtful architectural design becomes precisely manufactured reality in our dedicated facility in Gandhinagar, Gujarat.
            </motion.p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: WHAT MAKES IT "FACTORY-FINISHED"? (EDITORIAL INSIGHT)
            ========================================================================= */}
        <section
          style={{
            backgroundColor: '#ECEBE7',
            paddingTop: 'clamp(70px, 9vw, 110px)',
            paddingBottom: 'clamp(70px, 9vw, 110px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            borderBottom: '1px solid #D9D9D4',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: 'clamp(36px, 6vw, 80px)',
                alignItems: 'center',
              }}
              className="editorial-grid"
            >
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
                    marginBottom: '14px',
                  }}
                >
                  THE FACTORY ADVANTAGE
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(32px, 4.2vw, 56px)',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    color: '#20211F',
                    letterSpacing: '-0.015em',
                    margin: '0 0 20px 0',
                  }}
                >
                  What Makes It
                  <br />
                  "Factory-Finished"?
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(15px, 1.2vw, 18px)',
                    color: '#20211F',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  It is not just about aesthetics or blueprint drawings — true luxury furniture is born when <strong>heavy industrial machines</strong> meet a <strong>strictly calibrated precision process</strong>.
                </p>
              </div>

              {/* 3 Core Pillars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div
                  style={{
                    backgroundColor: '#F7F7F5',
                    padding: '24px 28px',
                    borderRadius: '2px',
                    border: '1px solid #D9D9D4',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(165, 139, 98, 0.15)',
                      color: '#A58B62',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '15px',
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    01
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', fontWeight: 400, color: '#20211F', margin: '0 0 4px 0' }}>
                      Better Finish
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#686963', lineHeight: 1.6, margin: 0 }}>
                      Dual-blade scoring panel saws and hot-melt edge banders guarantee 100% chip-free surfaces and invisible hairline joints.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#F7F7F5',
                    padding: '24px 28px',
                    borderRadius: '2px',
                    border: '1px solid #D9D9D4',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(165, 139, 98, 0.15)',
                      color: '#A58B62',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '15px',
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    02
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', fontWeight: 400, color: '#20211F', margin: '0 0 4px 0' }}>
                      Better Alignment
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#686963', lineHeight: 1.6, margin: 0 }}>
                      Multi-spindle boring machines drill with zero manual error, producing silky-smooth drawer motion and razor-sharp shadow gaps.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#F7F7F5',
                    padding: '24px 28px',
                    borderRadius: '2px',
                    border: '1px solid #D9D9D4',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(165, 139, 98, 0.15)',
                      color: '#A58B62',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '15px',
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    03
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', fontWeight: 400, color: '#20211F', margin: '0 0 4px 0' }}>
                      Better Durability
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#686963', lineHeight: 1.6, margin: 0 }}>
                      150-ton hydraulic cold-press bonding and airtight moisture-barrier sealing prevent bubbling and peeling for decades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: 5-STEP AUTOMATED FACTORY MACHINERY SETUP
            ========================================================================= */}
        <section
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ marginBottom: 'clamp(50px, 7vw, 90px)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                MACHINERY SETUP &amp; RIGOROUS PROCESS
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 4.8vw, 68px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.02em', margin: 0 }}>
                5 Automated Manufacturing Machines
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(70px, 10vw, 140px)' }}>
              {productionSequence.map((item, idx) => (
                <div
                  key={item.step}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: idx % 2 === 0 ? '1.2fr 1fr' : '1fr 1.2fr',
                    gap: 'clamp(36px, 6vw, 80px)',
                    alignItems: 'center',
                  }}
                  className="editorial-grid"
                >
                  <div style={{ order: idx % 2 === 0 ? 1 : 2, width: '100%', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#D9D9D4' }}>
                    <img
                      src={item.image}
                      alt={item.alt}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ order: idx % 2 === 0 ? 2 : 1 }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 300, color: '#A58B62', display: 'block', marginBottom: '8px' }}>
                      {item.step}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 300, color: '#20211F', margin: '0 0 6px 0' }}>
                      {item.title}
                    </h3>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A58B62', marginBottom: '14px' }}>
                      {item.subtitle}
                    </div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#686963', lineHeight: 1.75, margin: '0 0 20px 0' }}>
                      {item.desc}
                    </p>

                    {/* Technical Highlights */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #D9D9D4', paddingTop: '16px' }}>
                      {item.specs.map((spec, sIdx) => (
                        <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#A58B62', flexShrink: 0 }} />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#20211F' }}>
                            {spec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FactoryInfrastructure;
