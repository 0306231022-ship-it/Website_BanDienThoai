import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./CONTEXT/TrangChuAdmin.js";
import AdminLogin from "./JSX/TRANG/DangNhapAdmin.jsx";
import TrangChuAdmin from "./JSX/TRANG/TrangChuAdmin.jsx";
import TrangChuWeb from "./JSX/TRANG/TrangChuWebsite.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/DangNhap-admin" element={<AdminLogin />} />
          <Route path="/admin/*" element={<TrangChuAdmin />} />
          <Route path="/*" element={<TrangChuWeb />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

