import React, { useState } from 'react';
import { useModalContext } from '../../../../../../CONTEXT/QuanLiModal';
import * as API from '../../../../../../JS/API/API';
import * as fun from '../../../../../../JS/FUNCTONS/function';
import { useAppContext } from '../../../../../../CONTEXT/TrangChuAdmin';

function ChinhSuaTen() {
  const { modalState } = useModalContext();
  const { GetTTwebsite} =useAppContext();
  const tenCu = modalState?.DuLieu?.TenWebsite || modalState?.DuLieu?.Ten || '';
  const [ten, setTen] = useState('');
  const [err, setErr] = useState('');
  const [errValidate, seterr] = useState({}); 
  const [ok, setOk] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    setErr('');
    setOk('');
    seterr({}); 

    if (ten === tenCu) {
      setErr('Bạn chưa thay đổi nội dung cần cập nhật!');
      setLoading(false);
      return;
    };

    if (!ten || !ten.trim()) {
      setErr('Vui lòng nhập dữ liệu!');
      setLoading(false)
      return;
    }

    if (ten.length > 255) {
      setErr('Nội dung không được vượt quá 255 ký tự!');
      setLoading(false);
      return;
    }

    try {
      const DuLieu = fun.objectToFormData({ Ten: ten , id : modalState?.DuLieu?.id || null});
      const ketqua = await API.CallAPI(DuLieu, { PhuongThuc: 1, url: modalState.QuaTrang.url });
      if (ketqua.Status) {
        setErr(ketqua.message);
        setLoading(false);
        return;
      };
      if (ketqua.Validate) {
       
        const errorsFromServer = {};
        ketqua.errors.forEach(Err => {
          errorsFromServer[Err.path] = Err.msg;
        });
        seterr(errorsFromServer);
        setLoading(false);
        return;
      };

      if (ketqua.ThanhCong) {
        setLoading(false);
        setOk(ketqua.message);
        GetTTwebsite();
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
            <div className="flex justify-between items-end px-1">
              <label className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">
                Thông tin hiển thị
              </label>
              <span className="text-[11px] text-blue-500 font-medium italic">
                Tên cũ: {tenCu}
              </span>
            </div>

            <div className="relative group">
              <input
                type="text"
                value={ten}
                onChange={(e) => setTen(e.target.value)}
                disabled={loading}
                className={`w-full px-5 py-4 rounded-2xl outline-none transition-all font-medium text-lg shadow-sm
                  ${(err || errValidate.Ten) ? "bg-red-50 border-2 border-red-500 text-red-900" 
                        : "bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white text-gray-800"}
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                placeholder="Nhập tên website mới..."
              />
              
              {ten && !loading && (
                <button
                  onClick={() => setTen('')}
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 transition-all active:scale-90"
                >
                  <i className="fa-solid fa-circle-xmark text-lg"></i>
                </button>
              )}
            </div>

            <div className="min-h-[20px] px-1">
              {errValidate.Ten ? (
                 <div className="flex items-center gap-2 animate-shake">
                    <i className="fa-solid fa-triangle-exclamation text-red-500 text-xs"></i>
                    <p className="text-[12px] text-red-600 font-bold">{errValidate.Ten}</p>
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
                    Tên hiện tại là <strong className="text-gray-600">"{ten}"</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleUpdate}
              className={`w-full py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.97] flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100
                `}
            >
              {loading ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                <i className="fa-solid fa-cloud-arrow-up"></i>
              )}
              {loading ? "Đang xử lý..." : "Cập nhật ngay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChinhSuaTen;