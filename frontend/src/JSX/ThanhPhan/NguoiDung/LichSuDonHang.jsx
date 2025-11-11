import { Link } from "react-router-dom";
function LichSuDonHang() {
    return (
        <>
      <div className="container mx-auto px-4">

                <section className="lg:col-span-3">
                    
                    <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in-up-2">
                        <h2 className="text-2xl font-bold text-dark-900 mb-6">Lịch Sử Đơn Hàng</h2>

                        <div className="flex flex-wrap space-x-2 border-b border-dark-100 mb-6">
                            <button className="px-4 py-2 font-medium text-primary-500 border-b-2 border-primary-500 transition-colors">
                                Tất cả (3)
                            </button>
                            <button className="px-4 py-2 font-medium text-dark-600 hover:text-dark-900 hover:border-b-2 hover:border-dark-300 transition-colors">
                                Đang xử lý (1)
                            </button>
                            <button className="px-4 py-2 font-medium text-dark-600 hover:text-dark-900 hover:border-b-2 hover:border-dark-300 transition-colors">
                                Đã giao (1)
                            </button>
                            <button className="px-4 py-2 font-medium text-dark-600 hover:text-dark-900 hover:border-b-2 hover:border-dark-300 transition-colors">
                                Đã hủy (1)
                            </button>
                        </div>

                        <div className="space-y-6">

                            <div className="border border-dark-100 rounded-2xl p-6">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 pb-4 border-b border-dark-100">
                                    <div>
                                        <h3 className="text-lg font-bold">Mã đơn hàng: <span className="text-primary-500">#TECH2025-456</span></h3>
                                        <p className="text-sm text-dark-600">Ngày đặt: 05/11/2025</p>
                                    </div>
                                    <span className="inline-block self-start bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Đã Giao Hàng
                                    </span>
                                </div>
                                <div className="space-y-4 py-4">
                                    <div className="flex items-center gap-4">
                                        <img src="https://picsum.photos/300/300?random=2" alt="Sản phẩm" className="w-16 h-16 rounded-lg object-cover"/>
                                        <div className="flex-1">
                                            <p className="font-medium text-dark-900">AI Phone Pro 2025</p>
                                            <p className="text-sm text-dark-600">Số lượng: 1</p>
                                        </div>
                                        <p className="font-medium text-dark-900">12.990.000₫</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pt-4 border-t border-dark-100">
                                    <span className="text-lg">Tổng cộng: <span className="text-xl font-bold text-dark-900">12.990.000₫</span></span>
                                    <div className="flex gap-2">
                                        <Link to="/nguoi-dung/lich-su-mua/theo-gioi" className="bg-dark-100 hover:bg-dark-200 text-dark-800 px-4 py-2 rounded-lg font-medium transition-colors">Mua Lại</Link>
                                        <Link to="/nguoi-dung/lich-su-mua/xem-chi-tiet" className="bg-dark-800 hover:bg-dark-900 text-white px-4 py-2 rounded-lg font-medium transition-colors">Xem Chi Tiết</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-dark-100 rounded-2xl p-6">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 pb-4 border-b border-dark-100">
                                    <div>
                                        <h3 className="text-lg font-bold">Mã đơn hàng: <span className="text-primary-500">#TECH2025-123</span></h3>
                                        <p className="text-sm text-dark-600">Ngày đặt: 28/10/2025</p>
                                    </div>
                                    <span className="inline-block self-start bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Đang Vận Chuyển
                                    </span>
                                </div>
                                <div className="space-y-4 py-4">
                                    <div className="flex items-center gap-4">
                                        <img src="https://picsum.photos/300/300?random=3" alt="Sản phẩm" className="w-16 h-16 rounded-lg object-cover"/>
                                        <div className="flex-1">
                                            <p className="font-medium text-dark-900">FoldMax Z</p>
                                            <p className="text-sm text-dark-600">Số lượng: 1</p>
                                        </div>
                                        <p className="font-medium text-dark-900">24.990.000₫</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pt-4 border-t border-dark-100">
                                    <span className="text-lg">Tổng cộng: <span className="text-xl font-bold text-dark-900">24.990.000₫</span></span>
                                    <div className="flex gap-2">
                                        <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">Theo Dõi Đơn</button>
                                        <button className="bg-dark-800 hover:bg-dark-900 text-white px-4 py-2 rounded-lg font-medium transition-colors">Xem Chi Tiết</button>
                                    </div>
                                </div>
                            </div>

                            <div className="border border-dark-100 rounded-2xl p-6 opacity-70">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 pb-4 border-b border-dark-100">
                                    <div>
                                        <h3 className="text-lg font-bold">Mã đơn hàng: <span className="text-primary-500">#TECH2025-007</span></h3>
                                        <p className="text-sm text-dark-600">Ngày đặt: 15/10/2025</p>
                                    </div>
                                    <span className="inline-block self-start bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Đã Hủy
                                    </span>
                                </div>
                                <div className="space-y-4 py-4">
                                    <div className="flex items-center gap-4">
                                        <img src="https://picsum.photos/300/300?random=4" alt="Sản phẩm" className="w-16 h-16 rounded-lg object-cover"/>
                                        <div className="flex-1">
                                            <p className="font-medium text-dark-900">Eco Phone</p>
                                            <p className="text-sm text-dark-600">Số lượng: 1</p>
                                        </div>
                                        <p className="font-medium text-dark-900">8.490.000₫</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pt-4 border-t border-dark-100">
                                    <span className="text-lg">Tổng cộng: <span className="text-xl font-bold text-dark-900">8.490.000₫</span></span>
                                    <div className="flex gap-2">
                                        <button className="bg-dark-800 hover:bg-dark-900 text-white px-4 py-2 rounded-lg font-medium transition-colors">Xem Chi Tiết</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};
export default LichSuDonHang;