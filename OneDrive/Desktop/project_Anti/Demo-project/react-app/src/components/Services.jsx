// src/components/Services.jsx
import { useApi } from '../hooks/useApi';

export default function Services() {
    const { data: services, loading, error } = useApi('services');

    if (loading) return (
        <section id="services" className="py-32 px-[6vw]">
            <div className="max-w-[1400px] mx-auto text-center">
                <p style={{ color: 'var(--text-secondary)' }}>Loading disciplines...</p>
            </div>
        </section>
    );

    if (error) return null;

    return (
        <section id="services" className="py-32 px-[6vw]">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-24 fade-up">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                        Core Disciplines.
                    </h2>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Our methodology eliminates friction, prioritizing speed, accessibility, and high-fidelity execution.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 staggered-container">
                    {services && services.map(service => (
                        <div
                            key={service.id}
                            className="stagger-item group p-10 rounded-4xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-glow"
                            style={{
                                background: 'var(--card)',
                                backdropFilter: 'blur(24px)',
                                borderColor: 'var(--border)',
                            }}
                        >
                            <div className="w-12 h-12 mb-8 rounded-2xl flex items-center justify-center border"
                                style={{ borderColor: 'var(--border-hi)', background: 'var(--glass)' }}>
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                                {service.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
