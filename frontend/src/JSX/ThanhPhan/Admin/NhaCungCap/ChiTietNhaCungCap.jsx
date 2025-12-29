import React, { useState } from 'react';

function ChiTietNhaCungCap() {
    const [activeTab, setActiveTab] = useState('history'); // history | products | debt

    return (
        <div className="bg-slate-50 min-h-screen pb-10">
            {/* --- HEADER (Giữ nguyên) --- */}
            <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                            <i className="fa-solid fa-arrow-left text-lg"></i>
                        </button>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nhà cung cấp</span>
                                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase border border-green-200">
                                    Đang hợp tác
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-800 mt-1">FPT Trading</h1>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg shadow-sm hover:bg-slate-50 hover:text-blue-600 transition-all flex items-center gap-2">
                            <i className="fa-regular fa-pen-to-square"></i>
                            <span className="hidden sm:inline">Sửa</span>
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center gap-2 hover:shadow-lg">
                            <i className="fa-solid fa-plus"></i>
                            <span>Nhập hàng</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
                
                {/* --- PHẦN 1: TỔNG QUAN (GRID 3 CỘT) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* CỘT 1: THÔNG TIN CÔNG TY */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-20 relative shrink-0">
                            <div className="absolute -bottom-8 left-6">
                                <div className="w-16 h-16 bg-white p-1 rounded-full shadow-md">
                                    <div className="w-full h-full bg-orange-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                        FPT
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-10 px-6 pb-4 flex-1">
                            <h2 className="text-lg font-bold text-slate-800">CTCP FPT Trading</h2>
                            <p className="text-sm text-slate-500 font-mono mb-4">Mã: SUP-0010</p>
                            
                            <div className="space-y-3 pt-2">
                                <InfoRow icon="fa-user" label="Liên hệ" value="Ms. Nguyễn Thị Lan" subValue="0909 123 456" />
                                <InfoRow icon="fa-location-dot" label="Địa chỉ" value="Số 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội" />
                            </div>
                        </div>
                        
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3 mt-auto">
                            <a href="tel:0909123456" className="py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:border-blue-400 hover:text-blue-600 transition-colors flex justify-center items-center gap-2">
                                <i className="fa-solid fa-phone"></i> Gọi
                            </a>
                            <a href="mailto:sale@fpt.com" className="py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:border-blue-400 hover:text-blue-600 transition-colors flex justify-center items-center gap-2">
                                <i className="fa-solid fa-envelope"></i> Email
                            </a>
                        </div>
                    </div>

 
                    {/* CỘT 3: THỐNG KÊ (XẾP DỌC) */}
                    <div className="flex flex-col gap-3 h-full">
                        <StatRow 
                            label="Công nợ hiện tại" 
                            value="250.000.000 ₫" 
                            color="red" 
                            icon="fa-sack-dollar"
                            action="Thanh toán"
                        />
                        <StatRow 
                            label="Tổng nhập tháng này" 
                            value="5.2 Tỷ" 
                            color="blue" 
                            icon="fa-chart-line"
                        />
                         <StatRow 
                            label="Số đơn hàng" 
                            value="32 đơn" 
                            color="slate" 
                            icon="fa-receipt"
                        />
                    </div>
                        {/* CỘT 2: THÔNG TIN NGÂN HÀNG (VIETCOMBANK) */}
<div className="h-1/2">
    {/* Background Gradient Xanh lá đặc trưng của VCB */}
    <div className="bg-gradient-to-br from-green-900 to-emerald-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden h-full flex flex-col justify-between">
        
        {/* Hiệu ứng nền (Circles) */}
        <div className="absolute top-[-30px] right-[-30px] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-lime-400/20 rounded-full blur-2xl"></div>

        {/* Header Card */}
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
                {/* Logo text VCB */}
                <div className="w-10 h-6 border border-white/30 rounded flex items-center justify-center font-bold text-[10px] tracking-tighter italic">
                    VCB
                </div>
                <span className="text-sm font-bold uppercase tracking-wider text-white drop-shadow-md">Vietcombank</span>
            </div>
            {/* Icon Contactless */}
            <i className="fa-solid fa-wifi rotate-90 text-emerald-200/50"></i>
        </div>
        
        {/* Số tài khoản */}
        <div className="my-2">
            <p className="text-[10px] text-emerald-100 uppercase mb-1">Số tài khoản</p>
            <div className="flex items-center gap-3 group cursor-pointer">
                {/* Font mono để số hiển thị đẹp như trên thẻ thật */}
                <p className=" font-mono tracking-wider font-bold group-hover:text-lime-300 transition-colors shadow-black drop-shadow-sm">
                    0011 002 999 888
                </p>
                <i className="fa-regular fa-copy text-emerald-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity"></i>
            </div>
        </div>

        {/* Footer Card */}
        <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-end">
            <div>
                <p className="text-[10px] text-emerald-100 uppercase">Chủ tài khoản</p>
                <p className="font-semibold tracking-wide text-sm mt-0.5 text-white">FPT TRADING JSC</p>
            </div>
            {/* Logo Visa/Mastercard */}
            <div className="text-3xl opacity-90 text-white">
                <i className="fa-brands fa-cc-visa"></i>
            </div>
        </div>
    </div>
</div>
      
        
          </div>

                {/* --- PHẦN 2: BẢNG DỮ LIỆU CHI TIẾT (XUỐNG DƯỚI CÙNG & FULL WIDTH) --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col min-h-[600px]">
                    {/* Tabs Header */}
                    <div className="border-b border-slate-200 px-6 flex flex-wrap gap-6 bg-slate-50/50 rounded-t-2xl">
                        <TabButton 
                            active={activeTab === 'history'} 
                            onClick={() => setActiveTab('history')} 
                            icon="fa-clock-rotate-left" 
                            label="Lịch sử nhập hàng" 
                        />
                        <TabButton 
                            active={activeTab === 'products'} 
                            onClick={() => setActiveTab('products')} 
                            icon="fa-box-open" 
                            label="Sản phẩm cung cấp" 
                        />
                        <TabButton 
                            active={activeTab === 'debt'} 
                            onClick={() => setActiveTab('debt')} 
                            icon="fa-file-invoice-dollar" 
                            label="Lịch sử công nợ" 
                        />
                    </div>

                    {/* Tab Content */}
                    <div className="p-0 flex-1 relative">
                        {activeTab === 'history' && (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-50 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Mã phiếu</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Ngày nhập</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Người nhập</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Tổng tiền</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Trạng thái</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <TableRow id="#IMP-5001" date="01/01/2024" user="Nguyễn Văn A" amount="250.000.000" status="pending" />
                                        <TableRow id="#IMP-4800" date="15/12/2023" user="Trần Thị B" amount="120.000.000" status="completed" />
                                        <TableRow id="#IMP-4750" date="10/11/2023" user="Nguyễn Văn A" amount="50.000.000" status="completed" />
                                        <TableRow id="#IMP-4600" date="01/10/2023" user="Admin" amount="200.000.000" status="completed" />
                                        <TableRow id="#IMP-4520" date="15/09/2023" user="Nguyễn Văn A" amount="80.000.000" status="completed" />
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'products' && (
                            <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <i className="fa-solid fa-box-open text-3xl text-slate-300"></i>
                                </div>
                                <p className="font-medium">Danh sách sản phẩm sẽ hiển thị ở đây</p>
                            </div>
                        )}
                        
                        {activeTab === 'debt' && (
                            <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <i className="fa-solid fa-file-invoice-dollar text-3xl text-slate-300"></i>
                                </div>
                                <p className="font-medium">Lịch sử thanh toán công nợ sẽ hiển thị ở đây</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Pagination Footer */}
                    <div className="px-6 py-4 border-t border-slate-200 bg-white rounded-b-2xl flex justify-between items-center">
                        <span className="text-sm text-slate-500">Hiển thị 5 / 50 kết quả</span>
                        <div className="flex gap-2">
                             <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-sm text-slate-600 disabled:opacity-50"><i className="fa-solid fa-chevron-left"></i></button>
                             <button className="px-3 py-1 border border-blue-500 bg-blue-50 rounded text-sm text-blue-600 font-bold">1</button>
                             <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-sm text-slate-600">2</button>
                             <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-sm text-slate-600"><i className="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

// --- SUB COMPONENTS ---

const InfoRow = ({ icon, label, value, subValue }) => (
    <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 w-6 h-6 mt-0.5 rounded bg-slate-100 text-slate-400 flex items-center justify-center">
            <i className={`fa-solid ${icon} text-xs`}></i>
        </div>
        <div>
            <p className="text-xs font-bold text-slate-400 uppercase">{label}</p>
            <p className="text-slate-800 text-sm font-medium">{value}</p>
            {subValue && <p className="text-xs text-blue-600 font-semibold">{subValue}</p>}
        </div>
    </div>
);

const StatRow = ({ label, value, color, icon, action }) => {
    const colors = {
        red: "text-red-600 bg-red-50 border-red-100",
        blue: "text-blue-600 bg-blue-50 border-blue-100",
        slate: "text-slate-600 bg-slate-50 border-slate-200",
    };

    return (
        <div className={`flex-1 flex items-center justify-between p-4 rounded-xl border ${colors[color]} relative overflow-hidden`}>
             <div>
                <p className="text-xs font-semibold opacity-70 uppercase mb-1">{label}</p>
                <p className="text-xl font-bold">{value}</p>
             </div>
             <div className="flex flex-col items-end gap-2">
                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/50 text-xl`}>
                    <i className={`fa-solid ${icon}`}></i>
                 </div>
                 {action && (
                     <button className="text-xs font-bold underline hover:no-underline cursor-pointer z-10">
                         {action}
                     </button>
                 )}
             </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`py-4 px-2 border-b-2 text-sm font-bold transition-all flex items-center gap-2 ${
            active 
            ? 'border-blue-600 text-blue-600' 
            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
        }`}
    >
        <i className={`fa-solid ${icon}`}></i> {label}
    </button>
);

const TableRow = ({ id, date, user, amount, status }) => (
    <tr className="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
        <td className="px-6 py-4 font-bold text-blue-600 cursor-pointer hover:underline">{id}</td>
        <td className="px-6 py-4 text-sm text-slate-600">{date}</td>
        <td className="px-6 py-4 text-sm text-slate-600 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">
                {user.charAt(0)}
            </div>
            {user}
        </td>
        <td className="px-6 py-4 text-sm font-bold text-slate-800 text-right">{amount} ₫</td>
        <td className="px-6 py-4 text-center">
            {status === 'pending' ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                    Nợ
                </span>
            ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                    Xong
                </span>
            )}
        </td>
        <td className="px-6 py-4 text-right">
            <button className="text-slate-400 hover:text-blue-600 transition-colors px-2">
                <i className="fa-regular fa-eye"></i>
            </button>
        </td>
    </tr>
);

export default ChiTietNhaCungCap;