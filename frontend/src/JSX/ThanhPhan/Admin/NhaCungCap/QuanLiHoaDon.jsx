import React from 'react';

const ChiTietHoaDonUI = () => {
  return (
    <div className="bg-slate-100 min-h-screen pb-10 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-100 text-slate-500">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-800">HD-NK-0089</h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-600 border border-orange-200">
                  Thanh toán một phần
                </span>
              </div>
              <p className="text-sm text-slate-500">Ngày tạo: 15/10/2023</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50">
              <i className="fa-solid fa-print mr-2"></i> In hóa đơn
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md">
              <i className="fa-solid fa-money-bill-transfer mr-2"></i> Thanh toán tiếp
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CỘT TRÁI: CHI TIẾT */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Bảng sản phẩm */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Chi tiết sản phẩm</h3>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Tên hàng hóa</th>
                  <th className="px-6 py-3 text-center">SL</th>
                  <th className="px-6 py-3 text-right">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">Laptop Dell XPS 15</td>
                  <td className="px-6 py-4 text-center text-slate-600">2</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-800">80.000.000</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">Màn hình LG UltraFine</td>
                  <td className="px-6 py-4 text-center text-slate-600">5</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-800">50.000.000</td>
                </tr>
              </tbody>
            </table>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
               <div className="flex justify-end gap-12 text-xl pt-2">
                 <span className="font-bold text-slate-800">Tổng cộng:</span>
                 <span className="font-bold text-blue-600">130.000.000 ₫</span>
               </div>
            </div>
          </div>

          {/* LỊCH SỬ THANH TOÁN */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <i className="fa-solid fa-clock-rotate-left text-blue-500"></i>
                Lịch sử thanh toán
              </h3>
            </div>
            
            <div className="p-0">
              {/* Item 1 */}
              <div className="group flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-100 text-purple-600">
                    <i className="fa-solid fa-building-columns"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">PC-001 <span className="font-normal text-slate-500 ml-2">- 20/10/2023</span></p>
                    <p className="text-xs text-slate-500 mt-0.5">Thanh toán đợt 1</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">50.000.000 ₫</p>
                  <p className="text-xs text-slate-500 flex items-center justify-end gap-1 mt-1">
                    Xem chi tiết <i className="fa-solid fa-chevron-right text-[10px]"></i>
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="group flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                    <i className="fa-solid fa-wallet"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">PC-002 <span className="font-normal text-slate-500 ml-2">- 25/10/2023</span></p>
                    <p className="text-xs text-slate-500 mt-0.5">Thanh toán tiền mặt</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">15.000.000 ₫</p>
                  <p className="text-xs text-slate-500 flex items-center justify-end gap-1 mt-1">
                    Xem chi tiết <i className="fa-solid fa-chevron-right text-[10px]"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: INFO & TIẾN ĐỘ */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Nhà cung cấp</h4>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-700 font-bold">DL</div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Công ty Điện Tử ABC</p>
                <p className="text-xs text-slate-500">Mã: NCC-001</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Tiến độ thanh toán</h4>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-2xl font-bold text-slate-800">65.000.000</span>
              <span className="text-sm text-slate-500 mb-1.5">/ 130.000.000</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              <p className="text-xs text-orange-600 font-bold uppercase mb-1">Số tiền còn nợ</p>
              <p className="text-xl font-bold text-orange-700">65.000.000 ₫</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ChiTietHoaDonUI;