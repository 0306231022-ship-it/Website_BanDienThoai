import { NavLink, useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Import các components của bạn
import HoSoCaNhan from './HoSoCaNhan';
import LichSuDonHang from './LichSuDonHang';
import XemDon from "./XemDonHang";
import TheoGioi from "./TheoGioiDon";
import DiaChiCuaToi from "./DiaChiCuaToi";
import ThemDiaChi from './ThemDiaChi';
import SanPhamYeuThich from "./SanPhamYeuThich";
import ChinhSuaThongTin from './ChinhSuaThongTin';
import ChiTietDonHang from "./ChiTietDonHang";
import HoaDon from "./HoaDon";
import TongQuan from "./TongQuan";

// Hooks & Context
import { KiemTra, LayThongTinNguoiDung, DangXuat } from '../../../hook/KiemTraDangNhap';
import { useModalContext } from "../../../CONTEXT/QuanLiModal";

function TrangChuNguoiDung() {
    const [thongTinNguoiDung, setThongTinNguoiDung] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const { OpenMoDal, CloseAllModals } = useModalContext();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = async () => {
        const result = await DangXuat();
        if (result) {
            navigate('/');
            window.location.reload();
        }
    };

    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const loggedIn = await KiemTra();
                if (loggedIn) {
                    setIsLoggedIn(true);
                    const userInfo = await LayThongTinNguoiDung();
                    setThongTinNguoiDung(userInfo);
                }
            } catch (error) {
                console.error("Auth Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAuth();
    }, []);

    const ChuyenTab = (ten, tieuDe) => {
        CloseAllModals();
        OpenMoDal(null, { TenTrang: ten, TieuDe: tieuDe });
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
                <div className="text-center p-12 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 max-w-md w-full animate-fadeIn">
                    <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-3xl mb-6 mx-auto flex items-center justify-center">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black mb-3 text-gray-900 uppercase">Quyền truy cập hạn chế</h2>
                    <p className="text-gray-500 mb-8 font-medium">Bạn cần đăng nhập để truy cập trang này.</p>
                    <div className="space-y-3">
                        <button onClick={() => ChuyenTab('DangNhap', 'Đăng Nhập')} className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold hover:bg-teal-700 transition-all active:scale-95 shadow-lg shadow-teal-100">
                            Đăng Nhập Ngay
                        </button>
                        <button onClick={() => window.history.back()} className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all">
                            Quay Lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const menuItems = [
        { path: "/nguoi-dung", icon: "fas fa-th-large", label: "Tổng Quan", end: true },
        { path: "/nguoi-dung/ho-so", icon: "fas fa-user", label: "Hồ Sơ Cá Nhân" },
        { path: "/nguoi-dung/lich-su-mua", icon: "fas fa-shopping-bag", label: "Đơn Hàng" },
        { path: "/nguoi-dung/dia-chi-cua-toi", icon: "fas fa-map-marker-alt", label: "Địa Chỉ" },
        { path: "/nguoi-dung/san-pham-yeu-thich", icon: "fas fa-heart", label: "Yêu Thích" },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Decor Header Background */}
            <div className="h-64 bg-teal-600 absolute top-0 left-0 w-full z-0 shadow-inner opacity-90"></div>
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* SIDEBAR - 3/12 Cột */}
                    <aside className="lg:col-span-3">
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-6 sticky top-24 border border-white">
                            {/* Profile Section */}
                            <div className="flex flex-col items-center text-center pb-8 border-b border-gray-100 mb-6">
                                <div className="relative group cursor-pointer">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${thongTinNguoiDung?.HOTEN}&background=0D9488&color=fff&size=128`}
                                        className="w-24 h-24 rounded-3xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                                        alt="Avatar"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-xl shadow-md border border-gray-100">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                                <h3 className="mt-5 font-black text-gray-900 text-xl tracking-tight">{thongTinNguoiDung?.HOTEN}</h3>
                                <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mt-1">Khách hàng Platinum</p>
                            </div>

                            {/* Nav Menu */}
                            <nav className="space-y-2">
                                {menuItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={item.end}
                                        className={({ isActive }) => `
                                            flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                                            ${isActive 
                                                ? "bg-teal-600 text-white shadow-lg shadow-teal-200 font-bold" 
                                                : "text-gray-500 hover:bg-teal-50 hover:text-teal-700"}
                                        `}
                                    >
                                        <i className={`${item.icon} w-5 text-center transition-transform group-hover:scale-110`}></i>
                                        <span className="text-[15px]">{item.label}</span>
                                        {item.end && <span className="ml-auto w-2 h-2 rounded-full bg-teal-400 group-hover:animate-ping"></span>}
                                    </NavLink>
                                ))}
                                
                                <div className="pt-4 mt-4 border-t border-gray-100">
                                    <button 
                                        onClick={logout}
                                        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold active:scale-95"
                                    >
                                        <i className="fas fa-sign-out-alt w-5"></i>
                                        <span>Đăng Xuất</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </aside>

                    {/* CONTENT - 9/12 Cột */}
                    <section className="lg:col-span-9 min-h-[700px]">
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-white p-6 md:p-10 animate-fadeInSlow">
                            {/* Tiêu đề động dựa trên Route (Tùy chọn) */}
                            <header className="mb-10 flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Cổng thông tin cá nhân</h2>
                                    <p className="text-gray-500 font-medium mt-1">Quản lý và cập nhật hoạt động của bạn</p>
                                </div>
                                <div className="hidden md:block">
                                    <span className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-bold border border-teal-100">
                                        Hôm nay, {new Date().toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                            </header>

                            {/* Main Router View */}
                            <div className="relative">
                                <Routes>
                                    <Route index element={<TongQuan />} />
                                    <Route path="ho-so" element={<HoSoCaNhan />} />
                                    <Route path="ho-so/chinh-sua-thong-tin" element={<ChinhSuaThongTin />} />
                                    <Route path="lich-su-mua" element={<LichSuDonHang />} />
                                    <Route path="lich-su-mua/xem-chi-tiet" element={<XemDon />} />
                                    <Route path="lich-su-mua/hoadon/:id" element={<HoaDon />} />
                                    <Route path="lich-su-mua/theo-gioi" element={<TheoGioi />} />
                                    <Route path="dia-chi-cua-toi" element={<DiaChiCuaToi />} />
                                    <Route path="dia-chi-cua-toi/them-dia-chi" element={<ThemDiaChi />} />
                                    <Route path="san-pham-yeu-thich" element={<SanPhamYeuThich />} />
                                    <Route path="lich-su-mua/chi-tiet/:id" element={<ChiTietDonHang />} />
                                </Routes>
                            </div>
                        </div>
                    </section>
                    
                </div>
            </main>
        </div>
    );
}

export default TrangChuNguoiDung;