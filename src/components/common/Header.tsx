import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Menu, X, ArrowRight } from 'lucide-react';
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
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const isVisible = !isPreloaderActive || showHeader;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, fullPath: string) => {
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
      '/404',
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

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  const navLinks = [
    { label: 'Kitchens', path: '/modular-kitchens' },
    { label: 'Wardrobes', path: '/modular-wardrobes' },
    // { label: 'Projects', path: '/projects' },
    { label: 'Factory', path: '/factory' },
    { label: 'About', path: '/about' },
    { label: 'Franchise', path: '/franchise-opportunities' },
    { label: 'Contact', path: '/contact' },
  ];

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
          height: scrolled ? '76px' : '88px',
          padding: '0 clamp(20px, 4vw, 64px)',
          backgroundColor: '#F7F7F5', // Porcelain
          color: '#20211F', // Graphite
          borderBottom: '1px solid #D9D9D4', // Subtle hairline border
          boxShadow: scrolled ? '0 4px 20px rgba(32, 33, 31, 0.04)' : 'none',
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
          transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* LEFT: LEOZ LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Logo variant="light" showTagline={false} />
        </div>

        {/* CENTER / NAVIGATION (DESKTOP) */}
        <nav
          aria-label="Desktop Primary Navigation"
          className="leoz-desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(14px, 1.8vw, 32px)',
          }}
        >
          {navLinks.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className={`leoz-nav-link ${isActive ? 'active' : ''}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isActive ? '#A58B62' : '#20211F',
                  display: 'inline-block',
                  position: 'relative',
                  padding: '8px 0',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#A58B62';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#20211F';
                }}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="header-active-line"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#A58B62',
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* RIGHT: PRIMARY CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="leoz-header-right">
          <a
            href="/talk-to-us"
            onClick={(e) => handleNavClick(e, '/talk-to-us')}
            className="leoz-header-cta-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#20211F',
              color: '#FFFFFF',
              fontFamily: 'var(--font-body)',
              fontSize: '11.5px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
              border: '1px solid #20211F',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#A58B62';
              e.currentTarget.style.borderColor = '#A58B62';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#20211F';
              e.currentTarget.style.borderColor = '#20211F';
            }}
          >
            <span>Book a Consultation</span>
            <ArrowRight size={12} />
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
              color: '#20211F',
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
      </header>

      {/* =========================================================================
          MOBILE FULL-SCREEN NAVIGATION OVERLAY (PORCELAIN LUXURY)
          ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileNavPanelRef}
            id={MOBILE_NAV_PANEL_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ duration: 0.35, ease: luxuryEase }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#F7F7F5', // Porcelain
              color: '#20211F', // Graphite
              zIndex: 9999,
              paddingTop: '24px',
              paddingBottom: '36px',
              paddingLeft: '24px',
              paddingRight: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflowY: 'auto',
            }}
          >
            {/* Top Bar: Logo left, Close icon right */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '20px',
                borderBottom: '1px solid #D9D9D4',
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
                  color: '#20211F',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={28} />
              </button>
            </div>

            {/* Mobile Vertical Menu Links */}
            <nav
              aria-label="Mobile Navigation List"
              style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '24px 0' }}
            >
              {navLinks.map((item, idx) => {
                const isActive = currentPath === item.path;
                return (
                  <motion.a
                    key={item.label}
                    href={item.path}
                    onClick={(e) => handleMobileNavClick(e, item.path)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.03, ease: luxuryEase }}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '24px',
                      fontWeight: 300,
                      color: isActive ? '#A58B62' : '#20211F',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: '10px',
                      borderBottom: '1px solid rgba(217, 217, 212, 0.6)',
                    }}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={16} color={isActive ? '#A58B62' : '#686963'} />
                  </motion.a>
                );
              })}
            </nav>

            {/* Bottom: Book a Consultation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="/talk-to-us"
                onClick={(e) => handleMobileNavClick(e, '/talk-to-us')}
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#20211F',
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
                Book a Consultation
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
