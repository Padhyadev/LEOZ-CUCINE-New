import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface CardProps {
  image: string;
  category?: string;
  title: string;
  shortDescription?: string;
  readTime?: string;
  href?: string;
  onClick?: () => void;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '4/5';
  actionText?: string;
  extraFooter?: React.ReactNode;
  style?: React.CSSProperties;
}

const aspectRatioMap = {
  '16/9': '16 / 9',
  '4/3': '4 / 3',
  '1/1': '1 / 1',
  '4/5': '4 / 5',
};

export const Card: React.FC<CardProps> = ({
  image,
  category,
  title,
  shortDescription,
  readTime,
  href,
  onClick,
  aspectRatio = '4/3',
  actionText = 'Read More',
  extraFooter,
  style = {},
}) => {
  return (
    <article
      className="leoz-card"
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#102033',
        border: '1px solid rgba(200, 154, 82, 0.15)',
        borderRadius: 'var(--radius-sm)',
        padding: '24px',
        boxShadow: 'var(--shadow-subtle)',
        cursor: href || onClick ? 'pointer' : 'default',
        transition: 'transform var(--motion-duration-fast) var(--motion-ease-luxury), border-color var(--motion-duration-fast) var(--motion-ease-luxury), box-shadow var(--motion-duration-fast) var(--motion-ease-luxury)',
        ...style,
      }}
    >
      {/* Image Container */}
      <div
        style={{
          position: 'relative',
          aspectRatio: aspectRatioMap[aspectRatio] || '4 / 3',
          width: '100%',
          overflow: 'hidden',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: '#0B1728',
          marginBottom: '20px',
        }}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="leoz-card-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform var(--motion-duration-slow) var(--motion-ease-luxury)',
          }}
        />
      </div>

      {/* Metadata */}
      {(category || readTime) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-family-sans)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-accent-gold)',
            marginBottom: '12px',
          }}
        >
          {category && <span>{category}</span>}
          {readTime && <span style={{ color: 'var(--color-text-secondary)', opacity: 0.8, fontWeight: 400 }}>{readTime}</span>}
        </div>
      )}

      {/* Title */}
      <h3
        className="leoz-card-title"
        style={{
          fontFamily: 'var(--font-family-serif)',
          fontSize: 'clamp(19px, 1.8vw, 24px)',
          fontWeight: 400,
          lineHeight: '1.24',
          color: 'var(--color-text-primary)',
          marginBottom: '12px',
          transition: 'color var(--motion-duration-fast) ease',
        }}
      >
        {href ? (
          <a href={href} style={{ color: 'inherit' }}>
            {title}
          </a>
        ) : (
          title
        )}
      </h3>

      {/* Short Description */}
      {shortDescription && (
        <p
          style={{
            fontFamily: 'var(--font-family-sans)',
            fontSize: '13px',
            fontWeight: 300,
            lineHeight: '1.6',
            color: 'var(--color-text-secondary)',
            marginBottom: '20px',
          }}
        >
          {shortDescription}
        </p>
      )}

      {/* Read More / Action Button */}
      {actionText && (
        <div style={{ marginBottom: extraFooter ? '12px' : '0' }}>
          {href ? (
            <a
              href={href}
              className="leoz-card-readmore"
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-gold)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'gap var(--motion-duration-fast) ease',
              }}
            >
              {actionText}
              <ArrowUpRight size={13} />
            </a>
          ) : (
            <span
              className="leoz-card-readmore"
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-gold)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'gap var(--motion-duration-fast) ease',
              }}
            >
              {actionText}
              <ArrowUpRight size={13} />
            </span>
          )}
        </div>
      )}

      {/* Extra Footer (Social share icons or custom controls) */}
      {extraFooter}

      <style>{`
        .leoz-card:hover {
          transform: translateY(-4px);
          border-color: rgba(200, 154, 82, 0.4);
          box-shadow: 0 16px 40px -10px rgba(5, 13, 24, 0.4);
        }
        .leoz-card:hover .leoz-card-img {
          transform: scale(1.05);
        }
        .leoz-card:hover .leoz-card-title {
          color: #D4AF6A !important;
        }
        .leoz-card:hover .leoz-card-readmore {
          gap: 8px;
        }
      `}</style>
    </article>
  );
};

export default Card;
