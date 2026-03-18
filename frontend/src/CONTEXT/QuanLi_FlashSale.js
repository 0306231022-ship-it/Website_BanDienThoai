import React, { createContext, useContext, useState } from "react";
const MoDalContext = createContext();
export function AppProviderFS({ children }) {
    const [SanPham, setSanPham] = useState([]);
    return (
        <MoDalContext.Provider value={{ SanPham, setSanPham }}>
            {children}
        </MoDalContext.Provider>
    );
}
export function useFlashSaleContext() {
    return useContext(MoDalContext);
}