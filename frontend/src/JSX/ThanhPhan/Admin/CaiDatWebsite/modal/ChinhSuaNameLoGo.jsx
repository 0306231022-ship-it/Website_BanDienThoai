import { useState } from "react";
import { useModalContext } from '../../../../../CONTEXT/QuanLiModal';
function ChinhSuaImgaeVaTen() {
  const [view, setView] = useState("list");
  const {CapNhatTieuDe , modalState } = useModalContext();
  return (
    <div className="relative overflow-hidden">
      <div className={`transition-transform duration-300 ease-in-out
          ${view === "list" ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col items-center pt-10 pb-6 px-6">
          <img
            src={`http://localhost:3001${modalState.DuLieu.LoGo}`}
            alt="Logo"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-3"
          />
          <h2 className="text-lg font-semibold text-gray-900">
            {modalState.DuLieu.TenWebsite}
          </h2>
        </div>

        <div className="px-4 pb-6">
          <div className="border rounded-2xl overflow-hidden divide-y">

            <button
              onClick={() => {
                setView("name");
                CapNhatTieuDe({ isTieuDe: false , TieuDe : '' });
}}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50"
            >
              <span className="font-medium">Tên website</span>
              <i className="fa-solid fa-chevron-right text-gray-400"></i>
            </button>

            <button
              onClick={() => setView("username")}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-gray-50"
            >
              <span className="font-medium">Logo website</span>
              <i className="fa-solid fa-chevron-right text-gray-400"></i>
            </button>

          </div>
        </div>
      </div>

      {/* ===== VIEW EDIT NAME ===== */}
      <div
        className={`absolute top-0 left-0 w-full transition-transform duration-300
          ${view === "name" ? "translate-x-0" : "translate-x-full"}`}
      >
        <Header title="Chỉnh sửa tên" onBack={() => setView("list")} />

        <FormInput
          label="Tên"
          defaultValue={DuLieu.TenWebsite}
          onSave={() => setView("list")}
        />
      </div>

      {/* ===== VIEW EDIT USERNAME ===== */}
      <div
        className={`absolute top-0 left-0 w-full transition-transform duration-300
          ${view === "username" ? "translate-x-0" : "translate-x-full"}`}
      >
        <Header title="Chỉnh sửa tên người dùng" onBack={() => setView("list")} />

        <FormInput
          label="Tên người dùng"
          defaultValue="nguyenvana"
          onSave={() => setView("list")}
        />
      </div>

    </div>
  );
}

/* ===== COMPONENT PHỤ ===== */

const Header = ({ title, onBack }) => (
  <div className="flex items-center gap-3 px-4 py-4 border-b">
    <button onClick={onBack} className="text-xl">
      ←
    </button>
    <h3 className="font-semibold">{title}</h3>
  </div>
);

const FormInput = ({ label, defaultValue, onSave }) => (
  <div className="p-4">
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input
      defaultValue={defaultValue}
      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      onClick={onSave}
      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
    >
      Lưu
    </button>
  </div>
);

export default ChinhSuaImgaeVaTen;

