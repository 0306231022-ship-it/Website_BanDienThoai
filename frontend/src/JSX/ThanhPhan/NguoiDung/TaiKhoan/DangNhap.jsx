import { Link , useNavigate  } from 'react-router-dom';
import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
import { useState } from 'react';
import * as fun  from '../../../../JS/FUNCTONS/function';
import * as API from '../../../../JS/API/API';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';
function DangNhap() {
    const { OpenMoDal , CloseAllModals } = useModalContext();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [err,seterrr] = useState({});
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const ChuyenTab = ()=>{
        CloseAllModals();
        OpenMoDal(null, { TenTrang: 'DangKy', TieuDe: 'Đăng Ký' })
    }
    const DangNhap_func = async ()=>{
        setLoading(true);
        const kiemtra = fun.KiemTraRong(formData);
        //alert(JSON.stringify(kiemtra));
        //{"Status":false,"ErrorKeys":["email","password"]}
        if(kiemtra.Status === false){
            kiemtra.ErrorKeys.forEach(key => {
                seterrr(prev => ({...prev, [key]: 'Không được để trống!'}));
            });
            setLoading(false);
            return;
        }
        seterrr({});
        const kiemtra_email = fun.validateEmail(formData.email);
        //alert(JSON.stringify(kiemtra_email));
        if(!kiemtra_email){
            seterrr(prev => ({...prev, email: 'Email không hợp lệ!'}));
            setLoading(false);
            return;
        }
        try {
            const formdata_send = fun.objectToFormData(formData);
            const ketqua = await API.CallAPI(formdata_send,{url:'/NguoiDung/dangnhap',PhuongThuc:1});
            alert(JSON.stringify(ketqua));
            if(ketqua.ThanhCong){
                // Xử lý đăng nhập thành công
                ThongBao.ThongBao_ThanhCong(ketqua.message);
                nav('/'); 
                CloseAllModals();
             }else{
                ThongBao.ThongBao_Loi(ketqua.message);
            }

        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            setLoading(false);
        }finally{
            setLoading(false);
        }
    }
    if(loading){
        return <div className="bg-white flex max-w-3xl p-5 items-center">Loading...</div>;
    }   
    return (
         <div className="bg-white flex max-w-3xl p-5 items-center">
        
        <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#e11d48]">Đăng Nhập</h2>
            <p className="text-sm mt-4 text-[#e11d48]">Nếu bạn đã là thành viên, hãy đăng nhập để nhận ưu đãi!</p>

            <div className="flex flex-col gap-4 mt-8">
                <div className="relative">
                    <input className="p-2 rounded-xl border w-full focus:outline-none focus:border-[#e11d48]" type="email" name="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                    {
                        err.email && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{err.email}</span>
                    }
                </div>
                
                <div className="relative">
                    <input className="p-2 rounded-xl border w-full focus:outline-none focus:border-[#e11d48]" type="password" name="password" placeholder="Mật khẩu" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.05-1.44 1.629C11.879 12.5 10.12 13.5 8 13.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                    </svg>
                    {
                        err.password && <span className="text-red-500 text-xs absolute -bottom-5 left-0">{err.password}</span>
                    }
                </div>

                <button onClick={DangNhap_func} className="bg-[#e11d48] rounded-xl text-white py-2 hover:scale-105 duration-300 font-medium">Đăng Nhập</button>
            </div>

            <div className="mt-5 text-xs border-b border-[#e11d48] py-4 text-[#e11d48]">
                    <Link to="/quen-mat-khau" className="hover:underline">Quên mật khẩu?</Link>
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[#e11d48]">
                <p>Chưa có tài khoản?</p>
                <button onClick={ChuyenTab} className="py-2 px-5 bg-white border border-[#e11d48] rounded-xl hover:scale-110 duration-300">Đăng ký</button>
            </div>
        </div>

        <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Smartphone Promotion"/>
        </div>

    </div>
    )
};
export default DangNhap;