'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/history', label: 'History' },
  { href: '/legends', label: 'Legends' },
  { href: '/traditions', label: 'Traditions' },
  { href: '/tattoos', label: 'Tattoos' },
  { href: '/hierarchy', label: 'Hierarchy' },
  { href: '/locations', label: 'Locations' },
  { href: '/music', label: 'Music' },
];

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-6 flex justify-between items-center py-4">
        {/* Лого и надпись слева */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="icon-mask"
            style={{
              width: '3em',
              height: '3em',
              WebkitMaskImage: 'url(/sever.svg)',
              maskImage: 'url(/sever.svg)',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              backgroundColor: '#f5e8c7',
              display: 'inline-block',
            }}
            aria-hidden="true"
          />
          <span className="text-2xl font-bold uppercase text-[#f5e8c7] whitespace-nowrap">
            Russian Prison Culture
          </span>
        </Link>

        {/* Навигация + бургер справа */}
        <div className="flex items-center space-x-4">
          {/* Десктоп-меню с анимированной линией подчёркивания */}
          <nav className="hidden md:flex space-x-12">
            {NAV_LINKS.map(({ href, label }) => {
              const active = path === href;
              return (
                <Link key={href} href={href} className="relative group px-2 py-1">
                  {/* Текст ссылки */}
                  <span
                    className={`
                      uppercase text-sm transition-colors duration-200
                      ${
                        active
                          ? 'text-[#c9ad77] font-semibold'
                          : 'text-[#f5e8c7] hover:text-[#c9ad77]'
                      }
                    `}
                  >
                    {label}
                  </span>
                  {/* Линия подчёркивания */}
                  <span
                    className={`
                      absolute bottom-0 left-0 w-full h-0.5 bg-[#c9ad77]
                      transform origin-center transition-transform duration-300
                      ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Мобильный бургер */}
          <button
            className="md:hidden flex flex-col justify-between w-6 h-6 text-[#f5e8c7] focus:outline-none"
            onClick={() => setOpen(prev => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`
                block h-0.5 w-full bg-current transform transition duration-300 ease-in-out
                ${open ? 'rotate-45 translate-y-2' : ''}
              `}
            />
            <span
              className={`
                block h-0.5 w-full bg-current transform transition duration-300 ease-in-out
                ${open ? 'opacity-0' : ''}
              `}
            />
            <span
              className={`
                block h-0.5 w-full bg-current transform transition duration-300 ease-in-out
                ${open ? '-rotate-45 -translate-y-2' : ''}
              `}
            />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className={`
          fixed inset-0 z-40 bg-black flex flex-col items-center justify-center
          transition-all duration-300 ease-in-out
          ${
            open
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none'
          }
        `}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="mb-6 text-2xl uppercase text-white hover:text-[#c9ad77] transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
};
