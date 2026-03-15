// src/components/Testimonials.jsx
import { useApi } from '../hooks/useApi';

export default function Testimonials() {
    const { data: testimonials, loading, error } = useApi('testimonials');

    if (loading) return null;
    if (error) return null;

    return (
        <section id="testimonials" className="py-32 px-[6vw]">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-24 fade-up">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Partner Endorsements.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 staggered-container">
                    {testimonials && testimonials.map(t => (
                        <div
                            key={t.id}
                            className="stagger-item p-10 rounded-4xl border transition-all duration-500 hover:-translate-y-1"
                            style={{
                                background: 'var(--card)',
                                backdropFilter: 'blur(24px)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
                                "{t.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    loading="lazy"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h5 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{t.name}</h5>
                                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{t.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
