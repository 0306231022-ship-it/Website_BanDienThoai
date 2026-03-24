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
            return idnd.length > 0 ? true : false;
        } catch (error) {
            console.error('Có lỗi sãy ra :'+ error);
            return false;
        }
    }
    static async login(Data){
        try {
            const [update] = await execute('UPDATE nguoidung SET DANGNHAPLANCUOI = NOW() WHERE EMAIL = ?',[Data]);
            if (update.affectedRows > 0) {
                const [ketqua]=await execute('SELECT * FROM nguoidung WHERE email=?',[Data]);
                return ketqua[0] ?? false;
            }
            
        } catch (error) {
            return false;
        }
    }
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
    static async LayTT_Email(email){
        try {
           const [ketqua]= await execute('SELECT * FROM nguoidung WHERE EMAIL=? LIMIT 1',[email])
           return ketqua.length >0 ? true : false
          } catch (error) {
            return false
          }
    }
}