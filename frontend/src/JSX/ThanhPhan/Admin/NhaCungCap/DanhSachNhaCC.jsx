import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
import { useEffect, useState } from "react";
import * as API from '../../../../JS/API/API';
import { Link } from 'react-router-dom';

function NhaCungCap() {
    const { OpenMoDal } = useModalContext();
    const [Trang, setTrang] = useState(1);
    const [loading, setloading] = useState(false);
    const [err, seterr] = useState('');
    const [DuLieu, setDuLieu] = useState([]);
    const [Timkiem, setTimKiem] = useState([]);
    const [key, setkey] = useState(null);

    // --- STATE MỚI CHO MENU ---
    const [openMenu, setOpenMenu] = useState(false);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    useEffect(() => {
        const LoadDL = async () => {
            setloading(true);
            try {
                const ketqua = await API.CallAPI(undefined, { url: `/admin/layTTnhacungcap?page=${Trang}`, PhuongThuc: 2 });
                const data = ketqua.nhacungcap || [];
                setDuLieu(data);
                setTimKiem(data);
                setkey(ketqua.pagination)
            } catch (error) {
                console.error('Lỗi hệ thống!=' + error);
                seterr('Đã xảy ra lỗi ngoài ý muốn!');
            } finally {
                setloading(false);
            }
        }
        LoadDL();
    }, [Trang]);

    const handlePrevPage = () => {
        if (Trang > 1) setTrang(prev => prev - 1);
    };
    const handleNextPage = () => {
        setTrang(prev => prev + 1);
    };

    const FilterData = (type) => {
        setloading(true)
        const filters = {
            all: () => DuLieu,
            active: () => DuLieu.filter(item => item.TRANGTHAI === 1),
            inactive: () => DuLieu.filter(item => item.TRANGTHAI !== 1),
        };
        setTimKiem(filters[type] ? filters[type]() : DuLieu);
        setloading(false);
    };
    const handleSearch = (e) => {
        setloading(true)
        const keyword = e.target.value.toLowerCase();
        if (keyword === '') {
            setTimKiem(DuLieu);
            setloading(false);
        } else {
            const result = DuLieu.filter(item =>
                (item.TENNCC && item.TENNCC.toLowerCase().includes(keyword)) ||
                (item.SDT && item.SDT.includes(keyword)) ||
                (item.MST && item.MST.includes(keyword))
            );
            setTimKiem(result);
            setloading(false);
        }
    }

    if (err) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 text-center animate-fadeIn">
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 shadow-xl max-w-md">
                    <div className="mb-6">
                        <i className="fa-solid fa-triangle-exclamation text-7xl text-red-500"></i>
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-800 mb-2">Đã xảy ra lỗi!</h3>
                    <p className="text-red-600 font-medium mb-6">{err}</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-600 transition-all">Thử lại</button>
                        <button onClick={() => window.history.back()} className="px-6 py-2.5 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all">Quay lại</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex h-screen overflow-hidden p-2">
                <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 sticky top-0 z-20">
                        <h1 className="text-xl font-bold text-slate-800">Danh sách Nhà Cung Cấp</h1>    
                    </header>

                    <div className="p-6">

                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                            <div className="flex gap-2 w-full md:w-auto">
                                <div className="relative w-full md:w-64">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input
                                        type="text"
                                        onChange={handleSearch}
                                        placeholder="Tìm tên, SĐT, Mã số thuế..."
                                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                                    />
                                </div>
                                <select
                                    onChange={(e) => FilterData(e.target.value)}
                                    className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none bg-white"
                                >
                                    <option value="all">Tất cả trạng thái</option>
                                    <option value="active">Đang hợp tác</option>
                                    <option value="inactive">Ngừng hợp tác</option>
                                </select>
                            </div>

                            <button onClick={() => OpenMoDal(undefined, { TenTrang: 'themNhaCungCap' })} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors w-full md:w-auto justify-center">
                                <i className="fa-solid fa-plus mr-2"></i>
                                Thêm Nhà cung cấp
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-10">ID</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nhà cung cấp</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Liên hệ</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Công nợ</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Trạng thái</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="6" className="py-10">
                                                <div className="flex flex-col items-center justify-center min-h-[300px] w-full gap-4">
                                                    <div className="relative">
                                                        <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                                                        <div className="absolute inset-0 rounded-full blur-2xl bg-teal-200/50 -z-10 animate-pulse"></div>
                                                    </div>
                                                    <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        Timkiem && Timkiem.length > 0 ? (
                                            Timkiem.map((item, index) => (
                                                <tr key={index} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 text-sm text-slate-500">#{index + 1}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div>
                                                                <div className="font-medium text-slate-900">{item.TENNCC}</div>
                                                                <div className="text-xs text-slate-500">MST: {item.MST}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-slate-900">{item.LIENHE_DOITAC}</div>
                                                        <div className="text-sm text-blue-600 font-medium hover:underline cursor-pointer flex items-center gap-1">
                                                            <i className="fa-solid fa-phone text-xs"></i>
                                                            {item.SDT}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-red-600 font-bold">{formatCurrency(item.CONGNO || 0)}</div>
                                                        <div className="text-xs text-slate-400">Hiện tại</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {item.TRANGTHAI === 1 ? (
                                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                                                Đang hợp tác
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                                                                Ngừng hợp tác
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex justify-center gap-1.5">
                                                            <Link to={`chitiet/${item.IDNCC}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Xem chi tiết">
                                                                xem chi tiết <i className="fas fa-arrow-right ml-1"></i>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center py-8 text-slate-500 italic">
                                                    Không có dữ liệu nhà cung cấp nào!
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            <div className="bg-white px-4 py-3 border-t border-slate-200 flex items-center justify-between sm:px-6">
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-slate-700">
                                            Dữ liệu trang  {key?.currentPage} trên tổng số {key?.totalPages} trang (Tổng {key?.totalItems} danh sách nhà cung cấp)
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                            <button
                                                type="button"
                                                onClick={handlePrevPage}
                                                disabled={Trang === 1}
                                                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium ${Trang === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-50'} focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                                            >
                                                <i className="fa-solid fa-chevron-left"></i>
                                            </button>

                                            <span className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                                {Trang}
                                            </span>

                                            <button
                                                disabled={key?.currentPage === key?.totalPages}
                                                type="button"
                                                onClick={handleNextPage}
                                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>

        </>
    );
}

export default NhaCungCap;