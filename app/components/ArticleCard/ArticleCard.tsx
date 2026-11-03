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
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ img, cover, alt, title, desc, href }) => {
  const src = cover && cover.length ? cover : img && img.length ? img : '/images/placeholder.jpg';

  const content = (
    <article className="h-full flex flex-col bg-[#2a1910] rounded-lg overflow-hidden hover:shadow-lg transition">
      <div className="relative w-full aspect-square bg-[#2a1910] shrink-0">
        <Image src={src} alt={alt} fill className="object-contain" priority />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-semibold line-clamp-2">{title}</h3>
        <p className="mt-2 text-sm line-clamp-4">{desc}</p>
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
