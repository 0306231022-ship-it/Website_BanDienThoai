function ChiTietDonHang() {
    return (
        <>
            <div className="max-w-4xl mx-auto py-10 px-4">
                {/* Nút quay lại */}
                <button className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Quay lại danh sách đơn hàng
                </button>

                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    {/* Header */}
                    <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-slate-900">Đơn hàng #TECH2025-001</h1>
                            <p className="text-slate-500 text-sm mt-1 font-medium">Đặt ngày 01 tháng 01, 2026</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-black uppercase tracking-widest border border-blue-100">
                                Đang vận chuyển
                            </span>
                            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Stepper (Trạng thái) */}
                    <div className="p-8 bg-slate-50/50">
                        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
                            <div className="hidden md:block absolute top-1/2 left-0 w-2/3 h-0.5 bg-blue-600 -translate-y-1/2 z-0"></div>

                            {/* Bước 1 */}
                            <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 bg-slate-50 md:bg-transparent pr-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                                <div className="md:text-center">
                                    <p className="text-sm font-bold text-slate-900">Đã xác nhận</p>
                                    <p className="text-[11px] text-slate-500 font-medium">10:30, 01/01</p>
                                </div>
                            </div>

                            {/* Bước 2 */}
                            <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 bg-slate-50 md:bg-transparent pr-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                                <div className="md:text-center">
                                    <p className="text-sm font-bold text-slate-900">Đang đóng gói</p>
                                    <p className="text-[11px] text-slate-500 font-medium">14:20, 01/01</p>
                                </div>
                            </div>

                            {/* Bước 3 */}
                            <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 bg-slate-50 md:bg-transparent pr-4">
                                <div className="w-12 h-12 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center shadow-xl shadow-blue-100 animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="1" y="3" width="15" height="13" stroke="none" />
                                        <path d="M10 17h4V5H2v12h3m4 0h2"/><circle cx="7" cy="17" r="2"/><path d="M15 17h2l3-3v-5h-5v8z"/><circle cx="18" cy="17" r="2"/>
                                    </svg>
                                </div>
                                <div className="md:text-center">
                                    <p className="text-sm font-extrabold text-blue-600 underline decoration-2 underline-offset-4">Đang vận chuyển</p>
                                    <p className="text-[11px] text-blue-500 font-bold">Dự kiến tới: 03/01</p>
                                </div>
                            </div>

                            {/* Bước 4 */}
                            <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 bg-slate-50 md:bg-transparent pr-4">
                                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.5 8.5L8 10l-6 6"/><path d="M16 7h6v6"/></svg>
                                </div>
                                <div className="md:text-center">
                                    <p className="text-sm font-bold text-slate-400">Giao thành công</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid Thông tin */}
                    <div className="p-8 grid md:grid-cols-2 gap-8 border-b border-slate-100">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">📍 Địa chỉ nhận hàng</h3>
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <p className="font-bold text-slate-900 mb-1 text-lg">Nguyễn Văn A</p>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    (+84) 901 234 567<br />
                                    Số 123, Đường ABC, Phường 4<br />
                                    Quận 1, TP. Hồ Chí Minh
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">🚚 Đơn vị vận chuyển</h3>
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">🚀</div>
                                    <div>
                                        <p className="font-bold text-slate-900">Giao Hàng Nhanh (GHN)</p>
                                        <p className="text-xs text-blue-600 font-bold">Mã vận đơn: GHN-99228833</p>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 flex items-center gap-2 italic">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> 
                                    Đã rời kho phân loại TP. HCM - 02/01
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sản phẩm */}
                    <div className="p-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">🛒 Sản phẩm</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                                    <img src="https://via.placeholder.com/80" alt="Sản phẩm" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900">iPhone 15 Pro Max - 256GB</h4>
                                    <p className="text-sm text-slate-500">Số lượng: 1</p>
                                </div>
                                <div className="text-right font-bold text-slate-900">32.000.000đ</div>
                            </div>
                        </div>

                        {/* Tổng thanh toán */}
                        <div className="mt-8 pt-6 border-t border-dashed border-slate-200 space-y-3">
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Tạm tính</span>
                                <span>32.000.000đ</span>
                            </div>
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Phí vận chuyển</span>
                                <span>30.000đ</span>
                            </div>
                            <div className="flex justify-between text-xl font-black text-slate-900 pt-2">
                                <span>Tổng thanh toán</span>
                                <span className="text-blue-600">32.030.000đ</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-8 bg-slate-50/80 flex flex-wrap gap-4 justify-end">
                        <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all">
                            Yêu cầu hỗ trợ
                        </button>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 transition-all">
                            Liên hệ người giao hàng
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChiTietDonHang;