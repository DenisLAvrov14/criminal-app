// components/Footer.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const year = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-[#777] border-t border-[#333] py-6">
      <div
        className="
        container mx-auto px-4 
        flex flex-col items-center space-y-6     /* ← добавлено items-center */
        md:flex-row md:items-center md:justify-between md:space-y-0
      "
      >
        {/* 3. Подписка */}
        <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
          <span className="text-sm text-[#c9ad77] font-medium tracking-wide">Stay Updated</span>
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex">
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#222] text-white placeholder-[#555] rounded-l focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#c9ad77] text-black font-medium rounded-r hover:bg-[#b59a68] transition text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* 1. © */}
        <div className="text-xs md:text-sm">&copy; {year} Russian Prison Culture</div>

        {/* 2. Правовые ссылки */}
        <nav className="flex justify-center space-x-4 text-xs md:text-sm">
          <Link href="/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition">
            Terms of Service
          </Link>
          <Link href="/cookies" className="hover:text-white transition">
            Cookie Policy
          </Link>
        </nav>

        {/* 4. Back to top */}
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center text-xs md:text-sm hover:text-white transition focus:outline-none"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-4 h-4 mr-1" />
          Back to top
        </button>
      </div>
    </footer>
  );
};
