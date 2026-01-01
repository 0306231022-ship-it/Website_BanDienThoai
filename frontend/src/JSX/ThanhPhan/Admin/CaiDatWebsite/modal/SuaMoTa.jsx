import { useState } from "react";
import * as fun from '../../../../../JS/FUNCTONS/function';
import * as API from '../../../../../JS/API/API';
import { useAppContext } from '../../../../../CONTEXT/TrangChuAdmin';

function SuaMoTa({DuLieu,url}) {
    const [MoTa, setMoTa] = useState('');
    const [err, seterr] = useState('');
    const [ok, setok] = useState('');
    const [Loading, setLoading] = useState(false);
    const { GetTTwebsite} =useAppContext();
    const id=DuLieu.id;

    const Reset = () => {
        setMoTa('');
        seterr('');
        setok('');
        setLoading(false);
    };
    

    const LuuGT = async () => {
        seterr('');
        setok('');

        if (!MoTa) {
            seterr('Vui lòng nhập dữ liệu!');
            return;
        }
        if (MoTa.length > 255) {
            seterr('Vượt quá kí tự cho phép!');
            return;
        }

        setLoading(true);
        const DuLieu = fun.objectToFormData({ MoTa: MoTa , id : id });

        try {
            const KetQua = await API.CallAPI(DuLieu, { url: url , PhuongThuc: 1 });

            if (KetQua.Status) {
                seterr(KetQua.message);
            } else if (KetQua.Validate) {
                seterr(KetQua.errors[0]?.msg || 'Dữ liệu không hợp lệ');
            } else if (KetQua.ThanhCong) {
                setok(KetQua.message);
                GetTTwebsite();
            }
        } catch (error) {
            seterr('Không thể kết nối đến hệ thống, Vui lòng thử lại sau!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-lg bg-white rounded-[2rem] overflow-hidden">
            <div className="p-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 px-1">
                            <i className="fa-solid fa-clock-rotate-left text-[10px] text-gray-400"></i>
                            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Mô tả trước đó</label>
                        </div>
                        <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-gray-500 text-sm italic leading-relaxed">
                            "{DuLieu.DuLieu}"
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-end px-1">
                            <label className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.15em]">Thông tin hiển thị mới</label>
                        </div>

                        <div className="relative group">
                            <textarea
                                rows="3"
                                value={MoTa}
                                onChange={(e) => setMoTa(e.target.value)}
                                maxLength={255}
                                disabled={Loading}
                                className={`w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-300 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] resize-none
                                    ${err ? 'border-red-500 bg-red-50 text-red-900' : ''} 
                                    ${Loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                placeholder="Nhập mô tả website mới..."
                            ></textarea>
                        </div>
                        <div className="min-h-[24px] px-1">
                            {Loading ? (
                                <div className="flex items-center gap-2 text-blue-500">
                                    <i className="fas fa-spinner fa-spin text-xs"></i>
                                    <p className="text-[12px] font-medium">Hệ thống đang xử lý...</p>
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
                                <div className="flex items-start gap-2 text-blue-500/60">
                                    <i className="fa-solid fa-circle-info mt-1 text-[10px]"></i>
                                    <p className="text-[12px] font-medium leading-relaxed">
                                        Nội dung đang nhập: <span className="text-gray-700 font-bold">"{MoTa || 'Trống'}"</span>
                                    </p>
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
                            <i className="fa-solid fa-rotate-left"></i>
                            Làm mới
                        </button>

                        <button
                            onClick={LuuGT}
                            disabled={Loading}
                            className={`col-span-3 flex items-center justify-center gap-3 font-bold py-4 rounded-2xl transition-all shadow-lg text-white
                                ${Loading 
                                    ? "bg-blue-400 cursor-not-allowed" 
                                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-[0_10px_25px_rgba(37,99,235,0.3)] active:scale-[0.95] shadow-blue-100"
                                }`}
                        >
                            {Loading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Đang cập nhật
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-cloud-arrow-up"></i>
                                    Cập nhật ngay
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuaMoTa;