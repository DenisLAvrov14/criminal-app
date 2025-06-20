// components/Header.tsx
import React from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/history', label: 'History' },
  { href: '/legends', label: 'Legends' },
  { href: '/traditions', label: 'Traditions' },
  { href: '/tattoos', label: 'Tattoos' },
  { href: '/hierarchy', label: 'Hierarchy' },
  { href: '/locations', label: 'Locations' },
  { href: '/music', label: 'Music' },
];

export const Header: React.FC = () => (
  <header className="bg-black">
    <div className="container mx-auto flex items-center justify-between px-6 py-4">
      {/* Логотип в цвете #f5e8c7 через CSS-маску */}
      <Link href="/" className="flex items-center space-x-3">
        <span
          className="icon-mask"
          style={{
            width: '4rem', // ← override here
            height: '4rem', // ← override here
            WebkitMaskImage: `url(/sever.svg)`,
            maskImage: `url(/sever.svg)`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            backgroundColor: '#f5e8c7',
          }}
        />

        <span className="text-2xl font-bold uppercase text-[#f5e8c7]">Russian Prison Culture</span>
      </Link>

      {/* Глобальные ссылки */}
      <nav>
        <ul className="flex space-x-6 text-sm uppercase text-[#f5e8c7]">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);
