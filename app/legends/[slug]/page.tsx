// File: app/legends/[slug]/page.tsx

import { notFound } from 'next/navigation';
import React from 'react';
import LegendArticle, { LegendArticleProps } from '@/app/components/LegendArticle/LegendArticle';

const ENDPOINT = `${process.env.DIRECTUS_URL}/items/legends`;
const HEADERS: HeadersInit = process.env.DIRECTUS_TOKEN
  ? { Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}` }
  : {};

interface LegendRecord extends LegendArticleProps {
  slug: string;
}

async function fetchLegendBySlug(slug: string): Promise<LegendRecord | null> {
  const res = await fetch(
    `${ENDPOINT}?filter[slug][_eq]=${encodeURIComponent(slug)}` +
      `&fields=slug,title,content,cover.url,` +
      `fio,nickname,birthdate,birthplace,residence,` +
      `nationality,status,crowned_date,crowned_place,` +
      `crowned_by,godparents`,
    { headers: HEADERS }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json.data?.[0] ?? null;
}

export async function generateStaticParams() {
  const res = await fetch(`${ENDPOINT}?fields=slug`, { headers: HEADERS });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data as { slug: string }[]).map(x => ({ slug: x.slug }));
}

interface Props {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function LegendDetailPage({ params }: Props) {
  const { slug } = await params;
  const record = await fetchLegendBySlug(slug);
  if (!record) return notFound();

  return <LegendArticle {...record} />;
}
