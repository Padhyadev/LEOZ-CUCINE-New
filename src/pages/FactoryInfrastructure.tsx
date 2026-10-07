import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Factory,
  Wrench,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Maximize2,
  Scissors,
  Settings,
  Shield,
  Clock,
} from 'lucide-react';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const FactoryInfrastructure: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Factory & Infrastructure | LEOZ Cucine — 20,000 Sq. Ft. Precision Plant',
    'Discover the LEOZ 20,000 sq. ft. manufacturing facility in Gandhinagar. European CNC machinery, beam panel saws, cold press lamination, and automated edge banding.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  /* =========================================================================
     5 PRECISION MACHINES (ACTUAL CLIENT ASSETS & SPECS)
     ========================================================================= */
  const machines = [
    {
      id: 'panel-saw',
      code: 'PRECISION / 01',
      name: 'Panel Saw Machine',
      category: 'PRECISION CUTTING',
      specImage: '/factory-machines/panel_saw_spec.jpg',
      resultImage: '/factory-machines/panel_saw_result.jpg',
      purpose: 'Pre-cuts bottom surface with dedicated scoring blade before the main blade cuts through the board.',
      advantage: 'Guarantees chip-free bottom edges on Plywood, MDF & HDMR with exact 90° square cuts.',
      bulletList: [
        'Main Blade & Pre-Scoring Blade dual system',
        '0.1mm dimensional cutting tolerance',
        'Prevents surface chipping and lamination fraying',
      ],
      icon: Scissors,
    },
    {
      id: 'cold-press',
      code: 'PRECISION / 02',
      name: 'Hydraulic Cold Press',
      category: 'PANEL LAMINATION',
      specImage: '/factory-machines/cold_press_spec.jpg',
      resultImage: '/factory-machines/cold_press_result.jpg',
      purpose: 'Applies 100 to 150 tons of uniform hydraulic pressing across ~25 board cycles simultaneously.',
      advantage: 'Eliminates air bubbles, wavy surfaces, and future laminate peeling seen in hand-pressed furniture.',
      bulletList: [
        '100–150 Ton uniform hydraulic pressure',
        'Bubble-free permanent chemical bonding',
        'Equal pressure across the full 8x4 ft surface',
      ],
      icon: Shield,
    },
    {
      id: 'multi-boring',
      code: 'PRECISION / 03',
      name: 'Multi-Boring Machine',
      category: 'MULTI-SPINDLE DRILLING',
      specImage: '/factory-machines/multi_boring_spec.jpg',
      resultImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      purpose: 'Simultaneous computerized drilling for German dowels, minifix KD joints, and shelf pins in one single pass.',
      advantage: 'Zero alignment deviation between adjacent cabinet panels. Knock-down modular fittings lock seamlessly.',
      bulletList: [
        'Simultaneous vertical & horizontal drilling',
        '32mm system standard for German KD hardware',
        'Eliminates human hand-drill tilt and inaccuracy',
      ],
      icon: Settings,
    },
    {
      id: 'edge-banding',
      code: 'PRECISION / 04',
      name: 'Automatic Edge Banding',
      category: 'EDGE PROCESSING & PUR SEALING',
      specImage: '/factory-machines/edge_banding_spec.jpg',
      resultImage: '/factory-machines/edge_banding_result.jpg',
      purpose: 'High-speed automated gluing, end trimming, fine flush scraping, and corner radius rounding.',
      advantage: 'Creates an airtight waterproof moisture barrier with an invisible zero-glue line.',
      bulletList: [
        'Hot-Melt PUR chemical adhesive sealing',
        'Automated corner radius profiling',
        'Waterproof barrier for humid Indian kitchens',
      ],
      icon: Sparkles,
    },
    {
      id: 'cnc-machining',
      code: 'PRECISION / 05',
      name: '5-Axis CNC Machining Centre',
      category: 'CNC 3D PROFILING & SHAPING',
      specImage: '/factory-machines/cnc_machine_spec.jpg',
      resultImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
      purpose: 'Complex 3D architectural routing for handleless J-pulls, fluted acoustic panels, and mitered grooving.',
      advantage: 'Produces intricate bespoke designs with micron-level consistency across thousands of parts.',
      bulletList: [
        '5-Axis multi-directional milling spindle',
        'Razor-sharp fluting, Gola profiles, and bevels',
        'Direct CAD/CAM computerized execution',
      ],
      icon: Cpu,
    },
  ];

  const [activeMachine, setActiveMachine] = useState(0);

  /* =========================================================================
     WHY TECHNOLOGY MATTERS (5 PILLARS)
     ========================================================================= */
  const technologyPillars = [
    {
      metric: '0.1 mm',
      title: 'PRECISION',
      desc: 'Computerized machinery eliminates human hand-tool variances, ensuring razor-sharp shadow gaps and seamless joints.',
    },
    {
      metric: '100 %',
      title: 'CONSISTENCY',
      desc: 'Every panel, drawer carcass, and cabinet box has identical microscopic dimensions across your entire residence.',
    },
    {
      metric: '3X FASTER',
      title: 'EFFICIENCY',
      desc: 'Automated beam cutting and simultaneous multi-boring deliver faster turnaround without sacrificing finishing quality.',
    },
    {
      metric: '42 PTS',
      title: 'QUALITY CONTROL',
      desc: 'Rigorous multi-stage pre-dispatch inspections verifying moisture resistance, hardware glide, and lacquer smoothness.',
    },
    {
      metric: '10 YRS',
      title: 'DURABILITY',
      desc: 'Factory-applied PUR edge seals and hydraulic cold-pressed lamination ensure resistance to moisture, steam, and daily rigour.',
    },
  ];

  /* =========================================================================
     FROM PANEL TO SPACE (6 CONNECTED PROCESS STAGES)
     ========================================================================= */
  const productionFlow = [
    {
      step: '01',
      title: 'RAW MATERIAL SELECTION',
      desc: 'High-density BWP/BWR marine cores and imported timber veneers tested for moisture and zero voids.',
    },
    {
      step: '02',
      title: 'PRECISION CUTTING',
      desc: 'Automated beam panel saws with pre-scoring blades slice boards with chip-free 90-degree edges.',
    },
    {
      step: '03',
      title: 'EDGE & SURFACE PROCESSING',
      desc: 'Hydraulic cold-press bonding followed by automatic PUR hot-melt edge banding creates an airtight seal.',
    },
    {
      step: '04',
      title: 'CNC MACHINING & BORING',
      desc: 'Multi-spindle drilling and 5-axis routing for concealed German hardware and architectural grooves.',
    },
    {
      step: '05',
      title: 'QUALITY CONTROL & TEST BUILD',
      desc: 'Full modular pre-assembly at our plant verifying hardware motion, drawer tolerances, and finishes.',
    },
    {
      step: '06',
      title: 'WHITE-GLOVE INSTALLATION',
      desc: 'Direct turnkey installation by certified LEOZ technicians with laser leveling and zero dust handover.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FAF9F6', color: '#161514', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO: "PRECISION BEHIND EVERY SPACE."
            ========================================================================= */}
        <section
          aria-label="Factory Infrastructure Hero"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 'clamp(560px, 84vh, 740px)',
            display: 'flex',
            alignItems: 'flex-end',
            backgroundColor: '#0F0E0D',
            overflow: 'hidden',
          }}
        >
          {/* Cinematic Factory Background Image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/factory-machines/factory_hero_split.jpg)',
              backgroundPosition: 'center 45%',
              backgroundSize: 'cover',
            }}
          />

          {/* Soft Scrim */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(15, 14, 13, 0.3) 0%, rgba(15, 14, 13, 0.45) 40%, rgba(15, 14, 13, 0.92) 95%)',
            }}
          />

          {/* Hero Content */}
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
            <div style={{ maxWidth: '840px' }}>
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
                20,000 SQ. FT. IN-HOUSE FACILITY • RAKANPUR, GANDHINAGAR
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(36px, 5.8vw, 72px)',
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  margin: '0 0 20px 0',
                }}
              >
                Precision Behind
                <br />
                Every Space.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(14.5px, 1.3vw, 17.5px)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.65,
                  maxWidth: '660px',
                  marginBottom: '28px',
                }}
              >
                LEOZ is not merely a design studio. We design, we engineer, and we manufacture with European machinery to deliver true factory-finished luxury.
              </motion.p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 01: THE FACTORY (PLANT CAPABILITY & SCALE)
            ========================================================================= */}
        <section
          aria-label="The Factory Facility"
          style={{
            paddingTop: 'clamp(70px, 9vw, 120px)',
            paddingBottom: 'clamp(70px, 9vw, 120px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1fr',
                gap: 'clamp(40px, 6vw, 80px)',
                alignItems: 'center',
              }}
              className="leoz-factory-overview-split"
            >
              {/* Plant Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
                style={{
                  position: 'relative',
                  aspectRatio: '16 / 11',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  backgroundColor: '#EBE8E1',
                  border: '1px solid rgba(22, 21, 20, 0.08)',
                }}
              >
                <img
                  src="/factory-machines/factory_hero_split.jpg"
                  alt="LEOZ 20,000 Sq. Ft. Manufacturing Plant"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '16px',
                    padding: '6px 14px',
                    backgroundColor: 'rgba(22, 21, 20, 0.8)',
                    backdropFilter: 'blur(8px)',
                    color: '#B69A6B',
                    fontFamily: 'var(--font-body)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                  }}
                >
                  20,000 SQ. FT. HIGH-TECH FACILITY
                </div>
              </motion.div>

              {/* Plant Narrative */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
              >
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
                  ZERO OUTSOURCED PRODUCTION
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 3.8vw, 46px)',
                    fontWeight: 300,
                    color: '#161514',
                    margin: '0 0 20px 0',
                    letterSpacing: '0.01em',
                  }}
                >
                  The Facility Behind the Finish
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'rgba(22, 21, 20, 0.78)',
                    lineHeight: 1.75,
                    marginBottom: '20px',
                  }}
                >
                  Located in Rakanpur, Gandhinagar, our state-of-the-art 20,000 sq. ft. manufacturing facility gives LEOZ absolute control over every stage of production — from raw board sizing and hydraulic lamination to multi-boring and robotic lacquer curing.
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    color: 'rgba(22, 21, 20, 0.7)',
                    lineHeight: 1.75,
                    marginBottom: '28px',
                  }}
                >
                  By eliminating third-party cabinet workshops and on-site carpenter improvisation, we ensure that what is rendered in architectural 3D CAD is produced with 0.1mm microscopic fidelity.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(22, 21, 20, 0.08)',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '10.5px', color: '#B69A6B', letterSpacing: '0.12em', display: 'block' }}>
                      DIRECT CONTROL
                    </span>
                    <strong style={{ fontSize: '13px', color: '#161514' }}>100% In-House Assembly</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '10.5px', color: '#B69A6B', letterSpacing: '0.12em', display: 'block' }}>
                      LEADERSHIP
                    </span>
                    <strong style={{ fontSize: '13px', color: '#161514' }}>20+ Yrs Specialist Insight</strong>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: INTERACTIVE MACHINERY SHOWCASE
            ========================================================================= */}
        <section
          id="machinery"
          aria-label="Interactive Machinery Showcase"
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
            <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
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
                INDUSTRIAL PRECISION
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.8vw, 46px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: '0 0 14px 0',
                }}
              >
                Our Machinery &amp; Advantages
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  maxWidth: '640px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                Select a machine to explore how automated European engineering prevents carpentry flaws and guarantees long-term durability.
              </p>
            </div>

            {/* Machine Selector Tabs */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: 'clamp(36px, 5vw, 56px)',
              }}
            >
              {machines.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveMachine(idx)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 20px',
                      backgroundColor: activeMachine === idx ? '#B69A6B' : 'rgba(255, 255, 255, 0.06)',
                      color: activeMachine === idx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                      border: `1px solid ${activeMachine === idx ? '#B69A6B' : 'rgba(255, 255, 255, 0.12)'}`,
                      borderRadius: '2px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <Icon size={14} />
                    <span>{m.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Machine Showcase Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={machines[activeMachine].id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: luxuryEase }}
                style={{
                  backgroundColor: '#1E1D1B',
                  border: '1px solid rgba(182, 154, 107, 0.3)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '0',
                }}
                className="leoz-machine-detail-panel"
              >
                {/* Visual Evidence (Actual Machine Photos) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2px',
                    backgroundColor: '#0F0E0D',
                    minHeight: '380px',
                  }}
                  className="machine-visual-duo"
                >
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                      src={machines[activeMachine].specImage}
                      alt={machines[activeMachine].name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        padding: '4px 8px',
                        backgroundColor: 'rgba(0,0,0,0.75)',
                        color: '#B69A6B',
                        fontSize: '9.5px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        borderRadius: '2px',
                      }}
                    >
                      THE MACHINE
                    </div>
                  </div>
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                      src={machines[activeMachine].resultImage}
                      alt={`${machines[activeMachine].name} result`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        padding: '4px 8px',
                        backgroundColor: 'rgba(0,0,0,0.75)',
                        color: '#48BB78',
                        fontSize: '9.5px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        borderRadius: '2px',
                      }}
                    >
                      FINISHED RESULT
                    </div>
                  </div>
                </div>

                {/* Machine Description & Technical Highlights */}
                <div
                  style={{
                    padding: 'clamp(28px, 4.5vw, 44px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#B69A6B',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    {machines[activeMachine].code} • {machines[activeMachine].category}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(24px, 3vw, 32px)',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      margin: '0 0 16px 0',
                    }}
                  >
                    {machines[activeMachine].name}
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <strong style={{ fontSize: '12px', color: '#B69A6B', letterSpacing: '0.1em', display: 'block', marginBottom: '4px' }}>
                      ENGINEERING PURPOSE
                    </strong>
                    <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, margin: 0 }}>
                      {machines[activeMachine].purpose}
                    </p>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <strong style={{ fontSize: '12px', color: '#48BB78', letterSpacing: '0.1em', display: 'block', marginBottom: '4px' }}>
                      CLIENT ADVANTAGE
                    </strong>
                    <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, margin: 0 }}>
                      {machines[activeMachine].advantage}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    {machines[activeMachine].bulletList.map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={13} style={{ color: '#B69A6B', flexShrink: 0 }} />
                        <span style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.7)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: WHY TECHNOLOGY MATTERS (5 PILLARS WITH NUMBERS)
            ========================================================================= */}
        <section
          aria-label="Why Technology Matters"
          style={{
            paddingTop: 'clamp(70px, 9vw, 120px)',
            paddingBottom: 'clamp(70px, 9vw, 120px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
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
                THE VALUE OF AUTOMATION
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.8vw, 46px)',
                  fontWeight: 300,
                  color: '#161514',
                  margin: '0 0 14px 0',
                }}
              >
                Why Technology Matters
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(22, 21, 20, 0.7)',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                Measurable engineering superiority that protects your home investment for decades.
              </p>
            </div>

            {/* 5 Metrics Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
              }}
            >
              {technologyPillars.map((p, idx) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: luxuryEase }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(22, 21, 20, 0.08)',
                    borderRadius: '3px',
                    padding: '28px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(182, 154, 107, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(22, 21, 20, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '36px',
                      fontWeight: 300,
                      color: '#B69A6B',
                      lineHeight: 1,
                      marginBottom: '12px',
                    }}
                  >
                    {p.metric}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      color: '#161514',
                      textTransform: 'uppercase',
                      margin: '0 0 10px 0',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'rgba(22, 21, 20, 0.7)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: FROM PANEL TO SPACE (6 CONNECTED PRODUCTION STEPS)
            ========================================================================= */}
        <section
          aria-label="Production Flow from Panel to Space"
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
            <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 76px)' }}>
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
                SEQUENCE-CONTROLLED MANUFACTURING
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
                From Panel to Space
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
                A continuous, automated production journey where every raw panel is transformed into a custom architectural element.
              </p>
            </div>

            {/* 6 Stage Production Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {productionFlow.map((step) => (
                <div
                  key={step.step}
                  style={{
                    backgroundColor: '#1E1D1B',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '3px',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '14px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '32px',
                        fontWeight: 300,
                        color: '#B69A6B',
                      }}
                    >
                      {step.step}
                    </span>
                    <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '0.15em' }}>
                      STAGE / {step.step}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: '#FFFFFF',
                      textTransform: 'uppercase',
                      margin: '0 0 10px 0',
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'rgba(255, 255, 255, 0.68)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: CRAFTSMANSHIP & QUALITY CONTROL
            ========================================================================= */}
        <section
          aria-label="Craftsmanship and Quality Control"
          style={{
            paddingTop: 'clamp(70px, 9vw, 120px)',
            paddingBottom: 'clamp(70px, 9vw, 120px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.1fr',
                gap: 'clamp(40px, 6vw, 80px)',
                alignItems: 'center',
              }}
              className="leoz-craft-split"
            >
              {/* Craft Text */}
              <div>
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
                  HUMAN TOUCH &amp; INSPECTION
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 3.8vw, 46px)',
                    fontWeight: 300,
                    color: '#161514',
                    margin: '0 0 20px 0',
                  }}
                >
                  Machinery Precision.
                  <br />
                  Master Craftsmanship.
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'rgba(22, 21, 20, 0.78)',
                    lineHeight: 1.75,
                    marginBottom: '20px',
                  }}
                >
                  While automated machinery ensures microscopic dimensional repeatability, the ultimate luxury of a LEOZ kitchen or dressing suite comes from the master craftsmen who inspect, hand-polish stone miters, and hand-stitch leather organizers.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    '42-point pre-dispatch structural and finish audit',
                    'Zero-VOC multi-coat hand-rubbed Italian lacquers',
                    'Laser-calibrated dry assembly before site delivery',
                  ].map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircle2 size={16} style={{ color: '#B69A6B', flexShrink: 0 }} />
                      <span style={{ fontSize: '13.5px', color: 'rgba(22, 21, 20, 0.85)', fontWeight: 500 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Craft Image Duo */}
              <div style={{ position: 'relative', aspectRatio: '16 / 11', borderRadius: '3px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
                  alt="LEOZ Hand Finishes and Leather Craft"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FINAL SECTION: "ENGINEERED WITH PRECISION. CRAFTED WITH CARE."
            ========================================================================= */}
        <section
          aria-label="Explore Projects CTA"
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
          {/* Background Scrim */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/factory-machines/factory_hero_split.jpg)',
              backgroundPosition: 'center 45%',
              backgroundSize: 'cover',
              opacity: 0.18,
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
              WITNESS OUR REALIZED HOMES
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
              Engineered with Precision.
              <br />
              Crafted with Care.
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
              Discover how our in-house factory capabilities transform architectural visions into private residential masterpieces.
            </p>

            <a
              href="/projects"
              onClick={(e) => navigate(e, '/projects')}
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
              <span>Explore Our Projects</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .leoz-factory-overview-split,
          .leoz-machine-detail-panel,
          .leoz-craft-split {
            grid-template-columns: 1fr !important;
          }
          .machine-visual-duo {
            min-height: 240px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FactoryInfrastructure;
