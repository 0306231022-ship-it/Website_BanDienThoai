import React, { useState } from 'react';
import * as API from '../../../JS/API/API';
import * as fun from '../../../JS/FUNCTONS/function';

function DoiMatKhau() {
  const [formData, setFormData] = useState({
    matKhauCu: '',
    matKhauMoi: '',
    xacNhanMatKhau: '',
  });

  const [showPassword, setShowPassword] = useState({
    cu: false,
    moi: false,
    xacNhan: false,
  });

  const [err, setErr] = useState('');
  const [errValidate, setErrValidate] = useState({});
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);

  // Tính độ mạnh mật khẩu mới (0 - 3)
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8 && /[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = getPasswordStrength(formData.matKhauMoi);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Xóa thông báo lỗi tổng quan & lỗi trường đang nhập
    if (err) setErr('');
    const fieldKey = name.charAt(0).toUpperCase() + name.slice(1);
    if (errValidate[fieldKey] || errValidate[name]) {
      setErrValidate((prev) => {
        const updated = { ...prev };
        delete updated[fieldKey];
        delete updated[name];
        return updated;
      });
    }
  };

  const toggleShow = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const getFieldError = (fieldName) => {
    return (
      errValidate[fieldName] ||
      errValidate[fieldName.toLowerCase()] ||
      errValidate[fieldName.charAt(0).toLowerCase() + fieldName.slice(1)]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setOk('');
    setErrValidate({});

    if (formData.matKhauMoi.length < 6) {
      setErr('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }

    if (formData.matKhauMoi !== formData.xacNhanMatKhau) {
      setErr('Xác nhận mật khẩu không trùng khớp!');
      return;
    }

    setLoading(true);

    try {
      const DuLieuGui = fun.objectToFormData({
        MatKhauCu: formData.matKhauCu,
        MatKhauMoi: formData.matKhauMoi,
        XacNhanMatKhau: formData.xacNhanMatKhau,
      });

      const ketqua = await API.CallAPI(DuLieuGui, {
        PhuongThuc: 1,
        url: '/NguoiDung/DoiMatKhau',
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
        setErr(ketqua.message || 'Mật khẩu hiện tại không chính xác!');
        return;
      }

      setOk(ketqua.message || 'Cập nhật mật khẩu thành công!');
      setFormData({ matKhauCu: '', matKhauMoi: '', xacNhanMatKhau: '' });
    } catch (error) {
      setErr('Đã xảy ra lỗi ngoài ý muốn, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-7 shadow-xl shadow-gray-100/80 border border-gray-100 transition-all duration-300">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
          <i className="fa-solid fa-shield-halved text-xl"></i>
        </div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Đổi mật khẩu</h2>
        <p className="text-xs text-gray-500 mt-1">
          Cập nhật mật khẩu định kỳ để bảo vệ tài khoản của bạn
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* 1. MẬT KHẨU CŨ */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 block">
            Mật khẩu hiện tại <span className="text-rose-500">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-gray-400 pointer-events-none transition-colors">
              <i className="fa-solid fa-lock text-sm"></i>
            </span>
            <input
              type={showPassword.cu ? 'text' : 'password'}
              name="matKhauCu"
              value={formData.matKhauCu}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="••••••••"
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium border transition-all outline-none ${
                getFieldError('MatKhauCu')
                  ? 'bg-rose-50/40 border-rose-300 text-rose-900 focus:ring-4 focus:ring-rose-100'
                  : 'bg-gray-50/70 border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 text-gray-800'
              }`}
            />
            <button
              type="button"
              onClick={() => toggleShow('cu')}
              className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition"
              tabIndex="-1"
            >
              <i className={`fa-solid ${showPassword.cu ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
            </button>
          </div>
          {getFieldError('MatKhauCu') && (
            <p className="text-[11px] text-rose-500 mt-1 font-medium flex items-center gap-1 animate-fadeIn">
              <i className="fa-solid fa-circle-exclamation"></i>
              {getFieldError('MatKhauCu')}
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
              <i className="fa-solid fa-key text-sm"></i>
            </span>
            <input
              type={showPassword.moi ? 'text' : 'password'}
              name="matKhauMoi"
              value={formData.matKhauMoi}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Tối thiểu 6 ký tự..."
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium border transition-all outline-none ${
                getFieldError('MatKhauMoi')
                  ? 'bg-rose-50/40 border-rose-300 text-rose-900 focus:ring-4 focus:ring-rose-100'
                  : 'bg-gray-50/70 border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 text-gray-800'
              }`}
            />
            <button
              type="button"
              onClick={() => toggleShow('moi')}
              className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition"
              tabIndex="-1"
            >
              <i className={`fa-solid ${showPassword.moi ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
            </button>
          </div>

          {/* THANH ĐÁNH GIÁ ĐỘ MẠNH MẬT KHẨU */}
          {formData.matKhauMoi && (
            <div className="pt-1 space-y-1">
              <div className="flex gap-1.5 h-1">
                <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strength >= 1 ? (strength === 1 ? 'bg-amber-400' : 'bg-emerald-500') : 'bg-gray-200'}`}></div>
                <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strength >= 2 ? (strength === 2 ? 'bg-emerald-400' : 'bg-emerald-500') : 'bg-gray-200'}`}></div>
                <div className={`h-full flex-1 rounded-full transition-all duration-300 ${strength >= 3 ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
              </div>
              <p className="text-[10px] text-gray-400 text-right">
                {strength === 1 && 'Khá yếu'}
                {strength === 2 && 'Trung bình'}
                {strength === 3 && 'Rất mạnh'}
              </p>
            </div>
          )}

          {getFieldError('MatKhauMoi') && (
            <p className="text-[11px] text-rose-500 mt-1 font-medium flex items-center gap-1 animate-fadeIn">
              <i className="fa-solid fa-circle-exclamation"></i>
              {getFieldError('MatKhauMoi')}
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
              name="xacNhanMatKhau"
              value={formData.xacNhanMatKhau}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Nhập lại mật khẩu mới..."
              className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium border transition-all outline-none ${
                getFieldError('XacNhanMatKhau') || (formData.xacNhanMatKhau && formData.matKhauMoi !== formData.xacNhanMatKhau)
                  ? 'bg-rose-50/40 border-rose-300 text-rose-900 focus:ring-4 focus:ring-rose-100'
                  : 'bg-gray-50/70 border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 text-gray-800'
              }`}
            />
            <button
              type="button"
              onClick={() => toggleShow('xacNhan')}
              className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition"
              tabIndex="-1"
            >
              <i className={`fa-solid ${showPassword.xacNhan ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
            </button>
          </div>
          {getFieldError('XacNhanMatKhau') && (
            <p className="text-[11px] text-rose-500 mt-1 font-medium flex items-center gap-1 animate-fadeIn">
              <i className="fa-solid fa-circle-exclamation"></i>
              {getFieldError('XacNhanMatKhau')}
            </p>
          )}
        </div>

        {/* THÔNG BÁO LỖI / THÀNH CÔNG CHUNG */}
        <div className="min-h-[20px] pt-1">
          {err ? (
            <div className="flex items-center gap-2.5 text-rose-600 text-xs bg-rose-50/80 p-3 rounded-xl border border-rose-100 animate-fadeIn">
              <i className="fa-solid fa-triangle-exclamation text-sm shrink-0"></i>
              <span className="font-medium">{err}</span>
            </div>
          ) : ok ? (
            <div className="flex items-center gap-2.5 text-emerald-600 text-xs bg-emerald-50/80 p-3 rounded-xl border border-emerald-100 animate-fadeIn">
              <i className="fa-solid fa-circle-check text-sm shrink-0"></i>
              <span className="font-medium">{ok}</span>
            </div>
          ) : null}
        </div>

        {/* NÚT SUBMIT */}
        <button
          type="submit"
          disabled={
            loading ||
            !formData.matKhauCu ||
            !formData.matKhauMoi ||
            !formData.xacNhanMatKhau
          }
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
            loading ||
            !formData.matKhauCu ||
            !formData.matKhauMoi ||
            !formData.xacNhanMatKhau
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white shadow-indigo-200/50 hover:shadow-indigo-300'
          }`}
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner animate-spin text-sm"></i>
              <span>Đang cập nhật...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-arrows-rotate text-xs"></i>
              <span>Cập nhật mật khẩu</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default DoiMatKhau;