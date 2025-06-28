import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  // Логируем, чтобы увидеть все параметры
  console.log('SMTP config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    passSet: !!process.env.SMTP_PASS,
  });
  console.log('Contact will be sent to:', process.env.CONTACT_TO);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO, // ← сюда придёт письмо
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });
    console.log('Message sent:', info.messageId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Mail error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to send' }, { status: 500 });
  }
}
