import { useParams, useNavigate } from "react-router-dom";
import * as API from '../../../../JS/API/API';
import { useState, useEffect } from "react";

function ChiTietPhieu() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [DuLieuCungCap, setDuLieuCungCap] = useState({});
    const [NguoiNhap, setNguoiNhap] = useState({});
    const [ThongTinPhieu, setThongTinPhieu] = useState({});
    const [ThanhToan, setThanhToan] = useState({});
    const [SanPham, setSanPham] = useState([]);
    const [loading, setloading] = useState(false);
    const [err, seterr] = useState('');

    const conNo = (Number(ThanhToan?.TONGTIEN || 0) - Number(ThanhToan?.DA_THANHTOAN || 0)).toLocaleString("vi-VN") + " ₫";

    useEffect(() => {
        const Laydata = async () => {
            setloading(true)
            try {
                if (!id) {
                    seterr('Không tồn tại id!');
                    return;
                }
                const KetQua = await API.CallAPI(undefined, { url: `/admin/ChiTietPhieuNhap?id=${id}`, PhuongThuc: 2 });
                if (KetQua && KetQua.ThanhCong) {
                    setDuLieuCungCap(KetQua.dulieu?.nhacungcap || {});
                    setNguoiNhap(KetQua.dulieu?.nguoidung || {});
                    setThongTinPhieu(KetQua.dulieu?.phieunhap || {});
                    setThanhToan(KetQua.dulieu?.thongtin_thanhtoan || {});
                    setSanPham(KetQua.dulieu?.sanpham || []);
                } else {
                    seterr(KetQua?.message || 'Không thể lấy dữ liệu từ server');
                }
            } catch (error) {
                console.error('Lỗi', error);
                seterr('Lỗi kết nối server');
            } finally {
                setloading(false);
            }
        };
        Laydata();
    }, [id])

    const Map=(obj)=> {
        switch (obj) {
            case 'HEDIEUHANH':
                return "Hệ điều hành";
            case 'MANHINH':
                return "Màn Hình";
            case 'RAM':
                return "RAM";
            case 'BONHOTRONG':
                return "Bộ nhớ trong";
            case 'PIN':
                return "Dung lượng Pin";
            case 'MAUSAC':
                return "Màu sắc";
            default:
                return "Không xác định";
        }
    }
    const parseThongSo = (jsonString) => {
     const thongSo = JSON.parse(jsonString);
     return Object.entries(thongSo)
         .map(([key, value]) => `${Map(key)}: ${value}`)
         .join(', ');
    }


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
                <div className="relative">
                    <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                </div>
                <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (err) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 text-center animate-fadeIn">
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 shadow-xl max-w-md">
                    <i className="fa-solid fa-triangle-exclamation text-7xl text-red-500 mb-6"></i>
                    <h3 className="text-xl font-extrabold text-gray-800 mb-2">Đã xảy ra lỗi!</h3>
                    <p className="text-red-600 font-medium mb-6">{err}</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-bold shadow-lg hover:bg-red-600 transition-all">Thử lại</button>
                        <button onClick={() => navigate(-1)} className="px-6 py-2.5 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all">Quay lại</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 no-print">
                <div>
                    <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-blue-600 flex items-center gap-1 text-sm mb-1">
                        <i className="fa-solid fa-arrow-left"></i> Quay lại
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Phiếu Nhập: <span className="text-blue-600">#{id}</span>
                        <span className="ml-2 text-sm font-medium bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded border border-yellow-200">
                            <i className="fa-solid fa-clock"></i> {ThongTinPhieu.TRANGTHAI === 0 ? "Chưa duyệt" : "Đã duyệt"}
                        </span>
                    </h1>
                    <p className="text-sm text-gray-500">
                        Ngày tạo: {ThongTinPhieu?.NGAYNHAP ? new Date(ThongTinPhieu.NGAYNHAP).toLocaleDateString("vi-VN") : "---"} 
                        {ThongTinPhieu?.NGAYNHAP && ` lúc ${new Date(ThongTinPhieu.NGAYNHAP).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`}
                    </p>
                </div>
                <div className="flex gap-2">
                    {
                        ThongTinPhieu.TRANGTHAI === 0 && (
                            <>
                              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-sm">
                                Duyệt phiếu
                            </button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-sm">
                                Hủy phiếu
                            </button>
                            </>
                        )
                    }
                    {ThongTinPhieu.TRANGTHAI === 1 && (
    <>
        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-50 flex items-center gap-2 transition-all">
            <i className="fa-solid fa-print"></i> 
            <span>In phiếu</span>
        </button>
        
        {Number(ThanhToan?.TONGTIEN) !== Number(ThanhToan?.DA_THANHTOAN) && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm flex items-center gap-2 transition-all active:scale-95">
                <i className="fa-solid fa-credit-card"></i>
                <span>Thanh toán thêm</span>
            </button>
        )}
    </>
)}
              
                  
                    
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden print-area">
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nhà cung cấp</h3>
                            <p className="font-bold text-lg text-gray-800">{DuLieuCungCap.TENNCC || "N/A"}</p>
                            <p className="text-sm text-gray-600"><i className="fa-solid fa-phone w-4"></i> {DuLieuCungCap.SDT || "---"}</p>
                            <p className="text-sm text-gray-600"><i className="fa-solid fa-map-location-dot w-4"></i> {DuLieuCungCap.DIACHI || "---"}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Thông tin người nhập</h3>
                            <p className="font-bold text-gray-800">{NguoiNhap.HOTEN || "N/A"} (Kho)</p>
                            <p className="text-sm text-gray-600">ID: {NguoiNhap.IDND || "---"}</p>
                            <div className="mt-2 text-sm bg-blue-50 text-blue-800 p-2 rounded border border-blue-100 italic">
                                "Ghi chú: {ThongTinPhieu.GHICHU || "Không có ghi chú"}"
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-600">Tổng tiền:</span>
                                <span className="font-bold">{Number(ThanhToan?.TONGTIEN || 0).toLocaleString("vi-VN")} ₫</span>
                            </div>
                            <div className="flex justify-between mb-1 text-green-600">
                                <span>Đã thanh toán:</span>
                                <span className="font-bold">- {Number(ThanhToan?.DA_THANHTOAN || 0).toLocaleString("vi-VN")} ₫</span>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between text-red-600 text-lg font-bold">
                                <span>Còn nợ:</span>
                                <span>{conNo}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-0 overflow-x-auto">
                    <h3 className="p-6 pb-2 text-lg font-bold text-gray-800 border-b">Chi tiết sản phẩm nhập kho</h3>
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 w-10">#</th>
                                <th className="px-6 py-3">Tên sản phẩm / Thông số</th>
                                <th className="px-6 py-3 text-center">SL</th>
                                <th className="px-6 py-3 text-right">Đơn giá</th>
                                <th className="px-6 py-3 text-right">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {SanPham && SanPham.length > 0 ? (
                                SanPham.map((sp, index) => (
                                    <tr key={sp.IDSanpham } className="bg-white hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold">#{sp.IDSANPHAM}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden border border-gray-300">
                                                    <img 
                                                        // KHẮC PHỤC LỖI TẠI ĐÂY: Dùng optional chaining và kiểm tra mảng
                                                        src={`http://localhost:3001/${sp.HINHANH}`}
                                                        onError={(e) => {e.target.src = "https://via.placeholder.com/150"}}
                                                        className="w-full h-full object-cover" 
                                                        alt={sp.TENSANPHAM} 
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-base">{sp.TENSANPHAM}</p>
                                                    <p className="text-xs text-gray-500">{parseThongSo(sp.THONGSO_KYTHUAT)}</p>
                                                    <details className="group mt-2">
                                                        <summary className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800 text-xs font-medium">
                                                            <i className="fa-solid fa-barcode"></i>
                                                            <span>Xem danh sách IMEI ({sp.IMEI?.length || 0})</span>
                                                            <i className="fa-solid fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                                        </summary>
                                                        <div className="mt-2 p-2 text-xs text-gray-500 bg-gray-50 rounded border border-dashed">
                                                            {sp.IMEI && sp.IMEI.length > 0 ? (
                                                                <div className="grid grid-cols-2 gap-1">
                                                                    {sp.IMEI.map((imei, i) => (
                                                                        <span key={i} className="font-mono bg-white p-1 rounded border">{imei}</span>
                                                                    ))}
                                                                </div>
                                                            ) : "Không có mã IMEI"}
                                                        </div>
                                                    </details> 
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold text-gray-900">{sp.SOLUONG}</td>
                                        <td className="px-6 py-4 text-right">{Number(sp.GIANHAP || 0).toLocaleString("vi-VN")}₫</td>
                                        <td className="px-6 py-4 text-right font-bold text-gray-900">{Number(sp.THANHTIEN || 0).toLocaleString("vi-VN")}₫</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 italic">Không có sản phẩm nào.</td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot className="bg-gray-50 border-t-2 border-gray-200 font-bold">
                            <tr>
                                <td colSpan="4" className="px-6 py-3 text-right text-gray-600 uppercase">Tổng cộng</td>
                                <td className="px-6 py-3 text-right text-xl text-blue-700">
                                    {Number(ThanhToan?.TONGTIEN || 0).toLocaleString("vi-VN") + "₫"}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ChiTietPhieu;