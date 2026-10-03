import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLenisScroll } from '../../hooks/useLenisScroll';

interface HeaderProps {
  isPreloaderActive?: boolean;
  showHeader?: boolean;
}

const MOBILE_NAV_PANEL_ID = 'mobile-nav-panel';

export const Header: React.FC<HeaderProps> = ({ isPreloaderActive = false, showHeader = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lenis } = useLenisScroll();
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const mobileNavPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

  // Focus management + focus trap + Escape-to-close for the mobile drawer
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
        setActiveDropdown(null);
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
      setActiveDropdown(null);
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const isVisible = !isPreloaderActive || showHeader;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, fullPath: string) => {
    setActiveDropdown(null);
    const [path, hash] = fullPath.split('#');
    const targetHash = hash ? `#${hash}` : '';

    const validRoutes = [
      '/',
      '/modular-kitchens',
      '/modular-wardrobes',
      '/about',
      '/contact',
      '/franchise-enquiry',
      '/franchise-opportunities',
      '/talk-to-us',
      '/book-consultation',
      '/privacy-policy'
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
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 350);
  };

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <>
      <header
        role="banner"
        className="main-header-bar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '14px 4.5vw 22px 4.5vw' : '22px 4.5vw 34px 4.5vw',
          background: isMobileMenuOpen 
            ? 'rgba(10, 10, 10, 0.98)' 
            : 'linear-gradient(180deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.55) 45%, rgba(0, 0, 0, 0.2) 75%, rgba(0, 0, 0, 0) 100%)',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
          transform: isVisible ? 'translateY(0)' : 'translateY(-6px)',
          borderBottom: 'none',
          transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          boxShadow: 'none',
        }}
      >
        {/* LEFT LOGO */}
        <div className="header-logo-container" style={{ display: 'flex', alignItems: 'center' }}>
          <Logo variant="dark" showTagline={false} />
        </div>

        {/* RIGHT NAVIGATION (DESKTOP) */}
        <nav
          aria-label="Main Navigation"
          className="desktop-header-nav"
          style={{ display: 'flex', gap: 'clamp(14px, 1.6vw, 26px)', alignItems: 'center' }}
        >
          {/* 1. KITCHENS (DROPDOWN) */}
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => handleMouseEnter('kitchens')}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', padding: '12px 4px' }}
          >
            <a
              href="/modular-kitchens"
              onClick={(e) => handleNavClick(e, '/modular-kitchens')}
              className={`header-link ${currentPath === '/modular-kitchens' ? 'active-link' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13.5px',
                fontWeight: 500,
                letterSpacing: '0.4px',
                color: currentPath === '/modular-kitchens' ? 'var(--color-accent)' : '#FFFFFF',
                opacity: currentPath === '/modular-kitchens' ? 1 : 0.85,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 0',
              }}
            >
              <span>Kitchens</span>
              <ChevronDown
                size={13}
                style={{
                  transform: activeDropdown === 'kitchens' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: 0.7,
                }}
              />
            </a>

            <AnimatePresence>
              {activeDropdown === 'kitchens' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => handleMouseEnter('kitchens')}
                  onMouseLeave={handleMouseLeave}
                  className="rifra-sub-dropdown"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '230px',
                    backgroundColor: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.85)',
                    padding: '24px 20px',
                    zIndex: 1050,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    textAlign: 'center',
                  }}
                >
                  <a href="/modular-kitchens#hero" onClick={(e) => handleNavClick(e, '/modular-kitchens')} className="rifra-menu-item">Opus Monolith</a>
                  <a href="/modular-kitchens#philosophy" onClick={(e) => handleNavClick(e, '/modular-kitchens#philosophy')} className="rifra-menu-item">Architectural Design</a>
                  <a href="/modular-kitchens#collections-breakdown" onClick={(e) => handleNavClick(e, '/modular-kitchens#collections-breakdown')} className="rifra-menu-item">Signature Collections</a>
                  <a href="/modular-kitchens#materials" onClick={(e) => handleNavClick(e, '/modular-kitchens#materials')} className="rifra-menu-item">Materials &amp; Finishes</a>
                  <a href="/modular-kitchens#method" onClick={(e) => handleNavClick(e, '/modular-kitchens#method')} className="rifra-menu-item">The LEOZ Method</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. WARDROBES (DROPDOWN) */}
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => handleMouseEnter('wardrobes')}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', padding: '12px 4px' }}
          >
            <a
              href="/modular-wardrobes"
              onClick={(e) => handleNavClick(e, '/modular-wardrobes')}
              className={`header-link ${currentPath === '/modular-wardrobes' ? 'active-link' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13.5px',
                fontWeight: 500,
                letterSpacing: '0.4px',
                color: currentPath === '/modular-wardrobes' ? 'var(--color-accent)' : '#FFFFFF',
                opacity: currentPath === '/modular-wardrobes' ? 1 : 0.85,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 0',
              }}
            >
              <span>Wardrobes</span>
              <ChevronDown
                size={13}
                style={{
                  transform: activeDropdown === 'wardrobes' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: 0.7,
                }}
              />
            </a>

            <AnimatePresence>
              {activeDropdown === 'wardrobes' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => handleMouseEnter('wardrobes')}
                  onMouseLeave={handleMouseLeave}
                  className="rifra-sub-dropdown"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '230px',
                    backgroundColor: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.85)',
                    padding: '24px 20px',
                    zIndex: 1050,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    textAlign: 'center',
                  }}
                >
                  <a href="/modular-wardrobes#hero" onClick={(e) => handleNavClick(e, '/modular-wardrobes')} className="rifra-menu-item">Wardrobe Suites</a>
                  <a href="/modular-wardrobes#philosophy" onClick={(e) => handleNavClick(e, '/modular-wardrobes#philosophy')} className="rifra-menu-item">Dressing Sanctuaries</a>
                  <a href="/modular-wardrobes#wardrobe-breakdown" onClick={(e) => handleNavClick(e, '/modular-wardrobes#wardrobe-breakdown')} className="rifra-menu-item">Wardrobe Typologies</a>
                  <a href="/modular-wardrobes#materials" onClick={(e) => handleNavClick(e, '/modular-wardrobes#materials')} className="rifra-menu-item">Finishes &amp; Veneers</a>
                  <a href="/modular-wardrobes#method" onClick={(e) => handleNavClick(e, '/modular-wardrobes#method')} className="rifra-menu-item">The 6-Step Method</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. WHO WE ARE (DROPDOWN) */}
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', padding: '12px 4px' }}
          >
            <a
              href="/about"
              onClick={(e) => handleNavClick(e, '/about')}
              className={`header-link ${currentPath === '/about' ? 'active-link' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13.5px',
                fontWeight: 500,
                letterSpacing: '0.4px',
                color: currentPath === '/about' ? 'var(--color-accent)' : '#FFFFFF',
                opacity: currentPath === '/about' ? 1 : 0.85,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 0',
              }}
            >
              <span>Who We Are</span>
              <ChevronDown
                size={13}
                style={{
                  transform: activeDropdown === 'about' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: 0.7,
                }}
              />
            </a>

            <AnimatePresence>
              {activeDropdown === 'about' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => handleMouseEnter('about')}
                  onMouseLeave={handleMouseLeave}
                  className="rifra-sub-dropdown"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '210px',
                    backgroundColor: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.85)',
                    padding: '24px 20px',
                    zIndex: 1050,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    textAlign: 'center',
                  }}
                >
                  <a href="/about#philosophy-story" onClick={(e) => handleNavClick(e, '/about#philosophy-story')} className="rifra-menu-item">Our Story &amp; Vision</a>
                  <a href="/about#factory" onClick={(e) => handleNavClick(e, '/about#factory')} className="rifra-menu-item">20,000 Sq.Ft Plant</a>
                  <a href="/about" onClick={(e) => handleNavClick(e, '/about')} className="rifra-menu-item">Brand Legacy</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. CONTACT (DROPDOWN) */}
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => handleMouseEnter('contact')}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', padding: '12px 4px' }}
          >
            <a
              href="/contact"
              onClick={(e) => handleNavClick(e, '/contact')}
              className={`header-link ${currentPath === '/contact' ? 'active-link' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13.5px',
                fontWeight: 500,
                letterSpacing: '0.4px',
                color: currentPath === '/contact' ? 'var(--color-accent)' : '#FFFFFF',
                opacity: currentPath === '/contact' ? 1 : 0.85,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 0',
              }}
            >
              <span>Contact</span>
              <ChevronDown
                size={13}
                style={{
                  transform: activeDropdown === 'contact' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: 0.7,
                }}
              />
            </a>

            <AnimatePresence>
              {activeDropdown === 'contact' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => handleMouseEnter('contact')}
                  onMouseLeave={handleMouseLeave}
                  className="rifra-sub-dropdown"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '210px',
                    backgroundColor: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.85)',
                    padding: '24px 20px',
                    zIndex: 1050,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    textAlign: 'center',
                  }}
                >
                  <a href="/contact#contact-form-section" onClick={(e) => handleNavClick(e, '/contact#contact-form-section')} className="rifra-menu-item">Book Consultation</a>
                  <a href="/contact#contact-form-section" onClick={(e) => handleNavClick(e, '/contact#contact-form-section')} className="rifra-menu-item">Showroom Visit</a>
                  <a href="/contact#contact-details" onClick={(e) => handleNavClick(e, '/contact#contact-details')} className="rifra-menu-item">Direct Channels</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 6. PARTNERS / TRADE (DROPDOWN) */}
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => handleMouseEnter('partners')}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', padding: '12px 4px' }}
          >
            <a
              href="/franchise-opportunities"
              onClick={(e) => handleNavClick(e, '/franchise-opportunities')}
              className={`header-link ${currentPath === '/franchise-opportunities' ? 'active-link' : ''}`}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13.5px',
                fontWeight: 500,
                letterSpacing: '0.4px',
                color: currentPath === '/franchise-opportunities' ? 'var(--color-accent)' : '#FFFFFF',
                opacity: currentPath === '/franchise-opportunities' ? 1 : 0.85,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 0',
              }}
            >
              <span>Partners</span>
              <ChevronDown
                size={13}
                style={{
                  transform: activeDropdown === 'partners' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: 0.7,
                }}
              />
            </a>

            <AnimatePresence>
              {activeDropdown === 'partners' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => handleMouseEnter('partners')}
                  onMouseLeave={handleMouseLeave}
                  className="rifra-sub-dropdown"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    width: '230px',
                    backgroundColor: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.85)',
                    padding: '24px 20px',
                    zIndex: 1050,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    textAlign: 'center',
                  }}
                >
                  <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')} className="rifra-menu-item">Architects &amp; Designers</a>
                  <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')} className="rifra-menu-item">Project Specifiers</a>
                  <a href="/franchise-enquiry" onClick={(e) => handleNavClick(e, '/franchise-enquiry')} className="rifra-menu-item">Franchise Program</a>
                  <a href="/franchise-opportunities" onClick={(e) => handleNavClick(e, '/franchise-opportunities')} className="rifra-menu-item">Franchise Overview</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* MOBILE HAMBURGER TOGGLE BUTTON */}
        <div className="mobile-header-actions" style={{ display: 'none' }}>
          <button
            ref={hamburgerBtnRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-hamburger-btn"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls={MOBILE_NAV_PANEL_ID}
            style={{
              color: '#FFFFFF',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* MOBILE PREMIUM SLIDE-OVER DRAWER MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileNavPanelRef}
            id={MOBILE_NAV_PANEL_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(10, 10, 10, 0.98)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              zIndex: 995,
              paddingTop: '100px',
              paddingBottom: '36px',
              paddingLeft: '28px',
              paddingRight: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflowY: 'auto',
            }}
          >
            <nav aria-label="Mobile Navigation" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <a
                href="/"
                onClick={(e) => handleMobileNavClick(e, '/')}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  color: currentPath === '/' ? 'var(--color-accent)' : '#FFFFFF',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '12px',
                }}
              >
                Home
              </a>
              <a
                href="/modular-kitchens"
                onClick={(e) => handleMobileNavClick(e, '/modular-kitchens')}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  color: currentPath === '/modular-kitchens' ? 'var(--color-accent)' : '#FFFFFF',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '12px',
                }}
              >
                Kitchens
              </a>
              <a
                href="/modular-wardrobes"
                onClick={(e) => handleMobileNavClick(e, '/modular-wardrobes')}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  color: currentPath === '/modular-wardrobes' ? 'var(--color-accent)' : '#FFFFFF',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '12px',
                }}
              >
                Wardrobes
              </a>
              <a
                href="/about"
                onClick={(e) => handleMobileNavClick(e, '/about')}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  color: currentPath === '/about' ? 'var(--color-accent)' : '#FFFFFF',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '12px',
                }}
              >
                Who We Are
              </a>
              <a
                href="/contact"
                onClick={(e) => handleMobileNavClick(e, '/contact')}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  color: currentPath === '/contact' ? 'var(--color-accent)' : '#FFFFFF',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '12px',
                }}
              >
                Contact
              </a>
              <a
                href="/franchise-opportunities"
                onClick={(e) => handleMobileNavClick(e, '/franchise-opportunities')}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  color: currentPath === '/franchise-opportunities' ? 'var(--color-accent)' : '#FFFFFF',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '12px',
                }}
              >
                Trade &amp; Franchise
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .rifra-mega-dropdown::before {
          content: '';
          position: absolute;
          top: -24px;
          left: 0;
          right: 0;
          height: 24px;
          background: transparent;
        }

        .rifra-sub-dropdown::before {
          content: '';
          position: absolute;
          top: -20px;
          left: 0;
          right: 0;
          height: 20px;
          background: transparent;
        }

        .rifra-menu-item {
          font-family: var(--font-heading);
          font-size: 17px;
          color: #FFFFFF;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: color 0.2s ease, opacity 0.2s ease;
          opacity: 0.9;
          white-space: nowrap;
        }
        .rifra-menu-item:hover {
          color: var(--color-accent) !important;
          opacity: 1 !important;
        }

        .mega-col-title {
          font-family: var(--font-heading);
          font-size: 20px;
          color: #FFFFFF;
          text-decoration: none;
          letter-spacing: -0.01em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 8px;
          display: block;
        }

        .mega-sublink {
          font-family: var(--font-body);
          font-size: 13px;
          color: #A0A0A0;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
          cursor: pointer;
        }
        .mega-sublink:hover {
          color: #FFFFFF !important;
          transform: translateX(3px);
        }

        @media (max-width: 1080px) {
          .desktop-header-nav {
            display: none !important;
          }
          .mobile-header-actions {
            display: flex !important;
          }
        }

        .header-link:hover {
          color: #FFFFFF !important;
          opacity: 1 !important;
        }
        .header-link {
          position: relative;
        }
        .header-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1px;
          background-color: var(--color-accent-gold);
          transition: width 0.25s ease;
        }
        .header-link:hover::after, .header-link:focus-visible::after, .active-link::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Header;


