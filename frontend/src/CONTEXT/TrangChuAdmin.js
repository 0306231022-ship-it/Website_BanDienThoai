import React, { createContext, useContext, useState } from "react";
import * as API from '../JS/API/API';
import { useNavigate } from "react-router-dom";
const AppContext = createContext();

// 4. Tạo Provider
export function AppProvider({ children }) {
  const navigate = useNavigate();
  const [TTwebsite,setWebsite]=useState([])
  const GetTTwebsite=async()=>{
    setWebsite([])
    const ketqqua=await API.CallAPI(undefined,{url:'/admin/ThongTinWebsite' , PhuongThuc:1});
    if(ketqqua.Status){
      navigate('/500');
      return;
    }
    if(ketqqua.ThanhCong){
      setWebsite(ketqqua.DuLieu)
    };
  
  }
  return (
    <AppContext.Provider value={{ GetTTwebsite , TTwebsite ,}}>
      {children}
    </AppContext.Provider>
  );
}

// 5. Tạo hook để dùng context dễ dàng
export function useAppContext() {
  return useContext(AppContext);
}
