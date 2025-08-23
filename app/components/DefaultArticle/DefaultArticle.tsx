'use client';

import React from 'react';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import { File } from '@/app/lib/types';

export interface DefaultArticleProps {
  title: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  /** HTML-контент из Directus */
  contentHtml: string;
  /** Обложка статьи (single-file) */
  cover: File | null;
  /** Дополнительные изображения */
  images: File[];
}

export default function DefaultArticle({
  title,
  contentHtml,
  images,
}: DefaultArticleProps) {
  const safeHtml = DOMPurify.sanitize(contentHtml);

  return (
<article className="container mx-auto space-y-8 text-[#c9ad77]">
        {/* Заголовок */}
      <h1 className="text-4xl font-bold">{title}</h1>

      {/* Изображения: увеличенный контейнер, показываем полностью */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <figure
              key={img.id}
              className="relative w-full"
              style={{ paddingTop: '75%' }}   // 75% от ширины для более высокого контейнера
            >
              <Image
                src={img.url}
                alt={img.alt_text || title}
                fill
                className="object-contain rounded-lg shadow"
                priority={false}
              />
              {img.description && (
                <figcaption className="mt-2 text-sm text-gray-500">
                  {img.description}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {/* Основной HTML-контент */}
<div
     className="prose prose-lg prose-invert max-w-none text-[#c9ad77]"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </article>
  );
}