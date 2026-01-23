import {execute} from '../config/db.js';
import { TaoID } from '../function.js';
export default class ThuongHieuModel{
  static async ThemThuongHieu(TenThuongHieu, MoTa, HinhAnh) {
    const today = new Date();
    try {
        const [ketqua] = await execute(
            'INSERT INTO thuonghieu (IDTHUONGHIEU, TENTHUONGHIEU, MOTA, LOGO, TRANGTHAI, NGAYTAO) VALUES (?,?,?,?,?,?)',
            [TaoID('TH'), TenThuongHieu, MoTa, HinhAnh, 1, today]
        );

        return ketqua.affectedRows > 0 ? true : false;
    } catch (error) {
        console.error('Lỗi khi thêm thương hiệu:', error);
        return false;
    }
}
    static async LayDanhSachThuongHieu(offset, limit) {
        try {
            const [rows]= await execute(`
                SELECT th.IDTHUONGHIEU, th.TENTHUONGHIEU, th.TRANGTHAI, th.LOGO,
                       COUNT(sp.IDTHUONGHIEU) AS tongSanPham
                FROM thuonghieu th
                LEFT JOIN sanpham sp ON th.IDTHUONGHIEU = sp.IDTHUONGHIEU
                GROUP BY th.IDTHUONGHIEU, th.TENTHUONGHIEU, th.TRANGTHAI, th.LOGO
                ORDER BY th.NGAYTAO DESC
                LIMIT ? OFFSET ?`, [limit, offset])
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
                `SELECT th.*, 
                    (SELECT COUNT(*) 
                    FROM sanpham sp 
                    WHERE sp.IDTHUONGHIEU = th.IDTHUONGHIEU) AS tongSanPham
                        FROM thuonghieu th
                        WHERE th.IDTHUONGHIEU = ?`,
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
    static async LayDShd(){
        try {
            const [ketqqua]= await execute('SELECT IDTHUONGHIEU , TENTHUONGHIEU FROM thuonghieu WHERE TRANGTHAI=?', [1]);
            return ketqqua || null;
        } catch (error) {
            console.error('Lỗi khi cập nhật mô tả thương hiệu:', error);
            return {
                Status:true
            }
        }
    }
    static async laysp_thuonghieu(offset, limit, id) {
        try {
            const [ketqua] = await execute(
                `
                    SELECT sp.IDSANPHAM, sp.SOLUONG, sp.TENSANPHAM,
                        (SELECT ha.HINHANH
                            FROM hinhanh_sanpham ha
                            WHERE ha.IDSANPHAM = sp.IDSANPHAM
                            LIMIT 1) AS HINHANH
                    FROM sanpham sp
                    WHERE sp.IDTHUONGHIEU = ?
                    LIMIT ? OFFSET ?
                `,
                [id, limit, offset]
            );
            const [countResult] = await execute(`SELECT COUNT(*) AS total FROM sanpham WHERE IDTHUONGHIEU = ?`,[id]);
            const total = countResult[0].total;
            const start = offset + 1;
            const end = Math.min(offset + limit, total);
            return {
                ThanhCong:true,
                DuLieu: ketqua,
                PhanTrang:{
                    BatDau:start,
                    ketThuc:end,
                    Tong:total
                }
            };
    } catch (error) {
        console.error(error);
        return {
            Status:true,
        }
    }
}
   

}