import { useModalContext } from "../../../../../CONTEXT/QuanLiModal";

function ChinhSuaEmailVaSdt({ DuLieu }) {
  const { OpenMoDal } = useModalContext();

  return (
    <div className="w-full bg-white rounded-3xl p-6">
      {/* Header icon đại diện cho thông tin liên hệ */}
      <div className="flex flex-col items-center mb-8 pt-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-emerald-100 rounded-full scale-110 opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
          <div className="relative w-24 h-24 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-white shadow-xl">
            <i className="fa-solid fa-address-card text-3xl"></i>
          </div>
        </div>
        <span className="mt-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Thông tin liên hệ
        </span>
      </div>

      <div className="space-y-3">
        {/* Chỉnh sửa Email */}
        <button
          onClick={() =>
            OpenMoDal(
              { DuLieu: DuLieu?.email },
              { TenTrang: "ChinhSuaEmail", url: "/NguoiDung/ChinhSuaEmailNguoiDung" }
            )
          }
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-emerald-50 border border-gray-100 rounded-2xl transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-white shadow-sm text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <i className="fa-solid fa-envelope text-lg"></i>
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-tight">
                Địa chỉ Email
              </span>
              <span className="text-[15px] font-bold text-gray-700">
                {DuLieu?.email || "Chưa cập nhật"}
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <i className="fa-solid fa-chevron-right text-gray-300"></i>
          </div>
        </button>

        {/* Chỉnh sửa Số điện thoại */}
        <button
          onClick={() =>
            OpenMoDal(
              { DuLieu: DuLieu?.sdt || DuLieu?.phone },
              { TenTrang: "ChinhSuaSdt", url: "/NguoiDung/ChinhSuaSdtNguoiDung" }
            )
          }
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-2xl transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-white shadow-sm text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <i className="fa-solid fa-phone text-lg"></i>
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-tight">
                Số điện thoại
              </span>
              <span className="text-[15px] font-bold text-gray-700">
                {DuLieu?.sdt || DuLieu?.phone || "Chưa cập nhật"}
              </span>
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

export default ChinhSuaEmailVaSdt;
