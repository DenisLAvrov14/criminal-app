'use client';

import React from 'react';
import Image from 'next/image';

export interface ArticlePageProps {
  title: string;
  excerpt?: string;
  meta_title?: string;
  meta_description?: string;
  images?: {
    id: number;
    url: string;
    alt_text?: string;
    description?: string;
  }[];
}

export default function ArticlePage({
  title,
  excerpt,
  meta_title,
  meta_description,
  images = [],
}: ArticlePageProps) {
  return (
    <article className="container mx-auto py-16 space-y-8">
      {/* Заголовок */}
      <h1 className="text-4xl font-bold">{title}</h1>

      {/* Описание */}
      {excerpt && <p className="text-lg text-gray-300">{excerpt}</p>}

      {/* Meta-поля */}
      <div className="space-y-1 text-sm text-gray-400">
        {meta_title && (
          <div>
            <strong>Meta Title:</strong> {meta_title}
          </div>
        )}
        {meta_description && (
          <div>
            <strong>Meta Description:</strong> {meta_description}
          </div>
        )}
      </div>

      {/* Картинки */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map(img => (
            <figure key={img.id} className="relative w-full h-64">
              <Image
                src={img.url}
                alt={img.alt_text || title}
                fill
                className="object-cover rounded-lg shadow"
                priority={false}
              />
              {img.description && (
                <figcaption className="mt-2 text-sm text-gray-500">{img.description}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </article>
  );
}
