import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import {
  ArrowRight,
  ArrowUpRight,
  X,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

interface ProjectItem {
  id: string;
  title: string;
  location: string;
  category: 'KITCHENS' | 'WARDROBES' | 'COMPLETE INTERIORS';
  year: string;
  area: string;
  materials: string[];
  heroImage: string;
  focalPosition: string;
  gridSpan: 'large' | 'tall' | 'wide' | 'standard';
  intro: string;
  description: string;
  gallery: {
    title: string;
    caption: string;
    image: string;
    category: string;
  }[];
  beforeAfter?: {
    before: string;
    after: string;
    caption: string;
  };
}

export const Projects: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Projects & Portfolio | LEOZ Cucine — Architectural Interior Living',
    'Explore LEOZ portfolio of bespoke modular kitchens, luxury dressing suites, and architectural complete residences.'
  );

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'KITCHENS' | 'WARDROBES' | 'COMPLETE INTERIORS'>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  /* =========================================================================
     PROJECTS DATA (ASYMMETRIC EDITORIAL PORTFOLIO)
     ========================================================================= */
  const projectsData: ProjectItem[] = [
    {
      id: 'bodakdev-villa-monolith',
      title: 'The Bodakdev Monolith Villa',
      location: 'Bodakdev, Ahmedabad',
      category: 'KITCHENS',
      year: '2026',
      area: '620 sq. ft. Culinary Suite',
      materials: ['Taj Mahal Natural Quartzite', 'Smoked European Oak', 'Champagne Anodized Metal'],
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      focalPosition: 'center 40%',
      gridSpan: 'large',
      intro: 'A continuous 4.2-metre monolithic quartzite kitchen island functioning as the architectural centrepiece of an expansive private villa.',
      description: 'Engineered with 45-degree mitered stone waterfall edges, motorized concealed appliance pockets, and an integrated temperature-regulated wine showcase. Designed to effortlessly transition from family breakfast to private chef hosting.',
      gallery: [
        {
          title: 'Monolith Island Waterfall',
          caption: 'Continuous 45° mitered quartzite waterfall island with flush induction cooktop.',
          image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
          category: 'Kitchen Island',
        },
        {
          title: 'Concealed Tall Unit Wall',
          caption: 'Smoked oak pocket door tall units concealing high-end Miele ovens and prep station.',
          image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
          category: 'Cabinetry',
        },
        {
          title: 'Micro-Diffused Plinth Lighting',
          caption: '3000K recessed LED plinth illumination floating the stone volume above the floor.',
          image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',
          category: 'Lighting Architecture',
        },
      ],
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        caption: 'Spatial transformation: Traditional closed compartmentalized kitchen into an open architectural monolith.',
      },
    },
    {
      id: 'shantigram-sky-penthouse',
      title: 'Shantigram Sky Suite',
      location: 'Shantigram, Ahmedabad',
      category: 'WARDROBES',
      year: '2026',
      area: '480 sq. ft. Master Boudoir',
      materials: ['Smoked Bronze Aero Glass', 'Fluted Eucalyptus', 'Italian Stitched Leather'],
      heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85',
      focalPosition: 'center 45%',
      gridSpan: 'tall',
      intro: 'A full-height walk-in dressing sanctuary featuring floor-to-ceiling smoked glass vitrines and an acoustic velvet island.',
      description: 'Configured with concealed micro-hinges, vertical PIR sensor lighting, and dedicated watch winders integrated into the central leather-lined showcase.',
      gallery: [
        {
          title: 'Central Vitrine Island',
          caption: 'Handcrafted leather watch drawers with motorized biometric lock access.',
          image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=85',
          category: 'Island Showcase',
        },
        {
          title: 'Aero Glass Wardrobe Bay',
          caption: '3.0m tinted glass shutters with ultra-slim champagne anodized profiles.',
          image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85',
          category: 'Wardrobe Bays',
        },
      ],
    },
    {
      id: 'dumas-road-residence',
      title: 'Dumas Road Sky Penthouse',
      location: 'Dumas Road, Surat',
      category: 'COMPLETE INTERIORS',
      year: '2026',
      area: '4,500 sq. ft. Complete Home',
      materials: ['Calacatta Marble', 'Thermal Matte Nero', 'Acoustic Wall Panels'],
      heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
      focalPosition: 'center 45%',
      gridSpan: 'wide',
      intro: 'A harmonious complete residential interior bringing architectural unity across open-concept kitchen, dining, living lounge, and private bedrooms.',
      description: 'Full-home architectural millwork produced 100% in-house at our Gandhinagar facility, ensuring consistent veneer grains, handleless profiles, and precision hardware tolerances across every room.',
      gallery: [
        {
          title: 'Living & Dining Flow',
          caption: 'Continuous wood panelling and bespoke TV credenza seamlessly framing the city views.',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
          category: 'Living Lounge',
        },
        {
          title: 'Integrated Wine & Bar Lounge',
          caption: 'Backlit fluted glass bar with climate-controlled bottle displays.',
          image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',
          category: 'Hospitality Zone',
        },
      ],
    },
    {
      id: 'raysan-architectural-estate',
      title: 'Raysan Architectural Estate',
      location: 'Raysan, Gandhinagar',
      category: 'KITCHENS',
      year: '2025',
      area: '540 sq. ft. Garden Kitchen',
      materials: ['Fluted Acoustic Walnut', 'Honed Nero Sintered Stone', 'Blum Servo-Drive'],
      heroImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
      focalPosition: 'center 50%',
      gridSpan: 'standard',
      intro: 'Warm hospitality kitchen seamlessly connecting to an outdoor garden pavilion, featuring 45-degree mitered stone details.',
      description: 'Equipped with electronic touch-to-open drawer runners, concealed downdraft extraction, and textured fluted timber fronts treated for zero warping.',
      gallery: [
        {
          title: 'Fluted Acoustic Walnut Detailing',
          caption: 'Micron-level CNC precision fluting with invisible J-pull finger channels.',
          image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
          category: 'Finishes',
        },
      ],
    },
    {
      id: 'sindhubhavan-dressing-suite',
      title: 'Sindhu Bhavan Presidential Dressing',
      location: 'Sindhu Bhavan Road, Ahmedabad',
      category: 'WARDROBES',
      year: '2025',
      area: '380 sq. ft. Wardrobe Suite',
      materials: ['Co-Planar Sliding Track', 'Velvet Melamine', 'Smoked Bronze Mirror'],
      heroImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1400&q=85',
      focalPosition: 'center 48%',
      gridSpan: 'standard',
      intro: 'Flush co-planar sliding wardrobe with concealed pull-down hydraulic elevators and hidden vault.',
      description: 'Engineered for smooth acoustic motion with zero visible floor rails, creating an uncluttered minimal bedroom volume.',
      gallery: [
        {
          title: 'Illuminated Shoe Gallery',
          caption: 'Precision angled shelves with brass heel-stop rails and diffused lighting.',
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
          category: 'Shoe Storage',
        },
      ],
    },
    {
      id: 'ambli-luxury-villa',
      title: 'Ambli Road Complete Villa',
      location: 'Ambli Road, Ahmedabad',
      category: 'COMPLETE INTERIORS',
      year: '2025',
      area: '6,200 sq. ft. Villa Interior',
      materials: ['Natural White Quartzite', 'Smoked European Oak', 'Ultra-Matte Satin Lacquer'],
      heroImage: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1400&q=85',
      focalPosition: 'center 42%',
      gridSpan: 'large',
      intro: 'Turnkey architectural interior encompassing double-height living foyer, chef & wet kitchen suites, master boudoir, and media room.',
      description: 'Every millimetre was mapped in photorealistic 3D CAD before manufacturing on European CNC machines, ensuring flawless alignment between walls, ceilings, and built-in millwork.',
      gallery: [
        {
          title: 'Chef Kitchen & Island',
          caption: 'Dual island kitchen with integrated prep sink and cantilevered breakfast bar.',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
          category: 'Kitchen',
        },
        {
          title: 'Master Dressing Boudoir',
          caption: 'His-and-hers walk-in closet with central accessory console.',
          image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
          category: 'Wardrobe',
        },
      ],
    },
  ];

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'ALL') return true;
    return p.category === activeFilter;
  });

  return (
    <div style={{ backgroundColor: '#FAF9F6', color: '#161514', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />

      <main id="main-content">
        {/* =========================================================================
            HERO: "SPACES WE'VE CREATED."
            ========================================================================= */}
        <section
          aria-label="LEOZ Portfolio Hero"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: 'clamp(520px, 78vh, 700px)',
            display: 'flex',
            alignItems: 'flex-end',
            backgroundColor: '#161514',
            overflow: 'hidden',
          }}
        >
          {/* Immersive Architectural Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90)',
              backgroundPosition: 'center 45%',
              backgroundSize: 'cover',
            }}
          />

          {/* Soft Scrim for High Readability */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(22, 21, 20, 0.3) 0%, rgba(22, 21, 20, 0.4) 40%, rgba(22, 21, 20, 0.88) 95%)',
            }}
          />

          {/* Hero Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '1360px',
              width: '100%',
              margin: '0 auto',
              paddingLeft: 'clamp(20px, 5.5vw, 80px)',
              paddingRight: 'clamp(20px, 5.5vw, 80px)',
              paddingBottom: 'clamp(44px, 7vw, 76px)',
            }}
          >
            <div style={{ maxWidth: '820px' }}>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: luxuryEase }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#B69A6B',
                  marginBottom: '14px',
                }}
              >
                LEOZ CUCINE • ARCHITECTURAL PORTFOLIO
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(36px, 5.8vw, 72px)',
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                  color: '#FFFFFF',
                  margin: '0 0 18px 0',
                }}
              >
                Spaces We’ve Created.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: luxuryEase }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(14.5px, 1.3vw, 17.5px)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.65,
                  maxWidth: '640px',
                  marginBottom: '28px',
                }}
              >
                A collection of kitchens, wardrobes and complete interiors designed and crafted by LEOZ.
              </motion.p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PROJECT FILTERS
            ========================================================================= */}
        <section
          aria-label="Project Category Filters"
          style={{
            paddingTop: 'clamp(32px, 4vw, 48px)',
            paddingBottom: 'clamp(32px, 4vw, 48px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            borderBottom: '1px solid rgba(22, 21, 20, 0.08)',
            backgroundColor: '#FAF9F6',
            position: 'sticky',
            top: '70px',
            zIndex: 30,
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            style={{
              maxWidth: '1360px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            {(['ALL', 'KITCHENS', 'WARDROBES', 'COMPLETE INTERIORS'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '10px 22px',
                  backgroundColor: activeFilter === filter ? '#161514' : 'transparent',
                  color: activeFilter === filter ? '#FFFFFF' : '#161514',
                  border: `1px solid ${activeFilter === filter ? '#161514' : 'rgba(22, 21, 20, 0.15)'}`,
                  borderRadius: '2px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* =========================================================================
            ASYMMETRIC EDITORIAL PROJECT GRID
            ========================================================================= */}
        <section
          aria-label="Architectural Portfolio Grid"
          style={{
            paddingTop: 'clamp(50px, 7vw, 90px)',
            paddingBottom: 'clamp(80px, 10vw, 130px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            backgroundColor: '#FAF9F6',
          }}
        >
          <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
            <motion.div
              layout
              className="leoz-portfolio-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '32px',
              }}
            >
              <AnimatePresence>
                {filteredProjects.map((project, idx) => {
                  let colSpan = 'span 6';
                  let aspectRatio = '16 / 11';

                  if (project.gridSpan === 'large') {
                    colSpan = 'span 12';
                    aspectRatio = '21 / 10';
                  } else if (project.gridSpan === 'wide') {
                    colSpan = 'span 7';
                    aspectRatio = '16 / 10';
                  } else if (project.gridSpan === 'tall') {
                    colSpan = 'span 5';
                    aspectRatio = '4 / 4.2';
                  }

                  return (
                    <motion.div
                      layout
                      key={project.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: idx * 0.06, ease: luxuryEase }}
                      className="leoz-project-item"
                      style={{
                        gridColumn: colSpan,
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(22, 21, 20, 0.08)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.4s ease',
                      }}
                      onClick={() => setSelectedProject(project)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(182, 154, 107, 0.5)';
                        e.currentTarget.style.transform = 'translateY(-6px)';
                        e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(22, 21, 20, 0.08)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Project Image with Zoom */}
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: aspectRatio,
                          overflow: 'hidden',
                          backgroundColor: '#EBE8E1',
                        }}
                      >
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          loading="lazy"
                          className="project-zoom-img"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: project.focalPosition,
                            display: 'block',
                            transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        />

                        {/* Top Badges */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '16px',
                            left: '16px',
                            right: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <span
                            style={{
                              padding: '5px 12px',
                              backgroundColor: 'rgba(22, 21, 20, 0.8)',
                              backdropFilter: 'blur(8px)',
                              color: '#B69A6B',
                              fontFamily: 'var(--font-body)',
                              fontSize: '10px',
                              fontWeight: 600,
                              letterSpacing: '0.15em',
                              textTransform: 'uppercase',
                              borderRadius: '2px',
                            }}
                          >
                            {project.category}
                          </span>
                          <span
                            style={{
                              padding: '5px 10px',
                              backgroundColor: 'rgba(22, 21, 20, 0.75)',
                              backdropFilter: 'blur(8px)',
                              color: '#FFFFFF',
                              fontFamily: 'var(--font-body)',
                              fontSize: '10px',
                              borderRadius: '2px',
                            }}
                          >
                            {project.year}
                          </span>
                        </div>

                        {/* Bottom Location Tag */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '14px',
                            left: '14px',
                            padding: '4px 10px',
                            backgroundColor: 'rgba(22, 21, 20, 0.75)',
                            backdropFilter: 'blur(8px)',
                            color: '#FFFFFF',
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            borderRadius: '2px',
                          }}
                        >
                          📍 {project.location}
                        </div>
                      </div>

                      {/* Project Meta Information */}
                      <div
                        style={{
                          padding: '24px',
                          display: 'flex',
                          flexDirection: 'column',
                          flexGrow: 1,
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            marginBottom: '8px',
                          }}
                        >
                          <h3
                            className="project-title"
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: 'clamp(20px, 2.2vw, 24px)',
                              fontWeight: 400,
                              color: '#161514',
                              margin: 0,
                              transition: 'color 0.3s ease',
                            }}
                          >
                            {project.title}
                          </h3>
                          <ArrowUpRight size={18} style={{ color: '#B69A6B' }} />
                        </div>

                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '13.5px',
                            color: 'rgba(22, 21, 20, 0.72)',
                            lineHeight: 1.6,
                            margin: '0 0 16px 0',
                            flexGrow: 1,
                          }}
                        >
                          {project.intro}
                        </p>

                        <div
                          style={{
                            paddingTop: '12px',
                            borderTop: '1px solid rgba(22, 21, 20, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '11.5px',
                            fontFamily: 'var(--font-body)',
                            color: '#8A8275',
                          }}
                        >
                          <span>{project.area}</span>
                          <span style={{ color: '#B69A6B', fontWeight: 600 }}>VIEW CASE STUDY →</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            PROJECT DETAIL MODAL (FULL ARCHITECTURAL STORYTELLING)
            ========================================================================= */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(15, 14, 13, 0.95)',
                backdropFilter: 'blur(16px)',
                zIndex: 2000,
                overflowY: 'auto',
                padding: 'clamp(20px, 4vw, 60px) clamp(16px, 4vw, 40px)',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, ease: luxuryEase }}
                style={{
                  maxWidth: '1180px',
                  margin: '0 auto',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                }}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close Project Modal"
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 50,
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(22, 21, 20, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#B69A6B')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(22, 21, 20, 0.85)')}
                >
                  <X size={20} />
                </button>

                {/* Modal Hero Image */}
                <div style={{ position: 'relative', width: '100%', height: 'clamp(320px, 50vh, 520px)' }}>
                  <img
                    src={selectedProject.heroImage}
                    alt={selectedProject.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(22, 21, 20, 0.9) 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '28px',
                      left: 'clamp(24px, 4vw, 48px)',
                      right: 'clamp(24px, 4vw, 48px)',
                      color: '#FFFFFF',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#B69A6B',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      {selectedProject.category} • {selectedProject.location} • {selectedProject.year}
                    </span>
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(28px, 4vw, 44px)',
                        fontWeight: 300,
                        margin: 0,
                        color: '#FFFFFF',
                      }}
                    >
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                {/* Modal Story & Specs */}
                <div style={{ padding: 'clamp(28px, 5vw, 56px)' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.4fr 1fr',
                      gap: '40px',
                      marginBottom: '48px',
                    }}
                    className="modal-intro-split"
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '22px',
                          fontWeight: 400,
                          color: '#161514',
                          margin: '0 0 14px 0',
                        }}
                      >
                        Architectural Concept
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '15px',
                          color: 'rgba(22, 21, 20, 0.8)',
                          lineHeight: 1.75,
                          marginBottom: '16px',
                        }}
                      >
                        {selectedProject.description}
                      </p>
                    </div>

                    <div
                      style={{
                        backgroundColor: '#FAF9F6',
                        border: '1px solid rgba(22, 21, 20, 0.08)',
                        borderRadius: '3px',
                        padding: '24px',
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: '#B69A6B',
                          margin: '0 0 16px 0',
                        }}
                      >
                        Material &amp; Scope Details
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                          <span style={{ fontSize: '11px', color: '#8A8275', display: 'block' }}>SPATIAL AREA</span>
                          <strong style={{ fontSize: '13.5px', color: '#161514', fontWeight: 600 }}>
                            {selectedProject.area}
                          </strong>
                        </div>
                        <div>
                          <span style={{ fontSize: '11px', color: '#8A8275', display: 'block' }}>PRIMARY MATERIALS</span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                            {selectedProject.materials.map((mat) => (
                              <span
                                key={mat}
                                style={{
                                  padding: '4px 10px',
                                  backgroundColor: '#FFFFFF',
                                  border: '1px solid rgba(22, 21, 20, 0.1)',
                                  borderRadius: '2px',
                                  fontSize: '11.5px',
                                  color: '#161514',
                                }}
                              >
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Gallery */}
                  <div style={{ marginBottom: '48px' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '22px',
                        fontWeight: 400,
                        color: '#161514',
                        margin: '0 0 20px 0',
                      }}
                    >
                      Project Gallery &amp; Macro Details
                    </h3>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '20px',
                      }}
                    >
                      {selectedProject.gallery.map((g) => (
                        <div
                          key={g.title}
                          style={{
                            border: '1px solid rgba(22, 21, 20, 0.08)',
                            borderRadius: '3px',
                            overflow: 'hidden',
                          }}
                        >
                          <div style={{ width: '100%', aspectRatio: '16 / 11', overflow: 'hidden' }}>
                            <img src={g.image} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ padding: '16px' }}>
                            <span style={{ fontSize: '10px', color: '#B69A6B', fontWeight: 600, letterSpacing: '0.12em' }}>
                              {g.category}
                            </span>
                            <h4 style={{ fontSize: '15px', margin: '4px 0 6px 0', color: '#161514' }}>{g.title}</h4>
                            <p style={{ fontSize: '12.5px', color: 'rgba(22, 21, 20, 0.68)', margin: 0, lineHeight: 1.5 }}>
                              {g.caption}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Before / After if Available */}
                  {selectedProject.beforeAfter && (
                    <div
                      style={{
                        backgroundColor: '#FAF9F6',
                        padding: '24px',
                        borderRadius: '3px',
                        border: '1px solid rgba(22, 21, 20, 0.08)',
                        marginBottom: '48px',
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '20px',
                          fontWeight: 400,
                          color: '#161514',
                          margin: '0 0 16px 0',
                        }}
                      >
                        Transformation Context
                      </h3>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '16px',
                        }}
                        className="before-after-grid"
                      >
                        <div>
                          <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', borderRadius: '2px' }}>
                            <img
                              src={selectedProject.beforeAfter.before}
                              alt="Before"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                padding: '4px 8px',
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                color: '#FFFFFF',
                                fontSize: '10px',
                                fontWeight: 600,
                              }}
                            >
                              BEFORE
                            </div>
                          </div>
                        </div>
                        <div>
                          <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', borderRadius: '2px' }}>
                            <img
                              src={selectedProject.beforeAfter.after}
                              alt="After"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div
                              style={{
                                position: 'absolute',
                                top: '10px',
                                left: '10px',
                                padding: '4px 8px',
                                backgroundColor: '#B69A6B',
                                color: '#FFFFFF',
                                fontSize: '10px',
                                fontWeight: 600,
                              }}
                            >
                              AFTER LEOZ
                            </div>
                          </div>
                        </div>
                      </div>
                      <p style={{ fontSize: '12.5px', color: 'rgba(22, 21, 20, 0.7)', margin: '14px 0 0 0' }}>
                        {selectedProject.beforeAfter.caption}
                      </p>
                    </div>
                  )}

                  {/* Modal Final CTA */}
                  <div
                    style={{
                      padding: '32px',
                      backgroundColor: '#161514',
                      color: '#FFFFFF',
                      borderRadius: '3px',
                      textAlign: 'center',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(22px, 3vw, 30px)',
                        fontWeight: 300,
                        margin: '0 0 12px 0',
                      }}
                    >
                      Commission an Interior of This Calibre
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.75)',
                        maxWidth: '540px',
                        margin: '0 auto 24px auto',
                      }}
                    >
                      Schedule a private consultation with LEOZ principal designers to begin planning your residence.
                    </p>
                    <a
                      href="/talk-to-us"
                      onClick={(e) => {
                        setSelectedProject(null);
                        navigate(e, '/talk-to-us');
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '14px 32px',
                        backgroundColor: '#B69A6B',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        borderRadius: '2px',
                      }}
                    >
                      <span>Start Your Project</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            SECTION: FINAL CTA ("START YOUR PROJECT")
            ========================================================================= */}
        <section
          aria-label="Start Your Project CTA"
          style={{
            position: 'relative',
            backgroundColor: '#0F0E0D',
            paddingTop: 'clamp(90px, 12vw, 150px)',
            paddingBottom: 'clamp(90px, 12vw, 150px)',
            paddingLeft: 'clamp(20px, 5.5vw, 80px)',
            paddingRight: 'clamp(20px, 5.5vw, 80px)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85)',
              backgroundPosition: 'center 45%',
              backgroundSize: 'cover',
              opacity: 0.2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(15, 14, 13, 0.7) 0%, #0F0E0D 95%)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '780px', margin: '0 auto' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#B69A6B',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              BESPOKE ARCHITECTURAL HOMES
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 5.5vw, 62px)',
                fontWeight: 300,
                color: '#FFFFFF',
                lineHeight: 1.08,
                margin: '0 0 20px 0',
              }}
            >
              Start Your Project.
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14.5px, 1.3vw, 17.5px)',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.7,
                marginBottom: '36px',
                maxWidth: '620px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              From single kitchen commissions to complete turnkey residential interiors, our team ensures every millimetre is executed with German precision.
            </p>

            <a
              href="/talk-to-us"
              onClick={(e) => navigate(e, '/talk-to-us')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 36px',
                backgroundColor: '#B69A6B',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#9F8255')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#B69A6B')}
            >
              <span>Book a Consultation</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Responsive Styles */}
      <style>{`
        .leoz-project-item:hover .project-zoom-img {
          transform: scale(1.05);
        }
        .leoz-project-item:hover .project-title {
          color: #B69A6B;
        }

        @media (max-width: 1024px) {
          .leoz-portfolio-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .leoz-project-item {
            grid-column: span 1 !important;
          }
          .modal-intro-split {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .leoz-portfolio-grid {
            grid-template-columns: 1fr !important;
          }
          .before-after-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
