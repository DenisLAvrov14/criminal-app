// components/Header.tsx
'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface NavLink {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

// Адреса совпадают со значениями section в Directus; группировка живёт только здесь
const NAV_LINKS: NavLink[] = [
  {
    href: '/traditions',
    label: 'Traditions',
    children: [
      { href: '/history', label: 'History' },
      { href: '/traditions', label: 'Traditions' },
      { href: '/hierarchy', label: 'Hierarchy' },
      { href: '/locations', label: 'Locations' },
    ],
  },
  { href: '/tattoos', label: 'Tattoos' },
  { href: '/gangs', label: 'Gangs' },
  { href: '/legends', label: 'Legends' },
  { href: '/serial-killers', label: 'Serial Killers' },
  { href: '/music', label: 'Music' },
];

const isActive = (path: string, href: string) => path === href || path.startsWith(`${href}/`);

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
                {NAV_LINKS.map(({ href, label, children }) =>
                  children ? (
                    <div key={label}>
                      <span className="text-2xl uppercase text-[#c9ad77]">{label}</span>
                      <div className="mt-2 ml-4 flex flex-col space-y-2 border-l border-[#333] pl-4">
                        {children.map(child => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className="text-lg uppercase text-white hover:text-[#c9ad77] transition-colors duration-200"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={href}
                      href={href}
                      onClick={onClose}
                      className="text-2xl uppercase text-white hover:text-[#c9ad77] transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  ),
                )}
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
            Russian Criminal Culture
          </span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden lg:flex lg:space-x-4 xl:space-x-6">
          {NAV_LINKS.map(({ href, label, children }) => {
            const active = children
              ? children.some(child => isActive(path, child.href))
              : isActive(path, href);
            const link = (
              <Link
                key={href}
                href={href}
                className={`
                  relative group inline-flex items-center px-1 py-1 uppercase text-sm whitespace-nowrap transition-colors duration-200
                  ${active ? 'text-[#c9ad77] font-semibold' : 'text-[#f5e8c7] hover:text-[#c9ad77]'}
                `}
              >
                {label}
                {children && <ChevronDownIcon className="ml-1 inline h-3 w-3" aria-hidden="true" />}
                <span
                  className={`
                    absolute bottom-0 left-0 w-full h-0.5 bg-[#c9ad77]
                    transform origin-center transition-transform duration-300
                    ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `}
                />
              </Link>
            );
            if (!children) return link;
            return (
              <div key={href} className="group/menu relative">
                {link}
                {/* Выпадающее меню: hover мышью или фокус с клавиатуры */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 group-hover/menu:visible group-focus-within/menu:visible">
                  <div className="flex min-w-44 flex-col rounded-lg border border-[#333] bg-black/95 py-2 shadow-xl">
                    {children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`px-4 py-2 text-sm uppercase transition-colors duration-200 ${
                          isActive(path, child.href)
                            ? 'text-[#c9ad77]'
                            : 'text-[#f5e8c7] hover:bg-[#c9ad77]/10 hover:text-[#c9ad77]'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
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
