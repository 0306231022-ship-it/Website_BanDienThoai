import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';
import * as API from '../../../../JS/API/API';
import * as fun from '../../../../JS/FUNCTONS/function';
import * as ThongBao from '../../../../JS/FUNCTONS/ThongBao';
import { useADContext } from '../../../../CONTEXT/QuanLiCaNhanAdmin';
function ThemPhieuNhap() {
    const { id } = useParams();
    const [errID, seterrID] = useState('')

    const { GetTTCaNhan, TTCaNhan } = useADContext();
    const [danhSachNhaCungCap, setDanhSachNhaCungCap] = useState([]);
    const [danhSachThuongHieu, setDanhSachThuongHieu] = useState([]);
    const [err, setErr] = useState('');
    const [errors, seterr] = useState({})
    const [loading, setLoading] = useState(false);
    const [previewUrls, setPreviewUrls] = useState([]);
    const fileInputRef = useRef(null);
    const [thongTinPhieu, setThongTinPhieu] = useState({
        NhaCungCap: '',
        GhiChu: '',
        DaThanhToan: 0
    });
    const [bangSanPham, setBangSanPham] = useState([]);
    const initialProductState = {
        TenSanPham: '',
        ThuongHieu: '',
        DongMay: '',
        GiaNhap: '',
        GiaDuKien: '',
        SoLuong: 1,
        DanhSachIMEI: '',
        ThongSoKyThuat: {
            HeDieuHanh: '',
            ManHinh: '',
            Ram: '',
            BoNhoTrong: '',
            Pin: '',
            MauSac: '',
            MoTa: ''
        },
        HinhAnh: []
    };
    const [sanPhamForm, setSanPhamForm] = useState(initialProductState);
    const navigate = useNavigate();
    const [errValidate, setErrValidate] = useState([]);

    useEffect(() => {
        GetTTCaNhan();
        setLoading(true);
        const LayDL = async () => {
            try {
                const [KetQuaThuongHieu, ketQuaNhaCungCap] = await Promise.all([
                    API.CallAPI(undefined, { url: '/admin/laythuonghieu', PhuongThuc: 2 }),
                    API.CallAPI(undefined, { url: '/admin/laynhacchoatdong', PhuongThuc: 2 }),
                ]);
                if (KetQuaThuongHieu.ThanhCong) setDanhSachThuongHieu(KetQuaThuongHieu.DuLieu);
                if (ketQuaNhaCungCap.ThanhCong) setDanhSachNhaCungCap(ketQuaNhaCungCap.DuLieu);

            } catch (error) {
                setErr('Đã có lỗi xảy ra! Vui lòng thực hiện sau.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        LayDL();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const kiemtra = async () => {
            if (id) {
                try {
                    const kiemtra = await API.CallAPI(undefined, { PhuongThuc: 2, url: `/admin/kiemtra_id_ncc?id=${id}` });
                    if (kiemtra.kiemtra) {
                        setLoading(false)
                        setThongTinPhieu((prev) => {
                            return {
                                ...prev,
                                NhaCungCap: id
                            }
                        })
                    } else {
                        seterrID('ID nhà cung cập không tồn tại, hoặc đã ngừng hoạt đông!')
                    }
                } catch (error) {
                    console.error('lỗi sãy ra :' + error)
                }
            }
        };
        kiemtra();
    }, [id])

    const ReSetPhieu = () => {
        setThongTinPhieu({
            NhaCungCap: id || '',
            GhiChu: '',
            DaThanhToan: 0
        });
        seterr({});
    }

    const ResetSanPham = () => {
        setSanPhamForm(initialProductState);
        setPreviewUrls([]);
    }

    const ThemHinhAnh = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const HinhAnh = [
                ...sanPhamForm.HinhAnh,
                ...files
            ];
            setSanPhamForm(prev => ({
                ...prev,
                HinhAnh: HinhAnh
            }));
            const TaoAnhTam = files.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => [
                ...prev,
                ...TaoAnhTam
            ]);
        }
        e.target.value = '';
    };

    const xOAaNH = (ID) => {
        setSanPhamForm(prev => ({
            ...prev,
            HinhAnh: prev.HinhAnh.filter((_, index) => index !== ID)
        }));
        URL.revokeObjectURL(previewUrls[ID]);
        setPreviewUrls(prev => prev.filter((_, index) => index !== ID));
    };

    const ThemVaoBangTam = async () => {
        try {
            let tempErrors = {};
            const checkPhieu = await fun.KiemTraRong(thongTinPhieu);
            if (!checkPhieu.Status) {
                checkPhieu.ErrorKeys.forEach((item) => {
                    tempErrors[item] = 'Vui lòng nhập thông tin!';
                });
            }
            const { HinhAnh, ...newProductState } = sanPhamForm;
            const checkSP = await fun.KiemTraRong(newProductState);
            if (!checkSP.Status) {
                checkSP.ErrorKeys.forEach((item) => {
                    tempErrors[item] = 'Vui lòng nhập thông tin!';
                });
            }
            if (sanPhamForm.HinhAnh.length === 0) {
                tempErrors['HinhAnh'] = 'Vui lòng chọn hình ảnh!';
            }
            if (Object.keys(tempErrors).length > 0) {
                seterr(tempErrors);
                return;
            }
            seterr({});

            const imeiArray = sanPhamForm.DanhSachIMEI
                ? sanPhamForm.DanhSachIMEI.split('\n').map(i => i.trim()).filter(i => i !== '')
                : [];

            const newItem = {
                ...sanPhamForm,
                id: Date.now(),
                parsedIMEI: imeiArray,
                ThanhTien: parseInt(sanPhamForm.GiaNhap || 0) * parseInt(sanPhamForm.SoLuong || 1),
                previewUrlsBackup: [...previewUrls]
            };
            setBangSanPham(prev => {
                const newData = [...prev, newItem];
                ThongBao.ThongBao_ThanhCong("Thêm sản phẩm thành công!");
                return newData;
            });
            ResetSanPham();

        } catch (error) {
            console.error("Lỗi:", error);
        }
    };

    const getInputClass = (errorKey) => {
        const hasError = errors?.[errorKey];
        return `w-full border-gray-300 rounded-md shadow-sm border p-2 focus:ring-blue-500 ${hasError
                ? 'border-red-500 ring-2 ring-red-100 text-red-900 placeholder-red-300'
                : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 hover:border-gray-300'
            }`;
    };

    const ErrorMessage = ({ error }) => {
        if (!error) return null;
        return (
            <p className="text-red-500 text-[11px] mt-1 flex items-center gap-1 font-medium animate-pulse">
                <i className="fa-solid fa-circle-exclamation"></i> {error}
            </p>
        );
    };

    const XemChiTiet = (item) => {
        setSanPhamForm({
            ...item,
            DanhSachIMEI: item.parsedIMEI ? item.parsedIMEI.join('\n') : '',
        });
        setPreviewUrls(item.previewUrlsBackup || []);
        setBangSanPham(prev => prev.filter(sp => sp.id !== item.id));
        seterr({});
    }

    const formatCurrency = (value) => {
        if (!value) return '0 ₫';
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    const handlePhieuChange = (field, value) => {
        setThongTinPhieu(prev => ({ ...prev, [field]: value }));
    };

    const handleProductChange = (field, value) => {
        setSanPhamForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSpecChange = (field, value) => {
        setSanPhamForm(prev => ({
            ...prev,
            ThongSoKyThuat: { ...prev.ThongSoKyThuat, [field]: value }
        }));
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const XoaKhoiBang = async (id) => {
        const kiemtra = await ThongBao.ThongBao_XacNhanTT('Bạn có chắc chắn xóa sản phẩm này không?');
        if (!kiemtra) return;
        setBangSanPham(prev => {
            const newData = prev.filter(item => item.id !== id);
            ThongBao.ThongBao_ThanhCong('Bạn đã xóa sản phẩm thành công!');
            return newData;
        });
    };

    const HoanTatNhapKho = async (CheDo) => {
        if (!bangSanPham || bangSanPham.length === 0) {
            ThongBao.ThongBao_CanhBao('Vui lòng thêm sản phẩm vào bảng tạm trước!');
            return;
        }
        setLoading(true);
        try {
            const DuLieu = {
                ThongTinChung: {
                    IDNCC: thongTinPhieu.NhaCungCap,
                    IDND: TTCaNhan?.IDND,
                    GHICHU: thongTinPhieu.GhiChu,
                    CheDoLuu: CheDo,
                    THANHTOAN: {
                        TONGTIEN: tongTienHang,
                        DA_THANHTOAN: thongTinPhieu.DaThanhToan,
                    }
                },
                SANPHAM: bangSanPham.map(sp => ({
                    TENSP: sp.TenSanPham,
                    HANG: sp.ThuongHieu,
                    DONGMAY: sp.DongMay,
                    GIANHAP: sp.GiaNhap,
                    GIABAN: sp.GiaDuKien,
                    SOLUONG: sp.SoLuong,
                    THONGSO_KYTHUAT: {
                        HEDIEUHANH: sp.ThongSoKyThuat.HeDieuHanh,
                        MANHINH: sp.ThongSoKyThuat.ManHinh,
                        RAM: sp.ThongSoKyThuat.Ram,
                        BONHOTRONG: sp.ThongSoKyThuat.BoNhoTrong,
                        PIN: sp.ThongSoKyThuat.Pin,
                        MAUSAC: sp.ThongSoKyThuat.MauSac
                    },
                    MOTASP: sp.ThongSoKyThuat.MoTa,
                    IMEI: sp.parsedIMEI,
                    SO_LUONG_ANH: sp.HinhAnh.length
                })),
                
            };

            const formdata = new FormData();
            formdata.append('DuLieu', JSON.stringify(DuLieu));
            bangSanPham.forEach((sp , index) => {
                if (sp.HinhAnh && sp.HinhAnh.length > 0) {
                    sp.HinhAnh.forEach(file => {
                        formdata.append(`HinhAnh[${index}]`, file);
                    });
                }
            });

            const ketqua = await API.CallAPI(formdata, {
                PhuongThuc: 1,
                url: '/admin/ThemPhieuNhap'
            });
            if (ketqua.Validate) {
                setErrValidate(ketqua.errors.map(err => err.msg));
                ThongBao.ThongBao_Loi('Dữ liệu nhập kho không hợp lệ, vui lòng kiểm tra lại ở đầu trang!');
                return;
            }
            if(ketqua.status){
                ThongBao.ThongBao_Loi(ketqua.message);
                return;
            }
            if (ketqua.ThanhCong) {
                ThongBao.ThongBao_ThanhCong(ketqua.message);
                return;
            } else {
                ThongBao.ThongBao_Loi(ketqua.message || 'Có lỗi xảy ra');
                return;
            }
        } catch (error) {
            console.error('Lỗi nhập kho:', error);
            ThongBao.ThongBao_Loi('Đã xảy ra lỗi vui lòng thực hiện sau.');
        } finally {
            setLoading(false);
        }
    };

    const tongTienHang = useMemo(() => {
        return bangSanPham.reduce((total, item) => total + item.ThanhTien, 0);
    }, [bangSanPham]);

    const conNoNCC = tongTienHang - thongTinPhieu.DaThanhToan;

    if (loading && bangSanPham.length === 0)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="relative text-center">
                    <i className="fa-solid fa-circle-notch text-6xl text-teal-600 animate-spin"></i>
                    <p className="mt-4 text-gray-500 font-bold uppercase">Đang tải dữ liệu...</p>
                </div>
            </div>);

    if (err) return (<div className="text-center p-10 text-red-500 font-bold">{err}</div>);

    if (errID) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 text-center">
                <div className="bg-red-50 p-8 rounded-3xl border border-red-100 shadow-xl max-w-md">
                    <i className="fa-solid fa-triangle-exclamation text-7xl text-red-500 mb-6"></i>
                    <h3 className="text-xl font-extrabold text-gray-800 mb-2">Đã xảy ra lỗi!</h3>
                    <p className="text-red-600 font-medium mb-6">{errID}</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-bold">Thử lại</button>
                        <button onClick={() => window.history.back()} className="px-6 py-2.5 bg-white text-gray-600 border border-gray-200 rounded-xl font-bold">Quay lại</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        
        <div className="max-w-7xl mx-auto p-4 md:p-8 pb-32">
            {
                errValidate.length > 0 && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h3 className="text-red-600 font-bold mb-2 flex items-center gap-2">
                            <i className="fa-solid fa-circle-exclamation"></i> Lỗi xác thực dữ liệu:
                        </h3>
                        <ul className="list-disc list-inside text-red-500">
                            {errValidate.map((errMsg, index) => (
                                <li key={index}>{errMsg}</li>
                            ))}
                        </ul>
                    </div>
                )
            }
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700 uppercase">
                    <i className="fa-solid fa-boxes-packing mr-2"></i> Phiếu Nhập Kho
                </h1>
                <button onClick={() => navigate(-1)} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded shadow transition">
                    <i className="fa-solid fa-arrow-left"></i> Quay lại
                </button>
            </div>

            {/* --- 1. Thông tin chung --- */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-blue-600">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">1. Thông tin chung</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nhà cung cấp <span className="text-red-500">*</span></label>
                        <select value={thongTinPhieu.NhaCungCap}
                            onChange={(e) => handlePhieuChange('NhaCungCap', e.target.value)}
                            className={getInputClass('NhaCungCap')}
                            disabled={!!id}>
                            <option value="">-- Chọn nhà cung cấp --</option>
                            {danhSachNhaCungCap.map((item) => (
                                <option key={item.IDNCC} value={item.IDNCC}>{item.TENNCC}</option>
                            ))}
                        </select>
                        <ErrorMessage error={errors.NhaCungCap} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nhân viên nhập</label>
                        <input type="text" value={TTCaNhan?.HOTEN || ''} readOnly className="w-full bg-gray-100 border-gray-300 rounded-md p-2 text-gray-500 cursor-not-allowed border" />
                    </div>
                    <div className="col-span-1 md:col-span-4 mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú phiếu nhập</label>
                        <textarea rows="2" value={thongTinPhieu.GhiChu} onChange={(e) => handlePhieuChange('GhiChu', e.target.value)} className={getInputClass('GhiChu')} placeholder="Ghi chú nhập hàng..." ></textarea>
                    </div>
                </div>
                <div className='flex justify-end mt-4'>
                    <button onClick={ReSetPhieu} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded shadow transition flex items-center gap-2">
                        <i className="fa-solid fa-arrows-rotate"></i>Làm mới
                    </button>
                </div>
            </div>

            {/* --- 2. Form Nhập Sản Phẩm --- */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-green-600">
                <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">2. Nhập chi tiết điện thoại</h2>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm <span className="text-red-500">*</span></label>
                            <input type="text" value={sanPhamForm.TenSanPham} onChange={(e) => handleProductChange('TenSanPham', e.target.value)} className={getInputClass('TenSanPham')} placeholder="VD: iPhone 15" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hãng <span className="text-red-500">*</span></label>
                                <select value={sanPhamForm.ThuongHieu} onChange={(e) => handleProductChange('ThuongHieu', e.target.value)} className={getInputClass('ThuongHieu')}>
                                    <option value="">-- Chọn --</option>
                                    {danhSachThuongHieu.map((item) => (
                                        <option key={item.IDTHUONGHIEU} value={item.IDTHUONGHIEU}>{item.TENTHUONGHIEU}</option>
                                    ))}
                                </select>
                                <ErrorMessage error={errors.ThuongHieu} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Dòng máy</label>
                                <input type="text" value={sanPhamForm.DongMay} onChange={(e) => handleProductChange('DongMay', e.target.value)} className={getInputClass('DongMay')} placeholder="VD: Series 15" />
                            </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded border border-gray-200">
                            <div className="mb-3">
                                <label className="block text-sm font-medium text-gray-700">Giá nhập (VNĐ) <span className="text-red-500">*</span></label>
                                <input type="text" value={sanPhamForm.GiaNhap} onChange={(e) => handleProductChange('GiaNhap', e.target.value.replace(/[^0-9]/g, ''))} className={getInputClass('GiaNhap')} placeholder="0" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Giá bán dự kiến</label>
                                <input type="text" value={sanPhamForm.GiaDuKien} onChange={(e) => handleProductChange('GiaDuKien', e.target.value.replace(/[^0-9]/g, ''))} className={getInputClass('GiaDuKien')} placeholder="0" />
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-5 space-y-4">
                        <label className="block text-sm font-medium text-gray-700 border-b w-max border-gray-300">Thông số kỹ thuật</label>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { field: 'HeDieuHanh', label: 'Hệ điều hành' },
                                { field: 'ManHinh', label: 'Màn Hình' },
                                { field: 'Ram', label: 'RAM' },
                                { field: 'BoNhoTrong', label: 'Bộ nhớ trong' },
                                { field: 'Pin', label: 'Pin' },
                                { field: 'MauSac', label: 'Màu sắc' }].map(({ field, label }) => (
                                    <div key={field}>
                                        <label className="text-xs text-gray-500">{label}</label>
                                        <input type="text" value={sanPhamForm.ThongSoKyThuat[field]} onChange={(e) => handleSpecChange(field, e.target.value)} className={getInputClass(`ThongSoKyThuat.${field}`)} />
                                    </div>
                                ))}
                        </div>
                        <textarea rows="2" value={sanPhamForm.ThongSoKyThuat.MoTa} onChange={(e) => handleSpecChange('MoTa', e.target.value)} className={getInputClass('ThongSoKyThuat.MoTa')} placeholder="Mô tả sản phẩm..."></textarea>

                        <div className="border-t pt-2">
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-gray-700">Hình ảnh sản phẩm</label>
                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{sanPhamForm.HinhAnh.length} ảnh đã chọn</span>
                            </div>
                            <input type="file" ref={fileInputRef} onChange={ThemHinhAnh} className="hidden" multiple accept="image/*" />

                            <div className="border-2 border-gray-300 border-dashed rounded-md p-2">
                                {previewUrls.length > 0 ? (
                                    <div className="grid grid-cols-4 gap-2 mb-2">
                                        {previewUrls.map((url, index) => (
                                            <div key={index} className="relative group aspect-square">
                                                <img src={url} alt="" className="w-full h-full object-cover rounded border" />
                                                <button onClick={() => xOAaNH(index)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        ))}
                                        <div onClick={triggerFileInput} className="flex items-center justify-center border-2 border-dashed rounded aspect-square cursor-pointer hover:bg-gray-50 text-gray-400">
                                            <i className="fa-solid fa-plus text-xl"></i>
                                        </div>
                                    </div>
                                ) : (
                                    <div onClick={triggerFileInput} className="py-4 text-center cursor-pointer hover:bg-gray-50 rounded">
                                        <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400"></i>
                                        <p className="text-xs text-gray-500 mt-1">Click tải lên (Nhiều ảnh)</p>
                                    </div>
                                )}
                            </div>
                            <ErrorMessage error={errors.HinhAnh} />
                        </div>
                    </div>

                    <div className="md:col-span-3 bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col">
                        <h3 className="font-bold text-blue-800 mb-3"><i className="fa-solid fa-barcode mr-1"></i> Kho & IMEI</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700">Số lượng nhập <span className="text-red-500">*</span></label>
                            <input type="number" min="1"
                                value={sanPhamForm.SoLuong}
                                onChange={(e) => handleProductChange('SoLuong', e.target.value.replace(/[^0-9]/g, ''))}
                                className="mt-1 w-full border-2 border-blue-300 rounded-md p-2 text-center text-xl font-bold text-blue-700" />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Danh sách IMEI</label>
                            <textarea
                                value={sanPhamForm.DanhSachIMEI}
                                onChange={(e) => handleProductChange('DanhSachIMEI', e.target.value)}
                                className="flex-1 w-full border border-gray-300 rounded-md p-2 font-mono text-sm bg-white"
                                placeholder="Mỗi dòng 1 mã..."></textarea>
                        </div>
                        <button onClick={ThemVaoBangTam} className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded shadow gap-2 flex items-center justify-center transition-all active:scale-95">
                            <i className="fa-solid fa-plus-circle"></i> Thêm vào phiếu
                        </button>
                    </div>
                </div>
                <div className='flex justify-end mt-3'>
                    <button onClick={ResetSanPham} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded shadow transition flex items-center gap-2">
                        <i className="fa-solid fa-arrows-rotate"></i>Làm mới
                    </button>
                </div>
            </div>

            {/* --- 3. Danh sách hàng chờ --- */}
            <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-700">3. Danh sách hàng chờ nhập</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Tổng SP: {bangSanPham.length}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-3">STT</th>
                                <th className="px-6 py-3">Sản phẩm & Hình ảnh</th>
                                <th className="px-6 py-3">Thông số</th>
                                <th className="px-6 py-3 text-center">SL</th>
                                <th className="px-6 py-3">Giá nhập</th>
                                <th className="px-6 py-3">Thành tiền</th>
                                <th className="px-6 py-3 text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bangSanPham.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-6 text-gray-400 italic">Chưa có sản phẩm nào.</td></tr>
                            ) : (
                                bangSanPham.map((item, index) => (
                                    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            <div className="flex items-start gap-3">
                                                <div className="relative flex-shrink-0">
                                                    {item.previewUrlsBackup && item.previewUrlsBackup.length > 0 ? (
                                                        <img src={item.previewUrlsBackup[0]} alt="" className="w-14 h-14 object-cover rounded border" />
                                                    ) : (
                                                        <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center"><i className="fa-regular fa-image text-gray-400"></i></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-blue-700 font-semibold">{item.TenSanPham}</div>
                                                    <div className="text-xs text-gray-400">{item.ThuongHieu}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            {item.ThongSoKyThuat.Ram} / {item.ThongSoKyThuat.BoNhoTrong} ({item.ThongSoKyThuat.MauSac})
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold">{item.SoLuong}</td>
                                        <td className="px-6 py-4">{formatCurrency(item.GiaNhap)}</td>
                                        <td className="px-6 py-4 font-bold text-gray-900">{formatCurrency(item.ThanhTien)}</td>
                                        <td className="px-6 py-4 text-center flex gap-2 justify-center">
                                            <button onClick={() => XemChiTiet(item)} className="text-green-500 p-2"><i className="fas fa-edit"></i></button>
                                            <button onClick={() => XoaKhoiBang(item.id)} className="text-red-500 p-2"><i className="fa-regular fa-trash-can"></i></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- Footer Sticky --- */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-t border-gray-200 sticky bottom-0 z-20">
                <div className="flex flex-col md:flex-row justify-end items-end gap-6">
                    <div className="w-full md:w-1/3 space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Tổng tiền hàng:</span>
                            <span className="font-bold text-lg text-blue-800">{formatCurrency(tongTienHang)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-700">Đã thanh toán:</label>
                            <input
                                type="text"
                                className="w-40 border border-gray-300 rounded p-1 text-right focus:ring-blue-500 font-medium"
                                value={thongTinPhieu.DaThanhToan === 0 ? '' : thongTinPhieu.DaThanhToan}
                                onChange={(e) => handlePhieuChange('DaThanhToan', e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="0"
                            />
                        </div>
                        <div className="flex justify-between text-lg font-bold text-red-600 border-t pt-2">
                            <span>Còn nợ NCC:</span>
                            <span>{formatCurrency(conNoNCC > 0 ? conNoNCC : 0)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button onClick={() => { HoanTatNhapKho(0) }} className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded shadow transition">
                            LƯU BẢN NHÁP
                        </button>
                        <button onClick={() => { HoanTatNhapKho(1) }} className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded shadow transition">
                            HOÀN TẤT NHẬP KHO
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThemPhieuNhap;