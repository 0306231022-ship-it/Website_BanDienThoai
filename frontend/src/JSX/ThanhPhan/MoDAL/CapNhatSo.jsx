import React, { useState } from 'react';
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';
import { useAppContext } from '../../../CONTEXT/TrangChuAdmin';

function ChinhSuaSo({ DuLieu, url }) {
  const { GetTTwebsite } = useAppContext();
  
  // Ánh xạ dữ liệu đầu vào
  const stkCu = DuLieu?.DuLieu;
  const id = DuLieu?.id;

  const [soTaiKhoan, setSoTaiKhoan] = useState('');
  const [err, setErr] = useState('');
  const [errValidate, seterr] = useState({});
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);

  // Hàm xử lý chỉ cho phép nhập số
  const handleChangeInput = (e) => {
    const value = e.target.value;
    // Regex: Chỉ cho phép nhập số
    if (!value || /^[0-9]+$/.test(value)) {
        setSoTaiKhoan(value);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setErr('');
    setOk('');
    seterr({});

    // 1. Validate cơ bản
    if (soTaiKhoan === stkCu) {
      setErr('Bạn chưa thay đổi nội dung cần cập nhật!');
      setLoading(false);
      return;
    }

    if (!soTaiKhoan || !soTaiKhoan.trim()) {
      setErr('Vui lòng nhập số tài khoản!');
      setLoading(false);
      return;
    }

    if (!url) {
      setErr('Vui lòng kiểm tra lại hệ thống (URL)!');
      setLoading(false);
      return;
    }

    if (soTaiKhoan.length < 8 || soTaiKhoan.length > 20) {
      setErr('Số tài khoản thường có độ dài từ 8 đến 20 ký tự!');
      setLoading(false);
      return;
    }

    try {
      // 2. Gọi API
      // Lưu ý: Key gửi lên là 'SoTaiKhoan' (hoặc tên field tương ứng trong DB của bạn)
      const FormData = fun.objectToFormData({ So: soTaiKhoan, id: id || null });
      const ketqua = await API.CallAPI(FormData, { PhuongThuc: 1, url: url });

      // 3. Xử lý phản hồi
      if (ketqua.Status) {
        setErr(ketqua.message);
        setLoading(false);
        return;
      }

      if (ketqua.Validate) {
        const errorsFromServer = {};
        ketqua.errors.forEach(Err => {
          errorsFromServer[Err.path] = Err.msg;
        });
        seterr(errorsFromServer);
        setLoading(false);
        return;
      }

      if (ketqua.ThanhCong) {
        setLoading(false);
        setOk(ketqua.message);
        GetTTwebsite(); // Cập nhật lại context
        return;
      }

    } catch (error) {
      setErr("Đã xảy ra lỗi ngoài ý muốn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white animate-fadeIn">
      <div className="p-8">
        <div className="space-y-6">
          
          <div className="space-y-2">
            {/* LABEL & OLD DATA */}
            <div className="flex justify-between items-end px-1">
              <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">
                Số tài khoản ngân hàng
              </label>
              <span className="text-[11px] text-blue-500 font-medium italic font-mono">
                Dữ liệu cũ: {stkCu}
              </span>
            </div>

            {/* INPUT FIELD */}
            <div className="relative group">
              <input
                type="text"
                inputMode="numeric"
                value={soTaiKhoan}
                onChange={handleChangeInput}
                disabled={loading}
                className={`w-full px-5 py-4 rounded-2xl outline-none transition-all font-medium font-mono text-lg shadow-sm
                  ${(err || errValidate.SoTaiKhoan) ? "bg-red-50 border-2 border-red-500 text-red-900" 
                        : "bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white text-gray-800"}
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                placeholder="Nhập số tài khoản mới..."
              />
              
              {/* Button Clear Input */}
              {soTaiKhoan && !loading && (
                <button
                  onClick={() => setSoTaiKhoan('')}
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 transition-all active:scale-90"
                >
                  <i className="fa-solid fa-circle-xmark text-lg"></i>
                </button>
              )}
            </div>

            {/* STATUS MESSAGES */}
            <div className="min-h-[20px] px-1">
              {errValidate.SoTaiKhoan ? (
                 <div className="flex items-center gap-2 animate-shake">
                    <i className="fa-solid fa-triangle-exclamation text-red-500 text-xs"></i>
                    <p className="text-[12px] text-red-600 font-bold">{errValidate.SoTaiKhoan}</p>
                 </div>
              ) : err ? (
                <div className="flex items-center gap-2 animate-shake">
                  <i className="fa-solid fa-triangle-exclamation text-red-500 text-xs"></i>
                  <p className="text-[12px] text-red-600 font-bold">{err}</p>
                </div>
              ) : ok ? (
                <div className="flex items-center gap-2 animate-fadeIn">
                  <i className="fa-solid fa-circle-check text-green-500 text-xs"></i>
                  <p className="text-[12px] text-green-600 font-bold">{ok}</p>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <i className="fa-solid fa-circle-info text-blue-400 mt-1 text-[10px]"></i>
                  <p className="text-[12px] text-gray-400 leading-relaxed">
                    STK mới nhập là: <strong className="text-gray-600 font-mono">"{soTaiKhoan}"</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4">
            <button
              onClick={handleUpdate}
              className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.97] flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100`}
            >
              {loading ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                <i className="fa-solid fa-floppy-disk"></i>
              )}
              {loading ? "Đang xử lý..." : "Lưu thay đổi"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ChinhSuaSo;