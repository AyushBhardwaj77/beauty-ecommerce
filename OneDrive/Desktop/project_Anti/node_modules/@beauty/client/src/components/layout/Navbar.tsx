import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
                isScrolled
                    ? 'bg-white/80 backdrop-blur-md border-stone-200 py-3'
                    : 'bg-transparent border-transparent py-5'
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-stone-900"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Logo */}
                <Link to="/" className="text-xl md:text-2xl font-serif font-bold tracking-tight text-stone-900 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                    GLOW DIFFERENT
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {['Shop', 'About', 'Journal'].map((item) => (
                        <NavLink
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className={({ isActive }) =>
                                cn(
                                    'text-sm font-medium transition-colors hover:text-stone-600',
                                    isActive ? 'text-stone-900' : 'text-stone-500'
                                )
                            }
                        >
                            {item}
                        </NavLink>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="relative group hidden md:block">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const query = formData.get('search');
                                if (query) {
                                    window.location.href = `/shop?search=${query}`;
                                }
                            }}
                            className="flex items-center"
                        >
                            <input
                                name="search"
                                type="text"
                                placeholder="Search..."
                                className="w-0 group-hover:w-32 focus:w-32 transition-all duration-300 border-b border-stone-300 focus:border-stone-900 outline-none mr-2 bg-transparent text-sm placeholder:text-stone-400"
                            />
                            <button type="submit" className="p-2 text-stone-900 hover:bg-stone-100 rounded-full transition-colors">
                                <Search size={20} />
                            </button>
                        </form>
                    </div>

                    {/* Auth Status (Desktop) */}
                    <div className="hidden md:block">
                        {user ? (
                            <div className="relative group">
                                <button className="p-2 text-stone-900 hover:bg-stone-100 rounded-full transition-colors">
                                    <User size={20} />
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-stone-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    <div className="px-4 py-2 border-b border-stone-50">
                                        <p className="text-sm font-medium truncate">{user.name}</p>
                                        <p className="text-xs text-stone-500 truncate">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button variant="ghost" size="sm" className="hidden lg:inline-flex">
                                    Sign In
                                </Button>
                                <button className="p-2 lg:hidden text-stone-900 hover:bg-stone-100 rounded-full transition-colors">
                                    <User size={20} />
                                </button>
                            </Link>
                        )}
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="p-2 text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
                        >
                            <ShoppingBag size={20} />
                        </button>
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-rose-300 text-[10px] font-bold flex items-center justify-center rounded-full text-stone-900">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-white">
                    <div className="p-4 flex justify-end">
                        <button onClick={() => setIsMobileMenuOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-6 px-8 py-4">
                        {user && (
                            <div className="pb-6 border-b border-stone-100">
                                <p className="text-lg font-serif">Hi, {user.name}</p>
                                <p className="text-sm text-stone-500">{user.email}</p>
                            </div>
                        )}

                        {['Shop', 'About', 'Journal'].map((item) => (
                            <NavLink
                                key={item}
                                to={`/${item.toLowerCase()}`}
                                className="text-2xl font-serif text-stone-900"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item}
                            </NavLink>
                        ))}

                        <div className="mt-8">
                            {user ? (
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleLogout}
                                >
                                    Sign Out
                                </Button>
                            ) : (
                                <div className="space-y-3">
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full">Sign In</Button>
                                    </Link>
                                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="outline" className="w-full">Create Account</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
