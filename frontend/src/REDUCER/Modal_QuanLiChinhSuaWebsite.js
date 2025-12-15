import { createContext, useContext, useReducer } from "react";

export const initialState = {
  currentPage: "SHOW_HOME",
};

// ✅ Hàm reducer để quản lý state
export const uiReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_HOME":
      return { ...state, currentPage: "SHOW_HOME" };
    case "SHOW_PRODUCTS":
      return { ...state, currentPage: "SHOW_PRODUCTS" };
    case "SHOW_NOIBAT":
      return { ...state, currentPage: "SHOW_NOIBAT" };
    case "SHOW_TINTUC":
      return { ...state, currentPage: "SHOW_TINTUC" };
    case "SHOW_LIENHE":
      return { ...state, currentPage: "SHOW_LIENHE" };
    case "SHOW_GIOHANG":
      return { ...state, currentPage: "SHOW_GIOHANG" };
    default:
      return state;
  }
};


const UIContext = createContext();

// ✅ Provider (dùng để bọc App)
export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
};
export const useUI = () => useContext(UIContext);