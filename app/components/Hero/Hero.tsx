// components/Hero.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { ArrowDownIcon } from '@heroicons/react/24/outline';
import { Search } from '../Search/Search';

export const Hero: React.FC = () => {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[70vh] overflow-hidden sm:min-h-[95vh]">
      {/* White Swan Image: исходник 1536×1024 — показываем целиком, без растягивания;
          поля по бокам на широких экранах заполняет размытая копия */}
      <Image
        src="/whiteswan.png"
        alt=""
        aria-hidden
        fill
        sizes="50vw"
        quality={50}
        className="scale-110 object-cover opacity-50 blur-2xl"
      />
      <div className="absolute inset-0 flex justify-center">
        <div className="relative aspect-[3/2] h-full max-w-full md:[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Image
            src="/whiteswan.png"
            alt="White swan sketch"
            fill
            sizes="(min-aspect-ratio: 3/2) 150vh, 100vw"
            className="object-cover"
            quality={100}
            priority
          />
        </div>
      </div>

      {/* Dark overlay with search */}
      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-center px-4 space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase text-[#f5e8c7]">
          Russian Criminal Culture
        </h1>
        <p className="max-w-xl text-sm sm:text-lg md:text-xl text-[#f5e8c7] leading-relaxed">
          Exploring the history, legends, and traditions of Russia&apos;s criminal world — from
          prison tattoos to thieves-in-law.
        </p>

        {/* Search Form */}
        <Search />
      </div>

      {/* Scroll hint */}
      <button
        onClick={scrollDown}
        className="hidden sm:block absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 text-[#f5e8c7] hover:text-white focus:outline-none"
        aria-label="Scroll down"
      >
        <ArrowDownIcon className="w-8 h-8 animate-bounce" />
      </button>
    </section>
  );
};
