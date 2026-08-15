import React, { useState } from 'react';
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';
import * as ThongBao from '../../../JS/FUNCTONS/ThongBao';

function ChinhSuaSoDienThoai({ DuLieu, url }) {
  const sdtCu = DuLieu?.DuLieu;
  const id = DuLieu?.id;

  const [sdt, setSdt] = useState('');
  const [otpValue, setOtpValue] = useState(''); // State lưu mã OTP người dùng nhập
  const [err, setErr] = useState('');
  const [errValidate, setErrValidate] = useState({});
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setotp] = useState(false); // Trạng thái đã gửi OTP thành công

  // Hàm kiểm tra định dạng số điện thoại Việt Nam (10 chữ số, bắt đầu bằng các đầu số phổ biến)
  const validatePhoneFormat = (value) => {
    return /(0[3|5|7|8|9])+([0-9]{8})\b/.test(value.trim());
  };

  // Hàm hủy/thay đổi lại số điện thoại nếu nhập sai
  const handleResetSdt = async () => {
    try {
      const huyotp = await API.CallAPI(
        fun.objectToFormData({ sdt: sdt }),
        { url: '/NguoiDung/huy_otp', PhuongThuc: 1 }
      );
      if (!huyotp.ThanhCong) {
        ThongBao.ThongBao_Loi(huyotp.message);
        return;
      }
      setotp(false);
      setOtpValue('');
      setErr('');
      setOk('');
    } catch (error) {
      console.error('Đã có lỗi xảy ra:' + error);
      ThongBao.ThongBao_CanhBao('Lỗi kết nối hệ thống, Vui lòng thử lại sau.');
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setErr('');
    setOk('');
    setErrValidate({});

    // === BƯỚC 1: GỬI MÃ OTP (NẾU CHƯA GỬI OTP) ===
    if (!otp) {
      if (sdt === sdtCu) {
        setErr('Bạn chưa thay đổi số điện thoại cần cập nhật!');
        setLoading(false);
        return;
      }

      if (!sdt || !sdt.trim()) {
        setErr('Vui lòng nhập số điện thoại!');
        setLoading(false);
        return;
      }

      if (!validatePhoneFormat(sdt)) {
        setErr('Số điện thoại không đúng định dạng (Ví dụ: 0912345678)!');
        setLoading(false);
        return;
      }

      if (!url) {
        setErr('Vui lòng kiểm tra lại hệ thống!');
        setLoading(false);
        return;
      }

      try {
        // Đổi API URL sang xác thực SĐT
        const XacThuc = await API.CallAPI(
          fun.objectToFormData({ sdt: sdt }),
          { url: '/NguoiDung/XacThuc_sdt', PhuongThuc: 1 }
        );

        if (XacThuc.ThanhCong) {
          setotp(true);
          setOk('Mã OTP đã được gửi đến email đã đăng ký. Vui lòng kiểm tra!');
        } else {
          setErr(XacThuc.message || 'Không thể gửi mã xác thực!');
        }
      } catch (error) {
        setErr('Đã xảy ra lỗi khi gửi mã OTP');
      } finally {
        setLoading(false);
      }
      return;
    }

    // === BƯỚC 2: XÁC NHẬN OTP VÀ CẬP NHẬT SỐ ĐIỆN THOẠI ===
    if (!otpValue || !otpValue.trim()) {
      setErr('Vui lòng nhập mã OTP!');
      setLoading(false);
      return;
    }

    try {
      const DuLieuGui = fun.objectToFormData({
        Sdt: sdt,
        id: id || null,
        Otp: otpValue
      });

      const ketqua = await API.CallAPI(DuLieuGui, {
        PhuongThuc: 1,
        url: url
      });

      if (!ketqua.ThanhCong) {
        setErr(ketqua.message);
        setLoading(false);
        return;
      }

      if (ketqua.Validate) {
        const errorsFromServer = {};
        ketqua.errors.forEach((Err) => {
          errorsFromServer[Err.path] = Err.msg;
        });
        setErrValidate(errorsFromServer);
        setLoading(false);
        return;
      }

      if (ketqua.ThanhCong) {
        setOk(ketqua.message || 'Cập nhật số điện thoại thành công!');
      }
    } catch (error) {
      setErr('Đã xảy ra lỗi ngoài ý muốn');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white animate-fadeIn">
      <div className="p-8">
        <div className="space-y-6">
          {/* INPUT SỐ ĐIỆN THOẠI */}
          <div className="space-y-2">
            <div className="flex justify-between items-end px-1">
              <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">
                Số điện thoại hiển thị
              </label>
              <span className="text-[11px] text-blue-500 font-medium italic">
                SĐT cũ: {sdtCu}
              </span>
            </div>

            <div className="relative group">
              <input
                type="tel"
                value={sdt}
                onChange={(e) => setSdt(e.target.value)}
                disabled={loading || otp}
                className={`w-full px-5 py-4 rounded-2xl outline-none transition-all font-medium text-lg shadow-sm
                  ${
                    err || errValidate.Sdt || errValidate.sdt
                      ? 'bg-red-50 border-2 border-red-500 text-red-900'
                      : 'bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white text-gray-800'
                  }
                  ${loading || otp ? 'opacity-60 cursor-not-allowed bg-gray-100' : ''}
                `}
                placeholder="Nhập số điện thoại mới..."
              />

              {sdt && !loading && !otp && (
                <button
                  onClick={() => setSdt('')}
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 transition-all active:scale-90"
                >
                  <i className="fa-solid fa-circle-xmark text-lg"></i>
                </button>
              )}

              {/* Icon Khóa khi đang ở bước OTP */}
              {otp && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <i className="fa-solid fa-lock text-gray-400"></i>
                  <button
                    onClick={handleResetSdt}
                    type="button"
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Sửa
                  </button>
                </div>
              )}
            </div>

            {errValidate.Otp && (
              <div className="flex items-center gap-2 animate-shake">
                <i className="fa-solid fa-triangle-exclamation text-red-500 text-xs"></i>
                <p className="text-[12px] text-red-600 font-bold">
                  {errValidate.Otp}
                </p>
              </div>
            )}
          </div>

          {/* INPUT MÃ OTP (CHỈ HIỂN THỊ KHI OTP = TRUE) */}
          {otp && (
            <div className="space-y-2 animate-fadeIn">
              <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider px-1">
                Mã xác thực OTP
              </label>
              <input
                type="text"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                disabled={loading}
                maxLength={6}
                className="w-full px-5 py-4 rounded-2xl outline-none transition-all font-bold text-xl tracking-widest text-center bg-blue-50 border-2 border-blue-300 focus:border-blue-600 focus:bg-white text-blue-900 shadow-sm"
                placeholder="Nhập mã OTP..."
              />
            </div>
          )}

          {/* THÔNG BÁO LỖI / THÀNH CÔNG */}
          <div className="min-h-[20px] px-1">
            {errValidate.Sdt || errValidate.sdt ? (
              <div className="flex items-center gap-2 animate-shake">
                <i className="fa-solid fa-triangle-exclamation text-red-500 text-xs"></i>
                <p className="text-[12px] text-red-600 font-bold">
                  {errValidate.Sdt || errValidate.sdt}
                </p>
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
                  Số điện thoại hiện tại là <strong className="text-gray-600">"{sdt || sdtCu}"</strong>.
                </p>
              </div>
            )}
          </div>

          {/* NÚT BẤM */}
          <div className="pt-2">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.97] flex items-center justify-center gap-3 text-white shadow-blue-100 ${
                otp
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : otp ? (
                <i className="fa-solid fa-shield-check"></i>
              ) : (
                <i className="fa-solid fa-paper-plane"></i>
              )}
              {loading
                ? 'Đang xử lý...'
                : otp
                ? 'Xác nhận OTP & Cập nhật'
                : 'Gửi mã xác thực OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChinhSuaSoDienThoai;