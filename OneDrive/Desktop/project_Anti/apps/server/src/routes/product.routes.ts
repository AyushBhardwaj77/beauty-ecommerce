import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get All Products
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let where: any = {};

        if (category) {
            where.category = category as string;
        }

        if (search) {
            where.description = { contains: search as string }; // Simplified search
        }

        const products = await prisma.product.findMany({ where });
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to fetch products' });
    }
});

// Get Product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

export const productRoutes = router;
