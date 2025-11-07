import {Router} from 'express';
import TaiKhoanController from '../controllers/TaiKhoanController.js';
const router = Router();

// Định nghĩa các route liên quan đến tài khoản ở đây
// Ví dụ:
// router.post('/login', TaiKhoanController.login);
// router.post('/register', TaiKhoanController.register);
router.post('/dang-nhap', TaiKhoanController.DangNhap);

export default router;