import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProductGallery } from './components/ProductGallery';
import { ProductInfo } from './components/ProductInfo';
import { ProductCard } from '@/modules/shop/components/ProductCard';
import { Product } from '@/data/products';
import api from '@/lib/api';
import { Footer } from '@/components/layout/Footer';

export const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProduct = async () => {
            setLoading(true);
            try {
                if (id) {
                    const res = await api.get(`/products/${id}`);
                    setProduct(res.data);

                    // Fetch related products (simple implementation: fetch all and filter by category)
                    // Efficient way: api endpoint for related
                    const allRes = await api.get('/products', { params: { category: res.data.category } });
                    setRelatedProducts(allRes.data.filter((p: Product) => p.id !== res.data.id).slice(0, 3));
                }
            } catch (error) {
                console.error("Failed to load product", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!product) {
        return <div className="min-h-screen pt-32 text-center">Product not found</div>;
    }

    return (
        <main className="min-h-screen bg-white">
            <div className="min-h-screen bg-white pt-24 pb-20">
                <div className="container mx-auto px-4 md:px-8">
                    {/* Back Button */}
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center text-stone-500 hover:text-stone-900 transition-colors mb-8 group font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>

                    {/* Product Section */}
                    <div className="flex flex-col lg:flex-row gap-12 mb-24">
                        <div className="w-full lg:w-3/5">
                            <ProductGallery images={[product.image, product.hoverImage].filter(Boolean)} />
                        </div>
                        <div className="w-full lg:w-2/5">
                            <ProductInfo product={product} />
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="border-t border-stone-200 pt-16">
                        <h2 className="font-serif text-3xl text-stone-900 mb-12 text-center">You Might Also Like</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};
