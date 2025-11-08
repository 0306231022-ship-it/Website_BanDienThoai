import React from 'react';
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
import { useUI } from "../../REDUCER/TrangChuWeb";
function TrangChuWeb() {
    const { state } = useUI();
    const renderPage = () => {
        switch (state.currentPage) {
            case 'SHOW_HOME':
                return <SanPhamTrangChu/>
            case 'SHOW_SANPHAM':
                return <SanPham />;
            case 'SHOW_AI':
                return <AI_CONGNGHE />;
            case 'SHOW_BENVUNG': 
                return <BenVung/>
            case 'SHOW_HOTRO':
                return <HoTro/>;
                case 'SHOW_GIOHANG':
                return <GioHang/>;
            case 'SHOW_NGUOIDUNG': 
                return <TrangChuNguoiDung/>;
            default:
                return <p>Đang cập nhật hệ thống....</p>;
        }
    };
    return (
        <div className="font-sans text-gray-800">
          <header className="bg-white shadow-sm sticky top-0 z-50"><Menu/></header>    
            <main>{renderPage()}</main>
            <footer className="bg-text text-gray-400 pt-12 pb-8 bg-gray-800">
                <Footer />
            </footer>
        </div>
    );
}

export default TrangChuWeb;
