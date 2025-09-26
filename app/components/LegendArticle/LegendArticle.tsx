'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const coverUrl = imageUrls[0];
  const galleryUrls = imageUrls.slice(1);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const allImages = [coverUrl, ...galleryUrls].filter(Boolean);

  const closeModal = () => setSelectedIndex(null);
  const prevImage = () =>
    setSelectedIndex(prev =>
      prev !== null ? (prev - 1 + allImages.length) % allImages.length : prev
    );
  const nextImage = () =>
    setSelectedIndex(prev => (prev !== null ? (prev + 1) % allImages.length : prev));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex]);

  return (
    <article className="container mx-auto space-y-12">
      <h1 className="text-3xl font-bold">{title}</h1>

      {/* Грид: обложка + инфоблок */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* A) Большая картинка */}
        <div className="order-2 md:order-1 md:col-span-2">
          {coverUrl && (
            <div
              className="relative w-full h-96 cursor-zoom-in"
              onClick={() => setSelectedIndex(0)}
            >
              <Image
                src={coverUrl}
                alt={title || 'Legend cover'}
                fill
                className="object-contain rounded-lg shadow-lg bg-black"
                priority
              />
            </div>
          )}
        </div>

        {/* B) Инфоблок */}
        <div className="order-1 md:order-2 space-y-6 text-[#ddd] flex flex-col items-center md:items-end md:text-right">
          {coverUrl && (
            <Image
              src={coverUrl}
              alt={title || 'Legend thumbnail'}
              width={200}
              height={200}
              className="rounded-lg shadow-lg mb-4 object-contain bg-black"
              priority
            />
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

      {/* Галерея */}
      {galleryUrls.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {galleryUrls.map((url, idx) => (
            <div
              key={idx}
              className="relative w-full h-72 cursor-zoom-in"
              onClick={() => setSelectedIndex(idx + 1)}
            >
              <Image
                src={url}
                alt={`${title || 'Legend'} image ${idx + 2}`}
                fill
                className="object-contain rounded-lg shadow bg-black"
              />
            </div>
          ))}
        </div>
      )}

      {/* Краткое описание */}
      {excerpt && (
        <div className="prose prose-lg prose-invert max-w-none">
          <p>{excerpt}</p>
        </div>
      )}

      {/* Полный контент */}
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
      {selectedIndex !== null && allImages[selectedIndex] && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative w-11/12 sm:w-4/5 md:w-3/5 lg:w-1/2 max-w-[900px] max-h-[80vh] flex items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={allImages[selectedIndex]!}
              alt="Zoomed image"
              width={1200}
              height={800}
              className="object-contain w-full h-full max-h-[80vh] rounded-lg"
            />

            {/* Закрыть */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Влево */}
            <button
              onClick={prevImage}
              className="absolute left-3 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Вправо */}
            <button
              onClick={nextImage}
              className="absolute right-12 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
