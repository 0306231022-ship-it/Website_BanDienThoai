import { Router } from "express";
import adminController from "../controllers/adminController.js";
import CanhanADController from "../controllers/CaNhanADController.js";
import authMiddleware from "../middleware/auth.js";
import pload from "../middleware/upload.js";
import multer from "multer";
import { body, validationResult } from "express-validator";
import { validateImages } from "../validation/KTimage.js";
import {UserValidate } from '../validation/KTDangNhap.js';
import {validateSocialLinks} from '../validation/KiemTraLinkFaceBook.js';
import { validateIns } from '../validation/KiemTraIns.js';
import { validateDiaChi } from "../validation/KiemTraDiaChi.js";
import { validateEmail } from "../validation/KLiemTraEmail.js";
import { validateSoDienThoai } from "../validation/KiemTraSoDienThoai.js";
import { validateThemTH } from "../validation/KiemTrDLThuongHieu.js";
import ThuongHieuController from "../controllers/ThuongHieuController.js";
import NhaCungCapController from "../controllers/NhaCungCapController.js";
const adminRouter = Router();
const upload = multer();
//==========================================
adminRouter.post('/ThongTinWebsite', adminController.LayWebsite);
adminRouter.post('/DangNhap',  upload.none(), UserValidate, CanhanADController.DangNhap);
adminRouter.post('/ChinhSuaTen', upload.none(),  [
    body('Ten')
    .notEmpty()
    .withMessage('Vui lòng nhập đầy đủ thông tin!')
    .isLength({max:50})
    .withMessage('Vượt quá kí tự cho phép!'),
],
(req, res, next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
    }
    next();
}, adminController.CapNhatTen);
adminRouter.post('/ChinhLoGo',pload.array("files", 5), validateImages,
(req, res, next) => {      
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        Validate: true,
        errors: errors.array()
      });
    }
    next();
  },adminController.ChinhSuaLoGo);
  adminRouter.post('/ChinhSuaMoTa',upload.none(),[
    body('MoTa')
     .notEmpty()
     .withMessage('Vui lòng nhập đầy đủ thông tin!')
     .isLength({max:255})
     .withMessage('Vượt quá kí tự cho phép!')
  ],
(req, res, next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
    }
    next();
},adminController.CapNhatMoTa);
adminRouter.post('/ChinhSuaFacebook', upload.none(), validateSocialLinks,adminController.CapNhatLinkFaceBook);
adminRouter.post('/ChinhSuaInstagram', upload.none(), validateIns, adminController.CapNhatIns );
adminRouter.post('/ChinhSuaDiaChi', upload.none(), validateDiaChi, adminController.CapNhatDiaChi);
adminRouter.post('/ChinhSuaEmail', upload.none(), validateEmail, adminController.CapNhatEmail);
adminRouter.post('/ChinhSuaSoDienThoai', upload.none(), validateSoDienThoai, adminController.CapNhatSoDienThoai);
adminRouter.post('/kiemtra', authMiddleware, CanhanADController.kiemtra );
adminRouter.post('/DangXuat', authMiddleware, CanhanADController.DangXuat);
//=========================================
adminRouter.post('/ChinhSuaTenUS', upload.none(),  [
    body('Ten')
    .notEmpty()
    .withMessage('Vui lòng nhập đầy đủ thông tin!')
    .isLength({max:50})
    .withMessage('Vượt quá kí tự cho phép!'),
],
(req, res, next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
    }
    next();
}, CanhanADController.CapNhatTen);
//=========================================
adminRouter.post('/ThemThuongHieu', pload.array("files", 2), validateThemTH,validateImages,ThuongHieuController.ThemThuongHieu);
adminRouter.post('/SuaTenThuongHieu', upload.none(),  [
    body('Ten')
    .notEmpty()
    .withMessage('Vui lòng nhập đầy đủ thông tin!')
    .isLength({max:50})
    .withMessage('Vượt quá kí tự cho phép!'),
],
(req, res, next) => {
     const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
    }
    next();
}, ThuongHieuController.SuaTenThuongHieu);
adminRouter.post('/SuaAnhThuongHieu', pload.array("files", 2), validateImages, ThuongHieuController.SuaAnhThuongHieu);
adminRouter.post('/ChinhSuaTrangThai', upload.none(),  [
    body('TrangThai')
    .notEmpty()
    .withMessage('Vui lòng nhập đầy đủ thông tin!')
    .isIn([0,1])
    .withMessage('Trạng thái không hợp lệ!'),
],  (req, res, next) => {
     const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
    }
    next();
}, ThuongHieuController.ChinhSuaTrangThai);
adminRouter.post('/SuaMoTathuongHieu', upload.none(),  [
    body('MoTa')
     .notEmpty()
      .withMessage('Vui lòng nhập đầy đủ thông tin!')
      .isLength({max:255})
      .withMessage('Vượt quá kí tự cho phép!'),
],
(req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
    }
    next();
},ThuongHieuController.SuaMoTathuongHieu );
//========================================= );
//Phương thức get
adminRouter.get('/getTT', authMiddleware, CanhanADController.GetTTusers );
adminRouter.get('/thuonghieu', authMiddleware, ThuongHieuController.LayDanhSachThuongHieu);
adminRouter.get('/ChiTietThuongHieu', authMiddleware, ThuongHieuController.LayChiTietThuongHieu);
adminRouter.get('/layTTnhacungcap', authMiddleware, NhaCungCapController.LayDanhSachNhaCungCap)
//=========================================
console.log("✅ adminRouter loaded");
export default adminRouter;