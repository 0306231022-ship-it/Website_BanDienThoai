import { Link } from "react-router-dom";
import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
function DanhSachMa(){
    const { OpenMoDal } = useModalContext();
    return(
        <>
         <div class="min-h-screen flex">


        <main class="flex-1 p-8">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-2xl font-bold text-gray-800">Quản lý Mã Giảm Giá</h1>
                    <p class="text-sm text-gray-500">Tạo và quản lý các chương trình ưu đãi cho điện thoại</p>
                </div>
                <button 
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition shadow-lg"
                    onClick={() => OpenMoDal(null, { TenTrang: 'ThemMa', TieuDe: 'Tạo Mã Giảm Giá Mới' })}
                >
                    <i class="fas fa-plus mr-2"></i> Tạo mã mới
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p class="text-sm text-gray-500 font-medium">Đang hoạt động</p>
                    <p class="text-2xl font-bold text-green-600">12 Mã</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p class="text-sm text-gray-500 font-medium">Lượt sử dụng (Tháng này)</p>
                    <p class="text-2xl font-bold text-blue-600">856</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p class="text-sm text-gray-500 font-medium">Tổng tiết kiệm cho khách</p>
                    <p class="text-2xl font-bold text-orange-500">125.4M đ</p>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="p-4 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center">
                    <div class="relative w-full md:w-64">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <i class="fas fa-search"></i>
                        </span>
                        <input type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm" placeholder="Tìm kiếm mã..."/>
                    </div>
                    <div class="flex gap-2">
                        <select class="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white outline-none">
                            <option>Tất cả hãng</option>
                            <option>Apple</option>
                            <option>Samsung</option>
                        </select>
                    </div>
                </div>

                <table class="w-full text-left border-collapse">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Mã / Chương trình</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Loại giảm giá</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Áp dụng cho</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Đã dùng</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                            <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr class="hover:bg-gray-50 transition">
                            <td class="px-6 py-4">
                                <div class="font-bold text-blue-600">IPHONE15PRO</div>
                                <div class="text-xs text-gray-400">Giảm giá mở bán IP 15 Pro</div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-sm text-gray-700">1,000,000 đ</span>
                            </td>
                            <td class="px-6 py-4">
                                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">Apple</span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="w-24 bg-gray-200 rounded-full h-1.5 mb-1">
                                    <div class="bg-blue-600 h-1.5 rounded-full" Style="width: 70%"></div>
                                </div>
                                <span class="text-xs text-gray-500">70/100</span>
                            </td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">Active</span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button class="text-gray-400 hover:text-blue-600 mr-3"><i class="fas fa-edit"></i></button>
                                <button class="text-gray-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50 transition">
                            <td class="px-6 py-4">
                                <div class="font-bold text-blue-600">SAM2024</div>
                                <div class="text-xs text-gray-400">Ưu đãi Samsung tháng 3</div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-sm text-gray-700">5% (Tối đa 500k)</span>
                            </td>
                            <td class="px-6 py-4">
                                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">Samsung</span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="w-24 bg-gray-200 rounded-full h-1.5 mb-1">
                                    <div class="bg-blue-600 h-1.5 rounded-full" Style="width: 25%"></div>
                                </div>
                                <span class="text-xs text-gray-500">25/100</span>
                            </td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">Active</span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button class="text-gray-400 hover:text-blue-600 mr-3"><i class="fas fa-edit"></i></button>
                                <button class="text-gray-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50 transition opacity-60">
                            <td class="px-6 py-4">
                                <div class="font-bold text-gray-500 italic">XIAOMI99</div>
                                <div class="text-xs text-gray-400">Xả kho Redmi Note</div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-sm text-gray-700">300,000 đ</span>
                            </td>
                            <td class="px-6 py-4">
                                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">Xiaomi</span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="w-24 bg-gray-200 rounded-full h-1.5 mb-1">
                                    <div class="bg-red-500 h-1.5 rounded-full" Style="width: 100%"></div>
                                </div>
                                <span class="text-xs text-gray-500">50/50</span>
                            </td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-600 rounded-full">Expired</span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button class="text-gray-400 hover:text-blue-600 mr-3"><i class="fas fa-edit"></i></button>
                                <button class="text-gray-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
        </>
    );
};
export default DanhSachMa;