import {execute , beginTransaction , rollbackTransaction , commitTransaction} from '../config/db.js';
import { TaoID ,  taoMaOTP , guiEmailOTP } from '../function.js';
export default class XacThucModel{
    static async kiemtra_email(email){
        try {
            const [kiemtra] = await execute(`
                SELECT EMAIL
                FROM xacthucotp
                WHERE EMAIL = ?
                `,[email]);
            return kiemtra.length>0;
        } catch (error) {
            console.error('Có lỗi sảy ra:' + error);
            return false;
        }
    }
   static async themotp(email) {
    try {
        const maotp = taoMaOTP();
        const gui = await guiEmailOTP(email, maotp);
        if (!gui) {
            return false;
        }

        const [them] = await execute(`
            INSERT INTO xacthucotp(ID_OTP, MA_OTP, EMAIL, NGAY_TAO, NGAY_KET_THUC, SO_LAN_SAI)
            VALUES(?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 5 MINUTE), 0)
        `, [TaoID('OTP'), maotp, email]);

        return them.affectedRows > 0;
    } catch (error) {
        console.error('Có lỗi xảy ra: ' + error);
        return false;
    }
}
}