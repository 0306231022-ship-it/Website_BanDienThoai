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