import React, { useState, useEffect, Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const ModularKitchens = lazy(() => import('./pages/ModularKitchens'));
const ModularWardrobes = lazy(() => import('./pages/ModularWardrobes'));
const BookConsultation = lazy(() => import('./pages/BookConsultation'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FranchiseEnquiry = lazy(() => import('./pages/FranchiseEnquiry'));
const FranchiseOpportunities = lazy(() => import('./pages/FranchiseOpportunities'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

import { CinematicPageTransition } from './components/common/CinematicPageTransition';
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

    if (currentPath === '/privacy-policy') {
      return <PrivacyPolicy />;
    }

    return <Home />;
  };

  return (
    <LenisProvider>
      <Analytics />
      <CinematicPageTransition>
        <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F5F1' }}></div>}>
          {renderPage()}
        </Suspense>
      </CinematicPageTransition>
      <MobileActionBar />
    </LenisProvider>
  );
};

export default App;
