import { body, validationResult } from 'express-validator';
import adminModel from '../models/adminModel.js';
const KiemTraDangKy = () => {
    return (req, res, next) => {
        Promise.all([
            body('email')
                .notEmpty()
                .withMessage('Email không được bỏ trống!')
                .isEmail()
                .withMessage('Email không hợp lệ!')
                .isLength({ max: 255 })
                .withMessage('Vượt quá kí tự quy định!')
                .custom(async (value) => {
                    const existingUser = await adminModel.kiemtra_email(value);
                    if (existingUser) {
                        throw new Error('Email đã tồn tại!');
                    }
                    return true;
                })
                .run(req),
            body('password')
                .notEmpty()
                .withMessage('Mật khẩu không được bỏ trống!')
                .isLength({ max: 255 })
                .withMessage('Mật khẩu vượt quá ký tự cho phép!')
                .isLength({ min: 6 })
                .withMessage('Mật khẩu phải có ít nhất 6 ký tự!')
                .run(req),
            body('name')
                .notEmpty()
                .withMessage('Tên không được bỏ trống!')
                .isLength({ max: 255 })
                .withMessage('Tên vượt quá ký tự cho phép!')
                .run(req),
            body('phone')
                .notEmpty()
                .withMessage('Số điện thoại không được bỏ trống!')
                .isLength({ max: 10 })
                .withMessage('Số điện thoại vượt quá ký tự cho phép!')
                .run(req),
            body('confirm_password')
                .notEmpty()
                .withMessage('Mật khẩu xác nhận không được bỏ trống!')
                .isLength({ max: 255 })
                .withMessage('Mật khẩu xác nhận vượt quá ký tự cho phép!')
                .custom((value, { req }) => {
                    if (value !== req.body.password) {
                        throw new Error('Mật khẩu xác nhận không khớp!');
                    }
                    return true;
                })
                .run(req),

        ])
        .then(() => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    Validate: true,
                    errors: errors.array()
                });
            }
            next();
        })
    }
}
export default KiemTraDangKy;