import React, { createContext, useReducer, useContext } from "react";

// 1. Tạo Context
const AppContext = createContext();

// 2. Định nghĩa state ban đầu
const initialState = {
  Trang: "TrangChu",       // Trang hiện tại
  // bạn có thể thêm các state khác nếu muốn
  cart: [],
  theme: "light"
};

// 3. Định nghĩa reducer
function ChuyenTrangReducer(state, action) {
  switch (action.type) {
    case "SET_TRANG": // dùng để chuyển trang
      return { ...state, Trang: action.payload };

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
  const [state, dispatch] = useReducer(ChuyenTrangReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// 5. Tạo hook để dùng context dễ dàng
export function useAppContext() {
  return useContext(AppContext);
}
