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
}