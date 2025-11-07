import React from 'react';
import '../../CSS/TrangChuWeb.css';
import Menu from '../ThanhPhan/Website/Menu';
import Footer from '../ThanhPhan/Website/Footer';
import SanPhamTrangChu from '../ThanhPhan/Website/SanPhamTrangChu';
import SanPham from '../ThanhPhan/Website/SanPham';
import SanPhamNoiBat from '../ThanhPhan/Website/SanPhamNoiBat';
import TinTuc from '../ThanhPhan/Website/TinTuc';
import LienHe from '../ThanhPhan/Website/LienHe';
import GioHang from '../ThanhPhan/Website/GioHang';
import AccountDashboard from '../ThanhPhan/NguoiDung/TrangChuNguoiDung';
import DangNhap from './DangNhapNguoiDung';
import { useUI } from "../../REDUCER/TrangChuWeb";
function TrangChuWeb() {
    const { state } = useUI();
    const renderPage = () => {
        switch (state.currentPage) {
            case 'SHOW_HOME':
                return <SanPhamTrangChu/>
            case 'SHOW_PRODUCTS':
                return <SanPham />;
            case 'SHOW_NOIBAT':
                return <SanPhamNoiBat />;
            case 'SHOW_TINTUC': 
                return <TinTuc/>
            case 'SHOW_LIENHE':
                return <LienHe/>;
                case 'SHOW_GIOHANG':
                return <GioHang/>;
            case 'TrangChu_NguoiDung' :
                return <AccountDashboard/>
            case 'DangNhap_NguoiDung' :
                return <DangNhap/>
            default:
                return <p>Đang cập nhật hệ thống....</p>;
        }
    };
    return (
        <div className="font-sans text-gray-800">
            <header><Menu /></header>
            <main>{renderPage()}</main>
            <footer className="bg-text text-gray-400 pt-12 pb-8 bg-gray-800">
                <Footer />
            </footer>
        </div>
    );
}

export default TrangChuWeb;
