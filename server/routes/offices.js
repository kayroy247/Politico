import { Router } from 'express';
import OfficeController from '../controllers/OfficeController';
import idCheck from '../middlewares/validateId';
import auth from '../middlewares/authentication';

const router = Router();

router.get('/', auth.authenticateUser, OfficeController.getAllOffices);
router.get('/:officeId', auth.authenticateUser, idCheck.checkId, OfficeController.getOfficeById);
router.post('/', auth.authenticateAdmin, OfficeController.createOffice);


export default router;
