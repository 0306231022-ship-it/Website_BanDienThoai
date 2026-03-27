import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../../../JS/API/API';
import * as fun from '../../../../JS/FUNCTONS/function';
function DonHang(){
    const [donhang, setDonHang] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState({
        iddh: '',
        tennguoidat: '',
        trangthai: ''
    });
    useEffect(() => {
        const fetchDonHang = async () => {
            setLoading(true);
            try {
                const ketqua = await API.CallAPI(undefined,{url:`/admin/danhsachdonhang?page=${page}`, PhuongThuc:2});
                // alert(JSON.stringify(ketqua));
                if(ketqua.ThanhCong){
                    setDonHang(ketqua.dulieu);
                    setTotalPages(ketqua.tongso);
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchDonHang();
    }, [page]);
    const Loc = async() => {
        setLoading(true);
        try {
            const TimKiem = await API.CallAPI(undefined ,{ url :`/admin/TimKiem_donhang?iddh=${filter.iddh}&tennguoidat=${filter.tennguoidat}&trangthai=${filter.trangthai}` , PhuongThuc:2});
            if(TimKiem.ThanhCong){
                setDonHang(TimKiem.dulieu);
                setTotalPages(TimKiem.tongso);
            }else{
                setDonHang([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error('Lỗi khi lọc dữ liệu đơn hàng:', error);
        } finally { 
            setLoading(false);
        }
    };

    return(
        <>
  <div className="min-h-screen bg-gray-50 p-8">
    <div className="max-w-7xl mx-auto">
        
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
                <p className="text-sm text-gray-500">Theo dõi và xử lý các đơn hàng từ người dùng</p>
            </div>
            
            <button onClick={() => window.location.reload()} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Làm mới (Reset)
            </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Mã đơn hàng</label>
                    <input onChange={(e) => {
  setFilter(p => ({
    ...p,
    iddh: e.target.value
  }));
}}
 type="text" placeholder="Ví dụ: #DH123" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tên người đặt</label>
                    <input onChange={(e) => {
  setFilter(p => ({
    ...p,
    tennguoidat: e.target.value
  }));
}}
 type="text" placeholder="Nhập tên khách hàng..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Trạng thái</label>
                    <select onChange={(e) => {
  setFilter(p => ({
    ...p,
    trangthai: e.target.value
  }));
}}  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                        <option value="">Tất cả trạng thái</option>
                        <option value={0}>Chờ xác nhận</option>
                        <option value={1}>Đang giao hàng</option>
                        <option value={2}>Đã hoàn thành</option>
                        <option value={3}>Đã hủy</option>
                    </select>
                </div>

                <div className="flex items-end">
                    <button onClick={Loc} className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Lọc ngay
                    </button>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">IDDH</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Họ tên người đặt</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Ngày đặt</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Trạng thái</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {
                            loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Đang tải dữ liệu...</td>
                                </tr>
                            ) : (
                                donhang.length > 0 ? (
                                    donhang.map((dh, index) => (
                                                <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-6 py-4 font-bold text-blue-600">#{dh.IDDH}</td>
                            <td className="px-6 py-4 font-semibold text-gray-900">{dh.TEN_NGUOINHAN}</td>
                            <td className="px-6 py-4 text-gray-600 italic">{fun.formatDate(dh.NGAYDAT)} lúc {fun.formatTime(dh.NGAYDAT)}</td>
                            <td className="px-6 py-4 text-center">
                                {
                                    dh.TRANGTHAI === 0 ? (
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-black uppercase rounded-full">Chờ xử lý</span>
                                    ) : dh.TRANGTHAI === 1 ? (
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-full">Đã xử lý</span>
                                    ) : dh.TRANGTHAI === 2 ? (
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-full">Đã hoàn thành</span>
                                    ) : (
                                        <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase rounded-full">Đã hủy</span>
                                    )
                                }
                            </td>
                            <td className="px-6 py-4 text-right">
                                 <Link to={`ChiTiet/${dh.IDDH}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                                     Xem chi tiết <i className="fas fa-arrow-right ml-1"></i>
                                </Link>
                            </td>
                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="5" className="px-6 py-20">
        <div className="flex flex-col items-center justify-center">
            {/* Icon minh họa túi hàng trống */}
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-gray-200">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            </div>
            
            {/* Thông báo chính */}
            <h3 className="text-lg font-bold text-gray-900">Không tìm thấy đơn hàng</h3>
            <p className="text-sm text-gray-500 max-w-xs text-center mt-1">
                Hiện tại hệ thống chưa ghi nhận đơn hàng nào phù hợp với điều kiện tìm kiếm của bạn.
            </p>

            {/* Nút hỗ trợ nhanh (Tùy chọn) */}
            <button 
                onClick={() => window.location.reload()} // Hoặc hàm reset filter của bạn
                className="mt-6 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
            >
                Làm mới danh sách
            </button>
        </div>
    </td> 
                                    </tr>
                                )
                            )
                        }
            
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm text-gray-500">Hiển thị <b>{(page - 1) * 10 + 1}-{Math.min(page * 10, totalPages)}</b> trong tổng số <b>{totalPages}</b> đơn hàng</span>
                <div className="flex gap-1">
                    <button onClick={()=>{setPage(p=>p-1)}}  disabled={page === 1}  className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-400 disabled:opacity-50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold rounded-lg text-sm transition-colors">{page}</button>
                    <button onClick={()=>{setPage(p=>p+1)}} disabled={page === Math.ceil(totalPages/10)} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
        </>
    );
};
export default DonHang;