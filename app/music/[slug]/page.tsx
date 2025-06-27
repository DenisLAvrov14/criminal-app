// File: app/music/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Head from 'next/head';
import { Metadata } from 'next';
import MusicArticle from '@/app/components/MusicArticle/MusicArticle';
import BackButton from '@/app/ui/BackButton.tsx/BackButton';
import Breadcrumbs from '@/app/ui/Breadcrumbs/Breadcrumbs';

// из .env
const DIRECTUS_URL = process.env.DIRECTUS_URL!;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN!;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const HEADERS: HeadersInit = DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {};

// Типы
interface ImageRelation {
  articles_files_id?: number;
  directus_files_id: string;
}
interface MusicRecord {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  video_url?: string;
  fio?: string;
  nickname?: string;
  birthdate?: string;
  deathdate?: string;
  birthplace?: string;
  residence?: string;
  nationality?: string;
  status?: string;
  images?: ImageRelation[];
}

// ISR: обновлять каждую минуту
export const revalidate = 60;

/** OpenGraph, Twitter и canonical */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const record = await fetchMusicBySlug(params.slug);
  if (!record) return { title: 'Not found' };

  const pageUrl = `${SITE_URL}/music/${params.slug}`;
  const ogImage = record.images?.[0]?.directus_files_id
    ? `${DIRECTUS_URL.replace(/\/$/, '')}/assets/${record.images[0]!.directus_files_id}`
    : undefined;

  return {
    title: record.title,
    description: record.excerpt,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: record.title,
      description: record.excerpt,
      url: pageUrl,
      siteName: 'Russian Prison Culture',
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: record.title,
      description: record.excerpt,
      images: ogImage ? [ogImage] : [],
    },
  };
}

async function fetchMusicBySlug(slug: string): Promise<MusicRecord | null> {
  const params = new URLSearchParams({
    'filter[section][_eq]': 'music',
    'filter[slug][_eq]': slug,
    fields: [
      'slug',
      'title',
      'excerpt',
      'content',
      'video_url',
      'fio',
      'nickname',
      'birthdate',
      'deathdate',
      'birthplace',
      'residence',
      'nationality',
      'status',
      'images.directus_files_id',
    ].join(','),
  });
  const base = DIRECTUS_URL.replace(/\/$/, '');
  const url = `${base}/items/articles?${params.toString()}`;
  console.log('→ Directus URL:', url);

  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    console.error('Directus fetch error:', res.status, res.statusText, await res.text());
    return null;
  }
  const json = await res.json();
  return (json.data as MusicRecord[])[0] ?? null;
}

interface Props {
  params: { slug: string };
}

export default async function MusicDetailPage({ params }: Props) {
  const record = await fetchMusicBySlug(params.slug);
  if (!record) return notFound();

  // Строим coverUrl
  const fileId = record.images?.[0]?.directus_files_id;
  const coverUrl = fileId ? `${DIRECTUS_URL.replace(/\/$/, '')}/assets/${fileId}` : undefined;

  const pageUrl = `${SITE_URL}/music/${params.slug}`;

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
                { '@type': 'ListItem', position: 2, name: 'Music', item: SITE_URL + '/music' },
                { '@type': 'ListItem', position: 3, name: record.title },
              ],
            }),
          }}
        />
      </Head>

      {/* --- Обёртка для всего контента страницы --- */}
      <div className="page-wrapper container mx-auto px-6 py-12">
        {/* Хлебные крошки */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Music', href: '/music' },
            { label: record.title },
          ]}
        />

        {/* Основной контент */}
        <MusicArticle
          title={record.title}
          excerpt={record.excerpt}
          contentHtml={record.content}
          videoUrl={record.video_url}
          coverUrl={coverUrl}
          fio={record.fio}
          nickname={record.nickname}
          birthdate={record.birthdate}
          deathdate={record.deathdate}
          birthplace={record.birthplace}
          residence={record.residence}
          nationality={record.nationality}
          status={record.status}
        />
        {/* Назад */}
        <BackButton />
      </div>
    </>
  );
}
