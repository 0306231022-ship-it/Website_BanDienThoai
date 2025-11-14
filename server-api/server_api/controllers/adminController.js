import pkg from 'bcrypt';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';



const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const PASSWORD_HASH_ROUNDS = parseInt(process.env.PASSWORD_HASH_ROUNDS) || 10;

export default class adminController{
    static async generateToken(user){
        return jwt.sign(
            {id : user.IDND},
            JWT_SECRET,
            {expiresIn:JWT_EXPIRES_IN}
        );
    }
     static async kiemtra(req, res) {
         const adminId = req.user.id;
         const TruyVan=adminModel.LayTT_ID(adminId);
         if(TruyVan){
            res.json({
                ThanhCong:true,
                message:'Bạn đã đăng nhập!',
                DuLieu:TruyVan
            })
         }else{
            res.json({
                ThanhCong:false,
                message:'Lỗi.....'
            })
         }
     }
     static async DangNhap(req,res){
       const duLieuDangNhap = req.body;
        //Lấy dữ liệu mật khẩu mã hóa mới truy vấn
       const DangNhap= await adminModel.login(duLieuDangNhap.data.email)
       if(DangNhap){
            //Dữ liệu thành công sẽ lưu vào localStorage
            const isMath =await compare(duLieuDangNhap.data.passWord, DangNhap.MATKHAU);
           if(isMath){
                if(DangNhap.TRANGTHAI!==1){
                    res.json({
                        ThanhCong:false,
                        message:'Tài khoảng đã ngừng hoạt động!'
                    });
                }else{
                     const token =await adminController.generateToken(DangNhap);
                     const { MATKHAU, ...KetQua } = DangNhap;
                     res.json({
                        ThanhCong:true,
                        message:'Bạn đã đăng nhập thành công!',
                        token:token,
                        DuLieu:KetQua
                     }) 
                }
            }else{
                res.json({
                    ThanhCong:false,
                    message:'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin'
                })
            }
        }else{
            res.json({
                ThanhCong:false,
                message:'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin'
            })
        }
    }

    
}