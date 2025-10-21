import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import '../../CSS/TrangChuAD.css';
import {
    BsShieldShaded, BsSpeedometer2, BsBoxSeam, BsReceipt, BsPeopleFill, BsGearFill,
    BsBoxArrowLeft, BsBellFill, BsPersonCircle, BsCartCheck, BsCashCoin, BsPersonPlus,
    BsExclamationTriangle
} from 'react-icons/bs';

// Bạn NÊN đặt khối CSS này trong file CSS toàn cục (ví dụ: index.css)
// vì Tailwind không hỗ trợ tùy chỉnh scrollbar một cách dễ dàng.


const chartData = {
    labels: ['Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN', 'Thứ 2', 'Thứ 3'],
    datasets: [{
        label: 'Doanh thu (Triệu VNĐ)',
        data: [3.5, 4.2, 5.1, 7.8, 6.4, 8.1, 9.3],
        // Dùng Tailwind class: bg-blue-500/50 và text-blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.5)', 
        borderColor: 'rgb(59, 130, 246)', 
        borderWidth: 1,
        fill: true,
        tension: 0.4
    }]
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            callbacks: {
                label: (context) => {
                    let label = context.dataset.label || '';
                    if (label) label += ': ';
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(context.parsed.y * 1000000);
                    }
                    return label;
                }
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                // Tương đương text-gray-200 với opacity thấp
                display: true,
                color: 'rgba(200, 200, 200, 0.2)' 
            },
            ticks: {
                callback: (value) => value + 'M' 
            }
        },
        x: { grid: { display: false } }
    }
};

const Dashboard = () => {
    // Inject CSS for custom scrollbar (Nếu bạn không thể đặt nó trong index.css)
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        document.head.appendChild(styleSheet);
        return () => {
            document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        // Dùng class 'font-sans' (Tailwind default) và 'bg-gray-100'
        <div className="font-sans bg-gray-100 min-h-screen"> 
            {/* Sidebar - Dùng 'scrollbar-dark' đã định nghĩa bên trên */}
            <div className="fixed inset-y-0 left-0 w-72 bg-gray-900 text-gray-400 p-4 flex flex-col shadow-xl scrollbar-dark z-10">
                <div className="text-white font-bold text-2xl pb-4 mb-4 border-b border-gray-700 flex items-center">
                    <BsShieldShaded className="mr-2" />
                    <span className="text-lg">Admin Panel</span> 
                </div>
                <ul className="flex flex-col flex-grow space-y-1">
                    <li className="nav-item">
                        <a href="admin.html" className="flex items-center text-white bg-blue-600 font-medium hover:bg-blue-700 p-3 rounded-lg transition duration-200">
                            <BsSpeedometer2 className="w-6 mr-3" /> Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white p-3 rounded-lg transition duration-200">
                            <BsBoxSeam className="w-6 mr-3" /> Quản lý sản phẩm
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white p-3 rounded-lg transition duration-200">
                            <BsReceipt className="w-6 mr-3" /> Quản lý đơn hàng
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white p-3 rounded-lg transition duration-200">
                            <BsPeopleFill className="w-6 mr-3" /> Quản lý người dùng
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white p-3 rounded-lg transition duration-200">
                            <BsGearFill className="w-6 mr-3" /> Cài đặt
                        </a>
                    </li>
                </ul>
                {/* Logout Section */}
                <div className="mt-auto pt-3 border-t border-gray-700">
                    <a href="./DangNhap/dn_ad.html" className="text-center block bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded-lg transition duration-200">
                        <BsBoxArrowLeft className="inline mr-2" /> Đăng xuất
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-72 p-8 transition-all duration-300" id="main-content">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Bảng điều khiển</h1>
                    <div className="flex items-center space-x-6">
                        <BsBellFill className="text-xl text-gray-500 hover:text-gray-800 cursor-pointer" />
                        <div className="relative">
                            <a href="#" className="flex items-center text-gray-800 text-decoration-none">
                                <BsPersonCircle className="text-3xl mr-2" />
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
                            <BsCartCheck className="text-5xl opacity-50" />
                        </div>
                    </div>

                    {/* Card 2: Monthly Revenue */}
                    <div className="bg-green-600 text-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-4xl font-bold">25.6M</div>
                                <div className="text-gray-200 mt-1 text-sm">Doanh thu tháng</div>
                            </div>
                            <BsCashCoin className="text-5xl opacity-50" />
                        </div>
                    </div>

                    {/* Card 3: New Users - Đã áp dụng text-gray-900 trực tiếp thay vì class tùy chỉnh */}
                    <div className="bg-amber-400 text-gray-900 rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-4xl font-bold">512</div>
                                <div className="mt-1 text-sm">Người dùng mới</div>
                            </div>
                            <BsPersonPlus className="text-5xl opacity-50" />
                        </div>
                    </div>

                    {/* Card 4: Low Stock Products */}
                    <div className="bg-red-600 text-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-4xl font-bold">3</div>
                                <div className="text-gray-200 mt-1 text-sm">Sản phẩm sắp hết</div>
                            </div>
                            <BsExclamationTriangle className="text-5xl opacity-50" />
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
                                    <Line data={chartData} options={chartOptions} />
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