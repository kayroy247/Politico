import { Router } from 'express';
import OfficeController from '../controllers/OfficeController';
import checkId from '../middlewares/validateId';

const router = Router();

router.get('/', OfficeController.getAllOffices);
router.get('/:officeId', checkId, OfficeController.getOfficeById);
router.post('/', OfficeController.createOffice);


export default router;
