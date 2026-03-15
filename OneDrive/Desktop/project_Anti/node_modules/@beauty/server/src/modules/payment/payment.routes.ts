import { Router } from 'express';
import { createIntent } from './payment.controller.js';

const router = Router();

router.post('/create-intent', createIntent);

export default router;
