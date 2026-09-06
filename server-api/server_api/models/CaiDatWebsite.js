import {execute} from '../config/db.js';
export default class CaiDatModel{
    static async GetTTWebsite() {
        try {
            const [ketqua]= await execute('SELECT * FROM caidatwebsite LIMIT 1',[]);
            return ketqua[0] ?? null;
        } catch (error) {
            return null;
        }
    }
    static async updateTen(DuLieu){
        try {
            const [ketqua]=await execute('UPDATE caidatwebsite SET TenWebsite=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi trong updateTen:', error);
            return false;
        }
    }
    static async updateHinhAnh(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET LoGo=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0;
        } catch (error) {
            console.error('Lỗi trong updateHinhAnh:', error);
            return false;
        }
    }
    static async updateMoTa(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET MoTaWebstite=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0;
        } catch (error) {
            console.error('Lỗi trong updateMoTa:', error);
            return false;
        }
    }
    static async updateLinkFaceBook(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET LinkFacebook=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0;
        } catch (error) {
            console.error('Lỗi trong updateLinkFaceBook:', error);
            return false;
        }
    }
     static async updateLinkIns(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET LinkInstagram=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0;
        } catch (error) {
            console.error('Lỗi trong updateLinkIns:', error);
            return false;
        }
    }
     static async updateDiaChi(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET DiaChi=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0;
        } catch (error) {
            console.error('Lỗi trong updateDiaChi:', error);
            return false;
        }
    }
    static async updateSoDienThoai(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET Zalo=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0;
        } catch (error) {
            console.error('Lỗi trong updateSoDienThoai:', error);
            return false;
        }
    }
     //Đã sửa đến đây
    static async updateEmail(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET Email=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0 ? true : false;
        } catch (error) {
            console.error('Lỗi trong updateEmail:', error);
            return false;
        }
    }
  
    static async LayThongTin_DiaChi(){
        try {
            const [DiaChi] = await execute(`
                SELECT DiaChi
                FROM caidatwebsite
                LIMIT 1
                `,[]);
            return DiaChi.length>0 ? DiaChi[0] : null;
        } catch (error) {
            return null;
        }
    }
}