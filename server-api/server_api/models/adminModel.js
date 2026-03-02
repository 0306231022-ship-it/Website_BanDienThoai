import {execute} from '../config/db.js';
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
            return idnd.affectedRows>0 ? true : false;
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
}