import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { ChevronLeft, Check, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { api } from '@/lib/api';

// Replace with your actual publishable key
const stripePromise = loadStripe('pk_test_sample_key_replace_with_real_one');

type CheckoutStep = 'info' | 'shipping' | 'payment' | 'success';

const CheckoutForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            // Create Order in Backend (SIMULATION FOR DEMO)
            onSuccess();
        } catch (err) {
            setMessage("Payment failed");
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            {message && <div className="text-red-500 text-sm">{message}</div>}
            <div className="pt-6 flex justify-between items-center">
                <Button disabled={isLoading || !stripe || !elements} size="lg" className="w-full">
                    {isLoading ? 'Processing...' : 'Pay Now'}
                </Button>
            </div>
        </form>
    );
};

export const CheckoutPage = () => {
    const { items, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState<CheckoutStep>('info');
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (items.length > 0) {
            const createIntent = async () => {
                // For this demo, we are skipping the Stripe Intent creation on loading
                // and handling the "Order Creation" on the final step.
                // Alternatively, we could mock a client secret if we strictly needed the Element to render.
                setClientSecret('mock_secret_for_demo');
            };
            createIntent();
            // Note: The real order creation happens on "handlePaymentSuccess" or equivalent in backend.
        }
    }, [items]);

    const handleNext = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (step === 'info') setStep('shipping');
            else if (step === 'shipping') setStep('payment');
        }, 500);
    };

    const handlePaymentSuccess = async () => {
        try {
            await api.post('/orders', {
                items: items.map(item => ({ id: item.id, quantity: item.quantity, price: item.price })),
                paymentMethod: 'credit_card'
            });
            clearCart();
            setStep('success');
        } catch (error) {
            console.error("Order creation failed", error);
            alert("Failed to create order. Please try again.");
        }
    };

    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#f43f5e',
        },
    };
    const options = {
        clientSecret,
        appearance,
    };

    if (items.length === 0 && step !== 'success') {
        return (
            <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
                <h1 className="font-serif text-3xl mb-4">Your bag is empty</h1>
                <Link to="/shop">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6"
                >
                    <Check size={40} />
                </motion.div>
                <h1 className="font-serif text-4xl mb-4">Order Confirmed!</h1>
                <p className="text-stone-600 mb-8 max-w-md">
                    Thank you for your purchase. We've sent a confirmation email to your inbox.
                    Your order #GD-{Math.floor(Math.random() * 10000)} is being prepared.
                </p>
                <Link to="/">
                    <Button size="lg">Return Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
            {/* Left Column - Form */}
            <div className="flex-1 p-6 lg:p-12 lg:pr-24 pt-24 lg:pt-32">
                <div className="max-w-xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex items-center text-sm text-stone-500 mb-8 gap-2">
                        <Link to="/cart" className="hover:text-stone-900">Cart</Link>
                        <span>/</span>
                        <span className={step === 'info' ? 'text-stone-900 font-medium' : ''}>Information</span>
                        <span>/</span>
                        <span className={step === 'shipping' ? 'text-stone-900 font-medium' : ''}>Shipping</span>
                        <span>/</span>
                        <span className={step === 'payment' ? 'text-stone-900 font-medium' : ''}>Payment</span>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 'info' && (
                            <motion.div
                                key="info"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="font-serif text-2xl mb-6">Contact Information</h2>
                                <div className="space-y-4">
                                    <input type="email" placeholder="Email" className="w-full p-3 border border-stone-200 rounded-sm focus:border-stone-900 outline-none transition-colors" />
                                    <div className="flex gap-4">
                                        <input type="text" placeholder="First Name" className="flex-1 p-3 border border-stone-200 rounded-sm focus:border-stone-900 outline-none transition-colors" />
                                        <input type="text" placeholder="Last Name" className="flex-1 p-3 border border-stone-200 rounded-sm focus:border-stone-900 outline-none transition-colors" />
                                    </div>
                                    <input type="text" placeholder="Address" className="w-full p-3 border border-stone-200 rounded-sm focus:border-stone-900 outline-none transition-colors" />
                                    <div className="flex gap-4">
                                        <input type="text" placeholder="City" className="flex-1 p-3 border border-stone-200 rounded-sm focus:border-stone-900 outline-none transition-colors" />
                                        <input type="text" placeholder="Zip Code" className="w-32 p-3 border border-stone-200 rounded-sm focus:border-stone-900 outline-none transition-colors" />
                                    </div>
                                </div>
                                <div className="pt-6 flex justify-between items-center">
                                    <Link to="/shop" className="text-stone-500 hover:text-stone-900 flex items-center gap-1 text-sm">
                                        <ChevronLeft size={16} /> Return to Shop
                                    </Link>
                                    <Button onClick={handleNext} disabled={loading}>
                                        {loading ? 'Processing...' : 'Continue to Shipping'}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 'shipping' && (
                            <motion.div
                                key="shipping"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="font-serif text-2xl mb-6">Shipping Method</h2>
                                <div className="border border-stone-200 rounded-sm divide-y divide-stone-200">
                                    <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-50">
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="shipping" defaultChecked className="text-stone-900 focus:ring-stone-900" />
                                            <div className="flex flex-col">
                                                <span className="font-medium text-stone-900">Standard Shipping</span>
                                                <span className="text-xs text-stone-500">5-7 Business Days</span>
                                            </div>
                                        </div>
                                        <span className="font-medium text-stone-900">Free</span>
                                    </label>
                                    <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-50">
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="shipping" className="text-stone-900 focus:ring-stone-900" />
                                            <div className="flex flex-col">
                                                <span className="font-medium text-stone-900">Express Shipping</span>
                                                <span className="text-xs text-stone-500">2-3 Business Days</span>
                                            </div>
                                        </div>
                                        <span className="font-medium text-stone-900">$15.00</span>
                                    </label>
                                </div>
                                <div className="pt-6 flex justify-between items-center">
                                    <button onClick={() => setStep('info')} className="text-stone-500 hover:text-stone-900 flex items-center gap-1 text-sm">
                                        <ChevronLeft size={16} /> Back to Information
                                    </button>
                                    <Button onClick={handleNext} disabled={loading}>
                                        {loading ? 'Processing...' : 'Continue to Payment'}
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 'payment' && (
                            <motion.div
                                key="payment"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="font-serif text-2xl mb-6">Payment</h2>
                                <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm flex items-start gap-3 text-sm text-stone-600 mb-6">
                                    <ShieldCheck size={20} className="shrink-0 text-stone-900" />
                                    <p>All transactions are secure and encrypted. Credit card information is never stored.</p>
                                </div>

                                {clientSecret ? (
                                    <Elements options={options} stripe={stripePromise}>
                                        <CheckoutForm onSuccess={handlePaymentSuccess} />
                                    </Elements>
                                ) : (
                                    <div className="flex justify-center p-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900"></div>
                                    </div>
                                )}

                                <div className="pt-6 flex justify-between items-center">
                                    <button onClick={() => setStep('shipping')} className="text-stone-500 hover:text-stone-900 flex items-center gap-1 text-sm">
                                        <ChevronLeft size={16} /> Back to Shipping
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="hidden lg:block w-[450px] bg-stone-50 border-l border-stone-200 p-12 pt-32">
                <div className="sticky top-32">
                    <h2 className="font-serif text-xl mb-6">Order Summary</h2>
                    <div className="space-y-4 mb-8">
                        {items.map(item => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative w-16 h-20 bg-white border border-stone-200 rounded-sm">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-stone-500 text-white text-xs font-bold flex items-center justify-center rounded-full">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-stone-900 text-sm">{item.name}</p>
                                    <p className="text-xs text-stone-500">{item.brand}</p>
                                </div>
                                <p className="font-medium text-stone-900 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-stone-200 pt-4 space-y-2">
                        <div className="flex justify-between text-stone-600">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-stone-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                    </div>
                    <div className="border-t border-stone-200 pt-4 mt-4">
                        <div className="flex justify-between text-xl font-serif font-bold text-stone-900">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
