import {execute} from '../config/db.js';
import { TaoID } from '../function.js';
export default class adminModel{
    static async LayTT_ID(adminId){
     try {
        const [ketqua]= await execute('SELECT * FROM nguoidung WHERE IDND=? LIMIT 1',[adminId])
        return ketqua[0] ?? null
       } catch (error) {
         return false
       }
    }
    static async kiemtraid(id){
        try {
            const [idnd] = await execute(`
                SELECT IDND 
                FROM nguoidung
                WHERE IDND = ?
                `,[id]);
            return idnd.length > 0;
        } catch (error) {
            console.error('Có lỗi sãy ra :'+ error);
            return false;
        }
    }
    static async login(Data){
        try {
            const [rows] = await execute('SELECT * FROM nguoidung WHERE email = ? LIMIT 1', [Data]);
            const user = rows[0];
             if (!user) {
                return false;
            }
            const [update] = await execute('UPDATE nguoidung SET DANGNHAPLANCUOI = NOW() WHERE EMAIL = ?',[Data]);
            return update.affectedRows > 0 ? user : false;
        } catch (error) {
            return false;
        }
    }
    static async ChinhSuaAnhNguoiDung(DuongDan, userId){
        try {
            const [update] = await execute(`
                UPDATE nguoidung
                SET AVATAR = ?
                WHERE IDND = ?
            `, [DuongDan, userId]);
            return update.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi khi cập nhật ảnh đại diện:', error);
            return false;
        }
    }
    static async ChinhSuaTen_NguoiDung(Ten, userId){
        try {
            const [update] = await execute(`
                UPDATE nguoidung
                SET HOTEN = ?
                WHERE IDND = ?
            `, [Ten, userId]);
            return update.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi khi cập nhật tên người dùng:', error);
            return false;
        }
    }
    static async kiemtra_email(email){
        try {
            const [kiemtra] = await execute(`
                SELECT EMAIL
                FROM nguoidung
                WHERE EMAIL = ?
                LIMIT 1
                `,[email]);
            return kiemtra.length>0;
        } catch (error) {
            console.error('Đã có lỗi sảy ra:' +error);
            return false;
        }
    }

    //chưa sửa bên dưới
    static async DangKy_NguoiDung(Data){
        try {
            const [insert] = await execute(`
                INSERT INTO nguoidung (IDND, HOTEN, SDT, EMAIL, MATKHAU, NGAYTHAMGIA, TRANGTHAI ,LOAIND) 
                VALUES (?, ?, ?, ?, ?, NOW(), 1, 0)
            `, [TaoID('ND'), Data.name, Data.phone, Data.email, Data.password]);
            return insert.affectedRows > 0 ? true : false;
        } catch (error) {
            console.error('Lỗi trong quá trình đăng ký:', error);
            return false;
        }
    }
    static async LayDiaChiMacDinh(IDND){
        try {
            const [ketqua] = await execute(`
                SELECT * FROM diachi_nguoidung
                WHERE IDND = ?`, [IDND]);
                if (ketqua.length > 0) {
                    return {
                        ThanhCong: true,
                        DuLieu : ketqua
                    }
                }else {
                    return {
                        ThanhCong: false,
                        message: 'Không tìm thấy địa chỉ mặc định'
                    }
                }
        } catch (error) {
            console.error('Lỗi khi lấy địa chỉ mặc định:', error);
            return false;
        }
    }
    static async ChinhSuaDiaChi_NguoiDung(DiaChi, IDND){
        try {
            const [ThemDL] = await execute(`
                INSERT INTO diachi_nguoidung (IDDC, IDND, DIACHI, TRANGTHAI)
                VALUES (?, ?, ?, 1)
            `, [TaoID('DC'), IDND, DiaChi]);
            return ThemDL.affectedRows > 0 ? true : false;
        } catch (error) {
            console.error('Lỗi khi cập nhật địa chỉ:', error);
            return false;
        }
    }
}