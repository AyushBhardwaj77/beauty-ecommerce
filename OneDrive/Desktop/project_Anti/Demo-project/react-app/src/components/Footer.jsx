// src/components/Footer.jsx
export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="py-16 px-[6vw] border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
                    <div className="max-w-xs">
                        <a href="#hero" className="text-xl font-semibold tracking-tight block mb-4" style={{ color: 'var(--text-primary)' }}>
                            Aura.
                        </a>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            An independent design and engineering studio building the next generation of digital products. Remote-first. Boutique by design.
                        </p>
                    </div>

                    <div className="flex gap-16">
                        <div className="flex flex-col gap-3">
                            <h4 className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Socials</h4>
                            {['Twitter / X', 'Instagram', 'Dribbble'].map(s => (
                                <a key={s} href="#" className="text-sm transition-opacity duration-300 hover:opacity-100 opacity-60" style={{ color: 'var(--text-primary)' }}>{s}</a>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Company</h4>
                            {['About', 'Careers', 'Privacy'].map(s => (
                                <a key={s} href="#" className="text-sm transition-opacity duration-300 hover:opacity-100 opacity-60" style={{ color: 'var(--text-primary)' }}>{s}</a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t text-center text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    <p>© {year} Aura Agency. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
