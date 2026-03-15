// src/components/About.jsx
import { STATS } from '../data/content';

export default function About() {
    return (
        <section id="about" className="py-32 px-[6vw] scale-up" data-visible="true">
            <div className="max-w-[900px] mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8" style={{ color: 'var(--text-primary)' }}>
                    Engineered to scale.
                </h2>
                <p className="text-lg leading-relaxed mb-24" style={{ color: 'var(--text-secondary)' }}>
                    We are a highly specialized boutique agency of senior engineers and product designers. We reject bloated frameworks and templated solutions — opting instead to handcraft bespoke systems that perform at the absolute frontier of what the web can do.
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-16 staggered-container">
                    {STATS.map(stat => (
                        <div key={stat.id} className="stagger-item flex flex-col items-center gap-2" data-visible="true">
                            <span className="text-5xl md:text-6xl font-semibold tracking-tight text-gradient">
                                {stat.number}
                            </span>
                            <span className="text-sm uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
