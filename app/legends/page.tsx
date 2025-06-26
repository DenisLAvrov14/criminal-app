// File: app/legends/page.tsx
import { fetchRelatedArticles } from '@/app/lib/api';
import { ArticleCard } from '@/app/components/ArticleCard/ArticleCard';

export default async function LegendsPage() {
  const articles = await fetchRelatedArticles('legends');
  const title = 'Legends';

  return (
    <section className="bg-black text-[#f5e8c7] py-16 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold uppercase mb-6 border-b-2 border-[#c9ad77] pb-4">
          {title}
        </h1>
        <p className="text-lg mb-12 max-w-2xl text-[#ddd]">
          Dive into curated stories on <span className="font-semibold text-[#c9ad77]">{title}</span>{' '}
          of Russian prison culture.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard
              key={article.id}
              /** Показываем обложку */
              cover={article.cover?.url || '/images/placeholder.jpg'}
              /** Альт в соответствие с обложкой */
              alt={article.cover?.alt_text || article.title}
              title={article.title}
              desc={article.excerpt || ''}
              href={`/legends/${article.slug}`}
              img={''}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
