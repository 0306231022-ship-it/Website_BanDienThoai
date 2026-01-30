import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as API from '../../../../JS/API/API';
import '../../../../CSS/ThanhCuon.css';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';

function PhieuNhapHang() {
    const [Trang, setTrang] = useState(1);
    const [PhieuNhap, setPhieuNhap] = useState([]);
    const [key, setkey] = useState(null);
    const [loading, setloading] = useState(false);
    const [ThongKe, setThongKe] = useState({});
    
    // Logic tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const LayThongKe = async () => {
            setloading(true);
            try {
                const ketqua = await API.CallAPI(undefined, { url: '/admin/laythongke_phieunhap', PhuongThuc: 2 });
                if (ketqua.ThanhCong) {
                    setThongKe(ketqua.DuLieu);
                }
            } catch (error) {
                console.error('Có lỗi sãy ra :' + error);
                ThongBao.ThongBao_CanhBao('Không thể lấy được thống kê phiêu nhập!');
            } finally {
                setloading(false);
            }
        };
        LayThongKe();
    }, []);

    useEffect(() => {
        setloading(true);
        const LoadDL = async () => {
            try {
                const dulieu = await API.CallAPI(undefined, { url: `/admin/getPhieu?page=${Trang}`, PhuongThuc: 2 });
                setPhieuNhap(dulieu.phieunhap);
                setkey(dulieu.pagination);
            } catch (error) {
                console.error('Đã xảy ra lỗi!');
            } finally {
                setloading(false);
            }
        };
        LoadDL();
    }, [Trang]);

    // Hàm xử lý lọc dữ liệu tại local
    const filteredPhieuNhap = PhieuNhap.filter(item => {
        const searchLower = searchTerm.toLowerCase();
        return (
            item.IDPN?.toString().toLowerCase().includes(searchLower) ||
            item.TENNCC?.toLowerCase().includes(searchLower) ||
            item.HOTEN?.toLowerCase().includes(searchLower)
        );
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
    };

    const handlePrevPage = () => {
        if (Trang > 1) setTrang(prev => prev - 1);
    };

    const handleNextPage = () => {
        if (Trang < key?.totalPages) setTrang(prev => prev + 1);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[300px] w-full gap-4">
                <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                <p className="text-gray-500 font-bold uppercase">Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden custom-scrollbar">
            <div className="flex-1 flex flex-col overflow-hidden custom-scrollbar">
                
                <header className="flex justify-between items-center p-6 bg-white border-b shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-700">
                        <i className="fa-solid fa-clipboard-list text-blue-600 mr-2"></i> Quản Lý Phiếu Nhập
                    </h1>
                    <Link to='themPhieuNhap' className="bg-teal-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 transition">
                        <i className="fa-solid fa-plus"></i> Tạo phiếu nhập mới
                    </Link>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 custom-scrollbar">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
                            <p className="text-sm text-gray-500 uppercase font-bold">Tổng nhập (Tháng { new Date().getMonth() + 1} / {new Date().getFullYear()})</p>
                            <p className="text-2xl font-bold text-blue-700 mt-1">{formatCurrency(ThongKe.TongTien)}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
                            <p className="text-sm text-gray-500 uppercase font-bold">Đã thanh toán (Tháng { new Date().getMonth() + 1} / {new Date().getFullYear()})</p>
                            <p className="text-2xl font-bold text-green-700 mt-1">{formatCurrency(ThongKe.DaThanhToan)}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-red-500">
                            <p className="text-sm text-gray-500 uppercase font-bold">Nợ Nhà Cung Cấp (Tháng { new Date().getMonth() + 1} / {new Date().getFullYear()})</p>
                            <p className="text-2xl font-bold text-red-600 mt-1">{formatCurrency(ThongKe.No)}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                            <div className="md:col-span-12">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm nhanh trên trang này</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:ring-teal-500 focus:border-teal-500" 
                                        placeholder="Nhập mã phiếu, tên nhà cung cấp hoặc người nhập..." 
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow overflow-hidden custom-scrollbar">
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                                    <tr>
                                        <th className="px-6 py-3">Mã Phiếu</th>
                                        <th className="px-6 py-3">Nhà Cung Cấp</th>
                                        <th className="px-6 py-3">Người Nhập</th>
                                        <th className="px-6 py-3 text-right">Tổng Tiền</th>
                                        <th className="px-6 py-3 text-center">Trạng Thái</th>
                                        <th className="px-6 py-3 text-center">Hành Động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredPhieuNhap.length > 0 ? (
                                        filteredPhieuNhap.map((item, index) => (
                                            <tr className="bg-white hover:bg-gray-50" key={index}>
                                                <td className="px-6 py-4 font-bold text-blue-600">{item.IDPN}</td>
                                                <td className="px-6 py-4">{item.TENNCC}</td>
                                                <td className="px-6 py-4">{item.HOTEN}</td>
                                                <td className="px-6 py-4 text-right font-bold">{formatCurrency(item.TONGTIEN)}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.TRANGTHAI === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {item.TRANGTHAI === 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <Link to={`ChiTiet/${item.IDPN}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                                                        Xem chi tiết <i className="fas fa-arrow-right ml-1"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-4 text-center font-bold">Không tìm thấy dữ liệu phù hợp!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex-1 flex justify-between items-center">
                                <p className="text-sm text-slate-700">
                                    Dữ liệu trang {key?.currentPage} / {key?.totalPages}
                                </p>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    <button disabled={Trang === 1} onClick={handlePrevPage} className="px-2 py-2 rounded-l-md border border-slate-300 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50">
                                        <i className="fa-solid fa-chevron-left"></i>
                                    </button>
                                    <span className="px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700">{Trang}</span>
                                    <button disabled={Trang >= key?.totalPages} onClick={handleNextPage} className="px-2 py-2 rounded-r-md border border-slate-300 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50">
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default PhieuNhapHang;