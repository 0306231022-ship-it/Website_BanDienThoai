import { Router } from "express";
import CanhanADController from "../controllers/CaNhanADController.js";
import DonHangController from "../controllers/DonHangController.js";
import  MaGiamGiaController from "../controllers/MaGiamGiaController.js";
const NguoiDungRoute = Router();
import multer from "multer";
const upload = multer();
// PHẦN I : ĐỊNH NGHĨA ROUTE POST admin
//=========================================
// PHẦN II : ĐỊNH NGHĨA ROUTE POST NguoiDung
//xử lí tài khoản người dùng
NguoiDungRoute.post('/DangKy', upload.none(), CanhanADController.DangKy_NguoiDung);
NguoiDungRoute.post('/dangnhap', upload.none(), CanhanADController.DangNhap_NguoiDung);
NguoiDungRoute.post('/kiemtra',upload.none(), CanhanADController.KiemTraDangNhap_NguoiDung);
NguoiDungRoute.post('/dangxuat_nguoidung',upload.none(), CanhanADController.DangXuat_NguoiDung);
NguoiDungRoute.post('/ChinhSuaDiaChi',upload.none(), CanhanADController.ChinhSuaDiaChi_NguoiDung);
// xử lí sản phẩm thuộc người dùng
NguoiDungRoute.post('/ThemGioHang',upload.none(), DonHangController.ThemGioHang_NguoiDung);
NguoiDungRoute.post('/MuaHang',upload.none(), DonHangController.MuaHang_NguoiDung);
NguoiDungRoute.post('/HuyDon_NguoiDung' , upload.none(), DonHangController.HuyDon_NguoiDung);
//xử lí mã giảm giá
NguoiDungRoute.post('/ApMa_GiamGia', upload.none(), MaGiamGiaController.ThemMaGiamGia_NguoiDung);
//=========================================
// PHẦN III : ĐỊNH NGHĨA ROUTE GET admin
//=========================================
// PHẦN IV : ĐỊNH NGHĨA ROUTE GET NguoiDung
NguoiDungRoute.get('/ThongTin',upload.none(), CanhanADController.ThongTin_NguoiDung);
NguoiDungRoute.get('/LayDiaChi',upload.none(), CanhanADController.DiaChi_NguoiDung);
//==========================
//xử lí đơn hàng thuộc người dùng
NguoiDungRoute.get('/giohang',upload.none(), DonHangController.GioHang_NguoiDung);
NguoiDungRoute.get('/CapNhat_SoLuong_GioHang',upload.none(), DonHangController.CapNhat_SoLuong_GioHang_NguoiDung);
NguoiDungRoute.get('/Xoa_GioHang',upload.none(), DonHangController.Xoa_GioHang_NguoiDung);
NguoiDungRoute.get('/SoLuong_GioHang',upload.none(), DonHangController.SoLuong_GioHang_NguoiDung);
NguoiDungRoute.get('/DanhSach_DonHang',upload.none(), DonHangController.DanhSach_DonHang_NguoiDung);
NguoiDungRoute.get('/chitiet_donhang', upload.none(), DonHangController.ChiTiet_DonHang);
NguoiDungRoute.get('/LayMaGiamGia', upload.none(), MaGiamGiaController.LayMaGiamGia_NguoiDung);
NguoiDungRoute.get('/ApMaGiamGia_NguoiDung' , upload.none(), MaGiamGiaController.ApMaGiamGia_NguoiDung);
NguoiDungRoute.get('/LayMaGiamGia_idth' , upload.none(), MaGiamGiaController.LayMaGiamGia_idth);
NguoiDungRoute.get('/ThongTinDonHang', upload.none(), DonHangController.ThongTinDonHang);
NguoiDungRoute.get('/PhiGiaoHang' , upload.none(),DonHangController.ThongTin_PhiVanChuyen);
//NguoiDungRoute.get('/ThongTin_DonHang', upload.none(), DonHangController.ThongTin_DonHang);
//=========================================

console.log("✅ NguoiDungRoute loaded");
export default NguoiDungRoute;