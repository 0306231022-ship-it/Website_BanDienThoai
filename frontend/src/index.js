import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TrangChuWeb from './JSX/TRANG/TrangChuWebsite';
import KiemTraDangNhap from './JS/KiemTraDangNhap/KiemTraDN';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { AppProvider } from "../src/CONTEXT/TrangChuWrb";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppProvider>
      {/* Bọc toàn bộ trong BrowserRouter */}
      <BrowserRouter>
        <Routes>
          {/* Trang chủ */}
          <Route path="/" element={<TrangChuWeb />} />
          {/* Trang kiểm tra đăng nhập */}
          <Route path="/KiemTraDangNhap" element={<KiemTraDangNhap />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();

