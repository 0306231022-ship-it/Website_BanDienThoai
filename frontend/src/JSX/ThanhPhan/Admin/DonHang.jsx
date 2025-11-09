import { Link } from "react-router-dom";
function DonHang(){
    return(
        <>
        <section id="section-orders" className="section" aria-label="Quản lý đơn hàng">
    
    <div className="flex items-center justify-between mb-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý Đơn hàng</h2>
        <div className="flex items-center gap-3">
            <input 
                type="text" 
                placeholder="Tìm kiếm theo mã đơn, khách hàng..." 
                className="p-3 border border-gray-300 rounded-lg text-sm w-64 focus:ring-teal-500 focus:border-teal-500 transition"
            />
            <button className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition">
                <i className="fas fa-plus mr-2"></i>Tạo Đơn hàng
            </button>
        </div>
    </div>

    <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-6" aria-label="Tabs Đơn hàng">
            <button id="tab-all-orders" className="tab-order-button py-2 px-1 text-sm font-bold text-teal-600 border-b-2 border-teal-600 transition duration-150">
                <i className="fas fa-list-ul mr-1"></i> Tất Cả (125)
            </button>
            
            <button id="tab-pending-orders" className="tab-order-button py-2 px-1 text-sm font-medium text-gray-600 hover:text-teal-600 border-b-2 border-transparent hover:border-teal-300 transition duration-150">
                <i className="fas fa-hourglass-half mr-1"></i> Chờ Xử Lý (15)
            </button>
            
            <button id="tab-shipping-orders" className="tab-order-button py-2 px-1 text-sm font-medium text-gray-600 hover:text-teal-600 border-b-2 border-transparent hover:border-teal-300 transition duration-150">
                <i className="fas fa-shipping-fast mr-1"></i> Đang Giao (30)
            </button>

            <button id="tab-completed-orders" className="tab-order-button py-2 px-1 text-sm font-medium text-gray-600 hover:text-teal-600 border-b-2 border-transparent hover:border-teal-300 transition duration-150">
                <i className="fas fa-check-circle mr-1"></i> Hoàn Thành (80)
            </button>
            
            <button id="tab-cancelled-orders" className="tab-order-button py-2 px-1 text-sm font-medium text-gray-600 hover:text-teal-600 border-b-2 border-transparent hover:border-teal-300 transition duration-150">
                <i className="fas fa-times-circle mr-1"></i> Đã Hủy (5)
            </button>
        </nav>
    </div>

    <div id="content-all-orders" className="tab-content overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow-xl">
            <thead className="bg-teal-50">
                <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Mã đơn</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Khách hàng</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Tổng tiền</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Ngày đặt</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-teal-800 uppercase tracking-wider">Hành động</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition duration-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600">#10234</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Nguyễn Văn A</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-green-700">1,320,000₫</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold"><i className="fas fa-check-circle mr-1"></i> Hoàn thành</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-11-09</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <Link  to="/admin/DonHang/ChiTietDon"className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition" title="Xem chi tiết">
                            <i className="fas fa-eye"></i>
                        </Link>
                    </td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600">#10235</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Trần Bùi</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-800">15,900,000₫</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold"><i className="fas fa-hourglass-start mr-1"></i> Chờ xử lý</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-11-09</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition" title="Xem chi tiết">
                            <i className="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600">#10236</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Lê Thị C</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-gray-800">9,500,000₫</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold"><i className="fas fa-truck mr-1"></i> Đang giao</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-11-08</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition" title="Xem chi tiết">
                            <i className="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600">#10237</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">Phạm D</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-red-700">4,290,000₫</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold"><i className="fas fa-times mr-1"></i> Đã hủy</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-11-07</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition" title="Xem chi tiết">
                            <i className="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </section>
        </>
    );
};
export default DonHang;