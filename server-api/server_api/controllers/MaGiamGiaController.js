import { body, validationResult } from "express-validator";
import MaGiamGiaModel from "../models/MaGiamGia.js";
import DonHangModel from "../models/DonHang.js";
export default class MaGiamGiaController{
    static async ThemMaGiamGia(req,res){
        const dulieu = req.body;
        if(!dulieu){
            return res.json({
                ThanhCong:false,
                message:'Vui lòng kiểm tra lại dữ liệu truyền đi!'
            })
        }
        await Promise.all([
                body('tenChuongTrinh')
                    .notEmpty()
                    .withMessage('Vui lòng nhập tên chương trình!')
                    .isLength({ max: 255 })
                    .withMessage('Tên chương trình vượt quá ký tự cho phép!')
                    .run(req),
                body('magiamgia')
                    .notEmpty()
                    .withMessage('Vui lòng nhập mã giảm giá!')
                    .isLength({ max: 50 })
                    .withMessage('Mã giảm giá vượt quá ký tự cho phép!')
                    .run(req),
                body('loaiGiamGia')
                    .notEmpty()
                    .withMessage('Vui lòng chọn loại giảm giá!')
                    .isInt({ min: 0, max: 1 })
                    .withMessage('Loại giảm giá phải là 0 hoặc 1!')
                    .run(req),
                body('giaTriGiam')
                    .notEmpty()
                    .withMessage('Vui lòng nhập giá trị giảm!')
                    .isFloat({ gt: 0 })
                    .withMessage('Giá trị giảm phải là số dương!')
                    .run(req),
                body('giaTriDonHangToiThieu')
                    .notEmpty()
                    .withMessage('Vui lòng nhập giá trị đơn hàng tối thiểu!')
                    .isFloat({ gt: 0 })
                    .withMessage('Giá trị đơn hàng tối thiểu phải là số dương!')
                    .run(req),
                body('apDungChoHang')
                    .notEmpty()
                    .withMessage('Vui lòng nhập mã hãng áp dụng!')
                    .isLength({ max: 50 })
                    .withMessage('Mã hãng áp dụng vượt quá ký tự cho phép!')
                    .run(req),
                body('tongLuotSuDung')
                    .notEmpty()
                    .withMessage('Vui lòng nhập tổng lượt sử dụng!')
                    .isInt({ gt: 0 })
                    .withMessage('Tổng lượt sử dụng phải là số nguyên dương!')
                    .run(req),
                body('luotDungMoiKhach')
                    .notEmpty()
                    .withMessage('Vui lòng nhập lượt dùng cho mỗi khách!')
                    .isInt({ gt: 0 })
                    .withMessage('Lượt dùng cho mỗi khách phải là số nguyên dương!')
                    .run(req),
                body('ngayBatDau')
                    .notEmpty()
                    .withMessage('Vui lòng chọn ngày bắt đầu!')
                    .isISO8601()
                    .withMessage('Ngày bắt đầu không hợp lệ! Vui lòng nhập định dạng ngày tháng hợp lệ!')
                    .run(req),
                body('ngayKetThuc')
                    .notEmpty()
                    .withMessage('Vui lòng chọn ngày kết thúc!')
                    .isISO8601()
                    .withMessage('Ngày kết thúc không hợp lệ! Vui lòng nhập định dạng ngày tháng hợp lệ!')
                    .custom((value, { req }) => {
                        const startDate = new Date(req.body.ngayBatDau);
                        const endDate = new Date(value);
                        if (endDate <= startDate) {
                            throw new Error('Ngày kết thúc phải sau ngày bắt đầu!');
                        }
                        return true;
                    })
                    .run(req),
            ]);
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    Validate: true, 
                    errors: errors.array()
                });
            }
        try {
            const ketqua = await MaGiamGiaModel.ThemMaGiamGia(dulieu);
            if(ketqua){
                return res.json({
                    ThanhCong:true,
                    message:'Thêm mã giảm giá thành công!'
                })
            }else{
                return res.json({
                    ThanhCong:false,
                    message:'Có lỗi xảy ra khi thêm mã giảm giá!'
                })
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm mã giảm giá:' + error);
            return res.json({
                ThanhCong: false,
                message: 'Có lỗi xảy ra khi thêm mã giảm giá!'
            });
        }
    }
    static async DanhSachMaGiamGia(req,res){
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        try {
            const ketqua = await MaGiamGiaModel.DanhSachMaGiamGia(page, limit);
            if(ketqua.ThanhCong){
                return res.json({
                    ThanhCong: true,
                    dulieu: ketqua.dulieu,
                    total: ketqua.total
                });
            }else{
                return res.json({
                    ThanhCong: false,
                    dulieu: [],
                    total: 0,
                    message: 'Không thể lấy danh sách mã giảm giá!'
                });
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy danh sách mã giảm giá:' + error);
            return res.json({
                ThanhCong: false,
                message: 'Có lỗi xảy ra khi lấy danh sách mã giảm giá!'
            });
        }
    }
    static async LayMaGiamGia_NguoiDung(req,res){
        const IDND = req.query.idnd;
        try {
            const ketqua = await MaGiamGiaModel.LayMaGiamGia_NguoiDung(IDND);
            if(ketqua.ThanhCong){
                return res.json({
                    ThanhCong: true,
                    dulieu: ketqua.dulieu
                });
            }else{
                return res.json({
                    ThanhCong: false,
                    dulieu: [],
                    message: 'Không thể lấy mã giảm giá cho người dùng!'
                });
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi lấy mã giảm giá cho người dùng:' + error);
            return res.json({
                ThanhCong: false,
                message: 'Có lỗi xảy ra khi lấy mã giảm giá cho người dùng!'
            });
        }
    }
    static async ThemMaGiamGia_NguoiDung(req,res){
        const dulieu = req.body;
        const IDDH = await DonHangModel.LayIDDH(dulieu.IDND);
        if(IDDH===null){
            return res.json({
                ThanhCong:false,
                message:'Lỗi sãy ra khi truy vấn dữ liệu!'
            })
        }
        try {
            const kiemtra = await MaGiamGiaModel.kiemtra_magg_nguoidung(IDDH.IDDH,dulieu.IDND);
            if(!kiemtra){
               // xóa mã cũ đã áp dụng và thêm mới vào DB
               const Xoa_MaCu= await MaGiamGiaModel.XoaMa_Cu(IDDH.IDDH,dulieu.IDND);
               if(Xoa_MaCu){
                    const ThemGT = await MaGiamGiaModel.Ap_mgg_nguoidung(dulieu.MaGG,dulieu.IDND ,IDDH.IDDH);
                    if(ThemGT){
                        return res.json({
                            ThanhCong:true,
                            message:'Thêm mã giảm giá vào đơn hàng thành công!'
                        })
                    }else{
                        return res.json({
                            ThanhCong:false,
                            message:'Thêm mã giảm giá cho đơn hàng thất bại!'
                        })
                    }
               }else{
                    return res.json({
                        ThanhCong:false,
                        message:'Lỗi sãy ra, Vui lòng kiểm tra lại!'
                    })
               }
            }
            const ThemGT = await MaGiamGiaModel.Ap_mgg_nguoidung(dulieu.MaGG,dulieu.IDND ,IDDH.IDDH);
            if(ThemGT){
                return res.json({
                    ThanhCong:true,
                    message:'Thêm mã giảm giá vào đơn hàng thành công!'
                })
            }else{
                return res.json({
                    ThanhCong:false,
                    message:'Thêm mã giảm giá cho đơn hàng thất bại!'
                })
            }
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                    ThanhCong:false,
                    message:'Thêm mã giảm giá cho đơn hàng thất bại!'
                })
        }
    }
    static async LayMaGiamGia_idth(req,res){
        const dulieu = req.query.data;
        try {
            const layma = await MaGiamGiaModel.LayMaGiamGia_idth(dulieu);
            if (layma.ThanhCong) {
                return res.json({
                    ThanhCong: true,
                    dulieu: layma.dulieu
                });
            }
            return res.json({
                ThanhCong: false,
                dulieu: [],
                message: layma.message || 'Không thể lấy mã giảm giá theo thương hiệu!'
            });
        } catch (error) {
            console.error('Có lỗi sãy ra:' + error);
            return res.json({
                ThanhCong:false,
                message:'Đã có lỗi sãy ra! Vui lòng thực hiện sau.'
            });
        }

    }
}