import { Router } from "express";
import adminController from "../controllers/adminController.js";
import CanhanADController from "../controllers/CaNhanADController.js";
import authMiddleware from "../middleware/auth.js";
import createUpload from '../middleware/upload.js';
import multer from "multer";
import { body, validationResult } from "express-validator";
import { validateImages } from "../validation/KTimage.js";
import {validateSocialLinks} from '../validation/KiemTraLinkFaceBook.js';
import { validateIns } from '../validation/KiemTraIns.js';
import { validateDiaChi } from "../validation/KiemTraDiaChi.js";
import { validateEmail } from "../validation/KLiemTraEmail.js";
import { validateSoDienThoai } from "../validation/KiemTraSoDienThoai.js";
import { validateThemTH } from "../validation/KiemTrDLThuongHieu.js";
import { validateCungCap } from "../validation/KiemTraThemCungCap.js";
import { PhieuNhapValidate } from "../validation/ValidatePhieuNhap.js";
import ThuongHieuController from "../controllers/ThuongHieuController.js";
import NhaCungCapController from "../controllers/NhaCungCapController.js";
import PhieuNhapController from "../controllers/PhieuNhapController.js";
import SanPhamController from "../controllers/SanPhamController.js";
import { parseNewProductState } from "../middleware/ChuyenDL.js";
import adminModel from "../models/adminModel.js";
const adminRouter = Router();
const upload = multer();
//==========================================
// xử lí thông tin website
adminRouter.post('/ThongTinWebsite', adminController.LayWebsite);
adminRouter.post('/DangNhap',upload.none(), CanhanADController.DangNhap);
adminRouter.post('/ChinhSuaTen', upload.none(), adminController.CapNhatTen);
adminRouter.post('/ChinhLoGo',createUpload('logo').array("files", 5),adminController.ChinhSuaLoGo);

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
//adminRouter.post('/ThemThuongHieu', pload.array("files", 2), validateThemTH,validateImages,ThuongHieuController.ThemThuongHieu);
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
//adminRouter.post('/SuaAnhThuongHieu', pload.array("files", 2), validateImages, ThuongHieuController.SuaAnhThuongHieu);
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
//========================================
adminRouter.post('/Themcc', authMiddleware , upload.none() , validateCungCap, NhaCungCapController.ThemCungCap );
adminRouter.post('/ChinhSuaTenNhaCungCap' , authMiddleware , upload.none(), [
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
},NhaCungCapController.CapNhatTen);
adminRouter.post('/ChinhSuaMDDNhaCungCap', authMiddleware ,upload.none(),[
      body('Ten')
     .notEmpty()
    .withMessage('Vui lòng nhập đầy đủ thông tin!')
    .isLength({max:3})
    .withMessage('Vượt quá kí tự cho phép!'),
],
(req, res, next) => {
     const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
    }
    next();
},NhaCungCapController.CapNhatMaDinhDanh );
adminRouter.post('/ChinhSuaMoTaNhaCungCap', authMiddleware , upload.none(),[
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
},NhaCungCapController.CapNhatMoTa );
adminRouter.post('/ChinhSuaNguoiDaiDienNhaCungCap', authMiddleware, upload.none(),[
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
},NhaCungCapController.CapNhatTenNguoiDung)
adminRouter.post('/ChinhSuaDiaChiNhaCungCap', authMiddleware , upload.none(),validateDiaChi, NhaCungCapController.CapNhatDiaChi);
adminRouter.post('/ChinhSuaTenNganHang' , authMiddleware , upload.none(),[
      body('Ten')
     .notEmpty()
    .withMessage('Vui lòng nhập đầy đủ thông tin!')
    .isLength({max:3})
    .withMessage('Vượt quá kí tự cho phép!'),
],
(req, res, next) => {
     const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
    }
    next();
}, NhaCungCapController.CapNhatTenNganHang);
adminRouter.post('/ChinhSuaSoTaiKhoan', authMiddleware , upload.none(),[
    body('So')
            .trim() // Xóa khoảng trắng đầu cuối
            .notEmpty().withMessage('Vui lòng nhập số tài khoản') // Check rỗng
            .isNumeric().withMessage('Số tài khoản chỉ được chứa ký tự số') // Check chỉ số (QUAN TRỌNG)
            .isLength({ min: 8, max: 20 }).withMessage('Độ dài phải từ 8 đến 20 ký tự') // Check độ dài
            .escape(), // Chống XSS cơ bản
],
(req, res, next) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
    }
    next();
}, NhaCungCapController.CapNhatSoTaiKhoan);
//=========================================
// Xử lý Phiếu Nhập
adminRouter.post('/ThemPhieuNhap',createUpload('sanpham').any(), authMiddleware,PhieuNhapController.ThemPhieuNhap);
adminRouter.post('/khoiphuc_phieunhap' , authMiddleware , PhieuNhapController.khoiphuc_phieunhap);
adminRouter.post('/xoa_phieunhap_theoid' , upload.none(), authMiddleware , PhieuNhapController.xoa_phieunhap_theoid);
adminRouter.post('/xoa_tatca_phieunhap' , upload.none(), authMiddleware, PhieuNhapController.xoa_tatca_phieunhap );
//========================================= );
//Phương thức get
adminRouter.get('/getTT', authMiddleware, CanhanADController.GetTTusers );
adminRouter.get('/thuonghieu', authMiddleware, ThuongHieuController.LayDanhSachThuongHieu);
adminRouter.get('/ChiTietThuongHieu', authMiddleware, ThuongHieuController.LayChiTietThuongHieu);
adminRouter.get('/layTTnhacungcap', authMiddleware, NhaCungCapController.LayDanhSachNhaCungCap);
adminRouter.get('/ChiTietNhaCungCap' ,authMiddleware , NhaCungCapController.layChiTiet);
adminRouter.get('/laynhacchoatdong' , authMiddleware , NhaCungCapController.LayDShd);
adminRouter.get('/laythuonghieu' , authMiddleware , ThuongHieuController.layth );
adminRouter.get('/getPhieu', authMiddleware,PhieuNhapController.layDL);
adminRouter.get('/ChiTietPhieuNhap' ,authMiddleware, PhieuNhapController.layChiTietPN);
adminRouter.get('/laysp_thuonghieu',authMiddleware,ThuongHieuController.laysp_thuonghieu);
adminRouter.get('/laydspn_idncc' ,authMiddleware, PhieuNhapController.LayPhieuNhap_theo_id_trang);
adminRouter.get('/kiemtra_id_ncc' ,authMiddleware , NhaCungCapController.kiemtraid);
adminRouter.get('/DuyetPhieuNhap', authMiddleware, PhieuNhapController.DuyetPhieuNhap);
adminRouter.get('/HuyPhieuNhap', authMiddleware, PhieuNhapController.HuyPhieuNhap);
adminRouter.get('/lay_phieunhap_daxoa', authMiddleware, PhieuNhapController.LayDanhSachPhieuNhap);
adminRouter.get('/laythongke_phieunhap' , authMiddleware , PhieuNhapController.laythongke_phieunhap);
adminRouter.get('/dulieu_hoadon_nhapkho' , authMiddleware , PhieuNhapController.dulieu_hoadon_nhapkho);
adminRouter.get('/lay_ds_sanpham' , authMiddleware , SanPhamController.lay_ds_sanpham);
adminRouter.get('/layChiTietSP_theoid' , authMiddleware , SanPhamController.layChiTietSP_theoid);
adminRouter.get('/lay_sp_theo_id_ncc' ,authMiddleware,NhaCungCapController.lay_sp_theo_id_ncc);
//
//=========================================
console.log("✅ adminRouter loaded");
export default adminRouter;