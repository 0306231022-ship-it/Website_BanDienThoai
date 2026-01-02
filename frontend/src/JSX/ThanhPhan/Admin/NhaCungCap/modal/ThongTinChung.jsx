import React from 'react';
import { useModalContext } from "../../../../../CONTEXT/QuanLiModal";

function ThongTinHeThong({ DuLieu }) {
    const defaultData = {
        Ten: DuLieu.DuLieu,
        Ma: DuLieu.ma,
        GhiChu: DuLieu.ghichu || 'Chưa có ghi chú',
        id: DuLieu.id
    };
    
    const { OpenMoDal } = useModalContext();

    return (
        <div className="bg-white w-full h-full flex flex-col">
            
            {/* --- HEADER --- */}
            <div className="relative pt-6 pb-4 px-4 flex flex-col items-center border-b border-slate-50">
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-blue-50/80 to-white rounded-t-xl -z-10"></div>
                
                <div className="relative group cursor-pointer mb-3">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-blue-600 text-2xl transition-transform duration-300 group-hover:-translate-y-1">
                        <i className="fa-solid fa-building-columns"></i>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-0.5 rounded-md shadow-md border border-white whitespace-nowrap z-10">
                        <span className="text-[10px] font-bold tracking-wider uppercase">SYSTEM</span>
                    </div>
                </div>

                <div className="text-center mt-1">
                    <h2 className="text-lg font-bold text-slate-800 leading-tight">{defaultData.Ten}</h2>
                    <p className="text-slate-500 text-xs font-medium mt-1">Thông tin định danh hệ thống</p>
                </div>
            </div>

            {/* --- BODY --- */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                
                {/* ITEM 1: TÊN HIỂN THỊ */}
                <button 
                    onClick={() => OpenMoDal({ DuLieu: defaultData.Ten, id: defaultData.id }, { TenTrang: 'ChinhSuaTen', url: '/admin/ChinhSuaTenNhaCungCap' })} 
                    className="w-full flex items-center p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all group hover:bg-white hover:shadow-md hover:border-blue-200 hover:scale-[1.01]"
                >
                    <div className="w-10 h-10 bg-white shadow-sm text-blue-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 shrink-0">
                        <i className="fa-solid fa-signature"></i>
                    </div>
                    <div className="ml-3 text-left flex-1 min-w-0">
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Tên hiển thị</span>
                        <span className="block text-sm font-bold text-slate-700 truncate group-hover:text-blue-700 transition-colors">
                            {defaultData.Ten}
                        </span>
                    </div>
                    <i className="fa-solid fa-pen-to-square text-slate-300 text-xs group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all"></i>
                </button>

                {/* ITEM 2: MÃ ĐỊNH DANH */}
                <button 
                    onClick={() => OpenMoDal({ DuLieu: defaultData.Ma, id: defaultData.id }, { TenTrang: 'ChinhSuaTen', url: '/admin/ChinhSuaMDDNhaCungCap' })} 
                    className="w-full flex items-center p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all group hover:bg-white hover:shadow-md hover:border-purple-200 hover:scale-[1.01]"
                >
                    <div className="w-10 h-10 bg-white shadow-sm text-purple-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300 shrink-0">
                        <i className="fa-solid fa-barcode"></i>
                    </div>
                    <div className="ml-3 text-left flex-1 min-w-0">
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Mã định danh</span>
                        <span className="block text-sm font-bold text-slate-700 font-mono truncate group-hover:text-purple-700 transition-colors">
                            {defaultData.Ma}
                        </span>
                    </div>
                    <i className="fa-regular fa-copy text-slate-300 text-xs group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-all"></i>
                </button>

                {/* ITEM 3: GHI CHÚ (ĐÃ FIX) */}
                <button 
                    onClick={() => OpenMoDal({ DuLieu: defaultData.GhiChu, id: defaultData.id }, { TenTrang: 'SuaMoTa', url: '/admin/ChinhSuaMoTaNhaCungCap' })} 
                    className="w-full flex items-start p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all group hover:bg-white hover:shadow-md hover:border-amber-200 hover:scale-[1.01]"
                >
                    <div className="w-10 h-10 bg-white shadow-sm text-amber-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shrink-0 mt-0.5">
                        <i className="fa-solid fa-note-sticky"></i>
                    </div>
                    
                  
                    <div className="ml-3 text-left flex-1 min-w-0 w-7">
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Ghi chú</span>
                        <p className="text-sm font-medium text-slate-600 group-hover:text-amber-800 transition-colors whitespace-pre-wrap break-words">
                            {defaultData.GhiChu}
                        </p>
                    </div>
                    
                    <i className="fa-solid fa-pen-to-square text-slate-300 text-xs group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-all mt-3 ml-2 shrink-0"></i>
                </button>

            </div>
        </div>
    );
}

export default ThongTinHeThong;