'use client';

import { useState } from 'react';

export function FooterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('[FooterSubscribe] handleSubmit called');
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter signup',
          email,
          message: 'Please add me to your list',
        }),
      });
      const json = await res.json();
      console.log('[FooterSubscribe] Response JSON:', json);
      if (json.ok) {
        setStatus('success');
        setEmail('');
      } else {
        throw new Error(json.error || 'Unknown error');
      }
    } catch (err) {
      console.error('[FooterSubscribe] Error sending:', err);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="email"
        required
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
        {status === 'sending' ? 'Sending…' : status === 'success' ? 'Subscribed' : 'Subscribe'}
      </button>
      {status === 'error' && <p className="text-red-500 text-xs ml-2">Error, try again</p>}
    </form>
  );
}
