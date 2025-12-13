import BangChinh from '../BangChinh';
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
import CaiDat from '../CaiDatWebsite/CaiDat';
import ChietMaGG from '../ChiTietMaGiam';
import BinhLuan from '../DanhSachBinhLuan';
import XemThongTinWebsite from '../CaiDatWebsite/XemCaiDat';
import HoSo from '../ThongTinCaNhan/HoSoAdmin';
import Xem from '../XemBinhLuan';
import ChinhSua from '../ThongTinCaNhan/ChinhSuaThongTinAD';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
function QuanLiTT() {
    return (
        <>
                <aside id="sidebar" className="hidden md:block w-64 bg-white border-r border-gray-200 h-screen sticky top-0" aria-label="Menu điều hướng">
            <nav className="p-4" aria-label="Menu quản trị">
                <ul className="space-y-2">
                    <li>
                        <Link to="/admin" data-route="overview" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Tổng quan">
                            <i className="fas fa-chart-line w-5"></i><span className="ml-3">Tổng Quan</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/DonHang" data-route="orders" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Đơn hàng">
                            <i className="fas fa-shopping-cart w-5"></i><span className="ml-3">Đơn Hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/sanpham" data-route="products" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Sản phẩm">
                            <i className="fas fa-box w-5"></i><span className="ml-3">Sản Phẩm</span>
                        </Link>
                            <li>
                        <Link to="/admin/thuonghieu" data-route="products" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Sản phẩm">
                            <i className="fas fa-tags"></i><span className="ml-3">Thương hiệu</span>
                        </Link>
                    </li>
                    </li>
                    <li>
                        <Link to="/admin/khachhang" data-route="customers" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Khách hàng">
                            <i className="fas fa-users w-5"></i><span className="ml-3">Khách Hàng</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/baocao" data-route="reports" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Báo cáo">
                            <i className="fas fa-chart-pie w-5"></i><span className="ml-3">Báo Cáo</span>
                        </Link>
                    </li>
                        <li>
                        <Link to="/admin/phivanchuyen" data-route="reports" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Báo cáo">
                                <i className="fas fa-shipping-fast"></i><span className="ml-3">Phí vận chuyển</span>
                        </Link>
                    </li>
                        <li>
                        <Link to="/admin/danhsachma" data-route="reports" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Báo cáo">
                                <i className="fas fa-tags"></i><span className="ml-3">Mã giảm giá</span>
                        </Link>
                    </li>
                        <li>
                        <Link to="/admin/BinhLuan" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Quản lí bình luận">
                                <i className="fas fa-comment-dots w-5"></i><span className="ml-3">Quản lí Bình Luận</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/hotro" data-route="reports" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Báo cáo">
                                <i className="fas fa-headset"></i><span className="ml-3">Hỗ trợ khách hàng</span>
                        </Link>
                    </li>

                    
                    <li>
                        <Link to="/admin/CaiDat" data-route="settings" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Cài đặt">
                            <i className="fas fa-cog w-5"></i><span className="ml-3">Cài Đặt</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>

    
        <main className="flex-1 p-6 bg-gray-50 min-h-screen" role="main" aria-label="Nội dung quản trị">
                <Routes>
                    <Route index element={<BangChinh />} />
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
                    <Route path="caidat" element={<CaiDat />} />
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
export default QuanLiTT;