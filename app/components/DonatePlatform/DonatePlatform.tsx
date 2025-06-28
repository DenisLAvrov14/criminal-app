'use client';

import { useState } from 'react';
import { Coffee, Globe } from 'lucide-react';
import { SiBitcoin, SiEthereum, SiTether } from 'react-icons/si';
import { motion } from 'framer-motion';

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
  const [showCrypto, setShowCrypto] = useState(false);

  return (
    <div>
      <h2 className="text-4xl font-bold text-[#c9ad77] mb-6">Support the Project</h2>
      <p className="mb-8 text-lg leading-relaxed">
        Fuel our research and help us unveil more untold stories from Russia’s prison world. Choose
        your way to contribute:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.a
          href="https://ko-fi.com/your_page"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1a1a] text-[#c9ad77] font-semibold rounded-2xl shadow-md hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.gtag?.('event', 'donate_click', { method: 'Ko-fi' })}
        >
          <Coffee size={20} />
          <span>Donate via Ko-fi</span>
        </motion.a>

        <motion.a
          href="https://buymeacoffee.com/your_page"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-8 py-4 bg-[#1a1a1a] text-[#c9ad77] font-semibold rounded-2xl shadow-md hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.gtag?.('event', 'donate_click', { method: 'Buy Me a Coffee' })}
        >
          <Coffee size={20} />
          <span>Donate via Buy Me a Coffee</span>
        </motion.a>

        <div className="relative">
          <motion.button
            type="button"
            className="flex items-center justify-center gap-3 w-full px-8 py-4 bg-[#1a1a1a] text-[#c9ad77] font-semibold rounded-2xl shadow-md hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCrypto(prev => !prev)}
          >
            <Globe size={20} />
            <span>Donate via Crypto</span>
          </motion.button>

          {showCrypto && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 space-y-3 bg-[#1a1a1a] p-4 rounded-2xl shadow-lg absolute left-0 w-full z-10"
            >
              {CRYPTO_PLATFORMS.map(({ name, address, icon }) => (
                <motion.button
                  key={name}
                  type="button"
                  className="flex items-center justify-between w-full px-4 py-3 bg-[#121212] text-[#c9ad77] font-medium rounded-lg hover:bg-[#1a1a1a] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                    window.gtag?.('event', 'donate_click', { method: name });
                    alert(`${name} address copied to clipboard!`);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {icon}
                    <span>{name}</span>
                  </div>
                  <code className="text-sm ml-2 break-all">{address}</code>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
