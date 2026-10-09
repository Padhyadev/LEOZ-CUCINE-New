import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { UniversalHero } from '../components/common/UniversalHero';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { CheckCircle, ArrowRight, Sparkles, PhoneCall } from 'lucide-react';
import { PHONE_SALES_DISPLAY, PHONE_SALES_HREF } from '../constants/siteInfo';
import { submitEnquiryForm } from '../lib/submitEnquiryForm';

const luxuryEase = [0.16, 1, 0.3, 1];

export const BookConsultation: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Book a Consultation | LEOZ Cucine — Your Space. Our Expertise.',
    'Begin your personal consultation with LEOZ Cucine. Plan your statement kitchen or beautifully organised wardrobe with our architectural specialists in Gujarat.'
  );

  // Form State matching all required fields
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    projectLocation: '',
    projectType: 'Kitchen',
    approximateBudget: '₹15L – ₹25L',
    projectStage: 'Planning',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid full name.';
    }

    const cleanPhone = formData.mobile.replace(/\D/g, '');
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Please enter your preferred contact number.';
    } else if (cleanPhone.length < 10) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.projectLocation.trim()) {
      newErrors.projectLocation = 'Please enter your project location (city / locality).';
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

  const nextSteps = [
    {
      num: '01',
      title: 'Review Your Requirement',
      desc: 'After receiving your details, our senior design team evaluates your space parameters, inventory, and floor blueprints.',
    },
    {
      num: '02',
      title: 'Understand the Scope',
      desc: 'Our consultation coordinator reaches out directly to understand your specific lifestyle needs, appliance choices, and finishes.',
    },
    {
      num: '03',
      title: 'Arrange Consultation or Office Visit',
      desc: 'We arrange a suitable consultation session or an exclusive visit to our Ahmedabad corporate office & design lounge.',
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
          image="/Glass Vitrines.webp"
          imageAlt="LEOZ Private Architectural Consultation"
          imagePosition="center 40%"
          eyebrow="06 / TALK TO US / BOOK A CONSULTATION"
          headline="Your Space. Our Expertise."
          supportingText="Whether you are planning a statement kitchen, a beautifully organised wardrobe or both, we invite you to begin with a personal consultation."
          ctaText="Book a Consultation →"
          ctaHref="#consultation-form"
          brightness={0.88}
        />

        {/* =========================================================================
            SECTION 02: WHAT HAPPENS NEXT
            ========================================================================= */}
        <section
          aria-label="What Happens Next"
          style={{
            backgroundColor: '#ECEBE7',
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
                  THE PROCESS
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(32px, 4.4vw, 54px)',
                    fontWeight: 300,
                    color: '#20211F',
                    letterSpacing: '-0.015em',
                    margin: 0,
                    lineHeight: 1.15,
                  }}
                >
                  What Happens Next
                </h2>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15.5px', color: '#686963', lineHeight: 1.75, margin: 0 }}>
                  After receiving your details, our team will review your requirement, reach out to understand the scope and arrange a suitable consultation or office visit.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: '24px',
              }}
            >
              {nextSteps.map((step, idx) => (
                <div
                  key={step.num}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E4E0',
                    borderTop: '3px solid #A58B62',
                    padding: '32px 26px',
                    borderRadius: '2px',
                    boxShadow: '0 4px 20px rgba(32, 33, 31, 0.04)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '28px',
                      fontWeight: 300,
                      color: '#A58B62',
                      display: 'block',
                      marginBottom: '12px',
                    }}
                  >
                    {step.num}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '21px',
                      fontWeight: 400,
                      color: '#20211F',
                      margin: '0 0 10px 0',
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: '#686963',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03: CONSULTATION FORM
            ========================================================================= */}
        <section
          id="consultation-form"
          aria-label="Consultation Form"
          style={{
            backgroundColor: '#F7F7F5',
            paddingTop: 'clamp(80px, 10vw, 130px)',
            paddingBottom: 'clamp(90px, 11vw, 150px)',
            paddingLeft: 'clamp(20px, 6vw, 100px)',
            paddingRight: 'clamp(20px, 6vw, 100px)',
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E4E0',
                borderTop: '3px solid #A58B62',
                padding: 'clamp(32px, 5vw, 64px)',
                borderRadius: '2px',
                boxShadow: '0 12px 32px rgba(32, 33, 31, 0.04)',
              }}
            >
              {/* Form Title & Introduction */}
              <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto clamp(32px, 4vw, 48px) auto' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: '#A58B62',
                    display: 'block',
                    marginBottom: '10px',
                  }}
                >
                  RESERVATION &amp; SCOPE
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    fontWeight: 300,
                    color: '#20211F',
                    letterSpacing: '-0.01em',
                    margin: '0 0 14px 0',
                  }}
                >
                  Consultation Form
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14.5px',
                    color: '#686963',
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  Please provide details about your space. Our senior design team will prepare tailored recommendations for our initial discussion.
                </p>
              </div>

              {/* Form or Confirmation Message */}
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
                      We have received your enquiry and our team will be in touch.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          mobile: '',
                          email: '',
                          projectLocation: '',
                          projectType: 'Kitchen',
                          approximateBudget: '₹15L – ₹25L',
                          projectStage: 'Planning',
                          message: '',
                        });
                      }}
                      style={{
                        padding: '14px 28px',
                        backgroundColor: '#20211F',
                        color: '#FFFFFF',
                        border: 'none',
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        borderRadius: '2px',
                      }}
                    >
                      Submit Another Requirement
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                        gap: '20px',
                        marginBottom: '20px',
                      }}
                    >
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="fullName"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#686963',
                            marginBottom: '6px',
                          }}
                        >
                          Full Name *
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '14px 16px',
                            backgroundColor: '#FFFFFF',
                            border: errors.name ? '1px solid #D9534F' : '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14.5px',
                            color: '#20211F',
                            outline: 'none',
                          }}
                        />
                        {errors.name && (
                          <span style={{ display: 'block', color: '#D9534F', fontSize: '11px', marginTop: '4px' }}>
                            {errors.name}
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
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#686963',
                            marginBottom: '6px',
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
                          placeholder="Preferred contact number"
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '14px 16px',
                            backgroundColor: '#FFFFFF',
                            border: errors.mobile ? '1px solid #D9534F' : '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14.5px',
                            color: '#20211F',
                            outline: 'none',
                          }}
                        />
                        {errors.mobile && (
                          <span style={{ display: 'block', color: '#D9534F', fontSize: '11px', marginTop: '4px' }}>
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
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#686963',
                            marginBottom: '6px',
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
                          placeholder="Your email"
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '14px 16px',
                            backgroundColor: '#FFFFFF',
                            border: errors.email ? '1px solid #D9534F' : '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14.5px',
                            color: '#20211F',
                            outline: 'none',
                          }}
                        />
                        {errors.email && (
                          <span style={{ display: 'block', color: '#D9534F', fontSize: '11px', marginTop: '4px' }}>
                            {errors.email}
                          </span>
                        )}
                      </div>

                      {/* Project Location */}
                      <div>
                        <label
                          htmlFor="projectLocation"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#686963',
                            marginBottom: '6px',
                          }}
                        >
                          Project Location *
                        </label>
                        <input
                          id="projectLocation"
                          type="text"
                          name="projectLocation"
                          value={formData.projectLocation}
                          onChange={handleInputChange}
                          placeholder="City / locality"
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '14px 16px',
                            backgroundColor: '#FFFFFF',
                            border: errors.projectLocation ? '1px solid #D9534F' : '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14.5px',
                            color: '#20211F',
                            outline: 'none',
                          }}
                        />
                        {errors.projectLocation && (
                          <span style={{ display: 'block', color: '#D9534F', fontSize: '11px', marginTop: '4px' }}>
                            {errors.projectLocation}
                          </span>
                        )}
                      </div>

                      {/* Project Type */}
                      <div>
                        <label
                          htmlFor="projectType"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#686963',
                            marginBottom: '6px',
                          }}
                        >
                          Project Type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '14px 16px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14.5px',
                            color: '#20211F',
                            outline: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="Kitchen">Kitchen</option>
                          <option value="Wardrobe">Wardrobe</option>
                          <option value="Both">Both</option>
                          <option value="Architect or Developer Enquiry">Architect or Developer Enquiry</option>
                        </select>
                      </div>

                      {/* Approximate Budget */}
                      <div>
                        <label
                          htmlFor="approximateBudget"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#686963',
                            marginBottom: '6px',
                          }}
                        >
                          Approximate Budget
                        </label>
                        <select
                          id="approximateBudget"
                          name="approximateBudget"
                          value={formData.approximateBudget}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '14px 16px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14.5px',
                            color: '#20211F',
                            outline: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="₹10L – ₹15L">₹10L – ₹15L</option>
                          <option value="₹15L – ₹25L">₹15L – ₹25L</option>
                          <option value="₹25L – ₹40L">₹25L – ₹40L</option>
                          <option value="₹40L+ (Bespoke Villa / Estate)">₹40L+ (Bespoke Villa / Estate)</option>
                          <option value="To Be Decided with Architect">To Be Decided with Architect</option>
                        </select>
                      </div>

                      {/* Project Stage */}
                      <div>
                        <label
                          htmlFor="projectStage"
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#686963',
                            marginBottom: '6px',
                          }}
                        >
                          Project Stage
                        </label>
                        <select
                          id="projectStage"
                          name="projectStage"
                          value={formData.projectStage}
                          onChange={handleInputChange}
                          style={{
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '14px 16px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #D9D9D4',
                            borderRadius: '2px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '14.5px',
                            color: '#20211F',
                            outline: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="Planning">Planning</option>
                          <option value="Construction">Construction</option>
                          <option value="Renovation">Renovation</option>
                          <option value="Ready for Measurement">Ready for Measurement</option>
                        </select>
                      </div>
                    </div>

                    {/* Direct Contact Phone Box */}
                    <div
                      style={{
                        backgroundColor: '#ECEBE7',
                        padding: '14px 18px',
                        borderRadius: '2px',
                        border: '1px solid #D9D9D4',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '20px',
                      }}
                    >
                      <PhoneCall size={18} color="#A58B62" />
                      <div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#686963' }}>
                          Prefer to speak directly with our team?
                        </div>
                        <a
                          href={PHONE_SALES_HREF}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '13.5px',
                            fontWeight: 600,
                            color: '#20211F',
                            textDecoration: 'none',
                          }}
                        >
                          {PHONE_SALES_DISPLAY}
                        </a>
                      </div>
                    </div>

                    {/* Message */}
                    <div style={{ marginBottom: '28px' }}>
                      <label
                        htmlFor="message"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#686963',
                          marginBottom: '6px',
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
                        placeholder="Tell us about your preferences and requirements..."
                        style={{
                          width: '100%',
                          boxSizing: 'border-box',
                          padding: '14px 16px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #D9D9D4',
                          borderRadius: '2px',
                          fontFamily: 'var(--font-body)',
                          fontSize: '14.5px',
                          color: '#20211F',
                          outline: 'none',
                          resize: 'vertical',
                          lineHeight: 1.6,
                        }}
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <div
                        style={{
                          padding: '14px 18px',
                          backgroundColor: '#FDF2F2',
                          border: '1px solid #F8B4B4',
                          borderRadius: '2px',
                          color: '#9B1C1C',
                          fontSize: '14px',
                          marginBottom: '20px',
                        }}
                      >
                        There was an issue submitting your request. Please try again or reach us directly at {PHONE_SALES_DISPLAY}.
                      </div>
                    )}

                    {/* Submit CTA */}
                    <div style={{ textAlign: 'center' }}>
                      <button
                        type="submit"
                        disabled={submitStatus === 'submitting'}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          width: '100%',
                          maxWidth: '380px',
                          padding: '18px 36px',
                          backgroundColor: '#20211F',
                          color: '#FFFFFF',
                          border: '1px solid #20211F',
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          fontWeight: 600,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          cursor: submitStatus === 'submitting' ? 'wait' : 'pointer',
                          borderRadius: '2px',
                          transition: 'all 0.3s ease',
                          opacity: submitStatus === 'submitting' ? 0.7 : 1,
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
                        <span>{submitStatus === 'submitting' ? 'Processing...' : 'Book a Consultation'}</span>
                        <ArrowRight size={15} />
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
    </div>
  );
};

export default BookConsultation;
