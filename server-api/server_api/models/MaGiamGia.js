import {execute , beginTransaction , rollbackTransaction , commitTransaction} from '../config/db.js';
import { TaoID } from '../function.js';
export default class MaGiamGiaModel{
    static async ThemMaGiamGia(dulieu){
        try {
            const IDMGG = TaoID('MGG');
            const [ketqua] = await execute(`
                INSERT INTO magiamgia (MaGG, TENCHUONGTRINH, MAGIAMGIA, LOAIGIAM, GIATRIGIAM, GIATRIDON, IDTHUONGHIEU, SOLUONG, DADUNG, NGAYBATDAU, NGAYKETTHUC ,TRANGTHAI) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [IDMGG, dulieu.tenChuongTrinh, dulieu.magiamgia, parseInt(dulieu.loaiGiamGia), dulieu.giaTriGiam, dulieu.giaTriDonHangToiThieu, dulieu.apDungChoHang, dulieu.tongLuotSuDung, dulieu.luotDungMoiKhach , dulieu.ngayBatDau, dulieu.ngayKetThuc, 1]);
            return ketqua.affectedRows > 0 ? true : false;
            } catch (error) {
                console.error('Có lỗi xảy ra khi thêm mã giảm giá:' + error);
                return false;
            }
    }
    static async DanhSachMaGiamGia(page, limit){
        const offset = (page - 1) * limit;
        try {
            const [ketqua] = await execute(`
                SELECT mgg.MaGG, mgg.TENCHUONGTRINH, mgg.MAGIAMGIA, mgg.LOAIGIAM, mgg.GIATRIGIAM, mgg.GIATRIDON, 
                 thuonghieu.TENTHUONGHIEU,
                 mgg.SOLUONG,
                ( 
                    SELECT COUNT(*) 
                    FROM chitiet_magiamgia
                    WHERE IDMAGG = mgg.MaGG
                ) AS SOLUONG_DADUNG ,mgg.TRANGTHAI
                FROM magiamgia mgg
                LEFT JOIN thuonghieu ON thuonghieu.IDTHUONGHIEU = mgg.IDTHUONGHIEU
                ORDER BY mgg.NGAYBATDAU DESC
                LIMIT ? OFFSET ?`, [limit, offset]);
            const [totalResult] = await execute(`
                SELECT COUNT(*) AS total 
                FROM magiamgia`,[]);
            const total = totalResult[0].total;
            return {
                ThanhCong: true,
                dulieu: ketqua,
                total: total
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách mã giảm giá:' + error);
            return { 
                ThanhCong: false, 
                dulieu: [], 
                total: 0 
            };
        }
    }           
}