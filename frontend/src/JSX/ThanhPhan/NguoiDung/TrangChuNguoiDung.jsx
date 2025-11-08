import { Outlet, Link } from "react-router-dom";

function TrangChuNguoiDung() {
    return (
        <>
            {/* Toàn màn hình, nền sáng */}
            <main className="w-full min-h-screen bg-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Sidebar */}
                        <aside className="lg:col-span-1 animate-fade-in-up-1">
                            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src="https://picsum.photos/200/200?random=10"
                                        alt="Avatar"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">Xin chào,</h2>
                                        <p className="text-primary-500 font-medium">Nguyễn Văn A</p>
                                    </div>
                                </div>

                                <nav className="space-y-2">
                                    <Link
                                        to=""
                                        className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-600 rounded-lg font-medium transition-colors"
                                    >
                                        <i className="fas fa-user-circle w-5 text-center"></i>
                                        <span>Tổng Quan</span>
                                    </Link>

                                    <Link
                                        to="/nguoi-dung"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg font-medium transition-colors"
                                    >
                                        <i className="fas fa-edit w-5 text-center"></i>
                                        <span>Thông Tin Cá Nhân</span>
                                    </Link>

                                    <Link
                                        to="lich-su-don-hang"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg font-medium transition-colors"
                                    >
                                        <i className="fas fa-box-open w-5 text-center"></i>
                                        <span>Lịch Sử Đơn Hàng</span>
                                    </Link>

                                    <Link
                                        to="dia-chi-cua-toi"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg font-medium transition-colors"
                                    >
                                        <i className="fas fa-map-marker-alt w-5 text-center"></i>
                                        <span>Địa Chỉ Của Tôi</span>
                                    </Link>

                                    <Link
                                        to="san-pham-yeu-thich"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg font-medium transition-colors"
                                    >
                                        <i className="fas fa-heart w-5 text-center"></i>
                                        <span>Danh Sách Yêu Thích</span>
                                    </Link>

                                    <div className="border-t border-gray-200 my-2"></div>

                                    <Link
                                        to=""
                                        className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg font-medium transition-colors"
                                    >
                                        <i className="fas fa-sign-out-alt w-5 text-center"></i>
                                        <span>Đăng Xuất</span>
                                    </Link>
                                </nav>
                            </div>
                        </aside>

                        {/* Phần nội dung chính */}
                        <section className="lg:col-span-3 space-y-8">
                            
                  <Outlet />
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}

export default TrangChuNguoiDung;
