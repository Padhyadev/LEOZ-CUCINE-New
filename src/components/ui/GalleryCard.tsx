import React from 'react';

export interface GalleryCardProps {
  image: string;
  name: string;
  city?: string;
  finish?: string;
  onClick?: () => void;
  aspectRatio?: '1/1' | '4/5' | '16/9' | '4/3';
}

const aspectRatioMap = {
  '1/1': '1 / 1',
  '4/5': '4 / 5',
  '16/9': '16 / 9',
  '4/3': '4 / 3',
};

export const GalleryCard: React.FC<GalleryCardProps> = ({
  image,
  name,
  city,
  finish,
  onClick,
  aspectRatio = '1/1',
}) => {
  return (
    <div
      onClick={onClick}
      className="leoz-gallery-card"
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'var(--color-dark-surface)',
        border: '1px solid rgba(182, 154, 107, 0.15)',
        transition: 'transform var(--motion-duration-fast) var(--motion-ease-luxury)',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: aspectRatioMap[aspectRatio] || '1 / 1',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img loading="lazy"
          src={image}
          alt={name}
          className="leoz-gallery-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform var(--motion-duration-slow) var(--motion-ease-luxury)',
          }}
        />

        <div
          className="leoz-gallery-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(24,24,24,0.92) 0%, rgba(24,24,24,0.3) 50%, rgba(24,24,24,0) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '20px',
            opacity: 0.9,
            transition: 'opacity var(--motion-duration-fast) ease',
          }}
        >
          {city && (
            <span
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-gold)',
                marginBottom: '4px',
              }}
            >
              {city}
            </span>
          )}
          <h4
            style={{
              fontFamily: 'var(--font-family-serif)',
              fontSize: '18px',
              fontWeight: 500,
              color: '#FFFFFF',
              margin: '0 0 4px 0',
            }}
          >
            {name}
          </h4>
          {finish && (
            <p
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: '11px',
                fontWeight: 300,
                color: 'var(--color-text-secondary)',
                margin: 0,
              }}
            >
              {finish}
            </p>
          )}
        </div>
      </div>

      <style>{`
        .leoz-gallery-card:hover {
          transform: translateY(-4px);
        }
        .leoz-gallery-card:hover .leoz-gallery-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
};

export default GalleryCard;
