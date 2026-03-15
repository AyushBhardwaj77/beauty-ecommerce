import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Authenticated Request type mock
interface AuthRequest extends Request {
    user?: { userId: string }
}

export const createOrder = async (req: AuthRequest, res: Response) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;
        // In a real app, we would get userId from req.user set by auth middleware
        // For this demo, let's assume the auth middleware works and we have a userId
        // Or we might need to look it up if we aren't strict yet.

        // Mocking userId for now if not strictly enforced by middleware yet, 
        // to ensure the flow works even if frontend auth isn't perfect.
        // In reality: const userId = req.user!.userId;

        // Let's create a dummy user if none exists for guest checkout simulation or use the first user
        let userId = 'user-1';
        const firstUser = await prisma.user.findFirst();
        if (firstUser) userId = firstUser.id;

        // Calculate total
        let total = 0;
        for (const item of items) {
            const product = await prisma.product.findUnique({ where: { id: item.id } });
            if (product) {
                total += product.price * item.quantity;
            }
        }

        // Simulate Payment Processing
        if (paymentMethod === 'credit_card') {
            // Call Stripe or Payment Provider here
            // await stripe.paymentIntents.create(...)
            console.log('Processing credit card payment for', total);
        }

        // Create Order
        const order = await prisma.order.create({
            data: {
                userId,
                total,
                status: 'COMPLETED',
                items: {
                    create: items.map((item: any) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: {
                items: true
            }
        });

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        // demo: get all orders
        const orders = await prisma.order.findMany({
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const order = await prisma.order.update({
            where: { id },
            data: { status }
        });
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
