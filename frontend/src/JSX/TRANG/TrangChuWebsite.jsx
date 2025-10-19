import React from 'react';
import '../../CSS/TrangChuWeb.css';
import Menu from '../ThanhPhan/Website/Menu';
import Footer from '../ThanhPhan/Website/Footer';
import KhuyenMaiPage from '../ThanhPhan/Website/SanPhamKhuyenMai';
import NewsPage from '../ThanhPhan/Website/TinTuc';
import SanPhamTrangChu from '../ThanhPhan/Website/SanPhamTrangChu';
import ShoppingCart from '../ThanhPhan/Website/GioHang';

import { useAppContext } from '../../CONTEXT/TrangChuWrb';

function TrangChuWeb() {
    const { state } = useAppContext();
    const renderPage = () => {
        switch (state.Trang) {
            case 'TrangChu':
                return <SanPhamTrangChu/>
            case 'KhuyenMai':
                return <KhuyenMaiPage />;
            case 'TinTuc':
                return <NewsPage />;
            case 'GioHang' :
                return <ShoppingCart/>
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
