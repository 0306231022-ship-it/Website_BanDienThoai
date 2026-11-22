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
        console.log('them otp:', email)
        try {
            const maotp = String(taoMaOTP());
            const gui = await guiEmailOTP(email, maotp);
            const BAT_LOI_EMAIL = {
                EAUTH: 'Lỗi xác thực SMTP. Vui lòng kiểm tra lại thông tin đăng nhập email của hệ thống!',
                SMTP_AUTH_ERROR: 'Lỗi xác thực SMTP. Vui lòng kiểm tra lại thông tin đăng nhập email của hệ thống!',
                ETIMEDOUT: 'Kết nối đến máy chủ SMTP bị hết thời gian chờ. Vui lòng kiểm tra kết nối mạng hoặc cấu hình máy chủ SMTP!',
                SMTP_TIMEOUT: 'Kết nối đến máy chủ SMTP bị hết thời gian chờ. Vui lòng kiểm tra kết nối mạng hoặc cấu hình máy chủ SMTP!',
                SMTP_CONNECTION_ERROR: 'Lỗi kết nối đến máy chủ SMTP. Vui lòng kiểm tra lại kết nối mạng hoặc cấu hình máy chủ SMTP!',
                EENVELOPE: 'Lỗi phong bì email. Vui lòng kiểm tra lại địa chỉ email người nhận!',
                EMAIL_REJECTED: 'Máy chủ SMTP từ chối gửi email. Vui lòng kiểm tra lại địa chỉ email người nhận!',
                NO_RECIPIENT_ACCEPTED: 'Không có địa chỉ email nào được chấp nhận gửi. Vui lòng kiểm tra lại địa chỉ email người nhận!'
            };
            if (!gui || !gui.ThanhCong) {
                const thongBaoLoi = BAT_LOI_EMAIL[gui?.maLoi] 
                || gui?.chiTietLoi 
                || 'Lỗi không xác định khi gửi email. Vui lòng kiểm tra lại cấu hình máy chủ SMTP!';
                return {
                    ThanhCong: false,
                    message: thongBaoLoi
                };
            }

            const mahash = await hash(maotp, 10);

            await execute('DELETE FROM xacthucotp WHERE EMAIL = ?', [email]);

            const [result] = await execute(`
                INSERT INTO xacthucotp(ID_OTP, MA_OTP, EMAIL, NGAY_TAO, NGAY_KET_THUC, SO_LAN_SAI)
                VALUES(?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 5 MINUTE), 0)
            `, [TaoID('OTP'), mahash, email]);
            return result?.affectedRows > 0 ? { ThanhCong: true, message: 'Mã OTP đã được gửi thành công. Vui lòng kiểm tra email của bạn!' } 
                    : { ThanhCong: false, message: 'Không thể lưu mã OTP vào cơ sở dữ liệu. Vui lòng thử lại!' };
        } catch (error) {
            console.error('Lỗi trong themotp:', error);
            return { ThanhCong: false, message: 'Có lỗi xảy ra khi gửi mã OTP. Vui lòng thử lại!' };
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
    static async XoaOTP_HetHan() {
        try {
            const [result] = await execute(`
                DELETE FROM xacthucotp 
                WHERE NGAY_KET_THUC < NOW()
            `);
            return result?.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi trong XoaOTP_HetHan:', error);
            return false;
        }
    }
}