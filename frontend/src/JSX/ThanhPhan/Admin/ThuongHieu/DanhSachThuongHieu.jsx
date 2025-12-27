import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemThuongHieu from "./ThemThuongHieu";
import Trang404 from "../../../../JSX/TRANG/err/404";
import { useModalContext } from "../../../../CONTEXT/QuanLiModal";

function DanhSachThuongHieu() {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState("");
    const {modalState,MoModal,DongModal} = useModalContext();

    const getBtnClass = (status) => {
        const baseClass = "px-5 py-2 text-sm font-bold rounded-xl transition-all duration-200 flex items-center gap-2";
        return filter === status 
            ? `${baseClass} bg-teal-600 text-white shadow-md shadow-teal-200 scale-105` 
            : `${baseClass} bg-white text-gray-500 hover:bg-gray-100 border border-gray-200`;
    };

    return (
        <> 
            <section className="p-6 bg-gray-50 min-h-screen animate-fadeIn">
                {/* Header */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Quản lý Thương hiệu</h2>
                        <p className="text-sm text-gray-500 mt-1">Quản lý trạng thái và thông tin chi tiết đối tác</p>
                    </div>
                    <button 
                        onClick={() => MoModal("ThemThuongHieu", {})}
                        className="flex items-center px-5 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-bold shadow-lg shadow-teal-600/20 transition-all active:scale-95 w-fit"
                    >
                        <i className="fas fa-plus mr-2 text-xs"></i> Thêm mới
                    </button>
                </div>

                {/* Toolbar (Filter & Search) */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2 p-1.5 bg-gray-200/50 w-fit rounded-2xl border border-gray-200">
                        <button onClick={() => setFilter('all')} className={getBtnClass('all')}>Tất cả</button>
                        <button onClick={() => setFilter('active')} className={getBtnClass('active')}>Đang hợp tác</button>
                        <button onClick={() => setFilter('inactive')} className={getBtnClass('inactive')}>Đã ngưng</button>
                    </div>

                    <div className="relative group shadow-sm">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <i className="fas fa-search text-gray-400 group-focus-within:text-teal-500 transition-colors"></i>
                        </span>
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Tìm tên thương hiệu..." 
                            className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm w-full md:w-80 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all bg-white"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50/50 text-gray-400">
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest">Thương hiệu</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest">Trạng thái</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-widest">Sản phẩm</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-widest">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 font-bold shadow-inner text-xs">APPLE</div>
                                            <div className="ml-4">
                                                <div className="text-sm font-bold text-gray-900">Apple Inc.</div>
                                                <div className="text-xs text-gray-400">#BR-001</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span> Đang hợp tác
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-600">45</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                        <div className="flex justify-center gap-1.5">
                                            <Link to="chitiet" className="p-2.5 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all active:scale-90" title="Xem chi tiết">
                                                <i className="fas fa-eye text-lg"></i>
                                            </Link>
                                            <button className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90" title="Chỉnh sửa">
                                                <i className="fas fa-edit text-lg"></i>
                                            </button>
                                            <button className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90" title="Xóa">
                                                <i className="fas fa-trash-alt text-lg"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-500 font-medium">
                            Hiển thị <span className="text-gray-800 font-bold">1 - 10</span> trong <span className="text-gray-800 font-bold">30</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-teal-600 transition-all"><i className="fas fa-chevron-left text-xs"></i></button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold bg-teal-600 text-white shadow-md">1</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold bg-white border border-gray-200 text-gray-500 hover:border-teal-500">2</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-teal-600 transition-all"><i className="fas fa-chevron-right text-xs"></i></button>
                        </div>
                    </div>
                </div>
            </section>
                  {
                modalState.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                         <div className="relative bg-white w-full max-w-md rounded-xl p-2 shadow-lg">
                             <button onClick={DongModal} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 transition">
                                <i className="fa-solid fa-xmark text-white"></i>
                            </button>
        
                             <p className="text-gray-600 mb-6">
                                {(() => {
                                    switch(modalState.TrangThaiTrang){
                                        case 'ThemThuongHieu' :
                                            return <ThemThuongHieu close={DongModal} />;
                                        default:
                                        return <Trang404/>
                                    }
                                })()}
                             </p>
                         
                        </div>
                    </div>
                )
            } 


        </>
    );
}

export default DanhSachThuongHieu;