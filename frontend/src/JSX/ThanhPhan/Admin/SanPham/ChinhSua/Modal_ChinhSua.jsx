function ThongTinCinhSua() {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-slate-50 min-h-screen">
  <div className="mb-10 flex items-end justify-between">
    <div>
      <h2 className="text-3xl font-black text-slate-900 tracking-tight">
        Chỉnh sửa Sản phẩm
      </h2>
      <p className="text-slate-500 mt-2 font-medium">Cập nhật nội dung chi tiết để tối ưu hóa hiển thị</p>
    </div>
    <span className="hidden md:block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
      Admin Mode
    </span>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    <button className="group flex items-center p-1 bg-white hover:bg-indigo-600 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-indigo-200 transition-all duration-500 border border-slate-200 hover:border-indigo-600">
      <div className="m-3 p-4 bg-indigo-50 rounded-[1.5rem] group-hover:bg-white/20 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="flex-1 text-left pr-6">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-white leading-tight">Hình ảnh</h3>
        <p className="text-sm text-slate-500 group-hover:text-indigo-100">Album, ảnh bìa, video</p>
      </div>
    </button>

    <button className="group flex items-center p-1 bg-white hover:bg-blue-600 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-blue-200 transition-all duration-500 border border-slate-200 hover:border-blue-600">
      <div className="m-3 p-4 bg-blue-50 rounded-[1.5rem] group-hover:bg-white/20 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="flex-1 text-left pr-6">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-white leading-tight">Thông tin chung</h3>
        <p className="text-sm text-slate-500 group-hover:text-blue-100">Tên, giá, mô tả ngắn</p>
      </div>
    </button>

    <button className="group flex items-center p-1 bg-white hover:bg-amber-500 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-amber-200 transition-all duration-500 border border-slate-200 hover:border-amber-500">
      <div className="m-3 p-4 bg-amber-50 rounded-[1.5rem] group-hover:bg-white/20 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <div className="flex-1 text-left pr-6">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-white leading-tight">Thông số</h3>
        <p className="text-sm text-slate-500 group-hover:text-amber-50">Cấu hình, kích thước</p>
      </div>
    </button>

    <button className="group flex items-center p-1 bg-white hover:bg-emerald-600 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-emerald-200 transition-all duration-500 border border-slate-200 hover:border-emerald-600">
      <div className="m-3 p-4 bg-emerald-50 rounded-[1.5rem] group-hover:bg-white/20 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-emerald-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
      <div className="flex-1 text-left pr-6">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-white leading-tight">Ghi chú</h3>
        <p className="text-sm text-slate-500 group-hover:text-emerald-50">Lưu ý nội bộ, ưu đãi</p>
      </div>
    </button>
    <button className="group flex items-center p-1 bg-white hover:bg-rose-600 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-rose-200 transition-all duration-500 border border-slate-200 hover:border-rose-600">
  <div className="m-3 p-4 bg-rose-50 rounded-[1.5rem] group-hover:bg-white/20 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-rose-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
    </svg>
  </div>
  <div className="flex-1 text-left pr-6">
    <h3 className="text-lg font-bold text-slate-800 group-hover:text-white leading-tight">Danh sách IMEI</h3>
    <p className="text-sm text-slate-500 group-hover:text-rose-50">Quản lý mã định danh, số sê-ri</p>
  </div>
</button>

  </div>
</div>
    )
};
export default ThongTinCinhSua;