// components/QuickLinks.tsx
'use client';

import React from 'react';
import Link from 'next/link';

import TraditionsIcon from '/public/hram.svg';
import HistoryIcon from '/public/zvezda.svg';
import LegendsIcon from '/public/pika.svg';

const QUICK_LINKS = [
  { href: '/traditions', Icon: TraditionsIcon, label: 'Traditions' },
  { href: '/history', Icon: HistoryIcon, label: 'History' },
  { href: '/legends', Icon: LegendsIcon, label: 'Legends' },
];

export const QuickLinks: React.FC = () => (
  <section className="container mx-auto px-6 py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {QUICK_LINKS.map(({ href, Icon, label }) => (
        <Link
          key={label}
          href={href}
          prefetch
          className="group focus:outline-none focus:ring-2 focus:ring-[#c9ad77] rounded-lg"
        >
          <div
            className="bg-[#111] border border-[#333] hover:border-[#c9ad77] p-6 flex flex-col items-center text-center rounded-lg shadow-lg transition-colors"
            role="link"
            aria-label={label}
          >
            <Icon className="w-[4em] h-[4em] mb-4 text-[#f5e8c7] fill-current transition-transform group-hover:scale-110" />
            <span className="text-lg font-semibold text-[#f5e8c7] group-hover:text-white transition-colors">
              {label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);
