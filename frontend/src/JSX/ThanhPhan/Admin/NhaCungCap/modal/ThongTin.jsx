import { useModalContext } from "../../../../../CONTEXT/QuanLiModal";

function ThongTinChung({ DuLieu }) {
  const { OpenMoDal } = useModalContext();

  const mockData = {
    DuLieu: DuLieu.DuLieu,
    MaVietTat: DuLieu.DuLieu.MAVACH,
    ...DuLieu, 
  };

  return (
    <div className="w-full bg-white">
      
      
      <div className="flex flex-col items-center mb-8 pt-2 relative">
        {/* Background trang trí mờ phía sau */}
        <div className="absolute top-0 w-32 h-32 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30 -z-10"></div>
        
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-white rounded-2xl shadow-lg scale-90 group-hover:scale-100 transition-transform duration-500"></div>
    
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-1 rounded-full shadow-lg border-2 border-white whitespace-nowrap z-10">
            <span className="text-xs font-black tracking-widest uppercase">{mockData.MaVietTat}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
            <h2 className="text-lg font-bold text-slate-700">{DuLieu.DuLieu.TENNCC}</h2>
            <p className="text-slate-400 text-xs font-medium mt-1">Quản lý thông tin định danh</p>
        </div>
      </div>


      <div className="space-y-3">
        
        {/* BUTTON 1: THÔNG TIN CHUNG */}
        <button 
          onClick={() => OpenMoDal(
            {
              DuLieu : DuLieu.DuLieu.TENNCC , 
              id: DuLieu.DuLieu.IDNCC , 
              ma: DuLieu.DuLieu.MAVACH ,
              ghichu : DuLieu.DuLieu.GHICHU
            }, { TenTrang: 'ThongTinHeThong' })} 
          className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-white hover:shadow-md border border-slate-100 hover:border-blue-100 rounded-2xl transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white shadow-sm text-blue-500 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300">
              <i className="fa-solid fa-circle-info text-xl"></i>
            </div>
            <div className="text-left">
              <span className="block text-[15px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors">Thông tin chung</span>
              <span className="text-xs font-medium text-slate-400">Tên, mô tả, mã định danh</span>
            </div>
          </div>
          <div className="w-8 h-8 flex items-center justify-center text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </button>
        <button 
          onClick={() => OpenMoDal({
            nguoidaidien: DuLieu.DuLieu.LIENHE_DOITAC,
            sdt:DuLieu.DuLieu.SDT,
            email:DuLieu.DuLieu.EMAIL,
            diachi:DuLieu.DuLieu.DIACHI,
            id:DuLieu.DuLieu.IDNCC

          }, { 
            TenTrang: 'ThongTinLienHe'})} 
          className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-white hover:shadow-md border border-slate-100 hover:border-teal-100 rounded-2xl transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white shadow-sm text-teal-500 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 transition-all duration-300">
              <i className="fa-solid fa-address-book text-xl"></i>
            </div>
            <div className="text-left">
              <span className="block text-[15px] font-bold text-slate-700 group-hover:text-teal-600 transition-colors">Thông tin liên hệ</span>
              <span className="text-xs font-medium text-slate-400">Địa chỉ, hotline, email</span>
            </div>
          </div>
          <div className="w-8 h-8 flex items-center justify-center text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </button>

        {/* BUTTON 3: TÀI CHÍNH VÀ THUẾ */}
        <button 
          onClick={() => OpenMoDal({tennganhang:DuLieu.DuLieu.TEN_NGANHANG , sotaikhoan:DuLieu.DuLieu.STK_NGANHANG , chutaikhoan: DuLieu.DuLieu.LIENHE_DOITAC , id: DuLieu.DuLieu.IDNCC }, { TenTrang: 'ThongTinTaiChinh' })} 
          className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-white hover:shadow-md border border-slate-100 hover:border-rose-100 rounded-2xl transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white shadow-sm text-rose-500 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-rose-500 group-hover:text-white group-hover:border-rose-500 transition-all duration-300">
              <i className="fa-solid fa-landmark text-xl"></i>
            </div>
            <div className="text-left">
              <span className="block text-[15px] font-bold text-slate-700 group-hover:text-rose-600 transition-colors">Tài chính & Thuế</span>
              <span className="text-xs font-medium text-slate-400">MST, ngân hàng, hóa đơn</span>
            </div>
          </div>
          <div className="w-8 h-8 flex items-center justify-center text-slate-300 group-hover:text-rose-500 group-hover:translate-x-1 transition-all">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </button>

      </div>
    </div>
  );
}

export default ThongTinChung;