'use client';

import { useState, useRef, type ChangeEvent } from 'react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
}

export function Search() {
  console.log('🔍 Search component rendered');

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  // инициализируем реф как null
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    // сбрасываем прошлый таймаут
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // ставим новый
    debounceRef.current = setTimeout(() => {
      if (!val.trim()) {
        setResults([]);
      } else {
        performSearch(val);
      }
    }, 300);
  };

  const performSearch = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=5`);
      if (!res.ok) throw new Error('Search failed');
      const data: Article[] = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-8">
      {/* Поле поиска */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={onChange}
          placeholder="Поиск статей..."
          className="
            w-full pl-10 pr-4 py-2 
            bg-white text-black placeholder-gray-500 
            border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
        {/* Лупа */}
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          🔍
        </span>
      </div>

      {/* Статусы */}
      {loading && <p className="mt-2 text-sm text-gray-500">Ищем…</p>}
      {!loading && query && results.length === 0 && (
        <p className="mt-2 text-sm text-gray-500">Ничего не найдено.</p>
      )}

      {/* Результаты */}
      {!loading && results.length > 0 && (
        <ul className="mt-4 space-y-3">
          {results.map(item => (
            <li key={item.id} className="p-3 border rounded-md hover:shadow">
              <Link href={`/articles/${item.slug}`}>
                <h3 className="text-lg font-semibold hover:underline">
                  <span dangerouslySetInnerHTML={{ __html: item.title }} />
                </h3>
              </Link>
              <p
                className="mt-1 text-sm text-gray-600"
                dangerouslySetInnerHTML={{ __html: item.excerpt }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
