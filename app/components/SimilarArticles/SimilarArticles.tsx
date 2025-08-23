// app/components/SimilarArticles/SimilarArticles.tsx

import { fetchAllArticles } from '@/app/lib/api';
import { Article } from '@/app/lib/types';
import { ArticleCard } from '../ArticleCard/ArticleCard';

interface Props {
  slug: string;
  section: string;
}

export const SimilarArticles = async ({ slug, section }: Props) => {
  // 1) Берём **все** статьи с нужными полями (cover.url, images.url и т.д.)
  const articles: Article[] = await fetchAllArticles();

  // 2) Фильтруем по section и убираем ту же статью
  const slice = articles
    .filter(a => a.section === section && a.slug !== slug)
    .slice(0, 3);

  if (slice.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold mb-6">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {slice.map(a => (
          <ArticleCard
            key={a.id}
            cover={a.cover?.url}
            img={a.images[0]?.url}
            alt={a.cover?.alt_text || a.title}
            title={a.title}
            desc={a.excerpt || ''}
            href={`/${a.section}/${a.slug}`}
          />
        ))}
      </div>
    </section>
  );
};
