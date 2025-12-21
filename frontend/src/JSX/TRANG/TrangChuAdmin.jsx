//Tạm thời xong nhiệm vụ
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'; 
import {useAppContext} from '../../CONTEXT/TrangChuAdmin';
import { AppProvider } from '../../CONTEXT/QuanLiModal';
import QuanLiTT from '../ThanhPhan/Admin/Menu/QuanLiTT';
import QuanLiTTCaNhan from '../ThanhPhan/Admin/Menu/QuanLiTTCaNhan';
import { Routes, Route } from 'react-router-dom';

function TrangChuAdmin() {
    const { kiemtra , DangXuat , TTwebsite , GetTTwebsite } = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [admin,setadmin]=useState({})
    useEffect(() => {
         kiemtra();
         GetTTwebsite();
         setadmin(JSON.parse(localStorage.getItem('DuLieu')))
         //eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return(
        <>
    <header className="w-full bg-white shadow sticky top-0 z-50" aria-label="Top bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
                <button id="sidebarToggle" aria-label="Mở/đóng menu" className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <i className="fas fa-bars"></i>
                </button>
                <Link to="" data-route="overview" className="flex items-center space-x-2" Style="text-decoration:none;">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center">
                        <img src={`http://localhost:3001/${TTwebsite.LoGo}`} alt="Logo" className='w-9 h-9 rounded-full' />
                    </div>
                    <span className="text-xl font-bold text-dark-900">{TTwebsite.TenWebsite} Admin</span>
                </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
                <div className="relative">
                    <input type="search" placeholder="Tìm kiếm trong quản trị" className="w-72 pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:outline-none border border-gray-200" aria-label="Tìm kiếm trong quản trị"/>
                    <span className="absolute left-3 top-2 text-gray-500"><i className="fas fa-search"></i></span>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Thông báo">
                    <i className="fas fa-bell"></i>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Tin nhắn">
                    <i className="fas fa-envelope"></i>
                </button>
                {/* Khu vực avatar Admin với menu xổ xuống */}
                <div className="relative">
                    <div 
                        className="flex items-center space-x-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors" 
                        role="button" 
                        aria-label="Thông tin người dùng"
                        onClick={toggleMenu} 
                        aria-expanded={isMenuOpen}
                    >
                        <img src="https://picsum.photos/40?random=1" alt="Avatar quản trị viên" className="w-8 h-8 rounded-full object-cover" loading="lazy" />
                        <span className="font-medium">{admin?.HOTEN}</span>
                        <i className={`fas fa-caret-down transition-transform ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`}></i> {/* Icon mũi tên xoay */}
                    </div>

                    {/* Menu Dropdown */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-200" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                            <Link to="/admin/CaiDat/HoSo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                                <i className="fas fa-user-circle mr-2"></i> Hồ Sơ
                            </Link>
                            <Link to="/admin/CaiDat" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => setIsMenuOpen(false)}>
                                <i className="fas fa-cog mr-2"></i> Cài Đặt
                            </Link>
                            <div className="border-t border-gray-100 my-1"></div>
                            <button className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50" role="menuitem" 
                               onClick={() => {DangXuat();setIsMenuOpen(false);}}>
                                <i className="fas fa-sign-out-alt mr-2"></i> Đăng Xuất
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </header>

    <div className="flex" id="layout">
    <AppProvider>
        <Routes>
            <Route path="/" index element={<QuanLiTT/>} />
            <Route path="/CaiDat/*" element={<QuanLiTTCaNhan/>} />
        </Routes>
    </AppProvider>
    </div>
    <footer className="mt-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600">
             &copy; {new Date().getFullYear()} {TTwebsite.TenWebsite} Admin. Tất cả quyền sở hữu thuộc về {TTwebsite.TenWebsite}.
        </div>
    </footer>
        </>
    );
};
export default TrangChuAdmin;