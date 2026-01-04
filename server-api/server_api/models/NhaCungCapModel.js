import {execute} from '../config/db.js';
export default class NhaCungCapModel{
    static async LayDanhSachNhaCungCap(offset, limit) {
        try {
            const [rows] = await execute(
                'SELECT IDNCC, TENNCC, SDT, LIENHE_DOITAC , CONGNO, TRANGTHAI , MST FROM nhacungcap ORDER BY NGAY_HOPTAC DESC LIMIT ? OFFSET ?',
                [limit, offset]
            );
            const [countRows] = await execute(
                'SELECT COUNT(*) as totalItems FROM nhacungcap'
            );
            const totalItems = countRows[0].totalItems;
            return { nhacungcap: rows, totalItems };
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thương hiệu:', error);
            return { nhacungcap: [], totalItems: 0 };
        }
    }
    static async CapNhatTen(Ten,id){
        try {
            const [CapNhat] = await execute ('UPDATE nhacungcap SET TENNCC = ? WHERE IDNCC= ?' , [Ten,id]);
             return CapNhat.affectedRows > 0;
        } catch (error) {
            console.error('sảy ra lỗi :' + error);
            return {
                Status:true
            }
        }
    }
    static async CapNhatMaDinhDanh(Ten,id){
         try {
            const [CapNhat] = await execute ('UPDATE nhacungcap SET MAVACH = ? WHERE IDNCC= ?' , [Ten,id]);
             return CapNhat.affectedRows > 0;
        } catch (error) {
            console.error('sảy ra lỗi :' + error);
            return {
                Status:true
            }
        }
    }
    static async CapNhatMoTaNhaCungCap(id,mota){
        try {
            const [result] = await execute(
                'UPDATE nhacungcap SET GHICHU = ? WHERE IDNCC = ?',
                [mota, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi khi cập nhật mô tả thương hiệu:', error);
            return false;
        }
    }
    static async layChiTiet(id){
         try {
            const [rows] = await execute(
                'SELECT * FROM nhacungcap WHERE IDNCC = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết thương hiệu:', error);
            return null;
        }
    }
    static async CapNhatNguoiDaiDien(id,ten){
        try {
            const [ketqqua] = await execute(
                'UPDATE nhacungcap SET LIENHE_DOITAC=? WHERE IDNCC= ?',[ten,id]
            );
           return ketqqua.affectedRows > 0;
        } catch (error) {
             console.error('Lỗi khi cập nhật mô tả thương hiệu:', error);
            return {
                Status:true
            }
        }
    }
    static async CapNhatDiaChi(id,DiaChi){
        try {
            const [ketqqua] = await execute(
                'UPDATE nhacungcap SET DIACHI=? WHERE IDNCC= ?',[DiaChi,id]
            );
           return ketqqua.affectedRows > 0;
        } catch (error) {
             console.error('Lỗi khi cập nhật mô tả thương hiệu:', error);
            return {
                Status:true
            }
        }
    }
    static async CapNhatTenNganHang(Ten,id){
         try {
            const [ketqqua] = await execute(
                'UPDATE nhacungcap SET TEN_NGANHANG=? WHERE IDNCC= ?',[Ten,id]
            );
           return ketqqua.affectedRows > 0;
        } catch (error) {
             console.error('Lỗi khi cập nhật mô tả thương hiệu:', error);
            return {
                Status:true
            }
        }
    }
    static async CapNhatSTKNganHang(so,id){
         try {
            const [ketqqua] = await execute(
                'UPDATE nhacungcap SET STK_NGANHANG=? WHERE IDNCC= ?',[so,id]
            );
           return ketqqua.affectedRows > 0;
        } catch (error) {
             console.error('Lỗi khi cập nhật mô tả thương hiệu:', error);
            return {
                Status:true
            }
        }
    }
    static async LayDShd(){
        try {
            const [ketqqua]= await execute('SELECT IDNCC , TENNCC FROM nhacungcap WHERE TRANGTHAI=?', [1]);
            return ketqqua || null;
        } catch (error) {
            console.error('Lỗi khi cập nhật mô tả thương hiệu:', error);
            return {
                Status:true
            }
        }
    }
    static async ThemCungCap(dulieu) {
        const today = new Date();
        let month = today.getMonth() + 1;
        let ID ="NCC-" + today.getFullYear().toString().slice(-2) 
        + (month < 10 ? "0" + month : month.toString()) + "-" 
        + Math.floor(1000 + Math.random() * 9000).toString();
         try {
            const [row] = await execute(
                `INSERT INTO nhacungcap 
                 (IDNCC, MAVACH, TENNCC, SDT, LIENHE_DOITAC, EMAIL, DIACHI, MST, STK_NGANHANG, TEN_NGANHANG, NGAY_HOPTAC, GHICHU) 
                 VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
          ID,
          dulieu?.DinhDanh?.MaDinhDanh ?? null,
          dulieu?.DinhDanh?.TenNhaCungCap ?? null,
          dulieu?.NguoiLienHe?.SDT ?? null,
          dulieu?.NguoiLienHe?.TenNguoiDung ?? null,
          dulieu?.NguoiLienHe?.Email ?? null,
          dulieu?.NguoiLienHe?.DiaChiKho ?? null, 
          dulieu?.TaiChinh?.MaThue ?? null,
          dulieu?.TaiChinh?.STK ?? null,
          dulieu?.TaiChinh?.NganHang ?? null,
          today, 
          dulieu?.GhiChu ?? null,
        ]
      );

      return row.affectedRows > 0;
    } catch (error) {
      console.error("Lỗi khi thêm nhà cung cấp:", error);
      return false;
    }
  }



};