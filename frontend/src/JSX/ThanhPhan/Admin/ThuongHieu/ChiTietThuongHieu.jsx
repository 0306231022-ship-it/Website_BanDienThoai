import { Link } from "react-router-dom";

function ChiTietThuongHieu() {
    return (
        <section id="section-brand-detail" className="section" aria-label="Chi tiết Thương hiệu">

            {/* Header */}
           <div className="flex items-center justify-between mb-6 mt-6 px-4 py-4 bg-white rounded-xl shadow border border-gray-100">
    
    <div className="flex items-center space-x-4">
        {/* Nút quay lại */}
        <Link
            to="/admin/thuonghieu"
            className="w-11 h-11 flex items-center justify-center rounded-full 
                       bg-gray-100 text-gray-700 
                       hover:bg-gray-200 hover:text-gray-900 
                       transition"
            title="Quay lại danh sách thương hiệu"
        >
            <i className="fas fa-arrow-left text-lg"></i>
        </Link>

        {/* Tiêu đề */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                🏷️ Chi Tiết Thương Hiệu
            </h2>
            <p className="text-sm text-gray-500 mt-1">
                Thông tin chi tiết và sản phẩm liên quan
            </p>
        </div>
    </div>

</div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* THÔNG TIN CƠ BẢN */}
                <div className="bg-white p-6 rounded-xl shadow-xl border h-fit">
                    <div className="flex items-center justify-between mb-4 border-b pb-2">
                        <h3 className="text-xl font-bold text-teal-700 flex items-center">
                            <i className="fas fa-info-circle mr-2"></i>Thông Tin Cơ Bản
                        </h3>
                        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold">
                            <i className="fas fa-edit mr-1"></i>Chỉnh sửa
                        </button>
                    </div>

                    <div className="text-center mb-6">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                            alt="Apple"
                            className="w-32 h-32 object-contain mx-auto border rounded-xl p-3 bg-white"
                        />
                        <p className="mt-3 text-lg font-bold">Apple Inc.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-semibold text-gray-500">ID</p>
                            <p className="font-mono">BR-001</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Trạng thái</p>
                            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                                Đang hoạt động
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Ngày tạo</p>
                            <p>2023-01-15</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Sản phẩm</p>
                            <p>45 sản phẩm</p>
                        </div>
                    </div>
                </div>

                {/* MÔ TẢ + SẢN PHẨM */}
                <div className="lg:col-span-2 space-y-6">

                    {/* MÔ TẢ */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border">
                        <div className="flex items-center justify-between mb-4 border-b pb-2">
                            <h3 className="text-xl font-bold text-teal-700 flex items-center">
                                <i className="fas fa-file-alt mr-2"></i>Mô Tả Chi Tiết
                            </h3>
                            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold">
                                <i className="fas fa-edit mr-1"></i>Chỉnh sửa
                            </button>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                            Apple Inc. là tập đoàn công nghệ đa quốc gia của Mỹ,
                            chuyên thiết kế và phát triển các thiết bị điện tử cao cấp
                            như iPhone, iPad, MacBook và các dịch vụ phần mềm.
                        </p>
                    </div>

                    {/* SẢN PHẨM LIÊN QUAN */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border">
                        <div className="flex items-center justify-between mb-4 border-b pb-2">
                            <h3 className="text-xl font-bold text-teal-700 flex items-center">
                                <i className="fas fa-boxes mr-2"></i>Sản Phẩm Liên Quan (5)
                            </h3>
                            <button className="text-sm text-teal-600 hover:text-teal-800 font-semibold">
                                Xem tất cả
                            </button>
                        </div>

                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 bg-gray-200 rounded mr-3"></div>
                                        <div>
                                            <p className="text-sm font-semibold">iPhone {i} Pro</p>
                                            <p className="text-xs text-gray-500">SKU: IP{i}P</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-teal-600">39,000,000₫</p>
                                    <button className="text-indigo-500 hover:text-indigo-700">
                                        <i className="fas fa-eye"></i>
                                    </button>
                                </div>
                            ))}

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
