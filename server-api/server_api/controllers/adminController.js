import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';
import authMiddleware from '../middleware/auth.js';

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
                data:TruyVan
            })
         }else{
            res.json({
                ThanhCong:false,
                message:'Lỗi.....'
            })
         }
     }

    
}