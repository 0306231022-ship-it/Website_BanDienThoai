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





  return (
    <>
      
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-slate-500 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none" aria-label="Menu">
              <i className="fas fa-bars text-xl"></i>
            </button>
            <Link to="/admin" className="flex items-center gap-3 group no-underline">
              {TTwebsite?.LoGo ? (
                 <img  src={`http://localhost:3001/${TTwebsite?.LoGo}`}  alt="Logo" className="w-10 h-10 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"/>
              ) : (
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                    A
                </div>
              )}
              
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-800 leading-tight">
                    {TTwebsite?.TenWebsite || "Admin Panel"}
                </h1>
                <p className="text-xs text-slate-500 font-medium">Dashboard</p>
              </div>
            </Link>
          </div>

          {/* --- RIGHT SECTION: ACTIONS --- */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* 1. Search Bar (Hidden on mobile) */}
            <div className="hidden md:block relative group">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-64 pl-10 pr-4 py-2.5 text-sm bg-slate-50 text-slate-700 border-none rounded-full ring-1 ring-slate-200 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:w-80 transition-all duration-300 placeholder-slate-400"
              />
              <i className="fas fa-search absolute left-3.5 top-3 text-slate-400 group-focus-within:text-teal-500 transition-colors"></i>
            </div>

            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

            {/* 2. Icon Actions */}
            <div className="flex items-center gap-2">
                {/* Bell Notification */}
                <button className="relative p-2.5 rounded-full text-slate-500 hover:bg-teal-50 hover:text-teal-600 transition-all duration-200 group">
                    <i className="fas fa-bell text-lg"></i>
                    {/* Badge */}
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                </button>

                {/* Message Notification */}
                <button className="relative p-2.5 rounded-full text-slate-500 hover:bg-teal-50 hover:text-teal-600 transition-all duration-200">
                    <i className="fas fa-envelope text-lg"></i>
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[10px] font-bold text-white ring-2 ring-white">
                        3
                    </span>
                </button>
            </div>

            {/* 3. User Dropdown */}
            <div className="relative ml-2" >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-3 p-1.5 pr-3 rounded-full border border-slate-200 transition-all duration-200 hover:shadow-md ${isMenuOpen ? 'bg-slate-50 ring-2 ring-teal-100' : 'bg-white'}`}
              >
                <img
                 src={`http://localhost:3001/${TTCaNhan?.AVATAR}`} 
                  alt="Avatar"
                  className="w-9 h-9 rounded-full object-cover border border-slate-100"
                />
                <div className="hidden md:block text-left">
                    <p className="text-sm font-bold text-slate-700 leading-none">{TTCaNhan?.HOTEN || "Admin"}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Quản trị viên</p>
                </div>
                <i className={`fas fa-chevron-down text-xs text-slate-400 ml-1 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform origin-top-right transition-all animate-fadeIn">
                  
                  {/* Header Dropdown */}
                  <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
                    <p className="text-sm text-slate-500">Đăng nhập với</p>
                    <p className="text-sm font-bold text-slate-800 truncate">{TTCaNhan?.EMAIL}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <Link
                      to="/admin/CaiDat/hoAD"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-600 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors group"
                    >
                      <i className="fas fa-user-circle w-6 text-slate-400 group-hover:text-teal-500"></i>
                      <span>Hồ sơ cá nhân</span>
                    </Link>

                    <Link
                      to="/admin/CaiDat/web"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-600 rounded-lg hover:bg-teal-50 hover:text-teal-700 transition-colors group"
                    >
                      <i className="fas fa-cog w-6 text-slate-400 group-hover:text-teal-500"></i>
                      <span>Cài đặt hệ thống</span>
                    </Link>
                  </div>

                  <div className="border-t border-slate-100 my-1"></div>

                  <div className="p-2">
                    <button
                      onClick={() => {
                        DangXuat();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors group"
                    >
                      <i className="fas fa-sign-out-alt w-6 text-red-400 group-hover:text-red-600"></i>
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

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
    </>
  );
}

export default TrangChuAdmin;
