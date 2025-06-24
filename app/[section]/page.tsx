import { ArticleCard } from '../components/ArticleCard/ArticleCard';
import { fetchRelatedArticles } from '@/app/lib/api';

interface SectionPageProps {
  params: {
    section: string;
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  // Получаем статьи по секции
  const articles = await fetchRelatedArticles(params.section);

  return (
    <>
      <section>
        <h1 className="text-3xl font-bold mb-8 capitalize">{params.section}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map(a => (
            <ArticleCard
              key={a.id}
              img={a.images[0]?.url || '/images/placeholder.jpg'}
              alt={a.images[0]?.alt_text || a.title}
              title={a.title}
              desc={a.excerpt || ''}
              href={`/articles/${a.slug}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
