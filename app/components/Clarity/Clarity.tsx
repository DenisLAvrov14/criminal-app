'use client';

import { useEffect } from 'react';

export default function Clarity() {
  useEffect(() => {
    (function (c: any, l: any, a: any, r: any, i: any) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      const t = l.createElement(r);
      t.async = true;
      t.src = 'https://www.clarity.ms/tag/' + i;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode?.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'sbo66n3ghi');
  }, []);

  return null;
}
