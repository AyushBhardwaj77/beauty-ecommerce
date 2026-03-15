import { Router } from 'express';
import { getUsers, deleteUser } from './user.controller';

const router = Router();

router.get('/', getUsers);
router.delete('/:id', deleteUser);

export default router;
