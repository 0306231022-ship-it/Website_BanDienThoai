import { body, validationResult } from 'express-validator';

export const validateThemTH = [
    body('TenTT')
        .trim()
        .notEmpty().withMessage('Vui lòng nhập tên thương hiệu')
        .isLength({ max: 100 }).withMessage('Tên thương hiệu không được vượt quá 100 ký tự'),
    body('MoTa')
        .trim()
        .notEmpty().withMessage('Vui lòng nhập mô tả thương hiệu')
        .isLength({ max: 255 }).withMessage('Mô tả thương hiệu không được vượt quá 255 ký tự'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                Validate: true,
                errors: errors.array().map(err => ({
                    path: err.path,
                    msg: err.msg
                }))
            });
        }
        next();
    }
];