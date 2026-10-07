import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Factory,
  Compass,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Sparkles,
  ChevronDown,
  Building,
  TrendingUp,
  MapPin,
  FileText,
  Phone,
  Mail,
} from 'lucide-react';
import { submitEnquiryForm } from '../lib/submitEnquiryForm';
import { LeozEmblem } from '../components/common/LeozEmblem';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const FranchiseOpportunities: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Franchise Opportunities | LEOZ Cucine — Partner With Us',
    'Partner with LEOZ Cucine to build a premium interior design and kitchen business backed by design expertise, manufacturing capabilities and a strong brand ecosystem.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  const scrollToEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('franchise-enquiry-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* =========================================================================
     SECTION 01: WHY LEOZ (6 BENEFIT POINTS)
     ========================================================================= */
  const whyLeozPoints = [
    {
      number: '01',
      title: 'ESTABLISHED BRAND',
      desc: 'Build your business with the credibility, architectural positioning, and discerning reputation of LEOZ.',
    },
    {
      number: '02',
      title: 'DESIGN EXPERTISE',
      desc: 'Access a refined European design language, monolithic kitchen topologies, and proven interior spatial thinking.',
    },
    {
      number: '03',
      title: 'MANUFACTURING SUPPORT',
      desc: 'Backed directly by our dedicated 20,000 sq. ft. precision manufacturing plant with 0.1mm CNC tolerances.',
    },
    {
      number: '04',
      title: 'TECHNOLOGY & PROCESS',
      desc: 'Structured 3D CAD design-to-factory computerized workflows and rigorous ERP tracking systems.',
    },
    {
      number: '05',
      title: 'MARKETING SUPPORT',
      desc: 'High-impact national brand communication, architectural campaigns, digital lead distribution, and collateral.',
    },
    {
      number: '06',
      title: 'BUSINESS GUIDANCE',
      desc: 'End-to-end guidance across luxury showroom curation, daily sales operations, and white-glove client experience.',
    },
  ];

  /* =========================================================================
     SECTION 03: WHAT YOU GET (8 COMPLETE ECOSYSTEM CARDS)
     ========================================================================= */
  const ecosystemCards = [
    {
      title: 'BRAND',
      subtitle: 'IDENTITY & POSITIONING',
      desc: 'LEOZ brand identity, architectural positioning guidelines, and trademark licensing for your territory.',
    },
    {
      title: 'SHOWROOM',
      subtitle: 'EXPERIENCE CURATION',
      desc: 'Architectural layout planning, lighting schemes, and display modules to create a stunning client environment.',
    },
    {
      title: 'DESIGN',
      subtitle: 'SYSTEMS & TEMPLATES',
      desc: 'Comprehensive 3D design libraries, standard carcass blocks, detail drawing templates, and spatial guidelines.',
    },
    {
      title: 'PRODUCT',
      subtitle: 'FULL RANGE ACCESS',
      desc: 'Full catalog access to LEOZ modular kitchens, master dressing suites, living consoles, and joinery.',
    },
    {
      title: 'MANUFACTURING',
      subtitle: 'FACTORY BACKING',
      desc: 'Direct production in our 20,000 sq. ft. automated plant with beam saws, cold presses, and 5-axis CNCs.',
    },
    {
      title: 'TRAINING',
      subtitle: 'TEAM CERTIFICATION',
      desc: 'Intensive certification for your interior designers, client relationship managers, and installation technicians.',
    },
    {
      title: 'MARKETING',
      subtitle: 'ASSETS & LEADS',
      desc: 'Curated architectural photography, print lookbooks, digital campaigns, and qualified city customer leads.',
    },
    {
      title: 'TECHNOLOGY',
      subtitle: 'DIGITAL WORKFLOWS',
      desc: 'Integrated CRM, estimation tools, order tracking portals, and direct factory file transmission systems.',
    },
  ];

  /* =========================================================================
     SECTION 04: FRANCHISE JOURNEY (8 STEPS)
     ========================================================================= */
  const journeySteps = [
    { number: '01', title: 'APPLICATION', desc: 'Submit your franchise enquiry with background profile.' },
    { number: '02', title: 'DISCOVERY', desc: 'Understand the LEOZ business model, margins, and vision.' },
    { number: '03', title: 'EVALUATION', desc: 'Discuss local market potential, location, and business fit.' },
    { number: '04', title: 'LOCATION', desc: 'Identify, audit, and finalize your flagship studio location.' },
    { number: '05', title: 'SETUP', desc: 'Build and fit-out the LEOZ luxury showroom experience.' },
    { number: '06', title: 'TRAINING', desc: 'Train and certify your design, sales, and technical teams.' },
    { number: '07', title: 'LAUNCH', desc: 'Host a grand architectural preview and launch your city studio.' },
    { number: '08', title: 'GROW', desc: 'Scale your local residential portfolio and grow with LEOZ.' },
  ];

  /* =========================================================================
     SECTION 09: FAQ ACCORDION
     ========================================================================= */
  const faqs = [
    {
      q: 'What is the LEOZ franchise model?',
      a: 'The LEOZ franchise model is an exclusive monobrand experience studio partnership. As a franchise partner, you operate a bespoke showroom, consult with homeowners and architects, and deliver turnkey interior projects backed 100% by LEOZ in-house manufacturing, design systems, and warranties.',
    },
    {
      q: 'Who can apply for a LEOZ franchise?',
      a: 'We welcome seasoned entrepreneurs, interior designers, architects, real estate professionals, and retail business owners who share our commitment to uncompromising craftsmanship, architectural aesthetics, and customer service.',
    },
    {
      q: 'What kind of location and space is required?',
      a: 'A prime commercial or high-street location with good visibility, accessible parking, and an area typically between 1,200 to 3,500 sq. ft. is recommended to showcase our kitchen monoliths, dressing suites, and materials library.',
    },
    {
      q: 'Is prior interior industry experience required?',
      a: 'While background experience in architecture, design, or luxury retail is valuable, it is not mandatory. LEOZ provides comprehensive training covering design systems, estimation, technical hardware, and operational workflows.',
    },
    {
      q: 'What support does LEOZ provide?',
      a: 'LEOZ provides end-to-end support including showroom layout architecture, display modules, 3D CAD training, direct factory manufacturing, software systems, marketing collateral, and qualified territory lead generation.',
    },
    {
      q: 'What does the showroom setup involve?',
      a: 'The setup involves building experiential live display kitchens, master walk-in wardrobe suites, a tactile material exploration bar, and client consultation lounges designed directly by the LEOZ spatial design team.',
    },
    {
      q: 'What training is provided to our team?',
      a: 'We offer specialized training modules for designers (3D CAD, space planning), sales consultants (luxury customer management, product knowledge), and installation technicians (German KD hardware, laser alignment).',
    },
    {
      q: 'How does the application process work?',
      a: 'Upon submitting your enquiry, our franchise development team connects for an introductory discovery call, followed by a personal meeting, showroom tour, and territory feasibility evaluation.',
    },
    {
      q: 'What is the investment requirement?',
      a: 'Investment varies based on city tier, showroom footprint, and local fit-out costs. Detailed financial models and capital estimates are discussed transparently during the evaluation phase.',
    },
    {
      q: 'How long does the setup process take?',
      a: 'From signing the franchise agreement and finalizing the retail site, a typical LEOZ showroom setup and launch takes approximately 60 to 90 days.',
    },
  ];

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  /* =========================================================================
     SECTION 10: FRANCHISE ENQUIRY FORM STATE & HANDLER
     ========================================================================= */
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    profession: '',
    experience: '',
    investmentRange: '₹50 Lakhs – ₹1 Crore',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your contact number.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit number.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.city.trim()) errs.city = 'Please enter your target city.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      await submitEnquiryForm({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        city: `${formData.city}${formData.state ? `, ${formData.state}` : ''}`,
        projectType: 'Franchise Partnership Enquiry',
        projectSize: `Exp: ${formData.experience || 'N/A'} | Budget: ${formData.investmentRange}`,
        message: `Profession: ${formData.profession || 'N/A'}\nNotes: ${formData.message || 'None'}`,
        formType: 'Franchise_Opportunities_Page',
      });
      setFormSubmitted(true);
    } catch {
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FAF9F6', color: '#161514', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section
          aria-label="Franchise Hero"
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
          {/* Background Image */}
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
              background: 'linear-gradient(180deg, rgba(22, 21, 20, 0.25) 0%, rgba(22, 21, 20, 0.45) 40%, rgba(22, 21, 20, 0.92) 95%)',
            }}
          />

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
            <div style={{ maxWidth: '860px' }}>
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
                BUSINESS PARTNERSHIP PROGRAMME
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(36px, 5.6vw, 68px)',
                  fontWeight: 300,
                  lineHeight: 1.06,
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  margin: '0 0 18px 0',
                }}
              >
                Build the Future of
                <br />
                Interiors with LEOZ.
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
                  maxWidth: '680px',
                  margin: '0 0 32px 0',
                }}
              >
                Partner with LEOZ to build a premium interior design and kitchen business backed by design expertise, manufacturing capabilities and a strong brand ecosystem.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: luxuryEase }}
                style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
              >
                <a
                  href="#franchise-enquiry-section"
                  onClick={scrollToEnquiry}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    backgroundColor: '#FFFFFF',
                    color: '#161514',
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
                    e.currentTarget.style.backgroundColor = '#B69A6B';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = '#161514';
                  }}
                >
                  BECOME A FRANCHISE PARTNER
                  <ArrowRight size={14} />
                </a>

                <a
                  href="#franchise-enquiry-section"
                  onClick={scrollToEnquiry}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 28px',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
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
                    e.currentTarget.style.borderColor = '#B69A6B';
                    e.currentTarget.style.color = '#B69A6B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  DOWNLOAD FRANCHISE BROCHURE
                  <FileText size={14} />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 01: WHY PARTNER WITH LEOZ?
            ========================================================================= */}
        <section
          aria-label="Why Partner With LEOZ"
          style={{
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(44px, 6vw, 72px)' }}>
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
                COMPETITIVE ADVANTAGE
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 300,
                  color: '#161514',
                  margin: '0 0 14px 0',
                }}
              >
                Why Partner With LEOZ?
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  color: '#716B61',
                  maxWidth: '620px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                A high-margin business model combining bespoke architectural design with direct in-house factory manufacturing.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(20px, 3vw, 32px)',
              }}
            >
              {whyLeozPoints.map((item, idx) => (
                <div
                  key={item.number}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(22, 21, 20, 0.08)',
                    borderRadius: '3px',
                    padding: 'clamp(24px, 3.5vw, 36px)',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                    transition: 'all 0.3s ease',
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
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '32px',
                      fontWeight: 300,
                      color: '#B69A6B',
                      marginBottom: '12px',
                      display: 'block',
                    }}
                  >
                    {item.number}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '20px',
                      fontWeight: 400,
                      color: '#161514',
                      margin: '0 0 10px 0',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13.5px',
                      color: '#716B61',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 02: THE LEOZ BUSINESS MODEL (EDITORIAL SPLIT SCREEN)
            ========================================================================= */}
        <section
          aria-label="The LEOZ Business Model"
          style={{
            backgroundColor: '#161514',
            color: '#FFFFFF',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(40px, 6vw, 80px)',
                alignItems: 'center',
              }}
              className="leoz-responsive-split"
            >
              {/* Left Image */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 0.95', overflow: 'hidden', borderRadius: '3px' }}>
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                  alt="LEOZ Designer Consulting with Client"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: '1px solid rgba(182, 154, 107, 0.3)',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Right Content */}
              <div>
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
                  INTEGRATED VALUE CHAIN
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(30px, 4.2vw, 52px)',
                    fontWeight: 300,
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    margin: '0 0 20px 0',
                  }}
                >
                  A Business Built
                  <br />
                  Around Design.
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    color: 'rgba(255, 255, 255, 0.75)',
                    lineHeight: 1.7,
                    margin: '0 0 32px 0',
                  }}
                >
                  The LEOZ franchise ecosystem seamlessly unites spatial design, luxury showroom experiences, client consultations, automated factory production, and certified turnkey installations under one unified standard.
                </p>

                {/* Flow Diagram */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '20px',
                    backgroundColor: '#1E1D1B',
                    borderRadius: '3px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <span style={{ fontSize: '10.5px', color: '#B69A6B', letterSpacing: '0.15em', fontWeight: 600 }}>
                    THE TURNKEY VALUE STREAM
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-body)',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span>CUSTOMER</span>
                    <span style={{ color: '#B69A6B' }}>→</span>
                    <span>DESIGN</span>
                    <span style={{ color: '#B69A6B' }}>→</span>
                    <span>PRODUCTION</span>
                    <span style={{ color: '#B69A6B' }}>→</span>
                    <span>INSTALLATION</span>
                    <span style={{ color: '#B69A6B' }}>→</span>
                    <span style={{ color: '#B69A6B', fontWeight: 600 }}>COMPLETED SPACE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: WHAT YOU GET (COMPLETE ECOSYSTEM)
            ========================================================================= */}
        <section
          aria-label="What You Get"
          style={{
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(44px, 6vw, 72px)' }}>
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
                COMPREHENSIVE ENABLEMENT
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 300,
                  color: '#161514',
                  margin: '0 0 14px 0',
                }}
              >
                More Than a Franchise.
                <br />
                A Complete Business Ecosystem.
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {ecosystemCards.map((card) => (
                <div
                  key={card.title}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(22, 21, 20, 0.08)',
                    borderRadius: '2px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
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
                  <span style={{ fontSize: '10px', color: '#B69A6B', letterSpacing: '0.15em', fontWeight: 600, marginBottom: '6px' }}>
                    {card.subtitle}
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
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: '#716B61',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 04: FRANCHISE JOURNEY
            ========================================================================= */}
        <section
          aria-label="Franchise Journey"
          style={{
            backgroundColor: '#161514',
            color: '#FFFFFF',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(44px, 6vw, 72px)' }}>
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
                THE ROADMAP
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                From Partner to Business Owner.
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
              }}
            >
              {journeySteps.map((step) => (
                <div
                  key={step.number}
                  style={{
                    backgroundColor: '#1E1D1B',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '2px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '24px',
                      color: '#B69A6B',
                      marginBottom: '8px',
                      display: 'block',
                    }}
                  >
                    {step.number}
                  </span>
                  <strong style={{ fontSize: '15px', color: '#FFFFFF', marginBottom: '6px' }}>{step.title}</strong>
                  <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.55, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 05: IDEAL FRANCHISE PARTNER
            ========================================================================= */}
        <section
          aria-label="Ideal Franchise Partner"
          style={{
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
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
              MUTUAL FIT &amp; VALUES
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 4vw, 46px)',
                fontWeight: 300,
                color: '#161514',
                margin: '0 0 24px 0',
              }}
            >
              Who We Are Looking For
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                color: '#716B61',
                lineHeight: 1.7,
                marginBottom: '36px',
              }}
            >
              We seek visionary partners with an entrepreneurial mindset, strong local high-net-worth networks, an appreciation for architectural design, business management capabilities, and an uncompromised commitment to customer service.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              {[
                'Entrepreneurial Mindset',
                'Strong Local Network',
                'Interest in Design & Interiors',
                'Customer-Focused Approach',
                'Business Management Capability',
                'Commitment to Premium Service',
                'Long-Term Growth Mindset',
              ].map((pill) => (
                <span
                  key={pill}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(22, 21, 20, 0.12)',
                    borderRadius: '2px',
                    fontSize: '12px',
                    fontFamily: 'var(--font-body)',
                    color: '#161514',
                    fontWeight: 500,
                  }}
                >
                  ✓ {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 07: FRANCHISE LOCATIONS & EXPANSION
            ========================================================================= */}
        <section
          aria-label="Franchise Locations"
          style={{
            backgroundColor: '#161514',
            color: '#FFFFFF',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(44px, 6vw, 72px)' }}>
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
                TERRITORY AVAILABILITY
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: '0 0 14px 0',
                }}
              >
                Bring LEOZ to Your City.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(255, 255, 255, 0.75)',
                  maxWidth: '600px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                Operating experience studios in Ahmedabad and Surat, with selective franchise expansion opportunities across tier-1 and high-growth luxury markets across India (Subject to availability).
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              <div
                style={{
                  padding: '28px',
                  backgroundColor: '#1E1D1B',
                  borderRadius: '3px',
                  border: '1px solid rgba(182, 154, 107, 0.4)',
                }}
              >
                <span style={{ fontSize: '10.5px', color: '#B69A6B', letterSpacing: '0.15em', fontWeight: 600 }}>
                  CURRENT FLAGSHIP
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: '#FFFFFF', margin: '6px 0 10px 0' }}>
                  Ahmedabad Studio
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5, margin: 0 }}>
                  Sindhu Bhavan Road / Bodakdev Flagship Materials Lab.
                </p>
              </div>

              <div
                style={{
                  padding: '28px',
                  backgroundColor: '#1E1D1B',
                  borderRadius: '3px',
                  border: '1px solid rgba(182, 154, 107, 0.4)',
                }}
              >
                <span style={{ fontSize: '10.5px', color: '#B69A6B', letterSpacing: '0.15em', fontWeight: 600 }}>
                  CURRENT STUDIO
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: '#FFFFFF', margin: '6px 0 10px 0' }}>
                  Surat Studio
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5, margin: 0 }}>
                  Dumas Road &amp; VIP Road Junction, Vesu Living Experience Centre.
                </p>
              </div>

              <div
                style={{
                  padding: '28px',
                  backgroundColor: '#1E1D1B',
                  borderRadius: '3px',
                  border: '1px dashed rgba(255, 255, 255, 0.25)',
                }}
              >
                <span style={{ fontSize: '10.5px', color: '#FFFFFF', letterSpacing: '0.15em', fontWeight: 600, opacity: 0.6 }}>
                  EXPANSION MARKETS
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: '#B69A6B', margin: '6px 0 10px 0' }}>
                  Your City
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5, margin: 0 }}>
                  Mumbai, Pune, Bengaluru, Hyderabad, Delhi NCR, Jaipur, Vadodara, Rajkot &amp; more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 09: FAQ ACCORDION
            ========================================================================= */}
        <section
          aria-label="Franchise FAQ"
          style={{
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(44px, 6vw, 64px)' }}>
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
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(28px, 4vw, 46px)',
                  fontWeight: 300,
                  color: '#161514',
                  margin: 0,
                }}
              >
                Everything You Need to Know
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, idx) => (
                <div
                  key={faq.q}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(22, 21, 20, 0.08)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '17px',
                      fontWeight: 400,
                      color: '#161514',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        color: '#B69A6B',
                        flexShrink: 0,
                        marginLeft: '12px',
                      }}
                    />
                  </button>

                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: luxuryEase }}
                      >
                        <div
                          style={{
                            padding: '0 24px 20px 24px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '13.5px',
                            color: '#716B61',
                            lineHeight: 1.65,
                            borderTop: '1px solid rgba(22, 21, 20, 0.05)',
                          }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: FRANCHISE ENQUIRY FORM (THE CONVERSION ENGINE)
            ========================================================================= */}
        <section
          id="franchise-enquiry-section"
          aria-label="Franchise Application Form"
          style={{
            backgroundColor: '#161514',
            color: '#FFFFFF',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
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
                INITIATE PARTNERSHIP
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(30px, 4.5vw, 52px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  margin: '0 0 14px 0',
                }}
              >
                Ready to Build
                <br />
                LEOZ in Your City?
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(255, 255, 255, 0.75)',
                  maxWidth: '580px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                Tell us a little about yourself and your business ambitions. Our franchise development leadership will connect with you directly.
              </p>
            </div>

            {/* Form Box */}
            <div
              style={{
                backgroundColor: '#1E1D1B',
                borderRadius: '3px',
                border: '1px solid rgba(182, 154, 107, 0.3)',
                padding: 'clamp(24px, 4.5vw, 44px)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              }}
            >
              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <LeozEmblem size={80} animate={true} color="#B69A6B" />
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '28px',
                      fontWeight: 300,
                      color: '#FFFFFF',
                      margin: '20px 0 10px 0',
                    }}
                  >
                    THANK YOU.
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14.5px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      maxWidth: '480px',
                      margin: '0 auto 28px auto',
                      lineHeight: 1.6,
                    }}
                  >
                    Our franchise development team has received your application and will connect with you shortly for a confidential discussion.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: 'transparent',
                      color: '#B69A6B',
                      border: '1px solid #B69A6B',
                      borderRadius: '2px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    SUBMIT ANOTHER APPLICATION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    {/* Full Name */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#B69A6B', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '8px' }}>
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikramaditya Mehta"
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          backgroundColor: '#161514',
                          border: `1px solid ${errors.fullName ? '#E53E3E' : 'rgba(255, 255, 255, 0.15)'}`,
                          borderRadius: '2px',
                          color: '#FFFFFF',
                          fontSize: '14px',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                        }}
                      />
                      {errors.fullName && <span style={{ fontSize: '11px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.fullName}</span>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#B69A6B', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '8px' }}>
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98250 00000"
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          backgroundColor: '#161514',
                          border: `1px solid ${errors.phone ? '#E53E3E' : 'rgba(255, 255, 255, 0.15)'}`,
                          borderRadius: '2px',
                          color: '#FFFFFF',
                          fontSize: '14px',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                        }}
                      />
                      {errors.phone && <span style={{ fontSize: '11px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    {/* Email */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#B69A6B', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '8px' }}>
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikram@enterprise.com"
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          backgroundColor: '#161514',
                          border: `1px solid ${errors.email ? '#E53E3E' : 'rgba(255, 255, 255, 0.15)'}`,
                          borderRadius: '2px',
                          color: '#FFFFFF',
                          fontSize: '14px',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                        }}
                      />
                      {errors.email && <span style={{ fontSize: '11px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                    </div>

                    {/* Target City */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#B69A6B', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '8px' }}>
                        TARGET CITY *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Mumbai, Pune, Hyderabad"
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          backgroundColor: '#161514',
                          border: `1px solid ${errors.city ? '#E53E3E' : 'rgba(255, 255, 255, 0.15)'}`,
                          borderRadius: '2px',
                          color: '#FFFFFF',
                          fontSize: '14px',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                        }}
                      />
                      {errors.city && <span style={{ fontSize: '11px', color: '#FC8181', marginTop: '4px', display: 'block' }}>{errors.city}</span>}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    {/* Current Profession */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#B69A6B', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '8px' }}>
                        CURRENT PROFESSION / BUSINESS
                      </label>
                      <input
                        type="text"
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        placeholder="e.g. Architect, Real Estate, Retailer"
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          backgroundColor: '#161514',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '2px',
                          color: '#FFFFFF',
                          fontSize: '14px',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                        }}
                      />
                    </div>

                    {/* Preferred Investment Range */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: '#B69A6B', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '8px' }}>
                        PREFERRED INVESTMENT RANGE
                      </label>
                      <select
                        value={formData.investmentRange}
                        onChange={(e) => setFormData({ ...formData, investmentRange: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          backgroundColor: '#161514',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '2px',
                          color: '#FFFFFF',
                          fontSize: '14px',
                          fontFamily: 'var(--font-body)',
                          outline: 'none',
                        }}
                      >
                        <option value="₹40 Lakhs – ₹75 Lakhs">₹40 Lakhs – ₹75 Lakhs</option>
                        <option value="₹75 Lakhs – ₹1.5 Crores">₹75 Lakhs – ₹1.5 Crores</option>
                        <option value="₹1.5 Crores – ₹3 Crores">₹1.5 Crores – ₹3 Crores</option>
                        <option value="Above ₹3 Crores">Above ₹3 Crores</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#B69A6B', letterSpacing: '0.12em', fontWeight: 600, marginBottom: '8px' }}>
                      MESSAGE &amp; BACKGROUND PROFILE
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your business background, retail space availability, or questions..."
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        backgroundColor: '#161514',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '2px',
                        color: '#FFFFFF',
                        fontSize: '14px',
                        fontFamily: 'var(--font-body)',
                        outline: 'none',
                        resize: 'vertical',
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '16px',
                      backgroundColor: isSubmitting ? '#716B61' : '#FFFFFF',
                      color: '#161514',
                      border: 'none',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      marginTop: '8px',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = '#B69A6B';
                        e.currentTarget.style.color = '#FFFFFF';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                        e.currentTarget.style.color = '#161514';
                      }
                    }}
                  >
                    {isSubmitting ? 'SUBMITTING APPLICATION...' : 'SUBMIT FRANCHISE ENQUIRY'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FINAL CTA
            ========================================================================= */}
        <section
          aria-label="Franchise Final CTA"
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
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=85)',
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
              BUILD YOUR LEGACY
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(34px, 5.5vw, 64px)',
                fontWeight: 300,
                color: '#FFFFFF',
                lineHeight: 1.08,
                margin: '0 0 20px 0',
              }}
            >
              Your City.
              <br />
              Your Business.
              <br />
              The LEOZ Experience.
            </h2>

            <a
              href="#franchise-enquiry-section"
              onClick={scrollToEnquiry}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '16px 36px',
                backgroundColor: '#FFFFFF',
                color: '#161514',
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
                e.currentTarget.style.backgroundColor = '#B69A6B';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#161514';
              }}
            >
              BECOME A FRANCHISE PARTNER
              <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FranchiseOpportunities;
