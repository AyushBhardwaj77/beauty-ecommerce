import React from 'react';
import { Footer } from '@/components/layout/Footer';

export const AboutPage = () => {
    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 pt-32 pb-24 text-center max-w-2xl">
                <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8">About Glow Different</h1>
                <p className="text-lg text-stone-600 leading-relaxed mb-12">
                    We started with a simple belief: beauty should be effortless, clean, and inclusive.
                    Our journey began in a small studio, experimenting with botanicals and seeking the perfect balance between nature and science.
                </p>
                <div className="w-full aspect-video bg-stone-100 rounded-sm mb-12 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=2073&auto=format&fit=crop"
                        alt="Our Studio"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </div>
            <Footer />
        </main>
    );
};
