import { body, validationResult } from 'express-validator';

export const validateCungCap = [
    // --- 1. NHÓM ĐỊNH DANH ---
    body('DinhDanh.MaDinhDanh')
        .trim()
        .notEmpty().withMessage('Mã định danh không được bỏ trống!')
        .isLength({ min: 1, max: 20 }).withMessage('Mã định danh từ 1-20 ký tự!'), // Đã sửa max hợp lý hơn

    body('DinhDanh.TenNhaCungCap')
        .trim()
        .notEmpty().withMessage('Tên nhà cung cấp không được bỏ trống!')
        .isLength({ min: 1, max: 50 }).withMessage('Tên nhà cung cấp không vượt quá 50 kí tự!'),

    // --- 2. NHÓM NGƯỜI LIÊN HỆ ---
    body('NguoiLienHe.TenNguoiDung')
        .trim()
        .notEmpty().withMessage('Tên người dùng không được bỏ trống!')
        .isLength({ min: 1, max: 70 }).withMessage('Tên người dùng không vượt quá 70 kí tự!'),

    body('NguoiLienHe.SDT')
        .trim()
        .notEmpty().withMessage('Số điện thoại không được bỏ trống!')
        .matches(/^(0[3|5|7|8|9])[0-9]{8}$/).withMessage('Số điện thoại không đúng định dạng Việt Nam (10 số)'),

    body('NguoiLienHe.Email') // SỬA LỖI QUAN TRỌNG: Bỏ regex số điện thoại đi
        .trim()
        .notEmpty().withMessage('Email không được bỏ trống!')
        .isEmail().withMessage('Địa chỉ Email không đúng định dạng (ví dụ: abc@gmail.com)')
        .normalizeEmail(),

    body('NguoiLienHe.DiaChiKho')
        .trim()
        .notEmpty().withMessage('Địa chỉ kho không được bỏ trống!')
        .isLength({ max: 255 }).withMessage('Địa chỉ kho không được quá 255 ký tự!'),

    // --- 3. NHÓM TÀI CHÍNH ---
    // SỬA LỖI CÚ PHÁP: Thay dấu ngoặc vuông [] bằng dấu chấm .
    body('TaiChinh.MaThue') 
        .trim()
        .notEmpty().withMessage('Mã số thuế không được bỏ trống!')
        .isLength({ max: 20 }).withMessage('Mã số thuế không được quá 20 ký tự!'),

    body('TaiChinh.STK')
        .trim()
        .notEmpty().withMessage('Số tài khoản không được bỏ trống!')
        .isLength({ max: 20 }).withMessage('Số tài khoản không được quá 20 ký tự!'),

    body('TaiChinh.NganHang')
        .trim()
        .notEmpty().withMessage('Tên ngân hàng không được bỏ trống!')
        .isLength({ max: 50 }).withMessage('Tên ngân hàng không được quá 50 ký tự!'), // Sửa max 5 -> 50 (Vì tên ngân hàng dài)

    // --- 4. GHI CHÚ ---
    body('GhiChu')
        .trim()
        .notEmpty().withMessage('Ghi chú không được bỏ trống!')
        .isLength({ max: 255 }).withMessage('Ghi chú không được quá 255 ký tự!'),

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