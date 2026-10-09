import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLenisScroll } from '../hooks/useLenisScroll';
import {
  Archive,
  ArrowRight,
  Columns3,
  Droplets,
  Microwave,
  PanelsTopLeft,
  Plus,
  Quote,
  Sparkles,
  Wrench,
} from 'lucide-react';
import './Home.css';
import './ModularKitchens.css';

/* Ease-out curve shared by every reveal on the page */
const EASE_OUT = [0.22, 1, 0.36, 1];

/* ==========================================================================
   CONTENT — client copy only
   ========================================================================== */

/* The Kitchen Features paragraph, split visually into cards */
const kitchenFeatures = [
  { title: 'Personalised work zones', Icon: PanelsTopLeft },
  { title: 'Intelligent drawers and pull-outs', Icon: Archive },
  { title: 'Customised tall units', Icon: Columns3 },
  { title: 'Practical appliance integration', Icon: Microwave },
  { title: 'Convenient maintenance', Icon: Sparkles },
  { title: 'Specification-led moisture-resistant options', Icon: Droplets },
  { title: 'Hardware selected to suit the required use', Icon: Wrench },
];

const kitchenStyles = [
  {
    id: 'german-classic',
    title: 'German Classic Kitchens',
    desc: 'Understated forms, harmonious proportions and engineered cabinetry create a timeless expression of contemporary luxury. The emphasis is on disciplined lines, precise detailing and refined materials.',
    image: '/modular kitchen.webp',
    alt: 'LEOZ German Classic kitchen with disciplined lines, timber shelving and engineered cabinetry',
  },
  {
    id: 'contemporary-fusion',
    title: 'Contemporary Fusion Kitchens',
    desc: 'A contemporary design language made warmer through tactile finishes, material contrasts and details suited to Indian homes. Highly individual, visually composed and designed to live in.',
    image: '/Island Layout.webp',
    alt: 'LEOZ Contemporary Fusion island kitchen with white surfaces and integrated appliances',
  },
];

/* Layout names as listed in the Layouts paragraph */
const kitchenLayouts = [
  { name: 'Straight', image: '/Straight Layout.webp' },
  { name: 'L-shaped', image: '/L-Shape Layout.webp' },
  { name: 'U-shaped', image: '/U -Shape Layout.webp' },
  { name: 'Parallel', image: '/Parallel Layout.webp' },
  { name: 'Island', image: '/Island Layout.webp' },
  { name: 'Peninsula', image: '/Skyline Monolithic Island.webp' },
];

const kitchenProcessSteps = [
  'Discover your requirements.',
  'Measure and assess the site.',
  'Prepare layout and design proposals.',
  'Select finish and hardware.',
  'Approve specifications and commercial proposal.',
  'Manufacture.',
  'Install and inspect.',
];

const kitchenFaqs = [
  {
    q: 'Is every kitchen customised?',
    a: 'Yes. Layout, dimensions, storage, finish and suitable hardware are planned according to the space and approved specification.',
  },
  {
    q: 'How is price calculated?',
    a: 'By size, materials, hardware, accessories, design complexity and installation scope. A tailored quotation follows consultation.',
  },
  {
    q: 'How long will it take?',
    a: 'A project schedule is shared after design approval and material availability are confirmed.',
  },
  {
    q: 'Do you handle installation?',
    a: 'Yes, professional installation is included as specified in the accepted quotation.',
  },
  {
    q: 'What warranty is provided?',
    a: 'Warranty coverage and exclusions depend on selected products and hardware and will be documented in the proposal.',
  },
  {
    q: 'How do I maintain the kitchen?',
    a: 'The team will advise care based on the final surface and hardware selection.',
  },
];

/* ==========================================================================
   BUILDING BLOCKS
   ========================================================================== */

/* Fade-up on scroll; staggered via `delay`. Disabled for reduced motion. */
const revealProps = (reduce: boolean | null, delay = 0) =>
  ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  }) as const;

const Reveal: React.FC<{ delay?: number; className?: string; children: React.ReactNode }> = ({
  delay = 0,
  className,
  children,
}) => (
  <motion.div className={className} {...revealProps(useReducedMotion(), delay)}>
    {children}
  </motion.div>
);

/* 48px gold line that draws itself as it enters the viewport */
const GoldRule: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="lz-rule"
      aria-hidden="true"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 }}
    />
  );
};

/* Heading text slides up from a clipped line. The visible outer line is
   what gets observed — the hidden inner text never intersects on its own. */
const maskVariants = {
  hidden: { y: '105%' },
  shown: { y: '0%', transition: { duration: 0.6, ease: EASE_OUT } },
};

const MaskHeading: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({
  id,
  className = 'lz-h2',
  children,
}) => {
  const reduce = useReducedMotion();
  return (
    <h2 className={className} id={id}>
      <motion.span
        className="lzk-mask"
        initial={reduce ? 'shown' : 'hidden'}
        whileInView="shown"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.span variants={maskVariants}>{children}</motion.span>
      </motion.span>
    </h2>
  );
};

const SectionHead: React.FC<{ eyebrow?: string; title: React.ReactNode; id: string; center?: boolean }> = ({
  eyebrow,
  title,
  id,
  center = false,
}) => (
  <Reveal className={`lz-section-head ${center ? 'lz-section-head--center' : ''}`}>
    {eyebrow && <span className="lz-eyebrow">{eyebrow}</span>}
    <MaskHeading id={id}>{title}</MaskHeading>
    <GoldRule />
  </Reveal>
);

/* The logo's broken square frame */
const BracketFrame: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M0 0H42M52 0H100V44M100 54V100H56M46 100H0V58M0 48V0"
      stroke="currentColor"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

/* Single L-shaped corner from the same motif */
const BracketCorner: React.FC<{ position: 'tl' | 'br' }> = ({ position }) => (
  <svg className={`lz-bracket lz-bracket--${position}`} viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false">
    <path d="M1 100V1H100" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
  </svg>
);

/* Lazy image with a warm blur placeholder until it has loaded */
const WarmImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className={`lz-media ${className ?? ''}`}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'is-loaded' : 'is-loading'}
      />
    </div>
  );
};

/* Primary buttons drift up to 8px toward the cursor */
const MagneticLink: React.FC<{
  href: string;
  className: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}> = ({ href, className, onClick, children }) => {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18 });
  const y = useSpring(0, { stiffness: 260, damping: 18 });
  const clamp = (v: number) => Math.max(-8, Math.min(8, v));

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * 0.2));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * 0.35));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      className={className}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      style={{ x, y }}
    >
      {children}
    </motion.a>
  );
};

/* ==========================================================================
   PAGE
   ========================================================================== */

export const ModularKitchens: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { lenis } = useLenisScroll();

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSteps, setActiveSteps] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Luxury Modular Kitchens | LEOZ Cucine — German Precision, Indian Sensibility',
    'Discover bespoke luxury modular kitchens by LEOZ Cucine. German-inspired planning, German Classic & Contemporary Fusion styles, curated finishes, and in-house manufacturing in Gujarat.'
  );

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

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id);
  };

  // Gentle hero parallax
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, prefersReducedMotion ? 0 : 120]);

  // Design-process line draws with scroll; steps fill gold in sequence
  const { scrollYProgress: processProgress } = useScroll({ target: processRef, offset: ['start 0.8', 'end 0.55'] });
  const processLine = useTransform(processProgress, (v) => (prefersReducedMotion ? 1 : v));
  const stepCount = kitchenProcessSteps.length;

  useMotionValueEvent(processProgress, 'change', (v) => {
    if (prefersReducedMotion) return;
    setActiveSteps(v <= 0 ? 0 : Math.min(stepCount, Math.floor(v * (stepCount - 1) + 0.001) + 1));
  });

  useEffect(() => {
    if (prefersReducedMotion) setActiveSteps(stepCount);
  }, [prefersReducedMotion, stepCount]);

  const heroReveal = (delay: number) =>
    ({
      initial: prefersReducedMotion ? false : { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: EASE_OUT, delay },
    }) as const;

  return (
    <div className="lz-home lzk">
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO — THE HEART OF YOUR HOME, REIMAGINED
            ========================================================================= */}
        <section ref={heroRef} className="lzk-hero" aria-labelledby="kitchens-hero-title">
          <motion.div className="lzk-hero__media" style={{ y: heroY }} aria-hidden="true">
            <div className="lzk-hero__kenburns">
              <img src="/kitchen_hero_dark.png" alt="" />
            </div>
          </motion.div>

          <div className="lzk-hero__content lz-container">
            <div className="lzk-hero__inner">
              <motion.nav aria-label="Breadcrumb" {...heroReveal(0.05)}>
                <ol className="lzk-crumbs">
                  <li>
                    <a href="/" onClick={(e) => navigate(e, '/')}>
                      Home
                    </a>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">Modular Kitchens</li>
                </ol>
              </motion.nav>

              <motion.h1 id="kitchens-hero-title" className="lzk-h1" {...heroReveal(0.15)}>
                The Heart of Your Home, Reimagined
              </motion.h1>

              <motion.span
                className="lz-rule"
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.35 }}
              />

              <motion.p className="lzk-hero__text" {...heroReveal(0.25)}>
                LEOZ kitchens bring contemporary luxury and intelligent performance together. Each kitchen is designed around its owners, carefully combining spatial harmony, durable specifications and effortless everyday use.
              </motion.p>

              <motion.div className="lzk-hero__ctas" {...heroReveal(0.35)}>
                <MagneticLink href="#kitchen-styles" onClick={(e) => handleAnchor(e, 'kitchen-styles')} className="lz-btn lz-btn--primary">
                  <span>Explore Kitchens</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </MagneticLink>
                <a href="/talk-to-us" onClick={(e) => navigate(e, '/talk-to-us')} className="lz-btn lz-btn--secondary">
                  <span>Schedule a Consultation</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </motion.div>
            </div>
          </div>

          <button type="button" className="lz-scroll" onClick={() => scrollToId('philosophy')} aria-label="Scroll to the next section">
            <span className="lz-scroll__track" aria-hidden="true" />
          </button>
        </section>

        {/* =========================================================================
            KITCHEN PHILOSOPHY — BEAUTY IN EVERYDAY FUNCTION
            ========================================================================= */}
        <section id="philosophy" className="lz-section lz-bg-ivory" aria-labelledby="philosophy-title">
          <BracketCorner position="tl" />
          <div className="lz-container lz-split">
            <div className="lz-split__text">
              <SectionHead eyebrow="Kitchen Philosophy" title="Beauty in Everyday Function" id="philosophy-title" />
              <Reveal delay={0.1}>
                <p className="lz-body">
                  A beautiful kitchen must work beautifully. From preparation and storage to cleaning and family movement, every zone is considered to make daily routines intuitive without diminishing the elegance of the setting.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="lz-offset lz-zoom">
              <BracketFrame className="lz-offset__frame" />
              <WarmImage
                src="/Skyline Monolithic Island.webp"
                alt="Light-filled LEOZ kitchen with a marble island, tall white cabinetry and a garden window"
              />
            </Reveal>
          </div>
        </section>

        {/* =========================================================================
            GERMAN PRECISION. INDIAN SENSIBILITY.
            ========================================================================= */}
        <section className="lz-section lz-bg-cream" aria-labelledby="precision-title">
          <div className="lz-container">
            <Reveal className="lzk-quote">
              <Quote size={40} strokeWidth={1} className="lzk-quote__mark" aria-hidden="true" />
              <MaskHeading id="precision-title">German Precision. Indian Sensibility.</MaskHeading>
              <span className="lz-rule lz-rule--center" aria-hidden="true" />
              <p>
                Inspired by German planning and hardware principles, LEOZ adapts ergonomic dimensions, robust fittings and thoughtful organisation to Indian cooking patterns, ingredient storage, maintenance needs and family lifestyles.
              </p>
              <div className="lzk-quote__lines" aria-hidden="true">
                <span />
                <i />
                <span />
              </div>
            </Reveal>
          </div>
        </section>

        {/* =========================================================================
            KITCHEN FEATURES
            ========================================================================= */}
        <section className="lz-section lz-bg-white" aria-labelledby="features-title">
          <div className="lz-container">
            <SectionHead title="Kitchen Features" id="features-title" center />
            <Reveal>
              <p className="lz-lead lzk-intro">
                Expect personalised work zones, intelligent drawers and pull-outs, customised tall units, practical appliance integration, convenient maintenance, specification-led moisture-resistant options and hardware selected to suit the required use.
              </p>
            </Reveal>

            <ul className="lzk-features">
              {kitchenFeatures.map(({ title, Icon }, idx) => (
                <motion.li key={title} {...revealProps(prefersReducedMotion, idx * 0.08)}>
                  <div className="lzk-feature lz-card">
                    <Icon size={30} strokeWidth={1.25} aria-hidden="true" />
                    <h3 className="lz-h3">{title}</h3>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* =========================================================================
            GERMAN CLASSIC KITCHENS · CONTEMPORARY FUSION KITCHENS
            ========================================================================= */}
        <section id="kitchen-styles" className="lz-section lz-bg-ivory" aria-label="Kitchen styles">
          <BracketCorner position="br" />
          <div className="lz-container lzk-styles">
            {kitchenStyles.map((style, idx) => (
              <Reveal key={style.id} delay={idx * 0.1}>
                <article className="lzk-style lz-card lz-zoom" aria-labelledby={`${style.id}-title`}>
                  <WarmImage src={style.image} alt={style.alt} />
                  <div className="lzk-style__body">
                    <MaskHeading id={`${style.id}-title`} className="lz-h2 lzk-style__title">
                      {style.title}
                    </MaskHeading>
                    <GoldRule />
                    <p className="lz-body">{style.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =========================================================================
            LAYOUTS TAILORED TO THE SPACE
            ========================================================================= */}
        <section id="layouts" className="lz-section lz-bg-cream" aria-labelledby="layouts-title">
          <div className="lz-container">
            <SectionHead title="Layouts Tailored to the Space" id="layouts-title" center />
            <Reveal>
              <p className="lz-lead lzk-intro">
                Straight, L-shaped, U-shaped, Parallel, Island and Peninsula kitchens. The final layout is chosen after considering movement, plumbing, ventilation, appliances, storage and available floor area.
              </p>
            </Reveal>

            <ul className="lzk-gallery">
              {kitchenLayouts.map((layout, idx) => (
                <motion.li key={layout.name} {...revealProps(prefersReducedMotion, (idx % 3) * 0.1)}>
                  <figure className="lzk-gallery__item lz-zoom">
                    <WarmImage src={layout.image} alt={`LEOZ ${layout.name} kitchen layout`} />
                    <figcaption>{layout.name}</figcaption>
                  </figure>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* =========================================================================
            MATERIALS & FINISHES — HOVER REVEAL
            ========================================================================= */}
        <section className="lz-section lz-bg-white" aria-labelledby="finishes-title">
          <div className="lz-container lz-split">
            <div className="lz-split__text">
              <SectionHead title="Materials & Finishes" id="finishes-title" />
              <Reveal delay={0.1}>
                <p className="lz-body">
                  Choose from project-appropriate carcass specifications and a curated range of laminates, acrylic, PU, veneer and other available shutter finishes, complemented by selected countertops, profiles, handles and hardware. Samples and specifications are finalised during consultation.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="lzk-reveal" role="group" tabIndex={0} aria-label="Hover or focus to compare two LEOZ kitchen finishes">
                <WarmImage src="/Matte Finish.webp" alt="LEOZ kitchen in a matte shutter finish with warm under-cabinet lighting" />
                <WarmImage
                  src="/Wood Veneer.webp"
                  alt="LEOZ kitchen in a natural wood veneer shutter finish"
                  className="lzk-reveal__top"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* =========================================================================
            WHY CHOOSE LEOZ KITCHENS?
            ========================================================================= */}
        <section className="lz-section lz-bg-ivory" aria-labelledby="why-title">
          <BracketCorner position="tl" />
          <div className="lz-container lz-split lzk-split--reverse">
            <Reveal className="lz-offset lz-zoom">
              <BracketFrame className="lz-offset__frame" />
              <WarmImage
                src="/factory_precision_plant.webp"
                alt="LEOZ in-house manufacturing facility with precision CNC machinery"
              />
            </Reveal>

            <div className="lz-split__text">
              <SectionHead title="Why Choose LEOZ Kitchens?" id="why-title" />
              <Reveal delay={0.1}>
                <p className="lz-body">
                  Dedicated in-house production, design-to-manufacturing coordination, considered material choices, precise customisation, professional installation and warranty provisions communicated with the final proposal.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* =========================================================================
            KITCHEN DESIGN PROCESS
            ========================================================================= */}
        <section className="lz-section lz-bg-cream lzk-process" aria-labelledby="process-title">
          <div className="lz-container">
            <SectionHead title="Kitchen Design Process" id="process-title" center />

            <div ref={processRef} className="lz-journey-wrap">
              <span className="lz-journey__track" aria-hidden="true" />
              <motion.span
                className="lz-journey__progress"
                aria-hidden="true"
                style={{ '--p': processLine } as unknown as React.CSSProperties}
              />
              <ol className="lz-journey">
                {kitchenProcessSteps.map((step, idx) => (
                  <li key={step} className={`lz-step ${idx < activeSteps ? 'is-active' : ''}`}>
                    <span className="lz-step__dot" aria-hidden="true">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="lz-step__label">{step}</h3>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* =========================================================================
            KITCHEN FAQS
            ========================================================================= */}
        <section className="lz-section lz-bg-white" aria-labelledby="faq-title">
          <div className="lz-container lzk-faq">
            <SectionHead title="Kitchen FAQs" id="faq-title" />

            <Reveal className="lzk-faq__list">
              {kitchenFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.q} className="lzk-faq__item">
                    <h3 style={{ margin: 0 }}>
                      <button
                        type="button"
                        id={`faq-q-${idx}`}
                        className="lzk-faq__q"
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${idx}`}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                      >
                        <span>{faq.q}</span>
                        <span className="lzk-faq__icon" aria-hidden="true">
                          <Plus size={16} strokeWidth={1.5} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-a-${idx}`}
                      role="region"
                      aria-labelledby={`faq-q-${idx}`}
                      className={`lzk-faq__panel ${isOpen ? 'is-open' : ''}`}
                    >
                      <div>
                        <p className="lz-body">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>

        {/* =========================================================================
            CTA — LET US DESIGN YOUR KITCHEN
            ========================================================================= */}
        <section id="cta" className="lz-final" aria-labelledby="cta-title">
          <WarmImage
            src="/Quartz Stone.webp"
            alt="Bright LEOZ kitchen with a quartz stone island, white cabinetry and warm pendant lights"
          />
          <div className="lz-final__veil" aria-hidden="true" />

          <div className="lz-container">
            <Reveal className="lz-final__panel">
              <MaskHeading id="cta-title">Let Us Design Your Kitchen</MaskHeading>
              <GoldRule />
              <p className="lz-lead">Discuss your lifestyle, space and preferences with the LEOZ team.</p>
              <MagneticLink
                href="/talk-to-us"
                onClick={(e) => navigate(e, '/talk-to-us')}
                className="lz-btn lz-btn--primary lz-btn--lg lz-btn--shimmer"
              >
                <span>Book Your Kitchen Consultation</span>
                <ArrowRight size={16} aria-hidden="true" />
              </MagneticLink>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ModularKitchens;
