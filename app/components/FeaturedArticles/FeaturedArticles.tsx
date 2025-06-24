import React from 'react';
import { fetchAllArticles } from '@/app/lib/api';
import { Article } from '@/app/lib/types';
import { ArticleCard } from '../ArticleCard/ArticleCard';

export const FeaturedArticles = async () => {
  const articles: Article[] = await fetchAllArticles();

  // Лог всех статей для отладки
  console.log('FeaturedArticles loaded:', JSON.stringify(articles, null, 2));

  const featured = articles.slice(0, 9);

  return (
    <section className="container mx-auto px-6 pb-16">
      <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map(article => (
          <ArticleCard
            key={article.id}
            img={article.images[0]?.url || '/images/placeholder.jpg'}
            cover={article.cover?.url}
            alt={article.cover?.alt_text || article.title}
            title={article.title}
            desc={article.excerpt || ''}
            href={`/articles/${article.slug}`}
          />
        ))}
      </div>
    </section>
  );
};
