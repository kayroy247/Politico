import { Router } from 'express';
import OfficeController from '../controllers/OfficeController';
import idCheck from '../middlewares/validateId';
import authenticateToken from '../middlewares/authenticateToken';
import authorizeAdmin from '../middlewares/authorizeAdmin';

const router = Router();

router.get('/', authenticateToken, OfficeController.getAllOffices);
router.get('/:officeId', authenticateToken, idCheck.checkId, OfficeController.getOfficeById);
router.post('/', authenticateToken, authorizeAdmin, OfficeController.createOffice);


export default router;
