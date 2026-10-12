/* ==========================================================================
   LEOZ — scroll & motion configuration
   Every value that shapes the feel of the scroll experience lives here, so
   the whole site can be made calmer or livelier from one place.
   ========================================================================== */

export const SCROLL_CONFIG = {
  /* ---------- Easing ---------- */
  /** Main ease for every reveal — GSAP name for cubic-bezier(0.22, 1, 0.36, 1) */
  ease: 'power3.out',

  /* ---------- Smooth scroll (Lenis) ---------- */
  lenis: {
    /** Seconds a wheel scroll takes to settle; higher = heavier, slower */
    duration: 1.2,
    wheelMultiplier: 1,
  },

  /* ---------- Reveal (headings, paragraphs, buttons, cards) ---------- */
  reveal: {
    /** Vertical travel in px as an element fades up */
    distance: 40,
    duration: 1,
    /** Delay between siblings revealing together */
    stagger: 0.1,
    /** Cap (s) on the total stagger of one batch, so big groups never lag */
    maxStaggerTotal: 0.6,
    /** ScrollTrigger start — element top reaches 85% of the viewport (play-once mode) */
    start: 'top 85%',
    /** true: reveals replay every time content enters the screen — rising from
        below when scrolling down, dropping in from above when scrolling up.
        false: each reveal plays once, on the way down only. */
    replay: true,
    /** Replay mode: reveal as the element's top passes this line… */
    replayStart: 'top 92%',
    /** …and (scrolling up) as its bottom comes back past this line */
    replayEnd: 'bottom 8%',
  },

  /* ---------- Heading line-by-line mask reveal ---------- */
  lines: {
    duration: 1.1,
    stagger: 0.12,
  },

  /* ---------- Image reveal ---------- */
  image: {
    /** Starting clip inset, in % from every edge */
    clipInset: 8,
    /** Starting scale, settling to 1 */
    scaleFrom: 1.15,
    duration: 1.4,
  },

  /* ---------- Parallax ---------- */
  parallax: {
    /** How far (in % of its own height) an image drifts while crossing the screen */
    imageYPercent: 10,
  },

  /* ---------- Count-up numbers ---------- */
  countUp: {
    duration: 1.8,
    /** ScrollTrigger start — fires once 60% of the number is inside the viewport */
    start: 'top+=60% bottom',
  },

  /* ---------- Hero ---------- */
  hero: {
    /** Seconds before the on-load intro starts */
    introDelay: 0.15,
    /** Gap between intro steps (eyebrow → headline → rule → text → buttons) */
    introStep: 0.18,
    /** Background scale at the moment the hero leaves the screen */
    bgScale: 1.12,
    /** Background drift (% of its height) — it lags behind the page */
    bgYPercent: 15,
    /** Content rises this many px while the hero scrolls away (faster than the page) */
    contentY: -140,
    /** Scroll distance (px) over which the scroll indicator fades out */
    indicatorFade: 120,
  },

  /* ---------- Home: Our Collections ---------- */
  collections: {
    /** Desktop: the second card sits this many px lower… */
    offsetY: 80,
    /** …and drifts this many px (total) while crossing the screen */
    driftY: 60,
  },

  /* ---------- Home: The LEOZ Journey ---------- */
  journey: {
    /** Desktop: pinned scroll distance (px) per step */
    scrollPerStep: 110,
  },

  /* ---------- Side entrances (split layouts) ---------- */
  slide: {
    /** Horizontal travel in px for blocks entering from the side (desktop;
        mobile falls back to the normal fade-up) */
    distance: 80,
  },

  /* ---------- Home: For Design Professionals ---------- */
  pros: {
    /** Total vertical drift (px) of the text panel while crossing the screen (desktop) */
    panelDriftY: 50,
  },

  /* ---------- Final CTA ---------- */
  finalCta: {
    /** Background scale as the section starts entering; settles to 1 */
    bgScaleFrom: 1.15,
    /** Delay (s) before the paragraph and button follow the heading lines */
    contentDelay: 0.45,
  },

  /* ---------- Lists with divider lines ---------- */
  lists: {
    /** Delay (s) after an item starts rising before its divider draws */
    lineDelay: 0.2,
  },

  /* ---------- Magnetic buttons (desktop, fine pointer only) ---------- */
  magnetic: {
    /** Maximum drift toward the cursor in px */
    max: 8,
    /** Fraction of the cursor's distance from centre followed on each axis */
    strengthX: 0.2,
    strengthY: 0.35,
    /** Seconds to settle on the cursor / spring back */
    duration: 0.5,
  },

  /* ---------- Header ---------- */
  header: {
    /** Scroll distance (px) before the header turns solid and slim */
    solidAfter: 80,
    /** true: header slides away on scroll-down and returns on scroll-up.
        false: header always stays visible. */
    hideOnScroll: false,
    /** Below this scroll position the header never hides (when hideOnScroll is on) */
    hideAfter: 240,
    /** Ignore scroll jitters smaller than this (px) when detecting direction */
    directionTolerance: 6,
  },

  /* ---------- Section colour transitions ---------- */
  transitions: {
    /** Height in px of the soft gradient overlap between adjacent light sections */
    seamHeight: 64,
  },

  /* ---------- Back-to-top button ---------- */
  backToTop: {
    /** Scroll distance (px) before the button appears */
    showAfter: 600,
  },

  /* ---------- Breakpoints ---------- */
  /** Under this width: no pinning, no heavy parallax, simple reveals only */
  mobileMaxWidth: 767,
} as const;

export type ScrollConfig = typeof SCROLL_CONFIG;
