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
  const [err,seterr]=useState({});
  const [TTwebsite,setWebsite]=useState([])
  const GetTTwebsite=async()=>{
    setWebsite([])
    const ketqqua=await CallAPI(undefined,{url:'/admin/ThongTinWebsite' , PhuongThuc:1});
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
    const ketqua=await CallAPI(undefined,{url:'/admin/kiemtra' , token : token , PhuongThuc:1});
    if(!ketqua.ThanhCong){
       ThongBao.ThongBao_CanhBao(ketqua.message)
       navigate('/DangNhap-admin')
    }
  };
  //hàm đăng nhập
const login = async (DuLieu) => {
  if (!fun.KiemTraRong(DuLieu)) {
    ThongBao.ThongBao_CanhBao('Vui lòng điền đầy đủ thông tin');
    return;
  }

  if (!fun.validateEmail(DuLieu.email)) {
    seterr(prev => ({ ...prev, email: 'Lỗi định dạng email' }));
    ThongBao.ThongBao_CanhBao('Email không hợp lệ');
    return;
  }

  try {
    const ketqua = await CallAPI(DuLieu, { url: '/admin/DangNhap', PhuongThuc: 1 });
    return ketqua;
  } catch (error) {
    ThongBao.ThongBao_CanhBao('Đăng nhập thất bại, vui lòng thử lại');
    return null;
  }
};

  //hàm đăng xuất
const DangXuat = async () => {
    const kiemtra = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn muốn đăng xuất không?');
    if (!kiemtra) return;
    try {
        const token = localStorage.getItem("token");
        const ketqua = await CallAPI(undefined, { url:'/admin/DangXuat' , token : token , PhuongThuc:1 });
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
    <AppContext.Provider value={{ login , err, kiemtra , DangXuat , GetTTwebsite , TTwebsite ,}}>
      {children}
    </AppContext.Provider>
  );
}

// 5. Tạo hook để dùng context dễ dàng
export function useAppContext() {
  return useContext(AppContext);
}
