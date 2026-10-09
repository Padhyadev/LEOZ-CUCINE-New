import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useLenisScroll } from '../hooks/useLenisScroll';
import {
  BracketCorner,
  BracketFrame,
  EASE_OUT,
  GoldRule,
  MagneticLink,
  MaskHeading,
  Reveal,
  SectionHead,
  WarmImage,
  revealProps,
} from '../components/lux/LuxPrimitives';
import dressingRoomImg from '../assets/wardrobe_dressing.webp';
import {
  ArrowRight,
  DoorOpen,
  Factory,
  FileCheck2,
  Hammer,
  LayoutGrid,
  Lightbulb,
  Palette,
  Plus,
  Ruler,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react';
import './Home.css';
import './ModularWardrobes.css';

/* ==========================================================================
   CONTENT — new client copy only
   ========================================================================== */

const pillars = [
  { label: 'Proportions', Icon: Ruler },
  { label: 'Access', Icon: DoorOpen },
  { label: 'Lighting', Icon: Lightbulb },
  { label: 'Organisation', Icon: LayoutGrid },
  { label: 'Visual character', Icon: Palette },
];

const assessmentChips = ['Room dimensions', 'Inventory', 'Access needs', 'Hanging requirements', 'Preferred finishes'];

const wardrobeTypes = [
  {
    id: 'sliding',
    title: 'Sliding Wardrobes',
    desc: 'A sleek option for rooms where swing clearance is limited. Refined panel combinations and carefully specified mechanisms create a streamlined, contemporary expression.',
    image: '/Sliding Wardrobes.webp',
    alt: 'LEOZ sliding wardrobe with frosted glass panels and an open interior section',
    led: false,
  },
  {
    id: 'hinged',
    title: 'Hinged Wardrobes',
    desc: 'Full-access openings and flexible internal planning make hinged wardrobes a versatile choice. Tailored shutters, handles and compartments allow each composition to feel unique.',
    image: '/Hinged Wardrobes.jfif',
    alt: 'LEOZ hinged wardrobe with tall white handleless shutters beside a lounge seat',
    led: false,
  },
  {
    id: 'walk-in',
    title: 'Walk-In Wardrobes',
    desc: 'A dedicated world of personal organisation. Hanging areas, display shelving, mirrors, integrated lighting, accessories and optional island arrangements can be planned around your available space.',
    image: '/Walk-in Wardrobes.webp',
    alt: 'LEOZ walk-in wardrobe with lit timber shelving, hanging rails and a dressing table',
    led: true,
  },
];

/* Interior hotspots: label + position on the dressing-room image (%) */
const interiorSpots = [
  { label: 'Flexible shelves', x: 60, y: 36 },
  { label: 'Drawers', x: 57, y: 63 },
  { label: 'Hanging sections', x: 12, y: 42 },
  { label: 'Trouser racks', x: 40, y: 48 },
  { label: 'Jewellery trays', x: 38, y: 61 },
  { label: 'Accessory units', x: 14, y: 67 },
  { label: 'Shoe storage', x: 88, y: 52 },
  { label: 'Loft modules', x: 16, y: 17 },
];

const finishes = [
  { label: 'Laminate', swatch: '#D8CEC0', image: '/Textured Laminates Wardrobes.jfif', alt: 'Wardrobe in a textured marble-look laminate finish' },
  { label: 'Veneer', swatch: '#8A6340', image: '/Wood Veneer Wardrobes.jfif', alt: 'Wardrobe in a natural wood veneer finish' },
  { label: 'Acrylic', swatch: '#BDB9B3', image: '/High Gloss Finish wardrobe.jfif', alt: 'Wardrobe in a high-gloss acrylic finish' },
  { label: 'PU', swatch: '#CBD5C8', image: '/Matte Finish wardrobe.jfif', alt: 'Wardrobe in a soft matte PU finish' },
  { label: 'Glass', swatch: '#7FB0A8', image: '/Glass Finish Wardrobes.jfif', alt: 'Wardrobe with tinted glass sliding panels' },
  {
    label: 'Mirrors',
    swatch: 'linear-gradient(135deg, #F4F4F2, #B9BCBF 55%, #EDEDEB)',
    image: '/Mirror Finish wardrobe.jfif',
    alt: 'Wardrobe with framed mirror sliding doors',
  },
  { label: 'Hardware', swatch: '#9C9A96', image: '/Modular Wardrobe.webp', alt: 'Wardrobe with sliding door hardware and an open hanging section' },
  { label: 'Handles', swatch: '#C99A5B', image: '/Aluminium Profiles wardrobe.jfif', alt: 'Wardrobe with long vertical handles and aluminium-framed glass' },
];

const whyLeoz = [
  { title: 'One-to-one planning', Icon: Users },
  { title: 'Accurate manufacture', Icon: Factory },
  { title: 'Considered hardware choices', Icon: Wrench },
  { title: 'Professional installation', Icon: Hammer },
  { title: 'Detailed finishing', Icon: Sparkles },
  { title: 'Documented warranty terms', Icon: FileCheck2 },
];

const processSteps = [
  'Measure the room',
  'Understand storage habits',
  'Develop configuration',
  'Select finish and accessories',
  'Approve design',
  'Manufacture',
  'Install',
  'Inspect',
];

const wardrobeFaqs = [
  {
    q: 'Can a wardrobe be made for an unusual room?',
    a: 'We assess available measurements and design around viable site constraints.',
  },
  {
    q: 'Can I customise the interiors?',
    a: 'Yes, subject to the approved layout and accessory options.',
  },
  {
    q: 'Which formats do you offer?',
    a: 'Hinged, sliding and walk-in configurations.',
  },
  {
    q: 'How is pricing decided?',
    a: 'Dimensions, internal details, materials, mechanisms and site requirements determine the proposal.',
  },
  {
    q: 'How long does installation take?',
    a: 'The schedule is confirmed once the design and production requirements are finalised.',
  },
  {
    q: 'Is warranty available?',
    a: 'Relevant warranty coverage will be specified with the product and hardware selection.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: wardrobeFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

/* Slow gold particles (hero + final CTA): left %, top %, size px, duration s, delay s, drift px */
const dust = [
  [8, 72, 4, 19, 0, 22],
  [18, 30, 3, 23, 3, -18],
  [34, 82, 5, 21, 6, 30],
  [47, 18, 3, 25, 2, 16],
  [61, 66, 4, 20, 8, -26],
  [72, 38, 3, 24, 5, 20],
  [84, 78, 5, 22, 1, -14],
  [92, 24, 3, 26, 7, 24],
];

/* ==========================================================================
   SMALL PIECES
   ========================================================================== */

/* Gold line hanger icon */
const Hanger: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = 'lzw-hanger' }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M10.2 5.2A1.9 1.9 0 1 1 12 7.6c-.5.2-.8.6-.8 1.1V9.6" />
    <path d="M11.2 9.6 2.9 15.4c-.8.6-.4 1.6.5 1.6h17.2c.9 0 1.3-1 .5-1.6l-8.3-5.8" />
  </svg>
);

const GoldDust: React.FC = () => (
  <div className="lzw-dust" aria-hidden="true">
    {dust.map(([left, top, size, d, delay, dx], i) => (
      <span
        key={i}
        style={
          {
            left: `${left}%`,
            top: `${top}%`,
            width: size,
            height: size,
            '--d': `${d}s`,
            '--delay': `${-delay}s`,
            '--dx': `${dx}px`,
          } as React.CSSProperties
        }
      />
    ))}
  </div>
);

/* Warm LED strip that fades in along the top edge of a visual */
const LedGlow: React.FC = () => {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="lzw-led"
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.2 }}
    />
  );
};

const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* Soft warm radial glow that follows the cursor over cream sections */
const spotlightHandlers = {
  onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
    if (!finePointer()) return;
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

export const ModularWardrobes: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { lenis } = useLenisScroll();

  const [doorsDone, setDoorsDone] = useState(false);
  const [activeSpot, setActiveSpot] = useState<number | null>(null);
  const [activeFinish, setActiveFinish] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSteps, setActiveSteps] = useState(0);
  const [typesStatic, setTypesStatic] = useState(true);
  const [typesDistance, setTypesDistance] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const typesRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Customised Wardrobes | LEOZ Cucine — Beyond Storage. An Expression of You.',
    'Bespoke wardrobes composed around your space, belongings and personal style. Discover a refined balance of organisation, beauty and everyday ease.'
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

  /* ---------- Hero parallax ---------- */
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, prefersReducedMotion ? 0 : 120]);
  const doorsActive = !prefersReducedMotion && !doorsDone;
  const heroDelay = doorsActive ? 0.7 : 0;

  const heroReveal = (delay: number) =>
    ({
      initial: prefersReducedMotion ? false : { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: EASE_OUT, delay: heroDelay + delay },
    }) as const;

  /* ---------- Wardrobe types: pinned horizontal scroll (desktop only) ---------- */
  const distanceMv = useMotionValue(0);
  const { scrollYProgress: typesProgress } = useScroll({ target: typesRef, offset: ['start start', 'end end'] });
  const typesX = useTransform([typesProgress, distanceMv], ([p, d]: number[]) => -p * d);

  useLayoutEffect(() => {
    const measure = () => {
      const isStatic = prefersReducedMotion || window.innerWidth < 1024;
      setTypesStatic(isStatic);
      if (isStatic || !trackRef.current) {
        distanceMv.set(0);
        setTypesDistance(0);
        return;
      }
      const d = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      distanceMv.set(d);
      setTypesDistance(d);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [prefersReducedMotion, distanceMv, typesStatic]);

  /* 3D tilt (±4°) with a pointer-following highlight */
  const tilt = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !finePointer()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const el = e.currentTarget;
    el.style.setProperty('--ry', `${(px - 0.5) * 8}deg`);
    el.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
    el.style.setProperty('--hx', `${px * 100}%`);
    el.style.setProperty('--hy', `${py * 100}%`);
  };

  const untilt = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  /* ---------- Process: thread draws, steps fill, hanger travels ---------- */
  const { scrollYProgress: processProgress } = useScroll({ target: processRef, offset: ['start 0.8', 'end 0.55'] });
  const processLine = useTransform(processProgress, (v) => (prefersReducedMotion ? 1 : v));
  const stepCount = processSteps.length;

  useMotionValueEvent(processProgress, 'change', (v) => {
    if (prefersReducedMotion) return;
    setActiveSteps(v <= 0 ? 0 : Math.min(stepCount, Math.floor(v * (stepCount - 1) + 0.001) + 1));
  });

  useEffect(() => {
    if (prefersReducedMotion) setActiveSteps(stepCount);
  }, [prefersReducedMotion, stepCount]);

  const finish = finishes[activeFinish];

  return (
    <div className="lz-home lzw">
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO — BEYOND STORAGE. AN EXPRESSION OF YOU.
            ========================================================================= */}
        <section ref={heroRef} className="lzw-hero" aria-labelledby="wardrobes-hero-title">
          <motion.div className="lzw-hero__media" style={{ y: heroY }} aria-hidden="true">
            <div className="lzw-hero__kenburns">
              <img src="/Master Walk-In Dressing Suite.webp" alt="" />
            </div>
          </motion.div>
          <GoldDust />

          {/* Door-open reveal */}
          {doorsActive && (
            <div className="lzw-doors" aria-hidden="true">
              <motion.div
                className="lzw-door lzw-door--left"
                initial={{ x: 0 }}
                animate={{ x: '-101%' }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
              />
              <motion.div
                className="lzw-door lzw-door--right"
                initial={{ x: 0 }}
                animate={{ x: '101%' }}
                transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
                onAnimationComplete={() => setDoorsDone(true)}
              />
            </div>
          )}

          <div className="lzw-hero__content lz-container">
            <div className="lzw-hero__inner">
              <motion.nav aria-label="Breadcrumb" {...heroReveal(0.05)}>
                <ol className="lzw-crumbs">
                  <li>
                    <a href="/" onClick={(e) => navigate(e, '/')}>
                      Home
                    </a>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">Customised Wardrobes</li>
                </ol>
              </motion.nav>

              <motion.h1 id="wardrobes-hero-title" className="lzw-h1" {...heroReveal(0.15)}>
                Beyond Storage. An Expression of You.
              </motion.h1>

              <motion.span
                className="lz-rule"
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: heroDelay + 0.35 }}
              />

              <motion.p className="lzw-hero__text" {...heroReveal(0.25)}>
                Bespoke wardrobes composed around your space, belongings and personal style. Discover a refined balance of organisation, beauty and everyday ease.
              </motion.p>

              <motion.div {...heroReveal(0.35)}>
                <MagneticLink
                  href="#wardrobe-types"
                  onClick={(e) => handleAnchor(e, 'wardrobe-types')}
                  className="lz-btn lz-btn--primary"
                >
                  <span>Explore Wardrobes</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </MagneticLink>
              </motion.div>
            </div>
          </div>

          <button type="button" className="lz-scroll" onClick={() => scrollToId('philosophy')} aria-label="Scroll to the next section">
            <span className="lz-scroll__track" aria-hidden="true" />
          </button>
        </section>

        {/* =========================================================================
            WARDROBE PHILOSOPHY — EVERY DETAIL IN ITS PLACE
            ========================================================================= */}
        <section id="philosophy" className="lz-section lz-bg-ivory" aria-labelledby="philosophy-title">
          <BracketCorner position="tl" />
          <div className="lz-container lz-split">
            <div className="lz-split__text">
              <SectionHead eyebrow="Wardrobe Philosophy" title="Every Detail in Its Place" id="philosophy-title" />
              <Reveal delay={0.1}>
                <p className="lz-body">
                  A wardrobe should simplify the everyday while forming a harmonious part of the room. We design the outer expression and internal experience together: proportions, access, lighting, organisation and visual character.
                </p>
              </Reveal>
              <ul className="lzw-pillars">
                {pillars.map(({ label, Icon }, idx) => (
                  <motion.li key={label} {...revealProps(prefersReducedMotion, 0.1 + idx * 0.08)}>
                    <Icon size={26} strokeWidth={1.25} aria-hidden="true" />
                    <span>{label}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <Reveal delay={0.15} className="lz-offset lz-zoom">
              <BracketFrame className="lz-offset__frame" />
              <WarmImage
                src="/Fluted Panels wardrobe.jfif"
                alt="Bright LEOZ wardrobe wall with white fluted panels, an arched open niche and a built-in desk"
              />
            </Reveal>
          </div>
        </section>

        {/* =========================================================================
            FULLY CUSTOMISED TO YOU
            ========================================================================= */}
        <section className="lz-section lz-bg-cream lzw-spot" aria-labelledby="custom-title" {...spotlightHandlers}>
          <div className="lz-container">
            <Reveal className="lzw-custom lzw-swing">
              <Hanger size={36} />
              <MaskHeading id="custom-title">Fully Customised to You</MaskHeading>
              <span className="lz-rule lz-rule--center" aria-hidden="true" />
              <p>
                From clothing and accessories to individual routines, every project begins with an assessment of room dimensions, inventory, access needs, hanging requirements and preferred finishes.
              </p>
              <ul className="lzw-chips">
                {assessmentChips.map((chip, idx) => (
                  <motion.li key={chip} {...revealProps(prefersReducedMotion, 0.15 + idx * 0.08)}>
                    <span className="lzw-chip">{chip}</span>
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* =========================================================================
            WARDROBE TYPES — SLIDING, HINGED AND WALK-IN
            ========================================================================= */}
        <section
          id="wardrobe-types"
          ref={typesRef}
          className={`lzw-types lz-bg-white ${typesStatic ? 'is-static lz-section' : ''}`}
          style={typesStatic ? undefined : { height: `calc(100vh + ${typesDistance}px)` }}
          aria-labelledby="types-title"
        >
          <div className="lzw-types__sticky">
            <motion.div ref={trackRef} className="lzw-types__track" style={typesStatic ? undefined : { x: typesX }}>
              <div className="lzw-types__head">
                <SectionHead eyebrow="Wardrobe Types" title="Sliding, Hinged and Walk-In" id="types-title" />
              </div>

              {wardrobeTypes.map((type, idx) => (
                <motion.div key={type.id} className="lzw-type" {...revealProps(prefersReducedMotion, idx * 0.1)}>
                  <a
                    href="#inside-wardrobe"
                    onClick={(e) => handleAnchor(e, 'inside-wardrobe')}
                    onMouseMove={tilt}
                    onMouseLeave={untilt}
                    className="lzw-type__card lz-card lz-zoom"
                    aria-labelledby={`${type.id}-title`}
                  >
                    <WarmImage src={type.image} alt={type.alt}>
                      <span className="lzw-type__veil" aria-hidden="true" />
                      {type.led && <LedGlow />}
                    </WarmImage>
                    <div className="lzw-type__body">
                      <h3 className="lz-h3" id={`${type.id}-title`}>
                        {type.title}
                      </h3>
                      <p className="lz-body">{type.desc}</p>
                      <span className="lzw-explore">
                        Explore
                        <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            INSIDE THE WARDROBE — HOTSPOT EXPLORER
            ========================================================================= */}
        <section id="inside-wardrobe" className="lz-section lz-bg-ivory lzw-inside" aria-labelledby="inside-title">
          <BracketCorner position="br" />
          <div className="lz-container lz-split">
            <Reveal className="lzw-explorer lz-offset">
              <BracketFrame className="lz-offset__frame" />
              <WarmImage
                src={dressingRoomImg}
                alt="LEOZ walk-in dressing room with glass-fronted hanging sections, drawers, accessory trays and illuminated shoe shelving"
              >
                <LedGlow />
              </WarmImage>
              {interiorSpots.map((spot, idx) => {
                const align = spot.x < 22 ? 'lzw-tip--start' : spot.x > 78 ? 'lzw-tip--end' : '';
                const isActive = activeSpot === idx;
                return (
                  <button
                    key={spot.label}
                    type="button"
                    className={`lzw-hotspot ${isActive ? 'is-active' : ''}`}
                    style={{ left: `calc((100% - 24px) * ${spot.x / 100})`, top: `calc((100% - 24px) * ${spot.y / 100})` }}
                    aria-label={spot.label}
                    aria-pressed={isActive}
                    onMouseEnter={() => setActiveSpot(idx)}
                    onMouseLeave={() => setActiveSpot(null)}
                    onFocus={() => setActiveSpot(idx)}
                    onBlur={() => setActiveSpot(null)}
                    onClick={() => setActiveSpot(isActive ? null : idx)}
                  >
                    <span className="lzw-hotspot__dot" aria-hidden="true" />
                    <span className={`lzw-tip ${align}`} aria-hidden="true">
                      {spot.label}
                    </span>
                  </button>
                );
              })}
            </Reveal>

            <div className="lz-split__text">
              <SectionHead title="Inside the Wardrobe" id="inside-title" />
              <Reveal delay={0.1}>
                <p className="lz-body">
                  Flexible shelves, drawers, hanging sections, trouser racks, jewellery trays, accessory units, shoe storage and loft modules, subject to layout and selected specifications.
                </p>
              </Reveal>
              <ul className="lzw-chips">
                {interiorSpots.map((spot, idx) => (
                  <motion.li key={spot.label} {...revealProps(prefersReducedMotion, 0.1 + idx * 0.06)}>
                    <span
                      className={`lzw-chip ${activeSpot === idx ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveSpot(idx)}
                      onMouseLeave={() => setActiveSpot(null)}
                    >
                      {spot.label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            MATERIALS & FINISHES — FINISH SWITCHER
            ========================================================================= */}
        <section className="lz-section lz-bg-cream lzw-spot" aria-labelledby="finishes-title" {...spotlightHandlers}>
          <div className="lz-container lz-split">
            <div className="lz-split__text">
              <SectionHead title="Materials & Finishes" id="finishes-title" />
              <Reveal delay={0.1}>
                <p className="lz-body">
                  An individually curated mix of laminate, veneer, acrylic, PU, glass, mirrors, hardware and handles. Every combination is selected with the surrounding room and intended use in mind.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="lzw-finish">
              <div className="lzw-finish__preview lz-zoom">
                <div className="lz-media">
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={finish.label}
                      src={finish.image}
                      alt={finish.alt}
                      loading="lazy"
                      decoding="async"
                      initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                    />
                  </AnimatePresence>
                </div>
              </div>
              <ul className="lzw-swatches" aria-label="Choose a finish to preview">
                {finishes.map((f, idx) => (
                  <li key={f.label}>
                    <button
                      type="button"
                      className="lzw-swatch"
                      aria-pressed={activeFinish === idx}
                      onClick={() => setActiveFinish(idx)}
                    >
                      <span className="lzw-swatch__chip" style={{ background: f.swatch }} aria-hidden="true" />
                      <span>{f.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* =========================================================================
            WHY LEOZ WARDROBES?
            ========================================================================= */}
        <section className="lz-section lz-bg-sand" aria-labelledby="why-title">
          <div className="lz-container">
            <SectionHead title="Why LEOZ Wardrobes?" id="why-title" center />
            <Reveal>
              <p className="lz-lead lzw-intro">
                One-to-one planning, accurate manufacture, considered hardware choices, professional installation, detailed finishing and documented warranty terms.
              </p>
            </Reveal>

            <ul className="lzw-why">
              {whyLeoz.map(({ title, Icon }, idx) => (
                <motion.li key={title} {...revealProps(prefersReducedMotion, (idx % 3) * 0.1)}>
                  <div className="lzw-why__block lzw-swing">
                    <Icon size={30} strokeWidth={1.25} aria-hidden="true" />
                    <Hanger size={22} />
                    <hr />
                    <h3 className="lz-h3">{title}</h3>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* =========================================================================
            OUR PROCESS
            ========================================================================= */}
        <section className="lz-section lz-bg-ivory lzw-process" aria-labelledby="process-title">
          <div className="lz-container">
            <SectionHead title="Our Process" id="process-title" center />

            <motion.div
              ref={processRef}
              className="lz-journey-wrap"
              style={{ '--p': processLine } as unknown as React.CSSProperties}
            >
              <span className="lz-journey__track" aria-hidden="true" />
              <span className="lz-journey__progress" aria-hidden="true" />
              <Hanger size={24} className="lzw-traveller" />
              <ol className="lz-journey">
                {processSteps.map((step, idx) => (
                  <li key={step} className={`lz-step ${idx < activeSteps ? 'is-active' : ''}`}>
                    <span className="lz-step__dot" aria-hidden="true">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="lz-step__label">{step}</h3>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            WARDROBE FAQS
            ========================================================================= */}
        <section className="lz-section lz-bg-cream lzw-spot" aria-labelledby="faq-title" {...spotlightHandlers}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          <div className="lz-container lzw-faq">
            <SectionHead title="Wardrobe FAQs" id="faq-title" />

            <Reveal className="lzw-faq__list">
              {wardrobeFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.q} className="lzw-faq__item">
                    <h3 style={{ margin: 0 }}>
                      <button
                        type="button"
                        id={`wfaq-q-${idx}`}
                        className="lzw-faq__q"
                        aria-expanded={isOpen}
                        aria-controls={`wfaq-a-${idx}`}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                      >
                        <span>{faq.q}</span>
                        <span className="lzw-faq__icon" aria-hidden="true">
                          <Plus size={16} strokeWidth={1.5} />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`wfaq-a-${idx}`}
                      role="region"
                      aria-labelledby={`wfaq-q-${idx}`}
                      className={`lzw-faq__panel ${isOpen ? 'is-open' : ''}`}
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
            FINAL CTA — MAKE SPACE FOR WHAT MATTERS
            ========================================================================= */}
        <section id="cta" className="lz-final" aria-labelledby="cta-title">
          <WarmImage
            src="/Smoked Glass Vitrine Wardrobe.webp"
            alt="Spacious LEOZ walk-in wardrobe with glass-fronted cabinetry and soft natural light"
          />
          <div className="lz-final__veil" aria-hidden="true" />
          <GoldDust />

          <div className="lz-container">
            <Reveal className="lz-final__panel">
              <MaskHeading id="cta-title">Make Space for What Matters</MaskHeading>
              <GoldRule />
              <p className="lz-lead">Begin with a personalised design conversation.</p>
              <MagneticLink
                href="/talk-to-us"
                onClick={(e) => navigate(e, '/talk-to-us')}
                className="lz-btn lz-btn--primary lz-btn--lg lz-btn--shimmer"
              >
                <span>Book Your Wardrobe Consultation</span>
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

export default ModularWardrobes;
