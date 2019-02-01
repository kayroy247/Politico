import { Router } from 'express';
import PartyController from '../controllers/PartyController';
import idCheck from '../middlewares/validateId';
import auth from '../middlewares/authentication';

const router = Router();

router.get('/', auth.authenticateUser,
  PartyController.getAllParties);

router.get('/:partyId',
  auth.authenticateUser,
  idCheck.checkPartyId,
  PartyController.getPartyById);

router.patch('/:partyId/name',
  auth.authenticateAdmin,
  idCheck.checkPartyId,
  PartyController.EditPartyName);

router.post('/', auth.authenticateAdmin,
  PartyController.createParty);

router.delete('/:partyId',
  auth.authenticateAdmin,
  idCheck.checkPartyId,
  PartyController.deletePartyById);


export default router;
