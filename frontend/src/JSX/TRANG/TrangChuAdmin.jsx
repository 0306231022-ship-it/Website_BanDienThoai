import React, { useState } from 'react'; 
import BangChinh from '../ThanhPhan/Admin/BangChinh';
// Giả định các import khác (như API, ThongBao, CSS) đã có sẵn trong môi trường của bạn
// import { useNavigate } from "react-router-dom";
// import '../../CSS/TrangChuAD.css';
// import * as API from '../../JS/API/API';
// import * as ThongBao from '../../JS/FUNCTONS/ThongBao';

const Dashboard = () => {
    // 1. Khai báo state để quản lý việc hiển thị/ẩn dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const navigate = useNavigate(); // Giả sử dùng useNavigate nếu cần chuyển trang

    // 2. Hàm xử lý khi click vào nút chỉnh sửa thông tin
    const handleEditProfile = () => {
        setIsDropdownOpen(false); // Đóng dropdown sau khi click
        // Thêm logic chuyển hướng hoặc mở modal chỉnh sửa thông tin cá nhân
        // Ví dụ: navigate('/admin/edit-profile');
        console.log("Chuyển đến trang chỉnh sửa thông tin cá nhân");
    };

    // 3. Hàm xử lý khi click đăng xuất (có thể dùng hàm API.Logout hoặc tương tự)
    const handleLogout = () => {
        setIsDropdownOpen(false); // Đóng dropdown sau khi click
        // Thêm logic đăng xuất
        // Ví dụ: API.Logout().then(() => navigate('/admin/login'));
        console.log("Thực hiện đăng xuất");
        // Giả sử chuyển về trang đăng nhập admin
        // navigate('/DangNhap/dn_ad.html'); 
    };

    return (
        // Dùng class 'font-sans' (Tailwind default) và 'bg-gray-100'
        <div className="font-sans bg-gray-100 min-h-screen">
            {/* Sidebar - Dùng 'scrollbar-dark' đã định nghĩa bên trên */}
            {/* Thêm link cho Font Awesome */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
            
            <div className="fixed inset-y-0 left-0 w-72 bg-gray-900 text-gray-400 p-4 flex flex-col shadow-xl scrollbar-dark z-10">
                <div className="text-white font-bold text-2xl pb-4 mb-4 border-b border-gray-700 flex items-center">
                    <i className="fas fa-tools mr-3 text-blue-500"></i> {/* Icon cho Admin Panel */}
                    <span className="text-lg">Admin Panel</span>
                </div>
                <ul className="flex flex-col flex-grow space-y-1">
                    <li className="nav-item">
                        <a href="admin.html" className="flex items-center text-white bg-blue-600 font-medium hover:bg-blue-700 p-3 rounded-lg transition duration-200">
                            <i className="fas fa-tachometer-alt mr-3"></i> {/* Icon cho Dashboard */}
                            Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white p-3 rounded-lg transition duration-200">
                            <i className="fas fa-box-open mr-3"></i> {/* Icon cho Quản lý sản phẩm */}
                            Quản lý sản phẩm
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white p-3 rounded-lg transition duration-200">
                            <i className="fas fa-shopping-cart mr-3"></i> {/* Icon cho Quản lý đơn hàng */}
                            Quản lý đơn hàng
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white p-3 rounded-lg transition duration-200">
                            <i className="fas fa-users mr-3"></i> {/* Icon cho Quản lý người dùng */}
                            Quản lý người dùng
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white p-3 rounded-lg transition duration-200">
                           <i className="fas fa-cog mr-3"></i> {/* Icon cho Cài đặt */}
                           Cài đặt
                        </a>
                    </li>
                </ul>
                {/* Logout Section đã được di chuyển vào dropdown */}
                <div className="mt-auto pt-3 border-t border-gray-700">
                    <button 
                        onClick={handleLogout} 
                        className="w-full text-center block bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded-lg transition duration-200"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i> {/* Icon cho Đăng xuất */}
                        Đăng xuất
                    </button>
                </div>

            </div>

            {/* Main Content */}
            <div className="ml-72 p-8 transition-all duration-300" id="main-content">

                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Bảng điều khiển </h1>
                    <div className="flex items-center space-x-6">
                        
                        {/* START: DROP DOWN MENU */}
                        <div className="relative">
                            {/* Nút bấm để mở/đóng dropdown */}
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                                className="flex items-center text-gray-800 text-decoration-none focus:outline-none"
                            >
                                <i className="fas fa-user-circle text-2xl mr-2"></i> {/* Icon cho Admin User */}
                                <strong className="font-semibold">Super Admin</strong>
                                {/* Icon mũi tên chỉ trạng thái dropdown */}
                                <i className={`fas fa-caret-down ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
                            </button>
                            
                            {/* Dropdown Content */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                                    {/* Item Chỉnh sửa thông tin cá nhân */}
                                    <button
                                        onClick={handleEditProfile}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                                    >
                                        <i className="fas fa-user-edit mr-2 text-blue-500"></i> Chỉnh sửa cá nhân
                                    </button>
                                    <div className="border-t border-gray-100"></div>
                                    {/* Item Đăng xuất - CÓ THỂ BỎ NẾU DÙNG CÁI Ở SIDEBAR */}
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition duration-150"
                                    >
                                        <i className="fas fa-sign-out-alt mr-2"></i> Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* END: DROP DOWN MENU */}
                    </div>
                </header>
                <main>
                    <BangChinh/>
                </main>

        

            </div>

        </div>
    );
};

export default Dashboard;
