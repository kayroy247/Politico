import { Router } from 'express';
import OfficeController from '../controllers/OfficeController';
import idCheck from '../middlewares/validateId';

const router = Router();

router.get('/', OfficeController.getAllOffices);
router.get('/:officeId', idCheck.checkId, OfficeController.getOfficeById);
router.post('/', OfficeController.createOffice);


export default router;
