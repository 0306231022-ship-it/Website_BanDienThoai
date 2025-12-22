import { useState } from "react";
import { useModalContext } from "../../../../../CONTEXT/QuanLiModal";
import * as fun from '../../../../../JS/FUNCTONS/function';
import * as API from '../../../../../JS/API/API';
import { useAppContext } from '../../../../../CONTEXT/TrangChuAdmin';

function SuaLinkInstagram() {
    const { modalState } = useModalContext();
    const [InstaUrl, setInstaUrl] = useState('');
    const [Loading, setLoading] = useState(false);
    const [err, seterr] = useState('');
    const [ok, setok] = useState('');
    const { GetTTwebsite} =useAppContext();


    const Reset = () => {
        setInstaUrl('');
        seterr('');
        setok('');
        setLoading(false);
    };

    const LuuGT = async () => {
        seterr('');
        setok('');

        // 1. Kiểm tra rỗng
        if (!InstaUrl) {
            seterr('Vui lòng nhập đường dẫn Instagram!');
            return;
        }

        // 2. Kiểm tra định dạng link Instagram (Regex)
        const instaRegex = /^(https?:\/\/)?(www\.)?(instagram\.com)\/.*/;
        if (!instaRegex.test(InstaUrl)) {
            seterr('Link không đúng! (VD: https://instagram.com/user)');
            return;
        }

        setLoading(true);
        const DuLieu = fun.objectToFormData({ InstagramUrl: InstaUrl });

        try {
            const KetQua = await API.CallAPI(DuLieu, { url: '/admin/ChinhSuaInstagram', PhuongThuc: 1 });
    
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
                    {/* LINK CŨ */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 px-1">
                            <i className="fa-brands fa-instagram text-[10px] text-pink-500"></i>
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Link hiện tại</label>
                        </div>
                        <div className="bg-pink-50/30 border border-pink-100 rounded-2xl p-4 text-pink-600/70 text-sm truncate">
                            {modalState.DuLieu.LinkInstagram || "Chưa có liên kết Instagram"}
                        </div>
                    </div>

                    {/* Ô NHẬP LIỆU */}
                    <div className="space-y-3">
                        <label className="px-1 text-[11px] font-bold text-pink-600 uppercase tracking-[0.15em]">Liên kết Instagram mới</label>
                        
                        <div className="relative">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-400">
                                <i className="fa-brands fa-instagram text-lg"></i>
                            </div>
                            <input
                                type="text"
                                value={InstaUrl}
                                onChange={(e) => setInstaUrl(e.target.value)}
                                disabled={Loading}
                                className={`w-full pl-12 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none transition-all font-medium text-gray-800 focus:border-pink-500 focus:bg-white focus:shadow-[0_0_20px_rgba(236,72,153,0.1)]
                                    ${err ? 'border-red-500 bg-red-50' : ''} 
                                    ${Loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="https://instagram.com/username"
                            />
                        </div>

                        {/* THÔNG BÁO */}
                        <div className="min-h-[24px] px-1">
                            {Loading ? (
                                <div className="flex items-center gap-2 text-pink-500">
                                    <i className="fas fa-spinner fa-spin text-xs"></i>
                                    <p className="text-[12px] font-medium">Đang kiểm tra dữ liệu...</p>
                                </div>
                            ) : err ? (
                                <div className="flex items-center gap-2 text-red-500">
                                    <i className="fa-solid fa-circle-exclamation text-xs"></i>
                                    <p className="text-[12px] font-bold">{err}</p>
                                </div>
                            ) : ok ? (
                                <div className="flex items-center gap-2 text-green-500">
                                    <i className="fa-solid fa-square-check text-xs"></i>
                                    <p className="text-[12px] font-bold">{ok}</p>
                                </div>
                            ) : (
                                <p className="text-[11px] text-gray-400 italic px-1 font-medium">Nhập đường dẫn đầy đủ của trang cá nhân</p>
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
                            <i className="fa-solid fa-xmark"></i>
                            Hủy
                        </button>

                        <button
                            onClick={LuuGT}
                            disabled={Loading}
                            className={`col-span-3 flex items-center justify-center gap-3 font-bold py-4 rounded-2xl transition-all shadow-lg text-white
                                ${Loading 
                                    ? "bg-pink-300 cursor-not-allowed" 
                                    : "bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 active:scale-[0.95]"
                                }`}
                        >
                            {Loading ? (
                                <><i className="fas fa-spinner fa-spin"></i> Đang cập nhật</>
                            ) : (
                                <><i className="fa-brands fa-instagram"></i> Cập nhật ngay</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuaLinkInstagram;