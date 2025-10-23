import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as fun from '../../JS/FUNCTONS/function';
import * as API from '../../JS/API/API';
import * as ThongBao from '../../JS/FUNCTONS/ThongBao';
const LoginAdmin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [ghinho,setghinho]=useState(false);
    const ChuyenTrang=useNavigate();
    const handleSubmit = async() => {
        let DuLieu={
            Email:email,
            MatKhau:password
        };
        const kiemtra=fun.KiemTraRong(DuLieu)
        if(!kiemtra){
            setError('Vui lòng nhập đầy đủ thông tin ')
        }else{
            DuLieu={
                ...DuLieu,
                TrangThai:ghinho
            };
            const yeucau={
                DiaChi:1,
                NhiemVu:"DangNhap_AD"
            };
            const DangNhap=await API.CallAPI(DuLieu,yeucau)
            alert(JSON.stringify(DangNhap))
            if(DangNhap[0].ThanhCong){
                ThongBao.ThongBao_ThanhCong(DangNhap.TinNhan);
                ChuyenTrang('/Admin');
            }else{
                setError(DangNhap.TinNhan);
            }
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-gray-100 antialiased">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden 
                            transform transition duration-500 hover:shadow-3xl hover:scale-[1.01]">
                
                <div className="bg-gray-800 text-white text-center text-xl font-extrabold py-6 px-8 rounded-t-2xl 
                                border-b-4 border-blue-500 flex justify-center items-center">
                    <i className="bi bi-shield-lock-fill mr-3 text-2xl text-blue-400"></i> HỆ THỐNG QUẢN TRỊ
                </div>
                
                <div className="p-6 sm:p-10">
                    <div className="text-center mb-8">
                        <a href="index.html" className="text-4xl font-black text-gray-900 tracking-tight">
                            <i className="bi bi-phone-vibrate-fill text-blue-600 mr-1"></i> 
                            <span className="text-gray-800">Tech</span><span className="text-blue-600">Zone</span>
                        </a>
                        <p className="text-base text-gray-500 mt-3 font-medium">Đăng nhập để tiếp tục quản lý</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl relative mb-6 transition-all duration-300" role="alert">
                            <strong className="font-semibold text-base">Cảnh báo:</strong>
                            <span className="block sm:inline ml-2 text-sm">{error}</span>
                        </div>
                    )}
                    
                    
                        <div className="mb-6">
                            <label htmlFor="adminEmail" className="block text-sm font-semibold text-gray-700 mb-2">Email hoặc Tên đăng nhập</label>
                            <div className="relative">
                                <i className="bi bi-person-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                                <input 
                                    type="email" 
                                    className="w-full pl-11 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-900 placeholder-gray-500" 
                                    id="adminEmail" 
                                    placeholder="Nhập email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Ô mật khẩu */}
                        <div className="mb-6">
                            <label htmlFor="adminPassword" className="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu</label>
                            <div className="relative">
                                <i className="bi bi-lock-fill absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                                
                                {/* 👇 input thay đổi type dựa vào showPassword */}
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    className="w-full pl-11 pr-11 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-900 placeholder-gray-500" 
                                    id="adminPassword" 
                                    placeholder="Nhập mật khẩu..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                                
                                {/* 👁 Nút ẩn/hiện mật khẩu */}
                                <button 
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition"
                                    tabIndex={-1}
                                >
                                    <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} text-xl`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-8 text-sm">
                            <div className="flex items-center">
                                <input 
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 checked:bg-blue-600 transition duration-150" 
                                    type="checkbox" 
                                    id="rememberMe"
                                    disabled={loading}
                                    onChange={(e)=>{setghinho(e.target.checked)}}
                                />
                                <label className="ml-2 text-gray-600 select-none font-normal" htmlFor="rememberMe">
                                    Ghi nhớ đăng nhập
                                </label>
                            </div>
                            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition duration-150 hover:underline">Quên mật khẩu?</a>
                        </div>

                        <div className="w-full">
                            <button onClick={handleSubmit}
                                type="submit" 
                                className={`w-full text-white text-lg font-bold py-3 rounded-xl transition duration-300 shadow-lg 
                                            ${loading 
                                                ? 'bg-gray-400 cursor-not-allowed flex items-center justify-center' 
                                                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-xl'}`}
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
                 

                    <div className="text-center mt-8 pt-4 border-t border-gray-200">
                        <Link to="/" className="text-gray-500 hover:text-blue-600 text-sm font-medium transition duration-200 flex items-center justify-center">
                            <i className="bi bi-arrow-left-circle mr-2"></i> Quay về trang chủ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
