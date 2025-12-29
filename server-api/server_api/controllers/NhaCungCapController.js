import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import NhaCungCapModel from '../models/NhaCungCapModel.js';

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
   
}