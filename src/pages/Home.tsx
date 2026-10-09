import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import heroVideo from '../assets/Leoz_hero_section.mp4';
import heroPoster from '../assets/Leoz_hero_poster.webp';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { Preloader, checkShouldRunPreloader, markPreloaderSeen } from '../components/common/Preloader';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLenisScroll } from '../hooks/useLenisScroll';
import {
  ArrowRight,
  Archive,
  Check,
  Factory,
  Layers,
  PanelsTopLeft,
  Ruler,
  Wrench,
} from 'lucide-react';
import './Home.css';

/* Ease-out curve shared by every reveal on the page */
const EASE_OUT = [0.22, 1, 0.36, 1];

/* ==========================================================================
   CONTENT
   ========================================================================== */

const collections = [
  {
    title: 'Kitchens',
    path: '/modular-kitchens',
    image: '/Quartz Stone.webp',
    alt: 'Bright LEOZ kitchen with a quartz stone island, white cabinetry and warm pendant lights',
    desc: 'Designed around your culinary habits, layout, storage and preferred aesthetic. Clean forms, intuitive movement and details that make daily use a pleasure.',
  },
  {
    title: 'Wardrobes',
    path: '/modular-wardrobes',
    image: '/Master Walk-In Dressing Suite.webp',
    alt: 'LEOZ walk-in dressing suite with open shelving, a vanity and warm ambient lighting',
    desc: 'Storage as personal as the pieces it holds. Hinged, sliding and walk-in solutions with considered interiors and a finish that complements your room.',
  },
];

const highlights = [
  { title: 'Bespoke dimensions and configurations', Icon: Ruler },
  { title: 'Ergonomic layouts', Icon: PanelsTopLeft },
  { title: 'Curated materials and finishes', Icon: Layers },
  { title: 'Intelligent storage and premium hardware', Icon: Archive },
  { title: 'Precise factory production', Icon: Factory },
  { title: 'Carefully managed installation', Icon: Wrench },
];

const whyLeoz = [
  'A dedicated focus on kitchens and wardrobes',
  'Leadership with 20+ years of hands-on modular experience',
  '20,000 sq. ft. in-house production',
  'German-inspired planning',
  'Design flexibility',
  'Documented product specifications',
  'Professional fitting',
  'Applicable warranty support',
];

type Stat =
  | { count: number; suffix?: string; label: string }
  | { text: string; label: string; labelFirst?: boolean };

const stats: Stat[] = [
  { count: 20, suffix: '+', label: 'years of specialist leadership experience' },
  { count: 20000, label: 'sq. ft. manufacturing facility' },
  { text: 'Fully', label: 'customised kitchens and wardrobes' },
  { text: 'Gujarat', label: 'Based in', labelFirst: true },
];

const journey = [
  'Consultation',
  'Site measurement',
  'Design and layout',
  'Selection of materials and hardware',
  'Factory manufacturing',
  'Installation',
  'Final inspection',
  'After-sales coordination',
];

/* ==========================================================================
   SMALL BUILDING BLOCKS
   ========================================================================== */

/* Fade-up on scroll; staggered via `delay`. Disabled for reduced motion. */
const revealProps = (reduce: boolean | null, delay = 0) => {
  return {
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease: EASE_OUT, delay },
  } as const;
};

const Reveal: React.FC<{ delay?: number; className?: string; children: React.ReactNode }> = ({
  delay = 0,
  className,
  children,
}) => (
  <motion.div className={className} {...revealProps(useReducedMotion(), delay)}>
    {children}
  </motion.div>
);

/* 48px gold line under each heading; draws in from the edge */
const GoldRule: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="lz-rule"
      aria-hidden="true"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
    />
  );
};

const SectionHead: React.FC<{ eyebrow?: string; title: string; center?: boolean; id?: string }> = ({
  eyebrow,
  title,
  center = false,
  id,
}) => (
  <Reveal className={`lz-section-head ${center ? 'lz-section-head--center' : ''}`}>
    {eyebrow && <span className="lz-eyebrow">{eyebrow}</span>}
    <h2 className="lz-h2" id={id}>
      {title}
    </h2>
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

/* Single L-shaped corner from the same motif, used in section corners */
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

/* Counts up once when scrolled into view. The final value is rendered
   invisibly underneath so the block never changes width while counting. */
const CountUp: React.FC<{ to: number; suffix?: string }> = ({ to, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);
  const format = (n: number) => `${n.toLocaleString('en-IN')}${suffix}`;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="lz-stat__value">
      <span className="lz-sr-only">{format(to)}</span>
      <span className="lz-count__ghost" aria-hidden="true">
        {format(to)}
      </span>
      <span className="lz-count__live" aria-hidden="true">
        {format(value)}
      </span>
    </span>
  );
};

/* ==========================================================================
   PAGE
   ========================================================================== */

export const Home: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState(() => checkShouldRunPreloader());
  const prefersReducedMotion = useReducedMotion();
  const { lenis } = useLenisScroll();

  const heroRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const [activeSteps, setActiveSteps] = useState(0);

  // Gentle hero parallax
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, prefersReducedMotion ? 0 : 120]);

  // Journey line draws with scroll; steps fill in sequence
  const { scrollYProgress: journeyProgress } = useScroll({ target: journeyRef, offset: ['start 0.8', 'end 0.55'] });
  const journeyLine = useTransform(journeyProgress, (v) => (prefersReducedMotion ? 1 : v));

  useMotionValueEvent(journeyProgress, 'change', (v) => {
    if (prefersReducedMotion) return;
    setActiveSteps(v <= 0 ? 0 : Math.min(journey.length, Math.floor(v * (journey.length - 1) + 0.001) + 1));
  });

  useEffect(() => {
    if (prefersReducedMotion) setActiveSteps(journey.length);
  }, [prefersReducedMotion]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'LEOZ Cucine | Luxury Modular Kitchens & Bespoke Wardrobes — Gujarat, India',
    'Discover luxury modular kitchens and bespoke wardrobes by LEOZ Cucine. German-inspired planning, precision manufacturing in Gujarat, and architectural design excellence.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToWelcome = () => {
    const target = document.getElementById('welcome');
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -68 });
    else target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const heroReveal = (delay: number) =>
    ({
      initial: prefersReducedMotion ? false : { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: EASE_OUT, delay },
    }) as const;

  return (
    <div className="lz-home">
      {showPreloader && (
        <Preloader
          onComplete={() => {
            markPreloaderSeen();
            setShowPreloader(false);
          }}
        />
      )}

      <Header isPreloaderActive={showPreloader} />

      <main id="main-content">
        {/* =========================================================================
            01 HERO — LUXURY, CRAFTED AROUND YOU
            ========================================================================= */}
        <section id="hero" ref={heroRef} className="lz-hero" aria-labelledby="hero-title">
          <motion.div className="lz-hero__media" style={{ y: heroY }} aria-hidden="true">
            <div className="lz-hero__kenburns">
              <video
                src={heroVideo}
                poster={heroPoster}
                autoPlay={!prefersReducedMotion}
                muted
                loop
                playsInline
                preload="auto"
                tabIndex={-1}
              />
            </div>
          </motion.div>

          <div className="lz-hero__content lz-container">
            <div className="lz-hero__inner">
              <motion.span className="lz-eyebrow lz-hero__eyebrow" {...heroReveal(0.1)}>
                LEOZ / Bespoke Kitchens &amp; Wardrobes
              </motion.span>

              <motion.h1 id="hero-title" className="lz-h1" {...heroReveal(0.2)}>
                Luxury, Crafted Around You.
              </motion.h1>

              <motion.span
                className="lz-rule"
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.4 }}
              />

              <motion.p className="lz-lead lz-hero__text" {...heroReveal(0.3)}>
                Discover luxury modular kitchens and bespoke wardrobes where refined design, intelligent functionality and meticulous craftsmanship come together. Designed to reflect your taste. Precision-made for the way you live.
              </motion.p>

              <motion.div className="lz-hero__ctas" {...heroReveal(0.4)}>
                <a
                  href="/modular-kitchens"
                  onClick={(e) => navigate(e, '/modular-kitchens')}
                  className="lz-btn lz-btn--light"
                >
                  <span>Explore Kitchens</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
                <a
                  href="/modular-wardrobes"
                  onClick={(e) => navigate(e, '/modular-wardrobes')}
                  className="lz-btn lz-btn--dark"
                >
                  <span>Discover Wardrobes</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
                <a href="/talk-to-us" onClick={(e) => navigate(e, '/talk-to-us')} className="lz-btn lz-btn--light">
                  <span>Book a Private Consultation</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </motion.div>
            </div>
          </div>

          <button type="button" className="lz-scroll" onClick={scrollToWelcome} aria-label="Scroll to the next section">
            <span className="lz-scroll__track" aria-hidden="true" />
          </button>
        </section>

        {/* =========================================================================
            02 WELCOME TO LEOZ — DESIGN THAT FEELS PERSONAL
            ========================================================================= */}
        <section id="welcome" className="lz-section lz-bg-ivory" aria-labelledby="welcome-title">
          <BracketCorner position="tl" />
          <div className="lz-container lz-split">
            <div className="lz-split__text">
              <SectionHead eyebrow="Welcome to LEOZ" title="Design That Feels Personal" id="welcome-title" />
              <Reveal delay={0.1}>
                <p className="lz-body">
                  LEOZ Cucine specialises exclusively in luxury kitchens and customised wardrobes. We combine German-inspired precision, individualised planning and considered material choices to create elegant, functional spaces. With a 20,000 sq. ft. in-house manufacturing facility in Gujarat and two decades of specialist insight guiding the brand, every creation is approached with care from concept to installation.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="lz-offset lz-zoom">
              <BracketFrame className="lz-offset__frame" />
              <WarmImage
                src="/i_am_leoz_perfect.jpg"
                alt="I am Leoz — the LEOZ lion mascot in black and gold armour wearing the LEOZ emblem"
                className="lz-media--mascot"
              />
            </Reveal>
          </div>
        </section>

        {/* =========================================================================
            03 OUR COLLECTIONS — TWO EXPRESSIONS OF REFINED LIVING
            ========================================================================= */}
        <section className="lz-section lz-bg-cream" aria-labelledby="collections-title">
          <div className="lz-container">
            <SectionHead
              eyebrow="Our Collections"
              title="Two Expressions of Refined Living"
              id="collections-title"
              center
            />

            <div className="lz-collections">
              {collections.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 0.1}>
                  <a
                    href={item.path}
                    onClick={(e) => navigate(e, item.path)}
                    className="lz-collection lz-card lz-zoom"
                  >
                    <div style={{ position: 'relative' }}>
                      <WarmImage src={item.image} alt={item.alt} />
                      <span className="lz-collection__veil" aria-hidden="true" />
                    </div>
                    <div className="lz-collection__body">
                      <h3 className="lz-h3">{item.title}</h3>
                      <p className="lz-body">{item.desc}</p>
                      <span className="lz-collection__explore">
                        Explore
                        <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            04 PRODUCT HIGHLIGHTS — EXCELLENCE IN EVERY DETAIL
            ========================================================================= */}
        <section className="lz-section lz-bg-white" aria-labelledby="highlights-title">
          <div className="lz-container">
            <SectionHead
              eyebrow="Product Highlights"
              title="Excellence in Every Detail"
              id="highlights-title"
              center
            />

            <ul className="lz-highlights">
              {highlights.map(({ title, Icon }, idx) => (
                <motion.li key={title} {...revealProps(prefersReducedMotion, idx * 0.1)}>
                  <div className="lz-highlight lz-card">
                    <Icon size={32} strokeWidth={1.25} aria-hidden="true" />
                    <h3 className="lz-h3">{title}</h3>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* =========================================================================
            05 WHY LEOZ CUCINE?
            ========================================================================= */}
        <section className="lz-section lz-bg-ivory" aria-labelledby="why-title">
          <BracketCorner position="br" />
          <div className="lz-container lz-why">
            <div className="lz-why__aside">
              <SectionHead title="Why LEOZ Cucine?" id="why-title" />
              <Reveal delay={0.1} className="lz-zoom">
                <WarmImage
                  src="/Grand Villa Estate.webp"
                  alt="LEOZ open-plan villa kitchen with a marble waterfall island and warm brass accents"
                />
              </Reveal>
            </div>

            <ul className="lz-checklist">
              {whyLeoz.map((item, idx) => (
                <motion.li key={item} {...revealProps(prefersReducedMotion, idx * 0.08)}>
                  <span className="lz-check" aria-hidden="true">
                    <Check size={18} strokeWidth={1.5} />
                  </span>
                  <span className="lz-body">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* =========================================================================
            06 AT A GLANCE
            ========================================================================= */}
        <section className="lz-section lz-bg-sand" aria-labelledby="glance-title">
          <div className="lz-container">
            <SectionHead title="At a Glance" id="glance-title" center />

            <ul className="lz-stats">
              {stats.map((stat, idx) => (
                <motion.li key={stat.label} className="lz-stat" {...revealProps(prefersReducedMotion, idx * 0.1)}>
                  {'count' in stat ? (
                    <>
                      <CountUp to={stat.count} suffix={stat.suffix} />
                      <span className="lz-stat__label">{stat.label}</span>
                    </>
                  ) : stat.labelFirst ? (
                    <>
                      <span className="lz-stat__label lz-stat__label--top">{stat.label}</span>
                      <span className="lz-stat__value">{stat.text}</span>
                    </>
                  ) : (
                    <>
                      <span className="lz-stat__value">{stat.text}</span>
                      <span className="lz-stat__label">{stat.label}</span>
                    </>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* =========================================================================
            07 THE LEOZ JOURNEY
            ========================================================================= */}
        <section className="lz-section lz-bg-white" aria-labelledby="journey-title">
          <div className="lz-container">
            <SectionHead title="The LEOZ Journey" id="journey-title" center />

            <div ref={journeyRef} className="lz-journey-wrap">
              <span className="lz-journey__track" aria-hidden="true" />
              <motion.span
                className="lz-journey__progress"
                aria-hidden="true"
                style={{ '--p': journeyLine } as unknown as React.CSSProperties}
              />
              <ol className="lz-journey">
                {journey.map((step, idx) => (
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
            08 FOR DESIGN PROFESSIONALS
            ========================================================================= */}
        <section className="lz-section lz-bg-ivory" aria-labelledby="pros-title">
          <div className="lz-container lz-pros">
            <Reveal className="lz-zoom">
              <WarmImage
                src="/Italian Marble.webp"
                alt="Bright LEOZ kitchen with Italian marble surfaces, a long island and integrated lighting"
              />
            </Reveal>

            <Reveal delay={0.15}>
              <div className="lz-pros__card">
                <h2 className="lz-h2" id="pros-title">
                  For Design Professionals
                </h2>
                <GoldRule />
                <p className="lz-body">
                  We work with architects, interior designers and premium residential developers to realise customised kitchen and wardrobe specifications. Our team supports technical coordination, material selection, controlled manufacturing and site installation for individual and multi-home requirements.
                </p>
                <a href="/contact" onClick={(e) => navigate(e, '/contact')} className="lz-btn lz-btn--secondary">
                  <span>Partner With Us</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =========================================================================
            09 FINAL CALL TO ACTION — BEGIN YOUR LEOZ EXPERIENCE
            ========================================================================= */}
        <section className="lz-final" aria-labelledby="final-title">
          <WarmImage
            src="/U -Shape Layout.webp"
            alt="Warm-lit LEOZ U-shaped kitchen with soft grey cabinetry and a central island"
          />
          <div className="lz-final__veil" aria-hidden="true" />

          <div className="lz-container">
            <Reveal className="lz-final__panel">
              <h2 className="lz-h2" id="final-title">
                Begin Your LEOZ Experience
              </h2>
              <GoldRule />
              <p className="lz-lead">
                Your next kitchen or wardrobe begins with a conversation. Share your vision and let our team develop a solution around your home, habits and aesthetic preferences.
              </p>
              <a
                href="/talk-to-us"
                onClick={(e) => navigate(e, '/talk-to-us')}
                className="lz-btn lz-btn--primary lz-btn--lg lz-btn--shimmer"
              >
                <span>Book a Private Consultation</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
