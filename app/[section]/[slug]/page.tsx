// File: app/[section]/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Head from 'next/head';
import { Metadata } from 'next';
import { fetchArticleBySlug } from '@/app/lib/api';
import { Article } from '@/app/lib/types';
import Breadcrumbs from '@/app/ui/Breadcrumbs/Breadcrumbs';
import BackButton from '@/app/ui/BackButton.tsx/BackButton';

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
export const revalidate = 60;

// SEO: title/description/OG/twitter + canonical
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section, slug } = await params;
  const article: Article = await fetchArticleBySlug(slug);

  if (!article || article.section !== section) {
    return { title: 'Not Found' };
  }

  const pageUrl = `${SITE_URL}/${section}/${slug}`;
  // Берём первую картинку из images[]
  const image = article.images?.[0]?.url;

  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.excerpt || '',
    alternates: { canonical: pageUrl },
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || '',
      url: pageUrl,
      siteName: 'Russian Prison Culture',
      images: image ? [image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || '',
      images: image ? [image] : [],
    },
  };
}

interface Props {
  params: Promise<{ section: string; slug: string }>;
}

export default async function SectionSlugPage({ params }: Props) {
  const { section, slug } = await params;
  const article: Article = await fetchArticleBySlug(slug);

  if (!article || article.section !== section) {
    return notFound();
  }

  const { title, excerpt, images } = article;
  // Первая картинка
  const imageUrl = images?.[0]?.url;

  return (
    <>
      <Head>
        <link rel="canonical" href={`${SITE_URL}/${section}/${slug}`} />
      </Head>

      <div className="page-wrapper container mx-auto px-6 py-12 space-y-8">
        {/* Навигация */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            {
              label: section.charAt(0).toUpperCase() + section.slice(1),
              href: `/${section}`,
            },
            { label: title },
          ]}
        />

        {/* Фото */}
        {imageUrl && (
          <div className="w-full h-80 relative rounded-lg overflow-hidden shadow-lg">
            <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
          </div>
        )}

        {/* Описание */}
        {excerpt && <p className="text-lg text-[#ddd]">{excerpt}</p>}

        {/* Кнопка «Назад» */}
        <BackButton />
      </div>
    </>
  );
}
