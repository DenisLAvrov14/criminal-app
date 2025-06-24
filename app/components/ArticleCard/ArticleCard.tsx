import React from 'react';
import Link from 'next/link';

export interface ArticleCardProps {
  img: string;
  alt: string;
  title: string;
  desc: string;
  href?: string;
  cover?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ img, alt, title, desc, href, cover }) => {
  // Берём обложку, если она есть, иначе — основное изображение
  const src = cover ?? img;

  // Лог для проверки пропсов и src
  console.log('ArticleCard props:', { img, cover, src, alt, title });

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
