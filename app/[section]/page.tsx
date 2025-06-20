import { ArticleCard, ArticleCardProps } from '../components/ArticleCard/ArticleCard';

// Заглушки — позже замените на данные из API
const LATEST: ArticleCardProps = {
  img: '/images/placeholder-large.jpg',
  alt: 'Latest news',
  title: 'Latest news headline',
  desc: 'A brief summary of the most recent and important update.',
};

const OTHERS: ArticleCardProps[] = [
  {
    img: '/images/placeholder-1.jpg',
    alt: 'Article 1',
    title: 'Article One',
    desc: 'Short description of article one.',
  },
  {
    img: '/images/placeholder-2.jpg',
    alt: 'Article 2',
    title: 'Article Two',
    desc: 'Short description of article two.',
  },
  {
    img: '/images/placeholder-3.jpg',
    alt: 'Article 3',
    title: 'Article Three',
    desc: 'Short description of article three.',
  },
];

export default function SectionPage() {
  return (
    <>
      {/* Крупно — последняя новость */}
      <section className="mb-16">
        <ArticleCard {...LATEST} />
      </section>

      {/* Сетка последних статей */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OTHERS.map(a => (
            <ArticleCard key={a.title} {...a} />
          ))}
        </div>
      </section>
    </>
  );
}
