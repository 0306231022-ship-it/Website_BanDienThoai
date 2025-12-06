//Chưa xử lí 
import ChiTietDon from '../ChiTietDon';
import DonHang from '../DonHang';
import DanhSachSanPham from '../DanhSachSanPham';
import ThemSanPham from '../ThemSanPham';
import ChiTietSanPham from '../ChiTietSP';
import DanhSachThuongHieu from '../DanhSachThuongHieu';
import ThemThuongHieu from '../ThemThuongHieu';
import ChiTietThuongHieu from '../ChiTietThuongHieu';
import DanhSachKhachHang from '../DanhSachKhachHang';
import BaoCao from '../BaoCao';
import PhiVanChuyen from '../PhiVanChuyen';
import MaGiamGia from '../MaGiamGia';
import DanhSachMa from '../DanhSachMa';
import HoTroKhachHang from '../HoTroKhachHang';
import CaiDat from '../CaiDat';
import ChietMaGG from '../ChiTietMaGiam';
import BinhLuan from '../DanhSachBinhLuan';
import XemThongTinWebsite from '../XemCaiDat';
import HoSo from '../HoSoAdmin';
import Xem from '../XemBinhLuan';
import ChinhSua from '../ChinhSuaThongTinAD';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
function QuanLiTTCaNhan() {
    return (
        <>
                <aside id="sidebar" className="hidden md:block w-64 bg-white border-r border-gray-200 h-screen sticky top-0" aria-label="Menu điều hướng">
            <nav className="p-4" aria-label="Menu quản trị">
                <ul className="space-y-2">
                    <li>
                        <Link to="/admin/CaiDat" data-route="overview" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Tổng quan">
                            <i className="fas fa-cogs mr-2"></i><span className="ml-3"> website</span>
                        </Link>
                        <Link to="/admin" data-route="overview" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Tổng quan">
                            <i className="fas fa-arrow-left mr-2"></i><span className="ml-3"> Quay lại </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>

    
        <main className="flex-1 p-6 bg-gray-50 min-h-screen" role="main" aria-label="Nội dung quản trị">
                <Routes>
                    <Route index element={<XemThongTinWebsite />} />
                    <Route path="DonHang" element={<DonHang />} />
                    <Route path="DonHang/ChiTietDon" element={<ChiTietDon />} />
                    <Route path="sanpham" element={<DanhSachSanPham />} />
                    <Route path="sanpham/ThemSanPham" element={<ThemSanPham />} />
                    <Route path="sanpham/chitiet" element={<ChiTietSanPham />} />
                    <Route path="thuonghieu" element={<DanhSachThuongHieu />} />
                    <Route path="thuonghieu/ThemThuongHieu" element={<ThemThuongHieu />} />
                    <Route path="thuonghieu/chitiet" element={<ChiTietThuongHieu />} />
                    <Route path="khachhang" element={<DanhSachKhachHang />} />
                    <Route path="baocao" element={<BaoCao />} />
                    <Route path="phivanchuyen" element={<PhiVanChuyen />} />
                    <Route path="danhsachma" element={<DanhSachMa />} />
                    <Route path="danhsachma/magiamgia" element={<MaGiamGia />} />
                    <Route path="hotro" element={<HoTroKhachHang />} />
                    <Route path="caidatwebsite" element={<CaiDat />} />
                    <Route path="BinhLuan" element={<BinhLuan />} />
                    <Route path="BinhLuan/xem" element={< Xem />} />
                    <Route path="hoso" element={<HoSo />} />
                    <Route path="hoso/ChinhSuaThongTinAdmin" element={<ChinhSua />} />
                    <Route path="xemThongTin" element={<XemThongTinWebsite />} />
                    <Route path="danhsachma/chitietma" element={<ChietMaGG />} />
                </Routes>
        </main>
        </>
    );
};
export default QuanLiTTCaNhan;