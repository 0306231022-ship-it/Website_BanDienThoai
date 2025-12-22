import { body, validationResult } from 'express-validator';

export const validateSoDienThoai = [
    body('SoDienThoai')
        .trim()
        .notEmpty().withMessage('Vui lòng nhập số điện thoại')
        .matches(/^(0[3|5|7|8|9])[0-9]{8}$/).withMessage('Số điện thoại không đúng định dạng Việt Nam (10 số)'),

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