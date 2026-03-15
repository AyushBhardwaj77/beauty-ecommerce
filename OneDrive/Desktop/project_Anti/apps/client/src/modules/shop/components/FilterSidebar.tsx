import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterSidebarProps {
    activeCategory: string | null;
    onCategoryChange: (category: string | null) => void;
    onPriceChange?: (min: number, max: number, active: boolean) => void;
}

const CATEGORIES = ['Skincare', 'Makeup', 'Haircare', 'Sets'];

export const FilterSidebar = ({ activeCategory, onCategoryChange, onPriceChange }: FilterSidebarProps) => {
    return (
        <aside className="w-full hidden md:block space-y-8">
            {/* Categories */}
            <div>
                <h3 className="font-serif text-lg mb-4 flex items-center justify-between cursor-pointer">
                    Category
                    <ChevronDown size={16} />
                </h3>
                <ul className="space-y-3 text-sm">
                    <li>
                        <button
                            onClick={() => onCategoryChange(null)}
                            className={`transition-colors ${activeCategory === null ? 'text-stone-900 font-medium underline underline-offset-4 decoration-rose-300' : 'text-stone-500 hover:text-stone-900'}`}
                        >
                            All Products
                        </button>
                    </li>
                    {CATEGORIES.map(cat => (
                        <li key={cat}>
                            <button
                                onClick={() => onCategoryChange(cat)}
                                className={`transition-colors ${activeCategory === cat ? 'text-stone-900 font-medium underline underline-offset-4 decoration-rose-300' : 'text-stone-500 hover:text-stone-900'}`}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price */}
            <div>
                <h3 className="font-serif text-lg mb-4 flex items-center justify-between cursor-pointer">
                    Price
                    <ChevronDown size={16} />
                </h3>
                <div className="space-y-2 text-sm text-stone-500">
                    {[
                        { label: 'Under $25', min: 0, max: 25 },
                        { label: '$25 - $50', min: 25, max: 50 },
                        { label: '$50 - $100', min: 50, max: 100 },
                        { label: 'Over $100', min: 100, max: 1000 }
                    ].map((range, idx) => (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer hover:text-stone-900">
                            <input
                                type="checkbox"
                                className="rounded border-stone-300 text-stone-900 focus:ring-rose-300"
                                onChange={(e) => {
                                    // For simplicity in this demo, we'll just toggle a "active price range" state in parent
                                    // But for now, let's just let the user see the visual feedback
                                    // ideally onPriceChange({ min: range.min, max: range.max, active: e.target.checked })
                                    // Since I need to edit the interface first, let's keep it simple visual first,
                                    // or assuming the user wants it WORKING:
                                    onPriceChange?.(range.min, range.max, e.target.checked);
                                }}
                            />
                            {range.label}
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
};
