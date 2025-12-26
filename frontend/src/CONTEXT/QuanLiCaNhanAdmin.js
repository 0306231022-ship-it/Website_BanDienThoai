import React, { createContext, useContext, useState } from "react";
import * as fun from '../JS/FUNCTONS/function';
import * as ThongBao from '../JS/FUNCTONS/ThongBao';
import * as API from '../JS/API/API';
import { useNavigate } from "react-router-dom";
const MoDalContext = createContext();
export function AppADProvider({ children }) {
   const navigate = useNavigate();
   const [islogin,setislogin]=useState(false);
   const [TTCaNhan,setTTCaNhan]=useState(null);
   //lấy thông tin cá nhân
   const GetTTCaNhan=async()=>{
    setTTCaNhan(null)
    const ketqqua = await API.CallAPI(undefined,{url:'/admin/getTT', PhuongThuc:2});
   if(ketqqua.ThanhCong){
    setTTCaNhan(ketqqua.DuLieu);
    return;
   }
   }
     //hàm kiểm tra đăng nhập
  const kiemtra=async()=>{
    const ketqua=await API.CallAPI(undefined,{url:'/admin/kiemtra', PhuongThuc:1});
    if(ketqua.Status){
       ThongBao.ThongBao_CanhBao(ketqua.message)
       navigate('/DangNhap-admin')
    }
  };
   const login = async (DuLieu) => {
     const kiemtra=fun.KiemTraRong(DuLieu);
     if (!kiemtra) {
       return {
         Status: true,
         message: 'Vui lòng nhập đầy đủ thông tin!'
       }
     }
     if (!fun.validateEmail(DuLieu.email)) {
       return {
         validation : true,
         errors: [
           { path: "email", msg: "Email không hợp lệ!" },
         ]
       }
     }
      const formdata=fun.objectToFormData(DuLieu);
      const ketqqua=await API.CallAPI(formdata,{PhuongThuc:1,url :'/admin/DangNhap' });
      if(ketqqua.ThanhCong){
        setislogin(true);
        setTTCaNhan(ketqqua.DuLieu);
        ThongBao.ThongBao_ThanhCong(ketqqua.message);
        navigate('/admin');
      }else{
         return ketqqua;
      }   
   };
     //hàm đăng xuất
   const DangXuat = async () => {
       const kiemtra = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn muốn đăng xuất không?');
       if (!kiemtra) return;
       try {
           const token = localStorage.getItem("token");
           const ketqua = await API.CallAPI(undefined, { url:'/admin/DangXuat' , token : token , PhuongThuc:1 });
           localStorage.removeItem('token');
           localStorage.removeItem('DuLieu');
           if (ketqua?.ThanhCong) {
               ThongBao.ThongBao_ThanhCong(ketqua.message);
               setTTCaNhan(null);
               setislogin(false);
           } else {
               ThongBao.ThongBao_Loi(ketqua?.message || 'Đăng xuất thất bại');
           }
           navigate('/DangNhap-admin');
       } catch (error) {
           console.error(error);
           ThongBao.ThongBao_Loi('Đã xảy ra lỗi khi đăng xuất');
       }
   }
  
   

  return (
    <MoDalContext.Provider value={{  GetTTCaNhan, kiemtra, login , islogin , TTCaNhan , DangXuat}}>
      {children}
    </MoDalContext.Provider>
  );
}
export function useADContext() {
  return useContext(MoDalContext);
}
