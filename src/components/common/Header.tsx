import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useLenisScroll } from '../../hooks/useLenisScroll';
import './Header.css';

interface HeaderProps {
  isPreloaderActive?: boolean;
  showHeader?: boolean;
}

const MOBILE_NAV_PANEL_ID = 'mobile-nav-panel';
const luxuryEase = [0.16, 1, 0.3, 1];
const SCROLL_THRESHOLD = 40;

// Pages whose hero is a full-bleed dark photograph. Only these get the
// transparent header at the top of the page; light-topped pages (privacy,
// case study, franchise enquiry, 404) start solid so ivory links stay legible.
const FULL_BLEED_HERO_PATHS = new Set([
  '/',
  '',
  '/modular-kitchens',
  '/modular-wardrobes',
  '/factory',
  '/infrastructure',
  '/factory-infrastructure',
  '/our-method',
  '/method',
  '/projects',
  '/portfolio',
  '/about',
  '/contact',
  '/talk-to-us',
  '/franchise-opportunities',
  '/showrooms',
  '/experience-studios',
  '/studios',
  '/materials',
  '/finishes',
  '/materials-finishes',
]);

export const Header: React.FC<HeaderProps> = ({ isPreloaderActive = false, showHeader = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lenis } = useLenisScroll();
  const hamburgerBtnRef = useRef<HTMLButtonElement>(null);
  const mobileNavPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
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
    { label: 'Craftsmanship', path: '/factory' },
    { label: 'About', path: '/about' },
    { label: 'Franchise', path: '/franchise-opportunities' },
    { label: 'Contact', path: '/contact' },
  ];

  const isTransparent = FULL_BLEED_HERO_PATHS.has(currentPath) && !scrolled && !isMobileMenuOpen;

  const headerClassName = [
    'lz-header',
    'leoz-global-header',
    isTransparent ? 'is-transparent' : 'is-solid',
    scrolled ? 'is-compact' : '',
    isVisible ? '' : 'is-hidden',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header role="banner" className={headerClassName}>
        {/* LEFT: LEOZ LOGO */}
        <div className="lz-header__logo">
          <Logo variant="light" showTagline={false} />
        </div>

        {/* CENTER / NAVIGATION (DESKTOP) */}
        <nav aria-label="Desktop Primary Navigation" className="lz-nav">
          {navLinks.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className={`lz-nav__link ${isActive ? 'is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* RIGHT: PRIMARY CTA + MOBILE TOGGLE */}
        <div className="lz-header__right">
          <a
            href="/talk-to-us"
            onClick={(e) => handleNavClick(e, '/talk-to-us')}
            className="lz-cta"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11.5px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <span>Book a Consultation</span>
            <ArrowRight size={12} aria-hidden="true" />
          </a>

          <button
            ref={hamburgerBtnRef}
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lz-burger"
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls={MOBILE_NAV_PANEL_ID}
          >
            {isMobileMenuOpen ? (
              <X size={26} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu size={26} strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* =========================================================================
          MOBILE SLIDE-IN NAVIGATION DRAWER (DARK GOLD)
          ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="lz-drawer-backdrop"
            className="lz-drawer-backdrop"
            aria-hidden="true"
            onClick={() => setIsMobileMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        )}
        {isMobileMenuOpen && (
          <motion.div
            key="lz-drawer"
            ref={mobileNavPanelRef}
            id={MOBILE_NAV_PANEL_ID}
            className="lz-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: luxuryEase }}
          >
            {/* Top Bar: Logo left, Close icon right */}
            <div className="lz-drawer__top">
              <Logo variant="light" showTagline={false} />
              <button
                type="button"
                className="lz-burger"
                style={{ display: 'inline-flex' }}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Mobile Menu"
              >
                <X size={28} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Vertical Menu Links */}
            <nav aria-label="Mobile Navigation List" className="lz-drawer__nav">
              {navLinks.map((item, idx) => {
                const isActive = currentPath === item.path;
                return (
                  <motion.a
                    key={item.label}
                    href={item.path}
                    onClick={(e) => handleMobileNavClick(e, item.path)}
                    className={`lz-drawer__link ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 + idx * 0.03, ease: luxuryEase }}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '24px',
                      fontWeight: 300,
                    }}
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </motion.a>
                );
              })}
            </nav>

            {/* Bottom: Book a Consultation */}
            <a
              href="/talk-to-us"
              onClick={(e) => handleMobileNavClick(e, '/talk-to-us')}
              className="lz-cta lz-cta--block"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Book a Consultation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
