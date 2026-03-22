import adminModel from '../models/adminModel.js';
import SanPhamModel from '../models/SanPham.js';
export default class SanPhamController{
   static async lay_ds_sanpham(req,res){
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        try {
            const ketqqua = await SanPhamModel.lay_ds_sanpham(limit,offset)
            if(ketqqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    DuLieu:ketqqua.sanpham,
                    total:ketqqua.total
                })
            }
            if(ketqqua.status){
                return res.json({
                    status:true,
                    message:ketqqua.message
                })
            }
        } catch (error) {
            console.error('lỗi sãy ra :' + error);
            return res.json({
                status:true,
                message:'Lỗi hệ thống, Vui lòng kiểm tra lại!'
            })
        }
   }

   static async layChiTietSP_theoid(req,res){
        const id = req.query.id;
        if(!id){
            return res.json({
                status:true,
                message:'Vui lòng kiểm tra lại dữ liệu truyền đi!'
            })
        }
        const kiemtra = await SanPhamModel.kiemtra_id_sp(id);
        if(!kiemtra){
            return res.json({
                status:true,
                message:'Vui lòng kiểm tra lại dữ liệu!'
            })
        }
        try {
            const ketqqua = await SanPhamModel.layChiTietSP_theoid(id);
            if(ketqqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    dulieu:ketqqua.dulieu
                })
            }
            if(ketqqua.status){
                return res.json({
                    status:true,
                    message:ketqqua.message
                })
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                status:true,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
        }
   }
   static async CapNhat_TT_TT_SP(req,res){
        const id = req.query.id;
        if(!id){
            return res.json({
                status:true,
                message:'Vui lòng kiểm tra lại dữ liệu truyền đi!'
            })
        }
        const kiemtra = await SanPhamModel.kiemtra_id_sp(id);
        if(!kiemtra){
            return res.json({
                status:true,
                message:'Vui lòng kiểm tra lại dữ liệu!'
            })
        }
        try {
            const ketqqua = await SanPhamModel.CapNhat_TT_TT_SP(id);
            if(ketqqua){
                return res.json({
                    ThanhCong:true,
                    message: 'Đã chuyển sản phẩm này vào thùng rác!'
                })
            }else{
                return res.json({
                    ThanhCong:false,
                    message:'Chuyển vào thùng rác thất bại!'
                })
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                status:true,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
        }
   }
   static async sanpham_daxoa(req,res){
         const page = parseInt(req.query.page) || 1;
         const offset = (page - 1) * 10;
         try {
            const ketqqua = await SanPhamModel.anpham_daxoa(10,offset);
            if(ketqqua.status){
                return res.json({
                    status:true,
                    message:ketqqua.message
                })
            }
            if(ketqqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    dulieu:ketqqua.dulieu,
                    tongso:ketqqua.tongso
                })
            }
         } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                status:true,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
         }
   }
   static async khoiphuc_sanpham(req,res){
        const id = req.query.id;
        if(!id){
            return res.json({
                status:true,
                message:'Vui lòng kiểm tra lại dữ liệu truyền đi!'
            })
        }
        const kiemtra = await SanPhamModel.kiemtra_id_sp(id);
        if(!kiemtra){
            return res.json({
                status:true,
                message:'Vui lòng kiểm tra lại dữ liệu!'
            })
        }
        try {
            const ketqua = await SanPhamModel.khoiphuc_sanpham(id);
            if(ketqua){
                return res.json({
                    ThanhCong:true,
                    message:'Khôi phục sản phẩm thành công!'
                })
            }else{
                return res.json({
                    ThanhCong:false,
                    message:'Khôi phục sản phẩm thát bại!'
                })
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                status:true,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
        }
   }
   static async xoa_tatca_sanpham(req,res){
        try {
            const ketqqua = await SanPhamModel.xoa_tatca_sanpham();
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                status:true,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
        }
   }
    static async timkiem_sanpham(req,res){
       const key = {
        ten: req.query.ten || '',
        ma: req.query.ma || '',
        trangthai: req.query.trangthai || ''
       }
        try {
            const ketqqua = await SanPhamModel.timkiem_sanpham(key);
            if(ketqqua.status){
                return res.json({
                    status:true,
                    message:ketqqua.message
                })
            }
            if(ketqqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    dulieu:ketqqua.dulieu
                })
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                status:true,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
        }
    }
    static async TimKiem_sanpham_flash(req,res){
        const key = {
         IDSP: req.query.IDSP || '',
         IDTHUONGHIEU: req.query.IDTHUONGHIEU || ''
        }
            try {
                const ketqqua = await SanPhamModel.TimKiem_sanpham_flash(key);
                if(ketqqua.status){
                    return res.json({
                        status:true,
                        message:ketqqua.message
                    })
                }
                if(ketqqua.ThanhCong){
                    return res.json({
                        ThanhCong:true,
                        dulieu:ketqqua.DuLieu
                    })
                }
            } catch (error) {
                console.error('Có lỗi sãy ra:' + error);
                return res.json({
                    status:true,
                    message:'Lỗi khi truy vấn dữ liệu!'
                })
            }
    }
    static async layDanhSachSanPhamMoi(req,res){
        try {
            const ketqqua = await SanPhamModel.layDanhSachSanPhamMoi();
            if(ketqqua.status){
                return res.json({
                    status:true,
                    message:ketqqua.message
                })
            }
            if(ketqqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    dulieu:ketqqua.dulieu
                })
            }else{
                return res.json({
                    ThanhCong:false,
                    message:'Không có sản phẩm mới nào!'
                })
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                status:true,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
        }
    }
    static async ThemGioHang_NguoiDung(req,res){
        const { IDSANPHAM, SOLUONG, IDNGUOIDUNG , GIABAN } = req.body;
        const kiemtra_sanpham = await SanPhamModel.kiemtra_id_sp(IDSANPHAM);
        if(!kiemtra_sanpham){
            return res.json({
                ThanhCong:false,
                message:'Sản phẩm không tồn tại!'
            })
        }
        const kiemtra_IDND = await adminModel.kiemtraid(IDNGUOIDUNG);
        if(!kiemtra_IDND){
            return res.json({
                ThanhCong:false,
                message:'Người dùng không tồn tại!'
            })
        }
        try {
            const ketqua = await SanPhamModel.ThemGioHang_NguoiDung(IDSANPHAM, SOLUONG, IDNGUOIDUNG , GIABAN);
            if(ketqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    message:ketqua.message
                })
            }
            return res.json({
                ThanhCong:false,
                message:ketqua.message
            })
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                ThanhCong:false,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
        }
    }
    static async GioHang_NguoiDung(req,res){
        const idnd = req.query.idnd;
        const kiemtra_IDND = await adminModel.kiemtraid(idnd);
        if(!kiemtra_IDND){
            return res.json({
                ThanhCong:false,
                message:'Người dùng không tồn tại!'
            })
        }
        try {
            const ketqua = await SanPhamModel.GioHang_NguoiDung(idnd);
            if(ketqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    dulieu:ketqua.dulieu
                })
            }
            return res.json({
                ThanhCong:false,
                message:ketqua.message
            })
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                ThanhCong:false,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
        }
    }
    static async CapNhat_SoLuong_GioHang_NguoiDung(req,res){
        const dataString = req.query.data;
        const cartData = JSON.parse(dataString);
        try {
             await SanPhamModel.CapNhat_SoLuong_GioHang_NguoiDung(cartData);
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                ThanhCong:false,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
        }
    }
    static async Xoa_GioHang_NguoiDung(req,res){
       const dataString = req.query.data;
       const cartData = JSON.parse(dataString);
       const { IDSANPHAM, IDDH } = cartData[0];
       const [kiemtr_iddh, kiemtra_idsp] = await Promise.all([
        SanPhamModel.kiemtra_id_dh(IDDH),
        SanPhamModel.kiemtra_id_sp(IDSANPHAM)
         ]);
         if(!kiemtr_iddh){
            return res.json({
                ThanhCong:false,
                message:'Đơn hàng không tồn tại!'
            })
         }
         if(!kiemtra_idsp){
            return res.json({
                ThanhCong:false,
                message:'Sản phẩm không tồn tại!'
            })
         }
         try {
            const ketqua = await SanPhamModel.Xoa_GioHang_NguoiDung(IDSANPHAM, IDDH);
            if(ketqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    message:ketqua.message
                })
            }else{
                return res.json({
                    ThanhCong:false,
                    message:ketqua.message
                })
            }
         } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                ThanhCong:false,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
         }
    }
    static async SoLuong_GioHang_NguoiDung(req,res){
        const idnd = req.query.idnd;
        const kiemtra_IDND = await adminModel.kiemtraid(idnd);
        if(!kiemtra_IDND){
            return res.json({
                ThanhCong:false,
                message:'Người dùng không tồn tại!'
            })
        }
        try {
            const ketqua = await SanPhamModel.SoLuong_GioHang_NguoiDung(idnd);
            if(ketqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    dulieu:ketqua.dulieu
                })
            }
            return res.json({
                ThanhCong:false,
                message:ketqua.message
            })
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                ThanhCong:false,
                message:'Lỗi khi truy vấn dữ liệu!'
            })
        }
    }
}