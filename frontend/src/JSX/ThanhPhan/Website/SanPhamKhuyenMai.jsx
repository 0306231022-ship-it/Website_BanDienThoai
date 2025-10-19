import React, { useEffect, useState } from 'react';
// Giả định bạn đã import các icon Bootstrap (bi bi-...)
// hoặc sử dụng một thư viện icon React như 'react-icons/bs'
// Ví dụ: import { BsPhoneVibrateFill, BsSearch, BsCart3, BsPersonCircle, BsCartPlus } from 'react-icons/bs';

/**
 * ⚠️ LƯU Ý VỀ TÙY CHỈNH MÀU SẮC
 * Trong môi trường React thực tế (sử dụng Webpack/Vite/NextJS), 
 * bạn phải định nghĩa các màu custom ('primary', 'sale-red', etc.) 
 * trong file tailwind.config.js, không phải trong thẻ <script>
 * như trong HTML CDN gốc.
 * * Các lớp màu sau được sử dụng dựa trên cấu hình gốc:
 * - primary: #0d6efd (tương đương blue-600)
 * - primary-dark: #0b5ed7 (tương đương blue-700)
 * - text-dark: #212529 (tương đương gray-800)
 * - bg-light: #f8f9fa (tương đương gray-50)
 * - sale-red: #dc3545 (tương đương red-600)
 */

// Dữ liệu sản phẩm mẫu
const productList = [
    { name: "iPhone 15 Pro Max 256GB - Titan Xanh", discount: "-20%", currentPrice: "28.990.000₫", oldPrice: "35.990.000₫", imageUrl: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg" },
    { name: "Samsung Galaxy S24 Ultra 256GB - Xám", discount: "-15%", currentPrice: "26.990.000₫", oldPrice: "31.990.000₫", imageUrl: "https://cdn.tgdd.vn/Products/Images/42/308940/samsung-galaxy-s24-ultra-xam-thumb-600x600.jpg" },
    { name: "Tai Nghe Sony WH-1000XM5 (Chống ồn)", discount: "-10%", currentPrice: "7.190.000₫", oldPrice: "7.990.000₫", imageUrl: "https://cdn.tgdd.vn/Products/Images/54/278564/sony-wh-1000xm5-den-thumb-600x600.jpg" },
    { name: "iPad Air 5 M1 Wi-Fi 64GB - Hồng", discount: "-35%", currentPrice: "11.490.000₫", oldPrice: "17.990.000₫", imageUrl: "https://cdn.tgdd.vn/Products/Images/522/280590/ipad-air-5-m1-wifi-64gb-thumb-hong-600x600.jpg", badgeColor: "bg-purple-600" },
    { name: "MacBook Pro 14 M2 Pro 2023", discount: "-12%", currentPrice: "49.990.000₫", oldPrice: "56.990.000₫", imageUrl: "https://cdn.tgdd.vn/Products/Images/44/282772/macbook-pro-14-m2-pro-2023-silver-thumb-600x600.jpg" },
    { name: "Apple Watch SE 2023 GPS 40mm", discount: "-25%", currentPrice: "5.990.000₫", oldPrice: "7.990.000₫", imageUrl: "https://cdn.tgdd.vn/Products/Images/7262/286915/apple-watch-s8-gps-41mm-vien-nhom-day-silicone-thumb-trang-600x600.jpg" },
];

// Component Card Sản phẩm
const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden relative group">
        {/* Discount Badge */}
        <span className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full z-10 ${product.badgeColor || 'bg-red-600'}`}>
            {product.discount}
        </span>
        
        <a href="#">
            {/* Class 'h-48 object-contain' là custom CSS trong file gốc, được giữ lại. */}
            <img 
                className="w-full h-48 object-contain p-4 group-hover:scale-[1.02] transition duration-300" 
                src={product.imageUrl} 
                alt={product.name}
            />
        </a>

        <div className="p-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{product.name}</h3>
            <div className="flex items-end space-x-2 mb-3">
                <span className="text-xl font-bold text-red-600">{product.currentPrice}</span>
                <span className="text-xs text-gray-500 line-through">{product.oldPrice}</span>
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition duration-200">
                <i className="bi bi-cart-plus mr-1"></i> Thêm vào giỏ
            </button>
        </div>
    </div>
);

// Component Đếm ngược (Custom Tailwind)
const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        // Thiết lập thời gian kết thúc sale (ví dụ: 2 giờ 30 phút kể từ bây giờ)
        const ONE_HOUR = 60 * 60 * 1000;
        const TWO_HOURS_30_MIN = 2 * ONE_HOUR + 30 * 60 * 1000 + 45 * 1000; // 2h 30m 45s
        const targetTime = new Date().getTime() + TWO_HOURS_30_MIN;
        
        const now = new Date().getTime();
        let distance = targetTime - now;

        if (distance < 0) {
            distance = 0;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return {
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const CountdownItem = ({ time, label }) => (
        <div className="flex flex-col items-center leading-none">
            {/* Thay thế .countdown-time CSS bằng Tailwind */}
            <span className="font-bold text-xl py-1 px-2 rounded bg-black text-white w-10 text-center">
                {time}
            </span>
            {/* Thay thế .countdown-label CSS bằng Tailwind */}
            <span className="text-[0.65rem] text-gray-100 mt-1 font-medium">
                {label}
            </span>
        </div>
    );

    return (
        <div className="flex flex-col items-center">
            <p className="uppercase font-semibold text-sm mb-2">Thời gian còn lại:</p>
            <div id="countdown-timer" className="flex space-x-4">
                <CountdownItem time={timeLeft.hours} label="Giờ" />
                <CountdownItem time={timeLeft.minutes} label="Phút" />
                <CountdownItem time={timeLeft.seconds} label="Giây" />
            </div>
        </div>
    );
};

// Main Component
function KhuyenMaiPage() {
    return (
        <div className="bg-gray-50 font-sans min-h-screen">

         
 

            {/* MAIN CONTENT */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* PROMOTION BANNER & COUNTDOWN */}
                <div className="bg-red-600 rounded-xl shadow-xl p-6 md:p-10 text-white flex flex-col md:flex-row justify-between items-center mb-10">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 leading-tight">
                            FLASH SALE HÔM NAY!
                        </h1>
                        <p className="text-xl font-light">
                            Săn Deal Sốc, Giảm Giá Đến <span className="font-bold text-yellow-300">50%</span>.
                        </p>
                    </div>
                    
                    <CountdownTimer />
                </div>
                
                {/* --- */}

                {/* PROMOTION TABS/FILTERS */}
                <div className="flex overflow-x-auto border-b border-gray-200 mb-8 space-x-4 md:space-x-8">
                    <button className="py-3 px-4 text-blue-600 border-b-2 border-blue-600 font-semibold text-sm whitespace-nowrap">
                        Hot Deals (12)
                    </button>
                    <button className="py-3 px-4 text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-150 font-medium text-sm whitespace-nowrap">
                        Giảm Sâu Nhất
                    </button>
                    <button className="py-3 px-4 text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-150 font-medium text-sm whitespace-nowrap">
                        Phụ Kiện (4)
                    </button>
                    <button className="py-3 px-4 text-gray-600 hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 transition duration-150 font-medium text-sm whitespace-nowrap">
                        Sản Phẩm Mới
                    </button>
                </div>
                
                {/* --- */}

                {/* PROMOTIONAL PRODUCT GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productList.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>

            </main>
            

        </div>
    );
}

export default KhuyenMaiPage;