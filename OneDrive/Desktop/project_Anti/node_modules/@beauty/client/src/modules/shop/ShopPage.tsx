import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { Product } from '@/data/products';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { SlidersHorizontal } from 'lucide-react';

export const ShopPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Price Filter State
    const [activePriceRanges, setActivePriceRanges] = useState<{ min: number, max: number }[]>([]);

    // Get filters from URL
    const category = searchParams.get('category') || 'All';
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params: any = {};
                if (category !== 'All') params.category = category;
                if (searchQuery) params.search = searchQuery;

                const res = await api.get('/products', { params });
                setProducts(res.data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, searchQuery]);

    const handleCategoryChange = (cat: string | null) => {
        if (cat) {
            setSearchParams({ category: cat });
        } else {
            setSearchParams({});
        }
    };

    const handlePriceChange = (min: number, max: number, active: boolean) => {
        setActivePriceRanges(prev => {
            if (active) {
                return [...prev, { min, max }];
            } else {
                return prev.filter(r => r.min !== min || r.max !== max);
            }
        });
    };

    // Client-side filtering for price (since API doesn't support it yet)
    const filteredProducts = useMemo(() => {
        if (activePriceRanges.length === 0) return products;

        return products.filter(product => {
            return activePriceRanges.some(range => {
                const price = Number(product.price);
                return price >= range.min && price <= range.max;
            });
        });
    }, [products, activePriceRanges]);

    // Derived state for display title
    const getPageTitle = () => {
        if (searchQuery) return `Search results for "${searchQuery}"`;
        if (category === 'All') return 'All Products';
        return category;
    };

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Header */}
            <div className="bg-stone-50 py-12 px-4 md:px-8 text-center border-b border-stone-100">
                <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4 animate-in slide-in-from-bottom-2 duration-700">
                    {getPageTitle()}
                </h1>
                <p className="text-stone-500 max-w-2xl mx-auto">
                    Explore our curated collection of premium skincare and beauty essentials.
                </p>
                <div className="mt-6 md:hidden">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    >
                        <SlidersHorizontal size={16} className="mr-2" /> Filters
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row gap-8">
                {/* Sidebar - Hidden on mobile */}
                <div className="hidden md:block w-64 flex-shrink-0">
                    <FilterSidebar
                        activeCategory={category}
                        onCategoryChange={handleCategoryChange}
                        onPriceChange={handlePriceChange}
                    />
                </div>

                {/* Mobile Drawer */}
                {isMobileFilterOpen && (
                    <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsMobileFilterOpen(false)}>
                        <div className="absolute right-0 top-0 bottom-0 w-[80%] bg-white p-6" onClick={e => e.stopPropagation()}>
                            <FilterSidebar
                                activeCategory={category}
                                onCategoryChange={(c) => { handleCategoryChange(c); setIsMobileFilterOpen(false); }}
                                onPriceChange={handlePriceChange}
                            />
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                <div className="flex-1">
                    {loading ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                            {[1, 2, 3, 4, 5, 6].map(n => (
                                <div key={n} className="space-y-4">
                                    <div className="aspect-[3/4] bg-stone-100 animate-pulse" />
                                    <div className="h-4 bg-stone-100 w-2/3 animate-pulse" />
                                    <div className="h-4 bg-stone-100 w-1/3 animate-pulse" />
                                </div>
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <h3 className="text-xl font-serif text-stone-900 mb-2">No products found</h3>
                            <p className="text-stone-500">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
