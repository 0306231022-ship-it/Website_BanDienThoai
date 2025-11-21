import { Link } from 'react-router-dom';
import BangChinh from '../ThanhPhan/Admin/BangChinh';
import ChiTietDon from '../ThanhPhan/Admin/ChiTietDon';
import DonHang from '../ThanhPhan/Admin/DonHang';
import DanhSachSanPham from '../ThanhPhan/Admin/DanhSachSanPham';
import ThemSanPham from '../ThanhPhan/Admin/ThemSanPham';
import ChiTietSanPham from '../ThanhPhan/Admin/ChiTietSP';
import DanhSachThuongHieu from '../ThanhPhan/Admin/DanhSachThuongHieu';
import ThemThuongHieu from '../ThanhPhan/Admin/ThemThuongHieu';
import ChiTietThuongHieu from '../ThanhPhan/Admin/ChiTietThuongHieu';
import DanhSachKhachHang from '../ThanhPhan/Admin/DanhSachKhachHang';
import BaoCao from '../ThanhPhan/Admin/BaoCao';
import PhiVanChuyen from '../ThanhPhan/Admin/PhiVanChuyen';
import MaGiamGia from '../ThanhPhan/Admin/MaGiamGia';
import DanhSachMa from '../ThanhPhan/Admin/DanhSachMa';
import HoTroKhachHang from '../ThanhPhan/Admin/HoTroKhachHang';
import CaiDat from '../ThanhPhan/Admin/CaiDat';
import ChietMaGG from '../ThanhPhan/Admin/ChiTietMaGiam';
import BinhLuan from '../ThanhPhan/Admin/DanhSachBinhLuan';
import XemThongTinWebsite from '../ThanhPhan/Admin/XemCaiDat';
import HoSo from '../ThanhPhan/Admin/HoSoAdmin';
import Xem from '../ThanhPhan/Admin/XemBinhLuan';
import ChinhSua from '../ThanhPhan/Admin/ChinhSuaThongTinAD';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import {useAppContext} from '../../CONTEXT/TrangChuAdmin';


function TrangChuAdmin() {
    const { kiemtra , DangXuat , TTwebsite , GetTTwebsite } = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [admin,setadmin]=useState({})
    useEffect(() => {
         kiemtra();
         GetTTwebsite();
         setadmin(JSON.parse(localStorage.getItem('DuLieu')))
    }, [kiemtra,GetTTwebsite]);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return(
        <>
    <header className="w-full bg-white shadow sticky top-0 z-50" aria-label="Top bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
                <button id="sidebarToggle" aria-label="Mở/đóng menu" className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <i className="fas fa-bars"></i>
                </button>
                <Link to="" data-route="overview" className="flex items-center space-x-2" Style="text-decoration:none;">
                    <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center text-white">
                        <i className="fas fa-mobile-alt"></i>
                    </div>
                    <span className="text-xl font-bold text-dark-900">{TTwebsite.TenWebsite} Admin</span>
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                    <input type="search" placeholder="Tìm kiếm trong quản trị" className="w-72 pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:outline-none border border-gray-200" aria-label="Tìm kiếm trong quản trị"/>
                    <span className="absolute left-3 top-2 text-gray-500"><i className="fas fa-search"></i></span>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Thông báo">
                    <i className="fas fa-bell"></i>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Tin nhắn">
                    <i className="fas fa-envelope"></i>
                </button>
                {/* Khu vực avatar Admin với menu xổ xuống */}
                <div className="relative">
                    <div 
                        className="flex items-center space-x-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors" 
                        role="button" 
                        aria-label="Thông tin người dùng"
                        onClick={toggleMenu} // Thêm sự kiện onClick để ẩn/hiện menu
                        aria-expanded={isMenuOpen}
                    >
                        <img src="https://picsum.photos/40?random=1" alt="Avatar quản trị viên" className="w-8 h-8 rounded-full object-cover" loading="lazy" />
                        <span className="font-medium">{admin?.HOTEN}</span>
                        <i className={`fas fa-caret-down transition-transform ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}></i> {/* Icon mũi tên xoay */}
                    </div>

                    {/* Menu Dropdown */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-200" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                            <Link to="/admin/hoso" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                                <i className="fas fa-user-circle mr-2"></i> Hồ Sơ
                            </Link>
                            <Link to="/admin/caidat" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                                <i className="fas fa-cog mr-2"></i> Cài Đặt
                            </Link>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50" role="menuitem" 
                               onClick={() => {DangXuat();setIsMenuOpen(false);}}>
                                <i className="fas fa-sign-out-alt mr-2"></i> Đăng Xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </header>

    <div className="flex" id="layout">

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
                        <Link to="/admin/xemThongTin" data-route="settings" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900" aria-label="Cài đặt">
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
    </div>



    <footer className="mt-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600">
             &copy; {new Date().getFullYear()} TechMobile Admin. Tất cả quyền sở hữu thuộc về TechMobile.
        </div>
    </footer>
        </>
    );
};
export default TrangChuAdmin;