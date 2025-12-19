import { Router } from "express";
import adminController from "../controllers/adminController.js";
import authMiddleware from "../middleware/auth.js";
import pload from "../middleware/upload.js";
import multer from "multer";
import { body, validationResult } from "express-validator";
import { validateImages } from "../validation/KTimage.js";
import {UserValidate } from '../validation/KTDangNhap.js';
const adminRouter = Router();
const upload = multer();

adminRouter.post('/ThongTinWebsite', adminController.LayWebsite);
adminRouter.post('/DangNhap',  upload.none(), UserValidate, adminController.DangNhap);
adminRouter.post('/ChinhSuaTen', upload.none(),  [
    body('Ten')
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
  },)
// --- 2. Các Router Không Cần File/Form Data ---

adminRouter.post('/kiemtra', authMiddleware, adminController.kiemtra);
adminRouter.post('/DangXuat', authMiddleware, adminController.DangXuat);

// --- 3. Route Cập nhật Website (Có File) ---
adminRouter.post("/updateWebsite",
    authMiddleware, // ⬅️ Nên đặt authMiddleware trước multer (tùy thuộc vào Multer config)
    upload.array("images", 10),
    [
        // ... (Giữ nguyên validation cũ, nó đã đúng với dữ liệu lồng nhau)
        body("Dulieu.TenWebsite").notEmpty().withMessage("Tên website không được để trống"),
        body("Dulieu.LinkFace").notEmpty().withMessage("Link Facebook không được để trống"),
        body("Dulieu.LinkIns").notEmpty().withMessage("Link Instagram không được để trống"),
        body("Dulieu.DiaChi").notEmpty().withMessage("Địa chỉ không được để trống"),
        body("Dulieu.Email").isEmail().withMessage("Email không hợp lệ"),
        body("Dulieu.Zalo").notEmpty().withMessage("Số điện thoại không được để trống")
            .isLength({ max: 10 }).withMessage("SĐT không được quá 10 số")
            .matches(/^(0|\+84)[0-9]{9}$/).withMessage("Số điện thoại không hợp lệ"),
        validateImages,
    ],
    (req, res, next) => { /* Xử lý lỗi validation */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
        }
        next();
    },
    adminController.updateWebsite
);

// --- 4. Route Chỉnh Sửa Tên Website ---
// SỬA LỖI: Đưa authMiddleware lên đầu
adminRouter.post('/ChinhSuaTenWebsite',
    authMiddleware, // ⬅️ Đã sửa lỗi: Đặt authMiddleware lên trước
    [
        body("Dulieu.name")
            .notEmpty().withMessage("Dữ liệu không được bỏ trống")
            .isLength({ max: 255 }).withMessage("tên website không được quá 255 kí tự")
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                Validate: true,
                errors: errors.array(),
            });
        }
        next();
    },
    // Nếu bạn có controller, nó sẽ nằm ở đây:
    // adminController.ChinhSuaTenWebsite 
);

console.log("✅ adminRouter loaded");
export default adminRouter;