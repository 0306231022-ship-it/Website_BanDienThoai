import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as API from '../../../../JS/API/API';
import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
function ChiTietThuongHieu() {
    const { id } = useParams();
    const [thuongHieu, setThuongHieu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { OpenMoDal } = useModalContext();
    const [page,setpage]= useState(1);
    const [PhanTrang,setPhanTrang] = useState({});
    const [SanPham,setSanPham]= useState([])
    const totalPages = Math.ceil(PhanTrang.Tong / 2);
    useEffect(() => {
        const fetchThuongHieu = async () => {
            setLoading(true);
            try {
                const ketqua = await API.CallAPI(undefined, {PhuongThuc: 2, url: `/admin/ChiTietThuongHieu?id=${id}`});
                if (ketqua.Status) {
                    setError(ketqua.message);
                    return;
                }
                setThuongHieu(ketqua.thuongHieu);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết thương hiệu:", error);
                setError("Không thể tải thông tin thương hiệu. Vui lòng thử lại.");
            } finally {
                setLoading(false);
            }
        };
        fetchThuongHieu();
    }, [id]);
    useEffect(()=>{
        const LaySP_ThuongHieu=async()=>{
            setLoading(true)
            try {
                const ketqua= await API.CallAPI(undefined,{url:`/admin/laysp_thuonghieu?id=${thuongHieu?.IDTHUONGHIEU}&page=${page}`, PhuongThuc:2});
                if(ketqua.ketqqua.ThanhCong){
                    setSanPham(ketqua.ketqqua.DuLieu);
                    setPhanTrang(ketqua.ketqqua.PhanTrang);
                    setLoading(false);
                }
            } catch (error) {
                setError('Không thể kết nối đến máy chủ!'+ error)
            } finally {
                setLoading(false)
            }
        };
        LaySP_ThuongHieu();
    },[ page ,thuongHieu])
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
                <div className="relative">
                    <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                    <div className="absolute inset-0 rounded-full blur-xl bg-teal-200/50 -z-10 animate-pulse"></div>
                </div>
                <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 text-center animate-fadeIn">
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 shadow-xl max-w-md">
                    <div className="mb-6"><i className="fa-solid fa-triangle-exclamation text-7xl text-red-500"></i></div>
                    <h3 className="text-xl font-extrabold text-gray-800 mb-2">Đã xảy ra lỗi!</h3>
                    <p className="text-red-600 font-medium mb-6">{error}</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-600 transition-all">Thử lại</button>
                        <button onClick={() => window.history.back()} className="px-6 py-2.5 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all">Quay lại</button>
                    </div>
                </div>
            </div>
        );
    }

    if (!thuongHieu) return null;

    return (
        <section className="p-4 md:p-8 bg-gray-50 min-h-screen animate-fadeIn font-sans">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-5">
                    <Link to="/admin/thuonghieu" className="group w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-200 text-gray-500 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-300">
                        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                    </Link>
                    <div>
                        <nav className="flex mb-1" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
                                <li>Thương hiệu</li>
                                <li><i className="fas fa-chevron-right text-[8px]"></i></li>
                                <li className="text-teal-600">Chi tiết</li>
                            </ol>
                        </nav>
                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                            {thuongHieu.TENTHUONGHIEU} <span className="text-teal-500 text-2xl font-medium">#{thuongHieu.IDTHUONGHIEU}</span>
                        </h2>
                    </div>
                </div>
                <button className="flex items-center px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 transition-all shadow-sm">
                    <i className="fas fa-file-export mr-2 text-teal-500"></i> Xuất báo cáo
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative group hover:shadow-md transition-shadow">
                        <button 
                            onClick={() => {
                                OpenMoDal({
                                    Ten: thuongHieu.TENTHUONGHIEU,
                                    LoGo: thuongHieu.LOGO,
                                    TrangThai: thuongHieu.TRANGTHAI,
                                    id: thuongHieu.IDTHUONGHIEU
                                }, { TenTrang: 'ThongTinCoBan' })
                            }}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur text-teal-600 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-teal-600 hover:text-white flex items-center justify-center cursor-pointer"
                        >
                            <i className="fas fa-pen"></i>
                        </button>
                        <div className="bg-gradient-to-br from-teal-500 to-teal-700 h-32 w-full relative">
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        </div>
                        <div className="px-6 pb-8 -mt-16 relative text-center">
                            <div className="inline-block p-1.5 bg-white rounded-3xl shadow-lg mb-4">
                                <div className="w-28 h-28 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100">
                                    <img src={`http://localhost:3001/${thuongHieu.LOGO}`} className="w-full h-full object-contain p-2" alt={thuongHieu.TENTHUONGHIEU} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{thuongHieu.TENTHUONGHIEU}</h3>
                            <p className="text-teal-600 text-xs font-bold uppercase tracking-widest mt-1">Đối tác chính thức</p>
                            <div className="grid grid-cols-2 gap-4 mt-8 border-t border-gray-100 pt-6 text-left">
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Trạng thái</p>
                                    <div className={` items-center gap-2 text-sm font-bold ${thuongHieu.TRANGTHAI !== 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        <span className={`w-2 h-2 rounded-full ${thuongHieu.TRANGTHAI !== 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {thuongHieu.TRANGTHAI !== 0 ? 'Hoạt động' : 'Tạm dừng'}
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Tổng sản phẩm</p>
                                    <p className="text-sm font-bold text-gray-800">{thuongHieu.tongSanPham} <span className="text-gray-400 text-xs font-normal">sản phẩm</span></p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between items-center text-sm px-2">
                                <span className="text-gray-500">Ngày tham gia:</span>
                                <span className="font-semibold text-gray-700 font-mono">
                                    {new Date(thuongHieu.NGAYTAO).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <span className="w-1.5 h-6 bg-teal-500 rounded-full mr-3"></span>
                                Giới thiệu
                            </h3>
                            <button onClick={() => {
                                OpenMoDal({
                                    DuLieu: thuongHieu.MOTA,
                                    id: thuongHieu.IDTHUONGHIEU
                                }, {
                                    TenTrang: 'SuaMoTa',
                                    url: '/admin/SuaMoTathuongHieu'
                                })
                            }} className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-sm font-bold hover:bg-teal-600 hover:text-white transition-all">
                                <i className="fas fa-edit"></i> <span className="hidden sm:inline">Chỉnh sửa</span>
                            </button>
                        </div>
                        <div className="relative z-10">
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {thuongHieu.MOTA ? thuongHieu.MOTA : <span className="italic text-gray-400">Chưa có mô tả nào cho thương hiệu này. Hãy thêm mô tả để khách hàng hiểu rõ hơn.</span>}
                            </p>
                        </div>
                        <i className="fas fa-quote-right absolute -top-2 right-6 text-gray-50 text-[120px] -z-0"></i>
                    </div>
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <i className="fas fa-box-open mr-3 text-teal-500"></i>
                                Sản phẩm thuộc thương hiệu
                            </h3>
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                               Tổng : {thuongHieu.tongSanPham}
                            </span>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {SanPham.map((product) => (
                                <div key={product.IDSANPHAM} className="group flex flex-col sm:flex-row items-start sm:items-center p-6 gap-6 hover:bg-gray-50 transition duration-200">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
                                        <img 
                                            src={`http://localhost:3001/${product.HINHANH}`} 
                                            alt={product.TENSANPHAM} 
                                            className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500" 
                                        />
                                    </div>
                                    <div className="flex-1 w-full min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                            <div className="mb-2 sm:mb-0">
                                                <h4 className="text-base font-bold text-gray-900 truncate pr-4 hover:text-teal-600 cursor-pointer transition-colors">
                                                    {product.TENSANPHAM}
                                                </h4>
                                                <p className="mt-1 text-sm text-gray-500 flex items-center gap-2">
                                                    <span>Mã: <span className="font-mono text-gray-400">{product.IDSANPHAM}</span></span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                    <span className={`font-medium ${product.SOLUONG >= 5 ? 'text-green-600' : 'text-orange-500'}`}>
                                                        {product.SOLUONG>=5 ? 'Còn hàng' : 'Sắp hết sản phẩm'}
                                                    </span>
                                                </p>
                                            </div>
                                            <p className="text-lg font-bold text-red-600 whitespace-nowrap">{product.price}</p>
                                        </div>
                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                            {/* Stars Rating */}
                                            <div className="flex gap-1">
                                                <i className="fas fa-star text-yellow-400 text-xs"></i>
                                                <i className="fas fa-star text-yellow-400 text-xs"></i>
                                                <i className="fas fa-star text-yellow-400 text-xs"></i>
                                                <i className="fas fa-star text-yellow-400 text-xs"></i>
                                                <i className="fas fa-star-half-alt text-yellow-400 text-xs"></i>
                                                <span className="text-xs text-gray-400 ml-1">(24)</span>
                                            </div>

                                            {/* NÚT XEM CHI TIẾT ĐÃ THÊM Ở ĐÂY */}
                                            <Link 
                                                to={`/admin/chitiet-sanpham/${product.id}`} 
                                                className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-300 group/btn"
                                            >
                                                <i className="fas fa-eye text-xs group-hover/btn:scale-110 transition-transform"></i> Xem chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination (Static) */}
                        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50">
                            <div className="flex items-center justify-between">
                                <div className="hidden sm:flex flex-1 items-center justify-between">
                                    <p className="text-sm text-gray-700">
                                        Hiển thị <span className="font-bold">{PhanTrang.BatDau}</span> đến <span className="font-bold">{PhanTrang.KetThuc}</span> trong tổng số <span className="font-bold">{PhanTrang.Tong}</span> kết quả
                                    </p>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                        <button disabled={page===1} onClick={() => {setpage(p => p - 1)}} className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                            <span className="sr-only">Previous</span>
                                            <i className="fas fa-chevron-left text-xs"></i>
                                        </button>
                                        <span aria-current="page" className="relative z-10 inline-flex items-center bg-teal-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">{page}</span>
                                        <button disabled={page === totalPages} onClick={()=>{setpage(p=>p+1)}} className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                            <span className="sr-only">Next</span>
                                            <i className="fas fa-chevron-right text-xs"></i>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ChiTietThuongHieu;