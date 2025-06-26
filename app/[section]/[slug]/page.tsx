import { notFound } from 'next/navigation';
import DefaultArticle from '@/app/components/DefaultArticle/DefaultArticle';
import LegendArticle from '@/app/components/LegendArticle/LegendArticle';

const DIRECTUS_URL = process.env.DIRECTUS_URL!;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN!;

async function fetchBySectionSlug(section: string, slug: string) {
  const res = await fetch(
    `${DIRECTUS_URL}/items/${section}?filter[slug][_eq]=${encodeURIComponent(slug)}`,
    { headers: DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {} }
  );
  if (!res.ok) return null;
  const { data } = await res.json();
  return data?.[0] ?? null;
}

export async function generateStaticParams() {
  const sections = ['music', 'legends'];
  const all = await Promise.all(
    sections.map(async section => {
      const res = await fetch(`${DIRECTUS_URL}/items/${section}?fields=slug`, {
        headers: DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {},
      });
      if (!res.ok) return [];
      const { data } = await res.json();
      return data.map((item: { slug: string }) => ({ section, slug: item.slug }));
    })
  );
  return all.flat();
}

export default async function SectionDetailPage({
  params,
}: {
  params: { section: string; slug: string } | Promise<{ section: string; slug: string }>;
}) {
  // ждём params
  const { section, slug } = await params;

  const data = await fetchBySectionSlug(section, slug);
  if (!data) return notFound();

  if (section === 'legends') {
    return (
      <LegendArticle title={data.title} content={data.content} publishedAt={data.published_at} />
    );
  }

  return <DefaultArticle {...data} />;
}
