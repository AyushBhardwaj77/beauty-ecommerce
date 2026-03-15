import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Fallback image for any broken images
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80';

interface ProductGalleryProps {
    images: string[];
}

export const ProductGallery = ({ images }: ProductGalleryProps) => {
    // Filter out invalid images just in case
    const validImages = images.filter(Boolean);
    const [mainImage, setMainImage] = useState(validImages[0] || FALLBACK_IMAGE);

    // Update main image when props change (e.g. data load)
    React.useEffect(() => {
        if (validImages.length > 0) {
            setMainImage(validImages[0]);
        }
    }, [images]);

    if (validImages.length === 0) {
        return (
            <div className="aspect-[3/4] bg-stone-100">
                <img src={FALLBACK_IMAGE} alt="Product" className="w-full h-full object-cover" />
            </div>
        );
    }

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:h-[600px] scrollbar-hide py-2 md:py-0 px-1">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setMainImage(img)}
                        className={`relative w-16 h-20 md:w-20 md:h-24 flex-shrink-0 cursor-pointer overflow-hidden border-2 transition-all duration-300 ${mainImage === img ? 'border-stone-900' : 'border-transparent hover:border-stone-300'}`}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = FALLBACK_IMAGE;
                            }}
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 aspect-[3/4] bg-stone-100 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={mainImage}
                        src={mainImage}
                        alt="Product Image"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
};

