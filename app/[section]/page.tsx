// File: app/[section]/page.tsx

import { notFound } from 'next/navigation';
import Head from 'next/head';
import { Metadata } from 'next';
import { fetchRelatedArticles } from '@/app/lib/api';
import { ArticleCard } from '@/app/components/ArticleCard/ArticleCard';
import { Article } from '@/app/lib/types';
import BackButton from '../ui/BackButton.tsx/BackButton';
import Breadcrumbs from '../ui/Breadcrumbs/Breadcrumbs';

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

// ISR: пересобирать раз в минуту
export const revalidate = 60;

/** Генерируем SEO-метаданные для раздела */
export async function generateMetadata({
  params,
}: {
  params: { section: string };
}): Promise<Metadata> {
  const section = params.section;
  const title = section.charAt(0).toUpperCase() + section.slice(1);
  const pageUrl = `${SITE_URL}/${section}`;

  return {
    title,
    description: `Dive into curated articles on ${title} in Russian prison culture.`,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description: `Dive into curated articles on ${title} in Russian prison culture.`,
      url: pageUrl,
      siteName: 'Russian Prison Culture',
    },
  };
}

interface SectionPageProps {
  params: { section: string } | Promise<{ section: string }>;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  const articles: Article[] = await fetchRelatedArticles(section);
  if (!articles) return notFound();

  const title = section.charAt(0).toUpperCase() + section.slice(1);
  const pageUrl = `${SITE_URL}/${section}`;

  return (
    <>
      <Head>
        <link rel="canonical" href={pageUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
                { '@type': 'ListItem', position: 2, name: title },
              ],
            }),
          }}
        />
      </Head>

      <div className="page-wrapper bg-black text-[#f5e8c7] py-16 px-6">
        {/* Навигация */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: title }]} />

        <div className="container mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold uppercase mb-6 border-b-2 border-[#c9ad77] pb-4">
            {title}
          </h1>
          <p className="text-lg mb-12 max-w-2xl text-[#ddd]">
            Dive into curated articles on{' '}
            <span className="font-semibold text-[#c9ad77]">{title}</span> in Russian prison culture.
            Explore traditions, art, and the hidden codes behind prison walls.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <div
                key={article.id}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <ArticleCard
                  img={article.cover?.url || article.images?.[0]?.url || '/images/placeholder.jpg'}
                  alt={article.cover?.alt_text || article.images?.[0]?.alt_text || article.title}
                  title={article.title}
                  desc={article.excerpt || ''}
                  href={`/${section}/${article.slug}`}
                />
              </div>
            ))}
          </div>

          {/* Pagination (по желанию) */}
          <div className="mt-16 flex justify-center space-x-4">
            <a
              href="#"
              className="px-5 py-2 bg-[#3f2c1a] hover:bg-[#5a4228] rounded-md transition-colors"
            >
              &larr; Prev
            </a>
            <a
              href="#"
              className="px-5 py-2 bg-[#3f2c1a] hover:bg-[#5a4228] rounded-md transition-colors"
            >
              Next &rarr;
            </a>
          </div>
        </div>
        <BackButton />
      </div>
    </>
  );
}
