// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

// Экранируем пользовательский ввод, чтобы его нельзя было внедрить как HTML в письмо
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !message.trim() ||
    name.length > MAX_NAME ||
    email.length > MAX_EMAIL ||
    message.length > MAX_MESSAGE ||
    !EMAIL_RE.test(email)
  ) {
    return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 });
  }

  // создаём транспортер
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // 'smtp.gmail.com'
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  // убираем переводы строк из заголовка письма
  const safeSubjectName = name.replace(/[\r\n]+/g, ' ').trim();

  try {
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `Новое сообщение от ${safeSubjectName}`,
      html: `
        <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Сообщение:</strong><br/>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[API] Ошибка при отправке письма:', err);
    return NextResponse.json({ ok: false, error: 'Failed to send' }, { status: 500 });
  }
}
