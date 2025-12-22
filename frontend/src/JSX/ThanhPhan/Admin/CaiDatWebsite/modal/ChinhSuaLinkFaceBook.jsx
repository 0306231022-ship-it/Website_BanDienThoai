import { useState } from "react";
import { useModalContext } from "../../../../../CONTEXT/QuanLiModal";
import * as fun from '../../../../../JS/FUNCTONS/function';
import * as API from '../../../../../JS/API/API';
import { useAppContext } from '../../../../../CONTEXT/TrangChuAdmin';

function SuaLinkFacebook() {
    const { modalState } = useModalContext();
    const [FacebookUrl, setFacebookUrl] = useState('');
    const [Loading, setLoading] = useState(false);
    const [err, seterr] = useState('');
    const [ok, setok] = useState('');
    const { GetTTwebsite} =useAppContext();


    const Reset = () => {
        setFacebookUrl('');
        seterr('');
        setok('');
        setLoading(false);
    };

    const LuuGT = async () => {
        seterr('');
        setok('');

        if (!FacebookUrl) {
            seterr('Vui lòng nhập đường dẫn Facebook!');
            return;
        }

     
        const fbRegex = /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)\/.*/;
       if (!fbRegex.test(FacebookUrl)) {
            seterr('Đường dẫn Facebook không hợp lệ! (Ví dụ: https://facebook.com/username)');
            return;
        }

        setLoading(true);
        const DuLieu = fun.objectToFormData({ FacebookUrl: FacebookUrl });

        try {
            const KetQua = await API.CallAPI(DuLieu, { url: '/admin/ChinhSuaFacebook', PhuongThuc: 1 });
            if (KetQua.Status) {
                seterr(KetQua.message);
            } else if (KetQua.Validate) {
                seterr(KetQua.errors[0]?.msg || 'Dữ liệu không hợp lệ');
            } else if (KetQua.ThanhCong) {
                setok(KetQua.message);
                GetTTwebsite();
            }
        } catch (error) {
            seterr('Không thể kết nối đến máy chủ, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg bg-white rounded-[2rem] overflow-hidden">
            <div className="p-8">
                <div className="space-y-6">
                    {/* KHỐI HIỂN THỊ LINK CŨ */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 px-1">
                            <i className="fa-brands fa-facebook-f text-[10px] text-blue-500"></i>
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Link hiện tại</label>
                        </div>
                        <div className="bg-blue-50/30 border border-blue-100 rounded-2xl p-4 text-blue-600/70 text-sm truncate leading-relaxed">
                            {modalState.DuLieu.LinkFacebook || "Chưa thiết lập liên kết"}
                        </div>
                    </div>

                    {/* KHỐI NHẬP LIỆU */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-end px-1">
                            <label className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.15em]">Liên kết Facebook mới</label>
                        </div>

                        <div className="relative">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                                <i className="fa-solid fa-link"></i>
                            </div>
                            <input
                                type="text"
                                value={FacebookUrl}
                                onChange={(e) => setFacebookUrl(e.target.value)}
                                disabled={Loading}
                                className={`w-full pl-12 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-300 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_20px_rgba(59,130,246,0.1)]
                                    ${err ? 'border-red-500 bg-red-50' : ''} 
                                    ${Loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="https://facebook.com/..."
                            />
                        </div>
                        <div className="min-h-[24px] px-1">
                            {Loading ? (
                                <div className="flex items-center gap-2 text-blue-500">
                                    <i className="fas fa-spinner fa-spin text-xs"></i>
                                    <p className="text-[12px] font-medium">Đang xác thực liên kết...</p>
                                </div>
                            ) : err ? (
                                <div className="flex items-center gap-2 text-red-500">
                                    <i className="fa-solid fa-circle-exclamation text-xs"></i>
                                    <p className="text-[12px] font-bold">{err}</p>
                                </div>
                            ) : ok ? (
                                <div className="flex items-center gap-2 text-green-500">
                                    <i className="fa-solid fa-check-double text-xs"></i>
                                    <p className="text-[12px] font-bold">{ok}</p>
                                </div>
                            ) : (
                                <div className="flex items-start gap-2 text-gray-400">
                                    <i className="fa-solid fa-circle-info mt-1 text-[10px]"></i>
                                    <p className="text-[11px] font-medium italic">Vui lòng copy toàn bộ URL từ trình duyệt</p>
                                </div>
                            )}
                        </div>
                    </div>

            
                    <div className="grid grid-cols-5 gap-3 pt-2">
                        <button
                            onClick={Reset}
                            disabled={Loading}
                            className="col-span-2 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-600 font-bold py-4 rounded-2xl transition-all active:scale-[0.95]"
                        >
                            <i className="fa-solid fa-trash-can"></i>
                            Hủy bỏ
                        </button>

                        <button
                            onClick={LuuGT}
                            disabled={Loading}
                            className={`col-span-3 flex items-center justify-center gap-3 font-bold py-4 rounded-2xl transition-all shadow-lg text-white
                                ${Loading 
                                    ? "bg-blue-400 cursor-not-allowed" 
                                    : "bg-[#1877F2] hover:bg-[#166fe5] hover:shadow-[0_10px_25px_rgba(24,119,242,0.3)] active:scale-[0.95] shadow-blue-100"
                                }`}
                        >
                            {Loading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Đang lưu...
                                </>
                            ) : (
                                <>
                                    <i className="fa-brands fa-facebook"></i>
                                    Cập nhật Link
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuaLinkFacebook;