import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as API from '../../../../JS/API/API';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';

function DanhSachSanPham() {
    const [loading, setloading] = useState(false);
    const [sanpham, setSanPham] = useState([]);
    const [page, setpage] = useState(1);

    useEffect(() => {
        const layDL = async () => {
            setloading(true);
            try {
                const ketqua = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/admin/lay_ds_sanpham?page=${page}` });
                 //alert(JSON.stringify(ketqua)) // Tắt alert khi đã chạy ổn
                if (ketqua.ThanhCong) {
                    setSanPham(ketqua.DuLieu);
                } else if (ketqua.status) {
                    ThongBao.ThongBao_CanhBao(ketqua.message);
                }
            } catch (error) {
                console.error('Đã có lỗi xảy ra:' + error);
            } finally {
                setloading(false);
            }
        };
        layDL();
    }, [page]);

    return (
        <section className="p-6 bg-[#f8fafc] min-h-screen font-sans text-gray-800">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <i className="fas fa-boxes text-indigo-600 text-2xl"></i>
                        </div>
                        Kho Sản Phẩm
                    </h2>
                    <p className="text-gray-500 mt-1">Hệ thống quản lý tồn kho và giá niêm yết</p>
                </div>

            </div>

            {/* Filter Bar */}
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-wrap md:flex-nowrap gap-4">
                <div className="flex-1 relative">
                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="text" placeholder="Tìm tên, mã sản phẩm..." className="w-full pl-11 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition text-sm"/>
                </div>
                <select className="bg-gray-50 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-indigo-500 cursor-pointer min-w-[160px]">
                    <option>Tất cả trạng thái</option>
                    <option>Còn hàng</option>
                    <option>Sắp hết hàng</option>
                </select>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Sản phẩm</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Mã SKU</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Giá bán</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Tồn kho</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 relative">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="py-20 text-center">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <i className="fa-solid fa-circle-notch text-4xl text-indigo-600 animate-spin"></i>
                                            <p className="text-gray-400 font-medium animate-pulse text-sm uppercase tracking-widest">Đang tải dữ liệu...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                sanpham && sanpham.length > 0 ? (
                                    sanpham.map((sp, index) => (
                                        <tr key={index} className="hover:bg-indigo-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-gray-100 flex-shrink-0 flex items-center justify-center text-gray-400 border border-gray-100 group-hover:bg-white transition-colors">
                                                        <img src={` http://localhost:3001/${sp.HINHANH}`} alt="" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-gray-900 leading-tight">{sp.TENSANPHAM}</div>
                                                        <div className="text-[11px] text-gray-400 uppercase font-semibold">{sp.TENTHUONGHIEU}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-500">#{sp.IDSANPHAM}</td>
                                            <td className="px-6 py-4 text-right text-sm font-bold text-indigo-600">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sp.GIABAN)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-sm font-bold ${sp.TONG_TONKHO < 10 ? 'text-red-500' : 'text-gray-700'}`}>
                                                    {sp.TONG_TONKHO}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md uppercase ${sp.TONG_TONKHO > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                    {sp.TONG_TONKHO > 0 ? 'Đang bán' : 'Hết hàng'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link to={`ChiTiet/${sp.IDSANPHAM}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                                                        Xem chi tiết <i className="fas fa-arrow-right ml-1"></i>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-gray-400">
                                            <i className="fas fa-folder-open text-4xl mb-3 block"></i>
                                            Không có sản phẩm nào trong kho
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination */}
                <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">
                        Trang {page}
                    </span>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setpage(p => p - 1)} 
                            disabled={page === 1} 
                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-indigo-600 disabled:opacity-50 disabled:hover:text-gray-400 transition-all shadow-sm"
                        >
                            <i className="fas fa-chevron-left text-xs"></i>
                        </button>
                        
                        <span className="w-9 h-9 flex items-center justify-center text-sm font-bold bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100">
                            {page}
                        </span>

                        <button 
                            onClick={() => setpage(p => p + 1)} 
                            className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 hover:text-indigo-600 transition-all shadow-sm"
                        >
                            <i className="fas fa-chevron-right text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DanhSachSanPham;