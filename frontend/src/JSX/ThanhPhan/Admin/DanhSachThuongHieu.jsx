import { Link } from "react-router-dom";
function DanhSachThuongHieu() {
    return(
       <>
       <section id="section-brands" className="section" aria-label="Quản lý thương hiệu">
    <div className="flex items-center justify-between mb-6 mt-6">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý Thương hiệu</h2>
        <div className="flex items-center gap-3">
            <input 
                type="text" 
                placeholder="Tìm kiếm thương hiệu..." 
                className="p-3 border border-gray-300 rounded-lg text-sm w-56 focus:ring-teal-500 focus:border-teal-500 transition"
            />
            <Link to="themthuonghieu" className="px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition">
                <i className="fas fa-plus mr-2"></i>Thêm Thương hiệu
            </Link>
        </div>
    </div>

    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tên Thương hiệu</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Số lượng Sản phẩm</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Hành động</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BR001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-teal-600"> Apple</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2021-01-15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <Link className="text-indigo-600 hover:text-indigo-900 mr-3" to="chitiet"><i className="fas fa-eye"></i></Link>
                        <button className="text-blue-600 hover:text-blue-900 mr-3 p-2 rounded-full hover:bg-blue-50 transition" title="Chỉnh sửa">
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition" title="Xóa">
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BR002</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-teal-600">Samsung</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2020-05-20</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3 p-2 rounded-full hover:bg-blue-50 transition" title="Chỉnh sửa">
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition" title="Xóa">
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BR003</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-teal-600">Xiaomi</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2022-03-10</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                         
                        <button className="text-blue-600 hover:text-blue-900 mr-3 p-2 rounded-full hover:bg-blue-50 transition" title="Chỉnh sửa">
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition" title="Xóa">
                            <i className="fas fa-trash-alt"></i>
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
export default DanhSachThuongHieu;  