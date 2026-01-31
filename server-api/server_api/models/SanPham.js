import {execute} from '../config/db.js';

export default class SanPhamModel{
   static async lay_ds_sanpham(limit,opset){
        try {
            const [sanpham] =await execute(`
                SELECT 
                    sp.IDSANPHAM, 
                    sp.TENSANPHAM, 
                    MAX(ct.GIABAN) AS GIABAN, 
                    SUM(ct.SOLUONG) AS TONG_TONKHO,  
                    th.TENTHUONGHIEU,
                (SELECT ha.HINHANH 
                    FROM hinhanh_sanpham AS ha 
                    WHERE ha.IDSANPHAM = sp.IDSANPHAM 
                    ORDER BY ha.IDHA ASC 
                    LIMIT 1) AS HINHANH
            FROM sanpham AS sp
            LEFT JOIN chitiet_phieunhap AS ct 
                     ON sp.IDSANPHAM = ct.IDSANPHAM
            INNER JOIN thuonghieu AS th 
            ON th.IDTHUONGHIEU = sp.IDTHUONGHIEU
            GROUP BY sp.IDSANPHAM, sp.TENSANPHAM, th.TENTHUONGHIEU
            LIMIT ? OFFSET ?;
                `,[limit,opset])
            return {
                ThanhCong:true,
                sanpham:sanpham
            }
        } catch (error) {
            console.error('lỗi sãy ra:'+ error);
            return {
                status:true,
                message:'Lỗi hệ thống, Vui lòng kiểm tra lại!'
            }
        }
   }
   static async kiemtra_id_sp(id){
        try {
            const kiemtra = await execute(`
                SELECT TENSANPHAM
                FROM sanpham 
                WHERE IDSANPHAM=?
                LIMIT 1
                `,[id]);
            return  kiemtra.length > 0 ? true : false;
        } catch (error) {
            console.error('Có lỗi sãy ra :' + error);
            return false;
        }
   }
   static async layChiTietSP_theoid(id){
        try {
            const [sanpham] = await execute(`
                SELECT sp.*, ct.GIANHAP, ct.GIABAN
                FROM sanpham sp
                JOIN chitiet_phieunhap ct ON sp.IDSANPHAM = ct.IDSANPHAM
                WHERE sp.IDSANPHAM = ?
                `,[id]);
            const [hinhanh] = await execute(`
                SELECT IDHA , HINHANH 
                FROM hinhanh_sanpham
                WHERE IDSANPHAM = ? AND TRANGTHAI=?
                `,[id,1]);
            const [kho_imei] = await execute(`
                SELECT MA_IMEI
                FROM kho_imei
                WHERE IDSANPHAM = ? 
                `,[id]);
            const [nhacungcap] = await execute(`
                SELECT ncc.TENNCC, ncc.DIACHI
                FROM chitiet_phieunhap ct
                JOIN phieunhap pn ON ct.IDPN = pn.IDPN
                JOIN nhacungcap ncc ON pn.IDNCC = ncc.IDNCC
                WHERE ct.IDSANPHAM = ?
                LIMIT 1;
                `,[id])
            return {
                ThanhCong:true,
                dulieu:{
                    sanpham:sanpham,
                    hinhanh:hinhanh,
                    kho_imei:kho_imei,
                    nhacungcap:nhacungcap
                }
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return {
                status:true,
                message: 'Lỗi truy vấn dữ liệu. Vui lòng kiểm tra lại!'
            }
        }
   }
}