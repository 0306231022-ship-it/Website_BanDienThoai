import {execute , beginTransaction , rollbackTransaction , commitTransaction} from '../config/db.js';
import { TaoID } from '../function.js';

export default class SanPhamModel{
   static async lay_ds_sanpham(limit,opset){
        try {
            const [sanpham] =await execute(`
                SELECT 
                    sp.IDSANPHAM, 
                    sp.TENSANPHAM, 
                    MAX(ct.GIABAN) AS GIABAN, 
                    SUM(ct.SOLUONG) AS TONG_TONKHO,  
                    th.TENTHUONGHIEU,
                (SELECT ha.HINHANH 
                    FROM hinhanh_sanpham AS ha 
                    WHERE ha.IDSANPHAM = sp.IDSANPHAM 
                    ORDER BY ha.IDHA ASC 
                    LIMIT 1) AS HINHANH
            FROM sanpham AS sp
            LEFT JOIN chitiet_phieunhap AS ct 
                     ON sp.IDSANPHAM = ct.IDSANPHAM
            INNER JOIN thuonghieu AS th 
            ON th.IDTHUONGHIEU = sp.IDTHUONGHIEU
            WHERE sp.TRANGTHAI = 1
            GROUP BY sp.IDSANPHAM, sp.TENSANPHAM, th.TENTHUONGHIEU
            LIMIT ? OFFSET ?;
                `,[limit,opset])
            // lấy tổng số sản phẩm và tổng số trang
            const [[{total}]] = await execute(`
                SELECT COUNT(*) AS total    
                FROM sanpham
                WHERE TRANGTHAI = 1
            `);

            return {
                ThanhCong:true,
                sanpham:sanpham,
                total:total
            }
        } catch (error) {
            console.error('lỗi sãy ra:'+ error);
            return {
                status:true,
                message:'Lỗi hệ thống, Vui lòng kiểm tra lại!'
            }
        }
   }
   static async kiemtra_id_sp(id){
        try {
            const kiemtra = await execute(`
                SELECT TENSANPHAM
                FROM sanpham 
                WHERE IDSANPHAM=?
                LIMIT 1
                `,[id]);
            return  kiemtra.length > 0 ? true : false;
        } catch (error) {
            console.error('Có lỗi sãy ra :' + error);
            return false;
        }
   }
   static async layChiTietSP_theoid(id){
        try {
            const [sanpham] = await execute(`
                SELECT sp.*, ct.GIANHAP, ct.GIABAN
                FROM sanpham sp
                JOIN chitiet_phieunhap ct ON sp.IDSANPHAM = ct.IDSANPHAM
                WHERE sp.IDSANPHAM = ?
                `,[id]);
            const [hinhanh] = await execute(`
                SELECT IDHA , HINHANH 
                FROM hinhanh_sanpham
                WHERE IDSANPHAM = ? AND TRANGTHAI=?
                `,[id,1]);
            const [kho_imei] = await execute(`
                SELECT MA_IMEI
                FROM kho_imei
                WHERE IDSANPHAM = ? 
                `,[id]);
            const [nhacungcap] = await execute(`
                SELECT ncc.TENNCC, ncc.DIACHI
                FROM chitiet_phieunhap ct
                JOIN phieunhap pn ON ct.IDPN = pn.IDPN
                JOIN nhacungcap ncc ON pn.IDNCC = ncc.IDNCC
                WHERE ct.IDSANPHAM = ?
                LIMIT 1;
                `,[id])
            return {
                ThanhCong:true,
                dulieu:{
                    sanpham:sanpham,
                    hinhanh:hinhanh,
                    kho_imei:kho_imei,
                    nhacungcap:nhacungcap
                }
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return {
                status:true,
                message: 'Lỗi truy vấn dữ liệu. Vui lòng kiểm tra lại!'
            }
        }
   }
   static async CapNhat_TT_TT_SP(id){
        try {
            //kiểm tra idpn đã đc xác nhận chưa, nếu đã xác nhận thì không được xóa
           const [kiemtra] = await execute(`
            SELECT IDPN
            FROM chitiet_phieunhap ct
            JOIN phieunhap pn ON ct.IDPN = pn.IDPN
            WHERE ct.IDSANPHAM = ? AND pn.TRANGTHAI = ?
            `,[id, 1]);
            if (!kiemtra) {
                return false;
            }
            const [CapNhat] = await execute(`
                UPDATE sanpham 
                SET TRANGTHAI = ? , DELETE_AT = NOW()
                WHERE IDSANPHAM=?
                `,[0,id]);
            return CapNhat.affectedRows>0 ? true : false;
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return false;
        }
   }
   static async anpham_daxoa(limit, offset){
        try {
            const [SanPham] = await execute(`
               SELECT sp.IDSANPHAM,
                      sp.TENSANPHAM,
                      sp.DELETE_AT,
                      ct.IDPN,
                      ha.HINHANH
            FROM sanpham sp
            JOIN chitiet_phieunhap ct ON sp.IDSANPHAM = ct.IDSANPHAM
            JOIN (
                SELECT IDSANPHAM, HINHANH
                FROM hinhanh_sanpham
                WHERE IDHA = (
                      SELECT MIN(IDHA)
                      FROM hinhanh_sanpham h2
                      WHERE h2.IDSANPHAM = hinhanh_sanpham.IDSANPHAM
                )
            ) ha ON sp.IDSANPHAM = ha.IDSANPHAM
            WHERE sp.TRANGTHAI = ?
            LIMIT ? OFFSET ?;
                `,[0,limit,offset]);
            const [[{total}]] = await execute(`
                SELECT COUNT(*) AS total    
                FROM sanpham
                WHERE TRANGTHAI = 0
            `);
            return {
                ThanhCong:true,
                dulieu:SanPham,
                tongso:total
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return {
                status:true,
                message :'Không thể kết nối đến hệ thống vui lòng thử lại sau!'
            }
        }
   }
   static async khoiphuc_sanpham(id){
        try {
            const [xoa] = await execute(`
               UPDATE sanpham 
               SET TRANGTHAI = ? , DELETE_AT = NULL
               WHERE IDSANPHAM=?
                `,[1,id]);
            return xoa.affectedRows>0 ? true : false
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error)
            return false;
        }
   }
   static async xoa_sanpham_theoid(id){
        try {
           //Bước 1 : xóa kho_imei 
           const [xoa_kho_imei] = await execute(`
            DELETE FROM kho_imei 
            WHERE IDSANPHAM =?
            `,[id]);
            if(xoa_kho_imei.affectedRows===0) return false;
            

        } catch (error) {
            
        }
   }
   static async xoa_tatca_sanpham(){
        try {
            const [LayID_SP_DaXoa]= await execute(`
                SELECT IDSANPHAM
                FROM sanpham 
                WHERE TRANGTHAI = ?
                `,[0])
            const sanpham_xoa = LayID_SP_DaXoa.map(row => row.IDSANPHAM);
            const xoa_sp = await Promise.all(sanpham_xoa.map(id => SanPhamModel.xoa_sanpham_theoid(id)));
            if (xoa_sp.some(kq => !kq)) {
                return false;
            }
            return true;
        } catch (error) {
            console.error('Có lỗi sãy ra :' + error);
            return false;
        }
   }
   static async timkiem_sanpham(key){
        try {
          // tìm kiếm dựa trên 1 trong 3 thông ssos 
            const [ketqqua] = await execute(`
                SELECT sp.IDSANPHAM, sp.TENSANPHAM, th.TENTHUONGHIEU, ct.GIABAN, ct.SOLUONG, ha.HINHANH
                FROM sanpham sp
                JOIN thuonghieu th ON sp.IDTHUONGHIEU = th.IDTHUONGHIEU
                JOIN chitiet_phieunhap ct ON sp.IDSANPHAM = ct.IDSANPHAM
                JOIN (
                    SELECT IDSANPHAM, HINHANH
                    FROM hinhanh_sanpham
                    WHERE IDHA = (
                        SELECT MIN(IDHA)
                        FROM hinhanh_sanpham h2
                        WHERE h2.IDSANPHAM = hinhanh_sanpham.IDSANPHAM
                    )
                ) ha ON sp.IDSANPHAM = ha.IDSANPHAM
                WHERE (sp.TENSANPHAM LIKE ? OR sp.IDSANPHAM LIKE ?)
                GROUP BY sp.IDSANPHAM, sp.TENSANPHAM, th.TENTHUONGHIEU, ct.GIABAN, ct.SOLUONG, ha.HINHANH
                `,[`%${key.ten}%`, `%${key.ma}%`]);
            return {
                ThanhCong:true,
                dulieu:ketqqua
                }
            } catch (error) {
                console.error('Có lỗi sãy ra:' + error);
                return {
                    status:true,
                    message:'Lỗi khi truy vấn dữ liệu!'
                }
             }
        }
    static async TimKiem_sanpham_flash(key){
        try {
            const [ketqqua] = await execute(`
                SELECT sp.IDSANPHAM, sp.TENSANPHAM, th.TENTHUONGHIEU, ct.GIABAN, ct.SOLUONG, ha.HINHANH
                FROM sanpham sp
                JOIN thuonghieu th ON sp.IDTHUONGHIEU = th.IDTHUONGHIEU
                JOIN chitiet_phieunhap ct ON sp.IDSANPHAM = ct.IDSANPHAM
                JOIN (
                    SELECT IDSANPHAM, HINHANH
                    FROM hinhanh_sanpham
                    WHERE IDHA = (
                        SELECT MIN(IDHA)
                        FROM hinhanh_sanpham h2
                        WHERE h2.IDSANPHAM = hinhanh_sanpham.IDSANPHAM
                    )
                ) ha ON sp.IDSANPHAM = ha.IDSANPHAM
                WHERE sp.IDSANPHAM LIKE ? AND sp.IDTHUONGHIEU LIKE ?
                GROUP BY sp.IDSANPHAM, sp.TENSANPHAM, th.TENTHUONGHIEU, ct.GIABAN, ct.SOLUONG, ha.HINHANH
                `,[`%${key.IDSP}%`, `%${key.IDTHUONGHIEU}%`]);
            return {
                ThanhCong:true,
                DuLieu:ketqqua
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return {
                status:true,
                message:'Lỗi khi truy vấn dữ liệu!'
            }
        }
   }
    static async layDanhSachSanPhamMoi(opset, limit){
        //lấy 4 sản phẩm mới nhất dựa trên ngày tạo ,NGAYNHAP nằm ở bảng phieunhap
        try {
            const [ketqqua] = await execute(`
                SELECT sp.IDSANPHAM, sp.TENSANPHAM, th.TENTHUONGHIEU, ct.GIABAN, ct.SOLUONG, ha.HINHANH
                FROM sanpham sp
                JOIN thuonghieu th ON sp.IDTHUONGHIEU = th.IDTHUONGHIEU
                JOIN chitiet_phieunhap ct ON sp.IDSANPHAM = ct.IDSANPHAM
                JOIN phieunhap pn ON ct.IDPN = pn.IDPN
                JOIN (
                    SELECT IDSANPHAM, HINHANH
                    FROM hinhanh_sanpham
                    WHERE IDHA = (
                        SELECT MIN(IDHA)
                        FROM hinhanh_sanpham h2
                        WHERE h2.IDSANPHAM = hinhanh_sanpham.IDSANPHAM
                    )
                ) ha ON sp.IDSANPHAM = ha.IDSANPHAM
                WHERE sp.TRANGTHAI = 1
                ORDER BY pn.NGAYNHAP DESC
                LIMIT ? OFFSET ?;
                `, [limit, opset]);
                const [[{total}]] = await execute(`
                    SELECT COUNT(*) AS total    
                    FROM sanpham sp
                    JOIN chitiet_phieunhap ct ON sp.IDSANPHAM = ct.IDSANPHAM
                    JOIN phieunhap pn ON ct.IDPN = pn.IDPN
                    WHERE sp.TRANGTHAI = 1
                    ORDER BY pn.NGAYNHAP DESC
                `);
                if(ketqqua.length === 0){
                    return {
                        ThanhCong:false,
                        message:'Không có sản phẩm mới nào!'
                    }
                }
            return {
                ThanhCong:true,
                dulieu:ketqqua,
                total:total
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return {
                status:true,
                message:'Lỗi khi truy vấn dữ liệu!'
            }
        }

    }
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
                WHERE dh.IDKH = ?
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
                const [xoa_dh] = await conn.query(`
                    DELETE FROM donhang 
                    WHERE IDDH = ?
                `,[IDDH]);
                if(xoa_dh.affectedRows === 0){
                    await rollbackTransaction(conn);
                    return { 
                        ThanhCong:false, 
                        message:'Xóa sản phẩm khỏi giỏ hàng thất bại!' 
                    };
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
                WHERE dh.IDKH = ?
            `,[IDNGUOIDUNG]);
            return { ThanhCong:true, dulieu:ketqqua[0].SOLUONG };
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return { ThanhCong:false, message:'Lỗi khi truy vấn dữ liệu!' };
        }
    }
    static async layDanhSachSanPhamDeal(ids){
       // trong mảng ids có chứa các IDSANPHAM cần lấy thông tin
        try {
            const conn = await beginTransaction();
            const [ketqqua] = await conn.query(`
                SELECT ID_FS , IDSP
                FROM sanpham_flash
                WHERE IDSP IN (?)
            `,[ids]);
            if(ketqqua.length === 0){
                await rollbackTransaction(conn);
                return { ThanhCong:false, message:'Không có sản phẩm nào trong danh sách!' };
            }
            const id_fs = ketqqua.map(row => row.ID_FS);
            // kiểm tra trong bảng flash xem ngày hiện tại có nằm trong khoảng THOIGIAN_BAT và THOIGIAN_KETTHUC không
            const [kiemtra] = await conn.query(`
                SELECT IDFS
                FROM flash
                WHERE IDFS IN (?) AND NOW() BETWEEN THOIGIAN_BATDAU AND THOIGIAN_KETTHUC
            `,[id_fs]);
           if(kiemtra.length === 0){
                await rollbackTransaction(conn);
                return { ThanhCong:false, message:'Không có sản phẩm nào trong danh sách!' };
            }
            if(kiemtra.length > 0){
                //dựa vào ketqqua lọc ra IDSP nào có ID_FS nằm trong kiemtra
                const id_fs_hop_le = kiemtra.map(row => row.IDFS);
                const idsp_hop_le = ketqqua.filter(row => id_fs_hop_le.includes(row.ID_FS)).map(row => row.IDSP);
                const [ketqqua_sanpham] = await conn.query(`
                      SELECT sp.IDSANPHAM, 
                             sp.TENSANPHAM, 
                            (
                                SELECT ct.GIABAN
                                FROM chitiet_phieunhap ct
                                WHERE ct.IDSANPHAM = sp.IDSANPHAM
                            ) AS GIABAN_NHAP,
                            (
                                SELECT fs.GIABAN
                                FROM sanpham_flash fs
                                WHERE fs.IDSP = sp.IDSANPHAM AND fs.ID_FS IN (?)
                            ) AS GIABAN_FLASH
                    FROM sanpham sp
                    WHERE sp.IDSANPHAM IN (?)
                    LIMIT 1;
                `,[id_fs_hop_le, idsp_hop_le]);
                    await commitTransaction(conn);
                    if(ketqqua_sanpham.length === 0){
                        return { ThanhCong:false, message:'Không có sản phẩm nào trong danh sách!' };
                    }
                    return { ThanhCong:true, dulieu:ketqqua_sanpham };
            }else {
                await rollbackTransaction(conn);
                return { ThanhCong:false, message:'Không có sản phẩm nào trong danh sách!' };
            }
        } catch (error) {
            console.error('Có lỗi xảy ra:' + error);
            return { ThanhCong:false, message:'Lỗi khi truy vấn dữ liệu!' };
        }
    }
}