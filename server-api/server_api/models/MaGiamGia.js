import {execute , beginTransaction , rollbackTransaction , commitTransaction} from '../config/db.js';
import { TaoID } from '../function.js';
import DonHangModel from './DonHang.js';
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
    static async LayMaGiamGia_NguoiDung(IDND){
        //GioHang_NguoiDung
        try {
            const SanPham_TrongGioHang = await DonHangModel.GioHang_NguoiDung(IDND);
            const IDSANPHAM = SanPham_TrongGioHang.dulieu.map(item => item.IDSANPHAM);
            const placeholders = IDSANPHAM.map(() => '?').join(',');
            // DỰA VÀO MẢNG IDSANPHAM ĐỂ LẤY IDTHUONGHIEU TƯƠNG ỨNG
            const [ketqua] = await execute(`
                SELECT IDTHUONGHIEU 
                FROM sanpham
                WHERE IDSANPHAM IN (${placeholders})
            `, IDSANPHAM);
            const IDTHUONGHIEU = ketqua.map(item => item.IDTHUONGHIEU);
            const placeholders2 = IDTHUONGHIEU.map(() => '?').join(',');
            const [ketqua2] = await execute(`
                SELECT MaGG, TENCHUONGTRINH, MAGIAMGIA, LOAIGIAM, GIATRIGIAM, GIATRIDON, IDTHUONGHIEU, SOLUONG, DADUNG, NGAYBATDAU, NGAYKETTHUC ,TRANGTHAI
                FROM magiamgia
                WHERE IDTHUONGHIEU IN (${placeholders2}) AND TRANGTHAI = 1 AND NGAYBATDAU <= NOW() AND NGAYKETTHUC >= NOW()
            `,IDTHUONGHIEU);
            return {
                ThanhCong: true,
                dulieu: ketqua2
             };
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy mã giảm giá cho người dùng:' + error);
            return {
                ThanhCong: false,
                message: 'Có lỗi xảy ra khi lấy mã giảm giá cho người dùng!'
             };
        }
    }
    static async kiemtra_magg_nguoidung(iddh,idnd){
        // TRUE : chưa có=> FALSE ngược lại
        try {
            const [kiemtra] = await execute(`
                SELECT IDCT_MGG
                FROM chitiet_magiamgia 
                WHERE IDND = ? AND IDDH = ?
                LIMIT 1
                `,[idnd,iddh]);
            return kiemtra.length <= 0 ? true : false;
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return true;
        }
    }
    static async Ap_mgg_nguoidung(MaGG,IDND ,IDDH){
        const now = new Date();
        try {
            const [ThemDL] = await execute(`
                INSERT INTO chitiet_magiamgia (IDCT_MGG ,IDMAGG , IDND ,IDDH,NGAYSUDUNG,TRANGTHAI)
                VALUES (?,?,?,?,?,?)
                ` , [TaoID('CTMGG'), MaGG , IDND , IDDH , now ,1]);
            return ThemDL.affectedRows>0 ? true : false;
        } catch (error) {
            console.error('Có lỗi sãy ra :' + error);
            return false;
        }
    }           
}