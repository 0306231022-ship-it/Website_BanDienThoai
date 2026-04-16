function TongQuan(){
    return(
        <div className="space-y-8">
  
  <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-emerald-500 p-8 md:p-10 rounded-[2.5rem] text-white shadow-xl shadow-teal-100/50">
    <div className="relative z-10 max-w-xl">
      <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
        Chào mừng trở lại, <span className="text-teal-100 uppercase">A Phát</span>! 👋
      </h1>
      <p className="text-teal-50 text-lg font-medium leading-relaxed opacity-90">
        Hôm nay là một ngày tuyệt vời để kiểm tra các đơn hàng mới hoặc cập nhật hồ sơ cá nhân của bạn.
      </p>
      <div className="mt-6 flex gap-3">
        <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-bold border border-white/20">
          <i className="fas fa-crown mr-2 text-yellow-300"></i> Thành viên Bạc
        </span>
      </div>
    </div>
    
    <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-[-10%] right-[10%] w-40 h-40 bg-teal-300 opacity-20 rounded-full blur-2xl"></div>
  </div>

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        <i className="fas fa-box-open text-2xl"></i>
      </div>
      <h4 className="text-gray-500 text-xs font-black uppercase tracking-widest">Đơn hàng</h4>
      <p className="text-3xl font-black text-gray-900 mt-1">12</p>
    </div>

    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        <i className="fas fa-heart text-2xl"></i>
      </div>
      <h4 className="text-gray-500 text-xs font-black uppercase tracking-widest">Yêu thích</h4>
      <p className="text-3xl font-black text-gray-900 mt-1">24</p>
    </div>

    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        <i className="fas fa-coins text-2xl"></i>
      </div>
      <h4 className="text-gray-500 text-xs font-black uppercase tracking-widest">Xu tích lũy</h4>
      <p className="text-3xl font-black text-gray-900 mt-1">1.5k</p>
    </div>

    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        <i className="fas fa-map-marked-alt text-2xl"></i>
      </div>
      <h4 className="text-gray-500 text-xs font-black uppercase tracking-widest">Địa chỉ</h4>
      <p className="text-3xl font-black text-gray-900 mt-1">03</p>
    </div>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black text-gray-900 tracking-tight">Đơn hàng mới nhất</h3>
        <button className="text-teal-600 font-bold text-sm hover:bg-teal-50 px-4 py-2 rounded-xl transition-colors">
          Xem tất cả
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-5 p-5 rounded-3xl bg-gray-50/50 hover:bg-white hover:shadow-lg hover:shadow-gray-100 transition-all border border-transparent hover:border-gray-100">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-50 font-black text-teal-600 italic">
            #502
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">Giày Sneaker Thời Trang</h4>
            <p className="text-sm text-gray-500">Hôm nay, 10:30 AM • <span className="text-amber-500 font-bold">Chờ xác nhận</span></p>
          </div>
          <div className="text-right font-black text-gray-900">
            1.200.000đ
          </div>
        </div>

        <div className="flex items-center gap-5 p-5 rounded-3xl bg-gray-50/50 hover:bg-white hover:shadow-lg hover:shadow-gray-100 transition-all border border-transparent hover:border-gray-100">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-50 font-black text-teal-600 italic">
            #498
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">Áo Hoodie Unisex</h4>
            <p className="text-sm text-gray-500">Hôm qua, 02:15 PM • <span className="text-teal-500 font-bold">Hoàn thành</span></p>
          </div>
          <div className="text-right font-black text-gray-900">
            450.000đ
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
      <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8 text-center">Tiện ích nhanh</h3>
      <div className="grid grid-cols-1 gap-4 text-center">
        <button className="w-full bg-teal-50 text-teal-700 p-5 rounded-3xl font-bold hover:bg-teal-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-3">
          <i className="fas fa-user-edit"></i> Chỉnh sửa hồ sơ
        </button>
        <button className="w-full bg-indigo-50 text-indigo-700 p-5 rounded-3xl font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-3">
          <i className="fas fa-shield-alt"></i> Bảo mật tài khoản
        </button>
        <button className="w-full bg-orange-50 text-orange-700 p-5 rounded-3xl font-bold hover:bg-orange-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-3">
          <i className="fas fa-headset"></i> Trung tâm trợ giúp
        </button>
      </div>
    </div>

  </div>
</div>
    )
};
export default TongQuan;