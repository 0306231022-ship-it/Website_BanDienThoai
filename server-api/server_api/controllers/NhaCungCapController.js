import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import NhaCungCapModel from '../models/NhaCungCapModel.js';
import { validationResult } from "express-validator";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const PASSWORD_HASH_ROUNDS = parseInt(process.env.PASSWORD_HASH_ROUNDS) || 10;

export default class NhaCungCapController{
    static async generateToken(user){
        return jwt.sign(
            {id : user.id},
            JWT_SECRET,
            {expiresIn:JWT_EXPIRES_IN}
        );
    }
     static async LayDanhSachNhaCungCap(req,res){
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const offset = (page - 1) * limit;
                const { nhacungcap, totalItems } = await NhaCungCapModel.LayDanhSachNhaCungCap(offset, limit);
                const totalPages = Math.ceil(totalItems / limit);
                return res.json({
                    nhacungcap,
                    pagination: {
                        totalItems,
                        totalPages,
                        currentPage: page,
                        itemsPerPage: limit
                    }
                });
            } catch (error) {
                console.error('Lỗi khi lấy danh sách thương hiệu:', error);
                return res.status(500).json({ message: 'Đã xảy ra lỗi hệ thống.' });
            }
        }
        static async layChiTiet(req,res){
             const id =req.query.id;
             if(!id){
                return res.json({
                    Status:true,
                    message:'Hệ thống không tìm thấy nhà cung cấp!'
                });
             }
             try {
                const NhaCungCap= await NhaCungCapModel.layChiTiet(id);
                if(!NhaCungCap){
                    return res.json({
                        Status:true,
                        message:'Hệ thống không tìm thấy nhà cung cấp!'
                    })
                };
                return res.json({
                    ThanhCong:true,
                    DuLieu:NhaCungCap
            })
             } catch (error) {
                console.error('Đã sãy ra lỗi trên hệ thống : ' + error);
                return res.json({
                    Status:true,
                    message:'Đã sãy ra lỗi trên hệ thống! Vui lòng thử lại sau.'
                })
             }

        }
        static async ThemCungCap(req,res) {
            const DuLieu=req.body;
            try {
                const ketqua= await NhaCungCapModel.ThemCungCap(DuLieu);
                if (ketqua) {
                    return res.json({   
                        ThanhCong: true,
                        message: 'Thêm mới 1 nhà cung cấp thành công!'
                    });
                } else {
                    return res.json({
                        ThanhCong: false,
                        message: 'Thêm mới 1 nhà cung cấp thất bại!'
                    });
                 }
            } catch (error) {
                console.error('Đã có lỗi xãy ra:'+ error);
                return res.json({
                    Status:true,
                    message:'Đã sãy ra lỗi trên hệ thống! Vui lòng thử lại sau.'
                })
            }
        }
        static async CapNhatTen(req,res){
            const { Ten } = req.body;
            const id = req.body.id || null;
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.json({ 
                    Validate: true, 
                    errors: errors.array() 
                });
             }
             const CapNhat = await NhaCungCapModel.CapNhatTen(Ten,id);
             if(CapNhat.Status){
                return res.json({
                    Status:true,
                    message:'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.'
                })
             }
             if(CapNhat){
                return res.json({
                    ThanhCong:true,
                    message:'Cập nhật tên nhà cung cấp thành công!'
                })
             }else{
                res.json({
                    ThanhCong:false,
                    message:'Cập nhật tên nhà cung cấp thất bại! Vui lòng thử lại sau.'
                })
             }
        }
        static async CapNhatMaDinhDanh(req,res){
            const { Ten } = req.body;
            const id = req.body.id || null;
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.json({ 
                    Validate: true, 
                    errors: errors.array() 
                });
             }
             const CapNhat = await NhaCungCapModel.CapNhatMaDinhDanh(Ten,id);
             if(CapNhat.Status){
                return res.json({
                    Status:true,
                    message:'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.'
                })
             }
             if(CapNhat){
                return res.json({
                    ThanhCong:true,
                    message:'Cập nhật mã định danh nhà cung cấp thành công!'
                })
             }else{
                res.json({
                    ThanhCong:false,
                    message:'Cập nhật mã định danh nhà cung cấp thất bại! Vui lòng thử lại sau.'
                })
             }
        }
        static async CapNhatMoTa(req,res){
            const { id, MoTa } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                     Validate: true, 
                     errors: errors.array() 
                });
            }   
            const capNhatThanhCong = await NhaCungCapModel.CapNhatMoTaNhaCungCap(id, MoTa);
            if (capNhatThanhCong) {
                return res.json({
                    ThanhCong: true,
                    message: 'Cập nhật mô tả nhà cung cấp thành công!'
                });
            } else {
                return res.json({
                    ThatBai: true,
                    message: 'Cập nhật mô tả nhà cung cấp thất bại!'
                });
            }
        }
        static async CapNhatTenNguoiDung(req,res) {
            const { Ten } = req.body;
            const id = req.body.id || null;
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.json({ 
                    Validate: true, 
                    errors: errors.array() 
                });
             }
             const CapNhat= await NhaCungCapModel.CapNhatNguoiDaiDien(id,Ten);
             if(CapNhat.Status){
                return res.json({
                    Status:true,
                    message:'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.'
                })
             }
             if(CapNhat){
                return res.json({
                    ThanhCong:true,
                    message:'Cập nhật tên người liên hệ thành công!'
                })
             }else{
                res.json({
                    ThanhCong:false,
                    message:'Cập nhật tên người liên hệ thất bại! Vui lòng thử lại sau.'
                })
             }
        }
        static async CapNhatDiaChi(req,res){
            const { DiaChi } = req.body;
            const id = req.body.id || null;
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.json({ 
                    Validate: true, 
                    errors: errors.array() 
                });
             }
             const CapNhat= NhaCungCapModel.CapNhatDiaChi(id,DiaChi);
              if(CapNhat.Status){
                return res.json({
                    Status:true,
                    message:'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.'
                })
             }
             if(CapNhat){
                return res.json({
                    ThanhCong:true,
                    message:'Cập nhật địa chỉ nhà cung cấp thành công!'
                })
             }else{
                res.json({
                    ThanhCong:false,
                    message:'Cập nhật địa chỉ nhà cung cấp thất bại! Vui lòng thử lại sau.'
                })
             }
        }
        static async CapNhatTenNganHang(req,res){
            const { Ten } = req.body;
            const id = req.body.id || null;
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.json({ 
                    Validate: true, 
                    errors: errors.array() 
                });
             }
             const CapNhat = await NhaCungCapModel.CapNhatTenNganHang(Ten,id);
             if(CapNhat.Status){
                return res.json({
                    Status:true,
                    message:'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.'
                })
             }
             if(CapNhat){
                return res.json({
                    ThanhCong:true,
                    message:'Cập nhật tên ngân hàng nhà cung cấp thành công!'
                })
             }else{
                res.json({
                    ThanhCong:false,
                    message:'Cập nhật tên ngân hàng nhà cung cấp thất bại! Vui lòng thử lại sau.'
                })
             }

        }
        static async CapNhatSoTaiKhoan(req,res){
            const { So } = req.body;
            const id = req.body.id || null;
            const errors = validationResult(req);
             if (!errors.isEmpty()) {
                return res.json({ 
                    Validate: true, 
                    errors: errors.array() 
                });
             }
             const CapNhat = await NhaCungCapModel.CapNhatSTKNganHang(So,id);
             if(CapNhat.Status){
                return res.json({
                    Status:true,
                    message:'Đã xảy ra lỗi hệ thống! Vui lòng thử lại sau.'
                })
             }
             if(CapNhat){
                return res.json({
                    ThanhCong:true,
                    message:'Cập nhật số tài khoản ngân hàng nhà cung cấp thành công!'
                })
             }else{
                res.json({
                    ThanhCong:false,
                    message:'Cập nhật số tài khoản ngân hàng nhà cung cấp thất bại! Vui lòng thử lại sau.'
                })
             }
        }
        static async LayDShd(req,res){
            const ketqqua = await NhaCungCapModel.LayDShd();
            if(ketqqua){
                return res.json({
                    ThanhCong:true,
                    DuLieu:ketqqua
                })
            }else{
                return res.json({
                    Status:true,
                })
            }
        }
        static async kiemtraid(req,res){
            const kiemtra = await NhaCungCapModel.kiemtraid(req.query.id);
            return res.json({kiemtra})
        }
}