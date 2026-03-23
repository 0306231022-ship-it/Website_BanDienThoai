import { useState, useEffect } from "react";
import * as API from '../../../JS/API/API';
import ChildSanPham from "../../../compoment/SanPham";
import { Link } from "react-router-dom";

function TatCaSanPhamMoi() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const LayDL = await API.CallAPI(undefined, { 
                    PhuongThuc: 2, 
                    url: `/website/lay_ds_sanpham_moi?page=${page}&limit=8` 
                });
                
                if (LayDL.ThanhCong) {
                    setProducts(LayDL.dulieu);
                    setTotal(LayDL.total);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [page]);

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- Nút Về trang chủ --- */}
                <Link to='/' className="group inline-flex w-fit items-center gap-2 px-5 py-2.5 bg-white text-gray-700 font-semibold text-sm rounded-full shadow-sm border border-gray-200 hover:shadow-md hover:text-blue-600 hover:border-blue-300 transition-all active:scale-95 mb-8">
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Về trang chủ
                </Link>

                {/* --- Tiêu đề & Thông số --- */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
                            Sản phẩm mới nhất
                        </h2>
                        <div className="h-1.5 w-24 bg-blue-600 mt-3 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-200">
                        Hiển thị <strong className="text-blue-600">{products.length}</strong> / {total}
                    </span>
                </div>

                {/* --- Lưới sản phẩm --- */}
                <div className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
                    {products.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 px-6 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
                            <div className="p-4 bg-gray-50 rounded-full mb-4">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Không có sản phẩm mới</h3>
                            <p className="mt-2 text-sm text-gray-500 text-center max-w-sm">
                                Hiện tại chưa có sản phẩm nào được cập nhật. Vui lòng quay lại sau nhé.
                            </p>
                        </div>
                    ) : (
                        products.map((product, index) => (
                            // Đừng quên thêm key khi map() trong React để tránh cảnh báo nhé!
                            <ChildSanPham key={product.id || index} product={product} />
                        ))
                    )}
                </div>

                {/* --- Phân trang (Pagination) --- */}
                {total > 0 && (
                    <div className="mt-12 flex justify-center items-center gap-3">
                        <button 
                            onClick={() => setPage(p => p - 1)} 
                            disabled={page === 1} 
                            className="px-5 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700"
                        >
                            Trước
                        </button>
                        
                        <div className="min-w-[40px] h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-md px-3">
                            {page}
                        </div>
                        
                        <button 
                            onClick={() => setPage(p => p + 1)} 
                            disabled={page >= Math.ceil(total / 8)} 
                            className="px-5 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700"
                        >
                            Sau
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TatCaSanPhamMoi;