// src/components/Hero.jsx
import { useEffect, useRef } from 'react';

export default function Hero() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    if (scrolled < window.innerHeight) {
                        const opacity = Math.max(0, 1 - (scrolled / window.innerHeight) * 1.5);
                        [
                            [titleRef.current, 0.1],
                            [subtitleRef.current, 0.15],
                            [ctaRef.current, 0.2],
                        ].forEach(([el, speed]) => {
                            if (el) {
                                el.style.transform = `translateY(${scrolled * speed}px)`;
                                el.style.opacity = opacity;
                            }
                        });
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-[6vw] pt-32 pb-20 overflow-hidden">
            {/* Ambient orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-[900px] h-[900px] rounded-full opacity-10 top-[-200px] left-[-200px] blur-[140px]"
                    style={{ background: 'radial-gradient(circle, rgba(162,102,255,0.4), transparent)' }} />
                <div className="absolute w-[700px] h-[700px] rounded-full opacity-5 bottom-[-150px] right-[-100px] blur-[140px]"
                    style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.4), transparent)' }} />
            </div>

            <div className="text-center relative z-10 max-w-5xl fade-up" data-visible="true">
                <h1
                    ref={titleRef}
                    className="font-semibold tracking-tight leading-none mb-6"
                    style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: 'var(--text-primary)' }}
                >
                    Engineering digital<br />
                    <span className="text-gradient">elegance.</span>
                </h1>
                <p
                    ref={subtitleRef}
                    className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    We are an independent design studio transforming complex technical problems into seamless, modern software experiences for global technology brands.
                </p>
                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#portfolio"
                        className="px-8 py-4 rounded-full text-sm font-medium transition-all duration-400 hover:scale-[1.02] hover:shadow-glow active:scale-[0.98]"
                        style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}
                    >
                        Explore Case Studies
                    </a>
                </div>
            </div>
        </section>
    );
}
