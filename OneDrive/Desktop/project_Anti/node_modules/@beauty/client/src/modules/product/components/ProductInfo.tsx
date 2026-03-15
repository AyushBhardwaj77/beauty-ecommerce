import React, { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { Minus, Plus, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductInfoProps {
    product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
    const [quantity, setQuantity] = useState(1);
    const [openSection, setOpenSection] = useState<string | null>('description');
    const { addToCart } = useCart();

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-stone-500 font-medium">{product.category}</p>
                    <div className="flex items-center gap-1 text-stone-900 text-sm">
                        <Star size={16} fill="currentColor" />
                        <span className="font-bold">4.9</span>
                        <span className="text-stone-400 font-normal">(128 reviews)</span>
                    </div>
                </div>
                <h1 className="font-serif text-4xl text-stone-900">{product.name}</h1>
                <p className="text-2xl font-medium text-stone-900">${product.price.toFixed(2)}</p>
            </div>

            {/* Description placeholder */}
            <p className="text-stone-600 leading-relaxed">
                Unlock your skin's natural radiance with our award-winning formula.
                Infused with botanicals and clinical-grade actives, it hydrates, plumps, and smooths texture for an effortless glow.
            </p>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-stone-100">
                <div className="flex items-center border border-stone-200 rounded-full h-12 w-32 px-4 justify-between">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="text-stone-500 hover:text-stone-900"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="font-medium text-stone-900">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="text-stone-500 hover:text-stone-900"
                    >
                        <Plus size={16} />
                    </button>
                </div>
                <Button
                    className="flex-1 h-12 text-lg"
                    onClick={() => addToCart(product, quantity)}
                >
                    Add to Bag - ${(Number(product.price) * quantity).toFixed(2)}
                </Button>
            </div>

            {/* Accordion Info */}
            <div className="pt-8 space-y-4">
                <div className="border-t border-stone-200">
                    <button
                        className="w-full flex items-center justify-between py-4 text-left font-serif text-lg text-stone-900"
                        onClick={() => toggleSection('description')}
                    >
                        Description
                        {openSection === 'description' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {openSection === 'description' && (
                        <div className="pb-4 text-stone-600 animate-in slide-in-from-top-2">
                            A lightweight, fast-absorbing formula that delivers deep hydration without feeling greasy.
                            Perfect for daily use under makeup or as part of your nighttime ritual.
                        </div>
                    )}
                </div>

                <div className="border-t border-stone-200">
                    <button
                        className="w-full flex items-center justify-between py-4 text-left font-serif text-lg text-stone-900"
                        onClick={() => toggleSection('ingredients')}
                    >
                        Ingredients
                        {openSection === 'ingredients' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {openSection === 'ingredients' && (
                        <div className="pb-4 text-stone-600 animate-in slide-in-from-top-2">
                            Water (Aqua), Glycerin, Hyaluronic Acid, Niacinamide, Rosa Damascena Flower Oil,
                            Tocopherol (Vitamin E), Aloe Barbadensis Leaf Juice.
                        </div>
                    )}
                </div>

                <div className="border-t border-stone-200">
                    <button
                        className="w-full flex items-center justify-between py-4 text-left font-serif text-lg text-stone-900"
                        onClick={() => toggleSection('usage')}
                    >
                        How to Use
                        {openSection === 'usage' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {openSection === 'usage' && (
                        <div className="pb-4 text-stone-600 animate-in slide-in-from-top-2">
                            Apply 2-3 drops to clean, damp skin morning and night. Gently massage in upward circular motions.
                            Follow with moisturizer if needed.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
