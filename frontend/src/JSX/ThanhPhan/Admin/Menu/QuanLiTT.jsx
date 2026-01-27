import BangChinh from '../BangChinh';
import ChiTietDon from '../ChiTietDon';
import DonHang from '../DonHang';
import DanhSachSanPham from '../DanhSachSanPham';
import ThemSanPham from '../ThemSanPham';
import ChiTietSanPham from '../ChiTietSP';
import DanhSachThuongHieu from '../ThuongHieu/DanhSachThuongHieu';
import ThemThuongHieu from '../ThuongHieu/ThemThuongHieu';
import ChiTietThuongHieu from '../ThuongHieu/ChiTietThuongHieu';
import DanhSachKhachHang from '../DanhSachKhachHang';
import BaoCao from '../BaoCao';
import PhiVanChuyen from '../PhiVanChuyen';
import MaGiamGia from '../MaGiamGia';
import DanhSachMa from '../DanhSachMa';
import HoTroKhachHang from '../HoTroKhachHang';
import ChietMaGG from '../ChiTietMaGiam';
import BinhLuan from '../DanhSachBinhLuan';
import XemThongTinWebsite from '../CaiDatWebsite/XemCaiDat';
import HoSo from '../ThongTinCaNhan/HoSoAdmin';
import Xem from '../XemBinhLuan';
import NhaCungCap from '../NhaCungCap/DanhSachNhaCC';
import PhieuNhapHang from '../SanPham/PhieuNhapHang';
import ThemPhieuNhap from '../SanPham/ThemPhieuNhap';
import { AppProvider } from '../../../../CONTEXT/QuanLiModal';
import ChiTietNhaCungCap from '../NhaCungCap/ChiTietNhaCungCap';
import ChiTietPhieu from '../SanPham/ChiTietPhieu';
import '../../../../CSS/ThanhCuon.css';
import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
function QuanLiTT() {

    return (
        <>
         <aside id="sidebar" className="w-72 fixed custom-scrollbar left-0 h-screen bg-white border-r border-gray-200 p-4 pt-6 overflow-y-auto shadow-md z-10" aria-label="Menu điều hướng">
            <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6" aria-label="Menu quản trị">
    <div>
        <h3 className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-3">
            Hệ thống
        </h3>
        <ul className="space-y-1">
            {[
                { to: "/admin", icon: "fa-chart-line", label: "Tổng Quan", end: true },
                { to: "/admin/CaiDat", icon: "fa-cogs", label: "Cài Đặt Hệ Thống" },
            ].map((item) => (
                <li key={item.to}>
                    <NavLink
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                                isActive 
                                ? 'bg-teal-600 text-white font-semibold shadow-md shadow-teal-100' 
                                : 'text-gray-500 hover:bg-teal-50 hover:text-teal-700'
                            }`
                        }
                    >
                        <i className={`fas ${item.icon} w-6 text-lg transition-transform group-hover:scale-110`}></i>
                        <span className="ml-2 text-sm">{item.label}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    </div>
    <div>
        <h3 className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-3">
            Quản lý bán hàng
        </h3>
        <ul className="space-y-1">
            {[
                { to: "/admin/DonHang", icon: "fa-shopping-cart", label: "Đơn Hàng" },
                { to: "/admin/sanpham", icon: "fa-box", label: "Sản Phẩm" },
                { to: "/admin/thuonghieu", icon: "fa-tags", label: "Thương hiệu" },
                { to: "/admin/khachhang", icon: "fa-users", label: "Khách Hàng" },
                { to: "/admin/NhaCungCap", icon: "fa-truck-loading", label: "Nhà Cung Cấp" },
                { to:'/admin/PhieuNhapHang', icon:'fa-solid fa-boxes-packing' , label:'Phiếu nhập hàng'}
            ].map((item) => (
                <li key={item.to}>
                    <NavLink 
                        to={item.to} 
                        className={({ isActive }) => 
                            `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                                isActive 
                                ? 'bg-teal-600 text-white font-semibold shadow-md shadow-teal-100' 
                                : 'text-gray-500 hover:bg-teal-50 hover:text-teal-700'
                            }`
                        }
                    >
                        <i className={`fas ${item.icon} w-6 text-lg transition-transform group-hover:scale-110`}></i>
                        <span className="ml-2 text-sm">{item.label}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    </div>
    <div>
        <h3 className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-3">
            Mở rộng
        </h3>
        <ul className="space-y-1">
            {[
                { to: "/admin/phivanchuyen", icon: "fa-shipping-fast", label: "Phí vận chuyển" },
                { to: "/admin/danhsachma", icon: "fa-ticket-alt", label: "Mã giảm giá" },
                { to: "/admin/BinhLuan", icon: "fa-comment-dots", label: "Bình Luận" },
                { to: "/admin/hotro", icon: "fa-headset", label: "Hỗ trợ khách" },
            ].map((item) => (
                <li key={item.to}>
                    <NavLink 
                        to={item.to} 
                        className={({ isActive }) => 
                            `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                                isActive 
                                ? 'bg-teal-600 text-white font-semibold shadow-md shadow-teal-100' 
                                : 'text-gray-500 hover:bg-teal-50 hover:text-teal-700'
                            }`
                        }
                    >
                        <i className={`fas ${item.icon} w-6 text-lg transition-transform group-hover:scale-110`}></i>
                        <span className="ml-2 text-sm">{item.label}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    </div>
</nav>
         </aside>
    
        <main className="flex-grow ml-72 overflow-y-auto min-h-screen py-2" role="main" aria-label="Nội dung quản trị">
            <AppProvider>
                <Routes>
                    <Route path="thuonghieu" element={<DanhSachThuongHieu />} />
                    <Route path="thuonghieu/ThemThuongHieu" element={<ThemThuongHieu />} />
                    <Route path="thuonghieu/chitiet/:id" element={<ChiTietThuongHieu />} />
                    <Route path="NhaCungCap" element={<NhaCungCap />} />
                    <Route path='NhaCungCap/ChiTiet/:id' element={<ChiTietNhaCungCap/>} />
                    <Route path='PhieuNhapHang' element={<PhieuNhapHang/>} />
                    <Route path='PhieuNhapHang/themPhieuNhap' element={<ThemPhieuNhap/>} />
                    <Route path='PhieuNhapHang/themPhieuNhap/:id' element={<ThemPhieuNhap/>} />
                    <Route path='PhieuNhapHang/ChiTiet/:id' element={<ChiTietPhieu/>} />
                    <Route path="hoso" element={<HoSo />} />
                    <Route path="xemThongTin" element={<XemThongTinWebsite />} />
                    
                    <Route index element={<BangChinh />} />
                    <Route path="DonHang" element={<DonHang />} />
                    <Route path="DonHang/ChiTietDon" element={<ChiTietDon />} />
                    <Route path="sanpham" element={<DanhSachSanPham />} />
                    <Route path="sanpham/ThemSanPham" element={<ThemSanPham />} />
                    <Route path="sanpham/chitiet" element={<ChiTietSanPham />} />
                    
                    <Route path="khachhang" element={<DanhSachKhachHang />} />
                    <Route path="baocao" element={<BaoCao />} />
                    <Route path="phivanchuyen" element={<PhiVanChuyen />} />
                    <Route path="danhsachma" element={<DanhSachMa />} />
                    <Route path="danhsachma/magiamgia" element={<MaGiamGia />} />
                    <Route path="hotro" element={<HoTroKhachHang />} />
                    <Route path="BinhLuan" element={<BinhLuan />} />
                    <Route path="BinhLuan/xem" element={< Xem />} />
                    
                    <Route path="danhsachma/chitietma" element={<ChietMaGG />} />
                   
                </Routes>
            </AppProvider>
        </main>
        </>
    );
};
export default QuanLiTT;