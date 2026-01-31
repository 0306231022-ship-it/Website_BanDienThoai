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
        const kiemtra = SanPhamModel.kiemtra_id_sp(id);
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
}