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
}