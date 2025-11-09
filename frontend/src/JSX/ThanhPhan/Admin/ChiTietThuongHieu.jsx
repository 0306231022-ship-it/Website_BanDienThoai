import { Link } from "react-router-dom";

function ChiTietThuongHieu() {
    return (
        <section id="section-brand-detail" className="section" aria-label="Chi tiết Thương hiệu">
            
            {/* Header và Nút Hành động */}
            <div className="flex items-center justify-between mb-6 mt-6 border-b pb-3 border-gray-200">
                
                {/* Khu vực Tiêu đề và Nút Quay về */}
                <div className="flex items-center space-x-4">
                    <Link 
                        to="/admin/thuonghieu" // Thay đổi URL đích nếu cần
                        className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-200"
                        title="Quay lại Danh sách Thương hiệu"
                    >
                        <i className="fas fa-arrow-left text-lg"></i>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900">🏷️ Chi Tiết Thương Hiệu: Apple</h2>
                </div>
                
                {/* Khu vực Nút Xóa và Chỉnh sửa */}
                <div className="space-x-3">
                    <button className="px-5 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold shadow-md transition" aria-label="Xóa thương hiệu">
                        <i className="fas fa-trash-alt mr-2"></i> Xóa Thương Hiệu
                    </button>
                    <button id="edit-brand-btn" className="px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow-md transition" aria-label="Chỉnh sửa thương hiệu">
                        <i className="fas fa-edit mr-2"></i> Chỉnh Sửa
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Cột 1: Thông tin cơ bản và Logo */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-2xl border border-teal-100 h-fit">
                    <h3 className="text-xl font-bold text-teal-700 mb-4 border-b pb-2 flex items-center">
                        <i className="fas fa-info-circle mr-2"></i> Thông Tin Cơ Bản
                    </h3>
                    
                    {/* Logo */}
                    <div className="text-center mb-6">
                        <img 
                            src="" 
                            alt="Logo Thương hiệu Apple" 
                            className="w-32 h-32 object-contain mx-auto rounded-xl border-2 border-gray-200 p-2 bg-white shadow-inner"
                        />
                        <p className="mt-3 text-lg font-bold text-gray-800">Apple Inc.</p>
                    </div>

                    {/* Trường thông tin */}
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-semibold text-gray-600">Mã định danh (ID)</p>
                            <p className="text-base text-gray-900 font-mono">BR-001</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600">Trạng thái</p>
                            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">Đang hoạt động</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600">Ngày tạo</p>
                            <p className="text-base text-gray-900">2023-01-15</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-600">Sản phẩm liên kết</p>
                            <p className="text-base text-gray-900">45 sản phẩm</p>
                        </div>
                    </div>
                </div>

                {/* Cột 2 & 3: Mô tả và Sản phẩm liên quan */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Phần Mô tả Chi tiết */}
                    <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
                        <h3 className="text-xl font-bold text-teal-700 mb-4 border-b pb-2 flex items-center">
                            <i className="fas fa-file-alt mr-2"></i> Mô Tả Chi Tiết
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            Apple Inc. là một tập đoàn công nghệ đa quốc gia của Mỹ chuyên thiết kế, phát triển và bán thiết bị điện tử tiêu dùng, phần mềm máy tính và các dịch vụ trực tuyến. Thương hiệu nổi tiếng với các dòng sản phẩm iPhone, iPad, Mac và Apple Watch, luôn dẫn đầu về sự đổi mới và thiết kế cao cấp.
                        </p>
                    </div>

                    {/* Phần Danh sách Sản phẩm Liên quan */}
                    <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-100">
                        <h3 className="text-xl font-bold text-teal-700 mb-4 border-b pb-2 flex items-center justify-between">
                            <span><i className="fas fa-boxes mr-2"></i> Sản Phẩm Liên Quan (5)</span>
                            <button className="text-sm text-teal-600 hover:text-teal-800 font-semibold">Xem tất cả</button>
                        </h3>

                        <div className="space-y-3">
                            {/* Sản phẩm 1 */}
                            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                                <div className="flex items-center">
                                    <img src="" alt="iPhone 17 Pro" className="h-10 w-10 object-cover rounded mr-3"/>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">iPhone 17 Pro Max</p>
                                        <p className="text-xs text-gray-500">Mã SKU: IP17P-512</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-teal-600">38,990,000₫</p>
                                <button className="text-sm text-indigo-500 hover:text-indigo-700" title="Xem chi tiết sản phẩm"><i className="fas fa-eye"></i></button>
                            </div>

                            {/* Sản phẩm 2 */}
                            <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                                <div className="flex items-center">
                                    <img src="" alt="Macbook Air M3" className="h-10 w-10 object-cover rounded mr-3"/>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Macbook Air M3</p>
                                        <p className="text-xs text-gray-500">Mã SKU: MBA-M3-8G</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-teal-600">28,500,000₫</p>
                                <button className="text-sm text-indigo-500 hover:text-indigo-700" title="Xem chi tiết sản phẩm"><i className="fas fa-eye"></i></button>
                            </div>

                            {/* ... thêm các sản phẩm khác ... */}
                            
                            <div className="text-center pt-3">
                                <button className="text-sm font-medium text-gray-600 hover:text-teal-600">
                                    Tải thêm sản phẩm...
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ChiTietThuongHieu;