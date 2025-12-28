import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import * as API from '../../../../JS/API/API';
import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
import ThongTinCoBan from "./modal/ThongTinCoBan";
import ChinhSuaTen from "../CaiDatWebsite/modal/Conmodal/ChinhSuaName";
import ChinhSuaLoGo from "../CaiDatWebsite/modal/Conmodal/ChinhSuaLoGo";
import ChinhSuaTrangThai from "./modal/ChinhSuaTrangThai";

function ChiTietThuongHieu() {
    const { id } = useParams();
    const [thuongHieu, setThuongHieu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {modalState,MoModal,DongModal,ChinhSuaModel} = useModalContext();

    useEffect(() => {
        const fetchThuongHieu = async () => {
            setLoading(true);
            try {
                const ketqua = await API.CallAPI(undefined, { 
                    PhuongThuc: 2, 
                    url: `/admin/ChiTietThuongHieu?id=${id}` 
                });
               if(ketqua.Status){
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

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 text-center animate-fadeIn">
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 shadow-xl max-w-md">
                    <div className="mb-6">
                        <i className="fa-solid fa-triangle-exclamation text-7xl text-red-500"></i>
                    </div>
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

    // Nếu đã tải xong mà không có dữ liệu
    if (!thuongHieu) return null;

    return (
        <section id="section-brand-detail" className="p-4 md:p-8 bg-gray-50 min-h-screen animate-fadeIn">
            {/* --- TOP NAVIGATION BAR --- */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div className="flex items-center space-x-5">
                    <Link
                        to="/admin/thuonghieu"
                        className="group w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-200 text-gray-600 hover:bg-teal-600 hover:text-white transition-all duration-300"
                    >
                        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
                    </Link>
                    <div>
                        <nav className="flex mb-1" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-2 text-xs text-gray-400 font-medium uppercase">
                                <li>Thương hiệu</li>
                                <li><i className="fas fa-chevron-right text-[8px]"></i></li>
                                <li className="text-teal-600">Chi tiết</li>
                            </ol>
                        </nav>
                        <h2 className="text-3xl font-black text-gray-800 tracking-tight">
                            {thuongHieu.TENTHUONGHIEU} <span className="text-teal-500">#{thuongHieu.IDTHUONGHIEU}</span>
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm">
                        <i className="fas fa-download mr-2 text-gray-400"></i> Xuất báo cáo
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- SIDEBAR: THÔNG TIN CƠ BẢN --- */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative group">
                        {/* Nút chỉnh sửa hiện khi hover vào Card */}
                        <button onClick={()=>{MoModal('ThongTinCoBan',
                            {
                                Ten:thuongHieu.TENTHUONGHIEU,
                                LoGo:thuongHieu.LOGO , 
                                TrangThai:thuongHieu.TRANGTHAI,
                                id:thuongHieu.IDTHUONGHIEU
                            }
                            )}} 
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm text-teal-600 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-teal-600 hover:text-white flex items-center justify-center">
                            <i className="fas fa-pen-to-square"></i>
                        </button>

                        <div className="bg-teal-600 h-24 w-full relative">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        </div>
                        <div className="px-6 pb-8 -mt-12 relative text-center">
                            <div className="inline-block p-2 bg-white rounded-3xl shadow-xl mb-4">
                                <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center text-teal-600 font-black text-2xl border border-gray-100 uppercase">
                                    <img src={`http://localhost:3001/${thuongHieu.LOGO}`} className="w-full h-full object-cover" alt={thuongHieu.TENTHUONGHIEU} />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{thuongHieu.TENTHUONGHIEU}</h3>
                            <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-bold">Thương hiệu đối tác</p>

                            <div className="  gap-4 text-left border-t border-gray-50 pt-6">
                                <div className="p-3 rounded-2xl">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Trạng thái</p>
                                    <span className={`flex items-center text-xs font-bold ${thuongHieu.TRANGTHAI !== 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        <span className={`w-2 h-2 rounded-full mr-2 ${thuongHieu.TRANGTHAI !== 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                        {thuongHieu.TRANGTHAI !== 0 ? 'Đang hoạt động' : 'Ngưng hợp tác'}
                                    </span>
                                </div>
                                <div className="p-3 rounded-2xl">
                                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Sản phẩm</p>
                                    <span className="text-sm font-bold text-gray-800">{thuongHieu.SOLUONG_SANPHAM || 0} sản phẩm</span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4 text-left">
                                <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                                    <span className="text-gray-500">Ngày tham gia:</span>
                                    <span className="font-semibold text-gray-700">
                                        {new Date(thuongHieu.NGAYTAO).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN CONTENT --- */}
                <div className="lg:col-span-2 space-y-8">
                    {/* MÔ TẢ */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <span className="w-8 h-1 bg-teal-500 rounded-full mr-3"></span>
                                Mô tả chi tiết
                            </h3>
                            <button className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-sm font-bold hover:bg-teal-600 hover:text-white transition-all border border-teal-100">
                                <i className="fas fa-edit text-xs"></i> Chỉnh sửa
                            </button>
                        </div>
                        <div className="relative z-10">
                            <p className="text-gray-600 leading-loose text-lg italic">
                                "{thuongHieu.MOTA || "Chưa có mô tả cho thương hiệu này."}"
                            </p>
                        </div>
                        <i className="fas fa-quote-right absolute top-4 right-8 text-gray-50 text-8xl opacity-50"></i>
                    </div>

                    {/* SẢN PHẨM LIÊN QUAN */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-white">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <i className="fas fa-boxes-stacked mr-3 text-teal-500"></i>
                                Danh mục sản phẩm
                                <span className="ml-3 px-2.5 py-0.5 bg-teal-50 text-teal-600 text-xs rounded-full">
                                    {thuongHieu.SOLUONG_SANPHAM || 0}
                                </span>
                            </h3>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {/* Hiển thị danh sách sản phẩm liên quan ở đây */}
                            <div className="p-10 text-center text-gray-400">
                                <i className="fas fa-folder-open text-4xl mb-3 block"></i>
                                <p className="text-sm font-medium">Danh sách sản phẩm đang được cập nhật...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
              {
                modalState.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                         <div className="relative bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
                             <button onClick={DongModal} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 transition">
                                <i className="fa-solid fa-xmark text-white"></i>
                            </button>
                            {/* Nội dung modal dựa trên trạng thái hiện tại */}
                            {
                                modalState.TrangThaiTrang!==modalState.QuaTrang.tenTrangMoi && (
                                  <button  onClick={()=>{ChinhSuaModel(modalState.QuaTrang.tenTrangMoi)}} class="btn-back"><i class="fa-solid fa-chevron-left"></i> Quay lại</button>
                                )
                            }
                             <p className="text-gray-600 mb-6">
                                {(() => {
                                    switch(modalState.TrangThaiTrang){
                                        case 'ThongTinCoBan': return <ThongTinCoBan />;
                                        case 'ChinhSuaTen': return <ChinhSuaTen />;
                                        case 'SuaAnhThuongHieu': return <ChinhSuaLoGo />;
                                        case 'ChinhSuaTrangThai': return <ChinhSuaTrangThai />;
                                        default: return null;

                            
                                    }
                                })()}
                             </p>
                         
                        </div>
                    </div>
                )
            }
        </section>
       
     
    );
}

export default ChiTietThuongHieu;