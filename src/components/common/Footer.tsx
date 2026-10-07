import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin, Phone, Mail, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* Accordion state for mobile viewport */
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (sectionKey: string) => {
    setOpenSection(openSection === sectionKey ? null : sectionKey);
  };

  return (
    <footer
      id="global-footer"
      role="contentinfo"
      style={{
        backgroundColor: '#161514', // Deep warm charcoal (not harsh pitch black)
        color: '#FAF9F6',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* =========================================================================
          FOOTER HERO CTA SECTION (THE INVITATION CHAPTER)
          ========================================================================= */}
      <section
        aria-label="Footer Consultation Invitation"
        style={{
          position: 'relative',
          paddingTop: 'clamp(80px, 10vw, 130px)',
          paddingBottom: 'clamp(80px, 10vw, 130px)',
          paddingLeft: 'clamp(20px, 5.5vw, 80px)',
          paddingRight: 'clamp(20px, 5.5vw, 80px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Architectural Background with Soft Controlled Scrim */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85)',
            backgroundPosition: 'center 42%',
            backgroundSize: 'cover',
            opacity: 0.16,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(22, 21, 20, 0.75) 0%, #161514 95%)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '820px', margin: '0 auto' }}>
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
            BEGIN YOUR JOURNEY
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 5.2vw, 62px)',
              fontWeight: 300,
              color: '#FFFFFF',
              lineHeight: 1.08,
              margin: '0 0 18px 0',
              letterSpacing: '-0.01em',
            }}
          >
            Let's Create
            <br />
            a Space That Feels Like You.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(14px, 1.25vw, 17px)',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.65,
              maxWidth: '620px',
              margin: '0 auto 36px auto',
            }}
          >
            Talk to our design team about your modular kitchen, master dressing suite, or complete residential interior.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/talk-to-us"
              onClick={(e) => navigate(e, '/talk-to-us')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '15px 32px',
                backgroundColor: '#FFFFFF',
                color: '#161514',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#B69A6B';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#161514';
              }}
            >
              BOOK A CONSULTATION
              <ArrowRight size={14} />
            </a>

            <a
              href="/showrooms"
              onClick={(e) => navigate(e, '/showrooms')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '15px 32px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#B69A6B';
                e.currentTarget.style.color = '#B69A6B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              VISIT A SHOWROOM
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN MULTI-COLUMN ARCHITECTURAL FOOTER
          ========================================================================= */}
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          paddingTop: 'clamp(60px, 8vw, 90px)',
          paddingBottom: 'clamp(40px, 5vw, 60px)',
          paddingLeft: 'clamp(20px, 5.5vw, 80px)',
          paddingRight: 'clamp(20px, 5.5vw, 80px)',
        }}
      >
        <div
          className="leoz-footer-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1.3fr',
            gap: 'clamp(32px, 4.5vw, 64px)',
            marginBottom: 'clamp(48px, 6vw, 72px)',
          }}
        >
          {/* COLUMN 01: BRAND IDENTITY & SOCIAL */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '18px' }}>
              <Logo variant="dark" showTagline={false} />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13.5px',
                color: 'rgba(250, 249, 246, 0.72)',
                lineHeight: 1.65,
                marginBottom: '24px',
                maxWidth: '340px',
              }}
            >
              Premium modular kitchens, wardrobes and complete residential interiors designed, engineered and crafted for modern architectural living.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a
                href="https://www.instagram.com/leoz.furniture"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LEOZ on Instagram"
                style={{ color: '#B69A6B', transition: 'transform 0.25s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Instagram size={19} />
              </a>
              <a
                href="https://www.linkedin.com/company/leozfurniture"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LEOZ on LinkedIn"
                style={{ color: '#B69A6B', transition: 'transform 0.25s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Linkedin size={19} />
              </a>
              <a
                href="https://www.facebook.com/leozfurniture"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LEOZ on Facebook"
                style={{ color: '#B69A6B', transition: 'transform 0.25s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Facebook size={19} />
              </a>
              <a
                href="https://www.youtube.com/@leozfurniture"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LEOZ on YouTube"
                style={{ color: '#B69A6B', transition: 'transform 0.25s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Youtube size={19} />
              </a>
            </div>
          </div>

          {/* COLUMN 02: EXPLORE */}
          <div className="leoz-footer-col">
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '15px',
                fontWeight: 400,
                color: '#FFFFFF',
                marginBottom: '18px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Explore
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {[
                { label: 'Kitchens', path: '/modular-kitchens' },
                { label: 'Wardrobes', path: '/modular-wardrobes' },
                { label: 'Interiors', path: '/projects' },
                { label: 'Projects & Case Studies', path: '/projects' },
                { label: 'Materials & Finishes', path: '/materials' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.path}
                    onClick={(e) => navigate(e, item.path)}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'rgba(250, 249, 246, 0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#B69A6B')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250, 249, 246, 0.7)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 03: LEOZ ECOSYSTEM */}
          <div className="leoz-footer-col">
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '15px',
                fontWeight: 400,
                color: '#FFFFFF',
                marginBottom: '18px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              LEOZ
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {[
                { label: 'Our Method', path: '/our-method' },
                { label: 'Factory & Infrastructure', path: '/factory' },
                { label: 'About LEOZ', path: '/about' },
                { label: 'Showrooms', path: '/showrooms' },
                { label: 'Franchise Opportunities', path: '/franchise-opportunities' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.path}
                    onClick={(e) => navigate(e, item.path)}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'rgba(250, 249, 246, 0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#B69A6B')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250, 249, 246, 0.7)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 04: CONTACT & SHOWROOMS */}
          <div className="leoz-footer-col">
            <h4
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '15px',
                fontWeight: 400,
                color: '#FFFFFF',
                marginBottom: '18px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Contact &amp; Studios
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', fontFamily: 'var(--font-body)', color: 'rgba(250,249,246,0.7)' }}>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block', fontSize: '12px', letterSpacing: '0.1em' }}>
                  AHMEDABAD FLAGSHIP
                </strong>
                <span style={{ fontSize: '12px' }}>Sindhu Bhavan Road / Bodakdev</span>
                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                  <a href="/showrooms" onClick={(e) => navigate(e, '/showrooms')} style={{ color: '#B69A6B', textDecoration: 'none', fontSize: '11px', fontWeight: 600 }}>
                    Visit Studio →
                  </a>
                  <a href="https://maps.google.com/?q=LEOZ+Cucine+Ahmedabad" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '11px' }}>
                    Get Directions
                  </a>
                </div>
              </div>

              <div>
                <strong style={{ color: '#FFFFFF', display: 'block', fontSize: '12px', letterSpacing: '0.1em' }}>
                  SURAT STUDIO
                </strong>
                <span style={{ fontSize: '12px' }}>Dumas Road &amp; VIP Road Junction, Vesu</span>
                <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                  <a href="/showrooms" onClick={(e) => navigate(e, '/showrooms')} style={{ color: '#B69A6B', textDecoration: 'none', fontSize: '11px', fontWeight: 600 }}>
                    Visit Studio →
                  </a>
                  <a href="https://maps.google.com/?q=LEOZ+Cucine+Surat" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '11px' }}>
                    Get Directions
                  </a>
                </div>
              </div>

              <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <a href="tel:+919313151559" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                  +91 93131 51559
                </a>
                <a href="mailto:director@leozartofambience.com" style={{ color: 'rgba(250,249,246,0.7)', textDecoration: 'none' }}>
                  director@leozartofambience.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FOOTER BOTTOM LEGAL & COPYRIGHT DIVIDER
            ========================================================================= */}
        <div
          style={{
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontFamily: 'var(--font-body)',
            fontSize: '11.5px',
            color: 'rgba(250, 249, 246, 0.5)',
          }}
        >
          <div>
            © {new Date().getFullYear()} LEOZ Cucine • 509, Sankalp Square 3B, Beside Taj Skyline, Sindhu Bhavan Road, Ahmedabad. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a
              href="/privacy-policy"
              onClick={(e) => navigate(e, '/privacy-policy')}
              style={{ color: 'rgba(250, 249, 246, 0.7)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B69A6B')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250, 249, 246, 0.7)')}
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a
              href="/contact"
              onClick={(e) => navigate(e, '/contact')}
              style={{ color: 'rgba(250, 249, 246, 0.7)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B69A6B')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250, 249, 246, 0.7)')}
            >
              Terms of Engagement
            </a>
            <span>•</span>
            <span>www.leozartofambience.com</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .leoz-footer-main-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 40px 24px !important;
          }
        }
        @media (max-width: 640px) {
          .leoz-footer-main-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
