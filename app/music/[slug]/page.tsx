// File: app/music/[slug]/page.tsx

import { notFound } from 'next/navigation';
import React from 'react';
import MusicArticle from '@/app/components/MusicArticle/MusicArticle';

// из .env
const DIRECTUS_URL = process.env.DIRECTUS_URL!;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN!;
const HEADERS: HeadersInit = DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {};

// тип записи
interface MusicRecord {
  slug: string;
  title: string;
  content: string;
  published_at: string;
  // … другие поля, если нужно
}

// получаем одну статью из коллекции articles, фильтруя по section=music и по slug
async function fetchMusicBySlug(slug: string): Promise<MusicRecord | null> {
  const res = await fetch(
    `${DIRECTUS_URL}/items/articles?filter[section][_eq]=music&filter[slug][_eq]=${encodeURIComponent(slug)}`,
    { headers: HEADERS }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json.data?.[0] ?? null;
}

// SSG: генерим именно те slug’ы, которые относятся к music
export async function generateStaticParams() {
  const res = await fetch(`${DIRECTUS_URL}/items/articles?filter[section][_eq]=music&fields=slug`, {
    headers: HEADERS,
  });
  if (!res.ok) return [];
  const json = await res.json();
  // json.data = [{ slug: 'misha-krug' }, …]
  return (json.data as { slug: string }[]).map(item => ({ slug: item.slug }));
}

interface Props {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function MusicDetailPage({ params }: Props) {
  // ждём params (Next.js 13.4+)
  const { slug } = await params;

  const record = await fetchMusicBySlug(slug);
  if (!record) return notFound();

  return (
    <MusicArticle title={record.title} content={record.content} publishedAt={record.published_at} />
  );
}
