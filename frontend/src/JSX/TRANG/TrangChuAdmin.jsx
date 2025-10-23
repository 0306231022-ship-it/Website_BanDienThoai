import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../../CSS/TrangChuAD.css';
import * as API from '../../JS/API/API';
import * as ThongBao from '../../JS/FUNCTONS/ThongBao';
const Dashboard = () => {
    const ChuyenTrang=useNavigate();
    useEffect(() => {
        //Kiemr tra đăng nhập, nếu chưa đăng nhập sẽ trả về trang đăng nhập mới được về
        // Kiểm tra trên sesion/cookies sau này sẽ kiểm tra trên token
        const KiemTraDangNhap=async()=>{
            const yeucau={
                DiaChi:1,
                NhiemVu:"KiemTraDangNhap_AD"
            };
             const kiemtra= await API.CallAPI(undefined,yeucau);
             if(!kiemtra.ThanhCong){
                ThongBao.ThongBao_CanhBao("Vui lòng đăng nhập trước khi sử dụng!");
                ChuyenTrang('/DangNhapAD');
             }
        };
        KiemTraDangNhap();
    },[ChuyenTrang]);

    return (
        // Dùng class 'font-sans' (Tailwind default) và 'bg-gray-100'
        <div className="font-sans bg-gray-100 min-h-screen"> 
            {/* Sidebar - Dùng 'scrollbar-dark' đã định nghĩa bên trên */}
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
                {/* Logout Section */}
                <div className="mt-auto pt-3 border-t border-gray-700">
                    <a href="./DangNhap/dn_ad.html" className="text-center block bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded-lg transition duration-200">
                      <i className="fas fa-sign-out-alt mr-2"></i> {/* Icon cho Đăng xuất */}
                      Đăng xuất
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-72 p-8 transition-all duration-300" id="main-content">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Bảng điều khiển </h1>
                    <div className="flex items-center space-x-6">
                    
                        <div className="relative">
                            <a href="#" className="flex items-center text-gray-800 text-decoration-none">
                                <i className="fas fa-user-circle text-2xl mr-2"></i> {/* Icon cho Admin User */}
                                <strong className="font-semibold">Super Admin</strong>
                            </a>
                        </div>
                    </div>
                </header>

                {/* Stat Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    
                    {/* Card 1: New Orders */}
                    <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-4xl font-bold">1,258</div>
                                <div className="text-gray-200 mt-1 text-sm">Đơn hàng mới</div>
                            </div>
                            <i className="fas fa-clipboard-list text-5xl opacity-75"></i> {/* Icon cho Đơn hàng mới */}
                        </div>
                    </div>

                    {/* Card 2: Monthly Revenue */}
                    <div className="bg-green-600 text-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-4xl font-bold">25.6M</div>
                                <div className="text-gray-200 mt-1 text-sm">Doanh thu tháng</div>
                            </div>
                            <i className="fas fa-money-bill-wave text-5xl opacity-75"></i> {/* Icon cho Doanh thu tháng */}
                        </div>
                    </div>

                    {/* Card 3: New Users - Đã áp dụng text-gray-900 trực tiếp thay vì class tùy chỉnh */}
                    <div className="bg-amber-400 text-gray-900 rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-4xl font-bold">512</div>
                                <div className="mt-1 text-sm">Người dùng mới</div>
                            </div>
                            <i className="fas fa-user-plus text-5xl opacity-75"></i> {/* Icon cho Người dùng mới */}
                        </div>
                    </div>

                    {/* Card 4: Low Stock Products */}
                    <div className="bg-red-600 text-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-4xl font-bold">3</div>
                                <div className="text-gray-200 mt-1 text-sm">Sản phẩm sắp hết</div>
                            </div>
                            <i className="fas fa-exclamation-triangle text-5xl opacity-75"></i> {/* Icon cho Sản phẩm sắp hết */}
                        </div>
                    </div>
                </div>

                {/* Charts and Tables Section */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    
                    {/* Revenue Chart */}
                    <div className="xl:col-span-7">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200">
                            <div className="p-5 border-b border-gray-200">
                                <h5 className="text-xl font-semibold text-gray-800">Doanh thu 7 ngày qua</h5>
                            </div>
                            <div className="p-5">
                                <div className="w-full h-80">
                                    sau này tính sau
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="xl:col-span-5">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200">
                            <div className="p-5 border-b border-gray-200">
                                <h5 className="text-xl font-semibold text-gray-800">Đơn hàng gần đây</h5>
                            </div>
                            <div className="p-0 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">#123456</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">Nguyễn Văn A</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900">28.990.000₫</td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Hoàn thành</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">#123455</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">Trần Thị B</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900">9.490.000₫</td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Đang xử lý</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">#123454</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">Lê Văn C</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900">15.990.000₫</td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Hoàn thành</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">#123453</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">Phạm Thị D</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900">21.990.000₫</td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Đã hủy</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">#123452</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">Võ Thị E</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900">12.500.000₫</td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Hoàn thành</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;