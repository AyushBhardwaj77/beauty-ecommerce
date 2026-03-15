import { Router } from 'express';
import { stripe } from '../lib/stripe';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/create-payment-intent', async (req, res) => {
    try {
        const { items } = req.body; // items: { id: number, quantity: number }[]

        // Calculate total amount on server to avoid manipulation
        let total = 0;
        for (const item of items) {
            const product = await prisma.product.findUnique({ where: { id: item.id } });
            if (product) {
                total += product.price * item.quantity;
            }
        }

        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(total * 100), // Stripe expects cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(500).send({ error: message });
    }
});

export const paymentRoutes = router;
