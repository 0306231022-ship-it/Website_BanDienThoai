import { useModalContext } from '../../../../../../CONTEXT/QuanLiModal';
import { useState } from 'react';
import * as fun from '../../../../../../JS/FUNCTONS/function';
import * as API from '../../../../../../JS/API/API'

function ChinhSuaLoGo() {
  const [file, setfile] = useState([]); 
  const [AnhTam, setAnhTam] = useState([]);
  const [err, seterr] = useState('');
  const { modalState } = useModalContext();
  
  const LoGoServer = modalState?.DuLieu?.LoGo || "";

  const handleMultipleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    seterr('');
    setfile(selectedFiles);

    // Tạo preview
    const urls = selectedFiles.map(f => URL.createObjectURL(f));
    AnhTam.forEach(url => URL.revokeObjectURL(url));
    setAnhTam(urls);
  };

  const LuuAnh = async() => {
    if (file.length === 0) {
      seterr('Vui lòng chọn hình ảnh trước');
      return;
    }
    const kiemtra = fun.validateImage(file[0]);
    if (!kiemtra) {
      seterr('Định dạng ảnh không hợp lệ hoặc quá lớn');
      return;
    }
   
    const ketqua= await API.CallAPI(undefined,{fileArray:file,url:'/admin/ChinhLoGo', PhuongThuc : 1});
    alert(JSON.stringify(ketqua))
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl overflow-hidden border border-gray-100">
      <div className="p-8 flex flex-col items-center">
        
        {/* Profile Preview */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-blue-200 rounded-full scale-110 blur-2xl opacity-30 animate-pulse"></div>
          
          <div className="relative group">
            <div className="w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
              {AnhTam.length > 0 ? (
                <img
                  alt="Preview"
                  src={AnhTam[0]} // Hiển thị ảnh đầu tiên
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm"
                />
              ) : (
                <img
                  alt="Default Logo"
                  src={`http://localhost:3001${LoGoServer}`}
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
        
        {/* Upload Zone */}
        <div className="w-full mb-8">
          <label 
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-3xl transition-all cursor-pointer group
              ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50/50 hover:bg-blue-50/50 hover:border-blue-200'}`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <i className={`fa-solid fa-cloud-arrow-up text-2xl mb-2 transition-colors 
                ${err ? 'text-red-400' : 'text-gray-300 group-hover:text-blue-400'}`}></i>
              <p className={`text-sm font-semibold ${err ? 'text-red-600' : 'text-gray-500 group-hover:text-blue-600'}`}>
                {file.length > 0 ? `Đã chọn ${file.length} ảnh` : "Nhấn để chọn ảnh mới"}
              </p>
              <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-tighter">PNG, JPG (Max 2MB)</p>
              
              {err && (
                <div className="mt-2 flex items-center gap-1 text-red-600 font-bold animate-bounce">
                   <i className="fa-solid fa-circle-exclamation text-[10px]"></i>
                   <p className="text-[11px]">{err}</p>
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

        {/* Action Button */}
        <div className="w-full space-y-3">
          <button onClick={LuuAnh} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2" >
            <i className="fa-solid fa-check-double"></i>
            Xác nhận thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChinhSuaLoGo;