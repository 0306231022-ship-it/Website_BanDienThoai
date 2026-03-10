import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as API from '../../../../JS/API/API';
import '../../../../CSS/ThanhCuon.css';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';
import * as fun from '../../../../JS/FUNCTONS/function';

function PhieuNhapHang() {
    const [Trang, setTrang] = useState(1);
    const [PhieuNhap, setPhieuNhap] = useState([]);
    const [key, setkey] = useState(null);
    const [loading, setloading] = useState(false);
    const [ThongKe, setThongKe] = useState({});
    useEffect(() => {
        const LayThongKe = async () => {
            setloading(true);
            try {
                const ketqua = await API.CallAPI(undefined, { url: '/admin/laythongke_phieunhap', PhuongThuc: 2 });
                if (ketqua.ThanhCong) {
                    setThongKe(ketqua.DuLieu);
                }
            } catch (error) {
                console.error('Có lỗi xảy ra :' + error);
                ThongBao.ThongBao_CanhBao('Không thể lấy được thống kê phiếu nhập!');
            } finally {
                setloading(false);
            }
        };
        LayThongKe();
    }, []);
    const [Run, setRun] = useState(false);
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
    }, [Trang, Run]);

    const handlePrevPage = () => {
        if (Trang > 1) setTrang(prev => prev - 1);
    };
    const handleNextPage = () => {
        if (Trang < key?.totalPages) setTrang(prev => prev + 1);
    };
     // 1. THÊM STATE ĐỂ LƯU TỪ KHÓA TÌM KIẾM
    const [searchTerm, setSearchTerm] = useState({
        idpn: '',
        ncc: '',
        nguoNhap: ''
    });
    // lấy dl nhà cung cấp và người nhập phiếu nhập để hiển thị trong bộ lọc
    const [danhSachNCC, setDanhSachNCC] = useState([]);
    const [danhSachNguoiNhap, setDanhSachNguoiNhap] = useState([]);
    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const [nccResult, nguoiNhapResult] = await Promise.all([
                    API.CallAPI(undefined, { url: '/admin/layTTnhacchoatdong', PhuongThuc: 2 }),
                    API.CallAPI(undefined, { url: '/admin/getTT_users', PhuongThuc: 2 })
                ]);
                if (nccResult.ThanhCong) setDanhSachNCC(nccResult.DuLieu);
                if (nguoiNhapResult.ThanhCong) setDanhSachNguoiNhap(nguoiNhapResult.DuLieu);
            }
            catch (error) {
                console.error('Lỗi khi lấy dữ liệu bộ lọc:', error);
            }
        }
        fetchFilterData();
    }, []);
    const  filterPhieuNhap = async() => {
        setloading(true);
        try {
            const ketqua = await API.CallAPI(undefined, { url: `/admin/timkiem_phieunhap?idncc=${searchTerm.ncc}&idnd=${searchTerm.nd}&idpn=${searchTerm.idpn}`, PhuongThuc: 2 });
            if (ketqua.ThanhCong) {
                setPhieuNhap(ketqua.DuLieu);
            }
        } catch (error) {
            console.error('Lỗi khi lọc dữ liệu:', error);
        } finally {
            setloading(false);
        }
    }
    const Reset = async()=>{
        setSearchTerm({
            idpn: '',
            ncc: '',
            nguoNhap: ''
        });
        setRun(prev=>!prev);
    }
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
                    <Link to='themPhieuNhap' className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded shadow flex items-center gap-2 transition">
                        <i className="fa-solid fa-plus"></i> Tạo phiếu nhập mới
                    </Link>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 custom-scrollbar">
                    
                    {/* Thống kê */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
                            <p className="text-sm text-gray-500 uppercase font-bold">Tổng nhập (Tháng { new Date().getMonth() + 1} / {new Date().getFullYear()})</p>
                            <p className="text-2xl font-bold text-blue-700 mt-1">{fun.formatCurrency(ThongKe.TongTien || 0)}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
                            <p className="text-sm text-gray-500 uppercase font-bold">Đã thanh toán (Tháng { new Date().getMonth() + 1} / {new Date().getFullYear()})</p>
                            <p className="text-2xl font-bold text-green-700 mt-1">{fun.formatCurrency(ThongKe.DaThanhToan || 0)}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-5 border-l-4 border-red-500">
                            <p className="text-sm text-gray-500 uppercase font-bold">Nợ Nhà Cung Cấp (Tháng { new Date().getMonth() + 1} / {new Date().getFullYear()})</p>
                            <p className="text-2xl font-bold text-red-600 mt-1">{fun.formatCurrency(ThongKe.No || 0)}</p>
                        </div>
                    </div>

                    <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
    <h3 class="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center">
        <i class="fa-solid fa-filter text-teal-600 mr-2"></i> Bộ lọc tìm kiếm
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        
        <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5">Mã phiếu (IDPN)</label>
            <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i class="fa-solid fa-hashtag text-gray-400"></i>
                </span>
                <input 
                        onChange={(e) => setSearchTerm(prev => ({ ...prev, idpn: e.target.value }))}
                    type="text"
                    class="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all placeholder:text-gray-400" 
                    placeholder="Nhập mã phiếu..." 
                />
            </div>
        </div>

        <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5">Nhà cung cấp</label>
            <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i class="fa-solid fa-truck text-gray-400"></i>
                </span>
                <select onChange={(e)=>{setSearchTerm(prev=>{
                    return {
                        ...prev,
                        ncc:e.target.value
                    }
                })}} class="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-8 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all appearance-none cursor-pointer">
                    <option value="">-- Tất cả nhà cung cấp --</option>
                    {danhSachNCC.map(ncc => (
                        <option key={ncc.IDNCC} value={ncc.IDNCC}>{ncc.TENNCC}</option>
                    ))}
                </select>
                <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i class="fa-solid fa-chevron-down text-gray-400 text-xs"></i>
                </span>
            </div>
        </div>

        <div>
            <label class="block text-xs font-semibold text-gray-600 mb-1.5">Người nhập</label>
            <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i class="fa-solid fa-user text-gray-400"></i>
                </span>
                <select onChange={(e)=>{setSearchTerm(prev=>{
                    return {
                        ...prev,
                        nd:e.target.value
                    }
                })}} class="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-9 pr-8 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all appearance-none cursor-pointer">
                    <option value="">-- Tất cả người nhập --</option>
                    {danhSachNguoiNhap.map(nd => (
                        <option key={nd.IDND} value={nd.IDND}>{nd.HOTEN}</option>
                    ))}
                </select>
                <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <i class="fa-solid fa-chevron-down text-gray-400 text-xs"></i>
                </span>
            </div>
        </div>

        <div class="flex space-x-2">
            <button onClick={Reset} class="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-lg border border-gray-300 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm">
                <i class="fa-solid fa-rotate-left"></i> Quay lại
            </button>
            <button onClick={filterPhieuNhap} class="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-sm">
                <i class="fa-solid fa-magnifying-glass"></i> Lọc
            </button>
        </div>
        
    </div>
</div>

                    {/* Bảng Dữ Liệu */}
                    <div className="bg-white rounded-lg shadow overflow-hidden custom-scrollbar mb-6">
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
                                    {/* 4. SỬ DỤNG MẢNG ĐÃ ĐƯỢC LỌC THAY VÌ MẢNG GỐC */}
                                    {PhieuNhap.length > 0 ? (
                                        PhieuNhap.map((item, index) => (
                                            <tr className="bg-white hover:bg-gray-50 transition-colors" key={item.IDPN || index}>
                                                <td className="px-6 py-4 font-bold text-blue-600">{item.IDPN}</td>
                                                <td className="px-6 py-4">{item.TENNCC}</td>
                                                <td className="px-6 py-4">{item.HOTEN}</td>
                                                <td className="px-6 py-4 text-right font-bold">{fun.formatCurrency(item.TONGTIEN)}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.TRANGTHAI === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {item.TRANGTHAI === 1 ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <Link to={`ChiTiet/${item.IDPN}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg inline-flex items-center gap-1 transition-colors">
                                                        Xem chi tiết <i className="fas fa-arrow-right text-xs"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <i className="fa-solid fa-box-open text-3xl text-gray-300"></i>
                                                    <p>Không tìm thấy dữ liệu phù hợp!</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination giữ nguyên */}
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex-1 flex justify-between items-center">
                                <p className="text-sm text-slate-700">
                                    Dữ liệu trang <span className="font-bold">{key?.currentPage}</span> / <span className="font-bold">{key?.totalPages}</span>
                                </p>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    <button disabled={Trang === 1} onClick={handlePrevPage} className="px-2 py-2 rounded-l-md border border-slate-300 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-colors">
                                        <i className="fa-solid fa-chevron-left"></i>
                                    </button>
                                    <span className="px-4 py-2 border-y border-slate-300 bg-white text-sm font-medium text-slate-700">{Trang}</span>
                                    <button disabled={Trang >= key?.totalPages} onClick={handleNextPage} className="px-2 py-2 rounded-r-md border border-slate-300 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-50 transition-colors">
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