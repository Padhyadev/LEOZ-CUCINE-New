import { RefObject, useLayoutEffect } from 'react';
import { gsap, MEDIA, SplitText } from './gsap';
import { SCROLL_CONFIG } from './config';

/* ==========================================================================
   Hero motion, shared by any full-bleed hero. Elements opt in with data
   attributes, so the hero markup and content stay exactly as they are:

     data-hero-media      background image/video layer
     data-hero-content    the text block (rises faster + fades on scroll)
     data-hero-indicator  scroll cue (fades on first scroll)
     data-hero="eyebrow" | "title" | "rule" | "text" | "ctas"
                          intro sequence parts; "title" reveals line by
                          line, "ctas" staggers its children
   ========================================================================== */

/* ---------- On-load intro ---------- */

export interface HeroIntroOptions {
  /** false while something covers the hero (e.g. the preloader); the intro
      holds its hidden start state and plays once this turns true */
  ready?: boolean;
}

export function useHeroIntro<T extends HTMLElement>(scopeRef: RefObject<T>, { ready = true }: HeroIntroOptions = {}) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    const { introDelay, introStep } = SCROLL_CONFIG.hero;
    const { distance, duration, stagger } = SCROLL_CONFIG.reveal;
    const part = (name: string) => scope.querySelector<HTMLElement>(`[data-hero="${name}"]`);

    const build = (lines: Element[] | null) => {
      const tl = gsap.timeline({ paused: !ready, delay: introDelay });
      const fadeUp = { opacity: 0, y: distance / 2, duration, clearProps: 'transform,opacity' };
      const eyebrow = part('eyebrow');
      const title = part('title');
      const rule = part('rule');
      const text = part('text');
      const ctas = part('ctas');

      if (eyebrow) tl.from(eyebrow, fadeUp, 0);
      if (lines?.length) {
        tl.from(lines, { yPercent: 110, duration: SCROLL_CONFIG.lines.duration, stagger: SCROLL_CONFIG.lines.stagger }, introStep);
      } else if (title) {
        tl.from(title, fadeUp, introStep);
      }
      if (rule) tl.from(rule, { scaleX: 0, duration, clearProps: 'transform' }, introStep * 3);
      if (text) tl.from(text, fadeUp, introStep * 3);
      if (ctas?.children.length) tl.from(ctas.children, { ...fadeUp, stagger }, introStep * 4);
      return tl;
    };

    const mm = gsap.matchMedia(scope);
    mm.add(MEDIA.motion, () => {
      const title = part('title');
      if (title) {
        /* The timeline is rebuilt by SplitText whenever the lines re-flow
           (font load, resize) so line breaks always match the layout. */
        SplitText.create(title, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'lz-line',
          autoSplit: true,
          onSplit: (self) => build(self.lines),
        });
      } else {
        build(null);
      }
    });
    return () => mm.revert();
  }, [scopeRef, ready]);
}

/* ---------- Scroll-away parallax ---------- */

export function useHeroScroll<T extends HTMLElement>(sectionRef: RefObject<T>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { bgScale, bgYPercent, contentY, indicatorFade } = SCROLL_CONFIG.hero;
    const media = section.querySelector<HTMLElement>('[data-hero-media]');
    const content = section.querySelector<HTMLElement>('[data-hero-content]');
    const indicator = section.querySelector<HTMLElement>('[data-hero-indicator]');
    const away = { trigger: section, start: 'top top', end: 'bottom top', scrub: true };

    const mm = gsap.matchMedia(section);

    /* Desktop: background scales and lags behind, content rises faster and fades */
    mm.add(MEDIA.desktopMotion, () => {
      if (media) gsap.to(media, { scale: bgScale, yPercent: bgYPercent, ease: 'none', scrollTrigger: away });
      if (content) gsap.to(content, { y: contentY, opacity: 0, ease: 'none', scrollTrigger: away });
    });

    /* All sizes: the scroll cue fades as soon as scrolling starts */
    mm.add(MEDIA.motion, () => {
      if (indicator) {
        gsap.to(indicator, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: `+=${indicatorFade}`, scrub: true },
        });
      }
    });

    return () => mm.revert();
  }, [sectionRef]);
}
