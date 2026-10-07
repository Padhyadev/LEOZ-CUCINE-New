import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  ArrowUpRight,
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
  Scissors,
  Settings,
  Shield,
  Box,
} from 'lucide-react';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const ModularWardrobes: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Wardrobes | LEOZ Cucine — Luxury Bespoke Wardrobe & Dressing Systems',
    'Explore LEOZ bespoke luxury walk-in wardrobes, sliding systems, custom closet suites, smoked oak interiors, and precision storage engineering.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  /* =========================================================================
     WARDROBE STYLES (6 CATEGORIES)
     ========================================================================= */
  const wardrobeStyles = [
    {
      id: 'walk-in-wardrobes',
      title: 'Walk-In Wardrobes',
      subtitle: 'SANCTUARY DRESSING SUITES',
      desc: 'Open-concept architectural dressing rooms with central island showcases, illuminated glass bays, and bespoke accessory suites.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 45%',
      specs: 'Central Island • 3000K LED • Smoked Eucalyptus',
    },
    {
      id: 'sliding-wardrobes',
      title: 'Sliding Wardrobes',
      subtitle: 'FLUSH CO-PLANAR TRACKS',
      desc: 'High-load German sliding gear engineered for effortless silent gliding across wide bedroom layouts with zero floor tracks.',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 50%',
      specs: 'Co-Planar Flush • Soft Dampening • Anti-Warp Core',
    },
    {
      id: 'walk-in-closets',
      title: 'Walk-in Closets',
      subtitle: 'MAXIMAL STORAGE ARCHITECTURE',
      desc: 'Smart floor-to-ceiling organization maximizing every cubic centimetre with modular hanging, shoe tiers, and pull-down elevators.',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 42%',
      specs: 'Full-Height Uprights • Modular Trays • Corner Optimizers',
    },
    {
      id: 'luxury-wardrobes',
      title: 'Luxury Wardrobes',
      subtitle: 'EXOTIC VENEERS & BRONZE',
      desc: 'Curated dressing suites featuring fluted smoked oak, bronze tinted glass vitrines, and velvet hand-stitched interior partitions.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 48%',
      specs: 'Tinted Safety Glass • Velvet Inlays • Acoustic Dampeners',
    },
    {
      id: 'minimal-wardrobes',
      title: 'Minimal Wardrobes',
      subtitle: 'SEAMLESS MONOLITHIC PANELS',
      desc: 'Ultra-thin architectural handleless profiles and push-to-open flush doors that visually merge into wall architecture.',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 40%',
      specs: 'Zero Visible Hardware • Matte Lacquer • Shadow Gap Line',
    },
    {
      id: 'custom-storage',
      title: 'Custom Storage',
      subtitle: 'INTELLIGENT HOME INTEGRATION',
      desc: 'Bespoke bedroom entryway storage, vanity dressing consoles, and integrated safe compartments engineered for luxury lifestyles.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 45%',
      specs: 'Concealed Safes • Integrated Vanity • Sensor Illumination',
    },
  ];

  /* =========================================================================
     INSIDE THE WARDROBE (7 INTERACTIVE STORAGE SOLUTIONS)
     ========================================================================= */
  const storageSolutions = [
    {
      id: 'drawers',
      title: 'Velvet-Lined Drawers',
      category: 'DRAWER SYSTEMS',
      desc: 'Full-extension soft-close drawers fitted with custom wood dividers and antibacterial velvet liners for folded knitwear and fine garments.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85',
      metric: '70kg Load Rated • Blum Motion',
    },
    {
      id: 'accessories',
      title: 'Dedicated Accessories',
      category: 'CURATED COMPARTMENTS',
      desc: 'Individualized storage zones for designer handbags, cashmere scarves, belts, and ties with custom felt organizers.',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=800&q=85',
      metric: 'Modular Sizing • Scratch-Free',
    },
    {
      id: 'lighting',
      title: 'Integrated Lighting',
      category: '3000K SENSOR LED',
      desc: 'Concealed vertical micro-LED channels and PIR motion sensors that bathe garments in true-color 95+ CRI architectural light.',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=85',
      metric: 'Auto-Sensor On/Off • Zero Heat',
    },
    {
      id: 'shoes',
      title: 'Illuminated Shoe Storage',
      category: 'ANGLED SLOPING SHELVES',
      desc: 'Precision angled shelves with anodized brass retaining rails and integrated strip lighting for luxury footwear collections.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85',
      metric: 'Heel-Stop Rails • Dust Protected',
    },
    {
      id: 'hanging',
      title: 'Engineered Hanging Systems',
      category: 'DUAL HEIGHT & HYDRAULIC LIFTS',
      desc: 'Hydraulic pull-down hanging elevators for high ceiling spaces alongside tailored long-coat and jacket drop zones.',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=85',
      metric: 'Hydraulic Pull-Down • No Creasing',
    },
    {
      id: 'jewellery',
      title: 'Watch & Jewellery Trays',
      category: 'ISLAND SHOWCASES',
      desc: 'Lockable glass-topped display vitrines with leather-clad watch winders, ring slots, and sunglasses compartments.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=85',
      metric: 'Tempered Glass Top • Biometric Lock',
    },
    {
      id: 'pull-outs',
      title: 'Pull-Out Trouser & Tie Racks',
      category: 'CONCEALED HARDWARE',
      desc: 'High-glide aluminum racks with anti-slip rubberized bars preventing fabric creasing and maximizing closet depth.',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=85',
      metric: 'Smooth Glide • 100% Extension',
    },
  ];

  /* =========================================================================
     MATERIALS & FINISHES (6 TYPES)
     ========================================================================= */
  const wardrobeMaterials = [
    {
      id: 'wood',
      name: 'Natural Wood Veneer',
      subtitle: 'Smoked European Oak, Walnut & Fluted Eucalyptus',
      desc: 'Authentic timber panels treated with climate-stabilized marine cores and finished in silky matte open-pore lacquers.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85',
      swatch: '#8B6A47',
    },
    {
      id: 'glass',
      name: 'Smoked & Fluted Glass',
      subtitle: 'Tinted Safety Glass & Ultra-Slim Aero Profiles',
      desc: 'Reflective bronze and nero safety tempered glass doors providing partial interior mystique with ambient LED backlighting.',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=85',
      swatch: '#4A5568',
    },
    {
      id: 'mirror',
      name: 'Architectural Mirrors',
      subtitle: 'Bronze, Grey & Clear Reflection Panels',
      desc: 'Shatter-proof tinted mirror panels creating spatial depth and seamless full-height vanity dressing surfaces.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
      swatch: '#A0AEC0',
    },
    {
      id: 'metal',
      name: 'Anodized Luxury Metals',
      subtitle: 'Champagne Bronze, Gunmetal & Brushed Nero',
      desc: 'Micro-brushed aluminum extrusions engineered for structural uprights, door frames, and drawer pull handles.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
      swatch: '#B69A6B',
    },
    {
      id: 'fabric',
      name: 'Textured Fabric & Leather',
      subtitle: 'Hand-Stitched Italian Leather & Acoustic Linen',
      desc: 'Tactile back panels and drawer linings offering sound-dampening luxury and gentle protection for delicate jewelry.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
      swatch: '#D5CDBE',
    },
    {
      id: 'laminate',
      name: 'Anti-Fingerprint Laminate',
      subtitle: 'Thermal-Healing Velvet Matte Finishes',
      desc: 'Ultra-durable, scratch-resistant surface with zero reflection, engineered for high-frequency daily wardrobe usage.',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1000&q=85',
      swatch: '#2D3748',
    },
  ];

  const [activeMaterial, setActiveMaterial] = useState(0);

  /* =========================================================================
     PRECISION ENGINEERING PILLARS (5 CARDS)
     ========================================================================= */
  const precisionPillars = [
    {
      code: 'PRECISION / 01',
      title: 'Accurate Dimensions',
      desc: 'Laser-scanned millimeter survey ensuring every wardrobe bay fits flush floor-to-ceiling with zero clumsy filler panels.',
      icon: Scissors,
    },
    {
      code: 'PRECISION / 02',
      title: 'German Running Gear',
      desc: 'Heavy-duty Blum and Hettich concealed hinges and sliding carriages rated for 100,000 flawless motion cycles.',
      icon: Settings,
    },
    {
      code: 'PRECISION / 03',
      title: 'Soft-Close Systems',
      desc: 'Integrated hydraulic dampeners on all doors, drawers, and pull-outs for whisper-quiet acoustic serenity.',
      icon: Shield,
    },
    {
      code: 'PRECISION / 04',
      title: 'Factory CNC Joinery',
      desc: 'Manufactured on 5-axis CNC machines and automated edge banders at our 20,000 sq. ft. plant with 0.1mm tolerance.',
      icon: Cpu,
    },
    {
      code: 'PRECISION / 05',
      title: 'White-Glove Installation',
      desc: 'Installed directly by certified LEOZ master carpenters with dust-free handover and 10-year comprehensive warranty.',
      icon: Award,
    },
  ];

  /* =========================================================================
     WARDROBE PROJECTS (CASE STUDIES)
     ========================================================================= */
  const wardrobeProjects = [
    {
      id: 'shantigram-penthouse',
      title: 'Shantigram Sky Penthouse',
      location: 'Ahmedabad, Gujarat',
      style: 'Smoked Bronze Glass & Island Showcase',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
      desc: 'A 450 sq. ft. master dressing suite featuring 3-metre floor-to-ceiling tinted glass vitrines, central leather jewelry island, and 3000K vertical sensor lighting.',
    },
    {
      id: 'althan-villa',
      title: 'Althan Luxury Villa Suite',
      location: 'Surat, Gujarat',
      style: 'Fluted Smoked Oak & Flush Co-Planar',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=85',
      desc: 'Seamless co-planar sliding wardrobe with concealed pull-down hydraulic elevators, motorized trouser organizers, and hidden security vault.',
    },
    {
      id: 'sindhubhavan-mansion',
      title: 'Sindhu Bhavan Presidential Suite',
      location: 'Ahmedabad, Gujarat',
      style: 'Acoustic Fabric Panels & Champagne Metal',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=85',
      desc: 'Walk-through his-and-hers dressing gallery with illuminated shoe vitrines, custom watch winders, and full-height architectural bronze mirrors.',
    },
    {
      id: 'giftcity-residence',
      title: 'GIFT City High-Rise Residence',
      location: 'Gandhinagar, Gujarat',
      style: 'Matte Nero Lacquer & Minimal Handleless',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1000&q=85',
      desc: 'Monolithic minimal bedroom wardrobe wall blending seamlessly into architectural drywall with push-to-open flush doors.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FAF9F6', color: '#161514', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO: "STORAGE, ELEVATED." (FULL-HEIGHT ARCHITECTURAL SUITE)
            ========================================================================= */}
        <section
          aria-label="LEOZ Wardrobe Architecture Hero"
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
          {/* Dedicated Architectural Wardrobe Image with Mobile Framing */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2200&q=90)',
              backgroundPosition: 'center 38%',
              backgroundSize: 'cover',
            }}
          />

          {/* Soft Luminous Scrim */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(22, 21, 20, 0.25) 0%, rgba(22, 21, 20, 0.3) 40%, rgba(22, 21, 20, 0.88) 95%)',
            }}
          />

          {/* Hero Content Overlay */}
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
                LEOZ CUCINE • BESPOKE WARDROBES &amp; DRESSING SUITES
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
                  margin: '0 0 18px 0',
                }}
              >
                Storage, Elevated.
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
                Thoughtfully engineered wardrobes designed around your lifestyle. Where European motion hardware, ambient lighting, and bespoke organization harmonize.
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
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#9F8255')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#B69A6B')}
                >
                  <span>Book a Consultation</span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href="#styles"
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
                  <span>Explore Wardrobe Styles</span>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 01: WARDROBE STYLES (6 CATEGORIES)
            ========================================================================= */}
        <section
          id="styles"
          aria-label="Wardrobe Styles"
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
                  ARCHITECTURAL TYPOLOGIES
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
                  Wardrobe Styles &amp; Systems
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
                From sweeping open walk-in dressing galleries to flush co-planar minimal walls, tailored for luxury bedrooms.
              </p>
            </div>

            {/* Styles Grid */}
            <div
              className="leoz-wardrobes-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '30px',
              }}
            >
              {wardrobeStyles.map((style, idx) => (
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: luxuryEase }}
                  className="leoz-wardrobe-card"
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
                      src={style.image}
                      alt={style.title}
                      loading="lazy"
                      className="wardrobe-zoom-img"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: style.focalPosition,
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
                      {style.subtitle}
                    </div>
                  </div>

                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '8px',
                      }}
                    >
                      <h3
                        className="wardrobe-title"
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '22px',
                          fontWeight: 400,
                          color: '#161514',
                          margin: 0,
                          transition: 'transform 0.3s ease, color 0.3s ease',
                        }}
                      >
                        {style.title}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        className="wardrobe-arrow"
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
                      {style.desc}
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
                      <span>{style.specs}</span>
                      <span style={{ color: '#B69A6B', fontWeight: 600 }}>EXPLORE</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: INSIDE THE WARDROBE (DETAILED STORAGE SOLUTIONS)
            ========================================================================= */}
        <section
          aria-label="Inside The Wardrobe"
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
                MICRO-ORGANIZATION ARCHITECTURE
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
                Inside the Wardrobe
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(255, 255, 255, 0.75)',
                  maxWidth: '640px',
                  margin: '0 auto',
                  lineHeight: 1.65,
                }}
              >
                Every drawer, tray, and hanging tier is precision-proportioned to protect delicate fabrics, timepieces, and accessories.
              </p>
            </div>

            {/* Storage Solutions Grid */}
            <div
              className="leoz-storage-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {storageSolutions.map((sol, idx) => (
                <motion.div
                  key={sol.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.07, ease: luxuryEase }}
                  style={{
                    backgroundColor: '#1E1D1B',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
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
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
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
                      src={sol.image}
                      alt={sol.title}
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
                        backgroundColor: 'rgba(15, 14, 13, 0.8)',
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
                      {sol.category}
                    </div>
                  </div>

                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '19px',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        margin: '0 0 6px 0',
                      }}
                    >
                      {sol.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12.5px',
                        color: 'rgba(255, 255, 255, 0.65)',
                        lineHeight: 1.55,
                        margin: '0 0 14px 0',
                        flexGrow: 1,
                      }}
                    >
                      {sol.desc}
                    </p>
                    <div
                      style={{
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        fontSize: '11px',
                        fontFamily: 'var(--font-body)',
                        color: '#B69A6B',
                        fontWeight: 500,
                      }}
                    >
                      ✓ {sol.metric}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: MATERIALS & FINISHES (CLOSE-UP TACTILE GALLERY)
            ========================================================================= */}
        <section
          id="materials"
          aria-label="Wardrobe Materials & Finishes"
          style={{
            paddingTop: 'clamp(70px, 9vw, 120px)',
            paddingBottom: 'clamp(70px, 9vw, 120px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
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
                CURATED TACTILE PALETTE
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
                Materials &amp; Finishes
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
                Close-up craftsmanship combining authentic European wood veneers, Italian leather, and safety tinted glass.
              </p>
            </div>

            {/* Materials 3x2 Grid */}
            <div
              className="leoz-materials-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '28px',
              }}
            >
              {wardrobeMaterials.map((m, idx) => (
                <motion.div
                  key={m.id}
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
                      aspectRatio: '16 / 10',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={m.image}
                      alt={m.name}
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
                        bottom: '12px',
                        left: '12px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: m.swatch,
                        border: '2px solid #FFFFFF',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                      }}
                    />
                  </div>

                  <div style={{ padding: '22px' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '20px',
                        fontWeight: 400,
                        color: '#161514',
                        margin: '0 0 4px 0',
                      }}
                    >
                      {m.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        color: '#B69A6B',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '10px',
                      }}
                    >
                      {m.subtitle}
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: 'rgba(22, 21, 20, 0.7)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: PRECISION ENGINEERING SECTION
            ========================================================================= */}
        <section
          aria-label="Precision Wardrobe Engineering"
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
                THE LEOZ ENGINEERING STANDARD
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
                Precision in Every Millimetre
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.75)',
                  maxWidth: '700px',
                  margin: '0 auto',
                  lineHeight: 1.7,
                }}
              >
                Why our wardrobes glide silently and stay perfectly aligned for decades without door sagging or joint loosening.
              </p>
            </div>

            {/* 5 Precision Pillars Bento Grid */}
            <div
              className="leoz-precision-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
                marginBottom: '40px',
              }}
            >
              {precisionPillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.code}
                    style={{
                      backgroundColor: '#1E1D1B',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      padding: '24px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '14px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingBottom: '8px',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '10px',
                          fontWeight: 600,
                          letterSpacing: '0.15em',
                          color: '#B69A6B',
                        }}
                      >
                        {p.code}
                      </span>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(182, 154, 107, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#B69A6B',
                        }}
                      >
                        <Icon size={16} strokeWidth={1.75} />
                      </div>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '20px',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {p.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12.5px',
                        color: 'rgba(255, 255, 255, 0.65)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: EDITORIAL WARDROBE PROJECTS
            ========================================================================= */}
        <section
          id="projects"
          aria-label="Completed Wardrobe Projects"
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
                  REALIZED DRESSING SUITES
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
                  Wardrobe Case Studies
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
                Custom residential dressing rooms engineered for luxury private residences across Gujarat.
              </p>
            </div>

            {/* Case Studies 2x2 Grid */}
            <div
              className="leoz-wardrobe-projects-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px',
              }}
            >
              {wardrobeProjects.map((p, idx) => (
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
                      <span>Inquire This Suite</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 06: FINAL CTA ("YOUR SPACE. YOUR SYSTEM.")
            ========================================================================= */}
        <section
          aria-label="Book Wardrobe Consultation"
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=85)',
              backgroundPosition: 'center 40%',
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
              BESPOKE DRESSING ROOM COMMISSION
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 5.5vw, 62px)',
                fontWeight: 300,
                color: '#FFFFFF',
                lineHeight: 1.08,
                margin: '0 0 20px 0',
                letterSpacing: '0.02em',
              }}
            >
              Your Space.
              <br />
              Your System.
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
              Bring harmony, organization, and architectural calm to your master suite with a custom LEOZ wardrobe consultation.
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

      {/* Responsive Styles */}
      <style>{`
        .leoz-wardrobe-card:hover .wardrobe-zoom-img {
          transform: scale(1.05);
        }
        .leoz-wardrobe-card:hover .wardrobe-title {
          transform: translateY(-2px);
          color: #B69A6B;
        }
        .leoz-wardrobe-card:hover .wardrobe-arrow {
          transform: translate(2px, -2px);
        }

        @media (max-width: 768px) {
          .leoz-wardrobes-grid,
          .leoz-storage-grid,
          .leoz-materials-grid,
          .leoz-wardrobe-projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ModularWardrobes;
