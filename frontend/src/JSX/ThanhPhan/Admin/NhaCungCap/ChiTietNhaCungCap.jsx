import React, { useState, useEffect } from 'react';
import { useParams , Link } from "react-router-dom";
import * as API from '../../../../JS/API/API';
import CompanyInfoCard from './compoment/ThongTin';
import StatRow from './compoment/StarRow';
import BankCard from './compoment/NganHang';
import { useModalContext } from '../../../../CONTEXT/QuanLiModal';
import * as fun from '../../../../JS/FUNCTONS/function'
function ChiTietNhaCungCap() {
    const [activeTab, setActiveTab] = useState('history');
    const { id } = useParams();
    const [dulieu, setdulieu] = useState(null);
    const [err, seterr] = useState('');
    const [loading, setloading] = useState(false);
    const { OpenMoDal } = useModalContext();
    const [loading2,setloading2] = useState(false);
    const [page,setpage] = useState(1);
    const [PhieuNhap_theo_idncc,setPhieu] = useState([]);
    const [PhanTrang_phieunhap,setPhanTrang_PhieuNhap] = useState({})
    const [page1,setpage1] = useState(1);
    const [sanpham,setsanpham] = useState([]);
    const [TongPhieuNhap,setTongPhieuNhap] = useState(0);
    const[TongThuNhap,setTongThuNhap] = useState(0);
    useEffect(() => {
        const layDL = async () => {
            setloading(true);
            try {
                const ketqua = await API.CallAPI(undefined, { url: `/admin/ChiTietNhaCungCap?id=${id}`, PhuongThuc: 2 });
                if (ketqua.Status) {
                    seterr(ketqua.message);
                    setloading(false);
                    return;
                };
                if (ketqua) {
                    setdulieu(ketqua.DuLieu);
                    setTongPhieuNhap(ketqua.TongPhieuNhap?.TotalPhieuNhap);
                    setTongThuNhap(ketqua.TongThuNhap);
                    setloading(false);
                    return;
                }
            } catch (error) {
                console.error('Đã có lỗi xãy ra ! :' + error);
                seterr('Không thể tải thông tin nhà cung cấp. Vui lòng thử lại.')
            } finally {
                setloading(false)
            }
        }
        layDL();
    }, [id]);
    //Lấy API lịch sử nhập hàng theo IDNCC
    const [khoidong,setKhoiDong] = useState(true);
    useEffect(()=>{
        setloading2(true)
        const laydata= async()=>{
            try {
                const ketqua= await API.CallAPI(undefined,{PhuongThuc:2, url: `/admin/laydspn_idncc?id=${id}&page=${page}`});
                if(ketqua.ThanhCong){
                    setPhieu(ketqua.dulieu);
                    setPhanTrang_PhieuNhap(ketqua.Trang)
                    setloading2(false)
                }
            } catch (error) {
                console.error('Lỗi sảy ra:' + error)
            } finally {
                setloading2(false)
            }
        };
        laydata();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page,id, khoidong])
    //lấy sản phẩm thuộc nhà cung cấp
    const [khoidong1,setKhoiDong1] = useState(true);
    const [message,setmessage] = useState('');
    useEffect(()=>{
        const laydulieu = async()=>{
            setloading(true)
            try {
                const ketqua = await API.CallAPI(undefined,{PhuongThuc:2, url:`/admin/lay_sp_theo_id_ncc?page=${page1}&id=${id}`});
                if(ketqua.status){
                    seterr(ketqua.message);
                }
                if(ketqua.ThanhCong){
                    setsanpham(ketqua.dulieu);
                    setmessage(ketqua.message);
                }
            } catch (error) {
                console.error('Lỗi:'+ error)
            } finally {
                setloading(false)
            }
        };
        laydulieu()
    },[page1,id, khoidong1])
    //Thực hiện chức năng tìm kiếm lịch sử nhập 
     const [key,setkey] = useState({
        TimKiem:'',
        NguoiTao:'',
        TrangThai:'',
        TuNgay:'',
        DenNgay:''
     });
     const [HoTen,setHoTen] = useState([]);
     useEffect(()=>{
        const layHoTen = async()=>{
            try {
                const ketqua = await API.CallAPI(undefined,{PhuongThuc:2, url:'/admin/getTT_users'});
                setHoTen(ketqua.DuLieu);
            } catch (error) {
                console.error('Lỗi:'+ error)
            }
        };
        layHoTen();
    },[]);
    const handleChange = (e)=>{
        setkey({...key,[e.target.name]:e.target.value})
    }
    const handleSearch = async()=>{
        setloading2(true);
            try {
                const ketqua = await API.CallAPI(undefined,{PhuongThuc:2, url:`/admin/timkiem_phieunhap_idncc?id=${id}&TimKiem=${key.TimKiem}&NguoiTao=${key.NguoiTao}&TrangThai=${key.TrangThai}&TuNgay=${key.TuNgay}&DenNgay=${
                    key.DenNgay
                }`});
                if(ketqua.ThanhCong){
                    setPhieu(ketqua.DuLieu);
                }
            } catch (error) {
                console.error('Lỗi:'+ error)
            } finally {
                setloading2(false)
            }
        }
        const handleReset = async()=>{
            setkey({
                TimKiem:'',
                NguoiTao:'',
                TrangThai:'',
                TuNgay:'',
                DenNgay:''
            });
            setpage(1);
            setKhoiDong(!khoidong);
        }
    //Thực hiện chức năng tìm kiếm sản phâm theo IDNCC
  const [searchTerm, setSearchTerm] = useState("");
  const Reset_GTSP = ()=>{
    setSearchTerm("");
    setpage1(1);
    setKhoiDong1(!khoidong1);
    }
    const handleSearchSP = async()=>{
        setloading(true);
        try {
            const ketqua = await API.CallAPI(undefined,{PhuongThuc:2, url:`/admin/timkiem_sp_theo_idncc?id=${id}&TimKiem=${searchTerm}`});
            if(ketqua.ThanhCong){
                setsanpham(ketqua.dulieu);
            }
        } catch (error) {
            console.error('Lỗi:'+ error)
        } finally {
            setloading(false)
        }
    }
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
                <div className="relative">
                    <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                    <div className="absolute inset-0 rounded-full blur-2xl bg-teal-200/50 -z-10 animate-pulse"></div>
                </div>
                <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
            </div>
        );
    }
    if (err) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 text-center animate-fadeIn">
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 shadow-xl max-w-md">
                    <div className="mb-6">
                        <i className="fa-solid fa-triangle-exclamation text-7xl text-red-500"></i>
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-800 mb-2">Đã xảy ra lỗi!</h3>
                    <p className="text-red-600 font-medium mb-6">{err}</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-600 transition-all">Thử lại</button>
                        <button onClick={() => window.history.back()} className="px-6 py-2.5 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all">Quay lại</button>
                    </div>
                </div>
            </div>
        );
    }
    if (!dulieu) return null;
    return (
        <div className="bg-slate-50 min-h-screen pb-10">
            <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sticky top-0 z-20 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                            <i className="fa-solid fa-arrow-left text-lg"></i>
                        </button>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nhà cung cấp</span>
                                {dulieu.TRANGTHAI === 1 ? (
                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase border border-green-200">
                                        Đang hợp tác
                                    </span>
                                ) : (
                                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase border border-red-200">
                                        Ngưng hợp tác
                                    </span>
                                )}
                            </div>
                            <h1 className="text-2xl font-bold text-slate-800 mt-1">{dulieu.TENNCC}</h1>
                        </div>
                    </div>

                    <div className="flex gap-3">
                       
                        <button 
                            onClick={() => OpenMoDal({DuLieu:dulieu}, {TenTrang: 'ThongTinChung'})}
                            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg shadow-sm hover:bg-slate-50 hover:text-blue-600 transition-all flex items-center gap-2"
                        >
                            <i className="fa-regular fa-pen-to-square"></i>
                            <span className="hidden sm:inline">Sửa</span>
                        </button>

                        <Link to={`/admin/PhieuNhapHang/themPhieuNhap/${id}`} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center gap-2 hover:shadow-lg">
                            <i className="fa-solid fa-plus"></i>
                            <span>Nhập hàng</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* --- BODY --- */}
            <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <CompanyInfoCard data={{
                        MAVACH: dulieu.MAVACH,
                        TENNCC: dulieu.TENNCC,
                        MST: dulieu.MST,
                        LIENHE_DOITAC: dulieu.LIENHE_DOITAC,
                        SDT: dulieu.SDT,
                        DIACHI: dulieu.DIACHI,
                        EMAIL: dulieu.EMAIL
                    }} />
                    <div className="flex flex-col gap-3 h-full">
                        <StatRow
                            label="Công nợ hiện tại"
                            value={(dulieu.CONGNO)}
                            color={`${dulieu.CONGNO === 0 ? 'green' : 'red'}`}
                            icon="fa-sack-dollar"
                            action="Thanh toán"
                        />
                        <StatRow
                            label="Tổng nhập tháng này"
                            value={TongThuNhap} 
                            color="blue"
                            icon="fa-chart-line"    
                        />
                        <StatRow
                            label="Số đơn hàng"
                            value={TongPhieuNhap} 
                            color="slate"
                            icon="fa-receipt"
                            DonVi={'Đơn'}
                        />
                    </div>
                    <div className="h-1/2">
                        <BankCard
                            bankCode={dulieu.TEN_NGANHANG}
                            accountNumber={dulieu.STK_NGANHANG}
                            accountName={dulieu.LIENHE_DOITAC}
                            brand="visa" />
                    </div>
                </div>

                {/* --- PHẦN BẢNG DỮ LIỆU --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col min-h-[600px]">
                    <div className="border-b border-slate-200 px-6 flex flex-wrap gap-6 bg-slate-50/50 rounded-t-2xl">
                        <TabButton
                            active={activeTab === 'history'}
                            onClick={() => setActiveTab('history')}
                            icon="fa-clock-rotate-left"
                            label="Lịch sử nhập hàng"
                        />
                        <TabButton
                            active={activeTab === 'products'}
                            onClick={() => setActiveTab('products')}
                            icon="fa-box-open"
                            label="Sản phẩm cung cấp"
                        />
                        <TabButton
                            active={activeTab === 'debt'}
                            onClick={() => setActiveTab('debt')}
                            icon="fa-file-invoice-dollar"
                            label="Lịch sử công nợ"
                        />
                    </div>

                    <div className="p-0 flex-1">
                        {activeTab === 'history' && (
                            <div className="flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-4 border-b border-slate-100 flex justify-between items-center gap-4 bg-slate-50/50">
                                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 space-y-4">
    {/* Hàng 1: Tìm kiếm chính và Các bộ lọc nhanh */}
    <div className="flex flex-wrap items-center gap-3">
        {/* Tìm kiếm theo mã phiếu / Nhà cung cấp */}
        <div className="relative flex-1 min-w-[300px]">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input 
                type="text"
                name="TimKiem"
                value={key.TimKiem}
                onChange={handleChange}
                placeholder="Tìm theo mã phiếu nhập (PN...), nhà cung cấp..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
        </div>

        {/* Lọc theo Người tạo (Dropdown) */}
        <div className="relative">
            <select 
                name="NguoiTao"
                value={key.NguoiTao}
                onChange={handleChange}
                className="appearance-none pl-10 pr-8 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
                <option value="">Người tạo: Tất cả</option>
                {HoTen.map((item,index)=>(
                    <option key={index} value={item.HOTEN}>{item.HOTEN}</option>
                ))}
            </select>
            <i className="fa-solid fa-user-pen absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
        </div>

        {/* Lọc theo Trạng thái */}
        <div className="relative">
            <select 
                name="TrangThai"
                value={key.TrangThai}
                onChange={handleChange}
                className="appearance-none pl-10 pr-8 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
                <option value="">Trạng thái: Tất cả</option>
                <option value="1">Đã nhập hàng</option>
                <option value="0">Ngừng hoạt động</option>
            </select>
            <i className="fa-solid fa-filter absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <i className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
        </div>
    </div>

    <hr className="border-slate-100" />

    {/* Hàng 2: Bộ lọc thời gian chuyên sâu */}
    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
            <i className="fa-regular fa-calendar-days text-blue-500"></i>
            <span className="font-medium">Thời gian:</span>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="relative">
                <input 
                    type="date"
                    name="TuNgay"
                    value={key.TuNgay}
                    onChange={handleChange}
                    className="pl-3 pr-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none text-slate-600"
                />
            </div>
            <span className="text-slate-400">đến</span>
            <div className="relative">
                <input 
                    type="date" 
                    name="DenNgay"
                    value={key.DenNgay}
                    onChange={handleChange}
                    className="pl-3 pr-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none text-slate-600"
                />
            </div>
        </div>
         <button onClick={handleReset} className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-shadow shadow-sm active:scale-95">
            quay lại
        </button>
        <button onClick={handleSearch} className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-shadow shadow-sm active:scale-95">
            Áp dụng bộ lọc
        </button>
    </div>
</div>
                                </div>
                        <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 sticky top-0 z-10">
                    <tr>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Mã phiếu</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Ngày nhập</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Người tạo</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Tổng tiền</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-center">Trạng thái</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {
                        loading2 ? (
                            <tr>
            <td colSpan="100%">
                <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
                    <div className="relative">
                        <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                        <div className="absolute inset-0 rounded-full blur-2xl bg-teal-200/50 -z-10 animate-pulse"></div>
                    </div>
                    <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">
                        Đang tải dữ liệu...
                    </p>
                </div>
            </td>
        </tr>
                        ):(
                            PhieuNhap_theo_idncc && PhieuNhap_theo_idncc.length>0 ? (
                                PhieuNhap_theo_idncc.map((phieu)=>(
                                    <tr className="hover:bg-slate-50 transition-colors cursor-pointer group">
                        <td className="px-4 py-3 text-sm font-medium text-blue-600">{phieu.IDPN}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{ new Date(phieu.NGAYNHAP).toLocaleDateString("vi-VN")}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{phieu.HOTEN}</td>
                        <td className="px-4 py-3 text-sm font-medium text-slate-700 text-right"> {Number(phieu.TONGTIEN).toLocaleString("vi-VN") + " ₫"}</td>
                        <td className="px-4 py-3 text-center">
                            {
                                phieu.TRANGTHAI ===1 ? (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">Hoàn thành</span>
                                ):(
                                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700"> Chưa hoàn thành</span>
                                )
                            }
                        </td>
                        <td className="px-4 py-3 text-center">
                              <Link to={`/admin/PhieuNhapHang/ChiTiet/${phieu.IDPN}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Xem chi tiết"> xem chi tiết <i className="fas fa-arrow-right ml-1"></i></Link>
                        </td>
                    </tr>

                                ))
                            ):(
                               <tr class="hover:bg-transparent">
                                    <td colspan="100%" class="p-0">
                                        < div class="flex flex-col items-center justify-center py-16 bg-gray-50/50 border-y border-dashed border-gray-200">
                                            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                 <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                                </svg>
                                            </div>
                                            <h3 class="text-gray-700 font-semibold">Danh sách trống</h3>
                                            <p class="text-gray-500 text-sm max-w-xs text-center mt-2"> Hiện tại hệ thống chưa ghi nhận dữ liệu nào trong mục này.</p>
                                             <Link to={`/admin/PhieuNhapHang/themPhieuNhap/${id}`} class="mt-6 px-4 py-2 bg-teal-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                                                <i class="fa-solid fa-plus"></i> Thêm dữ liệu đầu tiên
                                            </Link>
                                          </div>
                                     </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>

        {/* --- 3. PHÂN TRANG (PAGINATION) --- */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
            <span>{PhanTrang_phieunhap.message}</span>
            <div className="flex gap-1">
                <button onClick={()=>{setpage(P=>P-1)}} disabled={page===1} className="w-8 h-8 flex items-center justify-center rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50">
                    <i className="fa-solid fa-chevron-left text-xs"></i>
                </button>
                <span className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white font-medium border border-blue-600">{page}</span>
                <button onClick={()=>{setpage(P=>P+1)}} disabled={page===PhanTrang_phieunhap.totalPhieuNhap} className="w-8 h-8 flex items-center justify-center rounded border border-slate-300 bg-white hover:bg-slate-50">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                </button>
            </div>
        </div>
    </div>
)}
                        {activeTab === 'products' && (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        
        {/* --- 1. THANH CÔNG CỤ (TOOLBAR) --- */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
            {/* Tìm kiếm */}
            <div className="relative flex-1 w-full sm:max-w-md group">
        <button 
            onClick={handleSearchSP}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors z-10"
        >
            <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSP()} 
            placeholder="Tìm kiếm tên sản phẩm..." 
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder-slate-400"
        />
        {searchTerm && (
            <button 
                onClick={Reset_GTSP}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"
                title="Xóa tìm kiếm"
            >
                <i className="fa-solid fa-xmark text-xs"></i>
            </button>
        )}
    </div>
        
        </div>

        {/* --- 2. BẢNG SẢN PHẨM (PRODUCT TABLE) --- */}
        <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 sticky top-0 z-10">
                    <tr>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 w-16 text-center">Ảnh</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Tên sản phẩm / ID</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Giá vốn</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Giá bán</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-center">Tồn kho</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-center">Trạng thái</th>
                        <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {
                        sanpham && sanpham.length>0 ? (
                            sanpham.map((sp,index)=>(
                                 <tr key={index} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-4 py-3 align-middle">
                            <div className="w-10 h-10 rounded border border-slate-200 bg-slate-100 flex items-center justify-center overflow-hidden">
                               <img src={` http://localhost:3001/${sp.HINHANH}`} alt="" />
                            </div>
                        </td>
                        <td className="px-4 py-3 align-middle">
                            <div className="font-medium text-slate-700 text-sm group-hover:text-blue-600 transition-colors">{sp.TENSANPHAM}</div>
                            <div className="text-xs text-slate-400">ID:{sp.IDSANPHAM} </div>
                        </td>
                        
                        <td className="px-4 py-3 align-middle text-sm text-slate-500 text-right">{fun.formatCurrency(sp.GIANHAP)}</td>
                        <td className="px-4 py-3 align-middle text-sm font-medium text-slate-700 text-right">{fun.formatCurrency(sp.GIABAN)}</td>
                        <td className="px-4 py-3 align-middle text-center">
                            <span className="font-medium text-slate-700">{sp.SOLUONG}</span>
                        </td>
                        <td className="px-4 py-3 align-middle text-center">
                            {
                                sp.TRANGTHAI ===1 ? (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                                        Đang bán
                                    </span>
                                ):(
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                                         Đã ngừng kinh doanh
                                    </span>
                                )
                            }
                            
                        </td>
                        <td className="px-4 py-3 align-middle text-center">
                            <div className="flex items-center justify-center gap-2">
                                <Link to={`/admin/sanpham/ChiTiet/${sp.IDSANPHAM}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Xem chi tiết"> xem chi tiết <i className="fas fa-arrow-right ml-1"></i></Link>
                            </div>
                        </td>
                    </tr>

                            ))
                        ):(
                            <tr class="hover:bg-transparent">
                                    <td colspan="100%" class="p-0">
                                        < div class="flex flex-col items-center justify-center py-16 bg-gray-50/50 border-y border-dashed border-gray-200">
                                            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                 <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                                </svg>
                                            </div>
                                            <h3 class="text-gray-700 font-semibold">Danh sách trống</h3>
                                            <p class="text-gray-500 text-sm max-w-xs text-center mt-2"> Hiện tại hệ thống chưa ghi nhận dữ liệu nào trong mục này.</p>
                                             <Link to={`/admin/PhieuNhapHang/themPhieuNhap/${id}`} class="mt-6 px-4 py-2 bg-teal-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                                                <i class="fa-solid fa-plus"></i>  Thêm dữ liệu đầu tiên
                                            </Link>
                                          </div>
                                     </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-3">
            <span>{message}</span>
            <div className="flex gap-1">
                <button onClick={()=>{setpage1(p=>p-1)}} disabled={page1===1} className="w-8 h-8 flex items-center justify-center rounded border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-50">
                    <i className="fa-solid fa-chevron-left text-xs"></i>
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-slate-400">{page1}</span>
                <button onClick={()=>{setpage1(p=>p+1)}} className="w-8 h-8 flex items-center justify-center rounded border border-slate-300 bg-white hover:bg-slate-50">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                </button>
            </div>
        </div>
    </div>
)}

{/** Đã sửa đến đây */}
        {activeTab === 'debt' && (
    <div className="flex flex-col h-full space-y-4">
        
        {/* --- 1. THẺ TỔNG QUAN (SUMMARY CARDS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Tổng nợ phải trả */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500 mb-1">Tổng nợ phải trả</p>
                    <h3 className="text-2xl font-bold text-slate-700">185.000.000 ₫</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                    <i className="fa-solid fa-arrow-trend-up"></i>
                </div>
            </div>
            
            {/* Card 2: Đã thanh toán (Tháng này) */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500 mb-1">Đã trả (Tháng 10)</p>
                    <h3 className="text-2xl font-bold text-emerald-600">50.000.000 ₫</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <i className="fa-solid fa-check"></i>
                </div>
            </div>

            {/* Card 3: Nợ quá hạn / Sắp đến hạn */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500 mb-1">Nợ đến hạn trả</p>
                    <h3 className="text-2xl font-bold text-amber-500">32.000.000 ₫</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                    <i className="fa-regular fa-clock"></i>
                </div>
            </div>
        </div>

        {/* --- 2. KHUNG DỮ LIỆU CHÍNH --- */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col overflow-hidden">
            
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
                <div className="relative flex-1 w-full sm:max-w-md">
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                    <input 
                        type="text" 
                        placeholder="Tìm nhà cung cấp, mã chứng từ..." 
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-400"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                     <button className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                        <i className="fa-regular fa-calendar"></i>
                        <span>Thời gian</span>
                    </button>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 flex items-center gap-2 shadow-sm transition-colors">
                        <i className="fa-solid fa-money-bill-transfer"></i>
                        <span>Tạo phiếu chi</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Mã chứng từ</th>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Thời gian</th>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Đối tượng (NCC)</th>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Loại giao dịch</th>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Giá trị</th>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Dư nợ cuối</th>
                            <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        
                        {/* Giao dịch 1: NHẬP HÀNG (Tăng nợ) */}
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 align-middle">
                                <span className="text-blue-600 font-medium text-sm">PNK-001</span>
                            </td>
                            <td className="px-4 py-3 align-middle text-sm text-slate-500">25/10/2023 09:30</td>
                            <td className="px-4 py-3 align-middle">
                                <div className="text-sm font-medium text-slate-700">Công ty TNHH ABC</div>
                            </td>
                            <td className="px-4 py-3 align-middle">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                                    <i className="fa-solid fa-box text-slate-400"></i> Nhập hàng
                                </span>
                            </td>
                            <td className="px-4 py-3 align-middle text-right">
                                <span className="text-red-600 font-medium text-sm">+ 15.500.000</span>
                            </td>
                            <td className="px-4 py-3 align-middle text-right">
                                <span className="text-slate-800 font-bold text-sm">115.500.000</span>
                            </td>
                            <td className="px-4 py-3 align-middle text-center">
                                <button className="text-slate-400 hover:text-blue-600 p-1"><i className="fa-solid fa-circle-info"></i></button>
                            </td>
                        </tr>

                        {/* Giao dịch 2: THANH TOÁN (Giảm nợ) */}
                        <tr className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 align-middle">
                                <span className="text-blue-600 font-medium text-sm">PC-089</span>
                            </td>
                            <td className="px-4 py-3 align-middle text-sm text-slate-500">24/10/2023 14:15</td>
                            <td className="px-4 py-3 align-middle">
                                <div className="text-sm font-medium text-slate-700">Công ty TNHH ABC</div>
                            </td>
                            <td className="px-4 py-3 align-middle">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    <i className="fa-solid fa-money-bill text-emerald-500"></i> Thanh toán
                                </span>
                            </td>
                            <td className="px-4 py-3 align-middle text-right">
                                <span className="text-emerald-600 font-medium text-sm">- 50.000.000</span>
                            </td>
                            <td className="px-4 py-3 align-middle text-right">
                                <span className="text-slate-800 font-bold text-sm">100.000.000</span>
                            </td>
                            <td className="px-4 py-3 align-middle text-center">
                                <button className="text-slate-400 hover:text-blue-600 p-1"><i className="fa-solid fa-circle-info"></i></button>
                            </td>
                        </tr>

                         {/* Giao dịch 3: TRẢ HÀNG (Giảm nợ) */}
                         <tr className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 align-middle">
                                <span className="text-blue-600 font-medium text-sm">TH-002</span>
                            </td>
                            <td className="px-4 py-3 align-middle text-sm text-slate-500">22/10/2023 10:00</td>
                            <td className="px-4 py-3 align-middle">
                                <div className="text-sm font-medium text-slate-700">Nhà phân phối XYZ</div>
                            </td>
                            <td className="px-4 py-3 align-middle">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                                    <i className="fa-solid fa-rotate-left text-amber-500"></i> Trả hàng
                                </span>
                            </td>
                            <td className="px-4 py-3 align-middle text-right">
                                <span className="text-emerald-600 font-medium text-sm">- 2.500.000</span>
                            </td>
                            <td className="px-4 py-3 align-middle text-right">
                                <span className="text-slate-800 font-bold text-sm">0</span>
                            </td>
                            <td className="px-4 py-3 align-middle text-center">
                                <button className="text-slate-400 hover:text-blue-600 p-1"><i className="fa-solid fa-circle-info"></i></button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500">
                <span>Hiển thị 20 giao dịch gần nhất</span>
                <div className="flex gap-1">
                    <button className="px-3 py-1 rounded bg-white border border-slate-300 hover:bg-slate-50">Trước</button>
                    <button className="px-3 py-1 rounded bg-white border border-slate-300 hover:bg-slate-50">Sau</button>
                </div>
            </div>
        </div>
    </div>
)}
                        
                    </div>

                
                </div>
            </main>
       
                </div>
    
    );
}

const TabButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`py-4 px-2 border-b-2 text-sm font-bold transition-all flex items-center gap-2 ${active
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
    >
        <i className={`fa-solid ${icon}`}></i> {label}
    </button>
);

export default ChiTietNhaCungCap;