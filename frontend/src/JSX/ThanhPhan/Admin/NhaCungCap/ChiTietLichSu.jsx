import React from 'react';

const ChiTietLichSuChuyenTien = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-12">
      
      {/* --- HEADER --- */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Chi tiết giao dịch</h1>
              <p className="text-sm text-slate-500">Mã hệ thống: <span className="font-mono font-medium text-slate-700">TRX-2023-001</span></p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 text-sm">
              <i className="fa-solid fa-download mr-2"></i> Tải ủy nhiệm chi
            </button>
            <button className="px-4 py-2 bg-white border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 text-sm">
              <i className="fa-solid fa-circle-exclamation mr-2"></i> Báo lỗi
            </button>
          </div>
        </div>
      </header>

      {/* --- BODY --- */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        
        {/* STATUS BANNER */}
        <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl shadow-sm">
                    <i className="fa-solid fa-check"></i>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-green-800">Chuyển khoản thành công</h2>
                    <p className="text-sm text-green-700">Giao dịch đã được ghi nhận vào lúc 09:20 - 20/10/2023</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm text-green-600 font-medium uppercase tracking-wider">Tổng số tiền</p>
                <p className="text-3xl font-bold text-green-800">50.000.000 ₫</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* CỘT TRÁI: CHI TIẾT GIAO DỊCH */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Card 1: Thông tin chuyển khoản (Sender -> Receiver) */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800">Thông tin chuyển tiền</h3>
                    </div>
                    
                    <div className="p-6 relative">
                        {/* Đường nối đứt đoạn trang trí */}
                        <div className="absolute left-[29px] top-[70px] bottom-[70px] border-l-2 border-dashed border-slate-200 z-0"></div>

                        {/* Người gửi */}
                        <div className="flex gap-4 relative z-10 mb-8">
                            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                                <i className="fa-solid fa-building"></i>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Tài khoản nguồn (Của bạn)</p>
                                <p className="font-bold text-slate-800 text-lg">CTY TNHH MY BUSINESS</p>
                                <p className="text-slate-600">Vietcombank - CN Tân Bình</p>
                                <p className="font-mono text-slate-500 bg-slate-100 inline-block px-2 py-0.5 rounded text-sm mt-1">0981 000 332 xxx</p>
                            </div>
                        </div>

                        {/* Icon mũi tên ở giữa */}
                        <div className="flex items-center gap-4 my-2 pl-3">
                             <i className="fa-solid fa-arrow-down text-slate-300"></i>
                        </div>

                        {/* Người nhận */}
                        <div className="flex gap-4 relative z-10 mt-8">
                            <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                                <i className="fa-solid fa-user-check"></i>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Tài khoản thụ hưởng</p>
                                <p className="font-bold text-slate-800 text-lg">NCC THIẾT BỊ ĐIỆN TỬ ABC</p>
                                <p className="text-slate-600">Techcombank - CN Sài Gòn</p>
                                <p className="font-mono text-slate-500 bg-slate-100 inline-block px-2 py-0.5 rounded text-sm mt-1">1903 485 992 xxx</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2: Chi tiết kỹ thuật (Bank Ref, Fee, Content) */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-800 mb-4">Chi tiết nội dung</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b border-slate-100">
                            <span className="text-slate-500">Nội dung chuyển khoản</span>
                            <span className="font-medium text-slate-800 text-right max-w-[60%]">Thanh toan don hang HD-NK-0089 dot 1</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-slate-100">
                            <span className="text-slate-500">Phí giao dịch</span>
                            <span className="font-medium text-slate-800">Miễn phí</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-slate-100">
                            <span className="text-slate-500">Mã tham chiếu NH (FT Code)</span>
                            <span className="font-mono font-medium text-blue-600 cursor-pointer hover:underline">FT2329384911</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-slate-500">Liên kết hóa đơn</span>
                            <span className="font-medium text-blue-600 cursor-pointer hover:text-blue-800">
                                <i className="fa-solid fa-link mr-1"></i> HD-NK-0089
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CỘT PHẢI: TIMELINE & BẰNG CHỨNG */}
            <div className="lg:col-span-1 space-y-6">
                
                {/* Timeline */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-sm font-bold text-slate-800 uppercase mb-6 tracking-wide">Tiến trình xử lý</h3>
                    
                    <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
                        {/* Step 3 (Mới nhất - Top) */}
                        <div className="relative pl-8">
                            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-green-500 ring-4 ring-white"></div>
                            <div>
                                <p className="font-bold text-sm text-slate-800">Hoàn tất</p>
                                <p className="text-xs text-slate-500 mt-1">Ngân hàng đã xử lý thành công.</p>
                                <span className="text-[11px] font-medium text-slate-400 block mt-1">09:20 - 20/10/2023</span>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative pl-8">
                            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-blue-600 ring-4 ring-white"></div>
                            <div>
                                <p className="font-bold text-sm text-slate-800">Đã gửi lệnh đi</p>
                                <p className="text-xs text-slate-500 mt-1">Hệ thống đã gửi lệnh sang VCB.</p>
                                <span className="text-[11px] font-medium text-slate-400 block mt-1">09:15 - 20/10/2023</span>
                            </div>
                        </div>

                        {/* Step 1 */}
                        <div className="relative pl-8">
                            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-slate-300 ring-4 ring-white"></div>
                            <div>
                                <p className="font-bold text-sm text-slate-800">Khởi tạo</p>
                                <p className="text-xs text-slate-500 mt-1">Người tạo: Kế toán A</p>
                                <span className="text-[11px] font-medium text-slate-400 block mt-1">08:30 - 20/10/2023</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Proof Image (Bằng chứng) */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <h3 className="text-sm font-bold text-slate-800 uppercase mb-4 tracking-wide">Chứng từ đính kèm</h3>
                    
                    {/* Giả lập ảnh UNC */}
                    <div className="group relative w-full h-32 bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-blue-400 transition-colors">
                        <i className="fa-regular fa-image text-3xl text-slate-400 mb-2 group-hover:text-blue-500"></i>
                        <p className="text-xs text-slate-500 font-medium group-hover:text-blue-600">UNC_Vietcombank.jpg</p>
                        
                        {/* Overlay khi hover */}
                        <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center gap-2 transition-all">
                            <button className="p-2 bg-white rounded-full text-slate-800 hover:text-blue-600">
                                <i className="fa-solid fa-eye"></i>
                            </button>
                            <button className="p-2 bg-white rounded-full text-slate-800 hover:text-blue-600">
                                <i className="fa-solid fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </main>
    </div>
  );
};

export default ChiTietLichSuChuyenTien;