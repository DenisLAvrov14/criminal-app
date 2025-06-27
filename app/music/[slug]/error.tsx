'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-xl font-bold mb-4">Ой, что-то пошло не так</h1>
      <p>Не удалось загрузить данные артиста.</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => router.refresh()}
      >
        Повторить
      </button>
    </div>
  );
}
