import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // Giả định có AuthContext

// Cấu hình Tailwind được nhúng vào trong file (thường được thực hiện ở môi trường bên ngoài)
// Tuy nhiên, trong môi trường file đơn, chúng ta có thể giả định các class như 'primary', 'dark-header' đã được định nghĩa.

const LoginAdmin = () => {
    // State để quản lý dữ liệu form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Xử lý logic đăng nhập
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); 
        setLoading(true);

        // --- Logic Xử lý Đăng Nhập (Giả định) ---
        setTimeout(() => {
            if (email === 'admin@techzone.com' && password === '123456') {
                // Thành công: Chuyển hướng hoặc xử lý state đã đăng nhập
                // Trong thực tế: window.location.href = "/TrangChuAdmin.html";
                console.log("Đăng nhập thành công! Chuyển hướng...");
                // Giả lập chuyển hướng
                window.location.href = "TrangChuadmin.html"; 
            } else {
                // Thất bại
                setError('Email hoặc mật khẩu không chính xác. Vui lòng thử lại.');
            }
            setLoading(false);
        }, 1000); 
    };

    return (
        // LOGIN CONTAINER: Căn giữa theo cả chiều ngang và dọc, đảm bảo full màn hình
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gray-100">
            {/* LOGIN CARD */}
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden 
                            transform transition duration-300 hover:shadow-3xl">
                
                {/* CARD HEADER */}
                <div className="bg-dark-header text-white text-center text-xl font-bold py-5 px-6 rounded-t-xl 
                                border-b-4 border-primary">
                    {/* Sử dụng icon Bootstrap Icons thông qua className */}
                    <i className="bi bi-shield-lock-fill mr-2 text-2xl"></i> HỆ THỐNG QUẢN TRỊ
                </div>
                
                {/* CARD BODY */}
                <div className="p-6 sm:p-8">
                    <div className="text-center mb-6">
                        {/* Logo TechZone */}
                        <a href="index.html" className="text-4xl font-extrabold text-text-dark tracking-tight">
                            <i className="bi bi-phone-vibrate-fill text-primary mr-1"></i> 
                            <span className="text-gray-800">Tech</span><span className="text-primary">Zone</span>
                        </a>
                        <p className="text-sm text-gray-500 mt-2">Đăng nhập để tiếp tục quản lý</p>
                    </div>

                    {/* Hiển thị lỗi */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                            <strong className="font-bold">Lỗi!</strong>
                            <span className="block sm:inline ml-2">{error}</span>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-2">Email hoặc Tên đăng nhập</label>
                            <div className="relative">
                                <i className="bi bi-person-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input 
                                    type="email" 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150" 
                                    id="adminEmail" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                            <div className="relative">
                                <i className="bi bi-lock-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                <input 
                                    type="password" 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150" 
                                    id="adminPassword" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6 text-sm">
                            <div className="flex items-center">
                                <input 
                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary checked:bg-primary" 
                                    type="checkbox" 
                                    id="rememberMe"
                                    disabled={loading}
                                />
                                <label className="ml-2 text-gray-600 select-none" htmlFor="rememberMe">
                                    Ghi nhớ đăng nhập
                                </label>
                            </div>
                            <a href="#" className="text-primary hover:text-primary-dark text-sm font-semibold transition duration-150">Quên mật khẩu?</a>
                        </div>

                        <div className="w-full">
                            <button 
                                type="submit" 
                                className={`w-full text-white font-bold py-3 rounded-lg transition duration-200 shadow-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark hover:shadow-xl'}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang xử lý...
                                    </div>
                                ) : (
                                    <>
                                        <i className="bi bi-box-arrow-in-right mr-2"></i> Đăng nhập
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-8">
                        <a href="TrangChuWeb.html" className="text-gray-500 hover:text-primary text-sm font-medium transition duration-150 flex items-center justify-center">
                            <i className="bi bi-arrow-left-circle mr-2"></i> Quay về trang chủ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
