import { Link } from "react-router-dom";
function MaGiamGia(){
    return(
        <>
        <section id="section-discount-form" className="section" aria-label="Tạo mã giảm giá và khuyến mãi">
    
    <div className="flex items-center justify-between mb-6 mt-6 border-b pb-3 border-gray-200">
         <Link 
                id="back-to-admin-btn" 
                to="/admin/danhsachma"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition"
                aria-label="Quay lại trang quản trị"
            >
                <i className="fas fa-arrow-left mr-2"></i> Quay Lại
            </Link>
        <h2 className="text-2xl font-bold text-gray-900">🎁 Tạo Mã Giảm Giá & Khuyến Mãi</h2>
        <button className="px-5 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition" aria-label="Lưu mã giảm giá">
            <i className="fas fa-save mr-2"></i> Lưu Mã Giảm Giá
        </button>
    </div>

    <div className="bg-white p-8 rounded-xl shadow-2xl border border-teal-100">
        <form className="space-y-6">
            
            <h3 className="text-xl font-bold text-teal-700 pb-2 border-b border-gray-100">1. Thông tin Chung</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="coupon-code" className="block text-sm font-medium text-gray-700 mb-2">Mã Giảm Giá <span className="text-red-500">*</span></label>
                    <div className="flex">
                        <input type="text" id="coupon-code" placeholder="Ví dụ: TET2025" 
                               className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:ring-teal-500 focus:border-teal-500 transition uppercase font-bold tracking-wider"/>
                        <button type="button" className="px-4 py-3 bg-gray-200 rounded-r-lg text-gray-700 hover:bg-gray-300 transition" title="Tạo mã ngẫu nhiên">
                            <i className="fas fa-random"></i>
                        </button>
                    </div>
                </div>
                
                <div>
                    <label for="coupon-description" className="block text-sm font-medium text-gray-700 mb-2">Mô tả ngắn</label>
                    <input type="text" id="coupon-description" placeholder="Giảm 15% cho đơn hàng đầu tiên" 
                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"/>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label for="discount-type" className="block text-sm font-medium text-gray-700 mb-2">Loại Giảm Giá <span className="text-red-500">*</span></label>
                    <select id="discount-type" className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-teal-500 focus:border-teal-500 transition">
                        <option value="percentage">Phần trăm (%)</option>
                        <option value="fixed_amount">Số tiền cố định (₫)</option>
                        <option value="free_ship">Miễn phí Vận chuyển</option>
                    </select>
                </div>
                
                <div>
                    <label for="discount-value" className="block text-sm font-medium text-gray-700 mb-2">Giá trị <span className="text-red-500">*</span></label>
                    <input type="number" id="discount-value" value="15" min="0" 
                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"/>
                    <p className="text-xs text-gray-500 mt-1">Nhập giá trị (ví dụ: 15 cho 15% hoặc 50000 cho 50.000₫)</p>
                </div>

                <div>
                    <label for="max-discount" className="block text-sm font-medium text-gray-700 mb-2">Giảm tối đa (₫)</label>
                    <input type="number" id="max-discount" placeholder="Tùy chọn" 
                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"/>
                    <p className="text-xs text-gray-500 mt-1">Giới hạn số tiền giảm tối đa (ví dụ: 100.000₫)</p>
                </div>
            </div>

            ---
            
            <h3 className="text-xl font-bold text-teal-700 pb-2 border-b border-gray-100 mt-8">2. Điều kiện Áp dụng</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="min-order" className="block text-sm font-medium text-gray-700 mb-2">Giá trị Đơn hàng tối thiểu (₫)</label>
                    <input type="number" id="min-order" value="500000" min="0" 
                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"/>
                    <p className="text-xs text-gray-500 mt-1">Áp dụng cho đơn hàng có tổng giá trị từ...</p>
                </div>
                
                <div>
                    <label for="usage-limit" className="block text-sm font-medium text-gray-700 mb-2">Giới hạn sử dụng toàn hệ thống</label>
                    <input type="number" id="usage-limit" placeholder="Để trống nếu không giới hạn" 
                           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"/>
                    <p className="text-xs text-gray-500 mt-1">Tổng số lần mã này có thể được sử dụng.</p>
                </div>

                <div className="md:col-span-2">
                    <label for="applicable-products" className="block text-sm font-medium text-gray-700 mb-2">Áp dụng cho Sản phẩm/Danh mục</label>
                    <select id="applicable-products" multiple 
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-teal-500 focus:border-teal-500 transition h-32" >
                        <option value="cat-phone">Danh mục Điện thoại</option>
                        <option value="cat-acc">Danh mục Phụ kiện</option>
                        <option value="prod-A">Sản phẩm: iPhone 15 Pro Max</option>
                        <option value="prod-B">Sản phẩm: Samsung S24 Ultra</option>
                    </select>
                    <p classNameName="text-xs text-gray-500 mt-1">Giữ phím Ctrl/Command để chọn nhiều mục.</p>
                </div>
            </div>

            ---
            
            <h3 classNameName="text-xl font-bold text-teal-700 pb-2 border-b border-gray-100 mt-8">3. Thời gian Hiệu lực</h3>

            <div classNameName="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="start-date" classNameName="block text-sm font-medium text-gray-700 mb-2">Ngày Bắt đầu</label>
                    <input type="date" id="start-date" value="2025-11-10" 
                           classNameName="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"/>
                </div>
                
                <div>
                    <label for="end-date" classNameName="block text-sm font-medium text-gray-700 mb-2">Ngày Kết thúc</label>
                    <input type="date" id="end-date" value="2025-11-30" 
                           classNameName="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"/>
                </div>
            </div>

            <div classNameName="pt-6 border-t border-gray-200 text-right">
                <button type="submit" className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-bold shadow-lg transition">
                    <i className="fas fa-check-circle mr-2"></i> Kích hoạt Mã Giảm Giá
                </button>
            </div>
        </form>
    </div>
</section>
        </>
    );
};
export default MaGiamGia;