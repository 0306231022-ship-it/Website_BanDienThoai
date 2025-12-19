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
    static async login(Data){
        try {
            const [update] = await execute('UPDATE nguoidung SET DANGNHAPLANCUOI = NOW() WHERE EMAIL = ?',[Data]);
            if (update.affectedRows > 0) {
                const [ketqua]=await execute('SELECT * FROM nguoidung WHERE email=?',[Data]);
                return ketqua[0] ?? null;
            }
            
        } catch (error) {
            return false;
        }
    }
    static async removeToken(token, exp){
        try {
            const [ketqua]=await execute(' INSERT INTO revoked_tokens (token, expires_at)VALUES (?, ?)',[token,exp]);
             return ketqua; 
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        } 
    }
    //đã sử phía trên
    static async isTokenRevoked(token){
        try {
            const [rows] = await execute('SELECT id FROM revoked_tokens WHERE token = ? LIMIT 1', [token])
            return rows.length > 0;
        } catch (error) {
             throw new Error('Database query failed: ' + error.message);
        }
    }
}