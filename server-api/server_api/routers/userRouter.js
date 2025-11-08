import {Router} from 'express';
import userController from '../controllers/userController.js';
import auth from '../middleware/auth.js'
const authRouter = Router();
const userRouter = Router();

authRouter.use(auth);// use middleware

userRouter.post('/login', userController.login_demo);

userRouter.post('/register', userController.register);
authRouter.post('/logout', userController.logout);
authRouter.get('/profile',userController.profile)
userRouter.use('/', authRouter);
export default userRouter;