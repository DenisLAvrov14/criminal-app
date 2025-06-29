'use client';

import { useState, useEffect, Fragment, type ChangeEvent } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Search as SearchIcon, X as XIcon } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  section: string;
}

export function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const ctl = new AbortController();

    fetch(`/api/search?q=${encodeURIComponent(query)}&limit=5&page=${page}`, {
      signal: ctl.signal,
    })
      .then(r => r.json())
      .then((data: Article[]) => setResults(page === 1 ? data : prev => [...prev, ...data]))
      .catch(() => {})
      .finally(() => setLoading(false));

    return () => ctl.abort();
  }, [query, page]);

  const onSelect = (item: Article) => {
    router.push(`/${item.section}/${item.slug}`);
  };

  return (
    <div className="relative z-20 w-full px-4 lg:w-[25%] mx-auto">
      <Combobox<Article> onChange={onSelect}>
        <div className="relative">
          <SearchIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
            aria-hidden
          />

          <Combobox.Input
            className="
              w-full pl-12 pr-10 py-3
              bg-white bg-opacity-90 backdrop-blur-sm
              text-gray-900 placeholder-gray-500
              border border-gray-300 rounded-full
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition
            "
            placeholder="Search articles..."
            aria-label="Search articles"
            displayValue={() => query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <XIcon size={18} />
            </button>
          )}
        </div>

        <Transition
          as={Fragment}
          show={!!query.trim()}
          enter="transition ease-out duration-150"
          enterFrom="opacity-0 translate-y-1 scale-95"
          enterTo="opacity-100 translate-y-0 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 translate-y-0 scale-100"
          leaveTo="opacity-0 translate-y-1 scale-95"
        >
          <Combobox.Options
            static
            className="
              absolute left-0 right-0 mt-2
              bg-white bg-opacity-95 backdrop-blur-sm
              border border-gray-200 rounded-lg
              shadow-lg max-h-64 overflow-auto
            "
          >
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="px-4 py-3 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                </div>
              ))
            ) : results.length === 0 ? (
              <div className="px-4 py-3 text-center text-gray-500">No results found.</div>
            ) : (
              results.map(item => (
                <Combobox.Option
                  key={item.id}
                  as={motion.div}
                  layout
                  whileHover={{ backgroundColor: '#F3F4F6' }}
                  className="cursor-pointer px-4 py-3 border-b last:border-none"
                  value={item}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.excerpt}</p>
                    </div>
                    <span className="ml-2 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                      {item.section}
                    </span>
                  </div>
                </Combobox.Option>
              ))
            )}

            {!loading && results.length >= 5 && (
              <div className="text-center py-2">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Load more
                </button>
              </div>
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
}
