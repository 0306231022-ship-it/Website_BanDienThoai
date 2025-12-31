import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as API from '../../../../JS/API/API';
import { useModalContext } from "../../../../CONTEXT/QuanLiModal";

function DanhSachThuongHieu() {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState("");
    const { OpenMoDal } = useModalContext();
    const [Trang, setTrang] = useState(1);
    const [DuLieu, setDuLieu] = useState(null);
    const [dulieuTrang, setdulieuTrang] = useState({});
    const [Loading,setloading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            try {
                const ketqua = await API.CallAPI(undefined, { 
                    url: `/admin/thuonghieu?page=${Trang}`, 
                    PhuongThuc: 2 
                });
                setDuLieu(ketqua.thuongHieu);
                setdulieuTrang(ketqua.pagination);
                setloading(false)
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
                setDuLieu([]);
            } finally {
                setloading(false)
            }
        };
        fetchData();
    }, [Trang]);


    const duLieuHienThi = DuLieu?.filter(item => {
        const matchSearch = item.TENTHUONGHIEU.toLowerCase().includes(searchTerm.toLowerCase());
        if (filter === 'active') return matchSearch && item.TRANGTHAI !== 0;
        if (filter === 'inactive') return matchSearch && item.TRANGTHAI === 0;
        return matchSearch;
    });

    const getBtnClass = (status) => {
        const baseClass = "px-5 py-2 text-sm font-bold rounded-xl transition-all duration-200 flex items-center gap-2";
        return filter === status
            ? `${baseClass} bg-teal-600 text-white shadow-md shadow-teal-200 scale-105`
            : `${baseClass} bg-white text-gray-500 hover:bg-gray-100 border border-gray-200`;
    };

    return (
        <>
            <section className="p-6 bg-gray-50 min-h-screen animate-fadeIn">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Quản lý Thương hiệu</h2>
                        <p className="text-sm text-gray-500 mt-1">Theo dõi danh sách và hiệu suất các đối tác cung ứng</p>
                    </div>
                    <button
                        onClick={() =>  OpenMoDal( undefined , {TenTrang :"ThemThuongHieu",TieuDe: 'Thêm Thương Hiệu Mới', icon: 'fas fa-tags mr-2 text-sm text-yellow-500'})}
                        className="flex items-center px-5 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-bold shadow-lg shadow-teal-600/20 transition-all active:scale-95 w-fit"
                    >
                        <i className="fas fa-plus mr-2 text-xs"></i> Thêm mới
                    </button>
                </div>

                {/* --- TOOLBAR --- */}
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

                {/* --- TABLE --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50/50 text-gray-400">
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest">Thương hiệu</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest">Trạng thái</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-widest">Số sản phẩm</th>
                                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-widest">Hành động</th>
                                </tr>
                            </thead>
                           <tbody className="bg-white divide-y divide-gray-100">
                                {Loading && (
                                <tr>
                                    <td colSpan="4">
                                    <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
                                         <div className="relative">
                                         <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                                         <div className="absolute inset-0 rounded-full blur-2xl bg-teal-200/50 -z-10 animate-pulse"></div>
                                    </div>
                                     <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase"> Đang tải dữ liệu...</p>
                                    </div>
                                    </td>
                                </tr>
                                )}
                                {duLieuHienThi && duLieuHienThi.length > 0 ? (
                                    duLieuHienThi.map((item, index) => (
                                        <tr key={item.IDTHUONGHIEU || index} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 font-bold shadow-inner text-[10px]">
                                                        <img src={`http://localhost:3001/${item.LOGO}`} className="w-full h-full object-cover rounded-lg" alt={item.TENTHUONGHIEU} />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-bold text-gray-900">{item.TENTHUONGHIEU}</div>
                                                        <div className="text-xs text-gray-400">ID: #{item.IDTHUONGHIEU}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${item.TRANGTHAI !== 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${item.TRANGTHAI !== 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                    {item.TRANGTHAI !== 0 ? 'Đang hợp tác' : 'Đã ngưng'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 font-bold rounded-lg text-sm">
                                                    {item.SOLUONG_SANPHAM || 0}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                <div className="flex justify-center gap-1.5">
                                                    <Link to={`chitiet/${item.IDTHUONGHIEU}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Xem chi tiết">
                                                        xem chi tiết <i className="fas fa-arrow-right ml-1"></i>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-400 italic">
                                            {searchTerm ? "Không tìm thấy thương hiệu nào khớp với từ khóa" : "Đang tải dữ liệu hoặc danh sách trống..."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-500 font-medium">
                            Dữ liệu trang {dulieuTrang.currentPage || 0} trên tổng số {dulieuTrang.totalPages || 0} trang (Tổng {dulieuTrang.totalItems || 0} thương hiệu)
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                disabled={Trang <= 1}
                                onClick={() => setTrang(p => Math.max(1, p - 1))} 
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-teal-600 disabled:opacity-30 transition-all shadow-sm"
                            >
                                <i className="fas fa-chevron-left text-xs"></i>
                            </button>
                            <span className="w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold bg-teal-600 text-white shadow-md shadow-teal-200">{Trang}</span>
                            <button 
                                disabled={dulieuTrang.currentPage >= dulieuTrang.totalPages}
                                onClick={() => setTrang(p => p + 1)} 
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-teal-600 transition-all shadow-sm"
                            >
                                <i className="fas fa-chevron-right text-xs"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default DanhSachThuongHieu;