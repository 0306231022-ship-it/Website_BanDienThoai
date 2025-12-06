import { Router } from "express";
import adminController from "../controllers/adminController.js";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { body, validationResult } from "express-validator";
import {validateImages } from "../middleware/KTimage.js";

const adminRouter = Router();

adminRouter.post('/DangNhap', adminController.DangNhap);
adminRouter.post('/ThongTinWebsite', adminController.LayWebsite);
adminRouter.post('/kiemtra', authMiddleware, adminController.kiemtra);
adminRouter.post('/DangXuat', authMiddleware, adminController.DangXuat);

adminRouter.post(
  "/updateWebsite",
  upload.array("images", 10),
  [
    body("Dulieu.TenWebsite")
      .notEmpty()
      .withMessage("Tên website không được để trống"),

    body("Dulieu.LinkFace")
      .notEmpty()
      .withMessage("Link Facebook không được để trống"),

    body("Dulieu.LinkIns")
      .notEmpty()
      .withMessage("Link Instagram không được để trống"),

    body("Dulieu.DiaChi")
      .notEmpty()
      .withMessage("Địa chỉ không được để trống"),

    body("Dulieu.Email")
      .isEmail()
      .withMessage("Email không hợp lệ"),

    body("Dulieu.Zalo")
      .notEmpty()
      .withMessage("Số điện thoại không được để trống")
      .isLength({ max: 10 })
      .withMessage("SĐT không được quá 10 số")
      .matches(/^(0|\+84)[0-9]{9}$/)
      .withMessage("Số điện thoại không hợp lệ"),
     validateImages,
    
  ],

  // Middleware kiểm tra validation + file upload
  (req, res, next) => {
    const errors = validationResult(req);

    // Kiểm tra lỗi từ express-validator
    if (!errors.isEmpty()) {
      return res.json({
        Validate: true,
        errors: errors.array(),
      });
    }

    
  
    next();
  },

  adminController.updateWebsite
);



console.log("✅ adminRouter loaded");
export default adminRouter;
