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
    // lấy mã giảm giá đã áp dụng đối với giỏ hàng 
    static async LayMaGiamGia_NguoiDung(IDND){
        //GioHang_NguoiDung
        try {
            const SanPham_TrongGioHang = await DonHangModel.GioHang_NguoiDung(IDND);
            const IDSANPHAM = SanPham_TrongGioHang.dulieu.map(item => item.IDSANPHAM);
            const IDDH = await DonHangModel.LayIDDH(IDND);
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
                SELECT mgg.MaGG, mgg.TENCHUONGTRINH, mgg.MAGIAMGIA, mgg.LOAIGIAM, mgg.GIATRIGIAM, mgg.GIATRIDON, mgg.SOLUONG, mgg.DADUNG, mgg.NGAYKETTHUC ,mgg.TRANGTHAI,
                (
                 SELECT COUNT(ct.IDCT_MGG)
                 FROM chitiet_magiamgia ct
                 WHERE mgg.MaGG=ct.IDMAGG 
                ) AS SOLUONG_DADUNG,
                FROM magiamgia mgg
                WHERE IDTHUONGHIEU IN (${placeholders2}) AND TRANGTHAI = 1 AND NGAYBATDAU <= NOW() AND NGAYKETTHUC >= NOW()
            `,IDTHUONGHIEU);
            const MaGG = ketqua2.map(item => item.MaGG);
        
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
    static async LayGT_GIAM(idnd,IDDH){
        try {
            const [MaGG] = await execute(`
                SELECT mgg.LOAIGIAM, mgg.GIATRIGIAM
                FROM magiamgia mgg
                LEFT JOIN chitiet_magiamgia ct ON ct.IDMAGG = mgg.MaGG AND ct.IDND = ? AND ct.IDDH = ?
                ` , [idnd,IDDH]);
            if(MaGG.length>0){
                return {
                    ThanhCong:true,
                    dulieu:MaGG
                }
            }else{
                return {
                    ThanhCong:false,
                    message:'Không tìm thấy mã giảm giá cho đơn hàng của bạn!'
                }
            }
        } catch (error) {
            console.error('Dax có lỗi sãy ra:' + error);
            return {
                ThanhCong:false,
                message:'Lỗi truy vấn dữ liệu! Vui lòng kiểm tra lại!'
            }
        }
    }
    static async XoaMa_Cu(IDDH,IDND){
        try {
            const [Xoa_MaCu] = await execute(`
                DELETE FROM chitiet_magiamgia
                WHERE IDND=? AND IDDH =?
                `,[IDND,IDDH]);
            return Xoa_MaCu.affectedRows>0 ? true :false;
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return false
        }
    }
    static async XoaMa_IDDH(iddh) {
        try {
            const [Xoa_Ma] = await execute(`
                DELETE FROM chitiet_magiamgia
                WHERE IDDH = ?
                `,[iddh]);
            return Xoa_Ma.affectedRows>0 ? true : false;
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return false
        }
    }
    // Hàm kiểm tra xem đơn hangf đã được áp mã giảm giá hay chưa
    static async KiemTra_MaGímGia(iddh){
        try {
            const [KiemTra] = await execute(`
                SELECT IDCT_MGG
                FROM chitiet_magiamgia
                WHERE IDDH = ?
                `,[iddh]);
            return KiemTra.length> 0 ? true : false
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return false;
        }
    }
    static async LayMaGiamGia_idth(dulieu){
        try {
            if (!dulieu) {
                return {
                    ThanhCong: false,
                    dulieu: [],
                    message: 'Thiếu dữ liệu thương hiệu.'
                };
            }
            const [ketqua] = await execute(`
                SELECT MaGG, TENCHUONGTRINH, MAGIAMGIA, LOAIGIAM, GIATRIGIAM, GIATRIDON,
                       IDTHUONGHIEU, SOLUONG, DADUNG, NGAYBATDAU, NGAYKETTHUC, TRANGTHAI
                FROM magiamgia
                WHERE IDTHUONGHIEU = ?
                  AND TRANGTHAI = 1
                  AND NGAYBATDAU <= NOW()
                  AND NGAYKETTHUC >= NOW()
            `,[dulieu]);
            return {
                ThanhCong: true,
                dulieu: ketqua
            };
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy mã giảm giá theo thương hiệu:' + error);
            return {
                ThanhCong: false,
                dulieu: [],
                message: 'Lỗi truy vấn mã giảm giá.'
            };
        }
    }
    static async ApMaGiamGia_NguoiDung(dulieu,IDDH){
        try {
            const [magiamgia] = await execute(`
                SELECT mgg.MaGG, mgg.LOAIGIAM, mgg.GIATRIGIAM
                FROM magiamgia mgg
                INNER JOIN chitiet_magiamgia ct 
                    ON ct.IDMAGG = mgg.MaGG 
                    AND ct.IDND=? 
                    AND ct.IDDH=?
                `,[dulieu,IDDH.IDDH]);
            if(magiamgia.length>0){
                return {
                    ThanhCong:true,
                    dulieu: magiamgia
                }
            }else{
                return {
                    ThanhCong:false,
                    dulieu:[]
                }
            }

        } catch (error) {
            console.error('Có lỗi sãy ra khi lấy dữ liệu mã giảm giá từ người dùng:' + error);
            return {
                ThanhCong:false,
                dulieu:[]
            }
        }
    }   
}