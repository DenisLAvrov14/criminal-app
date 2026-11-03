'use client';

import React, { useState } from 'react';
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

export default function DefaultArticle({ title, contentHtml, images }: DefaultArticleProps) {
  const safeHtml = DOMPurify.sanitize(contentHtml);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  return (
    <article className="container mx-auto space-y-8 text-[#c9ad77]">
      <h1 className="text-4xl font-bold">{title}</h1>

      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map(img => (
            <figure
              key={img.id}
              className="relative w-full cursor-zoom-in"
              style={{ paddingTop: '75%' }}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img.url}
                alt={img.alt_text || title}
                fill
                className="object-contain rounded-lg shadow"
              />
              {img.description && (
                <figcaption className="mt-2 text-sm text-gray-500">{img.description}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {/* Основной контент */}
      <div
        className="prose prose-lg prose-invert max-w-none text-[#c9ad77]"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />

      {/* Намёк на донат */}
      <p className="italic text-gray-400 text-sm mt-4">
        Enjoying the article?{' '}
        <Link href="/#donate" className="text-[#c9ad77] hover:underline">
          You can support us with a small donation
        </Link>{' '}
        — it helps us keep writing more.
      </p>

      {/* Лайтбокс */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 max-w-[900px] max-h-[80vh]"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt_text || title}
              width={1200}
              height={800}
              className="object-contain w-full h-full max-h-[80vh] rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
