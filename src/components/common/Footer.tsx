import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { Phone, Mail, Globe, MapPin, Clock, Instagram, Linkedin, Facebook, Youtube, ChevronDown } from 'lucide-react';
import {
  EMAIL,
  EMAIL_HREF,
  PHONE_SALES_DISPLAY,
  PHONE_SALES_HREF,
  SOCIAL_LINKS,
  WEBSITE_URL,
} from '../../constants/siteInfo';
import './Footer.css';

const MOBILE_QUERY = '(max-width: 640px)';

// Typography is carried over verbatim from the previous footer.
const headingType: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
};

const linkType: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '13.5px',
};

const navigationLinks = [
  { label: 'Home', path: '/' },
  { label: 'Kitchens', path: '/modular-kitchens' },
  { label: 'Wardrobes', path: '/modular-wardrobes' },
  { label: 'About', path: '/about' },
  { label: 'Craftsmanship', path: '/factory' },
  { label: 'Consultation', path: '/talk-to-us' },
  { label: 'Franchise Enquiry', path: '/franchise-enquiry' },
  { label: 'Contact', path: '/contact' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
];

const socialLinks = [
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, Icon: Instagram },
  { label: 'LinkedIn', href: SOCIAL_LINKS.linkedin, Icon: Linkedin },
  { label: 'Facebook', href: SOCIAL_LINKS.facebook, Icon: Facebook },
  { label: 'YouTube', href: SOCIAL_LINKS.youtube, Icon: Youtube },
];

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handleChange = () => setIsMobile(mql.matches);
    handleChange();
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
};

interface LinkGroupProps {
  id: string;
  title: string;
  links: { label: string; path: string }[];
  isMobile: boolean;
  onNavigate: (e: React.MouseEvent, path: string) => void;
}

const LinkGroup: React.FC<LinkGroupProps> = ({ id, title, links, isMobile, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `${id}-panel`;

  const list = (
    <ul className="lz-footer__list">
      {links.map((item) => (
        <li key={item.label}>
          <a
            href={item.path}
            onClick={(e) => onNavigate(e, item.path)}
            className="lz-footer__link"
            style={linkType}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  if (!isMobile) {
    return (
      <div>
        <div role="heading" aria-level={2} className="lz-footer__heading" style={headingType}>
          {title}
        </div>
        {list}
      </div>
    );
  }

  return (
    <div className="lz-footer__col--acc">
      <div role="heading" aria-level={2}>
        <button
          type="button"
          className="lz-acc__toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span style={headingType}>{title}</span>
          <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <div id={panelId} className={`lz-acc__panel ${isOpen ? 'is-open' : ''}`}>
        <div className="lz-acc__inner">{list}</div>
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  const isMobile = useIsMobile();

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="global-footer" role="contentinfo" className="lz-footer">
      <div className="lz-footer__main">
        <div className="lz-footer__grid">
          {/* Column 1: Brand, tagline & social */}
          <div className="lz-footer__col--brand">
            <Logo variant="light" showTagline={false} />
            <p
              className="lz-footer__tagline"
              style={{ fontFamily: 'var(--font-body)', fontSize: '14px', lineHeight: 1.65 }}
            >
              Bespoke kitchens and wardrobes, designed with care and precision-manufactured in Gujarat.
            </p>

            <div className="lz-social">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="lz-social__link"
                >
                  <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <LinkGroup
            id="footer-navigation"
            title="Navigation"
            links={navigationLinks}
            isMobile={isMobile}
            onNavigate={navigate}
          />

          {/* Column 3: Get in touch */}
          <div className="lz-footer__col--contact">
            <div role="heading" aria-level={2} className="lz-footer__heading" style={headingType}>
              Get in Touch
            </div>

            <ul className="lz-footer__list">
              <li>
                <a
                  href={PHONE_SALES_HREF}
                  className="lz-footer__link lz-footer__link--strong"
                  style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500 }}
                >
                  <Phone size={15} aria-hidden="true" />
                  <span>{PHONE_SALES_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href={EMAIL_HREF} className="lz-footer__link" style={linkType}>
                  <Mail size={15} aria-hidden="true" />
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href={WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lz-footer__link"
                  style={linkType}
                >
                  <Globe size={15} aria-hidden="true" />
                  <span>www.leozartofambience.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Ahmedabad showroom */}
          <div className="lz-footer__col--contact">
            <div role="heading" aria-level={2} className="lz-footer__heading" style={headingType}>
              Ahmedabad Showroom
            </div>

            <address className="lz-footer__info" style={{ ...linkType, lineHeight: 1.6 }}>
              <MapPin size={15} className="lz-footer__icon" aria-hidden="true" />
              <span>509, Sankalp Square 3B, Beside Taj Skyline, Sindhu Bhavan Road, Thaltej, Ahmedabad – 380059.</span>
            </address>

            <div className="lz-footer__info" style={{ ...linkType, lineHeight: 1.6 }}>
              <Clock size={15} className="lz-footer__icon" aria-hidden="true" />
              <span>Working hours: 10:00 AM – 7:00 PM</span>
            </div>

            <a
              href={SOCIAL_LINKS.officeMap}
              target="_blank"
              rel="noopener noreferrer"
              className="lz-footer__link"
              style={{ fontFamily: 'var(--font-body)', fontSize: '12.5px', fontWeight: 600, color: 'var(--gold)' }}
            >
              <span>View on Google Maps</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="lz-footer__bar">
        <div className="lz-footer__bar-inner" style={{ fontFamily: 'var(--font-body)', fontSize: '12px' }}>
          <div>© {new Date().getFullYear()} LEOZ Cucine. All rights reserved.</div>

          <div className="lz-footer__legal">
            <a href="/privacy-policy" onClick={(e) => navigate(e, '/privacy-policy')}>
              Privacy Policy
            </a>
            <span className="lz-footer__dot" aria-hidden="true">•</span>
            <span>Precision Manufacturing in Gujarat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
