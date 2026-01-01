import { useState } from "react";
import * as fun from '../../../../JS/FUNCTONS/function';
import * as API from '../../../../JS/API/API';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';

function ThemCungCap() {
    const [DuLieu, setDuLieu] = useState({
        DinhDanh: { MaDinhDanh: '', TenNhaCungCap: '' },
        NguoiLienHe: { TenNguoiDung: '', SDT: '', Email: '', DiaChiKho: '' },
        TaiChinh: { MaThue: '', STK: '', NganHang: '' },
        GhiChu: ''
    });
    const [err, seterr] = useState(null);
    const [loading, setloading] = useState(false);
    const [errHT, seterrHT] = useState('');

    const handleChange = (section, key, value) => {
        setDuLieu((prev) => {
            if (section) {
                return { ...prev, [section]: { ...prev[section], [key]: value } };
            }
            return { ...prev, [key]: value };
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
        seterr(null);
    };

    const handleLuu = async () => {
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
        const formData = fun.objectToFormData(DuLieu);
        try {
            const ketqua = await API.CallAPI(formData, { url: '/admin/Themcc', PhuongThuc: 1 });
            if (ketqua.Status) {
                seterrHT(ketqua.message);
                return;
            };
            if (ketqua.Validate) {
                const errorsFromServer = {};
                ketqua.errors.forEach(Err => {
                    errorsFromServer[Err.path] = Err.msg;
                });
                seterr(errorsFromServer);
                return;
            }
            if (ketqua.ThanhCong) {
                ThongBao.ThongBao_ThanhCong(ketqua.message);
                return;
            } else {
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

    const ErrorMessage = ({ error }) => {
        if (!error) return null;
        return (
            <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1 font-medium animate-pulse">
                <i className="fa-solid fa-circle-exclamation"></i> {error}
            </p>
        );
    };

    const getInputClass = (errorKey) => {
        const hasError = err?.[errorKey];
        return `w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl outline-none transition-all text-sm font-medium ${
            hasError
                ? 'border-red-500 ring-2 ring-red-100 text-red-900 placeholder-red-300'
                : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 hover:border-gray-300'
        }`;
    };

    // --- RENDER GIAO DIỆN ---
    // Lưu ý: Không còn thẻ bao fixed inset-0 nữa
    return (
        <div className="flex flex-col h-full bg-gray-50/30">
            
            {/* PHẦN NỘI DUNG FORM (Có thanh cuộn) */}
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                
                {/* Error Banner nếu có lỗi hệ thống */}
                {errHT && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700 animate-fadeIn">
                        <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                        <span className="font-medium">{errHT}</span>
                        <button onClick={() => seterrHT('')} className="ml-auto hover:bg-red-100 p-1 rounded-full"><i className="fa-solid fa-xmark"></i></button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* --- CỘT 1: ĐỊNH DANH --- */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>
                            <h4 className="font-bold text-gray-800 text-sm uppercase">Thông tin cơ bản</h4>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block ml-1">Tên nhà cung cấp <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa-solid fa-building"></i></span>
                                    <input
                                        type="text"
                                        placeholder="Công ty TNHH ABC..."
                                        value={DuLieu.DinhDanh.TenNhaCungCap}
                                        onChange={(e) => handleChange('DinhDanh', 'TenNhaCungCap', e.target.value)}
                                        className={getInputClass('DinhDanh.TenNhaCungCap')}
                                    />
                                </div>
                                <ErrorMessage error={err?.['DinhDanh.TenNhaCungCap']} />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block ml-1">Mã viết tắt (Tag)</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa-solid fa-tag"></i></span>
                                    <input
                                        type="text"
                                        placeholder="ABC"
                                        value={DuLieu.DinhDanh.MaDinhDanh}
                                        onChange={(e) => handleChange('DinhDanh', 'MaDinhDanh', e.target.value.toUpperCase())}
                                        className={`${getInputClass('DinhDanh.MaDinhDanh')} uppercase font-bold text-blue-600`}
                                    />
                                    {
                                        err ? (
                                            <ErrorMessage error={err?.['DinhDanh.MaDinhDanh']} />
                                        ) :(
                                            <p className="text-[10px] text-gray-400 mt-1 ml-1">Dùng để in tem hoặc mã vạch nội bộ</p>
                                        )
                                    }

                                    
                                </div>
                              
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block ml-1">Ghi chú</label>
                                <textarea
                                    rows="3"
                                    placeholder="Lưu ý khi nhập hàng..."
                                    value={DuLieu.GhiChu}
                                    onChange={(e) => handleChange(null, 'GhiChu', e.target.value)}
                                   className={getInputClass('GhiChu')}
                                ></textarea>
                                <ErrorMessage error={err?.['GhiChu']} />

                            </div>
                        </div>
                    </div>

                    {/* --- CỘT 2: LIÊN HỆ --- */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                            <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">2</span>
                            <h4 className="font-bold text-gray-800 text-sm uppercase">Thông tin liên hệ</h4>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block ml-1">Số điện thoại <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa-solid fa-phone"></i></span>
                                    <input
                                        type="tel"
                                        maxLength={10}
                                        placeholder="0912..."
                                        value={DuLieu.NguoiLienHe.SDT}
                                        onChange={(e) => handleChange('NguoiLienHe', 'SDT', e.target.value.replace(/[^0-9]/g, ''))}
                                        className={getInputClass('NguoiLienHe.SDT')}
                                    />
                                </div>
                                <ErrorMessage error={err?.['NguoiLienHe.SDT']} />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block ml-1">Người đại diện</label>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa-solid fa-user"></i></span>
                                        <input
                                            type="text"
                                            placeholder="Nguyễn Văn A"
                                            value={DuLieu.NguoiLienHe.TenNguoiDung}
                                            onChange={(e) => handleChange('NguoiLienHe', 'TenNguoiDung', e.target.value)}
                                            className={getInputClass('NguoiLienHe.TenNguoiDung')}
                                        />
                                          <ErrorMessage error={err?.['NguoiLienHe.TenNguoiDung']} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block ml-1">Email</label>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa-solid fa-envelope"></i></span>
                                        <input
                                            type="email"
                                            placeholder="email@domain.com"
                                            value={DuLieu.NguoiLienHe.Email}
                                            onChange={(e) => handleChange('NguoiLienHe', 'Email', e.target.value)}
                                            className={getInputClass('NguoiLienHe.Email')}
                                        />
                                    </div>
                                    <ErrorMessage error={err?.['NguoiLienHe.Email']} />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block ml-1">Địa chỉ kho/Văn phòng</label>
                                <textarea
                                    rows="2"
                                    placeholder="Số 123 đường ABC..."
                                    value={DuLieu.NguoiLienHe.DiaChiKho}
                                    onChange={(e) => handleChange('NguoiLienHe', 'DiaChiKho', e.target.value)}
                                     className={getInputClass('NguoiLienHe.DiaChiKho')}
                                ></textarea>
                                <ErrorMessage error={err?.['NguoiLienHe.DiaChiKho']} />
                            </div>
                        </div>
                    </div>

                    {/* --- CỘT 3: TÀI CHÍNH --- */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                            <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">3</span>
                            <h4 className="font-bold text-gray-800 text-sm uppercase">Tài chính & Thuế</h4>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block ml-1">Mã số thuế</label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa-solid fa-file-invoice"></i></span>
                                    <input
                                        type="text"
                                        placeholder="010xxxx"
                                        value={DuLieu.TaiChinh.MaThue}
                                        onChange={(e) => handleChange('TaiChinh', 'MaThue', e.target.value)}
                                        className={getInputClass('TaiChinh.MaThue')}
                                    />
                                     <ErrorMessage error={err?.['TaiChinh.MaThue']} />
                                </div>
                            </div>

                            {/* Banking Box */}
                            <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                                
                                <h5 className="font-bold text-gray-700 text-xs uppercase mb-3 flex items-center gap-2">
                                    <i className="fa-solid fa-building-columns text-orange-500"></i> Ngân hàng
                                </h5>
                                
                                <div className="space-y-3">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Tên ngân hàng (VCB, MB...)"
                                            value={DuLieu.TaiChinh.NganHang}
                                            onChange={(e) => handleChange('TaiChinh', 'NganHang', e.target.value)}
                                             className={getInputClass('TaiChinh.NganHang')}
                                        />
                                        <ErrorMessage error={err?.['TaiChinh.NganHang']} />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Số tài khoản"
                                            value={DuLieu.TaiChinh.STK}
                                            onChange={(e) => handleChange('TaiChinh', 'STK', e.target.value.replace(/[^0-9]/g, ''))}
                                            className={getInputClass('TaiChinh.STK')} />
                                        <ErrorMessage error={err?.['TaiChinh.STK']} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PHẦN FOOTER CỐ ĐỊNH BÊN DƯỚI */}
            <div className="px-6 py-4 border-t border-gray-200 bg-white mt-auto flex justify-between items-center z-10">
                 <button
                    onClick={reset}
                    className="px-5 py-2.5 rounded-xl text-gray-500 font-bold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                    <i className="fa-solid fa-rotate-right"></i> Làm mới
                </button>

                <div className="flex gap-3">
                    <button
                        onClick={handleLuu}
                        disabled={loading}
                        className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transform transition-all active:scale-95 flex items-center gap-2 text-sm disabled:opacity-70 disabled:cursor-wait"
                    >
                        {loading ? (
                            <> <i className="fa-solid fa-circle-notch animate-spin"></i> Đang xử lý... </>
                        ) : (
                            <> <i className="fa-solid fa-floppy-disk"></i> Lưu Nhà Cung Cấp </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ThemCungCap;