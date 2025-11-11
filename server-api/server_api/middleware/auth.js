import jwt from 'jsonwebtoken';

const JWT_SECRET = "secretkey";

function authMiddleware(req, res, next) {
    const token = req.cookies.token; 
    if (!token) {
        return res.json({
            ThanhCong:false,
            message:'Vui lòng đăng nhập trước khi sử dụng!'
        });
    }else{
        try {
             const decoded = jwt.verify(token, JWT_SECRET);
             req.user = decoded; 
             next();
         } catch (err) {
             return res.json({
                ThanhCong:false,
                message: "Token không hợp lệ hoặc hết hạn" 
            });
        }
    }
}
export default authMiddleware;
