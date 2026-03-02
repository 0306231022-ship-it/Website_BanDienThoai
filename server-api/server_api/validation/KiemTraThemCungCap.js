import { body, validationResult } from 'express-validator';

export const validateCungCap = [
    // --- 1. NHÓM ĐỊNH DANH ---
  

    // --- MIDDLEWARE XỬ LÝ LỖI ---
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Log lỗi ra console để debug nếu cần
            console.log("Validation Errors:", errors.array()); 

            return res.status(200).json({ // Trả về 200 hay 400 tùy quy ước của bạn
                Validate: true, // Cờ báo hiệu frontend biết đây là lỗi validate
                errors: errors.array().map(err => ({
                    path: err.path, // 'DinhDanh.MaDinhDanh'
                    msg: err.msg
                }))
            });
        }
        next();
    }
];