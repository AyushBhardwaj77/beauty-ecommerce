import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/Button';

// Fallback image
const FALLBACK = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="group relative">
            {/* Image Container - SINGLE IMAGE with scale effect */}
            <div className="aspect-[3/4] bg-stone-100 relative overflow-hidden mb-4">
                <Link to={`/product/${product.id}`} className="block w-full h-full relative">
                    {/* Main Image */}
                    <img
                        src={product.image || FALLBACK}
                        alt={product.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        onError={(e) => {
                            e.currentTarget.src = FALLBACK;
                        }}
                    />
                    {/* Hover Image */}
                    <img
                        src={product.hoverImage || product.image || FALLBACK}
                        alt={`${product.name} alt view`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-0 group-hover:opacity-100"
                        onError={(e) => {
                            e.currentTarget.src = FALLBACK;
                        }}
                    />
                </Link>

                {/* Badge */}
                {product.badge && (
                    <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-stone-900 border border-stone-100">
                        {product.badge}
                    </span>
                )}

                {/* Quick Add Button */}
                <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                        size="sm"
                        className="rounded-full w-10 h-10 p-0 shadow-lg bg-white text-stone-900 hover:bg-stone-900 hover:text-white border-none"
                        aria-label="Quick Add"
                    >
                        <Plus size={18} />
                    </Button>
                </div>
            </div>

            {/* Info */}
            <div className="space-y-1">
                <p className="text-xs text-stone-500 font-medium">{product.category}</p>
                <Link to={`/product/${product.id}`} className="block group-hover:text-stone-600 transition-colors">
                    <h3 className="font-serif text-lg text-stone-900 leading-tight cursor-pointer">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-sm font-medium text-stone-900">${Number(product.price).toFixed(2)}</p>
            </div>
        </div>
    );
};
