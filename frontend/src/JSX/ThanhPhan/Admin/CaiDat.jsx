//Tạm thời hoàn thành chức năng cài đặt website cơ bản
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as fun from '../../../JS/FUNCTONS/function'; 
import * as ThongBao from '../../../JS/FUNCTONS/ThongBao';
import { useAppContext } from '../../../CONTEXT/TrangChuAdmin';
import { useAPIContext } from '../../../JS/API/API';

function CaiDat() {
    const { TTwebsite, GetTTwebsite } = useAppContext();
    const { CallAPI_file } = useAPIContext();
    const [value, setvalue] = useState({
        TenWebsite: "",
        Email: "",
        DiaChi: "",
        LinkFace: "",
        LinkIns: "",
        Zalo: ""
    });
    const [file, setfile] = useState([]); 
    const [previewURL, setPreviewURL] = useState(''); 
    const [err, seterr] = useState({}); 

    useEffect(() => {
        const loadData = async () => {
            await GetTTwebsite();
        };
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    useEffect(() => {
        if (TTwebsite) {
            setvalue({
                TenWebsite: TTwebsite.TenWebsite || "",
                Email: TTwebsite.Email || "",
                DiaChi: TTwebsite.DiaChi || "",
                LinkFace: TTwebsite.LinkFacebook || "",
                LinkIns: TTwebsite.LinkInstagram || "",
                Zalo: TTwebsite.Zalo || ""
            });
        }
    }, [TTwebsite]);

  
    useEffect(() => {
        return () => {
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }
        };
    }, [previewURL]);
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const selectedFile = files[0];
            setfile([selectedFile]);
            if (previewURL) URL.revokeObjectURL(previewURL);
            const url = URL.createObjectURL(selectedFile);
            setPreviewURL(url);
            seterr(prev => ({ ...prev, Logo: undefined }));
        } else {
            handleDeleteImage();
        }
    };
    const handleDeleteImage = () => {
        if (previewURL) URL.revokeObjectURL(previewURL);
        setfile([]);
        setPreviewURL('');
        const input = document.getElementById('logo-upload');
        if (input) input.value = ''; 
    };
    const Update = async () => {
        seterr({});
        //kiểm tra dữ liệu trước khi gửi lên server
        const ketquaRong = fun.KiemTraRong(value);
        if (!ketquaRong) {
            ThongBao.ThongBao_CanhBao('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }
        if (!fun.validatePhone(value.Zalo)) {
            seterr(prev => ({ ...prev, Zalo: 'Số điện thoại không hợp lệ!' }));
            ThongBao.ThongBao_CanhBao('Số điện thoại không hợp lệ!');
            return;
        }
        if(!fun.validateEmail(value.Email)) {
            seterr(prev => ({ ...prev, Email: 'Địa chỉ email không hợp lệ!' }));
            ThongBao.ThongBao_CanhBao('Địa chỉ email không hợp lệ!');
            return;
        }
        const ketqua = await CallAPI_file(value, file, { url: '/admin/updateWebsite' });
        if (ketqua.ThanhCong) {
            ThongBao.ThongBao_ThanhCong(ketqua.message);
            await GetTTwebsite();
            handleDeleteImage(); 
        }
        if (ketqua.Validate) {
            const newErrors = {};
            ketqua.errors.forEach(item => {
                let key = item.path;
                if (key.includes('Dulieu.')) {
                    key = key.split('.')[1];
                }
                if (key === 'images') {
                    key = 'Logo';
                }
                newErrors[key] = item.msg;
            });

            seterr(newErrors);
            ThongBao.ThongBao_CanhBao('Vui lòng kiểm tra lại thông tin nhập!');
        }
    };
    return (
        <section id="section-settings" className="section" aria-label="Cài đặt website">
            {/* --- Header --- */}
            <div className="flex items-center justify-between mb-6 mt-6 border-b pb-3 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Cài Đặt Website Cơ Bản</h2>
                <div className="flex gap-3">
                    <Link
                        to="/admin/CaiDat"
                        className="px-5 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold shadow-md transition flex items-center"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Quay lại
                    </Link>

                    <button
                        type="button"
                        onClick={Update}
                        className="px-5 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition flex items-center"
                    >
                        <i className="fas fa-save mr-2"></i> Lưu Cấu Hình
                    </button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-2xl border border-teal-100">
                
                {/* --- 1. Thông tin chung --- */}
                <h3 className="text-xl font-bold text-teal-700 pb-2 border-b border-gray-100">1. Thông tin Chung</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Tên Website */}
                    <div>
                        <label htmlFor="site-name" className="block text-sm font-medium text-gray-700 mb-2">
                            Tên Website <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="site-name"
                            value={value.TenWebsite}
                            type="text"
                            placeholder="Nhập tên website..."
                            className={`w-full p-3 rounded-lg transition border 
                                ${err.TenWebsite 
                                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                    : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"}`}
                            onChange={(e) =>{
                                setvalue(prev => ({ ...prev, TenWebsite: e.target.value }));
                                if (err.TenWebsite) {
                                    seterr(prev => ({ ...prev, TenWebsite: undefined }));
                                }
                            }}
                        />
                        {err.TenWebsite && <p className="text-red-500 text-sm mt-1">{err.TenWebsite}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Liên hệ <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="contact-email"
                            value={value.Email}
                            type="email"
                            placeholder="example@gmail.com"
                            className={`w-full p-3 border rounded-lg transition 
                            ${err.Email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"}`}
                            onChange={(e) => {
                                setvalue(prev => ({ ...prev, Email: e.target.value }));
                                if (err.Email) {
                                    seterr(prev => ({ ...prev, Email: undefined }));
                                }
                            }}
                        />
                         {err.Email && <p className="text-red-500 text-sm mt-1">{err.Email}</p>}
                    </div>

                    {/* Địa chỉ */}
                    <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                            Địa chỉ Trụ sở Chính <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="address"
                            value={value.DiaChi}
                            type="text"
                            placeholder="Số nhà, đường, phường/xã..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                            onChange={(e) => {
                                setvalue(prev => ({ ...prev, DiaChi: e.target.value }));
                                if (err.DiaChi) {
                                    seterr(prev => ({ ...prev, DiaChi: undefined }));
                                }
                            }}
                        />
                    </div>
                </div>

                {/* --- 2. Mạng xã hội --- */}
                <h3 className="text-xl font-bold text-teal-700 pb-2 border-b border-gray-100 mt-8">2. Liên kết Mạng xã hội</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Facebook */}
                    <div>
                        <label htmlFor="social-facebook" className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fab fa-facebook-square text-blue-600 mr-2"></i> Link Facebook <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="social-facebook"
                            value={value.LinkFace}
                            type="url"
                            placeholder="https://facebook.com/..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                            onChange={(e) => {
                                setvalue(prev => ({ ...prev, LinkFace: e.target.value }));
                                if (err.LinkFace) {
                                    seterr(prev => ({ ...prev, LinkFace: undefined }));
                                }
                            }}
                        />
                    </div>

                    {/* Instagram */}
                    <div>
                        <label htmlFor="social-instagram" className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fab fa-instagram text-pink-600 mr-2"></i> Link Instagram <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="social-instagram"
                            value={value.LinkIns}
                            type="url"
                            placeholder="https://instagram.com/..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                            onChange={(e) => {
                                setvalue(prev => ({ ...prev, LinkIns: e.target.value }));  
                                if (err.LinkIns) {
                                    seterr(prev => ({ ...prev, LinkIns: undefined }));
                                }
                            }}
                        />
                    </div>

                    {/* Zalo / Hotline */}
                    <div>
                        <label htmlFor="social-zalo" className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fas fa-phone-alt text-green-500 mr-2"></i> Hotline/Zalo <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="social-zalo"
                            value={value.Zalo}
                            type="text"
                            maxLength={10}
                            placeholder="0909xxxxxx"
                            className={`w-full p-3 border rounded-lg transition 
                                ${err.Zalo ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-teal-500 focus:border-teal-500"}`}
                            onChange={(e) => {
                                const onlyNumber = e.target.value.replace(/\D/g, "");
                                setvalue(prev => ({ 
                                     ...prev, 
                                    Zalo: onlyNumber 
                                }));
                                 if (err.Zalo) {
                                     seterr(prev => ({ ...prev, Zalo: undefined }));
                                }
                            }}
                        />
                        {err.Zalo && <p className="text-red-500 text-sm mt-1">{err.Zalo}</p>}
                    </div>

                    {/* --- Upload Logo --- */}
                    <div>
                        <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fas fa-image text-gray-500 mr-2"></i> Cập nhật Logo <span className="text-red-500">*</span>
                        </label>

                        <div className="flex items-start gap-4">
                            {/* Khu vực hiển thị ảnh Preview */}
                            {previewURL || TTwebsite?.LogoURL ? (
                                <div className="relative inline-block group shrink-0">
                                    <img
                                        src={previewURL || TTwebsite.LogoURL}
                                        alt="Logo Preview"
                                        className={`w-24 h-24 object-contain border rounded-lg p-1 shadow-sm bg-gray-50 
                                            ${err.Logo ? "border-red-500" : "border-gray-300"}`}
                                    />
                                    {/* Nút xóa ảnh đang chọn */}
                                    {previewURL && (
                                        <button
                                            type="button"
                                            onClick={handleDeleteImage}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:bg-red-600 transition-colors z-10"
                                            title="Hủy chọn ảnh này"
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className={`w-24 h-24 border border-dashed rounded-lg flex items-center justify-center bg-gray-50 shrink-0
                                    ${err.Logo ? "border-red-500 bg-red-50" : "border-gray-300"}`}>
                                    <span className="text-xs text-gray-400 text-center px-1">Chưa có Logo</span>
                                </div>
                            )}

                            {/* Khu vực Input File */}
                            <div className="flex-1">
                                <input
                                    type="file"
                                    id="logo-upload"
                                    className={`block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-teal-50 file:text-teal-700
                                        hover:file:bg-teal-100 cursor-pointer
                                        ${err.Logo ? "border border-red-500 rounded-lg p-1" : ""}`}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                
                                {/* Hiển thị lỗi Logo (tương ứng với key: images) */}
                                {err.Logo && (
                                    <p className="text-red-500 text-sm mt-2 font-medium">
                                        <i className="fas fa-exclamation-triangle mr-1"></i> {err.Logo}
                                    </p>
                                )}
                                
                                <p className="text-xs text-gray-500 mt-1">Định dạng: JPG, PNG. Tối đa 2MB.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CaiDat;