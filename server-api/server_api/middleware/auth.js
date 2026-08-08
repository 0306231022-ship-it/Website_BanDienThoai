import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const trangthai = parseInt(req.query.TrangThai);
    let token = null;
    if (trangthai === 0) {
        token = req.cookies.token_nguoidung;
    } else if (trangthai === 1) {
        token = req.cookies.token_admin;
    } else {
        token = req.cookies.token_nguoidung || req.cookies.token_admin;
    }
    if (!token) {
        return res.json({
            ThanhCong: false,
            message: 'Chưa đăng nhập'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        req.token = token;
        next();
    } catch (err) {
        return res.json({
            ThanhCong: false,
            message: 'Phiên đã hết hạn. Vui lòng đăng nhập lại!'
        });
    }
};

export default authMiddleware;



