import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { PHONE_SALES_HREF, buildWhatsAppHref } from '../../constants/siteInfo';

const WHATSAPP_HREF = buildWhatsAppHref("Hi LEOZ Cucine, I’d like to know more about your modular kitchens.");

export const MobileActionBar: React.FC = () => {
  return (
    <div
      className="mobile-action-bar"
      role="navigation"
      aria-label="Quick contact"
      style={{
        display: 'none',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 900,
        backgroundColor: 'var(--color-dark-bg)',
        borderTop: '1px solid rgba(182, 154, 107, 0.25)',
      }}
    >
      <a
        href={PHONE_SALES_HREF}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          minHeight: '56px',
          fontFamily: 'var(--font-family-sans)',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
        }}
      >
        <Phone size={18} strokeWidth={1.75} />
        Call
      </a>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          minHeight: '56px',
          fontFamily: 'var(--font-family-sans)',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--color-accent-gold)',
          borderLeft: '1px solid rgba(182, 154, 107, 0.25)',
        }}
      >
        <MessageCircle size={18} strokeWidth={1.75} />
        WhatsApp
      </a>

      <style>{`
        @media (max-width: 767px) {
          .mobile-action-bar {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileActionBar;
