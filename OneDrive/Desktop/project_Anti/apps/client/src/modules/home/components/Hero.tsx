import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-[#E8E6E1]">
        <div className="absolute inset-0 bg-stone-900/10" />
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2574&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center max-w-4xl">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-white/90 uppercase tracking-[0.2em] text-sm md:text-base font-medium mb-6">
              Essentials for Natural Radiance
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
              Reveal Your <br />
              <span className="italic font-light">Inner Glow</span>
            </h1>
            <p className="text-stone-100 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
              Clean, conscious, and curated. Discover the new standard in skincare
              designed to nourish your skin and soul.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" className="bg-white text-stone-900 hover:bg-stone-50 min-w-[180px]">
                  Shop Collection
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 min-w-[180px]">
                  Our Story
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

