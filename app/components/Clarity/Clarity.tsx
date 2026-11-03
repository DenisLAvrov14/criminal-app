'use client';

import { useEffect } from 'react';
import { CONSENT_EVENT, getConsent } from '@/app/lib/consent';

type ClarityFunction = ((...args: unknown[]) => void) & {
  q?: unknown[][];
};

declare global {
  interface Window {
    clarity?: ClarityFunction;
  }
}

const CLARITY_ID = 'sbo66n3ghi';

function loadClarity() {
  if (window.clarity) return;
  const clarityFn: ClarityFunction = (...args: unknown[]) => {
    clarityFn.q = clarityFn.q || [];
    clarityFn.q.push(args);
  };
  window.clarity = clarityFn;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.clarity.ms/tag/' + CLARITY_ID;
  document.head.appendChild(script);
}

/** Clarity пишет записи сессий — грузим только после согласия на cookies */
export default function Clarity() {
  useEffect(() => {
    if (getConsent() === 'granted') loadClarity();

    const onChange = (e: Event) => {
      if ((e as CustomEvent).detail === 'granted') loadClarity();
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return null;
}
