import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  MapPin,
  Calendar,
  Compass,
  Cpu,
  Award,
  Sparkles,
  Layers,
  Factory,
  CheckCircle2,
} from 'lucide-react';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'About LEOZ | Emotional Brand Story & Architectural Heritage',
    'Discover the story of LEOZ Cucine. Where German precision engineering, Indian architectural warmth, and in-house manufacturing unite to create spaces designed around you.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  /* =========================================================================
     4 PILLARS: THE LEOZ DIFFERENCE
     ========================================================================= */
  const leozPillars = [
    {
      code: 'PILLAR / 01',
      title: 'DESIGN',
      desc: 'Architectural proportion, spatial harmony, and considered minimalism where every line serves an intentional purpose.',
      icon: Compass,
      highlights: 'Spatial Harmony • Monolithic Balance',
    },
    {
      code: 'PILLAR / 02',
      title: 'PRECISION',
      desc: '0.1mm micro-tolerance automated machining and 5-axis CNC routing that eliminate manual carpentry deviations.',
      icon: Cpu,
      highlights: '0.1mm Tolerance • German Hardware',
    },
    {
      code: 'PILLAR / 03',
      title: 'CRAFT',
      desc: 'Master hand-finishing, robotically cured Italian lacquers, and hand-stitched leather organizers tailored to perfection.',
      icon: Award,
      highlights: 'Hand-Rubbed Lacquers • Tactile Wood',
    },
    {
      code: 'PILLAR / 04',
      title: 'SERVICE',
      desc: 'Direct white-glove turnkey installation by in-house master fitters backed by an uncompromised 10-year written warranty.',
      icon: Sparkles,
      highlights: 'Turnkey Handover • 10-Yr Guarantee',
    },
  ];

  /* =========================================================================
     SHOWROOMS DATA
     ========================================================================= */
  const showrooms = [
    {
      city: 'AHMEDABAD',
      title: 'Ahmedabad Flagship Experience Studio',
      address: 'Near Sindhu Bhavan Road & Bodakdev, Ahmedabad, Gujarat 380054',
      phone: '+91 93131 51559',
      hours: 'Mon – Sat: 10:00 AM – 7:30 PM (By Appointment)',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      mapsUrl: 'https://maps.google.com/?q=LEOZ+Cucine+Ahmedabad',
    },
    {
      city: 'SURAT',
      title: 'Surat Architectural Experience Studio',
      address: 'Dumas Road & VIP Road Junction, Vesu, Surat, Gujarat 395007',
      phone: '+91 93131 51559',
      hours: 'Mon – Sat: 10:00 AM – 7:30 PM (By Appointment)',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      mapsUrl: 'https://maps.google.com/?q=LEOZ+Cucine+Surat',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FAF9F6', color: '#161514', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO: "WE BELIEVE A HOME SHOULD FEEL LIKE YOU."
            ========================================================================= */}
        <section
          aria-label="About LEOZ Hero"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 'clamp(580px, 86vh, 760px)',
            display: 'flex',
            alignItems: 'flex-end',
            backgroundColor: '#161514',
            overflow: 'hidden',
          }}
        >
          {/* Architectural Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2200&q=90)',
              backgroundPosition: 'center 42%',
              backgroundSize: 'cover',
            }}
          />

          {/* Soft Scrim */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(22, 21, 20, 0.25) 0%, rgba(22, 21, 20, 0.4) 40%, rgba(22, 21, 20, 0.9) 95%)',
            }}
          />

          {/* Hero Typography */}
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
            <div style={{ maxWidth: '880px' }}>
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
                THE LEOZ STORY &amp; ETHOS
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(36px, 6vw, 76px)',
                  fontWeight: 300,
                  lineHeight: 1.04,
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  margin: '0 0 20px 0',
                }}
              >
                We Believe
                <br />
                A Home Should Feel
                <br />
                Like You.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 1.35vw, 18px)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.65,
                  maxWidth: '680px',
                  marginBottom: '28px',
                }}
              >
                LEOZ was founded on a simple truth: true luxury is personal. It is the effortless feeling of entering a kitchen or dressing suite where every surface, shadow gap, and drawer glide feels intuitively crafted for your way of living.
              </motion.p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 01: WHO LEOZ IS, WHAT WE CREATE & WHY WE EXIST
            ========================================================================= */}
        <section
          style={{
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(70px, 9vw, 120px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'clamp(32px, 5vw, 56px)',
              }}
            >
              <div>
                <span style={{ fontSize: '10.5px', color: '#B69A6B', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                  WHO WE ARE
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 400, color: '#161514', margin: '0 0 12px 0' }}>
                  Architectural Craftsmen
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(22, 21, 20, 0.72)', lineHeight: 1.7, margin: 0 }}>
                  We are a specialist team of interior architects, technical engineers, and master woodworkers who combine European design restraint with two decades of in-house manufacturing experience.
                </p>
              </div>

              <div>
                <span style={{ fontSize: '10.5px', color: '#B69A6B', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                  WHAT WE CREATE
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 400, color: '#161514', margin: '0 0 12px 0' }}>
                  Spaces of Living Calibre
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(22, 21, 20, 0.72)', lineHeight: 1.7, margin: 0 }}>
                  We create bespoke modular kitchens, full-height walk-in wardrobes, and turnkey residential interiors where monolithic stone, authentic timber, and silent German hardware harmonize.
                </p>
              </div>

              <div>
                <span style={{ fontSize: '10.5px', color: '#B69A6B', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
                  WHY WE EXIST
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 400, color: '#161514', margin: '0 0 12px 0' }}>
                  To End Compromise
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(22, 21, 20, 0.72)', lineHeight: 1.7, margin: 0 }}>
                  Homeowners were constantly forced to choose between generic imported brands with poor local support or unpredictable on-site carpenter work. LEOZ was built to deliver uncompromising factory certainty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: "DESIGN IS ONLY THE BEGINNING."
            ========================================================================= */}
        <section
          aria-label="Design is only the beginning"
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
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.1fr',
                gap: 'clamp(40px, 6vw, 80px)',
                alignItems: 'center',
              }}
              className="leoz-beginning-split"
            >
              {/* Left Column Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
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
                  THE COMPLETE CHAIN
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(30px, 4vw, 50px)',
                    fontWeight: 300,
                    lineHeight: 1.12,
                    color: '#FFFFFF',
                    margin: '0 0 20px 0',
                  }}
                >
                  Design is Only
                  <br />
                  The Beginning.
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: 'rgba(255, 255, 255, 0.78)',
                    lineHeight: 1.75,
                    marginBottom: '28px',
                  }}
                >
                  A visionary 3D render is meaningless if it cannot be engineered to millimeter tolerances, manufactured in-house, and installed with white-glove care. At LEOZ, these four disciplines operate as one single continuous chain of responsibility.
                </p>

                {/* 4 Connected Stages Ribbon */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[
                    { label: '01 / DESIGN', desc: 'Spatial harmony & aesthetic planning' },
                    { label: '02 / ENGINEERING', desc: '0.1mm CNC technical files & hardware geometry' },
                    { label: '03 / MANUFACTURING', desc: 'Direct plant fabrication in Gandhinagar' },
                    { label: '04 / INSTALLATION', desc: 'Turnkey assembly by certified LEOZ fitters' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        backgroundColor: '#1E1D1B',
                        padding: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '2px',
                      }}
                    >
                      <strong style={{ fontSize: '11px', color: '#B69A6B', letterSpacing: '0.12em', display: 'block', marginBottom: '4px' }}>
                        {s.label}
                      </strong>
                      <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.4, display: 'block' }}>
                        {s.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
                style={{
                  position: 'relative',
                  aspectRatio: '16 / 12',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                  alt="LEOZ Design to Installation Architecture"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: THE LEOZ DIFFERENCE (4 PILLARS)
            ========================================================================= */}
        <section
          aria-label="The LEOZ Difference"
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
                OUR FOUR CORE VALUES
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
                The LEOZ Difference
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
                Built on design clarity, engineered precision, authentic materials, and direct client care.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {leozPillars.map((p, idx) => {
                const Icon = p.icon;
                return (
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
                      padding: '30px 24px',
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
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                        paddingBottom: '10px',
                        borderBottom: '1px solid rgba(22, 21, 20, 0.06)',
                      }}
                    >
                      <span style={{ fontSize: '10.5px', color: '#B69A6B', fontWeight: 600, letterSpacing: '0.15em' }}>
                        {p.code}
                      </span>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(182, 154, 107, 0.12)',
                          color: '#B69A6B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={16} />
                      </div>
                    </div>

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

                    <div
                      style={{
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(22, 21, 20, 0.08)',
                        fontSize: '11px',
                        fontFamily: 'var(--font-body)',
                        color: '#B69A6B',
                        fontWeight: 600,
                      }}
                    >
                      ✓ {p.highlights}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: BRAND STORY (EDITORIAL PHOTO ESSAY)
            ========================================================================= */}
        <section
          aria-label="Brand Story Essay"
          style={{
            paddingTop: 'clamp(60px, 8vw, 100px)',
            paddingBottom: 'clamp(70px, 9vw, 120px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '21 / 10',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '32px',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
                alt="LEOZ Architectural Brand Story"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(22, 21, 20, 0.85) 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  color: '#FFFFFF',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#B69A6B',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  ESTABLISHED WITH PURPOSE
                </span>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 300, margin: 0 }}>
                  “We do not just create kitchens and wardrobes; we shape the private rituals of everyday life.”
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: SHOWROOMS (AHMEDABAD & SURAT)
            ========================================================================= */}
        <section
          id="showrooms"
          aria-label="LEOZ Showrooms"
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
                EXPERIENCE STUDIOS
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
                Visit Our Showrooms
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(255, 255, 255, 0.75)',
                  maxWidth: '620px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                Step inside our physical experience studios in Ahmedabad and Surat to feel authentic lacquers, sintered monoliths, and sliding mechanisms.
              </p>
            </div>

            {/* Showrooms 2-Column Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px',
              }}
            >
              {showrooms.map((sh, idx) => (
                <motion.div
                  key={sh.city}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: luxuryEase }}
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
                    <img src={sh.image} alt={sh.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div
                      style={{
                        position: 'absolute',
                        top: '14px',
                        left: '14px',
                        padding: '4px 10px',
                        backgroundColor: 'rgba(22, 21, 20, 0.8)',
                        backdropFilter: 'blur(8px)',
                        color: '#B69A6B',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        borderRadius: '2px',
                      }}
                    >
                      {sh.city}
                    </div>
                  </div>

                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 400, color: '#FFFFFF', margin: '0 0 10px 0' }}>
                      {sh.title}
                    </h3>

                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                      📍 {sh.address}
                    </p>

                    <div style={{ fontSize: '12.5px', color: '#B69A6B', marginBottom: '20px' }}>
                      🕒 {sh.hours}
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <a
                        href={sh.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 18px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '11.5px',
                          fontWeight: 500,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          borderRadius: '2px',
                          transition: 'all 0.25s ease',
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
                          padding: '10px 18px',
                          backgroundColor: '#B69A6B',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          textDecoration: 'none',
                          borderRadius: '2px',
                        }}
                      >
                        <span>Book Visit</span>
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
            FINAL SECTION: "LET'S BUILD SOMETHING THAT LASTS."
            ========================================================================= */}
        <section
          aria-label="Book About Consultation"
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
              opacity: 0.2,
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
                fontSize: 'clamp(34px, 5.5vw, 64px)',
                fontWeight: 300,
                color: '#FFFFFF',
                lineHeight: 1.08,
                margin: '0 0 20px 0',
                letterSpacing: '0.01em',
              }}
            >
              Let’s Build Something
              <br />
              That Lasts.
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
              Schedule a private design consultation with LEOZ principal designers to begin planning your bespoke interior.
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
        @media (max-width: 900px) {
          .leoz-beginning-split {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
