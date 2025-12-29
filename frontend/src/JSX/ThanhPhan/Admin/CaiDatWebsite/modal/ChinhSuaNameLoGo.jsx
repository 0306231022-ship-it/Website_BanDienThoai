import { useModalContext } from "../../../../../CONTEXT/QuanLiModal";
function ChinhSuaImgaeVaTen() {
  const { modalState, ChinhSuaModel } = useModalContext();
  return (
    <div className="w-full bg-white rounded-3xl p-6">
      <div className="flex flex-col items-center mb-10 pt-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-100 rounded-full scale-110 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
          <img src={`http://localhost:3001/${modalState.DuLieu.LoGo}`} alt="Logo" className="relative w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl" />
        </div>
        <h2 className="mt-4 text-xl font-black text-gray-800 tracking-tight">Thiết lập nhận diện</h2>
        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1">Website Identity</p>
      </div>
      <div className="space-y-3">
        <button onClick={() => ChinhSuaModel('SuaTen', '/admin/ChinhSuaTen')} className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-2xl transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-white shadow-sm text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <i className="fa-solid fa-font text-lg"></i>
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-tight">Tên website</span>
              <span className="text-[15px] font-bold text-gray-700">{modalState.DuLieu.TenWebsite}</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <i className="fa-solid fa-chevron-right text-gray-300"></i>
          </div>
        </button>
        <button onClick={() => ChinhSuaModel('SuaAnh', '/admin/ChinhLoGo')}
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-purple-50 border border-gray-100 rounded-2xl transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-white shadow-sm text-purple-600 rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <i className="fa-solid fa-image text-lg"></i>
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-tight">Logo thương hiệu</span>
              <span className="text-[15px] font-bold text-gray-700">Thay đổi hình ảnh</span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <i className="fa-solid fa-chevron-right text-gray-300"></i>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ChinhSuaImgaeVaTen;
