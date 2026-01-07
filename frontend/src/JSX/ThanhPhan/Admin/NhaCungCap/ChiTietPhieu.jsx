function ChiTietPhieu(){
    return (
        <>
        {/* --- MODAL CHI TIẾT PHIẾU NHẬP (Giả lập trạng thái đang mở) --- */}
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    
    {/* Container Modal */}
    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* 1. HEADER MODAL */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <div>
                <h3 className="text-lg font-bold text-slate-800">Chi tiết phiếu nhập #PNK-001</h3>
                <p className="text-sm text-slate-500">Ngày nhập: 25/10/2023 - 09:30</p>
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                <i className="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        {/* 2. NỘI DUNG CHÍNH (Có thể cuộn) */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            
            {/* Thông tin chung (Grid 2 cột) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Cột trái: Thông tin nhà cung cấp */}
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-100 pb-2 flex items-center gap-2">
                        <i className="fa-solid fa-building text-blue-500"></i> Nhà cung cấp
                    </h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Tên NCC:</span>
                            <span className="font-medium text-slate-700">Công ty TNHH ABC</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Số điện thoại:</span>
                            <span className="font-medium text-slate-700">0912.345.678</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Địa chỉ:</span>
                            <span className="font-medium text-slate-700 text-right w-2/3">123 Đường Láng, Đống Đa, Hà Nội</span>
                        </div>
                    </div>
                </div>

                {/* Cột phải: Thông tin phiếu */}
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <h4 className="text-sm font-semibold text-slate-800 mb-3 border-b border-slate-100 pb-2 flex items-center gap-2">
                        <i className="fa-solid fa-circle-info text-blue-500"></i> Thông tin phiếu
                    </h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Người tạo:</span>
                            <span className="font-medium text-slate-700">Nguyễn Văn A</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Kho nhập:</span>
                            <span className="font-medium text-slate-700">Kho Tổng (Hà Nội)</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">Trạng thái:</span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">Hoàn thành</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bảng chi tiết sản phẩm */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden mb-6">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-600 font-semibold uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 w-10 text-center">STT</th>
                            <th className="px-4 py-3">Tên sản phẩm</th>
                            <th className="px-4 py-3 text-center">ĐVT</th>
                            <th className="px-4 py-3 text-right">Số lượng</th>
                            <th className="px-4 py-3 text-right">Đơn giá</th>
                            <th className="px-4 py-3 text-right">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {/* Item 1 */}
                        <tr>
                            <td className="px-4 py-3 text-center text-slate-500">1</td>
                            <td className="px-4 py-3">
                                <div className="font-medium text-slate-800">iPhone 15 Pro Max 256GB</div>
                                <div className="text-xs text-slate-400">Mã: IP15-PM-256</div>
                            </td>
                            <td className="px-4 py-3 text-center text-slate-600">Cái</td>
                            <td className="px-4 py-3 text-right font-medium">10</td>
                            <td className="px-4 py-3 text-right text-slate-600">29.000.000 ₫</td>
                            <td className="px-4 py-3 text-right font-medium text-slate-800">290.000.000 ₫</td>
                        </tr>
                        {/* Item 2 */}
                        <tr>
                            <td className="px-4 py-3 text-center text-slate-500">2</td>
                            <td className="px-4 py-3">
                                <div className="font-medium text-slate-800">Ốp lưng MagSafe Silicon</div>
                                <div className="text-xs text-slate-400">Mã: ACC-CASE-001</div>
                            </td>
                            <td className="px-4 py-3 text-center text-slate-600">Cái</td>
                            <td className="px-4 py-3 text-right font-medium">50</td>
                            <td className="px-4 py-3 text-right text-slate-600">150.000 ₫</td>
                            <td className="px-4 py-3 text-right font-medium text-slate-800">7.500.000 ₫</td>
                        </tr>
                        {/* Item 3 */}
                        <tr>
                            <td className="px-4 py-3 text-center text-slate-500">3</td>
                            <td className="px-4 py-3">
                                <div className="font-medium text-slate-800">Củ sạc nhanh 20W Apple</div>
                                <div className="text-xs text-slate-400">Mã: ACC-CHG-20W</div>
                            </td>
                            <td className="px-4 py-3 text-center text-slate-600">Cái</td>
                            <td className="px-4 py-3 text-right font-medium">20</td>
                            <td className="px-4 py-3 text-right text-slate-600">450.000 ₫</td>
                            <td className="px-4 py-3 text-right font-medium text-slate-800">9.000.000 ₫</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Phần tổng tiền (Căn phải) */}
            <div className="flex justify-end">
                <div className="w-full  bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Tổng tiền hàng:</span>
                        <span className="font-medium">306.500.000 ₫</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Chiết khấu (0%):</span>
                        <span className="font-medium text-slate-800">0 ₫</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                        <span>Thuế VAT (10%):</span>
                        <span className="font-medium text-slate-800">30.650.000 ₫</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                        <span className="font-bold text-slate-800">Tổng thanh toán:</span>
                        <span className="font-bold text-xl text-blue-600">337.150.000 ₫</span>
                    </div>
                </div>
            </div>
            
            {/* Ghi chú */}
            <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded text-sm text-amber-800">
                <strong>Ghi chú:</strong> Hàng nhập đợt 1 phục vụ cho sự kiện Black Friday.
            </div>

        </div>

        {/* 3. FOOTER ACTIONS */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 rounded-b-lg">
            <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
                Đóng
            </button>
            <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
                <i className="fa-solid fa-file-excel text-green-600"></i> Xuất Excel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
                <i className="fa-solid fa-print"></i> In phiếu nhập
            </button>
        </div>
    </div>
</div>
        </>
    )
};
export default ChiTietPhieu;