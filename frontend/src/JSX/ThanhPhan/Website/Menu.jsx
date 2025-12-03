import '../../../CSS/Menu.css';
import { Link } from "react-router-dom";
import { useEffect} from 'react';
import {useAppContext} from '../../../CONTEXT/TrangChuAdmin';
function Menu() {
    const {GetTTwebsite,TTwebsite}= useAppContext();
     useEffect(() => {
        GetTTwebsite(); 
        //eslint-disable-next-line react-hooks/exhaustive-deps 
    },[]);
    // Hàm để lấy lời chào dựa trên thời gian hiện tại
    function getCurrentTime() {
        const now = new Date(); 
        const hours = now.getHours();
        if (hours < 12) {
            return 'Buổi sáng vui vẻ, đầy nhiệt huyết trong công việc và học tập';
        } else if (hours < 18) {
            return 'Buổi chiều vui vẻ';
        } else {
            return 'Buổi tối vui vẻ bên nười thân và gia đình';
        }
    }
    // Giả sử số lượng sản phẩm trong giỏ hàng là 3 (bạn có thể thay đổi giá trị này tùy ý)
    const cartCount = 3;



    return (
        <>
          <header className="main-header fixed top-0 w-full z-30 shadow-md">
        <div className="header-top-bar bg-gray-800 text-white px-5 sm:px-10 py-2 flex justify-between items-center text-sm">
            <span className="welcome-message">{getCurrentTime()}, Bạn đang cần gì?</span>
            <div className="contact-auth-group flex items-center space-x-4">
                <span className="support-email hidden md:inline">Email hỗ trợ: {TTwebsite.Email}</span> 
                <span className="auth-links font-bold">
                    <Link to="#" className="auth-link text-yellow-300 hover:text-white transition duration-200">Đăng nhập</Link>
                    <span className="mx-1">/</span>
                    <Link to="#" className="auth-link text-yellow-300 hover:text-white transition duration-200">Đăng ký</Link>
                </span>
            </div>
        </div>

        <div className="header-main-middle flex justify-between items-center px-5 sm:px-10 py-4 bg-white border-b border-gray-200">
            
            <div className="logo leading-tight flex items-center">
                <span className="logo-icon text-3xl text-red-700 mr-2">
                     <img src={`http://localhost:3001${TTwebsite.LoGo}`} alt="Logo" className='w-10 h-10 rounded-full' />
                </span>
                <div>
                    <p className="logo-main-text text-3xl font-bold text-red-700 m-0">{TTwebsite.TenWebsite}</p>
                    <p className="logo-sub-text text-xs text-gray-500 m-0">{TTwebsite.MoTaWebstite}</p>
                </div>
            </div>
            
            <div className="search-bar flex w-2/5 border-2 border-red-700 rounded-full overflow-hidden">
                <input type="text" placeholder="Tìm kiếm sản phẩm, công nghệ, tin tức..." className="search-input flex-grow px-4 py-2 border-none outline-none text-base"/>
                <button className="search-button bg-red-700 text-white px-4 py-2 cursor-pointer hover:bg-red-800 transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
            </div>
            
            <ul className="header-widgets flex space-x-6">
                <li className="widget flex items-center gap-2">
                    <span className="widget-icon text-xl text-red-700 w-6 text-center"><i className="fas fa-phone-alt"></i></span>
                    <div className="widget-text-group leading-tight">
                        <p className="widget-title text-xs text-gray-500 m-0">Liên hệ</p>
                        <p className="widget-value text-base font-bold text-gray-800 m-0">{TTwebsite.Zalo}</p>
                    </div>
                </li>
                <li className="widget flex items-center gap-2 hidden lg:flex">
                    <span className="widget-icon text-xl text-red-700 w-6 text-center"><i className="fas fa-store"></i></span>
                    <div className="widget-text-group leading-tight">
                        <p className="widget-title text-xs text-gray-500 m-0">Hệ thống</p>
                        <p className="widget-value text-base font-bold text-gray-800 m-0">Hơn 12 cửa hàng</p>
                    </div>
                </li>
                <li className="widget cart-widget flex items-center gap-2">
                    <span className="widget-icon text-xl text-red-700 w-6 text-center"><i className="fas fa-shopping-cart"></i></span>
                    <div className="widget-text-group leading-tight">
                        <p className="widget-title text-xs text-gray-500 m-0">Giỏ hàng</p>
                        <p className="widget-value cart-count text-base font-bold text-red-700 m-0">({cartCount}) sản phẩm</p>
                    </div>
                </li>
            </ul>
        </div>

        <nav className="header-nav bg-red-700 px-5 sm:px-10 py-3">
            <ul className="nav-list flex space-x-10">
                <li className="nav-item">
                    <Link to="/" className="nav-link text-white font-bold text-lg relative hover:text-yellow-300 transition duration-200">Trang chủ</Link>
                </li>
                
                <li className="nav-item relative group">
                    <Link to="#" className="nav-link text-white font-bold text-lg relative hover:text-yellow-300 transition duration-200">Sản phẩm</Link>
                    
                    <div className="dropdown-menu absolute left-0 mt-6 w-56 bg-white shadow-lg rounded-md z-20">
                        <Link to="#" className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 hover:text-red-700 border-b border-gray-100 transition duration-150">Điện thoại thông minh</Link>
                        <Link to="#" className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 hover:text-red-700 border-b border-gray-100 transition duration-150">Laptop & PC</Link>
                        <Link to="#" className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 hover:text-red-700 border-b border-gray-100 transition duration-150">Phụ kiện công nghệ</Link>
                        <Link to="#" className="block px-4 py-3 text-sm text-gray-800 hover:bg-gray-100 hover:text-red-700 transition duration-150">Thiết bị IoT</Link>
                    </div>
                </li>
                <li className="nav-item"><Link to="#" className="nav-link text-white font-bold text-lg relative hover:text-yellow-300 transition duration-200">AI & Công nghệ</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link text-white font-bold text-lg relative hover:text-yellow-300 transition duration-200">Bền vững</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link text-white font-bold text-lg relative hover:text-yellow-300 transition duration-200">Hỗ trợ</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link text-white font-bold text-lg relative hover:text-yellow-300 transition duration-200">Tin tức</Link></li>
            </ul>
        </nav>
    </header>
        </>
    );
}

export default Menu;
