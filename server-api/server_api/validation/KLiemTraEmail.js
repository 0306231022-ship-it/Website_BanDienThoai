import { body, validationResult } from 'express-validator';

export const validateEmail = [
    body('Email')
        .trim()
        .notEmpty().withMessage('Vui lòng nhập địa chỉ Email')
        .isEmail().withMessage('Địa chỉ Email không đúng định dạng (ví dụ: abc@gmail.com)')
        .normalizeEmail(), 

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