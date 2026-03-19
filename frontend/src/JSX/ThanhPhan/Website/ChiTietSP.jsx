import React, { useState, useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';

function ChiTietSanPhamUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [sanpham, setSanPham] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1); // Thêm state số lượng mua

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const LayDL = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/admin/layChiTietSP_theoid?id=${id}` });
                if (LayDL.ThanhCong) {
                    setImages(LayDL.dulieu.hinhanh);
                    setSanPham(LayDL.dulieu.sanpham[0]);
                    if (LayDL.dulieu.hinhanh?.length > 0) {
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

    // Xử lý tăng giảm số lượng
    const handleQuantity = (type) => {
        if (type === 'plus') setQuantity(prev => prev < sanpham.SOLUONG ? prev + 1 : prev);
        else setQuantity(prev => prev > 1 ? prev - 1 : 1);
    };

    if (loading || !sanpham) return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <i className="fa-solid fa-circle-notch text-6xl text-red-600 animate-spin"></i>
            <p className="text-gray-400 font-bold animate-pulse">ĐANG TẢI SẢN PHẨM...</p>
        </div>
    );

    return (
        <section className="p-4 md:p-12 bg-white min-h-screen font-sans text-gray-800">
            <div className="max-w-7xl mx-auto mb-8">
                <button 
                    onClick={() => navigate(-1)} 
                    className="group flex items-center gap-3 text-slate-400 hover:text-red-600 transition-all font-black text-[11px] uppercase tracking-widest"
                >
                    <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-red-100 group-hover:bg-red-50 transition-all">
                        <i className="fas fa-arrow-left"></i>
                    </div>
                    Quay lại cửa hàng
                </button>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* CỘT TRÁI: HÌNH ẢNH */}
                <div className="lg:col-span-6 space-y-6">
                    <div className="relative bg-slate-50 rounded-[2.5rem] overflow-hidden group border border-gray-100">
                        {/* Tag giảm giá nếu có */}
                        {sanpham.KHUYENMAI > sanpham.GIABAN && (
                            <div className="absolute top-6 left-6 z-10 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg">
                                -{Math.round(((sanpham.KHUYENMAI - sanpham.GIABAN) / sanpham.KHUYENMAI) * 100)}% OFF
                            </div>
                        )}
                        <img 
                            src={`http://localhost:3001/${selectedImage}`} 
                            className="w-full aspect-square object-contain p-12 mix-blend-multiply transition-transform duration-700 group-hover:scale-105" 
                            alt={sanpham.TENSANPHAM} 
                        />
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {images.map((img, idx) => (
                            <div 
                                key={idx}
                                onClick={() => setSelectedImage(img.HINHANH)}
                                className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden cursor-pointer transition-all border-2 ${
                                    selectedImage === img.HINHANH ? "border-red-600 shadow-md" : "border-gray-100 opacity-60"
                                }`}
                            >
                                <img src={`http://localhost:3001/${img.HINHANH}`} className="w-full h-full object-cover" alt="thumbnail" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* CỘT PHẢI: THÔNG TIN & MUA HÀNG */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                    <div className="mb-8">
                        <p className="text-red-600 font-black text-xs uppercase tracking-[0.2em] mb-3">Sản phẩm chính hãng</p>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">{sanpham.TENSANPHAM}</h1>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-black text-red-600">{fun.formatCurrency(sanpham.GIABAN)}</span>
                            {sanpham.KHUYENMAI > sanpham.GIABAN && (
                                <span className="text-lg text-slate-400 line-through font-medium">{fun.formatCurrency(sanpham.KHUYENMAI)}</span>
                            )}
                        </div>

                        <div className="bg-slate-50 p-6 rounded-[2rem] border border-gray-100 mb-8">
                            <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-4">Thông số nổi bật</h4>
                            <div className="grid grid-cols-2 gap-y-3">
                                {Object.entries(JSON.parse(sanpham.THONGSO_KYTHUAT || '{}')).slice(0, 4).map(([key, value]) => (
                                    <div key={key} className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{fun.Map(key)}</span>
                                        <span className="text-sm font-bold text-slate-700">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* BỘ CHỌN SỐ LƯỢNG */}
                        <div className="flex items-center gap-6 mb-10">
                            <div className="flex items-center bg-gray-100 rounded-2xl p-1 border border-gray-200">
                                <button onClick={() => handleQuantity('minus')} className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm">
                                    <i className="fas fa-minus text-xs"></i>
                                </button>
                                <span className="w-12 text-center font-black text-lg">{quantity}</span>
                                <button onClick={() => handleQuantity('plus')} className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm">
                                    <i className="fas fa-plus text-xs"></i>
                                </button>
                            </div>
                            <p className="text-xs font-bold text-slate-400 uppercase">
                                {sanpham.SOLUONG > 0 ? `Còn ${sanpham.SOLUONG} sản phẩm` : <span className="text-red-500">Hết hàng</span>}
                            </p>
                        </div>

                        {/* HÀNH ĐỘNG */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button className="flex-1 bg-slate-900 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] hover:bg-red-600 transition-all active:scale-95 shadow-xl shadow-slate-200">
                                Thêm vào giỏ hàng
                            </button>
                            <button className="flex-1 bg-red-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] hover:bg-red-700 transition-all active:scale-95 shadow-xl shadow-red-100">
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* --- PHẦN BỔ SUNG: ĐÁNH GIÁ & CAM KẾT --- */}
<div className="max-w-7xl mx-auto mt-16 space-y-16">
    
    {/* 1. KHỐI THÔNG TIN ĐẢM BẢO (Trust Badges) */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
            { icon: "fa-shield-halved", title: "Bảo hành tận tâm", desc: "Lỗi 1 đổi 1 trong 30 ngày" },
            { icon: "fa-truck-fast", title: "Giao hàng thần tốc", desc: "Nhận hàng trong 2h tại nội thành" },
            { icon: "fa-award", title: "Cam kết chính hãng", desc: "Đền gấp 10 nếu phát hiện hàng giả" },
            { icon: "fa-headset", title: "Hỗ trợ 24/7", desc: "Giải đáp mọi thắc mắc khách hàng" }
        ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
                    <i className={`fas ${item.icon} text-xl`}></i>
                </div>
                <h5 className="font-black text-slate-800 text-sm mb-1 uppercase">{item.title}</h5>
                <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
            </div>
        ))}
    </div>

    {/* 2. PHẦN ĐÁNH GIÁ (Customer Reviews) */}
    <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
                <h3 className="text-3xl font-black text-slate-900 mb-2">Đánh giá từ khách hàng</h3>
                <div className="flex items-center gap-4">
                    <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((s) => <i key={s} className="fas fa-star text-sm"></i>)}
                    </div>
                    <span className="text-sm font-bold text-slate-600">4.8/5 (128 lượt đánh giá)</span>
                </div>
            </div>
            <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-red-600 transition-all">
                Viết đánh giá của bạn
            </button>
        </div>

        {/* Danh sách comment mẫu */}
        <div className="space-y-8">
            {[
                { name: "Nguyễn Văn A", date: "12/10/2023", content: "Máy dùng rất mượt, đóng gói cẩn thận. Nhân viên tư vấn nhiệt tình!", rate: 5 },
                { name: "Trần Thị B", date: "05/10/2023", content: "Giao hàng nhanh, sản phẩm đẹp hơn trong hình. Sẽ ủng hộ shop dài dài.", rate: 5 }
            ].map((review, idx) => (
                <div key={idx} className="pb-8 border-b border-gray-50 last:border-0">
                    <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-500 text-xs">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                                <h6 className="font-black text-slate-800 text-sm">{review.name}</h6>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{review.date}</p>
                            </div>
                        </div>
                        <div className="flex text-yellow-400 text-[10px]">
                            {[...Array(review.rate)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                        </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed pl-13">
                        {review.content}
                    </p>
                </div>
            ))}
        </div>
    </div>
</div>
        </section>

    );
}

export default ChiTietSanPhamUser;