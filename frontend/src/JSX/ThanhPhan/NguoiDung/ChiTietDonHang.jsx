import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Thêm useNavigate
import * as API from '../../../JS/API/API';

function ChiTietDonHang() {
    const { id } = useParams();
    const navigate = useNavigate(); // Khởi tạo hook điều hướng
    const [ThongTin_KhachHang, setThongTin_KhachHang] = useState({});
    const [ThongTin_SanPham, setThongTin_SanPham] = useState([]);
    const [TrangThai, setTrangThai] = useState('');
    const [err, seterr] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            try {
                const [response, price] = await Promise.all([
                    API.CallAPI(undefined, { url: `/NguoiDung/chitiet_donhang?id=${id}`, PhuongThuc: 2 }),
                    API.CallAPI(undefined, { url: `/NguoiDung/ThongTin_DonHang?id=${id}`, PhuongThuc: 2 })
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
                seterr('Lỗi kết nối hệ thống');
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [id]);

    if (loading) return <div className="text-center py-20 italic">Đang tải dữ liệu...</div>;
    if (err) return <div className="text-center py-20 text-red-500 font-bold">{err}</div>;

    return (
        <>
            <div className="max-w-5xl mx-auto space-y-6 pb-10">
                
                {/* Nút quay lại nằm trên cùng */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors font-medium text-sm group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Quay lại lịch sử đơn hàng
                </button>

                {/* Header đơn hàng */}
                <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-black text-gray-800">Đơn hàng #{id || '88293'}</h1>
                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase">
                                {TrangThai || 'Đang xử lý'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Đặt lúc: 14:20 - 16/04/2026</p>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex gap-3">
                        <Link to={`/nguoi-dung/lich-su-mua/hoadon/${id}`} className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                            Xem hóa đơn
                        </Link>
                        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
                            Liên hệ hỗ trợ
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Cột trái: Vận chuyển & Sản phẩm */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Lịch trình vận chuyển (Giữ nguyên giao diện của bạn) */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </span>
                                Lịch trình vận chuyển
                            </h2>
                            <div className="relative ml-4">
                                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-100"></div>
                                <div className="space-y-8">
                                    <div className="relative pl-8">
                                        <div className="absolute left-[-5px] top-1.5 w-3 h-3 bg-green-500 rounded-full ring-4 ring-green-50"></div>
                                        <p className="text-sm font-bold text-gray-800">Đơn hàng đã được xác nhận</p>
                                        <p className="text-xs text-gray-500 mt-1">14:30 - 16/04/2026 | Admin đã duyệt</p>
                                    </div>
                                    <div className="relative pl-8">
                                        <div className="absolute left-[-5px] top-1.5 w-3 h-3 bg-indigo-600 rounded-full ring-4 ring-indigo-50 animate-pulse"></div>
                                        <p className="text-sm font-bold text-indigo-600">Đang giao hàng</p>
                                        <p className="text-xs text-gray-500 mt-1">Shipper đang trên đường đến bạn.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Danh sách sản phẩm chi tiết */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-50">
                                <h2 className="text-lg font-bold text-gray-800">Chi tiết sản phẩm</h2>
                            </div>
                            <div className="divide-y divide-gray-100 px-6">
                                {ThongTin_SanPham.map((item, index) => (
                                    <div key={index} className="py-6 flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img src={item.HinhAnh || "https://via.placeholder.com/80"} className="w-20 h-20 object-cover rounded-xl border border-gray-100" />
                                            <div className="ml-4">
                                                <h3 className="text-sm font-bold text-gray-800">{item.TenSanPham}</h3>
                                                <p className="text-xs text-gray-500 mt-1">Phân loại: {item.MauSac || 'Mặc định'}</p>
                                                <p className="text-xs text-indigo-600 font-bold mt-1">SL: x{item.SoLuong}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-gray-900">{item.Gia?.toLocaleString()}đ</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cột phải: Khách hàng & Thanh toán */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Địa chỉ giao hàng</h2>
                            <div className="flex items-start gap-3">
                                <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{ThongTin_KhachHang.HoTen || 'Đang cập nhật'}</p>
                                    <p className="text-sm text-gray-600 mt-1">{ThongTin_KhachHang.SDT}</p>
                                    <p className="text-sm text-gray-500 mt-2 leading-relaxed italic">{ThongTin_KhachHang.DiaChi}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tổng thanh toán */}
                        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
                            <h2 className="text-lg font-bold mb-6">Thanh toán</h2>
                            <div className="space-y-4 text-sm text-slate-400">
                                <div className="flex justify-between">
                                    <span>Tạm tính</span>
                                    <span>{ThongTin_KhachHang.TongTien?.toLocaleString()}đ</span>
                                </div>
                                <div className="flex justify-between border-t border-slate-700 pt-4">
                                    <span className="font-bold text-white">Tổng cộng</span>
                                    <span className="text-2xl font-black text-yellow-400">{ThongTin_KhachHang.TongTien?.toLocaleString()}đ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChiTietDonHang;