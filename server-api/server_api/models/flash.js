import {execute} from '../config/db.js';
import { TaoID } from '../function.js';
export default class FlashSaleModel{
    static async ThemFlashSale(dulieu){
        try {
            const IDFS = TaoID('FS');
            const [ketqua]= await execute(`
                INSERT INTO flash (IDFS, TENFS, THOIGIAN_BATDAU, THOIGIAN_KETTHUC, TRANGTHAI, MAUNEN) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [IDFS, dulieu.TenChienDich, dulieu.BatDau, dulieu.KetThuc, dulieu.TrangThai, dulieu.MauNen]);
            if(ketqua.affectedRows > 0){
               //cÓ THỂ NHIEU SAN PHAM
                const sanpham = dulieu.DanhSachSanPham;
                for (const sp of sanpham) {
                   const [kq] = await execute(`
                        INSERT INTO sanpham_flash (ID, ID_FS, IDSP, GIABAN,SOLUONG_BAN,DABAN,TRANGTHAI) 
                        VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [TaoID('SPFS'), IDFS, sp.IDSANPHAM, sp.GIAFLASHSALE, sp.SOLUONG_MOBAN, sp.DABAN_AO, 1]);
                        if (kq.affectedRows === 0) {
                            return false; 
                        }
                }
            return true;
            }else{
                return false;
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return false;
        }
    }
    static async DanhSachFlashSale(limit, offset){
        try {
           // lấy id, tên, thời gian, số sản phẩm
            const [ketqua] = await execute(`
                SELECT f.IDFS, f.TENFS, f.THOIGIAN_BATDAU, f.THOIGIAN_KETTHUC, f.TRANGTHAI, f.MAUNEN,
                (SELECT COUNT(*) FROM sanpham_flash sf WHERE sf.ID_FS = f.IDFS) AS SoSanPham
                FROM flash f
                ORDER BY f.THOIGIAN_BATDAU DESC
                LIMIT ? OFFSET ?`, [limit, offset]);
            if(ketqua.length === 0){
                return {
                    status:true,
                    message:'Không có chiến dịch Flash Sale nào!'
                }
            }
            return {
                ThanhCong:true,
                dulieu:ketqua,
                tongso:ketqua.length
            }
          
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return { status: false, message: 'Có lỗi xảy ra khi lấy danh sách Flash Sale!' };
        }
    }
}
