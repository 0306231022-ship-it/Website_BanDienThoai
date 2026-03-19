import { Link } from "react-router-dom";
import * as API from '../../../JS/API/API';
import { useState, useEffect } from "react";

const SanPhamTrangChu = () => {
    const [ThuongHieu, setThuongHieu] = useState([]);
    const [page, setpage] = useState(1);
    const [loading, setloading] = useState(false)

    useEffect(() => {
        setloading(true);
        const LayDL = async () => {
            try {
                const ketqua = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/website/laydsTH?page=${page}` });
                setThuongHieu(ketqua.thuongHieu);
                setloading(false)
            } catch (error) {
                console.error('Đã có lỗi xảy ra:' + error)
            } finally {
                setloading(false);
            }
        };
        LayDL();
    }, [page])

    return (
        <>
  <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
    {/* --- SECTION 1: BANNER HERO --- */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Banner chính - Đỏ quyền lực */}
        <div className="lg:col-span-2 bg-gradient-to-br from-red-700 via-red-600 to-red-800 rounded-3xl p-8 lg:p-12 flex flex-col justify-center items-start text-white min-h-[400px] relative overflow-hidden shadow-2xl shadow-red-200">
            {/* Hiệu ứng decor nền */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
            
            <div className="z-10">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-white/30 w-fit">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest">Sự kiện độc quyền</span>
                </div>
                
                <h2 className="text-4xl lg:text-6xl font-black mb-4 leading-[1.1] tracking-tight">
                    SIÊU PHẨM <br/>
                    <span className="text-yellow-400">IPHONE 15 PRO</span>
                </h2>
                <p className="text-red-100 text-lg lg:text-xl mb-8 max-w-md font-light">
                    Đặt trước ngay hôm nay để nhận ưu đãi giảm trực tiếp <span className="font-bold text-white underline decoration-yellow-400 decoration-2">3.000.000đ</span>
                </p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-red-900 font-black py-4 px-10 rounded-2xl transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 uppercase text-sm">
                    Đặt hàng ngay
                </button>
            </div>
            
            {/* Giả lập ảnh sản phẩm (có thể thay bằng thẻ img) */}
            <div className="absolute right-4 bottom-4 opacity-20 lg:opacity-100 lg:right-10 lg:bottom-10">
                 <div className="w-48 h-48 lg:w-72 lg:h-72 bg-gradient-to-tr from-white/20 to-transparent rounded-full flex items-center justify-center border border-white/10">
                    <span className="text-white/20 font-bold rotate-12">IPHONE 15</span>
                 </div>
            </div>
        </div>

        {/* Cột phụ - Khuyến mãi bổ trợ */}
        <div className="flex flex-col gap-6">
            <div className="flex-1 bg-white rounded-3xl p-6 flex flex-col justify-center border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition-all group">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                    <svg className="w-6 h-6 text-red-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">Thu Cũ Đổi Mới</h3>
                <p className="text-gray-500 mb-4 text-sm leading-relaxed">Trợ giá lên đời đến <span className="text-red-600 font-bold">2 Triệu VNĐ</span>. Thủ tục nhanh gọn trong 15 phút.</p>
                <a href="#" className="text-red-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Xem chi tiết <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
            </div>
            
            <div className="flex-1 bg-white rounded-3xl p-6 flex flex-col justify-center border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition-all group">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                    <svg className="w-6 h-6 text-orange-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">Trả Góp 0%</h3>
                <p className="text-gray-500 mb-4 text-sm leading-relaxed">Sở hữu ngay siêu phẩm với lãi suất 0% qua thẻ tín dụng hoặc CTTC.</p>
                <a href="#" className="text-orange-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Tìm hiểu ngay <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </a>
            </div>
        </div>
    </div>

    {/* --- SECTION 2: FLASH SALE BOX --- */}
    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-red-100 border border-red-50 relative overflow-hidden">
        {/* Header Flash Sale */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="flex items-center gap-3">
                    <div className="bg-red-600 p-2 rounded-xl animate-bounce">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"></path></svg>
                    </div>
                    <h2 className="text-3xl font-black italic tracking-tighter text-red-600">FLASH SALE</h2>
                </div>
                
                {/* Countdown Timer */}
                <div className="flex gap-3 items-center">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest hidden md:block">Kết thúc sau</span>
                    <div className="flex gap-2">
                        <div className="flex flex-col items-center">
                            <span className="bg-red-600 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-red-200">02</span>
                        </div>
                        <span className="text-red-600 font-black self-center">:</span>
                        <div className="flex flex-col items-center">
                            <span className="bg-red-600 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-red-200">14</span>
                        </div>
                        <span className="text-red-600 font-black self-center">:</span>
                        <div className="flex flex-col items-center">
                            <span className="bg-gray-800 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black shadow-lg">59</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <button className="group text-sm font-bold text-gray-500 hover:text-red-600 transition-colors flex items-center gap-2">
                XEM TẤT CẢ <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center transition-all">&rarr;</div>
            </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card Sản phẩm 1 */}
            <div className="group relative bg-white border border-gray-100 rounded-[2rem] p-5 hover:border-red-200 hover:shadow-2xl hover:shadow-red-100 transition-all duration-500">
                {/* Badge giảm giá */}
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-black px-3 py-1 rounded-full z-10 shadow-lg shadow-red-200">
                    -20%
                </div>
                
                {/* Ảnh sản phẩm */}
                <div className="aspect-square bg-gray-50 rounded-[1.5rem] mb-6 flex items-center justify-center overflow-hidden group-hover:scale-95 transition-transform duration-500">
                     <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-xs font-medium">
                        [IMAGE]
                     </div>
                </div>
                
                {/* Thông tin */}
                <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors truncate">iPhone 14 Pro Max 256GB</h3>
                
                <div className="flex flex-col mb-4">
                    <span className="text-red-600 font-black text-2xl tracking-tight">24.990.000đ</span>
                    <span className="text-gray-400 text-sm line-through decoration-red-400/30">29.990.000đ</span>
                </div>
                
                {/* Progress Bar */}
                <div className="relative">
                    <div className="w-full bg-gray-100 rounded-full h-6 border border-gray-50 overflow-hidden shadow-inner">
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[10px] font-black text-red-900/50 uppercase tracking-tighter">🔥 Đã bán 80 / 100</span>
                        </div>
                    </div>
                </div>

                {/* Nút mua nhanh xuất hiện khi hover */}
                <button className="mt-4 w-full bg-red-600 text-white font-bold py-3 rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-red-200">
                    MUA NGAY
                </button>
            </div>

            {/* Lặp lại các card khác tương tự... */}

        </div>
    </div>
</div>

            <hr className="my-8 border-gray-300" />

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800"><i className="fas fa-gift mr-2 text-red-700"></i> KHUYẾN MÃI & QUÀ TẶNG</h3>
                <a href="#" className="text-sm text-red-700 hover:text-red-900 font-semibold transition duration-200">Xem tất cả <i className="fas fa-arrow-right ml-1"></i></a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="relative h-48 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
                    style={{ backgroundImage: "url('placeholder_for_promo_1.jpg')" }}>
                    <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
                </div>

                <div className="relative h-48 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
                    style={{ backgroundImage: "url('placeholder_for_promo_2.jpg')" }}>
                    <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
                        SKT Tech
                    </div>
                </div>

                <div className="relative h-48 bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
                    style={{ backgroundImage: "url('placeholder_for_promo_3.jpg')" }}
                >
                    <div className="absolute inset-0 bg-gray-900 opacity-80"></div>
                    <div className="absolute bottom-4 right-4 text-white text-3xl font-extrabold opacity-40">
                        SUPPORT
                    </div>
                </div>
            </div>
            <hr className="my-8 border-gray-300" />
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Thương hiệu nổi bật</h2>
                        <Link to='' className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
                            Xem tất cả &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {
                            loading ? (
                                /* --- PHẦN ĐÃ SỬA --- */
                                /* Thêm class 'col-span-full' để div này chiếm hết chiều rộng lưới */
                                <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
                                    <div className="relative">
                                        <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                                        <div className="absolute inset-0 rounded-full blur-2xl bg-teal-200/50 -z-10 animate-pulse"></div>
                                    </div>
                                    <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
                                </div>
                                /* --- HẾT PHẦN ĐÃ SỬA --- */
                            ) : (
                                ThuongHieu && ThuongHieu.map((item, index) => (
                                    <Link to={`${item.TENTHUONGHIEU}`} key={index} className="group flex items-center justify-center bg-white border border-gray-200 rounded-xl p-4 h-24 transition-all duration-300 hover:shadow-lg hover:border-red-700 hover:-translate-y-1">
                                        <img className="h-20 w-auto object-contain group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" src={`http://localhost:3001/${item.LOGO}`} alt={item.TENTHUONGHIEU} />
                                    </Link>
                                ))
                            )
                        }

                    </div>
                </div>
            </section>

        </>

    );
};

export default SanPhamTrangChu;