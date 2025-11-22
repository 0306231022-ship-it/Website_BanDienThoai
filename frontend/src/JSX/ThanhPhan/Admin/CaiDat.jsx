//Tạm thời hoàn tất
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as fun from '../../../JS/FUNCTONS/function';
import * as ThongBao from '../../../JS/FUNCTONS/ThongBao';
import * as API from '../../../JS/API/API';
import { useAppContext } from '../../../CONTEXT/TrangChuAdmin';
function CaiDat() {
    const { TTwebsite, GetTTwebsite } = useAppContext();
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
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const selectedFile = files[0];
            setfile([selectedFile]);
            const url = URL.createObjectURL(selectedFile);
            setPreviewURL(url);
        } else {
            setfile([]);
            setPreviewURL('');
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
        const kiemtra = await fun.KiemTraRong(value);
        if (!kiemtra) {
            ThongBao.ThongBao_CanhBao('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        if (!file || file.length === 0) {
            ThongBao.ThongBao_CanhBao('Vui lòng chọn logo!');
            return;
        }
        const ketqua = await API.CallAPI_file(value, file, { DiaChi: 6 });
        if (ketqua.ThanhCong) {
            ThongBao.ThongBao_ThanhCong(ketqua.message);
        } else {
            ThongBao.ThongBao_Loi(ketqua.message);
        }
    };
    return (
        <section id="section-settings" className="section" aria-label="Cài đặt website">
            <div className="flex items-center justify-between mb-6 mt-6 border-b pb-3 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Cài Đặt Website Cơ Bản</h2>
                <div className="flex gap-3">
                    <Link
                        to="/admin/xemThongTin"
                        type="button"
                        className="px-5 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold shadow-md transition"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Quay lại
                    </Link>

                    <button
                        type="button"
                        onClick={Update}
                        className="px-5 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-semibold shadow-md transition"
                        aria-label="Lưu cấu hình"
                    >
                        <i className="fas fa-save mr-2"></i> Lưu Cấu Hình
                    </button>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-2xl border border-teal-100">
                <h3 className="text-xl font-bold text-teal-700 pb-2 border-b border-gray-100">1. Thông tin Chung</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="site-name" className="block text-sm font-medium text-gray-700 mb-2">
                            Tên Website <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={value.TenWebsite}
                            type="text"
                            id="site-name"
                            placeholder={`ví dụ ${value.TenWebsite}`}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                            onChange={(e) => setvalue({ ...value, TenWebsite: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Liên hệ <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={value.Email}
                            type="email"
                            id="contact-email"
                            placeholder={`ví dụ ${value.Email}`}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                            onChange={(e) => setvalue({ ...value, Email: e.target.value })}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                            Địa chỉ Trụ sở Chính
                        </label>
                        <input
                            value={value.DiaChi}
                            type="text"
                            id="address"
                            placeholder={`ví dụ ${value.DiaChi}`}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                            onChange={(e) => setvalue({ ...value, DiaChi: e.target.value })}
                        />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-teal-700 pb-2 border-b border-gray-100 mt-8">2. Liên kết Mạng xã hội</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="social-facebook" className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fab fa-facebook-square text-blue-600 mr-2"></i> Link Facebook
                        </label>
                        <input
                            value={value.LinkFace}
                            type="url"
                            id="social-facebook"
                            placeholder={value.LinkFace}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                            onChange={(e) => setvalue({ ...value, LinkFace: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="social-instagram" className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fab fa-instagram text-pink-600 mr-2"></i> Link Instagram
                        </label>
                        <input
                            value={value.LinkIns}
                            type="url"
                            id="social-instagram"
                            placeholder={value.LinkIns}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                            onChange={(e) => setvalue({ ...value, LinkIns: e.target.value })}
                        />
                    </div>

                    <div>
                        <label htmlFor="social-zalo" className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fas fa-phone-alt text-green-500 mr-2"></i> Hotline/Zalo
                        </label>
                        <input
                            value={value.Zalo}
                            type="tel"
                            id="social-zalo"
                            placeholder={value.Zalo}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition"
                            onChange={(e) => setvalue({ ...value, Zalo: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-700 mb-2">
                            <i className="fas fa-image text-gray-500 mr-2"></i> Cập nhật Logo
                        </label>

                        {previewURL || TTwebsite.LogoURL ? (
                            <div className="relative inline-block">
                                <img
                                    src={previewURL || TTwebsite.LogoURL}
                                    alt="Logo Preview"
                                    className="w-24 h-24 object-contain border border-gray-300 rounded-lg p-1 shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={handleDeleteImage}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:bg-red-600 transition-colors"
                                    aria-label="Xóa ảnh logo"
                                >
                                    &times;
                                </button>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-400">Chưa có Logo</p>
                        )}

                        <input
                            type="file"
                            id="logo-upload"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CaiDat;
