import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { UniversalHero } from '../components/common/UniversalHero';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  Layers,
  Compass,
  Building2,
  Users,
  Globe,
} from 'lucide-react';
import { submitEnquiryForm } from '../lib/submitEnquiryForm';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Contact LEOZ Cucine | Luxury Kitchen & Wardrobe Inquiries',
    'Connect with LEOZ Cucine for luxury modular kitchens and bespoke wardrobes. Corporate office on Sindhu Bhavan Road, Ahmedabad, manufacturing in Gandhinagar.'
  );

  // Form State matching all required fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    projectType: 'Luxury Modular Kitchen',
    budget: '₹15L – ₹25L',
    stage: 'Planning & Drawings',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your mobile number.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.location.trim()) errs.location = 'Please specify your project location / city.';
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
      await submitEnquiryForm('contact', {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        city: formData.location,
        projectType: formData.projectType,
        projectSize: `${formData.budget} | Stage: ${formData.stage}`,
        message: formData.message,
      });
      setFormSubmitted(true);
    } catch {
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================================
     HOW WE CAN ASSIST (5 CORE CAPABILITIES)
     ========================================================================= */
  const assistServices = [
    { title: 'New Kitchens', desc: 'Bespoke modular kitchens with handleless Gola profiles, monolith islands, and German motion hardware.' },
    { title: 'Bespoke Wardrobes', desc: 'Custom walk-in suites, flush co-planar sliding doors, illuminated glass vitrines, and velvet accessories.' },
    { title: 'Material & Finish Options', desc: 'Tactile curation of European PU lacquers, smoked oak veneers, sintered stone slabs, and metal profiles.' },
    { title: 'Design Consultations', desc: 'One-on-one spatial planning, laser site surveys, and ergonomic 3D photorealistic CAD layouts.' },
    { title: 'Product-Focused Collaborations', desc: 'Technical trade support for architects, interior designers, and premium residential developers.' },
  ];

  return (
    <div style={{ backgroundColor: '#F7F7F5', color: '#20211F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            SECTION 01: HERO — UNIVERSAL FULL-BLEED ARCHITECTURAL HERO
            ========================================================================= */}
        <UniversalHero
          image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
          imageAlt="LEOZ Showroom & Architectural Living"
          imagePosition="center 40%"
          eyebrow="05 / CONTACT US"
          headline="Begin Your LEOZ Experience"
          supportingText="We welcome homeowners, architects, designers and premium residential developers to connect with us for luxury kitchen and wardrobe enquiries."
          ctaText="Send an Enquiry →"
          ctaHref="#enquiry-form"
          brightness={0.88}
        />

        {/* =========================================================================
            SECTION 02: HOW WE CAN ASSIST (5 CORE CAPABILITIES)
            ========================================================================= */}
        <section
          aria-label="How We Can Assist"
          style={{
            backgroundColor: '#ECEBE7',
            color: '#20211F',
            paddingTop: 'clamp(70px, 9vw, 110px)',
            paddingBottom: 'clamp(70px, 9vw, 110px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            borderBottom: '1px solid #D9D9D4',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
                gap: 'clamp(24px, 5vw, 64px)',
                alignItems: 'flex-end',
                marginBottom: 'clamp(44px, 6vw, 70px)',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '12px' }}>
                  OUR SERVICES &amp; EXPERTISE
                </span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4.4vw, 54px)', fontWeight: 300, color: '#20211F', letterSpacing: '-0.015em', margin: 0, lineHeight: 1.15 }}>
                  How We Can Assist
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  Our team can discuss new kitchens, bespoke wardrobes, material and finish options, design consultations and product-focused collaborations.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
              }}
            >
              {assistServices.map((srv, idx) => (
                <div
                  key={srv.title}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E4E0',
                    borderTop: '3px solid #A58B62',
                    borderRadius: '2px',
                    padding: '28px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 16px rgba(32, 33, 31, 0.03)',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 300, color: '#A58B62', display: 'block', marginBottom: '8px' }}>
                    0{idx + 1}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 400, color: '#20211F', margin: '0 0 10px 0' }}>
                    {srv.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: '#686963', lineHeight: 1.65, margin: 0 }}>
                    {srv.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03 & 04 & 05: ENQUIRY FORM & ARCHITECTURAL INFO PANELS
            ========================================================================= */}
        <section
          id="enquiry-form"
          style={{
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(90px, 11vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
            backgroundColor: '#F7F7F5',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <div
              className="leoz-contact-layout"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: 'clamp(40px, 6vw, 80px)',
                alignItems: 'flex-start',
              }}
            >
              {/* Left Column: Premium Minimal Enquiry Form */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: luxuryEase }}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E4E0',
                  borderTop: '3px solid #A58B62',
                  borderRadius: '2px',
                  padding: 'clamp(28px, 4.5vw, 48px)',
                  boxShadow: '0 8px 32px rgba(32, 33, 31, 0.04)',
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
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          backgroundColor: '#ECEBE7',
                          color: '#A58B62',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '24px',
                        }}
                      >
                        <CheckCircle2 size={32} />
                      </motion.div>

                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '10px' }}>
                        ENQUIRY RECEIVED
                      </span>

                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 300, color: '#20211F', margin: '0 0 16px 0', lineHeight: 1.15 }}>
                        Thank You.
                        <br />
                        We will contact you shortly.
                      </h3>

                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#686963', maxWidth: '460px', lineHeight: 1.65, marginBottom: '28px' }}>
                        We will review your details and contact you to arrange the next discussion.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setFormData({
                            fullName: '',
                            phone: '',
                            email: '',
                            location: '',
                            projectType: 'Luxury Modular Kitchen',
                            budget: '₹15L – ₹25L',
                            stage: 'Planning & Drawings',
                            message: '',
                          });
                        }}
                        style={{
                          padding: '13px 28px',
                          backgroundColor: '#20211F',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          border: 'none',
                          borderRadius: '2px',
                          cursor: 'pointer',
                        }}
                      >
                        Submit Another Enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A58B62', display: 'block', marginBottom: '6px' }}>
                          GET IN TOUCH
                        </span>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 300, color: '#20211F', margin: '0 0 10px 0' }}>
                          Start the Conversation
                        </h2>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14.5px', color: '#686963', lineHeight: 1.65, margin: 0 }}>
                          Tell us a little about your space and what you envision. We will review your details and contact you to arrange the next discussion.
                        </p>
                      </div>

                      {/* Full Name */}
                      <div>
                        <label htmlFor="fullName" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#686963', marginBottom: '6px' }}>
                          Full Name *
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Vikramaditya Mehta"
                          style={{
                            width: '100%',
                            padding: '13px 15px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            border: `1px solid ${errors.fullName ? '#E53E3E' : '#D9D9D4'}`,
                            borderRadius: '2px',
                            backgroundColor: '#FFFFFF',
                            color: '#20211F',
                            outline: 'none',
                            boxSizing: 'border-box',
                          }}
                        />
                        {errors.fullName && <span style={{ fontSize: '11px', color: '#E53E3E', marginTop: '4px', display: 'block' }}>{errors.fullName}</span>}
                      </div>

                      {/* Mobile Number & Email (2 Columns) */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <label htmlFor="phone" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#686963', marginBottom: '6px' }}>
                            Mobile Number *
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
                              padding: '13px 15px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '14px',
                              border: `1px solid ${errors.phone ? '#E53E3E' : '#D9D9D4'}`,
                              borderRadius: '2px',
                              backgroundColor: '#FFFFFF',
                              color: '#20211F',
                              outline: 'none',
                              boxSizing: 'border-box',
                            }}
                          />
                          {errors.phone && <span style={{ fontSize: '11px', color: '#E53E3E', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                        </div>

                        <div>
                          <label htmlFor="email" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#686963', marginBottom: '6px' }}>
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
                              padding: '13px 15px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '14px',
                              border: `1px solid ${errors.email ? '#E53E3E' : '#D9D9D4'}`,
                              borderRadius: '2px',
                              backgroundColor: '#FFFFFF',
                              color: '#20211F',
                              outline: 'none',
                              boxSizing: 'border-box',
                            }}
                          />
                          {errors.email && <span style={{ fontSize: '11px', color: '#E53E3E', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                        </div>
                      </div>

                      {/* Project Location & Approximate Budget */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <label htmlFor="location" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#686963', marginBottom: '6px' }}>
                            Project Location *
                          </label>
                          <input
                            id="location"
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. Bodakdev, Ahmedabad"
                            style={{
                              width: '100%',
                              padding: '13px 15px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '14px',
                              border: `1px solid ${errors.location ? '#E53E3E' : '#D9D9D4'}`,
                              borderRadius: '2px',
                              backgroundColor: '#FFFFFF',
                              color: '#20211F',
                              outline: 'none',
                              boxSizing: 'border-box',
                            }}
                          />
                          {errors.location && <span style={{ fontSize: '11px', color: '#E53E3E', marginTop: '4px', display: 'block' }}>{errors.location}</span>}
                        </div>

                        <div>
                          <label htmlFor="budget" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#686963', marginBottom: '6px' }}>
                            Approximate Budget
                          </label>
                          <select
                            id="budget"
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '13px 15px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '14px',
                              border: '1px solid #D9D9D4',
                              borderRadius: '2px',
                              backgroundColor: '#FFFFFF',
                              color: '#20211F',
                              outline: 'none',
                              boxSizing: 'border-box',
                            }}
                          >
                            <option value="₹10L – ₹15L">₹10L – ₹15L</option>
                            <option value="₹15L – ₹25L">₹15L – ₹25L</option>
                            <option value="₹25L – ₹40L">₹25L – ₹40L</option>
                            <option value="₹40L+ (Bespoke Villa / Estate)">₹40L+ (Bespoke Villa / Estate)</option>
                          </select>
                        </div>
                      </div>

                      {/* Project Type & Project Stage */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                        <div>
                          <label htmlFor="projectType" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#686963', marginBottom: '6px' }}>
                            Project Type
                          </label>
                          <select
                            id="projectType"
                            value={formData.projectType}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '13px 15px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '14px',
                              border: '1px solid #D9D9D4',
                              borderRadius: '2px',
                              backgroundColor: '#FFFFFF',
                              color: '#20211F',
                              outline: 'none',
                              boxSizing: 'border-box',
                            }}
                          >
                            <option value="Luxury Modular Kitchen">Luxury Modular Kitchen</option>
                            <option value="Customised Wardrobe Suite">Customised Wardrobe Suite</option>
                            <option value="Complete Kitchen & Wardrobe Joinery">Complete Kitchen &amp; Wardrobe Joinery</option>
                            <option value="Architectural Trade Collaboration">Architectural Trade Collaboration</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="stage" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#686963', marginBottom: '6px' }}>
                            Project Stage
                          </label>
                          <select
                            id="stage"
                            value={formData.stage}
                            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '13px 15px',
                              fontFamily: 'var(--font-body)',
                              fontSize: '14px',
                              border: '1px solid #D9D9D4',
                              borderRadius: '2px',
                              backgroundColor: '#FFFFFF',
                              color: '#20211F',
                              outline: 'none',
                              boxSizing: 'border-box',
                            }}
                          >
                            <option value="Under Construction / Architecture">Under Construction / Architecture</option>
                            <option value="Planning & Drawings">Planning &amp; Drawings</option>
                            <option value="Civil Work Ready for Joinery">Civil Work Ready for Joinery</option>
                            <option value="Immediate Renovation">Immediate Renovation</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#686963', marginBottom: '6px' }}>
                          Message / Project Details (Optional)
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your spatial vision, architectural drawings, or preferred finishes..."
                          style={{
                            width: '100%',
                            padding: '13px 15px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            border: '1px solid #D9D9D4',
                            borderRadius: '2px',
                            backgroundColor: '#FFFFFF',
                            color: '#20211F',
                            outline: 'none',
                            boxSizing: 'border-box',
                            resize: 'vertical',
                          }}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          padding: '16px 36px',
                          backgroundColor: '#20211F',
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-body)',
                          fontSize: '12px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          border: 'none',
                          borderRadius: '2px',
                          cursor: isSubmitting ? 'wait' : 'pointer',
                          transition: 'all 0.25s ease',
                          marginTop: '6px',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.backgroundColor = '#A58B62';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSubmitting) {
                            e.currentTarget.style.backgroundColor = '#20211F';
                          }
                        }}
                      >
                        <span>{isSubmitting ? 'Sending...' : 'Send Enquiry'}</span>
                        <ArrowRight size={14} />
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Right Column: Architectural Information Blocks */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
                style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
              >
                {/* Director Contact Block */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E4E0',
                    borderTop: '3px solid #A58B62',
                    borderRadius: '2px',
                    padding: '28px 24px',
                    boxShadow: '0 4px 16px rgba(32, 33, 31, 0.03)',
                  }}
                >
                  <span style={{ fontSize: '10.5px', color: '#A58B62', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    DIRECTOR CONTACT
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#20211F', margin: '0 0 4px 0', fontWeight: 400 }}>
                    Mr. Piyush Gahlot
                  </h3>
                  <p style={{ fontSize: '12px', color: '#A58B62', fontWeight: 600, margin: '0 0 16px 0' }}>
                    Director – Sales, Business Development &amp; Global Alliances
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #ECEBE7', paddingTop: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#20211F' }}>
                      <Phone size={14} color="#A58B62" />
                      <a href="tel:+919825022616" style={{ textDecoration: 'none', color: '#20211F', fontWeight: 600 }}>+91 98250 22616</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#686963' }}>
                      <Mail size={14} color="#A58B62" />
                      <a href="mailto:director@leozartofambience.com" style={{ textDecoration: 'none', color: '#686963' }}>director@leozartofambience.com</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#686963' }}>
                      <Globe size={14} color="#A58B62" />
                      <a href="https://www.leozartofambience.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#686963' }}>www.leozartofambience.com</a>
                    </div>
                  </div>
                </div>

                {/* Section: Visit Our Ahmedabad Office */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E4E0',
                    borderTop: '3px solid #A58B62',
                    borderRadius: '2px',
                    padding: '28px 24px',
                    boxShadow: '0 4px 16px rgba(32, 33, 31, 0.03)',
                  }}
                >
                  <span style={{ fontSize: '10.5px', color: '#A58B62', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    VISIT OUR AHMEDABAD OFFICE
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#20211F', margin: '0 0 8px 0', fontWeight: 400 }}>
                    Corporate Office &amp; Design Lounge
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#686963', lineHeight: 1.65, margin: '0 0 12px 0' }}>
                    Explore your requirements and discuss finishes, layout possibilities and product specifications with the team. Visits are recommended by appointment.
                  </p>
                  <p style={{ fontSize: '13px', color: '#20211F', fontWeight: 500, lineHeight: 1.6, margin: '0 0 16px 0' }}>
                    509, Sankalp Square 3B, Beside Taj Skyline, Sindhu Bhavan Road, Thaltej, Ahmedabad – 380059, Gujarat.
                  </p>
                  <a
                    href="https://maps.app.goo.gl/xT39MPBvZR4v923E9"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#20211F',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#A58B62')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#20211F')}
                  >
                    <MapPin size={13} color="#A58B62" />
                    <span>Open Office on Google Maps →</span>
                  </a>
                </div>

                {/* Section: Manufacturing Unit */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E4E0',
                    borderTop: '3px solid #A58B62',
                    borderRadius: '2px',
                    padding: '28px 24px',
                    boxShadow: '0 4px 16px rgba(32, 33, 31, 0.03)',
                  }}
                >
                  <span style={{ fontSize: '10.5px', color: '#A58B62', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    MANUFACTURING UNIT (20,000 SQ. FT.)
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', color: '#20211F', margin: '0 0 8px 0', fontWeight: 400 }}>
                    LEOZ Furniture Pvt. Ltd.
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#686963', lineHeight: 1.65, margin: '0 0 12px 0' }}>
                    Kothari Cross Road, Rakanpur–Satej Road, Rakanpur, Gandhinagar – 382721, Gujarat. (Plant visits by prior appointment)
                  </p>
                  <a
                    href="https://maps.app.goo.gl/mVzVJEBEg3G3re7CA"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#20211F',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#A58B62')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#20211F')}
                  >
                    <MapPin size={13} color="#A58B62" />
                    <span>Open Factory Location on Maps →</span>
                  </a>
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
          .leoz-contact-layout {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
