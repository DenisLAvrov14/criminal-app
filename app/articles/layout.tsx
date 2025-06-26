// app/articles/layout.tsx
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

export const metadata: Metadata = {
  title: 'All Articles — Russian Prison Culture',
  description: 'Полный список статей по всем направлениям русской тюремной культуры',
};

export default function ArticlesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-[#f5e8c7] font-serif">
      <Header />
      <main className="container mx-auto px-6 py-16">{children}</main>
      <Footer />
    </div>
  );
}
