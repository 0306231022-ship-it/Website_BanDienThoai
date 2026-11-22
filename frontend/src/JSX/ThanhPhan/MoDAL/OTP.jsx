import React, { useState, useRef, useEffect } from 'react';
import * as API from '../../../JS/API/API';
import * as ThongBao from '../../../JS/FUNCTONS/ThongBao';
import * as fun from '../../../JS/FUNCTONS/function';
function XacThucOTP({DuLieu}) {
  // Trạng thái mã OTP dạng mảng 6 phần tử
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);
  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Xử lý phím Backspace (Xóa)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      // Nếu ô hiện tại trống và bấm Backspace, lùi về ô trước đó
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Xử lý Dán (Paste) chuỗi OTP 6 số
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();

    // Kiểm tra nếu là chuỗi 6 số
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      setError('');
      // Focus vào ô cuối cùng
      inputRefs.current[5]?.focus();
    }
  };

  // Xử lý Gửi lại mã OTP
  const handleResend = () => {
    if (countdown > 0) return;
    setOtp(['', '', '', '', '', '']);
    setError('');
    setSuccess('Mã OTP mới đã được gửi tới Email của bạn!');
    setCountdown(60);
    inputRefs.current[0]?.focus();
  };

  // Submit xác thực OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      setError('Vui lòng nhập đủ 6 chữ số OTP!');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      Object.assign(DuLieu, { otp: otpValue });
      const formdata = fun.objectToFormData(DuLieu);
      const ketqua = await API.CallAPI(formdata, { url: '/NguoiDung/DangKy', PhuongThuc: 1 });
      if(ketqua.validate){
        const newErr = {};
        ketqua.errors.forEach(error => {
            newErr[error.path] = error.msg;
        });
        setError('Vui lòng kiểm tra lại thông tin!');
        return;
      }
      if(ketqua.ThanhCong){
        setSuccess('Xác thực thành công! Vui lòng đăng nhập để tiếp tục.');
        ThongBao.ThongBao_ThanhCong('Xác thực thành công! Vui lòng đăng nhập để tiếp tục.');
      }else{
        setError(ketqua.message || 'Xác thực thất bại! Vui lòng thử lại.');
      }
    } catch (err) {
      setError('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
        
        {/* Nút Quay lại (nếu có) */}
  

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <i className="fa-solid fa-shield-halved text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Xác thực OTP</h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Mã xác thực 6 số đã được gửi đến email
            <br />
            <span className="font-semibold text-slate-800">{DuLieu.email}</span>
          </p>
        </div>

        {/* FORM NHẬP OTP */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 6 Ô NHẬP OTP ĐỘC LẬP */}
          <div className="flex justify-between gap-2 sm:gap-2.5">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                disabled={loading}
                className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-2xl border transition-all duration-150 outline-none ${
                  error
                    ? 'border-rose-400 bg-rose-50/50 text-rose-900 focus:ring-4 focus:ring-rose-100'
                    : digit
                    ? 'border-indigo-600 bg-indigo-50/30 text-indigo-900 shadow-sm'
                    : 'border-slate-200 bg-slate-50/80 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 text-slate-800'
                }`}
              />
            ))}
          </div>

          {/* THÔNG BÁO LỖI HOẶC THÀNH CÔNG */}
          <div className="min-h-[22px]">
            {error ? (
              <p className="text-xs text-rose-500 text-center font-medium flex items-center justify-center gap-1.5 animate-fadeIn">
                <i className="fa-solid fa-circle-exclamation text-xs"></i>
                <span>{error}</span>
              </p>
            ) : success ? (
              <p className="text-xs text-emerald-600 text-center font-medium flex items-center justify-center gap-1.5 animate-fadeIn">
                <i className="fa-solid fa-circle-check text-xs"></i>
                <span>{success}</span>
              </p>
            ) : null}
          </div>

          {/* NÚT XÁC NHẬN */}
          <button
            type="submit"
            disabled={loading || otp.join('').length < 6}
            className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
              loading || otp.join('').length < 6
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white shadow-indigo-200/60 hover:shadow-indigo-300'
            }`}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin text-sm"></i>
                <span>Đang xác thực...</span>
              </>
            ) : (
              <span>Xác nhận</span>
            )}
          </button>

          {/* BỘ ĐẾM NGƯỢC & NÚT GỬI LẠI MÃ */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              Bạn chưa nhận được mã?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0 || loading}
                className={`font-semibold transition ${
                  countdown > 0 || loading
                    ? 'text-slate-400 cursor-not-allowed'
                    : 'text-indigo-600 hover:text-indigo-800 hover:underline'
                }`}
              >
                {countdown > 0 ? `Gửi lại sau (${countdown}s)` : 'Gửi lại mã OTP'}
              </button>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}

export default XacThucOTP;