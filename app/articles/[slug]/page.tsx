import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Article, fetchAllArticles, fetchArticleBySlug, fetchRelatedArticles } from '@/app/lib/api';
import { ArticleCard } from '@/app/components/ArticleCard/ArticleCard';

/**
 * Тип-помощник для сигнатур функций
 */
interface Params {
  params: { slug: string };
}

/**
 * SSG: заранее отрендерить все существующие статьи на сборке
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const all = await fetchAllArticles();
  return all.map(a => ({ slug: a.slug }));
}

/**
 * Генерация метаданных (title, description, Open Graph) для SEO
 */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article: Article | null = await fetchArticleBySlug(params.slug);
  if (!article) {
    return {
      title: 'Not Found — Russian Prison Culture',
      description: 'Статья не найдена',
    };
  }
  return {
    title: `${article.title} — Russian Prison Culture`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

/**
 * Страница конкретной статьи
 */
export default async function ArticlePage({ params }: Params) {
  const article: Article | null = await fetchArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const related: Article[] = await fetchRelatedArticles(article.section);

  return (
    <>
      {/* Навигация назад */}
      <nav className="mb-6 text-sm text-[#c9ad77]">
        <a href="/articles" className="hover:underline">
          ← Back to all articles
        </a>
      </nav>

      {/* Основной контент статьи */}
      <article className="prose prose-invert max-w-none mb-16">
        <h1>{article.title}</h1>
        <p className="text-sm text-[#888]">
          {new Date(article.publishedAt).toLocaleDateString()} • by {article.author}
        </p>
        <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
      </article>

      {/* Похожие статьи */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map(a => (
            <ArticleCard
              key={a.slug}
              img={a.image}
              alt={a.title}
              title={a.title}
              desc={a.excerpt}
            />
          ))}
        </div>
      </section>
    </>
  );
}
