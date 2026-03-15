import { Router } from 'express';
import { createOrder, getOrders, updateOrderStatus } from './order.controller';
// import { authenticate } from '../../core/middleware/auth.middleware'; // To be implemented

const router = Router();

// router.use(authenticate); // Protect routes
router.post('/', createOrder);
router.get('/', getOrders);
router.put('/:id/status', updateOrderStatus);

export default router;
