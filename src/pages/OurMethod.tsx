import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  Compass,
  Layers,
  Sparkles,
  Cpu,
  Factory,
  Award,
  Wrench,
  CheckCircle2,
} from 'lucide-react';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

interface MethodStage {
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  points: string[];
  image: string;
  focalPosition: string;
  icon: React.ElementType;
}

export const OurMethod: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Our Method | LEOZ Cucine — The 7-Stage Architectural Journey',
    'Explore the LEOZ 7-stage architectural method: Discover, Plan, Design, Engineer, Manufacture, Craft, and Install.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const stages: MethodStage[] = [
    {
      number: '01',
      title: 'DISCOVER',
      subtitle: 'STAGE / 01',
      tagline: 'Understanding your lifestyle, space and aspirations.',
      description:
        'We begin by listening deeply to the nuances of your daily life — how you cook, how you host, how you move through morning and evening rituals. We analyse architectural blueprints, natural lighting paths, and spatial proportions.',
      points: [
        'In-depth lifestyle and culinary audit',
        'Architectural site analysis & natural light mapping',
        'Aesthetic orientation & moodboard curation',
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 45%',
      icon: Compass,
    },
    {
      number: '02',
      title: 'PLAN',
      subtitle: 'STAGE / 02',
      tagline: 'Spatial planning and functional thinking.',
      description:
        'Translating lifestyle requirements into rigorous architectural flow. We map the golden triangle of kitchen efficiency, calculate vertical storage volumes, and ensure harmonious transitions between open living zones.',
      points: [
        'Ergonomic workflow and movement zone mapping',
        'Volume calculation and appliance integration layout',
        'Preliminary 2D architectural elevations',
      ],
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 50%',
      icon: Layers,
    },
    {
      number: '03',
      title: 'DESIGN',
      subtitle: 'STAGE / 03',
      tagline: 'Architectural design, materials and aesthetics.',
      description:
        'Where form and tactile beauty take shape. We generate photorealistic 3D architectural renders reflecting exact lighting conditions, continuous stone veining, and hand-selected wood veneer grains.',
      points: [
        'Photorealistic 3D CAD visualization',
        'Physical material palette selection (Stone, Wood, Glass, Metal)',
        '3000K recessed lighting & acoustic channel design',
      ],
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 45%',
      icon: Sparkles,
    },
    {
      number: '04',
      title: 'ENGINEER',
      subtitle: 'STAGE / 04',
      tagline: 'Detailed technical planning and precision engineering.',
      description:
        'Every component is translated into computerized manufacturing files. We calculate 0.1mm hardware drilling patterns, specify Blum and Hettich concealed mechanisms, and engineer climate-resilient marine core structures.',
      points: [
        '0.1mm micro-tolerance CNC technical blueprints',
        'Hardware specification with German concealed motion gear',
        'Anti-warp structural reinforcement engineering',
      ],
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 40%',
      icon: Cpu,
    },
    {
      number: '05',
      title: 'MANUFACTURE',
      subtitle: 'STAGE / 05',
      tagline: 'Advanced machinery and controlled production.',
      description:
        'Fabricated 100% in-house at our dedicated 20,000 sq. ft. Gandhinagar manufacturing plant. Automated beam saws, hydraulic multi-ton cold presses, and 5-axis CNC routers eliminate manual craftsmanship deviations.',
      points: [
        '2-blade scoring panel saws with zero chip-out',
        'Hydraulic cold press lamination under 150-ton uniform load',
        'PUR hot-melt waterproof automated edge banding',
      ],
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 45%',
      icon: Factory,
    },
    {
      number: '06',
      title: 'CRAFT',
      subtitle: 'STAGE / 06',
      tagline: 'Finishing, detailing and quality control.',
      description:
        'Master hand-finishing brings the components to life. Multi-coat Italian lacquers are cured under UV light, stone miters are hand-polished, and every drawer glide is tested under load before factory dispatch.',
      points: [
        'Multi-layer robotically applied UV-cured Italian lacquers',
        'Hand-stitched leather drawer organizers & velvet dividers',
        'Comprehensive 42-point pre-dispatch quality audit',
      ],
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 45%',
      icon: Award,
    },
    {
      number: '07',
      title: 'INSTALL',
      subtitle: 'STAGE / 07',
      tagline: 'Professional installation and final execution.',
      description:
        'A seamless transition from blueprint to finished reality. Installed directly by certified LEOZ master fitters with laser-levelled sub-bases, precision door gap alignment, and a pristine dust-free handover.',
      points: [
        'Laser-guided sub-base leveling and wall fastening',
        'Precision hinge adjustment for razor-sharp shadow gaps',
        '10-year written warranty & white-glove handover',
      ],
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 45%',
      icon: Wrench,
    },
  ];

  const [activeStage, setActiveStage] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;
      stageRefs.current.forEach((el, index) => {
        if (!el) return;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveStage(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ backgroundColor: '#FAF9F6', color: '#161514', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO: "FROM IDEA TO EVERY DETAIL."
            ========================================================================= */}
        <section
          aria-label="Our Method Hero"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 'clamp(540px, 80vh, 720px)',
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
              background: 'linear-gradient(180deg, rgba(22, 21, 20, 0.25) 0%, rgba(22, 21, 20, 0.4) 40%, rgba(22, 21, 20, 0.9) 95%)',
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
                THE LEOZ PHILOSOPHY • 7-STAGE PROCESS
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
                From Idea
                <br />
                To Every Detail.
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
                A considered process where design, engineering and craftsmanship work as one.
              </motion.p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: 7-STAGE ARCHITECTURAL JOURNEY TIMELINE
            ========================================================================= */}
        <section
          aria-label="The 7-Stage Architectural Method"
          style={{
            paddingTop: 'clamp(70px, 9vw, 120px)',
            paddingBottom: 'clamp(80px, 10vw, 140px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto', position: 'relative' }}>
            
            {/* Timeline Wrapper with Connected Gold Center Line */}
            <div
              className="leoz-method-timeline"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(60px, 9vw, 120px)',
              }}
            >
              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                const isEven = idx % 2 === 0;
                const isHighlighted = activeStage === idx;

                return (
                  <div
                    key={stage.number}
                    ref={(el) => (stageRefs.current[idx] = el)}
                    className="leoz-timeline-stage"
                    style={{
                      position: 'relative',
                      display: 'grid',
                      gridTemplateColumns: isEven ? '1.1fr 1fr' : '1fr 1.1fr',
                      gap: 'clamp(36px, 6vw, 80px)',
                      alignItems: 'center',
                    }}
                  >
                    {/* Content Column (Flips order on alternate rows on desktop) */}
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: luxuryEase }}
                      style={{
                        order: isEven ? 1 : 2,
                        padding: 'clamp(10px, 2vw, 30px)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '12px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '32px',
                            fontWeight: 300,
                            color: isHighlighted ? '#B69A6B' : '#A0988A',
                            transition: 'color 0.4s ease',
                          }}
                        >
                          {stage.number}
                        </span>
                        <div
                          style={{
                            width: '32px',
                            height: '1px',
                            backgroundColor: isHighlighted ? '#B69A6B' : 'rgba(22, 21, 20, 0.15)',
                            transition: 'background-color 0.4s ease',
                          }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: '#B69A6B',
                          }}
                        >
                          {stage.subtitle}
                        </span>
                      </div>

                      <h2
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(28px, 3.8vw, 44px)',
                          fontWeight: 300,
                          color: '#161514',
                          margin: '0 0 10px 0',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {stage.title}
                      </h2>

                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '15px',
                          fontWeight: 600,
                          color: '#B69A6B',
                          lineHeight: 1.5,
                          margin: '0 0 16px 0',
                        }}
                      >
                        {stage.tagline}
                      </p>

                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          color: 'rgba(22, 21, 20, 0.72)',
                          lineHeight: 1.75,
                          marginBottom: '24px',
                        }}
                      >
                        {stage.description}
                      </p>

                      {/* Stage Points */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {stage.points.map((pt) => (
                          <div key={pt} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                backgroundColor: isHighlighted ? 'rgba(182, 154, 107, 0.15)' : 'rgba(22, 21, 20, 0.06)',
                                color: isHighlighted ? '#B69A6B' : '#716B61',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                transition: 'all 0.4s ease',
                              }}
                            >
                              <CheckCircle2 size={12} />
                            </div>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '13px',
                                color: 'rgba(22, 21, 20, 0.85)',
                              }}
                            >
                              {pt}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Image Column */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.7, ease: luxuryEase }}
                      style={{
                        order: isEven ? 2 : 1,
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16 / 11',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        border: `1px solid ${isHighlighted ? 'rgba(182, 154, 107, 0.5)' : 'rgba(22, 21, 20, 0.08)'}`,
                        boxShadow: isHighlighted ? '0 16px 40px rgba(182, 154, 107, 0.12)' : '0 4px 20px rgba(0,0,0,0.03)',
                        transition: 'all 0.5s ease',
                      }}
                    >
                      <img
                        src={stage.image}
                        alt={`LEOZ Stage ${stage.number} - ${stage.title}`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: stage.focalPosition,
                          display: 'block',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '16px',
                          left: '16px',
                          padding: '6px 14px',
                          backgroundColor: 'rgba(22, 21, 20, 0.8)',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '10.5px',
                          fontWeight: 600,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          borderRadius: '2px',
                        }}
                      >
                        STAGE {stage.number} • {stage.title}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            FINAL SECTION: "ONE VISION. EVERY DETAIL CONNECTED."
            ========================================================================= */}
        <section
          aria-label="Start Your Method Journey"
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
              BESPOKE ARCHITECTURAL EXECUTION
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
              One Vision.
              <br />
              Every Detail Connected.
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
              Experience the certainty of a turnkey process where architectural planning, factory precision, and white-glove installation work in harmony.
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
              <span>Start Your Project</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .leoz-timeline-stage {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .leoz-timeline-stage > div {
            order: initial !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OurMethod;
