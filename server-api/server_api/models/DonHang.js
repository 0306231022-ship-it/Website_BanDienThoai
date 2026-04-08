import {execute , beginTransaction , rollbackTransaction , commitTransaction} from '../config/db.js';
import { TaoID } from '../function.js';
import MaGiamGiaModel from './MaGiamGia.js';
export default class DonHangModel{
     static async ThemGioHang_NguoiDung(IDSANPHAM, SOLUONG, IDNGUOIDUNG , GIABAN){
    let conn;
    try {
        conn = await beginTransaction();
        const [kiemtra] = await conn.query(`
            SELECT dh.IDDH, dh.IDKH
            FROM donhang dh
            WHERE dh.IDKH = ? AND dh.TRANGTHAI = 0
        `,[IDNGUOIDUNG]);
        if(kiemtra.length > 0){
            let allIDDH = kiemtra.map(item => item.IDDH);
            const IDDH = allIDDH[0];
            // Kiểm tra sản phẩm đã tồn tại trong đơn hàng chưa
            const [kiemtra_sanpham] = await conn.query(`
                SELECT IDSANPHAM
                FROM chitiet_donhang
                WHERE IDDH = ? AND IDSANPHAM = ?
            `,[IDDH, IDSANPHAM]);
            if(kiemtra_sanpham.length > 0){
                // Nếu sản phẩm đã tồn tại thì cập nhật số lượng và giá bán
                const [capnhat] = await conn.query(`
                    UPDATE chitiet_donhang 
                    SET SOLUONG = SOLUONG + ?
                    WHERE IDDH = ? AND IDSANPHAM = ?
                `,[SOLUONG, IDDH, IDSANPHAM]);
                if(capnhat.affectedRows === 0){
                    await rollbackTransaction(conn);
                    return { 
                        ThanhCong:false, 
                        message:'Cập nhật giỏ hàng thất bại!' 
                    };
                }
                await commitTransaction(conn);
                return { 
                    ThanhCong:true, 
                    message:'Cập nhật giỏ hàng thành công!' 
                };
            } else {
                // Nếu sản phẩm chưa tồn tại thì thêm mới chi tiết đơn hàng
                const [them_chitiet] = await conn.query(`
                    INSERT INTO chitiet_donhang (IDCT, IDDH, IDSANPHAM, SOLUONG, DONGIA, THANHTIEN) 
                    VALUES (?, ?, ?, ?, ?, ?)
                `,[TaoID('CTDH'), IDDH, IDSANPHAM, SOLUONG, GIABAN, SOLUONG * GIABAN]);
                if(them_chitiet.affectedRows === 0){
                    await rollbackTransaction(conn);
                    return { 
                        ThanhCong:false, 
                        message:'Thêm chi tiết đơn hàng thất bại!' 
                    };
                }
                await commitTransaction(conn);
                return { 
                    ThanhCong:true, 
                    message:'Thêm vào giỏ hàng thành công!' 
                };
            }
        }else {
            // Nếu chưa có đơn hàng nào thì tạo mới đơn hàng và chi tiết
            const IDDH = TaoID('DH');
            const [them] = await conn.query(`
                INSERT INTO donhang (IDDH, IDKH, NGAYDAT, TRANGTHAI)
                VALUES (?, ?, NOW(), 0)
            `,[IDDH, IDNGUOIDUNG]);
            if(them.affectedRows === 0){
                await rollbackTransaction(conn);
                return { 
                    ThanhCong:false, 
                    message:'Thêm đơn hàng thất bại!' 
                };
            }
            const [them_chitiet] = await conn.query(`
                INSERT INTO chitiet_donhang (IDCT, IDDH, IDSANPHAM, SOLUONG, DONGIA, THANHTIEN) 
                VALUES (?, ?, ?, ?, ?, ?)
            `,[TaoID('CTDH'), IDDH, IDSANPHAM, SOLUONG, GIABAN, SOLUONG * GIABAN]);
            if(them_chitiet.affectedRows === 0){
                await rollbackTransaction(conn);
                return { 
                    ThanhCong:false, 
                    message:'Thêm chi tiết đơn hàng thất bại!' 
                };
            }
            await commitTransaction(conn);
            return { 
                ThanhCong:true, 
                message:'Thêm vào giỏ hàng thành công!' 
            };
        }
    } catch (error) {
        console.error('Có lỗi xảy ra:' + error);
        if(conn) await rollbackTransaction(conn);
        return { 
            ThanhCong:false,
             message:'Lỗi khi truy vấn dữ liệu!'
        };
    }
}
    static async GioHang_NguoiDung(IDNGUOIDUNG){
        try {
            //LẤY 1 HÌNH ẢNH CHO MỖI SAN PHẨM, NẾU CÓ NHIỀU HÌNH ẢNH THÌ LẤY HÌNH CÓ IDHA NHỎ NHẤT
            const [giohang] = await execute(`
                SELECT dh.IDDH, sp.IDSANPHAM, sp.TENSANPHAM, th.TENTHUONGHIEU, ct.DONGIA, ct.SOLUONG, ha.HINHANH 
                FROM donhang dh
                JOIN chitiet_donhang ct ON dh.IDDH = ct.IDDH
                JOIN sanpham sp ON ct.IDSANPHAM = sp.IDSANPHAM
                JOIN thuonghieu th ON sp.IDTHUONGHIEU = th.IDTHUONGHIEU
                JOIN hinhanh_sanpham ha ON sp.IDSANPHAM = ha.IDSANPHAM AND ha.IDHA = (
                    SELECT MIN(IDHA) 
                    FROM hinhanh_sanpham 
                    WHERE IDSANPHAM = sp.IDSANPHAM
                )
                WHERE dh.IDKH = ? AND dh.TRANGTHAI = 0
            `,[IDNGUOIDUNG]);
            return { ThanhCong:true, dulieu:giohang };
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return { ThanhCong:false, message:'Lỗi khi truy vấn dữ liệu!' };
        }
    }
    static async CapNhat_SoLuong_GioHang_NguoiDung(data){
        try {
            for (const item of data) {
                const { IDSANPHAM, SOLUONG, IDDH } = item;
                const [capnhat] = await execute(`
                    UPDATE chitiet_donhang 
                    SET SOLUONG = ?, THANHTIEN = DONGIA * ?
                    WHERE IDDH = ? AND IDSANPHAM = ?
                `,[SOLUONG, SOLUONG, IDDH, IDSANPHAM]);
                if(capnhat.affectedRows === 0){
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return false;
        }
    }
    static async kiemtra_id_dh(id){
        try {
            const [kiemtra] = await execute(`
                SELECT IDDH
                FROM donhang dh
                WHERE IDDH = ?
                LIMIT 1
            `,[id]);
            return kiemtra.length > 0 ? true : false;
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return false;
        }
    }
    static async Xoa_GioHang_NguoiDung( IDSANPHAM, IDDH){
        let conn;
        try {
            conn = await beginTransaction();
            const [xoa] = await conn.query(`
                DELETE FROM chitiet_donhang 
                WHERE IDDH = ? AND IDSANPHAM = ?
            `,[IDDH, IDSANPHAM]);
            if(xoa.affectedRows === 0){
                await rollbackTransaction(conn);
                return { 
                    ThanhCong:false, 
                    message:'Xóa sản phẩm khỏi giỏ hàng thất bại!' 
                };
            }
            const [kiemtra] = await conn.query(`
                SELECT IDDH
                FROM chitiet_donhang
                WHERE IDDH = ?
            `,[IDDH]);
            if(kiemtra.length === 0){
                const KiemTra = await MaGiamGiaModel.KiemTra_MaGímGia(IDDH);
                if(KiemTra){
                    const XoaMa = await MaGiamGiaModel.XoaMa_IDDH(IDDH);
                    if(!XoaMa){
                        await rollbackTransaction(conn);
                        return {
                            ThanhCong:false,
                            message:'Xóa sản phẩm khỏi giỏ hàng thất bại!'
                        }
                   }
                }
                const [Xoa_DonHang] = await conn.query(`
                    DELETE FROM donhang
                    WHERE IDDH = ?
                    `,[IDDH]);
                if(Xoa_DonHang.affectedRows===0){
                    await rollbackTransaction(conn);
                    return {
                         ThanhCong:false,
                         message:'Xóa sản phẩm khỏi giỏ hàng thất bại!'
                    }
                }
            }
            await commitTransaction(conn);
            return { 
                ThanhCong:true, 
                message:'Xóa sản phẩm khỏi giỏ hàng thành công!' 
            };
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return { ThanhCong:false, message:'Xóa sản phẩm khỏi giỏ hàng thất bại!' }  ;
        }
    }
        static async SoLuong_GioHang_NguoiDung(IDNGUOIDUNG){
        try {
            const [ketqqua] = await execute(`
                SELECT SUM(ct.SOLUONG) AS SOLUONG
                FROM chitiet_donhang ct
                JOIN donhang dh ON ct.IDDH = dh.IDDH
                WHERE dh.IDKH = ? AND dh.TRANGTHAI = 0
            `,[IDNGUOIDUNG]);
            return { ThanhCong:true, dulieu:ketqqua[0].SOLUONG };
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return { ThanhCong:false, message:'Lỗi khi truy vấn dữ liệu!' };
        }
    }
    static async MuaHang_NguoiDung(DuLieu){
        let conn;
        try {
            conn = await beginTransaction();
            const [kiemtra] = await conn.query(`
                SELECT IDDH
                FROM donhang
                WHERE IDKH = ? AND TRANGTHAI = 0
            `,[DuLieu.IDND]);
            if(kiemtra.length === 0){
                await rollbackTransaction(conn);
                return { 
                    ThanhCong:false, 
                    message:'Không có đơn hàng nào để mua!' 
                };
            }
            const IDDH = kiemtra[0].IDDH;
            const [capnhat_dh] = await conn.query(`
                UPDATE donhang 
                SET TRANGTHAI = 1, TEN_NGUOINHAN = ?, SDT_NGUOINHAN = ?, DIACHI_GIAOHANG = ?, NGAYDAT = NOW()
                WHERE IDDH = ?
            `,[DuLieu.TenNguoiNhan, DuLieu.SDT, DuLieu.DiaChiNhanHang, IDDH]);
            if(capnhat_dh.affectedRows === 0){
                await rollbackTransaction(conn);
                return { 
                    ThanhCong:false, 
                    message:'Mua hàng thất bại!' 
                };
            }
            // Trong chitiet_donhang lấy IDSANPHAM và SOLUONG để cập nhật lại số lượng tồn kho trong bảng chitiet_phieunhap
            const [chitiet] = await conn.query(`
                SELECT IDSANPHAM, SOLUONG
                FROM chitiet_donhang
                WHERE IDDH = ?
            `,[IDDH]);
            for (const item of chitiet) {
                const { IDSANPHAM, SOLUONG } = item;
                const [capnhat_kho] = await conn.query(`
                    UPDATE chitiet_phieunhap
                    SET SOLUONG = SOLUONG - ?
                    WHERE IDSANPHAM = ? AND SOLUONG >= ?
                    LIMIT 1
                `,[SOLUONG, IDSANPHAM, SOLUONG]);
                if(capnhat_kho.affectedRows === 0){
                    await rollbackTransaction(conn);
                    return { 
                        ThanhCong:false, 
                        message:'Mua hàng thất bại do số lượng tồn kho không đủ!' 
                    };
                }
            }
            const [capnhat_tongtien] = await conn.query(`
                UPDATE donhang
                SET TONGTIEN = ?
                WHERE IDDH = ?
            `,[DuLieu.TongHang, IDDH]);
            if(capnhat_tongtien.affectedRows === 0){
                await rollbackTransaction(conn);
                return {
                    ThanhCong:false,
                    message:'Mua hàng thất bại do lỗi cập nhật tổng tiền!' 
                };
            }
            // thêm dữ liệu vào bảng hoadon_banhang
            const [them_hoadon] = await conn.query(`
                INSERT INTO hoadon_banhang (IDHD, IDDH, THANHTIEN, TRANGTHAI , PHIVANCHUYEN ,TONGTIEN)
                VALUES (?, ?, ?, ? ,? ,?)
            `,[TaoID('HD'), IDDH, DuLieu.TongHang, 0, DuLieu.PhiVanChuyen , DuLieu.TongHang-DuLieu.Ma+DuLieu.PhiVanChuyen]);
            if(them_hoadon.affectedRows === 0){
                await rollbackTransaction(conn);
                return {
                    ThanhCong:false,
                    message:'Mua hàng thất bại do lỗi tạo hóa đơn!' 
                };
            }
            await commitTransaction(conn);
            return { 
                ThanhCong:true, 
                message:'Mua hàng thành công!' 
            };
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            if(conn) await rollbackTransaction(conn);
            return { 
                ThanhCong:false, 
                message:'Lỗi khi truy vấn dữ liệu!' 
            };
        }
    }
    static async DanhSachDonHang(page, limit){
        try {
            const offset = (page - 1) * limit;
            const [ketqua] = await execute(`
                SELECT hd.IDDH,
                       dh.TEN_NGUOINHAN,
                       dh.NGAYDAT,
                       hd.TRANGTHAI
                FROM hoadon_banhang hd
                JOIN donhang dh ON dh.IDDH = hd.IDDH
                LEFT JOIN chitiet_donhang ct ON ct.IDDH = hd.IDDH
                GROUP BY hd.IDDH, dh.TEN_NGUOINHAN, dh.NGAYDAT, hd.TRANGTHAI
                ORDER BY dh.NGAYDAT DESC
                LIMIT ? OFFSET ?;
                `,[limit, offset]);
            const [total] = await execute(`
                SELECT COUNT(*) AS total
                FROM hoadon_banhang hd
            `);
            return { 
                ThanhCong:true, 
                dulieu:ketqua,
                tongso: total[0].total
            };
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return { 
                ThanhCong:false, 
                message:'Lỗi khi truy vấn dữ liệu!' 
            };
        }
    }
    static async TimKiem_DonHang(iddh, tennguoidat, sdtnguoidat){
         try {
            let query = `
                SELECT hd.IDDH,
                          dh.TEN_NGUOINHAN,
                            dh.NGAYDAT,
                            hd.TRANGTHAI
                FROM hoadon_banhang hd
                JOIN donhang dh ON dh.IDDH = hd.IDDH
                LEFT JOIN chitiet_donhang ct ON ct.IDDH = hd.IDDH
                WHERE 1=1
            `;
            const params = [];
            if(iddh) {
                query += ' AND hd.IDDH = ?';
                params.push(iddh);
            }
            if(tennguoidat) {
                query += ' AND dh.TEN_NGUOINHAN LIKE ?';
                params.push(`%${tennguoidat}%`);
            }
            if(sdtnguoidat) {
                query += ' AND dh.SDT_NGUOINHAN LIKE ?';
                params.push(`%${sdtnguoidat}%`);
            }
            const [ketqua] = await execute(query, params);
            return { 
                ThanhCong:true, 
                dulieu:ketqua
            };
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return { 
                ThanhCong:false, 
                message:'Lỗi khi truy vấn dữ liệu!' 
            };
        }
    }
    static async ChiTiet_DonHang(iddh){
        try {
            const [ketqua] = await execute(`
                SELECT dh.TEN_NGUOINHAN,
                       dh.SDT_NGUOINHAN,
                       dh.DIACHI_GIAOHANG,
                       dh.NGAYDAT
                FROM donhang dh
                WHERE dh.IDDH = ?;
            `,[iddh]);
            if(ketqua.length === 0){
                return { 
                    ThanhCong:false, 
                    message:'Không tìm thấy đơn hàng!' 
                };
            }
            // LẤY THÔNG TIN SẢN PHÂM
            const [sanpham] = await execute(`
                SELECT sp.TENSANPHAM,
                        sp.IDSANPHAM,
                       ct.SOLUONG,
                       ct.DONGIA,
                       ct.THANHTIEN,
                          ha.HINHANH
                FROM chitiet_donhang ct
                JOIN sanpham sp ON ct.IDSANPHAM = sp.IDSANPHAM
                LEFT JOIN hinhanh_sanpham ha ON sp.IDSANPHAM = ha.IDSANPHAM AND ha.IDHA = (
                    SELECT MIN(IDHA) 
                    FROM hinhanh_sanpham 
                    WHERE IDSANPHAM = sp.IDSANPHAM
                )
                WHERE ct.IDDH = ?;
            `,[iddh]);
            // lấy TRANGTHAI DONHANG 
            const [trangthai] = await execute(`
                SELECT TRANGTHAI
                FROM hoadon_banhang
                WHERE IDDH = ?;
            `,[iddh]);
            return { 
                ThanhCong:true, 
                ThongTin_KhachHang: ketqua[0],
                ThongTin_SanPham: sanpham,
                TrangThai: trangthai.length > 0 ? trangthai[0].TRANGTHAI : null
            };
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return { 
                ThanhCong:false, 
                message:'Lỗi khi truy vấn dữ liệu!' 
            };
        }
    }
    static async Duyet_DonHang(iddh){
        let conn;
        try {
            conn = await beginTransaction();
            const [capnhat] = await conn.query(`
                UPDATE hoadon_banhang
                SET TRANGTHAI = 1, NGAY_XACNHAN = NOW()
                WHERE IDDH = ?
            `,[iddh]);
            if(capnhat.affectedRows === 0){
                await rollbackTransaction(conn);
                return { 
                    ThanhCong:false, 
                    message:'Duyệt đơn hàng thất bại!' 
                };
            }
            // trong chitiet_donhang  lấy mảng IDSANPHAM
            const [chitiet] = await conn.query(`
                SELECT IDSANPHAM, SOLUONG
                FROM chitiet_donhang
                WHERE IDDH = ?
            `,[iddh]);
            for (const item of chitiet) {
                // LẤY MA_IMEI THEO SOLUONG SẢN PHẨM, cẬP NHẬT TRẠNG THÁI CỦA MẢ IMEI ĐÓ SANG 1 (ĐÃ BÁN)
                const [capnhat_imei] = await conn.query(`
                    UPDATE kho_imei
                    SET TRANGTHAI = 1 , ID_DONHANG = ?
                    WHERE IDSANPHAM = ?
                    LIMIT ?
                `,[iddh, item.IDSANPHAM, item.SOLUONG]);
                if(capnhat_imei.affectedRows === 0){
                    await rollbackTransaction(conn);
                    return { 
                        ThanhCong:false, 
                        message:'Duyệt đơn hàng thất bại do lỗi cập nhật kho IMEI!' 
                    };
                }
            }
            await commitTransaction(conn);
            return { 
                ThanhCong:true, 
                message:'Duyệt đơn hàng thành công!' 
            };
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return { 
                ThanhCong:false, 
                message:'Lỗi khi truy vấn dữ liệu!' 
            };
        }
    }
    static async Huy_DonHang(iddh, LyDoHuy){
        let conn;
        try {
            conn = await beginTransaction();
            const [capnhat] = await conn.query(`
                UPDATE hoadon_banhang
                SET TRANGTHAI = 2, GHICHU = ?, NGAY_XACNHAN = NOW()
                WHERE IDDH = ?
            `,[LyDoHuy, iddh]);
            if(capnhat.affectedRows === 0){
                await rollbackTransaction(conn);
                return { 
                    ThanhCong:false, 
                    message:'Hủy đơn hàng thất bại!' 
                };
            }
            // trong chitiet_donhang  lấy mảng IDSANPHAM
            const [chitiet] = await conn.query(`
                SELECT IDSANPHAM, SOLUONG
                FROM chitiet_donhang
                WHERE IDDH = ?
            `,[iddh]);
            for (const item of chitiet) {
                const [capnhat_kho] = await conn.query(`
                    UPDATE chitiet_phieunhap
                    SET SOLUONG = SOLUONG + ?
                    WHERE IDSANPHAM = ?
                    LIMIT 1
                `,[item.SOLUONG, item.IDSANPHAM]);
                if(capnhat_kho.affectedRows === 0){
                    await rollbackTransaction(conn);
                    return { 
                        ThanhCong:false, 
                        message:'Hủy đơn hàng thất bại do lỗi cập nhật kho!' 
                    };
                }
            }
            const kiemtra_mgg = await MaGiamGiaModel.KiemTra_MaGímGia(iddh);
            if(kiemtra_mgg){
                const xoa_mgg = await MaGiamGiaModel.XoaMa_IDDH(iddh);
                if(!xoa_mgg){
                    await rollbackTransaction(conn);
                    return {
                        ThanhCong:false,
                        message:'Hủy đơn hàng thất bại!'
                    }
                }
            }
            await commitTransaction(conn);
            return { 
                ThanhCong:true, 
                message:'Hủy đơn hàng thành công!' 
            };
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return { 
                ThanhCong:false, 
                message:'Lỗi khi truy vấn dữ liệu!' 
            };
         }
    }
    static async DanhSach_DonHang_NguoiDung(idnd, page, limit){
        try {
            const offset = (page - 1) * limit;
            const [ketqua] = await execute(`
                SELECT dh.IDDH,
                    dh.NGAYDAT,
                    (
                        SELECT ct.TRANGTHAI
                        FROM hoadon_banhang ct
                        WHERE ct.IDDH = dh.IDDH
                        LIMIT 1
                    ) AS TRANGTHAI_DONHANG,
                    hd.THANHTIEN AS THANHTIEN_DONHANG,
                    hd.GHICHU
                    FROM donhang dh
                    JOIN hoadon_banhang hd ON dh.IDDH = hd.IDDH
                    WHERE dh.IDKH = ? AND dh.TRANGTHAI != 0
                    ORDER BY dh.NGAYDAT DESC
                    LIMIT ? OFFSET ?;
            `,[idnd, limit, offset]);
            const [total] = await execute(`
                SELECT COUNT(*) AS total
                FROM donhang dh
                JOIN hoadon_banhang hd ON dh.IDDH = hd.IDDH
                WHERE dh.IDKH = ? AND dh.TRANGTHAI != 0;
            `,[idnd]);
            return {
                ThanhCong:true,
                dulieu:ketqua,
                tongso: total[0].total
            };
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return { 
                ThanhCong:false, 
                message:'Lỗi khi truy vấn dữ liệu!' 
            };
        }
    }
    static async LayIDDH(id){
        try {
             const [ketqua] = await execute(`
                SELECT IDDH 
                FROM donhang
                WHERE IDKH=? AND TRANGTHAI=0
            `,[id]);
            return ketqua.length>0 ? ketqua[0] : null;
        } catch (error) {
            console.error('Có lỗi sãy ra khi lấy IDDH:' + error);
            return null;
        }
       
    }
}