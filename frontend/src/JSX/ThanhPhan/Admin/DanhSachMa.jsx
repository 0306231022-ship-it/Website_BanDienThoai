import { Link } from "react-router-dom";
function DanhSachMa(){
    return(
        <>
        <section id="section-active-discounts" className="section " aria-label="Danh sách Mã Giảm Giá đang hoạt động">
    
    <div className="flex items-center justify-between mb-6 mt-6 border-b pb-3 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">🏷️ Mã Giảm Giá Đang Kích Hoạt (Tổng: 8)</h2>
        <div className="space-x-3">
            <Link to="magiamgia" className="px-5 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition" aria-label="Tạo mã giảm giá mới">
                <i className="fas fa-plus-circle mr-2"></i> Tạo Mã Giảm Giá Mới
            </Link>
        </div>
    </div>

    <div className="bg-white p-4 rounded-xl shadow-lg mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="md:col-span-2">
                <input type="text" placeholder="Tìm kiếm theo Mã hoặc Mô tả..." 
                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"/>
            </div>
            
            <div>
                <select className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-teal-500 focus:border-teal-500 transition">
                    <option value="">-- Lọc theo Loại --</option>
                    <option value="percentage">Phần trăm (%)</option>
                    <option value="fixed_amount">Số tiền cố định (₫)</option>
                    <option value="free_ship">Miễn phí Vận chuyển</option>
                </select>
            </div>
        </div>
    </div>
    
    <div className="bg-white rounded-xl p-6 shadow-2xl border border-teal-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-teal-50">
                <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Mã Giảm Giá</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Loại & Giá trị</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Đơn hàng Tối thiểu</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Số lần đã dùng</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Thời gian Hiệu lực</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Hành động</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                
                <tr className="hover:bg-gray-50 transition duration-100">
                    <td className="px-4 py-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-teal-700">TET2026</p>
                        <p className="text-xs text-gray-500">Cho đơn hàng dịp Tết</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                        <span className="text-green-600">15%</span> (Tối đa 200k)
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-center">500,000₫</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-center">1,250 / 5,000</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        Đến <span className="font-medium">2026-02-15</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                         <Link className="text-indigo-600 hover:text-indigo-900 mr-3" to="/admin/danhsachma/chitietma" ><i className="fas fa-eye">Xem</i></Link>
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3" title="Chỉnh sửa">
                            <i className="fas fa-edit"></i> Sửa
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Xóa">
                            <i className="fas fa-trash-alt"></i> Xóa
                        </button>
                    </td>
                </tr>

                <tr className="hover:bg-gray-50 transition duration-100 bg-yellow-50/50">
                    <td className="px-4 py-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-teal-700">FREESHIP24</p>
                        <p className="text-xs text-gray-500">Miễn phí ship cho mọi đơn</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                        <span className="text-blue-600">Miễn phí Vận chuyển</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Không giới hạn</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-center">Đã dùng hết (10,000)</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                        Hết hạn sau <span className="font-medium">2 ngày</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3" title="Chỉnh sửa">
                            <i className="fas fa-edit"></i> Sửa
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Xóa">
                            <i className="fas fa-trash-alt"></i> Xóa
                        </button>
                    </td>
                </tr>
                
                <tr className="hover:bg-gray-50 transition duration-100">
                    <td className="px-4 py-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-teal-700">WELCOME100</p>
                        <p className="text-xs text-gray-500">Cho khách hàng mới</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
                        <span className="text-blue-600">Giảm 100,000₫</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-center">2,000,000₫</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700 text-center">85 / Không giới hạn</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        Đến <span className="font-medium">2025-12-31</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3" title="Chỉnh sửa">
                            <i className="fas fa-edit"></i> Sửa
                        </button>
                        <button className="text-red-600 hover:text-red-900" title="Xóa">
                            <i className="fas fa-trash-alt"></i> Xóa
                        </button>
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>

    <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
            Hiển thị 1 đến 8 trong tổng số 8 mã giảm giá đang hoạt động
        </div>
        </div>
</section>
        </>
    );
};
export default DanhSachMa;