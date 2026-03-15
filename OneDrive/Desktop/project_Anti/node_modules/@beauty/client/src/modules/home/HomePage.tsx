
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Footer } from '@/components/layout/Footer';

export const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#FFFEFC]">
      <Hero />
      <FeaturedProducts />

      {/* Brand Story or Additional Section could go here */}
      <section className="py-24 bg-rose-100/30">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Clean Beauty, No Compromise</h2>
          <p className="text-stone-600 leading-relaxed mb-8">
            We believe that what you put on your skin should be as safe as it is effective.
            Our formulas are crafted with sustainably sourced botanicals and proven clinical actives.
          </p>
          <a href="/about" className="text-stone-900 font-medium border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors">
            Read Our Story
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
};
