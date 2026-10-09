import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { UniversalHero } from '../components/common/UniversalHero';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  Compass,
  Layers,
  Building2,
  Users,
  CheckCircle2,
  Shield,
  Cpu,
  Wrench,
  Factory,
  Eye,
  Target,
  Award,
} from 'lucide-react';
import { factoryAssets } from '../assets/images';

const luxuryEase = [0.16, 1, 0.3, 1];

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'About LEOZ Cucine | A Passion for Detail. A Commitment to Excellence.',
    'Based in Gujarat, LEOZ Cucine specialises in luxury modular kitchens and bespoke wardrobes. Discover our story, philosophy, 20,000 sq. ft. Gandhinagar plant, and leadership by Mr. Mayur Vadhia.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const qualityPoints = [
    { num: '01', title: 'Material Specifications', desc: 'Pre-production verification of core board density, certified moisture resistance (HDMR), and calibrated surface flatness.' },
    { num: '02', title: 'Dimensional Accuracy', desc: 'Automated European CNC panel sizing maintaining 0.1mm micro-tolerances across every shutter and carcass joint.' },
    { num: '03', title: 'Fit & Finish Inspection', desc: 'Zero-glue-line PUR edge banding, seamless 45° miters, and UV-stabilized surface coatings audited before assembly.' },
    { num: '04', title: 'Hardware Compatibility', desc: 'Rigorous motion testing of Blum and Hettich runners, hinges, and lift-up systems under full load specifications.' },
    { num: '05', title: 'Final Installation Checks', desc: 'Multi-point on-site handover audit verifying laser plumb alignment, smooth glide, and spotless handoff.' },
  ];

  const whyChooseUsPoints = [
    {
      num: '01',
      title: '20+ Years Leadership Expertise',
      desc: 'Two decades of hands-on modular experience guiding every concept, material specification, and engineering detail.',
    },
    {
      num: '02',
      title: 'Specialised Product Focus',
      desc: 'Exclusively dedicated to luxury kitchens and bespoke wardrobes — bringing refined depth and mastery to both disciplines.',
    },
    {
      num: '03',
      title: '20,000 Sq. Ft. In-House Manufacturing',
      desc: 'Our modern facility in Rakanpur, Gandhinagar ensures direct quality control, automated precision, and reliable timelines.',
    },
    {
      num: '04',
      title: 'Uncompromised Design Flexibility',
      desc: 'Bespoke planning tailored to architectural blueprints, unique room constraints, and personalized aesthetic styles.',
    },
    {
      num: '05',
      title: 'Attention to Detailing',
      desc: 'From integrated LED channels and microfiber velvet dividers to zero-gap shadow channels and flawless edge seals.',
    },
    {
      num: '06',
      title: 'Professional Installation & Warranty',
      desc: 'Meticulous on-site assembly by certified LEOZ master fitters backed by documented warranty terms.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#F7F7F5', color: '#20211F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            SECTION 01: HERO BANNER
            ========================================================================= */}
        <UniversalHero
          image="/about.webp"
          imageAlt="LEOZ Architectural Interior & Brand Philosophy"
          imagePosition="center 40%"
          eyebrow="04 / ABOUT LEOZ CUCINE"
          headline="A Passion for Detail. A Commitment to Excellence."
          supportingText="Based in Gujarat, LEOZ Cucine specialises in luxury modular kitchens and bespoke wardrobes, bringing thoughtful design and manufacturing control to distinctive homes."
          ctaText="Discover LEOZ →"
          ctaHref="#our-story"
          brightness={0.88}
        />

        {/* =========================================================================
            SECTION 02: OUR STORY & OUR PHILOSOPHY
            ========================================================================= */}
        <section
          id="our-story"
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(80px, 11vw, 140px)',
            paddingBottom: 'clamp(80px, 11vw, 140px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            borderBottom: '1px solid #EBEAE5',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                gap: 'clamp(36px, 6vw, 80px)',
                marginBottom: 'clamp(50px, 8vw, 90px)',
              }}
            >
              {/* Our Story Block */}
              <div style={{ backgroundColor: '#FFFFFF', padding: 'clamp(32px, 4vw, 48px)', border: '1px solid #E5E4E0', borderTop: '3px solid #A58B62' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '14px' }}>
                  OUR ORIGIN &amp; PURPOSE
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 300, color: '#20211F', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                  Our Story
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  LEOZ Cucine is built on the conviction that a kitchen or wardrobe should be as accomplished in use as it is beautiful in appearance. Guided by deep practical expertise, the brand focuses solely on these two product categories, with personalisation, skilled production and considered installation at its core.
                </p>
              </div>

              {/* Our Philosophy Block */}
              <div style={{ backgroundColor: '#FFFFFF', padding: 'clamp(32px, 4vw, 48px)', border: '1px solid #E5E4E0', borderTop: '3px solid #A58B62' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '14px' }}>
                  DESIGN PRINCIPLES
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 300, color: '#20211F', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                  Our Philosophy
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  German-inspired precision meets a nuanced understanding of Indian homes. We consider how each space is used before developing its form: ergonomics, movement, storage, materials and finish are treated as one coherent design.
                </p>
              </div>
            </div>

            {/* Vision & Mission Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                gap: 'clamp(28px, 4vw, 48px)',
              }}
            >
              <div style={{ borderLeft: '2px solid #A58B62', paddingLeft: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Eye size={18} color="#A58B62" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A58B62' }}>
                    OUR VISION
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
                  Distinct Design &amp; Thoughtful Experiences
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#686963', lineHeight: 1.7, margin: 0 }}>
                  To become a recognised name in luxury kitchens and wardrobes through distinct design, manufacturing precision and thoughtful client experiences.
                </p>
              </div>

              <div style={{ borderLeft: '2px solid #A58B62', paddingLeft: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Target size={18} color="#A58B62" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A58B62' }}>
                    OUR MISSION
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
                  Dependable Precision &amp; Responsive Support
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#686963', lineHeight: 1.7, margin: 0 }}>
                  To offer personalised planning, dependable manufacturing, meticulous installation and responsive support, enabling customers to enjoy refined, functional living spaces.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02.5: BRAND IDENTITY & THE SPIRIT OF LEOZ
            ========================================================================= */}
        <section
          id="brand-spirit"
          style={{
            backgroundColor: '#1C1D1A',
            color: '#FFFFFF',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '30%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(165, 139, 98, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '1360px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.25fr',
                gap: 'clamp(40px, 7vw, 100px)',
                alignItems: 'center',
              }}
              className="editorial-grid"
            >
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '440px',
                    aspectRatio: '4/5',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(165, 139, 98, 0.2)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    backgroundColor: '#0F100E',
                  }}
                >
                  <img
                    src="/i_am_leoz_perfect.jpg"
                    alt="I am Leoz — Royal Brand Guardian"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 40%',
                      display: 'block',
                    }}
                  />
                </div>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#D4AF37',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  BRAND IDENTITY &amp; GUARDIAN
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(32px, 4.5vw, 56px)',
                    fontWeight: 300,
                    lineHeight: 1.2,
                    letterSpacing: '-0.015em',
                    color: '#FFFFFF',
                    margin: '0 0 24px 0',
                  }}
                >
                  The Spirit of LEOZ.{' '}
                  <span
                    style={{
                      display: 'block',
                      marginTop: '6px',
                      color: '#D4AF37',
                      fontWeight: 400,
                    }}
                  >
                    Royal Strength &amp; Precision.
                  </span>
                </h2>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(16px, 1.2vw, 18px)',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: '#D9D9D4',
                    marginBottom: '20px',
                  }}
                >
                  "I am Leoz" embodies our unwavering guardian promise — uncompromising structural integrity, noble Italian design aesthetics, and lifetime durability for the modern sanctuary.
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    lineHeight: 1.75,
                    color: '#A8A8A2',
                    marginBottom: '32px',
                  }}
                >
                  Just as the lion commands dignity and strength, every bespoke kitchen and wardrobe crafted under the LEOZ emblem is armored with European hardware, 150-ton hydraulic lamination, and razor-sharp German tolerances.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '24px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                    paddingTop: '24px',
                  }}
                >
                  <div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#D4AF37', display: 'block', marginBottom: '4px' }}>
                      Strength
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8E8E88' }}>
                      Anti-warp marine grade cores
                    </span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#D4AF37', display: 'block', marginBottom: '4px' }}>
                      Precision
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8E8E88' }}>
                      0.1mm CNC automated tolerance
                    </span>
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#D4AF37', display: 'block', marginBottom: '4px' }}>
                      Elegance
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#8E8E88' }}>
                      Refined Italian &amp; German finishes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: MEET THE DIRECTOR | MR. MAYUR VADHIA
            ========================================================================= */}
        <section
          style={{
            backgroundColor: '#ECEBE7',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 'clamp(40px, 7vw, 100px)', alignItems: 'center' }} className="editorial-grid">
              <div style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', backgroundColor: '#D9D9D4', borderRadius: '2px', boxShadow: '0 16px 40px rgba(32, 33, 31, 0.12)' }}>
                <img
                  src={factoryAssets.directorPortrait.desktop}
                  alt={factoryAssets.directorPortrait.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>

              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                  LEADERSHIP &amp; EXPERTISE
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 300, color: '#20211F', margin: '0 0 8px 0' }}>
                  Mr. Mayur Vadhia
                </h2>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A58B62', marginBottom: '22px' }}>
                  Director – Kitchens, Wardrobes &amp; Manufacturing
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', lineHeight: 1.75, color: '#20211F', marginBottom: '18px' }}>
                  With over 20 years of intensive hands-on experience, Mayur Vadhia is among the highly experienced modular kitchen specialists in Gujarat. His knowledge spans the entire journey—from concept development, space planning, material and hardware selection through engineering, manufacturing, site installation and final execution.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', lineHeight: 1.75, color: '#686963', margin: 0 }}>
                  Having worked through changing technologies and product practices, he brings exceptional practical insight to the relationship between a compelling design and a well-executed product. His leadership shapes LEOZ’s attention to technical accuracy, manufacturing discipline and functional detail.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: OUR MANUFACTURING FACILITY & PRODUCTION CAPABILITY
            ========================================================================= */}
        <section
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            borderTop: '1px solid #E5E5DF',
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
                  IN-HOUSE INFRASTRUCTURE
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Our Manufacturing Facility
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  The 20,000 sq. ft. in-house production facility at Rakanpur, Gandhinagar supports made-to-measure kitchen and wardrobe manufacturing. It brings product development, component processing, finishing and quality oversight into a coordinated environment.
                </p>
              </div>
            </div>

            {/* 3 Facility Highlights Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: '28px',
              }}
            >
              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E4E0', borderTop: '3px solid #A58B62', padding: '32px 28px', borderRadius: '2px' }}>
                <Cpu size={28} color="#A58B62" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
                  Advanced Machinery
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#686963', lineHeight: 1.7, margin: 0 }}>
                  Modern European-grade production machinery supports precise cutting, consistent dimensions, controlled edge treatment and repeatable assembly of specified components.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E4E0', borderTop: '3px solid #A58B62', padding: '32px 28px', borderRadius: '2px' }}>
                <Shield size={28} color="#A58B62" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
                  Quality Control
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#686963', lineHeight: 1.7, margin: 0 }}>
                  Our quality approach considers material specifications, dimensional accuracy, fit and finish, hardware compatibility and final installation checks against approved commercial specifications.
                </p>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E4E0', borderTop: '3px solid #A58B62', padding: '32px 28px', borderRadius: '2px' }}>
                <Building2 size={28} color="#A58B62" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
                  Production Capability
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#686963', lineHeight: 1.7, margin: 0 }}>
                  An integrated facility enables us to coordinate individual bespoke homes and planned multi-unit residential kitchen and wardrobe requirements, subject to agreed capacity and project schedules.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: QUALITY CONTROL PROCESS (5 STAGES)
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
            <div style={{ marginBottom: 'clamp(50px, 7vw, 90px)', maxWidth: '780px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                RIGOROUS STANDARDS
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 4.5vw, 64px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: '0 0 16px 0' }}>
                5-Stage Quality Assurance
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#686963', lineHeight: 1.7, margin: 0 }}>
                Every panel, edge seal, and hardware mechanism is audited through documented quality checkpoints before leaving our Gandhinagar plant.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px' }}>
              {qualityPoints.map((point) => (
                <div key={point.num} style={{ backgroundColor: '#F7F7F5', padding: '28px 24px', borderTop: '2px solid #A58B62' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 300, color: '#A58B62', display: 'block', marginBottom: '8px' }}>
                    {point.num}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
                    {point.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#686963', lineHeight: 1.65, margin: 0 }}>
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 06: OUR RELATIONSHIPS & COLLABORATION
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
                  PROFESSIONAL COLLABORATION
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  Our Relationships
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  LEOZ serves discerning homeowners and works with architects, interior designers and residential developers seeking specialist kitchen and wardrobe solutions. Geographic servicing and installation arrangements are confirmed project by project.
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
              {[
                { icon: <Compass size={24} color="#A58B62" />, title: 'Architects', desc: 'Bespoke CAD integration, technical joinery drawings, and factory-level execution for signature residences.' },
                { icon: <Layers size={24} color="#A58B62" />, title: 'Interior Designers', desc: 'Curated surface archives, open veneer matching, and custom glass vitrines without creative barriers.' },
                { icon: <Building2 size={24} color="#A58B62" />, title: 'Residential Developers', desc: 'Scalable manufacturing capacity, planned scheduling, and precision turnkey fitment for luxury developments.' },
                { icon: <Users size={24} color="#A58B62" />, title: 'Discerning Homeowners', desc: 'Personal 1-on-1 consultation, transparent proposals, and white-glove after-sales coordination.' },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E4E0',
                    borderTop: '3px solid #A58B62',
                    padding: '30px 24px',
                    borderRadius: '2px',
                    boxShadow: '0 4px 20px rgba(32, 33, 31, 0.04)',
                  }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '2px', backgroundColor: '#F7F7F5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', border: '1px solid #ECEBE7' }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '21px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#686963', lineHeight: 1.65, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 07: WHY CLIENTS CHOOSE US & MILESTONES
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
                  Why Clients Choose Us
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  20+ years of leadership expertise, specialised product focus, 20,000 sq. ft. in-house manufacturing, design flexibility, attention to detailing and professional installation.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: '24px',
                marginBottom: '64px',
              }}
            >
              {whyChooseUsPoints.map((card) => (
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

            {/* Our Milestones Ribbon */}
            <div style={{ backgroundColor: '#252623', color: '#FFFFFF', padding: 'clamp(36px, 5vw, 54px)', borderRadius: '2px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AF37', display: 'block', marginBottom: '10px' }}>
                OUR MILESTONES
              </span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 300, color: '#FFFFFF', margin: '0 0 16px 0' }}>
                Two Decades of Specialist Manufacturing Evolution
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, maxWidth: '850px', margin: 0 }}>
                20+ years of hands-on sector experience behind the brand’s manufacturing leadership. Continued investment in a 20,000 sq. ft. facility at Gandhinagar. Ongoing development of luxury kitchen and wardrobe capabilities.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 08: FINAL CTA | DISCOVER LEOZ
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
              DISCOVER LEOZ
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(34px, 4.5vw, 60px)', fontWeight: 300, color: '#FFFFFF', letterSpacing: '-0.015em', margin: '0 0 20px 0', lineHeight: 1.15 }}>
              Begin Your Architectural Consultation
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.2vw, 18px)', color: '#D9D9D4', lineHeight: 1.75, maxWidth: '680px', margin: '0 auto 36px auto' }}>
              Visit us by appointment or discuss your project with our team. Experience German precision, dedicated production, and bespoke living spaces.
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
              <span>Arrange a Consultation</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .editorial-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 28px !important;
            width: 100% !important;
          }

          .editorial-grid > div {
            width: 100% !important;
            max-width: 100% !important;
          }

          .editorial-grid h2 {
            font-size: clamp(34px, 9vw, 42px) !important;
            line-height: 1.05 !important;
            letter-spacing: normal !important;
            text-align: left !important;
          }

          .editorial-grid p {
            font-size: 16px !important;
            line-height: 1.68 !important;
            text-align: left !important;
            letter-spacing: normal !important;
            word-spacing: normal !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
