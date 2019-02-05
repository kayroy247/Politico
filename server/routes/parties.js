import { Router } from 'express';
import PartyController from '../controllers/PartyController';
import idCheck from '../middlewares/validateId';
import authenticateToken from '../middlewares/authenticateToken';
import authorizeAdmin from '../middlewares/authorizeAdmin';

const router = Router();

router.get('/', authenticateToken,
  PartyController.getAllParties);

router.get('/:partyId',
  authenticateToken,
  idCheck.checkPartyId,
  PartyController.getPartyById);

router.patch('/:partyId/name',
  authenticateToken,
  authorizeAdmin,
  idCheck.checkPartyId,
  PartyController.EditPartyName);

router.post('/',
  authenticateToken,
  authorizeAdmin,
  PartyController.createParty);

router.delete('/:partyId',
  authenticateToken,
  authorizeAdmin,
  idCheck.checkPartyId,
  PartyController.deletePartyById);


export default router;
