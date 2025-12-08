import React, { useState } from "react";
import * as fun from '../../../../JS/FUNCTONS/function'
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';
import { useAPIContext } from '../../../../JS/API/API';
function TenWebsite() {
  const [name, setName] = useState("");
   const { CallAPI } = useAPIContext();
  const [err,seterr]=useState("");
  const currentName = "Cửa hàng Thời trang ABC";
  const reset=()=>{
    setName('')
  };
  const Luu=async()=>{
    seterr('')
    const kiemtra= fun.KiemTraRong({name:name});
    if(!kiemtra){
        ThongBao.ThongBao_CanhBao('Vui lòng nhập dữ liệu tên website!');
        return;
    };
    if(name.length>255){
        seterr('Vui lòng kiểm tra lại dữ liệu');
        return;
    }
    const ketqua= await CallAPI(undefined,{name:name},{url:'/admin/ChinhSuaTenWebsite'});
    if (ketqua.ThanhCong) {
        reset();
        ThongBao.ThongBao_ThanhCong(ketqua.message);
    }
    if (ketqua.Validate) {
        //sẽ lưu giá trị lỗi vào err
        alert(JSON.stringify(ketqua.Validate))
    }

    
  }
  return (
    <>
        <div className="p-6 space-y-6">
            
            
            {/* Block hiển thị thông tin hiện tại */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Tên hiển thị hiện tại</p>
                    <p className="text-gray-900 font-medium mt-1">{currentName}</p>
                </div>
            </div>

            {/* Form nhập liệu */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên Website mới <span className="text-red-500">*</span>
                </label>
                
                <div className="relative">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên website mới..."
                        className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                    />
                   
                 
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    </div>
                </div>
                {
                    err ? (
                        <p className="mt-2 text-xs text-red-500"> (*) {err}</p>

                    ):(
                        <p className="mt-2 text-xs text-gray-500">Tên này sẽ hiển thị trên tab trình duyệt và tiêu đề trang chủ.</p>
                    )
                }
                
                
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                    className="px-5 py-2.5 text-sm font-medium text-white bg-red-700 border border-gray-300 rounded-lg"
                    onClick={() => setName("")}>
                    Reset
                </button>
                <button
                    onClick={Luu}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all transform active:scale-95"
                >
            
                    Lưu thay đổi
                </button>
            </div>

        </div>

    </>
  );


}

export default TenWebsite;