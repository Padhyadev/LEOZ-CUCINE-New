import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ==========================================================================
   LEOZ CUCINE — ParallaxImage
   Wraps large editorial images with a scroll-linked vertical parallax.

   Usage (inside an overflow:hidden container):
     <div style={{ overflow: 'hidden', height: '500px', position: 'relative' }}>
       <ParallaxImage yOffset={50}>
         <img loading="lazy" src={...} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
       </ParallaxImage>
     </div>

   How it works:
   - Positions itself to fill the parent (position: absolute; inset: 0)
   - Extends its motion div yOffset px beyond the parent in each direction
   - Scroll progress drives a translateY range from -yOffset → +yOffset
   - Parent overflow:hidden clips the extension, creating the parallax illusion
   - GPU-only: animates transform only (no layout properties)
   ========================================================================== */

interface ParallaxImageProps {
  children: React.ReactNode;
  /** Max pixel displacement in each direction. Default 50px → ~8–10% on typical sections */
  yOffset?: number;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  children,
  yOffset = 50,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // As element enters viewport from bottom (progress=0): y = -yOffset (image slightly high)
  // As element exits viewport from top (progress=1): y = +yOffset (image slightly low)
  // Net effect: image moves yOffset*2 px downward relative to content → parallax depth
  const y = useTransform(scrollYProgress, [0, 1], [-yOffset, yOffset]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
      }}
    >
      <motion.div
        style={{
          y,
          position: 'absolute',
          /* Extend image yOffset px beyond container in each direction
             so parallax movement never reveals empty space */
          top: -yOffset,
          left: 0,
          right: 0,
          bottom: -yOffset,
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
