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
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <span
              style={{
                fontFamily: 'var(--font-family-sans)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B69A6B',
                display: 'block',
                marginBottom: '12px',
                fontWeight: 600,
              }}
            >
              LEGAL &amp; DATA PRIVACY
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-family-serif)',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 400,
                color: '#181818',
                marginBottom: '12px',
              }}
            >
              Privacy Policy
            </h1>

            <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: '13px', color: '#888', marginBottom: '32px' }}>
              Last Revised: September 2026 • LEOZ Cucine Ahmedabad
            </p>

            <div
              style={{
                backgroundColor: '#F7F5F1',
                border: '1px solid rgba(182, 154, 107, 0.3)',
                borderRadius: '4px',
                padding: '24px 28px',
                marginBottom: '40px',
                fontFamily: 'var(--font-family-sans)',
                fontSize: '15px',
                lineHeight: '1.75',
                color: '#2A2A2A',
              }}
            >
              <strong>LEOZ Cucine</strong> values your privacy. We are committed to transparency in how we collect, handle, and protect your personal and architectural project data.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#181818',
                    marginBottom: '10px',
                  }}
                >
                  1. Information We Collect
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: '14.5px',
                    fontWeight: 300,
                    color: '#595959',
                    lineHeight: '1.75',
                  }}
                >
                  This website may collect contact and project information voluntarily submitted through forms, email and phone calls, and technical usage information where website analytics or cookies are enabled.
                </p>
              </div>

              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#181818',
                    marginBottom: '10px',
                  }}
                >
                  2. Purpose of Use
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: '14.5px',
                    fontWeight: 300,
                    color: '#595959',
                    lineHeight: '1.75',
                  }}
                >
                  Information is used to respond to enquiries, arrange consultations, prepare proposals, coordinate services and improve the website.
                </p>
              </div>

              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#181818',
                    marginBottom: '10px',
                  }}
                >
                  3. Access &amp; Data Safeguarding
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: '14.5px',
                    fontWeight: 300,
                    color: '#595959',
                    lineHeight: '1.75',
                  }}
                >
                  Access is limited to authorised staff and relevant service providers where needed for these purposes or legal compliance. We aim to take reasonable steps to safeguard the data and retain it only as needed for legitimate business or legal purposes.
                </p>
              </div>

              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#181818',
                    marginBottom: '10px',
                  }}
                >
                  4. Your Rights &amp; Access Requests
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: '14.5px',
                    fontWeight: 300,
                    color: '#595959',
                    lineHeight: '1.75',
                  }}
                >
                  You may contact <a href="mailto:director@leozartofambience.com" style={{ color: '#B69A6B', textDecoration: 'underline' }}>director@leozartofambience.com</a> to request access, correction or deletion of your information, subject to applicable requirements.
                </p>
              </div>

              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-family-serif)',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#181818',
                    marginBottom: '10px',
                  }}
                >
                  5. External Links &amp; Updates
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: '14.5px',
                    fontWeight: 300,
                    color: '#595959',
                    lineHeight: '1.75',
                  }}
                >
                  External links are governed by their own privacy notices. This policy may be updated; the latest revision date will always appear at the top of this page.
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: '40px',
                paddingTop: '24px',
                borderTop: '1px solid #ECEAE5',
                fontFamily: 'var(--font-family-sans)',
                fontSize: '14px',
                color: '#777',
                lineHeight: '1.6',
              }}
            >
              <p>
                <strong>Corporate Office:</strong> 509, Sankalp Square 3B, Beside Taj Skyline, Sindhu Bhavan Road, Thaltej, Ahmedabad – 380059, Gujarat.
              </p>
              <p>
                Questions or grievance requests regarding this policy can be directed to{' '}
                <a href={EMAIL_HREF} style={{ color: '#181818', fontWeight: 500, textDecoration: 'underline' }}>{EMAIL}</a> or +91 98250 22616.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
