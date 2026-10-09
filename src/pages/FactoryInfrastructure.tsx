import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useReducedMotion } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ArrowRight } from 'lucide-react';
import { factoryAssets } from '../assets/images';

const TOKENS = {
  bgIvory: '#FAF6EF',
  bgCream: '#F3EADB',
  bgSand: '#EADCC5',
  gold: '#C99A5B',
  goldLight: '#E0BC8A',
  bronze: '#8A6330',
  textCocoa: '#3B2F25',
  textTaupe: '#6B5A48',
  lineGold: 'rgba(201,154,91,0.35)',
};

const luxuryEase = [0.16, 1, 0.3, 1];

const AdvantageCard = ({ num, title, desc, reduce, isDesktop }: any) => {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 20); // max ~4 degrees
    setRotateY(x / 30);
  };

  const handleMouseLeave = () => {
    if (!isDesktop || reduce) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        default: { duration: 0.6, ease: luxuryEase },
        rotateX: { type: 'spring', stiffness: 300, damping: 30 },
        rotateY: { type: 'spring', stiffness: 300, damping: 30 }
      }}
      whileHover={reduce || !isDesktop ? undefined : { y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: '#FFFFFF',
        padding: '24px 28px',
        borderRadius: '4px',
        border: `1px solid ${TOKENS.lineGold}`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        boxShadow: '0 10px 30px rgba(138,99,48,0.08)',
        perspective: 1000,
      }}
      animate={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: 'rgba(201,154,91,0.15)', // gold 15%
          color: TOKENS.bronze,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-heading)',
          fontSize: '15px',
          fontWeight: 500,
          flexShrink: 0,
        }}
      >
        {num}
      </div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', fontWeight: 400, color: TOKENS.textCocoa, margin: '0 0 4px 0' }}>
          {title}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: TOKENS.textTaupe, lineHeight: 1.6, margin: 0 }}>
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export const FactoryInfrastructure: React.FC = () => {
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
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

  /* ── Page effects ──────────────────────────────────────────────────────── */
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || reduce) return;
    setMousePos({ x: e.pageX, y: e.pageY });
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ backgroundColor: TOKENS.bgIvory, color: TOKENS.textCocoa, minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Soft spotlight overlay */}
      {isDesktop && !reduce && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', left: mousePos.x, top: mousePos.y, width: '40vw', height: '40vw',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(224,188,138,0.2) 0%, transparent 70%)',
            mixBlendMode: 'multiply',
            transition: 'opacity 0.2s ease',
          }} />
        </div>
      )}

      {/* Progress Line */}
      {isDesktop && !reduce && (
        <motion.div style={{
          position: 'fixed', right: '32px', top: '20vh', bottom: '20vh', width: '2px', backgroundColor: TOKENS.lineGold, zIndex: 60, transformOrigin: 'top',
        }}>
          <motion.div style={{ width: '100%', height: '100%', backgroundColor: TOKENS.gold, scaleY, transformOrigin: 'top' }} />
        </motion.div>
      )}

      <Header />

      <main id="main-content">
        {/* =========================================================================
            SECTION 01: HERO
            ========================================================================= */}
        <section
          aria-label="Factory Hero"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            paddingTop: 'clamp(120px, 16vh, 200px)',
            paddingBottom: 'clamp(48px, 8vh, 100px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={reduce ? false : { scale: 1 }}
            animate={reduce ? false : { scale: 1.06 }}
            transition={{ duration: 12, ease: 'linear' }}
            style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}
          >
            <img
              src={factoryAssets.hero.desktop}
              alt="LEOZ 20,000 Sq. Ft. Manufacturing Plant in Gujarat"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Soft cream gradient into next section */}
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, height: '120px',
              background: `linear-gradient(to top, ${TOKENS.bgIvory} 0%, transparent 100%)`
            }} />
          </motion.div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              style={{
                maxWidth: '680px',
                padding: 'clamp(32px, 5vw, 48px) 0',
              }}
            >


              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 24 }}
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
                  textShadow: '0 2px 16px rgba(0,0,0,0.7)'
                }}
              >
                Precision Behind
                <br />
                Every Detail.
              </motion.h1>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(14.5px, 1.25vw, 18px)',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.95)',
                  margin: 0,
                  textShadow: '0 2px 12px rgba(0,0,0,0.7)'
                }}
              >
                Where thoughtful architectural design becomes precisely manufactured reality in our dedicated facility in Gandhinagar, Gujarat.
              </motion.p>
            </motion.div>
          </div>


        </section>

        {/* =========================================================================
            SECTION 02: THE FACTORY ADVANTAGE
            ========================================================================= */}
        <section
          style={{
            backgroundColor: TOKENS.bgCream,
            paddingTop: 'clamp(70px, 9vw, 110px)',
            paddingBottom: 'clamp(70px, 9vw, 110px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(36px, 6vw, 80px)',
                alignItems: 'center',
              }}
              className="editorial-grid"
            >
              <div style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={reduce ? false : { y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: luxuryEase }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: TOKENS.bronze,
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    THE FACTORY ADVANTAGE
                  </span>
                </motion.div>
                <div style={{ overflow: 'hidden' }}>
                  <motion.h2
                    initial={reduce ? false : { y: '110%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1, ease: luxuryEase }}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(32px, 4.2vw, 56px)',
                      fontWeight: 300,
                      lineHeight: 1.15,
                      color: TOKENS.textCocoa,
                      letterSpacing: '-0.015em',
                      margin: '0 0 20px 0',
                    }}
                  >
                    What Makes It
                    <br />
                    "Factory-Finished"?
                  </motion.h2>
                </div>
                <motion.div
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: luxuryEase }}
                  style={{ width: '48px', height: '1px', backgroundColor: TOKENS.gold, marginBottom: '24px', transformOrigin: 'left' }}
                />
                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: luxuryEase }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(15px, 1.2vw, 18px)',
                    color: TOKENS.textTaupe,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  It is not just about aesthetics or blueprint drawings — true luxury furniture is born when <strong>heavy industrial machines</strong> meet a <strong>strictly calibrated precision process</strong>.
                </motion.p>
              </div>

              {/* 3 Core Pillars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <AdvantageCard 
                  num="01" reduce={reduce} isDesktop={isDesktop}
                  title="Better Finish" 
                  desc="Dual-blade scoring panel saws and hot-melt edge banders guarantee 100% chip-free surfaces and invisible hairline joints." 
                />
                <AdvantageCard 
                  num="02" reduce={reduce} isDesktop={isDesktop}
                  title="Better Alignment" 
                  desc="Multi-spindle boring machines drill with zero manual error, producing silky-smooth drawer motion and razor-sharp shadow gaps." 
                />
                <AdvantageCard 
                  num="03" reduce={reduce} isDesktop={isDesktop}
                  title="Better Durability" 
                  desc="150-ton hydraulic cold-press bonding and airtight moisture-barrier sealing prevent bubbling and peeling for decades." 
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: MACHINERY SETUP
            ========================================================================= */}
        <section
          style={{
            backgroundColor: TOKENS.bgIvory,
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ marginBottom: 'clamp(50px, 7vw, 90px)' }}>
              <div style={{ overflow: 'hidden' }}>
                <motion.span
                  initial={reduce ? false : { y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: luxuryEase }}
                  style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: TOKENS.bronze, display: 'block', marginBottom: '12px' }}
                >
                  MACHINERY SETUP &amp; RIGOROUS PROCESS
                </motion.span>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <motion.h2
                  initial={reduce ? false : { y: '110%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: luxuryEase }}
                  style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 4.8vw, 68px)', fontWeight: 300, color: TOKENS.textCocoa, letterSpacing: '-0.02em', margin: 0 }}
                >
                  5 Automated Manufacturing Machines
                </motion.h2>
              </div>
              <motion.div
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
                style={{ width: '48px', height: '1px', backgroundColor: TOKENS.gold, marginTop: '24px', transformOrigin: 'left' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(70px, 10vw, 140px)' }}>
              {productionSequence.map((item, idx) => (
                <div key={item.step} style={{ position: 'relative' }}>
                  {/* Light sand band every second block */}
                  {idx % 2 !== 0 && (
                    <div style={{ position: 'absolute', top: '-40px', bottom: '-40px', left: '-10vw', right: '-10vw', backgroundColor: TOKENS.bgSand, zIndex: 0 }} />
                  )}

                  <div
                    style={{
                      position: 'relative', zIndex: 1,
                      display: 'grid',
                      gridTemplateColumns: !isDesktop ? '1fr' : (idx % 2 === 0 ? '1.2fr 1fr' : '1fr 1.2fr'),
                      gap: 'clamp(36px, 6vw, 80px)',
                      alignItems: 'center',
                    }}
                    className="editorial-grid"
                  >
                    {/* Image Column */}
                    <div style={{ order: !isDesktop ? 1 : (idx % 2 === 0 ? 1 : 2), position: 'relative' }}>
                      {/* Offset bracket frame */}
                      <div style={{ position: 'absolute', inset: '16px -16px -16px 16px', border: `1px solid ${TOKENS.gold}`, opacity: 0.1, zIndex: 0, borderRadius: '2px' }} />
                      
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: TOKENS.bgCream, boxShadow: '0 20px 40px rgba(138,99,48,0.1)', borderRadius: '2px' }}>
                        <motion.img
                          src={item.image}
                          alt={item.alt}
                          loading="lazy"
                          whileHover={reduce || !isDesktop ? undefined : { scale: 1.05 }}
                          transition={{ duration: 1.5, ease: 'easeOut' }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {/* Slide away reveal */}
                        <motion.div
                          initial={reduce ? false : { x: '0%' }}
                          whileInView={{ x: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: luxuryEase }}
                          style={{ position: 'absolute', inset: 0, backgroundColor: TOKENS.bgCream, zIndex: 2 }}
                        />
                        {/* Light sweep on hover */}
                        {!reduce && isDesktop && (
                          <motion.div
                            initial={{ x: '-150%', y: '-150%', opacity: 0 }}
                            whileHover={{ x: '150%', y: '150%', opacity: 0.2 }}
                            transition={{ duration: 1, ease: 'linear' }}
                            style={{
                              position: 'absolute', inset: '-100%', background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,1) 50%, transparent 60%)', zIndex: 3, pointerEvents: 'none'
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Text Column */}
                    <div style={{ order: !isDesktop ? 2 : (idx % 2 === 0 ? 2 : 1), position: 'relative' }}>
                      {/* Decorative number */}
                      <div aria-hidden="true" style={{ position: 'absolute', top: '-40px', left: '-20px', fontSize: '120px', fontFamily: 'var(--font-heading)', color: TOKENS.gold, opacity: 0.15, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
                        {item.step}
                      </div>

                      <span style={{ display: 'none' }}>{item.step}</span>

                      <div style={{ overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                        <motion.h3
                          initial={reduce ? false : { y: '110%' }}
                          whileInView={{ y: '0%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, ease: luxuryEase }}
                          style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 300, color: TOKENS.textCocoa, margin: '0 0 6px 0' }}
                        >
                          {item.title}
                        </motion.h3>
                      </div>

                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, ease: luxuryEase }}
                        style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: TOKENS.bronze, marginBottom: '14px', position: 'relative', zIndex: 1 }}
                      >
                        {item.subtitle}
                      </motion.div>

                      <motion.p
                        initial={reduce ? false : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, ease: luxuryEase }}
                        style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: TOKENS.textTaupe, lineHeight: 1.75, margin: '0 0 20px 0', position: 'relative', zIndex: 1 }}
                      >
                        {item.desc}
                      </motion.p>

                      {/* Technical Highlights */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: `1px solid ${TOKENS.lineGold}`, paddingTop: '16px', position: 'relative', zIndex: 1 }}>
                        {item.specs.map((spec, sIdx) => (
                          <motion.div
                            key={sIdx}
                            initial={reduce ? false : { opacity: 0, x: -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 + (sIdx * 0.1), ease: luxuryEase }}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                          >
                            <motion.span
                              initial={reduce ? false : { scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.3 + (sIdx * 0.1), type: 'spring' }}
                              style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: TOKENS.gold, flexShrink: 0 }}
                            />
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: TOKENS.textCocoa }}>
                              {spec}
                            </span>
                          </motion.div>
                        ))}
                      </div>
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
