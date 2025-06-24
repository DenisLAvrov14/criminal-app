import { Article, DirectusArticle, DirectusFile, DirectusResponse, File } from './types';

const DIRECTUS_URL = process.env.DIRECTUS_URL!;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN!;

/**
 * Поля, которые будем запрашивать у Directus.
 * Разворачиваем images и cover через junction-ключи.
 * Убраны поля published_date и author, их нет в коллекции.
 */
const ARTICLE_FIELDS = [
  'id',
  'slug',
  'title',
  'excerpt',
  'content',
  'meta_title',
  'meta_description',
  'section',
  // M2M images через wrapper
  'images.directus_files_id.*',
  // single-file cover: сразу все поля файла
  'cover.*',
].join(',');

// Заголовки с индексной сигнатурой для корректной типизации
const getHeaders = (): Record<string, string> => ({
  Authorization: `Bearer ${DIRECTUS_TOKEN}`,
});

/** Выполняет запрос и отдает массив сырых DirectusArticle */
async function fetchFromDirectus(params: URLSearchParams): Promise<DirectusArticle[]> {
  const url = new URL(`${DIRECTUS_URL}/items/articles`);
  params.forEach((v, k) => url.searchParams.set(k, v));

  console.log('→ Directus URL:', url.toString());
  console.log('→ Authorization header:', getHeaders()['Authorization']);

  const res = await fetch(url.toString(), { headers: getHeaders() });
  if (!res.ok) {
    const text = await res.text();
    console.error('📛 Directus error:', res.status, res.statusText, text);
    throw new Error(`Directus API error: ${res.status} ${res.statusText} – ${text}`);
  }

  const json = (await res.json()) as DirectusResponse<DirectusArticle>;
  return json.data;
}

/** Собирает абсолютный URL для DirectusFile */
function buildUrl(f: DirectusFile): string {
  const path =
    f.url && f.url !== null
      ? f.url.startsWith('http')
        ? f.url
        : `${DIRECTUS_URL}${f.url}`
      : `${DIRECTUS_URL}/assets/${f.id}`;
  console.log('> buildUrl for file:', f.id, '→', path);
  return path;
}

/** Преобразование из DirectusArticle → наш Article */
function transformArticle(item: DirectusArticle): Article {
  // M2M images (wrapper.directus_files_id)
  const images: File[] = (item.images ?? [])
    .map(wrapper => wrapper.directus_files_id)
    .filter((f): f is DirectusFile => !!f)
    .map(f => ({
      id: f.id,
      url: buildUrl(f),
      title: f.title,
      description: f.description ?? undefined,
      type: f.type,
      size: f.filesize,
      alt_text: f.alt_text ?? undefined,
    }));

  // single-file cover может быть wrapper или сразу DirectusFile
  let cover: File | null = null;
  const rawCover = (item.cover as any)?.directus_files_id ?? (item.cover as any);
  if (rawCover && typeof rawCover.id === 'string') {
    const f = rawCover as DirectusFile;
    cover = {
      id: f.id,
      url: buildUrl(f),
      title: f.title,
      description: f.description ?? undefined,
      type: f.type,
      size: f.filesize,
      alt_text: f.alt_text ?? undefined,
    };
  }

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    contentHtml: item.content,
    meta_title: item.meta_title,
    meta_description: item.meta_description,
    section: item.section,
    images,
    cover,
  };
}

export async function fetchArticleBySlug(slug: string): Promise<Article> {
  const params = new URLSearchParams({
    fields: ARTICLE_FIELDS,
    'filter[slug][_eq]': slug,
    limit: '1',
  });
  const [raw] = await fetchFromDirectus(params);
  if (!raw) throw new Error(`Article not found with slug: ${slug}`);
  return transformArticle(raw);
}

export async function fetchRelatedArticles(
  section?: string,
  limit: number = 3
): Promise<Article[]> {
  const params = new URLSearchParams({
    fields: ARTICLE_FIELDS,
    limit: limit.toString(),
  });
  if (section) params.set('filter[section][_eq]', section);
  const raws = await fetchFromDirectus(params);
  return raws.map(transformArticle);
}

export async function fetchAllArticles(): Promise<Article[]> {
  const params = new URLSearchParams({ fields: ARTICLE_FIELDS });
  const raws = await fetchFromDirectus(params);
  return raws.map(transformArticle);
}

export async function fetchArticlesWithPagination(
  page: number = 1,
  limit: number = 10
): Promise<{ articles: Article[]; total: number }> {
  const offset = (page - 1) * limit;
  const params = new URLSearchParams({
    fields: ARTICLE_FIELDS,
    limit: limit.toString(),
    offset: offset.toString(),
  });
  const items = await fetchFromDirectus(params);

  const countParams = new URLSearchParams({ fields: 'id' });
  const all = await fetchFromDirectus(countParams);

  console.log(
    '⏳ Fetching articles from:',
    `${DIRECTUS_URL}/items/articles?${params.toString()}`,
    '\nToken starts with:',
    DIRECTUS_TOKEN?.slice(0, 8)
  );

  return {
    articles: items.map(transformArticle),
    total: all.length,
  };
}
