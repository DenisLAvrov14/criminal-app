// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  console.log('[API] SMTP config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    passSet: !!process.env.SMTP_PASS,
  });
  console.log('[API] CONTACT_TO:', process.env.CONTACT_TO);

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

  console.log('[API] Вызов sendMail...');
  try {
    const info = await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      subject: `Новое сообщение от ${name}`,
      html: `
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });
    console.log('[API] Письмо отправлено, id:', info.messageId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[API] Ошибка при отправке письма:', err);
    return NextResponse.json({ ok: false, error: 'Failed to send' }, { status: 500 });
  }
}
