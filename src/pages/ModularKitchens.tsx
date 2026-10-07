import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Maximize2,
  Sliders,
  CheckCircle2,
  Compass,
  Cpu,
  Factory,
  ShieldCheck,
  Award,
} from 'lucide-react';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const ModularKitchens: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Kitchens | LEOZ Cucine — Architectural Luxury Modular Kitchens',
    'Bespoke luxury modular kitchens crafted with German engineering, Italian design, monolith islands, and architectural details.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  /* =========================================================================
     COLLECTIONS DATA (6 CATEGORIES)
     ========================================================================= */
  const kitchenCollections = [
    {
      id: 'modern',
      title: 'Modern Kitchens',
      subtitle: 'ARCHITECTURAL VOLUMES',
      desc: 'Seamless handleless geometry, integrated flush appliances, and concealed functional zones designed for contemporary living.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 40%',
      specs: '45° Edge • Sintered Stone • LED Recessed Plinth',
    },
    {
      id: 'contemporary',
      title: 'Contemporary Kitchens',
      subtitle: 'WARM TEXTURAL HARMONY',
      desc: 'A tactile composition of smoked European oak, warm matte lacquers, and brushed champagne bronze metallic channels.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 50%',
      specs: 'Smoked Oak • Bronze Gola • Concealed Hardware',
    },
    {
      id: 'minimal',
      title: 'Minimal Kitchens',
      subtitle: 'PURE LINEAR DISCIPLINE',
      desc: 'Zero superfluous ornamentation. Ultra-thin profile fronts, concealed pocket door walls, and silent push-to-open mechanics.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 45%',
      specs: 'Anti-Fingerprint Matte • Motorized Doors • Invisible Hood',
    },
    {
      id: 'luxury',
      title: 'Luxury Kitchens',
      subtitle: 'PRECIOUS EXOTIC MATERIALS',
      desc: 'Continuous bookmatched Italian quartzite, fluted glass vitrines with 3000K warm interior illumination, and integrated wine lounges.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 55%',
      specs: 'Taj Mahal Quartzite • Smoked Glass • Servo-Drive Drawers',
    },
    {
      id: 'handleless',
      title: 'Handleless Kitchens',
      subtitle: '45° MITERED PRECISION',
      desc: 'Razor-sharp 45-degree bevelled door fronts creating continuous clean horizons with German Blum motion systems.',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 40%',
      specs: 'Mitered Channels • Acoustic Damping • Zero Visible Hardware',
    },
    {
      id: 'island',
      title: 'Island Kitchens',
      subtitle: 'MONOLITHIC SOCIAL CENTRES',
      desc: 'Sculptural freestanding islands functioning as culinary workstations, cantilevered breakfast bars, and architectural anchors.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 48%',
      specs: 'Waterfall Countertops • Downdraft Induction • Plinth Lighting',
    },
  ];

  /* =========================================================================
     KITCHEN CLOSE-UP DETAILS DATA
     ========================================================================= */
  const kitchenDetails = [
    {
      title: '45° Bevelled Profiles',
      category: 'HANDLES & GOLA',
      desc: 'Invisible, continuous handless channels CNC-milled with 0.1mm tolerance.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Sintered Monolith Tops',
      category: 'COUNTERTOPS',
      desc: 'Heat, stain, and scratch-impervious ultra-compact slabs with seamless waterfall miters.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Solid Smoked Oak Internals',
      category: 'CABINET INTERIORS',
      desc: 'Interior cabinetry crafted with antibacterial velvet melamine and solid wood cutlery dividers.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'German Blum Legrabox',
      category: 'DRAWER SYSTEMS',
      desc: 'Full extension glass-sided running gear tested for 100,000 motion cycles under 70kg load.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: '3000K Architectural LED',
      category: 'LIGHTING CHANNELS',
      desc: 'Concealed micro-diffused ambient light lines seamlessly integrated into carcass grooves.',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Robotic Lacquer Curing',
      category: 'FINISHES & EDGES',
      desc: 'Multi-layer robotically applied polyurethane and UV-cured matte finishes for velvet touch.',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=85',
    },
  ];

  /* =========================================================================
     INTERACTIVE MATERIALS DATA (6 TYPES)
     ========================================================================= */
  const materialsList = [
    {
      id: 'wood',
      name: 'Natural Wood & Veneer',
      tagline: 'European Smoked Oak & Acoustic Fluted Walnut',
      desc: 'Sustainably sourced authentic timber veneers bookmatched by hand, stabilized against thermal expansion, and sealed with zero-VOC protective matte coats.',
      origin: 'European Certified Forestry',
      finish: 'Open-Pore Matte Lacquer',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
      swatch: '#8C6847',
      highlights: ['Deep 3D Fluting', 'Warm Acoustic Character', 'Anti-Warp Core'],
    },
    {
      id: 'stone',
      name: 'Architectural Stone & Quartzite',
      tagline: 'Calacatta Gold, Nero Marquina & Taj Mahal Quartzite',
      desc: 'Continuous waterfall veining engineered to resist extreme thermal shocks, citrus acids, and knife scratches while anchoring the space as a sculptural monolith.',
      origin: 'Italian & Brazilian Quarries',
      finish: 'Honed Silk & Leathered Touch',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      swatch: '#D5CDBE',
      highlights: ['Non-Porous Surface', '0.1mm Waterfall Miters', 'Heat Resistant to 800°C'],
    },
    {
      id: 'glass',
      name: 'Aero Smoked Glass',
      tagline: 'Smoked, Fluted & Back-Painted Safety Glass',
      desc: 'Ultra-thin aluminum-framed glass shutters integrated with concealed micro-hinges and vertical 3000K diffused LED strip lighting for curating barware.',
      origin: 'Aero Grade Aluminum & Tempered Glass',
      finish: 'Anti-Reflective Bronze & Nero',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',
      swatch: '#4A5568',
      highlights: ['Fingerprint-Resistant Treatment', 'Soft-Damped Closure', 'Integrated Backlighting'],
    },
    {
      id: 'metal',
      name: 'Brushed Luxury Metals',
      tagline: 'Champagne Bronze, Anodized Titanium & Gunmetal',
      desc: 'Laser-machined metal profiles creating shadow gaps, handleless Gola channels, and structural base plinths with exceptional corrosion resistance.',
      origin: 'Architectural Anodized Alloy',
      finish: 'Micro-Brushed Satin',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      swatch: '#A08055',
      highlights: ['Zero Oxidation', 'Precision Gola Channels', 'Seamless Joinery'],
    },
    {
      id: 'laminate',
      name: 'Anti-Fingerprint Nano Laminate',
      tagline: 'Ultra-Matte Thermal Healing Surfaces',
      desc: 'Next-generation nanotech surfaces where micro-scratches can be thermally repaired. Features an opaque, ultra-soft tactile feel with zero light reflection.',
      origin: 'High-Pressure Thermal Polymer',
      finish: 'Velvet Soft-Touch Matte',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
      swatch: '#2D3748',
      highlights: ['Thermal Scratch Repair', 'Anti-Bacterial Coating', 'Low Light Reflectivity'],
    },
    {
      id: 'acrylic',
      name: 'Deep Gloss & Matte Acrylics',
      tagline: 'Multi-Coat Mirror Reflections & Seamless Laser Edges',
      desc: 'Engineered with laser edge-banding technology for a completely seamless waterproof transition between front surface and edge, eliminating dirt lines.',
      origin: 'Pure Optical Grade Acrylic',
      finish: 'High-Gloss Mirror & Satin Matte',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      swatch: '#E2E8F0',
      highlights: ['Zero Glue-Line Joint', 'UV Colour Stability', 'High Moisture Resistance'],
    },
  ];

  const [activeMaterial, setActiveMaterial] = useState(0);

  /* =========================================================================
     COMPLETED KITCHEN PROJECTS (CASE STUDIES)
     ========================================================================= */
  const completedProjects = [
    {
      id: 'bodakdev-villa',
      title: 'Bodakdev Villa Residence',
      location: 'Ahmedabad, Gujarat',
      style: 'Monolithic Quartzite & Smoked Oak',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
      desc: 'A 600 sq. ft. open kitchen featuring a 4.2-metre continuous Taj Mahal quartzite island with integrated downdraft and concealed prep kitchen.',
    },
    {
      id: 'surat-penthouse',
      title: 'Dumas Road Sky Penthouse',
      location: 'Surat, Gujarat',
      style: 'Matte Velvet Nero & Champagne Metal',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
      desc: 'Dual-zone culinary architecture with pocketing appliance garage doors, motorized wall units, and an integrated temperature-controlled wine lounge.',
    },
    {
      id: 'gandhinagar-estate',
      title: 'Raysan Architectural Estate',
      location: 'Gandhinagar, Gujarat',
      style: 'Fluted Acoustic Walnut & Aero Glass',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85',
      desc: 'Warm hospitality kitchen seamlessly connecting to outdoor garden pavilion, featuring 45-degree mitered stone details and European running gear.',
    },
    {
      id: 'iscon-residence',
      title: 'Ambli Road Luxury Residence',
      location: 'Ahmedabad, Gujarat',
      style: 'Pure Minimal White & Sintered Stone',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1000&q=85',
      desc: 'Clean linear composition emphasizing natural daylight, invisible touch-to-open German fittings, and zero visible joints.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FAF9F6', color: '#161514', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO: EDITORIAL MAGAZINE COVER
            ========================================================================= */}
        <section
          aria-label="LEOZ Kitchen Architecture Hero"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 'clamp(560px, 86vh, 760px)',
            display: 'flex',
            alignItems: 'flex-end',
            backgroundColor: '#161514',
            overflow: 'hidden',
          }}
        >
          {/* Dedicated Architectural Image with Mobile-Friendly Focal Point */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90)',
              backgroundPosition: 'center 42%',
              backgroundSize: 'cover',
            }}
          />

          {/* Soft Luminous Scrim (Preserving image warmth while giving strong text contrast) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(22, 21, 20, 0.25) 0%, rgba(22, 21, 20, 0.3) 40%, rgba(22, 21, 20, 0.88) 95%)',
            }}
          />

          {/* Hero Editorial Typography Card */}
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
            <div style={{ maxWidth: '820px' }}>
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
                LEOZ CUCINE • ARCHITECTURAL KITCHENS
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(34px, 5.5vw, 68px)',
                  fontWeight: 300,
                  lineHeight: 1.06,
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  margin: '0 0 18px 0',
                }}
              >
                Kitchens, Designed Around Life.
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
                  maxWidth: '640px',
                  marginBottom: '32px',
                }}
              >
                Precision-crafted kitchens that combine architectural beauty, intelligent storage and everyday functionality.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: luxuryEase }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
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
                    padding: '15px 30px',
                    backgroundColor: '#B69A6B',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#9F8255';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#B69A6B';
                  }}
                >
                  <span>Book a Consultation</span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href="#collections"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 26px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
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
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <span>Explore Kitchens</span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 01: KITCHEN COLLECTIONS (6 VISUAL CATEGORIES)
            ========================================================================= */}
        <section
          id="collections"
          aria-label="Kitchen Collections"
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
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: 'clamp(36px, 5vw, 60px)',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
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
                  SIGNATURE DESIGN EXPRESSIONS
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 3.8vw, 46px)',
                    fontWeight: 300,
                    color: '#161514',
                    margin: 0,
                    letterSpacing: '0.01em',
                  }}
                >
                  Kitchen Collections
                </h2>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(22, 21, 20, 0.7)',
                  maxWidth: '480px',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Six architectural categories tailored to the proportions of your residence, cooking style, and spatial character.
              </p>
            </div>

            {/* Collections Grid (Desktop 3x2, Mobile Swipe/Stack) */}
            <div
              className="leoz-collections-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '30px',
              }}
            >
              {kitchenCollections.map((col, idx) => (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: luxuryEase }}
                  className="leoz-collection-card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(22, 21, 20, 0.08)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(182, 154, 107, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(22, 21, 20, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
                  }}
                  onClick={(e) => navigate(e, '/talk-to-us')}
                >
                  {/* Image Container with Zoom */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 11',
                      overflow: 'hidden',
                      backgroundColor: '#EBE8E1',
                    }}
                  >
                    <img
                      src={col.image}
                      alt={col.title}
                      loading="lazy"
                      className="collection-zoom-img"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: col.focalPosition,
                        display: 'block',
                        transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        padding: '6px 12px',
                        backgroundColor: 'rgba(22, 21, 20, 0.75)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '2px',
                        color: '#B69A6B',
                        fontFamily: 'var(--font-body)',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {col.subtitle}
                    </div>
                  </div>

                  {/* Content Panel */}
                  <div
                    style={{
                      padding: '24px 24px 22px 24px',
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '8px',
                      }}
                    >
                      <h3
                        className="collection-title"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '22px',
                          fontWeight: 400,
                          color: '#161514',
                          margin: 0,
                          transition: 'transform 0.3s ease, color 0.3s ease',
                        }}
                      >
                        {col.title}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        className="collection-arrow"
                        style={{
                          color: '#B69A6B',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </div>

                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13.5px',
                        color: 'rgba(22, 21, 20, 0.72)',
                        lineHeight: 1.6,
                        margin: '0 0 16px 0',
                        flexGrow: 1,
                      }}
                    >
                      {col.desc}
                    </p>

                    <div
                      style={{
                        paddingTop: '12px',
                        borderTop: '1px solid rgba(22, 21, 20, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '11px',
                        fontFamily: 'var(--font-body)',
                        color: '#8A8275',
                        fontWeight: 500,
                      }}
                    >
                      <span>{col.specs}</span>
                      <span style={{ color: '#B69A6B', fontWeight: 600 }}>EXPLORE</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: DESIGN PHILOSOPHY ("WHERE FUNCTION MEETS ARCHITECTURE")
            ========================================================================= */}
        <section
          aria-label="Kitchen Design Philosophy"
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
            <div
              className="leoz-split-philosophy"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(40px, 7vw, 100px)',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Architectural Photo with Detail Badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 3.6',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="LEOZ Kitchen Philosophy Monolith Detail"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 45%',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    padding: '14px 20px',
                    backgroundColor: 'rgba(15, 14, 13, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(182, 154, 107, 0.3)',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#B69A6B',
                      fontWeight: 600,
                    }}
                  >
                    45° Mitered Edge Monolith
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    0.1mm Joint Precision
                  </span>
                </div>
              </motion.div>

              {/* Right Column: Editorial Philosophy & 6 Pillars */}
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
                  THE LEOZ METHOD
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 3.8vw, 46px)',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    color: '#FFFFFF',
                    margin: '0 0 20px 0',
                    letterSpacing: '0.01em',
                  }}
                >
                  Where Function Meets Architecture.
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.78)',
                    lineHeight: 1.75,
                    marginBottom: '32px',
                  }}
                >
                  A kitchen cannot merely look exquisite in a photograph. It must operate as a highly tuned culinary machine where movement, storage, and tactile surfaces flow effortlessly together.
                </p>

                {/* 6 Essential Kitchen Aspects */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '18px 24px',
                    marginBottom: '36px',
                  }}
                >
                  {[
                    { label: 'Intelligent Storage', desc: 'Custom drawer inserts & pull-out pantries' },
                    { label: 'Ergonomic Workflow', desc: 'Optimized prep-cook-clean golden triangle' },
                    { label: 'Tactile Materials', desc: 'High-density sintered stone & smoked woods' },
                    { label: 'Architectural Lighting', desc: 'Integrated 3000K recessed warm channels' },
                    { label: 'German Ergonomics', desc: 'Concealed Blum & Hettich motion gear' },
                    { label: 'Master Finishing', desc: 'Multi-layer Italian lacquers & laser edges' },
                  ].map((pillar) => (
                    <div key={pillar.label} style={{ display: 'flex', gap: '10px' }}>
                      <div
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#B69A6B',
                          marginTop: '8px',
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <h4
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#FFFFFF',
                            margin: '0 0 2px 0',
                          }}
                        >
                          {pillar.label}
                        </h4>
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '11.5px',
                            color: 'rgba(255, 255, 255, 0.6)',
                            lineHeight: 1.4,
                            display: 'block',
                          }}
                        >
                          {pillar.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="/talk-to-us"
                  onClick={(e) => navigate(e, '/talk-to-us')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#B69A6B',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B69A6B')}
                >
                  <span>Plan Your Kitchen Architecture</span>
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: KITCHEN DETAILS (CLOSE-UP PHOTOGRAPHY GALLERY)
            ========================================================================= */}
        <section
          aria-label="Kitchen Precision Details"
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
                MICRO-ENGINEERING
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
                Kitchen Details &amp; Hardware
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(22, 21, 20, 0.7)',
                  maxWidth: '620px',
                  margin: '0 auto',
                  lineHeight: 1.65,
                }}
              >
                True luxury is found in what happens inside the drawer, behind the hinge, and at the microscopic joint.
              </p>
            </div>

            {/* Close-Up Photography Grid */}
            <div
              className="leoz-details-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {kitchenDetails.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: luxuryEase }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(22, 21, 20, 0.08)',
                    borderRadius: '3px',
                    overflow: 'hidden',
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
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '1 / 0.85',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
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
                        top: '12px',
                        left: '12px',
                        padding: '4px 10px',
                        backgroundColor: 'rgba(22, 21, 20, 0.8)',
                        backdropFilter: 'blur(8px)',
                        color: '#B69A6B',
                        fontFamily: 'var(--font-body)',
                        fontSize: '9.5px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        borderRadius: '2px',
                      }}
                    >
                      {item.category}
                    </div>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: '#161514',
                        margin: '0 0 6px 0',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12.5px',
                        color: 'rgba(22, 21, 20, 0.68)',
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: INTERACTIVE MATERIAL SELECTOR
            ========================================================================= */}
        <section
          id="materials"
          aria-label="Kitchen Materials Selector"
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
            <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 60px)' }}>
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
                CURATED FINISH PALETTE
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
                Interactive Material Palette
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                Select a material to inspect its origin, tactile finish, and architectural application.
              </p>
            </div>

            {/* Material Selector Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: 'clamp(36px, 5vw, 56px)',
              }}
            >
              {materialsList.map((mat, idx) => (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => setActiveMaterial(idx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 20px',
                    backgroundColor: activeMaterial === idx ? '#B69A6B' : 'rgba(255, 255, 255, 0.06)',
                    color: activeMaterial === idx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                    border: `1px solid ${activeMaterial === idx ? '#B69A6B' : 'rgba(255, 255, 255, 0.12)'}`,
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12.5px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <span
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: mat.swatch,
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      display: 'inline-block',
                    }}
                  />
                  <span>{mat.name.split('&')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Material Interactive Showcase */}
            <AnimatePresence mode="wait">
              <motion.div
                key={materialsList[activeMaterial].id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: luxuryEase }}
                className="leoz-material-preview"
                style={{
                  backgroundColor: '#1E1D1B',
                  border: '1px solid rgba(182, 154, 107, 0.3)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '0',
                }}
              >
                {/* Large Material Imagery */}
                <div
                  style={{
                    position: 'relative',
                    minHeight: '380px',
                    backgroundColor: '#0F0E0D',
                  }}
                >
                  <img
                    src={materialsList[activeMaterial].image}
                    alt={materialsList[activeMaterial].name}
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
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent 60%, rgba(30, 29, 27, 0.9) 100%)',
                    }}
                  />
                </div>

                {/* Material Specification Details */}
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
                    MATERIAL SPECIFICATION
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(24px, 3vw, 32px)',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      margin: '0 0 6px 0',
                    }}
                  >
                    {materialsList[activeMaterial].name}
                  </h3>

                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: '#B69A6B',
                      display: 'block',
                      marginBottom: '16px',
                    }}
                  >
                    {materialsList[activeMaterial].tagline}
                  </span>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.75)',
                      lineHeight: 1.7,
                      margin: '0 0 24px 0',
                    }}
                  >
                    {materialsList[activeMaterial].desc}
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '14px',
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      marginBottom: '24px',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '10px', color: '#B69A6B', letterSpacing: '0.15em', display: 'block' }}>
                        PROVENANCE
                      </span>
                      <strong style={{ fontSize: '12.5px', color: '#FFFFFF', fontWeight: 500 }}>
                        {materialsList[activeMaterial].origin}
                      </strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: '#B69A6B', letterSpacing: '0.15em', display: 'block' }}>
                        TACTILE FINISH
                      </span>
                      <strong style={{ fontSize: '12.5px', color: '#FFFFFF', fontWeight: 500 }}>
                        {materialsList[activeMaterial].finish}
                      </strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {materialsList[activeMaterial].highlights.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '5px 12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          borderRadius: '2px',
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          color: '#E0D6C3',
                        }}
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: COMPLETED PROJECTS (ARCHITECTURAL CASE STUDIES)
            ========================================================================= */}
        <section
          id="projects"
          aria-label="Completed Kitchen Projects"
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
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: 'clamp(36px, 5vw, 60px)',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
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
                  REALIZED HOMES
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 3.8vw, 46px)',
                    fontWeight: 300,
                    color: '#161514',
                    margin: 0,
                    letterSpacing: '0.01em',
                  }}
                >
                  Completed Kitchen Projects
                </h2>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(22, 21, 20, 0.7)',
                  maxWidth: '460px',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                A selection of private residences where LEOZ engineered bespoke culinary spaces from concept to turnkey handover.
              </p>
            </div>

            {/* Case Studies 2x2 Grid */}
            <div
              className="leoz-projects-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px',
              }}
            >
              {completedProjects.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: luxuryEase }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(22, 21, 20, 0.08)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(182, 154, 107, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(22, 21, 20, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16 / 10',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
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
                        bottom: '14px',
                        left: '14px',
                        padding: '5px 12px',
                        backgroundColor: 'rgba(22, 21, 20, 0.8)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        fontWeight: 500,
                        borderRadius: '2px',
                      }}
                    >
                      📍 {p.location}
                    </div>
                  </div>

                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#B69A6B',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      {p.style}
                    </span>

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '22px',
                        fontWeight: 400,
                        color: '#161514',
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
                        margin: '0 0 20px 0',
                        flexGrow: 1,
                      }}
                    >
                      {p.desc}
                    </p>

                    <a
                      href="/talk-to-us"
                      onClick={(e) => navigate(e, '/talk-to-us')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#161514',
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        transition: 'color 0.25s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#B69A6B')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#161514')}
                    >
                      <span>Inquire This Architecture</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 06: CINEMATIC FINAL CTA ("LET'S DESIGN YOUR KITCHEN")
            ========================================================================= */}
        <section
          aria-label="Book Kitchen Consultation"
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
              opacity: 0.22,
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
                fontSize: 'clamp(32px, 5vw, 58px)',
                fontWeight: 300,
                color: '#FFFFFF',
                lineHeight: 1.1,
                margin: '0 0 20px 0',
                letterSpacing: '0.01em',
              }}
            >
              Let’s Design Your Kitchen.
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
              Whether you are designing a new villa or renovating a luxury penthouse, our principal designers are ready to translate your vision into reality.
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#9F8255';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#B69A6B';
              }}
            >
              <span>Book a Consultation</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Responsive Styles */}
      <style>{`
        .leoz-collection-card:hover .collection-zoom-img {
          transform: scale(1.05);
        }
        .leoz-collection-card:hover .collection-title {
          transform: translateY(-2px);
          color: #B69A6B;
        }
        .leoz-collection-card:hover .collection-arrow {
          transform: translate(2px, -2px);
        }

        @media (max-width: 900px) {
          .leoz-split-philosophy {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .leoz-material-preview {
            grid-template-columns: 1fr !important;
          }
          .leoz-material-preview > div:first-child {
            min-height: 260px !important;
          }
        }

        @media (max-width: 768px) {
          .leoz-collections-grid,
          .leoz-details-grid,
          .leoz-projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ModularKitchens;
