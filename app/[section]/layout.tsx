import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

const SECTION_TITLES: Record<string, string> = {
  traditions: 'Traditions',
  history: 'History',
  legends: 'Legends',
  tattoos: 'Tattoos',
  hierarchy: 'Hierarchy',
  locations: 'Locations',
  music: 'Music',
};

interface SectionLayoutProps {
  children: ReactNode;
  params: { section: string };
}

export function generateMetadata({ params }: { params: { section: string } }): Metadata {
  const title = SECTION_TITLES[params.section] || params.section;
  return {
    title: `${title} — Russian Prison Culture`,
    description: `Latest news and articles about ${title.toLowerCase()} in Russian prison culture.`,
  };
}

export default function SectionLayout({ children, params }: SectionLayoutProps) {
  const title = SECTION_TITLES[params.section] || params.section;
  return (
    <div className="min-h-screen bg-black text-[#f5e8c7] font-serif">
      <Header />

      {/* Страница раздела */}
      <main className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold uppercase mb-12">{title}</h1>
        {children}
      </main>

      <Footer />
    </div>
  );
}
