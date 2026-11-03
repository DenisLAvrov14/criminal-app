'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '@/app/lib/format';

export interface LegendArticleProps {
  title: string;
  excerpt?: string;
  contentHtml: string;
  imageUrls: string[];
  fio?: string;
  nickname?: string;
  birthdate?: string;
  deathdate?: string;
  birthplace?: string;
  residence?: string;
  nationality?: string;
  status?: string;
}

export default function LegendArticle({
  title,
  excerpt,
  contentHtml,
  imageUrls,
  fio,
  nickname,
  birthdate,
  deathdate,
  birthplace,
  residence,
  nationality,
  status,
}: LegendArticleProps) {
  const safeHtml = DOMPurify.sanitize(contentHtml);
  const allImages = imageUrls.filter(Boolean);
  const coverUrl = allImages[0];
  const galleryUrls = allImages.slice(1);

  const facts: [string, string | undefined][] = [
    ['Full name', fio],
    ['Nickname', nickname],
    ['Born', birthdate && formatDate(birthdate)],
    ['Died', deathdate && formatDate(deathdate)],
    ['Place of birth', birthplace],
    ['Residence', residence],
    ['Nationality', nationality],
    ['Status', status],
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const count = allImages.length;
  const closeModal = () => setSelectedIndex(null);
  const step = (delta: number) =>
    setSelectedIndex(prev => (prev !== null ? (prev + delta + count) % count : prev));
  const prevImage = () => step(-1);
  const nextImage = () => step(1);

  const isOpen = selectedIndex !== null;
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const delta = e.key === 'ArrowLeft' ? -1 : 1;
        setSelectedIndex(prev => (prev !== null ? (prev + delta + count) % count : prev));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, count]);

  return (
    <article className="space-y-10">
      <h1 className="text-3xl font-bold leading-tight text-[#c9ad77] sm:text-4xl lg:text-5xl">
        {title}
      </h1>

      {/* Фото + карточка с фактами */}
      <div className="flex flex-col gap-6 rounded-lg border border-[#3a2a1a] bg-[#120c07] p-4 sm:flex-row sm:p-6">
        {coverUrl && (
          <button
            type="button"
            className="mx-auto w-48 shrink-0 cursor-zoom-in overflow-hidden rounded-md sm:mx-0 sm:w-56"
            onClick={() => setSelectedIndex(0)}
            aria-label={`Enlarge photo: ${title}`}
          >
            <Image
              src={coverUrl}
              alt={fio || title}
              width={448}
              height={640}
              sizes="224px"
              className="h-auto w-full object-cover"
              priority
            />
          </button>
        )}

        <dl className="grid flex-1 grid-cols-1 content-start gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          {facts
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-wide text-[#9b8f78]">{label}</dt>
                <dd className="text-base text-[#f5e8c7]">{value}</dd>
              </div>
            ))}
        </dl>
      </div>

      {/* Краткое описание */}
      {excerpt && <p className="text-xl leading-relaxed text-[#e8dcc0]">{excerpt}</p>}

      {/* Полный контент */}
      <div
        className="prose prose-lg prose-invert prose-site max-w-none"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />

      {/* Галерея */}
      {galleryUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryUrls.map((url, idx) => (
            <button
              type="button"
              key={url}
              className="relative aspect-square cursor-zoom-in overflow-hidden rounded-lg bg-black"
              onClick={() => setSelectedIndex(idx + 1)}
              aria-label={`Enlarge image ${idx + 2}`}
            >
              <Image
                src={url}
                alt={`${title} image ${idx + 2}`}
                fill
                sizes="(min-width: 640px) 256px, 50vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Намёк на донат */}
      <p className="border-t border-[#3a2a1a] pt-6 text-sm italic text-gray-400">
        Enjoying the article?{' '}
        <Link href="/#donate" className="text-[#c9ad77] hover:underline">
          You can support us with a small donation
        </Link>{' '}
        — it helps us keep writing more.
      </p>

      {/* Лайтбокс */}
      {selectedIndex !== null && allImages[selectedIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative flex max-h-full max-w-5xl items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={allImages[selectedIndex]!}
              alt={`${title} — image ${selectedIndex + 1}`}
              width={1200}
              height={1600}
              sizes="100vw"
              className="max-h-[90vh] w-auto rounded-lg object-contain"
            />

            <button
              onClick={closeModal}
              className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
