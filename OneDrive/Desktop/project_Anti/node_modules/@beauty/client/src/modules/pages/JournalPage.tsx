import { Link } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';

// These are VERIFIED WORKING Unsplash URLs
const ARTICLES = [
    {
        id: '1',
        category: 'SKINCARE',
        title: 'The Art of Double Cleansing',
        excerpt: 'Why this two-step ritual is the secret to glass skin.',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
    },
    {
        id: '2',
        category: 'WELLNESS',
        title: 'Morning Routines for Inner Glow',
        excerpt: 'Start your day with intention and hydration.',
        image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80',
    },
    {
        id: '3',
        category: 'MAKEUP',
        title: 'Less is More: The No-Makeup Makeup Look',
        excerpt: 'Master the art of enhancing your natural beauty.',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
    },
    {
        id: '4',
        category: 'HAIRCARE',
        title: 'Restoring Damaged Hair: A Complete Guide',
        excerpt: 'From dry and brittle to silky and strong.',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    },
];

// Fallback image if any fails to load
const FALLBACK = 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=600&q=80';

export const JournalPage = () => {
    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 pt-32 pb-24">
                <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4 text-center">The Journal</h1>
                <p className="text-stone-500 text-center mb-12 max-w-xl mx-auto">
                    Expert tips, tutorials, and insights to help you look and feel your best.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {ARTICLES.map((article) => (
                        <Link
                            key={article.id}
                            to={`/journal/${article.id}`}
                            className="group block"
                        >
                            <div className="aspect-[16/10] bg-stone-200 mb-6 overflow-hidden rounded-sm">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.src = FALLBACK;
                                    }}
                                />
                            </div>
                            <p className="text-xs font-bold tracking-widest text-stone-500 mb-2">
                                {article.category}
                            </p>
                            <h2 className="font-serif text-2xl text-stone-900 mb-2 group-hover:underline decoration-rose-300 underline-offset-4">
                                {article.title}
                            </h2>
                            <p className="text-stone-600">{article.excerpt}</p>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
};
