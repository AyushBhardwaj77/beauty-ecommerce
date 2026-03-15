import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-stone-900 text-stone-400 py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-2xl text-stone-100">GLOW DIFFERENT</h3>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Celebrating your unique radiance with ethically sourced, premium beauty essentials.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-serif text-lg text-stone-100 mb-6">Shop</h4>
                        <ul className="space-y-3 text-sm">
                            <li><NavLink to="/shop/all" className="hover:text-white transition-colors">All Products</NavLink></li>
                            <li><NavLink to="/shop/skincare" className="hover:text-white transition-colors">Skincare</NavLink></li>
                            <li><NavLink to="/shop/makeup" className="hover:text-white transition-colors">Makeup</NavLink></li>
                            <li><NavLink to="/shop/sets" className="hover:text-white transition-colors">Gift Sets</NavLink></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h4 className="font-serif text-lg text-stone-100 mb-6">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Care Guide</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-serif text-lg text-stone-100 mb-6">Stay in the Glow</h4>
                        <p className="text-sm mb-4">Subscribe for exclusive offers and beauty tips.</p>
                        <form className="flex flex-col gap-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="bg-stone-800 border-none rounded-sm px-4 py-2 text-sm text-white focus:ring-1 focus:ring-rose-300 outline-none"
                            />
                            <button type="button" className="bg-stone-100 text-stone-900 px-4 py-2 text-sm font-medium hover:bg-white transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-stone-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>&copy; {new Date().getFullYear()} Glow Different. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
