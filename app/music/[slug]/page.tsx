// File: app/music/[slug]/page.tsx

import { notFound } from 'next/navigation';
import MusicArticle from '@/app/components/MusicArticle/MusicArticle';
import { File } from '@/app/lib/types';

// из .env
const DIRECTUS_URL = process.env.DIRECTUS_URL!;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN!;
const HEADERS: HeadersInit = DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {};

// Промежуточный тип для связи images → pivot (articles_files)
interface ImageRelation {
  articles_files_id?: number; // pivot record id (optional)
  directus_files_id: string; // UUID файла
}

// Тип записи, соответствующий полям Directus
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

/**
 * Фетч одной записи из articles, секция music
 * Запрашиваем UUID файлов через images.directus_files_id
 */
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
      // запрашиваем UUID файлов из pivot
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

/**
 * Для SSG: генерируем статические пути только для раздела music
 */
export async function generateStaticParams() {
  const params = new URLSearchParams({
    'filter[section][_eq]': 'music',
    fields: 'slug',
  });
  const base = DIRECTUS_URL.replace(/\/$/, '');
  const url = `${base}/items/articles?${params.toString()}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data as { slug: string }[]).map(item => ({ slug: item.slug }));
}

interface Props {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function MusicDetailPage({ params }: Props) {
  const { slug } = await params;
  const record = await fetchMusicBySlug(slug);
  if (!record) return notFound();

  console.log('🖼 images pivot:', record.images);

  // Берём UUID первого файла
  const fileId = record.images?.[0]?.directus_files_id;
  const coverUrl = fileId ? `${DIRECTUS_URL.replace(/\/$/, '')}/assets/${fileId}` : undefined;

  console.log('🖼 coverUrl:', coverUrl);

  return (
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
  );
}
