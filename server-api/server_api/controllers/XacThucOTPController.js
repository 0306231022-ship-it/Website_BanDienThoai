import { body, validationResult } from 'express-validator';
import adminModel from '../models/adminModel.js';
import XacThucModel from '../models/XacThucOTP.js';
export default class XacThucOTPController{
    static async XacThucEmail(req,res){
        const email = req.body;
        try {
            if(!email.email){
                return res.json({
                    ThanhCong:false,
                    message:'Vui lòng kiểm tra lại dữ liệu'
                })
            }
            await Promise.all([
                 body('email')
                .notEmpty()
                .withMessage('Email không được bỏ trống!')
                .isEmail()
                .withMessage('Email không hợp lệ!')
                .isLength({ max: 255 })
                .withMessage('Vượt quá kí tự quy định!')
                .run(req),
            ]);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                Validate: true,                
                errors: errors.array() 
            });
        }
            const kiemtra = await adminModel.kiemtra_email(email.email);
            if(kiemtra){
                return res.json({
                    ThanhCong:false,
                    message:'Email đã tồn tại!'
                })
            }
            const kiemtra2= await XacThucModel.kiemtra_email(email.email);
            if(kiemtra2){
                return res.json({
                    ThanhCong:false,
                    message:'Vui lòng thực hiện sau giây lát!'
                })
            }
            const them = await XacThucModel.themotp(email.email);
            if(them){
                return res.json({
                    ThanhCong:true,
                    message:'Vui lòng kiểm tra lại mã otp'
                })
            }else{
                return res.json({
                    ThanhCong:false,
                    message:'Vui lòng kiểm tra lại thông tin!'
                })
            }
        } catch (error) {
             console.error('Có lỗi sãy ra:' + error);
            return res.json({
                ThanhCong:false,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
        }

    }
}