import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TrangChuWeb from './JSX/TRANG/TrangChuWebsite';
import KiemTraDangNhap from './JS/KiemTraDangNhap/KiemTraDN';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { AppProvider } from "../src/CONTEXT/TrangChuWrb";
import Dashboard from './JSX/TRANG/TrangChuAdmin';
import LoginAdmin from './JSX/TRANG/DangNhapAdmin';
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
          <Route path="/Admin" element={<Dashboard />} />
          <Route path="/DangNhapAD" element={<LoginAdmin />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();

