import React from 'react';
import '../../CSS/TrangChuWeb.css'
import Menu from '../ThanhPhan/Website/Menu';
import Footer from '../ThanhPhan/Website/Footer';
import KhuyenMaiPage from '../ThanhPhan/Website/SanPhamKhuyenMai';
import NewsPage from '../ThanhPhan/Website/TinTuc';
function TrangChuWeb() {

    
    return (
        <div className="font-sans text-gray-800">



            <header><Menu/></header>

            <main>
                <NewsPage/>
            </main>

            <footer className="bg-text text-gray-400 pt-12 pb-8 bg-gray-800"><Footer/></footer>
        </div>
    );
}

export default TrangChuWeb;