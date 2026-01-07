import { Link, useParams } from "react-router-dom";
import * as API from '../../../../JS/API/API';
import { useState, useEffect } from "react";

function ChiTietPhieu() {
    const { id } = useParams();
    const [DuLieuCungCap, setDuLieuCungCap] = useState([]);
    const [NguoiNhap, setNguoiNhap] = useState([]);
    const [ThongTinPhieu, setThongTinPhieu] = useState([]);
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
                    setloading(false);
                    return;
                }
                const KetQua = await API.CallAPI(undefined, { url: `/admin/ChiTietPhieuNhap?id=${id}`, PhuongThuc: 2 });
            

                if (KetQua.Status) {
                    seterr(KetQua.message);
                    return;
                }
                if (KetQua.ThanhCong) {
                    setDuLieuCungCap(KetQua.DuLieu.CungCap);
                    setNguoiNhap(KetQua.DuLieu.NguoiNhap);
                    setThongTinPhieu(KetQua?.DuLieu?.ThongTinPhieu?.[0] || {});
                    setThanhToan(KetQua?.DuLieu?.ThanhToan?.[0] || {});
                    setSanPham(KetQua.DuLieu.SanPham);
                    setloading(false);
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

    // Helper: Parse thông số kỹ thuật an toàn
    const parseThongSo = (jsonString) => {
        try {
            const specs = JSON.parse(jsonString);
            let display = [];
            if (specs.MauSac) display.push(`Màu: ${specs.MauSac}`);
            if (specs.Ram) display.push(`RAM: ${specs.Ram}`);
            if (specs.BoNhoTrong) display.push(`ROM: ${specs.BoNhoTrong}`);
            return display.join(" | ");
        } catch (e) {
            return "Chi tiết xem mô tả";
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
                <div className="relative">
                    <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                    <div className="absolute inset-0 rounded-full blur-2xl bg-teal-200/50 -z-10 animate-pulse"></div>
                </div>
                <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
            </div>
        );
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
            <div className="p-4 max-w-5xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 no-print">
                    <div>
                        <Link to='/admin/PhieuNhapHang' className="text-gray-500 hover:text-blue-600 flex items-center gap-1 text-sm mb-1">
                            <i className="fa-solid fa-arrow-left"></i> Quay lại danh sách
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Phiếu Nhập: <span className="text-blue-600">#{id}</span>
                            <span className="ml-2 text-sm font-medium bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded border border-yellow-200">
                                <i className="fa-solid fa-clock"></i> {ThongTinPhieu.TrangThai === 0 ? "Chưa duyệt" : "Đã duyệt"}
                            </span>
                        </h1>
                        <p className="text-sm text-gray-500">Ngày tạo: {ThongTinPhieu?.NgayNhap && new Date(ThongTinPhieu.NgayNhap).toLocaleDateString("vi-VN")} lúc {new Date(ThongTinPhieu.NgayNhap).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}</p>
                    </div>

                    <div className="flex gap-2">
                        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded shadow-sm hover:bg-gray-50">
                            <i className="fa-solid fa-print"></i> In phiếu
                        </button>
                        {
                            Number(ThanhToan?.TONGTIEN) !== Number(ThanhToan?.DA_THANHTOAN) && (
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm">
                                    <i className="fa-solid fa-file-invoice-dollar"></i> Thanh toán thêm
                                </button>
                            )
                        }

                        {
                            ThongTinPhieu.TrangThai === 1 ? (
                                <button className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded shadow-sm border border-red-200">
                                    <i className="fa-solid fa-rotate-left"></i> Hoàn trả
                                </button>
                            ) : (
                                <>
                                <button className=" bg-teal-600 hover: bg-teal-700 text-white px-4 py-2 rounded shadow-sm">
                                    <i className="fa-solid fa-floppy-disk mr-1"></i> Lưu
                                </button>
                                 <button className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded shadow-sm border border-red-200">
                                    <i className="fa-solid fa-trash"></i> Xóa phiếu
                                </button>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden print-area">

                    <div className="p-6 border-b border-gray-200 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                {
                                    DuLieuCungCap && DuLieuCungCap.map((item, index) => (
                                        <div key={index}>
                                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nhà cung cấp</h3>
                                            <p className="font-bold text-lg text-gray-800">{item.TENNCC}</p>
                                            <p className="text-sm text-gray-600"><i className="fa-solid fa-phone w-4"></i> {item.SDT}</p>
                                            <p className="text-sm text-gray-600"><i className="fa-solid fa-map-location-dot w-4"></i> {item.DIACHI}</p>
                                        </div>
                                    ))
                                }
                            </div>

                            <div>
                                {
                                    NguoiNhap && NguoiNhap.map((item, index) => (
                                        <div key={index}>
                                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Thông tin người nhập</h3>
                                            <p className="font-bold text-gray-800">{item.HOTEN} (Kho)</p>
                                            <p className="text-sm text-gray-600">ID: {item.IDND}</p>
                                        </div>
                                    ))
                                }

                                <div className="mt-2 text-sm bg-blue-50 text-blue-800 p-2 rounded border border-blue-100 italic">
                                    "Ghi chú: {ThongTinPhieu.GhiChu || "Không có ghi chú"}"
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-600">Tổng tiền hàng:</span>
                                    <span className="font-bold">{Number(ThanhToan?.TONGTIEN || 0).toLocaleString("vi-VN") + " ₫"}</span>
                                </div>
                                <div className="flex justify-between mb-1 text-green-600">
                                    <span>Đã thanh toán:</span>
                                    <span className="font-bold">- {Number(ThanhToan?.DA_THANHTOAN || 0).toLocaleString("vi-VN") + " ₫"}</span>
                                </div>
                                <div className="border-t pt-2 mt-2 flex justify-between text-red-600 text-lg font-bold">
                                    <span>Còn nợ:</span>
                                    <span>{conNo}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-0">
                        <h3 className="p-6 pb-2 text-lg font-bold text-gray-800 border-b">Chi tiết sản phẩm nhập kho</h3>

                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 w-10">#</th>
                                    <th className="px-6 py-3">Tên sản phẩm / Thông số</th>
                                    <th className="px-6 py-3 text-center">SL</th>
                                    <th className="px-6 py-3 text-right">Đơn giá</th>
                                    <th className="px-6 py-3 text-right">Thành tiền</th>
                                    <th className="px-6 py-3 text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {SanPham && SanPham.length > 0 ? (
                                    SanPham.map((sp, index) => {
                                        return (
                                            <tr key={sp.IdSanPham || index} className="bg-white hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-bold">{index + 1}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 overflow-hidden border border-gray-300">
                                                            <img 
                                                                src={`http://localhost:3001/${sp.HinhAnh[0]}`} 
                                                                onError={(e) => {e.target.src = "https://via.placeholder.com/150"}}
                                                                className="w-full h-full object-cover" 
                                                                alt={sp.TenSanPham} 
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-base">{sp.TenSanPham}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {parseThongSo(sp.ThongSoKyThuat)}
                                                            </p>
                                                             <details className="group mt-2">
                                                                <summary className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800 select-none text-xs font-medium">
                                                                    <i className="fa-solid fa-barcode"></i>
                                                                    <span>Xem chi tiết mã</span>
                                                                    <i className="fa-solid fa-chevron-down group-open:rotate-180 transition-transform"></i>
                                                                </summary>
                                                                <div className="mt-2 p-2 text-xs text-gray-500 italic">
                                                                    (Chưa thực hiện chức năng thêm IMEI)
                                                                </div>
                                                            </details> 
                                                            
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center font-bold text-gray-900">{sp.SoLuong}</td>
                                                <td className="px-6 py-4 text-right">
                                                    {Number(sp.GiaNhap).toLocaleString("vi-VN")}₫
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-gray-900">
                                                    {Number(sp.ThanhTien).toLocaleString("vi-VN")}₫
                                                </td>
                                                   <td className="px-6 py-4 text-right font-bold text-gray-900">
                                                    Chức năng 
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500 italic">
                                            Không có sản phẩm nào trong phiếu này.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                                <tr>
                                    <td colSpan="5" className="px-6 py-3 text-right font-bold text-gray-600 uppercase">Tổng cộng</td>
                                    <td className="px-6 py-3 text-right font-bold text-xl text-blue-700">
                                        {Number(ThanhToan?.TONGTIEN || 0).toLocaleString("vi-VN") + "₫"}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="bg-gray-50 p-6 border-t border-gray-200">
                        <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase"><i className="fa-solid fa-history mr-1"></i> Lịch sử thanh toán</h4>
                        <div className="space-y-3">
                             {/* Phần này dữ liệu API chưa có mảng lịch sử chi tiết, giữ nguyên hoặc render nếu có */}
                             {Number(ThanhToan?.DA_THANHTOAN) > 0 ? (
                                <div className="flex justify-between items-center bg-white p-3 rounded border border-gray-200 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center">
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Đã thanh toán</p>
                                            <p className="text-xs text-gray-500">Cập nhật theo phiếu nhập</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-gray-700">{Number(ThanhToan.DA_THANHTOAN).toLocaleString("vi-VN")} ₫</span>
                                </div>
                             ) : (
                                 <p className="text-sm text-gray-500 italic">Chưa có giao dịch thanh toán nào.</p>
                             )}
                        </div>
                    </div>

                </div>

                <div className="text-center mt-6 text-gray-400 text-xs no-print">
                    <p>Hệ thống quản lý kho</p>
                </div>

            </div>
        </>
    )
};
export default ChiTietPhieu;