import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function ChiTietSanPham() {
    const { id } = useParams(); // Lấy ID từ URL (để sau này gọi API)
    
    // --- DỮ LIỆU GIẢ LẬP (MOCK DATA) ---
    // Sau này bạn sẽ thay thế phần này bằng useEffect gọi API
    const product = {
        id: id || 1,
        name: "Tai nghe Chống ồn Sony WH-1000XM5",
        brand: "Sony",
        price: 8490000,
        originalPrice: 9990000,
        discount: 15,
        status: "Còn hàng",
        rating: 4.8,
        reviews: 128,
        description: "Sony WH-1000XM5 mang đến trải nghiệm chống ồn đỉnh cao với 8 micro và bộ xử lý Auto NC Optimizer. Thiết kế mới nhẹ hơn, ôm sát tai, pin trâu 30 giờ.",
        images: [
            "https://via.placeholder.com/600x600?text=Sony+XM5+Black",
            "https://via.placeholder.com/600x600?text=Sony+XM5+Side",
            "https://via.placeholder.com/600x600?text=Sony+XM5+Case",
            "https://via.placeholder.com/600x600?text=Sony+XM5+White",
        ],
        specs: [
            { label: "Thương hiệu", value: "Sony" },
            { label: "Model", value: "WH-1000XM5" },
            { label: "Kết nối", value: "Bluetooth 5.2, AUX 3.5mm" },
            { label: "Thời lượng pin", value: "30 giờ (bật NC), 40 giờ (tắt NC)" },
            { label: "Cổng sạc", value: "USB Type-C" },
            { label: "Trọng lượng", value: "250g" },
        ]
    };

    // State quản lý ảnh đang xem và số lượng
    const [activeImg, setActiveImg] = useState(product.images[0]);
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="bg-gray-50 min-h-screen py-8 font-sans animate-fadeIn">
            <div className="container mx-auto px-4 max-w-6xl">
                
                {/* --- BREADCRUMB --- */}
                <nav className="flex mb-6 text-sm text-gray-500 font-medium">
                    <Link to="/" className="hover:text-teal-600 transition">Trang chủ</Link>
                    <span className="mx-2">/</span>
                    <Link to="/admin/thuonghieu" className="hover:text-teal-600 transition">Thương hiệu</Link>
                    <span className="mx-2">/</span>
                    <span className="text-teal-600 font-bold truncate">{product.name}</span>
                </nav>

                {/* --- MAIN PRODUCT SECTION --- */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                    
                    {/* LEFT: IMAGE GALLERY */}
                    <div className="space-y-4">
                        {/* Ảnh lớn */}
                        <div className="aspect-square w-full bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative group">
                            <img 
                                src={activeImg} 
                                alt={product.name} 
                                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                            />
                            {product.discount > 0 && (
                                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    -{product.discount}%
                                </span>
                            )}
                        </div>
                        {/* List ảnh nhỏ */}
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {product.images.map((img, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setActiveImg(img)}
                                    className={`w-20 h-20 flex-shrink-0 rounded-xl border-2 overflow-hidden bg-gray-50 ${activeImg === img ? 'border-teal-500 ring-2 ring-teal-100' : 'border-transparent hover:border-gray-300'}`}
                                >
                                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: PRODUCT INFO */}
                    <div className="flex flex-col">
                        {/* Brand & Title */}
                        <div className="mb-4">
                            <Link to="#" className="text-teal-600 font-bold text-sm uppercase tracking-wide hover:underline">
                                {product.brand}
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 leading-tight">
                                {product.name}
                            </h1>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-2 mt-3">
                                <div className="flex text-yellow-400 text-sm">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                                <span className="text-gray-500 text-sm font-medium">({product.reviews} đánh giá)</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-green-600 text-sm font-bold flex items-center gap-1">
                                    <i className="fas fa-check-circle"></i> {product.status}
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-gray-50 p-4 rounded-2xl mb-6">
                            <div className="flex items-end gap-3">
                                <span className="text-3xl font-black text-red-600">
                                    {product.price.toLocaleString('vi-VN')}₫
                                </span>
                                <span className="text-lg text-gray-400 line-through font-medium mb-1">
                                    {product.originalPrice.toLocaleString('vi-VN')}₫
                                </span>
                            </div>
                            <p className="text-xs text-blue-600 font-bold mt-1">
                                <i className="fas fa-tag mr-1"></i> Giá tốt nhất thị trường hôm nay
                            </p>
                        </div>

                        {/* Short Description */}
                        <p className="text-gray-600 text-base leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* Selectors (Color/Quantity) */}
                        <div className="space-y-4 mb-8">
                            {/* Số lượng */}
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-gray-700 w-20">Số lượng:</span>
                                <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                                    <button 
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg transition"
                                    >
                                        <i className="fas fa-minus text-xs"></i>
                                    </button>
                                    <input 
                                        type="text" 
                                        value={quantity} 
                                        readOnly 
                                        className="w-12 h-10 text-center font-bold text-gray-800 border-x border-gray-300 focus:outline-none"
                                    />
                                    <button 
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg transition"
                                    >
                                        <i className="fas fa-plus text-xs"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-auto">
                            <button className="flex-1 bg-white border-2 border-teal-600 text-teal-600 py-3.5 rounded-xl font-bold text-lg hover:bg-teal-50 transition-all flex items-center justify-center gap-2">
                                <i className="fas fa-cart-plus"></i> Thêm vào giỏ
                            </button>
                            <button className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                                Mua ngay
                            </button>
                        </div>

                        {/* Policy Info */}
                        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-shield-alt text-sm"></i>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Bảo hành chính hãng</h4>
                                    <p className="text-xs text-gray-500">12 tháng tại trung tâm Sony</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                                    <i className="fas fa-sync-alt text-sm"></i>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Đổi trả miễn phí</h4>
                                    <p className="text-xs text-gray-500">Trong 7 ngày nếu lỗi NSX</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- DETAILS & SPECS SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
                    
                    {/* Left: Description */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                            <i className="fas fa-align-left text-teal-500"></i> Mô tả chi tiết
                        </h3>
                        <div className="prose prose-teal max-w-none text-gray-600">
                            <p>
                                <strong>Công nghệ chống ồn hàng đầu:</strong> Với 8 micro thu âm và bộ xử lý V1 tích hợp, WH-1000XM5 loại bỏ tiếng ồn ở dải tần số cao và trung bình tốt hơn bao giờ hết.
                            </p>
                            <p className="mt-4">
                                <strong>Thiết kế siêu nhẹ:</strong> Tai nghe được hoàn thiện bằng chất liệu "Soft Fit Leather" mới, ôm khít đầu nhẹ nhàng, giảm áp lực lên tai đồng thời ngăn tiếng ồn bên ngoài.
                            </p>
                            <div className="my-6 bg-gray-100 h-64 rounded-xl flex items-center justify-center text-gray-400 italic">
                                [Khu vực hiển thị ảnh bài viết chi tiết]
                            </div>
                            <p>
                                <strong>Chất lượng đàm thoại:</strong> Công nghệ thu giọng nói chính xác với xử lý tín hiệu âm thanh tiên tiến mang lại chất lượng cuộc gọi cực kỳ rõ nét, ngay cả khi bạn đang ở nơi ồn ào.
                            </p>
                        </div>
                    </div>

                    {/* Right: Specs Table */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <i className="fas fa-cogs text-teal-500"></i> Thông số kỹ thuật
                            </h3>
                            <div className="overflow-hidden rounded-xl border border-gray-200">
                                <table className="w-full text-sm text-left">
                                    <tbody className="divide-y divide-gray-200">
                                        {product.specs.map((spec, idx) => (
                                            <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                                <td className="px-4 py-3 font-medium text-gray-600 w-1/3">{spec.label}</td>
                                                <td className="px-4 py-3 text-gray-800 font-semibold">{spec.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button className="w-full mt-4 py-2 text-sm font-bold text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition">
                                Xem cấu hình chi tiết <i className="fas fa-arrow-right ml-1"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ChiTietSanPham;