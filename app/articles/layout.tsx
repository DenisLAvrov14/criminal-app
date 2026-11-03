// File: app/articles/layout.tsx

import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import BackButton from '../ui/BackButton.tsx/BackButton';

export const metadata: Metadata = {
  title: 'All Articles — Russian Criminal Culture',
  description: 'Полный список статей по всем направлениям русской тюремной культуры',
};

export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-[#f5e8c7] font-serif">
      <Header />

      <main className="container mx-auto px-4 pt-28 pb-16 sm:px-6">
        {/* Основной контент страницы */}
        {children}
        {/* Навигация сверху */}
        <BackButton />
      </main>

      <Footer />
    </div>
  );
}
