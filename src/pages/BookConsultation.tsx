import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle, Clock, MapPin, Award } from 'lucide-react';
import { PHONE_SALES_DISPLAY, PHONE_SALES_HREF } from '../constants/siteInfo';
import { submitEnquiryForm } from '../lib/submitEnquiryForm';

/* Easing curve for Italian luxury smoothness */
const luxuryEase = [0.16, 1, 0.3, 1];

export const BookConsultation: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Book Private Consultation | LEOZ Cucine — Bespoke Design Experience',
    'Schedule a dedicated 1-on-1 design consultation at our flagship studio in Ahmedabad or via our online 3D design lounge.'
  );

  const consultationExperiences = [
    {
      id: 'studio-visit',
      name: 'IN-STUDIO ARCHITECTURAL WALKTHROUGH',
      tagline: 'Ahmedabad Flagship Showroom & Tactile Material Archives',
      desc: 'Meet with our principal interior designers to explore full-scale kitchen monoliths, walk-in dressing suites, and custom lacquer finishes.',
      image: '/Glass Vitrines.webp',
    },
    {
      id: 'virtual-cad',
      name: 'ONLINE 3D CAD KITCHEN PLANNING',
      tagline: 'Two-Stage Video Consultation & Photorealistic Renders',
      desc: 'Connect remotely from any city in India. We analyze your floor plan and deliver an architectural 3D layout with transparent quotations.',
      image: '/Master Walk-In Dressing Suite.webp',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : consultationExperiences.length - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev < consultationExperiences.length - 1 ? prev + 1 : 0));
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    projectLocation: '',
    consultationMode: 'In-Studio (Ahmedabad)',
    projectType: 'Kitchen',
    approximateBudget: '₹10 Lakhs - ₹20 Lakhs',
    projectStage: 'Planning',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid full name (minimum 2 characters).';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Please keep your full name under 50 characters.';
    }

    // Phone validation
    const cleanPhone = formData.mobile.replace(/\D/g, '');
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Please enter your mobile number.';
    } else if (cleanPhone.length < 10) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    } else if (cleanPhone.length > 13) {
      newErrors.mobile = 'Please enter a valid mobile number (maximum 13 digits).';
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

    // Location validation
    if (!formData.projectLocation.trim()) {
      newErrors.projectLocation = 'Please enter your project city or locality.';
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
    
    if (name === 'mobile') {
      const sanitized = value.replace(/[^\d+\s-]/g, '').slice(0, 15);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
      if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
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
    const result = await submitEnquiryForm('consultation', formData);
    if (result.ok) {
      setSubmitStatus('idle');
      setIsSubmitted(true);
    } else {
      setSubmitStatus('error');
    }
  };

  return (
    <div style={{ backgroundColor: '#000000', color: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            SECTION 1: RiFRA FULL-BLEED CONSULTATION HERO SLIDER
            ========================================================================= */}
        <section
          aria-label="LEOZ Consultation Hero"
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
              key={consultationExperiences[activeSlide].id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: luxuryEase }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url("${encodeURI(consultationExperiences[activeSlide].image)}")`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
              }}
            >
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
                BESPOKE DESIGN SESSION
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
                {consultationExperiences[activeSlide].name}
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
                {consultationExperiences[activeSlide].desc}
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
                  href="#booking-form-section"
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
                  <span>Book Your Session</span>
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
                  Quick Call ({PHONE_SALES_DISPLAY})
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
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>0{activeSlide + 1}</span> / 0{consultationExperiences.length}
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
            SECTION 2: DUAL-COLUMN CONSULTATION BOOKING MATRIX (RiFRA STYLE)
            ========================================================================= */}
        <section
          id="booking-form-section"
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
                gridTemplateColumns: '1fr 1.1fr',
                gap: 'clamp(40px, 7vw, 100px)',
                alignItems: 'start',
              }}
            >
              {/* Left Column: What to Expect in Your Session */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
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
                  THE CONSULTATION PROTOCOL
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 3.5vw, 44px)',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    color: '#FFFFFF',
                    margin: '0 0 32px 0',
                  }}
                >
                  What to Expect in Your Private Session.
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  <div style={{ display: 'flex', gap: '18px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(182, 154, 107, 0.1)',
                        color: '#B69A6B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Award size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B69A6B', margin: '0 0 6px 0', fontWeight: 600 }}>
                        1. Space &amp; Architectural Review
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.7)', margin: 0, lineHeight: 1.6 }}>
                        We evaluate your floor plans, lifestyle habits, cooking styles, and internal storage requirements with our principal architect.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '18px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(182, 154, 107, 0.1)',
                        color: '#B69A6B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <MapPin size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B69A6B', margin: '0 0 6px 0', fontWeight: 600 }}>
                        2. 3D Photorealistic Render
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.7)', margin: 0, lineHeight: 1.6 }}>
                        Experience your kitchen or wardrobe in true 3D perspective with realistic illumination and exact stone veining patterns.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '18px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(182, 154, 107, 0.1)',
                        color: '#B69A6B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Clock size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B69A6B', margin: '0 0 6px 0', fontWeight: 600 }}>
                        3. Transparent Factory Quotation
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.7)', margin: 0, lineHeight: 1.6 }}>
                        Itemized breakdown with zero hidden charges, directly mapped to manufacturing and installation timelines.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: RiFRA Minimal Dark Consultation Form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: luxuryEase }}
                style={{
                  backgroundColor: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: 'clamp(32px, 4vw, 48px)',
                  borderRadius: '2px',
                }}
              >
                {isSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <CheckCircle size={54} color="#B69A6B" style={{ marginBottom: '20px' }} />
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: '#FFFFFF', marginBottom: '12px', fontWeight: 300 }}>
                      Consultation Requested
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7, marginBottom: '24px' }}>
                      Thank you, {formData.name || 'valued client'}. Our senior design studio will reach out to confirm your private appointment date and time.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          name: '',
                          mobile: '',
                          email: '',
                          projectLocation: '',
                          consultationMode: 'In-Studio (Ahmedabad)',
                          projectType: 'Kitchen',
                          approximateBudget: '₹10 Lakhs - ₹20 Lakhs',
                          projectStage: 'Planning',
                          message: '',
                        });
                        setErrors({});
                        setIsSubmitted(false);
                      }}
                      className="rifra-btn-secondary"
                      style={{ fontSize: '11px', padding: '10px 22px' }}
                    >
                      Book Another Consultation
                    </button>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B69A6B', fontWeight: 600 }}>
                      SCHEDULE APPOINTMENT
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 300, color: '#FFFFFF', margin: '0 0 8px 0' }}>
                      Book Your Consultation
                    </h3>

                    {/* Name */}
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        maxLength={50}
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        style={{
                          width: '100%',
                          height: '48px',
                          padding: '0 16px',
                          backgroundColor: '#0D0D0D',
                          border: errors.name ? '1px solid #FF5C5C' : '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '2px',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '13.5px',
                          outline: 'none',
                        }}
                      />
                      {errors.name && (
                        <span style={{ display: 'block', color: '#FF5C5C', fontSize: '12px', marginTop: '6px', fontFamily: 'var(--font-body)' }}>
                          {errors.name}
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
                          name="mobile"
                          maxLength={15}
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '0 16px',
                            backgroundColor: '#0D0D0D',
                            border: errors.mobile ? '1px solid #FF5C5C' : '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '2px',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-body)',
                            fontSize: '13.5px',
                            outline: 'none',
                          }}
                        />
                        {errors.mobile && (
                          <span style={{ display: 'block', color: '#FF5C5C', fontSize: '12px', marginTop: '6px', fontFamily: 'var(--font-body)' }}>
                            {errors.mobile}
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
                          placeholder="client@domain.com"
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '0 16px',
                            backgroundColor: '#0D0D0D',
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

                    {/* Project Location & Mode */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                          Project Location (City / Locality) *
                        </label>
                        <input
                          type="text"
                          name="projectLocation"
                          maxLength={60}
                          value={formData.projectLocation}
                          onChange={handleInputChange}
                          placeholder="e.g. Ahmedabad, Surat, Rajkot"
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '0 16px',
                            backgroundColor: '#0D0D0D',
                            border: errors.projectLocation ? '1px solid #FF5C5C' : '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '2px',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-body)',
                            fontSize: '13.5px',
                            outline: 'none',
                          }}
                        />
                        {errors.projectLocation && (
                          <span style={{ display: 'block', color: '#FF5C5C', fontSize: '12px', marginTop: '6px', fontFamily: 'var(--font-body)' }}>
                            {errors.projectLocation}
                          </span>
                        )}
                      </div>
                      <div>
                        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                          Consultation Preference
                        </label>
                        <select
                          name="consultationMode"
                          value={formData.consultationMode}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '0 16px',
                            backgroundColor: '#0D0D0D',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '2px',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-body)',
                            fontSize: '13.5px',
                            outline: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="In-Studio (Ahmedabad)">Ahmedabad Flagship Studio</option>
                          <option value="In-Studio (Surat)">Surat Experience Lounge</option>
                          <option value="Virtual Online (Pan-India)">Virtual 3D Video Lounge</option>
                        </select>
                      </div>
                    </div>

                    {/* Project Typology, Budget & Stage */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                          Project Type
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '0 12px',
                            backgroundColor: '#0D0D0D',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '2px',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12.5px',
                            outline: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="Kitchen">Kitchen</option>
                          <option value="Wardrobe">Wardrobe</option>
                          <option value="Both">Both (Kitchen &amp; Wardrobe)</option>
                          <option value="Architect or Developer Enquiry">Architect / Developer</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                          Approximate Budget
                        </label>
                        <select
                          name="approximateBudget"
                          value={formData.approximateBudget}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '0 12px',
                            backgroundColor: '#0D0D0D',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '2px',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12.5px',
                            outline: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="₹5 Lakhs - ₹10 Lakhs">₹5L – ₹10 Lakhs</option>
                          <option value="₹10 Lakhs - ₹20 Lakhs">₹10L – ₹20 Lakhs</option>
                          <option value="₹20 Lakhs - ₹35 Lakhs">₹20L – ₹35 Lakhs</option>
                          <option value="₹35 Lakhs+">₹35 Lakhs +</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                          Project Stage
                        </label>
                        <select
                          name="projectStage"
                          value={formData.projectStage}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '0 12px',
                            backgroundColor: '#0D0D0D',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '2px',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-body)',
                            fontSize: '12.5px',
                            outline: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="Planning">Planning</option>
                          <option value="Construction">Under Construction</option>
                          <option value="Renovation">Renovation</option>
                          <option value="Ready for Measurement">Ready for Measurement</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                        Message / Preferred Date (Max 500 characters)
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        maxLength={500}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your space, layout preferences, or specific questions..."
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          backgroundColor: '#0D0D0D',
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
                      {submitStatus === 'submitting' ? 'Submitting Request…' : 'Book Your Consultation'}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
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
        }
      `}</style>
    </div>
  );
};

export default BookConsultation;
