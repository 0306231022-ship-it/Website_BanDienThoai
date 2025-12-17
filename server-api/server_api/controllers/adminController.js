import pkg from 'bcrypt';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';
import CaiDatModel from '../models/CaiDatWebsite.js';
import { validationResult } from "express-validator";

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
    //Cần sử lí triệt để lỗi đăng nhập 
    static async DangNhap(req, res) {
        const dulieu = req.body;
         if (!dulieu) {
            return res.json({ 
                ThanhCong: false, 
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
              if (DangNhap) {
                 const isMatch = await compare(dulieu.passWord, DangNhap.MATKHAU);
                 if (isMatch) {
                    if (DangNhap.TRANGTHAI !== 1) {
                        return res.json({
                            ThatBai: true,
                            message: 'Tài khoản đã ngừng hoạt động!'
                        });
                    }
                    const token = await adminController.generateToken(DangNhap);
                    const { MATKHAU, ...KetQua } = DangNhap;
                    return res.json({
                         ThanhCong: true,
                         message: 'Bạn đã đăng nhập thành công!',
                         token: token,
                         DuLieu: KetQua
                    });
                }else{
                    return res.json({
                        ThatBai:true,
                        message: 'Đăng nhập thất bại. Mật khẩu không đúng.'
                    });
                }
              }else{
                 return res.json({
                    ThatBai:true,
                    message: 'Đăng nhập thất bại. Tài khoản không tồn tại.'
                });
              }
        } catch (error) {
            console.error("Lỗi trong quá trình đăng nhập:", error);
            return res.json({
                Status: true,
            });
        }
    }
    static async CapNhatTen(req,res){
         const { Ten } = req.body;
         if (!Ten) {
            return res.json({ 
                ThanhCong: false, 
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
        const CaiDat= CaiDatModel.updateTen(Ten);
        if(CaiDat===1){
            return res.json({
                Status: true,
            })
        };
        if(CaiDat){
            return res.json({
                 ThanhCong:true,
                 message:'Cập nhật tên website thành công!'
            })
        };
        if(!CaiDat){
            return res.json({
                ThatBai:true,
                message:'Cập nhật tên website thất bại!'
            })
        };
    }
    //bên dưới chưa sửa
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
    static async DangXuat(req,res){
         const token = req.user.token;
         const decode = jwt.decode(token);
         const exp= decode && decode.exp ? new Date(decode.exp*1000):null;
         if(!exp){
            return res.status(400).json({
                success : false,
                message : 'Invalid token'
            });
        }
        const result = await adminModel.removeToken(token, exp);
        if(result){
            return res.json({
                ThanhCong:true,
                message:'Bạn đã đăng xuát thành công!'
            })
        }else{
            return res.json({
                ThanhCong:false,
                message:'Bạn đã đăng xuất thất bại. Vui lòng kiểm tra lại hệ thống!'
            })
        }
    }
    static async LayWebsite(req,res){
        const kq= await CaiDatModel.GetTTWebsite();
        if(kq){
            res.json({
                ThanhCong:true,
                DuLieu:kq
            })
        }else{
            res.json({
                ThanhCong: false,
            })
        }

    }
    static async updateWebsite(req,res){
         const dulieu = req.body.Dulieu;
         const dsAnh = req.files.map(file => "/uploads/" + file.filename);
         const logo = dsAnh[0] || null;
         const ketqua= await CaiDatModel.UpdateWebsite(dulieu,logo);
         if(ketqua){
            return res.json({
                ThanhCong:true,
                message:'Cập nhật website thành công!'
            })
         }else{
            return res.json({
                ThanhCong:false,
                message:'Cập nhật thất bại vui lòng kiểm tra lại thông tin'
            });
         }
    }
}