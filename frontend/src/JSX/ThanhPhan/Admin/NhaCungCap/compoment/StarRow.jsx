import React from 'react';

const StatRow = ({ label, value, color, icon, action }) => {

    const isZero = Number(value) === 0 || value === "0";
    const colors = {
        red: "text-red-600 bg-red-50 border-red-100",
        blue: "text-blue-600 bg-blue-50 border-blue-100",
        slate: "text-slate-600 bg-slate-50 border-slate-200",
    };

    // -------------------------------------------------------
    // TRƯỜNG HỢP 1: NẾU GIÁ TRỊ = 0 (Hiển thị ô "Sạch nợ" / Thành công)
    // -------------------------------------------------------
    if (isZero) {
        return (
            <div className="flex-1 flex items-center justify-between p-4 rounded-xl border border-emerald-200 bg-emerald-50 relative overflow-hidden transition-all">
                <div className="flex items-center gap-3">
                    {/* Icon dấu tích xanh */}
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <i className="fa-solid fa-check"></i>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-emerald-600 uppercase mb-0.5">{label}</p>
                        <p className="text-sm font-medium text-emerald-700">Đã hoàn tất / Không có</p>
                    </div>
                </div>
                
                {/* Trang trí nền (Optional) */}
                <i className="fa-solid fa-shield-halved absolute -right-2 -bottom-4 text-6xl text-emerald-100/50 -z-0"></i>
            </div>
        );
    }

    // -------------------------------------------------------
    // TRƯỜNG HỢP 2: GIÁ TRỊ KHÁC 0 (Giao diện cũ)
    // -------------------------------------------------------
    return (
        <div className={`flex-1 flex items-center justify-between p-4 rounded-xl border ${colors[color] || colors.slate} relative overflow-hidden`}>
             <div className="z-10">
                <p className="text-xs font-semibold opacity-70 uppercase mb-1">{label}</p>
                <p className="text-xl font-bold">{new Intl.NumberFormat('vi-VN').format(value)} VND</p>
             </div>
             <div className="flex flex-col items-end gap-2 z-10">
                 <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/60 text-xl shadow-sm backdrop-blur-sm">
                    <i className={`fa-solid ${icon}`}></i>
                 </div>
                 {action && (
                     <button className="text-xs font-bold underline hover:no-underline cursor-pointer opacity-90 hover:opacity-100">
                         {action}
                     </button>
                 )}
             </div>
        </div>
    );
};

export default StatRow;