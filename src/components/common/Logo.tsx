import React from 'react';
import logoImg from '../../assets/logo.png';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '' }) => {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('popstate'));
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /*
   * High-definition rendering of the golden luxury LEOZ Cucine logo:
   * - On light surfaces (header): crisp, rich metallic gold with subtle depth.
   * - On dark surfaces (footer/preloader): radiant warm gold.
   */
  const filterStyle =
    variant === 'dark'
      ? 'brightness(1.1) contrast(1.1) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))'
      : 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.08))';

  return (
    <a
      href="/"
      onClick={handleLogoClick}
      className={`brand-logo-link ${className}`}
      aria-label="LEOZ CUCINE — Kitchens & Wardrobes"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
      }}
    >
      <img
        src={logoImg}
        alt="LEOZ CUCINE — Luxury Kitchens & Wardrobes"
        style={{
          height: 'clamp(48px, 6vw, 68px)',
          width: 'auto',
          maxHeight: '74px',
          objectFit: 'contain',
          display: 'block',
          filter: filterStyle,
          transition: 'filter 0.25s ease, transform 0.25s ease',
        }}
      />
    </a>
  );
};

