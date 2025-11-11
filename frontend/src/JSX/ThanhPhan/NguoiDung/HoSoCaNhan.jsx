import { Link } from "react-router-dom";
function HoSoCaNhan() {
    return (
        <>
 <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in-up-2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-dark-900">Thông Tin Cá Nhân</h2>
                            <Link  to="/nguoi-dung/ho-so/chinh-sua-thong-tin" className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
                                <i className="fas fa-edit mr-2"></i>Chỉnh sửa
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-dark-600">Họ và Tên</label>
                                <p className="mt-1 text-lg text-dark-900 font-medium">Nguyễn Văn A</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-600">Email</label>
                                <p className="mt-1 text-lg text-dark-900 font-medium">nguyenvana@email.com</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-dark-600">Số Điện Thoại</label>
                                <p className="mt-1 text-lg text-dark-900 font-medium">090****123</p>
                            </div>
                            <div>
                                <label class_name="block text-sm font-medium text-dark-600">Địa Chỉ Mặc Định</label>
                                <p className="mt-1 text-lg text-dark-900 font-medium">123 Nguyễn Văn Linh, Q.7...</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-8 animate-fade-in-up-3">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-dark-900">Đơn Hàng Gần Đây</h2>
                            <Link to="" className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
                                Xem tất cả <i className="fas fa-arrow-right ml-1"></i>
                            </Link>
                        </div>
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-dark-100 rounded-lg">
                                <div className="flex-1">
                                    <p className="text-sm text-dark-600">Mã đơn hàng</p>
                                    <p className="font-bold text-primary-500">#TECH2025-456</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-dark-600">Ngày đặt</p>
                                    <p className="font-medium text-dark-900">05/11/2025</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-dark-600">Tổng cộng</p>
                                    <p className="font-medium text-dark-900">12.990.000₫</p>
                                </div>
                                <div className="flex-1">
                                    <span className="inline-block bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Đã Giao Hàng
                                    </span>
                                </div>
                                <Link to="" className="text-dark-600 hover:text-primary-500">
                                    <i className="fas fa-chevron-right"></i>
                                </Link>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-dark-100 rounded-lg">
                                <div className="flex-1">
                                    <p className="text-sm text-dark-600">Mã đơn hàng</p>
                                    <p className="font-bold text-primary-500">#TECH2025-123</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-dark-600">Ngày đặt</p>
                                    <p className="font-medium text-dark-900">28/10/2025</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-dark-600">Tổng cộng</p>
                                    <p className="font-medium text-dark-900">24.990.000₫</p>
                                </div>
                                <div className="flex-1">
                                    <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                                        Đang Vận Chuyển
                                    </span>
                                </div>
                                <Link to="" className="text-dark-600 hover:text-primary-500">
                                    <i className="fas fa-chevron-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
         
        </>
    );
}
export default HoSoCaNhan;
