import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    image?: string;
}

export const AuthLayout = ({
    children,
    title,
    subtitle,
    image = "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1887&auto=format&fit=crop"
}: AuthLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            {/* Content Section (Left/Top) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex-1 flex flex-col justify-center px-4 sm:px-12 md:px-24 py-12 order-2 md:order-1"
            >
                <div className="w-full max-w-md mx-auto space-y-8">
                    <div className="text-center md:text-left">
                        <Link to="/" className="inline-block font-serif text-2xl mb-8 hover:opacity-70 transition-opacity">
                            Glow Different.
                        </Link>
                        <h1 className="font-serif text-4xl text-stone-900 mb-3">{title}</h1>
                        <p className="text-stone-500">{subtitle}</p>
                    </div>

                    {children}
                </div>
            </motion.div>

            {/* Image Section (Right/Bottom) */}
            <div className="flex-1 relative hidden md:block order-1 md:order-2 bg-stone-100">
                <img
                    src={image}
                    alt="Editorial Beauty"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />

                {/* Overlay Text */}
                <div className="absolute bottom-12 left-12 right-12 text-white">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="font-serif text-3xl max-w-lg leading-tight"
                    >
                        "Beauty is not just about how you look, but how you feel."
                    </motion.p>
                </div>
            </div>
        </div>
    );
};
