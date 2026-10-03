import React from 'react';
import { Container } from './Container';
import { Section } from './Section';

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
}

export interface TimelineProps {
  title?: string;
  subtitle?: string;
  steps: TimelineStep[];
}

export const Timeline: React.FC<TimelineProps> = ({
  title = 'Our Architectural Methodology',
  subtitle = 'A structured four-phase process ensuring perfection from initial vision to final installation.',
  steps,
}) => {
  return (
    <Section variant="dark" padding="normal">
      <Container maxWidth="lg">
        {title && (
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'var(--font-size-display-md)',
                fontWeight: 300,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                style={{
                  fontFamily: 'var(--font-family-sans)',
                  fontSize: 'var(--font-size-md)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 300,
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(steps.length, 4)}, 1fr)`,
            gap: '32px',
          }}
          className="timeline-grid"
        >
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#102033',
                  border: '1px solid rgba(200, 154, 82, 0.15)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '32px 24px',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-family-sans)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      color: 'var(--color-accent-gold)',
                    }}
                  >
                    {item.step}
                  </span>
                  {Icon && <Icon size={20} color="var(--color-accent-gold)" />}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: '20px',
                    fontWeight: 300,
                    color: 'var(--color-text-primary)',
                    marginBottom: '12px',
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: '13px',
                    fontWeight: 300,
                    lineHeight: '1.6',
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
      <style>{`
        @media (max-width: 992px) {
          .timeline-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .timeline-grid {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
      `}</style>
    </Section>
  );
};

export default Timeline;
