import { useState } from "react";
import { useModalContext } from "../../../../../CONTEXT/QuanLiModal";
import * as fun from '../../../../../JS/FUNCTONS/function';
import * as API from '../../../../../JS/API/API';
import { useAppContext } from '../../../../../CONTEXT/TrangChuAdmin';

function SuaSoDienThoai() {
    const { modalState } = useModalContext();
    const [SoDienThoai, setSoDienThoai] = useState('');
    const [Loading, setLoading] = useState(false);
    const [err, seterr] = useState('');
    const [ok, setok] = useState('');
     const { GetTTwebsite} =useAppContext();


    const Reset = () => {
        setSoDienThoai('');
        seterr('');
        setok('');
        setLoading(false);
    };

    const LuuGT = async () => {
        seterr('');
        setok('');

        if (!SoDienThoai) {
            seterr('Vui lòng nhập số điện thoại!');
            return;
        }
        if(!fun.validatePhone(SoDienThoai)){
            seterr('Sai định dạng số điện thoại!');
            return;
        }

        setLoading(true);
        const DuLieu = fun.objectToFormData({ SoDienThoai: SoDienThoai });

        try {
            const KetQua = await API.CallAPI(DuLieu, { url: '/admin/ChinhSuaSoDienThoai', PhuongThuc: 1 });

            if (KetQua.Status) {
                seterr(KetQua.message);
            } else if (KetQua.Validate) {
                seterr(KetQua.errors[0]?.msg || 'Dữ liệu không hợp lệ');
            } else if (KetQua.ThanhCong) {
                setok(KetQua.message);
                GetTTwebsite();
            }
        } catch (error) {
            seterr('Lỗi kết nối máy chủ!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg bg-white rounded-[2rem] overflow-hidden">
            <div className="p-8">
                <div className="space-y-6">
                    {/* SỐ ĐIỆN THOẠI CŨ */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 px-1">
                            <i className="fa-solid fa-phone-volume text-[10px] text-green-500"></i>
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Số hiện tại</label>
                        </div>
                        <div className="bg-green-50/30 border border-green-100 rounded-2xl p-4 text-green-600/70 text-lg font-bold tracking-widest">
                            {modalState.DuLieu.zalo || "Chưa thiết lập"}
                        </div>
                    </div>

                    {/* Ô NHẬP LIỆU */}
                    <div className="space-y-3">
                        <label className="px-1 text-[11px] font-bold text-green-600 uppercase tracking-[0.15em]">Số điện thoại mới</label>
                        
                        <div className="relative">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-green-500">
                                <i className="fa-solid fa-mobile-screen-button text-lg"></i>
                            </div>
                            <input
                                type="tel"
                                value={SoDienThoai}
                                onChange={(e) => setSoDienThoai(e.target.value.replace(/\D/g, ''))} // Chỉ cho nhập số
                                maxLength={10}
                                disabled={Loading}
                                className={`w-full pl-12 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none transition-all font-bold text-gray-800 focus:border-green-500 focus:bg-white focus:shadow-[0_0_20px_rgba(34,197,94,0.1)] tracking-widest
                                    ${err ? 'border-red-500 bg-red-50' : ''} 
                                    ${Loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="09xx xxx xxx"
                            />
                        </div>

                        {/* THÔNG BÁO */}
                        <div className="min-h-[24px] px-1">
                            {Loading ? (
                                <div className="flex items-center gap-2 text-green-500">
                                    <i className="fas fa-spinner fa-spin text-xs"></i>
                                    <p className="text-[12px] font-medium">Đang kiểm tra định dạng...</p>
                                </div>
                            ) : err ? (
                                <div className="flex items-center gap-2 text-red-500">
                                    <i className="fa-solid fa-circle-exclamation text-xs"></i>
                                    <p className="text-[12px] font-bold">{err}</p>
                                </div>
                            ) : ok ? (
                                <div className="flex items-center gap-2 text-green-500">
                                    <i className="fa-solid fa-check-to-slot text-xs"></i>
                                    <p className="text-[12px] font-bold">{ok}</p>
                                </div>
                            ) : (
                                <p className="text-[11px] text-gray-400 italic font-medium px-1">Nhập 10 chữ số, bắt đầu bằng số 0.</p>
                            )}
                        </div>
                    </div>

                    {/* NÚT BẤM */}
                    <div className="grid grid-cols-5 gap-3 pt-2">
                        <button
                            onClick={Reset}
                            disabled={Loading}
                            className="col-span-2 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-600 font-bold py-4 rounded-2xl transition-all"
                        >
                            <i className="fa-solid fa-rotate-left"></i>
                            Làm mới
                        </button>

                        <button
                            onClick={LuuGT}
                            disabled={Loading}
                            className={`col-span-3 flex items-center justify-center gap-3 font-bold py-4 rounded-2xl transition-all shadow-lg text-white
                                ${Loading 
                                    ? "bg-green-300 cursor-not-allowed" 
                                    : "bg-green-600 hover:bg-green-700 hover:shadow-[0_10px_25px_rgba(34,197,94,0.3)] active:scale-[0.95]"
                                }`}
                        >
                            {Loading ? (
                                <><i className="fas fa-spinner fa-spin"></i> Đang cập nhật</>
                            ) : (
                                <><i className="fa-solid fa-phone"></i> Cập nhật ngay</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuaSoDienThoai;