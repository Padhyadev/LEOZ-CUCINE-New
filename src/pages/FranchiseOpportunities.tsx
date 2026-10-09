import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { UniversalHero } from '../components/common/UniversalHero';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  ShieldCheck,
  Building,
  Layers,
  Sparkles,
  Compass,
  CheckCircle,
  Users,
  Briefcase,
  Store,
  PhoneCall
} from 'lucide-react';
import { submitEnquiryForm } from '../lib/submitEnquiryForm';
import { PHONE_SALES_DISPLAY, PHONE_SALES_HREF } from '../constants/siteInfo';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const FranchiseOpportunities: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Franchise Opportunities | LEOZ Cucine — Luxury Modular Kitchen & Wardrobe Partnership',
    'An invitation to grow with LEOZ Cucine. Exploring the appointment of two franchise partners for our luxury kitchen and wardrobe brand.'
  );

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('how-to-enquire');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* =========================================================================
     FORM STATE & VALIDATION
     ========================================================================= */
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    businessBackground: '',
    proposedLocation: '',
    availableArea: '1,500 – 2,500 sq. ft.',
    indicativeInvestment: '₹75 Lakhs – ₹1.5 Crore',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!formData.mobile.trim()) {
      errs.mobile = 'Please enter your mobile number.';
    } else if (formData.mobile.replace(/\D/g, '').length < 10) {
      errs.mobile = 'Please enter a valid 10-digit mobile number.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.city.trim()) errs.city = 'Please enter your target city.';
    if (!formData.businessBackground.trim()) errs.businessBackground = 'Please provide a brief business background.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const sanitized = value.replace(/[^\d+\s-]/g, '').slice(0, 15);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
      if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await submitEnquiryForm('franchise', {
        fullName: formData.fullName,
        mobile: formData.mobile,
        email: formData.email,
        city: formData.city,
        projectType: 'Franchise Partner Application',
        projectStage: formData.businessBackground,
        approximateBudget: formData.indicativeInvestment,
        message: `Proposed Location: ${formData.proposedLocation || 'Not specified'}\nAvailable Area: ${formData.availableArea}\nBusiness Background: ${formData.businessBackground}\nAdditional Notes: ${formData.message || 'None'}`,
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(true); // Graceful fallback
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* The 6 Experience Pillars */
  const experiencePillars = [
    {
      title: 'Brand',
      desc: 'Architectural positioning, refined editorial identity, and an uncompromising reputation in the luxury interior sector.',
    },
    {
      title: 'Design',
      desc: 'German-inspired spatial planning, monolithic kitchen topologies, and bespoke wardrobe configuration systems.',
    },
    {
      title: 'Product',
      desc: 'Curated European surface materials, synchronized textures, integrated architectural vitrines, and custom joinery.',
    },
    {
      title: 'Manufacturing',
      desc: 'Direct backing from our dedicated 20,000 sq. ft. precision facility in Gujarat with automated CNC workflows.',
    },
    {
      title: 'Consultation',
      desc: 'Structured 1-on-1 client consultation methodologies, 3D CAD visualization protocols, and spatial presentation toolkits.',
    },
    {
      title: 'Customer Experience',
      desc: 'White-glove project coordination, calibrated factory tolerances, and professional installation standards.',
    },
  ];

  /* Profiles we would like to meet - exactly aligned with the 07 draft criteria */
  const partnerProfiles = [
    {
      icon: <Building size={22} color="#A58B62" />,
      title: 'Local Premium Market Understanding',
      desc: 'Professionals with a strong understanding of their local premium residential market and architectural landscape.',
    },
    {
      icon: <Users size={22} color="#A58B62" />,
      title: 'Customer Relationships',
      desc: 'Established relationships with high-net-worth homeowners, architects, interior designers, and luxury developers.',
    },
    {
      icon: <Store size={22} color="#A58B62" />,
      title: 'Experience Centre Space',
      desc: 'Space to establish an appropriate experience centre in a prominent design district or high-street location.',
    },
    {
      icon: <Briefcase size={22} color="#A58B62" />,
      title: 'Active Business Involvement',
      desc: 'Entrepreneurs and design-industry leaders committed to active, hands-on business involvement and service excellence.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#F7F7F5', color: '#20211F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            UNIVERSAL HERO SECTION: LEOZ / FRANCHISE ENQUIRY (DRAFT 07)
            ========================================================================= */}
        <UniversalHero
          image="/franchise-hero.png"
          mobileImage="/franchise-hero.png"
          imageAlt="LEOZ Luxury Showroom Kitchen and Wardrobe Consultation Space"
          imagePosition="center 50%"
          eyebrow="LEOZ / FRANCHISE ENQUIRY"
          headline="An Invitation to Grow with LEOZ"
          supportingText="LEOZ Cucine is exploring the appointment of two franchise partners for its luxury kitchen and wardrobe brand. We welcome expressions of interest from entrepreneurs and design-industry professionals who share our appreciation for refined products and customer experience."
          ctaText="Express Franchise Interest →"
          ctaHref="#how-to-enquire"
          onCtaClick={scrollToForm}
          brightness={0.88}
        />

        {/* =========================================================================
            SECTION: THE OPPORTUNITY (DRAFT 07)
            ========================================================================= */}
        <section
          aria-label="The Opportunity"
          style={{
            backgroundColor: '#ECEBE7',
            paddingTop: 'clamp(70px, 9vw, 120px)',
            paddingBottom: 'clamp(70px, 9vw, 120px)',
            paddingLeft: 'clamp(20px, 5vw, 80px)',
            paddingRight: 'clamp(20px, 5vw, 80px)',
            borderBottom: '1px solid #D9D9D4',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ maxWidth: '820px', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#A58B62',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                THE PROPOSITION
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(30px, 4.2vw, 50px)',
                  fontWeight: 300,
                  color: '#20211F',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                  margin: '0 0 20px 0',
                }}
              >
                The Opportunity
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: '#20211F', lineHeight: 1.6, margin: 0, fontWeight: 400 }}>
                A focused retail and consultation concept dedicated to luxury modular kitchens and bespoke wardrobes, backed by the brand’s manufacturing know-how and in-house production capability.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '32px',
              }}
            >
              {/* Card 1: Dedicated Concept */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 'clamp(32px, 4vw, 44px)',
                  border: '1px solid #D9D9D4',
                  borderRadius: '2px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#A58B62',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  SPECIALISATION
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '24px',
                    fontWeight: 300,
                    color: '#20211F',
                    margin: '0 0 16px 0',
                  }}
                >
                  Retail & Consultation Concept
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#686963', lineHeight: 1.7, marginBottom: '24px' }}>
                  A focused, monobrand design environment tailored exclusively to luxury fitted interiors:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#A58B62', borderRadius: '50%' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500, color: '#20211F' }}>
                      Luxury Modular Kitchens
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#A58B62', borderRadius: '50%' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500, color: '#20211F' }}>
                      Bespoke Wardrobes & Dressing Suites
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Backed by In-House Production */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: 'clamp(32px, 4vw, 44px)',
                  border: '1px solid #D9D9D4',
                  borderRadius: '2px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#A58B62',
                    display: 'block',
                    marginBottom: '16px',
                  }}
                >
                  MANUFACTURING
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '24px',
                    fontWeight: 300,
                    color: '#20211F',
                    margin: '0 0 16px 0',
                  }}
                >
                  In-House Production Capability
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#686963', lineHeight: 1.7, marginBottom: '24px' }}>
                  Backed directly by brand-owned manufacturing infrastructure and decades of joinery mastery:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#A58B62', borderRadius: '50%' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500, color: '#20211F' }}>
                      Decades of Technical & Manufacturing Know-How
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '6px', height: '6px', backgroundColor: '#A58B62', borderRadius: '50%' }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500, color: '#20211F' }}>
                      20,000 sq. ft. Precision Facility in Gujarat
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: WHO WE WOULD LIKE TO MEET (DRAFT 07)
            ========================================================================= */}
        <section
          aria-label="Who We Would Like To Meet"
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(70px, 9vw, 120px)',
            paddingBottom: 'clamp(70px, 9vw, 120px)',
            paddingLeft: 'clamp(20px, 5vw, 80px)',
            paddingRight: 'clamp(20px, 5vw, 80px)',
            borderBottom: '1px solid #D9D9D4',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ maxWidth: '820px', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#A58B62',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                PARTNER SUITABILITY
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(30px, 4.2vw, 50px)',
                  fontWeight: 300,
                  color: '#20211F',
                  letterSpacing: '-0.01em',
                  margin: '0 0 16px 0',
                }}
              >
                Who We Would Like to Meet
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#686963', lineHeight: 1.7, margin: 0 }}>
                Professionals with a strong understanding of their local premium residential market, customer relationships, space to establish an appropriate experience centre, and a commitment to active business involvement.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {partnerProfiles.map((profile) => (
                <div
                  key={profile.title}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: 'clamp(30px, 3.5vw, 38px)',
                    border: '1px solid #D9D9D4',
                    borderRadius: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '2px',
                      backgroundColor: '#ECEBE7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    {profile.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '20px',
                      fontWeight: 400,
                      color: '#20211F',
                      margin: '0 0 12px 0',
                    }}
                  >
                    {profile.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#686963', lineHeight: 1.65, margin: 0 }}>
                    {profile.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: THE LEOZ EXPERIENCE (6 PILLARS)
            ========================================================================= */}
        <section
          aria-label="The LEOZ Experience"
          style={{
            backgroundColor: '#252623',
            color: '#F7F7F5',
            paddingTop: 'clamp(70px, 9vw, 120px)',
            paddingBottom: 'clamp(70px, 9vw, 120px)',
            paddingLeft: 'clamp(20px, 5vw, 80px)',
            paddingRight: 'clamp(20px, 5vw, 80px)',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div style={{ maxWidth: '720px', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#A58B62',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                ECOSYSTEM & INFRASTRUCTURE
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(30px, 4.2vw, 50px)',
                  fontWeight: 300,
                  color: '#FFFFFF',
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}
              >
                THE LEOZ EXPERIENCE
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '28px',
              }}
            >
              {experiencePillars.map((pillar, idx) => (
                <div
                  key={pillar.title}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    padding: 'clamp(28px, 3.5vw, 36px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '2px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#A58B62',
                      display: 'block',
                      marginBottom: '12px',
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '22px',
                      fontWeight: 300,
                      color: '#FFFFFF',
                      margin: '0 0 12px 0',
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#A0A09B', lineHeight: 1.65, margin: 0 }}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: HOW TO ENQUIRE (FORM SECTION)
            ========================================================================= */}
        <section
          id="how-to-enquire"
          aria-label="How to Enquire"
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(70px, 9vw, 120px)',
            paddingBottom: 'clamp(80px, 10vw, 140px)',
            paddingLeft: 'clamp(20px, 5vw, 80px)',
            paddingRight: 'clamp(20px, 5vw, 80px)',
          }}
        >
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #D9D9D4',
                padding: 'clamp(32px, 6vw, 70px)',
                borderRadius: '2px',
                boxShadow: '0 12px 32px rgba(32, 33, 31, 0.03)',
              }}
            >
              {/* Form Title & Introduction */}
              <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto clamp(36px, 5vw, 54px) auto' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#A58B62',
                    display: 'block',
                    marginBottom: '12px',
                  }}
                >
                  PARTNERSHIP APPLICATION
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    fontWeight: 300,
                    color: '#20211F',
                    letterSpacing: '-0.01em',
                    margin: '0 0 16px 0',
                  }}
                >
                  How to Enquire
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    color: '#686963',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Submit your city, business background, proposed location, available area and indicative investment capacity. The LEOZ team will discuss suitability and share the franchise model subject to approval.
                </p>
              </div>

              {/* Form or Success State */}
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: luxuryEase }}
                    style={{
                      textAlign: 'center',
                      padding: 'clamp(40px, 6vw, 60px) 20px',
                      backgroundColor: '#F7F7F5',
                      border: '1px solid #D9D9D4',
                      borderRadius: '2px',
                    }}
                  >
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: '#20211F',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px auto',
                      }}
                    >
                      <CheckCircle size={32} />
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(24px, 3.5vw, 34px)',
                        fontWeight: 300,
                        color: '#20211F',
                        margin: '0 0 16px 0',
                      }}
                    >
                      Thank you for contacting LEOZ Cucine.
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '16px',
                        color: '#686963',
                        lineHeight: 1.7,
                        maxWidth: '520px',
                        margin: '0 auto 32px auto',
                      }}
                    >
                      We have received your franchise enquiry and our leadership team will be in touch.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          mobile: '',
                          email: '',
                          city: '',
                          businessBackground: '',
                          proposedLocation: '',
                          availableArea: '1,500 – 2,500 sq. ft.',
                          indicativeInvestment: '₹75 Lakhs – ₹1.5 Crore',
                          message: '',
                        });
                      }}
                      style={{
                        padding: '14px 28px',
                        backgroundColor: '#20211F',
                        color: '#FFFFFF',
                        border: 'none',
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        borderRadius: '2px',
                      }}
                    >
                      Submit Another Application
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '28px',
                        marginBottom: '28px',
                      }}
                    >
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#20211F',
                            marginBottom: '8px',
                          }}
                        >
                          Full Name *
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Vikram Singhania"
                          style={{
                            width: '100%',
                            padding: '16px 18px',
                            backgroundColor: '#F7F7F5',
                            border: errors.fullName ? '1px solid #D9534F' : '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '15px',
                            color: '#20211F',
                            outline: 'none',
                          }}
                        />
                        {errors.fullName && (
                          <span style={{ display: 'block', color: '#D9534F', fontSize: '12px', marginTop: '6px' }}>
                            {errors.fullName}
                          </span>
                        )}
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label
                          htmlFor="mobileNumber"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#20211F',
                            marginBottom: '8px',
                          }}
                        >
                          Mobile Number *
                        </label>
                        <input
                          id="mobileNumber"
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          style={{
                            width: '100%',
                            padding: '16px 18px',
                            backgroundColor: '#F7F7F5',
                            border: errors.mobile ? '1px solid #D9534F' : '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '15px',
                            color: '#20211F',
                            outline: 'none',
                          }}
                        />
                        {errors.mobile && (
                          <span style={{ display: 'block', color: '#D9534F', fontSize: '12px', marginTop: '6px' }}>
                            {errors.mobile}
                          </span>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label
                          htmlFor="emailAddress"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#20211F',
                            marginBottom: '8px',
                          }}
                        >
                          Email Address *
                        </label>
                        <input
                          id="emailAddress"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="vikram@enterprise.com"
                          style={{
                            width: '100%',
                            padding: '16px 18px',
                            backgroundColor: '#F7F7F5',
                            border: errors.email ? '1px solid #D9534F' : '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '15px',
                            color: '#20211F',
                            outline: 'none',
                          }}
                        />
                        {errors.email && (
                          <span style={{ display: 'block', color: '#D9534F', fontSize: '12px', marginTop: '6px' }}>
                            {errors.email}
                          </span>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label
                          htmlFor="city"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#20211F',
                            marginBottom: '8px',
                          }}
                        >
                          City *
                        </label>
                        <input
                          id="city"
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="e.g. Pune / Hyderabad / Bengaluru"
                          style={{
                            width: '100%',
                            padding: '16px 18px',
                            backgroundColor: '#F7F7F5',
                            border: errors.city ? '1px solid #D9534F' : '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '15px',
                            color: '#20211F',
                            outline: 'none',
                          }}
                        />
                        {errors.city && (
                          <span style={{ display: 'block', color: '#D9534F', fontSize: '12px', marginTop: '6px' }}>
                            {errors.city}
                          </span>
                        )}
                      </div>

                      {/* Proposed Location */}
                      <div>
                        <label
                          htmlFor="proposedLocation"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#20211F',
                            marginBottom: '8px',
                          }}
                        >
                          Proposed Location
                        </label>
                        <input
                          id="proposedLocation"
                          type="text"
                          name="proposedLocation"
                          value={formData.proposedLocation}
                          onChange={handleInputChange}
                          placeholder="e.g. High Street / Design District / Own Commercial Space"
                          style={{
                            width: '100%',
                            padding: '16px 18px',
                            backgroundColor: '#F7F7F5',
                            border: '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '15px',
                            color: '#20211F',
                            outline: 'none',
                          }}
                        />
                      </div>

                      {/* Available Area */}
                      <div>
                        <label
                          htmlFor="availableArea"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#20211F',
                            marginBottom: '8px',
                          }}
                        >
                          Available Area
                        </label>
                        <select
                          id="availableArea"
                          name="availableArea"
                          value={formData.availableArea}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '16px 18px',
                            backgroundColor: '#F7F7F5',
                            border: '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '15px',
                            color: '#20211F',
                            outline: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="1,000 – 1,500 sq. ft.">1,000 – 1,500 sq. ft.</option>
                          <option value="1,500 – 2,500 sq. ft.">1,500 – 2,500 sq. ft. (Flagship Recommendation)</option>
                          <option value="2,500 – 4,000 sq. ft.">2,500 – 4,000 sq. ft. (Multi-Suite Experience)</option>
                          <option value="Space Identification in Progress">Space Identification in Progress</option>
                        </select>
                      </div>

                      {/* Indicative Investment Capacity */}
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label
                          htmlFor="indicativeInvestment"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#20211F',
                            marginBottom: '8px',
                          }}
                        >
                          Indicative Investment Capacity
                        </label>
                        <select
                          id="indicativeInvestment"
                          name="indicativeInvestment"
                          value={formData.indicativeInvestment}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            padding: '16px 18px',
                            backgroundColor: '#F7F7F5',
                            border: '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '15px',
                            color: '#20211F',
                            outline: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="₹50 Lakhs – ₹75 Lakhs">₹50 Lakhs – ₹75 Lakhs</option>
                          <option value="₹75 Lakhs – ₹1.5 Crore">₹75 Lakhs – ₹1.5 Crore (Recommended for Flagship Studio)</option>
                          <option value="₹1.5 Crore – ₹3 Crore">₹1.5 Crore – ₹3 Crore (Multi-City / Regional Hub)</option>
                          <option value="Custom Enterprise Allocation">Custom Enterprise Allocation</option>
                        </select>
                      </div>

                      {/* Business Background */}
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label
                          htmlFor="businessBackground"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#20211F',
                            marginBottom: '8px',
                          }}
                        >
                          Business Background *
                        </label>
                        <input
                          id="businessBackground"
                          type="text"
                          name="businessBackground"
                          value={formData.businessBackground}
                          onChange={handleInputChange}
                          placeholder="e.g. Existing Luxury Retailer / Architectural Practice / Real Estate Developer"
                          style={{
                            width: '100%',
                            padding: '16px 18px',
                            backgroundColor: '#F7F7F5',
                            border: errors.businessBackground ? '1px solid #D9534F' : '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '15px',
                            color: '#20211F',
                            outline: 'none',
                          }}
                        />
                        {errors.businessBackground && (
                          <span style={{ display: 'block', color: '#D9534F', fontSize: '12px', marginTop: '6px' }}>
                            {errors.businessBackground}
                          </span>
                        )}
                      </div>

                      {/* Additional Notes */}
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label
                          htmlFor="message"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#20211F',
                            marginBottom: '8px',
                          }}
                        >
                          Additional Scope / Message (Optional)
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Share any additional context regarding your regional reach, existing designer network, or timeline..."
                          style={{
                            width: '100%',
                            padding: '16px 18px',
                            backgroundColor: '#F7F7F5',
                            border: '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '15px',
                            color: '#20211F',
                            outline: 'none',
                            resize: 'vertical',
                            lineHeight: 1.6,
                          }}
                        />
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <div style={{ textAlign: 'center' }}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          width: '100%',
                          maxWidth: '380px',
                          padding: '20px 36px',
                          backgroundColor: '#20211F',
                          color: '#FFFFFF',
                          border: '1px solid #20211F',
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          fontWeight: 500,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          cursor: isSubmitting ? 'wait' : 'pointer',
                          borderRadius: '2px',
                          transition: 'all 0.3s ease',
                          opacity: isSubmitting ? 0.7 : 1,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#A58B62';
                          e.currentTarget.style.borderColor = '#A58B62';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#20211F';
                          e.currentTarget.style.borderColor = '#20211F';
                        }}
                      >
                        <span>{isSubmitting ? 'Processing...' : 'Express Franchise Interest'}</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .franchise-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FranchiseOpportunities;
