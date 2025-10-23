import React, { useState, useCallback, useEffect } from 'react';


// Lưu ý: Các màu 'primary', 'text', 'bg-light' PHẢI được định nghĩa trong tailwind.config.js của bạn.
// Ví dụ:
/*
module.exports = {
    theme: {
        extend: {
            colors: {
                'primary': '#0d6efd',
                'text': '#212529',
                'bg-light': '#f8f9fa'
            },
        }
    }
}
*/

const AccountDashboard = () => {
    // State để quản lý tab đang hoạt động. Mặc định là 'account'
    const [activeTab, setActiveTab] = useState('account');

    // Hàm xử lý khi người dùng click vào tab
    const handleTabChange = useCallback((tabId) => {
        setActiveTab(tabId);
    }, []);

    // Effect để đảm bảo tab mặc định 'account' được hiển thị khi component mount
    useEffect(() => {
        setActiveTab('account');
    }, []);

    // Dữ liệu cho Sidebar Navigation
    const navItems = [
        { id: 'account', icon: "", label: 'Thông tin tài khoản' },
        { id: 'orders', icon: "", label: 'Lịch sử đơn hàng' },
        { id: 'password', icon: "", label: 'Đổi mật khẩu' },
    ];

    // --- Component Tab Nội Dung ---

    const AccountTabContent = () => (
        <>
            <h3 className="mb-6 text-2xl font-bold">Thông tin tài khoản</h3>
            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" defaultValue="Nguyễn Văn A" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" className="w-full p-2 border border-gray-200 bg-gray-100 rounded-lg cursor-not-allowed" defaultValue="nguyenvana@email.com" disabled />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" defaultValue="0987654321" />
                    </div>
                    {/* Placeholder to keep grid layout */}
                    <div className="hidden md:block"></div> 
                </div>
                
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                    <textarea className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows="3" defaultValue="123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh"></textarea>
                </div>
                <button type="submit" className="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md">
                    Lưu thay đổi
                </button>
            </form>
        </>
    );

    const OrdersTabContent = () => (
        <>
            <h3 className="mb-6 text-2xl font-bold">Lịch sử đơn hàng</h3>
            
            {/* Order Card 1 (Đã giao hàng) */}
            <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden transition duration-200 hover:shadow-lg">
                <div className="bg-bg-light p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center flex-wrap">
                        <div className="text-sm sm:text-base mb-2 sm:mb-0">
                            <strong className="font-semibold">Mã đơn hàng:</strong> #123456
                        </div>
                        <div>
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Đã giao hàng
                            </span>
                        </div>
                    </div>
                    <small className="text-gray-500 block">Ngày đặt: 10/10/2025</small>
                </div>
                <div className="p-4">
                    <p className="mb-1 text-gray-700">1x iPhone 15 Pro Max 256GB</p>
                    <p className="mb-3 text-gray-700">1x Samsung Galaxy S23 Ultra</p>
                    <div className="flex justify-between items-center border-t pt-3">
                        <span>Tổng tiền: <strong className="text-red-600 font-bold">50.980.000₫</strong></span>
                        <a href="#" className="text-primary border border-primary hover:bg-primary hover:text-white text-sm font-medium py-1 px-4 rounded-lg transition duration-200">
                            Xem chi tiết
                        </a>
                    </div>
                </div>
            </div>

            {/* Order Card 2 (Đang xử lý) */}
            <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden transition duration-200 hover:shadow-lg">
                <div className="bg-bg-light p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center flex-wrap">
                        <div className="text-sm sm:text-base mb-2 sm:mb-0">
                            <strong className="font-semibold">Mã đơn hàng:</strong> #123321
                        </div>
                        <div>
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Đang xử lý
                            </span>
                        </div>
                    </div>
                    <small className="text-gray-500 block">Ngày đặt: 12/10/2025</small>
                </div>
                <div className="p-4">
                    <p className="mb-3 text-gray-700">1x Xiaomi 13T Pro 5G</p>
                    <div className="flex justify-between items-center border-t pt-3">
                        <span>Tổng tiền: <strong className="text-red-600 font-bold">15.990.000₫</strong></span>
                        <a href="#" className="text-primary border border-primary hover:bg-primary hover:text-white text-sm font-medium py-1 px-4 rounded-lg transition duration-200">
                            Xem chi tiết
                        </a>
                    </div>
                </div>
            </div>
        </>
    );

    const PasswordTabContent = () => (
        <>
            <h3 className="mb-6 text-2xl font-bold">Đổi mật khẩu</h3>
            <form className="max-w-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu cũ</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <button type="submit" className="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md">
                    Cập nhật mật khẩu
                </button>
            </form>
        </>
    );

    // Hàm chọn nội dung tab
    const renderTabContent = () => {
        switch (activeTab) {
            case 'orders':
                return <OrdersTabContent />;
            case 'password':
                return <PasswordTabContent />;
            case 'account':
            default:
                return <AccountTabContent />;
        }
    };

    return (
        <div className="bg-bg-light font-sans text-text min-h-screen">
            {/* Header (Navbar) */}
            <header>
                <nav className="bg-white shadow-md sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <a className="text-2xl font-bold text-primary flex items-center" href="index.html">
                               TechZone
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Sidebar Navigation (3/12 cột trên màn hình lớn) */}
                    <div className="lg:col-span-3">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            {/* User Info */}
                            <div className="flex items-center mb-6 border-b border-gray-200 pb-4">
                             
                                <div>
                                    <small className="text-gray-500 text-sm">Tài khoản của</small>
                                    <h5 className="font-semibold text-lg">Nguyễn Văn A</h5>
                                </div>
                            </div>
                            
                            {/* Navigation Links */}
                            <nav className="flex flex-col space-y-1">
                                {navItems.map((item) => {
                                    const isActive = activeTab === item.id;
                                    const IconComponent = item.icon;
                                    
                                    return (
                                        <button 
                                            key={item.id}
                                            className={`
                                                text-left w-full p-3 rounded-lg flex items-center transition duration-150 
                                                ${isActive 
                                                    ? 'bg-primary text-white font-semibold shadow-md' 
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                }
                                            `}
                                            onClick={() => handleTabChange(item.id)}
                                            data-tab={item.id}
                                        >
                                            <IconComponent className="w-6 mr-2 text-xl" /> {item.label}
                                        </button>
                                    );
                                })}

                                {/* Link Đăng xuất */}
                                <a href="./DangKy.html" className="text-gray-700 hover:bg-red-50 hover:text-red-600 w-full p-3 rounded-lg flex items-center transition duration-150 mt-2 border-t pt-3 border-gray-100">
                                    Đăng xuất
                                </a>
                            </nav>
                        </div>
                    </div>
                    
                    {/* Tab Content Area (9/12 cột trên màn hình lớn) */}
                    <div className="lg:col-span-9">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </main>
            
            {/* Footer */}
            <footer className="bg-gray-800 text-gray-400 py-4 mt-10">
                <div className="max-w-7xl mx-auto px-4 text-center text-sm">
                    &copy; 2025 TechZone. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

export default AccountDashboard;