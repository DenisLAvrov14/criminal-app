'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { X } from 'lucide-react';
import { formatDate } from '@/app/lib/format';

export interface MusicArticleProps {
  title: string;
  excerpt?: string;
  contentHtml: string;
  videoUrl?: string;
  coverUrl?: string;
  fio?: string;
  nickname?: string;
  birthdate?: string;
  deathdate?: string;
  birthplace?: string;
  residence?: string;
  nationality?: string;
  status?: string;
}

function getEmbedUrl(url?: string): string | undefined {
  if (!url) return undefined;
  const id = url.match(/(?:v=|youtu\.be\/)([\w-]+)/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : undefined;
}

export default function MusicArticle({
  title,
  contentHtml,
  videoUrl,
  coverUrl,
  fio,
  nickname,
  birthdate,
  deathdate,
  birthplace,
  residence,
  nationality,
  status,
}: MusicArticleProps) {
  const embedUrl = getEmbedUrl(videoUrl);
  const safeHtml = DOMPurify.sanitize(contentHtml);
  const [isOpen, setIsOpen] = useState(false);

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

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

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
            onClick={() => setIsOpen(true)}
            aria-label={`Enlarge photo: ${title}`}
          >
            <Image
              src={coverUrl}
              alt={fio || title}
              width={448}
              height={448}
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

      {embedUrl && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Основной текст */}
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
      {isOpen && coverUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <Image
              src={coverUrl}
              alt={fio || title}
              width={1200}
              height={1200}
              sizes="100vw"
              className="max-h-[90vh] w-auto rounded-lg object-contain"
            />
            <button
              onClick={() => setIsOpen(false)}
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
