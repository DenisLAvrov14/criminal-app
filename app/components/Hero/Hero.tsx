// components/Hero.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowDownIcon } from '@heroicons/react/24/outline';

export const Hero: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    }
  };

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] sm:min-h-[95vh]">
      {/* White Swan Image */}
      <Image
        src="/whiteswan.png"
        alt="White swan sketch"
        fill
        className="object-contain"
        quality={100}
        priority
      />

      {/* Dark overlay with search */}
      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center px-4 space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase text-[#f5e8c7]">
          Russian Prison Culture
        </h1>
        <p className="max-w-xl text-sm sm:text-lg md:text-xl text-[#f5e8c7] leading-relaxed">
          Exploring the history, legends, and traditions of the criminal subculture in Russian
          prisons.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="w-full max-w-md flex">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 px-4 py-2 rounded-l bg-white text-black placeholder-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#c9ad77] text-black font-semibold rounded-r hover:bg-[#b59a68] transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Scroll hint */}
      <button
        onClick={scrollDown}
        className="hidden sm:block absolute bottom-4 left-1/2 transform -translate-x-1/2 text-[#f5e8c7] hover:text-white focus:outline-none"
        aria-label="Scroll down"
      >
        <ArrowDownIcon className="w-8 h-8 animate-bounce" />
      </button>
    </section>
  );
};
