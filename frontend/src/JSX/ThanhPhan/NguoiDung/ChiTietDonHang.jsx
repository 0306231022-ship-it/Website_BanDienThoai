import React from 'react';
import { Link } from 'react-router-dom'; // BỔ SUNG: Import <Link>

function ChiTietDonHang() {
    return (
        <>
            {/* SỬA LỖI: Tất cả 'class' đã được đổi thành 'className' */}
            <section className="lg:col-span-3">
                
                {/* Card chứa nội dung */}
                <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
                    
                    {/* 1. Header Đơn Hàng */}
                    <div>
                        {/* BỔ SUNG: Dùng <Link> thay vì <a> */}
                        <Link to="/tai-khoan/lich-su-don-hang" className="text-primary-500 hover:text-primary-600 font-medium transition-colors mb-4 inline-block">
                            <i className="fas fa-arrow-left mr-2"></i>
                            Quay lại Lịch Sử Đơn Hàng
                        </Link>
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                            <div>
                                <h2 className="text-2xl font-bold text-dark-900">Chi Tiết Đơn Hàng #TECH2025-456</h2>
                                <p className="text-dark-600">Ngày đặt: 05/11/2025</p>
                            </div>
                            <span className="self-start inline-block bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium">
                                Đã Giao Hàng
                            </span>
                        </div>
                    </div>

                    {/* 2. Thanh Trạng Thái */}
                    <div className="w-full pt-4">
                        <h3 className="text-lg font-semibold text-dark-900 mb-4">Theo dõi đơn hàng</h3>
                        <div className="flex items-center">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-primary-500">
                                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center">
                                    <i className="fas fa-receipt"></i>
                                </div>
                                <span className="text-xs font-medium mt-2 text-center">Đặt Hàng</span>
                            </div>
                            {/* Connector 1 */}
                            <div className="flex-1 h-1 bg-primary-500"></div>
                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-primary-500">
                                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center">
                                    <i className="fas fa-box"></i>
                                </div>
                                <span className="text-xs font-medium mt-2 text-center">Đang Xử Lý</span>
                            </div>
                            {/* Connector 2 */}
                            <div className="flex-1 h-1 bg-primary-500"></div>
                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-primary-500">
                                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center">
                                    <i className="fas fa-truck"></i>
                                </div>
                                <span className="text-xs font-medium mt-2 text-center">Đang Giao</span>
                            </div>
                            {/* Connector 3 */}
                            <div className="flex-1 h-1 bg-primary-500"></div>
                            {/* Step 4 */}
                            <div className="flex flex-col items-center text-primary-500">
                                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <span className="text-xs font-medium mt-2 text-center">Đã Giao</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* 3. Danh Sách Sản Phẩm */}
                    <div>
                        <h3 className="text-xl font-bold text-dark-900 mb-4">Các Sản Phẩm</h3>
                        <div className="space-y-4 divide-y divide-dark-100">
                            {/* Item 1 */}
                            <div className="flex items-center gap-4 pt-4">
                                <img src="https://picsum.photos/300/300?random=2" alt="Sản phẩm" className="w-16 h-16 rounded-lg object-cover"/>
                                <div className="flex-1">
                                    <p className="font-medium text-dark-900">AI Phone Pro 2025</p>
                                    <p className="text-sm text-dark-600">Số lượng: 1</p>
                                </div>
                                <div className="w-32 text-right">
                                    <p className="font-medium text-dark-900">12.990.000₫</p>
                                    <button className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors mt-1">
                                        Mua Lại
                                    </button>
                                </div>
                            </div>
                            {/* Item 2 */}
                            <div className="flex items-center gap-4 pt-4">
                                <img src="https://picsum.photos/300/300?random=3" alt="Sản phẩm" className="w-16 h-16 rounded-lg object-cover"/>
                                <div className="flex-1">
                                    <p className="font-medium text-dark-900">FoldMax Z</p>
                                    <p className="text-sm text-dark-600">Số lượng: 1</p>
                                </div>
                                <div className="w-32 text-right">
                                    <p className="font-medium text-dark-900">24.990.000₫</p>
                                    <button className="text-xs font-medium text-primary-500 hover:text-primary-600 transition-colors mt-1">
                                        Mua Lại
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Thông Tin & Tổng Tiền */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-dark-100">
                        {/* Cột Thông Tin Giao Hàng */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-dark-900">Thông Tin Giao Hàng</h3>
                            <p className="font-medium text-dark-900">Nguyễn Văn A</p>
                            <p className="text-dark-600">0901 234 567</p>
                            <p className="text-dark-600">123 Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP. Hồ Chí Minh</p>
                        </div>
                        {/* Cột Tổng Tiền */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-dark-900">Chi Tiết Thanh Toán</h3>
                            <div className="flex justify-between">
                                <span className="text-dark-600">Tạm tính:</span>
                                <span className="font-medium text-dark-900">37.980.000₫</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-dark-600">Phí vận chuyển:</span>
                                <span className="font-medium text-dark-900">0₫</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-dark-600">Giảm giá:</span>
                                <span className="font-medium text-dark-900">-0₫</span>
                            </div>
                            <div className="border-t border-dark-100 pt-3 mt-3"></div>
                            <div className="flex justify-between text-xl font-bold">
                                <span className="text-dark-900">Tổng cộng:</span>
                                <span className="text-primary-500">37.980.000₫</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
};
export default ChiTietDonHang;