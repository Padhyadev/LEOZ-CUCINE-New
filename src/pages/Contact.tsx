import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { PHONE_SALES_DISPLAY, PHONE_SALES_HREF } from '../constants/siteInfo';
import { submitEnquiryForm } from '../lib/submitEnquiryForm';



/* Easing curve for Italian luxury smoothness */
const luxuryEase = [0.16, 1, 0.3, 1];

export const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Contact & Showrooms | LEOZ Cucine — Ahmedabad, Surat & Virtual Lounge',
    'Visit our luxury flagship showrooms in Ahmedabad and Surat, or schedule a private consultation with LEOZ principal designers.'
  );

  // RiFRA-style Showrooms Hero Slider Data
  const showroomSlides = [
    {
      id: 'ahmedabad',
      name: 'AHMEDABAD FLAGSHIP STUDIO',
      tagline: 'Sankalp Square 3B, Sindhu Bhavan Marg, Thaltej',
      desc: 'Experience full-scale monolithic kitchens, illuminated dressing suites, and our tactile materials archive in the heart of Ahmedabad.',
      image: '/Grand Villa Estate.webp',
      timing: 'Mon–Sat: 10:00 AM – 7:00 PM | Sun by appointment',
    },
    {
      id: 'surat',
      name: 'SURAT EXPERIENCE LOUNGE',
      tagline: 'Luxury Residential & Architectural Trade Studio',
      desc: 'Dedicated private showroom curated for architects, interior designers, and homeowners seeking turnkey Italian kitchen commissions.',
      image: '/Smoked Glass Vitrine Wardrobe.webp',
      timing: 'Mon–Sat: 10:00 AM – 7:00 PM',
    },
    {
      id: 'online',
      name: 'VIRTUAL DESIGN STUDIO (PAN-INDIA)',
      tagline: 'Direct 3D CAD Consultations & Photorealistic Renders',
      desc: 'Connect with our principal design team from anywhere in India for a two-stage 3D architectural plan and tailored quotation.',
      image: '/The Opus Penthouse Kitchen.jfif',
      timing: 'Online Video Consultations (Mon–Sat)',
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : showroomSlides.length - 1));
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev < showroomSlides.length - 1 ? prev + 1 : 0));
  };

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'Kitchen',
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

    // Phone validation (exact 10 digits for Indian standard or 10-12 international)
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

    // Message validation
    if (formData.message.length > 500) {
      newErrors.message = 'Please keep your message under 500 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // For phone, only allow digits, spaces, plus, hyphens
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
    const result = await submitEnquiryForm('contact', formData);
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
            SECTION 1: RiFRA FULL-BLEED SHOWROOMS HERO SLIDER
            ========================================================================= */}
        <section
          aria-label="LEOZ Showrooms Hero"
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
              key={showroomSlides[activeSlide].id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: luxuryEase }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url("${encodeURI(showroomSlides[activeSlide].image)}")`,
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
                LEOZ CUCINE — SHOWROOMS &amp; CONTACT
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
                {showroomSlides[activeSlide].name}
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
                {showroomSlides[activeSlide].desc}
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
                  href="#contact-form-section"
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
                  <span>Book Showroom Visit</span>
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
                  Direct Call ({PHONE_SALES_DISPLAY})
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
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>0{activeSlide + 1}</span> / 0{showroomSlides.length}
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
            SECTION 2: CONTACT DETAILS & ENQUIRY FORM (RiFRA 2-COLUMN LUXURY MATRIX)
            ========================================================================= */}
        <section
          id="contact-form-section"
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
              {/* Left Column: Direct Communication Channels */}
              <motion.div
                id="contact-details"
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
                  VISIT &amp; CONNECT
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(28px, 3.5vw, 44px)',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    color: '#FFFFFF',
                    margin: '0 0 36px 0',
                  }}
                >
                  Visit &amp; Connect.
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {/* Leadership Contact */}
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
                      <Phone size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B69A6B', margin: '0 0 4px 0', fontWeight: 600 }}>
                        Mr. Piyush Gahlot
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', margin: '0 0 6px 0' }}>
                        Director – Sales, Business Development &amp; Global Alliances
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', margin: 0, lineHeight: 1.6 }}>
                        Phone: <a href="tel:+919825022616" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 500 }}>+91 98250 22616</a><br />
                        Email: <a href="mailto:director@leozartofambience.com" style={{ color: '#B69A6B', textDecoration: 'none' }}>director@leozartofambience.com</a>
                      </p>
                    </div>
                  </div>

                  {/* Corporate Office */}
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
                      <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B69A6B', margin: '0 0 6px 0', fontWeight: 600 }}>
                        Corporate Office — Ahmedabad
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255, 255, 255, 0.75)', margin: '0 0 8px 0', lineHeight: 1.6 }}>
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
                          color: '#B69A6B',
                          fontSize: '12px',
                          fontFamily: 'var(--font-body)',
                          textDecoration: 'none',
                          letterSpacing: '0.05em',
                        }}
                      >
                        <span>View on Google Maps</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>

                  {/* Manufacturing Unit */}
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
                      <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B69A6B', margin: '0 0 6px 0', fontWeight: 600 }}>
                        Manufacturing Unit — Gandhinagar (20,000 sq. ft.)
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255, 255, 255, 0.75)', margin: '0 0 8px 0', lineHeight: 1.6 }}>
                        LEOZ Furniture Pvt. Ltd., Kothari Cross Road, Rakanpur–Satej Road, Rakanpur, Gandhinagar – 382721, Gujarat.
                      </p>
                      <a
                        href="https://maps.app.goo.gl/mVzVJEBEg3G3re7CA"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#B69A6B',
                          fontSize: '12px',
                          fontFamily: 'var(--font-body)',
                          textDecoration: 'none',
                          letterSpacing: '0.05em',
                        }}
                      >
                        <span>View Factory Location</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>

                  {/* Electronic Inquiries & Website */}
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
                      <Mail size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#B69A6B', margin: '0 0 6px 0', fontWeight: 600 }}>
                        Digital &amp; Web
                      </h4>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255, 255, 255, 0.75)', margin: 0, lineHeight: 1.6 }}>
                        Email: <a href="mailto:director@leozartofambience.com" style={{ color: '#FFFFFF', textDecoration: 'none' }}>director@leozartofambience.com</a><br />
                        Website: <a href="https://www.leozartofambience.com" target="_blank" rel="noopener noreferrer" style={{ color: '#B69A6B', textDecoration: 'none' }}>www.leozartofambience.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: RiFRA Minimal Dark Form Frame */}
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
                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <CheckCircle size={54} color="#B69A6B" style={{ marginBottom: '20px' }} />
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: '#FFFFFF', marginBottom: '12px', fontWeight: 300 }}>
                      Consultation Request Received
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7, marginBottom: '24px' }}>
                      Thank you for connecting with LEOZ Cucine. Our senior architectural designer will reach out directly to confirm your appointment.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          projectType: 'Kitchen',
                          message: '',
                        });
                        setErrors({});
                        setFormSubmitted(false);
                      }}
                      className="rifra-btn-secondary"
                      style={{ fontSize: '11px', padding: '10px 22px' }}
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B69A6B', fontWeight: 600 }}>
                      PRIVATE CONSULTATION
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 300, color: '#FFFFFF', margin: '0 0 8px 0' }}>
                      Request a Dedicated Designer
                    </h3>

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
                        placeholder="Enter your name"
                        style={{
                          width: '100%',
                          height: '48px',
                          padding: '0 16px',
                          backgroundColor: '#0D0D0D',
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
                            backgroundColor: '#0D0D0D',
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

                    {/* Project Scope */}
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                        Project Typology
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
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
                        <option value="Kitchen">Luxury Modular Kitchen</option>
                        <option value="Wardrobe">Bespoke Walk-in Wardrobe</option>
                        <option value="Both">Complete Residence (Kitchen &amp; Wardrobes)</option>
                        <option value="Architect">Architect / Trade Collaboration</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                        Project Details / Timeline (Max 500 characters)
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        maxLength={500}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your space, dimensions, or architect drawings..."
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
                      {submitStatus === 'submitting' ? 'Transmitting Request…' : 'Submit Consultation Request'}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: RiFRA GOOGLE MAP ARCHITECTURAL LOCATION
            ========================================================================= */}
        <section
          aria-label="LEOZ Flagship Studio Map"
          style={{
            backgroundColor: '#000000',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ width: '100%', height: '480px', position: 'relative' }}>
            <iframe
              title="LEOZ Cucine Showroom Location"
              src="https://www.google.com/maps?q=Sankalp+Square+3B%2C+509%2C+Sindhu+Bhavan+Marg%2C+Thaltej%2C+Ahmedabad%2C+Gujarat+380059&output=embed"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)',
                display: 'block',
              }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
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

export default Contact;
