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
                    DuLieu:ketqqua.sanpham
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
}