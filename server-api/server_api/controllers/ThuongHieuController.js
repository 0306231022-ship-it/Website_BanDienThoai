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
    }
    static async LayDanhSachThuongHieu(req,res){
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const { thuongHieu, totalItems } = await ThuongHieuModel.LayDanhSachThuongHieu(offset, limit);
            const totalPages = Math.ceil(totalItems / limit);
            return res.json({
                thuongHieu,
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
    static async LayChiTietThuongHieu(req,res){
        const page =req.query.id || 1;
         try {      
            const thuongHieu= await ThuongHieuModel.LayChiTietThuongHieu(page);
            if(!thuongHieu){
                return res.json({
                    Status:true,
                    message:'Không tìm thấy thương hiệu!'
                })
            };
            return res.json({
                thuongHieu
            })
         } catch (error) {
            console.error('Lỗi khi lấy chi tiết thương hiệu:', error);
            return res.status(500).json({ message: 'Đã xảy ra lỗi hệ thống.' });
         }
    }
    static async SuaTenThuongHieu(req, res) {
        const { Ten } = req.body;
        const id = req.body.id || null;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
        }
        // Logic cập nhật tên thương hiệu dựa trên ID
        // Giả sử bạn có một phương thức trong model để cập nhật tên thương hiệu
        const capNhatThanhCong = await ThuongHieuModel.CapNhatTenThuongHieu(id, Ten);
        if (capNhatThanhCong) {
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật tên thương hiệu thành công!'
            });
        } else {
            return res.json({
                ThatBai: true,
                message: 'Cập nhật tên thương hiệu thất bại!'
            });
        }
    }
    static async SuaAnhThuongHieu(req, res) {
        const files = req.files;
        const id = req.body.id || null;
        const pathFile = files[0].path.replace(/\\/g, '/');
        if (!pathFile) {
            return res.json({
                Status: true,
                message: 'Lỗi tải ảnh!'
            })
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                validation: true,
                errors: errors.array()
            });
        }
        const capNhatThanhCong = await ThuongHieuModel.CapNhatAnhThuongHieu(id, pathFile);
        if (capNhatThanhCong) {
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật ảnh thương hiệu thành công!'
            });
        } else {
            return res.json({
                ThatBai: true,
                message: 'Cập nhật ảnh thương hiệu thất bại!'
            });
        }
    }
    static async ChinhSuaTrangThai(req,res){
        const { id, TrangThai } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
        }
        const capNhatThanhCong = await ThuongHieuModel.CapNhatTrangThaiThuongHieu(id, TrangThai);
        if (capNhatThanhCong) {
            return res.json({   
                ThanhCong: true,
                message: 'Cập nhật trạng thái thương hiệu thành công!'
            });
        } else {
            return res.json({
                ThatBai: true,
                message: 'Cập nhật trạng thái thương hiệu thất bại!'
            });
        }
    }
    static async SuaMoTathuongHieu(req,res){
        const { id, MoTa } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ Validate: true, errors: errors.array() });
        }   
        const capNhatThanhCong = await ThuongHieuModel.CapNhatMoTaThuongHieu(id, MoTa);
        if (capNhatThanhCong) {
            return res.json({
                ThanhCong: true,
                message: 'Cập nhật mô tả thương hiệu thành công!'
            });
        } else {
            return res.json({
                ThatBai: true,
                message: 'Cập nhật mô tả thương hiệu thất bại!'
            });
        }
    }


}