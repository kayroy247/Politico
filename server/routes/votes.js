import { Router } from 'express';
import VoteController from '../controllers/VoteController';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

router.post('/', authenticateToken,
  VoteController.createVote);

export default router;
