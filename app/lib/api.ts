// File: app/lib/api.ts

import { Article, DirectusArticle, DirectusFile, DirectusResponse, File } from './types';

const DIRECTUS_URL = process.env.DIRECTUS_URL!;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN!;

/**
 * Поля, которые будем запрашивать у Directus.
 * Разворачиваем images и cover через junction-ключи.
 * Добавлены поля из Directus для базовых статей.
 */
export const ARTICLE_FIELDS = [
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
  // дополнительные поля
  'fio',
  'nickname',
  'birthdate',
  'birthplace',
  'residence',
  'nationality',
  'status',
].join(',');

// Заголовки с индексной сигнатурой для корректной типизации
const getHeaders = (): Record<string, string> => ({
  Authorization: `Bearer ${DIRECTUS_TOKEN}`,
});

/** Выполняет запрос и отдает массив сырых DirectusArticle */
export async function fetchFromDirectus(params: URLSearchParams): Promise<DirectusArticle[]> {
  const url = new URL(`${DIRECTUS_URL}/items/articles`);
  params.forEach((v, k) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), { headers: getHeaders(), cache: 'no-store' });

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
  if (f.url) {
    return f.url.startsWith('http') ? f.url : `${DIRECTUS_URL}${f.url}`;
  }
  return `${DIRECTUS_URL}/assets/${f.id}`;
}

/** Преобразование из DirectusArticle → наш Article */
export function transformArticle(item: DirectusArticle): Article {
  // M2M images (wrapper.directus_files_id)
  const images: File[] = (item.images ?? [])
    .map(wrapper => wrapper.directus_files_id)
    .filter((f): f is DirectusFile => Boolean(f))
    .map(f => ({
      id: f.id,
      url: buildUrl(f),
      title: f.title,
      description: f.description ?? undefined,
      type: f.type,
      size: f.filesize,
      width: f.width ?? undefined,
      height: f.height ?? undefined,
      alt_text: f.alt_text ?? undefined,
    }));

  // single-file cover может быть wrapper или сразу DirectusFile
  let cover: File | null = null;
  const coverField = item.cover as unknown;
  if (coverField && typeof coverField === 'object') {
    if ('directus_files_id' in coverField) {
      const f = (coverField as { directus_files_id: DirectusFile }).directus_files_id;
      cover = {
        id: f.id,
        url: buildUrl(f),
        title: f.title,
        description: f.description ?? undefined,
        type: f.type,
        size: f.filesize,
        width: f.width ?? undefined,
        height: f.height ?? undefined,
        alt_text: f.alt_text ?? undefined,
      };
    } else if ('id' in coverField) {
      const f = coverField as DirectusFile;
      cover = {
        id: f.id,
        url: buildUrl(f),
        title: f.title,
        description: f.description ?? undefined,
        type: f.type,
        size: f.filesize,
        width: f.width ?? undefined,
        height: f.height ?? undefined,
        alt_text: f.alt_text ?? undefined,
      };
    }
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

    // дополнительные поля
    fio: item.fio ?? undefined,
    nickname: item.nickname ?? undefined,
    birthdate: item.birthdate ?? undefined,
    birthplace: item.birthplace ?? undefined,
    residence: item.residence ?? undefined,
    nationality: item.nationality ?? undefined,
    status: item.status ?? undefined,
  };
}

/** Возвращает null, если статьи нет — страница отдаст 404, а не 500 */
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const params = new URLSearchParams({
    fields: ARTICLE_FIELDS,
    'filter[slug][_eq]': slug,
    limit: '1',
  });
  const [raw] = await fetchFromDirectus(params);
  return raw ? transformArticle(raw) : null;
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

export async function fetchAllArticles(limit: number = 20): Promise<Article[]> {
  const params = new URLSearchParams({
    fields: ARTICLE_FIELDS,
    sort: '-id', // 👈 новые сначала
    limit: limit.toString(), // 👈 ограничение (по умолчанию 20)
  });

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

  return {
    articles: items.map(transformArticle),
    total: all.length,
  };
}

export async function getSimilarArticles(slug: string, section: string): Promise<Article[]> {
  // убираем возможный конец «/»
  const base = DIRECTUS_URL.replace(/\/$/, '');
  const url = [
    `${base}/items/articles`,
    `filter[slug][_neq]=${encodeURIComponent(slug)}`,
    `filter[section][_eq]=${encodeURIComponent(section)}`,
    `limit=3`,
    `sort=-id`,
  ]
    .join('&')
    .replace(`${base}/items/articles&`, `${base}/items/articles?`);

  const res = await fetch(url, {
    headers: DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {},
    next: { revalidate: 60 }, // ISR каждые 60 секунд
  });

  if (!res.ok) {
    console.error('getSimilarArticles error', res.status, await res.text());
    return [];
  }

  const json = await res.json();
  // если data не массив — возвращаем пустой
  return Array.isArray(json.data) ? json.data : [];
}
