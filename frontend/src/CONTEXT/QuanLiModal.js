import React, { createContext, useContext, useState } from "react";

const MoDalContext = createContext();

export function AppProvider({ children }) {
    const [modalState, setModalState] = useState({
        isOpen: false,
        DuLieu: {},
        TrangThaiTrang: null,
        QuaTrang: {
            tenTrangMoi: null,
            url: null
        },
        url:null
    });
    const MoModal = (tenTrangMoi, duLieu , url = null) => {
        setModalState(prev => ({
            isOpen: true,
            DuLieu: duLieu,
            TrangThaiTrang: tenTrangMoi,
            QuaTrang: {
                tenTrangMoi: tenTrangMoi,
                url: url || null
            },
            url: url || null
        }));
    };
    const DongModal = () => {
        setModalState({
            isOpen: false,
            DuLieu: {},
            TrangThaiTrang: null,
            QuaTrang: {
                tenTrangMoi: null,
                url: null
            },
            url: null
        });
    };

    const ChinhSuaModel = (tenTrang, url) => {
        setModalState(prev => ({
            ...prev,
            TrangThaiTrang: tenTrang,
            QuaTrang: {
                ...prev.QuaTrang,
                url: url || null
            },
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