// validateImages.js
export const validateImages = (req, res, next) => {
    // 1. Kiểm tra xem Multer có nhận được file không
    if (!req.files || req.files.length === 0) {
        return res.json({
            Validate: true,
            errors: [{ path: "files", msg: "Vui lòng tải lên ít nhất 1 ảnh" }]
        });
    }

    const errors = [];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    // 2. Kiểm tra định dạng từng file
    for (const file of req.files) {
        if (!allowedTypes.includes(file.mimetype)) {
            errors.push({ 
                path: "files", 
                msg: `File ${file.originalname} không đúng định dạng JPG hoặc PNG` 
            });
            break; // Thấy 1 lỗi là dừng để tránh lặp thông báo
        }
    }

    // 3. Kiểm tra số lượng (nếu cần thiết hơn mức Multer chặn)
    if (req.files.length > 5) {
        errors.push({ path: "files", msg: "Không được upload quá 5 ảnh" });
    }

    if (errors.length > 0) {
        return res.status(400).json({ Validate: true, errors });
    }

    next(); // Hợp lệ thì đi tiếp
};