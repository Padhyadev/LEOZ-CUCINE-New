import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  Cpu,
  Shield,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Compass,
  Building2,
  Wrench,
  Sliders,
  Check,
} from 'lucide-react';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const ModularKitchens: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Luxury Modular Kitchens | LEOZ Cucine — German Precision, Indian Sensibility',
    'Discover bespoke luxury modular kitchens by LEOZ Cucine. German-inspired planning, German Classic & Contemporary Fusion styles, curated finishes, and in-house manufacturing in Gujarat.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [activeMaterial, setActiveMaterial] = useState(0);
  const [kitchenInterludeSlide, setKitchenInterludeSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const kitchenInterludePhotos = [
    {
      image: '/Skyline Monolithic Island.webp',
      alt: 'LEOZ Monolithic Marble Kitchen Island Architecture',
      tag: '01 / MONOLITHIC ISLANDS',
      title: 'Monolithic Marble Islands',
    },
    {
      image: '/Island Layout.webp',
      alt: 'LEOZ Architectural Open Plan Island Kitchen',
      tag: '02 / OPEN-PLAN LIVING',
      title: 'Architectural Island Suites',
    },
    {
      image: '/Italian Marble.webp',
      alt: 'LEOZ Precision Italian Marble Worktop & Island Detailing',
      tag: '03 / PRECISION SURFACES',
      title: 'Calacatta & Statuario Marbles',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setKitchenInterludeSlide((prev) => (prev + 1) % kitchenInterludePhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [kitchenInterludePhotos.length]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const kitchenFeatures = [
    {
      title: 'Personalised Work Zones',
      desc: 'Scientific preparation, cooking, washing, and cold storage zones arranged in seamless architectural flow.',
      spec: 'Custom Workflow Planning',
    },
    {
      title: 'Intelligent Drawers & Pull-outs',
      desc: 'Heavy-duty soft-close runners with magnetic dividers, internal organizers, and full-extension bottle pull-outs.',
      spec: 'German Motion Hardware',
    },
    {
      title: 'Customised Tall Units',
      desc: 'Floor-to-ceiling appliance towers, synchronized pantry pull-outs, and pocketing doors for concealed utility.',
      spec: 'Maximized Vertical Storage',
    },
    {
      title: 'Practical Appliance Integration',
      desc: 'Flush-mounted ovens, downdraft induction hobs, built-in dishwashers, and discreet ventilation channels.',
      spec: 'Seamless Zero-Protrusion Fit',
    },
    {
      title: 'Convenient Maintenance',
      desc: 'Anti-fingerprint thermal coatings, sealed quartz waterfall counters, and hygienic antibacterial surfaces.',
      spec: 'Effortless Daily Cleaning',
    },
    {
      title: 'Moisture-Resistant Options',
      desc: 'High-density moisture-resistant (HDMR) boards and marine plywood sealed with zero-glue-line PUR edge banding.',
      spec: 'Tropical Weather Proof',
    },
    {
      title: 'Curated Shutter Finishes',
      desc: 'Curated palette of super-matte acrylics, multi-layer PU lacquer, architectural veneers, and ceramic surfaces.',
      spec: 'Tactile Longevity',
    },
    {
      title: 'Hardware to Suit Required Use',
      desc: 'Fittings engineered for 100,000+ motion cycles, soft-damped hinges, and precision flap lift systems.',
      spec: 'Blum & Hettich Tested',
    },
  ];

  const kitchenCollections = [
    {
      id: 'german-classic',
      badge: 'TIMELESS ARCHITECTURE',
      title: 'German Classic Kitchens',
      desc: 'Understated forms, harmonious proportions and engineered cabinetry create a timeless expression of contemporary luxury. The emphasis is on disciplined lines, precise detailing and refined materials.',
      image: '/modular kitchen.webp',
      specs: ['Disciplined handleless Gola channels', 'Monolithic symmetry & balance', 'Engineered German hardware'],
    },
    {
      id: 'contemporary-fusion',
      badge: 'WARMTH & MATERIALITY',
      title: 'Contemporary Fusion Kitchens',
      desc: 'A contemporary design language made warmer through tactile finishes, material contrasts and details suited to Indian homes. Highly individual, visually composed and designed to live in.',
      image: '/Island Layout.webp',
      specs: ['Tactile timber & stone contrasts', 'Curated spice & utensil zoning', 'Concealed wet/dry preparation separation'],
    },
  ];

  const kitchenLayouts = [
    {
      id: 'straight',
      name: 'Straight Kitchen',
      desc: 'Minimal linear horizon keeping appliances, sink, and cooktop aligned along a single architectural wall.',
      idealFor: 'Minimalist luxury studios & compact suites',
      image: '/Straight Layout.webp',
    },
    {
      id: 'l-shape',
      name: 'L-Shaped Kitchen',
      desc: 'Corner efficiency connecting two perpendicular walls, allowing effortless room for dining tables or auxiliary islands.',
      idealFor: 'Medium to large contemporary apartments',
      image: '/L-Shape Layout.webp',
    },
    {
      id: 'u-shape',
      name: 'U-Shaped Kitchen',
      desc: 'Surrounding three-wall continuous cabinetry providing maximum storage density and uninterrupted counter space.',
      idealFor: 'Dedicated closed kitchens & large private residences',
      image: '/U -Shape Layout.webp',
    },
    {
      id: 'parallel',
      name: 'Parallel Kitchen',
      desc: 'Dual opposing work counters maximizing workflow efficiency and culinary capacity with zero wasted steps.',
      idealFor: 'Gourmet home chefs & high-traffic culinary spaces',
      image: '/Parallel Layout.webp',
    },
    {
      id: 'island',
      name: 'Island Kitchen',
      desc: 'Monolithic central workstation anchoring open-plan living, combining food preparation and casual social seating.',
      idealFor: 'Spacious villas, penthouses & open-concept residences',
      image: '/Island Layout.webp',
    },
    {
      id: 'peninsula',
      name: 'Peninsula Kitchen',
      desc: 'Connected peninsula counter acting as a breakfast bar while cleanly defining the boundary of the kitchen.',
      idealFor: 'Semi-open apartments seeking defined zones',
      image: '/Skyline Monolithic Island.webp',
    },
  ];

  const kitchenMaterials = [
    {
      id: 'acrylic',
      name: 'Super-Matte & Gloss Acrylic',
      category: 'SHUTTER FINISH',
      desc: 'Velvety touch, anti-fingerprint surfaces and ultra-gloss panels offering modern durability with flawless edge joints.',
      image: '/Matte Finish.webp',
      swatch: '#3A3B37',
      highlights: ['Anti-Fingerprint', 'Thermal Micro-Healing', 'Zero Glare / High Gloss'],
    },
    {
      id: 'pu',
      name: 'Multi-Layer Polyurethane (PU) Lacquer',
      category: 'PREMIUM COATING',
      desc: 'Deep monolithic finish achieved through automated spray coating in seamless matte or mirror-gloss palettes.',
      image: '/Gloss Finish.webp',
      swatch: '#E8E5DD',
      highlights: ['Seamless Wrapped Edges', 'UV Color Stabilized', 'Custom RAL Color Matching'],
    },
    {
      id: 'veneer',
      name: 'Architectural Natural Wood Veneer',
      category: 'NATURAL TIMBER',
      desc: 'Book-matched European white oak, smoked walnut, and teak finished with protective open-pore matte coats.',
      image: '/Wood Veneer.webp',
      swatch: '#7A5E44',
      highlights: ['Book-Matched Grain', 'Warm Tactile Feel', 'Sustainably Sourced'],
    },
    {
      id: 'ceramic',
      name: 'Sintered Stone & Ceramic Countertops',
      category: 'WORKTOPS & SPLASHBACKS',
      desc: 'Ultra-compact porcelain and quartz surfaces impervious to high heat, turmeric, knife scratches, and acidic food contact.',
      image: '/Italian Marble.webp',
      swatch: '#C2BCB2',
      highlights: ['Heat Proof to 800°C', 'Stain & Turmeric Proof', 'Seamless Waterfall Miters'],
    },
  ];

  const whyChooseKitchens = [
    {
      num: '01',
      title: 'Dedicated In-House Production',
      desc: 'Fabricated at our 20,000 sq. ft. plant in Gujarat with precision CNC cutting, zero-glue-line PUR edge banding, and rigid quality checks.',
    },
    {
      num: '02',
      title: 'Design-to-Manufacturing Coordination',
      desc: 'Every CAD drawing links directly to automated machine code, eliminating on-site manual errors and dimensional gaps.',
    },
    {
      num: '03',
      title: 'Considered Material Choices',
      desc: 'Certified moisture-resistant HDMR/plywood cores combined with curated European shutter surfaces and genuine German hardware.',
    },
    {
      num: '04',
      title: 'Precise Customisation',
      desc: 'No standard box sizes. Heights, depths, corner angles, and internal drawers are engineered down to the exact millimeter.',
    },
    {
      num: '05',
      title: 'Professional Installation',
      desc: 'Turnkey fitting executed by certified LEOZ master carpenters using laser levels, documented checks, and clean site management.',
    },
    {
      num: '06',
      title: 'Documented Warranty Support',
      desc: 'Clear warranty provisions for cabinetry and moving hardware communicated transparently with your final proposal.',
    },
  ];

  const kitchenProcessSteps = [
    { num: '01', title: 'Discover Requirements', desc: 'Detailed discussion of your cooking style, family habits, space, and aesthetic preferences.' },
    { num: '02', title: 'Measure & Assess Site', desc: 'Laser millimeter survey assessing plumbing lines, electrical inlets, ventilation, and structural walls.' },
    { num: '03', title: 'Layout & Design Proposals', desc: 'Preparation of 3D ergonomic visualizations, workflow triangle, and storage configurations.' },
    { num: '04', title: 'Select Finish & Hardware', desc: 'Tactile curation of shutter materials, countertops, internal organizers, handles, and Gola profiles.' },
    { num: '05', title: 'Approve Specifications & Proposal', desc: 'Finalizing transparent bill of quantities, technical drawings, warranty terms, and schedule.' },
    { num: '06', title: 'Precision Manufacturing', desc: 'Automated fabrication at our Gujarat plant with computerized CNC milling and PUR edge sealing.' },
    { num: '07', title: 'Install & Final Inspection', desc: 'White-glove on-site assembly, laser alignment, thorough cleaning, and multi-point handover audit.' },
  ];

  const kitchenFaqs = [
    {
      q: 'Is every kitchen customised?',
      a: 'Yes. Layout, dimensions, storage, finish and suitable hardware are planned according to the space and approved specification.',
    },
    {
      q: 'How is price calculated?',
      a: 'By size, materials, hardware, accessories, design complexity and installation scope. A tailored quotation follows consultation.',
    },
    {
      q: 'How long will it take?',
      a: 'A project schedule is shared after design approval and material availability are confirmed.',
    },
    {
      q: 'Do you handle installation?',
      a: 'Yes, professional installation is included as specified in the accepted quotation.',
    },
    {
      q: 'What warranty is provided?',
      a: 'Warranty coverage and exclusions depend on selected products and hardware and will be documented in the proposal.',
    },
    {
      q: 'How do I maintain the kitchen?',
      a: 'The team will advise care based on the final surface and hardware selection.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#F7F7F5', color: '#20211F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            SECTION 01: HERO BANNER
            ========================================================================= */}
        <section
          aria-label="LEOZ Kitchen Architecture Hero"
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
          {/* Background Kitchen Photography */}
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
              src="/modular kitchen.webp"
              alt="LEOZ Luxury Modular Kitchen Architecture"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 38%',
                filter: 'brightness(0.92) contrast(1.02)',
              }}
            />
            {/* Multi-layer readability gradient scrim */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(12, 13, 11, 0.55) 0%, rgba(12, 13, 11, 0.35) 25%, rgba(12, 13, 11, 0.78) 65%, rgba(12, 13, 11, 0.95) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 20% 70%, rgba(10, 11, 10, 0.85) 0%, rgba(10, 11, 10, 0.4) 55%, transparent 80%)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* Integrated Editorial Typography */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '840px',
              width: '100%',
              color: '#FFFFFF',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                backgroundColor: 'rgba(10, 11, 10, 0.55)',
                padding: '6px 14px',
                borderRadius: '2px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                backdropFilter: 'blur(8px)',
                marginBottom: '18px',
                textShadow: '0 2px 8px rgba(0,0,0,0.9)',
              }}
            >
              <span>02 / MODULAR KITCHENS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: luxuryEase }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4.4vw, 56px)',
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.015em',
                color: '#FFFFFF',
                margin: '0 0 18px 0',
                textShadow: '0 3px 20px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.9)',
              }}
            >
              The Heart of Your Home, Reimagined.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: luxuryEase }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.15vw, 16.5px)',
                fontWeight: 400,
                lineHeight: 1.7,
                color: '#F4F4F0',
                maxWidth: '660px',
                margin: '0 0 32px 0',
                textShadow: '0 2px 12px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.9)',
              }}
            >
              LEOZ kitchens bring contemporary luxury and intelligent performance together. Each kitchen is designed around its owners, carefully combining spatial harmony, durable specifications and effortless everyday use.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: luxuryEase }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(16px, 2.5vw, 28px)',
                flexWrap: 'wrap',
              }}
            >
              <a
                href="#layouts"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '13px 26px',
                  backgroundColor: '#A58B62',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11.5px',
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
                <span>Explore Kitchens</span>
                <ArrowRight size={14} />
              </a>

              <a
                href="/talk-to-us"
                onClick={(e) => navigate(e, '/talk-to-us')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                  borderBottom: '1px solid rgba(255,255,255,0.4)',
                  paddingBottom: '3px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#D4AF37';
                  e.currentTarget.style.borderBottomColor = '#D4AF37';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.4)';
                }}
              >
                <span>Schedule a Consultation</span>
                <ArrowRight size={13} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: KITCHEN PHILOSOPHY | BEAUTY IN EVERYDAY FUNCTION
            ========================================================================= */}
        <section
          aria-label="Kitchen Philosophy"
          className="our-approach-section"
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(70px, 10vw, 130px)',
            paddingBottom: 'clamp(70px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            borderBottom: '1px solid #EBEAE5',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
            <div className="our-approach-grid">
              {/* Heading Column */}
              <div className="our-approach-heading-col">
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#A58B62',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  KITCHEN PHILOSOPHY
                </span>
                <h2
                  className="our-approach-heading"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 300,
                    letterSpacing: '-0.015em',
                    color: '#20211F',
                    margin: 0,
                    textAlign: 'left',
                  }}
                >
                  Beauty in Everyday
                  <br className="desktop-heading-break" />
                  {' '}Function.
                </h2>
              </div>

              {/* Body Content Column */}
              <div className="our-approach-body-col">
                <p
                  className="our-approach-lead"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    color: '#20211F',
                    textAlign: 'left',
                    margin: '0 0 20px 0',
                  }}
                >
                  A beautiful kitchen must work beautifully. From preparation and storage to cleaning and family movement, every zone is considered to make daily routines intuitive without diminishing the elegance of the setting.
                </p>
                <p
                  className="our-approach-desc"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    color: '#686963',
                    textAlign: 'left',
                    margin: 0,
                  }}
                >
                  Spatial harmony, durable moisture-resistant specifications, and calibrated German movement ensure that aesthetic elegance endures through rigorous daily use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: GERMAN PRECISION. INDIAN SENSIBILITY.
            ========================================================================= */}
        <section
          style={{
            backgroundColor: '#ECEBE7',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            borderBottom: '1px solid #D9D9D4',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                gap: 'clamp(32px, 6vw, 80px)',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '14px' }}>
                  CORE PRINCIPLES
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.2vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: '0 0 20px 0', lineHeight: 1.15 }}>
                  German Precision.
                  <br />
                  Indian Sensibility.
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#686963', lineHeight: 1.75, margin: '0 0 24px 0' }}>
                  Inspired by German planning and hardware principles, LEOZ adapts ergonomic dimensions, robust fittings and thoughtful organisation to Indian cooking patterns, ingredient storage, maintenance needs and family lifestyles.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', borderTop: '1px solid #D9D9D4', paddingTop: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="#A58B62" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#20211F' }}>
                      Heavy vessel &amp; spice storage zoning
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="#A58B62" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#20211F' }}>
                      Tropical moisture-resistant carcass
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="#A58B62" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#20211F' }}>
                      100,000-cycle German motion hardware
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="#A58B62" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#20211F' }}>
                      Stain &amp; heat-resistant ceramic worktops
                    </span>
                  </div>
                </div>
              </div>

              {/* Visual Showcase Card */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/12', borderRadius: '2px', overflow: 'hidden', backgroundColor: '#0F100E', boxShadow: '0 20px 50px rgba(32, 33, 31, 0.12)' }}>
                <img
                  src="/Island Layout.webp"
                  alt="LEOZ German Precision Indian Kitchen Design"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(15, 16, 14, 0.85) 100%)' }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', color: '#FFFFFF' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AF37', display: 'block', marginBottom: '4px' }}>
                    ENGINEERED HARMONY
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 300, color: '#FFFFFF', margin: 0 }}>
                    Ergonomic workflow adapted to Indian home routines
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: KITCHEN COLLECTIONS (GERMAN CLASSIC & CONTEMPORARY FUSION)
            ========================================================================= */}
        <section
          id="collections"
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(80px, 11vw, 140px)',
            paddingBottom: 'clamp(80px, 11vw, 140px)',
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
                marginBottom: 'clamp(44px, 6vw, 70px)',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                  DESIGN EXPRESSIONS
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.4vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Our Kitchen Collections
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  Two refined architectural languages tailored to your taste — from the disciplined geometric lines of German Classicism to the warm material textures of Contemporary Fusion.
                </p>
              </div>
            </div>

            {/* 2 Big Architectural Collection Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                gap: '36px',
              }}
            >
              {kitchenCollections.map((col) => (
                <div
                  key={col.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E4E0',
                    borderTop: '3px solid #A58B62',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 30px rgba(32, 33, 31, 0.05)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(165, 139, 98, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(32, 33, 31, 0.05)';
                  }}
                >
                  <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#D9D9D4' }}>
                    <img
                      src={col.image}
                      alt={col.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>
                  <div style={{ padding: '36px 30px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '8px' }}>
                      {col.badge}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 400, color: '#20211F', margin: '0 0 14px 0' }}>
                      {col.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#686963', lineHeight: 1.7, margin: '0 0 24px 0' }}>
                      {col.desc}
                    </p>

                    <div style={{ borderTop: '1px solid #ECEBE7', paddingTop: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {col.specs.map((item) => (
                        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '4px', height: '4px', backgroundColor: '#A58B62', borderRadius: '50%' }} />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#4A4B46' }}>
                            {item}
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

        {/* =========================================================================
            SECTION 05: FULL-WIDTH 3-PHOTO SLIDE HERO INTERLUDE
            ========================================================================= */}
        <section
          aria-label="Modular Kitchen Architectural Showcase"
          style={{
            width: '100%',
            height: 'clamp(420px, 60vh, 720px)',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: '#1E201D',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={kitchenInterludeSlide}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: luxuryEase }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <img
                src={kitchenInterludePhotos[kitchenInterludeSlide].image}
                alt={kitchenInterludePhotos[kitchenInterludeSlide].alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 45%',
                  filter: 'brightness(0.95) contrast(1.02)',
                }}
              />
            </motion.div>
          </AnimatePresence>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, transparent 50%, rgba(20, 21, 19, 0.7) 85%, rgba(20, 21, 19, 0.92) 100%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(16px, 3vh, 32px)',
              left: 'clamp(16px, 5vw, 80px)',
              right: 'clamp(16px, 5vw, 80px)',
              zIndex: 15,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ color: '#FFFFFF', minWidth: 0, flex: '1 1 auto', paddingRight: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(9px, 1.1vw, 10px)',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: '#D4AF37',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '2px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                }}
              >
                {kitchenInterludePhotos[kitchenInterludeSlide].tag}
              </span>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(14px, 1.7vw, 22px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: 0,
                  lineHeight: 1.2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                }}
              >
                {kitchenInterludePhotos[kitchenInterludeSlide].title}
              </h4>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {kitchenInterludePhotos.map((photo, idx) => (
                  <button
                    key={photo.image}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => setKitchenInterludeSlide(idx)}
                    style={{
                      height: '3px',
                      width: kitchenInterludeSlide === idx ? '28px' : '14px',
                      backgroundColor:
                        kitchenInterludeSlide === idx ? '#D4AF37' : 'rgba(255, 255, 255, 0.4)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      borderRadius: '2px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
                      transition: 'all 0.35s ease',
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: '5px' }}>
                <button
                  type="button"
                  aria-label="Previous Slide"
                  onClick={() =>
                    setKitchenInterludeSlide(
                      (prev) =>
                        (prev - 1 + kitchenInterludePhotos.length) % kitchenInterludePhotos.length
                    )
                  }
                  style={{
                    width: '30px',
                    height: '30px',
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
                  <ChevronLeft size={13} />
                </button>
                <button
                  type="button"
                  aria-label="Next Slide"
                  onClick={() =>
                    setKitchenInterludeSlide(
                      (prev) => (prev + 1) % kitchenInterludePhotos.length
                    )
                  }
                  style={{
                    width: '30px',
                    height: '30px',
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
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 06: KITCHEN FEATURES
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
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                  SPECIFICATIONS &amp; COMFORT
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Kitchen Features
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  Expect personalised work zones, intelligent drawers and pull-outs, customised tall units, practical appliance integration, convenient maintenance, specification-led moisture-resistant options and hardware selected to suit the required use.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'clamp(32px, 4vw, 56px)',
              }}
            >
              {kitchenFeatures.map((feat, idx) => (
                <div key={feat.title} style={{ borderTop: '2px solid #A58B62', paddingTop: '20px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 300, color: '#A58B62', display: 'block', marginBottom: '6px' }}>
                    0{idx + 1}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#686963', lineHeight: 1.65, margin: '0 0 12px 0' }}>
                    {feat.desc}
                  </p>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A58B62' }}>
                    {feat.spec}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 07: LAYOUTS TAILORED TO THE SPACE
            ========================================================================= */}
        <section
          id="layouts"
          style={{
            backgroundColor: '#ECEBE7',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            borderBottom: '1px solid #D9D9D4',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
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
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                  SPATIAL PLANNING
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Layouts Tailored to the Space
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  Straight, L-shaped, U-shaped, Parallel, Island and Peninsula kitchens. The final layout is chosen after considering movement, plumbing, ventilation, appliances, storage and available floor area.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(28px, 4vw, 48px)',
              }}
            >
              {kitchenLayouts.map((layout) => (
                <div
                  key={layout.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E4E0',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(32, 33, 31, 0.04)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(165, 139, 98, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(32, 33, 31, 0.04)';
                  }}
                >
                  <div style={{ width: '100%', aspectRatio: '16/11', overflow: 'hidden', backgroundColor: '#D9D9D4' }}>
                    <img
                      src={layout.image}
                      alt={layout.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px 20px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
                      {layout.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#686963', lineHeight: 1.65, margin: '0 0 14px 0' }}>
                      {layout.desc}
                    </p>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 600, color: '#A58B62' }}>
                      Ideal for: {layout.idealFor}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 08: MATERIALS & FINISHES
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
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                  SURFACES &amp; CARCASS
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Materials &amp; Finishes
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  Choose from project-appropriate carcass specifications and a curated range of laminates, acrylic, PU, veneer and other available shutter finishes, complemented by selected countertops, profiles, handles and hardware. Samples and specifications are finalised during consultation.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '24px',
              }}
            >
              {kitchenMaterials.map((mat, idx) => (
                <div
                  key={mat.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E4E0',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(32, 33, 31, 0.04)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(165, 139, 98, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(32, 33, 31, 0.04)';
                  }}
                >
                  <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', backgroundColor: '#D9D9D4' }}>
                    <img
                      src={mat.image}
                      alt={mat.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px 20px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '6px' }}>
                      {mat.category}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
                      {mat.name}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#686963', lineHeight: 1.65, margin: '0 0 16px 0' }}>
                      {mat.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {mat.highlights.map((h) => (
                        <span key={h} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', backgroundColor: '#F7F7F5', color: '#4A4B46', padding: '4px 8px', borderRadius: '2px', border: '1px solid #ECEBE7' }}>
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 09: WHY CHOOSE LEOZ KITCHENS?
            ========================================================================= */}
        <section
          style={{
            backgroundColor: '#ECEBE7',
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
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                  THE LEOZ ADVANTAGE
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Why Choose LEOZ Kitchens?
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  Dedicated in-house production, design-to-manufacturing coordination, considered material choices, precise customisation, professional installation and warranty provisions communicated with the final proposal.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: '24px',
              }}
            >
              {whyChooseKitchens.map((card) => (
                <div
                  key={card.num}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E4E0',
                    borderTop: '3px solid #A58B62',
                    padding: '32px 26px',
                    borderRadius: '2px',
                    boxShadow: '0 4px 20px rgba(32, 33, 31, 0.04)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(165, 139, 98, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(32, 33, 31, 0.04)';
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: '#A58B62', display: 'block', marginBottom: '10px' }}>
                    {card.num}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#686963', lineHeight: 1.7, margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: KITCHEN DESIGN PROCESS (7 STEPS)
            ========================================================================= */}
        <section
          style={{
            backgroundColor: '#252623',
            color: '#FFFFFF',
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
                marginBottom: 'clamp(48px, 6vw, 80px)',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#D4AF37', display: 'block', marginBottom: '12px' }}>
                  ARCHITECTURAL METHOD
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Kitchen Design Process
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.75, margin: 0 }}>
                  A structured seven-stage process ensuring your bespoke kitchen transitions seamlessly from initial lifestyle discovery to factory fabrication and precision on-site handover.
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
              {kitchenProcessSteps.map((step) => (
                <div
                  key={step.num}
                  style={{
                    backgroundColor: '#1E201D',
                    borderTop: '2px solid #D4AF37',
                    padding: '24px 20px',
                    borderRadius: '2px',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 400, color: '#D4AF37', display: 'block', marginBottom: '10px' }}>
                    {step.num}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 400, color: '#FFFFFF', margin: '0 0 10px 0' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.65, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: KITCHEN FAQS (INTERACTIVE ACCORDION)
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
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0 }}>
                Kitchen FAQs
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {kitchenFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E4E0',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '22px 28px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        gap: '16px',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '19px', fontWeight: 400, color: '#20211F' }}>
                        {faq.q}
                      </span>
                      <span style={{ color: '#A58B62', display: 'flex', alignItems: 'center' }}>
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: luxuryEase }}
                        >
                          <div style={{ padding: '0 28px 24px 28px', borderTop: '1px solid #F0EFEA' }}>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#686963', lineHeight: 1.7, margin: '14px 0 0 0' }}>
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: CTA | LET US DESIGN YOUR KITCHEN
            ========================================================================= */}
        <section
          id="cta"
          style={{
            backgroundColor: '#1C1D1A',
            color: '#FFFFFF',
            paddingTop: 'clamp(90px, 12vw, 140px)',
            paddingBottom: 'clamp(90px, 12vw, 140px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#D4AF37', display: 'block', marginBottom: '16px' }}>
              LET US DESIGN YOUR KITCHEN
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(34px, 4.5vw, 60px)', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.015em', margin: '0 0 20px 0', lineHeight: 1.15 }}>
              Begin Your Culinary Transformation
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.2vw, 18px)', color: '#D9D9D4', lineHeight: 1.75, maxWidth: '680px', margin: '0 auto 36px auto' }}>
              Discuss your lifestyle, space and preferences with the LEOZ team. Experience German-inspired ergonomics, bespoke finishes, and precision manufacturing tailored around you.
            </p>

            <a
              href="/talk-to-us"
              onClick={(e) => navigate(e, '/talk-to-us')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 38px',
                backgroundColor: '#A58B62',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                border: '1px solid #A58B62',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
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
              <span>Book Your Kitchen Consultation</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        /* Desktop Editorial Two-Column Layout */
        .our-approach-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: clamp(48px, 6.5vw, 96px);
          align-items: baseline;
          width: 100%;
        }

        .our-approach-heading {
          font-size: clamp(38px, 4.4vw, 62px);
          line-height: 1.05;
        }

        .our-approach-lead {
          font-size: clamp(17px, 1.35vw, 20px);
          line-height: 1.7;
          max-width: 620px;
        }

        .our-approach-desc {
          font-size: 15px;
          line-height: 1.75;
          max-width: 620px;
        }

        /* Mobile Single-Column Layout & Typography Fix (360px - 768px) */
        @media (max-width: 768px) {
          .our-approach-section {
            padding-left: clamp(16px, 4.5vw, 24px) !important;
            padding-right: clamp(16px, 4.5vw, 24px) !important;
            padding-top: clamp(54px, 8vh, 72px) !important;
            padding-bottom: clamp(54px, 8vh, 72px) !important;
          }

          .our-approach-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
            width: 100% !important;
          }

          .our-approach-heading-col,
          .our-approach-body-col {
            width: 100% !important;
            max-width: 100% !important;
          }

          .our-approach-heading {
            font-size: clamp(36px, 9.5vw, 44px) !important;
            line-height: 1.02 !important;
            letter-spacing: normal !important;
            text-align: left !important;
            width: 100% !important;
          }

          .desktop-heading-break {
            display: none !important;
          }

          .our-approach-lead {
            font-size: 16.5px !important;
            line-height: 1.68 !important;
            text-align: left !important;
            max-width: 100% !important;
            margin-bottom: 16px !important;
            letter-spacing: normal !important;
            word-spacing: normal !important;
          }

          .our-approach-desc {
            font-size: 15px !important;
            line-height: 1.7 !important;
            text-align: left !important;
            max-width: 100% !important;
            letter-spacing: normal !important;
            word-spacing: normal !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ModularKitchens;
