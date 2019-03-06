import { Router } from 'express';
import CandidateController from '../controllers/CandidateController';
import idCheck from '../middlewares/validateId';
import authenticateToken from '../middlewares/authenticateToken';

const router = Router();

router.get('/:officeId/result',
  authenticateToken,
  idCheck.checkId,
  CandidateController.getResultById);


router.post('/:userId/register',
  authenticateToken,
  idCheck.checkUserId,
  CandidateController.createCandidate);

export default router;
