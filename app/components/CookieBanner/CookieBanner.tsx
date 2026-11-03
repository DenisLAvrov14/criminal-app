'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getConsent, OPEN_SETTINGS_EVENT, setConsent, type ConsentChoice } from '@/app/lib/consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // localStorage доступен только в браузере, поэтому решаем после монтирования
    const timer = setTimeout(() => setVisible(getConsent() === null), 0);
    const open = () => setVisible(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(OPEN_SETTINGS_EVENT, open);
    };
  }, []);

  if (!visible) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 font-serif sm:p-4"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-xl border border-[#3a2a1a] bg-[#120c07]/95 p-4 text-sm text-[#e8dcc0] shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:p-5">
        <p className="flex-1 leading-relaxed">
          We use cookies for analytics to understand what readers like and improve the site. You can
          accept or decline — the site works the same either way.{' '}
          <Link href="/cookies" className="text-[#c9ad77] underline hover:text-white">
            Cookie Policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="flex-1 rounded-lg border border-[#c9ad77]/60 px-4 py-2 text-[#c9ad77] transition hover:bg-[#c9ad77]/10 sm:flex-none"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="flex-1 rounded-lg bg-[#c9ad77] px-4 py-2 font-semibold text-black transition hover:bg-[#d8bf8c] sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
