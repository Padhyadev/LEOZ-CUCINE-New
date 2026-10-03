import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ChevronLeft, ChevronRight, ArrowRight, Award, Factory, Compass, GraduationCap, ShieldCheck, CheckCircle, Handshake } from 'lucide-react';
import { PHONE_SALES_DISPLAY, PHONE_SALES_HREF } from '../constants/siteInfo';
import { submitEnquiryForm } from '../lib/submitEnquiryForm';

/* Easing curve for Italian luxury smoothness */
const luxuryEase = [0.16, 1, 0.3, 1];

export const FranchiseOpportunities: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Franchise Network | LEOZ Cucine — Luxury Monobrand Store Partnership',
    'Join LEOZ Cucine luxury franchise network. Direct in-house factory manufacturing, German design engineering, exclusive territory rights in India.'
  );

  // RiFRA-style Franchise Hero Slider Data
  const partnerSlides = [
    {
      id: 'network',
      name: 'EXCLUSIVE FRANCHISE NETWORK',
      tagline: 'Bring High-End Italian Design & German Engineering to Your City',
      desc: 'Partner with LEOZ Cucine to open a monobrand experience showroom backed directly by our 20,000 sq. ft. precision manufacturing lab.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=90',
    },
    {
      id: 'factory-backed',
      name: 'DIRECT FACTORY SUPPORT',
      tagline: 'Zero Third-Party Delays & Guaranteed Turnkey Margins',
      desc: 'Unlike dealers who rely on fragmented traders, our franchise partners enjoy direct factory pricing, bespoke customisation, and strict delivery timelines.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2000&q=90',
    },
    {
      id: 'training',
      name: 'WHITE-GLOVE CAD & INSTALL TRAINING',
      tagline: 'Comprehensive 3D Design, Sales & Technician Certification',
      desc: 'We train your architects, sales specialists, and technicians in world-class German joinery, soft-close hardware, and client consultation.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : partnerSlides.length - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev < partnerSlides.length - 1 ? prev + 1 : 0));
  };

  // Why Partner Pillars
  const partnerPillars = [
    {
      icon: Award,
      title: 'Established Luxury Brand',
      desc: 'Over 20 years of bespoke manufacturing legacy and a sterling reputation among discerning homeowners and architects.',
    },
    {
      icon: Factory,
      title: 'In-House Factory Backing',
      desc: 'Direct production in our 20,000 sq. ft. automated plant ensuring complete control over carcasses, finishes, and margins.',
    },
    {
      icon: Compass,
      title: 'German Precision Standards',
      desc: 'Standardized European hardware integration (Blum & Hettich) and 45° mitered monolithic kitchen architecture.',
    },
    {
      icon: GraduationCap,
      title: 'Comprehensive Training',
      desc: 'Complete architectural training, photorealistic 3D CAD design support, and certified installation workshops.',
    },
    {
      icon: ShieldCheck,
      title: '10-Year Warranty Assurance',
      desc: 'Sell with absolute confidence backed by our written warranty covering hardware, carcasses, and finishes.',
    },
    {
      icon: Handshake,
      title: 'Exclusive Territory Rights',
      desc: 'Protected territorial exclusivity ensuring high ROI and a distinctive luxury positioning in your city.',
    },
  ];

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    investmentBudget: '50L-1Cr',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name (minimum 2 characters).';
    } else if (formData.fullName.length > 50) {
      newErrors.fullName = 'Please keep your full name under 50 characters.';
    }

    // Phone validation
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your mobile number.';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    } else if (cleanPhone.length > 13) {
      newErrors.phone = 'Please enter a valid mobile number (maximum 13 digits).';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g., name@domain.com).';
    } else if (formData.email.length > 80) {
      newErrors.email = 'Please keep your email address under 80 characters.';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'Please enter your target city.';
    } else if (formData.city.length > 50) {
      newErrors.city = 'Please keep your city name under 50 characters.';
    }

    // Message validation
    if (formData.message.length > 500) {
      newErrors.message = 'Please keep your message under 500 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const sanitized = value.replace(/[^\d+\s-]/g, '').slice(0, 15);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setSubmitStatus('submitting');
    const result = await submitEnquiryForm('franchise', formData);
    if (result.ok) {
      setSubmitStatus('idle');
      setFormSubmitted(true);
    } else {
      setSubmitStatus('error');
    }
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            SECTION 1: RiFRA FULL-BLEED PARTNERSHIP HERO SLIDER
            ========================================================================= */}
        <section
          aria-label="LEOZ Franchise Partnership Hero"
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
              key={partnerSlides[activeSlide].id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: luxuryEase }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url("${encodeURI(partnerSlides[activeSlide].image)}")`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            >
              {/* Dark Gradient Overlay */}
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
            <div style={{ maxWidth: '820px' }}>
              <motion.span
                key={`cat-${activeSlide}`}
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
                BUSINESS &amp; SHOWROOM PARTNERSHIPS
              </motion.span>

              <motion.h1
                key={`name-${activeSlide}`}
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
                {partnerSlides[activeSlide].name}
              </motion.h1>

              <motion.p
                key={`desc-${activeSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(14px, 1.2vw, 17px)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.6,
                  maxWidth: '660px',
                  marginBottom: '28px',
                }}
              >
                {partnerSlides[activeSlide].desc}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                key={`act-${activeSlide}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: luxuryEase }}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}
              >
                <a
                  href="#franchise-form-section"
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
                  <span>Apply for Franchise</span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href={PHONE_SALES_HREF}
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
                  Partner Desk ({PHONE_SALES_DISPLAY})
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
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>0{activeSlide + 1}</span> / 0{partnerSlides.length}
              </div>
              <button
                type="button"
                onClick={prevSlide}
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
                onClick={nextSlide}
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
            SECTION 2: WHY PARTNER WITH LEOZ (RiFRA 6-PILLAR BENTO MATRIX)
            ========================================================================= */}
        <section
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
                PARTNERSHIP ADVANTAGES
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
                Why Partner With LEOZ Cucine.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  maxWidth: '680px',
                  margin: '0 auto',
                }}
              >
                Empowering entrepreneurs and architects with factory-direct pricing, proprietary design software, and high-profit luxury turnover.
              </p>
            </div>

            <div
              className="rifra-3col-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '28px',
              }}
            >
              {partnerPillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: luxuryEase }}
                    style={{
                      backgroundColor: '#000000',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: 'clamp(28px, 3.5vw, 40px)',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '2px',
                      transition: 'all 0.35s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(182, 154, 107, 0.4)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(182, 154, 107, 0.12)',
                        color: '#B69A6B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '20px',
                        fontWeight: 400,
                        color: '#FFFFFF',
                        margin: '0 0 12px 0',
                      }}
                    >
                      {item.title}
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
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: FRANCHISE ENQUIRY APPLICATION FORM (RiFRA STYLE)
            ========================================================================= */}
        <section
          id="franchise-form-section"
          style={{
            backgroundColor: '#000000',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: '5.5vw',
            paddingRight: '5.5vw',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              style={{
                backgroundColor: '#0A0A0A',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: 'clamp(32px, 5vw, 60px)',
                borderRadius: '2px',
              }}
            >
              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <CheckCircle size={54} color="#B69A6B" style={{ marginBottom: '20px' }} />
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: '#FFFFFF', marginBottom: '12px', fontWeight: 300 }}>
                    Partnership Application Received
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7, marginBottom: '24px' }}>
                    Thank you for your interest in the LEOZ Cucine franchise network. Our executive partnership director will contact you to discuss showroom setup, territorial rights, and commercial terms.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        city: '',
                        investmentBudget: '50L-1Cr',
                        message: '',
                      });
                      setErrors({});
                      setFormSubmitted(false);
                    }}
                    className="rifra-btn-secondary"
                    style={{ fontSize: '11px', padding: '10px 22px' }}
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B69A6B', fontWeight: 600 }}>
                      COMMERCIAL INQUIRY
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 300, color: '#FFFFFF', margin: '8px 0 0 0' }}>
                      Apply for Franchise Opportunities
                    </h3>
                  </div>

                  {/* Name */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      maxLength={50}
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter principal applicant name"
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px',
                        backgroundColor: '#000000',
                        border: errors.fullName ? '1px solid #FF5C5C' : '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '2px',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        fontSize: '13.5px',
                        outline: 'none',
                      }}
                    />
                    {errors.fullName && (
                      <span style={{ display: 'block', color: '#FF5C5C', fontSize: '12px', marginTop: '6px', fontFamily: 'var(--font-body)' }}>
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone & Email Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        maxLength={15}
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        style={{
                          width: '100%',
                          height: '48px',
                          padding: '0 16px',
                          backgroundColor: '#000000',
                          border: errors.phone ? '1px solid #FF5C5C' : '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '2px',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '13.5px',
                          outline: 'none',
                        }}
                      />
                      {errors.phone && (
                        <span style={{ display: 'block', color: '#FF5C5C', fontSize: '12px', marginTop: '6px', fontFamily: 'var(--font-body)' }}>
                          {errors.phone}
                        </span>
                      )}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        maxLength={80}
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="investor@domain.com"
                        style={{
                          width: '100%',
                          height: '48px',
                          padding: '0 16px',
                          backgroundColor: '#000000',
                          border: errors.email ? '1px solid #FF5C5C' : '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '2px',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '13.5px',
                          outline: 'none',
                        }}
                      />
                      {errors.email && (
                        <span style={{ display: 'block', color: '#FF5C5C', fontSize: '12px', marginTop: '6px', fontFamily: 'var(--font-body)' }}>
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Target City & Investment Budget */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                        Proposed City / Region *
                      </label>
                      <input
                        type="text"
                        name="city"
                        maxLength={50}
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Surat, Rajkot, Mumbai, Pune"
                        style={{
                          width: '100%',
                          height: '48px',
                          padding: '0 16px',
                          backgroundColor: '#000000',
                          border: errors.city ? '1px solid #FF5C5C' : '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '2px',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '13.5px',
                          outline: 'none',
                        }}
                      />
                      {errors.city && (
                        <span style={{ display: 'block', color: '#FF5C5C', fontSize: '12px', marginTop: '6px', fontFamily: 'var(--font-body)' }}>
                          {errors.city}
                        </span>
                      )}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                        Investment Capacity
                      </label>
                      <select
                        name="investmentBudget"
                        value={formData.investmentBudget}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          height: '48px',
                          padding: '0 16px',
                          backgroundColor: '#000000',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '2px',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '13.5px',
                          outline: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="30L-50L">₹30 Lakhs – ₹50 Lakhs</option>
                        <option value="50L-1Cr">₹50 Lakhs – ₹1 Crore</option>
                        <option value="1Cr+">₹1 Crore+ (Flagship Studio)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                      Commercial Background / Showroom Space Details (Max 500 characters)
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={500}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your business background, showroom location or space available..."
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        backgroundColor: '#000000',
                        border: errors.message ? '1px solid #FF5C5C' : '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '2px',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        fontSize: '13.5px',
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                    {errors.message && (
                      <span style={{ display: 'block', color: '#FF5C5C', fontSize: '12px', marginTop: '6px', fontFamily: 'var(--font-body)' }}>
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    style={{
                      height: '52px',
                      backgroundColor: '#FFFFFF',
                      color: '#000000',
                      border: 'none',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: submitStatus === 'submitting' ? 'not-allowed' : 'pointer',
                      opacity: submitStatus === 'submitting' ? 0.7 : 1,
                      marginTop: '8px',
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
                    {submitStatus === 'submitting' ? 'Submitting Application…' : 'Submit Franchise Enquiry'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Responsive Breakpoints CSS */}
      <style>{`
        @media (max-width: 1024px) {
          .rifra-3col-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .rifra-3col-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FranchiseOpportunities;
