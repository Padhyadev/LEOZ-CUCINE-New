import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ChevronLeft, ChevronRight, Check, ArrowRight, ShieldCheck, Award, Wrench, Factory, Clock } from 'lucide-react';

/* Easing curve for Italian luxury smoothness */
const luxuryEase = [0.16, 1, 0.3, 1];

export const ModularWardrobes: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Wardrobes | LEOZ Cucine — Italian Luxury Modular Dressing Suites',
    'Explore LEOZ Cucine bespoke luxury walk-in wardrobes, floor-to-ceiling glass closets, smoked oak finishes, and integrated LED internal systems.'
  );

  // RiFRA-style Wardrobe Collections Hero Slider Data
  const wardrobeCollections = [
    {
      id: 'walkin-suite',
      name: 'BOUDOIR WALK-IN SUITE',
      tagline: 'Architectural Dressing Room & Integrated Ambient Illumination',
      desc: 'An immersive private sanctuary. Open structural bays in smoked eucalyptus, fluted glass partitions, and seamless 3000K vertical LED light channels.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=90',
      specs: ['Smoked Eucalyptus Veneer', 'Integrated Vertical LED 3000K', 'Island Jewelry Showcase', 'Soft-Close Velvet Drawers'],
    },
    {
      id: 'glass-monolith',
      name: 'AERO GLASS MONOLITH',
      tagline: 'Floor-to-Ceiling Smoked Bronze Glass & Ultra-Slim Profiles',
      desc: 'Transparent architectural elegance. 2.8m floor-to-ceiling tinted glass doors with concealed pivot hinges and leather-lined accessory trays.',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=2000&q=90',
      specs: ['Bronze Reflective Tempered Glass', 'Micro-Slim Aluminum Framing', 'Concealed Heavy-Duty Pivots', 'Leather Lined Watch Trays'],
    },
    {
      id: 'sliding-flush',
      name: 'CO-PLANAR SLIDING MATRIX',
      tagline: 'Flush Co-Planar Sliding Doors in Matte Nero Lacquer',
      desc: 'Monolithic minimalism when closed, opening effortlessly with motorized co-planar damping systems into an organized luxury wardrobe.',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=2000&q=90',
      specs: ['Co-Planar Flush Sliding Track', 'Thermal Matte Anti-Fingerprint', 'Integrated Pant Pull-Outs', 'Acoustic Soft Dampeners'],
    },
  ];

  const [activeCollection, setActiveCollection] = useState(0);

  const prevCollection = () => {
    setActiveCollection((prev) => (prev > 0 ? prev - 1 : wardrobeCollections.length - 1));
  };

  const nextCollection = () => {
    setActiveCollection((prev) => (prev < wardrobeCollections.length - 1 ? prev + 1 : 0));
  };

  // Wardrobe Typologies (5 Distinct Architectural Typologies)
  const typologies = [
    {
      id: 'walk-in',
      title: 'Walk-In Dressing Suites',
      subtitle: 'SANCTUARY STORAGE',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
      desc: 'Dedicated open-concept dressing rooms with custom central island showcases, vanity desks, and complete accessory zoning.',
    },
    {
      id: 'glass-doors',
      title: 'Glass Door Closets',
      subtitle: 'CONTEMPORARY TRANSPARENCY',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=85',
      desc: 'Smoked, fluted, and tinted glass doors framed with micro-anodized profiles and back-lit shelf illumination.',
    },
    {
      id: 'hinged-full',
      title: 'Hinged Monoliths',
      subtitle: 'CLASSIC FULL ACCESS',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1000&q=85',
      desc: 'Floor-to-ceiling seamless hinged panels offering total 180° uninterrupted visibility and complete interior access.',
    },
    {
      id: 'sliding-co-planar',
      title: 'Sliding Systems',
      subtitle: 'SPACE-OPTIMIZED FLOW',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85',
      desc: 'High-load concealed German sliding gear engineered for effortless silent gliding across wide bedroom layouts.',
    },
  ];

  // Finishes Showcase
  const finishes = [
    {
      name: 'Smoked Oak & Fluted Veneer',
      category: 'Back Panels & Structural Uprights',
      desc: 'Deep textured natural wood veneers treated for India’s climate, adding warmth and tactile richness to luxury dressing suites.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    },
    {
      name: 'Anti-Fingerprint Satin Lacquers',
      category: 'Front Doors & Floating Drawers',
      desc: 'Ultra-matte silky finishes cured under UV light to resist dust, oils, and scratches while maintaining deep color richness.',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
    },
    {
      name: 'Smoked Bronze Glass & Aluminum',
      category: 'Transparent Facades & Vitrines',
      desc: 'Italian engineered slimline profiles in champagne, nero, and bronze with safety tempered architectural glass.',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=85',
    },
    {
      name: 'Handcrafted Leather & Suede Trays',
      category: 'Internal Organizers & Jewelry Drawers',
      desc: 'Precision stitched leather compartments for timepieces, fine jewelry, sunglasses, and curated wardrobe accessories.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
    },
  ];

  const [selectedFinish, setSelectedFinish] = useState(0);

  // Process Steps
  const processSteps = [
    { step: '01', title: 'Wardrobe Audit & Space Planning', desc: 'Detailed cataloguing of your garments, shoes, and luxury accessories to map precise vertical dimensions.' },
    { step: '02', title: '3D Photorealistic Dressing Suite Render', desc: 'Custom 3D CAD modeling with real interior lighting simulations and material accuracy.' },
    { step: '03', title: 'Custom Organization Curation', desc: 'Selecting velvet jewelry trays, pull-out trouser racks, sensor lighting, and glass shelf tiers.' },
    { step: '04', title: 'Precision In-House Manufacturing', desc: 'Direct CNC milling at our Ahmedabad factory utilizing 100% moisture-resistant carcasses.' },
    { step: '05', title: 'Seamless White-Glove Installation', desc: 'Executed directly by certified LEOZ technicians with precise leveling and zero dust handover.' },
    { step: '06', title: '10-Year Comprehensive Warranty', desc: 'Uncompromised long-term assurance covering sliding rollers, hinges, and structural panels.' },
  ];

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            SECTION 1: RiFRA FULL-BLEED EDITORIAL HERO SLIDER
            ========================================================================= */}
        <section
          aria-label="LEOZ Wardrobe Collections Hero"
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            minHeight: '620px',
            backgroundColor: '#000000',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={wardrobeCollections[activeCollection].id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: luxuryEase }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url("${encodeURI(wardrobeCollections[activeCollection].image)}")`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            >
              {/* Dark Gradient Overlay for RiFRA readability */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 100%)',
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Hero Content Overlay */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '1440px',
              height: '100%',
              margin: '0 auto',
              paddingLeft: '5.5vw',
              paddingRight: '5.5vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              paddingBottom: 'clamp(40px, 6vh, 70px)',
            }}
          >
            <div style={{ maxWidth: '800px' }}>
              <motion.span
                key={`cat-${activeCollection}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: luxuryEase }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11.5px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#B69A6B',
                  marginBottom: '12px',
                  fontWeight: 600,
                }}
              >
                LEOZ CUCINE — WARDROBE SUITES
              </motion.span>

              <motion.h1
                key={`name-${activeCollection}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(32px, 5vw, 64px)',
                  fontWeight: 300,
                  lineHeight: 1.08,
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  margin: '0 0 16px 0',
                }}
              >
                {wardrobeCollections[activeCollection].name}
              </motion.h1>

              <motion.p
                key={`desc-${activeCollection}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(14px, 1.2vw, 17px)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.6,
                  maxWidth: '640px',
                  marginBottom: '28px',
                }}
              >
                {wardrobeCollections[activeCollection].desc}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                key={`act-${activeCollection}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: luxuryEase }}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}
              >
                <a
                  href="/talk-to-us"
                  onClick={(e) => navigate(e, '/talk-to-us')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#B69A6B';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#000000';
                  }}
                >
                  <span>Book Wardrobe Consultation</span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href="#wardrobe-breakdown"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 24px',
                    backgroundColor: 'transparent',
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
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Explore Typologies
                </a>
              </motion.div>
            </div>

            {/* Slider Navigation Controls */}
            <div
              style={{
                position: 'absolute',
                right: '5.5vw',
                bottom: 'clamp(40px, 6vh, 70px)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 20,
              }}
            >
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', marginRight: '8px' }}>
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>0{activeCollection + 1}</span> / 0{wardrobeCollections.length}
              </div>
              <button
                type="button"
                onClick={prevCollection}
                aria-label="Previous Slide"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={nextCollection}
                aria-label="Next Slide"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: RiFRA PHILOSOPHY / ARCHITECTURAL DRESSING ROOMS
            ========================================================================= */}
        <section
          id="philosophy"
          style={{
            backgroundColor: '#0A0A0A',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div
              className="rifra-dual-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(40px, 7vw, 100px)',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Editorial Photo Frame */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
                style={{
                  position: 'relative',
                  aspectRatio: '1 / 1.15',
                  overflow: 'hidden',
                  borderRadius: '3px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=85"
                  alt="LEOZ Architectural Glass Wardrobe Suite"
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
                    bottom: '24px',
                    left: '24px',
                    padding: '12px 18px',
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11.5px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  Floor-To-Ceiling Vitrine Integration
                </div>
              </motion.div>

              {/* Right Column: Architectural Typography */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#B69A6B',
                    display: 'block',
                    marginBottom: '16px',
                    fontWeight: 600,
                  }}
                >
                  BESPOKE DRESSING SANCTUARIES
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 3.5vw, 44px)',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    color: '#FFFFFF',
                    margin: '0 0 24px 0',
                  }}
                >
                  More Than Storage — A Considered Part of Your Home.
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.8,
                    marginBottom: '20px',
                  }}
                >
                  A wardrobe should be conceived as an architectural experience that elevates your daily routine. At LEOZ Cucine, we craft dressing suites around the subtle nuances of your space and personal lifestyle.
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.8,
                    marginBottom: '36px',
                  }}
                >
                  From concealed silent German running gear to velvet-lined watch displays and moisture-resistant internal cores, every element is manufactured directly in our factory.
                </p>

                {/* Key Attributes Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '18px',
                  }}
                >
                  {[
                    'Concealed German soft-dampeners',
                    'Acoustic felt & velvet organization',
                    'Floor-to-ceiling seamless heights',
                    '3000K diffused LED profiles',
                  ].map((feature) => (
                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(182, 154, 107, 0.15)',
                          color: '#B69A6B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: WARDROBE TYPOLOGIES (RiFRA 4-COLUMN CARDS)
            ========================================================================= */}
        <section
          id="wardrobe-breakdown"
          style={{
            backgroundColor: '#000000',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#B69A6B',
                  display: 'block',
                  marginBottom: '14px',
                  fontWeight: 600,
                }}
              >
                ARCHITECTURAL CONFIGURATIONS
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(30px, 3.8vw, 48px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                Find Your Wardrobe Typology.
              </h2>
            </div>

            <div
              className="rifra-4col-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
              }}
            >
              {typologies.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: idx * 0.12, ease: luxuryEase }}
                  style={{
                    backgroundColor: '#0D0D0D',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(182, 154, 107, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1.15', overflow: 'hidden' }}>
                    <img
                      src={card.image}
                      alt={card.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.85) 100%)',
                      }}
                    />
                  </div>

                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        color: '#B69A6B',
                        marginBottom: '8px',
                        fontWeight: 600,
                      }}
                    >
                      {card.subtitle}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '20px',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        margin: '0 0 10px 0',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: 'rgba(255, 255, 255, 0.65)',
                        lineHeight: 1.6,
                        margin: '0 0 20px 0',
                        flexGrow: 1,
                      }}
                    >
                      {card.desc}
                    </p>

                    <a
                      href="/talk-to-us"
                      onClick={(e) => navigate(e, '/talk-to-us')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        fontSize: '11.5px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        fontWeight: 500,
                        transition: 'color 0.25s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#B69A6B')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    >
                      <span>Plan This Layout</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: RiFRA-STYLE MATERIALS & INTERNAL ACCESSORIES SELECTOR
            ========================================================================= */}
        <section
          id="materials"
          style={{
            backgroundColor: '#0A0A0A',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#B69A6B',
                  display: 'block',
                  marginBottom: '14px',
                  fontWeight: 600,
                }}
              >
                LUXURY TOUCHPOINTS
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(30px, 3.8vw, 48px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: '0 0 16px 0',
                }}
              >
                Finishes &amp; Internal Architecture.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                From tactile fluted woods to suede accessory dividers, tailored to perfection.
              </p>
            </div>

            {/* Material Tabs */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '40px',
              }}
            >
              {finishes.map((mat, idx) => (
                <button
                  key={mat.name}
                  type="button"
                  onClick={() => setSelectedFinish(idx)}
                  style={{
                    padding: '10px 22px',
                    backgroundColor: selectedFinish === idx ? '#FFFFFF' : 'transparent',
                    color: selectedFinish === idx ? '#000000' : 'rgba(255, 255, 255, 0.6)',
                    border: `1px solid ${selectedFinish === idx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.15)'}`,
                    borderRadius: '2px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {mat.name.split('&')[0]}
                </button>
              ))}
            </div>

            {/* Active Material Feature Frame */}
            <div
              className="rifra-dual-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: 'clamp(32px, 5vw, 64px)',
                alignItems: 'center',
                backgroundColor: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: 'clamp(24px, 4vw, 48px)',
                borderRadius: '2px',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`fin-img-${selectedFinish}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: luxuryEase }}
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    borderRadius: '2px',
                  }}
                >
                  <img
                    src={finishes[selectedFinish].image}
                    alt={finishes[selectedFinish].name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>
              </AnimatePresence>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#B69A6B',
                    display: 'block',
                    marginBottom: '10px',
                    fontWeight: 600,
                  }}
                >
                  {finishes[selectedFinish].category}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(24px, 2.8vw, 36px)',
                    fontWeight: 300,
                    color: '#FFFFFF',
                    margin: '0 0 16px 0',
                  }}
                >
                  {finishes[selectedFinish].name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: 1.75,
                    marginBottom: '28px',
                  }}
                >
                  {finishes[selectedFinish].desc}
                </p>

                <a
                  href="/contact"
                  onClick={(e) => navigate(e, '/contact')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11.5px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#FFFFFF';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#000000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  <span>Request Wardrobe Finish Swatches</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: THE LEOZ METHOD / WARDROBE PROCESS
            ========================================================================= */}
        <section
          id="method"
          style={{
            backgroundColor: '#000000',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#B69A6B',
                  display: 'block',
                  marginBottom: '14px',
                  fontWeight: 600,
                }}
              >
                THE LEOZ METHOD
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(30px, 3.8vw, 48px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                Wardrobe Commissioning Timeline.
              </h2>
            </div>

            <div
              className="rifra-process-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '32px',
              }}
            >
              {processSteps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: luxuryEase }}
                  style={{
                    backgroundColor: '#0D0D0D',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: 'clamp(28px, 3.5vw, 40px)',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '2px',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '36px',
                      fontWeight: 300,
                      color: 'rgba(182, 154, 107, 0.6)',
                      display: 'block',
                      marginBottom: '16px',
                      lineHeight: 1,
                    }}
                  >
                    {step.step}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '19px',
                      fontWeight: 400,
                      color: '#FFFFFF',
                      margin: '0 0 12px 0',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: WHY LEOZ WARDROBES STAND APART
            ========================================================================= */}
        <section
          style={{
            backgroundColor: '#0A0A0A',
            paddingTop: 'clamp(80px, 10vw, 120px)',
            paddingBottom: 'clamp(80px, 10vw, 120px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 70px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#B69A6B',
                  display: 'block',
                  marginBottom: '14px',
                  fontWeight: 600,
                }}
              >
                UNCOMPROMISED STANDARDS
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                Why LEOZ Wardrobes Stand Apart.
              </h2>
            </div>

            <div
              className="rifra-5col-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '20px',
              }}
            >
              {[
                { icon: Factory, title: 'In-House Production', desc: 'Crafted entirely at our own factory — zero outsourced components.' },
                { icon: Award, title: 'German Sliders', desc: 'Concealed heavy-duty rolling mechanisms with micro dampeners.' },
                { icon: Clock, title: '20+ Years Legacy', desc: 'Decades of master bespoke residential carpentry.' },
                { icon: ShieldCheck, title: '10-Yr Guarantee', desc: 'Complete warranty on runners, hinges, and carcass stability.' },
                { icon: Wrench, title: 'Certified Installers', desc: 'White-glove installation by trained in-house craftsmen.' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: luxuryEase }}
                    style={{
                      backgroundColor: '#000000',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '28px 20px',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderRadius: '2px',
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(182, 154, 107, 0.1)',
                        color: '#B69A6B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '17px',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12.5px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        lineHeight: 1.55,
                        margin: 0,
                      }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: RiFRA CINEMATIC CTA / CONSULTATION INVITATION
            ========================================================================= */}
        <section
          style={{
            position: 'relative',
            backgroundColor: '#000000',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=85)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              opacity: 0.18,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.6) 0%, #000000 90%)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '760px', margin: '0 auto' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#B69A6B',
                display: 'block',
                marginBottom: '16px',
                fontWeight: 600,
              }}
            >
              BESPOKE BEDROOM SUITES
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 300,
                color: '#FFFFFF',
                lineHeight: 1.12,
                margin: '0 0 20px 0',
              }}
            >
              Ready to Design Your Dream Wardrobe?
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.2vw, 17px)',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.7,
                marginBottom: '36px',
              }}
            >
              Visit our Ahmedabad Flagship Experience Studio or schedule a personal wardrobe planning session with our architects.
            </p>

            <a
              href="/talk-to-us"
              onClick={(e) => navigate(e, '/talk-to-us')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 36px',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#B69A6B';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#000000';
              }}
            >
              <span>Book Private Wardrobe Consultation</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Responsive Breakpoints CSS */}
      <style>{`
        @media (max-width: 1024px) {
          .rifra-dual-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .rifra-4col-grid, .rifra-process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .rifra-5col-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .rifra-4col-grid, .rifra-process-grid, .rifra-5col-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ModularWardrobes;
