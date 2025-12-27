import React, { createContext, useContext, useState } from "react";

const MoDalContext = createContext();

export function AppProvider({ children }) {
    const [modalState, setModalState] = useState({
        isOpen: false,
        DuLieu: {},
        TrangThaiTrang: "",
        TrangThaiTrangTruoc: ""
    });
    const MoModal = (tenTrangMoi, duLieu = {}) => {
        setModalState(prev => ({
            isOpen: true,
            DuLieu: duLieu,
            TrangThaiTrang: tenTrangMoi,
            TrangThaiTrangTruoc: prev.TrangThaiTrang 
        }));
    };

    const DongModal = () => {
        setModalState({
            isOpen: false,
            DuLieu: {},
            TrangThaiTrang: "",
            TrangThaiTrangTruoc: ""
        });
    };

    const ChinhSuaModel = (tenTrang) => {
        setModalState(prev => ({
            ...prev,
            TrangThaiTrang: tenTrang
        }));
    };

    return (
        <MoDalContext.Provider value={{ modalState, MoModal, DongModal, ChinhSuaModel }}>
            {children}
        </MoDalContext.Provider>
    );
}

export function useModalContext() {
    return useContext(MoDalContext);
}