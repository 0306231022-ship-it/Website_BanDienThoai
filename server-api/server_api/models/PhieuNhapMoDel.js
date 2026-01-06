
import { execute } from '../config/db.js';
import { TaoID } from '../function.js';
//Chưa xử lí imei

export default class PhieuNhapModal {

    /**
     * Thêm phiếu nhập + sản phẩm + chi tiết + ảnh
     * @param {Object} dulieu Dữ liệu từ frontend
     * @param {Array} files Mảng file ảnh từ multer (nếu có)
     * @param {string} IDND_USER ID người dùng đang đăng nhập
     */
   static async ThemPhieuNhap(dulieu, files) {
        try {
            const IDPN = TaoID('PN');
            const today = new Date();
            const NhaCungCap = dulieu.thongTinPhieu.NhaCungCap ?? null;
            const DaThanhToan = dulieu.thongTinPhieu.DaThanhToan ?? null;
            const CheDoLuu = dulieu.CheDoLuu ?? null;
            const GhiChu = dulieu.thongTinPhieu.GhiChu ?? null;
            const IDND = dulieu.NguoiGhiPhieu;
            const [row1] = await execute(`
                INSERT INTO phieunhap 
                (IDPN, IDNCC, IDND, TONGTIEN, DA_THANHTOAN, NGAYNHAP, TRANGTHAI, GHICHU)
                VALUES (?,?,?,?,?,?,?,?)
            `, [IDPN, NhaCungCap,  IDND, 0,  DaThanhToan, today, CheDoLuu, GhiChu]);
            if (row1.affectedRows <= 0)
                return { Status: false, message: 'Thêm phiếu nhập thất bại' };
            for (let i = 0; i < dulieu.newProductState.length; i++) {
                const sp = dulieu.newProductState[i];

                const IDSP = TaoID('SP');
                const TenSanPham = sp.TenSanPham ?? null;
                const ThuongHieu = sp.ThuongHieu ?? null;
                const SoLuong = sp.SoLuong ?? 0;
                const GiaNhap = sp.GiaNhap ?? 0;
                const DongMay = sp.DongMay ?? null;
                const MoTa = sp.MoTa ?? null;

                const ThongSoKyThuat = sp.ThongSoKyThuat
                    ? JSON.stringify(sp.ThongSoKyThuat)
                    : null;
                const [row2] = await execute(`
                    INSERT INTO sanpham
                    (IDSANPHAM, TENSANPHAM, IDTHUONGHIEU, SOLUONG, THONGSO_KYTHUAT, DONGMAY, MOTA, TRANGTHAI)
                    VALUES (?,?,?,?,?,?,?,?)
                `, [ IDSP, TenSanPham, ThuongHieu,  SoLuong,   ThongSoKyThuat,  DongMay,   MoTa,   1]);

                if (row2.affectedRows <= 0)
                    return { Status: false, message: 'Thêm sản phẩm thất bại' };
                const [row3] = await execute(`
                    INSERT INTO chitiet_phieunhap
                    (IDPN, IDSANPHAM, SOLUONG, GIANHAP, THANHTIEN)
                    VALUES (?,?,?,?,?)
                `, [ IDPN,    IDSP,   SoLuong,  GiaNhap,   SoLuong * GiaNhap ]);
                if (row3.affectedRows <= 0)
                    return { Status: false, message: 'Thêm chi tiết phiếu nhập thất bại' };
                if (Array.isArray(files) && Array.isArray(files[i])) {
                    for (const file of files[i]) {
                        if (!file) continue;
                        const imagePath = file.path.replace(/\\/g, '/');
                        const [rowImg] = await execute(`
                            INSERT INTO hinhanh_sanpham
                            (IDHA, HINHANH, IDSANPHAM, TRANGTHAI)
                            VALUES (?,?,?,?)
                        `, [TaoID('IMG'),   imagePath, IDSP,  1 ]);
                        if (rowImg.affectedRows <= 0)
                            return { Status: false, message: 'Thêm ảnh sản phẩm thất bại' };
                    }
                }
            }
            return { ThanhCong: true };
        } catch (error) {
            console.error('Lỗi ThemPhieuNhap:', error);
            return { Status: false, message: 'Lỗi server' };
        }
    }
    static async layChiTietPN(id){
        try {
            // Bước 1: lấy IDNCC và IDND từ phiếu nhập
             const [rows1] = await execute('SELECT IDNCC, IDND, TRANGTHAI FROM phieunhap WHERE IDPN = ? LIMIT 1',[id]);
            // Bước 2: lấy thông tin nhà cung cấp
             const [nhacungcap] = await execute('SELECT TENNCC, SDT, DIACHI FROM nhacungcap WHERE IDNCC = ?', [rows1[0]?.IDNCC]);
            // Bước 3: lấy thông tin người nhập
             const [ThongTinNguoiNhap] = await execute('SELECT HOTEN FROM nguoidung WHERE IDND = ? LIMIT 1',[rows1[0]?.IDND]);
            // Bước 4: lấy thông tin thanh toán
             const [ThongTinThanhToan] = await execute('SELECT TONGTIEN, DA_THANHTOAN FROM phieunhap WHERE IDPN = ? LIMIT 1',[id]);
            // Bước 5: lấy thông tin sản phẩm trong phiếu nhập
             const [ThongTinSanPham] = await execute(
                `SELECT sp.TENSANPHAM, ct.SOLUONG, ct.GIANHAP, ct.THANHTIEN
                 FROM chitiet_phieunhap ct
                 JOIN sanpham sp ON ct.IDSANPHAM = sp.IDSANPHAM
                WHERE ct.IDPN = ?`,[id]
            );
            const ketqqua= {
                TrangThaiPhieuNhap: rows1[0].TRANGTHAI,
                CungCap:nhacungcap,
                NguoiNhap:ThongTinNguoiNhap,
                ThanhToan:ThongTinThanhToan,
                SanPham:ThongTinSanPham,
            };
            return ketqqua;
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }
    static async LayDanhSachPhieu(offset, limit) {
    try {
        const [rows] = await execute(`
            SELECT  pn.IDPN,  ncc.TENNCC, nd.HOTEN,  pn.TONGTIEN, pn.TRANGTHAI
            FROM phieunhap pn
            LEFT JOIN nhacungcap ncc ON pn.IDNCC = ncc.IDNCC
            LEFT JOIN nguoidung nd ON pn.IDND = nd.IDND
            ORDER BY pn.NGAYNHAP DESC
            LIMIT ? OFFSET ?
        `, [limit, offset]);
        const [countRows] = await execute(`
            SELECT COUNT(*) AS totalItems FROM phieunhap
        `);

        return {
            phieunhap: rows,
            totalItems: countRows[0].totalItems
        };

    } catch (error) {
        console.error('Lỗi khi lấy danh sách phiếu nhập:', error);
        return { phieunhap: [], totalItems: 0 };
    }
}


 

   
}
