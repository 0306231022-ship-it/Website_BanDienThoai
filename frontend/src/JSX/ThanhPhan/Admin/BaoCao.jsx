function BaoCao(){
    return(
        <>
        <section id="section-reports" className="section" aria-label="Trang Báo cáo và Thống kê">
    
    <div className="flex items-center justify-between mb-6 mt-6 border-b pb-3 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Báo Cáo & Phân Tích Hiệu suất</h2>
        <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 font-medium">Chọn kỳ báo cáo:</span>
            <select className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-teal-500 focus:border-teal-500 transition" aria-label="Chọn thời gian báo cáo">
                <option>Tháng này</option>
                <option>30 ngày gần nhất</option>
                <option>Quý này</option>
                <option>Năm nay</option>
            </select>
        </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white rounded-xl p-5 shadow-lg border-l-4 border-teal-600 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500">Doanh thu Thuần</div>
                <i className="fas fa-chart-bar text-teal-600 text-xl"></i>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">2.54 Tỷ ₫</div>
            <p className="text-sm text-green-600 mt-1"><i className="fas fa-arrow-up mr-1"></i> +12.5% so với tháng trước</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-lg border-l-4 border-green-600 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500">Lợi nhuận Gộp</div>
                <i className="fas fa-funnel-dollar text-green-600 text-xl"></i>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">450 Triệu ₫</div>
            <p className="text-sm text-red-600 mt-1"><i className="fas fa-arrow-down mr-1"></i> -3.1% so với tháng trước</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-lg border-l-4 border-yellow-600 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500">Tỷ lệ Chuyển đổi</div>
                <i className="fas fa-percentage text-yellow-600 text-xl"></i>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">4.1%</div>
            <p className="text-sm text-green-600 mt-1"><i className="fas fa-arrow-up mr-1"></i> +0.5 điểm phần trăm</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-lg border-l-4 border-blue-600 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500">Giá trị Đơn hàng TB (AOV)</div>
                <i className="fas fa-money-bill-wave text-blue-600 text-xl"></i>
            </div>
            <div className="mt-2 text-3xl font-bold text-gray-900">4.2 Triệu ₫</div>
            <p className="text-sm text-gray-500 mt-1">Tổng cộng 590 đơn hàng</p>
        </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Biểu đồ Doanh thu & Đơn hàng (Theo ngày)</h3>
            <div className="w-full h-80 relative" aria-label="Biểu đồ doanh thu trong 30 ngày">
                <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
                    <polyline fill="none" stroke="#14b8a6" stroke-width="3" 
                              points="0,140 40,120 80,100 120,90 160,85 200,60 240,70 280,50 320,30 360,40 400,20" />
                    <polyline fill="none" stroke="#9ca3af" stroke-width="2" stroke-dasharray="4 2"
                              points="0,100 40,110 80,120 120,115 160,105 200,90 240,100 280,85 320,70 360,60 400,50" />
                </svg>
                <div className="text-sm text-gray-500 mt-2 flex justify-between">
                    <span>Thấp nhất (20 Tỷ)</span>
                    <span className="text-teal-600 font-semibold">Doanh thu</span>
                    <span className="text-gray-500 font-semibold">Đơn hàng</span>
                    <span>Cao nhất (40 Tỷ)</span>
                </div>
            </div>
        </div>

        <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Top 5 Sản phẩm Bán chạy</h3>
            <ul className="divide-y divide-gray-100">
                <li className="py-3 flex items-center justify-between">
                    <span className="font-medium text-gray-900 truncate">1. AI Phone Pro 2025</span>
                    <span className="text-sm text-teal-600 font-semibold">120 sp</span>
                </li>
                <li className="py-3 flex items-center justify-between">
                    <span className="font-medium text-gray-900 truncate">2. FoldMax Z (Titan)</span>
                    <span className="text-sm text-teal-600 font-semibold">95 sp</span>
                </li>
                <li className="py-3 flex items-center justify-between">
                    <span className="font-medium text-gray-900 truncate">3. Tai nghe Max Sound X</span>
                    <span className="text-sm text-teal-600 font-semibold">88 sp</span>
                </li>
                <li className="py-3 flex items-center justify-between">
                    <span className="font-medium text-gray-900 truncate">4. Eco Phone S</span>
                    <span className="text-sm text-teal-600 font-semibold">74 sp</span>
                </li>
                <li className="py-3 flex items-center justify-between">
                    <span className="font-medium text-gray-900 truncate">5. Sạc nhanh 65W Pro</span>
                    <span className="text-sm text-teal-600 font-semibold">61 sp</span>
                </li>
            </ul>
        </div>
    </div>
    
    ---

    <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Báo cáo Phân tích Chi tiết</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            <div className="bg-white p-5 rounded-xl shadow-lg border-t-4 border-yellow-500 hover:shadow-xl cursor-pointer transition">
                <div className="flex items-center space-x-3">
                    <i className="fas fa-users text-yellow-600 text-3xl"></i>
                    <div>
                        <div className="font-bold text-lg text-gray-900">Báo cáo Khách hàng</div>
                        <p className="text-sm text-gray-600">Phân tích hành vi, nhóm khách hàng VIP.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-lg border-t-4 border-red-500 hover:shadow-xl cursor-pointer transition">
                <div className="flex items-center space-x-3">
                    <i className="fas fa-warehouse text-red-600 text-3xl"></i>
                    <div>
                        <div className="font-bold text-lg text-gray-900">Báo cáo Tồn kho</div>
                        <p className="text-sm text-gray-600">Cảnh báo tồn kho thấp, sản phẩm sắp hết.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-lg border-t-4 border-purple-500 hover:shadow-xl cursor-pointer transition">
                <div className="flex items-center space-x-3">
                    <i className="fas fa-globe text-purple-600 text-3xl"></i>
                    <div>
                        <div className="font-bold text-lg text-gray-900">Báo cáo Nguồn truy cập</div>
                        <p className="text-sm text-gray-600">Đánh giá hiệu quả các kênh marketing.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
        </>
    );
};
export default BaoCao;