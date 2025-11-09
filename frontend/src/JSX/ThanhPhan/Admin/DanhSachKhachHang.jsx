function DanhSachKhachHang(){
    return(
        <>
        <section id="section-customers" className="section " aria-label="Quản lý khách hàng">
    
    <div className="flex items-center justify-between mb-6 mt-6">
        <h2 className="text-2xl font-semibold text-gray-900">Quản lý Khách hàng</h2>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold transition" aria-label="Xuất danh sách">
            <i className="fas fa-file-excel mr-2"></i> Xuất Excel
        </button>
    </div>

    <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-4" aria-label="Tabs Khách hàng">
            <button id="tab-top-customers" className="tab-button py-2 px-4 text-sm font-medium text-white rounded-t-lg bg-teal-600 border-b-2 border-teal-600 transition duration-150">
                <i className="fas fa-star mr-2"></i> Khách hàng Thân thiết
            </button>
            
            <button id="tab-new-customers" className="tab-button py-2 px-4 text-sm font-medium text-gray-600 hover:text-teal-600 border-b-2 border-transparent hover:border-teal-300 transition duration-150">
                <i className="fas fa-user-plus mr-2"></i> Khách hàng Mới đăng ký
            </button>
        </nav>
    </div>

    <div id="content-top-customers" className="tab-content overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow-xl">
            <thead className="bg-teal-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Khách hàng</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Đơn đã mua</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Điểm tích lũy</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition duration-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Nguyễn Thị D</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">dnguyen@example.vn</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-teal-600">24 đơn</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1,200</td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lê Văn M</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">mv.le@example.vn</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-teal-600">18 đơn</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">980</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div id="content-new-customers" className="tab-content hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow-xl">
            <thead className="bg-teal-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Tên Khách hàng</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Ngày đăng ký</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-teal-800 uppercase tracking-wider">Trạng thái</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition duration-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Phạm Văn K</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2025-11-08</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">pvk@newmail.vn</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Hoạt động</span></td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Hoàng Lê</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2025-11-08</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">hoangle@email.com</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">Chờ xác nhận</span></td>
                </tr>
                <tr className="hover:bg-gray-50 transition duration-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Vũ Hằng</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2025-11-07</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">hangvu@example.com</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Hoạt động</span></td>
                </tr>
            </tbody>
        </table>
    </div>
    
    </section>
        </>
    );
};
export default DanhSachKhachHang;