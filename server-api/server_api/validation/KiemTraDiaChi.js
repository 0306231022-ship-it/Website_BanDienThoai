import { body, validationResult } from 'express-validator'; 
export const validateDiaChi = [
    body('DiaChi')
        .trim()
        .notEmpty().withMessage('Địa chỉ không được để trống')
        .isLength({ min: 10 }).withMessage('Địa chỉ quá ngắn, vui lòng nhập chi tiết hơn')
        .isLength({ max: 500 }).withMessage('Địa chỉ không được vượt quá 500 ký tự'),

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