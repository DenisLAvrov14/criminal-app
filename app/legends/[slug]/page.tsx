import { notFound } from 'next/navigation';
import Head from 'next/head';
import { Metadata } from 'next';
import LegendArticle from '@/app/components/LegendArticle/LegendArticle';
import BackButton from '@/app/ui/BackButton.tsx/BackButton';
import Breadcrumbs from '@/app/ui/Breadcrumbs/Breadcrumbs';

const DIRECTUS_URL = process.env.DIRECTUS_URL!;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN!;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const HEADERS: HeadersInit = DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {};

// Пивоты images → directus_files
interface ImageRelation {
  directus_files_id: string;
}

// Модель легенды
interface LegendRecord {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
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

export const revalidate = 60;

export async function generateStaticParams() {
  const params = new URLSearchParams({
    'filter[section][_eq]': 'legends',
    fields: 'slug',
  });
  const res = await fetch(`${DIRECTUS_URL.replace(/\/$/, '')}/items/articles?${params}`, {
    headers: HEADERS,
  });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data as { slug: string }[]).map(i => ({ slug: i.slug }));
}

async function fetchLegendBySlug(slug: string): Promise<LegendRecord | null> {
  const params = new URLSearchParams({
    'filter[section][_eq]': 'legends',
    'filter[slug][_eq]': slug,
    fields: [
      'slug',
      'title',
      'excerpt',
      'content',
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
  const res = await fetch(`${DIRECTUS_URL.replace(/\/$/, '')}/items/articles?${params}`, {
    headers: HEADERS,
  });
  if (!res.ok) return null;
  const json = await res.json();
  return (json.data as LegendRecord[])[0] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const record = await fetchLegendBySlug(params.slug);
  if (!record) return { title: 'Not found' };
  const pageUrl = `${SITE_URL}/legends/${params.slug}`;
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

interface Props {
  params: { slug: string };
}

export default async function LegendDetailPage({ params }: Props) {
  const record = await fetchLegendBySlug(params.slug);
  if (!record) return notFound();

  const imageIds = record.images?.map(i => i.directus_files_id) ?? [];
  const imageUrls = imageIds.map(id => `${DIRECTUS_URL.replace(/\/$/, '')}/assets/${id}`);
  const pageUrl = `${SITE_URL}/legends/${params.slug}`;

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
                { '@type': 'ListItem', position: 2, name: 'Legends', item: SITE_URL + '/legends' },
                { '@type': 'ListItem', position: 3, name: record.title },
              ],
            }),
          }}
        />
      </Head>

      <div className="page-wrapper container mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Legends', href: '/legends' },
            { label: record.title },
          ]}
        />
        <LegendArticle
          title={record.title}
          excerpt={record.excerpt}
          contentHtml={record.content}
          imageUrls={imageUrls}
          fio={record.fio}
          nickname={record.nickname}
          birthdate={record.birthdate}
          deathdate={record.deathdate}
          birthplace={record.birthplace}
          residence={record.residence}
          nationality={record.nationality}
          status={record.status}
        />
        <BackButton />
      </div>
    </>
  );
}
