import React, { useState, useReducer  } from "react";
import { QuanLiThuongHieu,khoiTao } from "../../../../REDUCER/QuanLiThuongHieu";
import * as fun from '../../../../JS/FUNCTONS/function';
import * as API from '../../../../JS/API/API';
function ThemThuongHieu() {
    const [logoPreview, setLogoPreview] = useState(null);
    const [state, dispatch] = useReducer(QuanLiThuongHieu, khoiTao);
    const [dulieu,setdulieu]=useState({
        TenTT: '',
        MoTa: '',
        img: null
    });
    // Hàm xử lý xem trước logo khi chọn file
    const handlePreviewLogo = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
            // Cập nhật dữ liệu logo vào state
            setdulieu({ ...dulieu, img: file });
        }
    };
    const Them=async()=>{
        // Kiểm tra dữ liệu nhập
         const kiemtra=fun.KiemTraRong(dulieu);
        if(!kiemtra.Status){
            kiemtra.ErrorKeys.forEach((key)=>{
                if(key==='TenTT'){ 
                   dispatch({type:'SET_ERR',payload:{TenTT:'Tên thương hiệu không được để trống!'}});
                }
                if(key==='MoTa'){
                    dispatch({type:'SET_ERR',payload:{MoTa:'Mô tả thương hiệu không được để trống!'}});
                }
                if(key==='img'){
                    dispatch({type:'SET_ERR',payload:{img:'Logo thương hiệu không được để trống!'}});
                }
            });
            return;
        }
        const img = dulieu.img;
        delete dulieu.img;
        const formdata=fun.objectToFormData(dulieu);
        try {
             dispatch({type:'SET_LOADING',payload:true});
             const ketqqua=await API.CallAPI(formdata,{PhuongThuc:1,url :'/admin/ThemThuongHieu', fileArray:[img] });
             if(ketqqua.Status){
                dispatch({type:'SET_ERR_HT',payload:{ err:ketqqua.message}});
                return;
             };
             if(ketqqua.Validate){
                let err={};
                ketqqua.errors.forEach(Err => {
                    err[Err.path]=Err.msg;
                });
                dispatch({type:'SET_ERR',payload:err});
                return;
             }
             if(ketqqua.ThanhCong){
                fun.resetGiaTri(dulieu);
                setLogoPreview(null);
                dispatch({type:'SET_LOADING',payload:false});
                dispatch({type:'SET_ERR',payload:{}});
                dispatch({type:'SET_ERR_HT',payload:{ err:''}});
                dispatch({type:'SET_HT',payload:{ ThanhCong:ketqqua.message}});
                return;
             }   
        } catch (error) {
            console.error('Lỗi khi thêm thương hiệu:', error);
            dispatch({type:'SET_ERR_HT',payload:{ err:'Đã xảy ra lỗi hệ thống, Vui lòng thử lại sau!'}});
        } finally{
            dispatch({type:'SET_LOADING',payload:false});
        }
    }
    const resetGiaTri=()=>{
        setdulieu({
            TenTT: '',
            MoTa: '',
            img: null
        });
        setLogoPreview(null);
        dispatch({type:'SET_ERR',payload:{}});
        dispatch({type:'SET_ERR_HT',payload:{ err:''}});
        dispatch({type:'SET_HT',payload:{ ThanhCong:''}});
    }

    return (
        <div className="bg-white rounded-2xl p-2 transition duration-500">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-teal-500/50 pb-3">
                <i className="fas fa-tags mr-2 text-sm text-yellow-500"></i> Thêm Thương Hiệu Mới
            </h3>

            <header className="space-y-5">
        
                <div>
                    <label htmlFor="brand-name" className="block text-sm font-semibold text-gray-700 mb-1">
                        Tên Thương hiệu <span className="text-red-700">(*)</span>
                    </label>
                    <input
                        onChange={(e) => {setdulieu({ ...dulieu, TenTT: e.target.value });}}
                        value={dulieu.TenTT}
                        type="text"
                        id="brand-name"
                        placeholder="Ví dụ: Apple, Samsung, Xiaomi"
                        className={`w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-150 bg-gray-50 ${state.err.TenTT ? 'border-red-500' : ''}`}
                        required
                    />
                    {state.err.TenTT && <p className="text-red-600 text-sm mt-1"><i className="fa-solid fa-triangle-exclamation"></i> {state.err.TenTT}</p>}
                </div>
                <div>
                    <label htmlFor="brand-description" className="block text-sm font-semibold text-gray-700 mb-1">
                        Mô tả ngắn <span className="text-red-700">(*)</span>
                    </label>
                    <textarea
                    onChange={(e) => {setdulieu({ ...dulieu, MoTa: e.target.value });}} id="brand-description" rows="2"
                        placeholder="Tóm tắt về thương hiệu..."
                        className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-gray-50 ${state.err.MoTa ? 'border-red-500' : ''}`}
                    ></textarea>
                    {state.err.MoTa && <p className="text-red-600 text-sm mt-1"><i className="fa-solid fa-triangle-exclamation"></i> {state.err.MoTa}</p>}
                </div>

                {/* Upload Logo */}
                <div className={`border-2 border-dashed border-teal-300 p-5 rounded-xl bg-teal-50/50 transition hover:bg-teal-100 ${state.err.img || state.err.files ? 'border-red-500' : ''}`}>
                    <label className="block text-base font-bold text-teal-800 mb-3"><i className="fas fa-image text-teal-600"></i> Logo Thương hiệu <span className="text-red-700">(*)</span></label>

                    <input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePreviewLogo}
                    />

                    <div className="mt-2 mb-4 flex items-center gap-4">
                        {logoPreview ? (
                           <div className="relative">
                                <img src={logoPreview} alt="Xem trước Logo"  className="w-20 h-20 object-contain rounded-lg border border-gray-200 bg-white shadow-sm"/>
                                <button className="absolute top-1 right-1 rounded-full bg-red-600 text-white w-6 h-6 flex items-center justify-center hover:bg-red-800"onClick={() => setLogoPreview(null)} >x </button>
                            </div>
                        ) : (
                            <div className="w-20 h-20 flex items-center justify-center bg-white border border-gray-200 rounded-lg text-gray-300">
                                <i className="fas fa-image text-2xl"></i>
                            </div>
                        )}
                        <span className="text-sm text-gray-500 italic">
                            {logoPreview ? "Đã chọn ảnh thành công" : "Chưa có logo nào được chọn."}
                        </span>
                        {state.err.img && <p className="text-red-600 text-sm mt-1"><i className="fa-solid fa-triangle-exclamation"></i> {state.err.img}</p>}
                    </div>
                  

                    <button
                        type="button"
                        onClick={() => document.getElementById('logo-upload').click()}
                        className="bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 transition duration-200 shadow-md font-semibold text-sm"
                    >
                        Chọn Logo
                    </button>
                </div>
                {
                    state.err.err && <p className="text-red-600 text-sm mt-1"><i className="fa-solid fa-triangle-exclamation"></i> {state.err.err}</p>
                }
                {
                    state.ThanhCong && <p className="text-green-600 text-sm mt-1"><i className="fa-solid fa-circle-check"></i> {state.ThanhCong}</p>
                }

                {/* Nút hành động */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button type="button" onClick={()=>{Them()}} disabled={state.loading} className="flex-1 bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 font-bold shadow-lg shadow-teal-300/50 transition duration-300 uppercase text-sm tracking-wider">
                        {state.loading ? (<> <i className="fas fa-spinner fa-spin mr-2"></i> Lưu Thương Hiệu </>) : (<> <i className="fas fa-floppy-disk mr-2"></i>Lưu Thương Hiệu</>)}
                    </button>
                    
                    <button onClick={()=>{resetGiaTri()}} type="button" className="py-3 px-6 bg-gray-100 text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 font-bold text-sm transition duration-200">Hủy</button>
                </div>
            </header>
        </div>
    );
}

export default ThemThuongHieu;