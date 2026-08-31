import React, { useState } from 'react';
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';

function ChinhSuaSoDienThoai({ DuLieu, url }) {
  const sdtCu = DuLieu?.DuLieu;
  const id = DuLieu?.id;
  const [sdt, setSdt] = useState('');
  const [err, setErr] = useState('');
  const [errValidate, setErrValidate] = useState({});
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    if (e) e.preventDefault();
    if (!sdt.trim()) return;

    setLoading(true);
    setErr('');
    setOk('');
    setErrValidate({});

    try {
      const DuLieuGui = fun.objectToFormData({
        Sdt: sdt,
        id: id || null,
      });

      const ketqua = await API.CallAPI(DuLieuGui, {
        PhuongThuc: 1,
        url: url,
      });

      if (ketqua.Validate) {
        const errorsFromServer = {};
        ketqua.errors.forEach((Err) => {
          errorsFromServer[Err.path] = Err.msg;
        });
        setErrValidate(errorsFromServer);
        return;
      }

      if (!ketqua.ThanhCong) {
        setErr(ketqua.message);
        return;
      }

      if (ketqua.ThanhCong) {
        setOk(ketqua.message || 'Cập nhật số điện thoại thành công!');
        setSdt(''); // Reset ô nhập sau khi cập nhật thành công
      }
    } catch (error) {
      setErr('Đã xảy ra lỗi ngoài ý muốn, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const errorMessage = errValidate.Sdt || errValidate.sdt || err;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6 transition-all">
      <form onSubmit={handleUpdate} className="space-y-5">
        {/* HEADER & THÔNG TIN SĐT CŨ */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
              Số điện thoại
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Sử dụng để nhận hàng và liên hệ</p>
          </div>
          {sdtCu && (
            <span className="text-[11px] bg-blue-50 text-blue-600 font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              Hiện tại: {sdtCu}
            </span>
          )}
        </div>

        {/* INPUT SỐ ĐIỆN THOẠI MỚI */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 block">
            Số điện thoại mới <span className="text-red-500">*</span>
          </label>
          
          <div className="relative flex items-center">
            {/* Icon điện thoại bên trái */}
            <span className="absolute left-4 text-gray-400 pointer-events-none">
              <i className="fa-solid fa-phone text-sm"></i>
            </span>

            <input
              type="tel"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
              disabled={loading}
              placeholder="Nhập số điện thoại mới..."
              className={`w-full pl-11 pr-10 py-3 rounded-xl text-sm font-medium transition-all outline-none border ${
                errorMessage
                  ? 'bg-red-50/50 border-red-400 text-red-900 focus:ring-2 focus:ring-red-200'
                  : 'bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800'
              } ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            />

            {/* Nút Xóa nhanh văn bản bên phải */}
            {sdt && !loading && (
              <button
                type="button"
                onClick={() => setSdt('')}
                className="absolute right-3 text-gray-400 hover:text-gray-600 p-1 transition-colors"
                title="Xóa nội dung"
              >
                <i className="fa-solid fa-circle-xmark text-sm"></i>
              </button>
            )}
          </div>
        </div>

        {/* THÔNG BÁO TRẠNG THÁI (LỖI / THÀNH CÔNG / HƯỚNG DẪN) */}
        <div className="min-h-[24px]">
          {errorMessage ? (
            <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-2.5 rounded-lg border border-red-100 animate-shake">
              <i className="fa-solid fa-triangle-exclamation text-sm shrink-0"></i>
              <span className="font-medium">{errorMessage}</span>
            </div>
          ) : ok ? (
            <div className="flex items-center gap-2 text-emerald-600 text-xs bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 animate-fadeIn">
              <i className="fa-solid fa-circle-check text-sm shrink-0"></i>
              <span className="font-medium">{ok}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <i className="fa-solid fa-circle-info text-blue-400 shrink-0"></i>
              <span>Định dạng 10 chữ số (VD: 0912345678).</span>
            </div>
          )}
        </div>

        {/* NÚT LƯU TẢI DỮ LIỆU */}
        <button
          type="submit"
          disabled={loading || !sdt.trim()}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
            loading || !sdt.trim()
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-blue-100'
          }`}
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner animate-spin text-sm"></i>
              <span>Đang lưu...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-floppy-disk text-xs"></i>
              <span>Cập nhật số điện thoại</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ChinhSuaSoDienThoai;