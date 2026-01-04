import React from 'react';
import { useModalContext } from "../../../../../CONTEXT/QuanLiModal";

function ThongTinTaiChinh({ DuLieu }) {
    // 1. Ánh xạ dữ liệu an toàn
    const financeData = {
        TenNganHang: DuLieu?.tennganhang || 'Chưa cập nhật',
        SoTaiKhoan: DuLieu.sotaikhoan || 'Chưa cập nhật',
        ChuTaiKhoan: DuLieu.chutaikhoan || 'Chưa cập nhật', // (Optional) Thêm chủ tài khoản nếu cần
        id: DuLieu.id
    };
    const { OpenMoDal } = useModalContext();

    return (
        <div className="bg-white w-full h-full flex flex-col">
            
            {/* --- HEADER (Theme: Sky/Blue) --- */}
            <div className="relative pt-6 pb-4 px-4 flex flex-col items-center border-b border-slate-50">
                {/* Gradient Background */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-sky-50/80 to-white rounded-t-xl -z-10"></div>
                
                {/* Main Icon */}
                <div className="relative group cursor-pointer mb-3">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-sky-600 text-2xl transition-transform duration-300 group-hover:-translate-y-1">
                        <i className="fa-solid fa-building-columns"></i>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-0.5 rounded-md shadow-md border border-white whitespace-nowrap z-10">
                        <span className="text-[10px] font-bold tracking-wider uppercase">FINANCE</span>
                    </div>
                </div>

                <div className="text-center mt-1">
                    <h2 className="text-lg font-bold text-slate-800 leading-tight">Thông tin tài chính</h2>
                    <p className="text-slate-500 text-xs font-medium mt-1">Ngân hàng & Số tài khoản</p>
                </div>
            </div>

            {/* --- BODY --- */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                
                {/* 1. TÊN NGÂN HÀNG */}
                <button 
                    onClick={() => OpenMoDal(
                        { 
                            DuLieu: financeData.TenNganHang, 
                            id: financeData.id 
                        }, { 
                            TenTrang: 'ChinhSuaTen', 
                            url: '/admin/ChinhSuaTenNganHang' // Đường dẫn API giả định
                        })} 
                    className="w-full flex items-center p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all group hover:bg-white hover:shadow-md hover:border-sky-200 hover:scale-[1.01]"
                >
                    <div className="w-10 h-10 bg-white shadow-sm text-sky-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 shrink-0">
                        <i className="fa-solid fa-landmark"></i>
                    </div>
                    <div className="ml-3 text-left flex-1 min-w-0">
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Ngân hàng</span>
                        <span className="block text-sm font-bold text-slate-700 truncate group-hover:text-sky-700 transition-colors">
                            {financeData.TenNganHang}
                        </span>
                    </div>
                    <i className="fa-solid fa-pen-to-square text-slate-300 text-xs group-hover:text-sky-400 opacity-0 group-hover:opacity-100 transition-all"></i>
                </button>

                {/* 2. SỐ TÀI KHOẢN */}
                <button 
                    onClick={() => OpenMoDal(
                        { 
                            DuLieu: financeData.SoTaiKhoan, 
                            id: financeData.id 
                        }, { 
                            TenTrang: 'ChinhSuaSo', 
                            url: '/admin/ChinhSuaSoTaiKhoan' 
                        })} 
                    className="w-full flex items-center p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all group hover:bg-white hover:shadow-md hover:border-violet-200 hover:scale-[1.01]"
                >
                    <div className="w-10 h-10 bg-white shadow-sm text-violet-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-violet-500 group-hover:text-white transition-colors duration-300 shrink-0">
                        <i className="fa-solid fa-credit-card"></i>
                    </div>
                    <div className="ml-3 text-left flex-1 min-w-0">
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Số tài khoản</span>
                        {/* Font-mono dùng cho số để dễ nhìn hơn */}
                        <span className="block text-sm font-bold text-slate-700 font-mono truncate group-hover:text-violet-700 transition-colors tracking-wide">
                            {financeData.SoTaiKhoan}
                        </span>
                    </div>
                    <i className="fa-solid fa-pen-to-square text-slate-300 text-xs group-hover:text-violet-400 opacity-0 group-hover:opacity-100 transition-all"></i>
                </button>

                 {/* 3. CHỦ TÀI KHOẢN (Tùy chọn thêm - để giao diện đỡ trống) */}
                 <button 
                    className="w-full flex items-center p-3 bg-slate-50 border border-slate-100 rounded-xl opacity-80 cursor-default"
                >
                    <div className="w-10 h-10 bg-white shadow-sm text-slate-400 rounded-lg flex items-center justify-center border border-slate-100 shrink-0">
                        <i className="fa-solid fa-user-check"></i>
                    </div>
                    <div className="ml-3 text-left flex-1 min-w-0">
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Chủ tài khoản</span>
                        <span className="block text-sm font-bold text-slate-600 truncate">
                            {financeData.ChuTaiKhoan !== 'Chưa cập nhật' ? financeData.ChuTaiKhoan : financeData.NguoiDaiDien || '---'}
                        </span>
                    </div>
                </button>

            </div>
        </div>
    );
}

export default ThongTinTaiChinh;