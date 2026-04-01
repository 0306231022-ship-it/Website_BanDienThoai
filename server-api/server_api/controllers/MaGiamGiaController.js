import { body, validationResult } from "express-validator";
import MaGiamGiaModel from "../models/MaGiamGia.js";
export default class MaGiamGiaController{
    static async ThemMaGiamGia(req,res){
        const dulieu = req.body;
        if(!dulieu){
            return res.json({
                ThanhCong:false,
                message:'Vui lòng kiểm tra lại dữ liệu truyền đi!'
            })
        }
        Promise.all([
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
                .isIn(['percentage', 'fixed'])
                .withMessage('Loại giảm giá không hợp lệ!')
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
            ]).then(async () => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.json({
                        ThanhCong: false,
                        Validate: true,
                        errors: errors.array()
                    });
                    }}).catch(error => {
                        console.error('Có lỗi xảy ra trong quá trình validate dữ liệu:', error);
                        return res.json({
                            ThanhCong: false,
                            message: 'Có lỗi xảy ra trong quá trình validate dữ liệu!'
                        });
                    });
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
        const kiemtra = await DonHangModel.KiemTraGioHang(IDND);
        if(!kiemtra){
            return res.json({
                ThanhCong: false,
                dulieu: [],
                message: 'Không có sản phẩm nào trong giỏ hàng!'
            });
        }
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
}