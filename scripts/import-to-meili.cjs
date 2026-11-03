// scripts/import-to-meili.cjs

require('dotenv').config();
const { MeiliSearch } = require('meilisearch');
const fetch = require('node-fetch');

const { DIRECTUS_URL, MEILI_HOST, MEILI_MASTER_KEY, MEILI_INDEX = 'articles' } = process.env;

async function fetchArticles() {
  // Отложенные статьи (publish_date в будущем) в поиск не попадают
  const params = new URLSearchParams({
    fields: 'id,title,excerpt,content,slug,section',
    limit: '-1',
    'filter[_or][0][publish_date][_null]': 'true',
    'filter[_or][1][publish_date][_lte]': '$NOW',
  });
  const url = `${DIRECTUS_URL}/items/articles?${params}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Directus API error ${res.status}`);
  }
  const { data } = await res.json();
  return data;
}

async function main() {
  const client = new MeiliSearch({ host: MEILI_HOST, apiKey: MEILI_MASTER_KEY });

  // 1) Создаём индекс, если его нет
  try {
    await client.getIndex(MEILI_INDEX);
  } catch {
    await client.createIndex(MEILI_INDEX, { primaryKey: 'id' });
    console.log(`✅ Создан индекс "${MEILI_INDEX}"`);
  }

  // 2) Достаём статьи из публичного Directus
  const articles = await fetchArticles();
  console.log(`ℹ️  Получено статей: ${articles.length}`);

  // 3) Преобразуем и заливаем в MeiliSearch
  const docs = articles.map(a => ({
    id: a.id,
    title: a.title,
    excerpt: a.excerpt,
    content: a.content,
    slug: a.slug,
    section: a.section,
  }));

  const index = client.index(MEILI_INDEX);
  const update = await index.addDocuments(docs);
  console.log(`🚀 Индексация запущена, taskUid = ${update.taskUid}`);

  // 4) Убираем из поиска то, чего больше нет среди опубликованных (удалённые или перенесённые статьи)
  const keep = new Set(docs.map(d => d.id));
  const { results } = await index.getDocuments({ fields: ['id'], limit: 10000 });
  const stale = results.map(d => d.id).filter(id => !keep.has(id));
  if (stale.length) {
    await index.deleteDocuments(stale);
    console.log(`🧹 Удалено из поиска: ${stale.length}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
