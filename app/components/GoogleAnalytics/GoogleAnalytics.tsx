'use client';

import Script from 'next/script';

const GA_ID = 'G-MNXWH9PLD4';

export default function GoogleAnalytics() {
  return (
    <>
      {/* Consent Mode v2: по умолчанию всё запрещено, пока посетитель не согласится
          (или если он уже согласился раньше — берём выбор из localStorage) */}
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var stored = null;
          try { stored = localStorage.getItem('cookie-consent'); } catch (e) {}
          var state = stored === 'granted' ? 'granted' : 'denied';
          gtag('consent', 'default', {
            analytics_storage: state,
            ad_storage: state,
            ad_user_data: state,
            ad_personalization: state,
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
