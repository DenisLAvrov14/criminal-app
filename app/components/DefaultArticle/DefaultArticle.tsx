'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { File } from '@/app/lib/types';
import { X } from 'lucide-react';

export interface DefaultArticleProps {
  title: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  contentHtml: string;
  cover: File | null;
  images: File[];
}

// Колонка для чтения: 768px, картинки в ней не шире
const READING_SIZES = '(min-width: 816px) 768px, calc(100vw - 48px)';

export default function DefaultArticle({ title, contentHtml, images }: DefaultArticleProps) {
  const safeHtml = DOMPurify.sanitize(contentHtml);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (!selectedImage) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedImage(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedImage]);

  return (
    <article className="space-y-8">
      <h1 className="text-3xl font-bold leading-tight text-[#c9ad77] sm:text-4xl lg:text-5xl">
        {title}
      </h1>

      {images.length > 0 && (
        <div className="space-y-6">
          {images.map(img => (
            <figure key={img.id}>
              <button
                type="button"
                className="block w-full cursor-zoom-in overflow-hidden rounded-lg"
                onClick={() => setSelectedImage(img)}
                aria-label={`Enlarge image: ${img.alt_text || title}`}
              >
                <Image
                  src={img.url}
                  alt={img.alt_text || title}
                  width={img.width ?? 1200}
                  height={img.height ?? 800}
                  sizes={READING_SIZES}
                  className="h-auto w-full"
                />
              </button>
              {img.description && (
                <figcaption className="mt-2 text-sm text-[#9b8f78]">{img.description}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {/* Основной контент */}
      <div
        className="prose prose-lg prose-invert prose-site max-w-none"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />

      {/* Намёк на донат */}
      <p className="border-t border-[#3a2a1a] pt-6 text-sm italic text-gray-400">
        Enjoying the article?{' '}
        <Link href="/#donate" className="text-[#c9ad77] hover:underline">
          You can support us with a small donation
        </Link>{' '}
        — it helps us keep writing more.
      </p>

      {/* Лайтбокс */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-full max-w-6xl" onClick={e => e.stopPropagation()}>
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt_text || title}
              width={selectedImage.width ?? 1600}
              height={selectedImage.height ?? 1000}
              sizes="100vw"
              className="max-h-[90vh] w-auto rounded-lg object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
