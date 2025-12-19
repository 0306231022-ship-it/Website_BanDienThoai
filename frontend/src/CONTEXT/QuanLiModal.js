import React, { createContext, useContext, useState } from "react";
const MoDalContext = createContext();
export function AppProvider({ children }) {
    const [modalState, setModalState] = useState({
        isOpen: false,
        DuLieu: {},
        TrangThaiTrang: "",
        TrangThaiTrangTruoc:""
    });
    const MoModal = (dataType, currentData) => {
        setModalState({
            isOpen: true,
            DuLieu: currentData, 
            TrangThaiTrang: dataType,
            TrangThaiTrangTruoc:dataType,
        });
    }
    const DongModal = () => {
        setModalState({
            isOpen: false,
            DuLieu: {},
            TrangThaiTrang: "",
            TrangThaiTrangTruoc:""
        });
    };
    const ChinhSuaModel=(moi)=>{
        setModalState(prev=>({
            ...prev,
            TrangThaiTrang:moi
        }))
    }
    const CapNhatTrangTruoc=(TrangThai)=>{
      setModalState(prev=>({
        ...prev,
        TrangThaiTrangTruoc:TrangThai
      }))
    }
  return (
    <MoDalContext.Provider value={{modalState,MoModal,DongModal,ChinhSuaModel,CapNhatTrangTruoc}}>
      {children}
    </MoDalContext.Provider>
  );
}
export function useModalContext() {
  return useContext(MoDalContext);
}
