
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
            if(rows.length > 0) return true;
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
    static async DuyetPhieuNhap(Idpn){
        try {
            const [result] = await execute(
                `UPDATE phieunhap
                    SET TRANGTHAI = 1
                    WHERE IDPN = ? AND TRANGTHAI = 0`,
                [Idpn]
            );
          if (result.affectedRows === 0) {
                return {
                    ThanhCong: false,
                    message: 'Duyệt phiếu nhập thất bại! Phiếu nhập không tồn tại hoặc đã được duyệt trước đó.'
                };
            }
            return {
                ThanhCong: true,
                message: 'Duyệt phiếu nhập thành công!'
            };
        } catch (error) {
            console.error('Lỗi khi duyệt phiếu nhập:', error);
            return {
                ThanhCong: false,
                message: 'Lỗi hệ thống khi duyệt phiếu nhập!'
            };
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
            WHERE pn.TRANGTHAI != 2
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
                WHERE pn.IDNCC = ? AND pn.TRANGTHAI != 2 
                ORDER BY pn.NGAYNHAP DESC
                LIMIT ? OFFSET ?;
                `,[id,linit,OFFSET]);
            const [countRows]= await execute(`
                SELECT COUNT(*) AS totalPhieuNhap
                FROM PHIEUNHAP
                WHERE IDNCC=? AND TRANGTHAI!=2
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
    static async HuyPhieuNhap(Idpn){
        try {
            const [result] = await execute(
                `UPDATE phieunhap
                    SET TRANGTHAI = 2, DELETE_AT = NOW()
                    WHERE IDPN = ?`,
                [Idpn]
            );

            if (result.affectedRows === 0) {
                return {
                    ThanhCong: false,
                    message: 'Không thể hủy phiếu nhập hoặc phiếu nhập đã được hủy trước đó!'
                };
            }

            return {
                ThanhCong: true,
                message: 'Hủy phiếu nhập thành công!'
            };
        } catch (error) {
            console.error('Lỗi khi hủy phiếu nhập:', error);
            return {
                ThanhCong: false,
                message: 'Có lỗi xảy ra khi hủy phiếu nhập!'
            };
        }
    }
    static async XoaPhieuNhap_ThungRac() {
    try {
        // Bước 1: Lấy danh sách ID phiếu nhập thỏa mãn điều kiện (Test 5 giây, thực tế nên là 30 ngày)
        // Lưu ý: Sử dụng INTERVAL 30 DAY cho môi trường thực tế
        const [rows] = await execute(
            `SELECT IDPN FROM phieunhap 
             WHERE TRANGTHAI = 2 AND DELETE_AT <= DATE_SUB(NOW(), INTERVAL 30 DAY)`
        );

        const idPhieuNhapToDelete = rows.map(row => row.IDPN);

        // Nếu không có phiếu nào cần xóa thì thoát sớm
        if (idPhieuNhapToDelete.length === 0) {
            return {
                ThanhCong: true,
                message: 'Không có dữ liệu quá hạn trong thùng rác.',
                dulieu: []
            };
        }

        // Bước 2: Duyệt từng phiếu nhập để xóa dữ liệu liên quan
        for (const idpn of idPhieuNhapToDelete) {
            
            // 2.1: Lấy danh sách ID sản phẩm thuộc phiếu nhập này
            const [sanphamRows] = await execute(
                `SELECT IDSANPHAM FROM chitiet_phieunhap WHERE IDPN = ?`, 
                [idpn]
            );
            const idsanphamList = sanphamRows.map(row => row.IDSANPHAM);

            // 2.2: Xóa dữ liệu ở các bảng con dựa trên ID sản phẩm
            for (const idsanpham of idsanphamList) {
                
                // Xóa hình ảnh sản phẩm
                const [xoaHA] = await execute(
                    `DELETE FROM hinhanh_sanpham WHERE IDSANPHAM = ?`, 
                    [idsanpham]
                );
                if (xoaHA.affectedRows === 0) {
                    console.log(`💡 Không có hình ảnh để xóa cho SP: ${idsanpham}`);
                }

                // Xóa kho IMEI (Rất quan trọng vì IMEI đi theo phiếu nhập cụ thể)
                const [xoaIMEI] = await execute(
                    `DELETE FROM kho_imei WHERE IDSANPHAM = ? AND ID_PHIEUNHAP = ?`, 
                    [idsanpham, idpn]
                );
                if (xoaIMEI.affectedRows === 0) {
                    console.warn(`💡 Không tìm thấy IMEI cho SP: ${idsanpham} thuộc phiếu: ${idpn}`);
                }

                // Xóa chi tiết phiếu nhập (Bảng trung gian)
                await execute(
                    `DELETE FROM chitiet_phieunhap WHERE IDPN = ? AND IDSANPHAM = ?`, 
                    [idpn, idsanpham]
                );

                // Xóa bảng sản phẩm chính 
                // CẢNH BÁO: Chỉ xóa nếu SP này không còn tồn tại trong bất kỳ phiếu nhập nào khác
                await execute(
                    `DELETE FROM sanpham WHERE IDSANPHAM = ?`, 
                    [idsanpham]
                );
            }

            // Bước 2.3: Cuối cùng mới xóa bản ghi ở bảng phieunhap
            const [xoaPN] = await execute(
                `DELETE FROM phieunhap WHERE IDPN = ?`, 
                [idpn]
            );
            
            if (xoaPN.affectedRows > 0) {
                console.log(`✅ Đã dọn dẹp vĩnh viễn phiếu nhập: ${idpn}`);
            }
        }

        return {
            ThanhCong: true,
            message: `Đã dọn dẹp sạch sẽ ${idPhieuNhapToDelete.length} phiếu nhập quá hạn!`,
            dulieu: idPhieuNhapToDelete
        };

    } catch (error) {
        console.error('❌ Lỗi tại PhieuNhapModal.XoaPhieuNhap_ThungRac:', error);
        return {
            ThanhCong: false,
            message: 'Lỗi hệ thống khi dọn dẹp thùng rác!',
            error: error.message
        };
    }
}   
    static async LayDanhSachPhieuNhap_DaXoa() {
    try {
        const [rows] = await execute(`
            SELECT  pn.IDPN,  ncc.TENNCC, pn.TONGTIEN, pn.DELETE_AT
            FROM phieunhap pn
            LEFT JOIN nhacungcap ncc ON pn.IDNCC = ncc.IDNCC
            WHERE pn.TRANGTHAI = 2
            ORDER BY pn.DELETE_AT DESC
        `);
        return {
            ThanhCong: true,
            DuLieu: rows
        };
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phiếu nhập đã xóa:', error);
        return {
            ThanhCong: false,
            DuLieu: [],
            message: 'Lỗi hệ thống khi lấy danh sách phiếu nhập đã xóa!'
        };
    }
}   
    static async khoiphuc_phieunhap(id){
        try {
            const [ketqqua] = await execute(`
                UPDATE phieunhap
                SET TRANGTHAI = 1 , DELETE_AT = NULL 
                WHERE IDPN = ?
                `,[id]);
          return  ketqqua.affectedRows>0 ? true : false;
        } catch (error) {
            console.log('Có lỗi xảy ra:' + error);
            return false;
        }
    }
    static async laythongke_phieunhap(){
        try {
            const [ketqua1, ketqua2 ] = await Promise.all([
                 execute(`
                    SELECT SUM(TONGTIEN) AS TongTien
                    FROM phieunhap
                    WHERE MONTH(NGAYNHAP) = MONTH(CURDATE()) AND YEAR(NGAYNHAP) = YEAR(CURDATE());
                `),
                execute(`
                    SELECT SUM(DA_THANHTOAN) AS DaThanhToan
                    FROM phieunhap
                    WHERE MONTH(NGAYNHAP) = MONTH(CURDATE()) AND YEAR(NGAYNHAP) = YEAR(CURDATE());
                    `)
            ])
            const tongTien = parseFloat(ketqua1[0][0].TongTien) || 0;
            const daThanhToan = parseFloat(ketqua2[0][0].DaThanhToan) || 0;
            const ConNo=tongTien-daThanhToan;
            return {
                sum:tongTien,
                da_thanhToan:daThanhToan,
                no:ConNo
            }
        } catch (error) {
            console.error('lỗi sảy ra:' + error);
            return {
                status:true,
                message:'Không thể truy vẫn dữ liệu!'
            }
        }
    }
    static async xoa_phieunhap_theoid(id){
        //Bước 1 : lấy IDSANPHAM từ bảng chitiet_sanpham
        const [idsp] = await execute(`
            SELECT IDSANPHAM 
            FROM chitiet_phieunhap
            WHERE IDPN = ?
            `,[id]);
         const IDSP = idsp.map(row => row.IDSANPHAM);
         //Bước 2 : Duyệt qua mảng IDSP
        for(const idsanpham of IDSP){
            //Bước 2.1 : Xóa bảng hinhanh_sanpham có IDSP
            const [XoaAnh] = await execute(`
                DELETE FROM hinhanh_sanpham
                WHERE IDSANPHAM = ?
                `,[idsanpham]);
            if(XoaAnh.affectedRows<=0) return false;
            //Bước 2.2 : xóa bảng kho_imei
            const [xoa_imei] = await execute(`
                DELETE FROM kho_imei
                WHERE IDSANPHAM = ? AND ID_PHIEUNHAP =?
                ` , [idsanpham,id]);
            if(xoa_imei.affectedRows<=0) return false;
            //Bước 2.3 : xóa chitiet_phieunhap
            const [xoa_chitiet] = await execute(`
                DELETE FROM chitiet_phieunhap
                WHERE IDPN = ? AND IDSANPHAM =?
                `,[id,idsanpham]);
            if(xoa_chitiet.affectedRows<=0) return false;
            //Bước 2.4 : xóa bảng sanpham
            const [xoa_sanpham] = await execute(`
                DELETE FROM sanpham 
                WHERE IDSANPHAM = ?
                `,[idsanpham]);
            if(xoa_sanpham.affectedRows<=0) return false;
        }
        //Bước 3 : xóa bảng phiểu nhâp;
        const [xoa_phieunhap] = await execute(`
            DELETE FROM phieunhap 
            WHERE IDPN =?
            `,[id]);
         return xoa_phieunhap.affectedRows>0 ? true : false;
    }
    static async xoa_tatca_phieunhap(){
        //lấy tất cả id có TRANGTHAI = 2 của bảng phieunhap;
        const [id] = await execute(`
            SELECT IDPN 
            FROM phieunhap
            WHERE TRANGTHAI = ?
            `,[2]);
        const IDPN = id.map(row => row.IDPN);
        for(const id of IDPN){
            const xoa = await PhieuNhapModal.xoa_phieunhap_theoid(id);
            if(!xoa){
                return false;
            }
        }
        return true;
    }
    static async dulieu_hoadon_nhapkho(id) {
    // 1. Lấy phiếu nhập
    const [phieuNhapRows] = await execute(`
        SELECT IDNCC, IDND, NGAYNHAP
        FROM phieunhap
        WHERE IDPN = ?
        LIMIT 1
    `, [id]);

    if (phieuNhapRows.length === 0) return null;
    const { IDNCC, IDND, NGAYNHAP } = phieuNhapRows[0];

    // 2. Lấy thông tin nhà cung cấp
    const [nccRows] = await execute(`
        SELECT TENNCC, DIACHI, MST
        FROM nhacungcap
        WHERE IDNCC = ?
        LIMIT 1
    `, [IDNCC]);
    const ThongTinNCC = nccRows[0] || {};

    // 3. Lấy thông tin người nhập
    const [ndRows] = await execute(`
        SELECT HOTEN
        FROM nguoidung
        WHERE IDND = ?
        LIMIT 1
    `, [IDND]);
    const NguoiNhap = ndRows[0] || {};

    // 4. Lấy chi tiết sản phẩm trong phiếu nhập
    const [ctRows] = await execute(`
        SELECT IDSANPHAM, SOLUONG, GIANHAP
        FROM chitiet_phieunhap
        WHERE IDPN = ?
    `, [id]);

    // 5. Với mỗi sản phẩm, lấy thêm thông tin
    const SANPHAM = [];
    for (const ct of ctRows) {
        // Lấy thông tin sản phẩm
        const [spRows] = await execute(`
            SELECT TENSANPHAM, THONGSO_KYTHUAT
            FROM sanpham
            WHERE IDSANPHAM = ?
            LIMIT 1
        `, [ct.IDSANPHAM]);

        const spInfo = spRows[0] || {};

        // Parse JSON để lấy MAUSAC
        let MAUSAC = null;
        try {
            const thongSo = JSON.parse(spInfo.THONGSO_KYTHUAT || "{}");
            MAUSAC = thongSo.MAUSAC || null;
        } catch (e) {
            console.error("Lỗi parse JSON:", e);
        }

        // Lấy MA_IMEI đầu tiên
        const [imeiRows] = await execute(`
            SELECT MA_IMEI
            FROM kho_imei
            WHERE IDSANPHAM = ?
            LIMIT 1
        `, [ct.IDSANPHAM]);

        const imeiInfo = imeiRows[0] || {};

        SANPHAM.push({
            IDSANPHAM: ct.IDSANPHAM,
            SOLUONG: ct.SOLUONG,
            GIANHAP: ct.GIANHAP,
            TENSANPHAM: spInfo.TENSANPHAM,
            MAUSAC: MAUSAC,
            MA_IMEI: imeiInfo.MA_IMEI
        });
    }

    // 6. Trả về object cuối cùng
    return {
        PhieuNhap: NGAYNHAP,
        ThongTinNCC: {
            Ten: ThongTinNCC.TENNCC,
            DiaChi: ThongTinNCC.DIACHI,
            mst: ThongTinNCC.MST
        },
        NguoiNhap: {
            HoTen: NguoiNhap.HOTEN
        },
        SANPHAM
    };
}

   
}
