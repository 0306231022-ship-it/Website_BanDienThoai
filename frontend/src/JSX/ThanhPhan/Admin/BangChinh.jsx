function BangChinh(){
    return(
        <>
<section id="section-overview" className="section" aria-label="Tổng quan">
    <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-dark-900">Tổng Quan</h1>
        <span className="text-sm text-gray-500">Cập nhật gần đây • Bảng điều khiển</span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Doanh thu tháng này</div>
                <i className="fas fa-dollar-sign text-green-500"></i>
            </div>
            <div className="mt-2 text-2xl font-bold text-dark-900">1,240,000,000₫</div>
            <div className="h-2 bg-green-100 rounded-full mt-3">
                <div className="h-2 rounded-full bg-green-500" Style="width:72%"></div>
            </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Đơn hàng hôm nay</div>
                <i className="fas fa-truck text-blue-500"></i>
            </div>
            <div className="mt-2 text-2xl font-bold text-dark-900">128</div>
            <div className="h-2 bg-blue-100 rounded-full mt-3">
                <div className="h-2 rounded-full bg-blue-500" Style="width:54%"></div>
            </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Khách hàng mới</div>
                <i className="fas fa-user-plus text-yellow-500"></i>
            </div>
            <div className="mt-2 text-2xl font-bold text-dark-900">342</div>
            <div className="h-2 bg-yellow-100 rounded-full mt-3">
                <div className="h-2 rounded-full bg-yellow-500" Style="width:66%"></div>
            </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Đánh giá trung bình</div>
                <i className="fas fa-star text-amber-400"></i>
            </div>
            <div className="mt-2 text-2xl font-bold text-dark-900">4.7/5</div>
            <div className="h-2 bg-amber-100 rounded-full mt-3">
                <div className="h-2 rounded-full bg-amber-500" Style="width:80%"></div>
            </div>
        </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-dark-900">Hoạt động gần đây</h3>
                <span className="text-xs text-gray-500">Last 24h</span>
            </div>
            <ul className="divide-y divide-gray-100">
                <li className="py-3 flex items-center justify-between">
                    <span>Đơn hàng #10234 đã thanh toán</span>
                    <span className="text-sm text-gray-500">1m trước</span>
                </li>
                <li className="py-3 flex items-center justify-between">
                    <span>Khách hàng mới: Nguyen Hai</span>
                    <span className="text-sm text-gray-500">12m trước</span>
                </li>
                <li className="py-3 flex items-center justify-between">
                    <span>Cập nhật tồn kho sản phẩm FoldMax Z</span>
                    <span className="text-sm text-gray-500">2h trước</span>
                </li>
            </ul>
        </div>

        <div className="bg-white rounded-xl p-4 shadow overflow-hidden">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-dark-900">Biểu đồ lưu lượng truy cập</h3>
                <span className="text-xs text-gray-500">Realtime</span>
            </div>
            <div className="w-full h-40 relative" aria-label="Biểu đồ lưu lượng">
                <svg viewBox="0 0 420 140" className="w-full h-full" preserveAspectRatio="none" aria-label="Biểu đồ lưu lượng truy cập">
                    <polyline fill="none" stroke="#0ea5e9" stroke-width="3" points="0,110 40,100 80,120 120,90 160,100 200,75 240,95 280,60 320,70 360,40 400,60" />
                </svg>
            </div>
        </div>
    </div>
</section>
        </>
    );
};
export default BangChinh;