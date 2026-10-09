import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './components/common/Logo';

const Home = lazy(() => import('./pages/Home'));
const ModularKitchens = lazy(() => import('./pages/ModularKitchens'));
const ModularWardrobes = lazy(() => import('./pages/ModularWardrobes'));
const BookConsultation = lazy(() => import('./pages/BookConsultation'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FranchiseEnquiry = lazy(() => import('./pages/FranchiseEnquiry'));
const FranchiseOpportunities = lazy(() => import('./pages/FranchiseOpportunities'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectCaseStudy = lazy(() => import('./pages/ProjectCaseStudy'));
const OurMethod = lazy(() => import('./pages/OurMethod'));
const FactoryInfrastructure = lazy(() => import('./pages/FactoryInfrastructure'));
const Showrooms = lazy(() => import('./pages/Showrooms'));
const MaterialsFinishes = lazy(() => import('./pages/MaterialsFinishes'));
const NotFound = lazy(() => import('./pages/NotFound'));


import { LenisProvider } from './providers/LenisProvider';
import { MobileActionBar } from './components/common/MobileActionBar';
import { Analytics } from './components/common/Analytics';


export const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    const interval = setInterval(() => {
      if (window.location.pathname !== currentPath) {
        setCurrentPath(window.location.pathname);
      }
    }, 100);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      clearInterval(interval);
    };
  }, [currentPath]);

  const renderPage = () => {
    if (currentPath === '/modular-kitchens') {
      return <ModularKitchens />;
    }

    if (currentPath === '/modular-wardrobes') {
      return <ModularWardrobes />;
    }

    if (currentPath === '/about') {
      return <About />;
    }

    if (currentPath === '/contact') {
      return <Contact />;
    }

    if (currentPath === '/franchise-enquiry') {
      return <FranchiseEnquiry />;
    }

    if (currentPath === '/franchise-opportunities') {
      return <FranchiseOpportunities />;
    }

    if (currentPath === '/talk-to-us') {
      return <BookConsultation />;
    }

    if (currentPath === '/projects' || currentPath === '/portfolio') {
      return <Projects />;
    }

    if (currentPath === '/case-study' || currentPath === '/project-case-study' || currentPath.startsWith('/projects/')) {
      return <ProjectCaseStudy />;
    }

    if (currentPath === '/our-method' || currentPath === '/method') {
      return <OurMethod />;
    }

    if (currentPath === '/factory' || currentPath === '/infrastructure' || currentPath === '/factory-infrastructure') {
      return <FactoryInfrastructure />;
    }

    if (currentPath === '/showrooms' || currentPath === '/experience-studios' || currentPath === '/studios') {
      return <Showrooms />;
    }

    if (currentPath === '/materials' || currentPath === '/finishes' || currentPath === '/materials-finishes') {
      return <MaterialsFinishes />;
    }

    if (currentPath === '/privacy-policy') {
      return <PrivacyPolicy />;
    }

    if (currentPath === '/' || currentPath === '') {
      return <Home />;
    }

    if (currentPath === '/404') {
      return <NotFound />;
    }

    return <NotFound />;
  };

  return (
    <LenisProvider>
      <Analytics />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={currentPath} style={{ width: '100%', height: '100%' }}>
          <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F5F1' }}></div>}>
            {renderPage()}
          </Suspense>

          {/* Left Door */}
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '-100%' }}
            exit={{ x: '0%' }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: 0,
              width: '50vw',
              backgroundColor: '#3B2F25',
              zIndex: 99999,
              borderRight: '1px solid rgba(201,154,91,0.2)',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translate(50%, -50%)', width: '260px', display: 'flex', justifyContent: 'center' }}>
              <Logo variant="dark" showTagline={false} />
            </div>
          </motion.div>
          
          {/* Right Door */}
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '100%' }}
            exit={{ x: '0%' }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              right: 0,
              width: '50vw',
              backgroundColor: '#3B2F25',
              zIndex: 99999,
              borderLeft: '1px solid rgba(201,154,91,0.2)',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: '50%', left: 0, transform: 'translate(-50%, -50%)', width: '260px', display: 'flex', justifyContent: 'center' }}>
              <Logo variant="dark" showTagline={false} />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <MobileActionBar />
    </LenisProvider>
  );
};

export default App;
