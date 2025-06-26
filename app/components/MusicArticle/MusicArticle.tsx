// File: app/components/MusicArticle/MusicArticle.tsx
'use client';

import React from 'react';
import { File } from '@/app/lib/types';

export interface MusicArticleProps {
  title: string;
  contentHtml: string;
  cover?: File | null;
  fio?: string;
  nickname?: string;
  birthdate?: string;
  birthplace?: string;
  residence?: string;
  nationality?: string;
  status?: string;
}

export default function MusicArticle({
  title,
  contentHtml,
  cover,
  fio,
  nickname,
  birthdate,
  birthplace,
  residence,
  nationality,
  status,
}: MusicArticleProps) {
  return (
    <article className="container mx-auto py-12 space-y-12">
      {/* Фото + метаданные */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cover && (
          <img src={cover.url} alt={title} className="w-full h-auto rounded-lg shadow-lg" />
        )}
        <div className="md:col-span-2 text-[#ddd] space-y-4">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2">
            {fio && (
              <>
                <dt className="font-semibold">ФИО:</dt>
                <dd>{fio}</dd>
              </>
            )}
            {nickname && (
              <>
                <dt className="font-semibold">Псевдоним:</dt>
                <dd>{nickname}</dd>
              </>
            )}
            {birthdate && (
              <>
                <dt className="font-semibold">Дата рождения:</dt>
                <dd>{new Date(birthdate).toLocaleDateString()}</dd>
              </>
            )}
            {birthplace && (
              <>
                <dt className="font-semibold">Место рождения:</dt>
                <dd>{birthplace}</dd>
              </>
            )}
            {residence && (
              <>
                <dt className="font-semibold">Проживал:</dt>
                <dd>{residence}</dd>
              </>
            )}
            {nationality && (
              <>
                <dt className="font-semibold">Национальность:</dt>
                <dd>{nationality}</dd>
              </>
            )}
            {status && (
              <>
                <dt className="font-semibold">Статус:</dt>
                <dd>{status}</dd>
              </>
            )}
          </dl>
        </div>
      </div>

      {/* Контент статьи */}
      <div className="prose prose-lg prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        {/* Обратите внимание: 
            1) обязательный вложенный объект { __html: ... } 
            2) НЕ самозакрывающийся <div /> */}
        <div className="mt-6" dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
      </div>
    </article>
  );
}
