import { Router } from 'express';
import PartyController from '../controllers/PartyController';
import idCheck from '../middlewares/validateId';

const router = Router();

router.get('/',
  PartyController.getAllParties);

router.get('/:partyId',
  idCheck.checkPartyId,
  PartyController.getPartyById);

router.patch('/:partyId/name',
  idCheck.checkPartyId,
  PartyController.EditPartyName);

router.post('/',
  PartyController.createParty);

router.delete('/:partyId',
  idCheck.checkPartyId,
  PartyController.deletePartyById);


export default router;
