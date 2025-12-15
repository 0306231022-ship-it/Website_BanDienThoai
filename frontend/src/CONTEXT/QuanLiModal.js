import React, { createContext, useContext, useState } from "react";
const MoDalContext = createContext();
export function AppProvider({ children }) {
    const [modalState, setModalState] = useState({
        isOpen: false,
        DuLieu: {},
        TrangThaiTrang: "" 
    });
    const [TieuDe,setTieuDe] =useState({
        isTieuDe:false,
        TieuDe:''
    })
    const MoModal = (dataType, currentData) => {
        setModalState({
            isOpen: true,
            DuLieu: currentData, 
            TrangThaiTrang: dataType 
        });
    }
    const DongModal = () => {
        setModalState({
            isOpen: false,
            DuLieu: {},
            TrangThaiTrang: ""
        });
    };
    const CapNhatTieuDe=(is,td)=>{
        setTieuDe({
            isTieuDe:is,
            TieuDe:td || ''
        })
    };
  return (
    <MoDalContext.Provider value={{modalState,MoModal,DongModal,CapNhatTieuDe,TieuDe}}>
      {children}
    </MoDalContext.Provider>
  );
}
export function useModalContext() {
  return useContext(MoDalContext);
}
