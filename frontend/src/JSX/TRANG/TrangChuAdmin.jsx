// Tạm thời xong nhiệm vụ
import { Link, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppContext } from '../../CONTEXT/TrangChuAdmin';
import { AppProvider } from '../../CONTEXT/QuanLiModal';
import { useADContext } from '../../CONTEXT/QuanLiCaNhanAdmin';


import QuanLiTT from '../ThanhPhan/Admin/Menu/QuanLiTT';
import QuanLiTTCaNhan from '../ThanhPhan/Admin/Menu/QuanLiTTCaNhan';

function TrangChuAdmin() {
  const {  TTwebsite, GetTTwebsite } = useAppContext();
  const {kiemtra, DangXuat,GetTTCaNhan, TTCaNhan } = useADContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    GetTTwebsite();
    GetTTCaNhan();
    kiemtra();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const avatarUrl = TTCaNhan?.AVATAR
    ? `http://localhost:3001/${TTCaNhan.AVATAR}`
    : 'https://picsum.photos/40?random=1';

  return (
    <>
      {/* HEADER */}
      <header className="w-full bg-white shadow sticky top-0 z-50" aria-label="Top bar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <button aria-label="Mở/đóng menu" className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors">
              <i className="fas fa-bars"></i>
            </button>

            <Link to="" className="flex items-center space-x-2" style={{ textDecoration: 'none' }}>
              <img src={`http://localhost:3001/${TTwebsite?.LoGo}`} alt="Logo" className="w-9 h-9 rounded-full"/>
              <span className="text-xl font-bold text-dark-900">  {TTwebsite?.TenWebsite} Admin</span>
            </Link>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                type="search"
                placeholder="Tìm kiếm trong quản trị"
                className="w-72 pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white focus:outline-none border border-gray-200"
              />
              <i className="fas fa-search absolute left-3 top-2 text-gray-500"></i>
            </div>

            <button className="p-2 rounded-full hover:bg-gray-100">
              <i className="fas fa-bell"></i>
            </button>

            <button className="p-2 rounded-full hover:bg-gray-100">
              <i className="fas fa-envelope"></i>
            </button>

            {/* Avatar + Dropdown */}
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer p-1 rounded-full hover:bg-gray-100"
                onClick={toggleMenu}
              >
                <img
                  src={avatarUrl}
                  alt="Avatar quản trị viên"
                  className="w-8 h-8 rounded-full object-cover"
                  loading="lazy"
                />
                <span className="font-medium">{TTCaNhan?.HOTEN}</span>
                <i
                  className={`fas fa-caret-down transition-transform ${
                    isMenuOpen ? 'rotate-180' : ''
                  }`}
                ></i>
              </div>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200">
                  <Link
                    to="/admin/CaiDat/HoSo"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-user-circle mr-2"></i> Hồ Sơ
                  </Link>

                  <Link
                    to="/admin/CaiDat"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-cog mr-2"></i> Cài Đặt
                  </Link>

                  <div className="border-t my-1"></div>

                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => {
                      DangXuat();
                      setIsMenuOpen(false);
                    }}
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Đăng Xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <AppProvider>
          <Routes>
            <Route path="*" element={<QuanLiTT />} />
            <Route path="/CaiDat/*" element={<QuanLiTTCaNhan />} />
          </Routes>
        </AppProvider>
      </div>

      {/* FOOTER */}
      <footer className="mt-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} {TTwebsite?.TenWebsite} Admin. Tất cả quyền sở hữu thuộc về{' '}
          {TTwebsite?.TenWebsite}.
        </div>
      </footer>
    </>
  );
}

export default TrangChuAdmin;
