import React, { useEffect } from 'react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { EMAIL, EMAIL_HREF } from '../constants/siteInfo';

const sections = [
  { title: 'What We Collect' },
  { title: 'Why We Collect It' },
  { title: 'How Long We Keep It' },
  { title: 'Sharing With Third Parties' },
  { title: 'Your Rights & Deletion Requests' },
];

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useDocumentMeta(
    'Privacy Policy | LEOZ Cucine',
    'How LEOZ Cucine collects, uses and protects the information submitted through this site.'
  );

  return (
    <div className="page-privacy-policy" style={{ backgroundColor: '#FFFFFF', color: '#181818' }}>
      <Header />

      <main id="main-content" style={{ paddingTop: '75px' }}>
        <section
          aria-label="Privacy Policy"
          style={{
            paddingTop: 'clamp(80px, 10vw, 140px)',
            paddingBottom: 'var(--space-section-padding-desktop)',
            paddingLeft: '6vw',
            paddingRight: '6vw',
          }}
        >
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 400,
                color: '#181818',
                marginBottom: '24px',
              }}
            >
              Privacy Policy
            </h1>

            <div
              style={{
                backgroundColor: '#F7F5F1',
                border: '1px solid rgba(182, 154, 107, 0.3)',
                borderRadius: '8px',
                padding: '20px 24px',
                marginBottom: '40px',
                fontFamily: 'var(--font-family-sans)',
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#595959',
              }}
            >
              {/* TODO(QA): this page is a scaffold, not a finished policy — the
                  actual commitments below need drafting/review with the client
                  (and likely legal counsel) before this page goes live. */}
              This page is a placeholder. The final Privacy Policy text is pending review and has
              not yet been approved for publication.
            </div>

            {sections.map((section) => (
              <div key={section.title} style={{ marginBottom: '32px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#181818',
                    marginBottom: '10px',
                  }}
                >
                  {section.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: '15px',
                    fontWeight: 300,
                    color: '#595959',
                    lineHeight: '1.7',
                  }}
                >
                  {/* TODO(QA): needs final copy */}
                  Content pending.
                </p>
              </div>
            ))}

            <p
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: '15px',
                fontWeight: 300,
                color: '#595959',
                lineHeight: '1.7',
              }}
            >
              Questions about this policy can be sent to{' '}
              <a href={EMAIL_HREF} style={{ color: 'inherit', textDecoration: 'underline' }}>{EMAIL}</a>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
