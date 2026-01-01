import React from 'react';

function ThongTinHeThong({ DuLieu }) {
  const defaultData = {
    Ten: "Samsung Electronics",
    Ma: "SS-VINA-001",
    GhiChu: "Đối tác chiến lược cung cấp thiết bị di động chính hãng.",
    LoGo: "", 
    ...DuLieu 
  };
  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "N";
  };

  // Hàm xử lý hiển thị: Trả về thẻ IMG hoặc thẻ DIV (chữ cái)
  const renderLogoContent = () => {
    // 1. Nếu CÓ Logo -> Render ảnh
    if (defaultData.LoGo) {
      const imgUrl = defaultData.LoGo.includes("http") ? defaultData.LoGo : `http://localhost:3001/${defaultData.LoGo}`;
      return (
        <img 
          src={imgUrl} 
          alt="Logo" 
          className="w-full h-full object-cover rounded-2xl" 
        />
      );
    }
    
    // 2. Nếu KHÔNG CÓ Logo -> Render chữ cái đầu trên nền Gradient
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white">
        <span className="text-3xl font-bold">{getFirstLetter(defaultData.Ten)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white pb-4">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col items-center relative mb-4 pt-2">
        <div className="absolute top-0 h-24 w-full bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30 -z-10"></div>
        
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-white rounded-2xl shadow-lg scale-90 group-hover:scale-100 transition-transform duration-500"></div>
          
          {/* CONTAINER CHỨA LOGO HOẶC CHỮ CÁI */}
          {/* Giữ nguyên class kích thước và border ở đây để áp dụng chung cho cả 2 trường hợp */}
          <div className="relative w-20 h-20 rounded-2xl border-2 border-white shadow-xl group-hover:shadow-2xl transition-all duration-300 bg-slate-100">
             {renderLogoContent()}
          </div>

          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-3 py-0.5 rounded-full shadow-lg border-2 border-white whitespace-nowrap z-10">
            <span className="text-[10px] font-black tracking-widest uppercase">{defaultData.Ma || "NO CODE"}</span>
          </div>
        </div>

        <div className="mt-3 text-center">
            <h2 className="text-base font-bold text-slate-700">{defaultData.Ten}</h2>
            <p className="text-slate-400 text-xs font-medium mt-0.5">Chi tiết thông tin định danh</p>
        </div>
      </div>

      {/* --- BODY (Giữ nguyên phần dưới) --- */}
      <div className="space-y-2">
        
        {/* ITEM 1: TÊN */}
        <div className="w-[90%] mx-auto flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl transition-all group hover:bg-white hover:shadow-md hover:border-blue-100">
          <div className="flex items-center gap-3 w-full">
            <div className="w-9 h-9 bg-white shadow-sm text-blue-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all duration-300 shrink-0">
              <i className="fa-solid fa-signature text-base"></i>
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider">Tên hiển thị</span>
              <span className="block text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                {defaultData.Ten}
              </span>
            </div>
          </div>
        </div>

        {/* ITEM 2: MÃ */}
        <div className="w-[90%] mx-auto flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-xl group hover:bg-white hover:shadow-md hover:border-purple-100">
          <div className="flex items-center gap-3 w-full">
            <div className="w-9 h-9 bg-white shadow-sm text-purple-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-purple-500 group-hover:text-white group-hover:border-purple-500 transition-all duration-300 shrink-0">
              <i className="fa-solid fa-barcode text-base"></i>
            </div>
            <div className="text-left flex-1">
              <span className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider">Mã định danh</span>
              <span className="block text-sm font-bold text-slate-700 group-hover:text-purple-600 transition-colors">
                {defaultData.Ma}
              </span>
            </div>
            <button className="text-slate-300 hover:text-purple-500 transition-colors p-1">
               <i className="fa-regular fa-copy text-xs"></i>
            </button>
          </div>
        </div>

        {/* ITEM 3: GHI CHÚ */}
        <div className="w-[90%] mx-auto flex items-start p-2.5 bg-slate-50 border border-slate-100 rounded-xl transition-all group hover:bg-white hover:shadow-md hover:border-amber-100">
          <div className="flex gap-3 w-full">
            <div className="w-9 h-9 bg-white shadow-sm text-amber-500 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all duration-300 shrink-0">
              <i className="fa-solid fa-note-sticky text-base"></i>
            </div>
            <div className="text-left flex-1">
              <span className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider">Ghi chú</span>
              <p className="text-xs font-medium text-slate-600 group-hover:text-slate-800 transition-colors mt-0.5 leading-snug line-clamp-2">
                {defaultData.GhiChu || "Chưa có ghi chú nào."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ThongTinHeThong;