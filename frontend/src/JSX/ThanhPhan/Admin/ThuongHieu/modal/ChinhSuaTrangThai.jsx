import React, { useState } from 'react';
import { useModalContext } from "../../../../../CONTEXT/QuanLiModal";
import * as API from '../../../../../JS/API/API';
import * as ThongBao from '../../../../../JS/FUNCTONS/ThongBao'
import * as fun from '../../../../../JS/FUNCTONS/function';
function ChinhSuaTrangThai() {
    const { modalState } = useModalContext();
    const initialStatus = modalState?.DuLieu?.TrangThai || 1;
    const [status, setStatus] = useState(initialStatus);
    const [loading, setLoading] = useState(false);
    const [ThanhCong, setThanhCong] = useState('');
    const [ThatBai, setThatBai] = useState('');
    const handleSave = async () => {
        setLoading(true);
        if (status === modalState?.DuLieu?.TrangThai) {
            setThatBai('Bạn chưa thay đổi trạng thái thương hiệu!');
            setLoading(false);
            return;
        }
        const XacNhan= ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn muốn thay đổi trạng thái thương hiệu này không?');
        if(!XacNhan){
            setLoading(false);
            return;
        }
        try {
           const formData = fun.objectToFormData({
                id: modalState?.DuLieu?.id || null,
                TrangThai: status
            });

            const response = await API.CallAPI(formData, { PhuongThuc: 1, url: '/admin/ChinhSuaTrangThai' });
            if (response.Status) {
                setThatBai(response.message);
                return;
            }
            if (response.ThanhCong) {
                setThanhCong(response.message);
                return;
            }
            if (response.ThatBai) {
                setThatBai(response.message);
                return;
            }

        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái thương hiệu:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-2 bg-white rounded-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
                Chỉnh sửa trạng thái thương hiệu
            </h2>
            
            <div className="space-y-6">
                {/* 1. Hiển thị trạng thái hiện tại (Visual feedback) */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Trạng thái hiện tại:</span>
                    <span className={`px-3 py-1 text-sm font-bold rounded-full border ${
                        status === 1 
                            ? 'bg-green-100 text-green-700 border-green-200' 
                            : 'bg-red-100 text-red-700 border-red-200'
                    }`}>
                        {status === 1 ? '🟢 Đang hoạt động' : '🔴 Đang ngưng'}
                    </span>
                </div>

                {/* 2. Nút bấm thay đổi trạng thái (Logic theo yêu cầu) */}
                <div>
                    {status === 1 ? (
                        // Nếu status = 1 -> Hiện nút Ngưng
                        <button 
                            onClick={() => setStatus(0)}
                            className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-red-600 bg-white border-2 border-red-100 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Ngưng hoạt động
                        </button>
                    ) : (
                        <button 
                            onClick={() => setStatus(1)}
                            className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-blue-600 bg-white border-2 border-blue-100 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                            Hợp tác trở lại
                        </button>
                    )}
                    {
                        ThanhCong ? <p className="mt-3 text-sm text-green-600 font-medium text-center"><i className="fa-solid fa-circle-check mr-2"></i>{ThanhCong}</p> : 
                         ThatBai && <p className="mt-3 text-sm text-red-600 font-medium text-center"><i className="fa-solid fa-triangle-exclamation mr-2"></i>{ThatBai}</p>
                    }
                

                    <p className="mt-3 text-xs text-gray-400 text-center">
                        * Nhấn nút trên để chuyển đổi trạng thái ngay lập tức.
                    </p>
                </div>

                <hr className="border-gray-100" />

            
                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={handleSave}
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-gray-800 shadow-lg shadow-gray-200 transition-all"
                    >
                       {loading ? (
                        <span className="flex items-center gap-2">
                            <i className="fa-solid fa-spinner animate-spin"></i> Đang lưu...
                        </span>
                    ) : (
                        "Lưu thay đổi"
                    )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChinhSuaTrangThai;