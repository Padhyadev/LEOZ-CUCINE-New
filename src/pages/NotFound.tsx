import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ArrowRight, Home as HomeIcon } from 'lucide-react';

const luxuryEase = [0.16, 1, 0.3, 1];

export const NotFound: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Page Not Found (404) | LEOZ Cucine — Architectural Living',
    'The space you are looking for does not exist. Return to LEOZ Cucine home.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#1A1B18', color: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main
        id="main-content"
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 'clamp(120px, 14vw, 180px)',
          paddingBottom: 'clamp(80px, 10vw, 120px)',
          paddingLeft: 'clamp(20px, 5vw, 80px)',
          paddingRight: 'clamp(20px, 5vw, 80px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Architectural Blueprint Grid Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: 0.8,
            pointerEvents: 'none',
          }}
        />

        {/* Ambient Radial Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px',
            height: '700px',
            background: 'radial-gradient(circle, rgba(165, 139, 98, 0.08) 0%, rgba(26, 27, 24, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '780px',
            width: '100%',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Subtle Architectural Luxury Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 24px',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              backgroundColor: 'rgba(212, 175, 55, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '2px',
              marginBottom: '28px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                letterSpacing: '0.18em',
                color: '#D4AF37',
                fontWeight: 300,
                lineHeight: 1,
              }}
            >
              404
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: luxuryEase }}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              marginBottom: '14px',
            }}
          >
            ARCHITECTURAL VOID
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: luxuryEase }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 4.2vw, 48px)',
              fontWeight: 300,
              lineHeight: 1.18,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              margin: '0 0 16px 0',
            }}
          >
            The Space You're Looking For
            <br />
            Doesn't Exist.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: luxuryEase }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(13.5px, 1.1vw, 15.5px)',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.65,
              maxWidth: '520px',
              margin: '0 auto 32px auto',
            }}
          >
            The page may have been relocated or updated as part of our ongoing bespoke architectural collections.
          </motion.p>

          {/* Quick Nav Shortcut Cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: luxuryEase }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              width: '100%',
              maxWidth: '640px',
              marginBottom: '32px',
            }}
          >
            <a
              href="/modular-kitchens"
              onClick={(e) => navigate(e, '/modular-kitchens')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '2px',
                textDecoration: 'none',
                color: '#FFFFFF',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em' }}>
                Modular Kitchens
              </span>
              <ArrowRight size={13} color="#D4AF37" />
            </a>

            <a
              href="/modular-wardrobes"
              onClick={(e) => navigate(e, '/modular-wardrobes')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '2px',
                textDecoration: 'none',
                color: '#FFFFFF',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em' }}>
                Modular Wardrobes
              </span>
              <ArrowRight size={13} color="#D4AF37" />
            </a>

            <a
              href="/projects"
              onClick={(e) => navigate(e, '/projects')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '2px',
                textDecoration: 'none',
                color: '#FFFFFF',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.06em' }}>
                Signature Projects
              </span>
              <ArrowRight size={13} color="#D4AF37" />
            </a>
          </motion.div>

          {/* Primary CTA: RETURN HOME */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: luxuryEase }}
          >
            <a
              href="/"
              onClick={(e) => navigate(e, '/')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                backgroundColor: '#A58B62',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: '11.5px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '2px',
                border: '1px solid #A58B62',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8C744F';
                e.currentTarget.style.borderColor = '#8C744F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#A58B62';
                e.currentTarget.style.borderColor = '#A58B62';
              }}
            >
              <HomeIcon size={14} />
              <span>Return Home</span>
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
