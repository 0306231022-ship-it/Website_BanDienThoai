import {execute} from '../config/db.js';
export default class CaiDatModel{
    static async GetTTWebsite() {
        try {
            const [ketqua]= await execute('SELECT * FROM caidatwebsite LIMIT 1',[]);
            return ketqua[0] ?? null;
        } catch (error) {
             throw new Error('Database query failed: ' + error.message);
        }
    }
 static async UpdateWebsite(DATA, dsanh) {
   const dulieu=JSON.parse(DATA);
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
        throw new Error('Database query failed: ' + error.message);
    }
}

}