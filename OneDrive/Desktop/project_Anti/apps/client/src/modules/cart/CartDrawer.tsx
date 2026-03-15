import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
    const { items, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-stone-100">
                            <h2 className="font-serif text-2xl text-stone-900">Your Bag</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                                        <ShoppingBag size={32} />
                                    </div>
                                    <p className="text-stone-500 text-lg">Your bag is empty.</p>
                                    <Button onClick={() => setIsCartOpen(false)}>Start Shopping</Button>
                                </div>
                            ) : (
                                items.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-24 bg-stone-100 rounded-sm overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-serif text-stone-900 leading-tight mb-1">{item.name}</h3>
                                                    <p className="text-xs text-stone-500">{item.brand}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-stone-400 hover:text-rose-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div className="flex items-center border border-stone-200 rounded-full h-8 px-2 space-x-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="text-stone-500 hover:text-stone-900 p-1"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="text-sm font-medium text-stone-900 w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="text-stone-500 hover:text-stone-900 p-1"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <p className="font-medium text-stone-900">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-stone-100 bg-stone-50 space-y-4">
                                <div className="flex justify-between items-center text-lg font-serif font-medium text-stone-900">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-stone-500 text-center">Shipping & taxes calculated at checkout.</p>
                                <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                                    <Button className="w-full h-12 text-base">Checkout</Button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
