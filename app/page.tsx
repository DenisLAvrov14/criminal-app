import { ExploreMore } from './components/ExploreMore/ExploreMore';
import { FeaturedArticles } from './components/FeaturedArticles/FeaturedArticles';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { QuickLinks } from './components/QuickLinks/QuickLinks';
import { SupportContact } from './components/SupportContact/SupportContact';

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-[#f5e8c7] font-serif">
      <Header />
      <Hero />
      <QuickLinks />
      <FeaturedArticles />
      <ExploreMore />
      <SupportContact />
      <Footer />
    </div>
  );
}