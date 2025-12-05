import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../../CSS/TrangChuWeb.css';
import Menu from '../ThanhPhan/Website/Menu';
import Footer from '../ThanhPhan/Website/Footer';
import AI_CONGNGHE from '../ThanhPhan/Website/AI_CONGNGHE';
import SanPhamTrangChu from '../ThanhPhan/Website/SanPhamTrangChu';
import SanPham from '../ThanhPhan/Website/SanPham';
import BenVung from '../ThanhPhan/Website/BenVung';
import HoTro from '../ThanhPhan/Website/HoTro';
import GioHang from '../ThanhPhan/Website/GioHang';
import Trang404 from './err/404';
import TrangChuNguoiDung from '../ThanhPhan/NguoiDung/TrangChuNguoiDung';
function TrangChuWeb() {
    return (
        <div className="font-sans text-gray-800">
            <Menu />
            <main className="pt-40 p-5 mt-5">
                <Routes>
                    <Route path="/"  element={<SanPhamTrangChu />} />
                    <Route path="/san-pham" element={<SanPham />} />
                    <Route path="/ai-cong-nghe" element={<AI_CONGNGHE />} />
                    <Route path="/ben-vung" element={<BenVung />} />
                    <Route path="/ho-tro" element={<HoTro />} />
                    <Route path="/gio-hang" element={<GioHang />} />
                    <Route path="/nguoi-dung/*" element={<TrangChuNguoiDung />} />
                    <Route path="*" element={<Trang404 />} />
                </Routes>
            </main>
            <footer className="bg-text text-gray-400 pt-12 pb-8 bg-gray-800">
                <Footer />
            </footer>
        </div>
    );
}

export default TrangChuWeb;
