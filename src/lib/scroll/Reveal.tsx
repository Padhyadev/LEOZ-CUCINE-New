import React, { useRef } from 'react';
import { useReveal, RevealOptions } from './useReveal';
import { useLineReveal, LineRevealOptions } from './useLineReveal';
import { useImageReveal, ImageRevealOptions } from './useImageReveal';

/* ==========================================================================
   Component wrappers around the scroll hooks
   ========================================================================== */

type RevealProps = Omit<RevealOptions, 'targets'> & {
  className?: string;
  /** Reveal each direct child in sequence instead of the block as one */
  staggerChildren?: boolean;
  children: React.ReactNode;
};

/** Block that fades up when scrolled into view */
export const Reveal: React.FC<RevealProps> = ({ className, staggerChildren = false, children, ...options }) => {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, { ...options, targets: staggerChildren ? ':scope > *' : undefined });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

type LineRevealProps = LineRevealOptions & {
  as?: 'h1' | 'h2' | 'h3' | 'p';
  id?: string;
  className?: string;
  children: React.ReactNode;
};

/** Heading whose lines slide up one by one from behind a mask */
export const LineReveal: React.FC<LineRevealProps> = ({ as: Tag = 'h2', id, className, children, ...options }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  useLineReveal(ref, options);
  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
};

type ImageFrameProps = ImageRevealOptions & {
  className?: string;
  children: React.ReactNode;
};

/** Overflow-hidden frame whose image clip-reveals and drifts with parallax */
export const ImageFrame: React.FC<ImageFrameProps> = ({ className, parallax, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useImageReveal(ref, { parallax });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
