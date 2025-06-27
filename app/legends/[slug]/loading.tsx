'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-xl font-bold mb-4">Oops, something went wrong</h1>
      <p>Could not load the legend. Try again?</p>
      <button
        onClick={() => router.refresh()}
        className="mt-6 px-4 py-2 bg-[#f5e8c7] text-black rounded hover:bg-white transition"
      >
        Retry
      </button>
    </div>
  );
}
