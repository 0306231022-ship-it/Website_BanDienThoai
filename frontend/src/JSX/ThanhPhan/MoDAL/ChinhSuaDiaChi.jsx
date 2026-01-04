import { useState } from "react";
import * as fun from '../../../JS/FUNCTONS/function';
import * as API from '../../../JS/API/API';
import { useAppContext } from '../../../CONTEXT/TrangChuAdmin';

function SuaDiaChi({DuLieu , url}) {
    const [DiaChi, setDiaChi] = useState('');
    const [Loading, setLoading] = useState(false);
    const [err, seterr] = useState('');
    const [ok, setok] = useState('');
    const id = DuLieu.id;
    const { GetTTwebsite} =useAppContext();

    const Reset = () => {
        setDiaChi('');
        seterr('');
        setok('');
        setLoading(false);
    };

    const LuuGT = async () => {
        seterr('');
        setok('');

        if (!DiaChi) {
            seterr('Vui lòng nhập địa chỉ cụ thể!');
            return;
        }

        setLoading(true);
        const DuLieu = fun.objectToFormData({ DiaChi: DiaChi , id: id || null });
        // url Cập nhật địa chỉ website : '/admin/ChinhSuaDiaChi'

        try {
            const KetQua = await API.CallAPI(DuLieu, { url: url, PhuongThuc: 1 });

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
                    {/* ĐỊA CHỈ CŨ */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 px-1">
                            <i className="fa-solid fa-map-location-dot text-[10px] text-red-500"></i>
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Địa chỉ hiện tại</label>
                        </div>
                        <div className="bg-red-50/30 border border-red-100 rounded-2xl p-4 text-red-600/70 text-sm leading-relaxed">
                            {DuLieu.DuLieu || "Chưa cập nhật địa chỉ"}
                        </div>
                    </div>

                    {/* Ô NHẬP LIỆU */}
                    <div className="space-y-3">
                        <label className="px-1 text-[11px] font-bold text-red-600 uppercase tracking-[0.15em]">Địa chỉ mới</label>
                        
                        <div className="relative group">
                            <textarea 
                                rows="3"
                                value={DiaChi}
                                onChange={(e) => setDiaChi(e.target.value)}
                                disabled={Loading}
                                className={`w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-300 focus:border-red-500 focus:bg-white focus:shadow-[0_0_20px_rgba(239,68,68,0.1)] resize-none
                                    ${err ? 'border-red-500 bg-red-50' : ''} 
                                    ${Loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                            ></textarea>
                        </div>

                        {/* THÔNG BÁO */}
                        <div className="min-h-[24px] px-1">
                            {Loading ? (
                                <div className="flex items-center gap-2 text-red-500">
                                    <i className="fas fa-spinner fa-spin text-xs"></i>
                                    <p className="text-[12px] font-medium">Đang lưu vị trí...</p>
                                </div>
                            ) : err ? (
                                <div className="flex items-center gap-2 text-red-500">
                                    <i className="fa-solid fa-triangle-exclamation text-xs"></i>
                                    <p className="text-[12px] font-bold">{err}</p>
                                </div>
                            ) : ok ? (
                                <div className="flex items-center gap-2 text-green-500">
                                    <i className="fa-solid fa-circle-check text-xs"></i>
                                    <p className="text-[12px] font-bold">{ok}</p>
                                </div>
                            ) : (
                                <p className="text-[11px] text-gray-400 italic font-medium leading-relaxed">Lưu ý: Địa chỉ này sẽ hiển thị ở chân trang (Footer) và trang Liên hệ.</p>
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
                            <i className="fa-solid fa-arrow-rotate-left"></i>
                            Đặt lại
                        </button>

                        <button
                            onClick={LuuGT}
                            disabled={Loading}
                            className={`col-span-3 flex items-center justify-center gap-3 font-bold py-4 rounded-2xl transition-all shadow-lg text-white
                                ${Loading 
                                    ? "bg-red-300 cursor-not-allowed" 
                                    : "bg-red-600 hover:bg-red-700 hover:shadow-[0_10px_25px_rgba(239,68,68,0.3)] active:scale-[0.95]"
                                }`}
                        >
                            {Loading ? (
                                <><i className="fas fa-spinner fa-spin"></i> Đang cập nhật</>
                            ) : (
                                <><i className="fa-solid fa-location-arrow"></i> Cập nhật ngay</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuaDiaChi;