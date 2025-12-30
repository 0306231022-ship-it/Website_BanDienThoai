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

};