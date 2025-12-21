import { useState } from "react";
function SuaMoTa(){
    const [DuLieu,setdl]=useState('');
    
    return (
        <>
            <div className="w-full max-w-lg bg-white rounded-[2rem] overflow-hidden">
        <div className="p-8">
        

            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                        <i className="fa-solid fa-clock-rotate-left text-[10px] text-gray-400"></i>
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">Mô tả trước đó</label>
                    </div>
                    <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-gray-500 text-sm italic leading-relaxed">
                        "Đây là nội dung cũ đã được thay thế trước đó..."
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-end px-1">
                        <label className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.15em]">Thông tin hiển thị mới</label>
                    </div>

                    <div className="relative group">
                        <textarea 
                            rows="3"
                            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none transition-all font-medium text-gray-800 placeholder:text-gray-300 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] resize-none"
                            placeholder="Nhập tên website mới..."
                        ></textarea>
                        
                    </div>

                    <div className="min-h-[20px] px-1">
                        <div className="flex items-start gap-2 text-blue-500">
                            <i className="fa-solid fa-circle-info mt-1 text-[10px]"></i>
                            <p className="text-[12px] font-medium leading-relaxed">
                                Nội dung hiện tại đang dùng: <span className="text-gray-700 font-bold">"Trang chủ chính thức"</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-3 pt-2">
                    <button className="col-span-2 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl transition-all active:scale-[0.95]">
                        <i className="fa-solid fa-rotate-left"></i>
                        Làm mới
                    </button>

                    <button className="col-span-3 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 hover:shadow-[0_10px_25px_rgba(37,99,235,0.3)] text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.95] shadow-lg shadow-blue-100">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        Cập nhật ngay
                    </button>
                </div>
            </div>
        </div>
        
        <div className="bg-gray-50/50 py-4 text-center border-t border-gray-100">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Hệ thống cập nhật tự động</p>
        </div>
    </div>

        </>
    )
};
export default SuaMoTa;