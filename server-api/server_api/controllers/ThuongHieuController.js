import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import ThuongHieuModel from '../models/ThuongHieu.js';
import { validationResult } from "express-validator";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const PASSWORD_HASH_ROUNDS = parseInt(process.env.PASSWORD_HASH_ROUNDS) || 10;

export default class ThuongHieuController{
    static async generateToken(user){
        return jwt.sign(
            {id : user.id},
            JWT_SECRET,
            {expiresIn:JWT_EXPIRES_IN}
        );
    }
    static async ThemThuongHieu(req,res){
         const { TenTT, MoTa } = req.body;
         const files = req.files;
         const pathFile = files[0].path.replace(/\\/g, '/');
         if(!pathFile){
            return res.json({
                Status:true,
                message:'Lỗi tải ảnh!'
            })
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                validation: true,
                errors: errors.array()
            });
        }
        const ThemTH= await ThuongHieuModel.ThemThuongHieu(TenTT, MoTa, pathFile);
            if(ThemTH===1){
                return res.json({
                    Status:true,
                    message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau! '
                })
            };
            if(ThemTH){
                return res.json({
                     ThanhCong:true,
                     message:'Thêm thương hiệu thành công!'
                })
            };
            if(!ThemTH){
                return res.json({
                    ThatBai:true,
                    message:'Thêm thương hiệu thất bại!'
                })
            };
        /* const files = req.files;
         const pathFile = files[0].path.replace(/\\/g, '/');
            if(!pathFile){
                return res.json({
                    Status:true,
                    message:'Vui lòng tải lên hình ảnh thương hiệu!'
                })
            };
         const ThemTH= await ThuongHieuModel.ThemThuongHieu(TenTT, MoTa, pathFile);
            if(ThemTH===1){
                return res.json({
                    Status:true,
                    message:'Không thể kết nối đến hệ thống, Vui lòng thử lại sau! '
                })
            };
            if(ThemTH){
                return res.json({
                     ThanhCong:true,
                     message:'Thêm thương hiệu thành công!'
                })
            };
            if(!ThemTH){
                return res.json({
                    ThatBai:true,
                    message:'Thêm thương hiệu thất bại!'
                })
            };*/
    }
 
    
}