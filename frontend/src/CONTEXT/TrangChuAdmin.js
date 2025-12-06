import React, { createContext, useContext, useState } from "react";
import * as fun from '../JS/FUNCTONS/function';
import {useAPIContext} from '../JS/API/API';
import * as ThongBao from '../JS/FUNCTONS/ThongBao';
import { useNavigate } from "react-router-dom";
const AppContext = createContext();

// 4. Tạo Provider
export function AppProvider({ children }) {
  const {CallAPI}= useAPIContext();
  const navigate = useNavigate();
  const [TTwebsite,setWebsite]=useState([])
  const GetTTwebsite=async()=>{
    setWebsite([])
    const ketqqua=await CallAPI(undefined,undefined,{url:'/admin/ThongTinWebsite'});
    if(ketqqua.status===false){
      navigate('/500');
      return;
    }
    if(ketqqua.ThanhCong){
      setWebsite(ketqqua.DuLieu)
    }
 
  }
  //hàm kiểm tra đăng nhập
  const kiemtra=async()=>{
    const token = localStorage.getItem("token");
    const ketqua=await CallAPI(token,undefined,{url:'/admin/kiemtra'});
    if(!ketqua.ThanhCong){
       ThongBao.ThongBao_CanhBao(ketqua.message)
       navigate('/DangNhap-admin')
    }
  };
  //hàm đăng nhập
  const login =async (DuLieu,Loai)=>{
    const kiemtra=fun.KiemTraRong(DuLieu);
    if(!kiemtra){
      ThongBao.ThongBao_CanhBao('Vui lòng điền đầy đủ thông tin');
      return;
    }else{
       const ketqua=await CallAPI(undefined,DuLieu,{url:'/admin/DangNhap'});
       return ketqua;
    }
  }
  //hàm đăng xuất
const DangXuat = async () => {
    const kiemtra = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn muốn đăng xuất không?');
    if (!kiemtra) return;
    try {
        const token = localStorage.getItem("token");
        const ketqua = await CallAPI(token, undefined, { url:'/admin/DangXuat' });
        localStorage.removeItem('token');
        localStorage.removeItem('DuLieu');
        if (ketqua?.ThanhCong) {
            ThongBao.ThongBao_ThanhCong(ketqua.message);
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
    <AppContext.Provider value={{ login , kiemtra , DangXuat , GetTTwebsite , TTwebsite ,}}>
      {children}
    </AppContext.Provider>
  );
}

// 5. Tạo hook để dùng context dễ dàng
export function useAppContext() {
  return useContext(AppContext);
}
