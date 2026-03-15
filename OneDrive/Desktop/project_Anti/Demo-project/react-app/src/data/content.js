// src/data/content.js — Single source of truth for all site content

export const SERVICES = [
    {
        id: 1,
        title: 'Platform Engineering',
        description: 'We architect scalable React and Next.js applications engineered for high-availability and instantaneous load times.',
        icon: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
    },
    {
        id: 2,
        title: 'Brand Systems',
        description: 'Developing cohesive visual identities, typography guidelines, and complete design tokens for enterprise scalability.',
        icon: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
    },
    {
        id: 3,
        title: 'Product Design (UX/UI)',
        description: 'Data-driven interface design focused on reducing cognitive load and maximizing user retention across all devices.',
        icon: 'M15.59 14.37a6 6 0 01-5.84 7.3A5.969 5.969 0 016.32 18H2.25m0 0a5.969 5.969 0 013.43-5.65m-3.43 5.65v-3.42m0 3.42h3.42',
    },
];

export const PORTFOLIO = [
    {
        id: 1,
        title: 'Omni Financial Dashboard',
        category: 'FinTech · Platform Architecture',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
    },
    {
        id: 2,
        title: 'Verse Apparel Rebrand',
        category: 'Identity · E-Commerce Redesign',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
    },
    {
        id: 3,
        title: 'Novus AI Lab',
        category: 'Landing Site · Interactive 3D',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
    },
    {
        id: 4,
        title: 'Strata Health OS',
        category: 'Mobile App · Wearable Sync',
        image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=1200',
    },
];

export const STATS = [
    { id: 1, number: '$2B+', label: 'Client Revenue Driven' },
    { id: 2, number: '99.9%', label: 'Application Uptime' },
    { id: 3, number: '12ms', label: 'Avg Interaction Latency' },
];

export const TESTIMONIALS = [
    {
        id: 1,
        quote: "Aura didn't just redesign our software — they revolutionized our conversion funnel. Their strict adherence to performance metrics doubled user retention in under three months.",
        name: 'Sarah Jenkins',
        role: 'VP of Product, OmniPay',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    },
    {
        id: 2,
        quote: "Finding a team that balances world-class visual aesthetics with ruthless technical engineering is almost impossible. Aura is that rare exception. Simply unparalleled.",
        name: 'David Chen',
        role: 'CTO, Verse Group',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    },
];
