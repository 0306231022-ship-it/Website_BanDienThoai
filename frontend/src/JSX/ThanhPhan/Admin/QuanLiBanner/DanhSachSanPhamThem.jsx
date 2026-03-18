import * as API from '../../../../JS/API/API';
import { useEffect, useState } from 'react';
import * as fun from '../../../../JS/FUNCTONS/function';
function ThemSanPham() {
    const [DanhSachSanPham, setDanhSachSanPham] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [SoSanPhamChon, setSoSanPhamChon] = useState(0);
    const [ThuongHieu, setThuongHieu] = useState([]);
    const [data,setdata] = useState({
        IDSP: '',
        IDTHUONGHIEU: '',
    });
    const [CapNhat, setCapNhat] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const danhsach = await API.CallAPI(undefined,{PhuongThuc:2 , url :`/admin/lay_ds_sanpham?page=${page}`});
                if(danhsach.ThanhCong){
                    setDanhSachSanPham(danhsach.DuLieu);
                    setTotalPages(danhsach.total);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page, CapNhat]);
    useEffect(() => {
        const fetchThuongHieu = async () => {
            try {
                const ketqua = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/admin/lay_ds_thuonghieu` });
                if (ketqua.ThanhCong) {
                    setThuongHieu(ketqua.DuLieu);
                }
            } catch (error) {
                console.error('Đã có lỗi xảy ra:' + error)
            }
        };
        fetchThuongHieu();
    }, []);
    const TimKiem=async()=>{
        setLoading(true);
        try {
            const ketqua = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/admin/TimKiem_sanpham_flash?IDSP=${data.IDSP}&IDTHUONGHIEU=${data.IDTHUONGHIEU}` })
            if (ketqua.ThanhCong) {
                if(!ketqua.dulieu){
                    setDanhSachSanPham([]);
                    setTotalPages(1);
                    return;
                }
                setDanhSachSanPham(ketqua.dulieu);
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
        } finally {
            setLoading(false);
        }
    }
            


    return (
        <div className="w-full bg-white flex flex-col">
            
            {/* Thanh tìm kiếm và bộ lọc */}
            <div className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="flex flex-col md:flex-row items-center gap-3 w-full p-4 rounded-2xl border border-white/5 backdrop-blur-md">
  
  {/* 1. Thanh tìm kiếm cải tiến */}
  <div className="relative flex-1 w-full group">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg className="w-4 h-4 text-slate-500 group-focus-within:text-[#2979FF] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input 
      type="text" 
      placeholder=" mã SKU..." 
      onChange={(e) => { setdata({ ...data, IDSP: e.target.value }); }}
      className="w-full pl-10 pr-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-[#2979FF]/50 focus:border-[#2979FF] transition-all text-sm placeholder:text-slate-600"
    />
  </div>

  {/* 2. Cụm Select & Nút Lọc */}
  <div className="flex gap-2 w-full md:w-auto">
    <div className="relative flex-1 md:w-48">
      <select onChange={(e)=>{setdata({...data,IDTHUONGHIEU:e.target.value})}} className="w-full border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none appearance-none focus:border-[#2979FF] cursor-pointer transition-all">
        <option value="all">Tất cả thương hiệu</option>
        {ThuongHieu && ThuongHieu.map((th) => (
          <option key={th.IDTHUONGHIEU} value={th.IDTHUONGHIEU}>{th.TENTHUONGHIEU}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </div>
    </div>
      <button onClick={() => setCapNhat(!CapNhat)} className="flex items-center gap-2 bg-teal-600  text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-95">
       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l5 5m-5-5l5-5" />
</svg>
      Quay lại
    </button>

    {/* 3. Nút Lọc (Filter Button) */}
    <button onClick={() => TimKiem()} className="flex items-center gap-2 bg-teal-600  text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-95">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
      Lọc
    </button>
  </div>
</div>
            </div>

            {/* Bảng danh sách sản phẩm */}
            <div className="flex-1 overflow-y-auto bg-gray-50/30 p-4">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-100 text-gray-700 font-semibold text-xs uppercase sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="px-4 py-3 w-12 text-center">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"/>
                                </th>
                                <th className="px-4 py-3">Sản phẩm</th>
                                <th className="px-4 py-3">Giá bán lẻ (Gốc)</th>
                                <th className="px-4 py-3 text-center">Tồn kho tổng</th>
                                <th className="px-4 py-3 text-center">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                 {loading ? (
    <tr>
        <td colSpan="5" className="px-4 py-3 text-center">
            {/* Nội dung loading */}
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
                <div className="relative">
                    <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                    <div className="absolute inset-0 rounded-full blur-xl bg-teal-200/50 -z-10 animate-pulse"></div>
                </div>
                <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
            </div>
        </td>
    </tr>
) : DanhSachSanPham.length === 0 ? (
    <tr>
        <td colSpan="5" className="px-4 py-3 text-center">
            {/* Nội dung trống */}
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
                <div className="relative">
                    <i className="fa-solid fa-box-open text-6xl text-gray-400"></i>
                </div>
                <p className="text-gray-500 font-bold tracking-widest text-sm uppercase">Không tìm thấy sản phẩm nào</p>
            </div>
        </td>
    </tr>
) : (
    DanhSachSanPham.map((sanpham) => (
        <tr key={sanpham.IDSANPHAM} className="hover:bg-blue-50/50 transition cursor-pointer">
            <td className="px-4 py-3 text-center">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer" />
            </td>
            <td className="px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 border border-gray-200 rounded flex-shrink-0">
                    <img src={`http://localhost:3001/${sanpham.HINHANH}`} alt={sanpham.TENSANPHAM} className="w-full h-full object-cover rounded" />
                </div>
                <div className="text-left">
                    <div className="font-bold text-gray-800 line-clamp-1">{sanpham.TENSANPHAM}</div>
                    <div className="text-xs text-gray-400">ID: {sanpham.IDSANPHAM}</div>
                </div>
            </td>
            <td className="px-4 py-3 font-medium text-gray-900">{fun.formatCurrency(sanpham.GIABAN)}</td>
            <td className="px-4 py-3 text-center">
                <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md font-medium text-xs">{sanpham.TONG_TONKHO} cái</span>
            </td>
            <td className="px-4 py-3 text-center">
                <span className="text-xs text-gray-500">Sẵn sàng</span>
            </td>
        </tr>
    ))
)}
            
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">Hiển thị {Math.min((page - 1) * 10 + 1, totalPages)}-{Math.min(page * 10, totalPages)} trên tổng số {totalPages} sản phẩm</span>
                    <div className="flex gap-1">
                        <button onClick={(e)=>{setPage(p=>p-1)}} disabled={page === 1} className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 text-sm">Trước</button>
                        <span className="px-3 py-1 border border-gray-300 rounded bg-blue-600 text-white font-medium text-sm">{page}</span>
                        <button onClick={(e)=>{setPage(p=>p+1)}} disabled={page === Math.ceil(totalPages / 10)} className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 text-sm">Sau</button>
                    </div>
                </div>
            </div>

            {/* Footer hành động */}
            <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-between items-center">
                <div className="text-sm font-medium text-gray-700">
                    Đã chọn: <span className="text-blue-600 font-bold text-lg px-1">{SoSanPhamChon}</span> sản phẩm
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition">
                        Hủy bỏ
                    </button>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md shadow-blue-200 transition flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Xác nhận thêm
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ThemSanPham;