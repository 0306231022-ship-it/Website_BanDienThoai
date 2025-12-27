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

    /**
     * app.get('/api/sanpham', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const offset = (page - 1) * limit;

    const [rows] = await db.execute(
        'SELECT * FROM sanpham LIMIT ? OFFSET ?',
        [limit, offset]
    );

    res.json(rows);
});
     */
}