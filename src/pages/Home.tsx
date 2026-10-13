import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
import {
  BracketCorner,
  BracketFrame,
  GoldRule,
  MagneticLink,
  MaskHeading,
  Reveal,
  SectionHead,
  WarmImage,
  revealProps,
} from '../components/lux/LuxPrimitives';
import {
  SCROLL_CONFIG,
  formatCount,
  useCountUp,
  useHeroIntro,
  useHeroScroll,
  useListReveal,
  useParallax,
  useReveal,
} from '../lib/scroll';
import './Home.css';

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

/* Counts up once when scrolled into view (useCountUp). The markup always
   holds the final value, so it is what crawlers, no-JS and reduced-motion
   visitors see; the invisible ghost copy keeps the width fixed while counting. */
const CountUp: React.FC<{ to: number; suffix?: string }> = ({ to, suffix = '' }) => {
  const liveRef = useRef<HTMLSpanElement>(null);
  useCountUp(liveRef, { to, suffix });

  return (
    <span className="lz-stat__value">
      <span className="lz-sr-only">{formatCount(to, suffix)}</span>
      <span className="lz-count__ghost" aria-hidden="true">
        {formatCount(to, suffix)}
      </span>
      <span ref={liveRef} className="lz-count__live" aria-hidden="true">
        {formatCount(to, suffix)}
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
  const secondCollectionRef = useRef<HTMLDivElement>(null);
  const whyListRef = useRef<HTMLUListElement>(null);
  const prosImageRef = useRef<HTMLDivElement>(null);
  const prosTextRef = useRef<HTMLDivElement>(null);
  const prosCardRef = useRef<HTMLDivElement>(null);
  const finalPanelRef = useRef<HTMLDivElement>(null);

  // Hero: intro plays once the preloader has lifted; scroll-away parallax
  useHeroIntro(heroRef, { ready: !showPreloader });
  useHeroScroll(heroRef);

  // Collections: the second card sits lower and drifts at its own pace (desktop)
  const { offsetY, driftY } = SCROLL_CONFIG.collections;
  useParallax(secondCollectionRef, { fromY: offsetY + driftY / 2, toY: offsetY - driftY / 2 });

  // Why LEOZ: items rise in sequence and each divider draws left → right
  useListReveal(whyListRef, { items: ':scope > li', drawLines: true });

  // For Design Professionals: split entrance, text panel drifts gently (desktop)
  const slide = SCROLL_CONFIG.slide.distance;
  const panelDrift = SCROLL_CONFIG.pros.panelDriftY;
  useReveal(prosImageRef, { x: -slide });
  useReveal(prosTextRef, { x: slide, delay: 0.1 });
  useParallax(prosCardRef, { fromY: panelDrift / 2, toY: -panelDrift / 2 });

  // Final CTA: paragraph and button follow the heading's line reveal
  useReveal(finalPanelRef, {
    targets: ':scope > .lz-lead, :scope > .lz-btn',
    delay: SCROLL_CONFIG.finalCta.contentDelay,
  });

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
          <div className="lz-hero__media" aria-hidden="true" data-hero-media="">
            <div className="lz-hero__kenburns">
              <video
                src="/erasio_Hero_section_video.mp4"
                autoPlay={!prefersReducedMotion}
                muted
                loop
                playsInline
                preload="auto"
                tabIndex={-1}
              />
            </div>
          </div>

          <div className="lz-hero__content lz-container" data-hero-content="">
            <div className="lz-hero__inner">
              {/* <span className="lz-eyebrow lz-hero__eyebrow" data-hero="eyebrow">
                LEOZ / Bespoke Kitchens &amp; Wardrobes
              </span> */}

              <h1 id="hero-title" className="lz-h1" data-hero="title">
                Luxury, Crafted Around You.
              </h1>

              <span className="lz-rule" aria-hidden="true" data-hero="rule" />

              <p className="lz-lead lz-hero__text" data-hero="text">
                Discover luxury modular kitchens and bespoke wardrobes where refined design, intelligent functionality and meticulous craftsmanship come together. Designed to reflect your taste. Precision-made for the way you live.
              </p>

              <div className="lz-hero__ctas" data-hero="ctas">
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
              </div>
            </div>
          </div>

          <button
            type="button"
            className="lz-scroll"
            onClick={scrollToWelcome}
            aria-label="Scroll to the next section"
            data-hero-indicator=""
          >
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
                src="/kitchen_opus.webp"
                alt="LEOZ luxury penthouse kitchen with Calacatta marble waterfall island and bespoke cabinetry"
                parallax={false}
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
                  {/* Wrapper carries the desktop offset/drift so it never fights the card's hover lift */}
                  <div className="lz-collection__shift" ref={idx === 1 ? secondCollectionRef : undefined}>
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
                  </div>
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

            <ul className="lz-checklist" ref={whyListRef}>
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

            <ol className="lz-jcards">
              {journey.map((step, idx) => (
                <li key={step} className="lz-jcard">
                  <span className="lz-jcard__num">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="lz-jcard__rule" aria-hidden="true" />
                  <h3 className="lz-jcard__label">{step}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* =========================================================================
            08 FOR DESIGN PROFESSIONALS
            ========================================================================= */}
        <section className="lz-section lz-bg-ivory" aria-labelledby="pros-title">
          {/* Split entrance (desktop): image from its side, text panel from the
              other with a slight drift; mobile uses the standard fade-up */}
          <div className="lz-container lz-pros">
            <div className="lz-zoom" ref={prosImageRef}>
              <WarmImage
                src="/Italian Marble.webp"
                alt="Bright LEOZ kitchen with Italian marble surfaces, a long island and integrated lighting"
              />
            </div>

            <div ref={prosTextRef}>
              <div className="lz-pros__card" ref={prosCardRef}>
                <h2 className="lz-h2" id="pros-title">
                  For Design Professionals
                </h2>
                <GoldRule />
                <p className="lz-body">
                  We work with architects, interior designers and premium residential developers to realise customised kitchen and wardrobe specifications. Our team supports technical coordination, material selection, controlled manufacturing and site installation for individual and multi-home requirements.
                </p>
                <MagneticLink href="/contact" onClick={(e) => navigate(e, '/contact')} className="lz-btn lz-btn--secondary">
                  <span>Partner With Us</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </MagneticLink>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            09 FINAL CALL TO ACTION — BEGIN YOUR LEOZ EXPERIENCE
            ========================================================================= */}
        <section className="lz-final" aria-labelledby="final-title">
          {/* Background settles from a slow zoom as the section enters */}
          <WarmImage
            src="/U -Shape Layout.webp"
            alt="Warm-lit LEOZ U-shaped kitchen with soft grey cabinetry and a central island"
            mode="enter-scale"
          />
          <div className="lz-final__veil" aria-hidden="true" />

          <div className="lz-container">
            {/* Heading lines rise, then the paragraph and button follow */}
            <div className="lz-final__panel" ref={finalPanelRef}>
              <MaskHeading id="final-title">Begin Your LEOZ Experience</MaskHeading>
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
