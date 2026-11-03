// scripts/import-to-meili.cjs

require('dotenv').config();
const { MeiliSearch } = require('meilisearch');
const fetch = require('node-fetch');

const { DIRECTUS_URL, MEILI_HOST, MEILI_MASTER_KEY, MEILI_INDEX = 'articles' } = process.env;

async function fetchArticles() {
  const url = `${DIRECTUS_URL}/items/articles?fields=id,title,excerpt,content,slug,section&limit=-1`;
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
  const update = await client.index(MEILI_INDEX).addDocuments(docs);
  console.log(`🚀 Индексация запущена, taskUid = ${update.taskUid}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
