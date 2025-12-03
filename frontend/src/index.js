import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./CONTEXT/TrangChuAdmin.js";
import AdminLogin from "./JSX/TRANG/DangNhapAdmin.jsx";
import TrangChuAdmin from "./JSX/TRANG/TrangChuAdmin.jsx";
import TrangChuWeb from "./JSX/TRANG/TrangChuWebsite.jsx";
import Trang404 from "./JSX/TRANG/err/404.jsx";
import ServerErrorPage from './JSX/TRANG/err/500.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/DangNhap-admin" element={<AdminLogin />} />
          <Route path="/admin/*" element={<TrangChuAdmin />} />
          <Route path="/*" element={<TrangChuWeb />} />
          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="*" element={<Trang404 />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

