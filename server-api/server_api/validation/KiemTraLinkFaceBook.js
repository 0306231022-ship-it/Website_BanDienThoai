import { body, validationResult } from 'express-validator'; 

export const validateSocialLinks = [ 
    body('FacebookUrl')
        .trim()
        .notEmpty().withMessage('Vui lòng không để trống link Facebook')
        .isURL().withMessage('Định dạng URL không hợp lệ')
        .custom((value) => {
            if (!value.includes('facebook.com') && !value.includes('fb.com')) {
                throw new Error('Đây không phải là đường dẫn Facebook hợp lệ');
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