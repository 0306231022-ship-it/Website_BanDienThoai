import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const trangthai = req.query.TrangThai;
    console.log('TrangThai:', trangthai); // Log the value of TrangThai for debugging
    let token = null;
    if (trangthai === 0) {
        token = req.cookies.token_nguoidung;
    } else if (trangthai === 1) {
        token = req.cookies.token_admin;
    }
    if (!token) {
        return res.json({
            Status: true,
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
            Status: true,
            message: 'Phiên đã hết hạn. Vui lòng đăng nhập lại!'
        });
    }
};

export default authMiddleware;



