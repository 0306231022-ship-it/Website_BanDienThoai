import { body , validationResult} from 'express-validator';
import adminModel from '../models/adminModel.js';
import DonHangModel from '../models/DonHang.js';
import SanPhamModel from '../models/SanPham.js';
import MaGiamGiaModel from '../models/MaGiamGia.js';
import CaiDatModel from '../models/CaiDatWebsite.js';
import { getDistance , getCoordinates , tinhPhiShip } from '../function.js';
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
        const DuLieu = req.body;
        const kiemtra_IDND = await adminModel.kiemtraid(DuLieu.IDND);
        if(!kiemtra_IDND){
            return res.json({
                ThanhCong:false,
                message:'Người dùng không tồn tại!'
            })
        }
        if(DuLieu.PhiVanChuyen===0){
            return res.json({
                ThanhCong:false,
                message:'Vui lòng kiểm tra lại địa chỉ nhận hàng!'
            })
        }
        try {
            const ketqua = await DonHangModel.MuaHang_NguoiDung(DuLieu);
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
    static async ChiTiet_DonHang(req,res){
        const iddh = req.query.id;
        const kiemtra_iddh = await DonHangModel.kiemtra_id_dh(iddh);
        if(!kiemtra_iddh){
            return res.json({
                ThanhCong:false,
                message:'Đơn hàng không tồn tại!'
            })
        }
        try {
            const ketqua = await DonHangModel.ChiTiet_DonHang(iddh);
            if(ketqua.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    ThongTin_KhachHang:ketqua.ThongTin_KhachHang,
                    ThongTin_SanPham:ketqua.ThongTin_SanPham,
                    TrangThai:ketqua.TrangThai
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
    static async Duyet_DonHang(req,res){
        const iddh = req.query.id;
        const kiemtra_iddh = await DonHangModel.kiemtra_id_dh(iddh);
        if(!kiemtra_iddh){
            return res.json({
                ThanhCong:false,
                message:'Đơn hàng không tồn tại!'
            })
        }
        try {
            const ketqua = await DonHangModel.Duyet_DonHang(iddh);
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
    static async Huy_DonHang(req,res){
        const { LyDoHuy, id } = req.body;
        const kiemtra_iddh = await DonHangModel.kiemtra_id_dh(id);
        if(!kiemtra_iddh){
            return res.json({
                ThanhCong:false,
                message:'Đơn hàng không tồn tại!'
            })
        }
        if(!LyDoHuy || LyDoHuy.trim() === ''){
            return res.json({
                ThanhCong:false,
                message:'Vui lòng cung cấp lý do hủy đơn hàng!'
            })
        }
        try {
            const ketqua = await DonHangModel.Huy_DonHang(id, LyDoHuy);
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
    static async DanhSach_DonHang_NguoiDung(req,res){
        const idnd = req.query.IDND;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const kiemtra_IDND = await adminModel.kiemtraid(idnd);
        if(!kiemtra_IDND){
            return res.json({
                ThanhCong:false,
                message:'Người dùng không tồn tại!'
            })
        }
        try {
            const ketqua = await DonHangModel.DanhSach_DonHang_NguoiDung(idnd, page, limit);
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
    static async ThongTinDonHang(req,res){
        const idnd = req.query.idnd;
        const IDDH = await DonHangModel.LayIDDH(idnd);
        if(IDDH===null){
            return res.json({
                ThanhCong:false,
                message:'Lỗi sãy ra khi truy vấn dữ liệu!'
            })
        };
        try {
            const ThongTin = await MaGiamGiaModel.LayGT_GIAM(idnd,IDDH.IDDH);
            if(ThongTin.ThanhCong){
                return res.json({
                    ThanhCong:true,
                    dulieu:ThongTin.dulieu
                })
            }else{
                return res.json({
                    ThanhCong:false,
                    message:ThongTin.message
                })
            }
        } catch (error) {
            console.error('Lỗi :' + error);
            return res.json({
                ThanhCong:false,
                message:'Đã có lỗi sãy ra, vui lòng kiểm tra lại!'
            })
        }

    }
   static async ThongTin_PhiVanChuyen(req, res) {
    try {
        const DiaChi_NguoiDung = req.query.DiaChi;
        const a = await CaiDatModel.LayThongTin_DiaChi();
        const DiaChi_website = a.DiaChi;
        const DiaChi1 = await getCoordinates(DiaChi_NguoiDung);
        const DiaChi2 = await getCoordinates(DiaChi_website);
        if(!DiaChi1||!DiaChi2){
            return res.json({
                ThanhCong:false,
                message:'Vui lòng nhập tỉnh/thành phố mà bạn ở thật chính xác!'
            })
        }
        const km = await getDistance(DiaChi1?.lat,DiaChi1?.lon, DiaChi2?.lat,DiaChi2?.lon);
        const phi= tinhPhiShip(km);
        return res.json({
            ThanhCong:true,
            PhiShip:phi
        })

    } catch (error) {
        console.error("Lỗi Server:", error);
        return res.json({
            ThanhCong: false,
            message: 'Máy chủ bận, vui lòng thử lại sau!'
        });
    }
}
    static async HuyDon_NguoiDung(req,res){
        const DuLieu = req.body;
        try {
            const kiemtra = DonHangModel.kiemtra_id_dh(DuLieu.IDDH);
        if(!kiemtra){
            return res.json({
                ThanhCong:false,
                message:'Vui lòng kiểm tra thông tin đơn hàng!'
            })
        }
        if(!DuLieu.LyDo){
             return res.json({
                ThanhCong:false,
                message:'Vui lòng kiểm tra thông tin đơn hàng!'
            })
        }
        const huydon = await DonHangModel.Huy_DonHang(DuLieu.IDDH,DuLieu.LyDo);
        if(huydon){
            return res.json({
                ThanhCong:true,
                message:'Hủy đơn hàng thành công!'
            })
        }else{
            return res.json({
                ThanhCong:false,
                message:'Hủy đơn hàng không thành công!'
            })
        }
        } catch (error) {
             console.error("Lỗi Server:", error);
        return res.json({
            ThanhCong: false,
            message: 'Máy chủ bận, vui lòng thử lại sau!'
        });
        }
    }
}
    