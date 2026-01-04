import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
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



