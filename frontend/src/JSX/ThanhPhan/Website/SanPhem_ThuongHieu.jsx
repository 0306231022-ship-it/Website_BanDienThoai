import { useParams ,Link , useNavigate} from "react-router-dom";
import { useEffect ,useState } from "react";
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';
function SanPhamThuongHieu() {
        const { id } = useParams();
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        const [page, setPage] = useState(1);
        const [ThuongHieu, setThuongHieu] = useState({});
        const [PhanTrang, setPhanTrang] = useState({});
        const [DanhSachSanPham, setDanhSachSanPham] = useState([]);
        const [sanPham, setSanPham] = useState([]);
         useEffect(() => {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await API.CallAPI(undefined,{url :`/website/thuonghieu_sanpham?id=${id}&page=${page}`, PhuongThuc:2});
                    if(response.ThanhCong){
                        setThuongHieu(response.DuLieu.thuonghieu);
                        setPhanTrang(response.DuLieu.phantrang);
                        setDanhSachSanPham(response.DuLieu.sanpham);
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy dữ liệu thương hiệu:", error);
                } finally {
                    setLoading(false);
                }
            };
            if (id) {
                fetchData();
            }
         }, [id, page]);
         useEffect(() => {
            const fetchSanPham = async () => {
                //trong SanPham lọc lấy mảng IDSANPHAM
                if (DanhSachSanPham.length > 0) {
                    const ids = DanhSachSanPham.map(sp => sp.IDSANPHAM).join(',');
                    try {
                        const response = await API.CallAPI(undefined, { url: `/website/sanpham_deal?ids=${ids}`, PhuongThuc: 2 });
                        if (response.ThanhCong) {
                            setSanPham(response.DuLieu);
                        }
                    } catch (error) {
                        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
                    }
                }

            }
         }, []);
        if (!id) {
            return <div class="flex items-center justify-center h-screen">
                <p class="text-2xl font-bold text-gray-500">Không tìm thấy thương hiệu</p>
            </div>;
        }
        if (loading) {
            return <div class="flex items-center justify-center h-screen">
                <p class="text-2xl font-bold text-gray-500">Đang tải...</p>
            </div>;
        }
       

    return (
        <div class="bg-gray-50 min-h-screen font-sans text-slate-900">
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 pt-6">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="group flex items-center gap-2 text-slate-400 hover:text-red-600 transition-all font-black text-[10px] uppercase tracking-[0.2em]"
                    >
                        <i className="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
                        Quay lại
                    </button>
                </div>
            </div>
    <div class="bg-white border-b border-gray-100 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center gap-8">
            <div class="w-32 h-32 bg-white rounded-3xl border border-gray-100 shadow-xl flex items-center justify-center p-4">
                <img src={`http://localhost:3001/${ThuongHieu.LOGO}`} alt="Brand Logo" class="h-full w-full object-contain"/>
            </div>
            <div class="flex-1 text-center md:text-left">
                <h1 class="text-4xl font-black tracking-tighter uppercase mb-2">{ThuongHieu.TENTHUONGHIEU}</h1>
                <p class="text-slate-500 max-w-2xl leading-relaxed italic">
                    {ThuongHieu.MOTA || 'Đây là mô tả của thương hiệu. Thông tin chi tiết về thương hiệu sẽ được hiển thị ở đây.'}
                </p>
                <div class="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                    <span class="bg-slate-100 px-4 py-1.5 rounded-full text-xs font-bold text-slate-600 uppercase tracking-widest"> {PhanTrang.tong || 0} Sản phẩm</span>
                    <span class="bg-green-100 px-4 py-1.5 rounded-full text-xs font-bold text-green-600 uppercase tracking-widest">Đang có ưu đãi</span>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-10">
        <div class="flex flex-col lg:flex-row gap-8">
            
            <aside class="w-full lg:w-64 space-y-8 shrink-0">
           <div>
        <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Danh mục</h3>
        </div>
        <ul className="space-y-3">
            {[
                { name: "iPhone", count: 42 },
                { name: "MacBook", count: 18 },
                { name: "iPad", count: 12 },
                { name: "Phụ kiện", count: 56 }
            ].map((item) => (
                <li key={item.name}>
                    <button 
                        type="button"
                        className="w-full flex justify-between items-center py-2 px-3 rounded-xl text-sm font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all group"
                    >
                        <span>{item.name}</span>
                        <span className="bg-slate-100 group-hover:bg-red-100 group-hover:text-red-600 px-2.5 py-1 rounded-lg text-[10px] transition-colors">
                            {item.count}
                        </span>
                    </button>
                </li>
            ))}
        </ul>
    </div>

    <hr className="border-gray-50" />

    {/* KHOẢNG GIÁ - Thiết kế Checkbox tùy chỉnh */}
    <div>
        <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Khoảng giá</h3>
        </div>
        <div className="space-y-4">
            {[
                "Dưới 10 Triệu",
                "10 - 20 Triệu",
                "Trên 20 Triệu"
            ].map((price) => (
                <label key={price} className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center justify-center">
                        <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-md checked:bg-red-600 checked:border-red-600 transition-all" />
                        <i className="fas fa-check absolute text-[10px] text-white opacity-0 peer-checked:opacity-100 transition-opacity"></i>
                    </div>
                    <span className="ml-3 text-sm font-bold text-slate-500 group-hover:text-slate-800 transition-colors uppercase tracking-tight">
                        {price}
                    </span>
                </label>
            ))}
        </div>
    </div>

    {/* BANNER QC - Thiết kế hiện đại hơn */}
    <div className="relative group overflow-hidden rounded-[2rem] bg-slate-900 p-6 transition-all hover:shadow-2xl hover:shadow-red-100/50">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-red-600/30 transition-colors"></div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">Hot Deal</p>
            </div>
            
            <h4 className="text-xl font-black text-white leading-tight mb-2 italic">iPhone 15 Pro</h4>
            <p className="text-slate-400 text-[11px] font-medium mb-5">Giảm ngay 2.000.000đ khi thanh toán qua thẻ.</p>
            
            <button className="w-full bg-white hover:bg-red-600 hover:text-white text-slate-900 text-[11px] font-black py-3 rounded-xl uppercase tracking-widest transition-all active:scale-95">
                Nhận ưu đãi
            </button>
        </div>

        {/* Decor icon */}
        <i className="fab fa-apple absolute -right-2 -bottom-2 text-7xl text-white/5 group-hover:text-white/10 transition-all rotate-12"></i>
    </div>
            </aside>

            <main class="flex-1">
                <div class="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 gap-4">
                    <p class="text-sm text-slate-500">Hiển thị <span class="font-bold text-slate-900"> {PhanTrang.batdau || 0} - {PhanTrang.ketthuc || 0} </span>  của {PhanTrang.tong || 0} sản phẩm</p>
                    <div class="flex items-center gap-4">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-tighter">Sắp xếp:</span>
                        <select class="text-sm font-bold bg-slate-50 border-none rounded-xl focus:ring-0 cursor-pointer">
                            <option>Mới nhất</option>
                            <option>Giá thấp đến cao</option>
                            <option>Giá cao đến thấp</option>
                            <option>Bán chạy nhất</option>
                        </select>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        DanhSachSanPham.length === 0 ? (
                            <div className="col-span-full py-20 flex flex-col items-center justify-center animate-fadeIn">
            {/* Minh họa Icon Empty State */}
            <div className="relative mb-8">
                <div className="w-40 h-40 bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-inner">
                    <i className="fas fa-box-open text-6xl text-slate-300"></i>
                </div>
                {/* Decor tiểu tiết */}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center animate-bounce">
                    <i className="fas fa-search text-red-400 text-sm"></i>
                </div>
                <div className="absolute -bottom-2 -left-4 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center animate-pulse">
                    <i className="fas fa-tag text-blue-300 text-sm"></i>
                </div>
            </div>

            {/* Nội dung thông báo */}
            <div className="text-center max-w-md px-6">
                <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter mb-3 italic">
                    Chưa có sản phẩm nào!
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                    Thương hiệu <span className="text-red-600 font-bold">"{ThuongHieu.TENTHUONGHIEU}"</span> hiện chưa cập nhật sản phẩm trong danh mục này. Vui lòng quay lại sau hoặc khám phá các thương hiệu khác.
                </p>

                {/* Nút hành động */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-slate-900 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
                    >
                        Về trang chủ
                    </button>
                    <button 
                        onClick={() => navigate(-1)}
                        className="px-8 py-3 bg-white border-2 border-slate-100 text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:border-red-600 hover:text-red-600 transition-all active:scale-95"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 opacity-30 grayscale">
                 <i className="fab fa-apple text-4xl"></i>
                 <i className="fab fa-android text-4xl"></i>
                 <i className="fas fa-microchip text-4xl"></i>
            </div>
        </div>
                        ) : (
                            DanhSachSanPham.map((sanpham) => (
                                   <div class="group bg-white rounded-[2rem] border border-gray-100 p-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative">
                                    {
                                        sanpham.SOLUONG > 0 ? (
                                            <div class="absolute top-4 left-4 z-10 bg-green-600 text-white text-[10px] font-black px-3 py-1 rounded-lg">Còn hàng</div>
                                        ) : (
                                            <div class="absolute top-4 left-4 z-10 bg-gray-600 text-white text-[10px] font-black px-3 py-1 rounded-lg">Hết hàng</div>
                                        )
                                    }
   {
    (sanpham.KHUYENMAI && sanpham.KHUYENMAI > 0 && sanpham.KHUYENMAI < sanpham.GIABAN) ? (
        <div class="absolute top-4 right-4 z-10 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">
            -{Math.round(((sanpham.KHUYENMAI - sanpham.GIABAN) / sanpham.KHUYENMAI) * 100)}%
        </div>
    ) : null
}
                        <div class="aspect-square bg-slate-50 rounded-[1.5rem] mb-4 flex items-center justify-center p-6 overflow-hidden group-hover:bg-white transition-colors">
                            <img src={`http://localhost:3001/${sanpham.HINHANH}`} alt={sanpham.TENSANPHAM}
                                 class="w-full h-full object-contain mix-blend-multipy group-hover:scale-110 transition-transform duration-700"/>
                        </div>
                        <div class="px-2">
                            <h3 class="text-sm font-bold text-slate-800 truncate uppercase mb-2 group-hover:text-red-600 transition-colors">{sanpham.TENSANPHAM}</h3>
                            <div class="flex items-baseline gap-2 mb-4">
                                <span class="text-lg font-black text-red-600">{fun.formatCurrency(sanpham.GIABAN)}</span>
                                <span class="text-[10px] text-slate-400 line-through">{fun.formatCurrency(sanpham.KHUYENMAI)}</span>
                            </div>
                            <Link to={`/chi-tiet-san-pham/${sanpham.IDSANPHAM}`} class="w-full bg-slate-900 text-white p-4 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-slate-100">Xem chi tiết</Link>
                        </div>
                    </div>
                            ))
                        )

                    }
                    </div>

                <div class="mt-12 flex justify-center gap-2">
                    <button onClick={()=>{setPage(p=>p-1)}} disabled={page === 1} class="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-bold text-sm text-slate-400 hover:border-red-600 hover:text-red-600 transition-all">Trước</button>
                    <span class="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-red-200">{page}</span>
                    <button onClick={()=>{setPage(p=>p+1)}} disabled={page === Math.ceil(PhanTrang.tong / 10)} class="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center font-bold text-sm text-slate-400 hover:border-red-600 hover:text-red-600 transition-all">Sau</button>
                </div>
            </main>
        </div>
    </div>
</div>
    )
};
export default SanPhamThuongHieu;
