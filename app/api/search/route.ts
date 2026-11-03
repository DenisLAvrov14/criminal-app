import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MEILI_HOST = process.env.MEILI_HOST;
// Для поиска нужен только search-ключ; master key оставляем для скрипта индексации
const MEILI_KEY = process.env.MEILI_SEARCH_KEY ?? process.env.MEILI_MASTER_KEY;
const INDEX = process.env.MEILI_INDEX || 'articles';

if (!process.env.MEILI_SEARCH_KEY) {
  console.warn('[Search API] MEILI_SEARCH_KEY не задан — используется master key');
}

const MAX_QUERY_LENGTH = 200;
const MAX_LIMIT = 20;

type MeiliHit = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  section: string;
};

export async function GET(request: Request): Promise<NextResponse> {
  try {
    if (!MEILI_HOST || !MEILI_KEY) {
      console.error('[Search API] Search env is not configured', {
        hasMeiliHost: Boolean(MEILI_HOST),
        hasMeiliKey: Boolean(MEILI_KEY),
      });
      return NextResponse.json({ error: 'Search is not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') ?? '').slice(0, MAX_QUERY_LENGTH);
    const rawLimit = Number(searchParams.get('limit') ?? '5');
    const limit = Number.isFinite(rawLimit)
      ? Math.min(Math.max(Math.trunc(rawLimit), 1), MAX_LIMIT)
      : 5;

    const meiliRes = await fetch(`${MEILI_HOST}/indexes/${INDEX}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MEILI_KEY}`,
      },
      body: JSON.stringify({
        q,
        limit,
        attributesToRetrieve: ['id', 'title', 'excerpt', 'slug', 'section'],
      }),
      cache: 'no-store',
    });

    const text = await meiliRes.text();

    if (!meiliRes.ok) {
      console.error('[Search API] Meili error:', meiliRes.status, text);
      return NextResponse.json({ error: 'Search service error' }, { status: 502 });
    }

    let payload: { hits: MeiliHit[] };

    try {
      payload = JSON.parse(text);
    } catch {
      console.error('[Search API] Meili returned non-JSON:', text.slice(0, 300));
      return NextResponse.json({ error: 'Search service error' }, { status: 502 });
    }

    const results = payload.hits.map(hit => ({
      id: hit.id,
      title: hit.title,
      excerpt: hit.excerpt,
      slug: hit.slug,
      section: hit.section,
    }));

    return NextResponse.json(results);
  } catch (err: unknown) {
    console.error('[Search API] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
