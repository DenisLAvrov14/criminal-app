import React from 'react';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

export interface MusicArticleProps {
  title: string;
  excerpt?: string;
  contentHtml: string;
  /** YouTube link or embed URL */
  videoUrl?: string;
  /** URL of the cover image */
  coverUrl?: string;
  fio?: string;
  nickname?: string;
  birthdate?: string;
  /** Optional: date of death */
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
  // Преобразуем любую YouTube-ссылку в embed-формат
  const getEmbedUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    const idMatch = url.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    const id = idMatch?.[1];
    return id ? `https://www.youtube.com/embed/${id}` : undefined;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const safeHtml = DOMPurify.sanitize(contentHtml);

  return (
    <article className="container mx-auto space-y-12">
      {/* 1. Заголовок всегда первым */}
      <h1 className="text-3xl font-bold">{title}</h1>

      {/* 2. Грид: 1 колонка на мобилке, 3 на md+ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* A) Видео + excerpt */}
        <div className="order-2 md:order-1 md:col-span-2 space-y-8">
          {embedUrl ? (
            <>
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
            </>
          ) : (
            <div
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(contentHtml),
              }}
            />
          )}
        </div>

        {/* B) Инфоблок о музыканте */}
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
          <div
        className="prose prose-lg prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </article>
  );
}
