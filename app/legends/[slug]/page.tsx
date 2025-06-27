// File: app/legends/[slug]/page.tsx

import { notFound } from 'next/navigation';
import LegendArticle from '@/app/components/LegendArticle/LegendArticle';

const DIRECTUS_URL = process.env.DIRECTUS_URL!;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN!;
const HEADERS: HeadersInit = DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {};

interface ImageRelation {
  directus_files_id: string;
}
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
  const res = await fetch(`${DIRECTUS_URL}/items/articles?${params}`, { headers: HEADERS });
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
  const res = await fetch(`${DIRECTUS_URL}/items/articles?${params}`, { headers: HEADERS });
  if (!res.ok) return null;
  const json = await res.json();
  return (json.data as LegendRecord[])[0] ?? null;
}

interface Props {
  params: { slug: string };
}

export default async function LegendDetailPage({ params }: Props) {
  const record = await fetchLegendBySlug(params.slug);
  if (!record) return notFound();

  const imageIds = record.images?.map(i => i.directus_files_id) ?? [];
  const imageUrls = imageIds.map(id => `${DIRECTUS_URL}/assets/${id}`);

  return (
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
  );
}
