import React from 'react';
import { useModalContext } from "../../../../../CONTEXT/QuanLiModal";

function ThongTinLienHe({ DuLieu }) {
    // 1. Ánh xạ dữ liệu an toàn (Fallback nếu dữ liệu null)
    const contactData = {
        NguoiDaiDien: DuLieu.nguoidaidien || 'Chưa cập nhật',
        SDT: DuLieu.sdt || 'Chưa cập nhật',
        Email: DuLieu.email || 'Chưa cập nhật',
        DiaChi: DuLieu.diachi || 'Chưa cập nhật',
        id: DuLieu.id
    };
    
    const { OpenMoDal } = useModalContext();

    return (
        <div className="bg-white w-full h-full flex flex-col">
            
           
            <div className="relative pt-6 pb-4 px-4 flex flex-col items-center border-b border-slate-50">
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-emerald-50/80 to-white rounded-t-xl -z-10"></div>
                
                <div className="relative group cursor-pointer mb-3">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-emerald-600 text-2xl transition-transform duration-300 group-hover:-translate-y-1">
                        {/* Icon Contact */}
                        <i className="fa-solid fa-address-card"></i>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-0.5 rounded-md shadow-md border border-white whitespace-nowrap z-10">
                        <span className="text-[10px] font-bold tracking-wider uppercase">CONTACT</span>
                    </div>
                </div>

                <div className="text-center mt-1">
                    <h2 className="text-lg font-bold text-slate-800 leading-tight">Thông tin liên hệ</h2>
                    <p className="text-slate-500 text-xs font-medium mt-1">Kênh kết nối & địa chỉ</p>
                </div>
            </div>

            {/* --- BODY --- */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                
                {/* 1. NGƯỜI ĐẠI DIỆN */}
                <button 
                    onClick={() => OpenMoDal(
                        { 
                            DuLieu: contactData.NguoiDaiDien, 
                            id: contactData.id 
                        }, { 
                            TenTrang: 'ChinhSuaTen', 
                            url: '/admin/ChinhSuaNguoiDaiDienNhaCungCap' 
                        })} 
                    className="w-full flex items-center p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all group hover:bg-white hover:shadow-md hover:border-indigo-200 hover:scale-[1.01]">
                    <div className="w-10 h-10 bg-white shadow-sm text-indigo-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300 shrink-0">
                        <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <div className="ml-3 text-left flex-1 min-w-0">
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Người đại diện</span>
                        <span className="block text-sm font-bold text-slate-700 truncate group-hover:text-indigo-700 transition-colors">
                            {contactData.NguoiDaiDien}
                        </span>
                    </div>
                    <i className="fa-solid fa-pen-to-square text-slate-300 text-xs group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all"></i>
                </button>

                {/* 2. SỐ ĐIỆN THOẠI */}
                <button 
                    onClick={() => OpenMoDal({ DuLieu: contactData.SDT, id: contactData.id }, { TenTrang: 'ChinhSuaLienHe', url: '/admin/ChinhSuaSDT' })} 
                    className="w-full flex items-center p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all group hover:bg-white hover:shadow-md hover:border-emerald-200 hover:scale-[1.01]"
                >
                    <div className="w-10 h-10 bg-white shadow-sm text-emerald-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 shrink-0">
                        <i className="fa-solid fa-phone"></i>
                    </div>
                    <div className="ml-3 text-left flex-1 min-w-0">
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Số điện thoại</span>
                        <span className="block text-sm font-bold text-slate-700 font-mono truncate group-hover:text-emerald-700 transition-colors">
                            {contactData.SDT}
                        </span>
                    </div>
                    <i className="fa-solid fa-pen-to-square text-slate-300 text-xs group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all"></i>
                </button>

                {/* 3. EMAIL */}
                <button 
                    onClick={() => OpenMoDal({ DuLieu: contactData.Email, id: contactData.id }, { TenTrang: 'ChinhSuaLienHe', url: '/admin/ChinhSuaEmail' })} 
                    className="w-full flex items-center p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all group hover:bg-white hover:shadow-md hover:border-rose-200 hover:scale-[1.01]"
                >
                    <div className="w-10 h-10 bg-white shadow-sm text-rose-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300 shrink-0">
                        <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="ml-3 text-left flex-1 min-w-0">
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Email</span>
                        <span className="block text-sm font-bold text-slate-700 truncate group-hover:text-rose-700 transition-colors">
                            {contactData.Email}
                        </span>
                    </div>
                    <i className="fa-solid fa-pen-to-square text-slate-300 text-xs group-hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"></i>
                </button>

                {/* 4. ĐỊA CHỈ (Có xử lý xuống dòng) */}
                <button 
                    onClick={() => OpenMoDal({
                         DuLieu: contactData.DiaChi, 
                         id: contactData.id 
                        }, { 
                            TenTrang: 'SuaDiaChi',
                             url: '/admin/ChinhSuaDiaChiNhaCungCap'
                             })} 
                    className="w-full flex items-start p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all group hover:bg-white hover:shadow-md hover:border-amber-200 hover:scale-[1.01]"
                >
                    {/* Icon align top */}
                    <div className="w-10 h-10 bg-white shadow-sm text-amber-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shrink-0 mt-0.5">
                        <i className="fa-solid fa-map-location-dot"></i>
                    </div>
                    
                    {/* Content Area */}
                    <div className="ml-3 text-left flex-1 min-w-0">
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Địa chỉ</span>
                        {/* Text Address - Break words */}
                        <p className="text-sm font-medium text-slate-600 leading-relaxed group-hover:text-amber-800 transition-colors whitespace-pre-wrap break-words break-all">
                            {contactData.DiaChi}
                        </p>
                    </div>
                    
                    <i className="fa-solid fa-pen-to-square text-slate-300 text-xs group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-all mt-3 ml-2 shrink-0"></i>
                </button>

            </div>
        </div>
    );
}

export default ThongTinLienHe;