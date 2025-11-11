import { Link } from "react-router-dom";
function TheoGioi() {

    return (
        <>
            <div className="lg:col-span-3">

                {/* NÚT QUAY LẠI - PHÍA TRÊN */}
                <Link to="/nguoi-dung/lich-su-mua"
                   
                    className="flex items-center text-primary-600 hover:text-primary-700 font-medium mb-8 transition-colors animate-fade-in-up-1"
                >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Quay lại Lịch sử Đơn hàng
                </Link>
                
                <h2 className="text-2xl md:text-3xl font-extrabold text-dark-900 text-center mb-4 animate-fade-in-up-1">
                    Theo Dõi Đơn Hàng Của Bạn
                </h2>
                <p className="text-center text-lg text-dark-600 mb-10 animate-fade-in-up-1">
                    Nhập mã đơn hàng và email để xem trạng thái giao hàng chi tiết.
                </p>

                {/* Khối Tìm Kiếm */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-gray-100 animate-fade-in-up-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            {/* Chuyển 'for' thành 'htmlFor' trong JSX */}
                            <label htmlFor="order-id" className="block text-sm font-medium text-dark-900 mb-1">Mã Đơn Hàng</label>
                            <input type="text" id="order-id" placeholder="Ví dụ: TECH2025-456" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-primary-500 outline-none transition-colors" value="TECH2025-456" />
                        </div>
                        <div className="md:col-span-1">
                            {/* Chuyển 'for' thành 'htmlFor' trong JSX */}
                            <label htmlFor="email" className="block text-sm font-medium text-dark-900 mb-1">Email</label>
                            <input type="email" id="email" placeholder="email@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-primary-500 outline-none transition-colors" value="nguyenvana@gmail.com" />
                        </div>
                    </div>
                    <button className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary-500/30">
                        <i className="fas fa-search mr-2"></i> TRA CỨU
                    </button>
                </div>

                {/* Kết Quả Đơn Hàng */}
                <div id="order-results" className="space-y-8">

                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-primary-100 animate-fade-in-up-2">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4">
                            <h3 className="text-xl font-bold text-dark-900">
                                Đơn Hàng <span className="text-primary-500">#TECH2025-456</span>
                            </h3>
                            <span className="mt-2 md:mt-0 bg-accent-500/10 text-accent-700 px-4 py-2 rounded-full text-base font-bold">
                                <i className="fas fa-check-circle mr-2"></i> ĐÃ GIAO HÀNG
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-dark-600">
                            <div>
                                <p className="font-bold text-dark-900">Ngày Đặt:</p>
                                <p>05/11/2025</p>
                            </div>
                            <div>
                                <p className="font-bold text-dark-900">Tổng Tiền:</p>
                                <p>12.520.000₫</p>
                            </div>
                            <div>
                                <p className="font-bold text-dark-900">Đơn Vị Vận Chuyển:</p>
                                <p>Viettel Post</p>
                            </div>
                            <div>
                                <p className="font-bold text-dark-900">Mã Vận Đơn:</p>
                                <p className="text-primary-500 font-medium">VT202500456</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in-up-3">
                        <h3 className="text-xl font-bold text-dark-900 mb-8">Chi Tiết Hành Trình</h3>

                        <div className="relative pl-6 md:pl-8">

                            {/* Cần đảm bảo CSS cho .timeline-line có sẵn (đã có trong file HTML gốc) */}
                            <div className="timeline-line"></div> 

                            <div className="timeline-step flex items-start pb-8">
                                <div className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center text-sm z-10 flex-shrink-0 shadow-md">
                                    <i className="fas fa-box"></i>
                                </div>
                                <div className="ml-4 md:ml-6 pt-0.5">
                                    <p className="font-bold text-dark-900">Đã Giao Hàng Thành Công</p>
                                    <p className="text-sm text-dark-600">Đơn hàng đã được giao đến người nhận và hoàn tất.</p>
                                    <p className="text-xs text-dark-500 mt-1">14:00 PM, 07/11/2025</p>
                                </div>
                            </div>

                            <div className="timeline-step flex items-start pb-8">
                                <div className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center text-sm z-10 flex-shrink-0 shadow-md">
                                    <i className="fas fa-truck"></i>
                                </div>
                                <div className="ml-4 md:ml-6 pt-0.5">
                                    <p className="font-bold text-dark-900">Đang Vận Chuyển</p>
                                    <p className="text-sm text-dark-600">Đơn hàng đang trên đường giao đến bạn.</p>
                                    <p className="text-xs text-dark-500 mt-1">08:00 AM, 06/11/2025 | Từ Kho Hà Nội</p>
                                </div>
                            </div>

                            <div className="timeline-step flex items-start pb-8">
                                <div className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center text-sm z-10 flex-shrink-0 shadow-md">
                                    <i className="fas fa-boxes-stacked"></i>
                                </div>
                                <div className="ml-4 md:ml-6 pt-0.5">
                                    <p className="font-bold text-dark-900">Đã Xác Nhận & Đang Đóng Gói</p>
                                    <p className="text-sm text-dark-600">Đơn hàng của bạn đang được chuẩn bị và đóng gói.</p>
                                    <p className="text-xs text-dark-500 mt-1">11:00 AM, 05/11/2025</p>
                                </div>
                            </div>

                            <div className="timeline-step flex items-start">
                                <div className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center text-sm z-10 flex-shrink-0 shadow-md">
                                    <i className="fas fa-file-invoice"></i>
                                </div>
                                <div className="ml-4 md:ml-6 pt-0.5">
                                    <p className="font-bold text-dark-900">Đặt Hàng Thành Công</p>
                                    <p className="text-sm text-dark-600">Hệ thống đã ghi nhận đơn hàng của bạn.</p>
                                    <p className="text-xs text-dark-500 mt-1">09:30 AM, 05/11/2025</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="text-center mt-10 animate-fade-in-up-3">
                        <p className="text-dark-600">Bạn cần hỗ trợ? Liên hệ với chúng tôi:</p>
                        <a href="tel:19001234" className="text-primary-500 font-bold hover:underline transition-colors block mt-2">
                            <i className="fas fa-phone-alt mr-2"></i> 1900 1234 (Tổng đài hỗ trợ)
                        </a>
                    </div>
                </div>

                {/* NÚT QUAY LẠI - PHÍA DƯỚI */}
                <div className="mt-12 pt-6 border-t border-dark-100 animate-fade-in-up-3">
                    <Link to="/nguoi-dung/lich-su-mua"
                          className="flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Quay lại Lịch sử Đơn hàng
                    </Link>
                </div>

            </div>

        </>
    );
};
export default TheoGioi;