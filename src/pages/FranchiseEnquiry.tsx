import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { images } from '../assets/images';
import { ParallaxImage } from '../components/ui/ParallaxImage';
import {
  Award,
  Headphones,
  Sparkles,
  TrendingUp,
  UserCheck,
  Palette,
  Compass,
  Store,
  HardHat,
  Briefcase,
  Layers,
  GraduationCap,
  Megaphone,
  Wrench,
  FileSpreadsheet,
  Building2,
  CheckCircle,
  Gem,
  Check
} from 'lucide-react';

/* Easing curve token matching About & Master Kitchens templates */
const luxuryEase = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: luxuryEase }
  }
};

const staggerContainer = containerVariants;
const staggerItem = itemVariants;

/* Hero image sits on the LEFT, so it enters from the RIGHT (opposite side) */
const imageRevealVariants = {
  hidden: { opacity: 0, scale: 1.03, x: 70, clipPath: 'inset(0% 0% 100% 0%)' },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.9, ease: luxuryEase, delay: 0.1 }
  }
};

/* Hero text sits on the RIGHT, so it enters from the LEFT (opposite side) */
const heroTextItemVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: luxuryEase } }
};

export const FranchiseEnquiry: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    cityRegion: '',
    businessBackground: '',
    investmentRange: '₹50 Lakhs - ₹1 Crore',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxY = Math.min(scrollY * 0.15, 120);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  /* Section 02 Cards */
  const whyPartnerCards = [
    {
      icon: Award,
      title: 'Trusted Brand Name',
      description: 'Backed by 1,500+ successful projects & a trusted brand name.'
    },
    {
      icon: Headphones,
      title: 'In-House Manufacturing',
      description: 'In-house manufacturing support for consistent quality & pricing.'
    },
    {
      icon: Sparkles,
      title: 'Studio & Team Support',
      description: 'Marketing, design & operational support from our team.'
    },
    {
      icon: TrendingUp,
      title: 'Growing Network',
      description: 'Growing presence across India & export markets.'
    }
  ];

  /* Section 03 Cards */
  const idealPartners = [
    {
      icon: UserCheck,
      title: 'Entrepreneurs',
      description: 'Visionary business leaders seeking to establish a high-margin luxury retail presence.'
    },
    {
      icon: Palette,
      title: 'Interior Designers',
      description: 'Creative design professionals expanding into turnkey kitchen and wardrobe execution.'
    },
    {
      icon: Compass,
      title: 'Architects',
      description: 'Architectural practices looking to offer integrated high-end interior solutions.'
    },
    {
      icon: Store,
      title: 'Furniture Dealers',
      description: 'Established furniture retailers looking to diversify into bespoke modular cabinetry.'
    },
    {
      icon: HardHat,
      title: 'Construction Professionals',
      description: 'Builders and developers aiming to deliver luxury fitted interiors for premium residential projects.'
    },
    {
      icon: Briefcase,
      title: 'Business Investors',
      description: 'Strategic investors capitalizing on the booming luxury home interior and lifestyle sector.'
    }
  ];

  /* Section 04 Grid Items */
  const advantageItems = [
    {
      icon: Gem,
      title: 'Premium Brand Identity',
      description: 'Benefit from an established luxury aesthetic, recognized design excellence, and high-end market positioning.'
    },
    {
      icon: Store,
      title: 'Showroom Design Assistance',
      description: 'Receive complete architectural layout planning, lighting direction, and material display guidelines.'
    },
    {
      icon: GraduationCap,
      title: 'Product & Sales Training',
      description: 'Empower your sales force and design consultants with in-depth technical training and presentation mastery.'
    },
    {
      icon: Megaphone,
      title: 'Marketing Support',
      description: 'Leverage national digital marketing campaigns, luxury brand collateral, and regional event toolkits.'
    },
    {
      icon: Wrench,
      title: 'Installation Guidance',
      description: 'Standardized installation protocols, technician certification programs, and quality control checklists.'
    },
    {
      icon: FileSpreadsheet,
      title: 'Project Planning',
      description: 'Access 3D rendering software workflows, automated CAD quotation engines, and precise engineering estimates.'
    },
    {
      icon: Building2,
      title: 'Dedicated Business Support',
      description: 'Direct access to dedicated franchise operations managers for supply chain and daily operational support.'
    },
    {
      icon: Layers,
      title: 'Premium Product Collection',
      description: 'Full portfolio of Italian modular kitchens, bespoke wardrobe systems, premium veneers, and European hardware.'
    }
  ];

  /* Section 05 Process Timeline Steps */
  const processSteps = [
    {
      step: '01',
      title: 'Submit Enquiry',
      description: 'Fill out our franchise enquiry form with your business background, location, and investment preferences.'
    },
    {
      step: '02',
      title: 'Initial Discussion',
      description: 'Our franchise expansion team conducts an exploratory dialogue to evaluate vision and mutual alignment.'
    },
    {
      step: '03',
      title: 'Business Evaluation',
      description: 'Detailed analysis of proposed location, territory potential, showroom feasibility, and financial modeling.'
    },
    {
      step: '04',
      title: 'Showroom Planning',
      description: 'Collaborative architectural design, sample selection, lighting setup, and display mockups.'
    },
    {
      step: '05',
      title: 'Partnership & Launch',
      description: 'Formal agreement execution, staff orientation, stock dispatch, and high-profile grand opening.'
    }
  ];

  /* Section 06 Customer Highlights */
  const customerHighlights = [
    { title: 'Timeless Design', description: 'Architectural proportion, clean lines, and refined aesthetic harmony.' },
    { title: 'Premium Materials', description: 'Hand-selected European veneers, Italian lacquers, and precision Blum hardware.' },
    { title: 'Expert Installation', description: 'Certified installation master technicians delivering millimeter-level fitting.' },
    { title: 'Luxury Experience', description: 'Bespoke design consultations and white-glove aftercare.' }
  ];

  return (
    <div className="page-franchise-enquiry" style={{ backgroundColor: 'var(--color-surface-dark)', color: 'var(--color-text-primary)' }}>
      <Header />

      <main id="main-content" style={{ paddingTop: '75px' }}>

        {/* ==========================================================================
           SECTION 1: HERO — 50/50 SPLIT SCREEN HERO (EXACT SAME AS ABOUT PAGE)
           ========================================================================== */}
        <section
          id="hero"
          aria-label="Franchise Enquiry Split Hero"
          className="hero-split-container"
          style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100vw',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: '#F7F5F1',
            overflow: 'hidden',
          }}
        >
          {/* --- LEFT COLUMN: FULL-HEIGHT EDGE-TO-EDGE ARCHITECTURAL IMAGE (~50%) --- */}
          <div
            style={{
              position: 'relative',
              height: '100%',
              minHeight: '100vh',
              width: '100%',
              overflow: 'hidden',
              backgroundColor: '#181818',
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageRevealVariants}
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transform: `translateY(${parallaxY}px)`,
                willChange: 'transform, clip-path',
              }}
            >
              <img loading="lazy"
                src={images.franchiseHero}
                alt="LEOZ CUCINE Luxury Interior Showroom Architecture"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  display: 'block',
                }}
              />
              {/* Subtle Ambient Vignette Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(24, 24, 24, 0.15) 0%, transparent 60%, rgba(24, 24, 24, 0.3) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: EDITORIAL TYPOGRAPHY MATCHING ABOUT PAGE --- */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: 'clamp(140px, 14vh, 200px) clamp(32px, 5vw, 80px)',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              style={{
                maxWidth: '480px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {/* 1. Large Editorial Heading in LEOZ CUCINE Serif */}
              <h1
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'clamp(38px, 4.8vw, 74px)',
                  fontWeight: 300,
                  lineHeight: '1.06',
                  color: '#181818',
                  marginBottom: '28px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                <motion.span variants={heroTextItemVariants} style={{ display: 'inline-block', marginRight: '0.25em' }}>Partner With</motion.span>
                <motion.span variants={heroTextItemVariants} style={{ display: 'inline-block' }}>Leoz Cucine</motion.span>
              </h1>

              {/* 2. Description Paragraph in LEOZ CUCINE Sans */}
              <motion.p
                variants={heroTextItemVariants}
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'clamp(14px, 1.25vw, 17px)',
                  fontWeight: 300,
                  lineHeight: '1.7',
                  color: '#595959',
                  maxWidth: '450px',
                  margin: '0 auto 28px auto',
                  textAlign: 'center',
                }}
              >
                Bring premium modular kitchens &amp; wardrobes to your city.
              </motion.p>
            </motion.div>
          </div>

          {/* Responsive CSS Overrides for Split Layout */}
          <style>{`
            @media (max-width: 1023px) {
              .hero-split-container {
                display: flex !important;
                flex-direction: column !important;
                min-height: auto !important;
                width: 100% !important;
              }
              .hero-split-container > div:first-of-type {
                min-height: 360px !important;
                height: 45vh !important;
                order: 2 !important;
              }
              .hero-split-container > div:last-of-type {
                padding-top: 110px !important;
                padding-bottom: 40px !important;
                padding-left: clamp(20px, 4vw, 40px) !important;
                padding-right: clamp(20px, 4vw, 40px) !important;
                order: 1 !important;
              }
            }
          `}</style>
        </section>

        {/* ==========================================================================
           SECTION 2: WHY PARTNER WITH LEOZ CUCINE (DEEP LUXURY NAVY)
           ========================================================================== */}
        <section
          aria-label="Why Partner With LEOZ CUCINE"
          style={{
            paddingTop: 'var(--space-section-padding-desktop)',
            paddingBottom: 'var(--space-section-padding-desktop)',
            paddingLeft: '6vw',
            paddingRight: '6vw',
            backgroundColor: '#181818',
            color: '#FFFFFF',
          }}
        >
          <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={staggerContainer}
              style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}
            >
              <motion.h2
                variants={staggerItem}
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'clamp(32px, 4vw, 54px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  marginBottom: '18px',
                  lineHeight: '1.14',
                }}
              >
                Why Partner With Us
              </motion.h2>

              <motion.p
                variants={staggerItem}
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'clamp(15px, 1.2vw, 17px)',
                  fontWeight: 300,
                  lineHeight: '1.75',
                  color: '#B0ABA2',
                  maxWidth: '640px',
                  margin: '0 auto',
                }}
              >
                Join a recognized luxury interior brand backed by end-to-end operational support, fine craftsmanship, and sustained commercial growth.
              </motion.p>
            </motion.div>

            {/* 4 Premium Cards Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={staggerContainer}
              className="why-partner-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '28px',
              }}
            >
              {whyPartnerCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    variants={staggerItem}
                    className="editorial-card-hover"
                    style={{
                      backgroundColor: '#202020',
                      padding: '36px 28px',
                      borderRadius: '12px',
                      border: '1px solid rgba(182, 154, 107, 0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                      transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(182, 154, 107, 0.1)',
                        border: '1px solid rgba(182, 154, 107, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '24px',
                        color: '#B69A6B',
                      }}
                    >
                      <IconComponent size={22} strokeWidth={1.5} />
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-family-serif)',
                        fontSize: '22px',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        marginBottom: '14px',
                        lineHeight: '1.25',
                      }}
                    >
                      {card.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '13.5px',
                        fontWeight: 300,
                        lineHeight: '1.65',
                        color: '#B0ABA2',
                        margin: 0,
                      }}
                    >
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ==========================================================================
           SECTION 3: WHO CAN APPLY (LIGHT IVORY STONE — CONTRAST MATCHING FOUNDER'S NOTE)
           ========================================================================== */}
        <section
          aria-label="Who Can Become a Franchise Partner"
          style={{
            paddingTop: 'var(--space-section-padding-desktop)',
            paddingBottom: 'var(--space-section-padding-desktop)',
            paddingLeft: '6vw',
            paddingRight: '6vw',
            backgroundColor: '#F7F5F1',
            color: '#181818',
          }}
        >
          <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={staggerContainer}
              style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}
            >
              <motion.h2
                variants={staggerItem}
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'clamp(32px, 4vw, 54px)',
                  fontWeight: 300,
                  color: '#181818',
                  marginBottom: '18px',
                  lineHeight: '1.14',
                }}
              >
                Who Can Become a Franchise Partner?
              </motion.h2>

              <motion.p
                variants={staggerItem}
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'clamp(15px, 1.2vw, 17px)',
                  fontWeight: 300,
                  lineHeight: '1.75',
                  color: '#595959',
                  maxWidth: '620px',
                  margin: '0 auto',
                }}
              >
                We collaborate with ambitious professionals and organizations dedicated to establishing luxury residential landmarks.
              </motion.p>
            </motion.div>

            {/* 6 Elegant Cards Grid on Light Background */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={staggerContainer}
              className="ideal-partners-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '28px',
              }}
            >
              {idealPartners.map((partner) => {
                const IconComponent = partner.icon;
                return (
                  <motion.div
                    key={partner.title}
                    variants={staggerItem}
                    className="editorial-card-hover"
                    style={{
                      backgroundColor: '#FFFFFF',
                      padding: '34px 28px',
                      borderRadius: '12px',
                      border: '1px solid rgba(182, 154, 107, 0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                      transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '16px',
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(182, 154, 107, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#B69A6B',
                          flexShrink: 0,
                        }}
                      >
                        <IconComponent size={22} strokeWidth={1.5} />
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-family-serif)',
                          fontSize: '21px',
                          fontWeight: 400,
                          color: '#181818',
                          margin: 0,
                        }}
                      >
                        {partner.title}
                      </h3>
                    </div>

                    <p
                      style={{
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '13.5px',
                        fontWeight: 300,
                        lineHeight: '1.65',
                        color: '#595959',
                        margin: 0,
                      }}
                    >
                      {partner.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ==========================================================================
           SECTION 4: WHAT YOU RECEIVE (DEEP LUXURY NAVY #181818)
           ========================================================================== */}
        <section
          aria-label="What You Receive as a Franchise Partner"
          style={{
            paddingTop: 'var(--space-section-padding-desktop)',
            paddingBottom: 'var(--space-section-padding-desktop)',
            paddingLeft: '6vw',
            paddingRight: '6vw',
            backgroundColor: '#181818',
            color: '#FFFFFF',
          }}
        >
          <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={staggerContainer}
              style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}
            >
              <motion.h2
                variants={staggerItem}
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'clamp(32px, 4vw, 54px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  marginBottom: '18px',
                  lineHeight: '1.14',
                }}
              >
                Everything You Need to Build a Successful Business
              </motion.h2>

              <motion.p
                variants={staggerItem}
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'clamp(15px, 1.2vw, 17px)',
                  fontWeight: 300,
                  lineHeight: '1.75',
                  color: '#B0ABA2',
                  maxWidth: '640px',
                  margin: '0 auto',
                }}
              >
                A comprehensive 360-degree operational framework designed to accelerate setup, guarantee quality execution, and drive sustained profitability.
              </motion.p>
            </motion.div>

            {/* 8 Grid Items */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={staggerContainer}
              className="advantage-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px',
              }}
            >
              {advantageItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={staggerItem}
                    className="editorial-card-hover"
                    style={{
                      backgroundColor: '#202020',
                      padding: '30px 24px',
                      borderRadius: '12px',
                      border: '1px solid rgba(182, 154, 107, 0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                      transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px',
                        color: '#B69A6B',
                      }}
                    >
                      <IconComponent size={22} strokeWidth={1.5} />
                      <span
                        style={{
                          fontFamily: 'var(--font-family-sans)',
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.2em',
                          opacity: 0.6,
                        }}
                      >
                        0{idx + 1}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-family-serif)',
                        fontSize: '19px',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        marginBottom: '10px',
                        lineHeight: '1.28',
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '13px',
                        fontWeight: 300,
                        lineHeight: '1.6',
                        color: '#B0ABA2',
                        margin: 0,
                      }}
                    >
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ==========================================================================
           SECTION 5: HOW THE PROCESS WORKS (LIGHT IVORY STONE #F7F5F1)
           ========================================================================== */}
        <section
          aria-label="Franchise Process Timeline"
          style={{
            paddingTop: 'var(--space-section-padding-desktop)',
            paddingBottom: 'var(--space-section-padding-desktop)',
            paddingLeft: '6vw',
            paddingRight: '6vw',
            backgroundColor: '#F7F5F1',
            color: '#181818',
          }}
        >
          <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={staggerContainer}
              style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}
            >
              <motion.h2
                variants={staggerItem}
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'clamp(32px, 4vw, 54px)',
                  fontWeight: 300,
                  color: '#181818',
                  marginBottom: '18px',
                  lineHeight: '1.14',
                }}
              >
                Your Franchise Journey
              </motion.h2>

              <motion.p
                variants={staggerItem}
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'clamp(15px, 1.2vw, 17px)',
                  fontWeight: 300,
                  lineHeight: '1.75',
                  color: '#595959',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                A structured five-step path from initial inquiry to a flourishing luxury interior flagship store.
              </motion.p>
            </motion.div>

            {/* Horizontal Timeline Container */}
            <div style={{ position: 'relative' }}>
              {/* Connecting Line (Desktop) */}
              <div
                className="timeline-line-desktop"
                style={{
                  position: 'absolute',
                  top: '28px',
                  left: '8%',
                  right: '8%',
                  height: '1px',
                  background: 'linear-gradient(90deg, rgba(182, 154, 107, 0.2) 0%, rgba(182, 154, 107, 0.7) 50%, rgba(182, 154, 107, 0.2) 100%)',
                  zIndex: 0,
                }}
              />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={staggerContainer}
                className="timeline-steps-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '20px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {processSteps.map((stepItem) => (
                  <motion.div
                    key={stepItem.step}
                    variants={staggerItem}
                    className="editorial-card-hover"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(182, 154, 107, 0.25)',
                      borderRadius: '12px',
                      padding: '30px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                      transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Number Badge */}
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: '#181818',
                        border: '1px solid #B69A6B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        color: '#B69A6B',
                        marginBottom: '20px',
                        boxShadow: '0 0 14px rgba(182, 154, 107, 0.3)',
                      }}
                    >
                      {stepItem.step}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-family-serif)',
                        fontSize: '18px',
                        fontWeight: 400,
                        color: '#181818',
                        marginBottom: '10px',
                        lineHeight: '1.25',
                      }}
                    >
                      {stepItem.title}
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '12.5px',
                        fontWeight: 300,
                        lineHeight: '1.6',
                        color: '#595959',
                        margin: 0,
                      }}
                    >
                      {stepItem.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
           SECTION 6: WHY CUSTOMERS CHOOSE LEOZ CUCINE (EDITORIAL SPLIT GRID)
           ========================================================================== */}
        <section
          aria-label="Why Customers Choose LEOZ CUCINE"
          style={{
            paddingTop: 'var(--space-section-padding-desktop)',
            paddingBottom: 'var(--space-section-padding-desktop)',
            paddingLeft: '6vw',
            paddingRight: '6vw',
            backgroundColor: '#181818',
            color: '#FFFFFF',
          }}
        >
          <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <div
              className="about-craftsmanship-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: 'clamp(40px, 6vw, 100px)',
                alignItems: 'center',
              }}
            >
              {/* Left: Large Luxury Showroom Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, ease: luxuryEase }}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(182, 154, 107, 0.2)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                }}
              >
                <ParallaxImage yOffset={30}>
                  <img loading="lazy"
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90"
                    alt="LEOZ CUCINE Architectural Interior Excellence"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </ParallaxImage>
              </motion.div>

              {/* Right: Editorial Content & 4 Highlight Points */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={containerVariants}
              >
                <motion.h2
                  variants={itemVariants}
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: 'clamp(30px, 3.2vw, 44px)',
                    fontWeight: 300,
                    color: '#FFFFFF',
                    lineHeight: '1.15',
                    marginBottom: '20px',
                  }}
                >
                  Trusted by Homeowners Across Premium Spaces
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  style={{
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: 'clamp(15px, 1.2vw, 17px)',
                    fontWeight: 300,
                    lineHeight: '1.75',
                    color: '#B0ABA2',
                    marginBottom: '32px',
                  }}
                >
                  LEOZ CUCINE brings together Italian architectural aesthetics, German hardware precision, and meticulous craftsmanship to create residential spaces of enduring beauty.
                </motion.p>

                {/* 4 Highlight Points Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '24px',
                  }}
                >
                  {customerHighlights.map((highlight) => (
                    <motion.div key={highlight.title} variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B69A6B' }}>
                        <CheckCircle size={17} strokeWidth={2} />
                        <h4
                          style={{
                            fontFamily: 'var(--font-family-serif)',
                            fontSize: '18px',
                            fontWeight: 400,
                            color: '#FFFFFF',
                            margin: 0,
                          }}
                        >
                          {highlight.title}
                        </h4>
                      </div>
                      <p
                        style={{
                          fontFamily: 'var(--font-family-sans)',
                          fontSize: '12.5px',
                          fontWeight: 300,
                          lineHeight: '1.55',
                          color: '#B0ABA2',
                          margin: 0,
                        }}
                      >
                        {highlight.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
           SECTION 7: FRANCHISE ENQUIRY FORM (MATCHING CONTACT FORM STYLE)
           ========================================================================== */}
        <section
          id="enquiry-form"
          aria-label="Franchise Enquiry Form"
          style={{
            paddingTop: 'var(--space-section-padding-desktop)',
            paddingBottom: 'var(--space-section-padding-desktop)',
            paddingLeft: '6vw',
            paddingRight: '6vw',
            backgroundColor: '#202020',
            color: '#FFFFFF',
          }}
        >
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={staggerContainer}
              style={{ textAlign: 'center', marginBottom: '44px' }}
            >
              <motion.h2
                variants={itemVariants}
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'clamp(32px, 4vw, 54px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  marginBottom: '16px',
                  lineHeight: '1.14',
                }}
              >
                Franchise Enquiry Form
              </motion.h2>

              <motion.p
                variants={itemVariants}
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'clamp(15px, 1.2vw, 17px)',
                  fontWeight: 300,
                  color: '#B0ABA2',
                  maxWidth: '580px',
                  margin: '0 auto',
                  lineHeight: '1.7',
                }}
              >
                Complete the details below to request a confidential franchise prospectus and schedule a private partnership dialogue.
              </motion.p>
            </motion.div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  backgroundColor: '#202020',
                  border: '1px solid #B69A6B',
                  borderRadius: '12px',
                  padding: '56px 36px',
                  textAlign: 'center',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(182, 154, 107, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#B69A6B',
                    margin: '0 auto 24px auto',
                  }}
                >
                  <Check size={32} strokeWidth={2} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: '28px',
                    fontWeight: 400,
                    color: '#FFFFFF',
                    marginBottom: '14px',
                  }}
                >
                  Enquiry Received
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#B0ABA2',
                    maxWidth: '480px',
                    margin: '0 auto 28px auto',
                    lineHeight: '1.65',
                  }}
                >
                  Thank you for your interest in partnering with LEOZ CUCINE. Our senior franchise development director will review your details and connect with you shortly.
                </p>

                <button
                  onClick={() => setFormSubmitted(false)}
                  className="btn-secondary"
                >
                  Submit Another Enquiry
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: '#202020',
                  border: '1px solid rgba(182, 154, 107, 0.25)',
                  borderRadius: '12px',
                  padding: 'clamp(28px, 4vw, 48px)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px',
                  }}
                  className="form-row-2col"
                >
                  {/* Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label
                      htmlFor="fullName"
                      style={{
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#B69A6B',
                      }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Alexander Vance"
                      className="contact-form-input"
                      style={{
                        width: '100%',
                        backgroundColor: '#181818',
                        border: '1px solid rgba(182, 154, 107, 0.25)',
                        borderRadius: '6px',
                        padding: '14px 18px',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '13.5px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label
                      htmlFor="phone"
                      style={{
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#B69A6B',
                      }}
                    >
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="contact-form-input"
                      style={{
                        width: '100%',
                        backgroundColor: '#181818',
                        border: '1px solid rgba(182, 154, 107, 0.25)',
                        borderRadius: '6px',
                        padding: '14px 18px',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '13.5px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px',
                  }}
                  className="form-row-2col"
                >
                  {/* Email */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label
                      htmlFor="email"
                      style={{
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#B69A6B',
                      }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alexander@example.com"
                      className="contact-form-input"
                      style={{
                        width: '100%',
                        backgroundColor: '#181818',
                        border: '1px solid rgba(182, 154, 107, 0.25)',
                        borderRadius: '6px',
                        padding: '14px 18px',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '13.5px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* City / Region of Interest */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label
                      htmlFor="cityRegion"
                      style={{
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#B69A6B',
                      }}
                    >
                      City / Region of Interest *
                    </label>
                    <input
                      type="text"
                      id="cityRegion"
                      name="cityRegion"
                      required
                      value={formData.cityRegion}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai, Bengaluru, Ahmedabad"
                      className="contact-form-input"
                      style={{
                        width: '100%',
                        backgroundColor: '#181818',
                        border: '1px solid rgba(182, 154, 107, 0.25)',
                        borderRadius: '6px',
                        padding: '14px 18px',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '13.5px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px',
                  }}
                  className="form-row-2col"
                >
                  {/* Business Background (optional) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label
                      htmlFor="businessBackground"
                      style={{
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#B69A6B',
                      }}
                    >
                      Business Background (optional)
                    </label>
                    <input
                      type="text"
                      id="businessBackground"
                      name="businessBackground"
                      value={formData.businessBackground}
                      onChange={handleInputChange}
                      placeholder="e.g. Interior Design / Retail"
                      className="contact-form-input"
                      style={{
                        width: '100%',
                        backgroundColor: '#181818',
                        border: '1px solid rgba(182, 154, 107, 0.25)',
                        borderRadius: '6px',
                        padding: '14px 18px',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '13.5px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  {/* Investment Range (dropdown, optional) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label
                      htmlFor="investmentRange"
                      style={{
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#B69A6B',
                      }}
                    >
                      Investment Range (optional)
                    </label>
                    <select
                      id="investmentRange"
                      name="investmentRange"
                      value={formData.investmentRange}
                      onChange={handleInputChange}
                      className="contact-form-input"
                      style={{
                        width: '100%',
                        backgroundColor: '#181818',
                        border: '1px solid rgba(182, 154, 107, 0.25)',
                        borderRadius: '6px',
                        padding: '14px 18px',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-family-sans)',
                        fontSize: '13.5px',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option>
                      <option value="₹1 Crore - ₹2 Crore">₹1 Crore - ₹2 Crore</option>
                      <option value="₹2 Crore +">₹2 Crore +</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
                  <label
                    htmlFor="message"
                    style={{
                      fontFamily: 'var(--font-family-sans)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#B69A6B',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your background, vision, or any specific questions..."
                    className="contact-form-input"
                    style={{
                      width: '100%',
                      backgroundColor: '#181818',
                      border: '1px solid rgba(182, 154, 107, 0.25)',
                      borderRadius: '6px',
                      padding: '14px 18px',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-family-sans)',
                      fontSize: '13.5px',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div style={{ textAlign: 'center' }}>
                  <button type="submit" className="btn-primary" style={{ width: '100%', maxWidth: '320px' }}>
                    Submit Enquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ==========================================================================
           SECTION 8: FINAL CTA
           ========================================================================== */}
        <section
          aria-label="Final Call to Action"
          style={{
            paddingTop: 'var(--space-section-padding-desktop)',
            paddingBottom: 'var(--space-section-padding-desktop)',
            paddingLeft: '6vw',
            paddingRight: '6vw',
            backgroundColor: '#181818',
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={staggerItem}
                style={{
                  fontFamily: 'var(--font-family-serif)',
                  fontSize: 'clamp(32px, 4vw, 54px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  marginBottom: '20px',
                  lineHeight: '1.12',
                }}
              >
                Let's Build Something Extraordinary Together
              </motion.h2>

              <motion.p
                variants={staggerItem}
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'clamp(15px, 1.2vw, 18px)',
                  color: '#B0ABA2',
                  fontWeight: 300,
                  lineHeight: '1.7',
                  maxWidth: '640px',
                  margin: '0 auto',
                }}
              >
                Become part of the LEOZ CUCINE network and create exceptional spaces with a brand built on quality, craftsmanship, and trust.
              </motion.p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Embedded CSS Hover & Responsive Utilities */}
      <style>{`
        .contact-form-input {
          transition: border-color 300ms var(--motion-ease-luxury), box-shadow 300ms var(--motion-ease-luxury) !important;
        }
        .contact-form-input:focus {
          border-color: #B69A6B !important;
          box-shadow: 0 0 0 2px rgba(182, 154, 107, 0.15) !important;
        }
        .editorial-card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(182, 154, 107, 0.45) !important;
          box-shadow: 0 16px 40px -10px rgba(24, 24, 24, 0.35) !important;
        }

        @media (max-width: 1023px) {
          .timeline-line-desktop {
            display: none !important;
          }
          .timeline-steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 639px) {
          .form-row-2col,
          .timeline-steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FranchiseEnquiry;
