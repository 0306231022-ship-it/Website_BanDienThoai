import pkg from 'bcrypt';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';
import { validationResult } from "express-validator";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const PASSWORD_HASH_ROUNDS = parseInt(process.env.PASSWORD_HASH_ROUNDS) || 10;

export default class CanhanADController{
    static async generateToken(user){
        return jwt.sign(
            {id : user.IDND},
            JWT_SECRET,
            {expiresIn:JWT_EXPIRES_IN}
        );
    }
    static async DangNhap(req, res) {
            const dulieu = req.body;
             if (!dulieu) {
                return res.json({ 
                    Status:true, 
                    message: 'Vui lòng kiểm tra lại dữ liệu!' 
                });
            } 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    validation: true,
                    errors: errors.array() 
                });
            }
            try {
                 const DangNhap = await adminModel.login(dulieu.email);
                 if(DangNhap===false){
                    return res.json({
                        Status:true,
                        message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
                    })
                 }
                 if(DangNhap===null){
                    return res.json({
                        Status:true,
                        message:'Tài khoản người dùng không tồn tại!'
                    })
                 }
                 if(DangNhap){
                     const isMatch = await compare(dulieu.passWord, DangNhap.MATKHAU);
                      if (isMatch) {
                        if (DangNhap.TRANGTHAI !== 1) {
                            return res.json({
                                Status:true,
                                message:'Tài khoản đã ngùng hoạt động!'
                            })
                        };
                         const token = await CanhanADController.generateToken(DangNhap);
                         const id = DangNhap.IDND;
                         res.cookie('token', token, {
                             maxAge: 24 * 60 * 60 * 1000, // 1 ngày
                             httpOnly: true,             // chống XSS
                             secure: false,              // true nếu dùng https
                            sameSite: 'lax'
                        });
                        const { MATKHAU, ...KetQua } = DangNhap;
                        return res.json({
                             ThanhCong: true,
                             message: 'Bạn đã đăng nhập thành công!',
                             DuLieu: KetQua
                        });
                      }else{
                        return res.json({
                            Status:true,
                            message:'Email hoặc hoặc mật khẩu sai!'
                        })
                      }
                 }
            } catch (error) {
                console.error("Lỗi trong quá trình đăng nhập:", error);
                return res.json({
                    Status: true,
                    message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau!'
                });
            }
        }
            static async kiemtra(req, res) {
                 const adminId = req.user.id;
                 if(adminId){
                    return res.json({
                        ThanhCong:true,
                    })
                 }else{
                    return res.json({
                        Status:true
                    })
                 }
             }
             static async GetTTusers(req,res){
                 const adminId = req.user.id;
                 if(!adminId){
                    res.json({
                        Status:true,
                        message:'Lỗi lấy thông tin người dùng, vui lòng thử lại sau!'
                    })
                 };
                 const ketqqua = await adminModel.LayTT_ID(adminId);
                 if(ketqqua){
                   return res.json({
                        ThanhCong:true,
                        DuLieu:ketqqua
                    })
                 }else{
                    return res.json({
                        Status:true,
                        message:'Dữ liệu bị lỗi, vui lòng thử lại sau!'
                    })
                 }
             }
             static async DangXuat(req, res) {
                res.clearCookie('token', {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: false,
                    path: '/'
                });
                return res.json({
                    ThanhCong: true,
                    message: 'Bạn đã đăng xuất thành công!'
                });
            }
            static async CapNhatTen(req,res){
                 const { Ten } = req.body;
                 if (!Ten) {
                    return res.json({ 
                        Status:true, 
                        message: 'Vui lòng kiểm tra lại dữ liệu!' 
                    });
                } 
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.json({
                        validation: true,
                        errors: errors.array() 
                    });
                }
                
            }



  
}