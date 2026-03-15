// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const SunIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

const MoonIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600 ${scrolled
                ? 'py-3 backdrop-blur-strong border-b'
                : 'py-5'
                }`}
                style={{
                    background: scrolled ? 'var(--glass)' : 'transparent',
                    borderColor: scrolled ? 'var(--border-hi)' : 'transparent',
                }}
            >
                <div className="max-w-[1400px] mx-auto px-[6vw] flex items-center justify-between">
                    <a href="#hero" className="text-xl font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Aura.
                    </a>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-8">
                        {['Services', 'Work', 'About', 'Clients'].map((item, i) => (
                            <li key={i}>
                                <a
                                    href={`#${['services', 'portfolio', 'about', 'testimonials'][i]}`}
                                    className="text-sm font-medium transition-colors duration-300 hover:opacity-100 opacity-60"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden md:flex items-center gap-5">
                        <button
                            onClick={toggleTheme}
                            className="transition-transform duration-300 hover:rotate-12 hover:scale-110"
                            style={{ color: 'var(--text-primary)', background: 'none', border: 'none' }}
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                        <a
                            href="#contact"
                            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            style={{ color: 'var(--text-primary)', borderColor: 'var(--border-hi)' }}
                        >
                            Contact
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle menu"
                        style={{ background: 'none', border: 'none', color: 'var(--text-primary)' }}
                    >
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
                        <span className={`block w-6 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ background: 'var(--bg)' }}>
                {['Services', 'Work', 'About', 'Clients', 'Contact'].map((item, i) => (
                    <a
                        key={i}
                        href={`#${['services', 'portfolio', 'about', 'testimonials', 'contact'][i]}`}
                        onClick={closeMenu}
                        className="text-3xl font-semibold tracking-tight transition-opacity duration-300 hover:opacity-60"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {item}
                    </a>
                ))}
                <button onClick={toggleTheme} className="mt-4" style={{ color: 'var(--text-primary)', background: 'none', border: 'none' }}>
                    {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
            </div>
        </>
    );
}
