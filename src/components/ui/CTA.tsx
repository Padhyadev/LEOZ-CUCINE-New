import React from 'react';
import { Container } from './Container';
import { Section } from './Section';

export interface CTAProps {
  title?: string;
  subtitle?: string;
  primaryActionText?: string;
  primaryActionHref?: string;
  secondaryActionText?: string;
  secondaryActionHref?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export const CTA: React.FC<CTAProps> = ({
  title = 'Begin Your Architectural Journey',
  subtitle = 'Schedule a private consultation at our design studio or invite our senior architects to your residence.',
  primaryActionText = 'Talk To Us',
  primaryActionHref = '/talk-to-us',
  secondaryActionText = 'Explore Collections',
  secondaryActionHref = '/modular-kitchens',
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, customClick?: () => void) => {
    if (customClick) {
      e.preventDefault();
      customClick();
      return;
    }
    if (href.startsWith('/')) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <Section variant="card" padding="large">
      <Container maxWidth="md" style={{ textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: 'var(--font-family-serif)',
            fontSize: 'var(--font-size-display-md)',
            fontWeight: 300,
            color: 'var(--color-text-primary)',
            marginBottom: '20px',
            lineHeight: '1.12',
          }}
        >
          {title}
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-family-sans)',
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-text-secondary)',
            fontWeight: 300,
            lineHeight: '1.7',
            maxWidth: '640px',
            margin: '0 auto 40px auto',
          }}
        >
          {subtitle}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          {primaryActionText && (
            <a
              href={primaryActionHref}
              onClick={(e) => handleNavClick(e, primaryActionHref, onPrimaryClick)}
              className="btn-primary"
            >
              {primaryActionText}
            </a>
          )}
          {secondaryActionText && (
            <a
              href={secondaryActionHref}
              onClick={(e) => handleNavClick(e, secondaryActionHref, onSecondaryClick)}
              className="btn-secondary"
            >
              {secondaryActionText}
            </a>
          )}
        </div>
      </Container>
    </Section>
  );
};

export default CTA;
