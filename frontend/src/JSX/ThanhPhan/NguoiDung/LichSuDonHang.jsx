import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as API from '../../../JS/API/API';
import {KiemTra  , LayThongTinNguoiDung  } from '../../../hook/KiemTraDangNhap';
import * as fun from '../../../JS/FUNCTONS/function';
import * as ThongBao from '../../../JS/FUNCTONS/ThongBao';
import { useModalContext } from "../../../CONTEXT/QuanLiModal"; 

function LichSuDonHang() {
    const [page , setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const { OpenMoDal } = useModalContext();
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const loggedIn = await KiemTra();
                if (!loggedIn) {
                    ThongBao.ThongBao_ThongTin("Vui lòng đăng nhập để xem lịch sử đơn hàng.");
                    return;
                } else {
                    const userInfo = await LayThongTinNguoiDung();
                    const response = await API.CallAPI(undefined, { url: `/NguoiDung/DanhSach_DonHang?page=${page}&IDND=${userInfo.IDND}`, PhuongThuc: 2 });
                    if (response.ThanhCong) {
                        setOrders(response.dulieu);
                    }else {
                        setError("Không thể tải đơn hàng. Vui lòng thử lại sau.");
                    }
                }
               
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [page]);
    
    const allOrders = [
        { id: "TECH2025-001", date: "01/01/2026", status: "dagiao", statusText: "Đã giao hàng", total: "2.500.000đ" },
        { id: "TECH2025-002", date: "02/01/2026", status: "dangxuly", statusText: "Đang xử lý", total: "1.200.000đ" },
        { id: "TECH2025-003", date: "03/01/2026", status: "dahuy", statusText: "Đã hủy", total: "500.000đ" },
        { id: "TECH2025-004", date: "04/01/2026", status: "dagiao", statusText: "Đã giao hàng", total: "3.100.000đ" },
        { id: "TECH2025-005", date: "05/01/2026", status: "dagiao", statusText: "Đã giao hàng", total: "950.000đ" },
        { id: "TECH2025-006", date: "06/01/2026", status: "dangxuly", statusText: "Đang xử lý", total: "4.200.000đ" },
    ];

    const [tab, setTab] = useState('tatca');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const filteredOrders = tab === 'tatca' 
        ? allOrders 
        : allOrders.filter(order => order.status === tab);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  
    useEffect(() => { setCurrentPage(1); }, [tab]);

    // Các Icon SVG nội bộ
    const Icons = {
        Package: () => (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
        ),
        ChevronLeft: () => (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        ),
        ChevronRight: () => (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        )
    };

    const getStatusTheme = (status) => {
        switch (status) {
            case 'dagiao': return 'bg-green-50 text-green-700 border-green-200';
            case 'dangxuly': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'dahuy': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 font-bold">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] py-10 px-4 font-sans text-slate-900">
            <div className="max-w-4xl mx-auto">
                
                {/* Tiêu đề & Thống kê nhanh */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-800">Lịch sử đơn hàng</h1>
                        <p className="text-slate-500 font-medium">Bạn có tổng cộng {allOrders.length} đơn hàng đã thực hiện</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200 text-sm font-bold">
                            📦 {allOrders.filter(o => o.status === 'dagiao').length} Thành công
                        </div>
                    </div>
                </div>

                {/* Card chính */}
                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                    
                    {/* Tabs Navigation dạng Chip */}
                    <div className="flex p-3 gap-2 bg-slate-50/50 border-b border-slate-100 overflow-x-auto">
                        {['tatca', 'dangxuly', 'dagiao', 'dahuy'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                    tab === t 
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-100" 
                                    : "text-slate-500 hover:bg-white hover:text-slate-800"
                                }`}
                            >
                                {t === 'tatca' ? 'Tất cả' : t === 'dangxuly' ? 'Đang xử lý' : t === 'dagiao' ? 'Đã giao' : 'Đã hủy'}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 md:p-8">
                        {/* Danh sách đơn hàng */}
                        <div className="space-y-4 min-h-[350px]">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <div key={order.id} className="group border border-slate-100 rounded-2xl p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="flex gap-4 items-center">
                                                <div className="hidden sm:flex h-12 w-12 items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 text-blue-600">
                                                    <Icons.Package />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="text-lg font-extrabold tracking-tight">#{order.IDDH}</span>
                                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getStatusTheme(order.status)}`}>
                                                            {order.TRANGTHAI_DONHANG === 1 ? 'Đã xác nhận' : order.TRANGTHAI_DONHANG === 2 ? 'Đã hủy' : 'Đang chờ xác nhận'}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-slate-500 font-medium">
                                                        📅 {fun.formatDate(order.NGAYDAT) + ' Lúc ' + fun.formatTime(order.NGAYDAT)} <span className="mx-2 text-slate-200">|</span> 
                                                        Tổng cộng: <span className="text-slate-900 font-bold">{fun.formatCurrency(order.THANHTIEN_DONHANG)}</span>
                                                    </div>
                                                    {order.GHICHU && (
  <div className="flex items-start gap-3 p-3 mt-2 rounded-lg bg-blue-50 border border-blue-100">
    <div className="mt-0.5">
      {/* Icon Bell (Chuông) */}
      <svg className="w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    </div>
    <div className="text-sm text-blue-800">
      <span className="font-bold">Lưu ý đơn hàng:</span> {order.GHICHU}
    </div>
  </div>
)}
                                                      
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                                                <Link 
                                                    to={`/nguoi-dung/lich-su-mua/chi-tiet/${order.IDDH}`} 
                                                    className="flex-1 md:flex-none text-center px-5 py-2.5 text-sm font-bold bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                                                >
                                                    Chi tiết
                                                </Link>
                                                {order.TRANGTHAI_DONHANG === 0 ? (
                                                    <button onClick={()=>{OpenMoDal({IDDH:order.IDDH}, {TenTrang:'HuyDon_NguoiDung'})}} className="flex-1 md:flex-none px-5 py-2.5 text-sm font-bold bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                                                        Hủy đơn
                                                    </button>
                                                ) : (
                                                    <button className="flex-1 md:flex-none px-5 py-2.5 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95">
                                                        Mua lại
                                                    </button>
                                                )}
                                            </div>
                                          
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 opacity-40">
                                    <Icons.Package />
                                    <p className="mt-2 font-bold uppercase tracking-widest text-xs">Trống</p>
                                </div>
                            )}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-10">
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-xl disabled:opacity-20 hover:bg-slate-50 transition-all"
                                >
                                    <Icons.ChevronLeft />
                                </button>
                                
                                <div className="flex gap-1">
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => setPage(index + 1)}
                                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                                                currentPage === index + 1 
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
                                                : "text-slate-500 hover:bg-slate-50"
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-xl disabled:opacity-20 hover:bg-slate-50 transition-all"
                                >
                                    <Icons.ChevronRight />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LichSuDonHang;