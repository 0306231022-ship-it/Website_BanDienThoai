
import { execute } from '../config/db.js';
import { TaoID } from '../function.js';

export default class PhieuNhapModal {
    static async kiemtraidncc(idncc){
        try {
            const [rows] = await execute(
                'SELECT * FROM nhacungcap WHERE IDNCC = ? LIMIT 1',
                [idncc]
            );
            return rows.length > 0;
        } catch (error) {
            console.error('Lỗi khi kiểm tra IDNCC:', error);
            return false;
        }
    }
    static async kiemtraidnd(idnd){
        try {
            const [rows] = await execute(
                'SELECT * FROM nguoidung WHERE IDND = ? LIMIT 1',
                [idnd]
            );
            return rows.length > 0;
        } catch (error) {
            console.error('Lỗi khi kiểm tra IDND:', error);
            return false;
        }
    }
    static async kiemtrahang(sanpham){
        try {
            const [rows] = await execute(
                'SELECT * FROM thuonghieu WHERE IDTHUONGHIEU = ? LIMIT 1',
                [sanpham]
            );
            return rows.length > 0;
        } catch (error) {
            console.error('Lỗi khi kiểm tra IDTHUONGHIEU:', error);
            return false;
        }
    }
    static async ThemPhieuNhap(ThongTinChung) {
        const ThongTin= ThongTinChung.ThongTinChung;
        const SanPham= ThongTinChung.SANPHAM;
        console.log('SanPham:', ThongTin);
        try {
            //Bước 1 Thêm phiếu nhập
            const IDPN = TaoID('PN');
            const [resultPhieuNhap] = await execute(
                'INSERT INTO phieunhap (IDPN, IDNCC, IDND, TONGTIEN, DA_THANHTOAN, NGAYNHAP, TRANGTHAI, GHICHU) VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)',
                [IDPN, ThongTin.IDNCC, ThongTin.IDND, ThongTin.THANHTOAN.TONGTIEN, ThongTin.THANHTOAN.DA_THANHTOAN , ThongTin.CheDoLuu, ThongTin.GHICHU ]
            );
            if (resultPhieuNhap.affectedRows === 0) {
                throw new Error('Không thể tạo phiếu nhập mới.');
            }
            // Bước 2: Thêm chi tiết phiếu nhập và sản phẩm
            //tẠO MẢNG ĐỂ LƯU TẤT CẢ IDSẢNPHẨM MỚI
            const IDSANPHAM_MOI = [];
            for (const sanpham of SanPham) {
                const IdSanPham = TaoID('SP');
                IDSANPHAM_MOI.push(IdSanPham);
                const themsp=  await execute(
                        'INSERT INTO sanpham (IDSANPHAM, TENSANPHAM, IDTHUONGHIEU, SOLUONG, THONGSO_KYTHUAT ,DONGMAY , MOTA , TRANGTHAI) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                        [IdSanPham, sanpham.TENSP, sanpham.HANG, sanpham.SOLUONG, JSON.stringify(sanpham.THONGSO_KYTHUAT), sanpham.DONGMAY, sanpham.MOTA, 1]
                    );
                if (themsp[0].affectedRows === 0) {
                    throw new Error('Không thể tạo sản phẩm mới.');
                }
                // THÊM VÀO HÌNH ANH SẢN PHẨM
                const HinhAnh = sanpham.HINHANH || [];
                for (const hinhanhPath of HinhAnh) {
                     const ThemHA= await execute(
                        'INSERT INTO hinhanh_sanpham (IDSANPHAM, HINHANH, TRANGTHAI) VALUES (?, ?, ?)',
                        [IdSanPham, hinhanhPath, 1]
                    );
                    if (ThemHA[0].affectedRows === 0) {
                        throw new Error('Không thể thêm hình ảnh sản phẩm.');
                    }
                }
                //tHÊM VÀO IMEI SẢN PHẨM
                const IMEI = sanpham.IMEI || [];
                for (const imeiCode of IMEI) {
                    const ThemIMEI= await execute(
                        'INSERT INTO kho_imei (ID_IMEI, IDSANPHAM, MA_IMEI, ID_PHIEUNHAP, TRANGTHAI) VALUES (?, ?, ?, ?, ?)',
                        [TaoID('IMEI'), IdSanPham, imeiCode, IDPN, 1]
                    );
                    if (ThemIMEI[0].affectedRows === 0) {
                        throw new Error('Không thể thêm IMEI sản phẩm.');
                    }
                }
            }
            // THÊM VÀO CHI TIẾT PHIẾU NHẬP , DUYỆT QUA IDSẢNPHẨM MỚI
                for (const sanpham of IDSANPHAM_MOI) {
                    const IdSanPham = sanpham;

                    const sanphamData = SanPham.find(sp => sp.TENSP === sanpham.TENSP && sp.SOLUONG && sp.GIANHAP && sp.THANHTIEN);
                    if (!sanphamData) {
                        throw new Error('Không tìm thấy dữ liệu sản phẩm để thêm vào chi tiết phiếu nhập.');
                    }
                    const themctpn= await execute(
                        'INSERT INTO chitiet_phieunhap (IDPN, IDSANPHAM, SOLUONG, GIANHAP, THANHTIEN) VALUES (?, ?, ?, ?, ?)',
                        [IDPN, IdSanPham, sanphamData.SOLUONG, sanphamData.GIANHAP, sanphamData.THANHTIEN]
                    );
                    if (themctpn[0].affectedRows === 0) {
                        throw new Error('Không thể thêm chi tiết phiếu nhập.');
                    }
                }
            return {
                ThanhCong: true,
                message: 'Thêm phiếu nhập thành công!',
            };
        } catch (error) {
            console.error('Lỗi khi thêm phiếu nhập:', error);
            return {
                ThanhCong: false,
                message: 'Thêm phiếu nhập thất bại do lỗi hệ thống!'
            };
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
    static async LayPhieuNhap_theo_id_trang(id,page,linit){
        try {
            const OFFSET = (page - 1) * linit;
            const [ketqqua] = await execute(`
                SELECT 
                    pn.IDPN,
                    pn.NGAYNHAP,
                    pn.TONGTIEN,
                    pn.TRANGTHAI,
                    nd.HOTEN
                FROM PHIEUNHAP pn
                JOIN NGUOIDUNG nd ON pn.IDND = nd.IDND
                WHERE pn.IDNCC = ? 
                ORDER BY pn.NGAYNHAP DESC
                LIMIT ? OFFSET ?;
                `,[id,linit,OFFSET]);
            const [countRows]= await execute(`
                SELECT COUNT(*) AS totalPhieuNhap
                FROM PHIEUNHAP
                WHERE IDNCC=?
                `, [id]);
             const total = countRows[0].totalPhieuNhap;
             const start = OFFSET + 1;
             const end = Math.min(page * linit, total);
             return {
                phieu : ketqqua,
                TtotalPhieuNhap: total,
                message: `Hiển thị ${start}-${end} trên ${total} phiếu nhập`
             };
        } catch (error) {
            console.log(error)
            return {
                status : true,
            }
        }
    }

 

   
}
