//đã hoàn thành
import { Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import * as ThongBao from '../../JS/FUNCTONS/ThongBao';
import {useAppContext} from '../../CONTEXT/TrangChuAdmin';
function AdminLogin() {
    const [email,setEmail]=useState('');
    const navigate = useNavigate();
    const [passWord,setPassWord]=useState('');
    const [xacnhan,setXacNhan]=useState(false);
    const { login } = useAppContext();
    const DangNhap=async()=>{
        const DuLieu={
            email:email,
            passWord:passWord,
            xacnhan:xacnhan
        };
       const ketqua= await login(DuLieu);
       if(ketqua.ThanhCong){
            localStorage.setItem("token", ketqua.token);
            localStorage.setItem('DuLieu', JSON.stringify(ketqua.DuLieu));
            ThongBao.ThongBao_ThanhCong(ketqua.message);
            navigate('/admin');
       }else{
            ThongBao.ThongBao_Loi(ketqua.message);
       }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <i className="fas fa-lock text-4xl text-teal-600 mx-auto block w-fit"></i>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Đăng nhập Cổng Quản Trị
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Vui lòng nhập thông tin xác thực Admin của bạn
                    </p>
                </div>

                <div className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-2xl border border-teal-100" action="#" method="POST">
                    
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email hoặc Tên đăng nhập</label>
                            <input id="email-address" name="email" type="text"  required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                placeholder="Email hoặc Tên đăng nhập"
                                onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Mật khẩu</label>
                            <input  id="password"   name="password" type={xacnhan ? "text" : "password"} required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                placeholder="Mật khẩu"
                                onChange={(e)=>{setPassWord(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                onChange={(e) => { setXacNhan(e.target.checked); }}
                                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                               {xacnhan ? 'Ẩn mật khẩu':'Hiện mật khẩu'} 
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="/admin/forgot-password" className="font-medium text-teal-600 hover:text-teal-500 transition">
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={DangNhap}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300 shadow-lg shadow-teal-300/50"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <i className="fas fa-sign-in-alt h-5 w-5 text-teal-300 group-hover:text-teal-200"></i>
                            </span>
                            Đăng Nhập
                        </button>
                    </div>
                </div>
                <div className="text-center text-xs text-gray-500">
                    <p>@ {new Date().getFullYear()} Admin Console. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;