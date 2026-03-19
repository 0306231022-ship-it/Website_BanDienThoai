import { body, validationResult } from "express-validator";
import FlashSaleModel from "../models/flash.js";
export default class FlashSaleController{
    static async ThemFlashSale(req,res){
        const dulieu = req.body;
        if(!dulieu){
            return res.json({
                status:true,
                message:'Vui lòng kiểm tra lại dữ liệu truyền đi!'
            })
        }
        await Promise.all([
            body('TenChienDich')
                .notEmpty()
                .withMessage('Vui lòng nhập tên chiến dịch!')
                .isLength({ max: 255 })
                .withMessage('Tên chiến dịch vượt quá ký tự cho phép!')
                .run(req),
            body('TrangThai')
                .notEmpty()
                .withMessage('Vui lòng chọn trạng thái chiến dịch!')
                .isIn(['active', 'inactive'])
                .withMessage('Trạng thái chiến dịch không hợp lệ!')
                .run(req),
            body('MauNen')
                .notEmpty()
                .withMessage('Vui lòng chọn màu nền cho chiến dịch!')
                .matches(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i)
                .withMessage('Màu nền không hợp lệ! Vui lòng nhập mã màu hex!')
                .run(req),
            body('BatDau')
                .notEmpty()
                .withMessage('Vui lòng chọn ngày bắt đầu cho chiến dịch!')
                .isISO8601()
                .withMessage('Ngày bắt đầu không hợp lệ! Vui lòng nhập định dạng ngày tháng hợp lệ!')
                .run(req),
            body('KetThuc')
                .notEmpty()
                .withMessage('Vui lòng chọn ngày kết thúc cho chiến dịch!')
                .isISO8601()
                .withMessage('Ngày kết thúc không hợp lệ! Vui lòng nhập định dạng ngày tháng hợp lệ!')
                .custom((value, { req }) => {
                    const startDate = new Date(req.body.BatDau);
                    const endDate = new Date(value);
                    if (endDate <= startDate) {
                        throw new Error('Ngày kết thúc phải sau ngày bắt đầu!');
                    }
                    return true;
                })
                .run(req),
            body('DanhSachSanPham')
                .isArray({ min: 1 })
                .withMessage('Vui lòng thêm ít nhất một sản phẩm vào chiến dịch!')
                .run(req),
            body('DanhSachSanPham.*.IDSANPHAM')
                .notEmpty()
                .withMessage('Mỗi sản phẩm phải có IDSANPHAM!')
                .run(req),
            body('DanhSachSanPham.*.GIAFLASHSALE')
                .notEmpty()
                .withMessage('Mỗi sản phẩm phải có GIAFLASHSALE!')
                .isNumeric()
                .withMessage('GIAFLASHSALE phải là một số!')
                .run(req),
            body('DanhSachSanPham.*.SOLUONG_MOBAN')
                .notEmpty()
                .withMessage('Mỗi sản phẩm phải có SOLUONG_MOBAN!')
                .isInt({ min: 1 })
                .withMessage('SOLUONG_MOBAN phải là một số nguyên dương!')
                .run(req),
            body('DanhSachSanPham.*.DABAN_AO')
                .notEmpty()
                .withMessage('Mỗi sản phẩm phải có DABAN_AO!')
                .isInt({ min: 0 })
                .withMessage('DABAN_AO phải là một số nguyên không âm!')
                .run(req)
        ]);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                Validate: true,                
                errors: errors.array() 
            });
        }
        try {
            const ketqua = await FlashSaleModel.ThemFlashSale(dulieu);
            if(ketqua){
                return res.json({
                    ThanhCong:true,
                    message:'Thêm chiến dịch Flash Sale thành công!'
                })
            }else{
                return res.json({
                    ThanhCong:false,
                    message:'Có lỗi xảy ra khi thêm chiến dịch Flash Sale!'
                })
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                ThanhCong:false,
                message:'Có lỗi xảy ra khi thêm chiến dịch Flash Sale!'
            });
        }
            
    }
    static async DanhSachFlashSale(req,res){
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;
        try {
            const ketqua = await FlashSaleModel.DanhSachFlashSale(limit, offset);
            if(ketqua.status){
                return res.json({
                    status:true,
                    message:ketqua.message
                })
            }
            if(ketqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    dulieu:ketqua.dulieu,
                    tongso:ketqua.tongso,
                    tongtrang: Math.ceil(ketqua.tongso / limit)
                })
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                status:true,
                message:'Có lỗi xảy ra khi lấy danh sách Flash Sale!'
            })
        }
    }
            
}
