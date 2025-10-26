function BangChinh(){
    return(
        <>
                {/* Stat Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    {/* Card 1: New Orders */}
                    <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-4xl font-bold">1,258</div>
                                <div className="text-gray-200 mt-1 text-sm">Đơn hàng mới</div>
                            </div>
                            <i className="fas fa-clipboard-list text-5xl opacity-75"></i> {/* Icon cho Đơn hàng mới */}
                        </div>
                    </div>
                    {/* Card 2: Monthly Revenue */}
                    <div className="bg-green-600 text-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-4xl font-bold">25.6M</div>
                                <div className="text-gray-200 mt-1 text-sm">Doanh thu tháng</div>
                            </div>
                            <i className="fas fa-money-bill-wave text-5xl opacity-75"></i> {/* Icon cho Doanh thu tháng */}
                        </div>
                    </div>
                    {/* Card 3: New Users - Đã áp dụng text-gray-900 trực tiếp thay vì class tùy chỉnh */}
                    <div className="bg-amber-400 text-gray-900 rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-4xl font-bold">512</div>
                                <div className="mt-1 text-sm">Người dùng mới</div>
                            </div>
                            <i className="fas fa-user-plus text-5xl opacity-75"></i> {/* Icon cho Người dùng mới */}
                        </div>
                    </div>
                    {/* Card 4: Low Stock Products */}
                    <div className="bg-red-600 text-white rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-4xl font-bold">3</div>
                                <div className="text-gray-200 mt-1 text-sm">Sản phẩm sắp hết</div>
                            </div>
                            <i className="fas fa-exclamation-triangle text-5xl opacity-75"></i> {/* Icon cho Sản phẩm sắp hết */}
                        </div>
                    </div>
                </div>
                {/* Charts and Tables Section */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Recent Orders Table - ĐÃ THAY ĐỔI xl:col-span-5 thành xl:col-span-12 */}
                    <div className="xl:col-span-12"> 
                        <div className="bg-white rounded-xl shadow-md border border-gray-200">
                            <div className="p-5 border-b border-gray-200">
                                <h5 className="text-xl font-semibold text-gray-800">Đơn hàng gần đây</h5>
                            </div>
                            <div className="p-0 overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã ĐH</th>
                                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                                            <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">#123456</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">Nguyễn Văn A</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900">28.990.000₫</td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Hoàn thành</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">#123455</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">Trần Thị B</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900">9.490.000₫</td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Đang xử lý</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">#123454</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">Lê Văn C</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900">15.990.000₫</td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Hoàn thành</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">#123453</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">Phạm Thị D</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900">21.990.000₫</td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Đã hủy</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition duration-150">
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">#123452</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-600">Võ Thị E</td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-gray-900">12.500.000₫</td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Hoàn thành</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};
export default BangChinh;