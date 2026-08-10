import React, { useState } from 'react';
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';

function ChinhSuaEmail({ DuLieu, url }) {
  const emailCu = DuLieu?.DuLieu;
  const id = DuLieu?.id;

  const [email, setEmail] = useState('');
  const [otpValue, setOtpValue] = useState(''); // Thêm state lưu mã OTP người dùng nhập
  const [err, setErr] = useState('');
  const [errValidate, setErrValidate] = useState({});
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setotp] = useState(false); // Trạng thái đã gửi OTP thành công

  const validateEmailFormat = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // Hàm hủy/thay đổi lại email nếu nhập sai
  const handleResetEmail = async() => {
    try {
      const huyotp = await API.CallAPI(fun.objectToFormData({email:email}),{url:'/NguoiDung/huy_otp'})
    } catch (error) {
      
    }
    setotp(false);
    setOtpValue('');
    setErr('');
    setOk('');
  };

  const handleUpdate = async () => {
    setLoading(true);
    setErr('');
    setOk('');
    setErrValidate({});

    // === BƯỚC 1: GỬI MÃ OTP (NẾU CHƯA GỬI OTP) ===
    if (!otp) {
      if (email === emailCu) {
        setErr('Bạn chưa thay đổi email cần cập nhật!');
        setLoading(false);
        return;
      }

      if (!email || !email.trim()) {
        setErr('Vui lòng nhập email!');
        setLoading(false);
        return;
      }

      if (!validateEmailFormat(email)) {
        setErr('Email không đúng định dạng!');
        setLoading(false);
        return;
      }

      if (!url) {
        setErr('Vui lòng kiểm tra lại hệ thống!');
        setLoading(false);
        return;
      }

      if (email.length > 255) {
        setErr('Email không được vượt quá 255 ký tự!');
        setLoading(false);
        return;
      }

      try {
        const XacThuc = await API.CallAPI(
          fun.objectToFormData({ email: email }),
          { url: '/NguoiDung/XacThuc_email', PhuongThuc: 1 }
        );

        if (XacThuc.ThanhCong) {
          setotp(true);
          setOk('Mã OTP đã được gửi đến email mới. Vui lòng kiểm tra!');
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

    // === BƯỚC 2: XÁC NHẬN OTP VÀ CẬP NHẬT EMAIL ===
    if (!otpValue || !otpValue.trim()) {
      setErr('Vui lòng nhập mã OTP!');
      setLoading(false);
      return;
    }

    try {
      const DuLieuGui = fun.objectToFormData({
        Email: email,
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
        setOk(ketqua.message || 'Cập nhật email thành công!');
        // GetTTwebsite();
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
          {/* INPUT EMAIL */}
          <div className="space-y-2">
            <div className="flex justify-between items-end px-1">
              <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">
                Email hiển thị
              </label>
              <span className="text-[11px] text-blue-500 font-medium italic">
                Email cũ: {emailCu}
              </span>
            </div>

            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || otp}
                className={`w-full px-5 py-4 rounded-2xl outline-none transition-all font-medium text-lg shadow-sm
                  ${
                    err || errValidate.Email
                      ? 'bg-red-50 border-2 border-red-500 text-red-900'
                      : 'bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white text-gray-800'
                  }
                  ${loading || otp ? 'opacity-60 cursor-not-allowed bg-gray-100' : ''}
                `}
                placeholder="Nhập email mới..."
              />

            
              {email && !loading && !otp && (
                <button
                  onClick={() => setEmail('')}
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
                    onClick={handleResetEmail}
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
              </div>)}
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
            {errValidate.Email ? (
              <div className="flex items-center gap-2 animate-shake">
                <i className="fa-solid fa-triangle-exclamation text-red-500 text-xs"></i>
                <p className="text-[12px] text-red-600 font-bold">
                  {errValidate.Email}
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
                  Email hiện tại là <strong className="text-gray-600">"{email || emailCu}"</strong>.
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

export default ChinhSuaEmail;