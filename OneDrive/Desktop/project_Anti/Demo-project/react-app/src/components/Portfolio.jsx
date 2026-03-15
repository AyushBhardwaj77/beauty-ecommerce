// src/components/Portfolio.jsx
import { useApi } from '../hooks/useApi';

export default function Portfolio() {
    const { data: portfolio, loading, error } = useApi('portfolio');

    if (loading) return null;
    if (error) return null;

    return (
        <section id="portfolio" className="py-32 px-[6vw]">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-24 fade-up">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Selected Work.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 staggered-container">
                    {portfolio && portfolio.map(item => (
                        <div key={item.id} className="portfolio-card stagger-item group relative overflow-hidden rounded-4xl cursor-pointer">
                            <div
                                className="w-full pt-[60%] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url('${item.image}')` }}
                            />
                            <div
                                className="absolute bottom-0 left-0 right-0 p-8 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 rounded-b-4xl"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
                            >
                                <h4 className="text-white text-xl font-semibold tracking-tight">{item.title}</h4>
                                <p className="text-white/60 text-sm mt-1">{item.category}</p>
                            </div>
                            {/* Always visible label on mobile */}
                            <div className="md:hidden absolute bottom-0 left-0 right-0 p-6 rounded-b-4xl"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                <h4 className="text-white text-lg font-semibold">{item.title}</h4>
                                <p className="text-white/60 text-xs mt-0.5">{item.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
