import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/data/products';
import { Link } from 'react-router-dom';

// Fallback image for any broken product images
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop';

export const FeaturedProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data.slice(0, 3) as Product[]);
            } catch (error) {
                console.error("Failed to fetch featured products", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="py-24 container mx-auto px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <p className="text-stone-500 uppercase tracking-widest text-xs font-semibold mb-4">The Collection</p>
                <h2 className="font-serif text-4xl md:text-5xl text-stone-900">Curated for Your Radiance</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {products.map((product, i) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="group cursor-pointer"
                    >
                        <Link to={`/product/${product.id}`}>
                            <div className="aspect-[3/4] bg-stone-100 overflow-hidden relative mb-6">
                                {/* Main Image */}
                                <img
                                    src={product.image || FALLBACK_IMAGE}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                                    onError={(e) => {
                                        e.currentTarget.src = FALLBACK_IMAGE;
                                    }}
                                />
                                {/* Hover Image */}
                                <img
                                    src={product.hoverImage || product.image || FALLBACK_IMAGE}
                                    alt={`${product.name} alt`}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-0 group-hover:opacity-100"
                                    onError={(e) => {
                                        e.currentTarget.src = FALLBACK_IMAGE;
                                    }}
                                />
                                {/* Overlay Button */}
                                <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <Button className="w-full bg-white/90 backdrop-blur text-stone-900 hover:bg-white shadow-lg">
                                        View Product
                                    </Button>
                                </div>
                            </div>

                            <div className="text-left space-y-1">
                                <p className="text-xs text-stone-500">{product.category}</p>
                                <h3 className="font-serif text-xl text-stone-900 group-hover:text-stone-600 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-stone-900 font-medium">${Number(product.price).toFixed(2)}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-16"
            >
                <Link to="/shop">
                    <Button variant="outline" className="group min-w-[200px] border-stone-300">
                        View All Products
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </motion.div>
        </section>
    );
};
