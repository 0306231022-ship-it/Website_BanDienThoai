import { Router } from "express";
import CanhanADController from "../controllers/CaNhanADController.js";
import SanPhamController from "../controllers/SanPhamController.js";
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
// xử lí sản phẩm thuộc người dùng
NguoiDungRoute.post('/ThemGioHang',upload.none(), SanPhamController.ThemGioHang_NguoiDung);
//=========================================
// PHẦN III : ĐỊNH NGHĨA ROUTE GET admin
//=========================================
// PHẦN IV : ĐỊNH NGHĨA ROUTE GET NguoiDung
NguoiDungRoute.get('/ThongTin',upload.none(), CanhanADController.ThongTin_NguoiDung);
NguoiDungRoute.get('/giohang',upload.none(), SanPhamController.GioHang_NguoiDung);
NguoiDungRoute.get('/CapNhat_SoLuong_GioHang',upload.none(), SanPhamController.CapNhat_SoLuong_GioHang_NguoiDung);
NguoiDungRoute.get('/Xoa_GioHang',upload.none(), SanPhamController.Xoa_GioHang_NguoiDung);
NguoiDungRoute.get('/SoLuong_GioHang',upload.none(), SanPhamController.SoLuong_GioHang_NguoiDung);
//=========================================

console.log("✅ NguoiDungRoute loaded");
export default NguoiDungRoute;