import { body , validationResult} from 'express-validator';
import adminModel from '../models/adminModel.js';
import DonHangModel from '../models/DonHang.js';
import SanPhamModel from '../models/SanPham.js';
export default class DonHangController{
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
                const ketqua = await DonHangModel.ThemGioHang_NguoiDung(IDSANPHAM, SOLUONG, IDNGUOIDUNG , GIABAN);
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
                const ketqua = await DonHangModel.GioHang_NguoiDung(idnd);
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
                 await DonHangModel.CapNhat_SoLuong_GioHang_NguoiDung(cartData);
                 return res.json({
                    ThanhCong: true,
                    message: 'Cập nhật giỏ hàng thành công!'
                });
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
            DonHangModel.kiemtra_id_dh(IDDH),
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
                const ketqua = await DonHangModel.Xoa_GioHang_NguoiDung(IDSANPHAM, IDDH);
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
                const ketqua = await DonHangModel.SoLuong_GioHang_NguoiDung(idnd);
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
   
    static async MuaHang_NguoiDung(req,res){
        const { idnd, hoTen, sdt, diaChi } = req.body;
        const kiemtra_IDND = await adminModel.kiemtraid(idnd);
        if(!kiemtra_IDND){
            return res.json({
                ThanhCong:false,
                message:'Người dùng không tồn tại!'
            })
        }
        await Promise.all([
            body('hoTen')
            .notEmpty()
            .withMessage('Vui lòng nhập họ tên người nhận!'),
            body('sdt')
            .notEmpty()
            .withMessage('Vui lòng nhập số điện thoại người nhận!')
            .matches(/^\d{10}$/)
            .withMessage('Số điện thoại phải có 10 chữ số!')
            .matches(/^0\d{9}$/)
            .withMessage('Số điện thoại phải bắt đầu bằng số 0!'),
            body('diaChi').notEmpty().withMessage('Vui lòng nhập địa chỉ giao hàng!')
        ]);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                Validate:true,
                errors: errors.array()
            });
        }
        try {
            // Xử lý logic mua hàng ở đây, ví dụ: tạo đơn hàng, lưu thông tin người nhận, v.v.
            const ketqua = await DonHangModel.MuaHang_NguoiDung(idnd, hoTen, sdt, diaChi);
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
    static async DanhSachDonHang(req,res){
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        try {
            const ketqua = await DonHangModel.DanhSachDonHang(page, limit);
            if(ketqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    dulieu:ketqua.dulieu,
                    tongso: ketqua.tongso,
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
    static async TimKiem_DonHang(req,res){
        const { iddh, tennguoidat, sdtnguoidat } = req.query;
        try {
            const ketqua = await DonHangModel.TimKiem_DonHang(iddh, tennguoidat, sdtnguoidat);
            if(ketqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    dulieu:ketqua.dulieu
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
}
    