import React from 'react';
import ReactDOM from 'react-dom/client';
import TrangChuWeb from '../src/JSX/TRANG/TrangChuWebsite.jsx';
import AI_CONGNGHE from '../src/JSX/ThanhPhan/Website/AI_CONGNGHE';
import SanPhamTrangChu from '../src/JSX/ThanhPhan/Website/SanPhamTrangChu';
import SanPham from '../src/JSX/ThanhPhan/Website/SanPham';
import BenVung from '../src/JSX/ThanhPhan/Website/BenVung';
import HoTro from '../src/JSX/ThanhPhan/Website/HoTro';
import GioHang from '../src/JSX/ThanhPhan/Website/GioHang';
import TrangChuNguoiDung from '../src/JSX/ThanhPhan/NguoiDung/TrangChuNguoiDung';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { UIProvider } from "../src/REDUCER/TrangChuWeb";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TrangChuWeb />} />
          <Route path="/cong-nghe" element={<AI_CONGNGHE />} />
          <Route path="/sanpham-trangchu" element={<SanPhamTrangChu />} />
          <Route path="/san-pham" element={<SanPham />} />
          <Route path="/ben-vung" element={<BenVung />} />
          <Route path="/ho-tro" element={<HoTro />} />
          <Route path="/gio-hang" element={<GioHang />} />
          <Route path="/trang-nguoidung" element={<TrangChuNguoiDung />} />

        </Routes>
      </BrowserRouter>
    </UIProvider>

  </React.StrictMode>
);

reportWebVitals();

