import { body } from "express-validator";

export const UserValidate = [
  body('email')
    .notEmpty().withMessage('Email không được bỏ trống!')
    .isEmail().withMessage('Email không hợp lệ!')
    .isLength({ max: 255 }).withMessage('Vượt quá kí tự quy định!'),

  body('passWord')
    .notEmpty().withMessage('Mật khẩu không được bỏ trống!')
    .isLength({ max: 255 }).withMessage('Mật khẩu vượt quá ký tự cho phép!')
];
