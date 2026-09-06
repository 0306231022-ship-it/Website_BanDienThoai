// Cấp quyền cho admin hoặc người dùng
import jwt from 'jsonwebtoken';

export const CapQuyen = (trangthai) => {
    return (req, res, next) => {
        try {
            let token = null;
            
            if (trangthai === 0) {
                token = req.cookies?.token_nguoidung;
            } else if (trangthai === 1) {
                token = req.cookies?.token_admin;
            } 
            
            if (!token) {
                return res.json({
                    ThanhCong: false,
                    message: 'Chưa đăng nhập'
                });
            }
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; 
            req.token = token;
            next();
        } catch (error) {
            console.error('Lỗi trong CapQuyen:', error);
            return res.json({
                ThanhCong: false,
                message: 'Đã xảy ra lỗi trong quá trình xác thực quyền truy cập.'
            });
        }
    };
};

    