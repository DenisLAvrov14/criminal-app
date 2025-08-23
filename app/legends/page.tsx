// File: app/legends/page.tsx

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchRelatedArticles } from '@/app/lib/api';
import { ArticleCard } from '@/app/components/ArticleCard/ArticleCard';
import Breadcrumbs from '../ui/Breadcrumbs/Breadcrumbs';
import { Article } from '@/app/lib/types';

const PER_PAGE = 6;
export const revalidate = 60; // ISR: сбрасывать кэш раз в минуту

interface LegendsPageProps {
  searchParams: { page?: string };
}

export default async function LegendsPage({ searchParams }: LegendsPageProps) {
  // 1. Определяем текущую страницу из query
  const page = parseInt(searchParams.page || '1', 10);
  if (isNaN(page) || page < 1) return notFound();

  // 2. Загружаем все статьи из раздела «legends»
  const all: Article[] = await fetchRelatedArticles('legends');
  if (!all.length) return notFound();

  // 3. Срезаем по пагинации
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
  const pageItems = all.slice(start, end);

  if (pageItems.length === 0) return notFound();

  // 4. Рендерим
  return (
    <section className="bg-black text-[#f5e8c7] py-16 px-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Legends' }]} />

      <div className="container mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold uppercase mb-6 border-b-2 border-[#c9ad77] pb-4">
          Legends
        </h1>
        <p className="text-lg mb-12 max-w-2xl text-[#ddd]">
          Dive into curated stories on{' '}
          <span className="font-semibold text-[#c9ad77]">Legends</span> of Russian
          prison culture.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageItems.map(article => (
            <ArticleCard
              key={article.id}
              cover={article.cover?.url || '/images/placeholder.jpg'}
              img={article.images?.[0]?.url}
              alt={article.cover?.alt_text || article.title}
              title={article.title}
              desc={article.excerpt || ''}
              href={`/legends/${article.slug}`}
            />
          ))}
        </div>

        {/* Пагинация */}
        <div className="mt-16 flex justify-center space-x-4">
          {page > 1 && (
            <Link
              href={`/legends${page > 2 ? `?page=${page - 1}` : ''}`}
              className="px-5 py-2 bg-[#3f2c1a] hover:bg-[#5a4228] rounded-md"
            >
              ← Prev
            </Link>
          )}
          {end < all.length && (
            <Link
              href={`/legends?page=${page + 1}`}
              className="px-5 py-2 bg-[#3f2c1a] hover:bg-[#5a4228] rounded-md"
            >
              Next →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
