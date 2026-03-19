import { Link } from "react-router-dom";
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';
import { useState, useEffect } from "react";

const SanPhamTrangChu = () => {
    const [ThuongHieu, setThuongHieu] = useState([]);
    const [page, setpage] = useState(1);
    const [loading, setloading] = useState(false);
    const [flashSale, setFlashSale] = useState({});
    const [flashSaleProducts, setFlashSaleProducts] = useState([]);
    const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });

    // --- 1. LOGIC ĐẾM NGƯỢC ---
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const endTime = new Date(flashSale.THOIGIAN_KETTHUC).getTime();
            const distance = endTime - now;
            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
                return;
            }
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);
            setTimeLeft({
                hours: h < 10 ? `0${h}` : h.toString(),
                minutes: m < 10 ? `0${m}` : m.toString(),
                seconds: s < 10 ? `0${s}` : s.toString(),
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [flashSale.THOIGIAN_KETTHUC]);

    // --- 2. LOGIC GỌI API THƯƠNG HIỆU ---
    useEffect(() => {
        setloading(true);
        const LayDL = async () => {
            try {
                const ketqua = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/website/laydsTH?page=${page}` });
                setThuongHieu(ketqua.thuongHieu);
            } catch (error) {
                console.error('Lỗi thương hiệu:', error)
            } finally { setloading(false); }
        };
        LayDL();
    }, [page]);

    // --- 3. LOGIC GỌI API FLASH SALE ---
    useEffect(() => {
        const Flashsale = async () => {
            try {
                const ketqua = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/website/laydsSPflashsale` });
                if(ketqua.ThanhCong){
                    setFlashSale(ketqua.dulieu.flashSale);
                    setFlashSaleProducts(ketqua.dulieu.sanpham);
                }
            } catch (error) { console.error('Lỗi flashsale:', error) }
        };
        Flashsale();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen font-sans antialiased text-slate-900">
            <style>
                {`
                    @keyframes shimmer {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                    }
                    .animate-shimmer {
                        animation: shimmer 3s infinite linear;
                        background-size: 200% 100%;
                    }
                `}
            </style>

            <div className="max-w-7xl mx-auto px-4 py-10">
                
                {/* --- SECTION 1: HERO BANNER --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    <div 
                        style={{ backgroundColor: flashSale.MAUNEN || '#dc2626' }}
                        className="lg:col-span-2 rounded-[2.5rem] p-8 lg:p-16 flex flex-col justify-center items-start text-white min-h-[450px] relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-[80px]"></div>
                        <div className="z-10 relative">
                            <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold mb-6 inline-block tracking-widest uppercase">
                                Exclusive Offer
                            </span>
                            <h2 className="text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tighter">
                                {flashSale.TENFS || 'SIÊU SALE HÈ'}
                            </h2>
                            <p className="text-white/80 text-lg mb-10 max-w-sm leading-relaxed font-light">
                                Đừng bỏ lỡ cơ hội sở hữu công nghệ đỉnh cao với mức giá ưu đãi nhất năm.
                            </p>
                            <button className="bg-white text-slate-900 hover:bg-yellow-400 font-black py-4 px-10 rounded-2xl transition-all duration-300 shadow-xl hover:-translate-y-1 active:scale-95 uppercase text-sm">
                                Khám phá ngay
                            </button>
                        </div>
                        <div className="absolute right-10 bottom-10 hidden lg:block opacity-20 select-none pointer-events-none">
                            <div className="text-[12rem] font-black leading-none rotate-12 uppercase tracking-tighter" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>TECH</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {[
                            { title: 'Thu Cũ Đổi Mới', desc: 'Trợ giá lên đời đến 2 Triệu VNĐ', color: 'red', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2z' },
                            { title: 'Trả Góp 0%', desc: 'Sở hữu ngay qua thẻ tín dụng hoặc CTTC', color: 'orange', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12' }
                        ].map((item, i) => (
                            <div key={i} className="flex-1 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden">
                                <div className={`w-14 h-14 bg-${item.color}-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${item.color}-600 group-hover:text-white transition-all duration-300`}>
                                    <svg className={`w-7 h-7`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                                </div>
                                <h3 className="text-xl font-extrabold mb-2 uppercase tracking-tight text-slate-800">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                                <span className="text-slate-900 font-black text-xs flex items-center gap-1 group-hover:gap-3 transition-all">XEM CHI TIẾT &rarr;</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SECTION 2: FLASH SALE (DECORATED) --- */}
                <div className="relative group/sale mb-16">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-400 rounded-[3.5rem] blur opacity-10 group-hover/sale:opacity-25 transition duration-1000"></div>
                    
                    <div className="relative bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl border border-white overflow-hidden">
                        {/* Họa tiết tia chớp chìm */}
                        <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none text-slate-900">
                            <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14H11V21L20 10H13Z" /></svg>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 relative z-10">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="relative">
                                    <div className="absolute -inset-2 bg-red-600 rounded-2xl blur-md opacity-20 animate-pulse"></div>
                                    <div className="relative flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-500 px-8 py-4 rounded-2xl shadow-xl">
                                        <svg className="w-7 h-7 text-white animate-bounce" fill="currentColor" viewBox="0 0 20 20"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"></path></svg>
                                        <h2 className="text-3xl font-black italic tracking-tighter text-white">FLASH SALE</h2>
                                    </div>
                                </div>
                                
                                <div className="flex gap-4 items-center bg-gray-50 p-2 rounded-2xl border border-gray-100">
                                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest pl-4 hidden sm:block">Kết thúc sau:</span>
                                    <div className="flex gap-2">
                                        {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <div className={`${idx === 2 ? 'bg-slate-900' : 'bg-red-600'} w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                                                    {val}
                                                </div>
                                                {idx < 2 && <span className="text-red-600 font-bold animate-pulse">:</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <button className="group/btn px-6 py-3 rounded-full bg-gray-50 hover:bg-red-600 transition-all border border-gray-100 flex items-center gap-2 text-sm font-black text-gray-500 hover:text-white">
                                XEM TẤT CẢ <span className="transform group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                            {flashSaleProducts.map((product, index) => (
                                <div key={index} className="group/item relative bg-white border border-gray-100 rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(239,68,68,0.12)] hover:-translate-y-2">
                                    <div className="absolute top-5 left-5 z-20 bg-red-600 text-white font-black px-3 py-1.5 rounded-xl text-[11px] shadow-lg shadow-red-200">
                                        -{Math.round((1 - product.GIAFLASHSALE / product.GIABAN) * 100)}%
                                    </div>
                                    
                                    <div className="aspect-square bg-gray-50 rounded-[2rem] mb-6 flex items-center justify-center overflow-hidden p-6 group-hover/item:bg-white transition-colors">
                                        <img src={`http://localhost:3001/${product.HINHANH}`} alt={product.TENSANPHAM} className="w-full h-full object-contain mix-blend-multiply group-hover/item:scale-110 transition-transform duration-700" />
                                    </div>
                                    
                                    <h3 className="text-sm font-bold text-slate-800 mb-3 truncate uppercase tracking-tight group-hover/item:text-red-600 transition-colors px-2">{product.TENSANPHAM}</h3>
                                    
                                    <div className="flex items-baseline gap-2 mb-5 px-2">
                                        <span className="text-red-600 font-black text-2xl tracking-tighter">{fun.formatCurrency(product.GIAFLASHSALE)}</span>
                                        <span className="text-gray-400 text-xs line-through">{fun.formatCurrency(product.GIABAN)}</span>
                                    </div>
                                    
                                    {/* PROGRESS BAR THÔNG MINH */}
                                    <div className="relative w-full h-5 bg-gray-100 rounded-full overflow-hidden mb-6 border border-gray-50 shadow-inner">
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className="text-[9px] font-black uppercase tracking-tighter text-gray-500">
                                                🔥 Đã bán {product.DABAN} / {product.SOLUONG_BAN}
                                            </span>
                                        </div>
                                        <div 
                                            className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-shimmer rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
                                            style={{ width: `${Math.min((product.DABAN / product.SOLUONG_BAN) * 100, 100)}%` }}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ width: `${100 / (Math.min((product.DABAN / product.SOLUONG_BAN) * 100, 100) / 100)}%` }}>
                                                <span className="text-[9px] font-black uppercase tracking-tighter text-white whitespace-nowrap">
                                                    🔥 Đã bán {product.DABAN} / {product.SOLUONG_BAN}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full bg-slate-900 text-white font-black py-3 rounded-xl text-[12px] hover:bg-red-600 transition-all duration-300 shadow-xl active:scale-95 uppercase tracking-widest">
                                        MUA NGAY
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- SECTION 3: THƯƠNG HIỆU --- */}
                <section className="py-10">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-black tracking-tight text-slate-800">THƯƠNG HIỆU NỔI BẬT</h2>
                            <div className="h-1 w-12 bg-red-600 rounded-full"></div>
                        </div>
                        <Link to='' className="text-slate-400 hover:text-red-600 text-sm font-black transition-all">XEM TẤT CẢ &rarr;</Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {loading ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
                                <div className="w-12 h-12 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin"></div>
                                <p className="text-slate-400 font-bold text-[10px] tracking-[0.3em] uppercase">Loading Brands...</p>
                            </div>
                        ) : (
                            ThuongHieu.map((item, index) => (
                                <Link to={`/san-pham/${item.IDTHUONGHIEU}/${item.TENTHUONGHIEU}`} key={index} className="group bg-white border border-slate-100 rounded-[2rem] p-8 h-32 flex items-center justify-center transition-all hover:shadow-2xl hover:-translate-y-2 hover:border-red-500 shadow-sm">
                                    <img className="h-full w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" src={`http://localhost:3001/${item.LOGO}`} alt={item.TENTHUONGHIEU} />
                                </Link>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SanPhamTrangChu;