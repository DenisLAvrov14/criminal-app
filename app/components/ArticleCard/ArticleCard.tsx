import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface ArticleCardProps {
  img?: string;
  cover?: string;
  alt: string;
  title: string;
  desc: string;
  href?: string;
  /** Только для карточек в первом экране — грузить картинку сразу */
  priority?: boolean;
}

// Карточки идут сеткой 1 / 2 / 3 колонки внутри контейнера до ~1200px
const CARD_SIZES = '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw';

export const ArticleCard: React.FC<ArticleCardProps> = ({
  img,
  cover,
  alt,
  title,
  desc,
  href,
  priority = false,
}) => {
  const src = cover && cover.length ? cover : img && img.length ? img : '/images/placeholder.jpg';

  const content = (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#3a2a1a] bg-[#1c120b] transition hover:border-[#c9ad77] hover:shadow-lg">
      <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-[#2a1910]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={CARD_SIZES}
          priority={priority}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-[#f5e8c7] group-hover:text-white sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-[#d8ccb0]">{desc}</p>
      </div>
    </article>
  );

  return href ? (
    <Link href={href} className="block h-full no-underline">
      {content}
    </Link>
  ) : (
    content
  );
};
