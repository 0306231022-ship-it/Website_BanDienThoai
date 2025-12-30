import React from 'react';

const CompanyInfoCard = ({ data }) => {
  // Kiểm tra dữ liệu đầu vào để tránh lỗi crash nếu data bị null
  if (!data) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
      
      {/* --- HEADER: Gradient & Mã Vạch --- */}
      <div className="relative h-20 shrink-0 bg-gradient-to-r from-blue-600 to-blue-500">
        <div className="absolute left-6 -bottom-8">
          <div className="p-1 bg-white rounded-full shadow-md h-16 w-16">
            <div className="flex items-center justify-center w-full h-full text-lg font-bold text-white bg-orange-500 rounded-full">
              {data.MAVACH}
            </div>
          </div>
        </div>
      </div>

      {/* --- BODY: Thông tin chi tiết --- */}
      <div className="flex-1 px-6 pt-10 pb-4">
        {/* Tên & MST */}
        <h2 className="text-lg font-bold text-slate-800">
          {data.TENNCC}
        </h2>
        <p className="mb-4 font-mono text-sm text-slate-500">
          Mã số thuế: {data.MST}
        </p>

        {/* Thông tin liên hệ (Đã format lại cho đẹp) */}
        <div className="pt-4 space-y-4">
          
          {/* Người liên hệ */}
          <div className="flex items-start space-x-3">
            <div className="mt-1 text-blue-600 shrink-0">
              <i className="fa fa-user fa-lg"></i>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                Liên hệ
              </h3>
              <p className="font-medium text-gray-900">
                {data.LIENHE_DOITAC}
              </p>
              <a 
                href={`tel:${data.SDT}`} 
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {data.SDT}
              </a>
              <br/>
                    <a 
                href={`tel:${data.EMAIL}`} 
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {data.EMAIL}
              </a>
            </div>
          </div>

          {/* Đường kẻ phân cách */}
          <div className="border-t border-gray-100"></div>

          {/* Địa chỉ */}
          <div className="flex items-start space-x-3">
            <div className="mt-1 text-red-500 shrink-0">
              <i className="fa fa-location-dot fa-lg"></i>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                Địa chỉ
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                {data.DIACHI}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER: Action Buttons --- */}
      <div className="grid grid-cols-2 gap-3 px-6 py-4 mt-auto border-t bg-slate-50 border-slate-100">
        <a 
          href={`tel:${data.SDT}`} 
          className="flex items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors bg-white border rounded-lg text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600"
        >
          <i className="fa-solid fa-phone"></i> Gọi
        </a>
        
        {/* Lưu ý: Nếu data có trường email thì thay 'sale@fpt.com' bằng {data.EMAIL} */}
        <a 
          href={`mailto:${data.EMAIL || 'sale@fpt.com'}`} 
          className="flex items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors bg-white border rounded-lg text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600"
        >
          <i className="fa-solid fa-envelope"></i> Email
        </a>
      </div>

    </div>
  );
};

export default CompanyInfoCard;