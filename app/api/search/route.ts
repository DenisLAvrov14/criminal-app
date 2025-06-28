// app/api/search/route.ts
import { NextResponse } from 'next/server';

const MEILI_HOST = process.env.MEILI_HOST!;
const MEILI_KEY = process.env.MEILI_MASTER_KEY!;
const INDEX = process.env.MEILI_INDEX || 'articles';

export async function GET(request: Request) {
  console.log('MEILI_HOST=', process.env.MEILI_HOST);
  console.log('MEILI_KEY =', process.env.MEILI_MASTER_KEY);
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
      body: JSON.stringify({ q, limit }),
    });

    if (!meiliRes.ok) {
      const text = await meiliRes.text();
      console.error('Meili error:', meiliRes.status, text);
      return NextResponse.json(
        { error: 'Search service error', details: text },
        { status: meiliRes.status }
      );
    }

    const { hits } = await meiliRes.json();
    return NextResponse.json(hits);
  } catch (err: any) {
    console.error('Search API unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
