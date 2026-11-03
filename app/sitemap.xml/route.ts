import { Article } from '@/app/lib/types';
import { SECTIONS } from '@/app/lib/sections';

export async function GET() {
  const baseUrl = 'https://vzakone.com';

  try {
    // 1. Забираем slug и section из Directus
    const res = await fetch(`${process.env.DIRECTUS_URL}/items/articles?fields=slug,section&limit=-1`, {
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
      },
      next: { revalidate: 3600 },
    });

    const json = await res.json();

    // Защищаемся: если data нет — ставим []
    const articles: Article[] = Array.isArray(json?.data) ? json.data : [];

    // 2. Фильтруем: оставляем slug с латинскими буквами
    const clean = articles.filter(({ slug }) => /[a-zA-Z]/.test(slug));

    // 3. Формируем URL и приоритеты
    const urls = [
      { loc: baseUrl, priority: 1.0 },

      // Страницы разделов — только те, где уже есть статьи
      ...Object.keys(SECTIONS)
        .filter(section => clean.some(a => a.section === section))
        .map(section => ({ loc: `${baseUrl}/${section}`, priority: 0.9 })),

      ...clean.map(({ section, slug }) => ({
        loc: `${baseUrl}/${section}/${slug}`,
        priority: 0.8,
      })),
    ];

    // 4. Генерируем XML
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
  } catch (err) {
    console.error('Sitemap error:', err);

    // Возвращаем пустой sitemap, но НЕ ломаем сборку
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset></urlset>`, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
