import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    if (!req.cookies || !req.cookies.token) {
        return res.status(401).json({
            Status: false,
            message: 'Chưa đăng nhập'
        });
    }

    const token = req.cookies.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({
            Status: false,
            message: 'Token không hợp lệ'
        });
    }
};

export default authMiddleware;


