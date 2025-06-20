import { ArticleCard, ArticleCardProps } from '../components/ArticleCard/ArticleCard';

// TODO: потом заменим на fetch из API
const ARTICLES: ArticleCardProps[] = [
  {
    img: '/images/placeholder-1.jpg',
    alt: 'Article One',
    title: 'Article One',
    desc: 'Краткое описание первой статьи…',
  },
  {
    img: '/images/placeholder-2.jpg',
    alt: 'Article Two',
    title: 'Article Two',
    desc: 'Краткое описание второй статьи…',
  },
  // …и т.д.
];

export default function ArticlesPage() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ARTICLES.map(a => (
          <ArticleCard key={a.title} {...a} />
        ))}
      </div>
      {/* Опционально: пагинация */}
      <div className="mt-12 flex justify-center space-x-4">
        <button className="px-4 py-2 bg-[#3f2c1a] rounded-md">← Prev</button>
        <button className="px-4 py-2 bg-[#3f2c1a] rounded-md">Next →</button>
      </div>
    </section>
  );
}
