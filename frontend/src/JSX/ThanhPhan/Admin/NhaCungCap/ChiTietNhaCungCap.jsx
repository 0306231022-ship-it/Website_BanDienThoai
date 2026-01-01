import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import * as API from '../../../../JS/API/API';
import CompanyInfoCard from './compoment/ThongTin';
import StatRow from './compoment/StarRow';
import BankCard from './compoment/NganHang';
import { useModalContext } from '../../../../CONTEXT/QuanLiModal';

function ChiTietNhaCungCap() {
    const [activeTab, setActiveTab] = useState('history');
    const { id } = useParams();
    const [dulieu, setdulieu] = useState(null);
    const [err, seterr] = useState('');
    const [loading, setloading] = useState(false);
    const { OpenMoDal } = useModalContext();

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

    // --- Loading UI ---
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

    // --- Error UI ---
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
            {/* --- HEADER --- */}
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

                        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center gap-2 hover:shadow-lg">
                            <i className="fa-solid fa-plus"></i>
                            <span>Nhập hàng</span>
                        </button>
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
                            value={dulieu.CONGNO}
                            color={`${dulieu.CONGNO === 0 ? 'green-700' : 'red'}`}
                            icon="fa-sack-dollar"
                            action="Thanh toán"
                        />
                        <StatRow
                            label="Tổng nhập tháng này"
                            value={150000} // Nếu có data từ API thì thay bằng {dulieu.TONGNHAP}
                            color="blue"
                            icon="fa-chart-line"
                        />
                        <StatRow
                            label="Số đơn hàng"
                            value="32" // Nếu có data từ API thì thay bằng {dulieu.SODON}
                            color="slate"
                            icon="fa-receipt"
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

                    <div className="p-0 flex-1 relative">
                        {activeTab === 'history' && (
                            <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <i className="fa-solid fa-box-open text-3xl text-slate-300"></i>
                                </div>
                                <p className="font-medium">Danh sách lịch sử sẽ hiển thị ở đây</p>
                            </div>
                        )}
                        {activeTab === 'products' && (
                            <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <i className="fa-solid fa-box-open text-3xl text-slate-300"></i>
                                </div>
                                <p className="font-medium">Danh sách sản phẩm sẽ hiển thị ở đây</p>
                            </div>
                        )}
                        {activeTab === 'debt' && (
                            <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <i className="fa-solid fa-file-invoice-dollar text-3xl text-slate-300"></i>
                                </div>
                                <p className="font-medium">Lịch sử thanh toán công nợ sẽ hiển thị ở đây</p>
                            </div>
                        )}
                    </div>

                    <div className="px-6 py-4 border-t border-slate-200 bg-white rounded-b-2xl flex justify-between items-center">
                        <span className="text-sm text-slate-500">Hiển thị 5 / 50 kết quả</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-sm text-slate-600 disabled:opacity-50"><i className="fa-solid fa-chevron-left"></i></button>
                            <button className="px-3 py-1 border border-blue-500 bg-blue-50 rounded text-sm text-blue-600 font-bold">1</button>
                            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-sm text-slate-600">2</button>
                            <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 text-sm text-slate-600"><i className="fa-solid fa-chevron-right"></i></button>
                        </div>
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