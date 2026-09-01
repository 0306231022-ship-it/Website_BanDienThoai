import React, { useState, useEffect } from 'react';
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';

function QuenMatKhau({ DuLieu, urlSendOtp, urlResetPassword }) {
  // Bước 1: Nhập Email | Bước 2: Nhập OTP & Mật khẩu mới
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(DuLieu?.email || '');
  const [otp, setOtp] = useState('');
  const [matKhauMoi, setMatKhauMoi] = useState('');
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState('');

  // Trạng thái đếm ngược gửi lại OTP (60s)
  const [countdown, setCountdown] = useState(0);

  // Toggle ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState({ moi: false, xacNhan: false });

  const [err, setErr] = useState('');
  const [errValidate, setErrValidate] = useState({});
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);

  // Đếm ngược gửi lại OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // BƯỚC 1: GỬI MÃ OTP VỀ EMAIL
  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setErr('');
    setOk('');
    setErrValidate({});

    try {
      const DuLieuGui = fun.objectToFormData({ email: email, TrangThai: 1 });
      const ketqua = await API.CallAPI(DuLieuGui, {
        PhuongThuc: 1,
        url: urlSendOtp || '/NguoiDung/XacThuc_email',
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
        setErr(ketqua.message || 'Email không tồn tại trong hệ thống!');
        return;
      }

      setOk('Mã OTP đã được gửi đến Email của bạn!');
      setStep(2); // Chuyển sang bước nhập OTP & Mật khẩu mới
      setCountdown(60); // Bắt đầu đếm ngược 60 giây
    } catch (error) {
      setErr('Đã xảy ra lỗi khi gửi mã OTP. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  // BƯỚC 2: XÁC THỰC OTP VÀ ĐẶT LẠI MẬT KHẨU
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErr('');
    setOk('');
    setErrValidate({});

    if (matKhauMoi.length < 6) {
      setErr('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }

    if (matKhauMoi !== xacNhanMatKhau) {
      setErr('Mật khẩu xác nhận không trùng khớp!');
      return;
    }

    setLoading(true);

    try {
      const DuLieuGui = fun.objectToFormData({
        Email: email,
        Otp: otp,
        MatKhauMoi: matKhauMoi,
      });

      const ketqua = await API.CallAPI(DuLieuGui, {
        PhuongThuc: 1,
        url: '/NguoiDung/DatLaiMatKhau',
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
        setErr(ketqua.message || 'Mã OTP không đúng hoặc đã hết hạn!');
        return;
      }

      setOk('Khôi phục mật khẩu thành công! Bạn có thể đăng nhập ngay.');
    } catch (error) {
      setErr('Đã xảy ra lỗi ngoài ý muốn. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-sm p-6">
      {/* HEADER & THẮNG CẢNH BƯỚC (STEPPER) */}
      <div className="pb-4 mb-5 border-b border-gray-100">
        <div className="flex items-center gap-2 mt-2">
          <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
          <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
        </div>
      </div>

      {/* ==================== BƯỚC 1: NHẬP EMAIL ==================== */}
      {step === 1 && (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            Nhập địa chỉ Email đã đăng ký tài khoản. Chúng tôi sẽ gửi mã OTP gồm 6 chữ số để xác thực.
          </p>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 block">
              Địa chỉ Email <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-gray-400 pointer-events-none">
                <i className="fa-solid fa-envelope text-sm"></i>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="VD: nguyenvana@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium border bg-gray-50 border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-gray-800 transition-all outline-none"
              />
              {errValidate.email && (
                <div className="absolute right-3 text-red-500 text-xs font-medium">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <span className="ml-1">{errValidate.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* HIỂN THỊ LỖI */}
          {err && (
            <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-2.5 rounded-lg border border-red-100">
              <i className="fa-solid fa-triangle-exclamation text-sm shrink-0"></i>
              <span className="font-medium">{err}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email.trim()}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
              loading || !email.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white shadow-indigo-100'
            }`}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin text-sm"></i>
                <span>Đang gửi OTP...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane text-xs"></i>
                <span>Gửi mã xác thực OTP</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* ==================== BƯỚC 2: NHẬP OTP & ĐẶT MẬT KHẨU MỚI ==================== */}
      {step === 2 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="flex justify-between items-center bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100">
            <span className="text-xs text-indigo-900 font-medium truncate max-w-[220px]">
              <i className="fa-solid fa-envelope-circle-check text-indigo-500 mr-1.5"></i>
              {email}
            </span>
            <button
              type="button"
              onClick={() => { setStep(1); setErr(''); setOk(''); }}
              className="text-xs text-indigo-600 font-bold hover:underline"
            >
              Đổi Email
            </button>
          </div>

          {/* NHẬP MÃ OTP */}
         <div className="space-y-4">
  {/* 1. MÃ OTP */}
  <div className="space-y-1.5">
    <div className="flex justify-between items-center">
      <label className="text-xs font-semibold text-gray-700 block">
        Mã OTP (6 chữ số) <span className="text-rose-500">*</span>
      </label>
      <button
        type="button"
        disabled={countdown > 0 || loading}
        onClick={handleSendOTP}
        className={`text-[11px] font-semibold transition ${
          countdown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:text-indigo-700 hover:underline'
        }`}
      >
        {countdown > 0 ? `Gửi lại sau (${countdown}s)` : 'Gửi lại mã'}
      </button>
    </div>

    <div className="relative flex items-center">
      <span className="absolute left-3.5 text-gray-400 pointer-events-none">
        <i className="fa-solid fa-shield-cat text-sm"></i>
      </span>
      <input
        type="text"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        required
        disabled={loading}
        placeholder="Nhập 6 số OTP..."
        className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-bold tracking-widest transition-all outline-none border ${
          errValidate.Otp
            ? 'bg-rose-50/40 border-rose-300 text-rose-900 focus:ring-4 focus:ring-rose-100'
            : 'bg-gray-50/70 border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 text-indigo-900'
        }`}
      />
    </div>

    {/* Lỗi hiển thị bên ngoài input */}
    {errValidate.Otp && (
      <p className="text-[11px] text-rose-500 mt-1 font-medium flex items-center gap-1.5 animate-fadeIn">
        <i className="fa-solid fa-triangle-exclamation text-xs shrink-0"></i>
        <span>{errValidate.Otp}</span>
      </p>
    )}
  </div>

  {/* 2. MẬT KHẨU MỚI */}
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-gray-700 block">
      Mật khẩu mới <span className="text-rose-500">*</span>
    </label>
    <div className="relative flex items-center">
      <span className="absolute left-3.5 text-gray-400 pointer-events-none">
        <i className="fa-solid fa-lock text-sm"></i>
      </span>
      <input
        type={showPassword.moi ? 'text' : 'password'}
        value={matKhauMoi}
        onChange={(e) => setMatKhauMoi(e.target.value)}
        required
        disabled={loading}
        placeholder="Tối thiểu 6 ký tự..."
        className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium transition-all outline-none border ${
          errValidate.matKhauMoi
            ? 'bg-rose-50/40 border-rose-300 text-rose-900 focus:ring-4 focus:ring-rose-100'
            : 'bg-gray-50/70 border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 text-gray-800'
        }`}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => ({ ...prev, moi: !prev.moi }))}
        className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition"
        tabIndex="-1"
      >
        <i className={`fa-solid ${showPassword.moi ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
      </button>
    </div>

    {/* Lỗi hiển thị bên ngoài input */}
    {errValidate.matKhauMoi && (
      <p className="text-[11px] text-rose-500 mt-1 font-medium flex items-center gap-1.5 animate-fadeIn">
        <i className="fa-solid fa-triangle-exclamation text-xs shrink-0"></i>
        <span>{errValidate.matKhauMoi}</span>
      </p>
    )}
  </div>

  {/* 3. XÁC NHẬN MẬT KHẨU MỚI */}
  <div className="space-y-1.5">
    <label className="text-xs font-semibold text-gray-700 block">
      Xác nhận mật khẩu mới <span className="text-rose-500">*</span>
    </label>
    <div className="relative flex items-center">
      <span className="absolute left-3.5 text-gray-400 pointer-events-none">
        <i className="fa-solid fa-check-double text-sm"></i>
      </span>
      <input
        type={showPassword.xacNhan ? 'text' : 'password'}
        value={xacNhanMatKhau}
        onChange={(e) => setXacNhanMatKhau(e.target.value)}
        required
        disabled={loading}
        placeholder="Nhập lại mật khẩu mới..."
        className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium transition-all outline-none border ${
          errValidate.xacNhanMatKhau
            ? 'bg-rose-50/40 border-rose-300 text-rose-900 focus:ring-4 focus:ring-rose-100'
            : 'bg-gray-50/70 border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 text-gray-800'
        }`}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => ({ ...prev, xacNhan: !prev.xacNhan }))}
        className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition"
        tabIndex="-1"
      >
        <i className={`fa-solid ${showPassword.xacNhan ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
      </button>
    </div>

    {/* Lỗi hiển thị bên ngoài input */}
    {errValidate.xacNhanMatKhau && (
      <p className="text-[11px] text-rose-500 mt-1 font-medium flex items-center gap-1.5 animate-fadeIn">
        <i className="fa-solid fa-triangle-exclamation text-xs shrink-0"></i>
        <span>{errValidate.xacNhanMatKhau}</span>
      </p>
    )}
  </div>
</div>

          {/* BÁO LỖI / THÀNH CÔNG */}
          <div className="min-h-[24px]">
            {err ? (
              <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-2.5 rounded-lg border border-red-100">
                <i className="fa-solid fa-triangle-exclamation text-sm shrink-0"></i>
                <span className="font-medium">{err}</span>
              </div>
            ) : ok ? (
              <div className="flex items-center gap-2 text-emerald-600 text-xs bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                <i className="fa-solid fa-circle-check text-sm shrink-0"></i>
                <span className="font-medium">{ok}</span>
              </div>
            ) : null}
          </div>

          {/* NÚT SUBMIT BƯỚC 2 */}
          <button
            type="submit"
            disabled={loading || !otp || !matKhauMoi || !xacNhanMatKhau}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
              loading || !otp || !matKhauMoi || !xacNhanMatKhau
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white shadow-indigo-100'
            }`}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin text-sm"></i>
                <span>Đang đặt lại mật khẩu...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-circle-check text-xs"></i>
                <span>Xác nhận khôi phục</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default QuenMatKhau;