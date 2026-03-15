import { useParams, Link } from 'react-router-dom';
import { Footer } from '@/components/layout/Footer';
import { ChevronLeft } from 'lucide-react';

// Verified working images
const IMAGES = {
    skincare: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
    wellness: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80',
    makeup: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
    haircare: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
};

const FALLBACK = 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=600&q=80';

// Article content
const ARTICLES: Record<string, {
    title: string;
    category: string;
    date: string;
    image: string;
    content: JSX.Element;
}> = {
    '1': {
        title: "The Art of Double Cleansing",
        category: "SKINCARE",
        date: "October 12, 2023",
        image: IMAGES.skincare,
        content: (
            <>
                <p className="mb-6">
                    Double cleansing is the method of cleaning your face twice: first with an oil-based cleanser
                    and again with a water-based cleanser. It removes stubborn impurities and makeup.
                </p>
                <h3 className="text-2xl font-serif mb-4 mt-8">Why Oil First?</h3>
                <p className="mb-6">
                    Oil dissolves oil. Using an oil cleanser breaks down sebum and makeup
                    far more effectively than water alone.
                </p>
                <h3 className="text-2xl font-serif mb-4 mt-8">The Second Step</h3>
                <p className="mb-6">
                    Your second cleanser goes deeper into pores to clean out sweat and bacteria,
                    ensuring serums and moisturizers can penetrate better.
                </p>
            </>
        )
    },
    '2': {
        title: "Morning Routines for Inner Glow",
        category: "WELLNESS",
        date: "November 05, 2023",
        image: IMAGES.wellness,
        content: (
            <>
                <p className="mb-6">
                    How you start your morning sets the tone for the entire day. Small moments of
                    self-care can transform your daily routine.
                </p>
                <h3 className="text-2xl font-serif mb-4 mt-8">Hydration is Key</h3>
                <p className="mb-6">
                    Before coffee, drink a large glass of warm lemon water to kickstart your metabolism.
                </p>
                <h3 className="text-2xl font-serif mb-4 mt-8">Mindful Movement</h3>
                <p className="mb-6">
                    Even 10 minutes of stretching can wake up your body and improve circulation.
                </p>
            </>
        )
    },
    '3': {
        title: "Less is More: The No-Makeup Makeup Look",
        category: "MAKEUP",
        date: "December 01, 2023",
        image: IMAGES.makeup,
        content: (
            <>
                <p className="mb-6">
                    The "no-makeup makeup" look enhances your natural features while looking effortless.
                </p>
                <h3 className="text-2xl font-serif mb-4 mt-8">Start with Great Skincare</h3>
                <p className="mb-6">
                    The foundation of any no-makeup look is healthy, glowing skin.
                </p>
                <h3 className="text-2xl font-serif mb-4 mt-8">Key Products</h3>
                <p className="mb-6">
                    Stick to essentials: tinted moisturizer, cream blush, brow gel, and nude lip.
                </p>
            </>
        )
    },
    '4': {
        title: "Restoring Damaged Hair: A Complete Guide",
        category: "HAIRCARE",
        date: "January 15, 2024",
        image: IMAGES.haircare,
        content: (
            <>
                <p className="mb-6">
                    Whether from heat styling or coloring, hair damage is reversible with proper care.
                </p>
                <h3 className="text-2xl font-serif mb-4 mt-8">Assess the Damage</h3>
                <p className="mb-6">
                    Look for split ends, breakage, dullness, and brittleness to determine treatment.
                </p>
                <h3 className="text-2xl font-serif mb-4 mt-8">Weekly Hair Masks</h3>
                <p className="mb-6">
                    Deep conditioning with keratin and argan oil once a week works wonders.
                </p>
            </>
        )
    }
};

export const ArticlePage = () => {
    const { id } = useParams();
    const article = ARTICLES[id || '1'] || ARTICLES['1'];

    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto px-4 pt-32 pb-24 max-w-3xl">
                <Link to="/journal" className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-8">
                    <ChevronLeft size={16} className="mr-1" /> Back to Journal
                </Link>

                <p className="text-xs font-bold tracking-widest text-stone-500 mb-4">
                    {article.category} • {article.date}
                </p>
                <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8 leading-tight">
                    {article.title}
                </h1>

                <div className="w-full aspect-video bg-stone-200 rounded-sm mb-12 overflow-hidden">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = FALLBACK;
                        }}
                    />
                </div>

                <div className="text-lg text-stone-600 leading-relaxed font-light">
                    {article.content}
                </div>
            </div>
            <Footer />
        </main>
    );
};
