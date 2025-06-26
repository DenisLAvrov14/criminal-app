// File: app/music/page.tsx
import { fetchRelatedArticles } from '@/app/lib/api';
import { ArticleCard } from '@/app/components/ArticleCard/ArticleCard';

export default async function MusicPage() {
  const articles = await fetchRelatedArticles('music');
  const title = 'Music';

  return (
    <section className="bg-black text-[#f5e8c7] py-16 px-6">
      <div className="container mx-auto">
        {/* Section Title */}
        <h1 className="text-4xl lg:text-5xl font-bold uppercase mb-6 border-b-2 border-[#c9ad77] pb-4">
          {title}
        </h1>

        {/* Subtitle / Description */}
        <p className="text-lg mb-12 max-w-2xl text-[#ddd]">
          Dive into curated articles on{' '}
          <span className="font-semibold text-[#c9ad77]">{title}</span> in Russian prison culture.
          Explore traditions, art, and the hidden codes behind prison walls.
        </p>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <div
              key={article.id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <ArticleCard
                cover={article.cover?.url || '/images/placeholder.jpg'}
                alt={article.cover?.alt_text || article.title}
                title={article.title}
                desc={article.excerpt || ''}
                href={`/music/${article.slug}`}
                img={''}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
