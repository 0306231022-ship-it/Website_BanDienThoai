import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as API from '../../../../JS/API/API';
import * as fun from '../../../../JS/FUNCTONS/function';

function ChiTietSanPham() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [sanpham, setSanPham] = useState(null);
    const [imeis, setImeis] = useState([]); 
    const [nhacungcap,setnhacungcap] = useState(null)
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const LayDL = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/admin/layChiTietSP_theoid?id=${id}` });
                if (LayDL.ThanhCong) {
                    setImages(LayDL.dulieu.hinhanh);
                    const dulieu = LayDL.dulieu.sanpham;
                    setSanPham(dulieu[0]);
                    setImeis(LayDL.dulieu.kho_imei);
                    const ncc = LayDL.dulieu.nhacungcap
                    setnhacungcap(ncc[0])
                    if (LayDL.dulieu.hinhanh && LayDL.dulieu.hinhanh.length > 0) {
                        setSelectedImage(LayDL.dulieu.hinhanh[0].HINHANH);
                    }
                }
            } catch (error) {
                console.error("Lỗi lấy chi tiết:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const formatVND = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price || 0);
    const handleXoa = () => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: "Dữ liệu sẽ bị xóa vĩnh viễn!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Xác nhận xóa'
        }).then((result) => {
            if (result.isConfirmed) navigate('/admin/sanpham');
        });
    };

    if (loading || !sanpham) return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
            <p className="text-gray-400 font-bold animate-pulse">ĐANG TẢI DỮ LIỆU...</p>
        </div>
    );

    return (
        <section className="p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans text-gray-800">
            {/* HEADER */}
            <div className="max-w-7xl mx-auto flex justify-between mb-8">
                <Link to="/admin/sanpham" className="flex items-center gap-2 text-gray-500 font-bold bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100">
                    <i className="fas fa-arrow-left"></i> Quay lại
                </Link>
                <div className="flex gap-3">
                    <button onClick={handleXoa} className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-2xl font-bold hover:bg-red-600 hover:text-white transition-all">
                        Xóa sản phẩm
                    </button>
                    <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100">
                        Chỉnh sửa
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* CỘT TRÁI */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white p-6 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center">
                        <div className="w-full aspect-square rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 mb-6 group relative">
                            <img 
                                src={`http://localhost:3001/${selectedImage}`} 
                                className="w-full h-full object-cover transition-all duration-500 ease-in-out" 
                                alt="Main view" 
                            />
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-[24px] border border-gray-100 overflow-x-auto max-w-full">
                            {images.map((img, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => setSelectedImage(img.HINHANH)}
                                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                                        selectedImage === img.HINHANH ? "border-indigo-600 scale-110 shadow-lg" : "border-transparent opacity-40"
                                    }`}
                                >
                                    <img src={`http://localhost:3001/${img.HINHANH}`} className="w-full h-full object-cover" alt="thumb" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
                        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">Số lượng tồn kho</p>
                        <h3 className="text-6xl font-black">{sanpham.SOLUONG}</h3>
                        <i className="fas fa-box-open absolute -right-4 -bottom-4 text-8xl opacity-10"></i>
                    </div>
                </div>

                {/* CỘT PHẢI */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg mb-4">ID: {sanpham.IDSANPHAM}</span>
                        <h1 className="text-4xl font-black text-slate-900 mb-2">{sanpham.TENSANPHAM}</h1>
                        <p className="text-3xl font-black text-indigo-600 mb-8">{formatVND(sanpham.GIABAN)}</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <p className="text-[10px] font-bold text-emerald-600 uppercase">Giá nhập</p>
                                <p className="text-lg font-black text-emerald-800">{formatVND(sanpham.GIANHAP)}</p>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                <p className="text-[10px] font-bold text-orange-600 uppercase">Lợi nhuận</p>
                                <p className="text-lg font-black text-orange-800">+{formatVND(sanpham.GIABAN - sanpham.GIANHAP)}</p>
                            </div>
                        </div>

                        {/* Bento: Specs & IMEI */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            {/* Specs */}
                            <div className="space-y-4">
                                <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-4 border-l-4 border-indigo-600 pl-3">Thông số kỹ thuật</h4>
                                <div className="space-y-2">
                                    {Object.entries(JSON.parse(sanpham.THONGSO_KYTHUAT || '{}')).map(([key, value]) => (
                                        <div key={key} className="flex justify-between py-2 border-b border-gray-50">
                                            <span className="text-[11px] font-bold text-gray-400 uppercase">{fun.Map(key)}</span>
                                            <span className="text-sm font-black text-slate-700">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* IMEI LIST ADDED HERE */}
                            <div className="space-y-4">
                                <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-4 border-l-4 border-emerald-500 pl-3">Danh sách IMEI ({imeis.length})</h4>
                                <div className="bg-gray-50 rounded-3xl p-4 h-[250px] overflow-y-auto border border-gray-100 scrollbar-hide">
                                    {imeis.length > 0 ? (
                                        <div className="space-y-2">
                                            {imeis.map((item, idx) => (
                                                <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 flex items-center gap-3 shadow-sm">
                                                    <span className="w-5 h-5 rounded-full bg-gray-100 text-[10px] flex items-center justify-center font-bold text-gray-400">{idx + 1}</span>
                                                    <span className="text-[12px] font-mono font-bold text-slate-600 tracking-wider">{item.MA_IMEI}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-gray-300">
                                            <i className="fas fa-barcode text-3xl mb-2"></i>
                                            <p className="text-[10px] font-bold uppercase">Trống</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nhà cung cấp */}
                    <div className="bg-indigo-900 rounded-[32px] p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-indigo-300 text-[10px] font-black uppercase mb-2">Nhà cung cấp đối tác</p>
                            <h5 className="text-xl font-black mb-1">{nhacungcap.TENNCC}</h5>
                            <p className="text-sm opacity-70 italic">{nhacungcap.DIACHI}</p>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ChiTietSanPham;