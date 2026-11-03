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
import { FooterSubscribe } from '../components/FooterSubscribe/FooterSubscribe';
import { SECTIONS, sectionTitle } from '@/app/lib/sections';

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
  const title = sectionTitle(section);
  const description = SECTIONS[section]?.intro ?? `Articles on ${title}`;
  const pageUrl = `${SITE_URL}/${section}`;
  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
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
  if (pageItems.length === 0) {
    // Раздел из справочника, где ещё нет статей, — показываем заглушку, остальное 404
    if (pageNum === 1 && SECTIONS[section]) return <ComingSoon section={section} />;
    return notFound();
  }

  // 2) Отдельно запросим общее число статей этого раздела (для пагинации)
  const countParams = new URLSearchParams({
    'filter[section][_eq]': section,
    fields: 'id',
  });
  const allRaw = await fetchFromDirectus(countParams);
  const total = allRaw.length;

  const title = sectionTitle(section);
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
          <p className="text-lg mb-12 max-w-2xl text-[#ddd]">{SECTIONS[section]?.intro}</p>

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

function ComingSoon({ section }: { section: string }) {
  const { title, intro } = SECTIONS[section];
  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: title }]} />
      <div className="container mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold uppercase mb-6 border-b-2 border-[#c9ad77] pb-4">
          {title}
        </h1>
        <p className="text-lg mb-10 max-w-2xl text-[#ddd]">{intro}</p>
        <div className="mb-8 max-w-md rounded-lg border border-[#333] bg-[#111] p-6">
          <p className="mb-4 text-[#f5e8c7]">
            The first articles are being written. Subscribe to get them as soon as they are out.
          </p>
          <FooterSubscribe />
        </div>
        <BackButton />
      </div>
    </div>
  );
}
