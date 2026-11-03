// File: app/articles/page.tsx

export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import Link from 'next/link';
import { fetchAllArticles } from '@/app/lib/api';
import { Article } from '@/app/lib/types';
import { ArticleCard } from '@/app/components/ArticleCard/ArticleCard';
import Breadcrumbs from '../ui/Breadcrumbs/Breadcrumbs';

export const metadata: Metadata = {
  title: 'All Articles — Russian Criminal Culture',
  description:
    'Full list of articles across all facets of Russian criminal culture. Explore our archives for history, traditions, gangs, legends, serial killers, tattoos, hierarchy, locations, music and more.',
  alternates: { canonical: `${process.env.SITE_URL || 'http://localhost:3000'}/articles` },
  openGraph: {
    title: 'All Articles',
    description: 'Full list of articles across all facets of Russian criminal culture.',
    url: `${process.env.SITE_URL}/articles`,
    siteName: 'Russian Criminal Culture',
  },
};

export default async function ArticlesPage() {
  const articles: Article[] = await fetchAllArticles();

  return (
    <>
      {/* canonical задаётся в metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${process.env.SITE_URL || 'http://localhost:3000'}/`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Articles',
              },
            ],
          }),
        }}
      />

      <div>
        {/* Хлебные крошки */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Articles' }]} />

        <div className="container mx-auto">
          {/* Page Title */}
          <h1 className="text-4xl lg:text-5xl font-bold uppercase mb-4 border-b-2 border-[#c9ad77] pb-3">
            All Articles
          </h1>
          {/* Subtitle */}
          <p className="text-lg text-[#ddd] mb-12">
            Full list of articles across all facets of Russian criminal culture. Explore our
            archives for history, traditions, gangs, legends, serial killers, tattoos, hierarchy,
            locations, music and more.
          </p>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <div key={article.id}>
                <ArticleCard
                  img={article.cover?.url || article.images[0]?.url || '/images/placeholder-1.jpg'}
                  alt={article.cover?.alt_text || article.images[0]?.alt_text || article.title}
                  title={article.title}
                  desc={article.excerpt || ''}
                  href={`/${article.section}/${article.slug}`}
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex justify-center space-x-4">
            <Link
              href="#"
              className="px-5 py-2 bg-[#3f2c1a] hover:bg-[#5a4228] rounded-md transition-colors"
            >
              &larr; Prev
            </Link>
            <Link
              href="#"
              className="px-5 py-2 bg-[#3f2c1a] hover:bg-[#5a4228] rounded-md transition-colors"
            >
              Next &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
