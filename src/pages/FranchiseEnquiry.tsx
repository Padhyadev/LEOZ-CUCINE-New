import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { UniversalHero } from '../components/common/UniversalHero';
import { images } from '../assets/images';
import { submitEnquiryForm } from '../lib/submitEnquiryForm';
import {
  Store,
  Settings,
  Factory,
  Check,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import './FranchiseEnquiry.css';

/* ── Constants ──────────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Magnetic Button ────────────────────────────────────────────────────── */
const MagneticButton = ({
  children,
  className,
  onClick,
  disabled,
  type = 'button',
}: {
  children: React.ReactNode;
  className: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) => {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18 });
  const y = useSpring(0, { stiffness: 260, damping: 18 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  };

  return (
    <motion.button
      type={type}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x, y }}
      disabled={disabled}
      whileTap={reduce || disabled ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
};

/* ── Section Head ───────────────────────────────────────────────────────── */
const SectionHead = ({ eyebrow, title, center }: { eyebrow: string; title: string; center?: boolean }) => {
  const reduce = useReducedMotion();
  return (
    <div style={{ marginBottom: '40px', textAlign: center ? 'center' : undefined }}>
      <div className="lz-f-mask">
        <motion.span
          className="lz-f-eyebrow"
          initial={reduce ? false : { y: '110%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {eyebrow}
        </motion.span>
      </div>
      <motion.h2
        className="lz-f-h2"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
      >
        {title}
      </motion.h2>
      <motion.span
        className={`lz-f-rule${center ? ' lz-f-rule--center' : ''}`}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
      />
    </div>
  );
};

/* ── Spotlight wrapper ──────────────────────────────────────────────────── */
const SpotlightWrap = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const spotRef = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent) => {
    if (!spotRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    spotRef.current.style.left = `${e.clientX - rect.left}px`;
    spotRef.current.style.top = `${e.clientY - rect.top}px`;
  };
  return (
    <div className={`lz-f-spotlight-wrap ${className || ''}`} onMouseMove={handleMove}>
      <div ref={spotRef} className="lz-f-spotlight" />
      {children}
    </div>
  );
};

/* ======================================================================== */
/*  FRANCHISE ENQUIRY PAGE                                                  */
/* ======================================================================== */

export const FranchiseEnquiry: React.FC = () => {
  const reduce = useReducedMotion();

  /* ── Form state ───────────────────────────────────────────────────────── */
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
  const [submitError, setSubmitError] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* ── Validation ───────────────────────────────────────────────────────── */
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

  /* ── Input handling ───────────────────────────────────────────────────── */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      const sanitized = value.replace(/[^\d+\s-]/g, '').slice(0, 15);
      setFormData(prev => ({ ...prev, [name]: sanitized }));
      if (errors.mobile) setErrors(prev => ({ ...prev, mobile: '' }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  /* ── Submit (EXISTING API – unchanged) ────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(false);
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
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Progress calculation ─────────────────────────────────────────────── */
  const calculateProgress = () => {
    const required = ['fullName', 'mobile', 'email', 'city', 'businessBackground'];
    const filled = required.filter(f => formData[f as keyof typeof formData].trim().length > 0).length;
    return (filled / required.length) * 100;
  };

  const scrollToForm = () => {
    document.getElementById('franchise-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── Pillar icon drawing ──────────────────────────────────────────────── */
  const PillarIcon = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    return (
      <div className="lz-f-pillar" ref={ref}>
        <motion.div
          initial={reduce ? false : { scale: 0, rotate: -30 }}
          animate={inView ? { scale: 1, rotate: 0 } : undefined}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Icon size={24} color="var(--gold)" strokeWidth={1.5} />
        </motion.div>
        <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-cocoa)' }}>{label}</span>
      </div>
    );
  };

  /* ── Render ────────────────────────────────────────────────────────────── */
  return (
    <div className="lz-franchise">
      <Header />

      <main>

        {/* ================================================================
            01 HERO — An Invitation to Grow with LEOZ
            ================================================================ */}
        <UniversalHero
          image="/franchise-showroom-hero.png"
          mobileImage="/franchise-showroom-hero.png"
          imageAlt="LEOZ Luxury Showroom Kitchen and Wardrobe Consultation Space"
          imagePosition="center 50%"
          eyebrow="LEOZ / FRANCHISE ENQUIRY"
          headline="An Invitation to Grow with LEOZ"
          supportingText="LEOZ Cucine is exploring the appointment of two franchise partners for its luxury kitchen and wardrobe brand. We welcome expressions of interest from entrepreneurs and design-industry professionals who share our appreciation for refined products and customer experience."
          ctaText="Express Franchise Interest"
          ctaHref="#franchise-form"
          onCtaClick={scrollToForm}
          brightness={0.88}
        />

        {/* ================================================================
            02 THE OPPORTUNITY
            ================================================================ */}
        <SpotlightWrap className="lz-f-section bg-ivory">
          <div className="lz-f-container">
            <SectionHead eyebrow="The Opportunity" title="A Focused Retail Concept" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
              {/* Left: text + pillars */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '32px', color: 'var(--text-taupe)' }}>
                  A focused retail and consultation concept dedicated to luxury modular kitchens and bespoke wardrobes, backed by the brand's manufacturing know-how and in-house production capability.
                </p>

                <PillarIcon icon={Store} label="Retail and consultation concept" />
                <PillarIcon icon={Settings} label="Manufacturing know-how" />
                <PillarIcon icon={Factory} label="In-house production capability" />
              </motion.div>

              {/* Right: bracket-framed image */}
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
                className="lz-f-img-wrap"
                style={{ aspectRatio: '4/3', position: 'relative' }}
              >
                <div className="lz-f-bracket lz-f-bracket--tl" />
                <div className="lz-f-bracket lz-f-bracket--br" />
                <img src={images.consultationBg} alt="Luxury retail consultation space" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </SpotlightWrap>

        {/* ================================================================
            03 WHO WE WOULD LIKE TO MEET
            ================================================================ */}
        <section className="lz-f-section bg-cream">
          <div className="lz-f-container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px auto' }}>
              <SectionHead eyebrow="Partnership" title="Who We Would Like to Meet" center />
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-taupe)' }}
              >
                Professionals with a strong understanding of their local premium residential market, customer relationships, space to establish an appropriate experience centre, and a commitment to active business involvement.
              </motion.p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {[
                'Strong understanding of the local premium residential market',
                'Customer relationships',
                'Space to establish an appropriate experience centre',
                'Commitment to active business involvement',
              ].map((text, i) => (
                <motion.div
                  key={i}
                  className="lz-f-profile"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                >
                  <Check className="lz-f-profile__check" size={22} color="var(--gold)" />
                  <span style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--text-cocoa)', fontWeight: 500, marginTop: 'auto' }}>
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            04 HOW TO ENQUIRE + FORM
            ================================================================ */}
        <SpotlightWrap className="lz-f-section bg-ivory">
          <section id="franchise-form" className="lz-f-container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
              <SectionHead eyebrow="Application" title="How to Enquire" center />
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-taupe)' }}
              >
                Submit your city, business background, proposed location, available area and indicative investment capacity. The LEOZ team will discuss suitability and share the franchise model subject to approval.
              </motion.p>
            </div>

            {/* 5-step guide */}
            <div className="lz-f-guide">
              {['City', 'Business background', 'Proposed location', 'Available area', 'Indicative investment capacity'].map((step, i) => (
                <div key={i} className="lz-f-guide__step">
                  <div className={`lz-f-guide__dot ${calculateProgress() > i * 20 ? 'filled' : ''}`} />
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-taupe)' }}>{step}</span>
                </div>
              ))}
            </div>

            {/* Form card */}
            <motion.div
              className="lz-f-form-card"
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="lz-f-bracket lz-f-bracket--tl" />
              <div className="lz-f-progress" style={{ width: `${calculateProgress()}%` }} />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* ── Success state ─────────────────────────────────────── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="lz-f-success"
                    role="status"
                    aria-live="polite"
                  >
                    <motion.div
                      className="lz-f-success__circle"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                    >
                      <Check size={32} color="var(--gold)" />
                    </motion.div>
                    <h3 style={{ fontSize: '24px', color: 'var(--text-cocoa)', marginBottom: '16px' }}>
                      Enquiry Received
                    </h3>
                    <p style={{ color: 'var(--text-taupe)', lineHeight: 1.7 }}>
                      We have received your franchise enquiry and our leadership team will be in touch.
                    </p>
                  </motion.div>
                ) : (
                  /* ── Form ──────────────────────────────────────────────── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                  >
                    <div className="lz-f-form-grid">

                      {/* Full Name */}
                      <div className="lz-f-field">
                        <input
                          id="f_name" type="text" name="fullName"
                          className={`lz-f-input ${errors.fullName ? 'error shake' : ''}`}
                          placeholder=" " value={formData.fullName}
                          onChange={handleInputChange}
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? 'err_name' : undefined}
                        />
                        <label htmlFor="f_name" className="lz-f-label">Your name <span style={{ fontSize: '10px' }}>(Required)</span></label>
                        <div className="lz-f-input-line" />
                        {errors.fullName
                          ? <span id="err_name" className="lz-f-error">{errors.fullName}</span>
                          : (formData.fullName.trim() && <Check size={14} color="var(--gold)" style={{ position: 'absolute', right: 16, top: 22 }} />)}
                      </div>

                      {/* Mobile Number */}
                      <div className="lz-f-field">
                        <input
                          id="f_mobile" type="tel" name="mobile" inputMode="numeric"
                          className={`lz-f-input ${errors.mobile ? 'error shake' : ''}`}
                          placeholder=" " value={formData.mobile}
                          onChange={handleInputChange}
                          aria-invalid={!!errors.mobile}
                          aria-describedby={errors.mobile ? 'err_mobile' : undefined}
                        />
                        <label htmlFor="f_mobile" className="lz-f-label">Your mobile number <span style={{ fontSize: '10px' }}>(Required)</span></label>
                        <div className="lz-f-input-line" />
                        {errors.mobile
                          ? <span id="err_mobile" className="lz-f-error">{errors.mobile}</span>
                          : (formData.mobile.replace(/\D/g, '').length >= 10 && <Check size={14} color="var(--gold)" style={{ position: 'absolute', right: 16, top: 22 }} />)}
                      </div>

                      {/* Email */}
                      <div className="lz-f-field">
                        <input
                          id="f_email" type="email" name="email"
                          className={`lz-f-input ${errors.email ? 'error shake' : ''}`}
                          placeholder=" " value={formData.email}
                          onChange={handleInputChange}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'err_email' : undefined}
                        />
                        <label htmlFor="f_email" className="lz-f-label">Your email <span style={{ fontSize: '10px' }}>(Required)</span></label>
                        <div className="lz-f-input-line" />
                        {errors.email
                          ? <span id="err_email" className="lz-f-error">{errors.email}</span>
                          : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && <Check size={14} color="var(--gold)" style={{ position: 'absolute', right: 16, top: 22 }} />)}
                      </div>

                      {/* City */}
                      <div className="lz-f-field">
                        <input
                          id="f_city" type="text" name="city"
                          className={`lz-f-input ${errors.city ? 'error shake' : ''}`}
                          placeholder=" " value={formData.city}
                          onChange={handleInputChange}
                          aria-invalid={!!errors.city}
                          aria-describedby={errors.city ? 'err_city' : undefined}
                        />
                        <label htmlFor="f_city" className="lz-f-label">Your city <span style={{ fontSize: '10px' }}>(Required)</span></label>
                        <div className="lz-f-input-line" />
                        {errors.city
                          ? <span id="err_city" className="lz-f-error">{errors.city}</span>
                          : (formData.city.trim() && <Check size={14} color="var(--gold)" style={{ position: 'absolute', right: 16, top: 22 }} />)}
                      </div>

                      {/* Business Background – full width */}
                      <div className="lz-f-field lz-f-form-grid--full">
                        <input
                          id="f_biz" type="text" name="businessBackground"
                          className={`lz-f-input ${errors.businessBackground ? 'error shake' : ''}`}
                          placeholder=" " value={formData.businessBackground}
                          onChange={handleInputChange}
                          aria-invalid={!!errors.businessBackground}
                          aria-describedby={errors.businessBackground ? 'err_biz' : undefined}
                        />
                        <label htmlFor="f_biz" className="lz-f-label">Your business background <span style={{ fontSize: '10px' }}>(Required)</span></label>
                        <div className="lz-f-input-line" />
                        {errors.businessBackground
                          ? <span id="err_biz" className="lz-f-error">{errors.businessBackground}</span>
                          : (formData.businessBackground.trim() && <Check size={14} color="var(--gold)" style={{ position: 'absolute', right: 16, top: 22 }} />)}
                      </div>

                      {/* Proposed Location */}
                      <div className="lz-f-field">
                        <input
                          id="f_loc" type="text" name="proposedLocation"
                          className="lz-f-input" placeholder=" "
                          value={formData.proposedLocation}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="f_loc" className="lz-f-label">Proposed location <span style={{ fontSize: '10px' }}>(Optional)</span></label>
                        <div className="lz-f-input-line" />
                      </div>

                      {/* Available Area – dropdown with EXACT original values */}
                      <div className="lz-f-field">
                        <select
                          id="f_area" name="availableArea"
                          className="lz-f-input"
                          value={formData.availableArea}
                          onChange={handleInputChange}
                          style={{ appearance: 'none', cursor: 'pointer' }}
                        >
                          <option value="1,000 – 1,500 sq. ft.">1,000 – 1,500 sq. ft.</option>
                          <option value="1,500 – 2,500 sq. ft.">1,500 – 2,500 sq. ft.</option>
                          <option value="2,500 – 4,000 sq. ft.">2,500 – 4,000 sq. ft.</option>
                          <option value="Space Identification in Progress">Space Identification in Progress</option>
                        </select>
                        <label htmlFor="f_area" className="lz-f-label" style={{ top: '4px', fontSize: '11px', color: 'var(--bronze)' }}>
                          Available area <span style={{ fontSize: '10px' }}>(Optional)</span>
                        </label>
                        <div className="lz-f-input-line" />
                        <ChevronDown size={14} color="var(--gold)" style={{ position: 'absolute', right: 16, top: 24, pointerEvents: 'none' }} />
                      </div>

                      {/* Indicative Investment – dropdown with EXACT original values */}
                      <div className="lz-f-field">
                        <select
                          id="f_inv" name="indicativeInvestment"
                          className="lz-f-input"
                          value={formData.indicativeInvestment}
                          onChange={handleInputChange}
                          style={{ appearance: 'none', cursor: 'pointer' }}
                        >
                          <option value="₹50 Lakhs – ₹75 Lakhs">₹50 Lakhs – ₹75 Lakhs</option>
                          <option value="₹75 Lakhs – ₹1.5 Crore">₹75 Lakhs – ₹1.5 Crore</option>
                          <option value="₹1.5 Crore – ₹3 Crore">₹1.5 Crore – ₹3 Crore</option>
                          <option value="Custom Enterprise Allocation">Custom Enterprise Allocation</option>
                        </select>
                        <label htmlFor="f_inv" className="lz-f-label" style={{ top: '4px', fontSize: '11px', color: 'var(--bronze)' }}>
                          Indicative investment capacity <span style={{ fontSize: '10px' }}>(Optional)</span>
                        </label>
                        <div className="lz-f-input-line" />
                        <ChevronDown size={14} color="var(--gold)" style={{ position: 'absolute', right: 16, top: 24, pointerEvents: 'none' }} />
                      </div>

                      {/* Additional Scope / Message – full width, auto-grow */}
                      <div className="lz-f-field lz-f-form-grid--full">
                        <textarea
                          id="f_msg" name="message"
                          className="lz-f-input" placeholder=" "
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={3}
                          style={{ resize: 'vertical' }}
                        />
                        <label htmlFor="f_msg" className="lz-f-label">Share any additional context <span style={{ fontSize: '10px' }}>(Optional)</span></label>
                        <div className="lz-f-input-line" />
                      </div>

                    </div>

                    {/* Submit */}
                    <div style={{ marginTop: '48px', textAlign: 'center' }}>
                      <MagneticButton
                        className="lz-f-btn lz-f-btn--primary"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Express Franchise Interest'}
                      </MagneticButton>

                      {submitError && (
                        <div role="alert" aria-live="assertive" style={{ marginTop: '16px' }}>
                          <span style={{ color: '#C18C8B', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                            Something went wrong. Please try again.
                          </span>
                          <button
                            type="button"
                            onClick={handleSubmit}
                            style={{ background: 'none', border: 'none', color: 'var(--bronze)', textDecoration: 'underline', cursor: 'pointer', fontSize: '14px' }}
                          >
                            Try Again
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </section>
        </SpotlightWrap>

      </main>

      <Footer />
    </div>
  );
};

export default FranchiseEnquiry;
