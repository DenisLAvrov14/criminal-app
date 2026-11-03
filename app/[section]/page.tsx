// File: app/[section]/page.tsx

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { fetchFromDirectus, transformArticle } from '@/app/lib/api'; // см. ниже
import { ARTICLE_FIELDS } from '@/app/lib/api';
import { Article } from '@/app/lib/types';
import Breadcrumbs from '../ui/Breadcrumbs/Breadcrumbs';
import BackButton from '../ui/BackButton.tsx/BackButton';
import { ArticleCard } from '../components/ArticleCard/ArticleCard';

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
export const revalidate = 60;

interface SectionPageProps {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const title = section[0].toUpperCase() + section.slice(1);
  const pageUrl = `${SITE_URL}/${section}`;
  return {
    title,
    description: `Dive into curated articles on ${title}…`,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description: `Dive into…`,
      url: pageUrl,
      siteName: 'Russian Criminal Culture',
    },
  };
}

export default async function SectionPage({ params, searchParams }: SectionPageProps) {
  const { section } = await params;
  const { page } = await searchParams;
  const pageNum = parseInt(page ?? '1', 10);
  if (isNaN(pageNum) || pageNum < 1) return notFound();

  const perPage = 6;
  const offset = (pageNum - 1) * perPage;

  // 1) Запросим 6 статей нужного раздела с offset
  const listParams = new URLSearchParams({
    fields: ARTICLE_FIELDS,
    'filter[section][_eq]': section,
    limit: perPage.toString(),
    offset: offset.toString(),
    sort: '-id', // самые новые сверху
  });
  const raws = await fetchFromDirectus(listParams);
  const pageItems: Article[] = raws.map(transformArticle);
  if (pageItems.length === 0) return notFound();

  // 2) Отдельно запросим общее число статей этого раздела (для пагинации)
  const countParams = new URLSearchParams({
    'filter[section][_eq]': section,
    fields: 'id',
  });
  const allRaw = await fetchFromDirectus(countParams);
  const total = allRaw.length;

  const title = section[0].toUpperCase() + section.slice(1);
  const baseUrl = `/${section}`;

  // canonical задаётся в generateMetadata
  return (
    <>
      <div>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: title }]} />

        <div className="container mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold uppercase mb-6 border-b-2 border-[#c9ad77] pb-4">
            {title}
          </h1>
          <p className="text-lg mb-12 max-w-2xl text-[#ddd]">
            Dive into curated articles on{' '}
            <span className="font-semibold text-[#c9ad77]">{title}</span> …
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageItems.map(article => (
              <div key={article.id}>
                <ArticleCard
                  img={article.cover?.url || article.images?.[0]?.url || '/images/placeholder.jpg'}
                  alt={article.cover?.alt_text || article.images?.[0]?.alt_text || article.title}
                  title={article.title}
                  desc={article.excerpt || ''}
                  href={`${baseUrl}/${article.slug}`}
                />
              </div>
            ))}
          </div>

          {/* Пагинация */}
          <div className="mt-16 flex justify-center space-x-4">
            {pageNum > 1 && (
              <Link
                href={`${baseUrl}${pageNum > 2 ? `?page=${pageNum - 1}` : ''}`}
                className="px-5 py-2 bg-[#3f2c1a] hover:bg-[#5a4228] rounded-md"
              >
                ← Prev
              </Link>
            )}
            {offset + perPage < total && (
              <Link
                href={`${baseUrl}?page=${pageNum + 1}`}
                className="px-5 py-2 bg-[#3f2c1a] hover:bg-[#5a4228] rounded-md"
              >
                Next →
              </Link>
            )}
          </div>

          <BackButton />
        </div>
      </div>
    </>
  );
}
