import { useState, useEffect } from "react";
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';
import { Link } from "react-router-dom";
function SanPhamMoi() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const LayDL = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/website/lay_ds_sanpham_moi` });
                if (LayDL.ThanhCong) {
                    setProducts(LayDL.dulieu);
                }
               
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header Section */}
            <div className="flex items-end justify-between mb-10">
                <div>
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Bộ sưu tập 2026</span>
                    <h2 className="text-4xl font-bold text-gray-900 mt-2">Hàng Mới Nhập Kho</h2>
                    <p className="text-gray-500 mt-2">Khám phá những sản phẩm công nghệ mới nhất vừa cập bến.</p>
                </div>
                <a href="/tat-ca-san-pham" className="hidden md:block text-blue-600 font-semibold hover:underline">
                    Xem tất cả →
                </a>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {
                    products.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500">
                            Không có sản phẩm mới nào được tìm thấy.
                        </div>
                    ) : (
                        products.map((product) => (
                              <div key={product.IDSANPHAM} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative border border-gray-100 flex flex-col">
                        
                        {/* Badge */}
                        <span className={`absolute top-4 left-4 z-10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase`}>
                            {product.TENTHUONGHIEU}
                        </span>
                        
                        {/* Image Container with Hover Actions */}
                        <div className="aspect-square bg-gray-100 overflow-hidden relative">
                            <img 
                                src={`http://localhost:3001/${product.HINHANH}`} 
                                alt={product.TENSANPHAM} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            
                            {/* Overlay Overlay - Hiện ra 2 nút khi hover */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                <Link 
                                    to={`/chi-tiet-san-pham/${product.IDSANPHAM}`} 
                                    className="bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
                                    title="Xem chi tiết"
                                >
                                    <i className="fas fa-eye"></i>
                                </Link>
                                <button
                                    className="bg-white text-gray-900 w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                                    title="Thêm vào giỏ"
                                >
                                    <i className="fas fa-shopping-cart"></i>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-grow">
                            <p className="text-xs text-gray-400 mb-1">{product.TENTHUONGHIEU}</p>
                            
                            {/* Tên sản phẩm - bọc trong the a để click xem chi tiết */}
                            <a href={`/san-pham/${product.IDSANPHAM}`} className="font-bold text-gray-800 text-lg mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                                {product.TENSANPHAM}
                            </a>
                            
                            <div className="flex items-center justify-between mt-auto pt-2">
                                <span className="text-xl font-bold text-blue-600">{fun.formatCurrency(product.GIABAN)}</span>
                                
                                {/* Dynamic Right Side (Rating / Stock / Reviews) */}
                                {product.rating && (
                                    <div className="flex text-yellow-400 text-xs items-center">
                                        <i className="fas fa-star"></i> 
                                        {product.rating < 5 && <span className="ml-1 text-gray-500 font-normal">{product.rating}</span>}
                                    </div>
                                )}
                                {product.reviews && (
                                    <span className="text-xs text-gray-400">{product.reviews}</span>
                                )}
                                {product.stockStatus && (
                                    <span className="text-xs text-green-500 font-medium bg-green-50 px-2 py-1 rounded">
                                        {product.stockStatus}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                        )))}
            
            </div>

            {/* Mobile View More */}
            <div className="mt-10 text-center md:hidden">
                <button className="w-full py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition">
                    Xem tất cả sản phẩm
                </button>
            </div>
        </div>
    );
}

export default SanPhamMoi;