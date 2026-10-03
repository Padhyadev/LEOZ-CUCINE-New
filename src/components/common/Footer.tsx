import React from 'react';

export const Footer: React.FC = () => {
  const footerColumns = [
    {
      title: 'Contacts',
      links: [
        { label: 'Contact us', path: '/contact' },
        { label: 'LEOZ customer service', path: '/contact' },
        { label: 'Download Brochure', path: '/contact' },
        { label: 'Materials & Finishes', path: '/modular-kitchens' },
        { label: 'Journal / Blog', path: '/about' },
      ],
    },
    {
      title: 'Corporate',
      links: [
        { label: 'The LEOZ Method', path: '/#process' },
        { label: 'Brand', path: '/about' },
        { label: 'Our 20+ Yrs History', path: '/about' },
        { label: 'LEOZ LAB & Factory', path: '/about' },
        { label: 'Production', path: '/about' },
        { label: 'LEOZ Experience', path: '/talk-to-us' },
        { label: 'Design Talk', path: '/talk-to-us' },
        { label: 'Franchise Network', path: '/franchise-opportunities' },
        { label: 'Work with us', path: '/contact' },
      ],
    },
    {
      title: 'Kitchens',
      links: [
        { label: 'Kitchen Collections', path: '/modular-kitchens' },
        { label: 'German-Engineered Series', path: '/modular-kitchens' },
        { label: 'Island Kitchens', path: '/modular-kitchens' },
        { label: 'Handleless Monolith', path: '/modular-kitchens' },
        { label: 'Matte & Gloss Finishes', path: '/modular-kitchens' },
        { label: 'Content Videos', path: '/modular-kitchens' },
      ],
    },
    {
      title: 'Wardrobes',
      links: [
        { label: 'Wardrobe Collections', path: '/modular-wardrobes' },
        { label: 'Walk-in Closets', path: '/modular-wardrobes' },
        { label: 'Glass Door Suites', path: '/modular-wardrobes' },
        { label: 'Sliding Wardrobes', path: '/modular-wardrobes' },
        { label: 'Internal Accessories', path: '/modular-wardrobes' },
        { label: 'Bespoke Dressing', path: '/modular-wardrobes' },
      ],
    },
    {
      title: 'Projects',
      links: [
        { label: 'Residential Villas', path: '/about' },
        { label: 'Luxury Apartments', path: '/about' },
        { label: 'Testimonials', path: '/about' },
        { label: 'Architect Collaborations', path: '/contact' },
      ],
    },
    {
      title: 'Showrooms',
      links: [
        { label: 'All Showrooms', path: '/contact' },
        { label: 'Ahmedabad Flagship', path: '/contact' },
        { label: 'Surat Experience Studio', path: '/contact' },
        { label: 'Virtual Design Lounge', path: '/contact' },
      ],
    },
  ];

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <footer
      id="contact"
      role="contentinfo"
      style={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        paddingTop: 'clamp(60px, 8vw, 100px)',
        paddingBottom: '40px',
        paddingLeft: '5.5vw',
        paddingRight: '5.5vw',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        {/* 6-Column RiFRA-Style Link Grid */}
        <div
          className="rifra-footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 'clamp(20px, 2.5vw, 40px)',
            marginBottom: 'clamp(50px, 6vw, 80px)',
          }}
        >
          {footerColumns.map((col) => (
            <div key={col.title} style={{ display: 'flex', flexDirection: 'column' }}>
              <h4
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  marginBottom: '18px',
                  letterSpacing: '0.02em',
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.path}
                      onClick={(e) => navigate(e, link.path)}
                      className="rifra-footer-link"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12.5px',
                        color: 'rgba(255, 255, 255, 0.65)',
                        textDecoration: 'none',
                        lineHeight: 1.5,
                        transition: 'color 0.25s ease',
                        display: 'inline-block',
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Networks Icons Strip (RiFRA Centered Style) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '40px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Facebook */}
          <a
            href="https://www.facebook.com/leozfurniture"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="rifra-footer-social"
            style={{ color: '#FFFFFF', opacity: 0.8, transition: 'all 0.3s ease' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.593 0 9 1.582 9 4.615V8z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/leoz.furniture"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rifra-footer-social"
            style={{ color: '#FFFFFF', opacity: 0.8, transition: 'all 0.3s ease' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@leozfurniture"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="rifra-footer-social"
            style={{ color: '#FFFFFF', opacity: 0.8, transition: 'all 0.3s ease' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/leozfurniture"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rifra-footer-social"
            style={{ color: '#FFFFFF', opacity: 0.8, transition: 'all 0.3s ease' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>

        {/* Bottom Legal & Copyright Bar (RiFRA Exact Styling) */}
        <div
          className="rifra-footer-bottom-bar"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            fontFamily: 'var(--font-body)',
            fontSize: '11.5px',
            color: 'rgba(255, 255, 255, 0.45)',
          }}
        >
          <p style={{ margin: 0 }}>
            LEOZ Cucine • 509, Sankalp Square 3B, Beside Taj Skyline, Sindhu Bhavan Road, Thaltej, Ahmedabad – 380059 — +91 98250 22616
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href="/privacy-policy"
              onClick={(e) => navigate(e, '/privacy-policy')}
              style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}
              className="rifra-footer-link"
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a
              href="https://www.leozartofambience.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255, 255, 255, 0.65)', textDecoration: 'none' }}
              className="rifra-footer-link"
            >
              www.leozartofambience.com
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .rifra-footer-link:hover {
          color: #B69A6B !important;
          text-decoration: underline !important;
        }
        .rifra-footer-social:hover {
          color: #B69A6B !important;
          opacity: 1 !important;
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .rifra-footer-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 36px 24px !important;
          }
        }
        @media (max-width: 600px) {
          .rifra-footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 32px 16px !important;
          }
          .rifra-footer-bottom-bar {
            flex-direction: column !important;
            text-align: center !important;
            align-items: center !important;
          }
        }
      `}</style>
    </footer>
  );
};
