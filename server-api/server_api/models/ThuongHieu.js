import {execute} from '../config/db.js';
export default class ThuongHieuModel{
  static async ThemThuongHieu(TenThuongHieu, MoTa, HinhAnh) {
    const today = new Date();
    let month = today.getMonth() + 1;
    let ID = 'TH-' 
        + today.getFullYear().toString().slice(-2) 
        + (month < 10 ? '0' + month : month.toString()) 
        + '-' + Math.floor(1000 + Math.random() * 9000).toString();

    try {
        // Nếu NGAYTAO có default CURRENT_TIMESTAMP trong DB thì có thể bỏ cột này
        const [ketqua] = await execute(
            'INSERT INTO thuonghieu (IDTHUONGHIEU, TENTHUONGHIEU, MOTA, LOGO, TRANGTHAI, NGAYTAO) VALUES (?,?,?,?,?,?)',
            [ID, TenThuongHieu, MoTa, HinhAnh, 1, today]
        );

        return ketqua.affectedRows > 0 ? true : false;
    } catch (error) {
        console.error('Lỗi khi thêm thương hiệu:', error);
        return false;
    }
}
    static async LayDanhSachThuongHieu(offset, limit) {
        try {
            const [rows] = await execute(
                'SELECT IDTHUONGHIEU, TENTHUONGHIEU, TRANGTHAI, LOGO FROM thuonghieu ORDER BY NGAYTAO DESC LIMIT ? OFFSET ?',
                [limit, offset]
            );
            const [countRows] = await execute(
                'SELECT COUNT(*) as totalItems FROM thuonghieu'
            );
            const totalItems = countRows[0].totalItems;
            return { thuongHieu: rows, totalItems };
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thương hiệu:', error);
            return { thuongHieu: [], totalItems: 0 };
        }
    }
    static async LayChiTietThuongHieu(id) {
        try {
            const [rows] = await execute(
                'SELECT * FROM thuonghieu WHERE IDTHUONGHIEU = ?',
                [id]
            );
            return rows[0] || null;
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết thương hiệu:', error);
            return null;
        }
    }
    static async CapNhatTenThuongHieu(id, Ten) {
        try {
            const [result] = await execute(
                'UPDATE thuonghieu SET TENTHUONGHIEU = ? WHERE IDTHUONGHIEU = ?',
                [Ten, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi khi cập nhật tên thương hiệu:', error);
            return false;
        }
    }
    static async CapNhatAnhThuongHieu(id, Logo) {
        try {
            const [result] = await execute(
                'UPDATE thuonghieu SET LOGO = ? WHERE IDTHUONGHIEU = ?',
                [Logo, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi khi cập nhật ảnh thương hiệu:', error);
            return false;
        }
    }
    static async CapNhatTrangThaiThuongHieu(id, TrangThai) {
        try {
            const [result] = await execute(
                'UPDATE thuonghieu SET TRANGTHAI = ? WHERE IDTHUONGHIEU = ?',
                [TrangThai, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái thương hiệu:', error);
            return false;
        }   
    }
    static async CapNhatMoTaThuongHieu(id, MoTa) {
        try {
            const [result] = await execute(
                'UPDATE thuonghieu SET MOTA = ? WHERE IDTHUONGHIEU = ?',
                [MoTa, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Lỗi khi cập nhật mô tả thương hiệu:', error);
            return false;
        }
    }
}