'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { X } from 'lucide-react';

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
  const getEmbedUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    const idMatch = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    const id = idMatch?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : undefined;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const safeHtml = DOMPurify.sanitize(contentHtml);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className="container mx-auto space-y-12">
      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* A) Видео или текст */}
        <div className="order-2 md:order-1 md:col-span-2 space-y-8">
          {embedUrl ? (
            <div className="relative" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={embedUrl}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: safeHtml,
              }}
            />
          )}
        </div>

        {/* B) Инфоблок */}
        <div className="order-1 md:order-2 space-y-6 text-[#ddd] flex flex-col items-center md:items-end md:text-right">
          {coverUrl && (
            <div className="cursor-zoom-in" onClick={() => setIsOpen(true)}>
              <Image
                src={coverUrl}
                alt={title}
                width={200}
                height={200}
                className="rounded-lg shadow-lg mb-4 object-contain bg-black"
                priority
              />
            </div>
          )}
          <dl className="grid grid-cols-1 gap-y-2">
            {fio && (
              <div>
                <dt className="font-semibold">Full Name:</dt>
                <dd>{fio}</dd>
              </div>
            )}
            {nickname && (
              <div>
                <dt className="font-semibold">Nickname:</dt>
                <dd>{nickname}</dd>
              </div>
            )}
            {birthdate && (
              <div>
                <dt className="font-semibold">Date of Birth:</dt>
                <dd>{new Date(birthdate).toLocaleDateString()}</dd>
              </div>
            )}
            {deathdate && (
              <div>
                <dt className="font-semibold">Date of Death:</dt>
                <dd>{new Date(deathdate).toLocaleDateString()}</dd>
              </div>
            )}
            {birthplace && (
              <div>
                <dt className="font-semibold">Place of Birth:</dt>
                <dd>{birthplace}</dd>
              </div>
            )}
            {residence && (
              <div>
                <dt className="font-semibold">Residence:</dt>
                <dd>{residence}</dd>
              </div>
            )}
            {nationality && (
              <div>
                <dt className="font-semibold">Nationality:</dt>
                <dd>{nationality}</dd>
              </div>
            )}
            {status && (
              <div>
                <dt className="font-semibold">Status:</dt>
                <dd>{status}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Основной текст */}
      <div
        className="prose prose-lg prose-invert max-w-none"
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
      {isOpen && coverUrl && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 max-w-[900px] max-h-[80vh]"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={coverUrl}
              alt="Zoomed cover"
              width={800}
              height={800}
              className="object-contain w-full h-full max-h-[80vh] rounded-lg"
            />
            <button
              onClick={() => setIsOpen(false)}
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
