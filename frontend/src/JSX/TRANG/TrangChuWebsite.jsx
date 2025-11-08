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
import TrangChuNguoiDung from '../ThanhPhan/NguoiDung/TrangChuNguoiDung';
import HoSoCaNhan from '../ThanhPhan/NguoiDung/HoSoCaNhan';
import ChinhSuaThongTin from '../ThanhPhan/NguoiDung/ChinhSuaThongTin';
import LichSuDonHang from '../ThanhPhan/NguoiDung/LichSuDonHang';
import DiaChiCuaToi from '../ThanhPhan/NguoiDung/DiaChiCuaToi';
import ThemDiaChi from '../ThanhPhan/NguoiDung/ThemDiaChi';
import SanPhamYeuThich from '../ThanhPhan/NguoiDung/SanPhamYeuThich';

function TrangChuWeb() {
    return (
        <div className="font-sans text-gray-800">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <Menu />
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<SanPhamTrangChu />} />
                    <Route path="/san-pham" element={<SanPham />} />
                    <Route path="/ai-cong-nghe" element={<AI_CONGNGHE />} />
                    <Route path="/ben-vung" element={<BenVung />} />
                    <Route path="/ho-tro" element={<HoTro />} />
                    <Route path="/gio-hang" element={<GioHang />} />
                    <Route path="/nguoi-dung" element={<TrangChuNguoiDung />} />

                        <Route path="/nguoi-dung" element={<TrangChuNguoiDung />}>
        <Route index element={<HoSoCaNhan />} /> 
        <Route path="ho-so" element={<HoSoCaNhan />} />
        <Route path="chinh-sua-thong-tin" element={<ChinhSuaThongTin />} /> {/* /nguoi-dung/chinh-sua-thong-tin */}
        <Route path="lich-su-don-hang" element={<LichSuDonHang />} />
        <Route path="dia-chi-cua-toi" element={<DiaChiCuaToi />} />
        <Route path="them-dia-chi" element={<ThemDiaChi />} />
        <Route path="san-pham-yeu-thich" element={<SanPhamYeuThich />} />
    </Route>
                </Routes>
            </main>

            <footer className="bg-text text-gray-400 pt-12 pb-8 bg-gray-800">
                <Footer />
            </footer>
        </div>
    );
}

export default TrangChuWeb;
