import { useState } from "react";
import { useModalContext } from "../../../../../CONTEXT/QuanLiModal";
import * as fun from '../../../../../JS/FUNCTONS/function';
import * as API from '../../../../../JS/API/API';
import { useAppContext } from '../../../../../CONTEXT/TrangChuAdmin';

function SuaEmail() {
    const { modalState } = useModalContext();
    const [Email, setEmail] = useState('');
    const [Loading, setLoading] = useState(false);
    const [err, seterr] = useState('');
    const [ok, setok] = useState('');
    const { GetTTwebsite} =useAppContext();


    const Reset = () => {
        setEmail('');
        seterr('');
        setok('');
        setLoading(false);
    };

    const LuuGT = async () => {
        seterr('');
        setok('');

        if (!Email) {
            seterr('Vui lòng nhập địa chỉ Email!');
            return;
        }
        if(!fun.validateEmail(Email)){
            seterr('email không đúng định dạng!')
        }
        setLoading(true);
        const DuLieu = fun.objectToFormData({ Email: Email });

        try {
            const KetQua = await API.CallAPI(DuLieu, { url: '/admin/ChinhSuaEmail', PhuongThuc: 1 });

            if (KetQua.Status) {
                seterr(KetQua.message);
            } else if (KetQua.Validate) {
                seterr(KetQua.errors[0]?.msg || 'Email không hợp lệ');
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
                    {/* EMAIL CŨ */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 px-1">
                            <i className="fa-solid fa-envelope-open-text text-[10px] text-orange-500"></i>
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Email hiện tại</label>
                        </div>
                        <div className="bg-orange-50/30 border border-orange-100 rounded-2xl p-4 text-orange-600/70 text-sm font-medium">
                            {modalState.DuLieu.Email || "Chưa thiết lập Email"}
                        </div>
                    </div>

                    {/* Ô NHẬP LIỆU */}
                    <div className="space-y-3">
                        <label className="px-1 text-[11px] font-bold text-orange-600 uppercase tracking-[0.15em]">Địa chỉ Email mới</label>
                        
                        <div className="relative">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-400">
                                <i className="fa-solid fa-at text-lg"></i>
                            </div>
                            <input
                                type="email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={Loading}
                                className={`w-full pl-12 pr-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none transition-all font-medium text-gray-800 focus:border-orange-500 focus:bg-white focus:shadow-[0_0_20px_rgba(249,115,22,0.1)]
                                    ${err ? 'border-red-500 bg-red-50' : ''} 
                                    ${Loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="example@gmail.com"
                            />
                        </div>

                        {/* THÔNG BÁO */}
                        <div className="min-h-[24px] px-1">
                            {Loading ? (
                                <div className="flex items-center gap-2 text-orange-500">
                                    <i className="fas fa-spinner fa-spin text-xs"></i>
                                    <p className="text-[12px] font-medium">Đang xác thực Email...</p>
                                </div>
                            ) : err ? (
                                <div className="flex items-center gap-2 text-red-500">
                                    <i className="fa-solid fa-circle-exclamation text-xs"></i>
                                    <p className="text-[12px] font-bold">{err}</p>
                                </div>
                            ) : ok ? (
                                <div className="flex items-center gap-2 text-green-500">
                                    <i className="fa-solid fa-envelope-circle-check text-xs"></i>
                                    <p className="text-[12px] font-bold">{ok}</p>
                                </div>
                            ) : (
                                <p className="text-[11px] text-gray-400 italic font-medium px-1">Dùng để nhận thông báo và liên hệ từ khách hàng.</p>
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
                            <i className="fa-solid fa-eraser"></i>
                            Xóa nhập
                        </button>

                        <button
                            onClick={LuuGT}
                            disabled={Loading}
                            className={`col-span-3 flex items-center justify-center gap-3 font-bold py-4 rounded-2xl transition-all shadow-lg text-white
                                ${Loading 
                                    ? "bg-orange-300 cursor-not-allowed" 
                                    : "bg-orange-500 hover:bg-orange-600 hover:shadow-[0_10px_25px_rgba(249,115,22,0.3)] active:scale-[0.95]"
                                }`}
                        >
                            {Loading ? (
                                <><i className="fas fa-spinner fa-spin"></i> Đang cập nhật</>
                            ) : (
                                <><i className="fa-solid fa-paper-plane"></i> Lưu Email</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuaEmail;