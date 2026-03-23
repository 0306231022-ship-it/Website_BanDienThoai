import { useState, useEffect } from "react";
import * as API from '../../../JS/API/API';
import ChildSanPham from "../../../compoment/SanPham";
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
                <Link to="/san-pham-moi" className="hidden md:block text-blue-600 font-semibold hover:underline">
                    Xem tất cả →
                </Link>
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
                            <ChildSanPham product={product} />
                        )))}
            
            </div>

            {/* Mobile View More */}
            <div className="mt-10 text-center md:hidden">
                <Link to="/san-pham-moi" className="w-full py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition">
                    Xem tất cả sản phẩm
                </Link>
            </div>
        </div>
    );
}

export default SanPhamMoi;