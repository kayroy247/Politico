import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import userCheck from '../middlewares/checkUser';

const router = Router();

router.post('/signup', userCheck.validateUser, userCheck.checkEmail, AuthController.signUp);

router.post('/login', userCheck.loginValidator, AuthController.login);

export default router;
