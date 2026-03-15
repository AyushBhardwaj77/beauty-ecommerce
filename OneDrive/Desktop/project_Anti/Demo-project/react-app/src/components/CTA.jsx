// src/components/CTA.jsx
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Submission failed');

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.2] mb-6" style={{ color: 'var(--text-primary)' }}>
                Have a project in mind?
            </h2>
            <p className="text-lg mb-12 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                We take on a limited number of clients each quarter. If you're building something meaningful, let's talk.
            </p>

            {status === 'success' ? (
                <div className="py-12 px-8 rounded-3xl border" style={{ borderColor: 'var(--border-hi)', background: 'var(--glass)' }}>
                    <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Message Received.</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>We'll be in touch with you shortly.</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="mt-8 text-sm font-medium underline underline-offset-4"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="text-left flex flex-col gap-6 max-w-xl mx-auto">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-xs uppercase tracking-widest font-medium opacity-60">Full Name</label>
                        <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="bg-transparent border-b py-3 focus:outline-none transition-all duration-300"
                            style={{ borderColor: 'var(--border-hi)', color: 'var(--text-primary)' }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs uppercase tracking-widest font-medium opacity-60">Email Address</label>
                        <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="hello@example.com"
                            className="bg-transparent border-b py-3 focus:outline-none transition-all duration-300"
                            style={{ borderColor: 'var(--border-hi)', color: 'var(--text-primary)' }}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-xs uppercase tracking-widest font-medium opacity-60">Project Details</label>
                        <textarea
                            required
                            id="message"
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your project..."
                            className="bg-transparent border-b py-3 focus:outline-none transition-all duration-300 resize-none"
                            style={{ borderColor: 'var(--border-hi)', color: 'var(--text-primary)' }}
                        ></textarea>
                    </div>

                    <button
                        disabled={status === 'loading'}
                        type="submit"
                        className="mt-6 px-10 py-5 rounded-full text-base font-medium transition-all duration-400 hover:scale-[1.02] hover:shadow-glow active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: 'var(--text-primary)', color: 'var(--bg)' }}
                    >
                        {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                    </button>

                    {status === 'error' && (
                        <p className="text-center text-sm text-red-500">Something went wrong. Please try again.</p>
                    )}
                </form>
            )}
        </>
    );
}

export default function CTA() {
    return (
        <section id="contact" className="py-32 px-[6vw] fade-up" data-visible="true">
            <div className="max-w-[1400px] mx-auto">
                <div
                    className="p-16 md:p-24 rounded-5xl border"
                    style={{
                        background: 'var(--card)',
                        backdropFilter: 'blur(60px)',
                        borderColor: 'var(--border-hi)',
                        boxShadow: '0 0 80px rgba(105, 80, 255, 0.08)',
                    }}
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
}

