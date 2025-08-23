'use client';

import { useState } from 'react';
import Image from 'next/image';

// Объявляем глобальный gtag без использования any
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Переименованный тип, чтобы не конфликтовать с браузерным FormData
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formDataApi = new FormData(form);
    const data: ContactFormData = {
      name: String(formDataApi.get('name') ?? ''),
      email: String(formDataApi.get('email') ?? ''),
      message: String(formDataApi.get('message') ?? ''),
    };

    console.log('[ContactSection] Отправка данных:', data);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log('[ContactSection] Статус ответа:', res.status);
      const json = await res.json();
      console.log('[ContactSection] Тело ответа:', json);
      if (json.ok) {
        setStatus('success');
        form.reset();
      } else {
        console.error('[ContactSection] Ответ с ошибкой:', json.error);
        setStatus('error');
      }
    } catch (err) {
      console.error('[ContactSection] Сетевая ошибка:', err);
      setStatus('error');
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-[#c9ad77] mb-6">Contact the Author</h2>
      <p className="mb-8 text-lg leading-relaxed">Questions? Feedback? Drop me a line below.</p>

      <form className="space-y-6 max-w-xl" onSubmit={handleSubmit}>
        {[
          { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
          { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
          { label: 'Message', name: 'message', type: 'textarea', placeholder: 'Your message...' },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-[#ddd] mb-2 font-medium">
              {label}
            </label>
            {type === 'textarea' ? (
              <textarea
                id={name}
                name={name}
                rows={5}
                required
                placeholder={placeholder}
                className="w-full px-5 py-3 bg-[#1a1a1a] text-[#ddd] border border-[#c9ad77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9ad77]"
              />
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                required
                placeholder={placeholder}
                className="w-full px-5 py-3 bg-[#1a1a1a] text-[#ddd] border border-[#c9ad77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9ad77]"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-[#c9ad77] text-black font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-shadow disabled:opacity-50"
        >
          <Image src="/zuk.svg" alt="Bug icon" width={20} height={24} />
          <span>{status === 'sending' ? 'Sending…' : 'Send Message'}</span>
        </button>
      </form>

      {status === 'success' && <p className="mt-4 text-green-400">Message sent successfully!</p>}
      {status === 'error' && (
        <p className="mt-4 text-red-400">Failed to send message. Please try again.</p>
      )}
    </div>
  );
};
