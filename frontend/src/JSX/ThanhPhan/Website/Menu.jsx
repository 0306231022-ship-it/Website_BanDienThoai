import React from 'react';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import {useAppContext} from '../../../CONTEXT/TrangChuAdmin';
//import * as API from '../../../JS/API/API.js';
function Menu() {
    const {GetTTwebsite,TTwebsite}= useAppContext();
     useEffect(() => {
        GetTTwebsite();
    });
    const cartCount = 3; 

    return (
        <>
            {/* CÁC CLASS ĐỂ CỐ ĐỊNH MENU LÀ: sticky top-0 z-50 */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                
                        {/* Biến Logo thành Link về Trang chủ */}
                        <Link  to="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                                <i className="fas fa-mobile-alt text-white text-xl"></i>
                            </div>
                            <span className="text-2xl font-bold text-dark-900">{TTwebsite.TenWebsite}</span>
                        </Link>
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link  to="/" className="text-dark-900 hover:text-primary-500 font-medium transition-colors">Trang Chủ</Link>
                            <Link to="/san-pham"  className="text-dark-900 hover:text-primary-500 font-medium transition-colors">Sản Phẩm</Link>
                            <Link to="/ai-cong-nghe" className="text-dark-900 hover:text-primary-500 font-medium transition-colors">AI & Công Nghệ</Link>
                            <Link to="/ben-vung" className="text-dark-900 hover:text-primary-500 font-medium transition-colors">Bền Vững</Link>
                            <Link to="/ho-tro"  className="text-dark-900 hover:text-primary-500 font-medium transition-colors">Hỗ Trợ</Link>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center bg-dark-50 rounded-full px-4 py-2">
                                <i className="fas fa-search text-dark-600 mr-2"></i>
                                <input type="text" placeholder="Tìm kiếm điện thoại..." className="bg-transparent outline-none text-dark-900"/>
                            </div>
                            
                            {/* Cập nhật nút Giỏ hàng và User thành Link */}
                            <Link  to="/gio-hang" className="p-2 text-dark-600 hover:text-primary-500 transition-colors relative">
                                <i className="fas fa-shopping-cart"></i>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <Link to="/nguoi-dung" className="p-2 text-dark-600 hover:text-primary-500 transition-colors">
                                <i className="fas fa-user"></i>
                            </Link>
                            <button className="md:hidden p-2 text-dark-600">
                                <i className="fas fa-bars"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Menu;
