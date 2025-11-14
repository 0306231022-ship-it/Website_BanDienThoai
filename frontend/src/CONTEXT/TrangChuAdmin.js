import React, { createContext, useContext } from "react";
import { useState } from "react";
import * as fun from '../JS/FUNCTONS/function';
import * as API from '../JS/API/API';
import * as ThongBao from '../JS/FUNCTONS/ThongBao';
import { useNavigate } from "react-router-dom";
const AppContext = createContext();

// 4. Tạo Provider
export function AppProvider({ children }) {
  const [admin,setadmin]=useState([]);
  const [user,setuser]=useState([]);
  const navigate = useNavigate();
  const kiemtra=async()=>{
    setadmin([])
    const token = localStorage.getItem("token");
    const url={
      DiaChi:2
    };
    const ketqua=await API.CallAPI(token,undefined,url);
    if(!ketqua.ThanhCong){
       navigate('/DangNhap-admin')
        ThongBao.ThongBao_CanhBao(ketqua.message)
    }else{
      setadmin(ketqua.DuLieu)
    }
  };
      

  const login =async (DuLieu,Loai)=>{
    const kiemtra=fun.KiemTraRong(DuLieu);
    if(!kiemtra){
      ThongBao.ThongBao_CanhBao('Vui lòng điền đầy đủ thông tin');
      return;
    }else{
       const ketqua=await API.CallAPI(undefined,DuLieu,{DiaChi : 3});
       if(ketqua.ThanhCong){
         localStorage.setItem("token", ketqua.token);
         Loai===1 ? setadmin(ketqua.DuLieu) : setuser(ketqua.DuLieu);
         ThongBao.ThongBao_ThanhCong(ketqua.message);
         navigate('/admin');
       }else{
        ThongBao.ThongBao_Loi(ketqua.message)
       }
    }
  }


  return (
    <AppContext.Provider value={{ login , admin , user , kiemtra }}>
      {children}
    </AppContext.Provider>
  );
}

// 5. Tạo hook để dùng context dễ dàng
export function useAppContext() {
  return useContext(AppContext);
}
