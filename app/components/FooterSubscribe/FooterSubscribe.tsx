'use client';

import { useState } from 'react';

export function FooterSubscribe() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot для ботов
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Unknown error');
      setStatus('success');
      setEmail('');
      window.gtag?.('event', 'newsletter_subscribe');
    } catch (err) {
      console.error('[FooterSubscribe] Error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p className="text-sm text-[#c9ad77]" role="status">
        Almost done — check your inbox to confirm your subscription.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <input
          type="email"
          required
          aria-label="Email address"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
          className="
            flex-1
            px-3 py-1.5
            bg-white bg-opacity-90 backdrop-blur
            text-gray-900 text-sm
            border border-gray-300
            rounded-lg
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-[#c9ad77]
            transition
          "
        />
        {/* Невидимое поле: люди его не видят, боты заполняют */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={e => setWebsite(e.currentTarget.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="
            px-4 py-1.5
            bg-[#c9ad77] text-black text-sm
            rounded-lg
            shadow
            hover:shadow-md
            disabled:opacity-50
            transition
          "
        >
          {status === 'sending' ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-red-500" role="alert">
          Something went wrong, please try again.
        </p>
      )}
    </form>
  );
}
