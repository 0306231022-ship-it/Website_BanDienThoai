import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import PhieuNhapModal from '../models/PhieuNhapMoDel.js';
import { validationResult } from "express-validator";
import { mapFilesByProduct } from '../function.js';


const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const PASSWORD_HASH_ROUNDS = parseInt(process.env.PASSWORD_HASH_ROUNDS) || 10;

export default class PhieuNhapController{
    static async generateToken(user){
        return jwt.sign(
            {id : user.id},
            JWT_SECRET,
            {expiresIn:JWT_EXPIRES_IN}
        );
    }
    static async layChiTietPN(req, res) {
        try {
            const id = req.query.id;
            if (!id) {
                return res.json({
                    Status: false,
                    message: 'Không tìm thấy phiếu nhập!'
                });
            }
            const kq = await PhieuNhapModal.layChiTietPN(id);
            if(kq.Status){
                return res.json({
                    Status:true,
                    message:kq.message
                })
            };
            return res.json({
                ThanhCong:true,
                DuLieu:kq
            })
        } catch (error) {
            console.error(error);
            return res.json({
                Status: true,
                message: 'Có lỗi xảy ra khi lấy chi tiết phiếu nhập!',
                error: error.message
            });
        }
    }
    static async LayPhieuNhap_theo_id_trang(req,res){
        const id = req.query.id;
        const page = req.query.page;
        const linit = 10;
        const ketqua = await PhieuNhapModal.LayPhieuNhap_theo_id_trang(id,page,linit);
        if (ketqua) {
            return res.json({
                ThanhCong: true,
                dulieu: ketqua.phieu,
                Trang : {
                    totalPhieuNhap:  Math.ceil(ketqua.TtotalPhieuNhap/linit),
                     message: ketqua.message, 
                }                
            });
        } else {
            return res.json({
                ThanhCong: false,
                message: "Không có dữ liệu"
            });
        }
    }
   
    static async ThemPhieuNhap(req, res) {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.json({ 
                Validate: true, 
                errors: errors.array() 
            });
        };
        const files2D = mapFilesByProduct(req.files);
        const kq= await PhieuNhapModal.ThemPhieuNhap(req.body,files2D);
        if(kq.Status===false){
            return res.json({
                Status:true,
                message:kq.message
            })
        };
        if(kq.ThanhCong){
            return res.json({
                ThanhCong:true,
                message:'Thêm sản phẩm thành công!'
            })
        }
    }
    static async layDL(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { phieunhap, totalItems } =
            await PhieuNhapModal.LayDanhSachPhieu(offset, limit);

        const totalPages = Math.ceil(totalItems / limit);

        return res.json({
            phieunhap,
            pagination: {
                totalItems,
                totalPages,
                currentPage: page,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phiếu nhập:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi hệ thống.' });
    }
   
}


   
       

       
    

   


}