import { execute } from '../config/db.js';
import fs from 'fs';
import path from 'path';

export default class PhieuNhapModal {

    /**
     * Thêm phiếu nhập + sản phẩm + chi tiết + ảnh
     * @param {Object} dulieu Dữ liệu từ frontend
     * @param {Array} files Mảng file ảnh từ multer (nếu có)
     * @param {string} IDND_USER ID người dùng đang đăng nhập
     */
    static async ThemPhieuNhap(dulieu, files, IDND_USER) {
        const today = new Date();
        const month = today.getMonth() + 1;
        const IDPN = `PN-${today.getFullYear().toString().slice(-2)}${month < 10 ? '0' + month : month}-${Math.floor(1000 + Math.random() * 9000)}`;

        try {
            // 1️⃣ Thêm phiếu nhập
            const NhaCungCap = dulieu.thongTinPhieu.NhaCungCap ?? null;
            const DaThanhToan = dulieu.thongTinPhieu.DaThanhToan ?? null;
            const CheDoLuu = dulieu.CheDoLuu ?? null;
            const GhiChu = dulieu.thongTinPhieu.GhiChu ?? null;
            const IDND = IDND_USER ?? null; // đảm bảo tồn tại trong bảng nguoidung

            const [row1] = await execute(`
                INSERT INTO phieunhap 
                (IDPN, IDNCC, IDND, TONGTIEN, DA_THANHTOAN, NGAYNHAP, TRANGTHAI, GHICHU)
                VALUES (?,?,?,?,?,?,?,?)`,
                [IDPN, NhaCungCap, 'AD-2500601', 0, DaThanhToan, today, CheDoLuu, GhiChu]
            );
            if (row1.affectedRows <= 0) return { Status: true, message: 'Thêm phiếu nhập thất bại' };

            // 2️⃣ Duyệt từng sản phẩm
            for (let i = 0; i < dulieu.newProductState.length; i++) {
                const sp = dulieu.newProductState[i];
                const IDSP = `SP-${today.getFullYear().toString().slice(-2)}${month < 10 ? '0' + month : month}-${Math.floor(1000 + Math.random() * 9000)}`;

                // 2a️⃣ Xử lý dữ liệu
                const TenSanPham = sp.TenSanPham ?? null;
                const ThuongHieu = sp.ThuongHieu ?? null;
                const SoLuong = sp.SoLuong ?? 0;
                const ThongSoKyThuat = sp.ThongSoKyThuat ? JSON.stringify(sp.ThongSoKyThuat) : null;
                const DongMay = sp.DongMay ?? null;
                const MoTa = sp.MoTa ?? null;
                const GiaNhap = sp.GiaNhap ?? 0;
                const TrangThai = 1;

                // 2b️⃣ Thêm sản phẩm
                const [row2] = await execute(`
                    INSERT INTO sanpham
                    (IDSANPHAM, TENSANPHAM, IDTHUONGHIEU, SOLUONG, THONGSO_KYTHUAT, DONGMAY, MOTA, TRANGTHAI)
                    VALUES (?,?,?,?,?,?,?,?)`,
                    [IDSP, TenSanPham, ThuongHieu, SoLuong, ThongSoKyThuat, DongMay, MoTa, TrangThai]
                );
                if (row2.affectedRows <= 0) return { Status: true, message: 'Thêm sản phẩm thất bại' };

                // 2c️⃣ Thêm chi tiết phiếu nhập
                const [row3] = await execute(`
                    INSERT INTO chitiet_phieunhap
                    (IDPN, IDSANPHAM, SOLUONG, GIANHAP, THANHTIEN)
                    VALUES (?,?,?,?,?)`,
                    [IDPN, IDSP, SoLuong, GiaNhap, SoLuong * GiaNhap]
                );
                if (row3.affectedRows <= 0) return { Status: true, message: 'Thêm chi tiết phiếu nhập thất bại' };

                // 2d️⃣ Lưu ảnh sản phẩm
                if (Array.isArray(sp.HinhAnh) && sp.HinhAnh.length > 0) {
                    for (let j = 0; j < sp.HinhAnh.length; j++) {
                        const file = sp.HinhAnh[j];
                        if (!file) continue;

                        const fileName = `${IDSP}-${Date.now()}-${j}.jpg`;
                        const uploadPath = path.join('uploads', fileName);

                        // Nếu file là Buffer
                        if (file instanceof Buffer) {
                            fs.writeFileSync(uploadPath, file);
                        }
                        // Nếu file là object multer
                        else if (file.path) {
                            fs.copyFileSync(file.path, uploadPath);
                        }

                        // TODO: Nếu muốn lưu tên file vào database, thêm bảng `sanpham_anh` và insert vào đó
                    }
                }
            }

            return { ThanhCong: true };

        } catch (error) {
            console.error('Lỗi ThemPhieuNhap:', error);
            return { Status: true, message: 'Lỗi server' };
        }
    }
}
