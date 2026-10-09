import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { PHONE_SALES_HREF, buildWhatsAppHref } from '../../constants/siteInfo';

const WHATSAPP_HREF = buildWhatsAppHref("Hi LEOZ Cucine, I’d like to explore your modular kitchens & wardrobes.");

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
        zIndex: 9999,
        backgroundColor: '#292621',
        borderTop: '1px solid rgba(255, 252, 246, 0.12)',
        boxShadow: '0 -8px 28px rgba(41, 38, 33, 0.35)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* CALL BUTTON */}
      <a
        href={PHONE_SALES_HREF}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          minHeight: '54px',
          fontFamily: 'var(--font-family-sans, sans-serif)',
          fontSize: '12.5px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#FFFCF6',
          backgroundColor: '#292621',
          textDecoration: 'none',
          transition: 'background-color 0.2s ease',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 252, 246, 0.12)',
            color: '#FFFCF6',
          }}
        >
          <Phone size={13} strokeWidth={2.2} />
        </span>
        <span>CALL NOW</span>
      </a>

      {/* SEPARATOR */}
      <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255, 252, 246, 0.15)', alignSelf: 'center' }} />

      {/* WHATSAPP BUTTON (Recognizable green accent) */}
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          minHeight: '54px',
          fontFamily: 'var(--font-family-sans, sans-serif)',
          fontSize: '12.5px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          backgroundColor: '#201E1A',
          textDecoration: 'none',
          transition: 'background-color 0.2s ease',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#25D366',
            color: '#FFFFFF',
            boxShadow: '0 2px 8px rgba(37, 211, 102, 0.35)',
          }}
        >
          <MessageSquare size={13} strokeWidth={2.2} />
        </span>
        <span>WHATSAPP</span>
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
