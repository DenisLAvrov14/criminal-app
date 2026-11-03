// components/QuickLinks.tsx
'use client';

import React from 'react';
import Link from 'next/link';

import TraditionsIcon from '/public/hram.svg';
import GangsIcon from '/public/zvezda.svg';
import LegendsIcon from '/public/pika.svg';
import SerialKillersIcon from '/public/finka.svg';

const QUICK_LINKS = [
  { href: '/traditions', Icon: TraditionsIcon, label: 'Traditions' },
  { href: '/gangs', Icon: GangsIcon, label: 'Gangs' },
  { href: '/legends', Icon: LegendsIcon, label: 'Legends' },
  { href: '/serial-killers', Icon: SerialKillersIcon, label: 'Serial Killers' },
];

export const QuickLinks: React.FC = () => (
  <section className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
      {QUICK_LINKS.map(({ href, Icon, label }) => (
        <Link
          key={label}
          href={href}
          prefetch
          className="group h-full focus:outline-none focus:ring-2 focus:ring-[#c9ad77] rounded-lg"
        >
          <div
            className="h-full bg-[#111] border border-[#333] hover:border-[#c9ad77] px-3 py-5 sm:p-6 flex flex-col items-center text-center rounded-lg shadow-lg transition-colors"
            role="link"
            aria-label={label}
          >
            <Icon className="w-[4em] h-[4em] mb-4 text-[#f5e8c7] fill-current transition-transform group-hover:scale-110" />
            <span className="whitespace-nowrap text-base sm:text-lg font-semibold text-[#f5e8c7] group-hover:text-white transition-colors">
              {label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);
