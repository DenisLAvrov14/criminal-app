export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  image: string;
  publishedAt: string;
  author: string;
  section: string;
}

/**
 * Получить одну статью по её slug
 */
export async function fetchArticleBySlug(slug: string): Promise<Article> {
  // Пример для Directus:
  const res = await fetch(
    `${process.env.DIRECTUS_URL}/items/articles?filter[slug][_eq]=${slug}&limit=1`,
    {
      headers: { Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}` },
    }
  );
  const json = await res.json();
  if (!json.data?.length) throw new Error('Article not found');
  return json.data[0] as Article;
}

/**
 * Получить несколько «родственных» статей из той же секции
 */
export async function fetchRelatedArticles(section: string): Promise<Article[]> {
  const res = await fetch(
    `${process.env.DIRECTUS_URL}/items/articles?filter[section][_eq]=${section}&limit=3`,
    { headers: { Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}` } }
  );
  const json = await res.json();
  return json.data as Article[];
}

/**
 * (Дополнительно) Получить список всех статей для страницы /articles
 */
export async function fetchAllArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.DIRECTUS_URL}/items/articles?sort=-publishedAt`, {
    headers: { Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}` },
  });
  const json = await res.json();
  return json.data as Article[];
}
