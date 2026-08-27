import { execute } from '../config/db.js';
import { TaoID, taoMaOTP, guiEmailOTP } from '../function.js';
import pkg from 'bcrypt';
const { hash } = pkg;

export default class XacThucModel {

    static async kiemtra_email(email) {
        try {
            const [rows] = await execute(`
                SELECT EMAIL, MA_OTP, SO_LAN_SAI 
                FROM xacthucotp 
                WHERE EMAIL = ? AND NGAY_KET_THUC >= NOW()
                ORDER BY NGAY_TAO DESC 
                LIMIT 1
            `, [email]);

            return rows.length > 0 ? rows[0] : false;
        } catch (error) {
            console.error('Lỗi trong kiemtra_email:', error);
            return false;
        }
    }

  
    static async themotp(email) {
        try {
            const maotp = String(taoMaOTP());
            const gui = await guiEmailOTP(email, maotp);
            if (!gui) return false;

            const mahash = await hash(maotp, 10);

            await execute('DELETE FROM xacthucotp WHERE EMAIL = ?', [email]);

            const [result] = await execute(`
                INSERT INTO xacthucotp(ID_OTP, MA_OTP, EMAIL, NGAY_TAO, NGAY_KET_THUC, SO_LAN_SAI)
                VALUES(?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 5 MINUTE), 0)
            `, [TaoID('OTP'), mahash, email]);

            return result?.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi trong themotp:', error);
            return false;
        }
    }

   
    static async Tang_sai(email) {
        try {
            const [result] = await execute(`
                UPDATE xacthucotp 
                SET SO_LAN_SAI = SO_LAN_SAI + 1 
                WHERE EMAIL = ?
            `, [email]);

            return result?.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi trong Tang_sai:', error);
            return false;
        }
    }

   
    static async Huy_otp(email) {
        try {
            const [result] = await execute(`
                DELETE FROM xacthucotp 
                WHERE EMAIL = ?
            `, [email]);

            return result?.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi trong Huy_otp:', error);
            return false;
        }
    }
}