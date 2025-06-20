import { ArticleCard } from '../ArticleCard/ArticleCard';

const FEATURED = [
  {
    img: '/images/life-behind-bars.jpg',
    alt: 'Life Behind Bars',
    title: 'Life Behind Bars',
    desc: 'Exploring the history, legends and traditions of the criminal subculture in Russian prisons.',
  },
  {
    img: '/images/solovetsky.jpg',
    alt: 'Solovetsky Monastery',
    title: 'Solovetsky Monastery the First Soviet Camp',
    desc: 'A deep dive into the birthplace of the Gulag system.',
  },
  {
    img: '/images/religious-tattoos.jpg',
    alt: 'Religious Tattoos',
    title: 'Religious Tattoos',
    desc: 'How faith and survival intertwine in prison ink.',
  },
];
export const FeaturedArticles = () => (
  <section className="container mx-auto px-6 pb-16">
    <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {FEATURED.map(a => (
        <ArticleCard key={a.title} {...a} />
      ))}
    </div>
  </section>
);
