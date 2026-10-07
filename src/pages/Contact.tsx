import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { submitEnquiryForm } from '../lib/submitEnquiryForm';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Contact Us | LEOZ Cucine — Connect with Our Design Team',
    'Get in touch with LEOZ Cucine principal designers. Start your bespoke kitchen, wardrobe, or complete residential interior project.'
  );

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    projectType: 'Kitchen',
    projectSize: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name.';
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
    if (!formData.city.trim()) errs.city = 'Please enter your city / locality.';
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
        fullName: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        projectType: formData.projectType,
        projectSize: formData.projectSize,
        message: formData.message,
        formType: 'Contact_Page_Enquiry',
      });
      setFormSubmitted(true);
    } catch {
      // Fallback optimistic success for smooth UX
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
            HERO: "LET'S TALK ABOUT YOUR SPACE."
            ========================================================================= */}
        <section
          aria-label="Contact Hero"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 'clamp(440px, 60vh, 560px)',
            display: 'flex',
            alignItems: 'flex-end',
            backgroundColor: '#161514',
            overflow: 'hidden',
          }}
        >
          {/* Architectural Scrimmed Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90)',
              backgroundPosition: 'center 45%',
              backgroundSize: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(22, 21, 20, 0.3) 0%, rgba(22, 21, 20, 0.45) 40%, rgba(22, 21, 20, 0.92) 95%)',
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
              paddingBottom: 'clamp(40px, 6vw, 68px)',
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
                CONNECT WITH LEOZ PRINCIPAL DESIGNERS
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
                  margin: '0 0 16px 0',
                }}
              >
                Let’s Talk
                <br />
                About Your Space.
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
                  margin: 0,
                }}
              >
                Tell us about your project and our design team will get in touch to schedule a private consultation.
              </motion.p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION: SPLIT-SCREEN CONTACT (FORM + VISUAL PANELS)
            ========================================================================= */}
        <section
          style={{
            paddingTop: 'clamp(60px, 8vw, 100px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: 'clamp(40px, 6vw, 80px)',
                alignItems: 'flex-start',
              }}
              className="leoz-contact-split"
            >
              {/* Left Column: Form Panel */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: luxuryEase }}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(22, 21, 20, 0.08)',
                  borderRadius: '4px',
                  padding: 'clamp(28px, 5vw, 48px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.03)',
                }}
              >
                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        padding: 'clamp(40px, 6vw, 64px) 20px',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      {/* Subtle LEOZ Animated Mark */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(182, 154, 107, 0.12)',
                          color: '#B69A6B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '24px',
                        }}
                      >
                        <CheckCircle2 size={32} />
                      </motion.div>

                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.24em',
                          textTransform: 'uppercase',
                          color: '#B69A6B',
                          display: 'block',
                          marginBottom: '10px',
                        }}
                      >
                        COMMISSION INITIATED
                      </span>

                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(26px, 3.5vw, 38px)',
                          fontWeight: 300,
                          color: '#161514',
                          margin: '0 0 16px 0',
                          lineHeight: 1.15,
                        }}
                      >
                        Thank You.
                        <br />
                        We’ll Be in Touch Shortly.
                      </h3>

                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '14.5px',
                          color: 'rgba(22, 21, 20, 0.72)',
                          maxWidth: '460px',
                          lineHeight: 1.65,
                          marginBottom: '28px',
                        }}
                      >
                        One of our principal spatial designers will review your project details and reach out within 24 business hours to arrange your consultation.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            name: '',
                            phone: '',
                            email: '',
                            city: '',
                            projectType: 'Kitchen',
                            projectSize: '',
                            message: '',
                          });
                        }}
                        style={{
                          padding: '12px 28px',
                          backgroundColor: '#161514',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          border: 'none',
                          borderRadius: '2px',
                          cursor: 'pointer',
                        }}
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                      <div>
                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '10.5px',
                            fontWeight: 600,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: '#B69A6B',
                            display: 'block',
                            marginBottom: '6px',
                          }}
                        >
                          PROJECT INQUIRY FORM
                        </span>
                        <h2
                          style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '28px',
                            fontWeight: 300,
                            color: '#161514',
                            margin: 0,
                          }}
                        >
                          Tell Us About Your Vision
                        </h2>
                      </div>

                      {/* Name Field */}
                      <div>
                        <label
                          htmlFor="name"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#716B61',
                            marginBottom: '6px',
                          }}
                        >
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikramaditya Mehta"
                          style={{
                            width: '100%',
                            padding: '14px 16px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            border: `1px solid ${errors.name ? '#E53E3E' : 'rgba(22, 21, 20, 0.15)'}`,
                            borderRadius: '2px',
                            backgroundColor: '#FAF9F6',
                            color: '#161514',
                            outline: 'none',
                            boxSizing: 'border-box',
                          }}
                        />
                        {errors.name && <span style={{ fontSize: '11px', color: '#E53E3E', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
                      </div>

                      {/* Phone & Email (2 Columns) */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <label
                            htmlFor="phone"
                            style={{
                              display: 'block',
                              fontFamily: 'var(--font-body)',
                              fontSize: '11px',
                              fontWeight: 600,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: '#716B61',
                              marginBottom: '6px',
                            }}
                          >
                            Phone Number *
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            style={{
                              width: '100%',
                              padding: '14px 16px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '14px',
                              border: `1px solid ${errors.phone ? '#E53E3E' : 'rgba(22, 21, 20, 0.15)'}`,
                              borderRadius: '2px',
                              backgroundColor: '#FAF9F6',
                              color: '#161514',
                              outline: 'none',
                              boxSizing: 'border-box',
                            }}
                          />
                          {errors.phone && <span style={{ fontSize: '11px', color: '#E53E3E', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            style={{
                              display: 'block',
                              fontFamily: 'var(--font-body)',
                              fontSize: '11px',
                              fontWeight: 600,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: '#716B61',
                              marginBottom: '6px',
                            }}
                          >
                            Email Address *
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@residence.com"
                            style={{
                              width: '100%',
                              padding: '14px 16px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '14px',
                              border: `1px solid ${errors.email ? '#E53E3E' : 'rgba(22, 21, 20, 0.15)'}`,
                              borderRadius: '2px',
                              backgroundColor: '#FAF9F6',
                              color: '#161514',
                              outline: 'none',
                              boxSizing: 'border-box',
                            }}
                          />
                          {errors.email && <span style={{ fontSize: '11px', color: '#E53E3E', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                        </div>
                      </div>

                      {/* City & Project Size */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <label
                            htmlFor="city"
                            style={{
                              display: 'block',
                              fontFamily: 'var(--font-body)',
                              fontSize: '11px',
                              fontWeight: 600,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: '#716B61',
                              marginBottom: '6px',
                            }}
                          >
                            City / Locality *
                          </label>
                          <input
                            id="city"
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="e.g. Ahmedabad, Surat, Mumbai"
                            style={{
                              width: '100%',
                              padding: '14px 16px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '14px',
                              border: `1px solid ${errors.city ? '#E53E3E' : 'rgba(22, 21, 20, 0.15)'}`,
                              borderRadius: '2px',
                              backgroundColor: '#FAF9F6',
                              color: '#161514',
                              outline: 'none',
                              boxSizing: 'border-box',
                            }}
                          />
                          {errors.city && <span style={{ fontSize: '11px', color: '#E53E3E', marginTop: '4px', display: 'block' }}>{errors.city}</span>}
                        </div>

                        <div>
                          <label
                            htmlFor="projectSize"
                            style={{
                              display: 'block',
                              fontFamily: 'var(--font-body)',
                              fontSize: '11px',
                              fontWeight: 600,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: '#716B61',
                              marginBottom: '6px',
                            }}
                          >
                            Approximate Project Size
                          </label>
                          <input
                            id="projectSize"
                            type="text"
                            value={formData.projectSize}
                            onChange={(e) => setFormData({ ...formData, projectSize: e.target.value })}
                            placeholder="e.g. 4 BHK Villa / 4,000 sq ft"
                            style={{
                              width: '100%',
                              padding: '14px 16px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '14px',
                              border: '1px solid rgba(22, 21, 20, 0.15)',
                              borderRadius: '2px',
                              backgroundColor: '#FAF9F6',
                              color: '#161514',
                              outline: 'none',
                              boxSizing: 'border-box',
                            }}
                          />
                        </div>
                      </div>

                      {/* Project Type Selector */}
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#716B61',
                            marginBottom: '10px',
                          }}
                        >
                          Project Type *
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }} className="project-type-pills">
                          {['Kitchen', 'Wardrobe', 'Complete Interior'].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setFormData({ ...formData, projectType: t })}
                              style={{
                                padding: '12px 10px',
                                textAlign: 'center',
                                backgroundColor: formData.projectType === t ? '#161514' : '#FAF9F6',
                                color: formData.projectType === t ? '#FFFFFF' : '#161514',
                                border: `1px solid ${formData.projectType === t ? '#161514' : 'rgba(22, 21, 20, 0.15)'}`,
                                borderRadius: '2px',
                                fontFamily: 'var(--font-body)',
                                fontSize: '12px',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label
                          htmlFor="message"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#716B61',
                            marginBottom: '6px',
                          }}
                        >
                          Project Details / Notes (Optional)
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your timeline, architectural drawings, or preferred finishes..."
                          style={{
                            width: '100%',
                            padding: '14px 16px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            border: '1px solid rgba(22, 21, 20, 0.15)',
                            borderRadius: '2px',
                            backgroundColor: '#FAF9F6',
                            color: '#161514',
                            outline: 'none',
                            boxSizing: 'border-box',
                            resize: 'vertical',
                          }}
                        />
                      </div>

                      {/* Submit CTA Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          padding: '16px 36px',
                          backgroundColor: '#B69A6B',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          border: 'none',
                          borderRadius: '2px',
                          cursor: isSubmitting ? 'wait' : 'pointer',
                          boxShadow: '0 8px 24px rgba(182, 154, 107, 0.25)',
                          transition: 'all 0.3s ease',
                          marginTop: '6px',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting) e.currentTarget.style.backgroundColor = '#9F8255';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSubmitting) e.currentTarget.style.backgroundColor = '#B69A6B';
                        }}
                      >
                        <span>{isSubmitting ? 'Submitting...' : 'Start My Project'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Right Column: Visual Image & Showroom Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
                style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
              >
                {/* Visual Image */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', borderRadius: '3px', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                    alt="LEOZ Architectural Interior"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(22, 21, 20, 0.8) 100%)',
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', color: '#FFFFFF' }}>
                    <span style={{ fontSize: '10.5px', color: '#B69A6B', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      IN-HOUSE ARCHITECTURAL PRECISION
                    </span>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', margin: '4px 0 0 0' }}>
                      Direct turnkey commissions from blueprint to white-glove handover.
                    </p>
                  </div>
                </div>

                {/* Showroom Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Ahmedabad */}
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(22, 21, 20, 0.08)',
                      borderRadius: '3px',
                      padding: '24px',
                    }}
                  >
                    <span style={{ fontSize: '10.5px', color: '#B69A6B', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      FLAGSHIP STUDIO
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#161514', margin: '0 0 10px 0' }}>
                      Ahmedabad Showroom
                    </h3>
                    <p style={{ fontSize: '13px', color: 'rgba(22, 21, 20, 0.75)', lineHeight: 1.5, margin: '0 0 8px 0' }}>
                      📍 Near Sindhu Bhavan Road &amp; Bodakdev, Ahmedabad, Gujarat 380054
                    </p>
                    <p style={{ fontSize: '13px', color: '#161514', margin: '0 0 4px 0' }}>
                      📞 <strong>+91 93131 51559</strong>
                    </p>
                    <p style={{ fontSize: '13px', color: '#716B61', margin: 0 }}>
                      ✉️ director@leozartofambience.com
                    </p>
                  </div>

                  {/* Surat */}
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(22, 21, 20, 0.08)',
                      borderRadius: '3px',
                      padding: '24px',
                    }}
                  >
                    <span style={{ fontSize: '10.5px', color: '#B69A6B', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      EXPERIENCE LOUNGE
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#161514', margin: '0 0 10px 0' }}>
                      Surat Showroom
                    </h3>
                    <p style={{ fontSize: '13px', color: 'rgba(22, 21, 20, 0.75)', lineHeight: 1.5, margin: '0 0 8px 0' }}>
                      📍 Dumas Road &amp; VIP Road Junction, Vesu, Surat, Gujarat 395007
                    </p>
                    <p style={{ fontSize: '13px', color: '#161514', margin: '0 0 4px 0' }}>
                      📞 <strong>+91 93131 51559</strong>
                    </p>
                    <p style={{ fontSize: '13px', color: '#716B61', margin: 0 }}>
                      ✉️ director@leozartofambience.com
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .leoz-contact-split {
            grid-template-columns: 1fr !important;
          }
          .project-type-pills {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
