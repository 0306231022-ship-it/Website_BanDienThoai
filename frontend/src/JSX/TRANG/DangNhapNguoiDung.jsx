import React, { useState } from 'react';
const AuthTab = () => {
    // State để quản lý tab đang hoạt động: 'login' hoặc 'register'
    const [activeTab, setActiveTab] = useState('login');

    // States cho form Đăng nhập
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // States cho form Đăng ký
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirmPassword, setRegConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Hàm chuyển đổi tab
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
        setError(''); // Xóa lỗi khi chuyển tab
    };

    // Hàm xử lý Đăng nhập
    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        console.log('Đang xử lý Đăng nhập:', { loginEmail, loginPassword });

        // Logic API/Xác thực giả lập
        setTimeout(() => {
            setLoading(false);
            if (loginEmail === 'test@example.com' && loginPassword === 'password') {
                console.log('Đăng nhập thành công! Chuyển hướng tới trang người dùng.');
                // Thực tế: window.location.href = "./TrangChuUser.html";
                // Giả lập thông báo
                alert('Đăng nhập thành công!'); 
            } else {
                setError('Tên đăng nhập hoặc mật khẩu không hợp lệ.');
            }
        }, 1500);
    };

    // Hàm xử lý Đăng ký
    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        if (regPassword !== regConfirmPassword) {
            setError('Mật khẩu và xác nhận mật khẩu không khớp.');
            setLoading(false);
            return;
        }

        if (!termsAccepted) {
            setError('Bạn phải đồng ý với Điều khoản dịch vụ để đăng ký.');
            setLoading(false);
            return;
        }

        console.log('Đang xử lý Đăng ký:', { regName, regEmail, regPassword });

        // Logic API/Đăng ký giả lập
        setTimeout(() => {
            setLoading(false);
            // Giả lập đăng ký thành công
            console.log('Đăng ký thành công! Chuyển sang tab Đăng nhập.');
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            handleTabChange('login');
        }, 1500);
    };


    // Component chung cho nút Đăng nhập/Đăng ký
    const SubmitButton = ({ children }) => (
        <button 
            type="submit"
            className={`w-full text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-lg mt-2 
                        ${loading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-primary hover:bg-blue-700 hover:shadow-xl'
                        }`}
            disabled={loading}
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                </div>
            ) : children}
        </button>
    );

    return (
        <div className="bg-gray-100 font-sans flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-lg">
                
                {/* NÚT QUAY LẠI TRANG CHỦ */}
                <div className="mb-4 ml-2">
                    <a href="./TrangChuWeb.html" className="flex items-center text-primary hover:text-blue-700 transition duration-150 font-medium">
                        <i className="bi bi-arrow-left-circle-fill mr-2 text-xl"></i>
                        Quay lại trang chủ
                    </a>
                </div>
                
                {/* CARD CHÍNH */}
                <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
                    <div className="text-center mb-8">
                        <a href="index.html" className="text-4xl font-extrabold text-text mb-2 inline-block tracking-tighter">
                            <i className="bi bi-phone-vibrate-fill text-primary"></i> <span className='text-gray-800'>Tech</span><span className='text-primary'>Zone</span>
                        </a>
                        <p className="text-gray-500 text-sm">Cung cấp giải pháp công nghệ tốt nhất.</p>
                    </div>

                    {/* HIỂN THỊ LỖI CHUNG */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                            <strong className="font-bold">Lỗi!</strong>
                            <span className="block sm:inline ml-2">{error}</span>
                        </div>
                    )}

                    {/* TAB NAVIGATION */}
                    <div className="flex border-b border-gray-200 mb-8">
                        {['login', 'register'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`flex-1 py-3 text-center text-lg font-semibold border-b-2 transition duration-150 
                                            ${activeTab === tab
                                                ? 'border-primary text-primary'
                                                : 'border-transparent text-gray-500 hover:text-text'
                                            }`}
                            >
                                {tab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                            </button>
                        ))}
                    </div>

                    {/* NỘI DUNG TAB */}
                    {/* TAB ĐĂNG NHẬP */}
                    {activeTab === 'login' && (
                        <div>
                            <h2 className="text-xl font-semibold text-text mb-6 text-center">Đăng nhập tài khoản</h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        id="login-email" 
                                        placeholder="Nhập địa chỉ email của bạn" 
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                                    <input 
                                        type="password" 
                                        id="login-password" 
                                        placeholder="Nhập mật khẩu" 
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150"
                                    />
                                </div>

                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        <input 
                                            id="remember-me" 
                                            type="checkbox" 
                                            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary checked:bg-primary"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 select-none">Nhớ tài khoản</label>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary hover:text-blue-700 transition duration-150">Quên mật khẩu?</a>
                                </div>

                                <SubmitButton>
                                    <i className="bi bi-box-arrow-in-right mr-2"></i> Đăng nhập
                                </SubmitButton>
                            </form>
                        </div>
                    )}

                    {/* TAB ĐĂNG KÝ */}
                    {activeTab === 'register' && (
                        <div>
                            <h2 className="text-xl font-semibold text-text mb-6 text-center">Tạo tài khoản mới</h2>
                            <form onSubmit={handleRegister}>
                                <div className="mb-4">
                                    <label htmlFor="reg-name" className="block text-sm font-medium text-gray-700 mb-1">Họ và Tên</label>
                                    <input 
                                        type="text" 
                                        id="reg-name" 
                                        placeholder="Ví dụ: Nguyễn Văn A" 
                                        required
                                        value={regName}
                                        onChange={(e) => setRegName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        id="reg-email" 
                                        placeholder="Nhập địa chỉ email" 
                                        required
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                                    <input 
                                        type="password" 
                                        id="reg-password" 
                                        placeholder="Nhập mật khẩu (ít nhất 6 ký tự)" 
                                        required
                                        value={regPassword}
                                        onChange={(e) => setRegPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="reg-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Xác nhận Mật khẩu</label>
                                    <input 
                                        type="password" 
                                        id="reg-confirm-password" 
                                        placeholder="Nhập lại mật khẩu" 
                                        required
                                        value={regConfirmPassword}
                                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150"
                                    />
                                </div>
                                
                                <div className="flex items-start mb-6">
                                    <input 
                                        id="terms" 
                                        type="checkbox" 
                                        required 
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                        className="mt-1 h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary checked:bg-primary"
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 select-none">
                                        Tôi đồng ý với 
                                        <a href="#" className="font-medium text-primary hover:text-blue-700"> Điều khoản dịch vụ</a>
                                    </label>
                                </div>

                                <SubmitButton>
                                    <i className="bi bi-person-plus-fill mr-2"></i> Đăng ký tài khoản
                                </SubmitButton>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Component chính App để chạy được trong môi trường React
// Giả định môi trường sẽ tự động load Bootstrap Icons và Tailwind CSS
const DangNhap = () => {
    // Để Bootstrap Icons và Tailwind hoạt động, chúng ta cần đảm bảo các CDN được tải
    // (Trong môi trường React thông thường, bạn sẽ import chúng thay vì CDN)
    return (
        <React.Fragment>
             {/* Thêm link CSS cho Bootstrap Icons */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
            
            {/* Thêm style cho các màu tùy chỉnh nếu cần */}
            <style>{`
                .bg-primary { background-color: #0d6efd; }
                .hover\\:bg-blue-700:hover { background-color: #0b5ed7; }
                .text-primary { color: #0d6efd; }
                .focus\\:ring-primary:focus { --tw-ring-color: #0d6efd; }
                .checked\\:bg-primary:checked { background-color: #0d6efd; border-color: #0d6efd; }
                .text-text { color: #212529; }
            `}</style>

            <AuthTab />
        </React.Fragment>
    );
}

export default DangNhap;