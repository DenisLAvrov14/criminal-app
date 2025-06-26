// components/ExploreMore.tsx
'use client';

import React from 'react';
import Link from 'next/link';

const EXPLORE = [
  { href: '/locations', src: '/locations.svg', label: 'Locations' },
  { href: '/tattoos', src: '/tattoo.svg', label: 'Tattoos' },
  { href: '/hierarchy', src: '/hierarchy.svg', label: 'Hierarchy' },
  { href: '/music', src: '/music.svg', label: 'Music' },
];

export const ExploreMore: React.FC = () => (
  <section className="container mx-auto px-6 pb-16">
    <h2 className="text-2xl font-bold mb-6 text-center">Explore More</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {EXPLORE.map(({ href, src, label }) => (
        <Link
          key={label}
          href={href}
          prefetch
          className="group block focus:outline-none focus:ring-2 focus:ring-[#c9ad77] rounded-lg "
          aria-label={label}
        >
          <div
            className="
            bg-[#111] border border-[#333] hover:border-[#c9ad77]
            p-4 flex flex-col items-center text-center
            rounded-lg shadow-lg transition-colors
          "
          >
            {/* CSS-маска для иконки */}
            <div
              className="w-[4em] h-[4em] mb-3 bg-[#c9ad77] mask-[url('/locations.svg')] mask-center mask-contain transition-transform group-hover:scale-110"
              style={{ WebkitMask: `url(${src}) no-repeat center / contain` }}
            />
            <span
              className="
              text-base font-medium text-[#f5e8c7]
              group-hover:text-white transition-colors
            "
            >
              {label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);
