import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
import * as fun from '../../../../JS/FUNCTONS/function';
import * as API from '../../../../JS/API/API';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';
import Loading from "../../../../JS/FUNCTONS/loading";
import { useState } from "react";
function DangKy() {
    const { OpenMoDal , CloseAllModals } = useModalContext();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const [XacNhan, setXacNhan] = useState('');
    const [err, setErr] = useState({});
    const [ISLoading, setLoading] = useState(false);
    const ChuyenTab = ()=>{
        CloseAllModals();
        OpenMoDal(null, { TenTrang: 'DangNhap', TieuDe: 'Đăng Nhập' })
    }
    const DangKy_func = async()=>{
        setErr({});
        setLoading(true);
        const kiemtra = await fun.KiemTraRong(formData);
        //{"Status":false,"ErrorKeys":["name","phone","email","password","confirm_password"]}
        if(kiemtra.Status===false){
            setLoading(false);
            kiemtra.ErrorKeys.forEach(key=>{
                setErr(prev=>({...prev, [key]: 'Không được để trống'}));
            });
            return;
        }
        if(XacNhan===''){
            setLoading(false);
            setErr(prev=>({...prev, XacNhan: 'Bạn cần xác nhận điều khoản'}));
            return;
        }
        if(formData.password !== formData.confirm_password){
            setLoading(false);
            setErr(prev=>({...prev, confirm_password: 'Mật khẩu xác nhận không khớp'}));
            return;
        }
        try {
            const formdata= fun.objectToFormData(formData);
            const ketqua = await API.CallAPI(formdata, {url :'/NguoiDung/DangKy', PhuongThuc:1});
            //alert(JSON.stringify(ketqua));
            //{"validation":true,"errors":[{"type":"field","value":"","msg":"Mật khẩu không được bỏ trống!","path":"password","location":"body"},{"type":"field","value":"","msg":"Tên không được bỏ trống!","path":"name","location":"body"},{"type":"field","value":"","msg":"Số điện thoại không được bỏ trống!","path":"phone","location":"body"},{"type":"field","value":"","msg":"Email không được bỏ trống!","path":"email","location":"body"},{"type":"field","value":"","msg":"Email không hợp lệ!","path":"email","location":"body"},{"type":"field","value":"","msg":"Mật khẩu xác nhận không được bỏ trống!","path":"confirm_password","location":"body"}]}
            if(ketqua.validation){
                const newErr = {};
                ketqua.errors.forEach(error => {
                    newErr[error.path] = error.msg;
                });
                setErr(newErr);
                return;
            }
            if(ketqua.ThanhCong){
                ThongBao.ThongBao_ThanhCong(ketqua.message);
                ChuyenTab();
            }else{
                ThongBao.ThongBao_Loi(ketqua.message);
            }
        } catch (error) {
            setLoading(false);
            ThongBao.ThongBao_Loi('Có lỗi xảy ra trong quá trình đăng ký, vui lòng thử lại sau!');
        } finally{
            setLoading(false);
        }
    }
    if(ISLoading){
        return (
            <div className="flex items-center justify-center h-[400px]">
                <Loading size={50}/>
            </div>
        )
    };
    return (
            <div className="bg-white flex flex-row-reverse rounded-2xl max-w-3xl p-5 items-center">
        
        <div className="md:w-1/2 px-8 md:px-12">
            <h2 className="font-bold text-2xl text-[#e11d48]">Tạo Tài Khoản</h2>
            <p className="text-sm mt-3 text-gray-600">Trở thành thành viên để nhận ngay voucher giảm giá 10% cho chiếc điện thoại đầu tiên!</p>

            <div className="flex flex-col gap-3 mt-6">
                <input onChange={(e)=>{setFormData(prev=>({...prev, name:e.target.value}))}} className="p-2 rounded-xl border w-full focus:outline-none focus:border-[#e11d48] text-sm" type="text" name="name" placeholder="Họ và tên"/>
                {
                    err.name &&
                     <div className="flex items-center gap-1">
                     <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20" 
      fill="currentColor" 
      className="w-4 h-4 text-red-500 flex-shrink-0"
    >
      <path 
        fillRule="evenodd" 
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
        clipRule="evenodd" 
      />
    </svg>
    <p className="text-red-500 text-xs">{err.name}</p>
                    </div> 
                }     
                <input onChange={(e)=>{setFormData(prev=>({...prev, phone: e.target.value}))}} className="p-2 rounded-xl border w-full focus:outline-none focus:border-[#e11d48] text-sm" type="tel" name="phone" placeholder="Số điện thoại"/>
                {
                    err.phone && 
                     <div className="flex items-center gap-1">
                     <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20" 
      fill="currentColor" 
      className="w-4 h-4 text-red-500 flex-shrink-0"
    >
      <path 
        fillRule="evenodd" 
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
        clipRule="evenodd" 
      />
    </svg>
    <p className="text-red-500 text-xs">{err.phone}</p>
                    </div> 
                }
                <input onChange={(e)=>{setFormData(prev=>({...prev, email: e.target.value}))}} className="p-2 rounded-xl border w-full focus:outline-none focus:border-[#e11d48] text-sm" type="email" name="email" placeholder="Email"/>
                {
                    err.email && 
                     <div className="flex items-center gap-1">
                     <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20" 
      fill="currentColor" 
      className="w-4 h-4 text-red-500 flex-shrink-0"
    >
      <path 
        fillRule="evenodd" 
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
        clipRule="evenodd" 
      />
    </svg>
    <p className="text-red-500 text-xs">{err.email}</p>
                    </div> 
                }
                <div className="relative">
                    <input onChange={(e)=>{setFormData(prev=>({...prev, password: e.target.value}))}} className="p-2 rounded-xl border w-full focus:outline-none focus:border-[#e11d48] text-sm" type="password" name="password" placeholder="Mật khẩu"/>
                </div>
                {
                    err.password && 
                     <div className="flex items-center gap-1">
                     <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20" 
      fill="currentColor" 
      className="w-4 h-4 text-red-500 flex-shrink-0"
    >
      <path 
        fillRule="evenodd" 
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
        clipRule="evenodd" 
      />
    </svg>
    <p className="text-red-500 text-xs">{err.password}</p>
                    </div> 
                }
                <input onChange={(e)=>{setFormData(prev=>({...prev, confirm_password: e.target.value}))}} className="p-2 rounded-xl border w-full focus:outline-none focus:border-[#e11d48] text-sm" type="password" name="confirm_password" placeholder="Xác nhận mật khẩu"/>

                <div className="flex items-center gap-2 mt-2">
                    <input onClick={(e)=>{setXacNhan(e.target.value)}} type="checkbox" id="terms" className="accent-[#e11d48]"/>
                    <label for="terms" className="text-[10px] text-gray-500">Tôi đồng ý với các Điều khoản & Chính sách bảo mật</label>
                    {
                        err.XacNhan &&
                            <div className="flex items-center gap-1">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-4 h-4 text-red-500 flex-shrink-0"
                                >
                                    <path 
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-red-500 text-xs">{err.XacNhan}</p>
                            </div>
                    }
                </div>

                <button onClick={DangKy_func} className="bg-[#e11d48] rounded-xl text-white py-2 mt-2 hover:scale-105 duration-300 font-medium shadow-md">Đăng Ký Ngay</button>
            </div>

            <div className="mt-6 text-xs flex justify-between items-center text-[#e11d48]">
                <p className="text-gray-500">Bạn đã có tài khoản?</p>
                <button onClick={ChuyenTab} className="py-2 px-5 bg-white border border-[#e11d48] rounded-xl hover:scale-110 duration-300 font-semibold">Đăng nhập</button>
            </div>
        </div>

        <div className="md:block hidden w-1/2">
            <img className="rounded-2xl h-[500px] w-full object-cover" src="https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="New Smartphone"/>
        </div>

    </div>
    );
};
export default DangKy;