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
    'Our Method | LEOZ Cucine — Architectural Precision from Idea to Installation',
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
      subtitle: 'STAGE 01',
      tagline: 'Understanding your lifestyle, space and spatial rituals.',
      description:
        'We begin by listening deeply to the nuances of your daily life — how you cook, how you host, and how you move through morning and evening rituals. We analyse architectural blueprints, natural lighting paths, and spatial proportions.',
      points: [
        'In-depth lifestyle and culinary audit',
        'Architectural site analysis & natural light mapping',
        'Aesthetic orientation & tactile material curation',
      ],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      focalPosition: 'center 45%',
      icon: Compass,
    },
    {
      number: '02',
      title: 'PLAN',
      subtitle: 'STAGE 02',
      tagline: 'Spatial planning and ergonomic workflow calculation.',
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
      subtitle: 'STAGE 03',
      tagline: 'Architectural aesthetics, lighting and material harmony.',
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
      subtitle: 'STAGE 04',
      tagline: 'Detailed technical blueprints and precision engineering.',
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
      subtitle: 'STAGE 05',
      tagline: 'Automated machinery and high-precision production.',
      description:
        'Fabricated 100% in-house at our dedicated Gandhinagar manufacturing plant. Automated beam saws, hydraulic multi-ton cold presses, and 5-axis CNC routers eliminate manual craftsmanship deviations.',
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
      subtitle: 'STAGE 06',
      tagline: 'Meticulous detailing, lacquering and quality control.',
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
      subtitle: 'STAGE 07',
      tagline: 'White-glove installation and immaculate handover.',
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
    <div style={{ backgroundColor: '#F7F4EE', color: '#262522', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO: UNIVERSAL FULL-BLEED ARCHITECTURAL HERO
            ========================================================================= */}
        <section
          aria-label="Our Method Hero"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingTop: 'clamp(110px, 14vh, 180px)',
            paddingBottom: 'clamp(44px, 7vh, 88px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.3, ease: luxuryEase }}
            style={{ position: 'absolute', inset: 0, zIndex: 1 }}
          >
            <img
              src="/PHILOSOPHY.webp"
              alt="LEOZ Architectural Craftsmanship and Method"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.92)' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(14, 15, 13, 0.45) 0%, rgba(14, 15, 13, 0.25) 30%, rgba(14, 15, 13, 0.78) 70%, rgba(14, 15, 13, 0.95) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 20% 75%, rgba(10, 11, 10, 0.8) 0%, rgba(10, 11, 10, 0.35) 50%, transparent 75%)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '880px', color: '#FFFFFF' }}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: luxuryEase }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(9.5px, 0.95vw, 11px)',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#D4AF37',
                backgroundColor: 'rgba(10, 11, 10, 0.55)',
                padding: '6px 14px',
                borderRadius: '2px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                backdropFilter: 'blur(10px)',
                marginBottom: '18px',
                textShadow: '0 2px 8px rgba(0,0,0,0.85)',
              }}
            >
              LEOZ / OUR METHOD
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: luxuryEase }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(38px, 6vw, 84px)',
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                margin: '0 0 18px 0',
                textShadow: '0 3px 20px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.95)',
              }}
            >
              From Vision to Reality.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42, ease: luxuryEase }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14.5px, 1.2vw, 17.5px)',
                fontWeight: 300,
                lineHeight: 1.65,
                color: '#ECEBE7',
                maxWidth: '580px',
                margin: '0 0 28px 0',
                textShadow: '0 2px 12px rgba(0,0,0,0.9)',
              }}
            >
              A considered journey from consultation and design to precision manufacturing and installation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: luxuryEase }}
            >
              <a
                href="#stages-timeline"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector('#stages-timeline');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: '#A58B62',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  border: '1px solid #A58B62',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.4)',
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
                <span>Discover Our Method</span>
                <ArrowRight size={13} />
              </a>
            </motion.div>
          </div>
        </section>

        <section
          id="stages-timeline"
          style={{
            backgroundColor: '#F7F4EE',
            paddingTop: '30px',
            paddingBottom: '30px',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            borderBottom: '1px solid #E5DED2',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>

            {/* Quick-Jump Stage Pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                paddingTop: '16px',
              }}
            >
              {stages.map((st, i) => (
                <button
                  key={st.number}
                  onClick={() => {
                    const el = stageRefs.current[i];
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '2px',
                    border: activeStage === i ? '1px solid #262522' : '1px solid #D5CDBE',
                    backgroundColor: activeStage === i ? '#262522' : '#FFFFFF',
                    color: activeStage === i ? '#F7F4EE' : '#262522',
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {st.number} {st.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: 7-STAGE ARCHITECTURAL JOURNEY TIMELINE (WARM LIGHT SURFACES)
            ========================================================================= */}
        <section
          aria-label="The 7-Stage Architectural Method"
          style={{
            paddingTop: 'clamp(60px, 8vw, 110px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#EEE9E0',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto', position: 'relative' }}>
            <div
              className="leoz-method-timeline"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(48px, 7vw, 90px)',
              }}
            >
              {stages.map((stage, idx) => {
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
                      gap: 'clamp(28px, 5vw, 64px)',
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      border: `1px solid ${isHighlighted ? '#8A725B' : '#E5DED2'}`,
                      borderRadius: '4px',
                      padding: 'clamp(24px, 4vw, 48px)',
                      boxShadow: isHighlighted ? '0 16px 36px rgba(138, 114, 91, 0.12)' : '0 4px 20px rgba(0,0,0,0.03)',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    {/* Content Column */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, ease: luxuryEase }}
                      style={{
                        order: isEven ? 1 : 2,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '14px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '36px',
                            fontWeight: 300,
                            color: isHighlighted ? '#8A725B' : '#66635D',
                            transition: 'color 0.4s ease',
                            lineHeight: 1,
                          }}
                        >
                          {stage.number}
                        </span>
                        <div
                          style={{
                            width: '32px',
                            height: '1px',
                            backgroundColor: isHighlighted ? '#8A725B' : '#D5CDBE',
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
                            color: '#8A725B',
                          }}
                        >
                          {stage.subtitle}
                        </span>
                      </div>

                      <h2
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(28px, 3.6vw, 42px)',
                          fontWeight: 300,
                          color: '#262522',
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
                          color: '#8A725B',
                          lineHeight: 1.5,
                          margin: '0 0 14px 0',
                        }}
                      >
                        {stage.tagline}
                      </p>

                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '14.5px',
                          color: '#66635D',
                          lineHeight: 1.7,
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
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: isHighlighted ? 'rgba(138, 114, 91, 0.15)' : '#F7F4EE',
                                color: isHighlighted ? '#8A725B' : '#66635D',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                transition: 'all 0.4s ease',
                              }}
                            >
                              <CheckCircle2 size={13} />
                            </div>
                            <span
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '13.5px',
                                color: '#262522',
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
                      initial={{ opacity: 0, scale: 0.97 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, ease: luxuryEase }}
                      style={{
                        order: isEven ? 2 : 1,
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '16 / 11',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        border: '1px solid #E5DED2',
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
                          bottom: '14px',
                          left: '14px',
                          padding: '6px 14px',
                          backgroundColor: 'rgba(38, 37, 34, 0.88)',
                          backdropFilter: 'blur(8px)',
                          color: '#F7F4EE',
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
            FINAL SECTION: STRATEGIC DARK CONTRAST CLOSING (10% RATIO)
            ========================================================================= */}
        <section
          aria-label="Start Your Method Journey"
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
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#8A725B',
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
                color: '#F7F4EE',
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
                color: 'rgba(247, 244, 238, 0.8)',
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
            gap: 24px !important;
            padding: 24px !important;
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
