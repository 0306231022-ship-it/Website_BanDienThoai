import {execute} from '../config/db.js';

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
}