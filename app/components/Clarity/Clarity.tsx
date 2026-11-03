'use client';

import { useEffect } from 'react';

type ClarityFunction = ((...args: unknown[]) => void) & {
  q?: unknown[][];
};

declare global {
  interface Window {
    clarity?: ClarityFunction;
  }
}

export default function Clarity() {
  useEffect(() => {
    (function (w: Window, d: Document, r: string, clarityId: string) {
      if (!w.clarity) {
        const clarityFn: ClarityFunction = (...args: unknown[]) => {
          clarityFn.q = clarityFn.q || [];
          clarityFn.q.push(args);
        };
        w.clarity = clarityFn;
      }

      const script = d.createElement(r) as HTMLScriptElement;
      script.async = true;
      script.src = 'https://www.clarity.ms/tag/' + clarityId;

      const firstScript = d.getElementsByTagName(r)[0];
      firstScript?.parentNode?.insertBefore(script, firstScript);
    })(window, document, 'script', 'sbo66n3ghi');
  }, []);

  return null;
}
