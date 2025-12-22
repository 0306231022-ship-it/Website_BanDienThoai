
import { body, validationResult } from 'express-validator'; 

export const validateIns = [ 
    body('InstagramUrl')
        .trim()
        .notEmpty().withMessage('Vui lòng không để trống link Instagram')
        .isURL().withMessage('Định dạng URL không hợp lệ')
        .custom((value) => {
            if (!value.includes('instagram.com')) {
                throw new Error('Đây không phải là đường dẫn Instagram hợp lệ');
            }
            return true;
        }),
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
