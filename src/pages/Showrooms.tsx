import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Compass,
  Sparkles,
  Layers,
  Award,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const Showrooms: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Showrooms & Experience Studios | LEOZ Cucine — Ahmedabad & Surat',
    'Visit LEOZ luxury experience studios in Ahmedabad and Surat. Touch authentic materials, experience German hardware, and consult with principal designers.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  /* Showrooms Location Data */
  const showroomLocations = [
    {
      city: 'AHMEDABAD',
      name: 'Ahmedabad Flagship Experience Studio',
      tagline: 'Flagship Architectural Gallery & Materials Lab',
      address: 'Near Sindhu Bhavan Road & Bodakdev, Ahmedabad, Gujarat 380054',
      phone: '+91 93131 51559',
      email: 'director@leozartofambience.com',
      timings: 'Monday to Saturday: 10:00 AM – 7:30 PM (Private Appointments Recommended)',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      focalPosition: 'center 42%',
      mapsUrl: 'https://maps.google.com/?q=LEOZ+Cucine+Ahmedabad',
      features: ['Full-Scale Monolith Kitchens', 'Master Walk-In Dressing Suites', 'Tactile Materials Bar'],
    },
    {
      city: 'SURAT',
      name: 'Surat Architectural Experience Studio',
      tagline: 'Contemporary Living Studio & Joinery Suite',
      address: 'Dumas Road & VIP Road Junction, Vesu, Surat, Gujarat 395007',
      phone: '+91 93131 51559',
      email: 'director@leozartofambience.com',
      timings: 'Monday to Saturday: 10:00 AM – 7:30 PM (Private Appointments Recommended)',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
      focalPosition: 'center 45%',
      mapsUrl: 'https://maps.google.com/?q=LEOZ+Cucine+Surat',
      features: ['Co-Planar Sliding Wardrobes', 'Integrated Wine Lounge Bar', '1-on-1 Designer Consultations'],
    },
  ];

  /* "What You'll Experience" 6 Elements */
  const experienceElements = [
    {
      title: 'Explore Kitchens',
      category: '01 / FULL-SCALE ARCHITECTURE',
      desc: 'Step into fully functional monolith islands with 45-degree mitered stone countertops and handleless Gola profiles.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Explore Wardrobes',
      category: '02 / DRESSING SUITES',
      desc: 'Experience 3.0m floor-to-ceiling smoked glass vitrines, co-planar sliding tracks, and illuminated accessory islands.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Touch Materials',
      category: '03 / TACTILE PALETTE',
      desc: 'Inspect genuine sintered quartzite, open-pore smoked European oak, velvet anti-fingerprint lacquers, and metals.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Understand Hardware',
      category: '04 / GERMAN MOTION',
      desc: 'Feel the whisper-quiet glide of Blum Servo-Drive electronic drawers and concealed heavy-duty rolling systems.',
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Meet Designers',
      category: '05 / PRINCIPAL ARCHITECTS',
      desc: 'Sit down with our senior spatial planners and interior architects to analyze your floor plans and lighting orientations.',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Discuss Your Project',
      category: '06 / BESPOKE ESTIMATION',
      desc: 'Receive tailored budget scoping, 3D CAD visualization previews, and turnkey manufacturing timelines for your home.',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=85',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FAF9F6', color: '#161514', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO: "EXPERIENCE LEOZ, IN PERSON."
            ========================================================================= */}
        <section
          aria-label="Showrooms Hero"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 'clamp(560px, 82vh, 740px)',
            display: 'flex',
            alignItems: 'flex-end',
            backgroundColor: '#161514',
            overflow: 'hidden',
          }}
        >
          {/* Dedicated Studio Image Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90)',
              backgroundPosition: 'center 42%',
              backgroundSize: 'cover',
            }}
          />

          {/* Soft Scrim */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(22, 21, 20, 0.25) 0%, rgba(22, 21, 20, 0.4) 40%, rgba(22, 21, 20, 0.92) 95%)',
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
                FLAGSHIP EXPERIENCE STUDIOS • AHMEDABAD &amp; SURAT
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
                Experience LEOZ,
                <br />
                In Person.
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
                  marginBottom: '28px',
                }}
              >
                Photographs can reveal design, but true luxury must be touched. Feel the weight of mitered stone, the silent glide of German hardware, and the warmth of smoked European timber.
              </motion.p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 01: TWO MAJOR LOCATION CARDS (AHMEDABAD & SURAT)
            ========================================================================= */}
        <section
          aria-label="Showroom Locations"
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
                OUR PHYSICAL DESTINATIONS
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
                Experience Studios
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
                Located in prime architectural hubs in Ahmedabad and Surat, designed for private consultations.
              </p>
            </div>

            {/* Location Cards (2 Columns) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '36px',
              }}
            >
              {showroomLocations.map((loc, idx) => (
                <motion.div
                  key={loc.city}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: luxuryEase }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(22, 21, 20, 0.08)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                    transition: 'all 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(182, 154, 107, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(22, 21, 20, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.04)';
                  }}
                >
                  {/* Studio Image */}
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden' }}>
                    <img
                      src={loc.image}
                      alt={loc.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: loc.focalPosition,
                        display: 'block',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        padding: '6px 14px',
                        backgroundColor: 'rgba(22, 21, 20, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: '#B69A6B',
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        borderRadius: '2px',
                      }}
                    >
                      {loc.city}
                    </div>
                  </div>

                  {/* Studio Information */}
                  <div style={{ padding: 'clamp(24px, 4vw, 36px)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
                      {loc.tagline}
                    </span>

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '24px',
                        fontWeight: 400,
                        color: '#161514',
                        margin: '0 0 16px 0',
                      }}
                    >
                      {loc.name}
                    </h3>

                    {/* Address, Timings & Phone */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <MapPin size={16} style={{ color: '#B69A6B', flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '13.5px', color: 'rgba(22, 21, 20, 0.75)', lineHeight: 1.5 }}>
                          {loc.address}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Clock size={16} style={{ color: '#B69A6B', flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '13px', color: 'rgba(22, 21, 20, 0.75)', lineHeight: 1.5 }}>
                          {loc.timings}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Phone size={16} style={{ color: '#B69A6B', flexShrink: 0, marginTop: '3px' }} />
                        <a
                          href={`tel:${loc.phone.replace(/\s+/g, '')}`}
                          style={{ fontSize: '13.5px', color: '#161514', fontWeight: 600, textDecoration: 'none' }}
                        >
                          {loc.phone}
                        </a>
                      </div>
                    </div>

                    {/* Studio Highlights */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                      {loc.features.map((f) => (
                        <span
                          key={f}
                          style={{
                            padding: '4px 10px',
                            backgroundColor: 'rgba(22, 21, 20, 0.04)',
                            border: '1px solid rgba(22, 21, 20, 0.08)',
                            borderRadius: '2px',
                            fontSize: '11px',
                            color: '#716B61',
                          }}
                        >
                          ✓ {f}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <a
                        href={loc.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 22px',
                          backgroundColor: 'transparent',
                          color: '#161514',
                          border: '1px solid rgba(22, 21, 20, 0.2)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          borderRadius: '2px',
                          transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#161514';
                          e.currentTarget.style.backgroundColor = 'rgba(22, 21, 20, 0.04)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(22, 21, 20, 0.2)';
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <span>Get Directions</span>
                        <MapPin size={13} />
                      </a>

                      <a
                        href="/talk-to-us"
                        onClick={(e) => navigate(e, '/talk-to-us')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 24px',
                          backgroundColor: '#B69A6B',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          borderRadius: '2px',
                          transition: 'all 0.25s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#9F8255')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#B69A6B')}
                      >
                        <span>Book a Visit</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: "WHAT YOU'LL EXPERIENCE" (6 IMMERSIVE TOUCHPOINTS)
            ========================================================================= */}
        <section
          aria-label="What You'll Experience"
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
                THE STUDIO IMMERSION
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
                What You’ll Experience
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
                A sensory journey through scale, ergonomics, authentic European materials, and architectural consultation.
              </p>
            </div>

            {/* 6 Grid Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {experienceElements.map((item, idx) => (
                <motion.div
                  key={item.title}
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
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                        letterSpacing: '0.12em',
                        borderRadius: '2px',
                      }}
                    >
                      {item.category}
                    </div>
                  </div>

                  <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '20px',
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
                        fontSize: '13px',
                        color: 'rgba(255, 255, 255, 0.68)',
                        lineHeight: 1.6,
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
            FINAL SECTION: "COME SEE THE DIFFERENCE."
            ========================================================================= */}
        <section
          aria-label="Book Showroom Visit Final CTA"
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
              backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85)',
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
              PRIVATE ARCHITECTURAL APPOINTMENTS
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
              Come See The Difference.
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
              Schedule a dedicated walk-through with our senior architects in Ahmedabad or Surat to experience luxury cabinetry firsthand.
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
              <span>Book a Showroom Visit</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Showrooms;
