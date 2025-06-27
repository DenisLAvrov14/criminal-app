// app/articles/layout.tsx

import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';
import BackButton from '../ui/BackButton.tsx/BackButton';

export const metadata: Metadata = {
  title: 'All Articles — Russian Prison Culture',
  description: 'Полный список статей по всем направлениям русской тюремной культуры',
};

interface ArticlesLayoutProps {
  children: ReactNode;
}

export default function ArticlesLayout({ children }: ArticlesLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-[#f5e8c7] font-serif">
      <Header />

      <main className="page-wrapper container mx-auto px-6 py-16">
        {/* Page Content */}
        {children}
      </main>

      <Footer />
    </div>
  );
}
