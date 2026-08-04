import { Link } from 'react-router-dom';
import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
import { useState } from 'react';
import * as fun from '../../../../JS/FUNCTONS/function';
import * as API from '../../../../JS/API/API';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';
import { useNavigate } from 'react-router-dom';
function DangNhap() {
    const { OpenMoDal, CloseAllModals } = useModalContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [err, seterrr] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const ChuyenTab = () => {
        CloseAllModals();
        OpenMoDal(null, { TenTrang: 'DangKy', TieuDe: 'Đăng Ký' });
    };

    const DangNhap_func = async () => {
        setLoading(true);
        const kiemtra = fun.KiemTraRong(formData);
        
        if (kiemtra.Status === false) {
            kiemtra.ErrorKeys.forEach(key => {
                seterrr(prev => ({ ...prev, [key]: 'Không được để trống!' }));
            });
            setLoading(false);
            return;
        }
        
        seterrr({});
        const kiemtra_email = fun.validateEmail(formData.email);
        
        if (!kiemtra_email) {
            seterrr(prev => ({ ...prev, email: 'Email không hợp lệ!' }));
            setLoading(false);
            return;
        }

        try {
            const formdata_send = fun.objectToFormData(formData);
            const ketqua = await API.CallAPI(formdata_send, { url: '/NguoiDung/dangnhap', PhuongThuc: 1 });
            alert(JSON.stringify(ketqua));
            if (ketqua.ThanhCong) {
                ThongBao.ThongBao_ThanhCong(ketqua.message);
                const userData = ketqua.DuLieu;
                if (userData.LOAIND === 1) {
                    navigate('/admin');
                }
                CloseAllModals();
                window.location.reload();
            } else {
                ThongBao.ThongBao_Loi(ketqua.message);
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white flex flex-col md:flex-row max-w-4xl w-full mx-auto transition-all duration-300">
            
            {/* Form Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                    <h2 className="font-bold text-3xl text-gray-900 tracking-tight">Đăng Nhập</h2>
                    <p className="text-sm text-gray-500 mt-2">Chào mừng trở lại! Vui lòng nhập thông tin tài khoản của bạn.</p>
                </div>

                <div className="flex flex-col gap-5">
                    {/* Email Input */}
                    <div className="relative">
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Email</label>
                        <input 
                            className={`w-full px-4 py-3 rounded-xl border ${err.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:bg-white focus:outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 transition-all text-sm`} 
                            type="email" 
                            name="email" 
                            placeholder="name@example.com" 
                            value={formData.email} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {err.email && <span className="text-red-500 text-xs mt-1 block font-medium">{err.email}</span>}
                    </div>
                    
                    {/* Password Input */}
                    <div className="relative">
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-semibold text-gray-600 uppercase">Mật khẩu</label>
                            <Link to="/quen-mat-khau" className="text-xs text-[#e11d48] hover:underline font-medium">Quên mật khẩu?</Link>
                        </div>
                        <div className="relative">
                            <input 
                                className={`w-full px-4 py-3 rounded-xl border ${err.password ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:bg-white focus:outline-none focus:border-[#e11d48] focus:ring-2 focus:ring-[#e11d48]/20 transition-all text-sm`} 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                placeholder="••••••••" 
                                value={formData.password} 
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.029 7.029 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.05-1.44 1.629-.829.782-1.83 1.536-2.956 2.052l.93.93z"/>
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l8.23 8.23c.215-.17.424-.35.627-.537l-.771-.771zm-2.022.094l-2.42-2.42a2.5 2.5 0 0 0 3.328 3.328l-.908-.908z"/>
                                        <path d="M3.35 5.47c-.947.669-1.782 1.488-2.35 2.298a13.133 13.133 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c.78 0 1.505-.125 2.181-.347l-.99-1.002A4.992 4.992 0 0 1 8 11.5c-2.12 0-3.879-1.168-5.168-2.457a13.134 13.134 0 0 1-1.172-1.043z"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.05-1.44 1.629C11.879 12.5 10.12 13.5 8 13.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                        {err.password && <span className="text-red-500 text-xs mt-1 block font-medium">{err.password}</span>}
                    </div>

                    {/* Submit Button */}
                    <button 
                        onClick={DangNhap_func} 
                        disabled={loading}
                        className="w-full mt-2 bg-[#e11d48] hover:bg-[#be123c] text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-lg shadow-[#e11d48]/30 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : "Đăng Nhập"}
                    </button>
                </div>

                {/* Switch to Register */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Chưa có tài khoản?</p>
                    <button 
                        onClick={ChuyenTab} 
                        className="text-sm font-semibold text-[#e11d48] border border-[#e11d48]/30 hover:border-[#e11d48] py-2 px-4 rounded-xl hover:bg-[#e11d48]/5 transition-all duration-300"
                    >
                        Tạo tài khoản mới
                    </button>
                </div>
            </div>

            {/* Image Section */}
            <div className="hidden md:block md:w-1/2 relative bg-gray-900">
                <img 
                    className="w-full h-full object-cover opacity-90" 
                    src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Smartphone Promotion"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
                    <p className="text-white text-sm font-medium">Tham gia cùng chúng tôi để nhận ngay những ưu đãi độc quyền mỗi ngày.</p>
                </div>
            </div>

        </div>
    );
}

export default DangNhap;