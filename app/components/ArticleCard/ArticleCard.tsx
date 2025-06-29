// File: app/components/ArticleCard/ArticleCard.tsx

import React from 'react';
import Link from 'next/link';

export interface ArticleCardProps {
  /** Первый элемент из массива images (может быть undefined) */
  img?: string;
  /** Поле cover из Directus (может быть undefined) */
  cover?: string;
  alt: string;
  title: string;
  desc: string;
  href?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ img, cover, alt, title, desc, href }) => {
  // Приоритет: cover > img > локальный плейсхолдер
  const src = cover && cover.length ? cover : img && img.length ? img : '/images/placeholder.jpg';

  // Для дебага можно раскомментировать
  // console.log('ArticleCard props:', { img, cover, src, alt, title })

  const content = (
    <article className="bg-[#2a1910] rounded-lg overflow-hidden hover:shadow-lg transition">
      <img src={src} alt={alt} width={600} height={400} className="object-cover w-full h-48" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm">{desc}</p>
      </div>
    </article>
  );

  return href ? <Link href={href}>{content}</Link> : content;
};
