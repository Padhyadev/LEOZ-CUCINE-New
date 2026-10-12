import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSmoothScroll } from '../../lib/scroll/SmoothScroll';
import { SCROLL_CONFIG } from '../../lib/scroll/config';
import './BackToTop.css';

/* ==========================================================================
   Floating "back to top" button. Appears after a short scroll, glides to
   the top through the shared smooth scroll (instant for reduced motion),
   and sits above the mobile Call / WhatsApp bar on small screens.
   ========================================================================== */

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_CONFIG.backToTop.showAfter);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    scrollTo(0);
    /* Keyboard activation (detail 0): continue tabbing from the top of the page */
    if (e.detail === 0) {
      document.querySelector<HTMLElement>('.lz-header a')?.focus({ preventScroll: true });
    }
  };

  return (
    <button
      type="button"
      className={`lz-to-top ${visible ? 'is-visible' : ''}`}
      onClick={handleClick}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <ArrowUp size={18} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
};

export default BackToTop;
