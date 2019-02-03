import { Router } from 'express';
import CandidateController from '../controllers/CandidateController';
import idCheck from '../middlewares/validateId';
import auth from '../middlewares/authentication';

const router = Router();

router.get('/:officeId/result',
  auth.authenticateUser,
  idCheck.checkId,
  CandidateController.getResultById);


router.post('/:userId/register',
  auth.authenticateAdmin,
  idCheck.checkUserId,
  CandidateController.createCandidate);

export default router;
