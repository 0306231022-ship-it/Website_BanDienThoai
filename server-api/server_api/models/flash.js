import {execute , beginTransaction , rollbackTransaction , commitTransaction} from '../config/db.js';
import { TaoID } from '../function.js';
export default class FlashSaleModel{
    static async ThemFlashSale(dulieu){
        try {
            const IDFS = TaoID('FS');
            const [ketqua]= await execute(`
                INSERT INTO flash (IDFS, TENFS, THOIGIAN_BATDAU, THOIGIAN_KETTHUC, TRANGTHAI, MAUNEN) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [IDFS, dulieu.TenChienDich, dulieu.BatDau, dulieu.KetThuc, 1, dulieu.MauNen]);
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
    static async LayDanhSachFlashSale(){
        let conn;
        try {
            // lấy tên, thời gian, sản phẩm, hình ảnh sản phẩm, giá flash sale, giá gốc từ bảng chitiet_phieunhap
            // lấy 1 flash sale đang diễn ra
           conn = await beginTransaction();
            const [flashSale] = await conn.query(`
                SELECT IDFS , TENFS, THOIGIAN_BATDAU, THOIGIAN_KETTHUC, TRANGTHAI, MAUNEN
                FROM flash
                WHERE TRANGTHAI = 1 AND THOIGIAN_BATDAU <= NOW() AND THOIGIAN_KETTHUC >= NOW()
                ORDER BY THOIGIAN_BATDAU DESC
                LIMIT 1`, []);
            if(flashSale.length === 0){
                await commitTransaction(conn);
                return {
                    status:true,
                    message:'Không có chiến dịch Flash Sale nào đang diễn ra!'
                };
            }
            const IDFS = flashSale[0].IDFS;
            const [sanpham] = await conn.query(`
    SELECT sp.IDSANPHAM, sp.TENSANPHAM,
       (SELECT ha.HINHANH 
        FROM hinhanh_sanpham ha 
        WHERE ha.IDSANPHAM = sp.IDSANPHAM 
        ORDER BY ha.IDHA ASC LIMIT 1) AS HINHANH,
       sf.GIABAN AS GIAFLASHSALE,
       sf.SOLUONG_BAN,
       sf.DABAN,
       ct.GIABAN
FROM sanpham sp
JOIN sanpham_flash sf ON sp.IDSANPHAM = sf.IDSP AND sf.ID_FS = ? AND sf.TRANGTHAI = 1
JOIN chitiet_phieunhap ct ON sp.IDSANPHAM = ct.IDSANPHAM;
`, [IDFS, IDFS]);   // truyền 2 lần IDFS
            await commitTransaction(conn);
            return {
                ThanhCong:true,
                message:'Lấy danh sách Flash Sale thành công!',
                dulieu:{
                    flashSale: flashSale[0],
                    sanpham: sanpham
                }
            };
        } catch (error) {
            await rollbackTransaction(conn);
            console.error('Có lỗi sãy ra:' + error);
            return { status: false, message: 'Có lỗi xảy ra khi lấy danh sách Flash Sale!' };
        }
    }
                
}
