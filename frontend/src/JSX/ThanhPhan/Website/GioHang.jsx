import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useModalContext } from "../../../CONTEXT/QuanLiModal";
import { KiemTra, LayThongTinNguoiDung } from '../../../hook/KiemTraDangNhap';
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';
function GioHang() {
    const { OpenMoDal } = useModalContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sanpham, setSanPham] = useState([]);
    const [TongTien, setTongTien] = useState(0);
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const loggedIn = await KiemTra();
            if (loggedIn) {
                const userInfo = await LayThongTinNguoiDung();
                setIsLoggedIn(true);
                try {
                    const ketqua = await API.CallAPI(undefined,{url : `/NguoiDung/giohang?idnd=${userInfo.IDND}`});
                    if(ketqua.ThanhCong){
                       // alert(JSON.stringify(ketqua.dulieu));
                        setSanPham(ketqua.dulieu);
                        const tongTien = ketqua.dulieu.reduce((total, item) => {
                            return total + (item.DONGIA * item.SOLUONG);
                        }, 0);
                        setTongTien(tongTien);
                    }
                } catch (error) {
                    console.error('Lỗi khi gọi API:', error);
                    
                }finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [OpenMoDal]);
    useEffect(() => {
        const tong = sanpham.reduce((total, item) => {
        return total + (item.DONGIA * item.SOLUONG);
    }, 0);
    setTongTien(tong);
}, [sanpham]);
    useEffect(() => {
    // Hàm này sẽ chạy KHI COMPONENT BỊ HỦY (người dùng chuyển trang)
    return () => {
        const updateCart = async () => {
            try {
                await API.CallAPI(sanpham, { url: '/NguoiDung/ThemGioHang' });
            } catch (error) {
                console.error('Lỗi khi cập nhật giỏ hàng:', error);
            }
        };
        updateCart();

    };
}, [sanpham]);
    const handleTangSoLuong = (id) => {
        setSanPham(prevSanPham =>
            prevSanPham.map(item =>
                item.IDSANPHAM === id ? { ...item, SOLUONG: item.SOLUONG + 1 } : item
            )
        );
    };
    const handleGiamSoLuong = (id) => {
        setSanPham(prevSanPham =>
            prevSanPham.map(item =>
                item.IDSANPHAM === id && item.SOLUONG > 1 ? { ...item, SOLUONG: item.SOLUONG - 1 } : item
            )
        );
    };
    if (!isLoggedIn) {
        return (
<div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
    <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="relative bg-white p-8 rounded-full shadow-sm border border-gray-100">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-20 w-20 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        </div>
    </div>
    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
        Dừng lại một chút!
    </h2>
    <p className="text-gray-500 max-w-sm mb-10 leading-relaxed">
        Bạn cần đăng nhập để xem các sản phẩm đã chọn và tiếp tục thanh toán. Đừng bỏ lỡ những ưu đãi dành riêng cho bạn!
    </p>
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
        <button className="w-full py-3.5 px-8 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-2xl shadow-lg shadow-primary-200 transition-all duration-300 transform hover:-translate-y-1 text-center"
            onClick={() => OpenMoDal(null, { TenTrang: 'DangNhap', TieuDe: 'Đăng Nhập' })}
        >
            Đăng nhập ngay
        </button> 
        <Link 
            to="/" 
            className="w-full py-3.5 px-8 bg-white border border-gray-200 text-gray-600 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300 text-center flex items-center justify-center"
        >
            <i className="fas fa-arrow-left mr-2 text-sm"></i>
            Tiếp tục mua sắm
        </Link>
    </div>

    {/* Liên kết phụ */}
    <p className="mt-8 text-sm text-gray-400">
        Chưa có tài khoản? <Link to="/register" class="text-primary-500 font-medium hover:underline">Đăng ký tại đây</Link>
    </p>
</div>
        );
    }
    return (
    <>

        <div className="container mx-auto px-4">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                
                <div className="lg:col-span-2 space-y-6">
                    {
                        loading ? (
                            <div className="flex items-center justify-center py-20">
                                <svg className="animate-spin h-8 w-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            ) : sanpham.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <svg className="h-16 w-16 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0h2M4 13h2m10 0h2M7 21h10a2 2 0 002-2H5a2 2 0 002 2z" />
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Giỏ hàng của bạn đang trống</h3>
                                    <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục.</p>
                                    <Link to="/" className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
                                        <i className="fas fa-arrow-left mr-2"></i>
                                        Tiếp tục mua sắm
                                    </Link>
                                </div>
                            ) : (
                                sanpham.map((item, index) => (
                                     <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center gap-6 animate-fade-in-up-1">
                        <img 
                            src={`http://localhost:3001/${item.HINHANH}`} 
                            alt={item.TENSANPHAM} 
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold text-dark-900">{item.TENSANPHAM}</h3>
                            <p className="text-dark-600 text-sm"> Thương hiệu: {item.TENTHUONGHIEU}</p>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <button onClick={() => handleGiamSoLuong(item.IDSANPHAM)} className="w-8 h-8 bg-dark-50 rounded-full text-dark-600 hover:bg-dark-100 transition-colors">-</button>
                            <span className="w-12 text-center font-medium text-dark-900 text-lg">{item.SOLUONG}</span>
                            <button onClick={() => handleTangSoLuong(item.IDSANPHAM)} className="w-8 h-8 bg-dark-50 rounded-full text-dark-600 hover:bg-dark-100 transition-colors">+</button>
                        </div>
                        <div className="text-xl font-bold text-primary-500 w-36 text-center md:text-right flex-shrink-0">
                            {fun.formatCurrency(item.DONGIA)}
                        </div>
                        <button className="text-dark-600 hover:text-red-500 transition-colors flex-shrink-0">
                            <i className="fas fa-trash-alt fa-lg"></i>
                        </button>
                    </div>

                                )
                            )
                            )}
                    <div className="mt-8">
                        <Link to="/" className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
                            <i className="fas fa-arrow-left mr-2"></i>
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-white rounded-2xl shadow-sm p-6 animate-fade-in-up-3">
                            <h2 className="text-2xl font-bold text-dark-900 mb-6">Tóm Tắt Đơn Hàng</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-dark-600">
                                    <span>Tạm tính ({sanpham.length} sản phẩm)</span>
                                    <span className="font-medium text-dark-900">{fun.formatCurrency(TongTien)}</span>
                                </div>
                                <div className="flex justify-between text-dark-600">
                                    <span>Phí vận chuyển</span>
                                    <span className="font-medium text-accent-500">Miễn Phí</span>
                                </div>
                                
                                <div className="pt-4">
                                    <label for="promo" className="block text-sm font-medium text-dark-900 mb-2">Mã giảm giá</label>
                                    <div className="flex gap-2">
                                        <input type="text" id="promo" placeholder="Nhập mã của bạn..." className="flex-1 px-4 py-2 rounded-lg border border-dark-100 focus:outline-none focus:ring-2 focus:ring-primary-500"/>
                                        <button className="bg-dark-800 text-white px-4 py-2 rounded-lg hover:bg-dark-900 transition-colors">Áp Dụng</button>
                                    </div>
                                </div>

                                <div className="border-t border-dark-100 my-4 pt-4"></div>
                                
                                <div className="flex justify-between text-xl font-bold text-dark-900">
                                    <span>Tổng cộng</span>
                                    <span className="text-primary-500">{fun.formatCurrency(TongTien)}</span>
                                </div>

                                <button className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg font-medium transition-all transform hover:scale-105 animate-glow">
                                    Tiến Hành Thanh Toán
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </>
    );
};
export default GioHang;