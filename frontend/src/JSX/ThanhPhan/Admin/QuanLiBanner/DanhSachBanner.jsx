function DanhSachBanner() {
    return (
        <>
         <div className="flex h-screen overflow-hidden">
        <main className="flex-1 flex flex-col overflow-y-auto">
            <div className="p-6">
                
                <div className="bg-white rounded-t-xl p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
                    
                    <div className="relative w-full md:w-96">
                        <input type="text" placeholder="Tìm tên chiến dịch..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-full md:w-auto">
                            <option value="">Tất cả Trạng thái</option>
                            <option value="active">Đang chạy</option>
                            <option value="upcoming">Sắp diễn ra</option>
                            <option value="ended">Đã kết thúc</option>
                        </select>
                        <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hidden sm:block">
                            <option value="">Loại: Tất cả</option>
                            <option value="flash-sale">Flash Sale</option>
                            <option value="banner">Banner Trưng bày</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-b-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Tên chiến dịch / Loại</th>
                                    <th className="px-6 py-4">Thời gian áp dụng</th>
                                    <th className="px-6 py-4 text-center">Sản phẩm</th>
                                    <th className="px-6 py-4">Trạng thái</th>
                                    <th className="px-6 py-4 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                
                                <tr className="hover:bg-blue-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900 text-base mb-1">Flash Sale Cuối Tuần</div>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-800">Flash Sale</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-800">10:00 - 25/10/2026</div>
                                        <div className="text-gray-400 text-xs">Đến 23:59 - 26/10/2026</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-semibold text-gray-800">12</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                            Đang chạy
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium">
                                        <a href="#"  className="text-blue-600 hover:text-blue-900 mr-4">Sửa</a>
                                        <a href="#" className="text-red-500 hover:text-red-700">Xóa</a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-blue-50/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900 text-base mb-1">Pre-order iPhone 15</div>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-purple-100 text-purple-800">Banner Hero</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-800">00:00 - 01/11/2026</div>
                                        <div className="text-gray-400 text-xs">Đến 23:59 - 15/11/2026</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-semibold text-gray-800">4</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
                                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                                            Sắp diễn ra
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium">
                                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">Sửa</a>
                                        <a href="#" className="text-red-500 hover:text-red-700">Xóa</a>
                                    </td>
                                </tr>

                                <tr className="hover:bg-blue-50/50 transition bg-gray-50/50">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-500 text-base mb-1">Tuần lễ Samsung</div>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-800 opacity-70">Tab Danh Mục</span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="line-through">00:00 - 01/10/2026</div>
                                        <div className="text-xs">Đến 23:59 - 07/10/2026</div>
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-500">
                                        <span className="font-semibold">25</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                            Đã kết thúc
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium">
                                        <a href="#" className="text-gray-400 hover:text-blue-600 mr-4">Xem lại</a>
                                        <a href="#" className="text-red-400 hover:text-red-700">Xóa</a>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <span className="text-sm text-gray-500">Hiển thị <span className="font-medium text-gray-800">1</span> đến <span className="font-medium text-gray-800">3</span> của <span className="font-medium text-gray-800">12</span> chiến dịch</span>
                        <div className="flex items-center gap-1">
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-500 hover:bg-white transition" disabled>&larr; Trước</button>
                            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium shadow-sm">1</button>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-white transition">2</button>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-white transition">Sau &rarr;</button>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    </div>
        </>
    )
};
export default DanhSachBanner;