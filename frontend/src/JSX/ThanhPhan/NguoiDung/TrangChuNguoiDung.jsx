import { Link } from "react-router-dom";
function TrangChuNguoiDung() {
    return (
        <>
  
 <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                
                {/* Nút quay lại */}
                <button 
                    className="flex items-center text-gray-600 hover:text-primary transition"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" 
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Quay lại
                </button>

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-primary flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" 
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Phone<span className="text-secondary">Store</span>
                </Link>

                {/* Xin chào */}
                <p className="text-lg font-semibold text-gray-600">Xin chào, Nguyễn Văn A</p>
            </div>
        </header>

   <main className=" mt-16 py-16 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold mb-8 text-primary">Bảng Điều Khiển Tài Khoản</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                
             
                <nav className="lg:w-1/4">
                    <div className="bg-white p-6 rounded-xl shadow-lg space-y-2">
                  
                        <Link to="" onclick="showSection('dashboard')" id="nav-dashboard"
                           className="nav-item flex items-center p-3 rounded-lg text-lg font-semibold bg-blue-100 text-primary transition duration-200 hover:bg-blue-50">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3"></path></svg>
                            Tổng Quan
                        </Link>
                        <Link to="" onclick="showSection('profile')" id="nav-profile"
                           className="nav-item flex items-center p-3 rounded-lg text-lg font-medium text-gray-700 transition duration-200 hover:bg-gray-100">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            Thông Tin Cá Nhân
                        </Link>
                        <Link to="" onclick="showSection('orders')" id="nav-orders"
                           className="nav-item flex items-center p-3 rounded-lg text-lg font-medium text-gray-700 transition duration-200 hover:bg-gray-100">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                            Đơn Hàng Của Tôi
                        </Link>
                        <Link to="" onclick="showSection('addresses')" id="nav-addresses"
                           className="nav-item flex items-center p-3 rounded-lg text-lg font-medium text-gray-700 transition duration-200 hover:bg-gray-100">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            Sổ Địa Chỉ
                        </Link>
                        
    
                        <Link to="" onclick="showSection('news')" id="nav-news"
                           className="nav-item flex items-center p-3 rounded-lg text-lg font-medium text-gray-700 transition duration-200 hover:bg-gray-100">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 002 2h2m-7.5-6.5h3m-3 0h-3m3 3h3m-3 0h-3"></path></svg>
                            Tin Tức Mới Nhất
                        </Link>

                        <div className="border-t my-2 pt-2"></div>
                         <Link to="" onclick="showSection('security')" id="nav-security"
                           className="nav-item flex items-center p-3 rounded-lg text-lg font-medium text-gray-700 transition duration-200 hover:bg-gray-100">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            Bảo Mật
                        </Link>
                        <Link to="" onclick="handleLogout()"
                           className="flex items-center p-3 rounded-lg text-lg font-medium text-danger transition duration-200 hover:bg-red-50">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-3m6-2V7a3 3 0 013-3h3"></path></svg>
                            Đăng Xuất
                        </Link>
                    </div>
                </nav>

          
                <div className="lg:w-3/4 bg-white p-6 md:p-8 rounded-xl shadow-lg">
                    <div id="content-dashboard" className="content-section">
                    
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Tổng Quan Tài Khoản</h2>
                        
                        <p className="text-xl mb-6">Chào mừng trở lại, <span className="font-bold text-primary" id="userName">Nguyễn Văn A</span>!</p>

                      
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-blue-50 p-5 rounded-xl shadow-sm border-l-4 border-primary">
                                <p className="text-sm text-gray-500">Tổng số đơn hàng</p>
                                <p className="text-3xl font-bold text-primary mt-1" id="totalOrders">3</p>
                            </div>
                            <div className="bg-yellow-50 p-5 rounded-xl shadow-sm border-l-4 border-secondary">
                                <p className="text-sm text-gray-500">Đơn hàng chờ xử lý</p>
                                <p className="text-3xl font-bold text-secondary mt-1" id="pendingOrders">1</p>
                            </div>
                            <div className="bg-green-50 p-5 rounded-xl shadow-sm border-l-4 border-success">
                                <p className="text-sm text-gray-500">Điểm thưởng</p>
                                <p className="text-3xl font-bold text-success mt-1">2,500</p>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Đơn Hàng Gần Đây</h3>
                        <div id="recentOrdersList">
                          
                        </div>
                        <Link to="" onclick="showSection('orders')" className="inline-block mt-4 text-primary font-medium hover:text-blue-700">Xem tất cả đơn hàng &rarr;</Link>

                    </div>

                    <div id="content-profile" className="content-section hidden">
                     
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Thông Tin Cá Nhân</h2>
                        <form onsubmit="saveProfile(event)" className="space-y-4 max-w-lg">
                            <div>
                                <label for="profileName" className="block text-sm font-medium text-gray-700">Họ và Tên</label>
                                <input type="text" id="profileName" value="" required
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary focus:border-primary"/>
                            </div>
                            <div>
                                <label for="profileEmail" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="profileEmail" value="" disabled
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-gray-100 cursor-not-allowed"/>
                            </div>
                             <div>
                                <label for="profilePhone" className="block text-sm font-medium text-gray-700">Số Điện Thoại</label>
                                <input type="tel" id="profilePhone" value=""
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary focus:border-primary"/>
                            </div>
                            <button type="submit" className="bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg">
                                Lưu Thay Đổi
                            </button>
                            <p id="profileStatus" className="mt-3 text-sm font-medium"></p>
                        </form>
                    </div>

                    <div id="content-orders" className="content-section hidden">
                       
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Lịch Sử Đơn Hàng</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã Đơn Hàng</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Đặt</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng Cộng</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                                        <th className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody id="ordersTableBody" className="bg-white divide-y divide-gray-200">
                                  
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div id="content-addresses" className="content-section hidden">
                      
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Sổ Địa Chỉ Giao Hàng</h2>
                        <div id="addressesList" className="space-y-4">
                           
                        </div>
                        <button onclick="addAddress()" className="mt-6 flex items-center bg-secondary text-primary font-bold py-2 px-4 rounded-xl hover:bg-yellow-400 transition duration-300">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Thêm Địa Chỉ Mới
                        </button>
                    </div>
                    
                 
                    <div id="content-news" className="content-section hidden">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Tin Tức & Khuyến Mãi Mới Nhất</h2>
                        <p className="text-lg text-gray-600 mb-6">Cập nhật những thông tin công nghệ, sản phẩm và ưu đãi đặc biệt từ PhoneStore.</p>

                        <div id="newsList" className="space-y-6">
                          
                            <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition duration-200 cursor-pointer shadow-sm">
                                <span className="text-xs font-semibold text-white bg-primary px-3 py-1 rounded-full mb-2 inline-block">Khuyến Mãi</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-1">Sự kiện Flash Sale cuối tuần: Giảm giá đến 50% phụ kiện!</h3>
                                <p className="text-sm text-gray-500 mt-1">20/10/2024</p>
                                <p className="mt-2 text-gray-700 line-clamp-2">Cơ hội vàng để sở hữu các loại ốp lưng, tai nghe, sạc dự phòng chính hãng với mức giá không thể tin được. Chương trình chỉ diễn ra trong 48 giờ!</p>
                                <Link to="" onclick="showModal('Chi tiết khuyến mãi Flash Sale.', 'Tin tức')" className="text-primary font-medium text-sm mt-2 inline-block hover:underline">Đọc thêm &rarr;</Link>
                            </div>
                            
                          
                            <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition duration-200 cursor-pointer shadow-sm">
                                 <span className="text-xs font-semibold text-white bg-success px-3 py-1 rounded-full mb-2 inline-block">Tin Công Nghệ</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-1">Đánh giá chi tiết Chipset Xử Lý Di Động Thế Hệ Mới 2025</h3>
                                <p className="text-sm text-gray-500 mt-1">18/10/2024</p>
                                <p className="mt-2 text-gray-700 line-clamp-2">Phân tích chuyên sâu về hiệu năng, khả năng tiết kiệm pin và công nghệ AI tích hợp trên dòng chip di động cao cấp nhất sắp ra mắt.</p>
                                <Link to="" onclick="showModal('Chi tiết bài đánh giá Chipset.', 'Tin tức')" className="text-primary font-medium text-sm mt-2 inline-block hover:underline">Đọc thêm &rarr;</Link>
                            </div>

                        
                            <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition duration-200 cursor-pointer shadow-sm">
                                 <span className="text-xs font-semibold text-white bg-secondary px-3 py-1 rounded-full mb-2 inline-block">Sản Phẩm Mới</span>
                                <h3 className="text-xl font-bold text-gray-900 mt-1">Thông báo ra mắt Series Phone 16: Thiết kế đột phá, camera siêu nét</h3>
                                <p className="text-sm text-gray-500 mt-1">15/10/2024</p>
                                <p className="mt-2 text-gray-700 line-clamp-2">Thông tin chính thức về dòng sản phẩm mới nhất của hãng điện thoại hàng đầu, bao gồm giá bán dự kiến và ngày mở bán chính thức tại PhoneStore.</p>
                                <Link to="" onclick="showModal('Thông báo ra mắt Series Phone 16.', 'Tin tức')" className="text-primary font-medium text-sm mt-2 inline-block hover:underline">Đọc thêm &rarr;</Link>
                            </div>
                        </div>
                    </div>

                    <div id="content-security" className="content-section hidden">
                     
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">Bảo Mật Tài Khoản</h2>
                        <form onsubmit="changePassword(event)" className="space-y-4 max-w-lg">
                             <div>
                                <label for="currentPassword" className="block text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                                <input type="password" id="currentPassword" required
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary focus:border-primary"/>
                            </div>
                             <div>
                                <label for="newPassword" className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                                <input type="password" id="newPassword" required
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary focus:border-primary"/>
                            </div>
                             <div>
                                <label for="confirmNewPassword" className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
                                <input type="password" id="confirmNewPassword" required
                                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-primary focus:border-primary"/>
                            </div>
                            <button type="submit" className="bg-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition duration-300 shadow-lg">
                                Đổi Mật Khẩu
                            </button>
                            <p id="passwordStatus" className="mt-3 text-sm font-medium"></p>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </main>
    
    <div id="customModal" className="fixed inset-0 bg-gray-900 bg-opacity-50 hidden z-50 flex items-center justify-center p-4" onclick="closeModal()">
        <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6" onclick="event.stopPropagation()">
            <h3 id="modalTitle" className="text-xl font-bold mb-4 text-gray-900">Thông báo</h3>
            <p id="modalMessage" className="text-gray-600 mb-6"></p>
            <div className="flex justify-end space-x-3">
                <button id="modalConfirmButton" onclick="closeModal(true)" className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 hidden">Xác nhận</button>
                <button id="modalCloseButton" onclick="closeModal(false)" className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200">Đóng</button>
            </div>
        </div>
    </div>



        </>
    );
};
export default TrangChuNguoiDung;