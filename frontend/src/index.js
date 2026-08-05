import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./CONTEXT/TrangChuAdmin.js";
import {AppMDProvider } from './CONTEXT/QuanLiModal.js';
import { AppADProvider } from './CONTEXT/QuanLiCaNhanAdmin.js';
import TrangChuAdmin from "./JSX/TRANG/TrangChuAdmin.jsx";
import TrangChuWeb from "./JSX/TRANG/TrangChuWebsite.jsx";
import ServerErrorPage from './JSX/TRANG/err/500.jsx';
import QuenMatKhau from './JSX/TRANG/QuenMatKhau.jsx';
import ProtectedRoute from './middware/DangNhap_admin.jsx';
import ProtectedRoutes from './middware/kiemtra_dangnhap.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AppMDProvider>
          <AppADProvider>
            <Routes>
          <Route path="/admin/*" element={<ProtectedRoute><TrangChuAdmin /></ProtectedRoute>} />
          <Route path="/*" element={<ProtectedRoutes><TrangChuWeb /></ProtectedRoutes>} />
          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="/quen-mat-khau" element={<QuenMatKhau />} />
        
        </Routes>
        </AppADProvider>
      </AppMDProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

