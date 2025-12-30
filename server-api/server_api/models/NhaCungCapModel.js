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