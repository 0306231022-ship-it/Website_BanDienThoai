import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as API from '../../../../JS/API/API'; // Đường dẫn API của bạn

function ChiTietSanPham() {
    const { id } = useParams(); // Lấy ID sản phẩm từ URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [sp, setSp] = useState(null);

    // 1. Giả lập hoặc Gọi API lấy dữ liệu
    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                // Thay thế bằng hàm CallAPI thực tế của bạn
                // const res = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/admin/sanpham/${id}` });
                
                // Dữ liệu mẫu để hiển thị giao diện
                const fakeData = {
                    IDSANPHAM: id || "SP00125",
                    TENSANPHAM: "iPhone 15 Pro Max 256GB",
                    TENTHUONGHIEU: "Apple",
                    GIANHAP: 30500000,
                    GIABAN: 33990000,
                    TONG_TONKHO: 12,
                    TENNHACUNGCCAP: "Công ty TNHH Apple Việt Nam",
                    SDT_NCC: "028.3822.4000",
                    DIACHI_NCC: "Quận 1, TP. Hồ Chí Minh",
                    IMEIS: ["358912345678001", "358912345678002", "358912345678003", "358912345678004", "358912345678005"],
                    THONG_SO: {
                        "Hệ điều hành": "iOS 17.4",
                        "RAM": "8 GB",
                        "Bộ nhớ trong": "256 GB",
                        "Màn hình": "6.7 inch OLED",
                        "Pin": "4.422 mAh",
                        "Màu sắc": "Titan Tự Nhiên"
                    }
                };
                setSp(fakeData);
            } catch (error) {
                console.error("Lỗi lấy chi tiết:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const formatVND = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    // 2. Xử lý Xóa sản phẩm
    const handleXoa = () => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: "Dữ liệu sản phẩm và các mã IMEI liên quan sẽ bị xóa vĩnh viễn!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Xác nhận xóa',
            cancelButtonText: 'Hủy bỏ',
            customClass: { popup: 'rounded-[24px]' }
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Gọi API xóa tại đây
                Swal.fire('Đã xóa!', 'Sản phẩm đã được loại bỏ khỏi hệ thống.', 'success');
                navigate('/admin/sanpham');
            }
        });
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <i className="fa-solid fa-circle-notch text-5xl text-indigo-600 animate-spin"></i>
            <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">Đang tải chi tiết...</p>
        </div>
    );

    return (
        <section className="p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans text-gray-800">
            {/* --- HEADER NAVIGATION --- */}
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between mb-8 gap-4">
                <Link to="/admin/sanpham" className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-all font-bold bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100">
                    <i className="fas fa-arrow-left text-xs"></i> Quay lại
                </Link>
                
                <div className="flex items-center gap-3">
                    <button onClick={handleXoa} className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm font-bold text-sm flex items-center gap-2">
                        <i className="fas fa-trash-alt text-xs"></i> Xóa sản phẩm
                    </button>
                    <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-2xl hover:bg-gray-50 transition shadow-sm font-bold text-sm">
                        <i className="fas fa-print mr-2"></i> In tem nhãn
                    </button>
                    <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 font-bold text-sm">
                        <i className="fas fa-edit mr-2"></i> Chỉnh sửa
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* --- CỘT TRÁI (4/12): HÌNH ẢNH & KHO --- */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-4 rounded-[32px] shadow-sm border border-gray-100">
                        <div className="aspect-square rounded-[24px] overflow-hidden bg-gray-50 mb-4 border border-gray-100">
                            <img src="https://picsum.photos/600/600?random=10" alt="Product" className="w-full h-full object-cover" />
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-xl overflow-hidden border border-gray-50 shadow-sm">
                                    <img src={`https://picsum.photos/100/100?random=${i+20}`} className="w-full h-full object-cover opacity-60 hover:opacity-100 cursor-pointer transition" alt="thumbnail" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stock Card */}
                    <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Inventory Status</p>
                            <h3 className="text-6xl font-black mb-6 tracking-tighter">{sp.TONG_TONKHO} <span className="text-sm font-light opacity-50 tracking-normal">máy trong kho</span></h3>
                            <div className="space-y-4 pt-6 border-t border-white/10">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Tình trạng:</span>
                                    <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg font-bold text-[10px] uppercase">Đang kinh doanh</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-slate-400">Phân khúc:</span>
                                    <span>High-End Smartphone</span>
                                </div>
                            </div>
                        </div>
                        <i className="fas fa-box-open absolute -right-6 -bottom-6 text-9xl opacity-5 group-hover:scale-110 transition-transform duration-700"></i>
                    </div>
                </div>

                {/* --- CỘT PHẢI (8/12): THÔNG TIN CHI TIẾT --- */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* Main Info */}
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-8">
                            <div>
                                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg mb-3">#ID_{sp.IDSANPHAM}</span>
                                <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">{sp.TENSANPHAM}</h1>
                                <p className="text-gray-400 mt-2 font-bold flex items-center gap-2">
                                    <i className="fab fa-apple text-xl text-slate-800"></i> {sp.TENTHUONGHIEU} Ecosystem
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 min-w-[200px] text-center md:text-right">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Giá bán niêm yết</p>
                                <p className="text-3xl font-black text-indigo-600">{formatVND(sp.GIABAN)}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase mb-0.5">Giá nhập</p>
                                    <p className="text-lg font-black text-emerald-700">{formatVND(sp.GIANHAP)}</p>
                                </div>
                                <i className="fas fa-arrow-down text-emerald-200 text-2xl"></i>
                            </div>
                            <div className="p-5 bg-orange-50/50 border border-orange-100 rounded-2xl flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-bold text-orange-600 uppercase mb-0.5">Lợi nhuận/SP</p>
                                    <p className="text-lg font-black text-orange-700">+{formatVND(sp.GIABAN - sp.GIANHAP)}</p>
                                </div>
                                <i className="fas fa-chart-line text-orange-200 text-2xl"></i>
                            </div>
                        </div>
                    </div>

                    {/* Bento Grid: Specs & IMEI */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Specs */}
                        <div className="bg-white p-7 rounded-[32px] shadow-sm border border-gray-100">
                            <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-[0.2em] mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span> Thông số kỹ thuật
                            </h4>
                            <div className="space-y-4">
                                {Object.entries(sp.THONG_SO).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center group">
                                        <span className="text-xs font-bold text-gray-400 uppercase group-hover:text-indigo-400 transition-colors">{key}</span>
                                        <span className="text-sm font-black text-slate-700">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* IMEI List */}
                        <div className="bg-white p-7 rounded-[32px] shadow-sm border border-gray-100">
                            <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-[0.2em] mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span> Danh sách IMEI
                            </h4>
                            <div className="bg-gray-50 rounded-[24px] p-4 h-52 overflow-y-auto border border-gray-100 custom-scrollbar">
                                <div className="space-y-2">
                                    {sp.IMEIS.map((imei, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-50 shadow-sm hover:border-indigo-200 transition-all">
                                            <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center text-[9px] font-black">{idx + 1}</div>
                                            <span className="text-[11px] font-mono font-bold text-slate-600 tracking-wider">{imei}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NHÀ CUNG CẤP */}
                    <div className="bg-indigo-900 rounded-[40px] p-8 text-white relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="h-24 w-24 bg-white/10 backdrop-blur-xl rounded-[28px] border border-white/20 flex items-center justify-center shadow-2xl">
                                <i className="fas fa-handshake text-4xl text-indigo-300"></i>
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-2">Đối tác cung ứng chính</p>
                                <h5 className="text-2xl font-black mb-4 tracking-tight">{sp.TENNHACUNGCCAP}</h5>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                        <i className="fas fa-phone-alt text-indigo-400 text-xs"></i>
                                        <span className="text-sm font-bold">{sp.SDT_NCC}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                                        <i className="fas fa-map-marker-alt text-indigo-400 text-xs"></i>
                                        <span className="text-sm font-bold">{sp.DIACHI_NCC}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default ChiTietSanPham;