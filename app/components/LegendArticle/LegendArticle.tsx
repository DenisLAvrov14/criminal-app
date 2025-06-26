// File: app/components/LegendArticle/LegendArticle.tsx
import React from 'react';

export interface LegendArticleProps {
  title: string;
  content: string;
  cover: { url: string };
  fio: string;
  nickname: string;
  birthdate: string;
  birthplace: string;
  residence: string;
  nationality: string;
  status: string;
  crowned_date: string;
  crowned_place: string;
  // если дальше понадобятся — раскомментируйте
  // crowned_by: string[]
  // godparents: { type: string; name: string; year?: string }[]
}

export default function LegendArticle({
  title,
  content,
  cover,
  fio,
  nickname,
  birthdate,
  birthplace,
  residence,
  nationality,
  status,
  crowned_date,
  crowned_place,
}: LegendArticleProps) {
  return (
    <article className="container mx-auto py-12 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src={cover.url} alt={title} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="md:col-span-2 space-y-4 text-[#ddd]">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2">
            <dt className="font-semibold">ФИО:</dt>
            <dd>{fio}</dd>
            <dt className="font-semibold">Воровское имя:</dt>
            <dd>{nickname}</dd>
            <dt className="font-semibold">Дата рождения:</dt>
            <dd>{new Date(birthdate).toLocaleDateString()}</dd>
            <dt className="font-semibold">Место рождения:</dt>
            <dd>{birthplace}</dd>
            <dt className="font-semibold">Проживал:</dt>
            <dd>{residence}</dd>
            <dt className="font-semibold">Национальность:</dt>
            <dd>{nationality}</dd>
            <dt className="font-semibold">Статус:</dt>
            <dd>{status}</dd>
            <dt className="font-semibold">Короновал:</dt>
            <dd>
              {new Date(crowned_date).toLocaleDateString()} ({crowned_place})
            </dd>
          </dl>
        </div>
      </div>
      <div className="prose prose-lg prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </article>
  );
}
