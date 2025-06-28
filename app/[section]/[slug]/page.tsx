// File: app/[section]/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Head from 'next/head';
import { Metadata } from 'next';
import { fetchArticleBySlug } from '@/app/lib/api';
import { Article } from '@/app/lib/types';
import Breadcrumbs from '@/app/ui/Breadcrumbs/Breadcrumbs';
import BackButton from '@/app/ui/BackButton.tsx/BackButton';
import { ContactSection } from '@/app/components/ContactSection/ContactSection';

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
export const revalidate = 60;

// Server-side metadata generation
export async function generateMetadata({
  params,
}: {
  params: { section: string; slug: string };
}): Promise<Metadata> {
  const { section, slug } = params;

  // If someone lands on /contact, show contact metadata
  if (slug === 'contact') {
    return {
      title: 'Contact the Author',
      description: 'Questions? Feedback? Drop me a line below.',
      alternates: { canonical: `${SITE_URL}/contact` },
    };
  }

  // Otherwise load article metadata
  const article: Article = await fetchArticleBySlug(slug);
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
      siteName: 'Russian Prison Culture',
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

interface Props {
  params: { section: string; slug: string };
}

export default async function SectionSlugPage({ params }: Props) {
  const { section, slug } = params;

  // If slug is "contact" at any /[section]/contact, render the form
  if (slug === 'contact') {
    return <ContactSection />;
  }

  // Otherwise load and render the article
  const article: Article = await fetchArticleBySlug(slug);
  if (!article || article.section !== section) {
    return notFound();
  }

  const { title, excerpt, images } = article;
  const imageUrl = images?.[0]?.url;

  return (
    <>
      <Head>
        <link rel="canonical" href={`${SITE_URL}/${section}/${slug}`} />
      </Head>

      <div className="page-wrapper container mx-auto px-6 py-12 space-y-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            {
              label: section.charAt(0).toUpperCase() + section.slice(1),
              href: `/${section}`,
            },
            { label: title },
          ]}
        />

        {imageUrl && (
          <div className="w-full h-80 relative rounded-lg overflow-hidden shadow-lg">
            <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
          </div>
        )}

        {excerpt && <p className="text-lg text-[#ddd]">{excerpt}</p>}

        <BackButton />

        {/* Here your main article content would go */}
      </div>
    </>
  );
}
