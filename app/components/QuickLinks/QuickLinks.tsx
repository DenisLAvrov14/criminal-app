import { IconCard } from '../IconCard/IconCard';

const QUICK_LINKS = [
  { href: '#traditions', src: '/hram.svg', label: 'Traditions' },
  { href: '#history', src: '/zvezda.svg', label: 'History' },
  { href: '#legends', src: '/pika.svg', label: 'Legends' },
];
export const QuickLinks = () => (
  <section className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {QUICK_LINKS.map(link => (
      <IconCard key={link.label} {...link} size={5} />
    ))}
  </section>
);
