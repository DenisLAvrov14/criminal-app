// app/articles/page.tsx
import { Metadata } from 'next';
import { fetchAllArticles } from '@/app/lib/api';
import { Article } from '@/app/lib/types';
import { ArticleCard } from '@/app/components/ArticleCard/ArticleCard';

export const metadata: Metadata = {
  title: 'All Articles — Russian Prison Culture',
  description: 'Полный список статей по всем направлениям русской тюремной культуры',
};

export default async function ArticlesPage() {
  const articles: Article[] = await fetchAllArticles();

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map(a => (
          <ArticleCard
            key={a.id}
            img={a.cover?.url || a.images[0]?.url || '/images/placeholder-1.jpg'}
            alt={a.cover?.title || a.images[0]?.title || a.title}
            title={a.title}
            desc={a.excerpt || ''}
            href={`/articles/${a.slug}`}
          />
        ))}
      </div>
      <div className="mt-12 flex justify-center space-x-4">
        <button className="px-4 py-2 bg-[#3f2c1a] rounded-md">← Prev</button>
        <button className="px-4 py-2 bg-[#3f2c1a] rounded-md">Next →</button>
      </div>
    </section>
  );
}
