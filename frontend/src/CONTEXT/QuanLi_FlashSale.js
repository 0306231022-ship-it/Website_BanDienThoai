import React, { createContext, useContext, useState } from "react";
const MoDalContext = createContext();
export function AppProvider({ children }) {
    return (
        <MoDalContext.Provider value={{ }}>
            {children}
        </MoDalContext.Provider>
    );
}
export function useModalContext() {
    return useContext(MoDalContext);
}