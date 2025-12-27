import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
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
        return res.status(401).json({
            Status: true,
            message: 'Token không hợp lệ'
        });
    }
};

export default authMiddleware;



