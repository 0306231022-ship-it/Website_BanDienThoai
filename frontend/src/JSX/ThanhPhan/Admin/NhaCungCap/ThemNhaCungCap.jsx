import { useModalContext } from "../../../../CONTEXT/QuanLiModal";
import { useState } from "react";
import * as fun from '../../../../JS/FUNCTONS/function';
import * as API from '../../../../JS/API/API';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';

function ThemCungCap() {
    const { DongModal } = useModalContext();
    const [DuLieu, setDuLieu] = useState({
        DinhDanh: { 
            MaDinhDanh: '', 
            TenNhaCungCap: '' 
        },
        NguoiLienHe: { 
            TenNguoiDung: '', 
            SDT: '', 
            Email: '', 
            DiaChiKho: '' 
        },
        TaiChinh: { 
            MaThue: '', 
            STK: '', 
            NganHang: '' 
        },
        GhiChu: ''
    });
    const [err, seterr] = useState(null);
    const [loading, setloading] =useState(false);
    const [errHT, seterrHT] =useState('');
    const handleChange = (section, key, value) => {
        setDuLieu((prev) => {
            if (section) {
                return { 
                    ...prev, 
                    [section]: {
                         ...prev[section], [key]: value 
                    } 
                };
            }
            return { 
                ...prev, 
                [key]: value 
            };
        });
        if (err) {
            const errorKey = section ? `${section}.${key}` : key;
            if (err[errorKey]) {
                seterr(prev => {
                    const newErr = { ...prev };
                    delete newErr[errorKey];
                    return newErr;
                });
            }
        }
    };
    const reset = () => {
        fun.resetGiaTri(DuLieu);   
        setDuLieu({ ...DuLieu });  
    };
    const handleLuu = async() => {
     setloading(true);
    let newErrors = {};
    const kiemtra = fun.KiemTraRong(DuLieu);
    if (!kiemtra.Status) {
        kiemtra.ErrorKeys.forEach((key) => {
            newErrors[key] = 'Vui lòng nhập dữ liệu!';
        });
    }
    if (DuLieu.NguoiLienHe.SDT && !fun.validatePhone(DuLieu.NguoiLienHe.SDT)) {
        newErrors['NguoiLienHe.SDT'] = 'Định dạng số điện thoại không đúng (10 số)!';
    }
    if (DuLieu.NguoiLienHe.Email && !fun.validateEmail(DuLieu.NguoiLienHe.Email)) {
        newErrors['NguoiLienHe.Email'] = 'Định dạng email không đúng!';
    }
    if (Object.keys(newErrors).length > 0) {
        seterr(newErrors);
        setloading(false);
        return;
    }
    seterr(null);
   const formData= fun.objectToFormData(DuLieu);
   try {
        const ketqua= await API.CallAPI(formData, {url : '/admin/Themcc' ,PhuongThuc:1});
        alert(JSON.stringify(ketqua))
        if(ketqua.Status){
            seterrHT(ketqua.message);
            return;
        };
        if(ketqua.Validate){
              const errorsFromServer = {};
              ketqua.errors.forEach(Err => {
                    errorsFromServer[Err.path] = Err.msg;
            });
            seterr(errorsFromServer);
            return;
        }
        if(ketqua.ThanhCong){
            ThongBao.ThongBao_ThanhCong(ketqua.message);
            return;
        }else{
            seterrHT(ketqua.message);
            return;
        }

   } catch (error) {
        console.error('Đã có lỗi xảy ra !' + error);
        seterrHT('Không thể kết nối đến hệ thống! Vui lòng thử lại sau.');
        return;
   } finally {
     setloading(false);
   }
};
      if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
                <div className="relative">
                    <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                    <div className="absolute inset-0 rounded-full blur-2xl bg-teal-200/50 -z-10 animate-pulse"></div>
                </div>
                <p className="text-gray-500 font-bold tracking-widest animate-pulse text-sm uppercase">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (errHT) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 text-center animate-fadeIn">
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 shadow-xl max-w-md">
                    <div className="mb-6">
                        <i className="fa-solid fa-triangle-exclamation text-7xl text-red-500"></i>
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-800 mb-2">Đã xảy ra lỗi!</h3>
                    <p className="text-red-600 font-medium mb-6">{errHT}</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-600 transition-all">Thử lại</button>
                        <button onClick={() => window.history.back()} className="px-6 py-2.5 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all">Quay lại</button>
                    </div>
                </div>
            </div>
        );
    }


    const ErrorMessage = ({ error }) => {
        if (!error) return null;
        return (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-pulse">
                <i className="fa-solid fa-circle-exclamation"></i> {error}
            </p>
        );
    };

    // Hàm lấy class cho input dựa trên việc có lỗi hay không
    const getInputClass = (errorKey) => {
        const hasError = err?.[errorKey];
        return `w-full px-3 py-2 border rounded-lg outline-none transition-all ${
            hasError 
            ? 'border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200 text-red-900 placeholder-red-300' 
            : 'border-slate-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-300'
        }`;
    };

    return (
       <div id="modalAddSupplier" className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden font-sans">
    {/* Backdrop với hiệu ứng Blur mạnh hơn chút cho hiện đại */}
    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-all" onClick={DongModal}></div>

    {/* Modal Container: Bo góc lớn hơn, hiệu ứng zoom nhẹ */}
    <div className="relative w-full max-w-5xl mx-auto h-full md:h-auto md:max-h-[90vh] flex flex-col bg-gray-50 md:rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-fade-in-up">

        {/* 1. HEADER: Gradient nhẹ và sạch sẽ */}
        <div className="px-6 py-5 bg-white border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <i className="fa-solid fa-truck-field text-xl"></i>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Thêm Nhà Cung Cấp</h3>
                    <p className="text-xs text-gray-500">Nhập thông tin đối tác mới vào hệ thống</p>
                </div>
            </div>
            <button onClick={DongModal} className="group w-9 h-9 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200">
                <i className="fa-solid fa-xmark text-lg group-hover:rotate-90 transition-transform"></i>
            </button>
        </div>

        {/* 2. BODY: Sử dụng Grid Card tách biệt */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* --- CỘT 1: ĐỊNH DANH (Card Trắng) --- */}
                <div className="bg-white p-5 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 h-full">
                    <div className="flex items-center gap-2 mb-5 border-b border-gray-100 pb-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">01</span>
                        <h4 className="font-bold text-gray-700 uppercase text-sm tracking-wide">Định danh</h4>
                    </div>

                    <div className="space-y-5">
                        <div className="relative group">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tên Nhà cung cấp <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <i className="fa-regular fa-building"></i>
                                </div>
                                <input
                                    type="text"
                                    value={DuLieu.DinhDanh.TenNhaCungCap}
                                    onChange={(e) => handleChange('DinhDanh', 'TenNhaCungCap', e.target.value)}
                                    placeholder="VD: Công ty FPT Trading"
                                    className={`${getInputClass('DinhDanh.TenNhaCungCap')} w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none`}
                                />
                            </div>
                            <ErrorMessage error={err?.['DinhDanh.TenNhaCungCap']} />
                        </div>

                        <div className="relative group">
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mã viết tắt</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <i className="fa-solid fa-tag"></i>
                                </div>
                                <input
                                    type="text"
                                    value={DuLieu.DinhDanh.MaDinhDanh}
                                    onChange={(e) => handleChange('DinhDanh', 'MaDinhDanh', e.target.value)}
                                    placeholder="VD: FPT"
                                    className={`${getInputClass('DinhDanh.MaDinhDanh')} uppercase w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none font-medium text-blue-700`}
                                />
                            </div>
                            {err?.['DinhDanh.MaDinhDanh'] ? (
                                <ErrorMessage error={err?.['DinhDanh.MaDinhDanh']} />
                            ) : (
                                <p className="text-[11px] text-gray-400 mt-1.5 italic flex items-center gap-1">
                                    <i className="fa-solid fa-circle-info"></i> Dùng để in tem quản lý
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 h-full">
                    <div className="flex items-center gap-2 mb-5 border-b border-gray-100 pb-3">
                        <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">02</span>
                        <h4 className="font-bold text-gray-700 uppercase text-sm tracking-wide">Liên hệ</h4>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Số điện thoại <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    value={DuLieu.NguoiLienHe.SDT}
                                    onChange={(e) => handleChange('NguoiLienHe', 'SDT', e.target.value.replace(/[^0-9]/g, ''))}
                                    placeholder="09xxxx"
                                    className={`${getInputClass('NguoiLienHe.SDT')} w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 outline-none transition-all`}
                                />
                            </div>
                            <ErrorMessage error={err?.['NguoiLienHe.SDT']} />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Người liên hệ</label>
                                <input
                                    type="text"
                                    value={DuLieu.NguoiLienHe.TenNguoiDung}
                                    onChange={(e) => handleChange('NguoiLienHe', 'TenNguoiDung', e.target.value)}
                                    placeholder="Tên sale..."
                                    className={`${getInputClass('NguoiLienHe.TenNguoiDung')} w-full px-3 py-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-emerald-200 outline-none text-sm`}
                                />
                                <ErrorMessage error={err?.['NguoiLienHe.TenNguoiDung']} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                                <input
                                    type="text"
                                    value={DuLieu.NguoiLienHe.Email}
                                    onChange={(e) => handleChange('NguoiLienHe', 'Email', e.target.value)}
                                    placeholder="abc@..."
                                    className={`${getInputClass('NguoiLienHe.Email')} w-full px-3 py-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-emerald-200 outline-none text-sm`}
                                />
                                <ErrorMessage error={err?.['NguoiLienHe.Email']} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Địa chỉ kho</label>
                            <div className="relative">
                                <textarea
                                    rows="2"
                                    value={DuLieu.NguoiLienHe.DiaChiKho}
                                    onChange={(e) => handleChange('NguoiLienHe', 'DiaChiKho', e.target.value)}
                                    placeholder="Số 123, Đường ABC..."
                                    className={`${getInputClass('NguoiLienHe.DiaChiKho')} w-full p-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-emerald-200 outline-none text-sm resize-none`}
                                ></textarea>
                            </div>
                            <ErrorMessage error={err?.['NguoiLienHe.DiaChiKho']} />
                        </div>
                    </div>
                </div>

                {/* --- CỘT 3: TÀI CHÍNH (Card Trắng) --- */}
                <div className="bg-white p-5 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-5 border-b border-gray-100 pb-3">
                        <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">03</span>
                        <h4 className="font-bold text-gray-700 uppercase text-sm tracking-wide">Tài chính</h4>
                    </div>

                    <div className="space-y-4 flex-1">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mã số thuế</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                    <i className="fa-solid fa-file-invoice-dollar"></i>
                                </div>
                                <input
                                    type="text"
                                    value={DuLieu.TaiChinh.MaThue}
                                    onChange={(e) => handleChange('TaiChinh', 'MaThue', e.target.value)}
                                    placeholder="010xxxx"
                                    className={`${getInputClass('TaiChinh.MaThue')} w-full pl-10 pr-4 py-2.5 rounded-lg border-gray-300 focus:ring-2 focus:ring-orange-200 focus:border-orange-500 outline-none transition-all`}
                                />
                            </div>
                            <ErrorMessage error={err?.['TaiChinh.MaThue']} />
                        </div>

                        {/* Box Ngân hàng - Style nổi bật hơn */}
                        <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100 dashed-border">
                            <div className="mb-3">
                                <label className="text-xs font-bold text-orange-800 uppercase mb-1 block">Số tài khoản</label>
                                <input
                                    type="text"
                                    value={DuLieu.TaiChinh.STK}
                                    onChange={(e) => handleChange('TaiChinh', 'STK', e.target.value.replace(/[^0-9]/g, ''))}
                                    placeholder="Số TK..."
                                    className={`${getInputClass('TaiChinh.STK')} w-full bg-white px-3 py-2 rounded border border-orange-200 text-sm focus:ring-2 focus:ring-orange-200 outline-none font-mono`}
                                />
                                <ErrorMessage error={err?.['TaiChinh.STK']} />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-orange-800 uppercase mb-1 block">Ngân hàng</label>
                                <input
                                    type="text"
                                    value={DuLieu.TaiChinh.NganHang}
                                    onChange={(e) => handleChange('TaiChinh', 'NganHang', e.target.value)}
                                    placeholder="VD: Vietcombank"
                                    className={`${getInputClass('TaiChinh.NganHang')} w-full bg-white px-3 py-2 rounded border border-orange-200 text-sm focus:ring-2 focus:ring-orange-200 outline-none`}
                                />
                                <ErrorMessage error={err?.['TaiChinh.NganHang']} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- GHI CHÚ (Full Width) --- */}
            <div className="mt-6 bg-white p-5 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100">
                 <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <i className="fa-solid fa-note-sticky text-yellow-500"></i>
                    Ghi chú nội bộ
                </label>
                <textarea
                    rows="2"
                    value={DuLieu.GhiChu}
                    onChange={(e) => handleChange(null, 'GhiChu', e.target.value)}
                    className={`${getInputClass('GhiChu')} w-full p-3 rounded-lg border border-gray-200 bg-yellow-50/30 focus:bg-white focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400 outline-none transition-all`}
                    placeholder="VD: Lưu ý khi giao nhận, thời gian làm việc..."
                ></textarea>
                <ErrorMessage error={err?.['GhiChu']} />
            </div>
        </div>

        {/* 3. FOOTER: Nút bấm nổi bật */}
        <div className="px-6 py-4 bg-white border-t border-gray-100 flex justify-end gap-4 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
            <button
                onClick={reset}
                className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
                <i className="fa-solid fa-rotate-left"></i> Làm mới
            </button>
            <button
                onClick={handleLuu}
                className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transform transition-all active:scale-95 flex items-center gap-2"
            >
                <i className="fa-regular fa-floppy-disk"></i>
                Lưu Nhà cung cấp
            </button>
        </div>
    </div>
</div>
    );
}
export default ThemCungCap;