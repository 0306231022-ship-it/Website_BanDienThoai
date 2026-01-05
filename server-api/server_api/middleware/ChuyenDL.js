// Middleware: parseNewProductState.js
 export const parseNewProductState = (req, res, next) => {
    try {
        // 1. Xử lý thongTinPhieu
        // Frontend gửi lên dạng chuỗi JSON: "{ "NhaCungCap": ... }"
        // Validator cần Object: { NhaCungCap: ... }
        if (req.body.thongTinPhieu && typeof req.body.thongTinPhieu === 'string') {
            req.body.thongTinPhieu = JSON.parse(req.body.thongTinPhieu);
        }

        // 2. Xử lý newProductState
        // Frontend gửi lên: "[{ "TenSanPham": ... }]"
        // Validator cần Array: [{ TenSanPham: ... }]
        if (req.body.newProductState && typeof req.body.newProductState === 'string') {
            req.body.newProductState = JSON.parse(req.body.newProductState);
        }

        // Lúc này req.body đã là Object chuẩn JS, 
        // express-validator sẽ đọc được các field như 'thongTinPhieu.NhaCungCap'
        next();
    } catch (error) {
        console.error("Lỗi Parse JSON:", error);
        return res.status(400).json({ 
            success: false, 
            message: 'Dữ liệu gửi lên không đúng định dạng JSON' 
        });
    }
};

