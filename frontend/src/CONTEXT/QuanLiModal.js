import React, { createContext, useContext, useState } from "react";
const MoDalContext = createContext();
export function AppProvider({ children }) {
    const [modalState, setModalState] = useState({
        isOpen: false,
        DuLieu: {},
        TrangThaiTrang: "",
        TieuDe:'' 
    });
    const MoModal = (dataType, currentData, tieude) => {
        setModalState({
            isOpen: true,
            DuLieu: currentData, 
            TrangThaiTrang: dataType,
            TieuDe:tieude 
        });
    }
    const DongModal = () => {
        setModalState({
            isOpen: false,
            DuLieu: {},
            TrangThaiTrang: "",
            TieuDe:""
        });
    };
    const ChinhSuaModel=(moi)=>{
        setModalState(prev=>({
            ...prev,
            TrangThaiTrang:moi
        }))

    }
  return (
    <MoDalContext.Provider value={{modalState,MoModal,DongModal,ChinhSuaModel}}>
      {children}
    </MoDalContext.Provider>
  );
}
export function useModalContext() {
  return useContext(MoDalContext);
}
