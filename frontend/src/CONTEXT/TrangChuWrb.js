import React, { createContext, useReducer, useContext } from "react";

// 1. Tạo Context
const AppContext = createContext();

// 2. Định nghĩa state ban đầu
const Trang = {
    TrangThaiTrang:null,
    Trang:null
};

// 3. Định nghĩa reducer Chuyển trang trong trang trong trang chủ
function ChuyenTrangReducer(state, action) {
    switch(action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };
        case "ADD_TO_CART":
            return { ...state, cart: [...state.cart, action.payload] };
        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
        case "TOGGLE_THEME":
            return { ...state, theme: state.theme === "light" ? "dark" : "light" };
        default:
            return state;
    }
}

// 4. Tạo Provider
export function AppProvider({ children }) {
    const [TrangThaiTrang, setTrangThaiTrang] = useReducer(ChuyenTrangReducer, Trang);

    return (
        <AppContext.Provider value={{ TrangThaiTrang, setTrangThaiTrang }}>
            {children}
        </AppContext.Provider>
    );
}

// 5. Tạo hook để dùng context dễ dàng
export function useAppContext() {
    return useContext(AppContext);
}
