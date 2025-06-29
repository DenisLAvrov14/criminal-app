// components/Footer.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { FooterSubscribe } from '../FooterSubscribe/FooterSubscribe';

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
        <FooterSubscribe />

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
