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
    //Chưa sửa bên dưới 
 static async UpdateWebsite(dulieu, dsanh) {
    try {
        const [ketqua] = await execute(
            `UPDATE caidatwebsite 
             SET 
                TenWebsite=?, 
                Email=?, 
                DiaChi=?, 
                LinkFacebook=?, 
                LinkInstagram=?, 
                Zalo=?, 
                LoGo=?, 
                TrangThai=1
             WHERE IDWEBSITE = ?`,
            [
                dulieu.TenWebsite,
                dulieu.Email,
                dulieu.DiaChi,
                dulieu.LinkFace,
                dulieu.LinkIns,
                dulieu.Zalo,
                dsanh,           
                "ID-WBSS02"         
            ]
        );
       return ketqua.affectedRows > 0 ? ketqua : null;
    } catch (error) {
       return null;
    }
}

}