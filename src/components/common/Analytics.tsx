import React, { useEffect } from 'react';

// TODO(QA): set VITE_GTM_ID to your GTM container ID (e.g. "GTM-XXXXXXX") to
// enable Google Tag Manager. Nothing loads or fires while it's unset.
const GTM_ID = import.meta.env.VITE_GTM_ID as string | undefined;

export const Analytics: React.FC = () => {
  useEffect(() => {
    if (!GTM_ID || document.getElementById('gtm-script')) return;

    const script = document.createElement('script');
    script.id = 'gtm-script';
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
    document.head.appendChild(script);
  }, []);

  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
};

export default Analytics;
