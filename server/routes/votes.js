import { Router } from 'express';
import VoteController from '../controllers/VoteController';
import auth from '../middlewares/authentication';

const router = Router();

router.post('/', auth.authenticateUser,
  VoteController.createVote);

export default router;
