import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MEILI_HOST = process.env.MEILI_HOST;
const MEILI_KEY = process.env.MEILI_MASTER_KEY;
const INDEX = process.env.MEILI_INDEX || 'articles';

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
      return NextResponse.json(
        {
          error: 'Search env is not configured',
          details: {
            hasMeiliHost: Boolean(MEILI_HOST),
            hasMeiliKey: Boolean(MEILI_KEY),
            index: INDEX,
          },
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') ?? '';
    const limit = Number(searchParams.get('limit') ?? '5');

    const meiliUrl = `${MEILI_HOST}/indexes/${INDEX}/search`;

    console.log('[Search API] Meili URL:', meiliUrl);

    const meiliRes = await fetch(meiliUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MEILI_KEY}`,
      },
      body: JSON.stringify({ q, limit }),
      cache: 'no-store',
    });

    const text = await meiliRes.text();

    if (!meiliRes.ok) {
      console.error('[Search API] Meili error:', meiliRes.status, text);
      return NextResponse.json(
        { error: 'Search service error', details: text },
        { status: meiliRes.status }
      );
    }

    let payload: { hits: MeiliHit[] };

    try {
      payload = JSON.parse(text);
    } catch {
      console.error('[Search API] Meili returned non-JSON:', text.slice(0, 300));
      return NextResponse.json(
        {
          error: 'Search service returned non-JSON',
          details: text.slice(0, 300),
        },
        { status: 500 }
      );
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
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Search API] Unexpected error:', message);
    return NextResponse.json({ error: 'Internal Server Error', details: message }, { status: 500 });
  }
}
