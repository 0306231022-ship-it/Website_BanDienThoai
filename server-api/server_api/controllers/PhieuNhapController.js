import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import PhieuNhapModal from '../models/PhieuNhapMoDel.js';
import { validationResult } from "express-validator";

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
    static async ThemPhieuNhap(req, res) {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.json({ 
                Validate: true, 
                errors: errors.array() 
            });
        };
        const kq= await PhieuNhapModal.ThemPhieuNhap(req.body,res.files);

       
    }

   


}