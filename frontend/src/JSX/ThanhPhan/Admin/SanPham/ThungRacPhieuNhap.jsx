import React, { useState, useEffect } from 'react';
import * as API from '../../../../JS/API/API';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';
import * as fun from '../../../../JS/FUNCTONS/function';
function ThungRacPhieuNhap() {
    const [DanhSachPhieuNhap, setDanhSachPhieuNhap] = useState([]);
    const THOI_HAN_MAX_MS = 30 * 24 * 60 * 60 * 1000; 
    const [loading, setLoading] = useState(false);
    const [errHT , seterrHT] = useState('')
    const fetchData = async () => {
    setLoading(true);
        try {
            const KetQua = await API.CallAPI(undefined, { url: '/admin/lay_phieunhap_daxoa', PhuongThuc: 2 });
            if (KetQua && KetQua.ThanhCong) {
                setLoading(false);
                setDanhSachPhieuNhap(KetQua.DuLieu);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { fetchData(); }, []);
    const formatVND = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    const Khoi_Phuc = async(id)=>{
        const XacNhan = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn khôi phục phiếu nhập này chứ?');
        if(!XacNhan) return;
        try {
            setLoading(true)
            const khoiphuc = await API.CallAPI(undefined,{url : `/admin/khoiphuc_phieunhap?id=${id}` , PhuongThuc:1});
            if(khoiphuc.status){
                seterrHT(khoiphuc.message);
                return;
            }
            if(khoiphuc.ThanhCong){
                setDanhSachPhieuNhap(DanhSachPhieuNhap.filter(item => item.IDPN !== id));
                ThongBao.ThongBao_ThanhCong(khoiphuc.message);
                return;
            }else{
                ThongBao.ThongBao_Loi(khoiphuc.message);
                return;
            }
        } catch (error) {
            console.error('lỗi sãy ra:' + error)
        } finally {
            setLoading(false)
        }
    }
    const xoa_tatca= async()=>{
        const XacNhan = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn xóa tất cả các phiếu nhập trong thùng rác?');
        if(!XacNhan) return;
        setLoading(true)
        try {
            const ketqua = await API.CallAPI(undefined,{PhuongThuc:1, url :'/admin/xoa_tatca_phieunhap'});
             if(ketqua.status){
                ThongBao.ThongBao_CanhBao(ketqua.message);
                return;
             }
             if(ketqua.ThanhCong){
                 setDanhSachPhieuNhap([]);
                 ThongBao.ThongBao_ThanhCong(ketqua.message);
                 return;
             }else{
                ThongBao.ThongBao_Loi(ketqua.message);
                return;
             }

        } catch (error) {
            console.error('lỗi sãy ra : ' + error)
        } finally {
            setLoading(false)
        }
    }
    const xoa_phieunhap_theo_id= async(id)=>{
        const xacnhan= await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn muốn xóa phiếu nhập này không?');
        if(!xacnhan) return;
        const kiemtra = fun.KiemTraRong({id:id});
        if(!kiemtra.Status){
            ThongBao.ThongBao_CanhBao('Vui lòng kiểm tra lại thông tin!');
            return;
        }
        try {
             const formdata= fun.objectToFormData({id:id});
             const ketqua=await API.CallAPI(formdata,{url : '/admin/xoa_phieunhap_theoid', PhuongThuc:1})
             if(ketqua.status){
                ThongBao.ThongBao_CanhBao(ketqua.message);
                return;
             }
             if(ketqua.ThanhCong){
                 setDanhSachPhieuNhap(DanhSachPhieuNhap.filter(item => item.IDPN !== id));
                 ThongBao.ThongBao_ThanhCong(ketqua.message);
                 return;
             }else{
                ThongBao.ThongBao_Loi(ketqua.message);
                return;
             }
        } catch (error) {
            console.error('lỗi sãy ra:'+ error)
        }
       
    }
    if (loading) {
        return (
             <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
                <div className="relative">
                    <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                </div>
                <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
            </div>
        );
    }
    return (
        <div className="w-full min-h-screen bg-[#fcfcfd] text-slate-900 font-sans z-0 relative">
            {
                errHT && (
                   <div className="error-container">
                        <svg className="error-icon" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        <span className="error-text">{errHT}</span>
                    </div>
                )
            }
            {/* --- TOP BAR (Glassmorphism) --- */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-8 py-4 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-tr from-red-500 to-orange-400 rounded-2xl rotate-3 shadow-lg shadow-red-200"></div>
                            <i className="fa-solid fa-trash-arrow-up absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"></i>
                        </div>
                        <div>
                            <h2 className="text-xl font-900 tracking-tight text-slate-800 uppercase">Kho Lưu Trữ Tạm Thời</h2>
                            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-1">
                                    <i className="fa-solid fa-circle text-[6px] text-green-500 animate-pulse"></i> Hệ thống ổn định
                                </span>
                                <span>•</span>
                                <span>Tự động dọn dẹp định kỳ</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={fetchData} className="h-10 px-4 flex items-center gap-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
                            <i className="fa-solid fa-arrows-rotate"></i> LÀM MỚI
                        </button>
                        <button onClick={xoa_tatca} className="h-10 px-4 flex items-center gap-2 bg-red-500 rounded-xl text-xs font-black text-white hover:bg-red-600 transition-all shadow-lg shadow-red-100 uppercase tracking-wider active:scale-95">
                            <i className="fa-solid fa-fire-burner"></i> Hủy tất cả dữ liệu
                        </button>
                    </div>
                </div>
            </div>

            {/* --- DATA LIST --- */}
            <div className="p-8 space-y-4">
                {DanhSachPhieuNhap && DanhSachPhieuNhap.length > 0 ? (
                    DanhSachPhieuNhap.map((phieu) => {
                        // Tính toán logic thời gian
                        const thoiDiemXoa = new Date(phieu.DELETE_AT).getTime();
                        const hienTai = new Date().getTime();
                        const thoiGianDaTroiQua = hienTai - thoiDiemXoa;
                        const phanTramConLai = Math.max(0, ((THOI_HAN_MAX_MS - thoiGianDaTroiQua) / THOI_HAN_MAX_MS) * 100);
                        const isUrgent = phanTramConLai <= 10;

                        return (
                            <div key={phieu.IDPN} className={`bg-white rounded-3xl p-2 border shadow-sm hover:shadow-xl transition-all group ${isUrgent ? 'border-red-100 bg-red-50/20' : 'border-slate-100 hover:border-blue-200'}`}>
                                <div className="flex flex-wrap md:flex-nowrap items-center gap-4 p-4">
                                    
                                    {/* Visual Indicator */}
                                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border transition-colors ${isUrgent ? 'bg-red-100 text-red-500 border-red-200' : 'bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-500'}`}>
                                        <i className="fa-solid fa-receipt text-xl"></i>
                                    </div>

                                    {/* Core Info */}
                                    <div className="flex-grow space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-black text-slate-800 tracking-tight">{phieu.IDPN}</span>
                                            {isUrgent && (
                                                <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-black rounded-md uppercase tracking-wider animate-pulse">
                                                    Nguy cấp: {phanTramConLai.toFixed(1)}%
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-x-4 text-xs font-bold text-slate-400">
                                            <span className="text-slate-600 underline decoration-slate-200 decoration-2 underline-offset-4">
                                                <i className="fa-solid fa-store mr-1"></i> {phieu.TENNCC || 'NCC KHÔNG XÁC ĐỊNH'}
                                            </span>
                                            <span>•</span>
                                            <span>HỦY: {new Date(phieu.DELETE_AT).toLocaleDateString('vi-VN')}</span>
                                            <span>•</span>
                                            <span className="text-blue-500">GIÁ TRỊ: {formatVND(phieu.TONGTIEN)}</span>
                                        </div>
                                    </div>

                                    {/* Progress & Actions */}
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className="hidden lg:block w-32">
                                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    style={{ width: `${phanTramConLai}%` }} 
                                                    className={`h-full transition-all duration-1000 ${isUrgent ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500'}`}
                                                ></div>
                                            </div>
                                            <p className={`text-[9px] font-black uppercase mt-1 text-right italic ${isUrgent ? 'text-red-500' : 'text-slate-400'}`}>
                                                {isUrgent ? 'Sắp xóa vĩnh viễn' : `${phanTramConLai.toFixed(0)}% thời hạn`}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 border-l border-slate-100 pl-6">
                                            <button onClick={()=>{Khoi_Phuc(phieu.IDPN)}} className="flex items-center gap-2 bg-emerald-500 text-white px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase hover:bg-emerald-600 transition-all shadow-md shadow-emerald-100 active:scale-95">
                                                <i className="fa-solid fa-reply-all"></i> Khôi phục
                                            </button>
                                            <button onClick={()=>{xoa_phieunhap_theo_id(phieu.IDPN)}} className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all active:scale-95">
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                        <i className="fa-solid fa-box-open text-6xl text-slate-100 mb-4"></i>
                        <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Thùng rác trống</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ThungRacPhieuNhap;