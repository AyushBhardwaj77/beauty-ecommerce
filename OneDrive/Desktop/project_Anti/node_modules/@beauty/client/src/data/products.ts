export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    category: 'Skincare' | 'Makeup' | 'Haircare' | 'Sets' | 'Fragrance';
    image: string;
    hoverImage: string;
    badge?: 'New' | 'Best Seller' | 'Limited' | 'Sale';
    skinType?: 'Dry' | 'Oily' | 'Combination' | 'Sensitive' | 'All';
    description?: string;
    ingredients?: string;
    howToUse?: string;
}

// Each product has UNIQUE images - matching server seed data
export const PRODUCTS: Product[] = [
    // ========== SKINCARE ==========
    {
        id: 1,
        name: 'Luminous Silk Serum',
        brand: 'Glow Different',
        price: 54,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
        badge: 'Best Seller',
        skinType: 'Dry',
        description: 'A luxurious serum that hydrates and illuminates the skin.',
        ingredients: 'Aqua, Glycerin, Hyaluronic Acid, Silk Amino Acids',
        howToUse: 'Apply 2-3 drops to clean skin morning and night.'
    },
    {
        id: 2,
        name: 'Radiance Night Oil',
        brand: 'Glow Different',
        price: 68,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&q=80',
        skinType: 'Dry',
        description: 'Nourishing facial oil that restores skin barrier overnight.',
        ingredients: 'Jojoba Oil, Rosehip Oil, Vitamin E, Squalane',
        howToUse: 'Massage 3-4 drops into skin as the last step of your routine.'
    },
    {
        id: 3,
        name: 'Daily Vitamin C Serum',
        brand: 'Glow Different',
        price: 62,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80',
        skinType: 'Combination',
        badge: 'Best Seller',
        description: 'Brightens skin and protects against environmental damage.',
        ingredients: 'L-Ascorbic Acid 15%, Ferulic Acid, Vitamin E',
        howToUse: 'Apply in the morning before sunscreen.'
    },
    {
        id: 4,
        name: 'Cloud Cream Moisturizer',
        brand: 'Glow Different',
        price: 48,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&q=80',
        skinType: 'All',
        badge: 'New',
        description: 'Lightweight yet deeply hydrating cream that melts into skin.',
        ingredients: 'Squalane, Ceramides, Peptides, Aloe Vera',
        howToUse: 'Apply generously to face and neck after serum.'
    },
    {
        id: 5,
        name: 'Hydrating Rose Mist',
        brand: 'Glow Different',
        price: 32,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
        skinType: 'Sensitive',
        description: 'Refreshing mist that soothes and hydrates instantly.',
        ingredients: 'Rose Water, Aloe Vera, Glycerin, Cucumber Extract',
        howToUse: 'Spritz over face whenever you need a moisture boost.'
    },
    {
        id: 6,
        name: 'Purifying Clay Mask',
        brand: 'Glow Different',
        price: 38,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80',
        skinType: 'Oily',
        description: 'Deep cleansing mask that draws out impurities.',
        ingredients: 'Kaolin Clay, Bentonite, Charcoal, Green Tea Extract',
        howToUse: 'Apply to clean skin, leave for 10-15 minutes, rinse.'
    },
    {
        id: 7,
        name: 'Gentle Exfoliating Toner',
        brand: 'Glow Different',
        price: 36,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80',
        skinType: 'Combination',
        description: 'Gentle AHA/BHA toner that exfoliates and refines pores.',
        ingredients: 'Glycolic Acid 5%, Salicylic Acid 0.5%, Witch Hazel',
        howToUse: 'After cleansing, apply with cotton pad 2-3 times weekly.'
    },
    {
        id: 8,
        name: 'Eye Revival Complex',
        brand: 'Glow Different',
        price: 56,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&q=80',
        skinType: 'All',
        description: 'Targets dark circles, puffiness, and fine lines.',
        ingredients: 'Caffeine, Retinol 0.1%, Peptides, Vitamin K',
        howToUse: 'Gently pat around eye area morning and evening.'
    },

    // ========== MAKEUP ==========
    {
        id: 9,
        name: 'Velvet Matte Lip',
        brand: 'Glow Different',
        price: 28,
        category: 'Makeup',
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80',
        badge: 'New',
        description: 'Long-wearing matte lipstick with comfortable velvet finish.',
        ingredients: 'Dimethicone, Vitamin E, Jojoba Oil, Shea Butter',
        howToUse: 'Swipe directly onto lips for instant bold color.'
    },
    {
        id: 10,
        name: 'Sculpting Contour Wand',
        brand: 'Glow Different',
        price: 45,
        category: 'Makeup',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80',
        badge: 'Limited',
        description: 'Creamy contour stick for effortless, natural definition.',
        ingredients: 'Caprylic/Capric Triglyceride, Mica, Silica, Vitamin E',
        howToUse: 'Apply under cheekbones and along jawline, blend upwards.'
    },
    {
        id: 11,
        name: 'Volumizing Mascara',
        brand: 'Glow Different',
        price: 24,
        category: 'Makeup',
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80',
        badge: 'Best Seller',
        description: 'Buildable formula for dramatic volume without clumping.',
        ingredients: 'Beeswax, Carnauba Wax, Iron Oxides, Panthenol',
        howToUse: 'Wiggle wand from root to tip. Build layers as desired.'
    },
    {
        id: 12,
        name: 'Silk Finish Foundation',
        brand: 'Glow Different',
        price: 42,
        category: 'Makeup',
        image: 'https://images.unsplash.com/photo-1557205465-f3762edea6d3?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1557205465-f3762edea6d3?w=400&q=80',
        description: 'Medium-to-full coverage with natural, skin-like finish.',
        ingredients: 'Water, Cyclopentasiloxane, Titanium Dioxide, HA',
        howToUse: 'Apply with brush, sponge, or fingertips.'
    },
    {
        id: 13,
        name: 'Glow Blush',
        brand: 'Glow Different',
        price: 30,
        category: 'Makeup',
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80',
        description: 'Silky powder blush with subtle shimmer for healthy flush.',
        ingredients: 'Talc, Mica, Silica, Zinc Stearate, Vitamin E',
        howToUse: 'Apply to apples of cheeks, blend towards temples.'
    },

    // ========== HAIRCARE ==========
    {
        id: 14,
        name: 'Repairing Hair Oil',
        brand: 'Glow Different',
        price: 42,
        category: 'Haircare',
        image: '/products/hair_oil.png',
        hoverImage: '/products/hair_oil.png',
        description: 'Lightweight oil that repairs damage and adds shine.',
        ingredients: 'Argan Oil, Marula Oil, Vitamin E, Jojoba Esters',
        howToUse: 'Apply 2-3 drops to damp or dry hair, focus on ends.'
    },
    {
        id: 15,
        name: 'Nourishing Hair Mask',
        brand: 'Glow Different',
        price: 38,
        category: 'Haircare',
        image: '/products/hair_mask.png',
        hoverImage: '/products/hair_mask.png',
        badge: 'New',
        description: 'Intensive treatment that deeply conditions and strengthens.',
        ingredients: 'Shea Butter, Keratin, Coconut Oil, Silk Proteins',
        howToUse: 'Apply to clean damp hair, leave 5-10 min, rinse.'
    },
    {
        id: 16,
        name: 'Scalp Refresh Scrub',
        brand: 'Glow Different',
        price: 34,
        category: 'Haircare',
        image: '/products/scalp_scrub.png',
        hoverImage: '/products/scalp_scrub.png',
        description: 'Exfoliating scrub that removes buildup and refreshes scalp.',
        ingredients: 'Sea Salt, Tea Tree Oil, Peppermint, Charcoal',
        howToUse: 'Massage into wet scalp before shampooing, 1-2x weekly.'
    },

    // ========== SETS & FRAGRANCE ==========
    {
        id: 17,
        name: 'Glow Starter Kit',
        brand: 'Glow Different',
        price: 85,
        category: 'Sets',
        image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&q=80',
        badge: 'Best Seller',
        description: 'Complete skincare routine: cleanser, serum, moisturizer, SPF.',
        ingredients: 'Includes 4 travel-size products',
        howToUse: 'Use in order: Cleanse, Serum, Moisturize, SPF (AM).'
    },
    {
        id: 18,
        name: 'Signature Scent',
        brand: 'Glow Different',
        price: 95,
        category: 'Fragrance',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80',
        hoverImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80',
        badge: 'Limited',
        description: 'Eau de parfum with bergamot, jasmine, and sandalwood.',
        ingredients: 'Bergamot, Jasmine, Rose, Sandalwood, Musk',
        howToUse: 'Spray on pulse points: wrists, neck, behind ears.'
    }
];
