import { Link } from "react-router-dom";
import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
import { useState , useEffect } from "react";
import * as API from '../../../../JS/API/API';
import * as fun from '../../../../JS/FUNCTONS/function';

function DanhSachMa() {
    const { OpenMoDal } = useModalContext();
    const [maGiamGia, setMaGiamGia] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page , setPage] = useState(1);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const fetchMaGiamGia = async () => {
            setLoading(true);
            try {
                const response = await API.CallAPI(undefined, { url: `/admin/lay_ds_ma_giam_gia?page=${page}&limit=10`, PhuongThuc: 2 });
                //alert(JSON.stringify(response))
                if (response.ThanhCong) {
                    setMaGiamGia(response.dulieu);
                    setTotal(response.total);
                }else{
                    setMaGiamGia([]);
                    setTotal(0);
                }
            }catch (error) {
                console.error("Error fetching discount codes:", error);
            }finally {
                setLoading(false);
            }
        }
        fetchMaGiamGia();
    },[page]);


    return (
        <>
            <div className="min-h-screen flex">
                <main className="flex-1 p-8">
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
                               {
                                loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                                  <div className="flex flex-col items-center justify-center min-h-[300px] w-full gap-4">
                                                    <div className="relative">
                                                        <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                                                        <div className="absolute inset-0 rounded-full blur-2xl bg-teal-200/50 -z-10 animate-pulse"></div>
                                                    </div>
                                                    <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
                                                </div>
                                        </td>
                                    </tr>
                                ) : maGiamGia.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Chưa có mã giảm giá nào</h3>
        <p className="max-w-xs mx-auto mt-1 text-sm text-gray-500">
            Hệ thống hiện chưa có dữ liệu mã giảm giá. Hãy bắt đầu tạo chiến dịch đầu tiên của bạn.
        </p>
        <button onClick={() => OpenMoDal(null, { TenTrang: 'ThemMa', TieuDe: 'Tạo Mã Giảm Giá Mới' })} className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-all">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Thêm mã mới
        </button>
    </div>
                                        </td>
                                    </tr>
                                ) : (
                                    maGiamGia.map((ma, index) => (
                                         <tr className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-blue-600">{ma.MAGIAMGIA}</div>
                                        <div className="text-xs text-gray-400">{ma.TENCHUONGTRINH}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-700">
                                        {
                                            ma.LOAI_GIAMGIA === 1 ? `${ma.GIATRIGIAM}%` : `${fun.formatCurrency(ma.GIATRIGIAM)}`
                                        }
                                    </span></td>
                                    <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">{ma.TENTHUONGHIEU}</span></td>
                                    <td className="px-6 py-4">
                                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mb-1">
                                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(ma.SOLUONG_DADUNG / ma.SOLUONG) * 100}%` }}></div>
                                        </div>
                                        <span className="text-xs text-gray-500">{ma.SOLUONG_DADUNG}/{ma.SOLUONG}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            ma.TRANGTHAI === 1 ? (
                                                <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">Đang hoạt động</span>
                                            ) : (
                                                <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-full">Ngừng hoạt động</span>
                                            )
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <Link to={`chitiet/${ma.MaGG}`}  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Xem chi tiết">
                                            xem chi tiết <i className="fas fa-arrow-right ml-1"></i>
                                        </Link>
                                    </td>
                                </tr>
                                    ))
                                 )}

                            </tbody>
                        </table>

                        {/* Pagination Section - PHẦN MỚI THÊM */}
                        <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Hiển thị <span className="font-medium text-gray-700">{(page - 1) * 10 + 1}</span> đến <span className="font-medium text-gray-700">{Math.min(page * 10, total)}</span> trong số <span className="font-medium text-gray-700">{total}</span> kết quả
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setPage(Math.max(1, page - 1))} className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-400 cursor-not-allowed transition hover:bg-gray-50 disabled:opacity-50" disabled>
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <span className="px-3 py-1 bg-blue-600 border border-blue-600 rounded-md text-sm text-white font-medium">
                                    {page}
                                </span>
                                <button onClick={() => setPage(Math.min(Math.ceil(total / 10), page + 1))} className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition">
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