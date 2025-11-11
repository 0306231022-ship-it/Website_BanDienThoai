import { Link } from "react-router-dom";
function XemDon(){
    return(
        <>
            <div className="lg:col-span-3">
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-dark-900 mb-8 animate-fade-in-up-1">
                        Chi Tiết Đơn Hàng <span className="text-primary-500">#TECH2025-456</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        
                        <div className="lg:col-span-2 space-y-8">
                            
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in-up-2 border border-dark-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-dark-900">Trạng Thái Đơn Hàng</h3>
                                    <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                        Đã Giao Hàng
                                    </span>
                                </div>
                                
                                <div className="relative pt-4 pb-2">
                                    <div className="absolute left-3 md:left-5 top-0 bottom-0 w-0.5 bg-dark-100"></div>

                                    <div className="timeline-step complete flex items-start mb-6">
                                        <div className="timeline-icon w-6 h-6 md:w-10 md:h-10 rounded-full bg-accent-500 text-white flex items-center justify-center text-xs md:text-sm z-10 animate-step-1">
                                            <i className="fas fa-check"></i>
                                        </div>
                                        <div className="ml-4 md:ml-6 pt-1">
                                            <p className="font-bold text-dark-900">Đặt hàng thành công</p>
                                            <p className="text-sm text-dark-600">05/11/2025 09:30 AM</p>
                                        </div>
                                    </div>

                                    <div className="timeline-step complete flex items-start mb-6">
                                        <div className="timeline-icon w-6 h-6 md:w-10 md:h-10 rounded-full bg-accent-500 text-white flex items-center justify-center text-xs md:text-sm z-10 animate-step-2">
                                            <i className="fas fa-check"></i>
                                        </div>
                                        <div className="ml-4 md:ml-6 pt-1">
                                            <p className="font-bold text-dark-900">Đã Xác Nhận & Đang Đóng Gói</p>
                                            <p className="text-sm text-dark-600">05/11/2025 11:00 AM</p>
                                        </div>
                                    </div>

                                    <div className="timeline-step complete flex items-start mb-6">
                                        <div className="timeline-icon w-6 h-6 md:w-10 md:h-10 rounded-full bg-accent-500 text-white flex items-center justify-center text-xs md:text-sm z-10 animate-step-3">
                                            <i className="fas fa-check"></i>
                                        </div>
                                        <div className="ml-4 md:ml-6 pt-1">
                                            <p className="font-bold text-dark-900">Đang Vận Chuyển (Giao hàng dự kiến: 07/11/2025)</p>
                                            <p className="text-sm text-dark-600">06/11/2025 08:00 AM</p>
                                        </div>
                                    </div>

                                    <div className="timeline-step complete flex items-start">
                                        <div className="timeline-icon w-6 h-6 md:w-10 md:h-10 rounded-full bg-accent-500 text-white flex items-center justify-center text-xs md:text-sm z-10 animate-step-4">
                                            <i className="fas fa-check"></i>
                                        </div>
                                        <div className="ml-4 md:ml-6 pt-1">
                                            <p className="font-bold text-dark-900">Đã Giao Hàng Thành Công</p>
                                            <p className="text-sm text-dark-600">07/11/2025 02:00 PM</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-dark-100 animate-fade-in-up-3">
                                    <p className="text-sm text-dark-600 flex items-center gap-2">
                                        <i className="fas fa-truck text-primary-500"></i>
                                        Đơn vị vận chuyển: **Viettel Post** | Mã vận đơn: **VT202500456**
                                    </p>
                                </div>

                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in-up-3 border border-dark-100">
                                <h3 className="text-xl font-bold text-dark-900 mb-6">Danh Sách Sản Phẩm (1)</h3>
                                
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 border border-dark-100 p-4 rounded-xl">
                                    <img src="https://picsum.photos/300/300?random=2" alt="Sản phẩm" className="w-20 h-20 rounded-lg object-cover flex-shrink-0"/>
                                    <div className="flex-1">
                                        <p className="font-bold text-dark-900">AI Phone Pro 2025 (256GB, Xanh Ngân Hà)</p>
                                        <p className="text-sm text-dark-600 mt-1">Số lượng: 1 | Đơn giá: 12.990.000₫</p>
                                        <p className="text-sm text-dark-600">Bảo hành: 12 tháng chính hãng</p>
                                    </div>
                                    <div className="flex flex-col items-start md:items-end space-y-2 pt-2 md:pt-0">
                                        <p className="font-bold text-dark-900 whitespace-nowrap">12.990.000₫</p>
                                        
                                        <button className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-md">
                                            <i className="fas fa-star mr-1"></i> Bình Luận & Đánh Giá
                                        </button>
                                        
                                    </div>
                                </div>
                                
                            </div>

                        </div>

                        <div className="lg:col-span-1 space-y-8">
                            
                            <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in-up-2 border border-dark-100">
                                <h3 className="text-xl font-bold text-dark-900 mb-6">Thanh Toán</h3>
                                <div className="space-y-3 text-dark-700">
                                    <div className="flex justify-between">
                                        <span>Tạm tính (1 sản phẩm)</span>
                                        <span>12.990.000₫</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Phí vận chuyển</span>
                                        <span>30.000₫</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Mã giảm giá</span>
                                        <span className="text-red-600">- 500.000₫</span>
                                    </div>
                                </div>
                                <div className="border-t border-dark-100 mt-4 pt-4 flex justify-between items-center">
                                    <span className="text-lg font-bold text-dark-900">TỔNG CỘNG</span>
                                    <span className="text-2xl font-extrabold text-primary-500">12.520.000₫</span>
                                </div>
                                <p className="text-sm text-dark-600 mt-3">Hình thức: **Thanh toán khi nhận hàng (COD)**</p>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in-up-3 border border-dark-100">
                                <h3 className="text-xl font-bold text-dark-900 mb-6 flex items-center gap-2">
                                    <i className="fas fa-map-marker-alt text-dark-600 text-lg"></i> Thông Tin Giao Hàng
                                </h3>
                                <div className="space-y-4 text-dark-800">
                                    <div>
                                        <p className="font-bold">Người nhận:</p>
                                        <p>Nguyễn Văn A - 0987 654 321</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Địa chỉ:</p>
                                        <p>Số 456, Đường Hai Bà Trưng, Phường 1, Quận 3, TP. Hồ Chí Minh</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Ghi chú:</p>
                                        <p className="text-sm italic text-dark-600">Gọi điện trước 30 phút khi giao hàng.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4 animate-fade-in-up-4">
                                <button className="w-full bg-dark-800 hover:bg-dark-900 text-white py-3 rounded-xl font-medium transition-colors shadow-lg">
                                    Yêu Cầu Hóa Đơn VAT
                                </button>
                                <Link to="/nguoi-dung/lich-su-mua" className="block w-full text-center bg-dark-100 hover:bg-dark-200 text-dark-800 py-3 rounded-xl font-medium transition-colors">
                                    <i className="fas fa-arrow-left mr-2"></i> Trở Lại Lịch Sử
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
     

        </>
    );
};
export default XemDon