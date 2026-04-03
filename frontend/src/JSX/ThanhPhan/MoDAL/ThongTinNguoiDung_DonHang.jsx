function DiaChi(){
    return(
           <div>
        <div className="flex-1 space-y-4 bg-gray-50/30">

            <div className="bg-white p-4 rounded-2xl border-2 border-orange-500 shadow-sm relative ring-4 ring-orange-50">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">Lê Minh Trí</span>
                            <span className="bg-orange-500 text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase">Mặc định</span>
                        </div>
                        <p className="text-sm text-gray-500">0901 234 567</p>
                    </div>
                    <button className="text-blue-600 text-xs font-bold px-3 py-1 bg-blue-50 rounded-lg">Sửa</button>
                </div>
                <div className="mt-3 flex gap-2 text-sm text-gray-600 italic leading-snug">
                    <i className="fas fa-map-marker-alt text-orange-500 mt-1"></i>
                    <p>88 Đường số 7, KDC Cityland Park Hills, P.10, Q. Gò Vấp, TP. Hồ Chí Minh</p>
                </div>
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                    <i className="fas fa-check text-[10px]"></i>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-blue-400 shadow-md">
                <p className="text-[10px] font-bold text-blue-500 uppercase mb-3 tracking-widest">Chỉnh sửa nhanh</p>
                <div className="space-y-3">
                    <div className="relative">
                        <i className="fas fa-user absolute left-3 top-3 text-gray-300 text-xs"></i>
                        <input type="text" value="Trần Thị Lan Anh" placeholder="Tên người nhận" 
                               className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <div className="relative">
                        <i className="fas fa-phone absolute left-3 top-3 text-gray-300 text-xs"></i>
                        <input type="text" value="0912 888 999" placeholder="Số điện thoại" 
                               className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                    </div>
                    <div className="flex gap-2 pt-1">
                        <button className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-100">Lưu thay đổi</button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-500 rounded-xl text-xs font-bold">Hủy</button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm group hover:border-orange-200 transition-colors">
                <div className="flex justify-between items-start">
                    <div>
                        <span className="font-bold text-gray-700">Nguyễn Văn Nam</span>
                        <p className="text-sm text-gray-400 mt-0.5">0944 555 666</p>
                    </div>
                    <button className="text-gray-400 text-xs font-bold hover:text-blue-600">Sửa</button>
                </div>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2 italic">123/45 Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh</p>
                <button className="w-full mt-4 py-2.5 border border-orange-500 text-orange-500 rounded-xl text-xs font-bold hover:bg-orange-500 hover:text-white transition-all uppercase tracking-tight">
                    Giao tới địa chỉ này
                </button>
            </div>

            <button className="w-full py-6 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors">
                <i className="fas fa-plus-circle text-xl"></i>
                <span className="text-xs font-bold">Thêm địa chỉ giao hàng mới</span>
            </button>

        </div>

        <div className="p-5 border-t bg-white">
            <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-transform">
                Xác nhận địa chỉ
            </button>
        </div>
    </div>
    )
};
export default DiaChi;