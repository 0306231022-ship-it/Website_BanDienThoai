import { Link } from "react-router-dom";
import { useModalContext } from "../../../../CONTEXT/QuanLiModal";

function DanhSachMa() {
    const { OpenMoDal } = useModalContext();

    return (
        <>
            <div className="min-h-screen flex">
                <main className="flex-1 p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Quản lý Mã Giảm Giá</h1>
                            <p className="text-sm text-gray-500">Tạo và quản lý các chương trình ưu đãi cho điện thoại</p>
                        </div>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition shadow-lg"
                            onClick={() => OpenMoDal(null, { TenTrang: 'ThemMa', TieuDe: 'Tạo Mã Giảm Giá Mới' })}
                        >
                            <i className="fas fa-plus mr-2"></i> Tạo mã mới
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500 font-medium">Đang hoạt động</p>
                            <p className="text-2xl font-bold text-green-600">12 Mã</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500 font-medium">Lượt sử dụng (Tháng này)</p>
                            <p className="text-2xl font-bold text-blue-600">856</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-sm text-gray-500 font-medium">Tổng tiết kiệm cho khách</p>
                            <p className="text-2xl font-bold text-orange-500">125.4M đ</p>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Filters */}
                        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center">
                            <div className="relative w-full md:w-64">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <i className="fas fa-search"></i>
                                </span>
                                <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm" placeholder="Tìm kiếm mã..." />
                            </div>
                            <div className="flex gap-2">
                                <select className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white outline-none">
                                    <option>Tất cả hãng</option>
                                    <option>Apple</option>
                                    <option>Samsung</option>
                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Mã / Chương trình</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Loại giảm giá</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Áp dụng cho</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Đã dùng</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {/* Dữ liệu mẫu (Giữ nguyên từ code cũ của bạn) */}
                                <tr className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-blue-600">IPHONE15PRO</div>
                                        <div className="text-xs text-gray-400">Giảm giá mở bán IP 15 Pro</div>
                                    </td>
                                    <td className="px-6 py-4"><span className="text-sm text-gray-700">1,000,000 đ</span></td>
                                    <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">Apple</span></td>
                                    <td className="px-6 py-4">
                                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mb-1">
                                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                                        </div>
                                        <span className="text-xs text-gray-500">70/100</span>
                                    </td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">Active</span></td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <button className="text-gray-400 hover:text-blue-600 mr-3"><i className="fas fa-edit"></i></button>
                                        <button className="text-gray-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                {/* ... Thêm các dòng khác ở đây ... */}
                            </tbody>
                        </table>

                        {/* Pagination Section - PHẦN MỚI THÊM */}
                        <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Hiển thị <span className="font-medium text-gray-700">1</span> đến <span className="font-medium text-gray-700">10</span> trong số <span className="font-medium text-gray-700">45</span> kết quả
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-400 cursor-not-allowed transition hover:bg-gray-50 disabled:opacity-50" disabled>
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <button className="px-3 py-1 bg-blue-600 border border-blue-600 rounded-md text-sm text-white font-medium">
                                    1
                                </button>
                                <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition">
                                    2
                                </button>
                                <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition">
                                    3
                                </button>
                                <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition">
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default DanhSachMa;