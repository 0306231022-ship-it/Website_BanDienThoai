
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
        const [rows1] = await execute(
            'SELECT IDNCC, IDND, TRANGTHAI , GHICHU , NGAYNHAP FROM phieunhap WHERE IDPN = ? LIMIT 1',
            [id]
        );

        if (!rows1 || rows1.length === 0) {
            return {
                Status: true,
                message: "Không tìm thấy phiếu nhập với IDPN = " + id
            };
        }

        // Bước 2: lấy thông tin nhà cung cấp
        const [nhacungcap] = await execute(
            'SELECT TENNCC, SDT, DIACHI FROM nhacungcap WHERE IDNCC = ?',
            [rows1[0]?.IDNCC ?? null]
        );

        // Bước 3: lấy thông tin người nhập
        const [ThongTinNguoiNhap] = await execute(
            'SELECT HOTEN, IDND FROM nguoidung WHERE IDND = ? LIMIT 1',
            [rows1[0]?.IDND ?? null]
        );

        // Bước 4: lấy thông tin thanh toán
        const [ThongTinThanhToan] = await execute(
            'SELECT TONGTIEN, DA_THANHTOAN FROM phieunhap WHERE IDPN = ? LIMIT 1',
            [id]
        );

        // Bước 5: lấy thông tin sản phẩm + ảnh
        const [rowsSanPham] = await execute(
            `SELECT sp.IDSANPHAM, sp.TENSANPHAM, sp.THONGSO_KYTHUAT, ct.SOLUONG, ct.GIANHAP, ct.THANHTIEN, ha.HINHANH
             FROM chitiet_phieunhap ct
             JOIN sanpham sp ON ct.IDSANPHAM = sp.IDSANPHAM
             LEFT JOIN hinhanh_sanpham ha ON sp.IDSANPHAM = ha.IDSANPHAM
             WHERE ct.IDPN = ?`, [id]
        );

        // Gom ảnh thành mảng cho từng sản phẩm
        const mapSanPham = {};
        rowsSanPham.forEach(sp => {
            if (!mapSanPham[sp.IDSANPHAM]) {
                mapSanPham[sp.IDSANPHAM] = {
                    IdSanPham: sp.IDSANPHAM,
                    TenSanPham: sp.TENSANPHAM,
                    SoLuong: sp.SOLUONG,
                    GiaNhap: sp.GIANHAP,
                    ThanhTien: sp.THANHTIEN,
                    HinhAnh: [],
                    ThongSoKyThuat:sp.THONGSO_KYTHUAT
                };
            }
            if (sp.HINHANH) {
                mapSanPham[sp.IDSANPHAM].HinhAnh.push(sp.HINHANH);
            }
        });

        const danhSachSanPham = Object.values(mapSanPham);

        // Kết quả cuối cùng
        const ketqqua = {
            ThongTinPhieu: [
                {
                    TrangThai: rows1[0].TRANGTHAI ?? null,
                    GhiChu: rows1[0].GHICHU ?? null,
                    NgayNhap: rows1[0].NGAYNHAP ?? null
                }
            ],
            CungCap: nhacungcap ?? [],
            NguoiNhap: ThongTinNguoiNhap ?? [],
            ThanhToan: ThongTinThanhToan ?? [],
            SanPham: danhSachSanPham
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
