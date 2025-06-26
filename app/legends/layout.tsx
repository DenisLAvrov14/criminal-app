// File: app/legends/layout.tsx
import { ReactNode } from 'react';
import { Header } from '@/app/components/Header/Header';
import { Footer } from '@/app/components/Footer/Footer';

export const metadata = {
  title: 'Legends — Russian Prison Culture',
  description: 'Страницы раздела «Legends» о легендарных фигурах тюрьмы',
};

export default function LegendsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-yellow-300 font-serif">
      <Header />

      <main className="container mx-auto px-6 py-16">{children}</main>

      <Footer />
    </div>
  );
}
