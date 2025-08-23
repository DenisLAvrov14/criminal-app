'use client';

import React from 'react';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

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
  // Преобразуем безопасный HTML
  const safeHtml = DOMPurify.sanitize(contentHtml);
  // Основная обложка
  const coverUrl = imageUrls[0];

  return (
    <article className="container mx-auto py-12 space-y-8">
      {/* 1. Заголовок всегда первым */}
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

      {/* 2. Грид: на мобилке один столбец, на md+ — три */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* A) Большая картинка: на мобилке вторая, на md+ — первая */}
        <div className="order-2 md:order-1 md:col-span-2">
          {coverUrl && (
            <div className="relative w-full h-96">
              <Image
                src={coverUrl}
                alt={title}
                fill
                className="object-cover rounded-lg shadow-lg"
                priority
              />
            </div>
          )}
        </div>

        {/* B) Инфоблок: на мобилке первый, на md+ — второй */}
        <div className="order-1 md:order-2 space-y-6 text-[#ddd] flex flex-col items-center md:items-end md:text-right">
          {coverUrl && (
            <Image
              src={coverUrl}
              alt={title}
              width={200}
              height={200}
              className="rounded-lg shadow-lg mb-4"
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

      {/* 3. Краткое описание */}
      {excerpt && (
        <div className="prose prose-lg prose-invert max-w-none">
          <p>{excerpt}</p>
        </div>
      )}

      {/* 4. Полный контент */}
      <div
        className="prose prose-lg prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </article>
  );
}
