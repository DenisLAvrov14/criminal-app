// File: app/[section]/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchArticleBySlug } from '@/app/lib/api';
import Breadcrumbs from '@/app/ui/Breadcrumbs/Breadcrumbs';
import BackButton from '@/app/ui/BackButton.tsx/BackButton';
import { ContactSection } from '@/app/components/ContactSection/ContactSection';
import ArticlePage from '@/app/components/DefaultArticle/DefaultArticle';
import { SimilarArticles } from '@/app/components/SimilarArticles/SimilarArticles';

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
export const revalidate = 60;

type SectionProps = { params: Promise<{ section: string; slug: string }> };

export async function generateMetadata({ params }: SectionProps): Promise<Metadata> {
  const { section, slug } = await params;

  if (slug === 'contact') {
    return {
      title: 'Contact the Author',
      description: 'Questions? Feedback? Drop me a line below.',
      alternates: { canonical: `${SITE_URL}/contact` },
    };
  }

  const article = await fetchArticleBySlug(slug);
  if (!article || article.section !== section) {
    return { title: 'Not Found' };
  }

  const pageUrl = `${SITE_URL}/${section}/${slug}`;
  const image = article.images?.[0]?.url;

  return {
    title: article.meta_title || article.title,
    description: article.meta_description || article.excerpt || '',
    alternates: { canonical: pageUrl },
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || '',
      url: pageUrl,
      siteName: 'Russian Criminal Culture',
      images: image ? [image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || '',
      images: image ? [image] : [],
    },
  };
}

export default async function SectionSlugPage({ params }: SectionProps) {
  const { section, slug } = await params;

  if (slug === 'contact') {
    return <ContactSection />;
  }

  const article = await fetchArticleBySlug(slug);
  if (!article || article.section !== section) {
    return notFound();
  }

  // canonical задаётся в generateMetadata
  return (
    <div className="space-y-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            {
              label: section.charAt(0).toUpperCase() + section.slice(1),
              href: `/${section}`,
            },
            { label: article.title },
          ]}
        />

        <ArticlePage
          title={article.title}
          excerpt={article.excerpt}
          meta_title={article.meta_title}
          meta_description={article.meta_description}
          images={article.images}
          contentHtml={article.contentHtml}
          cover={article.cover}
        />

        <BackButton />
      </div>

      <div className="mx-auto max-w-6xl">
        <SimilarArticles slug={article.slug} section={article.section!} />
      </div>
    </div>
  );
}
