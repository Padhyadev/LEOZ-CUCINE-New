import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import { PHONE_SALES_DISPLAY, PHONE_SALES_HREF, SOCIAL_LINKS } from '../../constants/siteInfo';

export const Footer: React.FC = () => {
  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const collectionLinks = [
    { label: 'Home', path: '/' },
    { label: 'Kitchens', path: '/modular-kitchens' },
    { label: 'Wardrobes', path: '/modular-wardrobes' },
    { label: 'Craftsmanship & Factory', path: '/factory' },
  ];

  const companyLinks = [
    { label: 'About LEOZ', path: '/about' },
    { label: 'Book a Consultation', path: '/consultation' },
    { label: 'Franchise Enquiry', path: '/franchise-opportunities' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
  ];

  return (
    <footer
      id="global-footer"
      role="contentinfo"
      style={{
        backgroundColor: '#20211F',
        color: '#F7F7F5',
        position: 'relative',
        paddingTop: 'clamp(54px, 7vw, 84px)',
        paddingBottom: '36px',
        paddingLeft: 'clamp(20px, 5vw, 80px)',
        paddingRight: 'clamp(20px, 5vw, 80px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Main Grid: 4 Clean Architectural Columns */}
        <div
          className="leoz-footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.9fr 1.1fr 1.3fr',
            gap: 'clamp(32px, 4vw, 54px)',
            paddingBottom: 'clamp(36px, 5vw, 48px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Column 1: Brand & Description */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Logo variant="dark" showTagline={false} />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'rgba(247, 247, 245, 0.72)',
                lineHeight: 1.65,
                maxWidth: '360px',
                marginBottom: '24px',
              }}
            >
              Bespoke kitchens and wardrobes, designed with care and precision-manufactured in Gujarat.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  color: '#A58B62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  borderRadius: '4px',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#A58B62';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Instagram size={19} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  color: '#A58B62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  borderRadius: '4px',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#A58B62';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Linkedin size={19} />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  color: '#A58B62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  borderRadius: '4px',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#A58B62';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Facebook size={19} />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{
                  color: '#A58B62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  borderRadius: '4px',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#A58B62';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Youtube size={19} />
              </a>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#A58B62',
                marginBottom: '20px',
              }}
            >
              COLLECTIONS
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {collectionLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => navigate(e, item.path)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    color: 'rgba(247, 247, 245, 0.75)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    display: 'inline-block',
                    padding: '2px 0',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#A58B62')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(247, 247, 245, 0.75)')}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Company */}
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#A58B62',
                marginBottom: '20px',
              }}
            >
              COMPANY
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {companyLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => navigate(e, item.path)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    color: 'rgba(247, 247, 245, 0.75)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    display: 'inline-block',
                    padding: '2px 0',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#A58B62')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(247, 247, 245, 0.75)')}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Showroom & Office Contact */}
          <div>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#A58B62',
                marginBottom: '20px',
              }}
            >
              AHMEDABAD SHOWROOM
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'rgba(247, 247, 245, 0.75)', lineHeight: 1.6 }}>
                509, Sankalp Square 3B, Beside Taj Skyline, Sindhu Bhavan Road, Thaltej, Ahmedabad – 380059
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                <a
                  href={PHONE_SALES_HREF}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                >
                  <Phone size={15} color="#A58B62" />
                  <span>{PHONE_SALES_DISPLAY}</span>
                </a>

                <a
                  href="mailto:director@leozartofambience.com"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    color: 'rgba(247, 247, 245, 0.75)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#A58B62')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(247, 247, 245, 0.75)')}
                >
                  <Mail size={15} color="#A58B62" />
                  <span>director@leozartofambience.com</span>
                </a>

                <a
                  href="https://www.leozartofambience.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    color: 'rgba(247, 247, 245, 0.75)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#A58B62')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(247, 247, 245, 0.75)')}
                >
                  <span style={{ color: '#A58B62', fontSize: '13px', fontWeight: 600 }}>↗</span>
                  <span>www.leozartofambience.com</span>
                </a>
              </div>

              <div style={{ marginTop: '8px' }}>
                <a
                  href="https://maps.app.goo.gl/xT39MPBvZR4v923E9"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#A58B62',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#A58B62')}
                >
                  <span>View on Google Maps</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div
          style={{
            paddingTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'rgba(247, 247, 245, 0.45)',
          }}
        >
          <div>
            © {new Date().getFullYear()} LEOZ Cucine. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="/privacy-policy"
              onClick={(e) => navigate(e, '/privacy-policy')}
              style={{ color: 'rgba(247, 247, 245, 0.6)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#A58B62')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(247, 247, 245, 0.6)')}
            >
              Privacy Policy
            </a>
            <span>•</span>
            <span>Precision Manufacturing in Gujarat</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .leoz-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .leoz-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
