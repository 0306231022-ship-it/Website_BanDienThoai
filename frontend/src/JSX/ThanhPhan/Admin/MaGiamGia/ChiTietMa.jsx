function ChiTietMa() {
    return (
           <div className="max-w-6xl mx-auto">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center text-sm text-gray-500">
                <a href="#" className="hover:text-blue-600 transition-colors">Quản lý mã</a>
                <i className="fas fa-chevron-right mx-3 text-[10px] text-gray-300"></i>
                <span className="text-gray-900 font-semibold">Chi tiết mã: IPHONE15PRO</span>
            </div>
            <a href="#" className="group text-sm font-medium text-gray-600 hover:text-blue-600 flex items-center transition-all">
                <i className="fas fa-arrow-left mr-2 transition-transform group-hover:-translate-x-1"></i>
                Quay lại danh sách
            </a>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-5">
                <a href="#" className="hidden md:flex items-center justify-center w-11 h-11 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:shadow-sm transition-all">
                    <i className="fas fa-chevron-left"></i>
                </a>
                
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-100">
                    <i className="fas fa-ticket-alt"></i>
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">IPHONE15PRO</h1>
                        <span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-[11px] font-bold rounded-md uppercase border border-green-200">Đang chạy</span>
                    </div>
                    <p className="text-gray-500 mt-1">Chương trình: <span className="font-medium text-gray-800">Ưu đãi mở bán iPhone 15 Series</span></p>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <button className="flex-1 md:flex-none px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-white hover:border-gray-400 font-semibold transition flex items-center justify-center">
                    <i className="fas fa-pause mr-2 text-xs text-gray-400"></i> Tạm dừng
                </button>
                <button className="flex-1 md:flex-none px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-blue-600 font-semibold shadow-sm transition flex items-center justify-center">
                    <i className="fas fa-edit mr-2 text-xs"></i> Chỉnh sửa mã
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-[11px] text-gray-400 uppercase font-bold tracking-widest">Doanh thu</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">1.450.000.000đ</p>
                        <p className="text-xs text-green-600 mt-2 flex items-center font-medium">
                            <span className="flex items-center justify-center w-4 h-4 bg-green-50 rounded-full mr-1">
                                <i className="fas fa-arrow-up text-[10px]"></i>
                            </span> 
                            12% so với hôm qua
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-[11px] text-gray-400 uppercase font-bold tracking-widest">Lượt sử dụng</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">74 <span className="text-gray-300 text-lg font-normal">/ 100</span></p>
                        <div className="w-full bg-gray-100 h-2 mt-4 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full transition-all duration-1000" Style="width: 74%"></div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-[11px] text-gray-400 uppercase font-bold tracking-widest">Tiền đã giảm</p>
                        <p className="text-2xl font-bold text-orange-600 mt-2">74.000.000đ</p>
                        <p className="text-xs text-gray-400 mt-2 italic font-medium">~ 1.000.000đ / đơn hàng</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">Lịch sử giao dịch</h3>
                        <span className="text-xs text-gray-400 font-medium">Cập nhật: 2 phút trước</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-[11px] text-gray-400 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Khách hàng</th>
                                    <th className="px-6 py-4">Sản phẩm</th>
                                    <th className="px-6 py-4">Mã đơn hàng</th>
                                    <th className="px-6 py-4">Thời gian</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm">
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">Nguyễn Văn A</div>
                                        <div className="text-[11px] text-gray-400">ID: #USER001</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">iPhone 15 Pro Max 256GB</td>
                                    <td className="px-6 py-4">
                                        <span className="text-blue-600 font-medium hover:underline cursor-pointer">#DH10024</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-medium">10:30 - 24/03/2024</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">Trần Thị B</div>
                                        <div className="text-[11px] text-gray-400">ID: #USER042</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-medium">iPhone 15 Pro 128GB</td>
                                    <td className="px-6 py-4">
                                        <span className="text-blue-600 font-medium hover:underline cursor-pointer">#DH10025</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-medium">14:15 - 24/03/2024</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-gray-50/30 text-center">
                        <button className="text-sm text-blue-600 font-bold hover:text-blue-800 transition-colors">Xem toàn bộ 74 giao dịch</button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-6 pb-2 border-b border-gray-50 flex items-center">
                        <i className="fas fa-cog mr-2 text-gray-400"></i> Cấu hình mã
                    </h3>
                    <ul className="space-y-5">
                        <li className="flex justify-between items-center">
                            <span className="text-sm text-gray-400 font-medium">Loại giảm giá</span>
                            <span className="text-sm font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-lg">Cố định: 1M</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-sm text-gray-400 font-medium">Áp dụng cho</span>
                            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg italic">Apple Store</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-sm text-gray-400 font-medium">Đơn tối thiểu</span>
                            <span className="text-sm font-bold text-gray-800">20.000.000 đ</span>
                        </li>
                        <li className="flex justify-between items-start pt-2">
                            <span className="text-sm text-gray-400 font-medium">Thời gian hiệu lực</span>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-800">01/03/24</p>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter">Đến 31/03/24</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-amber-200/40 text-6xl rotate-12 transition-transform group-hover:scale-110">
                        <i className="fas fa-lightbulb"></i>
                    </div>
                    <h3 className="text-amber-800 font-bold text-sm mb-3 flex items-center">
                        <i className="fas fa-chart-line mr-2"></i> Gợi ý từ hệ thống
                    </h3>
                    <p className="text-xs text-amber-700/80 leading-relaxed font-medium">
                        Mã này đang đạt <span className="font-bold text-amber-900">hiệu suất cao (74%)</span>. Để tối ưu doanh thu cuối tháng, bạn nên tăng giới hạn lên 200 lượt hoặc đẩy thông báo qua App.
                    </p>
                </div>
            </div>

        </div>
    </div>
    );
};
export default ChiTietMa;