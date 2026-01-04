import {Link } from 'react-router-dom';
import { useState } from 'react';
function PhieuNhapHang(){
    const [Trang,setTrang] =useState(1)
    return(
        <>
  <div class="flex h-screen overflow-hidden">
        
        <div class="flex-1 flex flex-col overflow-hidden">
            
            <header class="flex justify-between items-center p-6 bg-white border-b shadow-sm">
                <h1 class="text-2xl font-bold text-gray-700">
                    <i class="fa-solid fa-clipboard-list text-blue-600 mr-2"></i> Quản Lý Phiếu Nhập
                </h1>
                <Link to='themPhieuNhap' class="bg-teal-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 transition">
                    <i class="fa-solid fa-plus"></i> Tạo phiếu nhập mới
                </Link>
            </header>

            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div class="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-sm text-gray-500 uppercase font-bold">Tổng nhập (Tháng 10)</p>
                                <p class="text-2xl font-bold text-blue-700 mt-1">1.2 Tỷ VNĐ</p>
                            </div>
                            <div class="p-3 bg-blue-100 rounded-full text-blue-600">
                                <i class="fa-solid fa-money-bill-trend-up text-xl"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-sm text-gray-500 uppercase font-bold">Đã thanh toán</p>
                                <p class="text-2xl font-bold text-green-700 mt-1">800 Triệu</p>
                            </div>
                            <div class="p-3 bg-green-100 rounded-full text-green-600">
                                <i class="fa-solid fa-check-circle text-xl"></i>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-5 border-l-4 border-red-500">
                        <div class="flex justify-between items-center">
                            <div>
                                <p class="text-sm text-gray-500 uppercase font-bold">Nợ Nhà Cung Cấp</p>
                                <p class="text-2xl font-bold text-red-600 mt-1">400 Triệu</p>
                            </div>
                            <div class="p-3 bg-red-100 rounded-full text-red-600">
                                <i class="fa-solid fa-file-invoice-dollar text-xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-4 mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div class="md:col-span-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </span>
                                <input type="text" class="pl-10 w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Mã phiếu, tên NCC..."/>
                            </div>
                        </div>

                        <div class="md:col-span-3">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nhà cung cấp</label>
                            <select class="w-full border border-gray-300 rounded-md p-2">
                                <option value="">Tất cả</option>
                                <option>Apple VN</option>
                                <option>Samsung Vina</option>
                            </select>
                        </div>

                        <div class="md:col-span-3">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Thời gian</label>
                            <input type="date" class="w-full border border-gray-300 rounded-md p-2"/>
                        </div>

                        <div class="md:col-span-2">
                            <button class="w-full bg-teal-600 hover:bg-gray-900 text-white p-2 rounded-md transition">
                                <i class="fa-solid fa-filter"></i> Lọc
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                                <tr>
                                    <th class="px-6 py-3">Mã Phiếu</th>
                                    <th class="px-6 py-3">Nhà Cung Cấp</th>
                                    <th class="px-6 py-3">Người Nhập</th>
                                    <th class="px-6 py-3 text-right">Tổng Tiền</th>
                                    <th class="px-6 py-3 text-center">Trạng Thái</th>
                                    <th class="px-6 py-3 text-center">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200">
                                <tr class="bg-white hover:bg-gray-50">
                                    <td class="px-6 py-4 font-bold text-blue-600">PN00125</td>
                                    <td class="px-6 py-4">20/10/2023 <br/> <span class="text-xs text-gray-400">10:30 AM</span></td>
                                    <td class="px-6 py-4">Nguyễn Văn A</td>
                                    <td class="px-6 py-4 text-right font-bold">250.000.000</td>
                                    <td class="px-6 py-4 text-center">
                                        <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-green-200">Hoàn thành</span>
                                    </td>
                                    <td class="px-6 py-4 text-center space-x-2">
                                       <Link to={`chitiet`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Xem chi tiết">
                                                xem chi tiết <i className="fas fa-arrow-right ml-1"></i>
                                      </Link>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p class="text-sm text-gray-700">
                                    Hiển thị <span class="font-medium">1</span> đến <span class="font-medium">10</span> trong số <span class="font-medium">97</span> kết quả
                                </p>
                            </div>
                            <div>
                                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                   <button type="button" className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium ${Trang === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-50'} focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`} >
                                        <i className="fa-solid fa-chevron-left"></i>
                                    </button>
                                    <span className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                        {Trang}
                                    </span>
                                    <button type="button"  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    </div>
        </>
    )
};
export default PhieuNhapHang;