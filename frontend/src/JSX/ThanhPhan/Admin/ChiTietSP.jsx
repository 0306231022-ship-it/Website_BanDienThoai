import { Link } from 'react-router-dom';
function ChiTietSanPham() {
    return(
        <>
        <section id="product-detail-view" className="section" aria-label="Chi tiết sản phẩm">
    
    <div className="flex items-center justify-between mb-8 mt-6">
        <Link to="/admin/sanpham" id="back-to-products-btn" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition">
            <i className="fas fa-arrow-left mr-2"></i> Quay Lại Danh Sách
        </Link>
        <h2 className="text-3xl font-extrabold text-gray-900">Chi Tiết Sản Phẩm</h2>
        <button id="edit-product-btn" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition">
            <i className="fas fa-edit mr-2"></i> Chỉnh Sửa
        </button>
    </div>

    <div className="bg-white shadow-2xl rounded-2xl p-8 border border-teal-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-1">
                <div className="bg-gray-100 rounded-xl p-4 shadow-inner">
                    <img src="https://picsum.photos/600/600?random=100" alt="Ảnh chính sản phẩm" 
                         className="w-full h-auto object-cover rounded-xl shadow-lg border-4 border-white"/>
                </div>
                
                <div className="mt-4 grid grid-cols-4 gap-2">
                    <img alt="mô tả ảnh" src="https://picsum.photos/100/100?random=101" className="w-full h-auto object-cover rounded-md border-2 border-teal-500 cursor-pointer"/>
                    <img alt="mô tả ảnh" src="https://picsum.photos/100/100?random=102" className="w-full h-auto object-cover rounded-md border-2 border-gray-200 hover:border-teal-500 cursor-pointer"/>
                    <img alt="mô tả ảnh" src="https://picsum.photos/100/100?random=103" className="w-full h-auto object-cover rounded-md border-2 border-gray-200 hover:border-teal-500 cursor-pointer"/>
                    <img alt="mô tả ảnh" src="https://picsum.photos/100/100?random=104" className="w-full h-auto object-cover rounded-md border-2 border-gray-200 hover:border-teal-500 cursor-pointer"/>
                </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
                
                <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 bg-teal-100 px-3 py-1 rounded-full">
                        Mã: SP001
                    </span>
                    <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-2">iPhone 15 Pro Max (Titan Tự Nhiên)</h1>
                    <p className="text-2xl font-bold text-red-600">33,990,000₫</p>
                </div>

                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg border">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Trạng thái:</p>
                        <span className="text-lg font-bold text-green-600"><i className="fas fa-check-circle mr-1"></i> Còn hàng</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Tồn kho:</p>
                        <span className="text-lg font-bold text-gray-800">12 chiếc</span>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Thương hiệu:</p>
                        <span className="text-lg font-bold text-gray-800 flex items-center gap-1"><i className="fab fa-apple text-xl"></i> Apple</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-1">Thông số kỹ thuật</h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <p><span className="font-semibold text-gray-600">RAM:</span> 8GB</p>
                        <p><span className="font-semibold text-gray-600">Bộ nhớ:</span> 256GB</p>
                        <p><span className="font-semibold text-gray-600">Màn hình:</span> 6.7 inch Super Retina XDR</p>
                        <p><span className="font-semibold text-gray-600">Pin:</span> 4422 mAh</p>
                        <p><span className="font-semibold text-gray-600">Camera sau:</span> 48MP + 12MP + 12MP</p>
                        <p><span className="font-semibold text-gray-600">Ngày nhập:</span> 2023-09-29</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-1">Mô tả</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Phiên bản iPhone cao cấp nhất với khung titan bền bỉ, chip A17 Pro mạnh mẽ và hệ thống camera Pro Max đột phá. 
                        Thiết kế mới nhẹ hơn, viền màn hình mỏng hơn, mang lại trải nghiệm cầm nắm và sử dụng tuyệt vời. 
                        Đây là sản phẩm chủ lực, luôn được ưu tiên kiểm tra tồn kho.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
        </>
    );
};
export default ChiTietSanPham;