import { Router } from 'express';
import CandidateController from '../controllers/CandidateController';
import idCheck from '../middlewares/validateId';
import authenticateToken from '../middlewares/authenticateToken';
import authorizeAdmin from '../middlewares/authorizeAdmin';

const router = Router();

router.get('/:officeId/result',
  authenticateToken,
  idCheck.checkId,
  CandidateController.getResultById);


router.post('/:userId/register',
  authenticateToken,
  authorizeAdmin,
  idCheck.checkUserId,
  CandidateController.createCandidate);

export default router;
