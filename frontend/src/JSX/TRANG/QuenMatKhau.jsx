import React, { useState } from "react";
import { Link } from "react-router-dom";

function QuenMatKhau() {
  const [step, setStep] = useState(1); // Step 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Giả lập gửi API
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleSubmitOTP = (e) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transition-all">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className={`fas ${step === 1 ? "fa-envelope-open-text" : step === 2 ? "fa-key" : "fa-lock"} text-3xl`}></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {step === 1 ? "Quên mật khẩu?" : step === 2 ? "Xác thực OTP" : "Đặt lại mật khẩu"}
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            {step === 1 
              ? "Nhập email của bạn để nhận mã xác thực khôi phục tài khoản." 
              : step === 2 
              ? `Chúng tôi đã gửi mã xác thực đến ${email}` 
              : "Vui lòng nhập mật khẩu mới bảo mật hơn."}
          </p>
        </div>

        {/* Bước 1: Nhập Email */}
        {step === 1 && (
          <form onSubmit={handleSubmitEmail} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <i className="fas fa-at"></i>
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : null}
              Gửi mã xác thực
            </button>
          </form>
        )}

        {/* Bước 2: Nhập OTP */}
        {step === 2 && (
          <form onSubmit={handleSubmitOTP} className="space-y-6">
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  className="w-12 h-12 text-center text-xl font-bold border border-gray-200 rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none"
                />
              ))}
            </div>
            <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-teal-700 transition-all">
              Xác nhận mã
            </button>
            <div className="text-center">
              <button type="button" onClick={() => setStep(1)} className="text-sm text-teal-600 hover:underline font-medium">
                Gửi lại mã khác?
              </button>
            </div>
          </form>
        )}

        {/* Bước 3: Mật khẩu mới */}
        {step === 3 && (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                placeholder="••••••••"
              />
            </div>
            <button type="button" className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl shadow-md hover:bg-teal-700 transition-all">
              Cập nhật mật khẩu
            </button>
          </form>
        )}

        {/* Link quay lại */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link to="/login" className="text-sm text-gray-500 hover:text-teal-600 transition-colors inline-flex items-center">
            <i className="fas fa-arrow-left mr-2 text-xs"></i> Quay lại trang đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuenMatKhau;