// app/articles/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Article } from '@/app/lib/types';
import { fetchAllArticles, fetchArticleBySlug, fetchRelatedArticles } from '@/app/lib/api';
import { ArticleCard } from '@/app/components/ArticleCard/ArticleCard';

/** Тип для параметров роутинга */
interface Params {
  params: { slug: string };
}

/** SSG: генерируем все доступные пути */
export async function generateStaticParams(): Promise<Params['params'][]> {
  const all = await fetchAllArticles();
  return all.map(a => ({ slug: a.slug }));
}

/** SEO-метаданные на уровне страницы */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const article = await fetchArticleBySlug(params.slug);
    return {
      title: `${article.meta_title || article.title} — Russian Prison Culture`,
      description: article.meta_description || article.excerpt || '',
      openGraph: {
        title: article.meta_title || article.title,
        description: article.meta_description || article.excerpt || '',
        images: article.images.length > 0 ? [article.images[0].url] : undefined,
      },
    };
  } catch {
    return {
      title: 'Not Found — Russian Prison Culture',
      description: 'Статья не найдена',
    };
  }
}

/** Главная компонента страницы статьи */
export default async function ArticlePage({ params }: Params) {
  // Получаем статью
  let article: Article;
  try {
    article = await fetchArticleBySlug(params.slug);
  } catch {
    return notFound();
  }

  // Получаем related — необязательно, если не нужно
  const related = await fetchRelatedArticles();

  return (
    <article className="max-w-4xl mx-auto py-8 prose prose-invert">
      {/* Навигация назад */}
      <nav className="mb-6 text-sm text-[#c9ad77]">
        <a href="/articles" className="hover:underline">
          ← Back to all articles
        </a>
      </nav>

      {/* Заголовок и дата */}
      <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
      {article.publishedAt && (
        <p className="text-sm text-gray-400 mb-6">
          {new Date(article.publishedAt).toLocaleDateString()} • by {article.author || 'Unknown'}
        </p>
      )}

      {/* SEO-поля (если нужны где-то в тексте) */}
      {article.meta_title && (
        <p className="text-xs text-gray-500 mb-4">
          <strong>Meta title:</strong> {article.meta_title}
        </p>
      )}
      {article.meta_description && (
        <p className="text-xs text-gray-500 mb-8">
          <strong>Meta description:</strong> {article.meta_description}
        </p>
      )}

      {/* Картинки статьи */}
      {article.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {article.images.map(img => (
            <figure key={img.id}>
              <img
                src={img.url}
                alt={img.alt_text || img.title || ''}
                className="w-full h-auto rounded-lg shadow"
              />
              {img.description && (
                <figcaption className="text-sm text-gray-500 mt-2">{img.description}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {/* Основной контент */}
      <div
        className="prose prose-lg max-w-full mb-12"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* Похожие статьи */}
      {related.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map(a => (
              <ArticleCard
                key={a.id}
                img={a.images[0]?.url || '/images/placeholder-1.jpg'}
                alt={a.images[0]?.alt_text || a.title}
                title={a.title}
                desc={a.excerpt || ''}
                href={`/articles/${a.slug}`}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
