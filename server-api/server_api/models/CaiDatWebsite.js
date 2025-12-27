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
            return ketqua.affectedRows > 0 ? true : false;
        } catch (error) {
            return 1;
        }
    }
    static async updateHinhAnh(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET LoGo=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0 ? true : false;
        } catch (error) {
            return 1;
        }
    }
    static async updateMoTa(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET MoTaWebstite=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0 ? true : false;
        } catch (error) {
            return 1;
        }
    }
    static async updateLinkFaceBook(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET LinkFacebook=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0 ? true : false;
        } catch (error) {
            return 1;
        }
    }
     static async updateLinkIns(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET LinkInstagram=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0 ? true : false;
        } catch (error) {
            return 1;
        }
    }
     static async updateDiaChi(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET DiaChi=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0 ? true : false;
        } catch (error) {
            return 1;
        }
    }
    static async updateEmail(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET Email=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0 ? true : false;
        } catch (error) {
            return 1;
        }
    }
    static async updateSoDienThoai(DuLieu){
        try {
            const [ketqua]= await execute('UPDATE caidatwebsite SET Zalo=?  WHERE IDWEBSITE = ?',[DuLieu,'ID-WBSS02']);
            return ketqua.affectedRows >0 ? true : false;
        } catch (error) {
            return 1;
        }
    }
}