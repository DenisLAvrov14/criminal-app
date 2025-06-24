import { IconCard } from '../IconCard/IconCard';

const EXPLORE = [
  { href: '/locations', src: '/locations.svg', label: 'Locations' },
  { href: '/tattoos', src: '/tattoo.svg', label: 'Tattoos' },
  { href: '/hierarchy', src: '/hierarchy.svg', label: 'Hierarchy' },
  { href: '/music', src: '/music.svg', label: 'Music' },
];
export const ExploreMore = () => (
  <section className="container mx-auto px-6 pb-16">
    <h2 className="text-2xl font-bold mb-6">Explore More</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {EXPLORE.map(icon => (
        <IconCard key={icon.label} {...icon} size={4} />
      ))}
    </div>
  </section>
);
