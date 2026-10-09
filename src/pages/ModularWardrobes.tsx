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
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Compass,
  Building2,
  Wrench,
  Sliders,
} from 'lucide-react';

const luxuryEase = [0.16, 1, 0.3, 1];

export const ModularWardrobes: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Bespoke Luxury Wardrobes | LEOZ Cucine — Walk-In, Sliding & Hinged Systems',
    'Customised luxury wardrobes by LEOZ Cucine. Sliding, Hinged, and Walk-in dressing suites crafted with German hardware, fine veneers, smoked glass, and in-house manufacturing in Gujarat.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [wardrobeInterludeSlide, setWardrobeInterludeSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const wardrobeInterludePhotos = [
    {
      image: '/Master Walk-In Dressing Suite.webp',
      alt: 'LEOZ Master Walk-In Dressing Suite',
      tag: '01 / WALK-IN SANCTUARY',
      title: 'Master Walk-In Dressing Suites',
    },
    {
      image: '/Smoked Glass Vitrine Wardrobe.webp',
      alt: 'LEOZ Smoked Glass Vitrine Wardrobe Suite',
      tag: '02 / VITRINE ARCHITECTURE',
      title: 'Smoked Glass & Bronze Vitrines',
    },
    {
      image: '/Fluted Walnut Executive Wardrobe.webp',
      alt: 'LEOZ Fluted Walnut Executive Wardrobe',
      tag: '03 / NATURAL JOINERY',
      title: 'Fluted Walnut & Architectural Veneers',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setWardrobeInterludeSlide((prev) => (prev + 1) % wardrobeInterludePhotos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [wardrobeInterludePhotos.length]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const wardrobeFormats = [
    {
      id: 'sliding',
      badge: 'STREAMLINED CONTEMPORARY',
      name: 'Sliding Wardrobes',
      desc: 'A sleek option for rooms where swing clearance is limited. Refined panel combinations and carefully specified mechanisms create a streamlined, contemporary expression.',
      image: '/Sliding Wardrobes.webp',
      specs: ['Floor-to-ceiling sliding panels', 'Concealed soft-damping running gear', 'Ideal for spaces where swing room is limited'],
    },
    {
      id: 'hinged',
      badge: 'VERSATILE FULL ACCESS',
      name: 'Hinged Wardrobes',
      desc: 'Full-access openings and flexible internal planning make hinged wardrobes a versatile choice. Tailored shutters, handles and compartments allow each composition to feel unique.',
      image: '/Hinged Wardrobes.jfif',
      specs: ['180-degree wide opening access', 'Architectural profiles & custom handles', 'Modular interior drawer configurations'],
    },
    {
      id: 'walk-in',
      badge: 'DEDICATED DRESSING WORLD',
      name: 'Walk-In Wardrobes',
      desc: 'A dedicated world of personal organisation. Hanging areas, display shelving, mirrors, integrated lighting, accessories and optional island arrangements can be planned around your available space.',
      image: '/Walk-in Wardrobes.webp',
      specs: ['Central accessory island suites', 'Integrated vertical LED profile lighting', 'Smoked glass vitrines & velvet compartments'],
    },
  ];

  const insideWardrobeItems = [
    {
      num: '01',
      title: 'Flexible Shelves & Divisions',
      desc: 'Adjustable shelving grids with micro-pin holes allowing modular reorganization as seasonal wardrobes shift.',
    },
    {
      num: '02',
      title: 'Integrated Drawers',
      desc: 'Full-extension soft-close Blum runners with custom wood finishes, leather inlays, and hidden safety drawers.',
    },
    {
      num: '03',
      title: 'Multi-Tier Hanging Sections',
      desc: 'Dedicated long-coat hanging zones, double-deck shirt rails, and hydraulic pull-down lifts for high ceiling spaces.',
    },
    {
      num: '04',
      title: 'Trouser & Saree Racks',
      desc: 'Anti-slip pull-out trouser rails and velvet-padded horizontal bars engineered to keep garments wrinkle-free.',
    },
    {
      num: '05',
      title: 'Jewellery & Watch Trays',
      desc: 'Italian velvet-lined compartments, ring pillows, glass vitrine tops, and bespoke watch winder integrations.',
    },
    {
      num: '06',
      title: 'Accessory & Belt Units',
      desc: 'Concealed pull-out organizer drawers for ties, cufflinks, perfumes, sunglasses, and personal leather goods.',
    },
    {
      num: '07',
      title: 'Shoe Storage Galleries',
      desc: 'Illuminated slanted shoe shelves with heel stops, acrylic dividers, and dust-sealed boot storage modules.',
    },
    {
      num: '08',
      title: 'Loft & Seasonal Modules',
      desc: 'Floor-to-ceiling upper cabinetry for large travel luggage, winter quilts, and low-frequency storage.',
    },
  ];

  const wardrobeMaterials = [
    {
      id: 'laminate-acrylic',
      name: 'Premium Laminates & Acrylics',
      category: 'SURFACE FINISH',
      desc: 'Super-matte anti-fingerprint surfaces, ultra-gloss acrylics, and textured laminates that resist scratches and daily wear.',
      image: '/Matte Finish.webp',
      highlights: ['Anti-Fingerprint', 'Moisture Resistant', 'Durable Daily Use'],
    },
    {
      id: 'veneer',
      name: 'Architectural Wood Veneer',
      category: 'NATURAL TIMBER',
      desc: 'Natural smoked walnut, white oak, and open-pore stained veneers creating warm, organic elegance across shutters and carcasses.',
      image: '/Wood Veneer.webp',
      highlights: ['Book-Matched Grain', 'Warm Tactile Character', 'Natural Finish'],
    },
    {
      id: 'pu-lacquer',
      name: 'Multi-Layer PU Lacquer',
      category: 'COATING FINISH',
      desc: 'Seamless spray-painted polyurethane lacquer in bespoke matte, satin, or mirror-gloss palettes for monolithic modern wardrobes.',
      image: '/Gloss Finish.webp',
      highlights: ['Seamless Wrapped Edges', 'Custom RAL Color Palette', 'Silky Touch'],
    },
    {
      id: 'glass-hardware',
      name: 'Smoked Glass, Mirrors & Profiles',
      category: 'ARCHITECTURAL ELEMENTS',
      desc: 'Tinted bronze and grey glass vitrines, fluted glass, bevelled mirrors, slim aluminum profiles, and German motion hardware.',
      image: '/Smoked Glass Vitrine Wardrobe.webp',
      highlights: ['Anodized Bronze Frames', 'Integrated LED Channels', 'German Soft-Close Gear'],
    },
  ];

  const whyChooseWardrobes = [
    {
      num: '01',
      title: 'One-to-One Planning',
      desc: 'Personalized consultation assessing your exact garment inventory, ceiling heights, access routines, and lifestyle.',
    },
    {
      num: '02',
      title: 'Accurate In-House Manufacture',
      desc: 'Precision computerized CNC milling and PUR edge-banding at our 20,000 sq. ft. Gujarat factory ensuring 0.1mm joinery precision.',
    },
    {
      num: '03',
      title: 'Considered Hardware Choices',
      desc: 'High-end German sliding gear, 180° opening hinges, and soft-damped runners tested for 100,000 motion cycles.',
    },
    {
      num: '04',
      title: 'Professional Installation',
      desc: 'Turnkey fitting by factory-trained master carpenters with laser alignment, seamless skirting, and pristine finish.',
    },
    {
      num: '05',
      title: 'Detailed Finishing',
      desc: 'Impeccable attention to internal lighting integration, velvet padding, clean shadow lines, and zero-gap shutter alignment.',
    },
    {
      num: '06',
      title: 'Documented Warranty Terms',
      desc: 'Clear, transparent warranty coverage for cabinetry structural stability and moving hardware provided with every proposal.',
    },
  ];

  const wardrobeProcessSteps = [
    { num: '01', title: 'Measure the Room', desc: 'Precise laser millimeter measurement of room heights, skirting, beams, and swing boundaries.' },
    { num: '02', title: 'Understand Storage Habits', desc: 'Categorizing your personal wardrobe inventory: hanging lengths, folded clothes, accessories, and shoes.' },
    { num: '03', title: 'Develop Configuration', desc: 'Crafting spatial 3D layout options balancing outer elegance with bespoke internal module partitions.' },
    { num: '04', title: 'Select Finish & Accessories', desc: 'Choosing shutter finishes, glass tints, velvet drawer inlays, integrated LED channels, and handles.' },
    { num: '05', title: 'Approve Design', desc: 'Reviewing photorealistic 3D renders, technical joinery drawings, and final commercial proposal.' },
    { num: '06', title: 'Precision Manufacture', desc: 'In-house automated fabrication at our Gujarat plant using German CNC machinery and PUR edge sealing.' },
    { num: '07', title: 'Professional Install', desc: 'White-glove on-site assembly and plumb alignment executed cleanly by certified LEOZ technicians.' },
    { num: '08', title: 'Final Inspection & Handover', desc: 'Multi-point inspection of motion smoothness, soft-close alignment, lighting triggers, and handover.' },
  ];

  const wardrobeFaqs = [
    {
      q: 'Can a wardrobe be made for an unusual room?',
      a: 'We assess available measurements and design around viable site constraints.',
    },
    {
      q: 'Can I customise the interiors?',
      a: 'Yes, subject to the approved layout and accessory options.',
    },
    {
      q: 'Which formats do you offer?',
      a: 'Hinged, sliding and walk-in configurations.',
    },
    {
      q: 'How is pricing decided?',
      a: 'Dimensions, internal details, materials, mechanisms and site requirements determine the proposal.',
    },
    {
      q: 'How long does installation take?',
      a: 'The schedule is confirmed once the design and production requirements are finalised.',
    },
    {
      q: 'Is warranty available?',
      a: 'Relevant warranty coverage will be specified with the product and hardware selection.',
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
          aria-label="LEOZ Wardrobe Architecture Hero"
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
          {/* Strictly 100% Wardrobe Photography Full Bleed */}
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
              src="/Master Walk-In Dressing Suite.webp"
              alt="LEOZ Bespoke Luxury Walk-In Wardrobe Suite"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 40%',
                filter: 'brightness(0.92) contrast(1.02)',
              }}
            />
            {/* Enhanced readability scrim/vignette gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(14, 15, 13, 0.45) 0%, rgba(14, 15, 13, 0.2) 25%, rgba(14, 15, 13, 0.72) 65%, rgba(14, 15, 13, 0.94) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 20% 70%, rgba(10, 11, 10, 0.75) 0%, rgba(10, 11, 10, 0.3) 50%, transparent 75%)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          {/* Integrated Editorial Typography */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '820px',
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
              <span>03 / CUSTOMISED WARDROBES</span>
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
              Beyond Storage. An Expression of You.
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
                maxWidth: '640px',
                margin: '0 0 32px 0',
                textShadow: '0 2px 12px rgba(0,0,0,0.95), 0 1px 2px rgba(0,0,0,0.9)',
              }}
            >
              Bespoke wardrobes composed around your space, belongings and personal style. Discover a refined balance of organisation, beauty and everyday ease.
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
                href="#wardrobe-formats"
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
                <span>Explore Wardrobes</span>
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
                <span>Book Wardrobe Consultation</span>
                <ArrowRight size={13} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: WARDROBE PHILOSOPHY | EVERY DETAIL IN ITS PLACE
            ========================================================================= */}
        <section
          aria-label="Wardrobe Philosophy"
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
                  WARDROBE PHILOSOPHY
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
                  Every Detail
                  <br className="desktop-heading-break" />
                  {' '}in Its Place.
                </h2>
              </div>

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
                  A wardrobe should simplify the everyday while forming a harmonious part of the room. We design the outer expression and internal experience together: proportions, access, lighting, organisation and visual character.
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
                  From discreet sensor illumination to fine velvet divisions and German movement dampers, each wardrobe is tailored to your ceiling height and personal dressing rituals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: FULLY CUSTOMISED TO YOU
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
                  TAILORED INVENTORY
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.2vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: '0 0 20px 0', lineHeight: 1.15 }}>
                  Fully Customised
                  <br />
                  to You.
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#686963', lineHeight: 1.75, margin: '0 0 24px 0' }}>
                  From clothing and accessories to individual routines, every project begins with an assessment of room dimensions, inventory, access needs, hanging requirements and preferred finishes.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', borderTop: '1px solid #D9D9D4', paddingTop: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="#A58B62" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#20211F' }}>
                      Exact inventory &amp; hanging assessment
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="#A58B62" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#20211F' }}>
                      Floor-to-ceiling dimension mapping
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="#A58B62" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#20211F' }}>
                      Customized internal accessory trays
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <Check size={18} color="#A58B62" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#20211F' }}>
                      Harmonized outer finish curation
                    </span>
                  </div>
                </div>
              </div>

              {/* Visual Showcase Card */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/12', borderRadius: '2px', overflow: 'hidden', backgroundColor: '#0F100E', boxShadow: '0 20px 50px rgba(32, 33, 31, 0.12)' }}>
                <img
                  src="/Smoked Glass Vitrine Wardrobe.webp"
                  alt="LEOZ Bespoke Customised Wardrobe Architecture"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(15, 16, 14, 0.85) 100%)' }} />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', color: '#FFFFFF' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AF37', display: 'block', marginBottom: '4px' }}>
                    CURATED ARCHITECTURE
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 300, color: '#FFFFFF', margin: 0 }}>
                    Intimate, organized suites tailored to your personal collection
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: WARDROBE FORMATS (SLIDING, HINGED, WALK-IN)
            ========================================================================= */}
        <section
          id="wardrobe-formats"
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(80px, 11vw, 140px)',
            paddingBottom: 'clamp(80px, 11vw, 140px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
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
                  TYPOLOGIES
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.4vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Wardrobe Formats
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  Three distinct configurations engineered for specific room geometries and daily movement — sliding for streamlined horizontal clearance, hinged for versatile full access, and walk-in dressing suites.
                </p>
              </div>
            </div>

            {/* 3 Architectural Format Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: '32px',
              }}
            >
              {wardrobeFormats.map((col) => (
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
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
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
                  <div>
                    <div style={{ width: '100%', aspectRatio: '16/11', overflow: 'hidden', backgroundColor: '#D9D9D4' }}>
                      <img
                        src={col.image}
                        alt={col.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                    </div>
                    <div style={{ padding: '32px 26px 20px 26px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '8px' }}>
                        {col.badge}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 400, color: '#20211F', margin: '0 0 12px 0' }}>
                        {col.name}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#686963', lineHeight: 1.7, margin: '0 0 20px 0' }}>
                        {col.desc}
                      </p>
                    </div>
                  </div>

                  <div style={{ padding: '0 26px 26px 26px', borderTop: '1px solid #ECEBE7', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {col.specs.map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '4px', height: '4px', backgroundColor: '#A58B62', borderRadius: '50%', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', color: '#4A4B46' }}>
                          {item}
                        </span>
                      </div>
                    ))}
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
          aria-label="Modular Wardrobe Architectural Showcase"
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
              key={wardrobeInterludeSlide}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: luxuryEase }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <img
                src={wardrobeInterludePhotos[wardrobeInterludeSlide].image}
                alt={wardrobeInterludePhotos[wardrobeInterludeSlide].alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 40%',
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
                {wardrobeInterludePhotos[wardrobeInterludeSlide].tag}
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
                {wardrobeInterludePhotos[wardrobeInterludeSlide].title}
              </h4>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {wardrobeInterludePhotos.map((photo, idx) => (
                  <button
                    key={photo.image}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => setWardrobeInterludeSlide(idx)}
                    style={{
                      height: '3px',
                      width: wardrobeInterludeSlide === idx ? '28px' : '14px',
                      backgroundColor:
                        wardrobeInterludeSlide === idx ? '#D4AF37' : 'rgba(255, 255, 255, 0.4)',
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
                    setWardrobeInterludeSlide(
                      (prev) =>
                        (prev - 1 + wardrobeInterludePhotos.length) % wardrobeInterludePhotos.length
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
                    setWardrobeInterludeSlide(
                      (prev) => (prev + 1) % wardrobeInterludePhotos.length
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
            SECTION 06: INSIDE THE WARDROBE
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
                  INTERNAL ACCESSORIES &amp; ZONING
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Inside the Wardrobe
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  Flexible shelves, drawers, hanging sections, trouser racks, jewellery trays, accessory units, shoe storage and loft modules, subject to layout and selected specifications.
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
              {insideWardrobeItems.map((item) => (
                <div key={item.title} style={{ borderTop: '2px solid #A58B62', paddingTop: '20px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 300, color: '#A58B62', display: 'block', marginBottom: '6px' }}>
                    {item.num}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
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
            SECTION 07: MATERIALS & FINISHES
            ========================================================================= */}
        <section
          style={{
            backgroundColor: '#ECEBE7',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            borderTop: '1px solid #D9D9D4',
            borderBottom: '1px solid #D9D9D4',
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
                  SURFACES &amp; JOINERY
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Materials &amp; Finishes
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  An individually curated mix of laminate, veneer, acrylic, PU, glass, mirrors, hardware and handles. Every combination is selected with the surrounding room and intended use in mind.
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
              {wardrobeMaterials.map((mat) => (
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
            SECTION 08: WHY LEOZ WARDROBES?
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
                  CRAFT &amp; CREDIBILITY
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Why LEOZ Wardrobes?
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  One-to-one planning, accurate manufacture, considered hardware choices, professional installation, detailed finishing and documented warranty terms.
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
              {whyChooseWardrobes.map((card) => (
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
            SECTION 09: OUR PROCESS (8 STEPS)
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
                  Our Process
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.75, margin: 0 }}>
                  A structured eight-stage journey transforming your personal space — from millimeter room measurement and storage habits to precision factory manufacture and white-glove handover.
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
              {wardrobeProcessSteps.map((step) => (
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
            SECTION 10: WARDROBE FAQS (INTERACTIVE ACCORDION)
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
                Wardrobe FAQs
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {wardrobeFaqs.map((faq, idx) => {
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
            SECTION 11: FINAL CTA | MAKE SPACE FOR WHAT MATTERS
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
              MAKE SPACE FOR WHAT MATTERS
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(34px, 4.5vw, 60px)', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.015em', margin: '0 0 20px 0', lineHeight: 1.15 }}>
              Begin Your Wardrobe Transformation
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.2vw, 18px)', color: '#D9D9D4', lineHeight: 1.75, maxWidth: '680px', margin: '0 auto 36px auto' }}>
              Begin with a personalised design conversation. Discuss your space, inventory, and aesthetic preferences with the LEOZ team.
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
              <span>Book Your Wardrobe Consultation</span>
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

export default ModularWardrobes;
