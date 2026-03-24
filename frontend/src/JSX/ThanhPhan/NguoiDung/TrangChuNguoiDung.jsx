import { NavLink , useNavigate } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import HoSoCaNhan from './HoSoCaNhan';
import LichSuDonHang from './LichSuDonHang';
import XemDon from "./XemDonHang";
import TheoGioi from "./TheoGioiDon";
import DiaChiCuaToi from "./DiaChiCuaToi";
import ThemDiaChi from './ThemDiaChi';
import SanPhamYeuThich from "./SanPhamYeuThich";
import ChinhSuaThongTin from './ChinhSuaThongTin';
import {KiemTra  , LayThongTinNguoiDung , DangXuat } from '../../../hook/KiemTraDangNhap';
import { useEffect, useState } from "react";
import { useModalContext } from "../../../CONTEXT/QuanLiModal";
function TrangChuNguoiDung() {
    const [thongTinNguoiDung, setThongTinNguoiDung] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { OpenMoDal , CloseAllModals } = useModalContext();
    const navigate = useNavigate();
    const logout = async () => {
        const result = await DangXuat();
        if (result) {
            navigate('/');
            window.location.reload();
        }
    }
    useEffect(() => {
        const fetchThongTinNguoiDung = async () => {
            try {
                const loggedIn = await KiemTra();
                if (loggedIn) {
                    setIsLoggedIn(true);
                    const userInfo = await LayThongTinNguoiDung();
                    setThongTinNguoiDung(userInfo);
                } else {
                    setIsLoggedIn(false);
                    setThongTinNguoiDung(null);
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
        };
        fetchThongTinNguoiDung();
    }, []);
     const ChuyenTab = (ten, tieuDe)=>{
        CloseAllModals();
        OpenMoDal(null, { TenTrang: ten, TieuDe: tieuDe })
    }
    if (!isLoggedIn) {
        return (
            <div className="w-full min-h-[90vh] flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center p-10 bg-white rounded-[2rem] shadow-xl shadow-gray-100 border border-gray-100 max-w-md w-full relative overflow-hidden group">
                
                {/* --- HIỆU ỨNG BACKGROUND ĐỘNG (Optional) --- */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-50 rounded-full group-hover:scale-150 transition-transform duration-700 delay-75"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-teal-50 rounded-full group-hover:scale-150 transition-transform duration-700 delay-150"></div>

                <div className="relative z-10">
                    {/* --- ICON Ổ KHÓA MINH HỌA --- */}
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-500/10 to-teal-600/10 rounded-3xl mb-8 border border-teal-100 shadow-inner p-5 text-teal-600">
                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    {/* --- TIÊU ĐỀ & NỘI DUNG --- */}
                    <h2 className="text-3xl font-black mb-4 text-gray-950 tracking-tighter uppercase">
                        Oops! <span className="text-teal-600">Dừng Lại Một Chút</span>
                    </h2>
                    <p className="text-gray-600 mb-10 text-base leading-relaxed max-w-sm mx-auto">
                        Có vẻ bạn chưa đăng nhập. Vui lòng đăng nhập để truy cập trang cá nhân và tận hưởng đầy đủ tính năng.
                    </p>

                    {/* --- NÚT ĐĂNG NHẬP (CTA chính) --- */}
                    <button
                       onClick={() => ChuyenTab('DangNhap', 'Đăng Nhập')}
                        className="group-hover:scale-105 inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-full font-medium transition-transform duration-300"
                    >
                        <span>Đăng Nhập Ngay</span>
                        <svg className=" w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </button>
                    <button onClick={() => window.history.back()} className="ml-4 group-hover:scale-105 inline-flex items-center gap-2 bg-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium transition-transform duration-300">
                        quay lai
                    </button>

                    {/* --- LỰA CHỌN PHỤ (CTA phụ) --- */}
                    <p className="mt-8 text-sm text-gray-500">
                        Chưa có tài khoản?{' '}
                        <button onClick={() => ChuyenTab('DangKy', 'Đăng Ký')} className="font-bold text-teal-600 hover:text-teal-700 hover:underline transition-colors">
                            Hoặc tạo tài khoản mới
                        </button>
                    </p>
                </div>

            </div>
        </div>
        );
    }

    return (
        <>
            <main className="w-full min-h-screen bg-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Sidebar */}
                        <aside className="lg:col-span-1 animate-fade-in-up-1">
                            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src="https://picsum.photos/200/200?random=10"
                                        alt="Avatar"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">Xin chào,</h2>
                                        <p className="text-primary-500 font-medium">{thongTinNguoiDung?.HOTEN}</p>
                                    </div>
                                </div>

                                <nav className="space-y-2">
                                    <NavLink
                                        to="/nguoi-dung"
                                        className={({ isActive }) =>
            `flex-1 flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive
                ? "bg-teal-600 text-white font-semibold shadow-md shadow-teal-100"
                : "text-gray-500 hover:bg-teal-50 hover:text-teal-700"
            }`
          }                                   end
                                    >
                                        <i className="fas fa-user-circle w-5 text-center"></i>
                                        <span>Tổng Quan</span>
                                    </NavLink>

                                    <NavLink
                                        to="/nguoi-dung/ho-so"
                                        className={({ isActive }) =>
            `flex-1 flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive
                ? "bg-teal-600 text-white font-semibold shadow-md shadow-teal-100"
                : "text-gray-500 hover:bg-teal-50 hover:text-teal-700"
            }`
          }                                   end
                                    >
                                        <i className="fas fa-edit w-5 text-center"></i>
                                        <span>Thông Tin Cá Nhân</span>
                                    </NavLink>

                                    <NavLink
                                        to="/nguoi-dung/lich-su-mua"
                                        className={({ isActive }) =>
            `flex-1 flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive
                ? "bg-teal-600 text-white font-semibold shadow-md shadow-teal-100"
                : "text-gray-500 hover:bg-teal-50 hover:text-teal-700"
            }`
          }                                   end
                                    >
                                        <i className="fas fa-box-open w-5 text-center"></i>
                                        <span>Lịch Sử Đơn Hàng</span>
                                    </NavLink>

                                    <NavLink
                                        to="/nguoi-dung/dia-chi-cua-toi"
                                        className={({ isActive }) =>
            `flex-1 flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive
                ? "bg-teal-600 text-white font-semibold shadow-md shadow-teal-100"
                : "text-gray-500 hover:bg-teal-50 hover:text-teal-700"
            }`
          }                                   end
                                    >
                                        <i className="fas fa-map-marker-alt w-5 text-center"></i>
                                        <span>Địa Chỉ Của Tôi</span>
                                    </NavLink>

                                    <NavLink
                                        to="/nguoi-dung/san-pham-yeu-thich"
                                        className={({ isActive }) =>
            `flex-1 flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive
                ? "bg-teal-600 text-white font-semibold shadow-md shadow-teal-100"
                : "text-gray-500 hover:bg-teal-50 hover:text-teal-700"
            }`
          }                                   end
                                    >
                                        <i className="fas fa-heart w-5 text-center"></i>
                                        <span>Danh Sách Yêu Thích</span>
                                    </NavLink>

                                    <div className="border-t border-gray-200 my-2"></div>

                                    <button
                                    onClick={logout}
                                        className="flex-1 flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-gray-500 hover:bg-red-50 hover:text-red-700"
                                    >
                                        <i className="fas fa-sign-out-alt w-5 text-center"></i>
                                        <span>Đăng Xuất</span>
                                    </button>
                                </nav>
                            </div>
                        </aside>
                        {/* Phần nội dung chính */}
                        <section className="lg:col-span-3 space-y-8">
                            <Routes>
                                  <Route index element={<HoSoCaNhan />} />
                                  <Route path="ho-so"  element={<HoSoCaNhan />} />
                                  <Route path="ho-so/chinh-sua-thong-tin"  element={<ChinhSuaThongTin />} />
                                  <Route path="lich-su-mua"  element={<LichSuDonHang />} />
                                  <Route path="lich-su-mua/xem-chi-tiet"  element={<XemDon />} />
                                  <Route path="lich-su-mua/theo-gioi"  element={<TheoGioi />} />
                                  <Route path="dia-chi-cua-toi"  element={<DiaChiCuaToi />} />
                                  <Route path="dia-chi-cua-toi/them-dia-chi"  element={<ThemDiaChi />} />
                                  <Route path="san-pham-yeu-thich"  element={<SanPhamYeuThich />} />
                            </Routes>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}
export default TrangChuNguoiDung;
