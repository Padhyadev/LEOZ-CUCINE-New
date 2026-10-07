import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { LeozEmblem } from '../components/common/LeozEmblem';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ArrowLeft, Compass } from 'lucide-react';

/* Easing curve for luxury architectural motion */
const luxuryEase = [0.16, 1, 0.3, 1];

export const NotFound: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Page Not Found (404) | LEOZ Cucine — Architectural Living',
    'The space you requested does not exist. Explore our bespoke modular kitchens, wardrobes, and residential projects.'
  );

  const navigate = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div style={{ backgroundColor: '#0F0E0D', color: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main
        id="main-content"
        style={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 'clamp(100px, 14vw, 160px)',
          paddingBottom: 'clamp(80px, 12vw, 140px)',
          paddingLeft: 'clamp(20px, 5.5vw, 80px)',
          paddingRight: 'clamp(20px, 5.5vw, 80px)',
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
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
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
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(182, 154, 107, 0.07) 0%, rgba(15, 14, 13, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '680px',
            width: '100%',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Animated Geometric Architectural Lion Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: luxuryEase }}
            style={{ marginBottom: 'clamp(24px, 4vw, 36px)' }}
          >
            <LeozEmblem size={100} animate={true} color="#B69A6B" />
          </motion.div>

          {/* 404 Small Badge */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: luxuryEase }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#B69A6B',
              marginBottom: '16px',
              display: 'block',
            }}
          >
            ERROR 404 • ARCHITECTURAL VOID
          </motion.span>

          {/* Large Typography: "THIS SPACE DOESN'T EXIST." */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: luxuryEase }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(38px, 6vw, 68px)',
              fontWeight: 300,
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
              margin: '0 0 16px 0',
              textTransform: 'uppercase',
            }}
          >
            This Space
            <br />
            Doesn't Exist.
          </motion.h1>

          {/* Small Subline: "But we can design one." */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: luxuryEase }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              color: 'rgba(255, 255, 255, 0.75)',
              margin: '0 0 clamp(32px, 5vw, 44px) 0',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            But we can design one.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: luxuryEase }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <a
              href="/"
              onClick={(e) => navigate(e, '/')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px 28px',
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
              <ArrowLeft size={14} />
              BACK HOME
            </a>

            <a
              href="/projects"
              onClick={(e) => navigate(e, '/projects')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px 28px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.25)',
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
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              <Compass size={14} />
              EXPLORE PROJECTS
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
