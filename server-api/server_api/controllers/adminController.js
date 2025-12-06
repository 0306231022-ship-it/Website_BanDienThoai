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
                    if(DangNhap.LOAIND!==1){
                        res.json({
                            ThanhCong:false,
                            message:'Bạn đăng nhập với vai trò khác. Vui lòng kiểm tra lại!'
                        });
                        return;
                    }
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