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
  
  
   

  return (
    <MoDalContext.Provider value={{  GetTTCaNhan, islogin , TTCaNhan}}>
      {children}
    </MoDalContext.Provider>
  );
}
export function useADContext() {
  return useContext(MoDalContext);
}
