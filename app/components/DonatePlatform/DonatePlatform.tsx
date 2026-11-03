'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { SiBitcoin, SiEthereum, SiTether } from 'react-icons/si';

interface DonatePlatform {
  name: string;
  address: string;
  icon: React.ReactNode;
}

const CRYPTO_PLATFORMS: DonatePlatform[] = [
  {
    name: 'Bitcoin',
    address: 'bc1qfpmjaw2lmmhzgpz4vru7y08yamkufeu2e2l36g',
    icon: <SiBitcoin size={20} />,
  },
  {
    name: 'Ethereum',
    address: '0x8A84bf7D23c4B0Dd09E2350b92B47A8b2B948562',
    icon: <SiEthereum size={20} />,
  },
  {
    name: 'USDT (TRON)',
    address: 'TMGMUhU3MwAJnp7oJqfjENdRL3U64GN1jM',
    icon: <SiTether size={20} />,
  },
];

export const DonationSection = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyAddress = async ({ name, address }: DonatePlatform) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(name);
      setTimeout(() => setCopied(current => (current === name ? null : current)), 2000);
    } catch {
      // буфер обмена недоступен — адрес всё равно виден и выделяется вручную
    }
    window.gtag?.('event', 'donate_click', { method: name });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-[#c9ad77] mb-6">Support the Project</h2>
      <p className="mb-8 text-lg leading-relaxed">
        Fuel our research and help us unveil more untold stories from Russia’s criminal world. Tap
        an address to copy it:
      </p>
      <ul className="space-y-3">
        {CRYPTO_PLATFORMS.map(platform => (
          <li key={platform.name}>
            <button
              type="button"
              onClick={() => copyAddress(platform)}
              className="flex w-full items-center gap-3 rounded-2xl bg-[#1a1a1a] px-4 py-3 text-left text-[#c9ad77] shadow-md transition hover:bg-[#222] hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9ad77]"
            >
              <span className="shrink-0">{platform.icon}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{platform.name}</span>
                <code className="block break-all text-xs text-[#f5e8c7]/80 sm:text-sm">
                  {platform.address}
                </code>
              </span>
              <span className="shrink-0" aria-live="polite">
                {copied === platform.name ? (
                  <Check size={18} aria-label="Copied" />
                ) : (
                  <Copy size={18} aria-label="Copy address" />
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
