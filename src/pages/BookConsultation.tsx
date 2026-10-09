import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLenisScroll } from '../hooks/useLenisScroll';
import { submitEnquiryForm } from '../lib/submitEnquiryForm';
import {
  BracketFrame,
  EASE_OUT,
  MaskHeading,
  Reveal,
  WarmImage,
  revealProps,
} from '../components/lux/LuxPrimitives';
import { ArrowRight, Check, CookingPot, DraftingCompass, Layers, RotateCcw, Shirt } from 'lucide-react';
import './Home.css';
import './BookConsultation.css';

/* ==========================================================================
   CONTENT — new client copy only
   ========================================================================== */

const nextSteps = [
  'Review your requirement',
  'Reach out to understand the scope',
  'Arrange a consultation or office visit',
];

const projectTypes = [
  { value: 'Kitchen', Icon: CookingPot },
  { value: 'Wardrobe', Icon: Shirt },
  { value: 'Both', Icon: Layers },
  { value: 'Architect or Developer Enquiry', Icon: DraftingCompass },
];

const projectStages = ['Planning', 'Construction', 'Renovation', 'Ready for Measurement'];

const SUCCESS_TEXT =
  'Thank you for contacting LEOZ Cucine. We have received your enquiry and our team will be in touch.';

const ERROR_TEXT = 'We could not send your enquiry. Please check your connection and try again — your details are still here.';

/* Payload keys are unchanged from the previous form so the existing
   /api/enquiry integration keeps receiving exactly the same shape. */
type FormData = {
  name: string;
  mobile: string;
  email: string;
  projectLocation: string;
  projectType: string;
  approximateBudget: string;
  projectStage: string;
  message: string;
};

type FieldName = keyof FormData;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Same rules as the previous form, plus a required Project Type */
const getFieldError = (name: FieldName, data: FormData): string => {
  switch (name) {
    case 'name':
      if (!data.name.trim()) return 'Please enter your name.';
      if (data.name.trim().length < 2) return 'Please enter a valid full name.';
      return '';
    case 'mobile': {
      const cleanPhone = data.mobile.replace(/\D/g, '');
      if (!data.mobile.trim()) return 'Please enter your preferred contact number.';
      if (cleanPhone.length < 10) return 'Please enter a valid 10-digit mobile number.';
      return '';
    }
    case 'email':
      if (!data.email.trim()) return 'Please enter your email address.';
      if (!emailRegex.test(data.email.trim())) return 'Please enter a valid email address.';
      return '';
    case 'projectLocation':
      if (!data.projectLocation.trim()) return 'Please enter your project location (city / locality).';
      return '';
    case 'projectType':
      if (!data.projectType) return 'Please select a project type.';
      return '';
    default:
      return '';
  }
};

const REQUIRED: FieldName[] = ['name', 'mobile', 'email', 'projectLocation', 'projectType'];

/* ==========================================================================
   SMALL PIECES
   ========================================================================== */

/* Submit button that drifts up to 8px toward the cursor */
const MagneticButton: React.FC<{ disabled: boolean; children: React.ReactNode }> = ({ disabled, children }) => {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18 });
  const y = useSpring(0, { stiffness: 260, damping: 18 });
  const clamp = (v: number) => Math.max(-8, Math.min(8, v));

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type="submit"
      className="lz-btn lz-btn--primary lz-btn--lg lz-btn--shimmer lzc-submit"
      disabled={disabled}
      aria-disabled={disabled}
      onMouseMove={(e) => {
        if (reduce || disabled) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(clamp((e.clientX - (r.left + r.width / 2)) * 0.2));
        y.set(clamp((e.clientY - (r.top + r.height / 2)) * 0.35));
      }}
      onMouseLeave={reset}
      onBlur={reset}
      style={{ x, y }}
    >
      {children}
    </motion.button>
  );
};

/* Gold circle that draws a check mark */
const SuccessMark: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <svg className="lzc-success__mark" width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
      <motion.circle
        cx="44"
        cy="44"
        r="40"
        stroke="currentColor"
        strokeWidth="1.5"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      />
      <motion.path
        d="M28 45.5 39.5 57 61 33"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.7 }}
      />
    </svg>
  );
};

/* Very soft burst of gold dust behind the check */
const GoldBurst: React.FC = () => {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="lzc-burst" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 70 + (i % 3) * 18;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
            animate={{ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, opacity: 0, scale: 0.4 }}
            transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.55 }}
          />
        );
      })}
    </div>
  );
};

/* Soft warm radial glow that follows the cursor (desktop only) */
const spotlightHandlers = {
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
    e.currentTarget.style.setProperty('--spot', '1');
  },
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--spot', '0');
  },
};

/* ==========================================================================
   PAGE
   ========================================================================== */

export const BookConsultation: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { lenis } = useLenisScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Talk to Us | LEOZ Cucine — Your Space. Our Expertise.',
    'Whether you are planning a statement kitchen, a beautifully organised wardrobe or both, we invite you to begin with a personal consultation.'
  );

  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    projectLocation: '',
    projectType: '',
    approximateBudget: '',
    projectStage: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [focused, setFocused] = useState<FieldName | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToId = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -68 });
    else target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  /* ---------- Validation (existing rules) ---------- */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    REQUIRED.forEach((field) => {
      const message = getFieldError(field, formData);
      if (message) newErrors[field] = message;
    });
    setErrors(newErrors);
    setTouched((prev) => ({ ...prev, ...Object.fromEntries(REQUIRED.map((f) => [f, true])) }));
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (name: FieldName, rawValue: string) => {
    // Existing mobile sanitising: digits, +, spaces and dashes, max 15 chars
    const value = name === 'mobile' ? rawValue.replace(/[^\d+\s-]/g, '').slice(0, 15) : rawValue;
    const next = { ...formData, [name]: value };
    setFormData(next);
    // Live validation once a field has been visited
    if (errors[name] || touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: getFieldError(name, next) }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateField(e.target.name as FieldName, e.target.value);
  };

  const handleBlur = (name: FieldName) => {
    setFocused(null);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: getFieldError(name, formData) }));
  };

  /* Auto-grow the message box */
  const growMessage = () => {
    const el = messageRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  /* ---------- Submit (existing API call, unchanged) ---------- */
  const submit = async () => {
    if (submitStatus === 'submitting') return; // prevent double submission
    if (!validateForm()) return;
    setSubmitStatus('submitting');
    const result = await submitEnquiryForm('consultation', formData);
    if (result.ok) {
      setSubmitStatus('idle');
      setIsSubmitted(true);
    } else {
      setSubmitStatus('error'); // entered values are kept
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  useEffect(() => {
    if (isSubmitted) successRef.current?.focus();
  }, [isSubmitted]);

  /* ---------- Progress thread ---------- */
  const completed =
    REQUIRED.filter((f) => !getFieldError(f, formData)).length +
    (['approximateBudget', 'projectStage', 'message'] as FieldName[]).filter((f) => formData[f].trim()).length;
  const progress = completed / 8;

  /* ---------- Hero parallax ---------- */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 100]);

  const heroReveal = (delay: number) =>
    ({
      initial: prefersReducedMotion ? false : { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: EASE_OUT, delay },
    }) as const;

  /* ---------- Field renderer (floating label) ---------- */
  const renderField = (
    name: FieldName,
    label: string,
    placeholder: string,
    options: { type?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']; autoComplete?: string; required?: boolean; optional?: boolean; textarea?: boolean; span?: boolean; delay?: number } = {}
  ) => {
    const value = formData[name];
    const error = errors[name];
    const raised = focused === name || value.length > 0;
    const isValid = options.required && touched[name] && value.trim() !== '' && !getFieldError(name, formData);
    const id = `consult-${name}`;
    const errorId = `${id}-error`;

    return (
      <motion.div
        className={`lzc-field ${raised ? 'is-raised' : ''} ${error ? 'has-error' : ''} ${options.span ? 'lzc-span' : ''}`}
        {...revealProps(prefersReducedMotion, options.delay ?? 0)}
      >
        <div className="lzc-field__box">
          <label className="lzc-label" htmlFor={id}>
            {label}
            {options.required && (
              <span className="lzc-req" aria-hidden="true">
                *
              </span>
            )}
            {options.optional && <span className="lzc-opt">Optional</span>}
          </label>
          {options.textarea ? (
            <textarea
              ref={messageRef}
              id={id}
              name={name}
              rows={3}
              className="lzc-control"
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              onInput={growMessage}
              onFocus={() => setFocused(name)}
              onBlur={() => setFocused(null)}
            />
          ) : (
            <input
              id={id}
              name={name}
              type={options.type ?? 'text'}
              inputMode={options.inputMode}
              autoComplete={options.autoComplete}
              className="lzc-control"
              placeholder={placeholder}
              value={value}
              required={options.required}
              aria-required={options.required || undefined}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? errorId : undefined}
              onChange={handleInputChange}
              onFocus={() => setFocused(name)}
              onBlur={() => (options.required ? handleBlur(name) : setFocused(null))}
            />
          )}
          <span className="lzc-field__line" aria-hidden="true" />
          {isValid && (
            <motion.span
              className="lzc-valid"
              aria-hidden="true"
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <Check size={18} strokeWidth={2} />
            </motion.span>
          )}
        </div>
        {error && (
          <p key={error} id={errorId} className="lzc-error lzc-shake">
            {error}
          </p>
        )}
      </motion.div>
    );
  };

  return (
    <div className="lz-home lzc">
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO — YOUR SPACE. OUR EXPERTISE.
            ========================================================================= */}
        <section ref={heroRef} className="lzc-hero" aria-labelledby="consult-hero-title">
          <motion.div className="lzc-hero__media" style={{ y: heroY }} aria-hidden="true">
            <div className="lzc-hero__kenburns">
              <img src="/Italian Marble.webp" alt="" />
            </div>
          </motion.div>

          <div className="lzc-hero__content lz-container">
            <div className="lzc-hero__inner">
              <motion.nav aria-label="Breadcrumb" {...heroReveal(0.05)}>
                <ol className="lzc-crumbs">
                  <li>
                    <a href="/" onClick={(e) => navigate(e, '/')}>
                      Home
                    </a>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">Talk to Us</li>
                </ol>
              </motion.nav>

              <motion.h1 id="consult-hero-title" className="lzc-h1" {...heroReveal(0.15)}>
                Your Space. Our Expertise.
              </motion.h1>

              <motion.span
                className="lz-rule"
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.35 }}
              />

              <motion.p className="lzc-hero__text" {...heroReveal(0.25)}>
                Whether you are planning a statement kitchen, a beautifully organised wardrobe or both, we invite you to begin with a personal consultation.
              </motion.p>
            </div>
          </div>

          <button type="button" className="lz-scroll" onClick={() => scrollToId('consultation')} aria-label="Scroll to the consultation form">
            <span className="lz-scroll__track" aria-hidden="true" />
          </button>
        </section>

        {/* =========================================================================
            WHAT HAPPENS NEXT + CONSULTATION FORM
            ========================================================================= */}
        <section
          id="consultation"
          className="lz-section lz-bg-ivory lzc-spot"
          aria-labelledby="next-title"
          {...spotlightHandlers}
        >
          <div className="lz-container lzc-layout">
            {/* ---------- LEFT: what happens next ---------- */}
            <div className="lzc-aside">
              <Reveal className="lz-section-head" >
                <MaskHeading id="next-title">What Happens Next</MaskHeading>
                <motion.span
                  className="lz-rule"
                  aria-hidden="true"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 }}
                />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="lz-body">
                  After receiving your details, our team will review your requirement, reach out to understand the scope and arrange a suitable consultation or office visit.
                </p>
              </Reveal>

              <div className="lzc-steps">
                <motion.span
                  className="lzc-steps__line"
                  aria-hidden="true"
                  initial={prefersReducedMotion ? false : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }}
                />
                <ol className="lzc-steps__list">
                {nextSteps.map((step, idx) => (
                  <motion.li key={step} {...revealProps(prefersReducedMotion, 0.2 + idx * 0.12)}>
                    <span className="lzc-steps__dot" aria-hidden="true">
                      {idx + 1}
                    </span>
                    <span className="lzc-steps__text">{step}</span>
                  </motion.li>
                ))}
                </ol>
              </div>

              <Reveal delay={0.15} className="lz-offset lz-zoom">
                <BracketFrame className="lz-offset__frame" />
                <WarmImage
                  src="/Quartz Stone.webp"
                  alt="Bright LEOZ kitchen with a quartz stone island, white cabinetry and warm pendant lights"
                />
              </Reveal>
            </div>

            {/* ---------- RIGHT: form card ---------- */}
            <div className="lzc-card-wrap">
              <div className="lzc-card">
                <div className="lzc-progress" aria-hidden="true">
                  <span style={{ '--progress': isSubmitted ? 1 : progress } as React.CSSProperties} />
                </div>

                {/* Announces success and failure to screen readers */}
                <div className="lzc-sr-only" role="status" aria-live="polite">
                  {isSubmitted ? SUCCESS_TEXT : submitStatus === 'error' ? ERROR_TEXT : ''}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      ref={successRef}
                      tabIndex={-1}
                      className="lzc-success"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                    >
                      <GoldBurst />
                      <SuccessMark />
                      <p>{SUCCESS_TEXT}</p>
                      {/*
                        TODO: Response timeline — add only once operationally committed.
                        e.g. <p className="lz-body">…confirmed response timeline…</p>
                      */}
                      <div className="lzc-success__actions">
                        <a href="/" onClick={(e) => navigate(e, '/')} className="lz-btn lz-btn--secondary">
                          <span>Back to Home</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </a>
                        <a
                          href="/modular-kitchens"
                          onClick={(e) => navigate(e, '/modular-kitchens')}
                          className="lz-link"
                        >
                          <span>Explore Kitchens</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      className="lzc-form"
                      noValidate
                      onSubmit={handleSubmit}
                      aria-busy={submitStatus === 'submitting'}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                    >
                      <div className="lzc-grid">
                        {renderField('name', 'Full Name', 'Your name', { autoComplete: 'name', required: true, delay: 0 })}
                        {renderField('mobile', 'Mobile Number', 'Preferred contact number', {
                          type: 'tel',
                          inputMode: 'numeric',
                          autoComplete: 'tel',
                          required: true,
                          delay: 0.08,
                        })}
                        {renderField('email', 'Email Address', 'Your email', {
                          type: 'email',
                          inputMode: 'email',
                          autoComplete: 'email',
                          required: true,
                          delay: 0.16,
                        })}
                        {renderField('projectLocation', 'Project Location', 'City / locality', {
                          autoComplete: 'address-level2',
                          required: true,
                          delay: 0.24,
                        })}

                        {/* Project Type — real radios styled as cards */}
                        <motion.fieldset
                          className="lzc-fieldset lzc-span"
                          aria-describedby={errors.projectType ? 'consult-projectType-error' : undefined}
                          {...revealProps(prefersReducedMotion, 0.3)}
                        >
                          <legend className="lzc-legend">
                            Project Type
                            <span className="lzc-req" aria-hidden="true">
                              *
                            </span>
                          </legend>
                          <div className={`lzc-types ${errors.projectType ? 'has-error' : ''}`}>
                            {projectTypes.map(({ value, Icon }) => {
                              const checked = formData.projectType === value;
                              return (
                                <label key={value} className={`lzc-type ${checked ? 'is-checked' : ''}`}>
                                  <input
                                    type="radio"
                                    name="projectType"
                                    value={value}
                                    className="lzc-radio"
                                    checked={checked}
                                    required
                                    aria-invalid={errors.projectType ? true : undefined}
                                    onChange={() => {
                                      setTouched((prev) => ({ ...prev, projectType: true }));
                                      updateField('projectType', value);
                                      setErrors((prev) => ({ ...prev, projectType: '' }));
                                    }}
                                  />
                                  <Icon size={26} strokeWidth={1.25} className="lzc-type__icon" aria-hidden="true" />
                                  <span>{value}</span>
                                  <AnimatePresence>
                                    {checked && (
                                      <motion.span
                                        className="lzc-type__check"
                                        aria-hidden="true"
                                        initial={prefersReducedMotion ? false : { scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0 }}
                                        transition={{ duration: 0.3, ease: EASE_OUT }}
                                      >
                                        <Check size={14} strokeWidth={2.5} />
                                      </motion.span>
                                    )}
                                  </AnimatePresence>
                                </label>
                              );
                            })}
                          </div>
                          {errors.projectType && (
                            <p key={errors.projectType} id="consult-projectType-error" className="lzc-error lzc-shake">
                              {errors.projectType}
                            </p>
                          )}
                        </motion.fieldset>

                        {renderField('approximateBudget', 'Approximate Budget', 'Optional range', {
                          optional: true,
                          span: true,
                          delay: 0.36,
                        })}

                        {/* Project Stage — real radios styled as a stepper */}
                        <motion.fieldset className="lzc-fieldset lzc-span" {...revealProps(prefersReducedMotion, 0.42)}>
                          <legend className="lzc-legend">Project Stage</legend>
                          <div className="lzc-stages">
                            {projectStages.map((stage) => {
                              const checked = formData.projectStage === stage;
                              return (
                                <label key={stage} className={`lzc-stage ${checked ? 'is-checked' : ''}`}>
                                  <input
                                    type="radio"
                                    name="projectStage"
                                    value={stage}
                                    className="lzc-radio"
                                    checked={checked}
                                    onChange={() => updateField('projectStage', stage)}
                                  />
                                  <span className="lzc-stage__dot" aria-hidden="true" />
                                  <span>{stage}</span>
                                </label>
                              );
                            })}
                          </div>
                        </motion.fieldset>

                        {renderField('message', 'Message', 'Tell us about your preferences and requirements', {
                          textarea: true,
                          span: true,
                          delay: 0.48,
                        })}
                      </div>

                      <div className="lzc-actions">
                        <MagneticButton disabled={submitStatus === 'submitting'}>
                          {submitStatus === 'submitting' ? (
                            <>
                              <span className="lzc-spinner" aria-hidden="true" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Book a Consultation</span>
                              <ArrowRight size={16} aria-hidden="true" />
                            </>
                          )}
                        </MagneticButton>
                      </div>

                      {submitStatus === 'error' && (
                        <div className="lzc-alert lzc-shake">
                          <span>{ERROR_TEXT}</span>
                          <button type="button" className="lz-btn lz-btn--secondary" onClick={submit}>
                            <RotateCcw size={14} aria-hidden="true" />
                            <span>Try Again</span>
                          </button>
                        </div>
                      )}
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BookConsultation;
