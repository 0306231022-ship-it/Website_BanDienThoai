
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
    static async kiemtraid_phieunhap(idpn){
        try {
            const [rows] = await execute(
                'SELECT * FROM phieunhap WHERE IDPN = ? LIMIT 1',
                [idpn]
            );
            return rows.length > 0;
        } catch (error) {
            console.error('Lỗi khi kiểm tra IDPN:', error);
            return false;
        }
    }
    static async layTT_NHCC(Idpn){
        try {
            const [rows] = await execute(
                `SELECT ncc.TENNCC, ncc.SDT, ncc.DIACHI
                 FROM phieunhap pn
                    JOIN nhacungcap ncc ON pn.IDNCC = ncc.IDNCC
                    WHERE pn.IDPN = ? LIMIT 1`,
                [Idpn]
            );
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin nhà cung cấp:', error);
            return null;
        }
    }
    static async layTT_ND(Idpn){ 
        try {
            const [rows] = await execute(
                `SELECT nd.HOTEN, nd.IDND
                 FROM phieunhap pn
                    JOIN nguoidung nd ON pn.IDND = nd.IDND
                    WHERE pn.IDPN = ? LIMIT 1`,
                [Idpn]
            );
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
            return null;
        }
    }
    static async layTT_ThanhToan(Idpn){
        try {
            const [rows] = await execute(
                `SELECT TONGTIEN, DA_THANHTOAN
                 FROM phieunhap
                 WHERE IDPN = ? LIMIT 1`,
                [Idpn]
            );
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin thanh toán:', error);
            return null;
        }
    }
    static async layTT_SanPham(Idpn) {
    try {
        // Lấy thông tin sản phẩm trước
        const [sanphams] = await execute(
            `SELECT sp.IDSANPHAM, sp.TENSANPHAM, sp.THONGSO_KYTHUAT, ct.SOLUONG, ct.GIANHAP, ct.THANHTIEN
             FROM chitiet_phieunhap ct
             JOIN sanpham sp ON ct.IDSANPHAM = sp.IDSANPHAM
             WHERE ct.IDPN = ?`,
            [Idpn]
        );

        // Với mỗi sản phẩm, lấy hình ảnh riêng
        for (let sp of sanphams) {
            const [hinhanh] = await execute(
                `SELECT HINHANH 
                 FROM hinhanh_sanpham 
                 WHERE IDSANPHAM = ?`,
                [sp.IDSANPHAM]
            );
            sp.HINHANH = hinhanh.length > 0 ? hinhanh[0].HINHANH : null;
        }
        // LẤY IMEI CHO TỪNG SẢN PHẨM
        for (let sp of sanphams) {
            const [imeiCodes] = await execute(
                `SELECT MA_IMEI 
                 FROM kho_imei 
                 WHERE IDSANPHAM = ? AND ID_PHIEUNHAP = ?`,
                [sp.IDSANPHAM, Idpn]
            );
            sp.IMEI = imeiCodes.map(item => item.MA_IMEI);
        }
        return sanphams;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
        return [];
    }
}



    static async layTT_PhieuNhap(Idpn){
        try {
            const [rows] = await execute(
                `SELECT GHICHU, TRANGTHAI ,NGAYNHAP
                    FROM phieunhap
                    WHERE IDPN = ? LIMIT 1`,
                [Idpn]
            );
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Lỗi khi lấy thông tin phiếu nhập:', error);
            return null;
        }
    }
    static async ThemPhieuNhap(ThongTinChung) {
        const ThongTin= ThongTinChung.ThongTinChung;
        const SanPham= ThongTinChung.SANPHAM;
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
                IDSANPHAM_MOI.push({id: IdSanPham, soluong: sanpham.SOLUONG, gianhap: sanpham.GIANHAP , giaban: sanpham.GIABAN});
                const themsp=  await execute(
                        'INSERT INTO sanpham (IDSANPHAM, TENSANPHAM, IDTHUONGHIEU, SOLUONG, THONGSO_KYTHUAT ,DONGMAY , MOTA , TRANGTHAI) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                        [IdSanPham, sanpham.TENSP, sanpham.HANG, sanpham.SOLUONG, JSON.stringify(sanpham.THONGSO_KYTHUAT), sanpham.DONGMAY, sanpham.MOTASP, 1]
                    );
                if (themsp[0].affectedRows === 0) {
                    throw new Error('Không thể tạo sản phẩm mới.');
                }
                // THÊM VÀO HÌNH ANH SẢN PHẨM
                const HinhAnh = sanpham.HINHANH || [];
                for (const hinhanhPath of HinhAnh) {
                     const ThemHA= await execute(
                        'INSERT INTO hinhanh_sanpham (IDHA , IDSANPHAM, HINHANH, TRANGTHAI) VALUES (?, ?, ?, ?)',
                        [TaoID('HA'), IdSanPham, hinhanhPath, 1]
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
                for (const sp of IDSANPHAM_MOI) {
                    const idCTPN = TaoID('CTPN');
                   const thanhTien = sp.soluong * sp.gianhap;
                    const themctpn= await execute(
                        'INSERT INTO chitiet_phieunhap (IDCTPN, IDPN, IDSANPHAM, SOLUONG, GIANHAP, GIABAN , THANHTIEN) VALUES (?, ?, ?, ?, ?, ?, ?)',
                        [idCTPN, IDPN, sp.id, sp.soluong, sp.gianhap, sp.giaban, thanhTien]
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
