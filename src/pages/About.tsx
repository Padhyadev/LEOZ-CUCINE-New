import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ArrowRight, Check, Settings, ShieldCheck, Factory } from 'lucide-react';
import './About.css';

const EASE = [0.16, 1, 0.3, 1];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LEOZ Cucine",
  "location": {
    "@type": "Place",
    "name": "Manufacturing Facility",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Rakanpur, Gandhinagar",
      "addressRegion": "Gujarat"
    }
  }
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
      {eyebrow && <span className="lz-about-eyebrow">{eyebrow}</span>}
      <h2 className="lz-about-h2 lz-about-mask">
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
        className="lz-about-rule"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      />
    </motion.div>
  );
};

const MagneticButton = ({ children, className, href }: { children: React.ReactNode, className: string, href: string }) => {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18 });
  const y = useSpring(0, { stiffness: 260, damping: 18 });
  
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(Math.max(-8, Math.min(8, (e.clientX - (r.left + r.width / 2)) * 0.2)));
    y.set(Math.max(-8, Math.min(8, (e.clientY - (r.top + r.height / 2)) * 0.35)));
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a href={href} className={className} onMouseMove={handleMove} onMouseLeave={reset} style={{ x, y }}>
      {children}
    </motion.a>
  );
};

const CountUp = ({ to, suffix = '' }: { to: number, suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = to / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, to]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
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

export const About: React.FC = () => {
  useDocumentMeta('About LEOZ Cucine | Luxury Kitchen & Wardrobes', 'Based in Gujarat, LEOZ Cucine specialises in luxury modular kitchens and bespoke wardrobes, bringing thoughtful design and manufacturing control to distinctive homes.');
  
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const reduce = useReducedMotion();

  // Tabs state
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'Our Philosophy', content: 'German-inspired precision meets a nuanced understanding of Indian homes. We consider how each space is used before developing its form: ergonomics, movement, storage, materials and finish are treated as one coherent design.' },
    { title: 'Our Vision', content: 'To become a recognised name in luxury kitchens and wardrobes through distinct design, manufacturing precision and thoughtful client experiences.' },
    { title: 'Our Mission', content: 'To offer personalised planning, dependable manufacturing, meticulous installation and responsive support, enabling customers to enjoy refined, functional living spaces.' }
  ];

  // Story text for word reveal
  const storyText = "LEOZ Cucine is built on the conviction that a kitchen or wardrobe should be as accomplished in use as it is beautiful in appearance. Guided by deep practical expertise, the brand focuses solely on these two product categories, with personalisation, skilled production and considered installation at its core.".split(" ");

  // Timeline Data
  const milestonesData = [
    // [Add dated company milestones after internal confirmation.]
    // { year: '2004', title: 'Founded', description: '...' }
    { title: 'Leadership Expertise', description: '20+ years of hands-on sector experience behind the brand’s manufacturing leadership.' },
    { title: 'In-House Facility', description: 'Continued investment in a 20,000 sq. ft. facility.' },
    { title: 'Luxury Capabilities', description: 'Ongoing development of luxury kitchen and wardrobe capabilities.' }
  ];

  return (
    <div className="lz-about">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      
      <main>
        {/* 01 HERO */}
        <section className="lz-about-hero">
          <div className="lz-about-hero__bg">
            <img src="/Gloss Finish.webp" alt="LEOZ Cucine luxury showroom" />
          </div>
          <div className="lz-about-hero__overlay" />
          
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="lz-dust" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }} />
          ))}

          <div className="lz-about-container" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
            <motion.div className="lz-about-hero__content lz-about-hero-text-shadow" initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
              <h1 className="lz-about-h2" style={{ marginBottom: '24px', color: '#fff' }}>A Passion for Detail. A Commitment to Excellence.</h1>
              <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '32px', color: '#fff' }}>
                Based in Gujarat, LEOZ Cucine specialises in luxury modular kitchens and bespoke wardrobes, bringing thoughtful design and manufacturing control to distinctive homes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 02 OUR STORY */}
        <section className="lz-about-section bg-ivory" id="our-story">
          <div className="lz-about-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <div>
              <SectionHead eyebrow="Our Story" title="The Foundation of LEOZ" />
              <p style={{ fontSize: '18px', lineHeight: 1.8 }}>
                {storyText.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={reduce ? false : { color: 'var(--text-taupe)' }}
                    whileInView={{ color: 'var(--text-cocoa)' }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    style={{ display: 'inline-block', marginRight: '5px' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </div>
            <motion.div className="lz-about-img-wrap" initial={reduce ? false : { opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="lz-about-bracket lz-about-bracket--tl" />
              <div className="lz-about-bracket lz-about-bracket--br" />
              <img src="/Wood Veneer.webp" alt="LEOZ Cucine bespoke detailing" style={{ aspectRatio: '4/5' }} />
            </motion.div>
          </div>
        </section>

        {/* 03 OUR PHILOSOPHY, VISION AND MISSION */}
        <SpotlightContainer className="lz-about-section bg-cream">
          <div className="lz-about-container">
            <SectionHead eyebrow="Principles" title="Philosophy, Vision & Mission" center />
            <div style={{ maxWidth: '800px', margin: '48px auto 0' }}>
              <div className="lz-tabs__nav">
                {tabs.map((tab, i) => (
                  <button key={i} className={`lz-tab__btn ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)} style={{ flex: 1 }}>
                    {tab.title}
                  </button>
                ))}
                <div className="lz-tab__indicator" style={{ width: '33.333%', left: `${activeTab * 33.333}%` }} />
              </div>
              <div style={{ minHeight: '120px', position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeTab}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    style={{ fontSize: '18px', lineHeight: 1.8, textAlign: 'center' }}
                  >
                    {tabs[activeTab].content}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </SpotlightContainer>

        {/* 04 MEET THE DIRECTOR */}
        <section className="lz-about-section bg-white">
          <div className="lz-about-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <motion.div style={{ position: 'relative' }} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="lz-about-bracket lz-about-bracket--tl" style={{ top: '-16px', left: '-16px', width: '60px', height: '60px' }} />
              <div className="lz-about-bracket lz-about-bracket--br" style={{ bottom: '-16px', right: '-16px', width: '60px', height: '60px' }} />
              <div className="lz-about-img-wrap" style={{ aspectRatio: '3/4' }}>
                <motion.div className="lz-director-mask" variants={{ hidden: { scaleX: 1 }, visible: { scaleX: 0 } }} transition={{ duration: 1, ease: EASE, delay: 0.2 }} />
                <img src="/director.webp" alt="Mr. Mayur Vadhia - Director" />
              </div>
              <motion.div 
                style={{ position: 'absolute', bottom: '-20px', right: '-20px', background: 'var(--gold)', color: '#fff', padding: '16px 24px', borderRadius: '2px', fontWeight: 600 }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ delay: 1 }}
              >
                <CountUp to={20} suffix="+" /> Years Experience
              </motion.div>
            </motion.div>
            
            <div>
              <SectionHead eyebrow="Leadership" title="Meet the Director" />
              <h3 style={{ fontSize: '20px', fontWeight: 500, color: 'var(--text-cocoa)', marginBottom: '8px' }}>Mr. Mayur Vadhia</h3>
              <p style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--bronze)', marginBottom: '32px' }}>Director – Kitchens, Wardrobes & Manufacturing</p>
              
              <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '24px' }}>
                With over 20 years of intensive hands-on experience, Mayur Vadhia is among the highly experienced modular kitchen specialists in Gujarat. His knowledge spans the entire journey—from concept development, space planning, material and hardware selection through engineering, manufacturing, site installation and final execution.
              </p>
              <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '40px' }}>
                Having worked through changing technologies and product practices, he brings exceptional practical insight to the relationship between a compelling design and a well-executed product. His leadership shapes LEOZ’s attention to technical accuracy, manufacturing discipline and functional detail.
              </p>
              <motion.svg width="120" height="40" viewBox="0 0 120 40" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeInOut" }}>
                <path d="M10,30 Q30,10 50,25 T90,15 T110,25" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" />
              </motion.svg>
            </div>
          </div>
        </section>

        {/* 05 OUR MANUFACTURING FACILITY */}
        <section className="lz-about-section bg-ivory">
          <div className="lz-about-container">
            <SectionHead eyebrow="Infrastructure" title="Our Manufacturing Facility" center />
            
            <motion.div className="lz-about-img-wrap" style={{ aspectRatio: '21/9', marginTop: '48px', marginBottom: '48px' }} initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              {/* Soft crossfade could be implemented here with multiple images, using a single representative image for now */}
              <img src="/factory_precision_plant.webp" alt="LEOZ Cucine Manufacturing Facility in Rakanpur" />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', background: 'rgba(255,255,255,0.9)', padding: '16px 24px', borderRadius: '3px' }}>
                <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-cocoa)' }}><CountUp to={20000} /> sq. ft.</div>
                <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--bronze)' }}>Rakanpur, Gandhinagar</div>
              </div>
            </motion.div>

            <p style={{ fontSize: '18px', lineHeight: 1.8, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              The 20,000 sq. ft. in-house production facility at Rakanpur, Gandhinagar supports made-to-measure kitchen and wardrobe manufacturing. It brings product development, component processing, finishing and quality oversight into a coordinated environment.
            </p>
          </div>
        </section>

        {/* 06 FACILITY CAPABILITIES */}
        <SpotlightContainer className="lz-about-section bg-cream">
          <div className="lz-about-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
              
              <motion.div className="lz-about-card" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <Settings size={32} color="var(--gold)" style={{ marginBottom: '24px' }} />
                <h3 style={{ fontSize: '20px', color: 'var(--text-cocoa)', marginBottom: '16px' }}>Advanced Machinery</h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7 }}>
                  Modern European-grade production machinery supports precise cutting, consistent dimensions, controlled edge treatment and repeatable assembly of specified components.
                </p>
              </motion.div>

              <motion.div className="lz-about-card" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <Factory size={32} color="var(--gold)" style={{ marginBottom: '24px' }} />
                <h3 style={{ fontSize: '20px', color: 'var(--text-cocoa)', marginBottom: '16px' }}>Production Capability</h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7 }}>
                  An integrated facility enables us to coordinate individual homes and planned multi-unit residential kitchen and wardrobe requirements, subject to agreed capacity and project schedules.
                </p>
              </motion.div>

              <motion.div className="lz-about-card" initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} style={{ gridColumn: '1 / -1' }}>
                <ShieldCheck size={32} color="var(--gold)" style={{ marginBottom: '24px' }} />
                <h3 style={{ fontSize: '20px', color: 'var(--text-cocoa)', marginBottom: '16px' }}>Quality Control</h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '800px' }}>
                  Our quality approach considers material specifications, dimensional accuracy, fit and finish, hardware compatibility and final installation checks. Each project is assessed against its approved design and commercial specifications.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Material specifications', 'Dimensional accuracy', 'Fit and finish', 'Hardware compatibility', 'Final installation checks'].map((item, i) => (
                    <motion.div 
                      key={i} 
                      className="lz-chip"
                      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                    >
                      <Check size={14} className="lz-chip-icon" /> {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </SpotlightContainer>

        {/* 07 OUR RELATIONSHIPS */}
        <section className="lz-about-section bg-white">
          <div className="lz-about-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <div>
              <SectionHead eyebrow="Network" title="Our Relationships" />
              <p style={{ fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>
                LEOZ serves discerning homeowners and works with architects, interior designers and residential developers seeking specialist kitchen and wardrobe solutions. Geographic servicing and installation arrangements are confirmed project by project.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span className="lz-chip" style={{ background: 'var(--bg-ivory)' }}>Homeowners</span>
                <span className="lz-chip" style={{ background: 'var(--bg-ivory)' }}>Architects and Interior Designers</span>
                <span className="lz-chip" style={{ background: 'var(--bg-ivory)' }}>Residential Developers</span>
              </div>
            </div>
            <motion.div className="lz-about-img-wrap" style={{ aspectRatio: '4/3' }} initial={reduce ? false : { opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="lz-about-bracket lz-about-bracket--tr" style={{ top: '-8px', right: '-8px' }} />
              <img src="/Walk-in Wardrobes.webp" alt="LEOZ Cucine collaborative design process" />
            </motion.div>
          </div>
        </section>

        {/* 08 WHY CLIENTS CHOOSE US */}
        <section className="lz-about-section bg-sand">
          <div className="lz-about-container">
            <SectionHead eyebrow="Advantages" title="Why Clients Choose Us" center />
            <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px' }}>
              20+ years of leadership expertise, specialised product focus, 20,000 sq. ft. in-house manufacturing, design flexibility, attention to detailing and professional installation.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {['20+ years of leadership expertise', 'Specialised product focus', '20,000 sq. ft. in-house manufacturing', 'Design flexibility', 'Attention to detailing', 'Professional installation'].map((benefit, i) => (
                <motion.div 
                  key={i} 
                  className="lz-about-card" 
                  style={{ background: 'white', padding: '24px' }}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Check size={20} color="var(--gold)" style={{ marginBottom: '16px' }} />
                  <div style={{ height: '1px', width: '32px', background: 'var(--line-gold)', marginBottom: '16px' }} />
                  <h4 style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-cocoa)', margin: 0 }}>{benefit}</h4>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 09 OUR MILESTONES */}
        <section className="lz-about-section bg-ivory">
          <div className="lz-about-container" style={{ maxWidth: '800px' }}>
            <SectionHead eyebrow="Growth" title="Our Milestones" center />
            
            <div className="lz-timeline">
              <motion.div 
                className="lz-timeline__line" 
                initial={{ scaleY: 0 }} 
                whileInView={{ scaleY: 1 }} 
                viewport={{ once: true, amount: 0.1 }} 
                transition={{ duration: 1.5, ease: EASE }} 
              />
              {milestonesData.map((ms, i) => (
                <motion.div 
                  key={i} 
                  className="lz-timeline-item"
                  initial={reduce ? false : { opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h4 style={{ fontSize: '18px', color: 'var(--text-cocoa)', marginBottom: '8px', marginTop: 0 }}>{ms.title}</h4>
                  <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>{ms.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 10 FINAL CTA */}
        <section className="lz-about-hero" style={{ minHeight: '60vh', padding: '80px 24px' }}>
          <div className="lz-about-hero__bg">
            <img src="/U -Shape Layout.webp" alt="Discover LEOZ Cucine" />
          </div>
          <div className="lz-about-hero__overlay" />
          
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="lz-dust" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }} />
          ))}

          <div className="lz-about-container" style={{ width: '100%', position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center' }}>
            <motion.div 
              className="lz-about-hero__content lz-about-hero-text-shadow" 
              style={{ textAlign: 'center' }}
              initial={reduce ? false : { opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="lz-about-h2" style={{ marginBottom: '24px', color: '#fff' }}>Discover LEOZ</h2>
              <p style={{ fontSize: '18px', lineHeight: 1.8, marginBottom: '40px', color: '#fff' }}>
                Visit us by appointment or discuss your project with our team.
              </p>
              <MagneticButton href="/contact" className="lz-about-btn lz-about-btn--primary">
                Arrange a Consultation <ArrowRight size={16} />
              </MagneticButton>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default About;
