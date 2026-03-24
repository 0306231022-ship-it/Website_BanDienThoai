import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { DangXuat } from '../../../hook/KiemTraDangNhap';
function Menu({ user }) {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const navigate = useNavigate();
    const handleLogout = async () => {
        const result = await DangXuat();
        if (result) {
            navigate('/');
            window.location.reload();
        }
    }

    return (
        <div className="relative inline-block text-left">
            <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-yellow-300 hover:text-white transition duration-200 focus:outline-none"
            >
                <img src={`http://localhost:3001/${user?.AVATAR}`} alt="Avatar" className="w-8 h-8 rounded-full" />
                <span className="font-bold">Xin chào, {user?.HOTEN}</span>
                <i className={`fas fa-chevron-down text-xs transition-transform ${showUserMenu ? 'rotate-180' : ''}`}></i>
            </button>
            {showUserMenu && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)}></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20 overflow-hidden transform origin-top-right transition-all">
                        <div className="py-1">
                            <Link 
                                to="/nguoi-dung" 
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition"
                                onClick={() => setShowUserMenu(false)}
                            >
                                <i className="fas fa-info-circle w-5"></i> Thông tin cá nhân
                            </Link>
                            <Link 
                                to="/settings" 
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition"
                                onClick={() => setShowUserMenu(false)}
                            >
                                <i className="fas fa-cog w-5"></i> Cài đặt tài khoản
                            </Link>
                            <hr className="border-gray-100" />
                            <button 
                                onClick={handleLogout}
                                className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-600 hover:text-white transition"
                            >
                                <i className="fas fa-sign-out-alt w-5"></i> Đăng xuất
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default Menu;