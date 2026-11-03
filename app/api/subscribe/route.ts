// app/api/subscribe/route.ts — подписка на рассылку через Kit (ConvertKit, API v3)
import { NextResponse } from 'next/server';

const KIT_API_KEY = process.env.KIT_API_KEY;
const KIT_FORM_ID = process.env.KIT_FORM_ID;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL = 254;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const { email, website } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: скрытое поле, которое заполняют только боты — делаем вид, что всё прошло
  if (typeof website === 'string' && website.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (typeof email !== 'string' || email.length > MAX_EMAIL || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  if (!KIT_API_KEY || !KIT_FORM_ID) {
    console.error('[Subscribe API] KIT_API_KEY или KIT_FORM_ID не заданы');
    return NextResponse.json({ ok: false, error: 'Subscription unavailable' }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: KIT_API_KEY, email: email.trim() }),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('[Subscribe API] Kit error:', res.status, await res.text());
      return NextResponse.json({ ok: false, error: 'Subscription failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Subscribe API] Unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Subscription failed' }, { status: 500 });
  }
}
