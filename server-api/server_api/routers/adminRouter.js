import {Router} from 'express';
import adminController from '../controllers/adminController.js';
import authMiddleware from '../middleware/auth.js'
import upload from '../middleware/upload.js';

const adminRouter = Router();
adminRouter.post('/DangNhap',adminController.DangNhap);
adminRouter.post('/ThongTinWebsite', adminController.LayWebsite);
adminRouter.post('/kiemtra', authMiddleware,adminController.kiemtra);
adminRouter.post('/DangXuat',authMiddleware,adminController.DangXuat);
adminRouter.post('/updateWebsite',upload.array('images', 10),adminController.updateWebsite)
console.log('✅ adminRouter loaded');
export default adminRouter;