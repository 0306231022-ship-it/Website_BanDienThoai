import jwt from "jsonwebtoken";
// Chỉnh sửa lại file nha
const authMiddleware = (req, res, next) => {
  //xem thử localStỏe có lưu token hay không.
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({
      ThanhCong:false,
       message: "Vui lòng đăng nhập trước khi sử dụng!" 
      });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.json({ 
      ThanhCong:false,
      message: "Token sai định dạng" 
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({
         ThanhCong:false,
         message: "Token không hợp lệ hoặc hết hạn" 
        });
    }
   req.user = { ...decoded, token };
   next();
  });
};

export default authMiddleware;
