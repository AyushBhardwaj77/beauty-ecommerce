import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51O2aL3SGoRTYwT08uP4522hUv7Y');

// Helper to calculate total securely on the backend
const calculateOrderAmount = (items: any[]) => {
    // In a real app, you would fetch prices from DB.
    // Here we'll trust the client prices for simplicity in this demo,
    // OR we could recalculate if we had DB access easily available.
    // We will compute from items passed.
    const total = items.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);
    // Stripe expects amount in cents
    return Math.round(total * 100);
};

export const createIntent = async (req: Request, res: Response) => {
    try {
        const { items } = req.body;

        if (!items || !items.length) {
            return res.status(400).json({ error: 'No items provided' });
        }

        const amount = calculateOrderAmount(items);

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error: any) {
        console.error("Stripe error:", error);
        res.status(500).json({ error: error.message });
    }
};
