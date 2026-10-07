import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Menu, X, ChevronDown, ArrowRight, Compass, Sparkles, Layers, Building } from 'lucide-react';
import { useLenisScroll } from '../../hooks/useLenisScroll';

interface HeaderProps {
  isPreloaderActive?: boolean;
  showHeader?: boolean;
}

const MOBILE_NAV_PANEL_ID = 'mobile-nav-panel';
const luxuryEase = [0.16, 1, 0.3, 1];

export const Header: React.FC<HeaderProps> = ({ isPreloaderActive = false, showHeader = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lenis } = useLenisScroll();
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const mobileNavPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [isMobileMenuOpen, lenis]);

  // Focus trap + Escape-to-close for mobile drawer
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const panel = mobileNavPanelRef.current;
    const getFocusable = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])')
          )
        : [];

    const focusables = getFocusable();
    focusables[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        setActiveMegaMenu(null);
        return;
      }
      if (e.key !== 'Tab') return;

      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      hamburgerBtnRef.current?.focus();
    };
  }, [isMobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
      setActiveMegaMenu(null);
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const isVisible = !isPreloaderActive || showHeader;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, fullPath: string) => {
    setActiveMegaMenu(null);
    const [path, hash] = fullPath.split('#');
    const targetHash = hash ? `#${hash}` : '';

    const validRoutes = [
      '/',
      '/modular-kitchens',
      '/modular-wardrobes',
      '/projects',
      '/portfolio',
      '/case-study',
      '/our-method',
      '/method',
      '/factory',
      '/infrastructure',
      '/showrooms',
      '/materials',
      '/finishes',
      '/franchise-opportunities',
      '/franchise-enquiry',
      '/about',
      '/contact',
      '/talk-to-us',
      '/book-consultation',
      '/privacy-policy',
      '/404'
    ];

    if (validRoutes.includes(path)) {
      e.preventDefault();
      const currentUrlPath = window.location.pathname;
      const isSamePage = currentUrlPath === path;

      if (!isSamePage) {
        window.history.pushState({}, '', fullPath);
        window.dispatchEvent(new Event('popstate'));
      } else if (targetHash) {
        window.history.pushState({}, '', fullPath);
      }

      if (targetHash) {
        setTimeout(() => {
          const el = document.querySelector(targetHash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, isSamePage ? 50 : 250);
      } else if (!isSamePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (fullPath.startsWith('/#')) {
      e.preventDefault();
      const targetEl = document.querySelector(fullPath.substring(1));
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', fullPath);
        window.dispatchEvent(new Event('popstate'));
        setTimeout(() => {
          const el = document.querySelector(fullPath.substring(1));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 250);
      } else if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    setIsMobileMenuOpen(false);
    handleNavClick(e, path);
  };

  const handleMouseEnter = (menuKey: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveMegaMenu(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 250);
  };

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  /* =========================================================================
     MEGA MENU DEFINITIONS (Kitchens, Wardrobes, Interiors, Projects)
     ========================================================================= */
  const megaMenus = {
    kitchens: {
      title: 'MODULAR KITCHENS',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
      tagline: 'Architectural volumes & German engineering',
      links: [
        { label: 'Modern Kitchens', path: '/modular-kitchens' },
        { label: 'Luxury Kitchens', path: '/modular-kitchens' },
        { label: 'Island Kitchens', path: '/modular-kitchens' },
        { label: 'Handleless Kitchens', path: '/modular-kitchens' },
        { label: 'Kitchen Projects', path: '/projects' },
      ],
    },
    wardrobes: {
      title: 'MODULAR WARDROBES',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85',
      tagline: 'Sanctuary dressing suites & precision storage',
      links: [
        { label: 'Walk-in Wardrobes', path: '/modular-wardrobes' },
        { label: 'Sliding Wardrobes', path: '/modular-wardrobes' },
        { label: 'Luxury Vitrines', path: '/modular-wardrobes' },
        { label: 'Wardrobe Projects', path: '/projects' },
      ],
    },
    interiors: {
      title: 'COMPLETE INTERIORS',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85',
      tagline: 'Harmonious full-home turnkey millwork',
      links: [
        { label: 'Living Spaces', path: '/projects' },
        { label: 'Bedrooms & Boudoirs', path: '/modular-wardrobes' },
        { label: 'Complete Homes', path: '/projects' },
        { label: 'Interior Projects', path: '/projects' },
      ],
    },
    projects: {
      title: 'PROJECT PORTFOLIO',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=85',
      tagline: 'Architectural residences crafted across India',
      links: [
        { label: 'All Projects', path: '/projects' },
        { label: 'Kitchen Projects', path: '/projects' },
        { label: 'Wardrobe Suites', path: '/projects' },
        { label: 'The Ahmedabad Residence', path: '/case-study' },
      ],
    },
  };

  return (
    <>
      <header
        role="banner"
        className={`leoz-global-header ${scrolled ? 'leoz-header-scrolled' : 'leoz-header-top'}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: scrolled ? '72px' : '86px',
          padding: '0 clamp(20px, 4.5vw, 64px)',
          backgroundColor: scrolled ? 'rgba(250, 249, 246, 0.98)' : 'transparent',
          color: scrolled ? '#161514' : '#FFFFFF',
          borderBottom: scrolled ? '1px solid rgba(22, 21, 20, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
          transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* LEFT: LEOZ LOGO WITH BREATHING ROOM */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            aria-label="LEOZ Cucine Home"
            style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <Logo variant={scrolled ? 'light' : 'dark'} showTagline={false} />
          </a>
        </div>

        {/* CENTER / NAVIGATION (DESKTOP) */}
        <nav
          aria-label="Desktop Primary Navigation"
          className="leoz-desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(16px, 1.8vw, 32px)',
          }}
        >
          {/* 1. KITCHENS */}
          <div
            className="leoz-nav-item-wrapper"
            onMouseEnter={() => handleMouseEnter('kitchens')}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', padding: '16px 0' }}
          >
            <a
              href="/modular-kitchens"
              onClick={(e) => handleNavClick(e, '/modular-kitchens')}
              className={`leoz-nav-link ${currentPath === '/modular-kitchens' ? 'active' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: scrolled ? '#161514' : '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                position: 'relative',
                paddingBottom: '4px',
              }}
            >
              Kitchens
              <ChevronDown size={12} opacity={0.6} />
              {currentPath === '/modular-kitchens' && (
                <motion.div
                  layoutId="header-active-line"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1.5px',
                    backgroundColor: '#B69A6B',
                  }}
                />
              )}
            </a>
          </div>

          {/* 2. WARDROBES */}
          <div
            className="leoz-nav-item-wrapper"
            onMouseEnter={() => handleMouseEnter('wardrobes')}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', padding: '16px 0' }}
          >
            <a
              href="/modular-wardrobes"
              onClick={(e) => handleNavClick(e, '/modular-wardrobes')}
              className={`leoz-nav-link ${currentPath === '/modular-wardrobes' ? 'active' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: scrolled ? '#161514' : '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                position: 'relative',
                paddingBottom: '4px',
              }}
            >
              Wardrobes
              <ChevronDown size={12} opacity={0.6} />
              {currentPath === '/modular-wardrobes' && (
                <motion.div
                  layoutId="header-active-line"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1.5px',
                    backgroundColor: '#B69A6B',
                  }}
                />
              )}
            </a>
          </div>

          {/* 3. INTERIORS */}
          <div
            className="leoz-nav-item-wrapper"
            onMouseEnter={() => handleMouseEnter('interiors')}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', padding: '16px 0' }}
          >
            <a
              href="/projects"
              onClick={(e) => handleNavClick(e, '/projects')}
              className={`leoz-nav-link ${currentPath === '/projects' && !activeMegaMenu ? 'active' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: scrolled ? '#161514' : '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                position: 'relative',
                paddingBottom: '4px',
              }}
            >
              Interiors
              <ChevronDown size={12} opacity={0.6} />
            </a>
          </div>

          {/* 4. PROJECTS */}
          <div
            className="leoz-nav-item-wrapper"
            onMouseEnter={() => handleMouseEnter('projects')}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', padding: '16px 0' }}
          >
            <a
              href="/projects"
              onClick={(e) => handleNavClick(e, '/projects')}
              className={`leoz-nav-link ${currentPath === '/projects' || currentPath === '/case-study' ? 'active' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: scrolled ? '#161514' : '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                position: 'relative',
                paddingBottom: '4px',
              }}
            >
              Projects
              <ChevronDown size={12} opacity={0.6} />
              {(currentPath === '/projects' || currentPath === '/case-study') && (
                <motion.div
                  layoutId="header-active-line"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1.5px',
                    backgroundColor: '#B69A6B',
                  }}
                />
              )}
            </a>
          </div>

          {/* 5. OUR METHOD */}
          <div style={{ position: 'relative', padding: '16px 0' }}>
            <a
              href="/our-method"
              onClick={(e) => handleNavClick(e, '/our-method')}
              className={`leoz-nav-link ${currentPath === '/our-method' ? 'active' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: scrolled ? '#161514' : '#FFFFFF',
                display: 'inline-block',
                position: 'relative',
                paddingBottom: '4px',
              }}
            >
              Our Method
              {currentPath === '/our-method' && (
                <motion.div
                  layoutId="header-active-line"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1.5px',
                    backgroundColor: '#B69A6B',
                  }}
                />
              )}
            </a>
          </div>

          {/* 6. FACTORY */}
          <div style={{ position: 'relative', padding: '16px 0' }}>
            <a
              href="/factory"
              onClick={(e) => handleNavClick(e, '/factory')}
              className={`leoz-nav-link ${currentPath === '/factory' ? 'active' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: scrolled ? '#161514' : '#FFFFFF',
                display: 'inline-block',
                position: 'relative',
                paddingBottom: '4px',
              }}
            >
              Factory
              {currentPath === '/factory' && (
                <motion.div
                  layoutId="header-active-line"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1.5px',
                    backgroundColor: '#B69A6B',
                  }}
                />
              )}
            </a>
          </div>

          {/* 7. FRANCHISE */}
          <div style={{ position: 'relative', padding: '16px 0' }}>
            <a
              href="/franchise-opportunities"
              onClick={(e) => handleNavClick(e, '/franchise-opportunities')}
              className={`leoz-nav-link ${currentPath === '/franchise-opportunities' ? 'active' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12.5px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: scrolled ? '#161514' : '#FFFFFF',
                display: 'inline-block',
                position: 'relative',
                paddingBottom: '4px',
              }}
            >
              Franchise
              {currentPath === '/franchise-opportunities' && (
                <motion.div
                  layoutId="header-active-line"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1.5px',
                    backgroundColor: '#B69A6B',
                  }}
                />
              )}
            </a>
          </div>
        </nav>

        {/* RIGHT: ABOUT, CONTACT & PRIMARY CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 1.5vw, 24px)' }} className="leoz-header-right">
          <a
            href="/about"
            onClick={(e) => handleNavClick(e, '/about')}
            className="leoz-header-link-secondary"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12.5px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: scrolled ? '#161514' : '#FFFFFF',
              opacity: 0.85,
            }}
          >
            About
          </a>

          <a
            href="/contact"
            onClick={(e) => handleNavClick(e, '/contact')}
            className="leoz-header-link-secondary"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12.5px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: scrolled ? '#161514' : '#FFFFFF',
              opacity: 0.85,
            }}
          >
            Contact
          </a>

          {/* Minimal Rectangular Consultation Button */}
          <a
            href="/talk-to-us"
            onClick={(e) => handleNavClick(e, '/talk-to-us')}
            className="leoz-header-cta-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 22px',
              backgroundColor: scrolled ? '#161514' : '#FFFFFF',
              color: scrolled ? '#FFFFFF' : '#161514',
              fontFamily: 'var(--font-body)',
              fontSize: '11.5px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              border: `1px solid ${scrolled ? '#161514' : '#FFFFFF'}`,
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#B69A6B';
              e.currentTarget.style.borderColor = '#B69A6B';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = scrolled ? '#161514' : '#FFFFFF';
              e.currentTarget.style.borderColor = scrolled ? '#161514' : '#FFFFFF';
              e.currentTarget.style.color = scrolled ? '#FFFFFF' : '#161514';
            }}
          >
            <span>BOOK A CONSULTATION</span>
            <ArrowRight size={13} />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            ref={hamburgerBtnRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="leoz-mobile-hamburger"
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls={MOBILE_NAV_PANEL_ID}
            style={{
              display: 'none',
              color: scrolled ? '#161514' : '#FFFFFF',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* =========================================================================
            DESKTOP MEGA MENU DROPDOWN PANEL
            ========================================================================= */}
        <AnimatePresence>
          {activeMegaMenu && megaMenus[activeMegaMenu as keyof typeof megaMenus] && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25, ease: luxuryEase }}
              onMouseEnter={() => handleMouseEnter(activeMegaMenu)}
              onMouseLeave={handleMouseLeave}
              className="leoz-mega-menu-panel"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#161514',
                color: '#FFFFFF',
                borderTop: '1px solid rgba(182, 154, 107, 0.3)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.85)',
                padding: '36px clamp(20px, 5.5vw, 80px)',
              }}
            >
              <div
                style={{
                  maxWidth: '1360px',
                  margin: '0 auto',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1.8fr 1fr',
                  gap: '40px',
                  alignItems: 'center',
                }}
              >
                {/* Mega Menu Image Preview */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 0.65', overflow: 'hidden', borderRadius: '2px' }}>
                  <img
                    src={megaMenus[activeMegaMenu as keyof typeof megaMenus].image}
                    alt={megaMenus[activeMegaMenu as keyof typeof megaMenus].title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)',
                    }}
                  />
                </div>

                {/* Category Links */}
                <div>
                  <span style={{ fontSize: '10px', color: '#B69A6B', letterSpacing: '0.2em', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    {megaMenus[activeMegaMenu as keyof typeof megaMenus].title}
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px 24px' }}>
                    {megaMenus[activeMegaMenu as keyof typeof megaMenus].links.map((link) => (
                      <a
                        key={link.label}
                        href={link.path}
                        onClick={(e) => handleNavClick(e, link.path)}
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '18px',
                          color: '#FFFFFF',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#B69A6B';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#FFFFFF';
                        }}
                      >
                        <span>{link.label}</span>
                        <ArrowRight size={13} opacity={0.5} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Action Box */}
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: '#1E1D1B',
                    borderRadius: '2px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span style={{ fontSize: '10px', color: '#B69A6B', letterSpacing: '0.15em', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    PRIVATE CONSULTATION
                  </span>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: '14px' }}>
                    {megaMenus[activeMegaMenu as keyof typeof megaMenus].tagline}
                  </p>
                  <a
                    href="/talk-to-us"
                    onClick={(e) => handleNavClick(e, '/talk-to-us')}
                    style={{
                      fontSize: '11px',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>Book Studio Visit</span>
                    <ArrowRight size={12} color="#B69A6B" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* =========================================================================
          MOBILE FULL-SCREEN NAVIGATION OVERLAY (WARM IVORY / STONE)
          ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileNavPanelRef}
            id={MOBILE_NAV_PANEL_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.45, ease: luxuryEase }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#FAF9F6',
              color: '#161514',
              zIndex: 9999,
              paddingTop: '88px',
              paddingBottom: '36px',
              paddingLeft: '28px',
              paddingRight: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflowY: 'auto',
            }}
          >
            {/* Top Close Button in Panel Header */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '24px',
                right: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Logo variant="light" showTagline={false} />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Mobile Menu"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#161514',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={26} />
              </button>
            </div>

            {/* Mobile Vertical Menu Links */}
            <nav
              aria-label="Mobile Navigation List"
              style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}
            >
              {[
                { label: 'Home', path: '/' },
                { label: 'Kitchens', path: '/modular-kitchens' },
                { label: 'Wardrobes', path: '/modular-wardrobes' },
                { label: 'Interiors', path: '/projects' },
                { label: 'Projects & Case Studies', path: '/projects' },
                { label: 'Our Method', path: '/our-method' },
                { label: 'Factory & Infrastructure', path: '/factory' },
                { label: 'Materials & Finishes', path: '/materials' },
                { label: 'Franchise Opportunities', path: '/franchise-opportunities' },
                { label: 'About LEOZ', path: '/about' },
                { label: 'Showrooms', path: '/showrooms' },
                { label: 'Contact', path: '/contact' },
              ].map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => handleMobileNavClick(e, item.path)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.03, ease: luxuryEase }}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: currentPath === item.path ? '#B69A6B' : '#161514',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '10px',
                    borderBottom: '1px solid rgba(22, 21, 20, 0.06)',
                  }}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={14} color="#B69A6B" opacity={0.7} />
                </motion.a>
              ))}
            </nav>

            {/* Mobile Action Buttons & Direct Studio Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '24px' }}>
              <a
                href="/talk-to-us"
                onClick={(e) => handleMobileNavClick(e, '/talk-to-us')}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#161514',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  textDecoration: 'none',
                  borderRadius: '2px',
                }}
              >
                BOOK A CONSULTATION
              </a>

              <a
                href="/showrooms"
                onClick={(e) => handleMobileNavClick(e, '/showrooms')}
                style={{
                  width: '100%',
                  padding: '13px',
                  backgroundColor: 'transparent',
                  color: '#161514',
                  border: '1px solid rgba(22, 21, 20, 0.2)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  textDecoration: 'none',
                  borderRadius: '2px',
                }}
              >
                VISIT SHOWROOM (AHMEDABAD &amp; SURAT)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1140px) {
          .leoz-desktop-nav {
            display: none !important;
          }
          .leoz-header-right .leoz-header-link-secondary,
          .leoz-header-right .leoz-header-cta-btn {
            display: none !important;
          }
          .leoz-mobile-hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
