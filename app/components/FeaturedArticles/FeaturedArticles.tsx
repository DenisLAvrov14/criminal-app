// app/components/FeaturedArticles.tsx

import { fetchAllArticles } from '@/app/lib/api';
import { Article } from '@/app/lib/types';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import Link from 'next/link';

export const FeaturedArticles = async () => {
  const articles: Article[] = await fetchAllArticles();
  const featured = articles.slice(0, 9);

  return (
    <section className="container mx-auto px-6 pb-16">
      {/* Clickable header linking to all articles */}
      <h2 className="text-3xl font-bold mb-4">
        <Link href="/articles" className="no-underline">
          Featured Articles
        </Link>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map(article => (
          <ArticleCard
            key={article.id}
            cover={article.cover?.url}
            img={article.images[0]?.url}
            alt={article.cover?.alt_text || article.title}
            title={article.title}
            desc={article.excerpt || ''}
            href={`/${article.section}/${article.slug}`}
          />
        ))}
      </div>
    </section>
  );
};
