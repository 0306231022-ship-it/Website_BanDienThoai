import {hash, compare} from 'bcryptjs';
import jwt from 'jsonwebtoken';
import TaiKhoan from '../models/TaiKhoan';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
const PASSWORD_HASH_SALT_ROUNDS = parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS) || 10;
export default class TaiKhoanController {
    static async ganerateToken(taiKhoan) {
        const payload = {
            id: taiKhoan.id,
            email: taiKhoan.email,
            vaiTro: taiKhoan.vaiTro
        };
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }
    static async DangNhap() {
        return res.json({ message: 'Đăng nhập thành công' });
    }

}
