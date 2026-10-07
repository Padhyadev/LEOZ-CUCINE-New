import React from 'react';
import logoImg from '../../assets/logo.webp';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new Event('popstate'));
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
          height: 'clamp(44px, 5vw, 62px)',
          width: 'auto',
          maxHeight: '68px',
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.7))',
          transition: 'all var(--motion-duration-fast) ease',
        }}
      />
    </a>
  );
};

