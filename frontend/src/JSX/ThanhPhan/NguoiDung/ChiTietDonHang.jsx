import { useState ,useEffect } from "react";
import { useParams ,Link } from "react-router-dom";
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';
function ChiTietDonHang() {
    const { id } = useParams();
    const [ThongTin_KhachHang, setThongTin_KhachHang] = useState({});
    const [ThongTin_SanPham, setThongTin_SanPham] = useState([]);
    const [TrangThai, setTrangThai] = useState('');
    const [err, seterr] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            try {
                const [response , price] = await Promise.all([
                    API.CallAPI(undefined, {url:`/NguoiDung/chitiet_donhang?id=${id}` , PhuongThuc:2}),
                    API.CallAPI(undefined, {url:`/NguoiDung/ThongTin_DonHang?id=${id}` , PhuongThuc:2})
                ]);
                 if (response.ThanhCong) {
                    setThongTin_KhachHang(response.ThongTin_KhachHang);
                    setThongTin_SanPham(response.ThongTin_SanPham);
                    setTrangThai(response.TrangThai);
                } else {
                    seterr('Không thể tải chi tiết đơn hàng');
                }

            } catch (error) {
                console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [id]);
    if (err) {
        return (
<div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-slate-50/50">
  <div className="max-w-md w-full text-center">
    {/* Phần Icon minh họa - Tạo điểm nhấn */}
    <div className="relative mb-8 flex justify-center">
      <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50 scale-150"></div>
      <div className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-red-200/50 border border-red-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
    </div>

    {/* Nội dung thông báo */}
    <div className="space-y-4 mb-10">
      <h1 className="text-3xl font-black tracking-tight text-slate-900">
        Rất tiếc, đã có lỗi xảy ra!
      </h1>
      <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 shadow-sm">
        <p className="text-slate-600 font-medium italic">
          "{err || "Không thể tải thông tin đơn hàng này"}"
        </p>
      </div>
      <p className="text-slate-500 text-sm leading-relaxed px-6">
        Chúng tôi xin lỗi vì sự bất tiện này. Bạn có thể thử tải lại trang hoặc quay lại danh sách đơn hàng.
      </p>
    </div>

    {/* Nút hành động */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link 
        to="/nguoi-dung/lich-su-mua" 
        className="flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-blue-600 shadow-lg shadow-slate-200 hover:shadow-blue-200 transition-all duration-300 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Quay lại đơn hàng
      </Link>
      
      <button 
        onClick={() => window.location.reload()}
        className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors px-6 py-3"
      >
        Thử lại
      </button>
    </div>
  </div>
</div>
        );
    }
    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 bg-slate-50/50">
                <div className="max-w-md w-full text-center">
                    <div className="relative mb-8 flex justify-center">
                        <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 scale-150"></div>
                        <div className="relative bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-blue-200/50 border border-blue-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m0 8v1m0 8v1m4-9h1M4 12H3m15.364 6l-.707-.707M6.343 6
l-.707-.707m12.728 0l-.707.707M6.343 18l-.707.707" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">
                        Đang tải chi tiết đơn hàng...
                    </h1>
                    <p className="text-slate-500 text-sm leading-relaxed mt-4">
                        Vui lòng chờ trong giây lát.
                    </p>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="max-w-4xl mx-auto py-10 px-4">
                {/* Nút quay lại */}
                <Link to="/nguoi-dung/lich-su-mua" className="flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-6 group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Quay lại danh sách đơn hàng
                </Link>

                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    {/* Header */}
                    <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-slate-900">Đơn hàng #{id}</h1>
                            <p className="text-slate-500 text-sm mt-1 font-medium">Đặt ngày {fun.formatDate(ThongTin_KhachHang.NGAYDAT)} lúc {fun.formatTime(ThongTin_KhachHang.NGAYDAT)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            {
                                TrangThai === 1 ? (
                                    <span className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-black uppercase tracking-widest border border-green-100">
                                        Đã xác nhận
                                    </span>
                                ) : TrangThai === 2 ? (
                                    <span className="px-4 py-2 bg-yellow-50 text-yellow-700 rounded-xl text-xs font-black uppercase tracking-widest border border-yellow-100">
                                        Đã hủy đơn hàng
                                    </span>
                                ) : (
                                    <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-black uppercase tracking-widest border border-blue-100">
                                        Đang vận chuyển
                                    </span>
                                )
                            }
                        </div>
                    </div>

                    {/* Stepper (Trạng thái) */}
                    <div className="p-8 bg-slate-50/50">
                        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
                            <div className="hidden md:block absolute top-1/2 left-0 w-2/3 h-0.5 bg-blue-600 -translate-y-1/2 z-0"></div>

                            {/* Bước 1 */}
                            <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 bg-slate-50 md:bg-transparent pr-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                                <div className="md:text-center">
                                    <p className="text-sm font-bold text-slate-900">Đã xác nhận</p>
                                    <p className="text-[11px] text-slate-500 font-medium">10:30, 01/01</p>
                                </div>
                            </div>

                            {/* Bước 2 */}
                            <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 bg-slate-50 md:bg-transparent pr-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                </div>
                                <div className="md:text-center">
                                    <p className="text-sm font-bold text-slate-900">Đang đóng gói</p>
                                    <p className="text-[11px] text-slate-500 font-medium">14:20, 01/01</p>
                                </div>
                            </div>

                            {/* Bước 3 */}
                            <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 bg-slate-50 md:bg-transparent pr-4">
                                <div className="w-12 h-12 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center shadow-xl shadow-blue-100 animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="1" y="3" width="15" height="13" stroke="none" />
                                        <path d="M10 17h4V5H2v12h3m4 0h2"/><circle cx="7" cy="17" r="2"/><path d="M15 17h2l3-3v-5h-5v8z"/><circle cx="18" cy="17" r="2"/>
                                    </svg>
                                </div>
                                <div className="md:text-center">
                                    <p className="text-sm font-extrabold text-blue-600 underline decoration-2 underline-offset-4">Đang vận chuyển</p>
                                    <p className="text-[11px] text-blue-500 font-bold">Dự kiến tới: 03/01</p>
                                </div>
                            </div>

                            {/* Bước 4 */}
                            <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 bg-slate-50 md:bg-transparent pr-4">
                                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.5 8.5L8 10l-6 6"/><path d="M16 7h6v6"/></svg>
                                </div>
                                <div className="md:text-center">
                                    <p className="text-sm font-bold text-slate-400">Giao thành công</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid Thông tin */}
                    <div className="p-8 grid md:grid-cols-2 gap-8 border-b border-slate-100">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">📍 Địa chỉ nhận hàng</h3>
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <p className="font-bold text-slate-900 mb-1 text-lg"> {ThongTin_KhachHang.TEN_NGUOINHAN}</p>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {ThongTin_KhachHang.SDT_NGUOINHAN}<br />
                                   {ThongTin_KhachHang.DIACHI_GIAOHANG}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">🚚 Đơn vị vận chuyển</h3>
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">🚀</div>
                                    <div>
                                        <p className="font-bold text-slate-900">Giao Hàng Nhanh (GHN)</p>
                                        <p className="text-xs text-blue-600 font-bold">Mã vận đơn: GHN-99228833</p>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 flex items-center gap-2 italic">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> 
                                    Đã rời kho phân loại TP. HCM - 02/01
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sản phẩm */}
                    <div className="p-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">🛒 Sản phẩm</h3>
                        <div className="space-y-4">
                            {
                                ThongTin_SanPham.map((sanpham, index) => (
                                    <Link to={`/chi-tiet-san-pham/${sanpham.IDSANPHAM}`} key={index} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <img src={`http://localhost:3001/${sanpham.HINHANH}`} alt={sanpham.TENSANPHAM} className="w-16 h-16 object-cover rounded-lg" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-900">{sanpham.TENSANPHAM}</h4>
                                            <p className="text-sm text-slate-500">Số lượng: {sanpham.SOLUONG}</p>
                                            <p className="text-lg font-bold text-slate-900">{fun.formatCurrency(sanpham.DONGIA * sanpham.SOLUONG)}</p>
                                        </div>
                                       <i className="text-slate-400"></i>
                                    </Link>
                                ))

                            }
            
                        </div>

                        {/* Tổng thanh toán */}
                        <div className="mt-8 pt-6 border-t border-dashed border-slate-200 space-y-3">
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Tạm tính</span>
                                <span>32.000.000đ</span>
                            </div>
                            <div className="flex justify-between text-slate-500 font-medium">
                                <span>Phí vận chuyển</span>
                                <span>30.000đ</span>
                            </div>
                            <div className="flex justify-between text-xl font-black text-slate-900 pt-2">
                                <span>Tổng thanh toán</span>
                                <span className="text-blue-600">32.030.000đ</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-8 bg-slate-50/80 flex flex-wrap gap-4 justify-end">
                        <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all">
                            Yêu cầu hỗ trợ
                        </button>
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95 transition-all">
                            Liên hệ người giao hàng
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChiTietDonHang;