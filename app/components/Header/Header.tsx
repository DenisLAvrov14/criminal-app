// components/Header.tsx
'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

const NAV_LINKS = [
  { href: '/history', label: 'History' },
  { href: '/tattoos', label: 'Tattoos' },
  { href: '/hierarchy', label: 'Hierarchy' },
  { href: '/locations', label: 'Locations' },
  { href: '/music', label: 'Music' },
];

function MobileMenu({ open, onClose }: { open: boolean; onClose(): void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={open}
        onClose={onClose}
        initialFocus={closeButtonRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-80"
          leave="ease-in duration-200"
          leaveFrom="opacity-80"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-xs bg-black rounded-lg p-6 text-left">
              <div className="flex justify-end">
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="text-[#f5e8c7] focus:outline-none"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <nav className="mt-4 flex flex-col space-y-4">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className="text-2xl uppercase text-white hover:text-[#c9ad77] transition-colors duration-200"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
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
          <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase text-[#f5e8c7] whitespace-nowrap">
            Russian Prison Culture
          </span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden lg:flex lg:space-x-4 xl:space-x-6">
          {NAV_LINKS.map(({ href, label }) => {
            const active = path === href;
            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative group px-1 py-1 uppercase text-sm transition-colors duration-200
                  ${active ? 'text-[#c9ad77] font-semibold' : 'text-[#f5e8c7] hover:text-[#c9ad77]'}
                `}
              >
                {label}
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

        {/* Mobile burger */}
        <button
          className="lg:hidden p-2 text-[#f5e8c7] focus:outline-none"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
