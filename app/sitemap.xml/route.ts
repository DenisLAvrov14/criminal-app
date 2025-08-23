import { Article } from '@/app/lib/types';

export async function GET() {
  const baseUrl = 'https://vzakone.com';

  // 1. Забираем все slug и section из Directus
  const res = await fetch(
    `${process.env.DIRECTUS_URL}/items/articles?fields=slug,section`,
    {
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
      },
      next: { revalidate: 3600 },
    }
  );

  const json = await res.json();
  const articles: Article[] = json.data;

  // 2. Фильтруем: оставляем только slug-ы, содержащие буквы
  const clean = articles.filter(({ slug }) =>
    // хотя бы одна латинская буква a–z
    /[a-zA-Z]/.test(slug)
  );

  // 3. Собираем список точек для sitemap
  const urls = [
    { loc: baseUrl, priority: 1.0 },
    // при необходимости можно добавить общие разделы, напр.:
    // { loc: `${baseUrl}/tattoos`, priority: 0.9 },
    ...clean.map(({ section, slug }) => ({
      loc: `${baseUrl}/${section}/${slug}`,
      priority: 0.8,
    })),
  ];

  // 4. Рендерим xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) => `
  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
