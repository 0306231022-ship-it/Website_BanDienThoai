function ChiTietFlashSale() {
    return (
        <>
           <div class="flex h-screen overflow-hidden">

    

        <main class="flex-1 flex flex-col overflow-y-auto">
            
            <header class="bg-white shadow-sm px-6 py-4 z-10">
                <nav class="flex text-sm text-gray-500 mb-2">
                    <a href="#" class="hover:text-blue-600">Khuyến mãi</a>
                    <span class="mx-2">/</span>
                    <a href="#" class="hover:text-blue-600">Danh sách</a>
                    <span class="mx-2">/</span>
                    <span class="text-gray-800 font-medium">Chi tiết chiến dịch</span>
                </nav>
                <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            Flash Sale Cuối Tuần
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Đang chạy
                            </span>
                        </h1>
                        <p class="text-sm text-gray-500 mt-1">10:00, 25/10/2026 - 23:59, 26/10/2026</p>
                    </div>
                    <div class="flex gap-2">
                        <button class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition shadow-sm">
                            Tạm dừng
                        </button>
                        <button class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition shadow-sm flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> Xuất báo cáo
                        </button>
                        <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition shadow-md">
                            Chỉnh sửa
                        </button>
                    </div>
                </div>
            </header>

            <div class="p-6 space-y-6 max-w-7xl mx-auto w-full">
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-gray-500 text-sm font-medium">Tổng Doanh Thu</span>
                            <span class="p-2 bg-green-50 text-green-600 rounded-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span>
                        </div>
                        <div class="text-2xl font-bold text-gray-900">485.500.000đ</div>
                        <div class="text-xs text-green-600 flex items-center gap-1 mt-2">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                            <span>+12.5% so với giờ trước</span>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-gray-500 text-sm font-medium">Tổng Đơn Hàng</span>
                            <span class="p-2 bg-blue-50 text-blue-600 rounded-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg></span>
                        </div>
                        <div class="text-2xl font-bold text-gray-900">142 Đơn</div>
                        <div class="text-xs text-gray-500 flex items-center gap-1 mt-2">
                            Đang xử lý: 12 | Đã giao: 130
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-gray-500 text-sm font-medium">Tỷ Lệ Bán Ra (Stock)</span>
                            <span class="p-2 bg-orange-50 text-orange-600 rounded-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg></span>
                        </div>
                        <div class="text-2xl font-bold text-gray-900">310 / 500 <span class="text-sm font-normal text-gray-500">sp</span></div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                            <div class="bg-orange-500 h-1.5 rounded-full" style="width: 62%"></div>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-gray-500 text-sm font-medium">Lượt Xem trang</span>
                            <span class="p-2 bg-purple-50 text-purple-600 rounded-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></span>
                        </div>
                        <div class="text-2xl font-bold text-gray-900">12,450</div>
                        <div class="text-xs text-gray-500 flex items-center gap-1 mt-2">
                            Tỷ lệ chuyển đổi: <span class="font-bold text-gray-800">1.14%</span>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 class="text-lg font-bold text-gray-800">Hiệu suất Sản phẩm</h2>
                        <button class="text-sm text-gray-500 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50">Lọc: Bán chạy nhất</button>
                    </div>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-sm text-gray-600">
                            <thead class="bg-gray-50/50 text-gray-500 uppercase text-xs font-semibold">
                                <tr>
                                    <th class="px-6 py-4">Sản phẩm</th>
                                    <th class="px-6 py-4">Giá Flash Sale</th>
                                    <th class="px-6 py-4">Mở bán</th>
                                    <th class="px-6 py-4 w-48">Tiến độ bán (Đã bán)</th>
                                    <th class="px-6 py-4 text-right">Doanh thu mang lại</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                
                                <tr class="hover:bg-gray-50 transition">
                                    <td class="px-6 py-4 flex items-center gap-3">
                                        <div class="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 border border-gray-200"></div>
                                        <div>
                                            <div class="font-bold text-gray-800 line-clamp-1">iPhone 15 Pro Max 256GB</div>
                                            <div class="text-xs text-gray-400">SKU: IP15PM-256-VN</div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 font-semibold text-red-600">28.990.000đ</td>
                                    <td class="px-6 py-4">100</td>
                                    <td class="px-6 py-4">
                                        <div class="flex justify-between text-xs mb-1">
                                            <span class="font-bold text-gray-800">95</span>
                                            <span class="text-red-500 font-bold">95%</span>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                                            <div class="bg-red-500 h-1.5 rounded-full" style="width: 95%"></div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-right font-bold text-gray-900">
                                        2.754.050.000đ
                                    </td>
                                </tr>

                                <tr class="hover:bg-gray-50 transition">
                                    <td class="px-6 py-4 flex items-center gap-3">
                                        <div class="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 border border-gray-200"></div>
                                        <div>
                                            <div class="font-bold text-gray-800 line-clamp-1">Samsung Galaxy S24 Ultra 5G</div>
                                            <div class="text-xs text-gray-400">SKU: SS-S24U-256</div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 font-semibold text-red-600">24.990.000đ</td>
                                    <td class="px-6 py-4">50</td>
                                    <td class="px-6 py-4">
                                        <div class="flex justify-between text-xs mb-1">
                                            <span class="font-bold text-gray-800">12</span>
                                            <span class="text-blue-500 font-bold">24%</span>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                                            <div class="bg-blue-500 h-1.5 rounded-full" style="width: 24%"></div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-right font-bold text-gray-900">
                                        299.880.000đ
                                    </td>
                                </tr>

                                <tr class="hover:bg-gray-50 transition bg-red-50/20">
                                    <td class="px-6 py-4 flex items-center gap-3">
                                        <div class="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 border border-gray-200 relative overflow-hidden">
                                            <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                <span class="text-[8px] text-white font-bold tracking-wider">HẾT</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold text-gray-800 line-clamp-1">Tai nghe AirPods Pro 2</div>
                                            <div class="text-xs text-gray-400">SKU: AP-PRO2-VN</div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 font-semibold text-gray-500">3.990.000đ</td>
                                    <td class="px-6 py-4">200</td>
                                    <td class="px-6 py-4">
                                        <div class="flex justify-between text-xs mb-1">
                                            <span class="font-bold text-gray-800">200</span>
                                            <span class="text-gray-500 font-bold">100%</span>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-1.5">
                                            <div class="bg-gray-500 h-1.5 rounded-full" style="width: 100%"></div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-right font-bold text-gray-900">
                                        798.000.000đ
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </main>
    </div>
        </>
    );
};
export default ChiTietFlashSale