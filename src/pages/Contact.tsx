import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, useSpring, useInView } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { Phone, Mail, Globe, MapPin, Copy, Check, ArrowRight } from 'lucide-react';
import { submitEnquiryForm } from '../lib/submitEnquiryForm';
import { AnimatePresence } from 'framer-motion';
import './Contact.css';

const EASE = [0.16, 1, 0.3, 1];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "LEOZ Cucine",
  "telephone": "+919825022616",
  "email": "director@leozartofambience.com",
  "url": "https://www.leozartofambience.com",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "509, Sankalp Square 3B, Beside Taj Skyline, Sindhu Bhavan Road, Thaltej",
      "addressLocality": "Ahmedabad",
      "postalCode": "380059",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "LEOZ Furniture Pvt. Ltd., Kothari Cross Road, Rakanpur–Satej Road, Rakanpur",
      "addressLocality": "Gandhinagar",
      "postalCode": "382721",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    }
  ]
};

const SectionHead = ({ eyebrow, title, center = false }: { eyebrow?: string, title: string, center?: boolean }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div 
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ textAlign: center ? 'center' : 'left', display: 'flex', flexDirection: 'column', alignItems: center ? 'center' : 'flex-start' }}
    >
      {eyebrow && <span className="lz-contact-eyebrow">{eyebrow}</span>}
      <h2 className="lz-contact-h2 lz-contact-mask">
        <motion.span
          initial={reduce ? false : { y: '105%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {title}
        </motion.span>
      </h2>
      <motion.span 
        className="lz-contact-rule"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      />
    </motion.div>
  );
};

const MagneticButton = ({ children, className, href, onClick, target, rel }: { children: React.ReactNode, className: string, href?: string, onClick?: (e: any) => void, target?: string, rel?: string }) => {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18 });
  const y = useSpring(0, { stiffness: 260, damping: 18 });
  
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width / 2)) * 0.2)));
    y.set(Math.max(-8, Math.min(8, (e.clientY - (r.top + r.height / 2)) * 0.35)));
  };

  const reset = () => { x.set(0); y.set(0); };

  if (href) {
    return (
      <motion.a href={href} className={className} onMouseMove={handleMove} onMouseLeave={reset} style={{ x, y }} target={target} rel={rel}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button className={className} onMouseMove={handleMove} onMouseLeave={reset} onClick={onClick} style={{ x, y }}>
      {children}
    </motion.button>
  );
};

const SpotlightContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  
  const handleMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className={`lz-spotlight-container ${className || ''}`} onMouseMove={handleMove}>
      <div className="lz-spotlight" style={{ left: pos.x, top: pos.y }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

const CopyableRow = ({ icon: Icon, text, link, copyText }: { icon: any, text: string, link: string, copyText: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.a 
      href={link} 
      className="lz-contact-row"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      target={link.startsWith('http') ? '_blank' : '_self'}
      rel={link.startsWith('http') ? 'noopener' : undefined}
    >
      <Icon size={20} color="var(--gold)" />
      <span style={{ fontSize: '15px', flex: 1 }}>{text}</span>
      <div style={{ position: 'relative' }} onClick={handleCopy}>
        <div className={`lz-tooltip ${copied ? 'show' : ''}`}>Copied</div>
        {copied ? <Check size={16} color="var(--gold)" /> : <Copy size={16} style={{ opacity: 0.5 }} />}
      </div>
    </motion.a>
  );
};

const EnquiryForm = () => {
  const reduce = useReducedMotion();
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', location: '', projectType: '', budget: '', stage: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const requiredFields = ['fullName', 'phone', 'email', 'location', 'projectType'];
  const filledFields = requiredFields.filter(f => formData[f as keyof typeof formData]);
  const progress = (filledFields.length / requiredFields.length) * 100;

  const validate = () => {
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
    if (!formData.location.trim()) errs.location = 'Please specify your project location.';
    if (!formData.projectType) errs.projectType = 'Please select a project type.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await submitEnquiryForm('contact', {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        city: formData.location,
        projectType: formData.projectType,
        projectSize: formData.budget && formData.stage ? `${formData.budget} | Stage: ${formData.stage}` : (formData.budget || formData.stage || 'N/A'),
        message: formData.message,
      });
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <motion.div className="lz-form-card" style={{ textAlign: 'center', padding: '80px 32px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="lz-contact-bracket lz-contact-bracket--tl" style={{ opacity: 0.1 }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--gold)', marginBottom: '32px' }}>
          <Check size={40} color="var(--gold)" />
        </div>
        <h3 style={{ fontSize: '28px', color: 'var(--text-cocoa)', marginBottom: '16px', fontWeight: 400 }}>Thank you for contacting LEOZ Cucine.</h3>
        <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--text-taupe)', marginBottom: '40px' }}>
          We have received your enquiry and our team will be in touch.
        </p>
        {/* [Insert confirmed response timeline only if operationally committed.] */}
        <MagneticButton onClick={() => window.location.reload()} className="lz-contact-btn lz-contact-btn--secondary">
          Back to Home
        </MagneticButton>
      </motion.div>
    );
  }

  const stages = ['Planning', 'Construction', 'Renovation', 'Ready for Measurement'];

  return (
    <div className="lz-form-card">
      <div className="lz-contact-bracket lz-contact-bracket--tl" style={{ opacity: 0.1 }} />
      <div className="lz-form-progress" style={{ width: `${progress}%` }} />
      
      {submitStatus === 'error' && (
        <div style={{ backgroundColor: '#FDF7F7', border: '1px solid #C18C8B', color: '#C18C8B', padding: '16px', borderRadius: '3px', marginBottom: '32px', textAlign: 'center', fontSize: '14px' }}>
          Something went wrong while submitting. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0 32px' }}>
          
          <motion.div className="lz-input-group" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <input id="f_name" type="text" className={`lz-input ${errors.fullName ? 'error shake' : ''}`} placeholder=" " value={formData.fullName} onChange={e => { setFormData({...formData, fullName: e.target.value}); if(errors.fullName) setErrors({...errors, fullName: ''}); }} />
            <label htmlFor="f_name" className="lz-label">Your name</label>
            <div className="lz-input-line" />
            {errors.fullName ? <span className="lz-error-text">{errors.fullName}</span> : (formData.fullName.trim() && <Check size={14} color="var(--gold)" style={{ position: 'absolute', right: '16px', top: '24px' }} />)}
          </motion.div>

          <motion.div className="lz-input-group" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <input id="f_phone" type="tel" inputMode="numeric" className={`lz-input ${errors.phone ? 'error shake' : ''}`} placeholder=" " value={formData.phone} onChange={e => { setFormData({...formData, phone: e.target.value}); if(errors.phone) setErrors({...errors, phone: ''}); }} />
            <label htmlFor="f_phone" className="lz-label">Preferred contact number</label>
            <div className="lz-input-line" />
            {errors.phone ? <span className="lz-error-text">{errors.phone}</span> : (formData.phone.replace(/\D/g, '').length >= 10 && <Check size={14} color="var(--gold)" style={{ position: 'absolute', right: '16px', top: '24px' }} />)}
          </motion.div>

          <motion.div className="lz-input-group" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <input id="f_email" type="email" className={`lz-input ${errors.email ? 'error shake' : ''}`} placeholder=" " value={formData.email} onChange={e => { setFormData({...formData, email: e.target.value}); if(errors.email) setErrors({...errors, email: ''}); }} />
            <label htmlFor="f_email" className="lz-label">Your email</label>
            <div className="lz-input-line" />
            {errors.email ? <span className="lz-error-text">{errors.email}</span> : (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && <Check size={14} color="var(--gold)" style={{ position: 'absolute', right: '16px', top: '24px' }} />)}
          </motion.div>

          <motion.div className="lz-input-group" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}>
            <input id="f_city" type="text" className={`lz-input ${errors.location ? 'error shake' : ''}`} placeholder=" " value={formData.location} onChange={e => { setFormData({...formData, location: e.target.value}); if(errors.location) setErrors({...errors, location: ''}); }} />
            <label htmlFor="f_city" className="lz-label">City / locality</label>
            <div className="lz-input-line" />
            {errors.location ? <span className="lz-error-text">{errors.location}</span> : (formData.location.trim() && <Check size={14} color="var(--gold)" style={{ position: 'absolute', right: '16px', top: '24px' }} />)}
          </motion.div>
        </div>

        <motion.div className="lz-input-group" style={{ marginTop: '16px' }} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <span style={{ display: 'block', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--bronze)', marginBottom: '16px' }}>Project Type <span style={{ color: '#C18C8B' }}>*</span></span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {['Kitchen', 'Wardrobe', 'Both', 'Architect or Developer Enquiry'].map(type => (
              <label key={type} className={`lz-radio-card ${formData.projectType === type ? 'selected' : ''}`}>
                <input type="radio" name="projectType" value={type} checked={formData.projectType === type} onChange={() => { setFormData({...formData, projectType: type}); if(errors.projectType) setErrors({...errors, projectType: ''}); }} style={{ display: 'none' }} />
                <span style={{ fontSize: '14px', flex: 1 }}>{type}</span>
                {formData.projectType === type && <Check size={16} color="var(--gold)" />}
              </label>
            ))}
          </div>
          {errors.projectType && <span className="lz-error-text shake" style={{ marginLeft: 0 }}>{errors.projectType}</span>}
        </motion.div>

        <motion.div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '32px' }} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
          <div className="lz-input-group">
            <span style={{ display: 'block', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--bronze)', marginBottom: '8px' }}>Approximate Budget</span>
            <select className="lz-input" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} style={{ paddingLeft: 0, paddingTop: '16px' }}>
              <option value="" disabled>Optional range</option>
              <option value="Under ₹10L">Under ₹10L</option>
              <option value="₹10L – ₹20L">₹10L – ₹20L</option>
              <option value="₹20L – ₹40L">₹20L – ₹40L</option>
              <option value="₹40L+">₹40L+</option>
            </select>
          </div>

          <div className="lz-input-group">
            <span style={{ display: 'block', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--bronze)', marginBottom: '16px' }}>Project Stage</span>
            <div className="lz-stepper">
              {stages.map(st => (
                <div key={st} className={`lz-stepper-item ${formData.stage === st ? 'selected' : ''}`} onClick={() => setFormData({...formData, stage: st})}>
                  <div className="lz-stepper-dot" />
                  <span className="lz-stepper-label">{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div className="lz-input-group" style={{ marginTop: '16px' }} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
          <textarea id="f_msg" className="lz-input" placeholder=" " value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} rows={3} style={{ resize: 'vertical' }} />
          <label htmlFor="f_msg" className="lz-label">Tell us about your preferences and requirements (Optional)</label>
          <div className="lz-input-line" />
        </motion.div>

        <motion.div style={{ marginTop: '48px', textAlign: 'center' }} initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.45 }}>
          <MagneticButton className="lz-contact-btn lz-contact-btn--primary" onClick={handleSubmit}>
            {isSubmitting ? 'Submitting...' : 'Send Enquiry'}
          </MagneticButton>
          {submitStatus === 'error' && (
            <button type="button" onClick={handleSubmit} style={{ background: 'none', border: 'none', color: 'var(--bronze)', textDecoration: 'underline', marginTop: '16px', cursor: 'pointer', display: 'block', width: '100%' }}>
              Try Again
            </button>
          )}
        </motion.div>
      </form>
    </div>
  );
};

export const Contact: React.FC = () => {
  useDocumentMeta('Contact Us | LEOZ Cucine', 'Connect with LEOZ Cucine for luxury kitchen and wardrobe enquiries. Visit our Ahmedabad office or Gandhinagar manufacturing facility.');
  
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const reduce = useReducedMotion();

  return (
    <div className="lz-contact">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      
      <main>
        {/* 01 HERO */}
        <section className="lz-contact-hero">
          <div className="lz-contact-hero__bg">
            <img src="/contact_hero_clean.png" alt="LEOZ Cucine Luxury Showroom" />
          </div>
          <div className="lz-contact-hero__overlay" />
          
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="lz-dust" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }} />
          ))}

          <div className="lz-contact-container" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
            <motion.div className="lz-contact-hero__content lz-contact-hero-text-shadow" initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
              <h1 className="lz-contact-h2" style={{ marginBottom: '24px', color: '#fff' }}>Begin Your LEOZ Experience</h1>
              <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '32px', color: '#fff' }}>
                We welcome homeowners, architects, designers and premium residential developers to connect with us for luxury kitchen and wardrobe enquiries.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 02 HOW WE CAN ASSIST */}
        <section className="lz-contact-section bg-ivory">
          <div className="lz-contact-container" style={{ textAlign: 'center', maxWidth: '800px' }}>
            <div style={{ width: '1px', height: '64px', backgroundColor: 'var(--gold)', margin: '0 auto 32px' }} />
            <h2 className="lz-contact-h2" style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '40px' }}>How We Can Assist</h2>
            <p style={{ fontSize: '18px', lineHeight: 1.8, marginBottom: '48px' }}>
              Our team can discuss new kitchens, bespoke wardrobes, material and finish options, design consultations and product-focused collaborations.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
              {['New kitchens', 'Bespoke wardrobes', 'Material and finish options', 'Design consultations', 'Product-focused collaborations'].map((chip, i) => (
                <motion.div 
                  key={i} 
                  className="lz-chip-contact"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Check size={14} color="var(--gold)" /> {chip}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 VISIT OUR AHMEDABAD OFFICE */}
        <SpotlightContainer className="lz-contact-section bg-cream">
          <div className="lz-contact-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <div>
              <SectionHead eyebrow="Corporate" title="Visit Our Ahmedabad Office" />
              <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '40px' }}>
                Explore your requirements and discuss finishes, layout possibilities and product specifications with the team. Visits are recommended by appointment.
              </p>
              <motion.div className="lz-contact-img-wrap" style={{ aspectRatio: '16/9' }} initial={reduce ? false : { opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="lz-contact-bracket lz-contact-bracket--tl" />
                <div className="lz-contact-bracket lz-contact-bracket--br" />
                <img src="/contact-hero.png" alt="LEOZ Cucine Ahmedabad Office" />
              </motion.div>
            </div>
            
            <motion.div className="lz-contact-card" style={{ position: 'relative' }} initial={reduce ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="lz-contact-bracket lz-contact-bracket--tr" style={{ opacity: 0.2 }} />
              
              <h3 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--text-cocoa)', marginBottom: '8px' }}>Mr. Piyush Gahlot</h3>
              <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--bronze)', marginBottom: '48px' }}>
                Director – Sales, Business Development & Global Alliances
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <CopyableRow icon={Phone} text="+91 98250 22616" link="tel:+919825022616" copyText="+919825022616" />
                <CopyableRow icon={Mail} text="director@leozartofambience.com" link="mailto:director@leozartofambience.com" copyText="director@leozartofambience.com" />
                
                <motion.a 
                  href="https://www.leozartofambience.com" 
                  target="_blank" 
                  rel="noopener"
                  className="lz-contact-row"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Globe size={20} color="var(--gold)" />
                  <span style={{ fontSize: '15px', flex: 1 }}>www.leozartofambience.com</span>
                  <ArrowRight size={16} style={{ opacity: 0.5 }} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </SpotlightContainer>

        {/* ENQUIRY FORM SECTION */}
        <SpotlightContainer className="lz-contact-section bg-ivory">
          <div className="lz-contact-container">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
              <div className="lz-contact-mask" style={{ marginBottom: '16px' }}>
                <motion.span 
                  className="lz-contact-eyebrow" 
                  style={{ color: 'var(--bronze)', margin: 0 }}
                  initial={reduce ? false : { y: '105%' }}
                  whileInView={{ y: '0%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  ENQUIRY FORM
                </motion.span>
              </div>
              
              <motion.span 
                style={{ display: 'block', width: '48px', height: '1px', backgroundColor: 'var(--gold)', transformOrigin: 'center', marginBottom: '24px' }}
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
              />

              <motion.p 
                style={{ color: 'var(--text-taupe)', maxWidth: '560px', lineHeight: 1.7, margin: '0 auto', fontSize: 'clamp(16px, 1.2vw, 18px)', padding: '0 24px' }}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              >
                Tell us a little about your space and what you envision. We will review your details and contact you to arrange the next discussion.
              </motion.p>
            </div>
            <EnquiryForm />
          </div>
        </SpotlightContainer>

        {/* 04 OUR LOCATIONS */}
        <section className="lz-contact-section bg-white">
          <div className="lz-contact-container">
            <SectionHead eyebrow="Facilities" title="Our Locations" center />
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginTop: '48px' }}>
              
              {/* Corporate Office */}
              <motion.div className="lz-location-card" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px', position: 'relative' }}>
                  <motion.div className="lz-pin-animation" whileInView={{ animationPlayState: 'running' }} viewport={{ once: true }}>
                    <MapPin size={48} strokeWidth={1} color="var(--gold)" />
                  </motion.div>
                  <div className="lz-pulse" />
                </div>
                <h3 style={{ fontSize: '20px', color: 'var(--text-cocoa)', marginBottom: '16px', textAlign: 'center' }}>Corporate Office</h3>
                <p style={{ fontSize: '15px', lineHeight: 1.8, textAlign: 'center', marginBottom: '32px', flex: 1 }}>
                  509, Sankalp Square 3B, Beside Taj Skyline, Sindhu Bhavan Road, Thaltej, Ahmedabad – 380059, Gujarat.
                </p>
                <div style={{ textAlign: 'center' }}>
                  <MagneticButton href="https://maps.app.goo.gl/xT39MPBvZR4v923E9" target="_blank" rel="noopener" className="lz-contact-btn lz-contact-btn--secondary">
                    Get Directions
                  </MagneticButton>
                </div>
              </motion.div>

              {/* Manufacturing Unit */}
              <motion.div className="lz-location-card" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px', position: 'relative' }}>
                  <motion.div className="lz-pin-animation" whileInView={{ animationPlayState: 'running' }} viewport={{ once: true }}>
                    <MapPin size={48} strokeWidth={1} color="var(--gold)" />
                  </motion.div>
                  <div className="lz-pulse" />
                </div>
                <h3 style={{ fontSize: '20px', color: 'var(--text-cocoa)', marginBottom: '16px', textAlign: 'center' }}>Manufacturing Unit</h3>
                <p style={{ fontSize: '15px', lineHeight: 1.8, textAlign: 'center', marginBottom: '32px', flex: 1 }}>
                  LEOZ Furniture Pvt. Ltd., Kothari Cross Road, Rakanpur–Satej Road, Rakanpur, Gandhinagar – 382721, Gujarat.
                </p>
                <div style={{ textAlign: 'center' }}>
                  <MagneticButton href="https://maps.app.goo.gl/mVzVJEBEg3G3re7CA" target="_blank" rel="noopener" className="lz-contact-btn lz-contact-btn--secondary">
                    Get Directions
                  </MagneticButton>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 05 OFFICE HOURS AND CUSTOMER CARE */}
        <section className="bg-sand" style={{ padding: '32px 24px' }}>
          <div className="lz-contact-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '32px', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--bronze)', marginBottom: '4px' }}>Office Hours</span>
              {/* TODO: Add working days after business confirms them */}
              <span style={{ fontSize: '16px', color: 'var(--text-cocoa)', fontWeight: 500 }}>10:00 AM – 7:00 PM</span>
            </div>
            <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--line-gold)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--bronze)', marginBottom: '4px' }}>Customer Care</span>
              <a href="tel:+918758551552" style={{ fontSize: '16px', color: 'var(--text-cocoa)', fontWeight: 500, textDecoration: 'none' }}>87585 51552</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Contact;
