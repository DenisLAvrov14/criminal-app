// app/api/search/route.ts
import { NextResponse } from 'next/server';

const MEILI_HOST = process.env.MEILI_HOST!;
const MEILI_KEY = process.env.MEILI_MASTER_KEY!;
const INDEX = process.env.MEILI_INDEX || 'articles';

type MeiliHit = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  section: string;
  // …все остальные поля, которые у вас есть в индексе
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const limit = Number(searchParams.get('limit') || '5');

    const meiliRes = await fetch(`${MEILI_HOST}/indexes/${INDEX}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MEILI_KEY}`,
      },
      body: JSON.stringify({
        q,
        limit,
        // если хотите пагинацию:
        // offset: (Number(searchParams.get('page') || '1') - 1) * limit
      }),
    });

    if (!meiliRes.ok) {
      const text = await meiliRes.text();
      console.error('Meili error:', meiliRes.status, text);
      return NextResponse.json(
        { error: 'Search service error', details: text },
        { status: meiliRes.status }
      );
    }

    const { hits } = (await meiliRes.json()) as { hits: MeiliHit[] };

    // Маппим хиты, чтобы явно вернуть только нужные поля
    const results = hits.map(hit => ({
      id: hit.id,
      title: hit.title,
      excerpt: hit.excerpt,
      slug: hit.slug,
      section: hit.section,
    }));

    console.log('[Search API] Отдаю результаты:', results);
    return NextResponse.json(results);
  } catch (err: any) {
    console.error('Search API unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
