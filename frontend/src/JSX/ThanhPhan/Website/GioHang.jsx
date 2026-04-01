import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import { useModalContext } from "../../../CONTEXT/QuanLiModal";
import { KiemTra, LayThongTinNguoiDung } from '../../../hook/KiemTraDangNhap';
import { Lay_SoLuong_GioHang } from '../../../hook/ThongTinHienThi_Website';
import { useAddToCart } from '../../../hook/SanPham';
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';
import * as ThongBao from '../../../JS/FUNCTONS/ThongBao';

function GioHang() {
    const { OpenMoDal } = useModalContext();
    const { updateCartToServer ,handlebuyproduct } = useAddToCart();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sanpham, setSanPham] = useState([]);
    const [TongTien, setTongTien] = useState(0);
    const sanPhamRef = useRef([]);

    // --- Logic giữ nguyên ---
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const loggedIn = await KiemTra();
            if (loggedIn) {
                const userInfo = await LayThongTinNguoiDung();
                setIsLoggedIn(true);
                try {
                    const ketqua = await API.CallAPI(undefined, { url: `/NguoiDung/giohang?idnd=${userInfo.IDND}` });
                    if (ketqua.ThanhCong) {
                        setSanPham(ketqua.dulieu);
                        sanPhamRef.current = ketqua.dulieu;
                    }
                } catch (error) {
                    console.error('Lỗi khi gọi API:', error);
                } finally { setLoading(false); }
            } else { setLoading(false); }
        };
        fetchData();
    }, [OpenMoDal]);

    useEffect(() => {
        sanPhamRef.current = sanpham;
        const tong = sanpham.reduce((total, item) => total + (item.DONGIA * item.SOLUONG), 0);
        setTongTien(tong);
    }, [sanpham]);

    useEffect(() => {
        const handleBeforeUnload = () => { updateCartToServer(sanPhamRef); };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            updateCartToServer(sanPhamRef);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [sanPhamRef, updateCartToServer]); 

    const handleTangSoLuong = (id) => {
        setSanPham(prev => prev.map(item => item.IDSANPHAM === id ? { ...item, SOLUONG: item.SOLUONG + 1 } : item));
    };

    const handleGiamSoLuong = (id) => {
        setSanPham(prev => prev.map(item => item.IDSANPHAM === id && item.SOLUONG > 1 ? { ...item, SOLUONG: item.SOLUONG - 1 } : item));
    };

    const handleXoaSanPham = async (id) => {
        const XacNhan = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn muốn xóa sản phẩm này?');
        if (!XacNhan) return;
        const loggedIn = await KiemTra();
        if (loggedIn) {
            try {
                const ketqua = await API.CallAPI(undefined, {
                    url: `/NguoiDung/Xoa_GioHang?data=${encodeURIComponent(JSON.stringify([{ IDSANPHAM: id, IDDH: sanPhamRef.current.find(item => item.IDSANPHAM === id)?.IDDH }]))}`,
                    PhuongThuc: 2
                });
                if (ketqua.ThanhCong) {
                    setSanPham(prev => prev.filter(item => item.IDSANPHAM !== id));
                    ThongBao.ThongBao_ThanhCong(ketqua.message);
                    const userInfo = await LayThongTinNguoiDung();
                    await Lay_SoLuong_GioHang(userInfo.IDND);
                 
                }
            } catch (error) { console.error(error); }
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-screen uppercase tracking-widest text-gray-400 animate-pulse">Đang tải...</div>;

    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center min-h-[80vh] px-4">
                <div className="text-center max-w-md">
                    <div className="mb-6 inline-flex p-8 bg-gray-50 rounded-full">
                        <i className="fas fa-lock text-5xl text-gray-300"></i>
                    </div>
                    <h2 className="text-3xl font-black mb-4">Bạn chưa đăng nhập</h2>
                    <p className="text-gray-500 mb-8">Vui lòng đăng nhập để xem các sản phẩm trong giỏ hàng của bạn.</p>
                    <button onClick={() => OpenMoDal(null, { TenTrang: 'DangNhap', TieuDe: 'Đăng Nhập' })} 
                        className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg">Đăng nhập ngay</button>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-[85vh] flex flex-col ${sanpham.length === 0 ? 'justify-center' : ''} bg-gray-50/30 py-10`}>
            <div className="container mx-auto px-4">
                {sanpham.length === 0 ? (
                    /* --- GIAO DIỆN TRỐNG: CĂN GIỮA MÀN HÌNH --- */
                    <div className="flex flex-col items-center justify-center text-center animate-fade-in">
                        <div className="bg-white p-10 rounded-full shadow-sm mb-8 border border-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-black text-gray-800 mb-3">Giỏ hàng của bạn đang trống</h3>
                        <p className="text-gray-400 mb-10 max-w-sm text-lg">Hàng ngàn sản phẩm tuyệt vời đang chờ bạn khám phá. Đừng bỏ lỡ!</p>
                        <Link to="/" className="px-12 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-blue-200 transition-all active:scale-95">
                            Bắt đầu mua sắm ngay
                        </Link>
                    </div>
                ) : (
                    /* --- GIAO DIỆN CÓ SẢN PHẨM: HIỆN THÔNG TIN THANH TOÁN --- */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                        {/* Cột danh sách sản phẩm */}
                        <div className="lg:col-span-2 space-y-4">
                            {sanpham.map((item) => (
                                <div key={item.IDSANPHAM} className="bg-white rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                                    <img src={`http://localhost:3001/${item.HINHANH}`} alt={item.TENSANPHAM} className="w-24 h-24 object-cover rounded-2xl bg-gray-50" />
                                    <div className="flex-1 text-center sm:text-left">
                                        <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">{item.TENSANPHAM}</h3>
                                        <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-tighter">{item.TENTHUONGHIEU}</span>
                                    </div>
                                    <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                                        <button onClick={() => handleGiamSoLuong(item.IDSANPHAM)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold">-</button>
                                        <span className="w-10 text-center font-black">{item.SOLUONG}</span>
                                        <button onClick={() => handleTangSoLuong(item.IDSANPHAM)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm font-bold">+</button>
                                    </div>
                                    <div className="text-xl font-black text-gray-900 min-w-[120px] text-right">
                                        {fun.formatCurrency(item.DONGIA)}
                                    </div>
                                    <button onClick={() => handleXoaSanPham(item.IDSANPHAM)} className="text-gray-300 hover:text-red-500 p-2 transition-colors">
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Cột thông tin thanh toán (Tóm tắt) */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-[2.5rem] p-8 sticky top-24 shadow-2xl shadow-gray-200/50 border border-gray-50">
                                <h2 className="text-2xl font-black text-gray-900 mb-8 pb-4 border-b border-gray-50">Thanh toán</h2>
                                <div className="space-y-6">
                                    <div className="flex justify-between text-gray-500 font-medium">
                                        <span>Tạm tính</span>
                                        <span className="text-gray-900 font-bold">{fun.formatCurrency(TongTien)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 font-medium">
                                        <span>Phí giao hàng</span>
                                        <span className="text-green-500 font-bold italic">Chưa tính</span>
                                    </div>
                                    <div className="pt-6 border-t-2 border-dashed border-gray-50">
                                        <div className="flex justify-between items-end mb-8">
                                            <span className="font-bold text-gray-900">Tổng thanh toán</span>
                                            <span className="text-3xl font-black text-red-600 leading-none">{fun.formatCurrency(TongTien)}</span>
                                        </div>
                                        <button onClick={()=>{handlebuyproduct(sanPhamRef)}} className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-700 shadow-xl shadow-red-200 transition-all active:scale-95 flex items-center justify-center">
                                            TIẾP TỤC ĐẶT HÀNG <i className="fas fa-arrow-right ml-3"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GioHang;