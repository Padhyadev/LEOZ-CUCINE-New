import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { UniversalHero } from '../components/common/UniversalHero';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Maximize2,
  CheckCircle2,
  Sliders,
  Compass,
} from 'lucide-react';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

interface MaterialItem {
  id: string;
  name: string;
  category: 'WOOD' | 'STONE' | 'GLASS' | 'METAL' | 'LAMINATES' | 'ACRYLIC' | 'TEXTURES' | 'HARDWARE';
  tagline: string;
  texture: string;
  origin: string;
  finish: string;
  image: string;
  swatch: string;
}

export const MaterialsFinishes: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Materials & Finishes Archive | LEOZ Cucine — Tactile Architectural Surfaces',
    'Explore the LEOZ digital material library: natural smoked woods, sintered quartzite stone, smoked glass, anodized metals, and German hardware.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const categories = ['ALL', 'WOOD', 'STONE', 'GLASS', 'METAL', 'LAMINATES', 'ACRYLIC', 'TEXTURES', 'HARDWARE'] as const;
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('ALL');

  /* =========================================================================
     COMPREHENSIVE DIGITAL MATERIAL ARCHIVE (16 ITEMS)
     ========================================================================= */
  const materialsData: MaterialItem[] = [
    {
      id: 'wood-smoked-oak',
      name: 'Smoked European Oak',
      category: 'WOOD',
      tagline: 'Deep grain texture with open-pore matte lacquer',
      texture: 'Coarse Linear Grain • Thermal Smoked',
      origin: 'European Certified Forestry',
      finish: 'Silk Matte 5% Sheen',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85',
      swatch: '#5A4633',
    },
    {
      id: 'wood-fluted-walnut',
      name: 'Fluted Acoustic Walnut',
      category: 'WOOD',
      tagline: 'Precision 3D CNC-routed acoustic vertical fluting',
      texture: 'Rhythmic 12mm 3D Fluting',
      origin: 'American Black Walnut',
      finish: 'Natural Oil & UV Topcoat',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85',
      swatch: '#6E4D34',
    },
    {
      id: 'stone-taj-mahal',
      name: 'Taj Mahal Sintered Quartzite',
      category: 'STONE',
      tagline: 'Warm ivory crystalline veining with extreme thermal resistance',
      texture: 'Honed Silk Velvet Touch',
      origin: 'Italian Sintered Slab',
      finish: 'Zero-Porosity Honed',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85',
      swatch: '#D5CDBE',
    },
    {
      id: 'stone-nero-marquina',
      name: 'Nero Marquina Sintered Stone',
      category: 'STONE',
      tagline: 'Deep black monolith with striking white lightning veining',
      texture: 'Leathered High-Tactile Relief',
      origin: 'Spanish Natural Quarries',
      finish: 'Anti-Acid Leathered Matte',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
      swatch: '#1F2421',
    },
    {
      id: 'glass-smoked-bronze',
      name: 'Smoked Bronze Safety Glass',
      category: 'GLASS',
      tagline: 'Tinted transparent reflection with anti-fingerprint coating',
      texture: 'Mirror-Smooth Architectural Glass',
      origin: 'European Tempered Safety Glass',
      finish: 'Bronze Tinted & Heat Toughened',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=85',
      swatch: '#5E503F',
    },
    {
      id: 'glass-fluted-reeded',
      name: 'Fluted Aero Glass',
      category: 'GLASS',
      tagline: 'Linear prismatic distortion for curating backlit barware',
      texture: 'Vertical Reeded Flutes',
      origin: 'Architectural Float Glass',
      finish: 'Low-Iron High Clarity',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85',
      swatch: '#7F8C8D',
    },
    {
      id: 'metal-champagne-bronze',
      name: 'Champagne Brushed Bronze',
      category: 'METAL',
      tagline: 'Laser-machined profiles for handleless Gola channels',
      texture: 'Micro-Directional Brushed Satin',
      origin: 'Architectural Anodized Aluminum',
      finish: 'Anti-Oxidation Anodized',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
      swatch: '#8A725B',
    },
    {
      id: 'metal-titanium-gunmetal',
      name: 'Titanium Gunmetal',
      category: 'METAL',
      tagline: 'Deep satin grey with zero corrosion under coastal humidity',
      texture: 'Fine Sandblasted & Anodized',
      origin: 'Aerospace Grade Alloy',
      finish: 'Satin Nero Anodized',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1000&q=85',
      swatch: '#4A5568',
    },
    {
      id: 'laminates-nano-matte',
      name: 'Anti-Fingerprint Nano Matte',
      category: 'LAMINATES',
      tagline: 'Next-generation thermal healing surface with velvet touch',
      texture: 'Ultra-Soft Opaque Touch',
      origin: 'High-Pressure Thermal Polymer',
      finish: 'Zero Light Reflection Matte',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
      swatch: '#2D3748',
    },
    {
      id: 'laminates-warm-travertine',
      name: 'Textured Travertine Laminate',
      category: 'LAMINATES',
      tagline: 'Authentic stone texture bonded under 150-ton hydraulic press',
      texture: 'Tactile Stone Pore Synchronized',
      origin: 'Synchronized Surface Polymer',
      finish: 'Structured Matte Mineral',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85',
      swatch: '#D3C5B4',
    },
    {
      id: 'acrylic-mirror-gloss',
      name: 'Mirror High-Gloss Acrylic',
      category: 'ACRYLIC',
      tagline: 'Pure optical depth with seamless PUR laser edge-banding',
      texture: 'Mirror-Reflective Flatness',
      origin: 'Pure Optical Grade Acrylic',
      finish: '95+ Gloss UV Cured',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85',
      swatch: '#EDF2F7',
    },
    {
      id: 'textures-italian-leather',
      name: 'Hand-Stitched Italian Leather',
      category: 'TEXTURES',
      tagline: 'Supple full-grain leather for watch trays and drawer bottoms',
      texture: 'Supple Pebble Grain',
      origin: 'Tuscan Tanned Leather',
      finish: 'Waxed Water-Repellent',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
      swatch: '#8C6239',
    },
    {
      id: 'textures-acoustic-linen',
      name: 'Acoustic Woven Linen',
      category: 'TEXTURES',
      tagline: 'Sound-dampening textured panels for wardrobe interior bays',
      texture: 'Organic Cross-Hatch Weave',
      origin: 'Natural Flax Fibre Blend',
      finish: 'Anti-Static & Stain-Resistant',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=85',
      swatch: '#C2B8A3',
    },
    {
      id: 'hardware-blum-legrabox',
      name: 'Blum Legrabox Glass Running Gear',
      category: 'HARDWARE',
      tagline: 'Concealed full-extension runners rated for 100,000 cycles under 70kg load',
      texture: 'Precision Steel & Smoked Glass',
      origin: 'Blum Austria Certified',
      finish: 'Orion Grey & Stainless Steel',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
      swatch: '#718096',
    },
    {
      id: 'hardware-servo-drive',
      name: 'Servo-Drive Electronic Push-to-Open',
      category: 'HARDWARE',
      tagline: 'Effortless motorized opening for handleless refrigerators and waste drawers',
      texture: 'Motorized Electric Actuators',
      origin: 'Blum Austria Certified',
      finish: 'Concealed Integrated Drive',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1000&q=85',
      swatch: '#4A5568',
    },
    {
      id: 'hardware-sensor-led',
      name: '3000K Diffused Sensor LED Channel',
      category: 'HARDWARE',
      tagline: 'Integrated micro-diffused light channels with 95+ CRI true color rendering',
      texture: 'Micro-Frosted Acrylic Diffuser',
      origin: 'Architectural Grade 24V LED',
      finish: '3000K Warm Ambient Glow',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85',
      swatch: '#8A725B',
    },
  ];

  const filteredMaterials = materialsData.filter((m) => {
    if (activeCategory === 'ALL') return true;
    return m.category === activeCategory;
  });

  /* =========================================================================
     "CHOOSE YOUR FINISH" COMBINATION EXPLORER
     ========================================================================= */
  const comboOptions = {
    cabinets: [
      { name: 'Smoked European Oak', color: '#5A4633' },
      { name: 'Velvet Matte Nero', color: '#262522' },
      { name: 'Warm Ivory Satin Lacquer', color: '#F7F4EE' },
      { name: 'Fluted Acoustic Walnut', color: '#6E4D34' },
    ],
    countertops: [
      { name: 'Taj Mahal Sintered Quartzite', color: '#D5CDBE' },
      { name: 'Nero Marquina Stone', color: '#262522' },
      { name: 'Calacatta Gold Vein', color: '#F7F5F1' },
    ],
    handles: [
      { name: 'Champagne Brushed Bronze', color: '#8A725B' },
      { name: 'Titanium Gunmetal Profile', color: '#4A5568' },
      { name: 'Handleless 45° Miter', color: '#262522' },
    ],
    interiors: [
      { name: 'Tuscan Leather & Velvet', color: '#8C6239' },
      { name: 'Antibacterial Orion Grey', color: '#718096' },
      { name: 'Smoked Oak Veneer', color: '#5A4633' },
    ],
  };

  const [selectedCabinet, setSelectedCabinet] = useState(comboOptions.cabinets[0]);
  const [selectedCountertop, setSelectedCountertop] = useState(comboOptions.countertops[0]);
  const [selectedHandle, setSelectedHandle] = useState(comboOptions.handles[0]);
  const [selectedInterior, setSelectedInterior] = useState(comboOptions.interiors[0]);

  return (
    <div style={{ backgroundColor: '#F7F4EE', color: '#262522', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            UNIVERSAL HERO SECTION: LEOZ / MATERIALS & FINISHES
            ========================================================================= */}
        <UniversalHero
          image="/Italian Marble.webp"
          imageAlt="LEOZ Sintered Quartzite Stone and Natural Woods Materiality"
          imagePosition="center 50%"
          eyebrow="LEOZ / MATERIALS & FINISHES"
          headline="Every Surface Tells a Story."
          supportingText="A curated digital material library of sintered stones, smoked European woods and anodized metals."
          ctaText="Explore Materials →"
          ctaHref="#materials-archive"
          brightness={0.88}
        />

        {/* =========================================================================
            SECTION 01: INTERACTIVE CATEGORY FILTER WALL
            ========================================================================= */}
        <section
          aria-label="Material Categories Filter"
          style={{
            paddingTop: 'clamp(24px, 3.5vw, 36px)',
            paddingBottom: 'clamp(24px, 3.5vw, 36px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            borderBottom: '1px solid #E5DED2',
            backgroundColor: '#F7F4EE',
            position: 'sticky',
            top: '70px',
            zIndex: 30,
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '9px 18px',
                  backgroundColor: activeCategory === cat ? '#262522' : '#FFFFFF',
                  color: activeCategory === cat ? '#F7F4EE' : '#262522',
                  border: `1px solid ${activeCategory === cat ? '#262522' : '#D5CDBE'}`,
                  borderRadius: '2px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: THE INTERACTIVE MATERIAL WALL (WARM BACKGROUND WITH CRISP CARDS)
            ========================================================================= */}
        <section
          aria-label="Material Wall"
          style={{
            paddingTop: 'clamp(50px, 7vw, 90px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#EEE9E0',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <motion.div
              layout
              className="leoz-material-wall-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              <AnimatePresence>
                {filteredMaterials.map((item, idx) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.05, ease: luxuryEase }}
                    className="leoz-material-card"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #D5CDBE',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                      transition: 'all 0.35s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#8A725B';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 16px 36px rgba(138, 114, 91, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#D5CDBE';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)';
                    }}
                  >
                    {/* Material Macro Photo */}
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 0.88', overflow: 'hidden', backgroundColor: '#E5DED2' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="material-card-img"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          padding: '4px 10px',
                          backgroundColor: 'rgba(38, 37, 34, 0.88)',
                          backdropFilter: 'blur(8px)',
                          color: '#F7F4EE',
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
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: item.swatch,
                          border: '2px solid #FFFFFF',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        }}
                      />
                    </div>

                    {/* Material Content */}
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '20px',
                          fontWeight: 400,
                          color: '#262522',
                          margin: '0 0 6px 0',
                        }}
                      >
                        {item.name}
                      </h3>

                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11.5px',
                          color: '#8A725B',
                          fontWeight: 600,
                          display: 'block',
                          marginBottom: '10px',
                        }}
                      >
                        {item.tagline}
                      </span>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          paddingTop: '12px',
                          borderTop: '1px solid #E5DED2',
                          fontSize: '11px',
                          fontFamily: 'var(--font-body)',
                          color: '#66635D',
                        }}
                      >
                        <div>
                          <strong style={{ color: '#262522' }}>TEXTURE:</strong> {item.texture}
                        </div>
                        <div>
                          <strong style={{ color: '#262522' }}>PROVENANCE:</strong> {item.origin}
                        </div>
                        <div>
                          <strong style={{ color: '#262522' }}>FINISH:</strong> {item.finish}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: "CHOOSE YOUR FINISH" COMBINATION EXPLORER (WARM STONE PALETTE)
            ========================================================================= */}
        <section
          id="combination-explorer"
          aria-label="Combination Explorer"
          style={{
            backgroundColor: '#E5DED2',
            color: '#262522',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            borderTop: '1px solid #D5CDBE',
            borderBottom: '1px solid #D5CDBE',
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
                  color: '#8A725B',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                INTERACTIVE HARMONY
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.8vw, 46px)',
                  fontWeight: 300,
                  color: '#262522',
                  margin: '0 0 14px 0',
                }}
              >
                Choose Your Finish
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: '#66635D',
                  maxWidth: '640px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                Mix and match primary cabinetry, monolith stone countertops, metallic Gola handles, and internal textures.
              </p>
            </div>

            {/* Combination Explorer Split Panel */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: 'clamp(32px, 5vw, 56px)',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '4px',
                border: '1px solid #D5CDBE',
                padding: 'clamp(24px, 4.5vw, 48px)',
                boxShadow: '0 8px 28px rgba(0,0,0,0.04)',
              }}
              className="leoz-combo-split"
            >
              {/* Left Column: Visual Swatch Palette */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {/* Cabinet Preview Box */}
                  <div
                    style={{
                      padding: '20px',
                      backgroundColor: '#F7F4EE',
                      border: '1px solid #E5DED2',
                      borderRadius: '3px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: selectedCabinet.color }} />
                      <span style={{ fontSize: '10px', color: '#8A725B', letterSpacing: '0.15em', fontWeight: 600 }}>
                        PRIMARY CABINET
                      </span>
                    </div>
                    <strong style={{ fontSize: '15px', color: '#262522' }}>{selectedCabinet.name}</strong>
                  </div>

                  {/* Countertop Preview Box */}
                  <div
                    style={{
                      padding: '20px',
                      backgroundColor: '#F7F4EE',
                      border: '1px solid #E5DED2',
                      borderRadius: '3px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: selectedCountertop.color }} />
                      <span style={{ fontSize: '10px', color: '#8A725B', letterSpacing: '0.15em', fontWeight: 600 }}>
                        MONOLITH TOP
                      </span>
                    </div>
                    <strong style={{ fontSize: '15px', color: '#262522' }}>{selectedCountertop.name}</strong>
                  </div>

                  {/* Handle Preview Box */}
                  <div
                    style={{
                      padding: '20px',
                      backgroundColor: '#F7F4EE',
                      border: '1px solid #E5DED2',
                      borderRadius: '3px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: selectedHandle.color }} />
                      <span style={{ fontSize: '10px', color: '#8A725B', letterSpacing: '0.15em', fontWeight: 600 }}>
                        METALLIC GOLA
                      </span>
                    </div>
                    <strong style={{ fontSize: '15px', color: '#262522' }}>{selectedHandle.name}</strong>
                  </div>

                  {/* Interior Preview Box */}
                  <div
                    style={{
                      padding: '20px',
                      backgroundColor: '#F7F4EE',
                      border: '1px solid #E5DED2',
                      borderRadius: '3px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: selectedInterior.color }} />
                      <span style={{ fontSize: '10px', color: '#8A725B', letterSpacing: '0.15em', fontWeight: 600 }}>
                        DRAWER INTERIOR
                      </span>
                    </div>
                    <strong style={{ fontSize: '15px', color: '#262522' }}>{selectedInterior.name}</strong>
                  </div>
                </div>

                <div
                  style={{
                    padding: '16px',
                    backgroundColor: '#F7F4EE',
                    borderRadius: '2px',
                    border: '1px solid #E5DED2',
                    fontSize: '12px',
                    color: '#66635D',
                    lineHeight: 1.5,
                  }}
                >
                  💡 <strong>Designer Insight:</strong> This palette pairs rich warm textures with high-contrast tactile sintered stone and champagne shadow gaps for high-end residential calm.
                </div>
              </div>

              {/* Right Column: Customizer Selector Pills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* 1. Cabinet Choices */}
                <div>
                  <label style={{ fontSize: '10.5px', color: '#8A725B', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    SELECT CABINET FINISH
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {comboOptions.cabinets.map((opt) => (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setSelectedCabinet(opt)}
                        style={{
                          padding: '7px 14px',
                          backgroundColor: selectedCabinet.name === opt.name ? '#262522' : '#F7F4EE',
                          color: selectedCabinet.name === opt.name ? '#F7F4EE' : '#262522',
                          border: `1px solid ${selectedCabinet.name === opt.name ? '#262522' : '#D5CDBE'}`,
                          borderRadius: '2px',
                          fontSize: '11.5px',
                          cursor: 'pointer',
                        }}
                      >
                        {opt.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Countertop Choices */}
                <div>
                  <label style={{ fontSize: '10.5px', color: '#8A725B', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    SELECT MONOLITH COUNTERTOP
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {comboOptions.countertops.map((opt) => (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setSelectedCountertop(opt)}
                        style={{
                          padding: '7px 14px',
                          backgroundColor: selectedCountertop.name === opt.name ? '#262522' : '#F7F4EE',
                          color: selectedCountertop.name === opt.name ? '#F7F4EE' : '#262522',
                          border: `1px solid ${selectedCountertop.name === opt.name ? '#262522' : '#D5CDBE'}`,
                          borderRadius: '2px',
                          fontSize: '11.5px',
                          cursor: 'pointer',
                        }}
                      >
                        {opt.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Handle Choices */}
                <div>
                  <label style={{ fontSize: '10.5px', color: '#8A725B', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    SELECT PROFILE / GOLA HANDLE
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {comboOptions.handles.map((opt) => (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setSelectedHandle(opt)}
                        style={{
                          padding: '7px 14px',
                          backgroundColor: selectedHandle.name === opt.name ? '#262522' : '#F7F4EE',
                          color: selectedHandle.name === opt.name ? '#F7F4EE' : '#262522',
                          border: `1px solid ${selectedHandle.name === opt.name ? '#262522' : '#D5CDBE'}`,
                          borderRadius: '2px',
                          fontSize: '11.5px',
                          cursor: 'pointer',
                        }}
                      >
                        {opt.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Interior Choices */}
                <div>
                  <label style={{ fontSize: '10.5px', color: '#8A725B', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    SELECT DRAWER INTERIOR
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {comboOptions.interiors.map((opt) => (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setSelectedInterior(opt)}
                        style={{
                          padding: '7px 14px',
                          backgroundColor: selectedInterior.name === opt.name ? '#262522' : '#F7F4EE',
                          color: selectedInterior.name === opt.name ? '#F7F4EE' : '#262522',
                          border: `1px solid ${selectedInterior.name === opt.name ? '#262522' : '#D5CDBE'}`,
                          borderRadius: '2px',
                          fontSize: '11.5px',
                          cursor: 'pointer',
                        }}
                      >
                        {opt.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FINAL SECTION: STRATEGIC DARK CONTRAST CLOSING (10% RATIO)
            ========================================================================= */}
        <section
          aria-label="Book Materials Consultation CTA"
          style={{
            position: 'relative',
            backgroundColor: '#302D28',
            paddingTop: 'clamp(90px, 11vw, 140px)',
            paddingBottom: 'clamp(90px, 11vw, 140px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '780px', margin: '0 auto' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#8A725B',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              TOUCH &amp; FEEL IN PERSON
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(34px, 5.5vw, 64px)',
                fontWeight: 300,
                color: '#F7F4EE',
                lineHeight: 1.08,
                margin: '0 0 20px 0',
                letterSpacing: '0.01em',
              }}
            >
              Ready to Choose
              <br />
              Your Materials?
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14.5px, 1.3vw, 17.5px)',
                color: 'rgba(247, 244, 238, 0.8)',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '620px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Visit our Ahmedabad or Surat experience studios to browse our physical material swatches, sintered monolith slabs, and Italian finishes with our principal designers.
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
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
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

      {/* Responsive Styles */}
      <style>{`
        .leoz-material-card:hover .material-card-img {
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          .leoz-combo-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MaterialsFinishes;
