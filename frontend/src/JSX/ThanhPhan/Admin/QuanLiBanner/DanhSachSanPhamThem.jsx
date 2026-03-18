import * as API from '../../../../JS/API/API';
import { useEffect, useState } from 'react';
import * as fun from '../../../../JS/FUNCTONS/function';
import { useFlashSaleContext } from '../../../../CONTEXT/QuanLi_FlashSale';
import { useModalContext } from '../../../../CONTEXT/QuanLiModal';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';

function ThemSanPham() {
    const {SanPham, setSanPham } = useFlashSaleContext();
    const { CloseAllModals } = useModalContext();
    const [DanhSachSanPham, setDanhSachSanPham] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [ThuongHieu, setThuongHieu] = useState([]);
    const [data, setdata] = useState({
        IDSP: '',
        IDTHUONGHIEU: '',
    });
    const [CapNhat, setCapNhat] = useState(false);

    // API lấy danh sách sản phẩm
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const danhsach = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/admin/lay_ds_sanpham?page=${page}` });
                if (danhsach.ThanhCong) {
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

    // API lấy danh sách thương hiệu
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

    const TimKiem = async () => {
        setLoading(true);
        try {
            const ketqua = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/admin/TimKiem_sanpham_flash?IDSP=${data.IDSP}&IDTHUONGHIEU=${data.IDTHUONGHIEU}` })
            if (ketqua.ThanhCong) {
                if (!ketqua.dulieu) {
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
    const handleCheckProduct = (sanpham) => {
        setSelectedProducts((prev) => {
            const isExist = prev.find(item => item.IDSANPHAM === sanpham.IDSANPHAM);
            if (isExist) {
                return prev.filter(item => item.IDSANPHAM !== sanpham.IDSANPHAM);
            } else {
                return [...prev, {
                    IDSANPHAM: sanpham.IDSANPHAM,
                    TENSANPHAM: sanpham.TENSANPHAM,
                    GIABAN: sanpham.GIABAN,
                    HINHANH: sanpham.HINHANH
                }];
            }
        });
    };

    const handleSelectAllInPage = (e) => {
        if (e.target.checked) {
            const newSelection = [...selectedProducts];
            DanhSachSanPham.forEach(sp => {
                if (!newSelection.find(item => item.IDSANPHAM === sp.IDSANPHAM)) {
                    newSelection.push({
                        IDSANPHAM: sp.IDSANPHAM,
                        TENSANPHAM: sp.TENSANPHAM,
                        GIABAN: sp.GIABAN,
                        HINHANH: sp.HINHANH
                    });
                }
            });
            setSelectedProducts(newSelection);
        } else {
            const pageIds = DanhSachSanPham.map(sp => sp.IDSANPHAM);
            setSelectedProducts(selectedProducts.filter(item => !pageIds.includes(item.IDSANPHAM)));
        }
    };
    const XacNhan=()=>{
        const newProducts = selectedProducts.filter(sp => !SanPham.some(item => item.IDSANPHAM === sp.IDSANPHAM));
        setSanPham(prev => [...prev, ...newProducts]);
        ThongBao.ThongBao_ThanhCong('Đã thêm ' + newProducts.length + ' sản phẩm vào Flash Sale!');
        CloseAllModals();
    }

    return (
        <div className="w-full bg-white flex flex-col min-h-screen">

            {/* Thanh tìm kiếm và bộ lọc */}
            <div className="p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="flex flex-col md:flex-row items-center gap-3 w-full p-4 rounded-2xl border border-gray-100 shadow-sm bg-gray-50/50">
                    <div className="relative flex-1 w-full group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-slate-500 group-focus-within:text-[#2979FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Nhập mã SKU hoặc tên..."
                            onChange={(e) => { setdata({ ...data, IDSP: e.target.value }); }}
                            className="w-full pl-10 pr-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <select onChange={(e) => { setdata({ ...data, IDTHUONGHIEU: e.target.value }) }} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 cursor-pointer">
                            <option value="all">Tất cả thương hiệu</option>
                            {ThuongHieu && ThuongHieu.map((th) => (
                                <option key={th.IDTHUONGHIEU} value={th.IDTHUONGHIEU}>{th.TENTHUONGHIEU}</option>
                            ))}
                        </select>
                        
                        <button onClick={() => setCapNhat(!CapNhat)} className="flex items-center gap-2 bg-gray-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-700 transition-all">
                            Quay lại
                        </button>

                        <button onClick={() => TimKiem()} className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-700 transition-all">
                            Lọc
                        </button>
                    </div>
                </div>
            </div>

            {/* Bảng danh sách sản phẩm */}
            <div className="flex-1 overflow-y-auto bg-gray-50/30 p-4">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-100 text-gray-700 font-semibold text-xs uppercase sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="px-4 py-3 w-12 text-center">
                                    <input 
                                        type="checkbox" 
                                        onChange={handleSelectAllInPage}
                                        checked={DanhSachSanPham.length > 0 && DanhSachSanPham.every(sp => selectedProducts.some(item => item.IDSANPHAM === sp.IDSANPHAM))}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                                    />
                                </th>
                                <th className="px-4 py-3">Sản phẩm</th>
                                <th className="px-4 py-3">Giá bán lẻ</th>
                                <th className="px-4 py-3 text-center">Tồn kho</th>
                                <th className="px-4 py-3 text-center">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-4 py-20 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                                            <p className="text-gray-400 font-medium">Đang tải dữ liệu...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : DanhSachSanPham.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-4 py-20 text-center">
                                        <p className="text-gray-400 font-medium italic">Không tìm thấy sản phẩm nào</p>
                                    </td>
                                </tr>
                            ) : (
                                DanhSachSanPham.map((sanpham) => {
                                    const isSelected = selectedProducts.some(item => item.IDSANPHAM === sanpham.IDSANPHAM);
                                    return (
                                        <tr key={sanpham.IDSANPHAM} className={`hover:bg-blue-50/30 transition cursor-pointer ${isSelected ? 'bg-blue-50/60' : ''}`}>
                                            <td className="px-4 py-3 text-center">
                                                <input 
                                                    type="checkbox" 
                                                    checked={isSelected}
                                                    onChange={() => handleCheckProduct(sanpham)}
                                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer" 
                                                />
                                            </td>
                                            <td className="px-4 py-3 flex items-center gap-3" onClick={() => handleCheckProduct(sanpham)}>
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
                                                {isSelected ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase ring-1 ring-blue-200">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                                        Đã chọn
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">Sẵn sàng</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">Hiển thị {Math.min((page - 1) * 10 + 1, totalPages)}-{Math.min(page * 10, totalPages)} trên tổng số {totalPages} sản phẩm</span>
                    <div className="flex gap-1">
                        <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-sm">Trước</button>
                        <span className="px-4 py-1 border border-teal-600 rounded bg-teal-600 text-white font-medium text-sm">{page}</span>
                        <button onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(totalPages / 10)} className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-sm">Sau</button>
                    </div>
                </div>
            </div>

            {/* Footer hành động */}
            <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-between items-center sticky bottom-0 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
                <div className="text-sm font-medium text-gray-700">
                    Đã chọn: <span className="text-teal-600 font-bold text-xl px-1">{selectedProducts.length}</span> sản phẩm
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setSelectedProducts([])} className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition">
                        Bỏ chọn tất cả
                    </button>
                    <button 
                        disabled={selectedProducts.length === 0}
                        onClick={() => XacNhan()}
                        className={`px-6 py-2 rounded-lg font-medium shadow-md transition flex items-center gap-2 ${selectedProducts.length > 0 ? 'bg-teal-600 text-white shadow-blue-200' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Xác nhận thêm ({selectedProducts.length})
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ThemSanPham;