import { useState } from 'react';
import * as fun from '../../../../../../JS/FUNCTONS/function';
import * as API from '../../../../../../JS/API/API'
import { useAppContext } from '../../../../../../CONTEXT/TrangChuAdmin';

function ChinhSuaLoGo({DuLieu , url}) {
  const { GetTTwebsite} =useAppContext();
  const [file, setfile] = useState([]); 
  const [AnhTam, setAnhTam] = useState([]);
  const [err, seterr] = useState('');
  const [LoiValidate, setLoi] = useState({});
  const [ok, setok] = useState('');
  const [loading, setLoading] = useState(false); 
  const LoGoServer = DuLieu?.DuLieu ;
  const id = DuLieu?.id;


  const handleMultipleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;
    seterr('');
    setLoi({}); 
    setok('');
    setfile(selectedFiles);
    const urls = selectedFiles.map(f => URL.createObjectURL(f));
    AnhTam.forEach(url => URL.revokeObjectURL(url));
    setAnhTam(urls);
  };

  const LuuAnh = async () => {
    if (file.length === 0) {
      seterr('Vui lòng chọn hình ảnh trước');
      return;
    }
   
    
    setLoading(true);
    seterr('');
    setLoi({});
    setok('');

    const kiemtra = fun.validateImage(file[0]);
    if (!kiemtra) {
      seterr('Định dạng ảnh không hợp lệ hoặc quá lớn');
      setLoading(false);
      return;
    }
   const DuLieu = id
      ? fun.objectToFormData({ id: id })
      : fun.objectToFormData({ id: "" });
    try {
      const ketqua = await API.CallAPI(DuLieu || undefined, { 
        fileArray: file,
        url: url, 
        PhuongThuc: 1 
      });

      if (ketqua.Status) {
        seterr(ketqua.message);
        return;
      }
      if (ketqua.Validate) {
        const errorsFromServer = {};
        ketqua.errors.forEach(Err => {
          errorsFromServer[Err.path] = Err.msg;
        });
        setLoi(errorsFromServer);
        return;
      }

      if (ketqua.ThanhCong) {
        setok(ketqua.message);
        GetTTwebsite();
        return;
      }
    } catch (error) {
      seterr("Đã xảy ra lỗi ngoài ý muốn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl overflow-hidden">
      <div className="p-8 flex flex-col items-center">
        
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-blue-200 rounded-full scale-110 blur-2xl opacity-30 animate-pulse"></div>
          
          <div className="relative group">
            <div className={`w-36 h-36 rounded-full p-1  to-pink-500 flex items-center justify-center overflow-hidden transition-all
              ${(LoiValidate.file || LoiValidate.Logo) ? 'ring-4 ring-red-500 ring-offset-4' : ''}`}>
              {AnhTam.length > 0 ? (
                <img
                  alt="Preview"
                  src={AnhTam[0]}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm"
                />
              ) : (
                <img
                  alt="Default Logo"
                  src={`http://localhost:3001/${LoGoServer}`}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm"
                />
              )}
            </div>
            
            <label className="absolute bottom-1 right-1 bg-white text-blue-600 w-10 h-10 rounded-full cursor-pointer shadow-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 border-2 border-white z-10">
              <i className="fa-solid fa-camera text-sm"></i>
              <input 
                type="file" 
                onChange={handleMultipleFilesChange} 
                className="hidden" 
                accept="image/*" 
              />
            </label>
          </div>
        </div>
        
    
        <div className="w-full mb-8">
          <label 
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-3xl transition-all cursor-pointer group
              ${(err || LoiValidate.file || LoiValidate.Logo) ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50/50 hover:bg-blue-50/50 hover:border-blue-200'}
              ${ok ? 'border-green-500 bg-green-50' : ''}
              `}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
              <i className={`fa-solid fa-cloud-arrow-up text-2xl mb-2 transition-colors 
                ${(err || LoiValidate.file || LoiValidate.Logo) ? 'text-red-400' : ok ? 'text-green-500' : 'text-gray-300 group-hover:text-blue-400'}
                `}></i>
              <p className={`text-sm font-semibold ${(err || LoiValidate.file || LoiValidate.Logo) ? 'text-red-600' : ok ? 'text-green-600' : 'text-gray-500 group-hover:text-blue-600'}`}>
                {file.length > 0 ? `Đã chọn ${file.length} ảnh` : "Nhấn để chọn ảnh mới"}
              </p>
              
              {(err || LoiValidate.file || LoiValidate.Logo) && (
                <div className="mt-2 flex items-center justify-center gap-1 text-red-600 font-bold animate-shake">
                   <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                   <p className="text-[11px]">{LoiValidate.file || LoiValidate.Logo || err}</p>
                </div>
              )}

               {ok && (
                <div className="mt-2 flex items-center gap-1 text-green-500 font-bold animate-fadeIn">
                   <i className="fa-solid fa-circle-check text-green-500 text-xs"></i>
                   <p className="text-[11px]">{ok}</p>
                </div>
              )}
            </div>
            <input 
              type="file" 
              onChange={handleMultipleFilesChange} 
              className="hidden" 
              accept="image/*"
            />
          </label>
        </div>
        <div className="w-full space-y-3">
          <button 
            disabled={loading}
            onClick={LuuAnh} 
            className={`w-full text-white py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-blue-100'}`} 
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              <i className="fa-solid fa-check-double"></i>
            )}
            {loading ? "Đang xử lý..." : "Xác nhận thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChinhSuaLoGo;